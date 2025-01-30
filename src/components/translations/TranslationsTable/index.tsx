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
import React, { useMemo, useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

import {
  INITIAL_VISIBLE_COLUMNS,
  Translation,
  columns,
  translations,
} from "./Data";

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
    (translation: Translation) => {
      const allLanguages = languageFilter === "all";
      const allNamespaces = namespaceFilter === "all";
      const allConfidence = confidenceFilter === "all";

      let confidenceMatch = true;
      if (!allConfidence) {
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
    let filteredTranslations = [...translations];

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
  }, [filterValue, itemFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Translation, b: Translation) => {
      const col = sortDescriptor.column as keyof Translation;
      let first = a[col];
      let second = b[col];

      if (col === "createdAt" || col === "lastUpdatedAt") {
        first = first ? new Date(first).getTime() : 0;
        second = second ? new Date(second).getTime() : 0;
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (translation: Translation, columnKey: React.Key) => {
      const cellValue = translation[columnKey as keyof Translation];

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
        case "language":
          const languageFlags: Record<string, string> = {
            en: "🇺🇸",
            es: "🇪🇸",
            zh: "🇨🇳",
            ru: "🇷🇺",
            de: "🇩🇪",
          };
          return (
            <Chip
              className="uppercase"
              color={cellValue === "en" ? "success" : "default"}
              size="sm"
              variant="flat"
            >
              {languageFlags[cellValue as string]} {cellValue}
            </Chip>
          );
        case "confidenceScore":
          return (
            <div className="flex items-center gap-2">
              <div
                className={cn("h-2 w-2 rounded-full", {
                  "bg-success": cellValue >= 9,
                  "bg-warning": cellValue >= 7 && cellValue < 9,
                  "bg-danger": cellValue < 7,
                })}
              />
              <span>{cellValue.toFixed(1)}</span>
            </div>
          );
        case "createdAt":
        case "lastUpdatedAt":
          return cellValue ? (
            <div className="flex items-center gap-1">
              <Icon
                className="h-4 w-4 text-default-400"
                icon="solar:calendar-minimalistic-linear"
              />
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(cellValue))}
              </span>
            </div>
          ) : (
            <span className="text-default-400">-</span>
          );
        case "value":
          return (
            <div className="max-w-md overflow-hidden text-ellipsis whitespace-nowrap">
              {cellValue}
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center justify-end gap-2">
              <Button isIconOnly size="sm" variant="light">
                <Icon className="h-4 w-4" icon="solar:pen-2-linear" />
              </Button>
              <Button isIconOnly size="sm" variant="light">
                <Icon className="h-4 w-4" icon="solar:trash-bin-trash-linear" />
              </Button>
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
            <Dropdown>
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
              <PopoverTrigger>
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
                    <Radio value="all">All Languages</Radio>
                    <Radio value="en">English 🇺🇸</Radio>
                    <Radio value="es">Spanish 🇪🇸</Radio>
                    <Radio value="zh">Chinese 🇨🇳</Radio>
                    <Radio value="ru">Russian 🇷🇺</Radio>
                    <Radio value="de">German 🇩🇪</Radio>
                  </RadioGroup>
                </div>
              </PopoverContent>
            </Popover>
            <Popover placement="bottom-end">
              <PopoverTrigger>
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
  }, [filterValue, visibleColumns, languageFilter, confidenceFilter]);

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
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No translations found" items={sortedItems}>
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
