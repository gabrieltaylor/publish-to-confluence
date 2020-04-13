const core = require('@actions/core');
const https = require('https');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const data = JSON.stringify({
      type: core.getInput('type'),
      title: core.getInput('title'),
      space: {key: core.getInput('space')},
      body: {
        storage: {
          value: core.getInput('body'),
          representation: core.getInput('representation')
        }
      }
    })

    core.debug(data)

    const options = {
      hostname: core.getInput('hostname'),
      port: 443,
      path: '/wiki/rest/api/content/',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + new Buffer(core.getInput('username') + ':' + process.env.CONFLUENCE_API_TOKEN).toString('base64'),
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }

    core.debug(options)

    const req = https.request(options, res => {
      core.debug(`statusCode: ${res.statusCode}`)

      res.on('data', response_data => {
        core.setOutput('reponse', reponse_data)
      })
    })

    req.on('error', error => {
      core.setFailed(error.message);
    })

    req.write(data)
    req.end()
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
