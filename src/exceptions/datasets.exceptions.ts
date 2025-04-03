export class CreateDatasetInDBError extends Error {
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

export class CreateDatasetError extends Error {
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

export class FetchAllDatasetsFromDBError extends Error {
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

export class FetchAllDatasetsError extends Error {
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

export class FetchDatasetByIdFromDBError extends Error {
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

export class FetchDatasetByIdError extends Error {
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

export class UpdateRowCountInDatasetInDBError extends Error {
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

export class UpdateColumnCountInDatasetInDBError extends Error {
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

export class DeleteDatasetFromDBError extends Error {
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

export class DeleteDatasetError extends Error {
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
