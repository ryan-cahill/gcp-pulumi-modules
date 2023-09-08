# configuration

```sh
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name test-cluster --stack dev
pulumi config set description test-cluster --stack dev
pulumi config set vpc default --stack dev
pulumi config set nodePools '[{"count":2,"name":"test-pool","nodeSize":"e2-medium"}]' --stack dev
```
