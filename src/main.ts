import * as core from '@actions/core'
import { wait } from './wait'
const { Octokit } = require('@octokit/rest');
const { execSync } = require('child_process');
const fetch = require('node-fetch');

async function updateFilesInAnotherRepo() {
    try {
        const targetRepoOwner = '0xlino'; // Replace with the owner of the target repository
        const targetRepoName = 'secondaryrepo'; // Replace with the name of the target repository
        const targetBranch = 'main'; // Replace with the target branch name
        const targetToken = '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'; // Replace with your authentication token for the target repository
        const targetPRNumber = 1; // Replace with the target pull request number

        const octokitTarget = new Octokit({ auth: targetToken, request: { fetch: fetch } });

        // Fetch the details of the pull request in the target repository
        const pullRequestResponse = await octokitTarget.pulls.get({
            owner: targetRepoOwner,
            repo: targetRepoName,
            pull_number: targetPRNumber,
        });

        const baseCommitSha = pullRequestResponse.data.base.sha;

        // Clone the target repository to your local environment
        execSync(`git clone https://github.com/${targetRepoOwner}/${targetRepoName}.git`);
        execSync(`cd ${targetRepoName}`);

        // Make the necessary changes to the files (update, create, or delete files)
        // You can use the file system or any other method to make these changes

        // Commit the changes to a new branch
        // execSync('git checkout -b feature/update-files');
        execSync(`git checkout -b feature/update-files ${baseCommitSha}`);
        execSync('git add .');
        execSync('git commit -m "Update files"');

        // Push the branch to the target repository
        execSync(`git push origin feature/update-files`);

        // Create a new pull request in the target repository
        const prResponse = await octokitTarget.pulls.create({
            owner: targetRepoOwner,
            repo: targetRepoName,
            title: 'Update files',
            base: targetBranch,
            head: 'feature/update-files',
            body: 'Updating files in the pull request.',
        });

        console.log(`New pull request created: ${prResponse.data.html_url}`);

    } catch (error) {
        console.error(error);
    }
}

async function run(): Promise<void> {
    try {
        // get the input
        const functionName: string = core.getInput('functionName')
        const pullrequestnumber = core.getInput('pullrequestnumber')
        const secrettoken = core.getInput('secrettoken')
        // const ms: string = core.getInput('milliseconds')
        // const ms: string = core.getInput('milliseconds')
        core.debug(`Function name is ${functionName}.`)

        if (functionName === 'benstest') {
            core.debug('benstest');
            core.setOutput('time', 'benstest');

            // const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

            // // Define your ignore list
            // const ignoreList = ['file1.txt', 'file2.txt'];

            // // Fetch the list of changed files in the push event
            // const response = await octokit.pulls.listFiles({
            //     owner: '0xlino',
            //     repo: 'mainrepo',
            //     pull_number: pullrequestnumber,
            // });

            // core.debug(JSON.stringify(response.data));

            await updateFilesInAnotherRepo();

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
