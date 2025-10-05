/**
 * Unit tests for version.ts
 */

import { get_version } from '../src/version.js'

describe('Version Calculations', () => {
    test('Throws error for unsupported ecosystem', () => {
        expect(() => {
            get_version('1', '2', 3, false, 'foo')
        }).toThrow()
    })

    test.each([
        {
            major: '1',
            minor: '2',
            micro: 3,
            is_release: true,
            ecosystem: 'python',
            expected: '1.2.3'
        },
        {
            major: '1',
            minor: '2',
            micro: 3,
            is_release: false,
            ecosystem: 'python',
            expected: '1.2.3.dev0'
        },
        {
            major: '1',
            minor: '2',
            micro: 3,
            is_release: true,
            ecosystem: 'Java',
            expected: '1.2.3'
        },
        {
            major: '1',
            minor: '2',
            micro: 3,
            is_release: false,
            ecosystem: 'Java',
            expected: '1.2.3-SNAPSHOT'
        },
        {
            major: '1',
            minor: '2',
            micro: 3,
            is_release: true,
            ecosystem: 'Javascript',
            expected: '1.2.3'
        },
        {
            major: '1',
            minor: '2',
            micro: 3,
            is_release: false,
            ecosystem: 'Javascript',
            expected: '1.2.3-dev0'
        }
    ])(
        'Returns $expected',
        ({ major, minor, micro, is_release, ecosystem, expected }) => {
            expect(
                get_version(major, minor, micro, is_release, ecosystem)
            ).toBe(expected)
        }
    )
})
