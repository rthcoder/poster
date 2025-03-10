"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_1 = require("./app");
const app_config_1 = require("./config/app.config");
const _config_1 = require("./config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_1.App, new platform_express_1.ExpressAdapter(), {
        cors: {
            origin: '*',
            maxAge: 0,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            credentials: false,
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: [],
            preflightContinue: false,
            optionsSuccessStatus: 200,
        },
    });
    app.use((0, express_1.json)({
        limit: '5mb',
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            const firstError = errors.find((error) => error.constraints);
            const message = firstError ? Object.values(firstError.constraints)[0] : 'Validation error';
            return new common_1.BadRequestException(message);
        },
    }));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        prefix: 'api/v',
    });
    app.set('env', app_config_1.appConfig.env);
    app.set('etag', 'strong');
    app.set('trust proxy', true);
    app.set('x-powered-by', false);
    const document = swagger_1.SwaggerModule.createDocument(app, _config_1.swaggerConfig.options);
    swagger_1.SwaggerModule.setup(_config_1.swaggerConfig.path, app, document, {
        swaggerOptions: {
            defaultModelsExpandDepth: -1,
        },
    });
    await app.listen(app_config_1.appConfig.port, app_config_1.appConfig.host);
}
bootstrap();
