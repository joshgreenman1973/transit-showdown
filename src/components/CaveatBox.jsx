import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CaveatBox({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      style={styles.box}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      <div style={styles.icon}>&#x26A0;</div>
      <div style={styles.text}>{children}</div>
    </motion.div>
  );
}

const styles = {
  box: {
    display: 'flex',
    gap: 10,
    backgroundColor: '#FFFBF0',
    border: '1px solid #F0DCA0',
    borderRadius: 8,
    padding: '12px 16px',
    marginBottom: 20,
  },
  icon: { fontSize: 16, flexShrink: 0, lineHeight: 1.5 },
  text: { fontSize: 13, lineHeight: 1.6, color: '#6B5900' },
};
