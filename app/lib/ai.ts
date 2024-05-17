import {
	generateObject,
	jsonObjectPrompt,
	ollama,
	zodSchema,
} from "modelfusion";
import { z } from "zod";

export const ollamaGenerateNames = async (prompt: string) => {
	const { names } = await generateObject({
		model: ollama
			.ChatTextGenerator({
				model: "llama3",
			})
			.asObjectGenerationModel(jsonObjectPrompt.text()),
		schema: zodSchema(
			z.object({
				names: z.array(
					z.object({
						name: z.string(),
					}),
				),
			}),
		),
		prompt: `List 10 brand names for a website with following description: "${prompt}"`,
	});

	return names
		.map(({ name }) => name.toLowerCase().replace(/[^a-zа-я0-9]/gi, ""))
		.filter(Boolean);
};
