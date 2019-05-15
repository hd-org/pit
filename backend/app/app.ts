import express = require('express');
import { FileConfig } from '../lib/config/FileConfig';
import { Input } from '../lib/model/input/input';
import { CouchDbConfig } from '../lib/config/CouchDbConfig';
import { ConsoleInput } from '../lib/model/input/console';
import { Switch } from '../lib/model/device/actor/switch';
import { JobTrigger } from '../lib/model/trigger/jenkins/job_trigger';
import { BasicAuthentication } from '../lib/model/authentication/basic_auth';

const app: express.Application = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, async() => {
    console.log('Listening on 3000');

    const _inputs: Array<Input> = [
        new ConsoleInput('42f157f8bd14ebc1c9521f143b003300', '1-66c01cdf99e84c83a9b3fe65b88db8c0')
    ];

    const _devices = [
        new Switch(
            new JobTrigger(
                'http://localhost:8080/job/test_project_1/build/', 
                [], 
                'TEST_PROJECT_1',
                new BasicAuthentication('admin', 'Test')), 
            _inputs[0], 
            'switch1'
        )
    ];
    
    const dbConfig = new CouchDbConfig();
    for(let input of _inputs) {
        await dbConfig.addInput(input);
    }
    
    for(let device of _devices) {
        await dbConfig.addDevice(device);
    }

    const inputs = await dbConfig.getInputs();

    inputs.forEach((input: Input) => {
        console.log('Running input');
        input.run();
    });

    
});



