import { iDevice } from "./i_device";
import { EventEmitter } from "events";
import { DeviceType } from "./device_types";
import { Switch } from "./actor/switch";
import { BasicAuthentication } from "../authentication/basic_auth";
import { JobTrigger } from "../trigger/jenkins/job_trigger";

export class DeviceFactory {

    static createInstance(savedConfig: any, eventEmitter: EventEmitter) : iDevice|null {
        if(!savedConfig.type || !savedConfig.name) {
            return null;
        }
        
        if(savedConfig.type === DeviceType.SWITCH) {
            const action = new JobTrigger(
                'http://localhost:8080/job/test_project_1/build/', 
                [], 
                'TEST_PROJECT_1',
                new BasicAuthentication('admin', 'Test'));
                
            return new Switch(action, savedConfig.name, savedConfig._rev, eventEmitter);
        }

        return null;
    }   
}