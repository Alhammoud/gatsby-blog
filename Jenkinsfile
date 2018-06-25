pipeline {
  agent any
  environment {
    AWS_REGION = "ap-southeast-2"
    AWS_DEFAULT_REGION="ap-southeast-2"
    AWS_ACCESS_KEY_ID=credentials('MAXROZEN_AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY=credentials('MAXROZEN_AWS_SECRET_ACCESS_KEY')
  }
  stages {
    stage('setup'){
      steps {
        node {
          sh "npm install"
        }
      }
    }
    stage('build') {
      steps {
        node {
          sh "NODE_ENV=production npm run build"
        }
      }
    }

    stage('deploy'){
      when {
        anyOf {
          branch 'master'
          branch 'test'
        }
      }
      steps {
        sh "aws s3 cp public s3://maxrozen.com/ --recursive --acl public-read --region ${env.AWS_REGION}"
      }
    }
  }
}
