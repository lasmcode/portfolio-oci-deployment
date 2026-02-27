resource "oci_identity_dynamic_group" "portfolio_dg" {
  compartment_id = var.tenancy_ocid 
  name           = "portfolio-instance-group"
  description    = "Dynamic group for the portfolio instance"  
  matching_rule  = "ALL {instance.compartment.id = '${var.compartment_id}'}"
}

resource "oci_identity_policy" "portfolio_vault_policy" {
  name           = "portfolio-vault-read-policy"
  description    = "Allows the instance to read secrets from the Vault"
  compartment_id = var.compartment_id
  
  statements = [
    "Allow dynamic-group ${oci_identity_dynamic_group.portfolio_dg.name} to read secret-family in compartment id ${var.compartment_id}"
  ]
}