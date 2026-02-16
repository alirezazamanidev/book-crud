import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
  
    const response = host.switchToHttp().getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    if(exception instanceof Error){
        status=HttpStatus.INTERNAL_SERVER_ERROR;
        message=exception.message;
    }
    else if(exception instanceof HttpException){
        status=exception.getStatus();
        message=exception.message;
    }

    response.status(status).json({message,status})
  }
}
