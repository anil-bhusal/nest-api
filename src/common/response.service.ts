import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  success(message: string) {
    return {
      status: 200,
      message,
    };
  }

  notFound(message: string) {
    return {
      status: 404,
      message,
    };
  }

  // Add more custom response methods as needed
}
