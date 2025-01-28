import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

export function UpdateTranslationsButton() {
  const isDesktop = useIsDesktop();
  return (
    <Tooltip
      content={
        <div className="px-1 py-2 w-60">
          <div className="text-small font-bold">Force push your changes?</div>
          <div className="text-tiny">
            Translations automatically get merged to your main branch once every
            24 hours.
          </div>
        </div>
      }
    >
      <Button
        color="primary"
        startContent={
          <Icon icon="solar:square-sort-vertical-line-duotone" width={24} />
        }
      >
        {isDesktop ? "Push 27 changes" : null}
      </Button>
    </Tooltip>
  );
}
