export class RetrieveFinetuningJobError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(message: string, errorCode?: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errorCode = errorCode || "IB101";
  }

  toObject(): object {
    const obj = {} as any;
    obj.message = this.message;
    return obj;
  }
}

export class CreateFinetuningJobError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(message: string, errorCode?: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errorCode = errorCode || "IB101";
  }

  toObject(): object {
    const obj = {} as any;
    obj.message = this.message;
    return obj;
  }
}
