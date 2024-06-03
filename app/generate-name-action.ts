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
