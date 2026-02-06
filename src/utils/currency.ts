/**
 * Currency conversion and formatting utilities.
 * Converts USD prices to Nigerian Naira (NGN).
 */

// Exchange rate: 1 USD = 1,500 NGN
// Update this rate as needed (you could also fetch from an API)
const USD_TO_NGN_RATE = 1500;

/**
 * Converts USD price to Nigerian Naira.
 * @param usdPrice - Price in USD
 * @returns Price in NGN
 */
export function usdToNgn(usdPrice: number): number {
  return Math.round(usdPrice * USD_TO_NGN_RATE);
}

/**
 * Formats a price in Naira with proper formatting.
 * Example: 15000 -> "₦15,000"
 * @param ngnPrice - Price in NGN
 * @returns Formatted price string with Naira symbol
 */
export function formatNaira(ngnPrice: number): string {
  return `₦${ngnPrice.toLocaleString('en-NG')}`;
}

/**
 * Converts USD price to NGN and formats it.
 * Convenience function that combines conversion and formatting.
 * @param usdPrice - Price in USD
 * @returns Formatted price string in Naira
 */
export function formatPrice(usdPrice: number): string {
  const ngnPrice = usdToNgn(usdPrice);
  return formatNaira(ngnPrice);
}

/**
 * Formats a price with decimal places (for display purposes).
 * Example: 15000.50 -> "₦15,000.50"
 * @param ngnPrice - Price in NGN
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted price string with Naira symbol
 */
export function formatNairaWithDecimals(ngnPrice: number, decimals: number = 0): string {
  return `₦${ngnPrice.toLocaleString('en-NG', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}
