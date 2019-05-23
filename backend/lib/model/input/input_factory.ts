import { Input } from "./input";
import { InputTypes } from "./input_types";
import { ConsoleInput } from "./console";
import { EventEmitter } from "events";
import { iInput } from "./i_input";

export class InputFactory {

    static createInstance(savedConfig: iInput | undefined, eventEmitter: EventEmitter) : Input|null {
        if(!savedConfig) {
            return null;
        }

        if(!savedConfig.type || !savedConfig.name) {
            return null;
        }
        
        if(savedConfig.type === InputTypes.CONSOLE) {
            return new ConsoleInput(savedConfig.name, savedConfig._rev, eventEmitter);
        }

        return null;
    }   

}