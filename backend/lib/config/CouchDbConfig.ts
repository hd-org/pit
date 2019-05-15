import { Config } from "./config";
import { Input } from "../model/input/input";
import { Device } from "../model/device/device";
import Nano = require('nano');

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
    
    public async getInputs(): Promise<Array<Input>> {
        const db = this._nano.db.use('inputs');
        
        const savedInputs = await db.list();
        console.log(savedInputs)
        
        return [];
    }

    public async getDevices(): Promise<Array<Device>> {
        return [];
    }

    public async addInput(input: Input): Promise<void> {
        await this._createDb('inputs');

        const db = this._nano.db.use('inputs');
        const response = await db.insert(input);
        input.processAPIResponse(response);
    }

    public async addDevice(device: Device): Promise<void> {

    }
}