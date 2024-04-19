const { Command } = require("commander");
const program = new Command();

program
	.name("first-node-app")
	.version("0.0.1")
	.description("i am a Mohamed and this is my firts nodejs CLI app");

  program.parse(process.argv);