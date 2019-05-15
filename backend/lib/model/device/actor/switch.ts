import { Trigger } from "../../trigger/trigger";
import { Input } from "../../input/input";
import { Device } from "../device";

export class Switch extends Device{

    private _action: Trigger;
    private _input: Input;
    private _name: string;

    constructor(action: Trigger, input: Input, name: string) {
        super();
        this._action = action;
        this._input = input;
        this._name = name;


        this._input.on(this._name, async() => {
            console.log('Switch ' + this._name + ' triggered');
            await this._action.execute();
            console.log('Action executed');
        });
    }

}