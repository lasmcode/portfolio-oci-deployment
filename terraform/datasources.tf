

data "oci_identity_region_subscriptions" "region_info" {
  tenancy_id = var.tenancy_ocid
}

data "oci_identity_availability_domain" "ad" {
  compartment_id = var.compartment_id
  ad_number      = var.availability_domain_number
}

data "oci_core_images" "ubuntu_images" {
  compartment_id           = var.compartment_id
  operating_system         = "Canonical Ubuntu"
  operating_system_version = var.ubuntu_os_version
  shape                    = var.shape-instance
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
}


data "oci_core_vnic_attachments" "portfolio_vnics" {
  compartment_id      = var.compartment_id
  availability_domain = oci_core_instance.portfolio_instance.availability_domain
  instance_id         = oci_core_instance.portfolio_instance.id
}

data "oci_core_vnic" "portfolio_vnic" {
  vnic_id = data.oci_core_vnic_attachments.portfolio_vnics.vnic_attachments[0].vnic_id
}


data "oci_core_private_ips" "portfolio_private_ip" {
  vnic_id = data.oci_core_vnic.portfolio_vnic.id
}

# Fetch the SSH Public Key bundle from OCI Vault
data "oci_secrets_secretbundle" "admin_ssh_pub" {
  secret_id = var.admin_ssh_public_key_ocid
}

# Local variable to handle decoding and keep the main code cleaner
locals {
  # We decode the base64 content provided by the Vault
  raw_ssh_key = base64decode(data.oci_secrets_secretbundle.admin_ssh_pub.secret_bundle_content.0.content)
}


locals {
  ubuntu_image_id = length(data.oci_core_images.ubuntu_images.images) > 0 ? data.oci_core_images.ubuntu_images.images[0].id : null
}

# Data source para obtener la IP Pública Reservada directamente.
# Esto rompe el ciclo: Instancia -> ADB -> Recurso IP -> Instancia
data "oci_core_public_ip" "reserved_ip" {
  id = var.reserved_public_ip_ocid
}
