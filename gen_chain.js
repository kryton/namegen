/*
Sample program on how to use it.
TODO: split this into two parts a loader and a generator


   Copyright 2020 Ian Holsman

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License
 */
const fs = require('fs');
const readline = require('readline');


const markov = require('./markov').Markov;
let m = new markov(2);

let first_line = true

const readFile = readline.createInterface({
    input: fs.createReadStream('./baby-names.csv'),
    terminal: false
});
readFile
    .on('line', buildIt)
    .on('close', function () {

        m.scale_chain()
        for (let j = 0; j < 40; j++) {
            console.log(m.markov_name(3, 12));
        }
    })

function buildIt(line) {
    if (!first_line) {
        const bits = line.split(",")
        const name = bits[1].trim().replace(/"/g, "").toLowerCase()
        m.incr_chain(name);
    } else {
        first_line = false;
    }

}
