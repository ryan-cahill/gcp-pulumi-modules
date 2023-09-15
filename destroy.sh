#!/bin/bash
set -e

export PULUMI_CONFIG_PASSPHRASE=

cd ./gateway
pulumi login file://$(pwd)
pulumi destroy --yes
pulumi logout
cd ..

cd ./ingressRule
pulumi login file://$(pwd)
pulumi destroy --yes
pulumi logout
cd ..

cd ./gceService
pulumi login file://$(pwd)
pulumi destroy --yes
pulumi logout
cd ..

cd ./gceDeployment
pulumi login file://$(pwd)
pulumi destroy --yes
pulumi logout
cd ..

cd ./vpc
pulumi login file://$(pwd)
pulumi destroy --yes
pulumi logout
cd ..

pulumi logout
