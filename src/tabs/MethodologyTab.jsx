import SectionTitle from '../components/SectionTitle';
import ChartWrapper from '../components/ChartWrapper';
import { CITY_CONFIG } from '../utils/constants';

export default function MethodologyTab() {
  return (
    <div>
      <ChartWrapper>
        <div style={styles.intro}>
          This comparison draws on publicly available data from eight transit systems.
          Where measurement methodologies differ, we note the distinction throughout.
          Treat cross-city comparisons as directional, not precise.
        </div>
      </ChartWrapper>

      <ChartWrapper>
        <div style={styles.disclaimer}>
          <strong>Data provenance note:</strong> The reliability, headway, and ridership recovery figures
          for Paris, Tokyo, Seoul, Beijing, Shanghai, and Hong Kong are representative estimates based on
          published annual reports and government statistics — not live API pulls. NYC data is closest to
          source (Socrata open data). London data is from TfL published reports. Chinese metro data comes
          from official operator annual reports, which have limited independent verification. Crime data
          definitions vary so dramatically by country that cross-city comparisons should be treated with
          particular skepticism.
          <br /><br />
          <strong>Checked Oct. 31, 2026:</strong> fares, NYC station accessibility and ridership, the safety
          section and the funding section were checked against operator and agency sources, which are linked
          on each card. The on-time, headway and ridership-recovery series run through 2024 and have not been
          updated. Other cities' system sizes, accessibility shares and bus speeds were not rechecked.
        </div>
      </ChartWrapper>

      <SectionTitle>Data Sources</SectionTitle>

      <ChartWrapper>
        <div style={styles.sourceGrid}>
          <SourceCard city="nyc" sources={[
            { name: 'Subway On-Time Performance', url: 'https://data.ny.gov/Transportation/MTA-Subway-Terminal-On-Time-Performance-Beginning-/vtvh-gimj', desc: '% trains arriving at terminal on schedule' },
            { name: 'Wait Assessment', url: 'https://data.ny.gov/Transportation/MTA-Subway-Wait-Assessment-2020-2024/6b7q-snec', desc: 'Regularity of train spacing' },
            { name: 'MTA Fares', url: 'https://www.mta.info/fares', desc: 'OMNY caps and fare structure' },
            { name: 'Subway Ridership 2025', url: 'https://www.mta.info/agency/new-york-city-transit/ridership/2025', desc: '1.28 billion rides in 2025' },
            { name: 'Station Accessibility', url: 'https://www.mta.info/document/215256', desc: '161 accessible stations (July 2026 board update)' },
            { name: 'Bus Speeds', url: 'https://data.ny.gov/Transportation/MTA-Bus-Speeds-Beginning-2025/4u4b-jge6', desc: 'MTA Bus Speeds open data + Comptroller report' },
          ]} />
          <SourceCard city="london" sources={[
            { name: 'Underground Performance', url: 'https://tfl.gov.uk/corporate/publications-and-reports/underground-services-performance', desc: '% scheduled service operated' },
            { name: 'London Datastore', url: 'https://data.london.gov.uk/dataset/london-underground-performance-reports/', desc: 'CSV performance data' },
            { name: 'TfL Fares', url: 'https://tfl.gov.uk/fares/', desc: 'Zone-based fares and caps' },
            { name: 'March 2026 Fare Changes', url: 'https://www.london.gov.uk/md3464-march-2026-transport-london-fare-changes', desc: 'Mayoral decision setting 2026 fares' },
            { name: 'Bus Speeds', url: 'https://tfl.gov.uk/corporate/publications-and-reports/buses-performance-data', desc: 'TfL Buses Performance Data' },
          ]} />
          <SourceCard city="paris" sources={[
            { name: 'IDFM Open Data', url: 'https://data.iledefrance-mobilites.fr/', desc: 'GTFS, performance, ridership' },
            { name: 'RATP Performance', url: 'https://www.ratp.fr/groupe-ratp/nos-engagements/qualite-et-ponctualite', desc: 'Punctuality by line' },
            { name: 'Navigo Fares', url: 'https://www.iledefrance-mobilites.fr/tarifs', desc: 'All-zone monthly Navigo pass' },
            { name: '2026 Fares', url: 'https://entreprendre.service-public.gouv.fr/actualites/A18679?lang=en', desc: 'Service-public.fr summary of 2026 IDFM fares' },
            { name: 'Bus Speeds', url: 'https://data.iledefrance-mobilites.fr/', desc: 'RATP vitesse commerciale data' },
          ]} />
          <SourceCard city="tokyo" sources={[
            { name: 'ODPT Open Data', url: 'https://www.odpt.org/', desc: 'Open Data for Public Transportation' },
            { name: 'Tokyo Metro Stats', url: 'https://www.tokyometro.jp/corporate/enterprise/passenger_rail/transportation/index.html', desc: 'Ridership and performance' },
            { name: 'Fare Tables', url: 'https://www.tokyometro.jp/en/ticket/regular/index.html', desc: 'Distance-based fare chart' },
          ]} />
          <SourceCard city="seoul" sources={[
            { name: 'Seoul Open Data', url: 'https://data.seoul.go.kr/', desc: 'Metro ridership, performance, infrastructure' },
            { name: 'T-money Data', url: 'https://pay.tmoney.co.kr/', desc: 'Fare structure and Climate Card' },
            { name: 'KOTI Transport DB', url: 'https://www.ktdb.go.kr/', desc: 'National transportation statistics' },
            { name: 'Bus Lane Performance', url: 'https://www.seoulsolution.kr/en/content/6534', desc: 'Exclusive median bus lane data' },
          ]} />
          <SourceCard city="beijing" sources={[
            { name: 'Beijing Subway', url: 'https://www.bjsubway.com/', desc: 'Official operator data and fare info' },
            { name: 'Beijing Transport Commission', url: 'https://jtw.beijing.gov.cn/', desc: 'Municipal transport statistics' },
          ]} />
          <SourceCard city="shanghai" sources={[
            { name: 'Shanghai Metro', url: 'https://www.shmetro.com/', desc: 'Official operator and ridership data' },
            { name: 'Shanghai Open Data', url: 'https://data.sh.gov.cn/', desc: 'Municipal open data portal' },
          ]} />
          <SourceCard city="hongkong" sources={[
            { name: 'MTR Corporation', url: 'https://www.mtr.com.hk/', desc: 'Annual reports, ridership, performance' },
            { name: 'MTR Fare Table', url: 'https://opendata.mtr.com.hk/data/mtr_lines_fares.csv', desc: 'MTR open data, all station-pair fares' },
            { name: 'HK Transport Dept', url: 'https://www.td.gov.hk/', desc: 'Transport statistics and open data' },
          ]} />
        </div>
      </ChartWrapper>

      <SectionTitle>Comparability Caveats</SectionTitle>

      <ChartWrapper>
        <div style={styles.caveats}>
          <Caveat title="On-time / reliability" level="high">
            The biggest apples-to-oranges problem. Each system defines and measures "on-time"
            differently. Tokyo's 96% (within 5 min) and London's 92% (service operated) sound
            close but measure fundamentally different things. NYC's terminal-arrival metric
            penalizes mid-route delays differently than Paris's departure-based metric. The chart
            shows each system's own standard — not a universal benchmark.
          </Caveat>
          <Caveat title="Headways / frequency" level="medium">
            We use system-wide averages from GTFS static schedules. But "average" masks huge
            variance: Tokyo's busiest lines run every 90 seconds while some NYC lines run
            every 10 minutes at peak. Seoul's 739 stations include suburban lines with longer
            headways. London's 11 lines are all high-frequency trunk lines.
          </Caveat>
          <Caveat title="Fares" level="medium">
            Converted at nominal exchange rates, not purchasing power parity. A $1 ride in
            Seoul buys far more locally than a $3 ride in NYC. Tokyo's distance-based pricing
            means the "minimum fare" understates typical journey costs. London's zone system
            means the Zone 1 fare overstates typical commuter costs (most ride Zone 1-2 or 1-3).
          </Caveat>
          <Caveat title="Monthly passes" level="medium">
            Only NYC (via its weekly cap), London, Paris and Seoul have a flat monthly product. Tokyo and
            Hong Kong sell route-based commuter passes; Beijing discounts heavy riders; Shanghai has no pass.
            Those cities show N/A rather than an estimate. An earlier version compared monthly cost with
            median income; it was removed because the income figures could not be traced to a source and
            the countries define income differently.
          </Caveat>
          <Caveat title="Safety / crime" level="high">
            The least comparable metric. Only NYC (major felonies) and London (all notifiable offenses)
            publish a metro crime rate per million journeys, and they count very different things. Tokyo's
            figure is groping arrests only and Hong Kong's is a city-wide total. Paris, Seoul, Beijing and
            Shanghai publish no metro-specific figure we could find, so they show N/A rather than an estimate.
          </Caveat>
          <Caveat title="Bus speed" level="medium">
            All figures use "revenue speed" (total route distance / total trip time including stops,
            boarding, and traffic). NYC, London, and Paris report this metric directly from
            operational data. Tokyo, Seoul (corridor-level), Beijing, Shanghai, and Hong Kong figures
            are derived from government transport surveys, planning models, or academic GPS studies.
            Paris's 9 km/h figure is for the city proper only (intra-muros) -- the RATP network-wide
            average including suburbs is ~14 km/h. Seoul's figure reflects its reformed median bus lane
            corridors, not the full network. Chinese city figures come from municipal transport
            commissions with limited independent verification.
          </Caveat>
          <Caveat title="System boundaries" level="low">
            NYC = MTA subway + bus. London = TfL Underground + buses (excludes Overground,
            Elizabeth line). Paris = RATP Metro + buses (excludes RER). Tokyo = Tokyo Metro + Toei
            (excludes JR East, private railways). Seoul = Seoul Metro Lines 1-9 + metro lines.
            Beijing/Shanghai = all urban metro lines. Hong Kong = MTR heavy rail (excludes light rail).
          </Caveat>
          <Caveat title="Currency conversion" level="low">
            GBP $1.3375, EUR $1.1199, JPY $0.00637, KRW $0.000755, CNY $0.1499, HKD $0.1275.
            Federal Reserve H.10 rates for Oct. 23, 2026, via FRED.
          </Caveat>
          <Caveat title="Chinese data transparency" level="high">
            Beijing and Shanghai metro data comes from official operator and government sources.
            Independent verification is limited. Ridership figures are generally considered
            reliable but performance and safety statistics have less third-party validation than
            data from systems in democracies with press freedom.
          </Caveat>
        </div>
      </ChartWrapper>

      <SectionTitle>About</SectionTitle>

      <ChartWrapper>
        <div style={styles.about}>
          Built for personal exploration. Fares checked Oct. 31, 2026.
          Not affiliated with any transit agency.
        </div>
      </ChartWrapper>
    </div>
  );
}

function SourceCard({ city, sources }) {
  const cfg = CITY_CONFIG[city];
  return (
    <div style={{ ...styles.sourceCard, borderTop: `3px solid ${cfg.color}` }}>
      <div style={{ ...styles.sourceCity, color: cfg.color }}>{cfg.name}</div>
      <div style={styles.sourceList}>
        {sources.map((s) => (
          <div key={s.name} style={styles.source}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" style={styles.sourceLink}>{s.name}</a>
            <div style={styles.sourceDesc}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Caveat({ title, level, children }) {
  const levelColors = { high: '#C62828', medium: '#E65100', low: '#558B2F' };
  const levelLabels = { high: 'Low comparability', medium: 'Moderate comparability', low: 'Mostly comparable' };
  return (
    <div style={styles.caveat}>
      <div style={styles.caveatHeader}>
        <div style={styles.caveatTitle}>{title}</div>
        <div style={{ ...styles.caveatLevel, color: levelColors[level] }}>{levelLabels[level]}</div>
      </div>
      <div style={styles.caveatText}>{children}</div>
    </div>
  );
}

const styles = {
  intro: { fontSize: 15, lineHeight: 1.7, color: '#444' },
  sourceGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 14,
  },
  sourceCard: { backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: 10, padding: 18 },
  sourceCity: { fontSize: 14, fontWeight: 700, marginBottom: 12 },
  sourceList: { display: 'flex', flexDirection: 'column', gap: 10 },
  source: {},
  sourceLink: { fontSize: 13, fontWeight: 600, color: '#0039A6', textDecoration: 'none' },
  sourceDesc: { fontSize: 11, color: '#888', marginTop: 1 },
  caveats: { display: 'flex', flexDirection: 'column', gap: 12 },
  caveat: { backgroundColor: '#fff', border: '1px solid #E5E5E5', borderRadius: 8, padding: '14px 18px' },
  caveatHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  caveatTitle: { fontSize: 14, fontWeight: 700, color: '#1A1A1A' },
  caveatLevel: { fontSize: 11, fontWeight: 600 },
  caveatText: { fontSize: 13, lineHeight: 1.6, color: '#555' },
  about: { fontSize: 14, color: '#888', textAlign: 'center', padding: 20 },
};
