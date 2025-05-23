// https://www.heroui.pro/components/application/cards

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Form,
  Input,
  Modal,
  ModalContent,
  Spacer,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { FlattenedTranslation } from "@/api/useGetTranslations";
import { useUpdateTranslation } from "@/api/useUpdateTranslation";
import CellValue from "./CellValue";

export function EditTranslationModal({
  translation,
}: {
  translation: FlattenedTranslation;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { mutate, isPending } = useUpdateTranslation();
  const [translationValue, setTranslationValue] = useState<string>(
    translation.value
  );
  // Track whether the user has changed the translation text
  const isChanged = translationValue !== translation.value;

  const handleUpdateTranslation = () => {
    mutate({
      translationId: translation.id,
      newValue: translationValue,
    });
    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} isIconOnly size="sm" variant="light">
        <Tooltip
          delay={800}
          showArrow
          placement="top-end"
          content={
            <div className="px-1 py-2">
              <div className="text-small">
                {translation.isPrimary
                  ? "view more information"
                  : "view and edit"}
              </div>
            </div>
          }
        >
          <Icon
            className="h-4 w-4"
            icon={
              translation.isPrimary
                ? "solar:info-circle-linear"
                : "solar:pen-2-linear"
            }
          />
        </Tooltip>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <Card className="w-full max-w-lg p-4">
              <CardHeader className="justify-between ">
                <div className="flex flex-col items-start">
                  <p className="text-large">Translation Details</p>
                  <p className="text-small text-default-500">
                    Manage your text translation
                  </p>
                </div>
                {/* Update button is disabled unless the text has changed */}
                {translation.isPrimary ? (
                  <Tooltip
                    delay={300}
                    showArrow
                    placement="top-end"
                    content={
                      <div className="px-1 py-2">
                        <div
                          style={{ fontWeight: 600 }}
                          className="text-small pb-5"
                        >
                          Primary language translations cannot be edited in the
                          dashboard
                        </div>
                        <div className="text-small">
                          You can update the primary language translations in
                          the codebase,
                        </div>
                        <div className="text-small">
                          and run the `translate-sheet push` command to sync
                          your changes
                        </div>
                      </div>
                    }
                  >
                    <Icon className="h-4 w-4" icon="solar:info-circle-linear" />
                  </Tooltip>
                ) : (
                  <Button
                    color="primary"
                    onPress={handleUpdateTranslation}
                    disabled={!isChanged || isPending}
                  >
                    Update
                  </Button>
                )}
              </CardHeader>
              <Divider />
              <CardBody className="space-y-4">
                <CellValue
                  isPrimary
                  label="Primary language value"
                  value={translation.originalValue}
                />
                {!translation.isPrimary && (
                  <>
                    <Spacer y={2} />
                    <CellValue
                      isPrimary
                      label="Translation value"
                      value={
                        <Input
                          isRequired
                          //   label="Translation Value"
                          name="translationValue"
                          value={translationValue}
                          size="lg"
                          onValueChange={setTranslationValue}
                        />
                      }
                    />
                  </>
                )}
                <Divider />
                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="Translation metadata"
                    subtitle="metadata"
                    isCompact
                    startContent={<Icon icon="solar:code-circle-broken" />}
                  >
                    <CellValue label="ID" value={translation.id} />
                    <CellValue label="Key" value={translation.key} />
                    <CellValue
                      label="Namespace"
                      value={translation.namespace}
                    />
                    <CellValue label="Language" value={translation.language} />
                    <CellValue
                      label="Confidence Score"
                      value={translation.confidenceScore ?? "N/A"}
                    />
                    <CellValue
                      label="Created At"
                      value={
                        translation.createdAt
                          ? translation.createdAt.toLocaleString()
                          : "N/A"
                      }
                    />
                    <CellValue
                      label="Last Updated At"
                      value={
                        translation.lastUpdatedAt
                          ? translation.lastUpdatedAt.toLocaleString()
                          : "N/A"
                      }
                    />
                  </AccordionItem>
                </Accordion>
              </CardBody>
            </Card>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
