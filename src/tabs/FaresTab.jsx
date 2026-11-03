import { CITIES, CITY_CONFIG } from '../utils/constants';
import ComparisonBar from '../components/ComparisonBar';
import MetricCard from '../components/MetricCard';
import SectionTitle from '../components/SectionTitle';
import ChartWrapper from '../components/ChartWrapper';
import CaveatBox from '../components/CaveatBox';

const fmt = (v) => (v == null ? 'N/A' : Math.round(v).toString());
const confColor = (c) => (c === 'high' ? '#1B7F3A' : c === 'moderate' ? '#B58900' : c === 'low' ? '#C2410C' : '#777');

export default function FaresTab({ data }) {
  if (!data) return null;

  const { comparisons, cities, funding } = data;

  return (
    <div>
      <SectionTitle>Fare comparison (all converted to USD)</SectionTitle>

      <CaveatBox>
        <strong>Exchange rates fluctuate.</strong> All non-USD fares converted at Federal Reserve rates for Oct. 23, 2026; fares checked Oct. 31, 2026.
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

      <SectionTitle>Side-by-side comparison</SectionTitle>

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
            note={c.metric.startsWith('Monthly') ? 'N/A = no flat monthly pass. NYC = average month at the 7-day OMNY cap.' : undefined}
          />
        );
      })}

      <ChartWrapper delay={0.2}>
        <div style={styles.insight}>
          <p><strong>London is the most expensive.</strong> A Zone 1-2 monthly Travelcard costs £171.70
          (about ${fmt(cities.london.monthlyCostUSD)}), and a peak Zone 1 Tube ride is £3.10.</p>
          <p style={{ marginTop: 10 }}><strong>Seoul has the cheapest monthly cap.</strong> Since Sept. 1, 2026,
          the Climate Pass refunds spending above ₩62,000 a month (about ${fmt(cities.seoul.monthlyCostUSD)}).</p>
          <p style={{ marginTop: 10 }}><strong>NYC has no monthly pass any more.</strong> MetroCard sales ended Jan. 1, 2026;
          OMNY caps fares at $35 over seven days, which works out to about ${fmt(cities.nyc.monthlyCostUSD)} in an average month.</p>
          <p style={{ marginTop: 10 }}><strong>Tokyo, Beijing, Shanghai and Hong Kong</strong> have no flat monthly
          pass, so they show N/A above. Their commuter passes or discounts depend on the route or on how much you ride.</p>
        </div>
      </ChartWrapper>

      <SectionTitle>Fare system structures</SectionTitle>

      <CaveatBox>
        These systems are designed differently. NYC charges a flat fare with a weekly cap;
        Tokyo, Seoul, Beijing, Shanghai and Hong Kong charge by distance; London charges by zone and time of day;
        Paris has charged one ticket price across the region since 2025. Direct fare comparisons capture
        only part of the difference.
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

      {funding && (
        <>
          <SectionTitle>Who pays? Farebox recovery & funding model</SectionTitle>

          <CaveatBox>
            <strong>What share of operating costs do fares cover?</strong> Each system measures this differently:
            the MTA uses its farebox operating ratio, London's figure is from Moody's, Paris is our division of
            IDFM's fare revenue by its operating spending, Seoul uses cost per passenger and Shanghai uses fare-hearing cost data.
            Treat the bars as directional. N/A means we found no published figure.
          </CaveatBox>

          <ComparisonBar
            label="Fares as % of operating costs (latest published)"
            values={Object.fromEntries(CITIES.map((c) => [c, funding.data[c].fareboxRecoveryPct]))}
            format={(v) => `${Math.round(v)}%`}
            caveat="Definitions and years differ by city; see each card"
          />

          <ChartWrapper>
            <div style={styles.fundingGrid}>
              {CITIES.map((c) => {
                const f = funding.data[c];
                const cfg = CITY_CONFIG[c];
                return (
                  <div key={c} style={{ ...styles.fundingCard, borderLeft: `4px solid ${cfg.color}` }}>
                    <div style={styles.cardHead}>
                      <div style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.name}</div>
                      {f.confidence !== 'n/a' && (
                        <div style={{ ...styles.conf, color: confColor(f.confidence) }}>{f.confidence} confidence</div>
                      )}
                    </div>
                    <div style={styles.fundingBig}>{f.fareboxRecoveryPct == null ? 'N/A' : `${f.fareboxRecoveryPct}%`}</div>
                    <div style={styles.fundingSub}>{f.measure}{f.year ? ` (${f.year})` : ''}</div>
                    <div style={styles.fundingRow}><strong>Ownership:</strong> {f.ownership}</div>
                    <div style={styles.fundingRow}><strong>Funding:</strong> {f.model}</div>
                    <div style={styles.fundingRow}><strong>Private role:</strong> {f.private}</div>
                    {f.sourceUrl && (
                      <div style={styles.sourceLine}>
                        Source: <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>{f.source}</a>
                        {(f.extraSources || []).map((x) => (
                          <span key={x.url}>; <a href={x.url} target="_blank" rel="noopener noreferrer" style={styles.link}>{x.name}</a></span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ChartWrapper>

          <ChartWrapper delay={0.1}>
            <div style={styles.insight}>
              <p><strong>Three broad models.</strong> In NYC and London, fares cover between a third
              (MTA, 33.4% in 2025) and about half (TfL, 53.1% in 2024/25) of operating costs, with taxes and
              grants covering the rest. Paris leans on taxes: IDFM collected €6.4 billion in tax revenue in 2024,
              including a payroll tax on employers, against €4.3 billion in fares. Hong Kong and Tokyo run their
              metros as listed companies that also earn money from property and retail; property development
              supplied HK$10.27 billion of MTR's HK$15.77 billion net profit in 2024.</p>
              <p style={{ marginTop: 10 }}><strong>NYC's fare share has fallen.</strong> Fares and tolls covered
              an average 52% of the MTA operating budget in 2012-2019 and 39% in 2024, per the State Comptroller,
              which is why dedicated taxes and congestion pricing (launched January 2025) matter so much.</p>
            </div>
          </ChartWrapper>
        </>
      )}
    </div>
  );
}

const styles = {
  cardGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))',
    gap: 10, marginBottom: 8,
  },
  insight: {
    backgroundColor: '#F8F8F0', border: '1px solid #E8E8D8',
    borderRadius: 10, padding: '16px 20px', fontSize: 14, lineHeight: 1.6, color: '#444',
  },
  systemGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 12,
  },
  systemCard: {
    backgroundColor: '#fff', border: '1px solid #E5E5E5',
    borderRadius: 10, padding: '14px 16px',
  },
  systemCity: { fontSize: 13, fontWeight: 700, marginBottom: 6 },
  systemType: { fontSize: 13, color: '#333', fontWeight: 500, marginBottom: 4 },
  systemHours: { fontSize: 12, color: '#666', marginBottom: 4 },
  systemNote: { fontSize: 11, color: '#999' },
  fundingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 12 },
  fundingCard: { backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: 10, padding: '14px 16px' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  conf: { fontSize: 10, fontWeight: 600, textTransform: 'uppercase' },
  fundingBig: { fontSize: 30, fontWeight: 800, color: '#1A1A1A', margin: '4px 0' },
  fundingSub: { fontSize: 11, color: '#888', marginBottom: 8 },
  fundingRow: { fontSize: 12, color: '#333', lineHeight: 1.5, marginTop: 6 },
  sourceLine: { fontSize: 11, color: '#666', marginTop: 8, lineHeight: 1.5 },
  link: { color: '#0E47A1' },
};
