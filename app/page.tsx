"use client";

import { IconChevronLeft, IconReload, IconSparkles } from "@tabler/icons-react";
import { useActionState, useEffect, useState } from "react";
import generateNames, { GenerateNamesResult } from "./generate-name-action";
import NameCard from "./name-card";
import zones from "./zones.json";
import { ErrorModal } from "./error-modal";

function PromptForm(props: {
	result: GenerateNamesResult;
	setResult?: (result: GenerateNamesResult) => void;
}) {
	const [result, action, pending] = useActionState(generateNames, props.result);

	useEffect(() => {
		if (result) props?.setResult?.(result);
	}, [result]);

	return (
		<form
			action={action}
			className="flex flex-col gap-2 justify-center items-center w-full md:w-1/3"
		>
			{pending ? (
				<>
					<div className="spinner" />
					<span className="text-lg text-slate-800">Генерация ...</span>
				</>
			) : (
				<>
					<textarea
						minLength={10}
						name="prompt"
						rows={5}
						placeholder="Опишите идею для вашего веб сайта"
						className="w-full resize-none input"
					/>
					<button type="submit" className="w-full font-bold button">
						Сгенерировать
						<IconSparkles />
					</button>
				</>
			)}
		</form>
	);
}

function ReloadForm(props: {
	result: GenerateNamesResult | null;
	setResult?: (result: GenerateNamesResult) => void;
}) {
	const [result, action, pending] = useActionState(generateNames, props.result);

	useEffect(() => {
		if (result) props?.setResult?.(result);
	}, [result]);

	return (
		<form action={action}>
			<button
				disabled={pending}
				type="submit"
				className={`font-bold w-fit button ${pending && "bg-yellow-700"}`}
			>
				{pending ? "Регенерация ..." : "Повторить"}
				<IconReload className={`${pending && "animate-spin"}`} />
			</button>
			<input readOnly hidden name="prompt" value={result?.prompt} />
		</form>
	);
}

function Promo() {
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold leading-normal">
				<span className="p-3 bg-teal-100 rounded-lg">GENNY-AI</span> - Генератор
				доменных имен
			</h1>
			<span className="text-lg">
				Введите идею для вашего сайта, мы придумаем вам доменное имя.
			</span>
		</div>
	);
}

function BackButton(props: {
	setResult: (result: GenerateNamesResult | null) => void;
}) {
	return (
		<button className="p-1 text-teal-600 bg-transparent button">
			<IconChevronLeft
				size={35}
				onClick={() => {
					props.setResult(null);
				}}
			/>
		</button>
	);
}

export default function Page() {
	const [result, setResult] = useState<GenerateNamesResult | null>(null);
	const [errShown, setErrShown] = useState(false);

	useEffect(() => {
		if (result?.err) setErrShown(true);
	}, [result]);

	return (
		<>
			<ErrorModal
				shown={errShown}
				setShown={setErrShown}
				message="Ошибка при генерации, попробуйте снова"
			/>
			{result && result.names ? (
				<div className="flex flex-col flex-1 gap-5">
					<div className="flex gap-3 items-center">
						<BackButton setResult={setResult} />
						<div className="text-xl font-bold text-slate-700">
							Идеи по запросу:
							<span className="font-normal"> "{result.prompt}"</span>
						</div>
					</div>
					<ReloadForm result={result} setResult={setResult} />
					<ul className="flex flex-col flex-wrap flex-1 gap-3">
						{result.names.map((name) => (
							<li key={name}>
								<NameCard name={name} possibleZones={zones} />
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="flex flex-col flex-1 gap-5 justify-around items-center md:flex-row">
					<Promo />
					<PromptForm result={result} setResult={setResult} />
				</div>
			)}
		</>
	);
}
