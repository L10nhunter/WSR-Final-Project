export class MyError {
    status: number;
    message: string;
    locationData?: LocationData
    constructor(status: number, message: string, locationData?: LocationData){
        this.status = status;
        this.message = message;
        if(locationData) this.locationData = locationData;
    }
}
interface LocationData {
    fileName: string,
    lineNum: number,
    charNum: number
}