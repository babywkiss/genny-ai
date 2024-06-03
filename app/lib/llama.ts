import { fileURLToPath } from "url";
import path from "path";
import {
	LlamaModel,
	LlamaContext,
	LlamaChatSession,
	LlamaJsonSchemaGrammar,
	LlamaChatPromptWrapper,
} from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
	modelPath: path.join(__dirname, "models", "model-q4_K.gguf"),
});

const grammar = new LlamaJsonSchemaGrammar({
	type: "array",
	items: {
		type: "string",
	},
} as const);

const context = new LlamaContext({ model, contextSize: 1024 });
const session = new LlamaChatSession({
	context,
	promptWrapper: new LlamaChatPromptWrapper(),
});

const q =
	"придумай 10 необычных доменных имен на кириллице для сайта по аренде велопроката в полоцке, напиши ответ в формате JSON";
console.log("User: " + q);

const a = await session.prompt(q, {
	grammar,
	maxTokens: context.getContextSize(),
});
console.log("AI: " + a);

const parsedA = grammar.parse(a);
console.log(parsedA);
