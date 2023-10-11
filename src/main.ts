// import * as core from '@actions/core'
// import {wait} from './wait'

// async function run(): Promise<void> {
//   try {
//     const functionName = 
//   } catch (error) {
//     if (error instanceof Error) core.setFailed(error.message)
//   }
// }

// run()
import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    // get the input

    core.debug("I'm debugging")

    const functionname: string = core.getInput('functionname')
    core.debug(functionname)

    core.setOutput('time', 'nnnnn')

    if (functionname === 'benstest') {
        core.debug('benstest');
        core.setOutput('time', 'benstest');
        core.setOutput('functionname', 'benstest')
    } else {
        const ms: string = core.getInput('milliseconds')
        core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    
        core.debug(new Date().toTimeString())
        await wait(parseInt(ms, 10))
        core.debug(new Date().toTimeString())
    
        core.setOutput('time', new Date().toTimeString())
        core.setOutput('functionname', 'noname')
    }    
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()