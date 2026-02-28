# Generate a private key for the origin certificate
resource "tls_private_key" "origin_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

# Create the Certificate of Origin Request (CSR)
resource "tls_cert_request" "origin_csr" {
  private_key_pem = tls_private_key.origin_key.private_key_pem

  subject {
    common_name  = var.portfolio_domain
    organization = "Portfolio Deployment"
  }
}

# Request the certificate of origin from Cloudflare
resource "cloudflare_origin_ca_certificate" "portfolio_cert" {
  csr                = tls_cert_request.origin_csr.cert_request_pem
  hostnames          = [var.portfolio_domain, "*.${var.portfolio_domain}"]
  request_type       = "origin-rsa"
  requested_validity = 5475 # Maximum allowed (15 years)
}
