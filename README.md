<p align="center">
	<a href="https://travis-ci.org/eoscostarica/rate.eoscostarica.io">
		<img src="https://travis-ci.org/eoscostarica/rate.eoscostarica.io.svg?branch=master" alt="TravisCI">
	</a>
	<a href="http://standardjs.com">
		<img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="StandardJS">
	</a>
	<a href="https://git.io/col">
		<img src="https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg" alt="Collaborative Etiquette">
	</a>
	<a href="https://discord.gg/bBpQHym">
		<img src="https://img.shields.io/discord/447118387118735380.svg?logo=discord" alt="chat on Discord">
	</a>
	<a href="https://twitter.com/intent/follow?screen_name=eoscostarica">
		<img src="https://img.shields.io/twitter/follow/eoscostarica.svg?style=social&logo=twitter" alt="follow on Twitter">
	</a>
	<a href="#">
		<img src="https://img.shields.io/dub/l/vibe-d.svg" alt="MIT">
	</a>
</p>

<p align="center">
	<a href="https://eoscostarica.io">
		<img src="https://cdn.rawgit.com/eoscostarica/assets/574d20a6/logos/eoscolors-transparent.png" width="300">
	</a>
</p>
<br/>

# EOS Rating Portal - Community based rating system.

Community driven EOS Block Producer ratings website.

## Contributing

We use a Kanban-style board with built-in triggers to automatically move issues and pull requests across New Issues, To Do, In Progress and Done columns. That's were we prioritize the work. [Go to Project Board](https://github.com/eoscostarica/rate.eoscostarica.io/projects/1).

We follow the [open source collaborative ettiquete](https://github.com/rstacruz/collaborative-etiquette/blob/master/README.md#top), the [standardjs code style](https://standardjs.com) and we favor [functional javascript programming](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84) and declative code style.

Read the [contributing guidelines](CONTRIBUTING.md) for details.

Our weekly sync call is every Monday 7pm-8pm CST / Costa Rica on google hangouts. [Go to hangouts room](http://bit.ly/dmeetup-call)

## Bug Reporting

Please report bugs big and small by [opening an issue](https://github.com/eoscostarica/dmeetup/issues). No possible bug report is too small.

## Architecture

- We are going start with a MongoDB on the cloud to ratings replica data store for fast queries.
- Once the new racks are in place and we have a node with history plugin we can query that mongodb instead.
- Rating will only be possible on desktop thru scatter in the first version.
- Mobile will be read only for now.

First Phase

![](docs/EOSRate.png)

Second Phase

![](docs/EOSRate-History.png)

## User Flow

- Just ignore the login/signup part ( we'll use scatter instead )

![](docs/EOSRate-UserFlow.png)

## Project Directory Structure

```
.
├── docs/ ............................................. documentation files and media
├── server/ ........................................... all server side code (we will cover in detail soon)
├── webapp/ ........................................... all client side code
|	├── public/ ....................................... static and public files
|	├── src/ .......................................... application source code (we will cover in detail soon)
|	├── package.json .................................. dependencies manifest
|	├── docker-compose.yaml ........................... docker compose for local smart contracts development
|	├── config-overrides.js ........................... configuration overrides for `create-react-app`
|	├── .env .......................................... environment variables (for local development)
|	└── .eslintrc ..................................... code style rules
├── docs/ .............................................. documentation files and media
├── public/ ............................................ static and public files
├── src/ ............................................... application source code (we will cover in detail soon)
├── CONTRIBUTING.md .................................... contributing guidelines
├── LICENSE ............................................ project license
├── README.md .......................................... project homepage
├── package.json ....................................... dependencies manifest
├── docker-compose.yaml ................................ docker compose for local smart contracts development
├── config-overrides.js ................................ configuration overrides for `create-react-app`
└── .travis.yml ........................................ travis ci configuration file
```

# React App Components

- [react-app-rewired](https://github.com/timarney/react-app-rewired) for tweaking `create-react-app` configuration without ejecting
- [reach-router](https://github.com/reach/router) for a more accessible router.
- state management with [rematch](https://github.com/rematch/rematch) to use `redux` best practices without all the boilerplate.

## Continuous Integration Process

We follow a continuous integration process based on Github flow that leverages the following tools:

- [TravisCI](https://travis-ci.org/) to run test and code style checks
- [Now.sh](https://now.sh) for continuous delivery to the stanging server and creation pull request specific environments for testing. awesome!
- [Code Factor](https://codefactor.io) for automated code quality reviews.

## About EOS Costa Rica

EOS Blockchain is aiming to become a decentralized operating system which can support large-scale decentralized applications.

EOS Costa Rica supports the EOS.io community by maintaining and contributing to open source initiatives, meetups and workshops.

We challenge ourselves to provide the EOS platform with a strong geographical and political diversity by running the most robust EOS Block Producer possible from Costa Rica; We pledge to leverage our talent, experience, and sustainable internet resources to meet such an important challenge.

[eoscostarica.io](https://eoscostarica.io)

## License

MIT © [EOS Costa Rica](https://eoscostarica.io)
