pipeline {
  agent any
  environment {
    AWS_REGION = "ap-southeast-2"
  }
  stages {
    stage('setup'){
      steps {
        sh "npm install"
      }
    }
    stage('build') {
      steps {
        sh "NODE_ENV=production npm run build"
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
