output "validate_image" {
  value = local.ubuntu_image_id != null ? "Image found: ${data.oci_core_images.ubuntu_images.images[0].display_name} (${local.ubuntu_image_id})" : "No valid image found!"
}

output "instance_id" {
  value       = oci_core_instance.portfolio_instance.id
  description = "The OCID of the created instance"
}

output "instance_public_ip" {
  value       = oci_core_public_ip.portfolio_reserved_ip.ip_address
  description = "The reserved public IP address assigned to the instance"
}


output "portfolio_blog_url" {
  value       = "https://${var.portfolio_domain}"
  description = "portfolio blog public URL (make sure the DNS in Cloudflare points to the IP address)"
}
