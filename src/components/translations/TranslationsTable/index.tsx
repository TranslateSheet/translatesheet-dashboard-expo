// https://www.heroui.pro/components/application/tables

import type { Selection, SortDescriptor } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Chip,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { SearchIcon } from "@heroui/shared-icons";
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

import {
  FlattenedTranslation,
  useGetTranslations,
} from "@/api/useGetTranslations";
import { useGlobalSearchParams } from "expo-router";
import { getFlagEmoji } from "./helpers/getFlagEmoji";
import { INITIAL_VISIBLE_COLUMNS, columns } from "./constants/columns";
import { useGetProjectSupportedLanguages } from "@/api/useGetProjectSupportedLanguages";
import { Pressable, View } from "react-native";
import ColumnLabelTooltip from "./ColumnLabelTooltip";
import { EditTranslationModal } from "../EditTranslationModal";

export function TranslationsTable() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "key",
    direction: "ascending",
  });

  const { projectId } = useGlobalSearchParams<{ projectId: string }>();
  const { languages } = useGetProjectSupportedLanguages();
  const { data: translationData, isLoading } = useGetTranslations({
    projectId,
  });

  // TODO: can save default language filter to last seen in users local storage
  const [languageFilter, setLanguageFilter] = useState("es");
  const [namespaceFilter, setNamespaceFilter] = useState("all");
  const [confidenceFilter, setConfidenceFilter] = useState("all");

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns
      .map((item) => {
        if (item.uid === sortDescriptor.column) {
          return {
            ...item,
            sortDirection: sortDescriptor.direction,
          };
        }
        return item;
      })
      .filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, sortDescriptor]);

  const itemFilter = useCallback(
    (translation: FlattenedTranslation) => {
      const allLanguages = languageFilter === "all";
      const allNamespaces = namespaceFilter === "all";
      const allConfidence = confidenceFilter === "all";

      let confidenceMatch = true;
      if (!allConfidence && translation.confidenceScore) {
        switch (confidenceFilter) {
          case "high":
            confidenceMatch = translation.confidenceScore >= 9;
            break;
          case "medium":
            confidenceMatch =
              translation.confidenceScore >= 7 &&
              translation.confidenceScore < 9;
            break;
          case "low":
            confidenceMatch = translation.confidenceScore < 7;
            break;
        }
      }

      return (
        (allLanguages || languageFilter === translation.language) &&
        (allNamespaces || namespaceFilter === translation.namespace) &&
        confidenceMatch
      );
    },
    [languageFilter, namespaceFilter, confidenceFilter]
  );

  const filteredItems = useMemo(() => {
    let filteredTranslations = translationData ?? [];

    if (filterValue) {
      filteredTranslations = filteredTranslations.filter(
        (item) =>
          item.key.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.value.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.namespace.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    filteredTranslations = filteredTranslations.filter(itemFilter);

    return filteredTranslations;
  }, [filterValue, itemFilter, translationData]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort(
      (a: FlattenedTranslation, b: FlattenedTranslation) => {
        const col = sortDescriptor.column as keyof FlattenedTranslation;
        let first = a[col];
        let second = b[col];

        if (col === "createdAt" || col === "lastUpdatedAt") {
          first = first ? new Date(first as string).getTime() : 0;
          second = second ? new Date(second as string).getTime() : 0;
        }

        const cmp = first! < second! ? -1 : first! > second! ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
    );
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (translation: FlattenedTranslation, columnKey: React.Key) => {
      const cellValue = translation[columnKey as keyof FlattenedTranslation];

      switch (columnKey) {
        case "namespace":
          return (
            <Chip
              className="capitalize"
              color="primary"
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "key":
          return (
            <Tooltip
              delay={500}
              showArrow
              placement="top-start"
              content={<div className="text-small font-bold">{cellValue}</div>}
            >
              <Pressable
                style={{ maxWidth: 220 }}
                onPress={() => console.log("Á")}
              >
                <div className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {cellValue}
                </div>
              </Pressable>
            </Tooltip>
          );
        case "language":
          return (
            <Chip
              className="uppercase"
              color={translation.isPrimary ? "success" : "default"}
              size="sm"
              variant="flat"
            >
              {getFlagEmoji(cellValue as string)} {cellValue}
            </Chip>
          );
        case "confidenceScore":
          return (
            <div className="flex items-center gap-2">
              <div
                className={cn("h-2 w-2 rounded-full", {
                  "bg-blue-500": cellValue === null || cellValue === undefined, // Primary language case
                  "bg-success": cellValue !== null && Number(cellValue) >= 9, // Ensure it’s a valid score
                  "bg-warning":
                    cellValue !== null &&
                    Number(cellValue) >= 7 &&
                    Number(cellValue) < 9,
                  "bg-danger": cellValue !== null && Number(cellValue) < 7,
                })}
              />
              <span>{cellValue ?? "-"}</span>
            </div>
          );
        case "createdAt":
        case "lastUpdatedAt":
          return cellValue ? (
            <div style={{ maxWidth: 120 }} className="flex items-center gap-1">
              <Icon
                className="h-4 w-4 text-default-400"
                icon="solar:calendar-minimalistic-linear"
              />
              <span>{cellValue}</span>
            </div>
          ) : (
            <span className="text-default-400">-</span>
          );
        case "value":
          return (
            <Tooltip
              delay={500}
              showArrow
              placement="top-start"
              content={
                <div className="px-1 py-2 w-60">
                  <div className="text-small">Original value:</div>
                  <div className="text-small font-bold">
                    {translation.originalValue}
                  </div>
                </div>
              }
            >
              <Pressable
                style={{ maxWidth: 220 }}
                onPress={() => console.log("Á")}
              >
                <div className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {cellValue}
                </div>
              </Pressable>
            </Tooltip>
          );
        case "actions":
          return (
            <div className="flex items-center justify-end gap-2">
              <EditTranslationModal translation={translation} />
              {/* <Button isIconOnly size="sm" variant="light">
                <Icon className="h-4 w-4" icon="solar:trash-bin-trash-linear" />
              </Button> */}
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <Input
            className="w-full max-w-[400px]"
            placeholder="Search by key, value or namespace..."
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            onValueChange={setFilterValue}
          />
          <div className="flex gap-3">
            <Dropdown aria-label="Column selection">
              <DropdownTrigger>
                <Button
                  endContent={
                    <Icon
                      className="text-small"
                      icon="solar:alt-arrow-down-linear"
                    />
                  }
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Popover placement="bottom-end">
              <PopoverTrigger aria-label="Open language filter">
                <Button
                  endContent={
                    <Icon className="text-small" icon="solar:global-outline" />
                  }
                  variant="flat"
                >
                  Language
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <div className="flex flex-col gap-4 p-4">
                  <RadioGroup
                    label="Language"
                    value={languageFilter}
                    onValueChange={setLanguageFilter}
                  >
                    {languages.map((language) => {
                      return (
                        <Radio key={language.code} value={language.code}>
                          {language.name} {language.flag}
                        </Radio>
                      );
                    })}
                  </RadioGroup>
                </div>
              </PopoverContent>
            </Popover>
            <Popover placement="bottom-end">
              <PopoverTrigger aria-label="Open filters">
                <Button
                  endContent={
                    <Icon className="text-small" icon="solar:filter-linear" />
                  }
                  variant="flat"
                >
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[240px]">
                <div className="flex flex-col gap-4 p-4">
                  <RadioGroup
                    label="Confidence"
                    value={confidenceFilter}
                    onValueChange={setConfidenceFilter}
                  >
                    <Radio value="all">All Scores</Radio>
                    <Radio value="high">High (≥ 9)</Radio>
                    <Radio value="medium">Medium (7-9)</Radio>
                    <Radio value="low">{"Low (< 7)"}</Radio>
                  </RadioGroup>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    languageFilter,
    confidenceFilter,
    languages,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex-1">
          <span className="text-small text-default-400">
            {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
          </span>
        </div>
        <Pagination
          aria-label="Translation table pagination"
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={pages === 1}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages]);

  return (
    <Table
      aria-label="Project Translations Table"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[600px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
            minWidth={800}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={
          isLoading ? "Loading translation data" : "No translations found"
        }
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
