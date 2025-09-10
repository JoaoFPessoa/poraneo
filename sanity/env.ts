export const apiVersion = "2024-01-01";

export const dataset = assertValue(
  "production",
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  "taed4kw5",
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
