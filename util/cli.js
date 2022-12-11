const findUp = require("find-up");
const fs = require("fs");
const Dotenv = require("dotenv");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

async function parseDotenv(appEnv) {
  // dotenv 파싱
  const envFilePath = await findUp(`./env/.env.${appEnv}`);

  const parsedEnv = Dotenv.config({ path: envFilePath }).parsed || {};

  return parsedEnv;
}

async function copyEnv(appEnv) {
  // 파싱 대상 파일은 '.env'파일로 복사
  // const envFilePath = await findUp(`./env/.env.${appEnv}`);
  const envFilePath = `${fs.realpathSync(process.cwd())}/env/.env.${appEnv}`;
  const dotenvFilePath = `${fs.realpathSync(process.cwd())}/.env`;
  try {
    fs.copyFileSync(envFilePath, dotenvFilePath);
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

yargs(hideBin(process.argv))
  .command(
    "next-env",
    "Create Next.js runtime environment js",
    function builder(y) {
      return y.option("env", {
        alias: "e",
        type: "string",
        description: "Environment name(ex: alpha, dev, staging, real)",
      });
    },
    async function handler(args) {
      const appEnv = args.e || args.env || "development";

      const parsedEnv = await parseDotenv(appEnv);
      await copyEnv(appEnv); // .env 파일 복사

      return parsedEnv;
    }
  )
  .parse();
