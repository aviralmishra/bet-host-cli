# Bet Host CLI

A command-line interface for Tote betting

# Pre-reqs
The project is tested with Node 4.4.x onwards.
- Install [Node.js](https://nodejs.org/en/)

# Optional Pre-reqs
- Install [Mocha](https://www.npmjs.com/package/mocha)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone https://github.com/aviralmishra/bet-host-cli.git
```
- Install dependencies
```
cd bet-host-cli
npm install
```
- Build and run the project
```
npm run serve
```
- Only build and lint the project
```
npm run build
```
- Run tests
```
npm run test
```
# Dependencies
Dependencies are managed through `package.json`.

# Run-time Help
- Once project is cloned and depdenencies are installed, run the following command to get the calculator started:
```
npm run serve
```

The command above will run the build to ensure we are working with latest code and load the betting host prompt. Once the prompt is available, enter bets and final result. The calculation will start once the result row is detected.

If a particular bet or result row is not entered in expected format, the tool will raise a validation error and ignore the row.

To exit at any time, press "Ctrl + C".

# To do

1. Add calculator service specs
2. Add more specs for parsers
3. Run yield calculations in parallel for better performance

