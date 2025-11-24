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
                    // This creates a symlink so Vite reads the correct .env file
                    // THIS IS THE ONLY CORRECT VERSION
                    sh '''
                        rm -f .env

                        case "${PROFILE}" in
                            prod)
                                cp /home/akweh/Documents/todoEnv/.env.prod .env
                                ;;
                            dev)
                                cp /home/akweh/Documents/todoEnv/.env.dev .env
                                ;;
                            *)
                                cp /home/akweh/Documents/todoEnv/.env.local .env
                                ;;
                        esac

                        echo "=== Selected PROFILE: ${PROFILE} ==="
                        echo "=== Content of .env file ==="
                        cat .env
                    '''
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
                    string(credentialsId: 'DB_PASSWORD', variable: 'SPRING_DATASOURCE_PASSWORD'),
                    string(credentialsId: 'Gmail_Password', variable: 'GMAIL_PASSWORD'),
                    string(credentialsId: 'JWT_SECRET_KEY', variable: 'JWT_SECRET_KEY')
                ]){

                    // Create secrets.properties dynamically
                    sh '''
                        cat > src/main/resources/secrets.properties <<EOF
                        spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
                        gmail.password=${GMAIL_PASSWORD}
                        SECRET_KEY=${JWT_SECRET_KEY}
                        EOF
                    '''
                    sh 'mvn clean'  
                    sh 'mvn package -DskipTests'
                    sh 'docker build -t ${BACKEND_IMAGE} .'
                    }
                }
            }
        }

        // stage('Build Docker Images') {
        //     steps {
        //         // Build all services defined in docker-compose.yml
        //         sh 'docker compose build'
        //     }
        // }

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
        always {
            sh 'rm -f src/main/resources/secrets.properties'
        }
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
