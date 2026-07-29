pipeline{
    agent any
    tools {
        nodejs 'Node22'
    }
    stages {
        stage('Checkout') {
            steps {
                chckout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        success {
            echo "Pipeline Succeeded!"
        }
        failure {
            echo "Pipeline Failed!"
        }
    }
}