/**
 * exists at https://directus.altura.io/items/translationKeys_translations
 */
export interface TranslationValue {
	/**
	 * Internal reference id, you shouldn't need to use this.
	 */
	id?: number;
	/**
	 * The value of this translation.
	 */
	value: string;
	/**
	 * The translation key this translation is part of.
	 */
	translationKeys_key: string;
	/**
	 * The language code of this translation.
	 * @example "en-GB", "nl-NL"
	 */
	languages_code: string;
}

/**
 * exists at https://directus.altura.io/items/translationKeys
 */
export interface DirectusTranslation {
	/**
	 * The key used to reference translation values.
	 * @example $t(`general.accept`) === "Accept"
	 */
	key: string;
	/**
	 * Only available when authenticated, it contains all available variables that you can use in the translation values using `{ ... }`.
	 */
	variables: null | string[];
	/**
	 * An array with all different locales for the translation key.
	 */
	translations: TranslationValue[];
}
