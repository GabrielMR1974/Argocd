pipeline {
    environmente {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub')
    }

    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t gabrielmonesruiz/app-grupo3:${BUILD_NUMBER} .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm gabrielmonesruiz/app-grupo3:${BUILD_NUMBER} npm test'
            }
        }
        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                    sh "docker push gabrielmonesruiz/app-grupo3:${BUILD_NUMBER}"
                }
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh 'echo $KUBECONFIG > kubeconfig.yaml'
                    sh 'kubectl apply -f kubeconfig.yaml -f deployment.yaml'
                    sh 'helm upgrade --install app-grupo3 ./my-chart --set image.tag=${BUILD_NUMBER}'
                }
            }
        }
    }
}
