import { Command } from "commander";

const commander = new Command();

commander
    .option('-m, --mode <mode>', 'run mode', 'production')
    .requiredOption('-u, --user <user>', 'running user', 'no user declared');

commander.parse();

export default commander._optionValues;
