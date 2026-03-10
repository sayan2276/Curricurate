export default function WeekSelector({ weeks, selectedWeek, onSelectWeek }) {
  if (!weeks || weeks.length === 0) return null;

  return (
    <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <label htmlFor="week-select" style={{ fontWeight: 600, fontSize: '1.1rem' }}>Select Week:</label>
      <select 
        id="week-select"
        value={selectedWeek || ''} 
        onChange={(e) => onSelectWeek(Number(e.target.value))}
        style={{ width: 'auto', minWidth: '150px' }}
      >
        {weeks.map(w => (
          <option key={w.week} value={w.week}>
            Week {w.week}
          </option>
        ))}
      </select>
    </div>
  );
}
