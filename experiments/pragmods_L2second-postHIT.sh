#!/usr/bin/env sh
pushd /Applications/aws-mturk-clt-1.3.1/bin
./loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -label /Users/Avery/Documents/pragmods/experiments/pragmods_L2second -input /Users/Avery/Documents/pragmods/experiments/pragmods_L2second.input -question /Users/Avery/Documents/pragmods/experiments/pragmods_L2second.question -properties /Users/Avery/Documents/pragmods/experiments/pragmods_L2second.properties -maxhits 1
popd