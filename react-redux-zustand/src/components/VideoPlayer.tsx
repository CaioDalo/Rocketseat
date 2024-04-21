import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../zustand-store";
/* import { store } from "../store";
import { next } from "../store/slices/player";
import { useCurrentLesson } from "../helper";
import { useAppDispatch, userAppSelector } from "../store"; */

export function VideoPlayer() {
	/* const dispatch = useAppDispatch();
	const { currentLesson } = useCurrentLesson();
	const isCourseLoading = userAppSelector((state) => state.player.isLoading); */

	const { isLoading, next } = useStore((store) => {
		return {
			isLoading: store.isLoading,
			next: store.next,
		};
	});

	const { currentLesson } = useCurrentLesson();

	function handleNext() {
		next();
	}

	return (
		<div className="w-full bg-zinc-950 aspect-video">
			{isLoading ? (
				<div className="flex h-full items-center justify-center">
					<Loader className="w-6 h-6 text-zinc-400 animate-spin" />
				</div>
			) : (
				<ReactPlayer
					width="100%"
					height="100%"
					controls
					onEnded={handleNext}
					playing
					url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
				/>
			)}
		</div>
	);
}
