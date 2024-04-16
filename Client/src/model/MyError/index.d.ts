export class MyError {
    code: number;
    message: string;
    locationData?: {
        fileName: string,
        lineNum: number
    }
    constructor(code, message, locationData)
    constructor(code, message)
}