const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
//   };

const { printf, timestamp, combine } = format;

//printf is to make a format
//Every info must have at least the level and message properties:
//Properties besides level and message are considered as "meta". i.e.:
// const { level, message, ...meta } = info;

const myCustomLevels = {
  levels: {
    info: 0,
    error: 1,
    silly: 2,
  },
  colors: {
    info: "green",
    error: "red",
    silly: "purple",
  },
};

const myFormat = printf(
  (info) => `${info.timestamp} [${info.level}] ${JSON.stringify(info.message)}`
);

const dailyTransport = new DailyRotateFile({
  filename: "logs/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  // zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const logger = createLogger({
  levels: myCustomLevels.levels,
  format: combine(
    timestamp({
      format: "YY-MM-DD HH:MM:SS",
    }),
    myFormat,
    format.colorize({ all: true })
  ),
  transports: [
    new transports.File({ filename: "logs/api-access.log", level: "info" }),
    new transports.File({ filename: "logs/combined.log", level: "error" }),
    new transports.Console({ level: "error" }),
    new transports.Console({ level: "info" }),
  ],
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;

//log format logger.log(info)
