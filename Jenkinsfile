pipeline{
    agent any
    tools {
        nodejs 'Node22'
    }
    environment {
        IMAGE_NAME= "node-ci-cd"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
        stage('Docker Build') {
            steps{
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
            }
        }
    }
    post {
        success {
            echo "Docker Image built successfully!"
        }
        failure {
            echo "Pipeline Failed!"
        }
    }
}