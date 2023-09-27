# configuration

```sh
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name test-gateway --stack dev
pulumi config set ingressRule https://www.googleapis.com/compute/v1/projects/permanent-environment-testing/global/urlMaps/test-ingress-rule --stack dev
```
