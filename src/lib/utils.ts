export function currentYear(): number {
  return new Date().getFullYear();
}

export function formatCurrency(amount: number): string {
  return `RM ${amount.toLocaleString()}`;
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\s|-/g, "");
}

export function validateMalaysianPhone(phone: string): boolean {
  const phoneRegex = /^(\+?6?01)[0-9]{8,9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ""));
}
