# TerribleOceanMissiles [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is [Commitizen friendly](http://commitizen.github.io/cz-cli/)

## StyleCI
This project has StyleCI enabled. Upon every pushed commit StyleCI will ensure that your code follows all rules set for the repository. If it detects any code that breaks the styling rules, it will create a new branch, make the required changes to correct the styling issues, and then send a pull request. Please review this PR and merge it if you find no issues.

The following are the rules StyleCI will check against:
- tab-width: 4
- use-tabs: false
- print-width: 120
- double-quotes: false
- trailing-commas: es5
- semicolons: true
- arrow-parens: avoid
- bracket-spacing: true


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
|----------------|-----------|
|`dev`|Starts both `client` and `server` using the `concurrently` package|
|`client`|Starts the React App Client on it's own| 
|`server`|Starts the Express API Server on it's own|
|`commit`|Runs commitizen to assist you in setting up standard commenting for your commits.<br><br>**This is highly recommended to prevent getting your commits from being rejected when pushing your changes due to your commit messages.**|

## Default Scripts
|`yarn <command>`|Description|
|----------------|-----------|
|`build`|Build the app for prod in the `build` folder|
|`test`|Run all unit tests|
|`eject`|Eject from React Scripts. Not recommended to use unless you aren't satisfied with the build tools and config choices.<br>**Note: this is a one-way operation. Once you `eject`, you can’t go back!**|

## Branching Strategy
### WIP
possibly this: https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Password Validation 
https://upmostly.com/tutorials/build-a-password-strength-meter-react
https://github.com/dropbox/zxcvbn
zxcvbn is a low budget password strength estimator, the implementation of this package enables higher secuirty, flexibilty and usability. The package takes into account common names and words, as well as keyboard patterns.
Passwords are reated as followed. Our password strength allowed is ranked as anything equal or higher than 2.  
- 0 # too guessable: risky password. (guesses < 10^3)
- 1 # very guessable: protection from throttled online attacks. (guesses < 10^6)
- 2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
- 3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
- 4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)

