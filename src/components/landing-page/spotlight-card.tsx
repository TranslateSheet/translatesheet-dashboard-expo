import type { CardProps } from "@heroui/react";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import {
  m,
  useMotionValue,
  domAnimation,
  LazyMotion,
  useMotionTemplate,
} from "framer-motion";

interface SpotlightCardProps extends CardProps {
  title: string;
  description: string;
}

export default function Component({
  title,
  description,
  ...props
}: SpotlightCardProps) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const cardRef = React.useRef<HTMLDivElement>(null);

  function onMouseMove({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!cardRef?.current) return;

    let { left, top } = cardRef.current?.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Card
      {...props}
      ref={cardRef}
      className="group relative w-full bg-content1 shadow-medium"
      radius="lg"
      onMouseMove={onMouseMove}
    >
      <LazyMotion features={domAnimation}>
        <m.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-250 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
          }}
        />
      </LazyMotion>
      <CardBody className="px-6 py-8">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-medium text-foreground">{title}</p>
          <p className="text-small text-default-500">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
}
