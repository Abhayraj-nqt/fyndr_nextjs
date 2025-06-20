/* eslint-disable no-unused-vars */

/**
 * Address interface with comprehensive fields including distance
 */
export interface Address {
  readonly addressLine1?: string | null;
  readonly addressLine2?: string | null;
  readonly addressLine3?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly province?: string | null;
  readonly postalCode?: string | null;
  readonly zipCode?: string | null;
  readonly country?: string | null;
  readonly countryCode?: string | null;
  readonly distance?: number | null;
  readonly coordinates?: {
    readonly latitude: number;
    readonly longitude: number;
  } | null;
}

/**
 * Address format (simplified to single universal format)
 */
export enum AddressFormat {
  UNIVERSAL = "UNIVERSAL",
}

/**
 * Distance units supported
 */
export enum DistanceUnit {
  MILES = "miles",
  KILOMETERS = "km",
  METERS = "m",
  FEET = "ft",
}

/**
 * Configuration options for address formatting
 */
export interface AddressFormatOptions {
  readonly format?: AddressFormat;
  readonly separator?: string;
  readonly includeCountry?: boolean;
  readonly upperCaseCountry?: boolean;
  readonly compactMode?: boolean;
  readonly locale?: string;
  readonly includeDistance?: boolean;
  readonly distanceUnit?: DistanceUnit;
  readonly distancePrecision?: number;
  readonly distancePrefix?: string;
  readonly distanceSuffix?: string;
  readonly distancePosition?: "before" | "after";
}

/**
 * Result of address parsing with metadata
 */
export interface AddressParseResult {
  readonly formatted: string;
  readonly lines: readonly string[];
  readonly isValid: boolean;
  readonly missingFields: readonly string[];
  readonly warnings: readonly string[];
}

/**
 * Default formatting options
 */
const DEFAULT_OPTIONS: Required<AddressFormatOptions> = {
  format: AddressFormat.UNIVERSAL,
  separator: ", ",
  includeCountry: true,
  upperCaseCountry: false,
  compactMode: false,
  locale: "en-US",
  includeDistance: false,
  distanceUnit: DistanceUnit.MILES,
  distancePrecision: 1,
  distancePrefix: "",
  distanceSuffix: "",
  distancePosition: "before",
} as const;

/**
 * Safely trims and normalizes string values
 */
const normalizeString = (value: string | null | undefined): string => {
  return isValidString(value) ? value.trim() : "";
};

/**
 * Combines address with distance information
 */
const combineAddressWithDistance = (
  addressLines: string[],
  address: Address,
  options: Required<AddressFormatOptions>
): string[] => {
  if (!options.includeDistance || !address.distance) {
    return addressLines;
  }

  const distanceStr = formatDistance(address.distance, options);
  if (!distanceStr) return addressLines;

  const result = [...addressLines];

  if (options.distancePosition === "before") {
    result.unshift(distanceStr);
  } else {
    result.push(distanceStr);
  }

  return result;
};

/**
 * Validates if a string value is non-empty after trimming
 */
const isValidString = (value: string | null | undefined): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * Formats distance according to specified options
 */
const formatDistance = (
  distance: number | null | undefined,
  options: Required<AddressFormatOptions>
): string => {
  const unit = options.distanceUnit;

  if (!distance || typeof distance !== "number" || distance < 0) {
    return `${options.distancePrefix}${"0.0"} ${unit}${options.distanceSuffix}`.trim();
  }

  const formattedDistance = distance.toFixed(options.distancePrecision);

  return `${options.distancePrefix}${formattedDistance} ${unit}${options.distanceSuffix}`.trim();
};

/**
 * Universal address formatter for all countries
 */
const formatUniversalAddress = (
  address: Address,
  options: Required<AddressFormatOptions>
): string[] => {
  const lines: string[] = [];

  // All address lines
  [address.addressLine1, address.addressLine2, address.addressLine3].forEach(
    (line) => {
      if (isValidString(line)) {
        lines.push(normalizeString(line));
      }
    }
  );

  // City with state/province and postal code
  const locationParts: string[] = [];

  if (isValidString(address.city)) {
    locationParts.push(normalizeString(address.city));
  }

  if (isValidString(address.state) || isValidString(address.province)) {
    locationParts.push(normalizeString(address.state || address.province));
  }

  if (isValidString(address.postalCode) || isValidString(address.zipCode)) {
    locationParts.push(normalizeString(address.postalCode || address.zipCode));
  }

  if (locationParts.length > 0) {
    lines.push(locationParts.join(" "));
  }

  // Country
  if (options.includeCountry && isValidString(address.country)) {
    const country = options.upperCaseCountry
      ? normalizeString(address.country).toUpperCase()
      : normalizeString(address.country);
    lines.push(country);
  }

  return combineAddressWithDistance(lines, address, options);
};

/**
 * Validates address completeness and returns missing required fields
 */
const validateAddress = (
  address: Address
): { isValid: boolean; missingFields: string[]; warnings: string[] } => {
  const missingFields: string[] = [];
  const warnings: string[] = [];

  // Basic required fields for universal format
  if (!isValidString(address.addressLine1)) {
    missingFields.push("addressLine1");
  }

  if (!isValidString(address.city)) {
    missingFields.push("city");
  }

  // Postal code validation (basic format check)
  if (isValidString(address.postalCode) || isValidString(address.zipCode)) {
    const postal = normalizeString(address.postalCode || address.zipCode);
    // Basic validation - just check if it contains letters or numbers
    if (!/^[A-Z0-9\s-]+$/i.test(postal)) {
      warnings.push("Postal code contains invalid characters");
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    warnings,
  };
};

/**
 * Main address parsing function with comprehensive formatting options
 */
export function parseAddress(
  address: Address | null | undefined,
  options: AddressFormatOptions = {}
): AddressParseResult {
  // Handle null/undefined input
  if (!address) {
    return {
      formatted: "",
      lines: [],
      isValid: false,
      missingFields: ["address"],
      warnings: ["Address object is null or undefined"],
    };
  }

  // Merge with default options
  const config: Required<AddressFormatOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  // Use universal format for all addresses
  const lines = formatUniversalAddress(address, config);

  // Validation
  const validation = validateAddress(address);

  // Join lines based on compact mode
  const formatted = config.compactMode
    ? lines.join(config.separator)
    : lines.join("\n");

  return {
    formatted,
    lines,
    isValid: validation.isValid,
    missingFields: validation.missingFields,
    warnings: validation.warnings,
  };
}

/**
 * Convenience function for formatting address with distance (matches your current usage)
 */
export function formatAddressWithDistance(
  address: Address | null | undefined,
  options: Omit<AddressFormatOptions, "includeDistance"> = {}
): string {
  const result = parseAddress(address, {
    ...options,
    includeDistance: true,
    compactMode: true,
  });
  return result.formatted;
}

/**
 * Utility function to get just the distance string
 */
export function formatDistanceOnly(
  distance: number | null | undefined,
  unit: DistanceUnit = DistanceUnit.MILES,
  precision: number = 1
): string {
  if (typeof distance !== "number" || distance < 0) {
    return "0";
  }
  return `${distance.toFixed(precision)} ${unit}`;
}

/**
 * Utility function for the exact format in your example
 */
export function formatLocationWithDistance(
  address: Address | null | undefined,
  options: AddressFormatOptions = {}
): string {
  if (!address) return "";

  const distance = formatDistanceOnly(
    address.distance,
    options.distanceUnit,
    options.distancePrecision
  );
  const addressStr = formatAddressSimple(address);

  if (addressStr) {
    return `${distance}, ${addressStr}`;
  }

  return distance;
}

/**
 * Convenience function for simple address formatting
 */
export function formatAddressSimple(
  address: Address | null | undefined
): string {
  return parseAddress(address).formatted;
}

/**
 * Utility function to check if an address is complete
 */
export function isAddressComplete(
  address: Address | null | undefined
): boolean {
  const result = parseAddress(address);
  return result.isValid;
}
