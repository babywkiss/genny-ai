"use server";

import { ollamaGenerateNames } from "./lib/ai";

// const randUint = (min: number, max: number) =>
// 	min + Math.floor(Math.random() * (max - min));

// const getDummyNames = () =>
// 	Array.from({ length: randUint(5, 20) }, () =>
// 		Array.from({ length: randUint(5, 20) }, () =>
// 			String.fromCharCode(randUint("a".charCodeAt(0), "z".charCodeAt(0))),
// 		).join(""),
// 	);

export type GenerateNamesResult = {
	prompt: string;
	names: string[] | null;
	err: boolean;
} | null;

export default async function generateNames(
	prevState: GenerateNamesResult,
	formData: FormData,
): Promise<GenerateNamesResult> {
	const prompt = formData.get("prompt")?.toString() ?? "";

	let names = prevState?.names ?? null;
	let err = false;
	try {
		names = await ollamaGenerateNames(prompt);
	} catch {
		err = true;
	}
	return { names, prompt, err };
}
