import { createInterface, Interface } from "readline";
import { Input } from "./input";
import Nano = require('nano');
import { InputTypes } from "./input_types";
import { EventEmitter } from "events";

export class ConsoleInput extends Input {
    
    eventEmitter: EventEmitter;
    private _lineReader: Interface;
    _id: string;
    _rev: string | undefined;

    type: InputTypes = InputTypes.CONSOLE;
    name: string;

    constructor(name: string, rev: string | undefined, eventEmitter: EventEmitter) {
        super();
        this._id = name;
        this._rev = rev;
        this.name = name;
        this.eventEmitter = eventEmitter;

        this._lineReader = createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    run(): void{      
        this._lineReader.question('Enter command: ', (answer) => {
            console.log('-> ' + answer);
            if(answer === 'stop') {
                return this.stop();
            }
            this.eventEmitter.emit(answer);

            this.run();
        });
    }


    stop() {
        this._lineReader.close();
    }

    public processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._rev = response.rev
        }
    }


    public toJSON() {
        return {
            _id: this._id,
            _rev: this._rev,
            type: this.type,
            name: this.name
        };
    }
}




