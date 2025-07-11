'use server';

import { summarizeSupportCase } from '@/ai/flows/summarize-support-cases';
import { z } from 'zod';

const SummarizeSchema = z.object({
  caseDetails: z.string().min(10, { message: "Case details must be at least 10 characters long." }),
});

type SummarizeState = {
    summary: string;
    error: string;
}

export async function handleSummarization(prevState: SummarizeState, formData: FormData): Promise<SummarizeState> {
  const validatedFields = SummarizeSchema.safeParse({
    caseDetails: formData.get('caseDetails'),
  });

  if (!validatedFields.success) {
    return {
      summary: '',
      error: validatedFields.error.flatten().fieldErrors.caseDetails?.[0] || 'Invalid input.',
    };
  }
  
  try {
    const result = await summarizeSupportCase({ caseDetails: validatedFields.data.caseDetails });
    if (result.summary) {
        return { summary: result.summary, error: '' };
    }
    return { summary: '', error: 'Failed to generate a summary from the provided text.' };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { summary: '', error: `Failed to generate summary: ${errorMessage}` };
  }
}
