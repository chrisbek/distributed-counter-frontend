import React, {useState, useEffect, useRef} from 'react';

/*
https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
class TimeService {
    useInterval(callback, delayInMilliseconds) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delayInMilliseconds !== null) {
                let id = setInterval(tick, delayInMilliseconds);
                return () => clearInterval(id);
            }
        }, [delayInMilliseconds]);
    }
}

export default new TimeService();