import { Trigger } from "../../trigger/trigger";
import { Input } from "../../input/input";
import { iDevice } from "../i_device";
import { DeviceType } from "../device_types";
import { EventEmitter } from "events";

export class Switch implements iDevice {
    
    _id: string;
    _rev: string | undefined;
    name: string;
    type: string;

    private _action: Trigger;
   
    constructor(action: Trigger, name: string, rev: string | undefined, eventEmitter: EventEmitter) {
        this._action = action;
        this.name = name;
        this.type = DeviceType.SWITCH;
        this._id = name;
        this._rev = rev;

        eventEmitter.on(this.name, async() => {
            console.log('Switch ' + this.name + ' triggered');
            await this._action.execute();
            console.log('Action executed');
        });
    }

    toJSON() {
        return {
            _id: this._id,
            _rev: this._rev,
            name: this.name,
            type: this.type
        }
    }

    processAPIResponse(response: import("nano").DocumentInsertResponse): void {
        
    }

}