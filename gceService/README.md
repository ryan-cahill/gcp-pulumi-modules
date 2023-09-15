# configuration

```sh
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name test-service --stack dev
pulumi config set namespace test-service --stack dev
pulumi config set target_port 3000 --stack dev
pulumi config set target_deployment https://www.googleapis.com/compute/beta/projects/permanent-environment-testing/zones/us-central1-a/instanceGroups/ns-test-deployment --stack dev
pulumi config set target_protocol http --stack dev
pulumi config set strategy gce --stack dev
pulumi config set username architect --stack dev
pulumi config set password dsklandjs98dsc --stack dev --plaintext
pulumi config set labels '{"vpc":"ryan","region":"us-central1-a"}' --stack dev
```
