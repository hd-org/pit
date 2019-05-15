import { EventEmitter } from "events";
import { iInput } from "./i_input";
import Nano = require("nano");


export abstract class Input extends EventEmitter implements iInput{
    abstract _id: string|undefined;
    abstract _rev: string|undefined;

    abstract type: string;

    public abstract run(): void;
    public abstract processAPIResponse(response: Nano.DocumentInsertResponse): void;

};