// Using a const object instead of a TypeScript enum because
// enums are not allowed when 'erasableSyntaxOnly' is enabled (e.g., in Vite or SWC setups).
// This approach preserves type safety and allows enum-like references at runtime.
export const OpportunityStage = {
  New: "New",
  Contacted: "Contacted",
  Qualified: "Qualified",
  Proposal: "Proposal",
  Closed: "Closed",
} as const;

export type OpportunityStage =
  (typeof OpportunityStage)[keyof typeof OpportunityStage];
