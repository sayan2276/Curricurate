export default function DayCard({ dayData }) {
  return (
    <div className="card day-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ 
            backgroundColor: 'var(--bg-color)', 
            padding: '0.2rem 0.6rem', 
            borderRadius: '4px', 
            fontSize: '0.9rem' 
          }}>{dayData.day}</span>
          {dayData.topic}
        </h3>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>
        {dayData.description}
      </p>
      
      {dayData.subtopics && dayData.subtopics.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>Subtopics:</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {dayData.subtopics.map((sub, idx) => (
              <li key={idx} style={{ fontSize: '0.9rem' }}>{sub}</li>
            ))}
          </ul>
        </div>
      )}
      
      {dayData.assignment && (
        <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-blue)' }}>
          <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', color: 'var(--primary-blue)' }}>Assignment:</h4>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>{dayData.assignment}</p>
        </div>
      )}
    </div>
  );
}
