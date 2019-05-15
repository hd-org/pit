import { Input } from "../model/input/input";
import { Config } from "./config";
import { Device } from "../model/device/device";

export class FileConfig extends Config{

    private _inputs: Array<Input>;
    private _devices: Array<Device>;

    constructor() {
        super();
        this._inputs = [];
        this._devices = [];
    }

    public async getDevices(): Promise<Array<Device>> {
        return this._devices;
    }

    public async getInputs(): Promise<Array<Input>> {
        return this._inputs;
    }

    public async addDevice(device: Device) {
        this._devices.push(device);
    }

    public async addInput(input: Input) {
        this._inputs.push(input);
    }
}