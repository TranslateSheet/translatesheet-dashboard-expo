// https://www.heroui.pro/components/marketing/pricing

import React from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
  Spacer,
  Tab,
  Tabs,
} from "@heroui/react";

import { TiersEnum } from "./types";

import useSubscriptionStatus from "@/api/useSubscriptionStatus";
import TranslateSheet from "translate-sheet";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import usePricingTiers from "./usePricingTiers";

export function PricingPlans({ isLanding }: { isLanding?: boolean }) {
  const { tiers, frequencies } = usePricingTiers();

  const [selectedFrequency, setSelectedFrequency] = React.useState(
    frequencies[0]
  );

  const { isActive, subscriptionStatus, loading } = useSubscriptionStatus();
  const { width: windowWidth } = useWindowDimensions();

  const onFrequencyChange = (selectedKey: React.Key) => {
    const frequencyIndex = frequencies.findIndex((f) => f.key === selectedKey);

    setSelectedFrequency(frequencies[frequencyIndex]);
  };

  return (
    <View
      style={{ paddingHorizontal: 24 }}
      className="flex w-full flex-col items-center"
    >
      {isLanding && (
        <View style={{ alignItems: "center" }}>
          <p style={windowWidth > 1024 ? styles.heading : styles.headingMobile}>
            {translations.heading}
          </p>
          <Text style={[styles.subHeadingText, { fontWeight: "400" }]}>
            {translations.subHeading}
          </Text>
        </View>
      )}
      <Spacer y={8} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {tiers.map((tier) => (
          <Card key={tier.key} className="relative p-3" shadow="md">
            {tier.key === TiersEnum.Pro && isActive ? (
              <Chip
                classNames={{
                  base: "absolute top-4 right-4",
                  content: "font-medium text-primary-500 dark:text-primary-600",
                }}
                color="primary"
                variant="flat"
              >
                {translations.currentPlan}
              </Chip>
            ) : null}
            <CardHeader className="flex flex-col items-start gap-2 pb-6">
              <h2 className="text-large font-medium">{tier.title}</h2>
              <p className="text-medium text-default-500">{tier.description}</p>
            </CardHeader>
            <Divider />
            <CardBody className="gap-8">
              <p className="flex items-baseline gap-1 pt-2">
                <span className="text-large inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-4xl font-semibold leading-7 tracking-tight text-transparent">
                  {typeof tier.price === "string"
                    ? tier.price
                    : tier.price[selectedFrequency.key]}
                </span>
                {typeof tier.price !== "string" ? (
                  <span className="text-small font-medium text-default-400">
                    {tier.priceSuffix
                      ? `/${tier.priceSuffix}/${selectedFrequency.priceSuffix}`
                      : `/${selectedFrequency.priceSuffix}`}
                  </span>
                ) : null}
              </p>
              <ul className="flex flex-col gap-2">
                {tier.features?.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Icon className="text-primary" icon="ci:check" width={24} />
                    <p className="text-default-500">{feature}</p>
                  </li>
                ))}
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                as={Link}
                color={tier.buttonColor}
                href={isLanding ? "/dashboard" : tier.href}
                variant={tier.buttonVariant}
              >
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {!isLanding && (
        <>
          <Spacer y={12} />
          <div className="flex py-2">
            <p className="text-default-400">
              {translations.openSourceDev}&nbsp;
              <Link color="foreground" href="#" underline="always">
                {translations.discount}
              </Link>
            </p>
          </div>
        </>
      )}
    </View>
  );
}

const translations = TranslateSheet.create("PricingPlans", {
  heading: "Simple pricing, designed to scale",
  subHeading:
    "No surprise fees or contracts. Get started for free, and scale when you need.",
  currentPlan: "Current plan",
  openSourceDev: "Are you an open source developer?",
  discount: "Get a discount",
});

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Inter",
    color: "black",
    letterSpacing: -1,
    fontWeight: "400",
    fontSize: 37,
    marginBottom: 8,
  },
  headingMobile: {
    fontFamily: "Inter",
    color: "black",
    letterSpacing: -1,
    fontWeight: "400",
    fontSize: 28,
  },
  subHeadingText: {
    fontFamily: "Inter",
    textAlign: "center", // Equivalent to `text-start`
    color: "#575757", // Approximate Tailwind `text-default-500`
    fontSize: 18, // Approximate Tailwind `text-base`
  },
});
