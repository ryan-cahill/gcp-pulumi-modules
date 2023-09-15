# configuration

```sh
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name test-ingress-rule --stack dev
pulumi config set serviceId https://www.googleapis.com/compute/v1/projects/permanent-environment-testing/global/backendServices/ns-test-deployment --stack dev
```
