#!/bin/bash

# 1. Safely clean up old versions
sudo apt-get remove -y docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc || true

# 2. Configure the official repository
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 3. Add the repository to the Apt sources
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

# 4. Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 5. Start and configure permissions for the current user
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

echo "----------------------------------------------------"
echo "Instalación completada."
echo "IMPORTANTE: Para usar docker sin 'sudo', cierra sesión y vuelve a entrar."
echo "----------------------------------------------------"

# 6. Quick test (this will fail without sudo until you restart your session, that's why we use sudo here)
sudo docker run --rm hello-world
