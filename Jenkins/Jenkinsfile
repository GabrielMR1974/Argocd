pipeline{

	environment {
		DOCKERHUB_CREDENTIALS=credentials('gabrielmonesruiz')
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
				sh 'docker build -t gabrielmonesruiz/grupo3-app:$BUILD_NUMBER .'
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push gabrielmonesruiz/grupo3-app:$BUILD_NUMBER'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}
