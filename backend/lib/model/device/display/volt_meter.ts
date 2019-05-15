
export class VoltMeter {

    private _max: number;
    private _min: number;

    private _currentValue: number;


    constructor(min: number, max: number) {
        this._min = min;
        this._max = max;
        this._currentValue = min;
    }


    public get max(): number {
        return this._max;
    }

    public get min(): number {
        return this._min;
    }


    public get currentValue(): number {
        return this._currentValue;
    }


}