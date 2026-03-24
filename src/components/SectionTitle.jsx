export default function SectionTitle({ children }) {
  return <h3 style={styles.title}>{children}</h3>;
}

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1A1A1A',
    marginBottom: 20,
    marginTop: 36,
    paddingBottom: 8,
    borderBottom: '2px solid #E5E5E5',
  },
};
