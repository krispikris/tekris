import { useEffect, useRef } from 'react';

// custom hook by Dan Abramov
export const useInterval = (callback, delay) => {       // callback is a function executed after at each interval | delay is in milliseconds
    const savedCallback = useRef();                     // useRef stores the latest callback func | initial value is empty (undefined)

    // remembering the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // setting up the interval
    useEffect(() =>{
        function tick() {                               // tick func calls the latest callback func
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);

            return () => clearInterval(id);             // aka cleanup func clears the interval
        }
    }, [delay])
};