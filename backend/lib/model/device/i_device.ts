import nano = require("nano");
import { CouchDbConfigElement } from "../../config/couch_db_config_element";

export interface iDevice extends nano.MaybeDocument, CouchDbConfigElement{
    name: string;
    type: string;
};