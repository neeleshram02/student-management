pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'neeleshram/student-management'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Student Management source code...'
                checkout scm
            }
        }

        stage('Validate') {
            steps {
                echo 'Validating project files...'

                sh '''
                    test -f pom.xml
                    test -f Dockerfile
                    test -f src/main/java/com/example/student_management/Student.java
                    test -f src/main/java/com/example/student_management/StudentRepository.java
                    test -f src/main/java/com/example/student_management/StudentController.java
                    test -f src/main/resources/application.properties
                    test -f src/main/resources/static/index.html
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} .
                    docker tag ${DOCKER_IMAGE}:${IMAGE_TAG} ${DOCKER_IMAGE}:latest
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''
                }
            }
        }

        stage('Docker Push') {
            steps {
                sh '''
                    docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
                    docker push ${DOCKER_IMAGE}:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Student Management POC pipeline completed successfully!'
        }

        failure {
            echo 'Student Management POC pipeline failed.'
        }
    }
}