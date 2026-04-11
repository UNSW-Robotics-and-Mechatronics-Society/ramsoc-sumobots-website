export const MEMBER_LIMITS = {
  standard: { min: 3, max: 6 },
  open: { min: 2, max: 6 },
} as const;

export type TeamCategory = keyof typeof MEMBER_LIMITS;
