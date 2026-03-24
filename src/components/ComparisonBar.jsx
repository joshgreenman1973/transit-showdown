import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CITIES, CITY_CONFIG } from '../utils/constants';
import AnimatedNumber from './AnimatedNumber';

export default function ComparisonBar({ label, values, format, note, caveat }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const numericValues = CITIES.map((c) => values[c]).filter((v) => v != null);
  const max = Math.max(...numericValues) * 1.15;

  const formatFn = format || ((v) => v.toFixed(1));

  return (
    <div ref={ref} style={styles.container}>
      <div style={styles.label}>{label}</div>
      {caveat && <div style={styles.caveat}>{caveat}</div>}
      <div style={styles.barsContainer}>
        {CITIES.map((city, i) => {
          const v = values[city];
          const cfg = CITY_CONFIG[city];
          const width = v != null ? (v / max) * 100 : 0;
          return (
            <div key={city} style={styles.row}>
              <div style={{ ...styles.cityLabel, color: cfg.color }}>{cfg.short}</div>
              <div style={styles.barTrack}>
                <motion.div
                  style={{ ...styles.bar, backgroundColor: cfg.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${width}%` } : { width: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 * i }}
                />
              </div>
              <div style={styles.value}>
                {v != null ? <AnimatedNumber value={v} format={formatFn} /> : 'N/A'}
              </div>
            </div>
          );
        })}
      </div>
      {note && <div style={styles.note}>{note}</div>}
    </div>
  );
}

const styles = {
  container: { marginBottom: 28 },
  label: { fontSize: 15, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 },
  caveat: { fontSize: 11, color: '#C75000', marginBottom: 8, fontStyle: 'italic' },
  barsContainer: { display: 'flex', flexDirection: 'column', gap: 4 },
  row: { display: 'flex', alignItems: 'center', gap: 8 },
  cityLabel: { width: 32, fontSize: 11, fontWeight: 700, textAlign: 'right', flexShrink: 0 },
  barTrack: { flex: 1, height: 22, backgroundColor: '#F0F0F0', borderRadius: 5, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 5 },
  value: { width: 70, fontSize: 13, fontWeight: 700, color: '#1A1A1A', textAlign: 'right', flexShrink: 0 },
  note: { fontSize: 11, color: '#888', marginTop: 4, fontStyle: 'italic' },
};
