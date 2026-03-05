terraform {
  required_providers {
    oci = {
      source = "oracle/oci"
    }
    cloudflare = {
      source = "cloudflare/cloudflare"
    }
    tls = {
      source = "hashicorp/tls"
    }
  }
}

# Default provider — used by all resources that don't specify a provider alias
# (VCN, Compute, Database, Object Storage, etc.)
provider "oci" {
  tenancy_ocid           = var.tenancy_ocid
  user_ocid              = var.user_ocid
  fingerprint            = var.fingerprint
  private_key_path       = var.private_key_path
  region                 = var.region
  retry_duration_seconds = 600
}

# Home region provider — required specifically for IAM resources
# (Dynamic Groups, Policies, Compartments) which must be created
# in the tenancy home region regardless of where other resources live
provider "oci" {
  alias                  = "homeregion"
  tenancy_ocid           = var.tenancy_ocid
  user_ocid              = var.user_ocid
  fingerprint            = var.fingerprint
  private_key_path       = var.private_key_path
  region                 = data.oci_identity_region_subscriptions.region_info.region_subscriptions[0].region_name
  retry_duration_seconds = 600
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
