import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, ReferenceLine,
} from 'recharts';
import { CITIES, CITY_CONFIG } from '../utils/constants';
import ComparisonBar from '../components/ComparisonBar';
import SectionTitle from '../components/SectionTitle';
import ChartWrapper from '../components/ChartWrapper';
import CaveatBox from '../components/CaveatBox';

export default function ExperienceTab({ data }) {
  if (!data) return null;

  const { accessibility, ridershipRecovery, speed, safety } = data;

  return (
    <div>
      {/* ACCESSIBILITY */}
      <SectionTitle>Accessibility: Step-Free Station Access</SectionTitle>

      <CaveatBox>
        "Step-free" definitions vary. NYC counts ADA-compliant stations (elevator from street to platform).
        London counts "step-free from street to platform." Paris counts fully accessible stations.
        Tokyo and Seoul count stations with at least one barrier-free route.
      </CaveatBox>

      <ChartWrapper>
        <div style={styles.chartBox}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={CITIES.map((c) => ({
                city: CITY_CONFIG[c].short,
                pct: accessibility.data[c].pct,
                color: CITY_CONFIG[c].color,
              }))}
              margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="city" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => [`${value}%`, 'Step-free access']} />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                {CITIES.map((c, i) => (
                  <rect key={c} fill={CITY_CONFIG[c].color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>

      <ComparisonBar
        label="Step-Free Stations (%)"
        values={Object.fromEntries(CITIES.map((c) => [c, accessibility.data[c].pct]))}
        format={(v) => `${Math.round(v)}%`}
      />

      <ChartWrapper>
        <div style={styles.detailGrid}>
          {CITIES.map((c) => {
            const d = accessibility.data[c];
            const cfg = CITY_CONFIG[c];
            return (
              <div key={c} style={{ ...styles.detailCard, borderLeft: `4px solid ${cfg.color}` }}>
                <div style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.name}</div>
                <div style={styles.bigNum}>{d.pct}%</div>
                <div style={styles.detailSub}>{d.count} of {d.total} stations</div>
                <div style={styles.detailNote}>{d.note}</div>
              </div>
            );
          })}
        </div>
      </ChartWrapper>

      <ChartWrapper delay={0.1}>
        <div style={styles.insight}>
          <p><strong>Paris is shockingly inaccessible</strong> at just 3% — only 9 of 308 stations.
          The Métro's deep, narrow stations built in 1900 make retrofit nearly impossible.
          The Grand Paris Express (opening 2025-2030) will be fully accessible.</p>
          <p style={{ marginTop: 10 }}><strong>NYC's 28% is the worst among modern systems</strong> —
          a legacy of building before accessibility mandates. The MTA's current capital plan
          aims to make 95% of stations accessible by 2055, but progress is slow and expensive
          ($100M+ per station for some retrofits).</p>
          <p style={{ marginTop: 10 }}><strong>Seoul and Tokyo lead</strong> thanks to newer construction
          and strong national accessibility laws (Japan's Barrier-Free Law, Korea's Mobility Act).</p>
        </div>
      </ChartWrapper>

      {/* COVID RECOVERY */}
      <SectionTitle>Post-COVID Ridership Recovery</SectionTitle>

      <CaveatBox>
        Indexed to 2019 pre-pandemic levels = 100%. Values above 100% mean ridership
        exceeds 2019. Recovery shaped by work-from-home adoption, tourism return, and
        policy choices (Seoul's Climate Card stimulated ridership). NYC's slow recovery
        reflects high remote-work rates in finance and tech.
      </CaveatBox>

      <ChartWrapper>
        <div style={styles.chartBox}>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={ridershipRecovery.quarterly} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 10 }}
                interval={2}
                tickFormatter={(v) => {
                  const [y, q] = v.split('-');
                  return `${q} '${y.slice(2)}`;
                }}
              />
              <YAxis domain={[0, 120]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <ReferenceLine y={100} stroke="#999" strokeDasharray="4 4" label={{ value: '2019 level', position: 'right', fontSize: 10 }} />
              <Tooltip
                formatter={(value, name) => [`${value}%`, CITY_CONFIG[name]?.name || name]}
                labelFormatter={(v) => {
                  const [y, q] = v.split('-');
                  return `${q} ${y}`;
                }}
              />
              <Legend formatter={(value) => CITY_CONFIG[value]?.short || value} />
              {CITIES.map((city) => (
                <Line
                  key={city}
                  type="monotone"
                  dataKey={city}
                  stroke={CITY_CONFIG[city].color}
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <div style={styles.chartNote}>
            Seoul has exceeded pre-pandemic ridership since mid-2023, partly driven by the
            Climate Card unlimited pass launched in 2024. NYC remains the furthest behind at ~71%.
          </div>
        </div>
      </ChartWrapper>

      {/* SPEED */}
      <SectionTitle>Average Speed & Journey Time</SectionTitle>

      <CaveatBox>
        "Commercial speed" includes station dwell time and acceleration/deceleration.
        It does NOT include walk time, transfers, or waiting. A typical 10km commute time
        is estimated door-to-platform. Paris's low speed reflects extremely short
        inter-station distances (avg 560m), not poor service.
      </CaveatBox>

      <ComparisonBar
        label="Average Speed (km/h)"
        values={Object.fromEntries(CITIES.map((c) => [c, speed.subway[c].avgSpeedKmh]))}
        format={(v) => `${Math.round(v)} km/h`}
        note="Higher is better. Includes dwell time."
      />

      <ComparisonBar
        label="Typical 10km Journey (minutes)"
        values={Object.fromEntries(CITIES.map((c) => [c, speed.subway[c].typical10kmMin]))}
        format={(v) => `${Math.round(v)} min`}
        note="Lower is better. Platform-to-platform, no transfers."
      />

      <ChartWrapper>
        <div style={styles.detailGrid}>
          {CITIES.map((c) => {
            const d = speed.subway[c];
            const cfg = CITY_CONFIG[c];
            return (
              <div key={c} style={{ ...styles.detailCard, borderLeft: `4px solid ${cfg.color}` }}>
                <div style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.name}</div>
                <div style={styles.bigNum}>{d.avgSpeedKmh} km/h</div>
                <div style={styles.detailSub}>{d.typical10kmMin} min for 10km</div>
                <div style={styles.detailNote}>{d.note}</div>
              </div>
            );
          })}
        </div>
      </ChartWrapper>

      {/* SAFETY */}
      <SectionTitle>Safety: Crime Rates</SectionTitle>

      <CaveatBox>
        <strong>The least comparable metric in this entire tool.</strong> What constitutes
        a "crime" varies enormously: London includes antisocial behavior and fare evasion;
        NYC counts only major felonies; Tokyo primarily counts groping; Paris is suspected
        of significant underreporting. Reporting culture and policing practices differ
        dramatically. Use this section with extreme caution.
      </CaveatBox>

      <ComparisonBar
        label="Reported Crimes per Million Trips"
        values={Object.fromEntries(CITIES.map((c) => [c, safety.data[c].crimePerMillionTrips]))}
        format={(v) => v.toFixed(1)}
        note="Lower is better — but definitions vary wildly (see caveat)"
        caveat="Low comparability — crime definitions and reporting practices differ by country"
      />

      <ChartWrapper>
        <div style={styles.detailGrid}>
          {CITIES.map((c) => {
            const d = safety.data[c];
            const cfg = CITY_CONFIG[c];
            return (
              <div key={c} style={{ ...styles.detailCard, borderLeft: `4px solid ${cfg.color}` }}>
                <div style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.name}</div>
                <div style={styles.bigNum}>{d.crimePerMillionTrips}</div>
                <div style={styles.detailSub}>per million trips ({d.year})</div>
                <div style={styles.detailNote}>{d.note}</div>
                <div style={{ fontSize: 10, color: '#aaa', marginTop: 4 }}>Source: {d.source}</div>
              </div>
            );
          })}
        </div>
      </ChartWrapper>

      <ChartWrapper delay={0.1}>
        <div style={styles.insight}>
          <p><strong>London's high number is misleading</strong> — British Transport Police use a
          much broader definition of "crime" that includes fare evasion, verbal harassment, and
          antisocial behavior. NYC's figure counts only felonies (assault, robbery, grand larceny).</p>
          <p style={{ marginTop: 10 }}><strong>Tokyo's 0.4 is real but incomplete</strong> — Japan has
          genuinely low violent crime, but groping (chikan) on packed trains is a persistent problem
          that is widely acknowledged to be underreported despite dedicated women-only cars.</p>
        </div>
      </ChartWrapper>
    </div>
  );
}

const styles = {
  chartBox: {
    backgroundColor: '#fff', border: '1px solid #E5E5E5',
    borderRadius: 12, padding: '20px 16px 12px', marginBottom: 20,
  },
  chartNote: { fontSize: 12, color: '#888', marginTop: 8, lineHeight: 1.5, fontStyle: 'italic' },
  detailGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 20,
  },
  detailCard: {
    backgroundColor: '#fff', border: '1px solid #E5E5E5',
    borderRadius: 8, padding: '12px 14px',
  },
  bigNum: { fontSize: 24, fontWeight: 800, color: '#1A1A1A', margin: '4px 0' },
  detailSub: { fontSize: 12, color: '#666' },
  detailNote: { fontSize: 11, color: '#888', marginTop: 6, lineHeight: 1.5 },
  insight: {
    backgroundColor: '#F8F8F0', border: '1px solid #E8E8D8',
    borderRadius: 10, padding: '16px 20px', fontSize: 14, lineHeight: 1.6, color: '#444',
  },
};
