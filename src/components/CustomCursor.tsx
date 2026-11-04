import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 180, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 24, mass: 0.5 });
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (reduce) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-cursor],a,button,[role="button"]');
      setLabel(target?.dataset.cursor ?? (target ? 'Inspect' : ''));
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [reduce, x, y]);
  if (reduce) return null;
  return <motion.div className={'cursor ' + (label ? 'cursor-active' : '')} style={{ x: sx, y: sy }} aria-hidden="true"><span>{label || '+'}</span></motion.div>;
}
