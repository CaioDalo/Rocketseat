import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";
import { useAppDispatch } from "..";

interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
}

const initialState: PlayerState = { 
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

export const loadCourse = createAsyncThunk('player/load', async () => {
    const response = await api.get("/course/1")
    return response.data
  }
)

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action) => {
      state.currentModuleIndex = action.payload.currentModuleIndex;
      state.currentLessonIndex = action.payload.currentLessonIndex;
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if(nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex]

        if(nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLessonIndex = 0;
        }
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
    })
  }
})

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;
