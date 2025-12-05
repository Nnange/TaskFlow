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

        // This reads the git tag → becomes your app version
        APP_VERSION = sh(
            script: "git describe --tags --abbrev=0 --match 'v*.*.*' 2>/dev/null || echo '0.0.0'",
            returnStdout: true
        ).trim().replace('v', '')

        IMAGE_TAG = "${APP_VERSION}-${BUILD_NUMBER}"
        
        // Optional: show in logs
        FULL_INFO = "Version: ${APP_VERSION} | Build: ${BUILD_NUMBER} | Tag: ${IMAGE_TAG}"

    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Nnange/TaskFlow.git'
            }
        }

        stage('Version Info') {
            steps {
                echo "${FULL_INFO}"
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
                            prod)  cp /opt/jenkins-env/.env.${PROFILE}  .env ;;
                            dev)   cp /opt/jenkins-env/.env.${PROFILE}   .env ;;
                            *)     cp /opt/jenkins-env/.env.${PROFILE} .env ;;
                        esac
                        echo "Using PROFILE=${PROFILE}"
                        cat .env
                    '''
                    sh 'npm run test -- --coverage --reporter=lcov'
                    sh 'npm run build'
                    sh 'docker build -t todo-frontend:${IMAGE_TAG} -t $FRONTEND_IMAGE .'
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
                    sh 'docker build -t todo-backend:${IMAGE_TAG} -t ${BACKEND_IMAGE} .'
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
