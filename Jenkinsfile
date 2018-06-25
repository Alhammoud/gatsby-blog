pipeline {
  agent any
  environment {
    AWS_REGION = "ap-southeast-2"
    AWS_DEFAULT_REGION="ap-southeast-2"
    AWS_ACCESS_KEY_ID=credentials('MAXROZEN_AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY=credentials('MAXROZEN_AWS_SECRET_ACCESS_KEY')
  }

  tools {nodejs "v8.11.3"}

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
        sh "/usr/local/bin/aws s3 cp public s3://maxrozen.com/ --recursive --acl public-read --region ${env.AWS_REGION}"
      }
    }
  }
}
