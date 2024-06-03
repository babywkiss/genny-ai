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

	const [quantity, setQuantity] = useState(10);

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
						required
						rows={5}
						placeholder="Опишите идею для вашего веб сайта"
						className="w-full resize-none input"
					/>
					<div className="flex flex-col gap-3 py-3 w-full">
						<span>Предпочитаемая длина имен:</span>
						<div className="flex gap-3 justify-between items-center w-full">
							<span>от</span>
							<input
								name="minLength"
								min={3}
								required
								defaultValue={3}
								type="number"
								className="w-full input"
							/>
							<span>до</span>
							<input
								name="maxLength"
								max={15}
								required
								defaultValue={15}
								type="number"
								className="w-full input"
							/>
						</div>
						<span>
							Количество имен:
							<span className="font-bold"> {quantity}</span>
						</span>
						<div className="w-full">
							<input
								onChange={(e) => {
									setQuantity(Number(e.target.value));
								}}
								value={quantity}
								required
								min={3}
								max={15}
								name="quantity"
								className="range"
								type="range"
							/>
							<div className="flex justify-between">
								<span className="py-0.5 px-2 text-sm text-white bg-teal-800 rounded-lg">
									3
								</span>
								<span className="py-0.5 px-2 text-sm text-white bg-teal-800 rounded-lg">
									15
								</span>
							</div>
						</div>
					</div>
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
