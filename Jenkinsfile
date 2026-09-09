pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out FixMyNation from GitHub...'
                checkout scm
            }
        }

        stage('Backend Setup') {
            steps {
                echo 'Setting up Python backend...'
                bat 'py -3.11 -m venv backend\\.venv'
                bat 'backend\\.venv\\Scripts\\python.exe -m pip install --upgrade pip'
                bat 'backend\\.venv\\Scripts\\python.exe -m pip install -r backend\\requirements.txt'
            }
        }

        stage('Frontend Install') {
            steps {
                echo 'Installing frontend dependencies...'
                bat 'cd frontend && npm ci'
            }
        }

        stage('Frontend Build') {
            steps {
                echo 'Building React frontend...'
                bat 'cd frontend && npm run build'
            }
        }

        stage('Backend Test') {
            steps {
                echo 'Checking Python backend...'
                bat 'backend\\.venv\\Scripts\\python.exe -m compileall backend'
            }
        }

    }

    post {
        success {
            echo 'FixMyNation CI pipeline completed successfully!'
        }

        failure {
            echo 'FixMyNation CI pipeline failed.'
        }
    }
}