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

provider "oci" {
  alias                = "homeregion"
  tenancy_ocid         = var.tenancy_ocid
  user_ocid            = var.user_ocid
  fingerprint          = var.fingerprint
  private_key_path     = var.private_key_path
  region               = data.oci_identity_region_subscriptions.region_info.region_subscriptions[0].region_name
  disable_auto_retries = "true"
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}