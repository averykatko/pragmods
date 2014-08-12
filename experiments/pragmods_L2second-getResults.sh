#!/usr/bin/env sh
pushd /Profiles/akatko/Documents/aws-mturk-clt-1.3.1/bin
./getResults.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -successfile /Profiles/akatko/Documents/repos/pragmods/experiments/pragmods_L2second.success -outputfile /Profiles/akatko/Documents/repos/pragmods/experiments/pragmods_L2second.results.tsv
popd