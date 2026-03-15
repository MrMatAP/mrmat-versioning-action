/**
 * Generate the version of what is being built here. If the build is for a non-
 * release version then append a suffix to the version.
 * @param major The major version number
 * @param minor The minor version number
 * @param micro The micro version number
 * @param is_release True if the version is for a release
 * @param ecosystem The ecosystem to generate the version for. Determines the suffix
 */
export function get_version(
    major: number,
    minor: number,
    micro: number,
    is_release: boolean,
    ecosystem: string
): string {
    let version = `${major}.${minor}.${micro}`
    if (!is_release) {
        switch (ecosystem.toLowerCase()) {
            case 'python':
                version += '.dev0'
                break
            case 'java':
                version += '-SNAPSHOT'
                break
            case 'javascript':
                version += '-dev0'
                break
            default:
                throw new Error(`Unsupported ecosystem: ${ecosystem}`)
        }
    }
    return version
}
