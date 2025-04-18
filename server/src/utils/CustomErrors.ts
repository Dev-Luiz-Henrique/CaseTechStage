export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}
