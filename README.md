# TerribleOceanMissiles [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is [Commitizen friendly](http://commitizen.github.io/cz-cli/)

## How to use `yarn`
Simply use `yarn` wherever you would normally use `npm`... (e.g. `yarn add somepackage`)
A fast, reliable and secure dependency management package, often known as "the better NPM"
More information and docs [here](https://yarnpkg.com/lang/en/)

## How to use `commitizen`
Simply run `yarn commit` and follow the prompts, this should be done for every commit
### WARNING: if you do not use `yarn commit`, this repo may reject your commits! (and waste your time)

## How to use `semantic-ui-react`
Semantic UI is a great source of extra components and themes, without having to spend a whole lot of time setting up boilerplate and writing CSS
To use Semantic UIs components in this repo, please see their [docs](https://react.semantic-ui.com)

## Custom Scripts
|`yarn <command>`|Description|
|`dev`|Starts both `client` and `server` using the `concurrently` package|
|`client`|Starts the React App Client on it's own| 
|`server`|Starts the Express API Server on it's own|
|`commit`|Runs commitizen to assist you in setting up standard commenting for your commits.<br><br>**This is highly recommended to prevent getting your commits from being rejected when pushing your changes due to your commit messages.**|

## Default Scripts
|`yarn <command>`|Description|
|`build`|Build the app for prod in the `build` folder|
|`test`|Run all unit tests|
|`eject`|Eject from React Scripts. Not recommended to use unless you aren't satisfied with the build tools and config choices.<br>**Note: this is a one-way operation. Once you `eject`, you can’t go back!**|

## Branching Strategy
### WIP
possibly this: https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
