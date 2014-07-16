#!/usr/bin/env sh
pushd /Applications/aws-mturk-clt-1.3.1/bin
./getResults.sh $1 $2 $3 $4 $5 $6 $7 $8 $9 -successfile /Users/Avery/github/local/pragmods/experiments/pragmods_seq.success -outputfile /Users/Avery/github/local/pragmods/experiments/pragmods_seq.results.tsv
popd