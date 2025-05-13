import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import e, { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx    = host.switchToHttp();
    const res    = ctx.getResponse<Response>();
    const error  = exception as any;

    // status y mensaje default
    let status  = HttpStatus.BAD_REQUEST;
    let message = 'Error en la base de datos';
    

    // CHECK violation (Postgres code 23502)
    if (error.code === '23502') {
        if (error.column === 'email') {
            message = 'No se ha ingresado un email';
    } else if (error.column === 'name') {
            message = 'No se ha ingresado un nombre';
        }
    }

    // UNIQUE violation (Postgres code 23505)
    if (error.code === '23505') {
        message = 'El email ingresado ya está en uso';
        status  = HttpStatus.CONFLICT;
    }

    // Envía la respuesta
    res.status(status).json({
        statusCode: status,
        message,
        error: HttpStatus[status].toString(),
        });
    }
}