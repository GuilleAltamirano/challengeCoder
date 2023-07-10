import swaggerJSDoc from "swagger-jsdoc"
import { __dirname } from "./utils.js";

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Api Ddbase',
            description: 'Api para el proyecto de Coder',
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions);