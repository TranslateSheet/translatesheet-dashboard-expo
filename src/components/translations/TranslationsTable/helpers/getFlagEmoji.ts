import { languageFlags } from "../constants/languageFlags";

export function getFlagEmoji(languageCode: string): string {
  if (!languageCode) return "🏳️"; // Neutral flag if no language code provided

  // First try to find the full language-region code, then fallback to the language code
  return (
    languageFlags[languageCode.toLowerCase()] ??
    languageFlags[languageCode.split("-")[0]] ??
    "🏳️"
  );
}
