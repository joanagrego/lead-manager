// Using a const object instead of a TypeScript enum because 
// enums are not allowed when 'erasableSyntaxOnly' is enabled (e.g., in Vite or SWC setups).
// This approach preserves type safety and allows enum-like references at runtime.
export const LeadStatus = {
  New: "New",
  Contacted: "Contacted",
} as const;

export type LeadStatus = typeof LeadStatus[keyof typeof LeadStatus];
