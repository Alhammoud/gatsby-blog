---
path: "/2018/08/15/start-your-own-app-with-react-part-2"
date: "2018-08-15T05:52:00.000Z"
title: "Start your own app with React, GraphQL and Serverless architecture: Part 2 - Deploying to a real domain name"
tags: ['graphql','serverless','react']
excerpt: "Start your own app with React, GraphQL and Serverless architecture: Part 2 - Let's get this running in production"
---

Welcome to Part 2 of Starting your own app. In Part 1, we got an AWS Lambda function to render React, and in Part 2, we'll be setting that function up to run on our own domain name, with a free SSL certificate!

To begin, you'll need to already own a domain in AWS Route 53. Check out https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/registrar.html for more details on getting that set up.

1. Create a new file in your `infrastructure/` folder, called `route53.tf`, containing:
    ```
    data "aws_route53_zone" "site_zone" {
      name = "${var.domain_name}"
    }

    resource "aws_route53_record" "cf_alias_A" {
      zone_id = "${data.aws_route53_zone.site_zone.zone_id}"
      name    = "${var.domain_name}"
      type    = "A"

      alias {
        name                   = "${aws_cloudfront_distribution.site.domain_name}"
        zone_id                = "${aws_cloudfront_distribution.site.hosted_zone_id}"
        evaluate_target_health = true
      }
    }

    resource "aws_route53_record" "cf_alias_AAAA" {
      zone_id = "${data.aws_route53_zone.site_zone.zone_id}"
      name    = "${var.domain_name}"
      type    = "AAAA"

      alias {
        name                   = "${aws_cloudfront_distribution.site.domain_name}"
        zone_id                = "${aws_cloudfront_distribution.site.hosted_zone_id}"
        evaluate_target_health = true
      }
    }
    ```
    This creates records pointing to the CloudFront distribution we'll create later on

  1. Edit your `vars.tf` file, adding the following variable (swap out `recordmyweight.com` with your own domain name): 
  
      ```variable "domain_name" {default = "recordmyweight.com"}```

  1. You'll also want to change the `bucket_site` variable in `vars.tf` to match your domain (Remove `.`'s in your `bucket_site` to avoid issues with SSL):
  
      ```variable "bucket_site" {default = "recordmyweightcom"}```
  
      This renames the `my-app-12345` bucket to your new variable value.
  1. In your `main.tf` file, add the following:
      ```
      provider "aws" {
        alias  = "east"
        region = "us-east-1"
      }
      ```
      This will let us create an SSL certificate in the us-east-1 zone later, for CloudFront's use.

  1. Create a `acm_certificate.tf` file, containing the following (making sure to replace `www.recordmyweight.com` with your own subdomain):
      ```
      variable "san_domains" {
        default = [
          "www.recordmyweight.com"
        ]
      }

      data "aws_route53_zone" "zone" {
        name = "${var.domain_name}."
        private_zone = false
      }

      resource "aws_acm_certificate" "cert" {
        domain_name               = "${var.domain_name}"
        validation_method         = "DNS"
        subject_alternative_names = "${var.san_domains}"
        provider = "aws.east"
      }

      resource "aws_route53_record" "cert" {
        count   = "${length(var.san_domains) + 1}"
        zone_id = "${data.aws_route53_zone.zone.id}"
        name    = "${lookup(aws_acm_certificate.cert.domain_validation_options[count.index], "resource_record_name")}"
        type    = "${lookup(aws_acm_certificate.cert.domain_validation_options[count.index], "resource_record_type")}"
        records = ["${lookup(aws_acm_certificate.cert.domain_validation_options[count.index], "resource_record_value")}"]
        ttl     = 60
      }

      resource "aws_acm_certificate_validation" "cert" {
          provider = "aws.east"
          certificate_arn = "${aws_acm_certificate.cert.arn}"
          validation_record_fqdns = ["${aws_route53_record.cert.*.fqdn}" ]
      }
      ```
      This creates a globally accessible SSL certificate, and verifies that you own the domain you're registering the certificate for.
  1. The final step is to add a `cloudfront.tf` file, containing the following:
      ```
      resource "aws_cloudfront_distribution" "site" {
        origin {
          domain_name = "${var.bucket_site}.s3-website-${var.aws_region}.amazonaws.com"
          origin_id   = "s3"

          custom_origin_config {
            http_port              = "80"
            https_port             = "443"
            origin_protocol_policy = "http-only"
            origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
          }
        }

        origin {
          domain_name = "${aws_api_gateway_rest_api.ssr.id}.execute-api.${var.aws_region}.amazonaws.com"
          origin_id = "ssr"

          custom_origin_config {
            http_port              = "80"
            https_port             = "443"
            origin_protocol_policy = "match-viewer"
            origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
          }

          origin_path = "/${aws_api_gateway_deployment.ssr_deployment.stage_name}"
        }

        enabled             = true
        is_ipv6_enabled     = true
        comment             = ""
        default_root_object = "index.html"
        retain_on_delete    = true
        aliases             = ["${var.domain_name}"]

        default_cache_behavior {
          allowed_methods  = ["GET", "HEAD"]
          cached_methods   = ["GET", "HEAD"]
          target_origin_id = "ssr"
          compress         = true
          forwarded_values {
            query_string = true

            cookies = {
              forward = "none"
            }
          }

          viewer_protocol_policy = "redirect-to-https"
          min_ttl                = 0
          max_ttl                = 0
          default_ttl            = 0
        }

        ordered_cache_behavior {
          path_pattern           = "/static/*"
          allowed_methods        = ["GET", "HEAD"]
          cached_methods         = ["GET", "HEAD"]
          target_origin_id       = "s3"
          compress               = true
          default_ttl            = 0
          max_ttl                = 0
          min_ttl                = 0
          viewer_protocol_policy = "https-only"

          forwarded_values {
            query_string = true

            cookies {
              forward = "all"
            }

            headers = [
              "Accept",
              "Authorization",
              "Origin",
            ]
          }
        }

        price_class = "PriceClass_All"

        restrictions {
          geo_restriction {
            restriction_type = "none"
          }
        }

        tags {
          Project = "${var.name}"
        }

        viewer_certificate {
          ssl_support_method       = "sni-only"
          minimum_protocol_version = "TLSv1"
          acm_certificate_arn   = "${aws_acm_certificate_validation.cert.certificate_arn}"

        }
      }
      ```
      This one might seem quite complicated initially - but it only does a few things: 
      - Sets up two origins (ssr and s3)
      - Creates a default cache (pointing at the ssr origin), and a secondary cache (pointing to the s3)
      - Uses the SSL certificate created earlier to secure the CDN
  1. Finally, run `terraform apply` again, type `yes` to confirm and wait for terraform to finish building your infrastructure.
  1. At this point, go into `razzle.config.js` and remove this line:
      ```      
      appConfig.output.publicPath = `${process.env.PUBLIC_PATH}`
      ```
  1. Also go into `package.json` and remove this part of the `build` script:
      ```
      PUBLIC_PATH=https://recordmyweightcom.s3-ap-southeast-2.amazonaws.com/public/
      ```
      You also want to change this section:
      ```
      aws s3 sync \"./build/public/\" s3://recordmyweightcom/public
      ```
      to be:
      ```
      aws s3 sync \"./build/public/\" s3://recordmyweightcom
      ```
      So in the end it should look like:
      ```
      "razzle build && aws s3 sync \"./build/public/\" s3://recordmyweightcom && cd ./build && zip -r ./server.zip ./server.*",
      ```
  1. Also, in `infrastructure/s3.tf`, change this line:
      ```
      allowed_origins = ["https://${aws_api_gateway_deployment.ssr_deployment.rest_api_id}.execute-api.${var.aws_region}.amazonaws.com"]
      ```
      to read:
      ```
      allowed_origins = ["https://${var.domain_name}]
      ```
  1. Now run `npm run build`, wait for it to complete, then go into `infrastructure/` and run `terraform apply`. This'll redeploy our app using a CDN, rather than your local S3 to serve static resources.
This concludes Part 2: Let's get this running in production

Check https://maxrozen.com for future updates!
