import { Trigger } from "../trigger";
import { AuthenticationStrategy } from "../../authentication/authentication_strategy";
import request = require('request-promise-native');

export class JobTrigger extends Trigger {

    private _job: string;
    private _args: Array<string>;
    private _token: string;
    private _authenticationStrategy: AuthenticationStrategy;


    constructor(job: string, args: Array<string>, token: string, authentication: AuthenticationStrategy) {
        super();
        this._job = job;
        this._args = args;
        this._authenticationStrategy = authentication;
        this._token = token;
    }

    public async execute(): Promise<void> {
        console.log('Executing jenkins job trigger');
        console.log(this._job);
        console.log(this._args);

        const options = {
            uri: this._job,
            auth: this._authenticationStrategy.getAuthorization(),
            method: 'POST',
            query: {
                token: this._token
            }
        };
        
        try {
            await request(options);
            console.log('Trigger finished');
        } catch (e) {
            console.log('Trigger failed: ' + e.message);
        }
    }

}
