pipeline {
    agent any

    stages {

        stage('Backend Setup') {
            steps {
                echo 'Setting up Python backend...'

                script {
                    if (isUnix()) {
                        sh 'python3 -m venv backend/.venv'
                        sh 'backend/.venv/bin/python -m pip install --upgrade pip'
                        sh 'backend/.venv/bin/python -m pip install -r backend/requirements.txt'
                    } else {
                        bat 'python -m venv backend\\.venv'
                        bat 'backend\\.venv\\Scripts\\python.exe -m pip install --upgrade pip'
                        bat 'backend\\.venv\\Scripts\\python.exe -m pip install -r backend\\requirements.txt'
                    }
                }
            }
        }

        stage('Frontend Install') {
            steps {
                echo 'Installing frontend dependencies...'

                script {
                    if (isUnix()) {
                        sh 'cd frontend && npm ci'
                    } else {
                        bat 'cd frontend && npm ci'
                    }
                }
            }
        }

        stage('Frontend Lint') {
            steps {
                echo 'Linting frontend code...'

                script {
                    if (isUnix()) {
                        sh 'cd frontend && npm run lint'
                    } else {
                        bat 'cd frontend && npm run lint'
                    }
                }
            }
        }

        stage('Frontend Build') {
            steps {
                echo 'Building React frontend...'

                script {
                    if (isUnix()) {
                        sh 'cd frontend && npm run build'
                    } else {
                        bat 'cd frontend && npm run build'
                    }
                }
            }
        }

        stage('Backend Test') {
            steps {
                echo 'Running Python backend tests...'

                script {
                    if (isUnix()) {
                        sh 'backend/.venv/bin/python -m pytest backend/ -v'
                    } else {
                        bat 'backend\\.venv\\Scripts\\python.exe -m pytest backend/ -v'
                    }
                }
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