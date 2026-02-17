export class Notification {
  private _errors: Record<string, string[]>;

  private constructor() {
    this._errors = {};
  }

  public static create(error?: Record<string, string>): Notification {
    if (error) {
      const notification = Notification.create();
      notification.addError(error);
    }

    return new Notification();
  }
  public hasError(): boolean {
    return Object.keys(this._errors).length > 0;
  }

  public addError(error: Record<string, string>): void {
    const [[key, value]] = Object.entries(error);
    if (!!this._errors[key]) {
      this._errors[key].push(value);
    } else this._errors = { ...this._errors, [key]: [value] };
  }
  public addErrors(error: Record<string, string[]>): void {
    const [[key, values]] = Object.entries(error);

    for (const value in values) {
      this.addError({ [key]: values[value] });
    }
  }
  public getError(): Record<string, string[]> {
    return this._errors;
  }

  public combineWith(notification: Notification): void {
    this._errors = { ...this._errors, ...notification.getError() };
  }
}
