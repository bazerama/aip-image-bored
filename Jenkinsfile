node() {
    stage('Preparation') { // for display purposes
      env.NODE_HOME="${tool 'nodejs12'}"
      env.PATH="${env.NODE_HOME}/bin:${env.PATH}"
      checkout scm
    }
    stage('Refresh React App Directory') {
      sh """
      cd /var/www
      sudo rm -rf /var/www/mcu-website
      sudo mkdir mcu-website
      sudo chown jenkins mcu-website
      """
    }
    stage('Moves files to React App Directory') {
      sh """
      sudo rm -rf /var/log/mcu-online/mcu-website/output.log
      sudo cp -r . /var/www/mcu-website
      """
    }
    stage('Start React App') {
      sh """
      cd /var/www/mcu-website
      sudo cp .env.production .env
      yarn install
      pm2 start mcuonline.config.js
      """
    }
}
