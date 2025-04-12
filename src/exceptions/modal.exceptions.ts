export class AddModelInDbError extends Error {
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

export class TrainDatasetError extends Error {
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

export class GenerateResponseError extends Error {
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

export class GetModelByJobIdInDbError extends Error {
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

export class UpdateModelInDbError extends Error {
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

export class GetFinetuningJobError extends Error {
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
