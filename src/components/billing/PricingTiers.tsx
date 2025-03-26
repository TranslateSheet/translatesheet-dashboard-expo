// https://www.heroui.pro/components/marketing/pricing

import type { Frequency, Tier } from "./types";

import { FrequencyEnum, TiersEnum } from "./types";

export const frequencies: Array<Frequency> = [
  { key: FrequencyEnum.Yearly, label: "Pay Yearly", priceSuffix: "per year" },
  {
    key: FrequencyEnum.Quarterly,
    label: "Pay Quarterly",
    priceSuffix: "per quarter",
  },
];

export const tiers: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Hobby",
    price: "Free",
    href: "#",
    featured: false,
    mostPopular: false,
    description: "For starters and hobbyists that want to try out.",
    features: [
      "1 project",
      "1 project member seat",
      "250 hosted translated keys",
      "2 translated languages",
      "Email support",
    ],
    buttonText: "Continue with Free",
    buttonColor: "default",
    buttonVariant: "flat",
  },
  {
    key: TiersEnum.Pro,
    title: "Professional",
    description: "For small teams that have less that 10 members.",
    href: "#",
    mostPopular: true,
    price: "$9 per month",
    priceSuffix: "/mo",
    featured: false,
    features: [
      "10 projects",
      "Unlimited project member seats",
      "X Translated Keys/project",
      "Unlimited translated languages",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  // {
  //   key: TiersEnum.Enterprise,
  //   title: "Team",
  //   href: "#",
  //   featured: true,
  //   mostPopular: false,
  //   description: "For large teams that have more than 10 members.",
  //   price: "Contact for pricing details",
  //   features: [
  //     "Unlimited projects",
  //     "Unlimited storage",
  //     "Unlimited project member seats",
  //     "Phone & email support",
  //   ],
  //   buttonText: "Contact",
  //   buttonColor: "default",
  //   buttonVariant: "flat",
  // },
];
