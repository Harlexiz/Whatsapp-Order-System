export function getPagination(query: { pageNo?: unknown; limit?: unknown }) {
  const toPositiveInt = (value: unknown, fallback: number) => {
    const n = Number(value);
    return Number.isInteger(n) && n > 0 ? n : fallback;
  };

  const formatedPageNo = toPositiveInt(query.pageNo, 1);
  const formatedLimit = Math.min(toPositiveInt(query.limit, 6), 100);
  const skip = (formatedPageNo - 1) * formatedLimit;

  return { formatedPageNo, formatedLimit, skip };
}