import * as core from '@actions/core'
const { Octokit } = require('@octokit/rest');
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    // get the input
    const functionName: string = core.getInput('functionName')
    const pullrequestnumber = core.getInput('pullrequestnumber')
    const secretToken = core.getInput('secrettoken')
    // const ms: string = core.getInput('milliseconds')
    // const ms: string = core.getInput('milliseconds')
    core.debug(`Function name is ${functionName}.`)

    if (functionName === 'benstest') {
      core.debug('benstest')
      core.setOutput('time', 'benstest')

      const {Octokit} = require('@octokit/rest')
      const octokit = new Octokit({auth: secretToken })

      // Define your ignore list
      const ignoreList = ['file1.txt', 'file2.txt']

      // Fetch the list of changed files in the push event
      const response = await octokit.pulls.listFiles({
        owner: '0xlino',
        repo: 'mainrepo',
        pull_number: pullrequestnumber
      })

      core.debug(JSON.stringify(response.data))
    } else {
      const ms: string = core.getInput('milliseconds')
      core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

      core.debug(new Date().toTimeString())
      await wait(parseInt(ms, 10))
      core.debug(new Date().toTimeString())

      core.setOutput('time', new Date().toTimeString())
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
