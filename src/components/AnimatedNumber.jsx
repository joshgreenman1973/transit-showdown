import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

export default function AnimatedNumber({ value, format = (v) => v.toFixed(1), duration = 0.6 }) {
  const [display, setDisplay] = useState(() => format(value));
  const prevValue = useRef(value);

  useEffect(() => {
    const from = prevValue.current;
    prevValue.current = value;
    const controls = animate(from, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
  }, [value, format, duration]);

  return <span>{display}</span>;
}
