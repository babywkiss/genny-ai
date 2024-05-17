import { useState } from "react";
import { checkAvailability } from "./lib/hb";
import Link from "next/link";
import {
	IconCheck,
	IconChevronDown,
	IconChevronUp,
	IconX,
} from "@tabler/icons-react";

function DomainInfo(props: { domain: string }) {
	const [loading, setLoading] = useState(false);
	const [available, setIsAvailable] = useState<null | boolean>(null);

	const handleCheck = async () => {
		setLoading(true);
		setIsAvailable(await checkAvailability(props.domain));
		setLoading(false);
	};
	if (loading) return <div className="h-5 border-4 spinner" />;
	if (available === null)
		return (
			<button
				onClick={handleCheck}
				className="py-1 px-2 text-sm text-teal-600 bg-white button"
			>
				Проверить
			</button>
		);
	if (available)
		return (
			<Link className="flex gap-1 items-center text-green-500" href={"/"}>
				<span>Доступно</span>
				<IconCheck />
			</Link>
		);
	if (available === false)
		return (
			<span className="flex gap-1 items-center text-red-500">
				Занят
				<IconX />
			</span>
		);
}

function ZonesInfo(props: { name: string; possibleZones: string[] }) {
	return (
		<div className="p-3">
			<ul className="overflow-auto max-h-96">
				{props.possibleZones.map((zone) => (
					<li
						className="flex gap-3 justify-between items-center w-96"
						key={zone}
					>
						<span className="text-lg">
							{props.name}
							<span className="font-bold">{zone}</span>
						</span>
						<DomainInfo domain={`${props.name}${zone}`} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default function NameCard(props: {
	name: string;
	possibleZones: string[];
}) {
	const [showZoneInfo, setShowZoneInfo] = useState(false);
	return (
		<div>
			<button
				className="flex text-black bg-white button group"
				onClick={() => setShowZoneInfo((prev) => !prev)}
			>
				<span className="text-2xl font-bold">{props.name}</span>
				{showZoneInfo ? (
					<IconChevronUp className="text-teal-600" size={40} />
				) : (
					<IconChevronDown className="text-teal-600" size={40} />
				)}
				<span className="text-teal-600 opacity-0 transition-all scale-x-0 group-hover:opacity-100 group-hover:scale-x-100">
					{showZoneInfo ? "Скрыть" : "Подробнее"}
				</span>
			</button>
			{showZoneInfo ? <ZonesInfo {...props} /> : null}
		</div>
	);
}
