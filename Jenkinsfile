pipeline{

	environment {
		DOCKERHUB_CREDENTIALS=credentials('jenkins-dockerhub')
		REGISTRY = "gabrielmonesruiz/dev-grupo3"
		DockerImage = ''
		GITHUB_CREDENTIALS=credentials('github-jenkins')
		ISSUE_TITLE = "$JOB_NAME $BUILD_DISPLAY_NAME falló"
		NPM_REPORT_FILE = "npm_audit_report.txt"
		URL_REPO = "https://github.com/GabrielMR1974/Argocd.git"
	}

	agent any

	stages {
		stage('gitclone') {

			steps {
				git branch: 'main', url: 'https://github.com/GabrielMR1974/Argocd.git'
			}
		}
		stage('NPM-test'){
            steps {
				// Se instala nodeJS desde el plugin nodeJS
                nodejs(nodeJSInstallationName: 'node-18-15'){
                    echo 'Realizando test antes de crear la imagen'
                    sh """
                    npm install
                    npm run test
                    """
                                    }
            }

        }
		stage('NPM-audit') {
            steps {
				echo 'Realizando npm audit'
				// Catcherror es para que, si encuentra fallos, el pipeline no se detenga
				// y se pueda seguir con el resto de las fases
				// https://www.jenkins.io/doc/pipeline/steps/workflow-basic-steps/#catcherror-catch-error-and-set-build-result-to-failure
				// Aqui si se produce un error, el estado del build para a ser UNSTABLE
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
					// Y ejecuta sin parar el resto de las fases
					sh 'npm audit > ${NPM_REPORT_FILE}'
                }
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
			additionalArguments: '--docker gabrielmonesruiz/dev-grupo3:v1.$BUILD_NUMBER'
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
		unstable{
			echo 'npm audit falló'
                sh """
                echo ${GITHUB_CREDENTIALS_PSW} | gh auth login --with-token
                gh issue create -t '${ISSUE_TITLE}' -F ${NPM_REPORT_FILE} -R ${URL_REPO}
				echo 'Se ha creado un issue en el repositorio'
                """
		}
    }
}
