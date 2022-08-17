import { DateTime, datetime } from "../deps.ts";
import { CiNiiResearchError } from "../error.ts";

export const CiNiiFormatDate = (
  date: Date | DateTime | undefined,
): string | undefined => {
  if (date === undefined) {
    return undefined;
  }
  if (date instanceof Date) {
    const d = datetime(date);
    if (d.month === 0) {
      return d.format("YYYY");
    } else {
      return d.format("YYYYMM");
    }
  } else if (date instanceof DateTime) {
    if (date.month === 0) {
      return date.format("YYYY");
    } else {
      return date.format("YYYYMM");
    }
  } else {
    throw CiNiiResearchError.UnknownType;
  }
};
