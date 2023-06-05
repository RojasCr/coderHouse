const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

const swaggerConfig = () => {
    const swaggerOptions = {
        definition: {
            openai: "3.0.1",
            info: {
                title: "Documentación de e-commerce",
                description: "API para venta de productos"
            }
        },
        apis: [`${process.cwd()}/src/docs/**/*.yaml`]
    }

    const specs = swaggerJsDoc(swaggerOptions);

    swaggerUiExpress.serve;
    swaggerUiExpress.setup(specs)

    console.log(swaggerOptions)
}

module.exports = swaggerConfig;