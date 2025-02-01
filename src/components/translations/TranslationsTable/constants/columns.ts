export const columns = [
  { name: "Namespace", uid: "namespace", sortable: true },
  { name: "Key", uid: "key", sortable: true },
  { name: "Created At", uid: "createdAt", sortable: true },
  { name: "Last Updated", uid: "lastUpdatedAt", sortable: true },
  { name: "Language", uid: "language", sortable: true },
  { name: "Value", uid: "value", sortable: true },
  { name: "Confidence Score", uid: "confidenceScore", sortable: true },
  { name: "Actions", uid: "actions" },
];

export type ColumnsKey =
  | "namespace"
  | "key"
  | "createdAt"
  | "lastUpdatedAt"
  | "language"
  | "value"
  | "confidenceScore"
  | "actions";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "namespace",
  "key",
  "createdAt",
  "lastUpdatedAt",
  "language",
  "value",
  "confidenceScore",
  "actions",
];
