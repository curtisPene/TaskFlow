import DomainError from "../../../lib/errors/DomainError";

export class Email {
  constructor(private readonly value: string) {}

  public static create(emailInput: string): Email {
    if (!emailInput?.trim()) {
      throw new DomainError("Email is required");
    }

    const email = emailInput.toLowerCase().trim();

    if (!email.includes("@") || email.length > 255) {
      throw new DomainError("Invalid email format");
    }

    const [local, domain] = email.split("@");

    if (!local || !domain) {
      throw new DomainError("Invalid email format");
    }

    return new Email(email);
  }

  getValue(): string {
    return this.value;
  }

  equals(email: Email): boolean {
    return this.value === email.getValue();
  }

  public static fromPersistence(value: string): Email {
    const email = Object.create(Email.prototype);
    email.value = value;
    return email;
  }
}
