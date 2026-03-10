import { useState } from 'react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CurriculumForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    skill: '',
    level: 'UG',
    weeks: 4,
    weeklyHours: '',
    industry: '',
    days: ['Mon', 'Wed', 'Fri']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weeks' || name === 'weeklyHours' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (day) => {
    setFormData(prev => {
      const isSelected = prev.days.includes(day);
      let newDays;
      if (isSelected) {
        newDays = prev.days.filter(d => d !== day);
      } else {
        newDays = [...prev.days, day];
      }
      return { ...prev, days: newDays };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.days.length === 0) {
      alert("Please select at least one weekday.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="card form-container" style={{ marginBottom: '2rem' }}>
      <h2 style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem', textAlign: 'center' }}>AI Curriculum Planner</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Skill *</label>
          <input 
            type="text" 
            name="skill" 
            placeholder="e.g. Machine Learning, Python, UI Design" 
            value={formData.skill} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Level *</label>
            <select name="level" value={formData.level} onChange={handleChange} required>
              <option value="UG">UG</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Number of Weeks *</label>
            <input 
              type="number" 
              name="weeks" 
              min="1" 
              max="52" 
              value={formData.weeks} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Weekly Hours (Optional)</label>
            <input 
              type="number" 
              name="weeklyHours" 
              min="1" 
              value={formData.weeklyHours || ''} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Industry Focus (Optional)</label>
            <input 
              type="text" 
              name="industry" 
              placeholder="e.g. Healthcare, Finance" 
              value={formData.industry} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Week Days *</label>
          <div className="checkbox-group">
            {WEEKDAYS.map(day => (
              <label key={day} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={formData.days.includes(day)}
                  onChange={() => handleCheckboxChange(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || formData.days.length === 0}
          style={{ marginTop: '1rem', padding: '0.75rem', fontSize: '1.1rem' }}
        >
          {loading ? 'Generating...' : 'Generate Curriculum'}
        </button>
      </form>
    </div>
  );
}
