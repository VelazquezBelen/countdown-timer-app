import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        isRunning: false,
    },
    reducers: {
        run: (state, action) => {
            state.isRunning = true; 
        },
        stop: (state, action) => {
            state.isRunning = false;
        },
        reset: (state, action) => {
            state.hours = 0;
            state.minutes = 0;
            state.seconds = 0;
            state.isRunning = false;            
        },
        resume: (state, action) => {
            state.hours = action.payload.hours;
            state.minutes = action.payload.minutes;
            state.seconds = action.payload.seconds;
        },
    }
})

export const { run, stop, reset, resume } = timerSlice.actions;