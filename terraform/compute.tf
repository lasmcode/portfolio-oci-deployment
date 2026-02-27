

resource "oci_core_instance" "portfolio_instance" {
  availability_domain = data.oci_identity_availability_domain.ad.name
  compartment_id      = var.compartment_id
  display_name        = "portfolio-instance"
  shape               = var.shape-instance
  
  shape_config {
    ocpus = var.ocpus 
    memory_in_gbs = var.memory_in_gbs
  }
   create_vnic_details {
    subnet_id        = oci_core_subnet.portfolio_public_subnet.id
    assign_public_ip = false
    hostname_label   = "vnic-portfolio"
  }

  
  source_details {
    source_type = "image"
    source_id   = local.ubuntu_image_id
  }

  
  metadata = {
    ssh_authorized_keys = local.raw_ssh_key
    user_data           = base64encode(templatefile("${path.module}/userdata.tftpl", {
      SSH_DEPLOY_KEY_OCID = var.ssh_deploy_key_ocid
      GITHUB_REPO     = var.github_repo
      
      # Injection of .env variables
      db_password  = var.db_password
      wallet_password        = var.wallet_password 
      portfolio_domain         = var.portfolio_domain    
      
      # Database Connection Injection
      db_wallet_content = oci_database_autonomous_database_wallet.adb_wallet.content
      db_service_name   = "${oci_database_autonomous_database.portfolio_adb.db_name}_high"
      init_sql_content  = file("${path.module}/init.sql")

      GIT_TOKEN_SECRET_OCID      = var.git_token_secret_ocid
      GITHUB_USER       = var.github_user
      # variables for the certificate
      CLOUDFLARE_CERT = cloudflare_origin_ca_certificate.portfolio_cert.certificate
      CLOUDFLARE_KEY  = tls_private_key.origin_key.private_key_pem
    }))
  }
  
}

# Assign the Reserved Public IP to the Private IP of the instance
resource "oci_core_public_ip" "portfolio_reserved_ip" {
  compartment_id = var.compartment_id
  lifetime       = "RESERVED"
  
  
  private_ip_id  = data.oci_core_private_ips.portfolio_private_ip.private_ips[0].id
  display_name   = "portfolio-reserved-ip"
   # Security: Prevent Terraform from deleting your reserved IP address from your Oracle account if you destroy the infrastructure
  lifecycle {
    prevent_destroy = true
  }
}

# 1. Create a separate Block Volume for the data (Survives instance destruction)
resource "oci_core_volume" "portfolio_data_volume" {
  availability_domain = data.oci_identity_availability_domain.ad.name
  compartment_id      = var.compartment_id
  display_name        = "portfolio-data-volume"
  size_in_gbs         = 50
  
  lifecycle {
    prevent_destroy = true
  }
}

# 2. Attach the volume to the instance
resource "oci_core_volume_attachment" "portfolio_data_attachment" {
  attachment_type = "paravirtualized"
  instance_id     = oci_core_instance.portfolio_instance.id
  volume_id       = oci_core_volume.portfolio_data_volume.id
  device          = "/dev/oracleoci/oraclevdb" # Se verá como /dev/sdb en Ubuntu
}

# AUTOMATION: Import Block (Requires Terraform 1.7+ to use variables)
# This makes 'terraform apply' detect the existing IP and adopt it without manual commands.
import {
  to = oci_core_public_ip.portfolio_reserved_ip
  id = var.reserved_public_ip_ocid
}