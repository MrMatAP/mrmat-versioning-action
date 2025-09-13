# MrMat Versioning Action

This action calculates a unique version string in the format
`MAJOR.MINOR.MICRO[SUFFIX]`.

The MAJOR and MINOR version numbers are manually bumped by the user of this
action via inputs. The MICRO version is taken from the GitHub run number. The
SUFFIX is added when the action is run anywhere but on the release branch.
Suffixes differ depending on the ecosystem the version is generated for.

| Ecosystem | SUFFIX      |
|-----------|-------------|
| Python    | `.dev0`     |
| Java      | `-SNAPSHOT` |
| <Default> | '.dev0'     |

## Inputs

### ecosystem

**Required** The ecosystem to generate the version for.

### release_branch_ref

Fully qualified ref to the release branch. Defaults to 'refs/heads/main'

### major

The major version number. Defaults to 0

### minor

The minor version number. Defaults to 0

## Outputs

### version

The calculated version string.

## Example usage

```yaml
uses: actions/mrmat-versioning-action@v1.0.0
with:
    ecosystem: python
```

## How to build this

Run `npm install` and then `npm run bundle`.

## How to test this

### Running the action locally

Create `.env` based on `.env.example`, but do not commit it to your repo. Set values in that file to simulate execution 
within a GitHub Workflow and execute `npx @github/local-action . src/main.ts .env`.
