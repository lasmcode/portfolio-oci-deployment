import { render, screen } from '@testing-library/react';
import ExperienceCard from '../src/components/ExperienceCard';

test('should display "Present" for an active experience with a null end date', () => {
  const activeExp = {
    enterprise: 'Oracle',
    job_title: 'Architect',
    start_date: '2024-01-01',
    end_date: null,
    description: 'Working on cloud solutions.'
  };

  render(<ExperienceCard experience={activeExp} />);
  expect(screen.getByText(/Present/i)).toBeInTheDocument();
});
