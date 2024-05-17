import type { Config } from "tailwindcss";

const config: Config = {
	future: {
		hoverOnlyWhenSupported: true,
	},
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	plugins: [],
};
export default config;
