import { Handlee } from "next/font/google";
import Link from "next/link";

const handlee = Handlee({ subsets: ["latin"], weight: "400" });

export default function Header() {
	return (
		<div className="flex justify-between items-center p-5">
			<div></div>
			<Link
				href="/"
				className="py-1 px-5 text-xl font-bold text-white bg-teal-600 rounded-tl-xl rounded-br-xl transition-all hover:px-9 hover:bg-gradient-to-r hover:from-teal-600 group hover:to-teal-100/20"
			>
				<span
					className={`block uppercase transition-all group-hover:scale-90 ${handlee.className}`}
				>
					genny-ai
				</span>
			</Link>
			<div></div>
		</div>
	);
}
