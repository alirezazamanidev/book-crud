import { ValueObject } from 'src/common/seed-works/valueObject';

export class BookLanguage extends ValueObject<string> {
  private static readonly LANGUAGES = {
    en: { name: 'English', rtl: false },
    fa: { name: 'Persian', rtl: true },
    ar: { name: 'Arabic', rtl: true },
    fr: { name: 'French', rtl: false },
    de: { name: 'German', rtl: false },
    es: { name: 'Spanish', rtl: false },
    it: { name: 'Italian', rtl: false },
    pt: { name: 'Portuguese', rtl: false },
    ru: { name: 'Russian', rtl: false },
    zh: { name: 'Chinese', rtl: false },
    ja: { name: 'Japanese', rtl: false },
    ko: { name: 'Korean', rtl: false },
  } as const;

  private constructor(value: string) {
    super({ value });
  }

  public static create(code: string): BookLanguage {
    const normalized = code.trim().toLowerCase();

    if (!(normalized in BookLanguage.LANGUAGES)) {
      throw new Error('Invalid language code');
    }
    return new BookLanguage(normalized);
  }
  get name(): string {
    return BookLanguage.LANGUAGES[this.value].name;
  }
  get code(): string {
    return BookLanguage.LANGUAGES[this.value];
  }
  get isRtl():boolean{
    return BookLanguage.LANGUAGES[this.value].rtl;
  }
}
