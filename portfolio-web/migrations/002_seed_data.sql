-- =================================================================
-- Migration 002: Seed Data
-- Inserts initial portfolio data
-- Safe to run multiple times (uses MERGE to avoid duplicate inserts)
-- =================================================================

-- Insert main user (MERGE avoids duplicate on re-run)
MERGE INTO users u
USING (SELECT 'contact@luissolarte.dev' AS email FROM DUAL) src
ON (u.email = src.email)
WHEN NOT MATCHED THEN
    INSERT (name, professional_title, about, location, email)
    VALUES (
        'Luis Solarte',
        'Desarrollador Full Stack & Cloud Engineer',
        'Apasionado por la creacion de soluciones tecnologicas robustas y escalables desde cero. Con experiencia en el desarrollo de aplicaciones web modernas utilizando Next.js y TypeScript, y en la automatizacion de infraestructura en la nube (IaC) con Terraform en OCI. Mi objetivo es combinar un codigo limpio y eficiente con una infraestructura resiliente y segura.',
        'Madrid, Espana',
        'contact@luissolarte.dev'
    );

-- Insert experiences
MERGE INTO experiences e
USING (SELECT 1 AS user_id, 'Tech Solutions Inc.' AS enterprise FROM DUAL) src
ON (e.user_id = src.user_id AND e.enterprise = src.enterprise)
WHEN NOT MATCHED THEN
    INSERT (user_id, enterprise, job_title, start_date, end_date, description)
    VALUES (1, 'Tech Solutions Inc.', 'Software Engineer',
        TO_DATE('2021-06-01', 'YYYY-MM-DD'), NULL,
        'Desarrollo y mantenimiento de la plataforma principal de la compania. Migracion de servicios a una arquitectura de microservicios en la nube. Implementacion de pipelines de CI/CD para automatizar despliegues.');

MERGE INTO experiences e
USING (SELECT 1 AS user_id, 'Innovate Corp.' AS enterprise FROM DUAL) src
ON (e.user_id = src.user_id AND e.enterprise = src.enterprise)
WHEN NOT MATCHED THEN
    INSERT (user_id, enterprise, job_title, start_date, end_date, description)
    VALUES (1, 'Innovate Corp.', 'Junior Developer',
        TO_DATE('2019-07-01', 'YYYY-MM-DD'), TO_DATE('2021-05-30', 'YYYY-MM-DD'),
        'Participacion en el desarrollo de aplicaciones web internas. Soporte en la resolucion de incidencias y mejora continua de los sistemas existentes.');

-- Insert projects
MERGE INTO projects p
USING (SELECT 1 AS user_id, 'Mi Portafolio Profesional' AS name FROM DUAL) src
ON (p.user_id = src.user_id AND p.name = src.name)
WHEN NOT MATCHED THEN
    INSERT (user_id, name, description, image_url, github_link, demo_link, technologies)
    VALUES (1, 'Mi Portafolio Profesional',
        'Este mismo sitio web. Desplegado en OCI con infraestructura como codigo (Terraform), Docker y una base de datos autonoma. El frontend esta construido con Next.js y Tailwind CSS.',
        '/images/projects/portfolio.jpg',
        'https://github.com/your-user/my-portfolio',
        'https://www.luissanchez.dev',
        'Next.js, TypeScript, OCI, Terraform, Docker, Oracle DB');

MERGE INTO projects p
USING (SELECT 1 AS user_id, 'Plataforma de E-commerce' AS name FROM DUAL) src
ON (p.user_id = src.user_id AND p.name = src.name)
WHEN NOT MATCHED THEN
    INSERT (user_id, name, description, image_url, github_link, demo_link, technologies)
    VALUES (1, 'Plataforma de E-commerce',
        'Una tienda online completa con carrito de compras, pasarela de pago y panel de administracion. Construida con un enfoque en el rendimiento y la experiencia de usuario.',
        '/images/projects/ecommerce.jpg',
        'https://github.com/your-user/ecommerce-project',
        NULL,
        'React, Node.js, Express, PostgreSQL');

-- Insert certifications
MERGE INTO certifications c
USING (SELECT 1 AS user_id, 'Oracle Cloud Infrastructure 2024 Foundations Associate' AS name FROM DUAL) src
ON (c.user_id = src.user_id AND c.name = src.name)
WHEN NOT MATCHED THEN
    INSERT (user_id, name, organization, url_file, badge_url, is_active)
    VALUES (1,
        'Oracle Cloud Infrastructure 2024 Foundations Associate',
        'Oracle',
        'https://catalog-education.oracle.com/...id=TU_ID',
        '/images/certs/oci-foundations.png',
        1);

-- Insert social links
MERGE INTO social_links s
USING (SELECT 1 AS user_id, 'github' AS platform FROM DUAL) src
ON (s.user_id = src.user_id AND s.platform = src.platform)
WHEN NOT MATCHED THEN
    INSERT (user_id, platform, url) VALUES (1, 'github', 'https://github.com/your-user');

MERGE INTO social_links s
USING (SELECT 1 AS user_id, 'linkedin' AS platform FROM DUAL) src
ON (s.user_id = src.user_id AND s.platform = src.platform)
WHEN NOT MATCHED THEN
    INSERT (user_id, platform, url) VALUES (1, 'linkedin', 'https://linkedin.com/in/your-profile');

MERGE INTO social_links s
USING (SELECT 1 AS user_id, 'twitter' AS platform FROM DUAL) src
ON (s.user_id = src.user_id AND s.platform = src.platform)
WHEN NOT MATCHED THEN
    INSERT (user_id, platform, url) VALUES (1, 'twitter', 'https://twitter.com/your-handle');
