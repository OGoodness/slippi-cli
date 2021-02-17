test
====

Testing Func

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/test.svg)](https://npmjs.org/package/test)
[![Codecov](https://codecov.io/gh/OGoodness/test/branch/master/graph/badge.svg)](https://codecov.io/gh/OGoodness/test)
[![Downloads/week](https://img.shields.io/npm/dw/test.svg)](https://npmjs.org/package/test)
[![License](https://img.shields.io/npm/l/test.svg)](https://github.com/OGoodness/test/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g slippi-cli
$ slp COMMAND
running command...
$ slp (-v|--version|version)
slippi-cli/0.0.1 linux-x64 node-v10.19.0
$ slp --help [COMMAND]
USAGE
  $ slp COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`slp help [COMMAND]`](#slp-help-command)
* [`slp stats [FILE]`](#slp-stats-file)

## `slp help [COMMAND]`

display help for slp

```
USAGE
  $ slp help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `slp stats [FILE]`

describe the command here

```
USAGE
  $ slp stats [FILE]

ARGUMENTS
  FILE  (a|b) [default: world] output file

OPTIONS
  -F, --force
  -d, --dir=dir    Directory to scan and get stats from
  -f, --file=file  file get stats
  -p, --path=path  Path to get value in JSON output

EXAMPLE
  $ test hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/stats.ts](https://github.com/OGoodness/slippi-cli/blob/v0.0.1/src/commands/stats.ts)_
<!-- commandsstop -->
