for line in $(cat .serverless/cloudformation-template-update-stack.json | grep -E -o "[a-zA-Z0-9/:\.\-]*\.zip";); do
  aws s3api put-object --bucket tea-backend-build --key $line --body .serverless/$(echo $line | grep -E -o "\w*\.zip")
done
