import * as core from '@actions/core'
import * as github from '@actions/github'

import { get_version } from './version.js'

export function run() {
    try {
        const ecosystem: string = core.getInput('ecosystem')
        const releaseBranchRef: string = core.getInput('release_branch_ref')
        const majorInput: string = core.getInput('major')
        const minorInput: string = core.getInput('minor')

        const major = parseInt(majorInput, 10)
        const minor = parseInt(minorInput, 10)
        if (!Number.isInteger(major) || major < 0)
            throw new Error(`Invalid major version: ${majorInput}`)
        if (!Number.isInteger(minor) || minor < 0)
            throw new Error(`Invalid minor version: ${minorInput}`)

        if (!['python', 'java', 'javascript'].includes(ecosystem.toLowerCase()))
            throw new Error(`Unsupported ecosystem: ${ecosystem}`)

        const version = get_version(
            major,
            minor,
            github.context.runNumber,
            github.context.ref === releaseBranchRef,
            ecosystem
        )
        core.info(`Version: ${version}`)
        core.setOutput('version', version)
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
        else core.setFailed(String(error))
    }
}
