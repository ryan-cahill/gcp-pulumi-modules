# configuration

```sh
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set database postgres/kratos/tyleraldrich--kratos/34.138.160.18/5432 --stack dev
pulumi config set username ryan-test --stack dev
```
