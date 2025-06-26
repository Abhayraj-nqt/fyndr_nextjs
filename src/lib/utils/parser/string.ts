export type CaseTypeProps =
  | "upper-case"
  | "lower-case"
  | "title-case"
  | "camel-case"
  | "pascal-case"
  | "snake-case"
  | "kebab-case"
  | "constant-case"
  | "dot-case"
  | "sentence-case"
  | "alternating-case"
  | "inverse-case"
  | "capitalize";
export function parseStringCase({
  input,
  caseType,
}: {
  input: string;
  caseType: CaseTypeProps;
}): string {
  const normalizedInput = input.trim();
  switch (caseType) {
    case "upper-case":
      return normalizedInput.toUpperCase();
    case "lower-case":
      return normalizedInput.toLowerCase();
    case "title-case":
      return toTitleCase(normalizedInput);
    case "camel-case":
      return toCamelCase(normalizedInput);
    case "pascal-case":
      return toPascalCase(normalizedInput);
    case "snake-case":
      return toSnakeCase(normalizedInput);
    case "kebab-case":
      return toKebabCase(normalizedInput);
    case "constant-case":
      return toConstantCase(normalizedInput);
    case "dot-case":
      return toDotCase(normalizedInput);
    case "sentence-case":
      return toSentenceCase(normalizedInput);
    case "capitalize":
      return toCapitalize(normalizedInput);
    case "alternating-case":
      return toAlternatingCase(normalizedInput);
    case "inverse-case":
      return toInverseCase(normalizedInput);
    default:
      throw new Error(`Unsupported case type: ${caseType}`);
  }
}
// Helper to split into words correctly
function splitWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → space
    .replace(/[_\-.@#!$%^&*()+={}[\]|\\:";'<>?,/~`]+/g, " ") // special chars → space
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0); // filter out empty strings
}
// Helper functions for each case type
function toTitleCase(str: string): string {
  const words = splitWords(str);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
function toCamelCase(str: string): string {
  const words = splitWords(str);
  return words
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}
function toPascalCase(str: string): string {
  const words = splitWords(str);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}
function toSnakeCase(str: string): string {
  const words = splitWords(str);
  return words.map((word) => word.toLowerCase()).join("_");
}
function toKebabCase(str: string): string {
  const words = splitWords(str);
  return words.map((word) => word.toLowerCase()).join("-");
}
function toConstantCase(str: string): string {
  const words = splitWords(str);
  return words.map((word) => word.toUpperCase()).join("_");
}
function toDotCase(str: string): string {
  const words = splitWords(str);
  return words.map((word) => word.toLowerCase()).join(".");
}
function toSentenceCase(str: string): string {
  const trimmed = str.trim().toLowerCase();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
function toCapitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function toAlternatingCase(str: string): string {
  let index = 0;
  return str
    .split("")
    .map((char) => {
      if (/\s/.test(char)) {
        return char;
      }
      const result = index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
      index++;
      return result;
    })
    .join("");
}
function toInverseCase(str: string): string {
  return str
    .split("")
    .map((char) =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    )
    .join("");
}
