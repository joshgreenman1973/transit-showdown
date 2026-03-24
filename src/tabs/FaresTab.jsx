import { CITIES, CITY_CONFIG } from '../utils/constants';
import ComparisonBar from '../components/ComparisonBar';
import MetricCard from '../components/MetricCard';
import SectionTitle from '../components/SectionTitle';
import ChartWrapper from '../components/ChartWrapper';
import CaveatBox from '../components/CaveatBox';

export default function FaresTab({ data }) {
  if (!data) return null;

  const { comparisons, cities } = data;

  return (
    <div>
      <SectionTitle>Fare Comparison (all converted to USD)</SectionTitle>

      <CaveatBox>
        <strong>Exchange rates fluctuate.</strong> All non-USD fares converted at Jan 2026 rates.
        Purchasing power parity would tell a different story — $1 buys more in Seoul than in London.
        These are nominal comparisons only.
      </CaveatBox>

      <ChartWrapper>
        <div style={styles.cardGrid}>
          {CITIES.map((c) => (
            <MetricCard
              key={c}
              city={c}
              label="Single ride"
              value={cities[c].singleRideUSD}
              format={(v) => `$${v.toFixed(2)}`}
              sublabel={cities[c].singleRideNote}
            />
          ))}
        </div>
      </ChartWrapper>

      <SectionTitle>Side-by-Side Comparison</SectionTitle>

      {comparisons.map((c) => {
        const values = {};
        CITIES.forEach((city) => { values[city] = c[city]; });
        const isPercent = c.metric.includes('%');
        return (
          <ComparisonBar
            key={c.metric}
            label={c.metric}
            values={values}
            format={isPercent ? (v) => `${v.toFixed(1)}%` : (v) => `$${v < 10 ? v.toFixed(2) : Math.round(v).toLocaleString()}`}
          />
        );
      })}

      <SectionTitle>Affordability: Monthly Pass as % of Income</SectionTitle>

      <CaveatBox>
        <strong>Income definitions vary.</strong> NYC uses ACS median household income;
        London uses ONS; Paris uses INSEE; Tokyo uses government household survey;
        Seoul uses KOSTAT. Household definitions and tax treatment differ.
        Treat the ratios as approximate.
      </CaveatBox>

      <ChartWrapper>
        <div style={styles.affordGrid}>
          {CITIES.map((c) => {
            const city = cities[c];
            const cfg = CITY_CONFIG[c];
            return (
              <div key={c} style={{ ...styles.affordCard, borderLeft: `4px solid ${cfg.color}` }}>
                <div style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.name}</div>
                <div style={styles.affordPct}>{city.monthlyPctIncome.toFixed(1)}%</div>
                <div style={styles.affordSub}>
                  {city.currency === 'USD' ? '$' : ''}{city.monthlyCost.toLocaleString()}{city.currency !== 'USD' ? ` ${city.currency}` : ''}/mo
                </div>
              </div>
            );
          })}
        </div>
      </ChartWrapper>

      <ChartWrapper delay={0.2}>
        <div style={styles.insight}>
          <p><strong>Seoul is the affordability champion</strong> — the Climate Card launched in 2024
          offers unlimited rides for ~$48/month, just 1.5% of median income.</p>
          <p style={{ marginTop: 10 }}><strong>London is the most expensive</strong> relative to
          income at 5.4%, driven by zone-based pricing and lower median incomes compared to NYC.</p>
          <p style={{ marginTop: 10 }}><strong>Tokyo is remarkably cheap per ride</strong> ($1.21)
          but the commuter pass system means costs depend heavily on your specific route and distance.</p>
        </div>
      </ChartWrapper>

      <SectionTitle>Fare System Structures</SectionTitle>

      <CaveatBox>
        These systems are fundamentally different in design. NYC charges a flat fare;
        Tokyo charges by distance; London charges by zone and time of day; Paris recently
        simplified to a single-zone pass; Seoul uses distance-based with a new unlimited option.
        Direct fare comparisons only capture part of the picture.
      </CaveatBox>

      <ChartWrapper>
        <div style={styles.systemGrid}>
          {CITIES.map((c) => {
            const city = cities[c];
            const cfg = CITY_CONFIG[c];
            return (
              <div key={c} style={styles.systemCard}>
                <div style={{ ...styles.systemCity, color: cfg.color }}>{cfg.name}</div>
                <div style={styles.systemType}>{city.fareSystem}</div>
                <div style={styles.systemHours}>Hours: {city.operatingHours}</div>
                <div style={styles.systemNote}>{city.monthlyNote}</div>
              </div>
            );
          })}
        </div>
      </ChartWrapper>
    </div>
  );
}

const styles = {
  cardGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: 10, marginBottom: 8,
  },
  affordGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10,
  },
  affordCard: {
    backgroundColor: '#fff', border: '1px solid #E5E5E5',
    borderRadius: 8, padding: '14px 16px',
  },
  affordPct: { fontSize: 28, fontWeight: 800, color: '#1A1A1A', margin: '4px 0' },
  affordSub: { fontSize: 11, color: '#888' },
  insight: {
    backgroundColor: '#F8F8F0', border: '1px solid #E8E8D8',
    borderRadius: 10, padding: '16px 20px', fontSize: 14, lineHeight: 1.6, color: '#444',
  },
  systemGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12,
  },
  systemCard: {
    backgroundColor: '#fff', border: '1px solid #E5E5E5',
    borderRadius: 10, padding: '14px 16px',
  },
  systemCity: { fontSize: 13, fontWeight: 700, marginBottom: 6 },
  systemType: { fontSize: 13, color: '#333', fontWeight: 500, marginBottom: 4 },
  systemHours: { fontSize: 12, color: '#666', marginBottom: 4 },
  systemNote: { fontSize: 11, color: '#999' },
};
