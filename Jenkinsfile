pipeline{

	environment {
		DOCKERHUB_CREDENTIALS=credentials('jenkins-dockerhub')
		REGISTRY = "gabrielmonesruiz/dev-grupo3"
		DockerImage = ''
	}

	agent any

	stages {
		stage('gitclone') {

			steps {
				git branch: 'main', url: 'https://github.com/GabrielMR1974/Argocd.git'
			}
		}

		stage('Build') {

			steps {
				echo 'Building..'
				sh 'docker build -t gabrielmonesruiz/dev-grupo3:v1.$BUILD_NUMBER .'
			}
		}

		stage('Scan') {
        steps {
        echo 'Scanning...'
        snykSecurity(
            snykInstallation: 'snyk-grupo3',
            snykTokenId: 'snyk-grupo3',
			severity: 'high',
			failOnError: 'false',
			failOnIssues: 'false',
          // place other parameters here
			additionalArguments: '--docker $REGISTRY'
        )
        }
    }
		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push gabrielmonesruiz/dev-grupo3:v1.$BUILD_NUMBER'
			}
		}

	}
	post {
        always {
        // Se eliminan las imagenes creadas
            echo 'Se elimina la imagen creada'
            sh "docker rmi $REGISTRY:v1.$BUILD_NUMBER"
        }
    }
}
