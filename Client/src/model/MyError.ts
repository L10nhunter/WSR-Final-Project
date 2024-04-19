export class MyError {
    code: number;
    message: string;
    locationData?: LocationData
    constructor(code: number, message: string, locationData?: LocationData){
        this.code = code;
        this.message = message;
        if(locationData) this.locationData = locationData;
    }
}
interface LocationData {
    fileName: string,
    lineNum: number
}