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