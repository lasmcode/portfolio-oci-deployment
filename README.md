# Portfolio on OCI — Infrastructure as Code

<div align="center">

**A production-grade personal portfolio deployed on Oracle Cloud Infrastructure using Terraform, Docker, and a fully automated CI/CD pipeline.**

[![Terraform](https://img.shields.io/badge/Terraform-1.7+-7B42BC?style=flat-square&logo=terraform&logoColor=white)](https://terraform.io)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)
[![Oracle](https://img.shields.io/badge/Oracle-Autonomous_DB-F80000?style=flat-square&logo=oracle&logoColor=white)](https://oracle.com/cloud)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-DNS_+_SSL-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://cloudflare.com)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=flat-square&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![OCI Always Free](https://img.shields.io/badge/OCI-Always_Free-F80000?style=flat-square&logo=oracle&logoColor=white)](#)

</div>

---
## Architecture

```
                        ┌─────────────────────────────────────────────────────────┐
                        │                    OCI Always Free                      │
  User                  │                                                         │
   │                    │   ┌─────────────────────────────────────────────────┐   │
   │  HTTPS             │   │           Compute Instance (Ampere A1)          │   │
   ▼                    │   │                                                 │   │
┌──────────┐  Origin    │   │  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │   │
│Cloudflare│  Cert TLS  │   │  │  Nginx   │  │ Next.js  │  │  Watchtower  │   │   │
│  Proxy   │──────────▶│   │  │  :443    │─▶│  :3000   │  │  (CD agent)  │   │   │
└──────────┘            │   │  └──────────┘  └────┬─────┘  └──────────────┘   │   │
                        │   │                      │                          │   │
                        │   │              ┌───────▼──────┐                   │   │
                        │   │              │  Oracle ADB  │                   │   │
                        │   │              │  Autonomous  │                   │   │
                        │   │              │  Database    │                   │   │
                        │   │              └──────────────┘                   │   │
                        │   └─────────────────────────────────────────────────┘   │
                        │                                                         │
                        │   ┌────────────┐                      ┌──────────────┐  │
                        │   │ OCI Vault  │                      │  Dynamic     │  │
                        │   │ (Secrets)  │                      │  Group + IAM │  │
                        │   └────────────┘                      └──────────────┘  │
                        └─────────────────────────────────────────────────────────┘

  GitHub                     CI/CD Flow
  ┌──────────────────────────────────────────────────────────────────────┐
  │  push to main                                                        │
  │       │                                                              │
  │       ▼                                                              │
  │  GitHub Actions ──▶ Build Docker Image ──▶ Push to GHCR             │
  │                                                    │                 │
  │                                          Watchtower detects          │
  │                                          new image ──▶ Auto-deploy   │
  └──────────────────────────────────────────────────────────────────────┘
```

---
## Tech Stack

| Layer | Technology |
|---|---|
| **IaC** | Terraform 1.7+ |
| **Compute** | VM.Standard.E2.1.Micro — Ubuntu 22.04 |
| **Frontend** | Next.js 16 · TypeScript · Tailwind CSS |
| **Database** | Oracle Autonomous Database · oracledb Thin mode |
| **Reverse Proxy** | Nginx Alpine |
| **Containerization** | Docker · Docker Compose |
| **CI/CD** | GitHub Actions · Watchtower |
| **Registry** | GitHub Container Registry (GHCR) |
| **DNS + SSL** | Cloudflare · Origin CA Certificates |
| **Secrets** | OCI Vault · Instance Principal (passwordless auth) |
| **Provisioning** | cloud-init · systemd |

---

## Key Design Decisions

**Zero credentials in the repo** — All secrets (DB password, wallet, SSH keys, GitHub token) live in OCI Vault. The instance authenticates using Instance Principal — the same mechanism as the OCI CLI, but without any API key on disk.

**No Oracle Instant Client** — The app uses `oracledb` in Thin mode (pure JavaScript). This removes ~200MB of native library dependencies from the infrastructure setup and simplifies the Docker image significantly.

**Database migrations in the container** — A `migrate.js` runner executes SQL files from a `migrations/` folder on every container start. Migrations are tracked in a `schema_migrations` table. Adding a new table or column is as simple as creating `004_your_change.sql` and pushing to main.

**systemd over background processes** — The docker-compose deployment runs as a systemd service. This ensures it survives cloud-init's process cleanup on exit and restarts correctly on instance reboot.

---

## CI/CD Pipeline

```
git push origin main
        │
        ▼
┌───────────────────┐
│   GitHub Actions  │
│                   │
│  1. Checkout      │
│  2. Login GHCR    │
│  3. Build image   │──▶  ghcr.io/user/portfolio-web:latest
│  4. Push image    │           │
│  5. Cleanup old   │           │
│     versions      │           ▼
└───────────────────┘    Watchtower (every 5min)
                                 │
                                 ▼
                         Pull new image
                                 │
                                 ▼
                         node scripts/migrate.js  ← runs pending SQL migrations
                                 │
                                 ▼
                         node server.js           ← Next.js live
```

Zero manual steps. Every push to `main` is live in ~3 minutes.

---

## Key Design Decisions

**Zero credentials in the repo** — All secrets (DB password, wallet, SSH keys, GitHub token) live in OCI Vault. The instance authenticates using Instance Principal — the same mechanism as the OCI CLI, but without any API key on disk.

**No Oracle Instant Client** — The app uses `oracledb` in Thin mode (pure JavaScript). This removes ~200MB of native library dependencies from the infrastructure setup and simplifies the Docker image significantly.

**Database migrations in the container** — A `migrate.js` runner executes SQL files from a `migrations/` folder on every container start. Migrations are tracked in a `schema_migrations` table. Adding a new table or column is as simple as creating `004_your_change.sql` and pushing to main.

**systemd over background processes** — The docker-compose deployment runs as a systemd service. This ensures it survives cloud-init's process cleanup on exit and restarts correctly on instance reboot.

---

## CI/CD Pipeline

```
git push origin main
        │
        ▼
┌───────────────────┐
│   GitHub Actions  │
│                   │
│  1. Checkout      │
│  2. Login GHCR    │
│  3. Build image   │──▶  ghcr.io/user/portfolio-web:latest
│  4. Push image    │           │
│  5. Cleanup old   │           │
│     versions      │           ▼
└───────────────────┘    Watchtower (every 5min)
                                 │
                                 ▼
                         Pull new image
                                 │
                                 ▼
                         node scripts/migrate.js  ← runs pending SQL migrations
                                 │
                                 ▼
                         node server.js           ← Next.js live
```

Zero manual steps. Every push to `main` is live in ~3 minutes.

---

## CI/CD Pipeline

```
git push origin main
        │
        ▼
┌───────────────────┐
│   GitHub Actions  │
│                   │
│  1. Checkout      │
│  2. Login GHCR    │
│  3. Build image   │──▶  ghcr.io/user/portfolio-web:latest
│  4. Push image    │           │
│  5. Cleanup old   │           │
│     versions      │           ▼
└───────────────────┘    Watchtower (every 5min)
                                 │
                                 ▼
                         Pull new image
                                 │
                                 ▼
                         node scripts/migrate.js  ← runs pending SQL migrations
                                 │
                                 ▼
                         node server.js           ← Next.js live
```

Zero manual steps. Every push to `main` is live in ~3 minutes.

---

## Boot Sequence (cloud-init)

When `terraform apply` creates the instance, `cloud-init` runs this sequence automatically:

```
1. apt-get — system packages
2. OCI Vault → fetch SSH deploy key → git clone repo → shred key
3. Install Docker
4. OCI API → download ADB wallet → fix sqlnet.ora
5. Generate .env.local (DB connection string extracted from tnsnames.ora)
6. OCI Vault → fetch GitHub token → docker login ghcr.io
7. docker pull (pre-cache images as root)
8. Create systemd service → enable → start
   └── docker-compose up
         ├── portfolio-web  (Next.js + migrate.js)
         ├── portfolio-nginx
         └── watchtower
```

---

## Prerequisites

- OCI account (Always Free tier is enough)
- Terraform CLI 1.7+
- Domain managed by Cloudflare
- GitHub account

### Secrets to create in OCI Vault

| Secret | Description |
|---|---|
| `ssh_deploy_key` | Private SSH key to clone the app repo |
| `admin_ssh_public_key` | Public SSH key for instance access |
| `git_token` | GitHub PAT with `read:packages` scope |

---

## Deployment

```bash
git clone https://github.com/lasmcode/portfolio-oci-deployment.git
cd portfolio-oci-deployment

cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values

terraform init
terraform plan
terraform apply
```

Monitor boot progress:
```bash
ssh ubuntu@<INSTANCE_IP>
tail -f /var/log/user-data.log        # cloud-init
tail -f ~/portfolio-oci-deployment/deploy.log  # docker-compose
```

---

## Local Development

```bash
cd portfolio-web
cp .env.local.example .env.local
# Set OCI_DB_* vars and wallet path

npm install
npm run dev
```

Database migrations:
```bash
node scripts/migrate.js   # runs pending migrations
```

---

## Adding a Database Migration

```bash
# Create a new migration file
touch portfolio-web/migrations/004_add_skills_table.sql

# Write your SQL
echo "CREATE TABLE skills (id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, ...);" \
  > portfolio-web/migrations/004_add_skills_table.sql

# Push — Watchtower deploys, migrate.js runs the new file automatically
git add . && git commit -m "feat: add skills table" && git push
```

---

## License

MIT — see [LICENSE](LICENSE.md)
