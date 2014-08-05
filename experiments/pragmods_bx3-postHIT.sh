#!/usr/bin/env sh
pushd /Applications/aws-mturk-clt-1.3.1/bin
./loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -label /Users/Avery/github/local/pragmods/experiments/pragmods_bx3 -input /Users/Avery/github/local/pragmods/experiments/pragmods_bx3.input -question /Users/Avery/github/local/pragmods/experiments/pragmods_bx3.question -properties /Users/Avery/github/local/pragmods/experiments/pragmods_bx3.properties -maxhits 1
popd