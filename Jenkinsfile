#!/usr/bin/env groovy
pipeline{
    agent any
    tools {
        nodejs 'Node22'
    }
    environment {
    DOCKER_USER = "sudhanshu20021997"
    IMAGE_NAME = "${DOCKER_USER}/node-ci-cd"
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
        stage('Docker Login') {
            steps{
                withCredentials([
                    usernamePassword(
                    credentialsId:'dockerhub',
                    usernameVariable:'DOCKER_USER',
                    passwordVariable:'DOCKER_PASS'
                    )
                ])
                {
                    sh '''
                    echo "$DOCKER_PASS" | \
                    docker login \
                    -u "$DOCKER_USER" \
                    --password-stdin
                    '''
                }
            }
        }
        stage('Build Image') {
            steps{
                sh '''
                docker build \
                -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                -t ${IMAGE_NAME}:latest \
                .
                '''
            }
        }
        stage('Push Image'){
            steps{
                sh '''
                docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                docker push ${IMAGE_NAME}:latest
                '''
            }
        }
        stage('Deploy') {
            steps{
                sh '''
                echo "Removing old Containers!"
                docker stop node-app || true &&
                docker rm node-app || true
                '''
            }
            {
                sh '''
                docker run -d \
                --name node-app \
                -p 3000:3000 \
                ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }
        stage('Health Check') {
            steps{
                sh '''
                sleep 10
                curl http://localhost:3000/health
                '''
            }
        }
        stage('Cleanup') {
            steps
            {
                sh '''
                PREVIOUS=$((BUILD_NUMBER - 2))
                echo "Removing node-ci-cd:$PREVIOUS Image"
                docker rmi node-ci-cd:${PREVIOUS} || true
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