import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, timer: number = 500) => {
   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, timer);

      return () => {
         clearTimeout(handler);
      };
   }, [value, timer]);

   return debouncedValue;
};
