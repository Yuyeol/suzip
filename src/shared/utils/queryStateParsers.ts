// 정수 파서
export const parseAsInteger = (value: string | null): number | null => {
  if (!value) return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
};

// Boolean 파서
export const parseAsBoolean = (value: string | null): boolean | null => {
  if (!value) return null;
  return value === 'true';
};

// String 파서
export const parseAsString = (value: string | null): string | null => {
  return value;
};
