// The FDE question bank (≈165 KB JSON). Kept apart from the pure exam logic in
// fde-exam.ts so that only code which really needs the questions pulls this
// module in — the academy shell loads it lazily with the exam runner.
import BANK from "@/content/fde-questions.json";
import type { FdeAttribution, FdeQuestion } from "@/lib/fde-exam";

export const FDE_QUESTIONS = BANK.questions as FdeQuestion[];
export const FDE_ATTRIBUTION = BANK.attribution as FdeAttribution;
