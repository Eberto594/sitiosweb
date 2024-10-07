import { readFile } from 'fs';

readFile('input.txt',(err, data) => {
    console.log(data);
    console.log(data.toString());
});