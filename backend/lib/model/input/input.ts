import { EventEmitter } from "events";
import { iInput } from "./i_input";
import Nano = require("nano");
import { CouchDbConfigElement } from "../../config/couch_db_config_element";


export abstract class Input implements iInput, CouchDbConfigElement {
    abstract _id: string;
    abstract _rev: string | undefined;
    abstract type: string;
    abstract name: string;
    abstract eventEmitter: EventEmitter;

    public abstract run(): void;
    public abstract processAPIResponse(response: Nano.DocumentInsertResponse): void;

};