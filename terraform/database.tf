resource "oci_database_autonomous_database" "portfolio_adb" {
  compartment_id        = var.compartment_id
  db_name               = "PORTDB"
  cpu_core_count        = 1
  admin_password        = var.db_password
  db_workload           = "OLTP"
  is_free_tier          = true
  display_name          = "Portfolio ADB"
  license_model         = "LICENSE_INCLUDED"
  is_auto_scaling_enabled = true
  subnet_id = oci_core_subnet.portfolio_private_subnet.id
  nsg_ids   = [oci_core_network_security_group.adb_nsg.id]
  
}

resource "oci_database_autonomous_database_wallet" "adb_wallet" {
  autonomous_database_id = oci_database_autonomous_database.portfolio_adb.id
  password               = var.wallet_password
  base64_encode_content  = true
}

resource "local_file" "wallet_zip" {
  content_base64 = oci_database_autonomous_database_wallet.adb_wallet.content
  filename       = "${path.module}/wallet.zip"
  depends_on     = [oci_database_autonomous_database_wallet.adb_wallet]
}
