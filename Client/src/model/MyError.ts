export class MyError extends Error{
    status: number;
    locationData: LocationData

    constructor(status: number, message: string, locationData?: LocationData) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
        if(locationData) this.locationData = locationData;
        else {
            const important = this.stack!.split("\n")[1].split("(")[1].split(")")[0].split(":");
            this.locationData = {fileName: important[0], lineNum: important[1], charNum: important[2]};
        }
    }
}
interface LocationData {
    fileName: string,
    lineNum: string,
    charNum: string
}