import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { resume, run, reset, stop } from "../store/slices/timer/timerSlice";

export const Timer = () => {

    const { hours, minutes, seconds, isRunning } = useSelector(state => state.timer);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const seconds = event.target.value.replace(/\D/g, '');
        const date = new Date(null);
        if (seconds.length > 0)
            date.setSeconds(seconds);
        else
            date.setSeconds(0);

        const payload = {
            hours: date.getUTCHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        }
        dispatch(resume(payload));
    }

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    dispatch(resume({ hours, minutes, seconds: seconds - 1 }));
                } else if (minutes > 0) {
                    dispatch(resume({ hours, minutes: minutes - 1, seconds: 59 }));
                } else if (hours > 0) {
                    dispatch(resume({ hours: hours - 1, minutes: 59, seconds: 59 }));
                }
            }, 1000);
        }

        if (hours === 0 && minutes === 0 && seconds === 0) {
            dispatch(reset())
        }

        return () => clearInterval(interval);
    }, [seconds, minutes, hours, isRunning]);

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-5 py-5 flex-col text-white">
            <div className="text-3xl text-center mb-10 font-light">
                <label >Enter your seconds </label>
                <input
                    className="w-1/4 bg-green-100 border border-green-600 text-green-600 rounded-lg p-1.5 text-2xl font-medium"
                    type="text"
                    onChange={handleChange}
                />
            </div>

            <div className="text-8xl text-center flex w-full items-center justify-center mb-10">
                <div className="w-40 mx-1 p-2 bg-white text-green-600 rounded-lg">
                    <div class="font-mono leading-none" x-text="hours">
                        {hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                    </div>
                    <div class="font-mono uppercase text-sm leading-none">Hours</div>                
                </div> 
                <div className="w-40 mx-1 p-2 bg-white text-green-600 rounded-lg">
                    <div class="font-mono leading-none" x-text="minutes">
                        {minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                    </div>
                    <div class="font-mono uppercase text-sm leading-none">minutes</div>                
                </div> 
                <div className="w-40 mx-1 p-2 bg-white text-green-600 rounded-lg">
                    <div class="font-mono leading-none" x-text="seconds">
                        {seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
                    </div>
                    <div class="font-mono uppercase text-sm leading-none">seconds</div>                
                </div>                              
            </div>

            <div>
                <button 
                    class="bg-white hover:bg-green-100 text-green-600 font-bold py-2 px-4 rounded inline-flex items-center mr-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={isRunning} onClick={() => dispatch(run())}    
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="true" viewBox="0 0 24 24" class="w-6 h-6 fill-green-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>                            
                </button>
                <button 
                    class="bg-white hover:bg-green-100 text-green-600 font-bold py-2 px-4 rounded inline-flex items-center mr-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={!isRunning} onClick={() => dispatch(stop())}
                >                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="true" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    </svg>                 
                </button>
                <button 
                    class="bg-white hover:bg-green-100 text-green-600 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => dispatch(reset())}    
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="true" viewBox="0 0 24 24" class="w-6 h-6 fill-green-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                    </svg>
                </button>
            </div>               
        </div>

    )
}
