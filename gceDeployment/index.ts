import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as yaml from 'js-yaml';

const config = new pulumi.Config('gceDeployment');

const namespace = (config.get('namespace') || 'ns').substring(0, 20);
const name = config.require('name').replace(/\//g, '-');

const entrypoint = config.get('entrypoint');
const command = config.get('command');

let environment;
try {
  if (config.get('environment')) {
    environment = JSON.parse(config.require('environment'));
  }
} catch (err) { 
  throw new Error('Could not parse environment object');
}
const env = Object.entries(environment || {}).map(([key, value]) => ({
  name: key,
  value: String(value),
}));

const deploymentName = `${namespace}-${name.slice(-40)}`;

const container = {
  spec: {
    containers: [{
      image: config.require('image'),
      args: typeof entrypoint === 'string' ? entrypoint.split(' ') : entrypoint,
      command: typeof command === 'string' ? command.split(' ') : command,
      env
    }]
  }
};

const computeImage = await gcp.compute.getImage({
  family: 'cos-stable',
  project: 'cos-cloud'
});

const _gceDeploymentService = new gcp.projects.Service('gce-deployment', {
  service: 'compute.googleapis.com',
  disableOnDestroy: false,
});

const vpcName = config.require('vpc');
const zone = config.require('zone');
const deployment = new gcp.compute.Instance('gce-deployment', {
  name: deploymentName,
  zone,
  tags: [deploymentName],
  machineType: config.require('instanceType'),
  bootDisk: {
    initializeParams: {
      image: computeImage.selfLink
    }
  },
  networkInterfaces: [{
    network: vpcName,
    subnetwork: `${vpcName}-subnet`,
    accessConfigs: [{}]
  }],
  labels: {
    'container-vm': computeImage.name
  },
  metadata: {
    'gce-container-declaration': yaml.dump(container)
  }
}, {
  dependsOn: [_gceDeploymentService]
});

const instanceGroup = new gcp.compute.InstanceGroup('gce-deployment-instance-group',  {
  name: deploymentName,
  instances: [deployment.selfLink],
  zone,
  namedPorts: [{
    name: config.require('protocol'),
    port: parseInt(config.require('port'))
  }]
});

export const id = instanceGroup.selfLink; 
// export const labels = labelsObject;
