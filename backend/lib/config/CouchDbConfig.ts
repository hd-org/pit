import { Config } from "./config";
import { Input } from "../model/input/input";
import Nano = require('nano');
import { InputFactory } from "../model/input/input_factory";
import { iDevice } from "../model/device/i_device";
import { EventEmitter } from "events";
import { DeviceFactory } from "../model/device/device_factory";
import { iInput } from "../model/input/i_input";

export class CouchDbConfig extends Config {

    private _nano: Nano.ServerScope;

    constructor() {
        super();
        this._nano = Nano('http://localhost:5984');
    }

    private async _createDb(name: string) {
        try {
            await this._nano.db.get(name);
            console.log('DB: ' + name + ' already exists.');
        } catch (e) {
            console.log('Creating DB: ' + name);
            await this._nano.db.create(name);
        }
        
    }
    
    public async getInputs(eventEmitter: EventEmitter): Promise<Array<Input>> {
        const db = this._nano.db.use('inputs');
        
        const savedInputs = await db.list({ include_docs: true });

        const inputs: Array<Input> = [];
        
        for(let savedInput of savedInputs.rows) {
            const instance = InputFactory.createInstance(savedInput.doc as iInput, eventEmitter);
            if(instance !== null) {
                inputs.push(instance);
            }
        }
        
        return inputs;
    }

    public async getDevices(eventEmitter: EventEmitter): Promise<Array<iDevice>> {
        const db = this._nano.db.use('devices');

        const savedDevices = await db.list({ include_docs: true });

        const devices: Array<iDevice> = [];

        for(let savedDevice of savedDevices.rows) {
            const instance = DeviceFactory.createInstance(savedDevice.doc as iDevice, eventEmitter);
            if(instance) {
                devices.push(instance);
            }
        }

        return devices;
    }

    public async addInput(input: Input): Promise<void> {
        await this._createDb('inputs');

        const db = this._nano.db.use('inputs');
        const response = await db.insert(input);
        input.processAPIResponse(response);
    }

    public async addDevice(device: iDevice): Promise<void> {
        await this._createDb('devices');

        const db = this._nano.use('devices');
        const response = await db.insert(device);
        device.processAPIResponse(response);
    }
}