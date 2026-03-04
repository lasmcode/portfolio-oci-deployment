resource "oci_database_autonomous_database" "portfolio_adb" {
  compartment_id          = var.compartment_id
  db_name                 = "PORTDB"
  cpu_core_count          = 1
  admin_password          = var.db_password
  db_workload             = "OLTP"
  is_free_tier            = true
  display_name            = "Portfolio ADB"
  license_model           = "LICENSE_INCLUDED"
  is_auto_scaling_enabled = false 
  whitelisted_ips = compact([data.oci_core_public_ip.reserved_ip.ip_address, var.admin_home_public_ip])
  is_mtls_connection_required = true
  # subnet_id               = oci_core_subnet.portfolio_private_subnet.id 
  # nsg_ids                 = [oci_core_network_security_group.adb_nsg.id]
}
