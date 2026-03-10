import { useState } from 'react';
import CurriculumForm from '../components/CurriculumForm';
import WeekSelector from '../components/WeekSelector';
import DayCard from '../components/DayCard';
import { generateCurriculum } from '../services/api';

export default function Home() {
  const [curriculum, setCurriculum] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);
    setCurriculum(null);
    
    try {
      const data = await generateCurriculum(formData);
      setCurriculum(data);
      if (data.weeks && data.weeks.length > 0) {
        setSelectedWeek(data.weeks[0].week);
      }
    } catch (err) {
      setError("Failed to generate curriculum. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentWeekData = curriculum?.weeks?.find(w => w.week === selectedWeek);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--primary-blue)', margin: '0 0 0.5rem 0' }}>Curriculate</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', margin: 0 }}>AI-Powered Curriculum Generation</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem' }}>
        <CurriculumForm onSubmit={handleGenerate} loading={loading} />

        {loading && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner"></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Generating curriculum...</p>
          </div>
        )}

        {error && (
          <div className="card" style={{ 
            backgroundColor: '#fef2f2', 
            border: '1px solid #fecaca', 
            color: '#b91c1c',
            textAlign: 'center',
            padding: '1.5rem'
          }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{error}</p>
          </div>
        )}

        {curriculum && !loading && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>Your Learning Plan</h2>
              <WeekSelector 
                weeks={curriculum.weeks} 
                selectedWeek={selectedWeek} 
                onSelectWeek={setSelectedWeek} 
              />
            </div>

            {currentWeekData ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1.5rem',
                alignItems: 'stretch'
              }}>
                {currentWeekData.days.map((dayData, idx) => (
                  <DayCard key={`${currentWeekData.week}-${dayData.day}-${idx}`} dayData={dayData} />
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No data available for the selected week.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
