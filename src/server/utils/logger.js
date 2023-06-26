import winston from "winston"
import commander from "../utils/commander.js"

const customerOptionsDev = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: commander.mode !== 'production' ? 4 : 'undefined',
        debug: commander.mode !== 'production' ? 5 : 'undefined',
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white',
    }
}

export const logger = winston.createLogger({
    levels: customerOptionsDev.levels,
    transports: [
        new winston.transports.Console({
            level: commander.mode !== 'production' ? 'debug' : 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customerOptionsDev.colors}),
                winston.format.simple()
            )
        }),
        commander.mode === 'production'
            ? new winston.transports.File({
                filename: './src/server/errors/logger.error.log',
                level: 'warning',
                format: winston.format.simple()
            })
            : null
    ].filter(Boolean)
})