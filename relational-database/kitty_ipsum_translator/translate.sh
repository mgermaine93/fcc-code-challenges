#!/bin/bash

# translates pretty much anything "cat" into anything "dog".
# "-E" stands for extended regex
# "sec" does the replacing
# the semicolons within the quotes are separate sed statements
cat $1 | sed -E 's/catnip/dogchow/g; s/cat/dog/g; s/meow|meowzer/woof/g'