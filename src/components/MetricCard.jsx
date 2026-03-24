import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CITY_CONFIG } from '../utils/constants';
import AnimatedNumber from './AnimatedNumber';

export default function MetricCard({ city, label, value, format, sublabel }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cfg = CITY_CONFIG[city];

  return (
    <motion.div
      ref={ref}
      style={{ ...styles.card, borderTop: `3px solid ${cfg.color}`, backgroundColor: cfg.bg }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div style={{ ...styles.cityTag, color: cfg.color }}>{cfg.short}</div>
      <div style={styles.value}>
        <AnimatedNumber value={value} format={format} />
      </div>
      <div style={styles.label}>{label}</div>
      {sublabel && <div style={styles.sublabel}>{sublabel}</div>}
    </motion.div>
  );
}

const styles = {
  card: { padding: '16px 18px', borderRadius: 10, minWidth: 130 },
  cityTag: { fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  value: { fontSize: 26, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1 },
  label: { fontSize: 12, color: '#555', marginTop: 3 },
  sublabel: { fontSize: 10, color: '#999', marginTop: 2 },
};
