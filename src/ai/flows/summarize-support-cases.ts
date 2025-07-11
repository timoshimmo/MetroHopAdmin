// This is a server-side file.
'use server';

/**
 * @fileOverview Summarizes customer support cases using an LLM tool.
 *
 * - summarizeSupportCase - A function that takes customer support case details and returns a summary.
 * - SummarizeSupportCaseInput - The input type for the summarizeSupportCase function.
 * - SummarizeSupportCaseOutput - The return type for the summarizeSupportCase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the support case details.
const SummarizeSupportCaseInputSchema = z.object({
  caseDetails: z.string().describe('Details of the customer support case, including customer description of problem, and resolution.'),
});
export type SummarizeSupportCaseInput = z.infer<typeof SummarizeSupportCaseInputSchema>;

// Define the output schema for the summary.
const SummarizeSupportCaseOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the customer support case.'),
});
export type SummarizeSupportCaseOutput = z.infer<typeof SummarizeSupportCaseOutputSchema>;

// Exported function to summarize a support case.
export async function summarizeSupportCase(input: SummarizeSupportCaseInput): Promise<SummarizeSupportCaseOutput> {
  return summarizeSupportCaseFlow(input);
}

// Define the prompt for summarizing the support case.
const summarizeSupportCasePrompt = ai.definePrompt({
  name: 'summarizeSupportCasePrompt',
  input: {schema: SummarizeSupportCaseInputSchema},
  output: {schema: SummarizeSupportCaseOutputSchema},
  prompt: `Summarize the following customer support case in a concise manner, highlighting the key issue and resolution:\n\n{{{caseDetails}}}`,
});

// Define the Genkit flow for summarizing the support case.
const summarizeSupportCaseFlow = ai.defineFlow(
  {
    name: 'summarizeSupportCaseFlow',
    inputSchema: SummarizeSupportCaseInputSchema,
    outputSchema: SummarizeSupportCaseOutputSchema,
  },
  async input => {
    const {output} = await summarizeSupportCasePrompt(input);
    return output!;
  }
);
