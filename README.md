# Simple Name Generator
This was written to serve as an example on how to generate slightly more memorable user names than a random string of 
letters. It uses a Markov chain to capture word patterns so that names generated are similar in structure to 
the ones given.

* gen_chain.js shows how to use it
* markov.js is the engine

## Building the chain
In order for this to work, you need to feed the engine a list of names to seed it. 


**incr_chain**() is used to do this. 
When you are finished loading your list of names, call **scale_chain**()

This will generate fields _scaled_init_ and _scaled_rest_. 
These are the only fields used at runtime.

## Creating names
* call **markov_name**()

## TODO

* write load/unload functions to save/restore the "scaled_" field names
* remove the 'initial' fields and just use a single list, with ".." to start

## Warning
This has not been used in production code. 
There are probably bugs in there around edge conditions

