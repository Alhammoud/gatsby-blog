---
path: "/2018/08/16/start-your-own-app-with-react-part-3"
date: "2018-08-16T05:52:00.000Z"
title: "Start your own app with React, GraphQL and Serverless architecture: Part 3 - Let's build a GraphQL backend!"
tags: ['graphql','serverless','react']
excerpt: "Start your own app with React, GraphQL and Serverless architecture: Part 3 - Let's build a GraphQL backend!"
---



To start, open up your terminal, navigate to your app, and type:

```
mkdir api
```

We'll now start a new npm project for our GraphQL server (you could integrate more with the Razzle project, but I'm not entirely sure how).

```
npm init -y
```

And now we'll add all the dependencies:

```
yarn add cors graphql graphql-tag graphql-tools request request-promise-native
```

and dev-dependencies:

```
yarn add -D webpack babel-core babel-loader babel-plugin-inline-import babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread cross-env zip-webpack-plugin webpack-cli
```

### Time to add add some JavaScript files

Create a `.babelrc` file in `api/`, containing:

```
{
  "presets": ["env"],
  "plugins": [
    "inline-import",
    "transform-class-properties",
    "transform-object-rest-spread"
  ]
}
```

In your `package.json` add the following scripts:

```
"dev": "cross-env BABEL_DISABLE_CACHE=1 node -r babel-register local.js",
"build": "cross-env BABEL_DISABLE_CACHE=1 webpack --config=webpack.config.babel.js --env=production"
```

Create a `local.js` file in `api/`, containing:

```
import cors from 'cors'
import express from 'express'
import schema from './schema'
import { json } from 'body-parser'
import { graphql } from 'graphql'

const PORT = process.env.PORT || 3002

const app = express()

app.use(cors())

app.post('/graphql', json(), (req, res) => {
  const { query, variables } = req.body
  const rootValue = {}
  const context = {}
  let operationName
  console.log('query: ', query)
  console.log('variables: ', variables)
  graphql(schema, query, rootValue, context, variables, operationName)
    .then(d => {
      console.log('d: ', d)
      res
        .status(200)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(d))
    })
    .catch(e => {
      console.log('e: ', e)
      res
        .status(500)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(e))
    })
})

app.listen(PORT, err => {
  if (err) {
    throw err
  }
  console.log(`Listening on http://localhost:${PORT}/`)
})
```

Create an `index.js` file in `api/`, containing:

```
import { graphql } from 'graphql'
import schema from './schema'

export const handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log('event:', event)

  if (event.httpMethod == 'OPTIONS') {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
      body: null,
    })
  } else {
    const { query, variables, operationName } = JSON.parse(event.body)
    const rootValue = {}
    const ctx = {}
    graphql(schema, query, rootValue, ctx, variables, operationName)
      .then(d => {
        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization, Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(d),
        })
      })
      .catch(e => {
        callback(null, {
          statusCode: 503,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization, Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(e),
        })
      })
  }
}
```

Create a `resolvers.js` file in `api/`, containing:

```
export default {
  Query: {
    hello: () => 'world',
  },
  // Mutation: {
  //
  // },
}
```

Create a `schema.graphql` file in `api/`, containing:

```
type Query {
  hello: String!
}

#type Mutation {
#
#}

schema {
  query: Query
  #mutation: Mutation
}
```

Create a `schema.js` file in `api/`, containing:

```
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema.graphql'
import resolvers from './resolvers'

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
```

Finally, create a `webpack.config.babel.js` file in `api/`, containing:

```
import path from 'path'
import webpack from 'webpack'
import zip from 'zip-webpack-plugin'

export default {
  entry: path.resolve(__dirname),
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'index.js',
    library: 'index',
    libraryTarget: 'umd',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '..'),
        exclude: path.resolve(__dirname, '..', 'node_modules'),
        loader: 'babel-loader',
      },
      {
        test: /\.graphql$/,
        include: path.resolve(__dirname, '..'),
        exclude: path.resolve(__dirname, '..', 'node_modules'),
        loader: 'graphql-tag/loader',
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      XMLHttpRequest: ['xmlhttprequest', 'XMLHttpRequest'],
    }),
    new zip({
      filename: 'graphql.zip',
    }),
  ],
}
```

That's all you should need to get the GraphQL service running locally.

### Terraform changes

We also need to make some changes to our Terraform configuration to:

* Spin up a new Lambda for GraphQL
* Spin up a new API Gateway for the new Lambda
* Tell Cloudfront to forward all `/graphql` requests to our API Gateway

Back in `infrastructure/`, create a `api_gateway_lambda.tf` file containing:

```
resource "aws_api_gateway_rest_api" "graphql_api" {
  name        = "${var.name}_api"
  description = "${var.comment}"
}

resource "aws_api_gateway_deployment" "graphql_api_deployment" {
  rest_api_id = "${aws_api_gateway_rest_api.graphql_api.id}"
  stage_name  = "prod"
}


resource "aws_api_gateway_resource" "grapqhl_endpoint" {
  rest_api_id = "${aws_api_gateway_rest_api.graphql_api.id}"
  parent_id   = "${aws_api_gateway_rest_api.graphql_api.root_resource_id}"
  path_part   = "graphql"
}

resource "aws_api_gateway_method" "graphql_path_post" {
  rest_api_id   = "${aws_api_gateway_rest_api.graphql_api.id}"
  resource_id   = "${aws_api_gateway_resource.grapqhl_endpoint.id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "graphql_path_integration" {
  rest_api_id             = "${aws_api_gateway_rest_api.graphql_api.id}"
  resource_id             = "${aws_api_gateway_resource.grapqhl_endpoint.id}"
  http_method             = "${aws_api_gateway_method.graphql_path_post.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${aws_lambda_function.graphql.arn}/invocations"
  content_handling        = "CONVERT_TO_TEXT"
}

resource "aws_api_gateway_method" "graphql_post" {
  rest_api_id   = "${aws_api_gateway_rest_api.graphql_api.id}"
  resource_id   = "${aws_api_gateway_rest_api.graphql_api.root_resource_id}"
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "graphql_integration" {
  rest_api_id             = "${aws_api_gateway_rest_api.graphql_api.id}"
  resource_id             = "${aws_api_gateway_rest_api.graphql_api.root_resource_id}"
  http_method             = "${aws_api_gateway_method.graphql_post.http_method}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${aws_lambda_function.graphql.arn}/invocations"
  content_handling        = "CONVERT_TO_TEXT"
}
```

In `infrastructure/` create a `lambda_graphql.tf` file containing:

```
resource "aws_lambda_function" "graphql" {
  function_name    = "graphql_${var.name}"
  role             = "${aws_iam_role.lambda_iam.arn}"
  handler          = "index.handler"
  runtime          = "nodejs8.10"
  timeout          = "45"
  memory_size      = "512"
  filename         = "../build/graphql.zip"
  source_code_hash = "${base64sha256(file("../build/graphql.zip"))}"

  tags {
    Site = "${var.name}"
  }
}


resource "aws_lambda_permission" "allow_api_to_exec_lambda_graphql" {
  statement_id  = "allow_api_to_exec_lambda_graphql"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.graphql.function_name}"
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_api_gateway_rest_api.graphql_api.execution_arn}/*/*/*"
}
```

In our existing `cloudfront.tf` file, we'll want to add this immediately after the `ssr` origin_id block:

```
 origin {
   origin_id = "api"

   domain_name = "${aws_api_gateway_rest_api.graphql_api.id}.execute-api.${var.aws_region}.amazonaws.com"

   custom_origin_config {
     http_port              = "80"
     https_port             = "443"
     origin_protocol_policy = "match-viewer"
     origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
   }

   origin_path = "/${aws_api_gateway_deployment.graphql_api_deployment.stage_name}"
 }
```

Similarly, still in the `cloudfront.tf` file, add the following immediately after the `ordered_cache_behavior` for `/static/*`:

```
 ordered_cache_behavior {
   path_pattern           = "graphql"
   allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
   cached_methods         = ["GET", "HEAD"]
   target_origin_id       = "api"
   default_ttl            = 0
   max_ttl                = 0
   min_ttl                = 0
   viewer_protocol_policy = "https-only"
   compress               = true

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
```

At this point you can run `terraform apply` - You will most likely get an error regarding an API Gateway integration not existing. This is a race condition, and we can get around it just by re-running `terraform apply`.
