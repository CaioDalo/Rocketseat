/* import { useCurrentLesson } from "../helper";
import { userAppSelector } from "../store"; */

import { useCurrentLesson, useStore } from "../zustand-store";

export function Header() {
	/* const { currentModule, currentLesson } = useCurrentLesson();
	const isCourseLoading = userAppSelector((state) => state.player.isLoading); */

	const { currentModule, currentLesson } = useCurrentLesson();
	const isLoading = useStore((state) => state.isLoading);

	if (isLoading) {
		return <h1 className="text-2xl font-bold">Carregando...</h1>;
	}

	return (
		<header className="flex flex-col gap-1">
			<h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
			<span className="text-sm text-zinc-400">
				Módulo: {currentModule?.title}
			</span>
		</header>
	);
}
