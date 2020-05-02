/*
 Markov.js

// based on code written and released to the public domain by drow <drow@bin.sh>
// http://creativecommons.org/publicdomain/zero/1.0/
*/
class Markov {
    constructor(token_length=2) {
        this.initial={}
        this.initial_total=0
        this.rest={}
        this.tally={}
        this.scaled_init={}
        this.scaled_rest={}
        this.token_length = token_length
    }

    incr_chain(name) {
        if (name.length< this.token_length) {
            return
        }
        let remainder = name + "_".repeat(this.token_length);
        let initial_token = name.substr(0, this.token_length);
        if (this.initial[initial_token]) {
            this.initial[initial_token] += 1;
        } else {
            this.initial[initial_token] = 1;
        }
        this.initial_total += 1;
        let last_token = initial_token
        while ( remainder.length > this.token_length) {

            remainder = remainder.substr(1);
            let to_parse = remainder.substr(0, this.token_length);
            if (this.tally[last_token]) {
                this.tally[last_token] += 1;

                if (this.rest[last_token][to_parse]) {
                    this.rest[last_token][to_parse] += 1;
                } else {
                    this.rest[last_token][to_parse] = 1;
                }
            } else {
                this.tally[last_token] = 1;
                this.rest[last_token]={};
                this.rest[last_token][to_parse] = 1;
            }

            last_token = to_parse;
        }

    }

    scale_part(letter_map, total) {
        let tally = 0.0
        let normalized={}
        if (total === 0)
            return {};

        for (const token_key in letter_map ) {
            tally +=  (1.0*letter_map[token_key] / total)
            normalized[token_key] = tally
        }
        return normalized;
    }

    scale_chain() {
        this.scaled_init = this.scale_part(this.initial,this.initial_total);

        for (let token in this.tally ) {

            this.scaled_rest[token] = this.scale_part(this.rest[token], this.tally[token])
        }
        this.initial={}
        this.initial_total={}
        this.tally={}
    }

    markov_name(minimum_len= 4, name_len =12) {
        let c = this.select_link(this.scaled_init);
        let name = c[0];

        while (name.length < name_len && c[0] !== "_") {
            c = this.select_link(this.scaled_rest[c]);
            name += c[0];
        }

        if (name[name.length-1] === "_") {
            name = name.substr(0,name.length-1);
        }

        if (name.length <= minimum_len) {
            return (name + this.markov_name(minimum_len-1, name_len-name.length)).substr(0,name_len)
        }
        return name;

    }

    select_link(chain) {
        const idx = Math.random();
        for (let token in chain) {
            if (chain[token] >= idx) {
                return token
            }
        }
        console.log("Error. select_chain should have chosen something")
        return "_".repeat(this.token_length);
    }
}

module.exports.Markov = Markov
