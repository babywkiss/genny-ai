"use client";

import { IconExclamationCircle } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function ErrorModal(props: {
	message: string;
	shown: boolean;
	setShown: (shown: boolean) => void;
}) {
	const [mounted, setMounted] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted && props.shown) {
			modalRef.current?.animate(
				[
					{
						transform: "scale(0%)",
						opacity: 0,
					},
					{
						transform: "scale(100%)",
						opacity: 100,
					},
				],
				{ duration: 200 },
			);
		}
	}, [mounted, props.shown]);

	return mounted && props.shown
		? createPortal(
				<div className="flex absolute justify-center items-center w-full h-full">
					<div
						ref={modalRef}
						className="flex flex-col gap-5 justify-between p-5 w-96 bg-white rounded-lg shadow-xl aspect-square"
					>
						<div className="flex gap-3 items-center">
							<IconExclamationCircle size={50} className="text-red-500" />
							<span className="text-lg font-bold">Что-то пошло не так</span>
						</div>
						<span>{props.message}</span>
						<button
							onClick={() => {
								props.setShown(false);
							}}
							className="button"
						>
							Продолжить
						</button>
					</div>
				</div>,
				document.body,
			)
		: null;
}
