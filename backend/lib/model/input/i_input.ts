import nano = require("nano");

export interface iInput extends nano.MaybeDocument {
    _id: string|undefined;
    _rev: string|undefined;

    processAPIResponse(response: nano.DocumentInsertResponse): void;
};