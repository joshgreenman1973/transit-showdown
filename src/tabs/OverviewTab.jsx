import ComparisonBar from '../components/ComparisonBar';
import SectionTitle from '../components/SectionTitle';
import ChartWrapper from '../components/ChartWrapper';
import CaveatBox from '../components/CaveatBox';
import { CITIES, CITY_CONFIG } from '../utils/constants';

export default function OverviewTab({ faresData, reliabilityData }) {
  if (!reliabilityData) return null;

  const sub = reliabilityData.systemOverview.subway;
  const bus = reliabilityData.systemOverview.bus;

  const toObj = (key) => Object.fromEntries(CITIES.map((c) => [c, sub[c]?.[key]]));
  const busObj = (key) => Object.fromEntries(CITIES.map((c) => [c, bus[c]?.[key]]));

  return (
    <div>
      <ChartWrapper>
        <div style={styles.intro}>
          Five of the world's great transit systems, compared head-to-head across
          reliability, frequency, and affordability.
        </div>
      </ChartWrapper>

      <ChartWrapper delay={0.1}>
        <div style={styles.cityRow}>
          {CITIES.map((c) => (
            <div key={c} style={{ ...styles.cityPill, backgroundColor: CITY_CONFIG[c].bg, color: CITY_CONFIG[c].color }}>
              <strong>{CITY_CONFIG[c].short}</strong>
              <span style={styles.cityName}>{CITY_CONFIG[c].name}</span>
            </div>
          ))}
        </div>
      </ChartWrapper>

      <SectionTitle>Subway / Metro: Tale of the Tape</SectionTitle>

      <ComparisonBar label="Stations" values={toObj('stations')} format={(v) => Math.round(v).toString()} />
      <ComparisonBar label="Lines / Routes" values={toObj('lines')} format={(v) => Math.round(v).toString()} />
      <ComparisonBar
        label="Track Miles"
        values={toObj('trackMiles')}
        format={(v) => Math.round(v).toString()}
        caveat="Seoul's count includes metropolitan rail lines integrated into the subway system"
      />
      <ComparisonBar
        label="Annual Riders (millions)"
        values={toObj('annualRiders')}
        format={(v) => Math.round(v).toLocaleString()}
        caveat="Tokyo figure includes Tokyo Metro + Toei lines only, not JR or private railways"
      />
      <ComparisonBar label="Avg Weekday Riders (millions)" values={toObj('avgWeekdayM')} format={(v) => v.toFixed(1) + 'M'} />

      <SectionTitle>Bus Network</SectionTitle>

      <ComparisonBar label="Routes" values={busObj('routes')} format={(v) => Math.round(v).toString()} />
      <ComparisonBar label="Fleet Size" values={busObj('fleet')} format={(v) => Math.round(v).toLocaleString()} />
      <ComparisonBar label="Annual Riders (millions)" values={busObj('annualRiders')} format={(v) => Math.round(v).toLocaleString()} />

      <SectionTitle>Quick Comparison</SectionTitle>

      <CaveatBox>
        Each system measures "on-time" differently. Tokyo counts trains within 5 minutes of schedule;
        NYC measures terminal arrival; London measures % of scheduled service operated; Paris measures
        departure punctuality. These are directionally comparable but not identical.
      </CaveatBox>

      <ChartWrapper>
        <div style={styles.takeawayGrid}>
          {CITIES.map((c) => (
            <div key={c} style={{ ...styles.takeaway, borderLeft: `4px solid ${CITY_CONFIG[c].color}` }}>
              <div style={{ ...styles.takeawayTitle, color: CITY_CONFIG[c].color }}>{CITY_CONFIG[c].name}</div>
              <div style={styles.takeawayBody}>
                {takeaways[c].map((t, i) => (
                  <div key={i} style={styles.takeawayItem}>{t}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ChartWrapper>
    </div>
  );
}

const takeaways = {
  nyc: [
    'Only 24/7 subway in the group',
    'Most affordable monthly pass vs income (1.9%)',
    'Largest physical network (665 track miles)',
    'Worst on-time performance (~80%)',
  ],
  london: [
    'Pioneered underground rail (1863)',
    'Massive bus network (675 routes)',
    'Most expensive monthly pass ($198 equiv)',
    'Strong reliability (91-92%)',
  ],
  paris: [
    'Cheapest European monthly pass ($94)',
    'Frequent strikes impact reliability',
    'Grand Paris Express adding 68 new stations',
    'Navigo pass covers all zones since 2015',
  ],
  tokyo: [
    'Highest ridership per line in the world',
    'Legendary punctuality (96%+)',
    'Cheapest single ride ($1.21)',
    'Complex multi-operator system',
  ],
  seoul: [
    'Largest station count (739)',
    'Cheapest monthly pass ($48, Climate Card)',
    'Newest major system (1974)',
    'Near-perfect reliability (97%+)',
  ],
};

const styles = {
  intro: { fontSize: 16, lineHeight: 1.7, color: '#444', marginBottom: 8 },
  cityRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
  cityPill: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '10px 16px', borderRadius: 10, minWidth: 80, flex: '1 1 0',
  },
  cityName: { fontSize: 11, fontWeight: 400, marginTop: 2 },
  takeawayGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 },
  takeaway: {
    backgroundColor: '#fff', border: '1px solid #E5E5E5',
    borderRadius: 10, padding: '14px 16px',
  },
  takeawayTitle: { fontSize: 14, fontWeight: 700, marginBottom: 8 },
  takeawayBody: { display: 'flex', flexDirection: 'column', gap: 5 },
  takeawayItem: { fontSize: 12, lineHeight: 1.5, color: '#555', paddingLeft: 10, position: 'relative' },
};
