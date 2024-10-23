export class CustomError  extends Error {
    public code: number;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        this.name = "CustomError";
        Error.captureStackTrace(this, this.constructor);
    }
    public toJson() {
        return {
            message: this.message,
            code: this.code,
        };
    }
}
