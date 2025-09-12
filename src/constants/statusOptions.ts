import { LeadStatus } from "../enum/LeadStatus";

export const STATUS_OPTIONS = [
  { label: "All", value: null },
  { label: LeadStatus.New, value: LeadStatus.New },
  { label: LeadStatus.Contacted, value: LeadStatus.Contacted },
] as const;
