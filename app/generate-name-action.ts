"use server";

import { ollamaGenerateNames } from "./lib/ai";

export type GenerateNamesResult = {
	prompt: string;
	names: { ru: string; en: string }[] | null;
	err: boolean;
} | null;

export default async function generateNames(
	prevState: GenerateNamesResult,
	formData: FormData,
): Promise<GenerateNamesResult> {
	// return {
	// 	prompt: "sdkfasd",
	// 	names: [{ ru: "имя", en: "name" }],
	// 	err: false,
	// };
	const prompt = formData.get("prompt")?.toString() ?? "";
	const minLength = Number(formData.get("minLength"));
	const maxLength = Number(formData.get("maxLength"));
	const quantity = Number(formData.get("quantity"));
	console.log(formData);

	let names = prevState?.names ?? null;
	let err = false;
	try {
		names = await ollamaGenerateNames(prompt, {
			minLength,
			maxLength,
			quantity,
		});
	} catch {
		err = true;
	}
	return { names, prompt, err };
}
