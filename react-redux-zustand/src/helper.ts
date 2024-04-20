import { userAppSelector } from "./store";

export const useCurrentLesson = () => {
  return userAppSelector((state) => {
		const { currentModuleIndex, currentLessonIndex } = state.player;

		const currentModule = state.player.course?.modules[currentModuleIndex];
		const currentLesson =
			state.player.course?.modules[currentModuleIndex].lessons[
				currentLessonIndex
			];

		return { currentLesson, currentModule };
	});
}