import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    errorFile: { type: "file", filename: "error.log" },
    loggerConsole: {
      type: "logLevelFilter",
      appender: "console",
      level: "info",
    },
    loggerErrors: {
      type: "logLevelFilter",
      appender: "errorFile",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: ["loggerConsole", "loggerErrors"],
      level: "all",
    },
  },
});

const logger = log4js.getLogger();

export default logger;
