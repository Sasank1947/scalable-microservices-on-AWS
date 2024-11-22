pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred') // Replace 'dockerhub' with your Jenkins credentials ID for Docker Hub
    }
    stages {
        stage('Clean Workspace') {
            steps {
                echo 'Cleaning workspace...'
                deleteDir() // Ensure the workspace is clean
            }
        }

        stage('Build JAR') {
            steps {
                echo 'Building the JAR file...'
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh '''
                    docker build --no-cache --platform=linux/amd64 -t sasank1947/spring-backend:latest .
                '''
            }
        }

        stage('Docker Login') {
            steps {
                echo 'Logging in to Docker Hub...'
                sh '''
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                '''
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                sh 'docker push sasank1947/spring-backend:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                sh '''
                    kubectl set image deployment/assignment3-backend-deployment container-0=sasank1947/spring-backend:latest -n default
                    kubectl rollout restart deployment/assignment3-backend-deployment -n default
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker logout' // Logout from Docker Hub after the pipeline execution
        }
    }
}
