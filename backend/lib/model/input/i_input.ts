import nano = require("nano");

export interface iInput extends nano.MaybeDocument {
    name: string;
    type: string;
};