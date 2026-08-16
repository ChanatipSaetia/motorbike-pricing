export const CODE_MAPPING = {
  "B8B800": "701716N",
  "B8B900": "701717N",
  "BJK100": "701718",
  "BJK200": "701719",
  "B21900": "701914",
  "BB9A00": "70212N",
  "BKF100": "703201",
  "BKF300": "703202",
  "B1T400": "702108N",
  "BB8200": "702109N",
  "BBR500": "702319N",
  "BBR600": "702320N",
  "BBRA00": "702321N",
  "BKA200": "707408",
  "B6FH00": "702616",
  "B6FJ00": "702617",
  "B6FK00": "702618",
  "B6FL00": "702619",
  "BAW400": "701816",
  "BAW500": "701817"
};

export const TYPE_CODE_OPTIONS = Object.keys(CODE_MAPPING);
export const FINANCE_CODE_OPTIONS = Object.values(CODE_MAPPING);

export const MONTH_OPTIONS = [12, 18, 24, 30, 36, 42, 48];

// Default interest map by month
export const DEFAULT_INTEREST_RATES = {
  12: 1.05,
  18: 1.06,
  24: 1.07,
  30: 1.08,
  36: 1.09,
  42: 1.10,
  48: 1.12,
};
