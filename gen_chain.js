const fs = require('fs');
const readline = require('readline');


const markov=require('./markov').Markov;
let m = new markov();
//let chain={};
let i = 0;
const readFile = readline.createInterface({
    input: fs.createReadStream('./baby-names.csv'),
   // output: fs.createWriteStream('file.out'),
    terminal: false
});
readFile
    .on('line', buildit)
    .on('close', function() {

       // chain = m.incr_chain(chain, 'parts',i);
        m.scale_chain()
        for (let j=0;j<40;j++)
        {
            console.log(m.markov_name(3,12));
        }
    })

function buildit(line) {
    if (i >0) {
        const bits = line.split(",")

//        if (parseInt(bits[0]) <1968) {
            const name = bits[1].trim().replace(/"/g, "").toLowerCase()
            //const weight = 1.0//parseFloat(bits[2])
            m.incr_chain(name, 2);
 //       }
    }
    //const prob=parseFloat(bits[2])
    i += 1;
}
