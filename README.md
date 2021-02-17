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
$ npm install -g test
$ test COMMAND
running command...
$ test (-v|--version|version)
test/0.0.0 linux-x64 node-v10.19.0
$ test --help [COMMAND]
USAGE
  $ test COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`test hello [FILE]`](#test-hello-file)
* [`test help [COMMAND]`](#test-help-command)

## `test hello [FILE]`

describe the command here

```
USAGE
  $ test hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ test hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/OGoodness/test/blob/v0.0.0/src/commands/hello.ts)_

## `test help [COMMAND]`

display help for test

```
USAGE
  $ test help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
