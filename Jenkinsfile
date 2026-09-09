pipeline {
    agent any

    stages {

        stage('Backend Setup') {
            steps {
                echo 'Setting up Python backend...'

                bat '"C:\\Users\\varal\\AppData\\Local\\Python\\pythoncore-3.11-64\\python.exe" -m venv backend\\.venv'

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