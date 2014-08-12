#!/usr/bin/env sh
pushd /Profiles/akatko/Documents/aws-mturk-clt-1.3.1/bin
./loadHITs.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -label /Profiles/akatko/Documents/repos/pragmods/experiments/pragmods_L2second -input /Profiles/akatko/Documents/repos/pragmods/experiments/pragmods_L2second.input -question /Profiles/akatko/Documents/repos/pragmods/experiments/pragmods_L2second.question -properties /Profiles/akatko/Documents/repos/pragmods/experiments/pragmods_L2second.properties -maxhits 1
popd