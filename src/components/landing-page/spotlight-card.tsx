import type { CardProps } from "@heroui/react";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import {
  m,
  useMotionValue,
  domAnimation,
  LazyMotion,
  useMotionTemplate,
} from "framer-motion";
import { Feature } from "./features";
import { ThemedText } from "../ThemedText";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "@heroui/react";

interface SpotlightCardProps extends CardProps {
  title: string;
  description: string;
}

export default function Component({
  title,
  titleColor,
  description,
  image,
}: Feature) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const cardRef = React.useRef<HTMLDivElement>(null);
  const { width: windowWidth } = useWindowDimensions();

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
      ref={cardRef}
      className="group relative w-full bg-content1 shadow-medium overflow-hidden"
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
              ${titleColor}25,
              transparent 80%
            )
          `,
          }}
        />
      </LazyMotion>
      <CardBody className="px-6 py-8">
        <div className="flex flex-col gap-3">
          <p
            // style={{ color: titleColor }}
            className="text-xl font-medium text-foreground"
          >
            {title}
          </p>
          <p style={styles.subHeadingText}>{description}</p>
        </div>
      </CardBody>
      {/* <CardFooter className="relative h-60 p-0">
        <Image
          removeWrapper
          alt="Acme Planner"
          className="h-full object-contain"
          src={image}
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)", // for non-webkit browsers
          }}
        />
      </CardFooter> */}
    </Card>
  );
}

const styles = StyleSheet.create({
  subHeadingText: {
    fontFamily: "Inter",
    textAlign: "left", // Equivalent to `text-start`
    color: "#575757", // Approximate Tailwind `text-default-500`
    fontSize: 16, // Approximate Tailwind `text-base`
  },
});
