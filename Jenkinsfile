pipeline {
    agent any

    tools {
        jdk 'JDK 21'
        maven "Maven"   // Your Maven configuration
        nodejs "NodeJS" // Your NodeJS configuration
    }

    parameters {
        choice(name: 'PROFILE', choices: ['local', 'dev', 'prod'], description: 'Spring profile to use')
    }

    environment {
        DOCKER_REGISTRY = "localhost"   // if you set up local registry, otherwise skip
        FRONTEND_DIR = "todo-frontend"
        BACKEND_DIR = "todo-backend"
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
                dir(FRONTEND_DIR) {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir(BACKEND_DIR) {
                    //  withCredentials passes sensitive information
                    withCredentials([
                    string(credentialsId: 'DB_PASSWORD', variable: 'SPRING_DATASOURCE_PASSWORD')
                ]){

                    // Create secrets.properties dynamically
                    sh '''
                        echo "spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}" > src/main/resources/secrets.properties
                    '''
                    sh 'mvn clean'  
                    sh 'mvn package -DskipTests'
                    sh 'docker build -t ${BACKEND_IMAGE} .'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                // Build all services defined in docker-compose.yml
                sh 'docker compose build'
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
