export const PORTFOLIO_QUERY = `
  SELECT JSON_OBJECT (
      'user' VALUE (
          SELECT JSON_OBJECT(
              'name' VALUE name,
              'professional_title' VALUE professional_title,
              'about' VALUE about,
              'location' VALUE location
          ) FROM users WHERE id = :id
      ),
      'experiences' VALUE (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'enterprise' VALUE enterprise,
                  'job_title' VALUE job_title,
                  'description' VALUE description,
                  'start_date' VALUE TO_CHAR(start_date, 'YYYY-MM-DD'),
                  'end_date' VALUE TO_CHAR(end_date, 'YYYY-MM-DD')
              ) ORDER BY start_date DESC
          ) FROM experiences WHERE user_id = :id AND is_active = 1
      ),
      'projects' VALUE (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'name' VALUE name,
                  'description' VALUE description,
                  'technologies' VALUE technologies,
                  'github_link' VALUE github_link,
                  'image_url' VALUE image_url
              )
          ) FROM projects WHERE user_id = :id
      ),
      'certifications' VALUE (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'name' VALUE name,
                  'organization' VALUE organization,
                  'url_file' VALUE url_file,
                  'badge_url' VALUE badge_url
              )
          ) FROM certifications WHERE user_id = :id AND is_active = 1
      ),
      'social_links' VALUE (
          SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                  'platform' VALUE platform,
                  'url' VALUE url
              )
          ) FROM social_links WHERE user_id = :id
      )
  ) as full_data FROM dual
`;

export const MOCK_DATA = {
  user: {
    name: "Alejandro S",
    professional_title: "Full Stack Developer & OCI Specialist",
    about: "Desarrollador apasionado por la arquitectura cloud y soluciones escalables.",
    location: "Colombia"
  },
  experiences: [
    {
      enterprise: "Tech Solutions",
      job_title: "Senior Developer",
      description: "Liderazgo de proyectos cloud.",
      start_date: "2023-01-01",
      end_date: null
    }
  ],
  projects: [
    {
      name: "OCI Portfolio",
      description: "Portafolio dinámico con Oracle DB",
      technologies: "Next.js, TypeScript, OCI",
      github_link: "#",
      image_url: "/images/projects/portfolio.jpg"
    }
  ],
  certifications: [
    {
      name: "OCI Foundations Associate",
      organization: "Oracle",
      url_file: "https://catalog-education.oracle.com/...",
      badge_url: "/images/certs/oci-foundations.png"
    },
    {
      name: "OCI Architect Associate",
      organization: "Oracle",
      url_file: "https://catalog-education.oracle.com/...",
      badge_url: "/images/certs/oci-architect.png"
    }
  ],
  social_links: [
  { platform: "linkedin", url: "https://linkedin...", icon_url: null },
  { platform: "github", url: "https://github...", icon_url: null },
  { platform: "web", url: "https://solar.te", icon_url: "https://.../icon.png" }
]
};

export const APP_CONFIG = {
  USER_ID: 1, // ID del usuario principal en la BD
  SITE_TITLE: 'Alejandro S - Portafolio',
  SITE_DESCRIPTION: 'Portafolio profesional de Alejandro S, desarrollador Full Stack',
} as const;
