import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  success(message: string) {
    return {
      status: 200,
      message,
    };
  }

  notFound(message: string, data: any = null) {
    return {
      status: 404,
      message,
      data,
    };
  }

  successWithData(message: string, data: any) {
    return {
      status: 200,
      message,
      data,
    };
  }

  error(message: string, error: any) {
    return {
      status: 500,
      message,
      error,
    };
  }

  // Add more custom response methods as needed
}
