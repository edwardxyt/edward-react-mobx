@NonCPS
def showChangeLogs() {
    def changeLogs = ""
    def changeLogSets = currentBuild.changeSets
    for (int i = 0; i < changeLogSets.size(); i++) {
        def entries = changeLogSets[i].items
        for (int j = 0; j < entries.length; j++) {
            def entry = entries[j]
            changeLogs += "* ${entry.msg} ${entry.commitId} by ${entry.author} \n"
        }
    }
    changeLogs
}

def CDN_DIR = 'static'
def DELIVERY_PATH = '/root/.jenkins/buildproject/delivery'

node {

    stage('Checkout'){
        sh "echo PROJECT = ${params.PROJECT}"
        sh "echo INSTALL = ${params.INSTALL}"
        sh "echo ENV = ${params.ENV}"
        sh "echo MOBILE = ${params.MOBILE}"
        sh "echo FORCE = ${params.FORCE}"
        sh "echo INIT = ${params.INIT}"

        sh "echo WORKSPACE = $WORKSPACE"
        sh "echo BUILD_ID = $BUILD_ID"

        sh 'pwd'

        sh "echo BUILD_NUMBER = $BUILD_NUMBER"
        sh "echo BUILD_DISPLAY_NAME = $BUILD_DISPLAY_NAME"
        sh "echo JOB_NAME = $JOB_NAME"
        sh "echo JOB_BASE_NAME = $JOB_BASE_NAME"
        sh "echo BUILD_TAG = $BUILD_TAG"
        sh "echo EXECUTOR_NUMBER = $EXECUTOR_NUMBER"
        sh "echo NODE_NAME = $NODE_NAME"
        sh "echo NODE_LABELS = $NODE_LABELS"
        sh "echo JENKINS_HOME = $JENKINS_HOME"
        sh "echo JENKINS_URL = $JENKINS_URL"
        sh "echo BUILD_URL = $BUILD_URL"
        sh "echo JOB_URL = $JOB_URL"

        git branch: 'test-news-demo', credentialsId: '39a0eccc-ef9b-4b47-a052-59c0ddd78b5f', url: 'ssh://git@47.93.203.255:29418/xiayuting/jrgc-react-mobx.git'
        sh 'git status'
        sh 'git branch'

    }

    stage('Initialize'){
        if (params.FORCE){
            sh './init.sh'
            sh "npm run clean"
            sh "cnpm i"
        }
        if (params.INIT){
            sh './init.sh'
        }
        if (params.INSTALL){
            sh "npm run clean"
            sh "cnpm i"
        }
    }

    stage('Preparation') {
        sh "npm run tree"
    }

    stage('build'){
        def changeLog
        sh "npm run compile --ENTRY=${params.PROJECT} --ENV=${params.ENV} --MOBILE=${params.MOBILE}"

        changeLog = showChangeLogs()
        echo changeLog
    }

    stage('Publish') {
        sh "mkdir -p /srv"
        sh "mkdir -p ${WORKSPACE}/cdn/${CDN_DIR}"
        sh "mkdir -p ${DELIVERY_PATH}/${params.PROJECT}/current/placeholder"
        sh "mkdir -p ${DELIVERY_PATH}/${params.PROJECT}/$BUILD_ID"

        sh "rm -r ${DELIVERY_PATH}/${params.PROJECT}/current/*"

        sh "cp -r ${WORKSPACE}/dist/${params.PROJECT}/* ${DELIVERY_PATH}/${params.PROJECT}/current/"
        sh "cp -r ${WORKSPACE}/dist/${params.PROJECT}/* ${DELIVERY_PATH}/${params.PROJECT}/$BUILD_ID/"
        sh "cp -r ${WORKSPACE}/dist/* ${WORKSPACE}/cdn/${CDN_DIR}/"
        sh "cp -r ${WORKSPACE}/dist/* /srv/"
    }

    stage('Extra publish') {
        if(params.EXTRA_SERVER_IP) {
            sh "rsync -arI ${WORKSPACE}/cdn/${CDN_DIR}/ www@$EXTRA_SERVER_IP/${CDN_DIR}/"
        }
    }

}
