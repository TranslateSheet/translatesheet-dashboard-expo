// https://www.heroui.pro/components/marketing/pricing

import TranslateSheet from "translate-sheet";
import type { Frequency, Tier } from "./types";

import { FrequencyEnum, TiersEnum } from "./types";

const usePricingTiers = () => {
  const frequencies: Array<Frequency> = [
    { key: FrequencyEnum.Yearly, label: "Pay Yearly", priceSuffix: "per year" },
    {
      key: FrequencyEnum.Quarterly,
      label: "Pay Quarterly",
      priceSuffix: "per quarter",
    },
  ];

  const tiers: Array<Tier> = [
    {
      key: TiersEnum.Free,
      title: translations.hobby.title,
      price: translations.hobby.price,
      href: "#",
      featured: false,
      mostPopular: false,
      description: translations.hobby.description,
      features: [
        translations.hobby.features.projects,
        translations.hobby.features.members,
        translations.hobby.features.keys,
        translations.hobby.features.languages,
        translations.hobby.features.support,
      ],
      buttonText: translations.hobby.buttonText,
      buttonColor: "default",
      buttonVariant: "flat",
    },
    {
      key: TiersEnum.Pro,
      title: translations.professional.title,
      description: translations.professional.description,
      href: "#",
      mostPopular: true,
      price: translations.professional.price,
      priceSuffix: "/mo",
      featured: false,
      features: [
        translations.professional.features.projects,
        translations.professional.features.members,
        translations.professional.features.keys,
        translations.professional.features.languages,
        translations.professional.features.support,
      ],
      buttonText: translations.professional.buttonText,
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
  return { frequencies, tiers };
};

const translations = TranslateSheet.create("PricingTiers", {
  hobby: {
    title: "Hobby",
    price: "Free",
    description: "For starters and hobbyists that want to try out.",
    features: {
      projects: "1 project",
      members: "1 project member seat",
      keys: "250 hosted translated keys",
      languages: "2 translated languages",
      support: "Email support",
    },
    buttonText: "Continue with Free",
  },
  professional: {
    title: "Professional",
    price: "$9 per month",
    description: "For small teams that have less that 10 members.",
    features: {
      projects: "10 projects",
      members: "Unlimited project member seats",
      keys: "Unlimited hosted translated keys",
      languages: "Unlimited translated languages",
      support: "Help center access",
    },
    buttonText: "Get started",
  },
});

export default usePricingTiers;
