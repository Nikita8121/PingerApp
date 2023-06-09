import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(
    exception: MongoError & { keyPattern: object } & { keyValue: object },
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse();
    const messages = Object.keys(exception.keyPattern)?.map((key) => {
      return `The ${key} with value "${exception.keyValue[key]}" already exists`;
    });
    console.log('code', exception.code);
    if (exception.code === 11000) {
      response.status(409).json({ message: messages.join('/n') });
    }
  }
}
