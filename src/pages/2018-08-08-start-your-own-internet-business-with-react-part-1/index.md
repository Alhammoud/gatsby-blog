---
path: "/2018/08/08/start-your-own-internet-business-with-react-part-1"
date: "2018-08-08T05:52:00.000Z"
title: "Start your own internet business with React, GraphQL and Serverless architecture: Part 1 - Server-side Rendering, Serverlessly!"
tags: ['graphql','serverless','react']
excerpt: "Start your own internet business with React, GraphQL and Serverless architecture: Part 1 - Server-side Rendering, Serverlessly!"
---

This may seem corny, but in this blog post series I'll walk you through what you need to do (tech-wise) to have a React app where your customers can login, pay for things and use your internet business.

Pre-work - Read:

1.  https://maxrozen.com/2018/02/07/getting-started-with-terraform/
1.  https://maxrozen.com/2018/01/04/what-is-graphql

Pre-work - Know:

1.  Basics of JavaScript ES6
1.  AWS (we'll be spinning up resources using terraform)
1.  How to debug when things don't go your way.

I'll be describing modifications to make to existing code, rather than providing a fully complete repository, to ensure that this guide is easier to update.

The architecture consists of four main parts:

1.  A GraphQL server (An Express server running in AWS Lambda - Node v8 environment)
1.  A database of some sort (either Key:Value store such as DynamoDB/RethinkDB or traditional, like Postgres)
1.  A 'Server-side rendering' server (The React app running in AWS Lambda - Node v8 environment)
1.  The Static resources - sitting in an S3 bucket, sent to your users via a CloudFront CDN (which also conveniently provides you with free SSL certificates!)

On the payment side of things, we'll add a GraphQL resolver that talks to Stripe, but that'll be covered in a later blog post.

To begin, we're going to use Razzle. It's like Create-react-app, but for server-side rendering.

```
npm install -g create-razzle-app

create-razzle-app my-app
cd my-app
npm start
```

Now, because we're going to be deploying this onto a server-less environment, we need to change how Razzle builds code. To do that, we're going to create a file in the project root directory called `razzle.config.js`, with the following content:

```
module.exports = {
  modify: (config, { target, dev }, webpack) => {

    const appConfig = config

    if (target === 'node' && !dev) {
      appConfig.externals = []
      appConfig.output.publicPath = `${process.env.PUBLIC_PATH}`
    }

    return appConfig
  },
}
```

Next, we'll edit the `src/index.js` file to allow us to run in AWS Lambda when we're in production, and run normally when we're developing locally.
Run `npm install aws-serverless-express` in the project root, then replace the contents of `src/index.js` with:

```
import app from './server'
export let handler

if (process.env.NODE_ENV === 'production') {
  const awsServerlessExpress = require('aws-serverless-express')

  const binaryMimeTypes = [
    'application/octet-stream',
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
  ]
  const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)

  handler = (event, context, callback) => {
    awsServerlessExpress.proxy(server, event, context)
  }
} else {
  const http = require('http')

  const server = http.createServer(app)

  let currentApp = app

  server.listen(process.env.PORT || 3000, error => {
    if (error) {
      console.log(error)
    }

    console.log('🚀 started')
  })

  if (module.hot) {
    console.log('✅  Server-side HMR Enabled!')

    module.hot.accept('./server', () => {
      console.log('🔁  HMR Reloading `./server`...')
      server.removeListener('request', currentApp)
      const newApp = require('./server').default
      server.on('request', newApp)
      currentApp = newApp
    })
  }
}

```

What we've done here is dynamically import `aws-serverless-express`, as well as the `http` module. This allows us to run the same file for both production, and developing locally.

Lastly on the React code side of things, we'll need to edit `src/app.js`, and remove the `exact` keyword from line 9, such that it reads:
```
    <Route path="/" component={Home} />
```
(this is a requirement to have React function in AWS API Gateway correctly)

At this point, we can step back, write some terraform files to build our infrastructure, and eventually bask in the awesome fact that you've set up server-less server-side rendering in React.

<b>Huge Warning:</b> Learning terraform is *hard*. Almost *none* of this should make sense, (except maybe vars.tf), and that's okay.

1.  Create an infrastructure folder and enter it: `mkdir infrastructure && cd infrastructure`
2.  Create a `main.tf` file, containing:
    ```
    provider "aws" {
      region = "${var.aws_region}"
    }
    ```
3. Create a `vars.tf` file, containing:
    ```

    variable "name" { default = "my-app" } #name of your service
    variable "aws_region" { default = "ap-southeast-2" } #ch
    variable "comment" {default = "my-app resource - generated by maxrozen.com/2018/08/08/start-your-own-internet-business-with-react-part-1"}
    variable "bucket_site" {default = "my-app-12345"} # IMPORTANT - set your own app name here!
    output "API Gateway URL" {
      value = "${aws_api_gateway_deployment.ssr_deployment.invoke_url}"
    }
    output "S3_BUCKET" {
      value = "${aws_s3_bucket.site.bucket_domain_name}"
    }

    ```
4. Create a `lambda.tf` file, containing:
    ```
    resource "aws_iam_role" "lambda_iam" {
      name = "lambda_iam_${var.name}"

      assume_role_policy = <<EOF
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Principal": {
            "Service": "lambda.amazonaws.com"
          },
          "Effect": "Allow"
        }
      ]
    }
    EOF
    }

    resource "aws_lambda_function" "lambda" {
      function_name = "lambda_${var.name}"
      role             = "${aws_iam_role.lambda_iam.arn}"
      handler       = "server.handler"
      runtime       = "nodejs8.10"
      timeout       = "300"
      memory_size   = "256" #MB. in production, this can be up to 3GB

      filename = "../build/server.zip"
      source_code_hash = "${base64sha256(file("../build/server.zip"))}"

      tags {
        Project = "${var.name}"
      }
    }

    resource "aws_lambda_permission" "allow_api_to_exec_lambda" {
      statement_id  = "allow_api_to_exec_lambda"
      action        = "lambda:InvokeFunction"
      function_name = "${aws_lambda_function.lambda.function_name}"
      principal     = "apigateway.amazonaws.com"
      # The /*/*/* part allows invocation from any stage, method and resource path
      # within API Gateway REST API.
      source_arn = "${aws_api_gateway_rest_api.ssr.execution_arn}/*/*/*"

    }

    ```
5. Create an `api_gateway.tf` file, containing:
    ```
    resource "aws_api_gateway_rest_api" "ssr" {
      name        = "${var.name}_ssr"
      description = "${var.comment}"
    }

    resource "aws_api_gateway_resource" "proxy" {
      rest_api_id = "${aws_api_gateway_rest_api.ssr.id}"
      parent_id   = "${aws_api_gateway_rest_api.ssr.root_resource_id}"
      path_part   = "{proxy+}"
    }

    resource "aws_api_gateway_method" "proxy" {
      rest_api_id   = "${aws_api_gateway_rest_api.ssr.id}"
      resource_id   = "${aws_api_gateway_resource.proxy.id}"
      http_method   = "ANY"
      authorization = "NONE"
    }

    resource "aws_api_gateway_integration" "lambda" {
      rest_api_id = "${aws_api_gateway_rest_api.ssr.id}"
      resource_id = "${aws_api_gateway_method.proxy.resource_id}"
      http_method = "${aws_api_gateway_method.proxy.http_method}"

      integration_http_method = "POST"
      type                    = "AWS_PROXY"
      uri                     = "${aws_lambda_function.lambda.invoke_arn}"
    }

    resource "aws_api_gateway_method" "proxy_root" {
      rest_api_id   = "${aws_api_gateway_rest_api.ssr.id}"
      resource_id   = "${aws_api_gateway_rest_api.ssr.root_resource_id}"
      http_method   = "ANY"
      authorization = "NONE"
    }

    resource "aws_api_gateway_integration" "lambda_root" {
      rest_api_id = "${aws_api_gateway_rest_api.ssr.id}"
      resource_id = "${aws_api_gateway_method.proxy_root.resource_id}"
      http_method = "${aws_api_gateway_method.proxy_root.http_method}"

      integration_http_method = "POST"
      type                    = "AWS_PROXY"
      uri                     = "${aws_lambda_function.lambda.invoke_arn}"
    }

    resource "aws_api_gateway_deployment" "ssr_deployment" {
      depends_on = [
        "aws_api_gateway_integration.lambda",
        "aws_api_gateway_integration.lambda_root",
      ]

      rest_api_id = "${aws_api_gateway_rest_api.ssr.id}"
      stage_name  = "prod"
    }

    ```
6. Finally, create an `s3.tf` file to store your static content, containing:
    ```
    resource "aws_s3_bucket" "site" {
        bucket = "${var.bucket_site}"
        acl = "public-read"
        website {
            index_document = "index.html"
            error_document = "404.html"
        }
        tags {
          Project = "${var.name}"
        }
        cors_rule {
          allowed_headers = ["*"]
          allowed_methods = ["GET"]
          allowed_origins = ["https://${aws_api_gateway_deployment.ssr_deployment.rest_api_id}.execute-api.${var.aws_region}.amazonaws.com"]
          expose_headers  = ["ETag"]
          max_age_seconds = 3000
        }
        force_destroy = true
        policy = <<EOF
    {
            "Id": "bucket_policy_site",
            "Version": "2012-10-17",
            "Statement": [
              {
                "Sid": "bucket_policy_site_main",
                "Action": [
                  "s3:GetObject"
                ],
                "Effect": "Allow",
                "Resource": "arn:aws:s3:::${var.bucket_site}/*",
                "Principal": "*"
              }
            ]
          }
    EOF
    }

    ```

If you've made it this far, I'm genuinely impressed. You now have terraform ready to go and deploy your infrastructure.

We do this by entering the `infrastructure/` directory, and running `terraform apply`. Terraform will then list all of the changes it's about to make, and then at the end, will say:
```
Plan: 11 to add, 0 to change, 0 to destroy.
Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.
```
Type `yes` <b>if and only if</b> terraform states `0 to destroy`. I will not be liable for the destruction of your production AWS resources.

Terraform will take a couple of minutes to create all the resources we specified, and eventually will output:
```
Apply complete! Resources: 11 added, 0 changed, 0 destroyed.

Outputs:

API Gateway URL = https://hfytoyl60m.execute-api.ap-southeast-2.amazonaws.com/prod
S3_BUCKET = my-app-12345.s3.amazonaws.com
```

To actually deploy this I manually edited my `package.json` file, and replaced the `"build"` key, with:
```
"build":
      "PUBLIC_PATH=https://my-app-12345.s3-ap-southeast-2.amazonaws.com/public/ razzle build && aws s3 sync \"./build/public/\" s3://my-app-12345/public && aws s3 sync \"./build/static/\" s3://my-app-12345/static && cd ./build && zip -r ./server.zip ./server.*",
```

This sets the PUBLIC_PATH (the static files like css/js) to point to the S3 bucket we created. Yours will be different. Take particular notice of the `s3-ap-southeast-2` portion of the URL, as I doubt you'll also be setting your region to Sydney, Australia.

This concludes Part 1: Server-side Rendering, Serverlessly.

Check https://maxrozen.com for future updates!
