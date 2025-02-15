"use client";

import React from "react";
import {Button, Link} from "@heroui/react";
import {Icon} from "@iconify/react";

export default function Banner() {
  return (
    <div className="flex w-full items-center gap-x-3 border-b-1 border-divider bg-primary px-6 py-2 sm:px-3.5 sm:before:flex-1">
      <p className="text-small text-primary-foreground">
        TranslateSheet now in beta 🎉
      </p>
      <Button
        as={Link}
        className="group relative h-5 overflow-hidden bg-primary-foreground text-small font-medium text-primary"
        color="default"
        endContent={
          <Icon
            className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
            icon="solar:arrow-right-linear"
            width={16}
          />
        }
        href="#"
        radius="sm"
      >
        Learn more
      </Button>
      <div className="flex flex-1 justify-end">
        <Button isIconOnly aria-label="Close Banner" className="-m-1" size="sm" variant="light">
          <Icon aria-hidden="true" className="text-primary-foreground" icon="lucide:x" width={20} />
        </Button>
      </div>
    </div>
  );
}
