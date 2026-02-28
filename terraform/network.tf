# 1. Create the VCN
resource "oci_core_vcn" "portfolio_vcn" {
  cidr_block     = var.vcn_cidr
  compartment_id = var.compartment_id
  display_name   = "portfolio_vcn"
  dns_label      = "portfoliovcn"
}

# 2. Create the Internet Gateway
resource "oci_core_internet_gateway" "portfolio_ig" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.portfolio_vcn.id
  display_name   = "portfolio_internet_gateway"
}


# 3. Configure the routing table to use the Internet Gateway
resource "oci_core_route_table" "portfolio_public_route_table" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.portfolio_vcn.id
  display_name   = "portfolio_public_route_table"
  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.portfolio_ig.id
  }
}

# 4. Security: Open ports 22, 80 and 443
resource "oci_core_security_list" "portfolio_sl" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.portfolio_vcn.id
  display_name   = "portfolio_security_list"

  # Rule for SSH (Port 22)
  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options {
      min = 22
      max = 22
    }
  }

  # Rule for HTTP and HTTPS (Ports 80 and 443)
  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 80
      max = 80
    }
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 443
      max = 443
    }
  }

  # Egress Rule - Allow all outbound traffic
  egress_security_rules {
    destination = "0.0.0.0/0"
    protocol    = "all"
  }
}

# 5. Create the Public Subnet
resource "oci_core_subnet" "portfolio_public_subnet" {
  cidr_block        = cidrsubnet(var.vcn_cidr, 8, 1)
  display_name      = "portfolio_public_subnet"
  compartment_id    = var.compartment_id
  vcn_id            = oci_core_vcn.portfolio_vcn.id
  route_table_id    = oci_core_route_table.portfolio_public_route_table.id
  dhcp_options_id   = oci_core_vcn.portfolio_vcn.default_dhcp_options_id
  security_list_ids = [oci_core_security_list.portfolio_sl.id]
  dns_label         = "portfoliosub"
}

# 6. Subnet Privada para ADB
resource "oci_core_subnet" "portfolio_private_subnet" {
  cidr_block                 = cidrsubnet(var.vcn_cidr, 8, 2) # Ej: 10.0.2.0/24
  display_name               = "portfolio_private_subnet"
  compartment_id             = var.compartment_id
  vcn_id                     = oci_core_vcn.portfolio_vcn.id
  prohibit_public_ip_on_vnic = true
  dns_label                  = "privateport"
}

# 7. NSG para ADB
resource "oci_core_network_security_group" "adb_nsg" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.portfolio_vcn.id
  display_name   = "ADB-Private-NSG"
}

# 8. Regla NSG: Ingress TCP 1522 desde subnet pública/instancia
resource "oci_core_network_security_group_security_rule" "adb_ingress" {
  network_security_group_id = oci_core_network_security_group.adb_nsg.id

  direction   = "INGRESS"
  protocol    = "6" # TCP
  source_type = "CIDR_BLOCK"
  source      = oci_core_subnet.portfolio_public_subnet.cidr_block # Instancia web

  tcp_options {
    destination_port_range {
      min = 1522
      max = 1522
    }
  }
}

# 9. Egress ilimitado
resource "oci_core_network_security_group_security_rule" "adb_egress" {
  network_security_group_id = oci_core_network_security_group.adb_nsg.id

  direction        = "EGRESS"
  protocol         = "all"
  destination      = "0.0.0.0/0"
  destination_type = "CIDR_BLOCK"
}
