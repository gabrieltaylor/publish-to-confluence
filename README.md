<p align="center">
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

# Publish content to Confluence
This action publishes content to a Confluence site.

## Confluence REST API

```
curl -u admin@example.com:api_token \
  -X POST \
  -H 'Content-Type: application/json' \
  -d'{"type":"page","title":"new page","space":{"key":"TST"},"body":{"storage":{"value":"<p>This is a new page</p>","representation":"storage"}}}' \
  https://your-domain.atlassian.net/wiki/rest/api/content/
```

## Contributing
### Set up

Install the dependencies
```bash
$ npm install
```

Run the tests :heavy_check_mark:
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run package

```bash
npm run package
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
$ git checkout -b v1
$ git commit -a -m "v1 release"
```

```bash
$ git push origin v1
```

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: gabrieltaylor/publish-to-confluence@v1
env:
  CONFLUENCE_API_TOKEN: ${{ secrets.CONFLUENCE_API_TOKEN }}
with:
  type: 'page'
  title: 'Page created by Github Action'
  body: 'Content added by Github Action'
  space: 'ENG'
  hostname: 'example.atlassian.net'
  username: 'me@example.com'
```

See the [actions tab](https://github.com/actions/publish-to-confluence/actions) for runs of this action! :rocket:
