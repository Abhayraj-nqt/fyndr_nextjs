import { CurrencySymbol, DiscountType } from "@/types/global";
export { parseStringCase } from "./string";

export function parseAmount(amount: number) {
  return amount.toFixed(2);
}

export const parseDiscount = (
  amount: number,
  discountType: DiscountType,
  currencySymbol: CurrencySymbol
) => {
  return discountType === "%"
    ? `${amount}% OFF`
    : `${currencySymbol}${parseAmount(amount)} OFF`;
};
