import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { CITIES, CITY_CONFIG } from '../utils/constants';
import ComparisonBar from '../components/ComparisonBar';
import SectionTitle from '../components/SectionTitle';
import ChartWrapper from '../components/ChartWrapper';
import CaveatBox from '../components/CaveatBox';

const confColor = (c) => (c === 'high' ? '#1B7F3A' : c === 'moderate' ? '#B58900' : c === 'low' ? '#C2410C' : '#777');

export default function ExperienceTab({ data }) {
  if (!data) return null;

  const { accessibility, ridershipRecovery, speed, safety } = data;

  return (
    <div>
      {/* ACCESSIBILITY */}
      <SectionTitle>Accessibility: step-free station access</SectionTitle>

      <CaveatBox>
        "Step-free" definitions vary. NYC counts ADA-compliant stations (elevator from street to platform).
        London counts "step-free from street to platform." Paris counts fully accessible stations.
        Tokyo and Seoul count stations with at least one barrier-free route.
      </CaveatBox>

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
          <p><strong>Paris is the least accessible</strong> at 3%, or 9 of 308 stations.
          The Métro's deep, narrow stations built in 1900 make retrofit nearly impossible.
          The Grand Paris Express (opening 2025-2030) will be fully accessible.</p>
          <p style={{ marginTop: 10 }}><strong>New York City's 34% (161 of 472 stations, July 2026) is among the
          lowest here</strong>, a legacy of building before accessibility mandates. Under a 2022
          legal settlement the MTA aims to make 95% of stations accessible by 2055.</p>
          <p style={{ marginTop: 10 }}><strong>Seoul and Tokyo lead</strong> thanks to newer construction
          and strong national accessibility laws (Japan's Barrier-Free Law, Korea's Mobility Act).</p>
        </div>
      </ChartWrapper>

      {/* COVID RECOVERY */}
      <SectionTitle>Post-COVID ridership recovery</SectionTitle>

      <CaveatBox>
        Indexed to 2019 pre-pandemic levels = 100%. Values above 100% mean ridership
        exceeds 2019. Recovery shaped by work-from-home adoption, tourism return and
        policy choices (Seoul's Climate Card stimulated ridership). New York City's slow recovery
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
            Climate Card unlimited pass launched in 2024. NYC was furthest behind at ~71% in late 2024; the MTA put 2025 subway ridership at about 75% of 2019.
          </div>
        </div>
      </ChartWrapper>

      {/* SUBWAY SPEED */}
      <SectionTitle>Subway: average speed & journey time</SectionTitle>

      <CaveatBox>
        "Commercial speed" includes station dwell time and acceleration/deceleration.
        It does NOT include walk time, transfers or waiting. A typical 10km commute time
        is estimated door-to-platform. Paris's low speed reflects extremely short
        inter-station distances (avg 560m), not poor service.
      </CaveatBox>

      <ComparisonBar
        label="Average speed (km/h)"
        values={Object.fromEntries(CITIES.map((c) => [c, speed.subway[c].avgSpeedKmh]))}
        format={(v) => `${Math.round(v)} km/h`}
        note="Higher is better. Includes dwell time."
      />

      <ComparisonBar
        label="Typical 10km journey (minutes)"
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

      {/* BUS SPEED */}
      {speed.bus && (
        <>
          <SectionTitle>Bus: average speed & journey time</SectionTitle>

          <CaveatBox>
            Bus "revenue speed" is total route distance divided by total trip time, including all stops,
            boarding and traffic delays -- the speed a passenger experiences. NYC, London and
            Paris report this metric directly from operational data. Tokyo, Beijing and Shanghai figures
            are derived from government transport surveys and planning models (marked "moderate" confidence
            below). Paris figure is for intra-muros (city proper) only; its network-wide average
            including suburbs is ~14 km/h.
          </CaveatBox>

          <ComparisonBar
            label="Average bus speed (km/h)"
            values={Object.fromEntries(CITIES.map((c) => [c, speed.bus[c].avgSpeedKmh]))}
            format={(v) => `${v.toFixed(1)} km/h`}
            note="Higher is better. Revenue speed including all stops and traffic."
          />

          <ComparisonBar
            label="Typical 5km bus journey (minutes)"
            values={Object.fromEntries(CITIES.map((c) => [c, speed.bus[c].typical5kmMin]))}
            format={(v) => `${Math.round(v)} min`}
            note="Lower is better. Includes boarding, stops and traffic."
          />

          <ChartWrapper>
            <div style={styles.detailGrid}>
              {CITIES.map((c) => {
                const d = speed.bus[c];
                const cfg = CITY_CONFIG[c];
                const confidenceLabel = {
                  'high': 'High confidence',
                  'moderate-high': 'Moderate-high confidence',
                  'moderate': 'Moderate confidence',
                };
                const confidenceColor = {
                  'high': '#558B2F',
                  'moderate-high': '#7B8D28',
                  'moderate': '#E65100',
                };
                return (
                  <div key={c} style={{ ...styles.detailCard, borderLeft: `4px solid ${cfg.color}` }}>
                    <div style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.name}</div>
                    <div style={styles.bigNum}>{d.avgSpeedKmh} km/h</div>
                    <div style={styles.detailSub}>{d.typical5kmMin} min for 5km</div>
                    <div style={styles.detailNote}>{d.note}</div>
                    <div style={{ fontSize: 10, color: confidenceColor[d.confidence] || '#888', marginTop: 4, fontWeight: 600 }}>
                      {confidenceLabel[d.confidence] || d.confidence}
                    </div>
                    <div style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>{d.source}</div>
                  </div>
                );
              })}
            </div>
          </ChartWrapper>

          <ChartWrapper>
            <div style={styles.methodBox}>
              <div style={styles.methodTitle}>How bus speed is calculated</div>
              <div style={styles.methodText}>{speed.bus.calculationMethod}</div>
            </div>
          </ChartWrapper>

          <ChartWrapper delay={0.1}>
            <div style={styles.insight}>
              <p><strong>Paris has the slowest buses of any city here</strong> at 9 km/h within city limits,
              slower than Manhattan's 10.1 km/h. The city's reallocation of road space
              for bike lanes and pedestrian zones has slowed buses without providing compensating
              bus-priority infrastructure.</p>
              <p style={{ marginTop: 10 }}><strong>Seoul sped up its buses.</strong> Its 2004 median bus
              lane reform -- moving bus lanes to the center of major arterials, separated from car traffic -- roughly
              doubled speeds on reformed corridors. The 119+ km exclusive median bus lane network is a model studied
              by transit planners worldwide.</p>
              <p style={{ marginTop: 10 }}><strong>New York City's 13.2 km/h citywide average hides wide variation.</strong> Manhattan
              averages 10.1 km/h while outer-borough routes can reach 16-18 km/h. The MTA's bus lane expansion and
              congestion pricing (launched January 2025) are early policy interventions aimed at improving these numbers.</p>
            </div>
          </ChartWrapper>
        </>
      )}

      {/* SAFETY */}
      <SectionTitle>Safety: reported crime</SectionTitle>

      <CaveatBox>
        <strong>The least comparable metric in this tool.</strong> {safety.headlineCaveat} NYC counts
        major felonies only; London counts every notifiable offense, including theft. The roughly
        tenfold gap between them comes mostly from what is counted, not from how dangerous the systems are.
      </CaveatBox>

      <ComparisonBar
        label="Reported crimes per million journeys (where published)"
        values={Object.fromEntries(CITIES.map((c) => [c, safety.data[c].crimePerMillionTrips]))}
        format={(v) => v.toFixed(1)}
        note="N/A = no published metro rate. NYC 2025 = major felonies; London Jan-Jun 2025 = all notifiable offenses."
        caveat="Not comparable across cities: definitions differ (see cards below)"
      />

      <ChartWrapper>
        <div style={styles.detailGrid}>
          {CITIES.map((c) => {
            const d = safety.data[c];
            const cfg = CITY_CONFIG[c];
            const hasRate = d.crimePerMillionTrips != null;
            return (
              <div key={c} style={{ ...styles.detailCard, borderLeft: `4px solid ${cfg.color}` }}>
                <div style={styles.cardHead}>
                  <div style={{ color: cfg.color, fontWeight: 700, fontSize: 13 }}>{cfg.name}</div>
                  {d.confidence !== 'n/a' && (
                    <div style={{ ...styles.conf, color: confColor(d.confidence) }}>{d.confidence} confidence</div>
                  )}
                </div>
                <div style={styles.bigNum}>{hasRate ? d.crimePerMillionTrips : 'N/A'}</div>
                <div style={styles.detailSub}>
                  {hasRate ? `per million journeys (${d.year})` : d.rateNote}
                  {d.yoyChange && <span style={{ color: '#666', marginLeft: 6 }}>· {d.yoyChange}</span>}
                </div>
                {d.numerator != null && (
                  <div style={styles.detailLine}><strong>Count:</strong> {d.numerator.toLocaleString()} {d.numeratorLabel}</div>
                )}
                {d.denominatorM != null && (
                  <div style={styles.detailLine}><strong>Rides:</strong> {d.denominatorM.toLocaleString()}{d.denominatorLabel ? ` ${d.denominatorLabel}` : ' million'}</div>
                )}
                <div style={styles.detailNote}><strong>What's counted:</strong> {d.category}</div>
                <div style={styles.detailNote}>{d.note}</div>
                {d.sourceUrl && (
                  <div style={styles.sourceLine}>
                    Source: <a href={d.sourceUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>{d.source}</a>
                    {(d.extraSources || []).map((x) => (
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
          <p><strong>NYC's subway had 2,160 major felonies in 2025</strong>, down 4% from 2,251 in 2024,
          on about 1.28 billion rides: 1.69 per million. amNY, reporting NYPD figures, called it the safest
          12 months in 16 years, excluding pandemic years.</p>
          <p style={{ marginTop: 10 }}><strong>London's 20.7 per million (January to June 2025)</strong> covers
          all notifiable offenses recorded on the Underground, a far wider net than NYC's seven major felonies.</p>
          <p style={{ marginTop: 10 }}><strong>Tokyo's arrest count understates groping.</strong> Tokyo police made
          667 chikan arrests in 2025, while 56.3% of women in a 2024 Tokyo government survey said they had been groped.</p>
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
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 10, marginBottom: 20,
  },
  detailCard: {
    backgroundColor: '#fff', border: '1px solid #E5E5E5',
    borderRadius: 8, padding: '12px 14px',
  },
  bigNum: { fontSize: 24, fontWeight: 800, color: '#1A1A1A', margin: '4px 0' },
  detailSub: { fontSize: 12, color: '#666' },
  detailNote: { fontSize: 11, color: '#888', marginTop: 6, lineHeight: 1.5 },
  detailLine: { fontSize: 11, color: '#444', marginTop: 4 },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  conf: { fontSize: 10, fontWeight: 600, textTransform: 'uppercase' },
  sourceLine: { fontSize: 10, color: '#666', marginTop: 6, lineHeight: 1.5 },
  link: { color: '#0E47A1' },
  insight: {
    backgroundColor: '#F8F8F0', border: '1px solid #E8E8D8',
    borderRadius: 10, padding: '16px 20px', fontSize: 14, lineHeight: 1.6, color: '#444',
  },
  methodBox: {
    backgroundColor: '#F5F7FA', border: '1px solid #DEE2E8',
    borderRadius: 10, padding: '16px 20px', marginBottom: 12,
  },
  methodTitle: { fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 },
  methodText: { fontSize: 12, lineHeight: 1.6, color: '#555' },
};
