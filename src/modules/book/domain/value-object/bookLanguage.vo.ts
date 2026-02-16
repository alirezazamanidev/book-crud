import { ValueObject } from 'src/common/seed-works/valueObject';

export class BookLanguage extends ValueObject<string> {
  private static readonly VALID_LANGUAGES = [
    'en',
    'fa',
    'ar',
    'fr',
    'de',
    'es',
    'it',
    'pt',
    'ru',
    'zh',
    'ja',
    'ko',
  ];
  private static readonly LANGUAGE_NAMES: Record<string, string> = {
    en: 'English',
    fa: 'Persian',
    ar: 'Arabic',
    fr: 'French',
    de: 'German',
    es: 'Spanish',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
  };

  private constructor(value: string) {
    super({ value });
  }

  public static create(lang: string) {
    const normalized = lang.trim().toLowerCase();
    if (!BookLanguage.VALID_LANGUAGES.includes(normalized as any)) {
      throw new Error(
        `Invalid language code. Valid languages: ${BookLanguage.VALID_LANGUAGES.join(', ')}`,
      );
    }
    return new BookLanguage(normalized);
  }
  public getName(): string {
    return BookLanguage.LANGUAGE_NAMES[this.value] || this.value;
  }
}
