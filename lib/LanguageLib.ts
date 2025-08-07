/**
 * Maps language codes to their corresponding flag emojis.
 *
 * @param languageCode - Language code in format "xx-XX" (e.g., "en-GB")
 * @returns Flag emoji for the language or 🌐 if not found
 *
 * @example
 * ```ts
 * mapLanguageCodeToEmoji("en-GB") // "🇬🇧"
 * mapLanguageCodeToEmoji("fr-FR") // "🇫🇷"
 * mapLanguageCodeToEmoji("unknown") // "🌐"
 * ```
 */
export function mapLanguageCodeToEmoji(languageCode: string): string {
    const languageEmojiMap: Record<string, string> = {
        "da-DK": "🇩🇰", // Danish
        "de-DE": "🇩🇪", // German
        "en-GB": "🇬🇧", // English (UK)
        "fr-FR": "🇫🇷", // French
        "nl-NL": "🇳🇱", // Dutch
    };

    return languageEmojiMap[languageCode] || "🌐";
}