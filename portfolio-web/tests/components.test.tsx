import { render, screen } from '@testing-library/react';
import ExperienceCard from '../src/components/ExperienceCard';

test('Debe calcular correctamente la visualización de una experiencia activa', () => {
  const activeExp = {
    enterprise: 'Oracle',
    job_title: 'Architect',
    start_date: '2024-01-01',
    end_date: null,
    description: '...'
  };

  render(<ExperienceCard experience={activeExp} />);
  expect(screen.getByText(/presente/i)).toBeInTheDocument();
});
