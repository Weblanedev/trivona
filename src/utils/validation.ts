/**
 * Validation helpers for checkout form (UI only, no real payment).
 */

/** 16-digit card number: digits only, length 16 */
export function isValidCardNumber(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 16;
}

/** CVV: exactly 3 digits */
export function isValidCvv(value: string): boolean {
  return /^\d{3}$/.test(value.trim());
}

/** Expiry: MM/YY format, month 01-12, year 2 digits, not in the past */
export function isValidExpiry(value: string): boolean {
  const trimmed = value.trim().replace(/\s/g, '');
  // Match MM/YY format
  const match = trimmed.match(/^(\d{1,2})\/(\d{2})$/);
  if (!match) return false;
  
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10);
  
  // Validate month range
  if (month < 1 || month > 12) return false;
  
  // Validate year (convert 2-digit to 4-digit)
  const fullYear = 2000 + year;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  // Check if date is in the past
  if (fullYear < currentYear) return false;
  if (fullYear === currentYear && month < currentMonth) return false;
  
  return true;
}

export function isNonEmptyString(value: string): boolean {
  return value.trim().length > 0;
}

/** Basic email pattern */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Phone: at least 10 digits */
export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, '').length >= 10;
}
