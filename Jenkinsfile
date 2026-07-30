#!/usr/bin/env groovy
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
        stage('Removing old container') {
            steps{
                sh '''
                docker stop node-app || true &&
                docker rm node-app || true
                '''
            }
        }
        stage('Deploy') {
            steps{
                sh '''
                docker run -d \
                --name node-app \
                -p 3000:3000 \
                ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
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