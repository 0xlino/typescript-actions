"use strict";
// import * as core from '@actions/core'
// const { Octokit } = require('@octokit/rest');
// import {wait} from './wait'
// import fetch from 'node-fetch'; // Import node-fetch
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// async function run(): Promise<void> {
//   try {
//     // get the input
//     const functionName: string = core.getInput('functionName')
//     const pullrequestnumber = core.getInput('pullrequestnumber')
//     const secretToken = core.getInput('secrettoken')
//     // const ms: string = core.getInput('milliseconds')
//     // const ms: string = core.getInput('milliseconds')
//     core.debug(`Function name is ${functionName}.`)
//     if (functionName === 'benstest') {
//       core.debug('benstest')
//       core.setOutput('time', 'benstest')
//       const {Octokit} = require('@octokit/rest')
//       const octokit = new Octokit({auth: secretToken, request: {
//         fetch: fetch,
//       }})
//       // Define your ignore list
//       const ignoreList = ['file1.txt', 'file2.txt']
//       // Fetch the list of changed files in the push event
//       const response = await octokit.pulls.listFiles({
//         owner: '0xlino',
//         repo: 'mainrepo',
//         pull_number: pullrequestnumber
//       })
//       core.debug(JSON.stringify(response.data))
//     } else {
//       const ms: string = core.getInput('milliseconds')
//       core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
//       core.debug(new Date().toTimeString())
//       await wait(parseInt(ms, 10))
//       core.debug(new Date().toTimeString())
//       core.setOutput('time', new Date().toTimeString())
//     }
//   } catch (error) {
//     if (error instanceof Error) core.setFailed(error.message)
//   }
// }
// run()
const core = __importStar(require("@actions/core"));
const wait_1 = require("./wait");
const { Octokit } = require('@octokit/rest');
const { execSync } = require('child_process');
// const fetch = require('node-fetch');
const node_fetch_1 = __importDefault(require("node-fetch")); // Import node-fetch
function updateFilesInAnotherRepo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const targetRepoOwner = '0xlino'; // Replace with the owner of the target repository
            const targetRepoName = 'secondaryrepo'; // Replace with the name of the target repository
            const targetBranch = 'main'; // Replace with the target branch name
            const targetToken = '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'; // Replace with your authentication token for the target repository
            const targetPRNumber = 1; // Replace with the target pull request number
            const octokitTarget = new Octokit({ auth: targetToken, request: { fetch: node_fetch_1.default } });
            // Fetch the details of the pull request in the target repository
            const pullRequestResponse = yield octokitTarget.pulls.get({
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
            const prResponse = yield octokitTarget.pulls.create({
                owner: targetRepoOwner,
                repo: targetRepoName,
                title: 'Update files',
                base: targetBranch,
                head: 'feature/update-files',
                body: 'Updating files in the pull request.',
            });
            console.log(`New pull request created: ${prResponse.data.html_url}`);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get the input
            const functionName = core.getInput('functionName');
            const pullrequestnumber = core.getInput('pullrequestnumber');
            const secrettoken = core.getInput('secrettoken');
            // const ms: string = core.getInput('milliseconds')
            // const ms: string = core.getInput('milliseconds')
            core.debug(`Function name is ${functionName}.`);
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
                yield updateFilesInAnotherRepo();
            }
            else {
                const ms = core.getInput('milliseconds');
                core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
                core.debug(new Date().toTimeString());
                yield (0, wait_1.wait)(parseInt(ms, 10));
                core.debug(new Date().toTimeString());
                core.setOutput('time', new Date().toTimeString());
            }
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();
