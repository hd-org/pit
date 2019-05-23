import Nano = require("nano");

export interface CouchDbConfigElement {
    processAPIResponse(response: Nano.DocumentInsertResponse): void;
}