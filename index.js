const core = require('@actions/core');
const fetch = require('node-fetch');

async function convertToConfluenceMarkup(markdown) {
    const data = JSON.stringify({wiki: markdown})

    core.debug(data)

    const url = buildUrl('/rest/tinymce/1/markdownxhtmlconverter')
    const options = buildOptions(data)

    core.debug(options)

    return fetch(url, options)
      .then(response => response.json())
      .then(data => {
        core.debug(data)
        return data;
      })
}

async function publishToConfluence(markup) {
    let data = JSON.stringify({
      type: core.getInput('type'),
      title: core.getInput('title'),
      space: {key: core.getInput('space')},
      ancestors: [{id: core.getInput('parent_id')}],
      body: {
        editor: {
          value: markup,
          representation: 'editor'
        }
      }
    })

    core.debug(data)

    const url = buildUrl('/wiki/rest/api/content')
    const options = buildOptions(data)

    core.debug(options)

    return fetch(url, options)
      .then(response => response.json())
      .then(data => {
        core.debug(data)
        return data;
      })
}

function buildOptions(data) {
    return {
      body: data,
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + new Buffer.from(core.getInput('username') + ':' + process.env.CONFLUENCE_API_TOKEN).toString('base64'),
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }
}

function buildUrl(path) {
    return `https://${core.getInput('hostname')}${path}`
}

async function run() {
  try {
    markup = await convertToConfluenceMarkup(core.getInput('body'));
    reponse = await publishToConfluence(markup);
    core.setOutput('response', response);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
