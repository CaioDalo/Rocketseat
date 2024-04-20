import ReactPlayer from "react-player";
import { next } from "../store/slices/player";
import { useCurrentLesson } from "../helper";
import { useAppDispatch } from "../store";

export function VideoPlayer() {
	const dispatch = useAppDispatch();

	const { currentLesson } = useCurrentLesson();

	function handleNext() {
		dispatch(next());
	}

	return (
		<div className="w-full bg-zinc-950 aspect-video">
			<ReactPlayer
				width="100%"
				height="100%"
				controls
				onEnded={handleNext}
				playing
				url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
			/>
		</div>
	);
}
