pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = "localhost"   // if you set up local registry, otherwise skip
        FRONTEND_IMAGE = "todo-frontend:latest"
        BACKEND_IMAGE = "todo-backend:latest"
        SPRING_PROFILE = "${PROFILE ?: 'dev'}"   // Jenkins param fallback

    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Nnange/TaskFlow.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  docker compose down
                  SPRING_PROFILE=${SPRING_PROFILE} docker compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
