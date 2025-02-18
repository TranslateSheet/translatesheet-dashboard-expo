import React from "react";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import TranslateSheet from "translate-sheet";

export default function Banner() {
  return (
    <div className="flex w-full items-center gap-x-3 border-b-1 border-divider bg-primary px-6 py-2 sm:px-3.5 sm:before:flex-1">
      <p className="text-small text-primary-foreground">
        {translations.heading}🎉
      </p>
      <div className="flex flex-1 justify-end">
        <Button
          isIconOnly
          aria-label="Close Banner"
          className="-m-1"
          size="sm"
          variant="light"
        >
          <Icon
            aria-hidden="true"
            className="text-primary-foreground"
            icon="lucide:x"
            width={20}
          />
        </Button>
      </div>
    </div>
  );
}

const translations = TranslateSheet.create("Banner", {
  heading: "TranslateSheet now in beta",
});
