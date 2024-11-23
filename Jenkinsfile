pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
    }
    stages {
        stage('Verify Workspace') {
            steps {
                echo 'Verifying workspace contents...'
                sh 'ls -al' // List all files in the root directory to confirm `pom.xml` exists
            }
        }

        stage('Build JAR') {
            steps {
                echo 'Building the JAR file...'
                sh 'mvn clean package -DskipTests' // Run Maven command in the root directory
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
                    # Update the container image in the Kubernetes deployment
                    kubectl set image deployment/swe645hw3-dep container-0=sasank1947/spring-backend:latest -n default

                    # Restart the deployment to ensure new pods are created with the updated image
                    kubectl rollout restart deployment/swe645hw3-dep -n default

                    # Verify the rollout status to confirm the deployment was successful
                    kubectl rollout status deployment/swe645hw3-dep -n default
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
