import qs from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const queryString = qs.parse(params);

  queryString[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

export const removeKeysFromUrlQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};

export const slugify = (path: string): string => {
  const parts = path.split("/");
  const slugifiedParts = parts.map((part) => {
    if (part === "") return part;
    return slugifyUtil(part);
  });
  return slugifiedParts.join("/");
};

// Helper function to create slug
const slugifyUtil = (str: string | number): string => {
  return (
    str
      .toString()
      .normalize("NFD") // Normalize to decomposed form for handling accents
      .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\-\/]+/g, "") // Remove all non-word chars (except hyphens and slashes)
      .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/-+\//g, "/") // Clean up hyphens before slashes
      .replace(/\/-+/g, "/") // Clean up hyphens after slashes
      .replace(/^-+/, "") // Remove leading hyphens
      .replace(/-+$/, "")
  ); // Remove trailing hyphens
};
