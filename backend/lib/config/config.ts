import { Input } from "../model/input/input";
import { iDevice } from "../model/device/i_device";
import { EventEmitter } from "events";

export abstract class Config {
    public abstract async getInputs(eventEmitter: EventEmitter): Promise<Array<Input>>;
    public abstract async getDevices(eventEmitter: EventEmitter): Promise<Array<iDevice>>;

    public abstract async addDevice(device: iDevice): Promise<void>;
    public abstract async addInput(input: Input): Promise<void>;
}