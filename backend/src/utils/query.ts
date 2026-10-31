import { AppError } from "../errors/AppError.js";
import { parsePositiveInt } from "./parsePositiveInt.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const parseOptionalPositiveInt = (
  value: unknown,
  field: string,
  defaultValue: number
): number => {
  if (value === undefined) {
    return defaultValue;
  }

  const parsed = parsePositiveInt(value);

  if (parsed === null) {
    throw new AppError(
      400,
      "INVALID_QUERY",
      `Le paramètre ${field} doit être un nombre entier positif.`
    );
  }

  return parsed;
};

export const parsePositiveIntFields = <K extends string>(
  query: Record<string, unknown>,
  fields: readonly K[]
): Record<K, number> => {
  const result = {} as Record<K, number>;
  const invalidFields: K[] = [];

  for (const field of fields) {
    const parsed = parsePositiveInt(query[field]);

    if (parsed === null) {
      invalidFields.push(field);
    } else {
      result[field] = parsed;
    }
  }

  if (invalidFields.length > 0) {
    const fieldList = invalidFields.join(", ");
    const message =
      invalidFields.length === 1
        ? `Le paramètre ${fieldList} est obligatoire, unique et doit être un nombre entier positif.`
        : `Les paramètres ${fieldList} sont obligatoires, uniques et doivent être des nombres entiers positifs.`;

    throw new AppError(400, "INVALID_QUERY", message);
  }

  return result;
};

export const parsePagination = (query: Record<string, unknown>) => {
  const page = parseOptionalPositiveInt(query.page, "page", DEFAULT_PAGE);
  const limit = parseOptionalPositiveInt(query.limit, "limit", DEFAULT_LIMIT);

  if (limit > MAX_LIMIT) {
    throw new AppError(
      400,
      "INVALID_QUERY",
      `Le paramètre limit doit être compris entre 1 et ${MAX_LIMIT}.`
    );
  }

  const offset = (page - 1) * limit;

  if (!Number.isSafeInteger(offset)) {
    throw new AppError(
      400,
      "INVALID_QUERY",
      "Le paramètre page est trop grand."
    );
  }

  return { page, limit };
};
