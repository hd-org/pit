import { AuthenticationStrategy } from "./authentication_strategy";

export class BasicAuthentication extends AuthenticationStrategy{

    private _username: string;
    private _password: string;

    constructor(username: string, password: string) {
        super();
        this._password = password;
        this._username = username;
    }


    public getAuthorization(): object {
        return {
            user: this._username,
            pass: this._password
        };
    }

}