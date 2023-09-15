#!/bin/bash
set -e

export PULUMI_CONFIG_PASSPHRASE=

cd ./vpc
pulumi login file://$(pwd)
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name ryan --stack dev
pulumi config set description ryan --stack dev
pulumi up --yes
pulumi logout
cd ..

cd ./gceDeployment
pulumi login file://$(pwd)
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name test-deployment --stack dev
pulumi config set image ryancahill444/hello-world --stack dev
pulumi config set services '[{"port":3000,"protocol":"http","id":"test-id"}]' --stack dev
pulumi config set labels '{"vpc":"ryan","zone":"us-central1-a"}' --stack dev
pulumi up --yes
cd ..

cd ./gceService
pulumi login file://$(pwd)
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
pulumi up --yes
cd ..

cd ./ingressRule
pulumi login file://$(pwd)
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name test-ingress-rule --stack dev
pulumi config set serviceId https://www.googleapis.com/compute/v1/projects/permanent-environment-testing/global/backendServices/ns-test-deployment --stack dev
pulumi up --yes
cd ..

cd ./gateway
pulumi login file://$(pwd)
pulumi config set gcp:project permanent-environment-testing --stack dev
pulumi config set gcp:credentials /home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json --stack dev
pulumi config set gcp:region us-central1 --stack dev
pulumi config set name test-gateway --stack dev
pulumi config set ingressRule https://www.googleapis.com/compute/v1/projects/permanent-environment-testing/global/urlMaps/service-https-url-map --stack dev
pulumi up --yes
cd ..

pulumi logout
