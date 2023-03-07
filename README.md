# Bitxor CLI

Command Line Interface (CLI) to interact with Bitxor.

**NOTE:** bitxor-cli is designed to help developers test solutions and interact with Bitxor networks quickly from the command line prompt.

0.24.x breaks compatibility with HD account derivation in ``profiles`` (Testnet) saved using previous versions of the software.
Before installing ``bitxor-cli@1.0.1``, backup and delete the file ``~ \.bitxorrc.json``.

Find the complete release notes [here](CHANGELOG.md).

## Requirements

- Node.js 12 LTS

## Installation

The Bitxor CLI is distributed using the node package manager ``npm``.

```bash
npm install -g bitxor-cli
```

## Usage

Surf the [documentation][docs] to get started into Bitxor development.
You will find self-paced guides and useful code snippets using the Bitxor CLI.

To get the full list of available commands, check the [CLI reference][ref].

## Getting help

- [Bitxor Documentation][docs]
- If you found a bug, [open a new issue][issues]


## License

Copyright 2023-present Bitxor Community

Licensed under the [Apache License 2.0](LICENSE)

[self]: https://github.com/bitxorcorp/bitxor-cli
[docs]:  https://docs.bitxor.org
[issues]: https://github.com/bitxorcorp/bitxor-cli/issues
