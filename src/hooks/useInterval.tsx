import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number) => {
  const intervalRef = useRef<any>(null);
  const callbackRef = useRef(callback);

  // update callback if the callback changed.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // setup the interval, update when delay changed.
  useEffect(() => {
    intervalRef.current = setInterval(
      () => callbackRef.current(),
      delay
    );
    return () => clearInterval(intervalRef.current);
  }, [delay]);
};

export default useInterval;
