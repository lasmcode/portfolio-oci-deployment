


variable "vcn_cidr" {
  description = "The CIDR block for the VCN"
  type        = string
}

variable "tenancy_ocid" {
  description = "The OCID of the tenancy"
  type        = string
  sensitive   = true
}

variable "user_ocid" {
  description = "The OCID of the user"
  type        = string
  sensitive   = true
}

variable "fingerprint" {
  description = "The fingerprint of the API key"
  type        = string
  sensitive   = true
}

variable "private_key_path" {
  description = "Local path to OCI private key (.pem)."
  type        = string
  sensitive   = true
}

variable "compartment_id" {
  description = "The OCID of the compartment"
  type        = string
}

variable "ubuntu_os_version" {
  description = "The version of Ubuntu OS to use for the instance"
  type        = string
  default     = "22.04"
}


variable "shape-instance" {
  default = "VM.Standard.A1.Flex"
}

variable "ocpus" {
  description = "Number of OCPUs for the instance"
  type        = number
  default     = 2
}
variable "memory_in_gbs" {
  description = "Amount of memory in GBs for the instance"
  type        = number
  default     = 12
}

variable "github_repo" {
  description = "URL SSH del repositorio (ej. git@github.com:usuario/repo.git)"
  type        = string
}

variable "availability_domain_number" {
  description = "The availability domain number to use (1, 2, etc.)"
  type        = number
  default     = 1
}

variable "reserved_public_ip_ocid" {
  description = "OCID de la IP pública reservada existente. Usar para importar el recurso."
  type        = string
}

variable "cloudflare_api_token" {
  description = "API token de Cloudflare"
  type        = string
  sensitive   = true
}

variable "wallet_password" {
  description = "Wallet password for the Autonomous Database"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "password for the Autonomous Database"
  type        = string
  sensitive   = true
}

variable "portfolio_domain" {
  description = "The domain name for the portfolio CMS instance"
  type        = string
}

variable "git_token_secret_ocid" {
  description = "OCID of GitHub Personal Access Token con permisos read:packages in OCI Vault"
  type        = string
  sensitive   = true
}

variable "github_user" {
  description = "GitHub username for Docker Registry authentication"
  type        = string
}

variable "ssh_deploy_key_ocid" {
  description = "OCID of the SSH deploy key git in OCI Vault"
  type        = string
  sensitive   = true
}

variable "admin_ssh_public_key_ocid" {
  description = "OCID of the public SSH key for admin instance access"
  type        = string
  sensitive   = true
}

variable "admin_home_public_ip" {
  type = string
  description = "Public IP address of the home network for administrative access"
  sensitive   = true
}
