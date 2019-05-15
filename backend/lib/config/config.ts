import { Input } from "../model/input/input";
import { Device } from "../model/device/device";

export abstract class Config {
    public abstract async getInputs(): Promise<Array<Input>>;
    public abstract async getDevices(): Promise<Array<Device>>;

    public abstract async addDevice(device: Device): Promise<void>;
    public abstract async addInput(input: Input): Promise<void>;
}