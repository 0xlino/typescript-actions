"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const wait_1 = require("./wait");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get the input
            const functionName = core.getInput('functionName');
            const pullrequestnumber = core.getInput('pullrequestnumber');
            // const ms: string = core.getInput('milliseconds')
            // const ms: string = core.getInput('milliseconds')
            core.debug(`Function name is ${functionName}.`);
            if (functionName === 'benstest') {
                core.debug('benstest');
                core.setOutput('time', 'benstest');
                const { Octokit } = require('@octokit/rest');
                const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
                // Define your ignore list
                const ignoreList = ['file1.txt', 'file2.txt'];
                // Fetch the list of changed files in the push event
                const response = yield octokit.pulls.listFiles({
                    owner: '0xlino',
                    repo: 'mainrepo',
                    pull_number: pullrequestnumber
                });
                core.debug(JSON.stringify(response.data));
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
