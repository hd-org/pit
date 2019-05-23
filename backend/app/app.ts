import express = require('express');
import { Input } from '../lib/model/input/input';
import { CouchDbConfig } from '../lib/config/CouchDbConfig';
import { ConsoleInput } from '../lib/model/input/console';
import { Switch } from '../lib/model/device/actor/switch';
import { JobTrigger } from '../lib/model/trigger/jenkins/job_trigger';
import { BasicAuthentication } from '../lib/model/authentication/basic_auth';
import { EventEmitter } from 'events';

const app: express.Application = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, async() => {
    console.log('Listening on 3000');

    const eventEmitter = new EventEmitter();

    const _inputs: Array<Input> = [
        new ConsoleInput('console_1', undefined, eventEmitter)
    ];

    const _devices = [
        new Switch(
            new JobTrigger(
                'http://localhost:8080/job/test_project_1/build/', 
                [], 
                'TEST_PROJECT_1',
                new BasicAuthentication('admin', 'Test')), 
            'switch1',
            undefined,
            eventEmitter
        )
    ];
    
    const dbConfig = new CouchDbConfig();
    for(let input of _inputs) {
        try {
            await dbConfig.addInput(input);
        } catch(e) {
            console.log('Skipping input - already exists');
        }
        
    }
    
    for(let device of _devices) {
        try {
            await dbConfig.addDevice(device);
        } catch(e) {
            console.log('Skipping device - already exists');
        }
    }

    const devices = await dbConfig.getDevices(eventEmitter);
    const inputs = await dbConfig.getInputs(eventEmitter);
    
    inputs.forEach((input: Input) => {
        console.log('Running input');
        input.run();
    });

    
});



