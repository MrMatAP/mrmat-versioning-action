import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import * as github from '../__fixtures__/github.js'

jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('@actions/github', () => github)

const { run } = await import('../src/main.js')

describe('GitHub Actions Interface', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    test('Calls setFailed for unsupported ecosystem', () => {
        core.getInput.mockImplementation((input: string) => {
            switch (input) {
                case 'ecosystem':
                    return 'foo'
                case 'release_branch_ref':
                    return 'refs/heads/main'
                case 'major':
                    return '1'
                case 'minor':
                    return '2'
                default:
                    throw new Error(`Unexpected input: ${input}`)
            }
        })
        github.context.runNumber = 3
        github.context.ref = 'refs/heads/develop'

        run()

        expect(core.setFailed).toHaveBeenCalledWith(
            'Unsupported ecosystem: foo'
        )
    })

    test.each([
        {
            ecosystem: 'python',
            release_branch_ref: 'refs/heads/main',
            major: '1',
            minor: '2',
            runNumber: 3,
            ref: 'refs/heads/main',
            expected: '1.2.3'
        },
        {
            ecosystem: 'python',
            release_branch_ref: 'refs/heads/main',
            major: '1',
            minor: '2',
            runNumber: 3,
            ref: 'refs/heads/develop',
            expected: '1.2.3.dev0'
        },
        {
            ecosystem: 'java',
            release_branch_ref: 'refs/heads/main',
            major: '1',
            minor: '2',
            runNumber: 3,
            ref: 'refs/heads/main',
            expected: '1.2.3'
        },
        {
            ecosystem: 'java',
            release_branch_ref: 'refs/heads/main',
            major: '1',
            minor: '2',
            runNumber: 3,
            ref: 'refs/heads/develop',
            expected: '1.2.3-SNAPSHOT'
        },
        {
            ecosystem: 'javascript',
            release_branch_ref: 'refs/heads/main',
            major: '1',
            minor: '2',
            runNumber: 3,
            ref: 'refs/heads/main',
            expected: '1.2.3'
        },
        {
            ecosystem: 'javascript',
            release_branch_ref: 'refs/heads/main',
            major: '1',
            minor: '2',
            runNumber: 3,
            ref: 'refs/heads/develop',
            expected: '1.2.3-dev0'
        }
    ])(
        'Returns $expected',
        ({
            ecosystem,
            release_branch_ref,
            major,
            minor,
            runNumber,
            ref,
            expected
        }) => {
            core.getInput.mockImplementation((input: string) => {
                switch (input) {
                    case 'ecosystem':
                        return ecosystem
                    case 'release_branch_ref':
                        return release_branch_ref
                    case 'major':
                        return major
                    case 'minor':
                        return minor
                    default:
                        throw new Error(`Unexpected input: ${input}`)
                }
            })
            github.context.runNumber = runNumber
            github.context.ref = ref

            run()

            expect(core.setOutput).toHaveBeenNthCalledWith(
                1,
                'version',
                expected
            )
            expect(core.info).toHaveBeenNthCalledWith(1, `Version: ${expected}`)
        }
    )
})
