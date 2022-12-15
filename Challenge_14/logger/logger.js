const winston = require('winston')

function logger (){
    const logger = createLogger({
        level: "info",
        transports: [
            new winston.transports.Console({ level: "info", }),
            new winston.transports.File({filename: "./logger/warn.log",level: "warn",}),
            new winston.transports.File({filename: "./logger/error.log",level: "error",})
        ],
    });
}

module.exports =  {logger};