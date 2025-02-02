import { languageInfo } from "../constants/languageInfo";

export function getFlagEmoji(languageCode: string): string {
  if (!languageCode) return "🏳️"; // Neutral flag if no language code provided

  // First try to find the exact match, then fallback to the base language without region
  return (
    languageInfo[languageCode.toLowerCase()]?.flag ??
    languageInfo[languageCode.split("-")[0]]?.flag ??
    "🏳️" // Default to a neutral flag if no match is found
  );
}
