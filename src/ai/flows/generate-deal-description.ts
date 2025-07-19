'use server';
/**
 * @fileOverview Generates a deal description using AI.
 *
 * - generateDealDescription - A function that creates a deal description from a title and an optional image.
 * - GenerateDealDescriptionInput - The input type for the generateDealDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit/zod';

const GenerateDealDescriptionInputSchema = z.object({
  dealTitle: z.string().describe('The title of the deal.'),
  imageDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type GenerateDealDescriptionInput = z.infer<
  typeof GenerateDealDescriptionInputSchema
>;

export async function generateDealDescription(
  input: GenerateDealDescriptionInput
): Promise<string> {
  return generateDealDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDealDescriptionPrompt',
  input: { schema: GenerateDealDescriptionInputSchema },
  output: { schema: z.string() },
  prompt: `You are an AI assistant that helps users create clear and concise deal descriptions for an escrow service.

Based on the provided deal title and optional image, write a description for the deal. The description should be neutral, clear, and outline the key deliverables or items in the deal.

Keep it simple and direct. Do not add any extra formatting.

Deal Title: {{{dealTitle}}}
{{#if imageDataUri}}
Product Image: {{media url=imageDataUri}}
{{/if}}
`,
});

const generateDealDescriptionFlow = ai.defineFlow(
  {
    name: 'generateDealDescriptionFlow',
    inputSchema: GenerateDealDescriptionInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
