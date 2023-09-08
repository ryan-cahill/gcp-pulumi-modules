# configuration

```sh
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name gcp-test --stack dev
pulumi config set description gcp-test --stack dev
pulumi config set databaseSize db-f1-micro --stack dev
pulumi config set databaseVersion POSTGRES_15 --stack dev
pulumi config set databaseType postgres --stack dev
pulumi config set password architect --stack dev
pulumi config set vpc default --stack dev
```
