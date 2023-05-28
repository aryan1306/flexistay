//exclude fields from db query
export function exclude<T, Key extends keyof T>(
  user: T,
  keys: Key[]
): Omit<T, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}
export const priceDisplay = (value: string) => {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 5,
    style: "currency",
    currency: "INR",
  }).format(parseInt(value));
};
