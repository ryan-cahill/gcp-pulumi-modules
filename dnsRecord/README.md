# configuration

```sh
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name test --stack dev
pulumi config set subdomain test --stack dev
pulumi config set dnsZone test-dns-zone --stack dev
pulumi config set recordType A --stack dev
pulumi config set content 8.8.8.8 --stack dev
```
