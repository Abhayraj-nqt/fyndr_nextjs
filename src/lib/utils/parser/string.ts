type CaseTypeProps =
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

// Helper functions for each case type

function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9]/g, "");
}

function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9]/g, "");
}

function toSnakeCase(str: string): string {
  return str
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_")
    .replace(/_{2,}/g, "_")
    .replace(/^_|_$/g, "");
}

function toKebabCase(str: string): string {
  return str
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function toConstantCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}

function toDotCase(str: string): string {
  return str
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join(".")
    .replace(/\.{2,}/g, ".")
    .replace(/^\.|\.$/g, "");
}

function toSentenceCase(str: string): string {
  const trimmed = str.trim().toLowerCase();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function toCapitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function toAlternatingCase(str: string): string {
  return str
    .split("")
    .map((char, index) =>
      index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
    )
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
