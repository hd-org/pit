import { createInterface, Interface } from "readline";
import { Input } from "./input";
import Nano = require('nano');

export class ConsoleInput extends Input {

    private _lineReader: Interface;
    _id: string|undefined;
    _rev: string|undefined;
    type: string = 'console_input';

    constructor(id: string, rev: string) {
        super();
        this._id = id;
        this._rev = rev;

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
            this.emit(answer);

            this.run();
        });
    }


    stop() {
        this._lineReader.close();
    }

    public processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
          this._id = response.id
          this._rev = response.rev
        }
    }


    public toJSON() {
        return {
            id: this._id,
            _rev: this._rev,
            type: this.type
        };
    }
}




