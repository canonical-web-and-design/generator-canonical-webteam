# The webteam's Yeoman generator

This is a collection of generator scripts for creating and maintaining Canonical webteam projects.

## Usage

First, install [Yeoman](http://yeoman.io) and generator-canonical-webteam using [npm](https://www.npmjs.com/).

```bash
npm install -g yo generator-canonical-webteam
```

Then run the generator scripts *from within a project directory* to create or upgrade parts of the project:

```bash
cd {project-directory}
yo canonical-webteam:{script-name}
```

## Scripts

Each of these scripts can either be used to create new files or to update existing ones:

### run

``` bash
yo canonical-webteam:run
```

This installs [a `./run` script](generators/run-basic/templates/run) which will use [docker-yarn](https://github.com/canonical-webteam/docker-yarn) to automatically manage [NPM dependencies](https://docs.npmjs.com/files/package.json#dependencies) and run standard [NPM scripts](https://docs.npmjs.com/misc/scripts) defined in a [package.json](https://docs.npmjs.com/files/package.json).

``` bash
$ ./run --help

Usage
===

  $ ./run \
    [-m|--node-module PATH]  # A path to a local node module to use instead of the installed dependencies \
    [COMMAND]                # Optionally provide a command to run

If no COMMAND is provided, `serve` will be run.

Commands
---

- serve [-p|--port PORT] [-w|--watch] [-d|--detach]: Run `yarn run serve` (optionally running `watch` in the background) \
- watch: Run `yarn run watch`
- build: Run `yarn run build`
- test: Run `yarn run test`
- stop: Stop any running containers
- yarn <args>: Run yarn
- clean: Remove all images and containers, any installed dependencies and the .docker-project file
- clean-cache: Empty cache files, which are saved between projects (eg, yarn)
```

## run-django

``` bash
yo canonical-webteam:run-django
```

Install a version of the `run` script which will also use
[docker-django](https://github.com/canonical-webteam/docker-django) to run a Django application on `./run start`.

# License

This codebase is licensed with [GNU Lesser General Public License version 3](LICENSE.md).
