import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import { CITIES, CITY_CONFIG } from '../utils/constants';
import { shortMonth } from '../utils/formatters';
import SectionTitle from '../components/SectionTitle';
import ChartWrapper from '../components/ChartWrapper';
import CaveatBox from '../components/CaveatBox';

export default function ReliabilityTab({ data }) {
  if (!data) return null;

  const { subwayOnTime, headways } = data;

  const otpData = subwayOnTime.monthly.map((d) => ({
    ...d,
    label: shortMonth(d.month),
  }));

  return (
    <div>
      <SectionTitle>Subway / Metro On-Time Performance</SectionTitle>

      <CaveatBox>
        <strong>Not apples to apples.</strong> Each city defines "on-time" differently:
        NYC = % trains arriving at terminal on schedule;
        London = % of scheduled service operated;
        Paris = % departures on time;
        Tokyo = % trains within 5 min of schedule;
        Seoul = % departures within 2 min.
        The chart is directionally useful but the absolute numbers aren't directly comparable.
      </CaveatBox>

      <ChartWrapper>
        <div style={styles.chartBox}>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={otpData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={3} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value, name) => [`${value.toFixed(1)}%`, CITY_CONFIG[name]?.name || name]} />
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
        </div>
      </ChartWrapper>

      <SectionTitle>Average Subway Headway by Time of Day</SectionTitle>

      <CaveatBox>
        Headways are system-wide averages from GTFS schedule data.
        Actual headways vary dramatically by line — Tokyo's Marunouchi Line runs every 90 seconds at peak,
        while some NYC lines run every 8-10 minutes even during rush hour.
        "null" means no service in that time period.
      </CaveatBox>

      <ChartWrapper>
        <div style={styles.chartBox}>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={headways.subway} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}m`} />
              <Tooltip
                formatter={(value, name) => [
                  value != null ? `${value} min` : 'No service',
                  CITY_CONFIG[name]?.name || name,
                ]}
              />
              <Legend formatter={(value) => CITY_CONFIG[value]?.short || value} />
              {CITIES.map((city) => (
                <Bar key={city} dataKey={city} fill={CITY_CONFIG[city].color} radius={[3, 3, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <div style={styles.chartNote}>
            Lower is better. Only NYC runs 24/7. Paris, London have limited late-night service.
            Tokyo and Seoul shut down entirely overnight.
          </div>
        </div>
      </ChartWrapper>

      <SectionTitle>Key Observations</SectionTitle>

      <ChartWrapper>
        <div style={styles.insight}>
          <p><strong>Tokyo and Seoul dominate reliability</strong> — both consistently above 96%.
          This reflects cultural factors, infrastructure investment, and simpler network designs
          (fewer merging/branching lines than NYC).</p>
          <p style={{ marginTop: 10 }}><strong>Paris is the most volatile</strong> — dropping to ~80% in December
          (strikes) and recovering to 87% in summer. The RATP network is heavily impacted by
          labor actions, which occur more frequently than in other systems.</p>
          <p style={{ marginTop: 10 }}><strong>NYC is improving</strong> — trending upward from 75% to 83% over
          this period, reflecting the MTA's investment in signal modernization and service
          reliability initiatives.</p>
        </div>
      </ChartWrapper>
    </div>
  );
}

const styles = {
  chartBox: {
    backgroundColor: '#fff', border: '1px solid #E5E5E5',
    borderRadius: 12, padding: '20px 16px 12px',
  },
  chartNote: { fontSize: 12, color: '#888', marginTop: 8, lineHeight: 1.5, fontStyle: 'italic' },
  insight: {
    backgroundColor: '#F8F8F0', border: '1px solid #E8E8D8',
    borderRadius: 10, padding: '16px 20px', fontSize: 14, lineHeight: 1.6, color: '#444',
  },
};
