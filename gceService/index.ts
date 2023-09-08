import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const config = new pulumi.Config('gceService');
const gcpConfig = new pulumi.Config('gcp');

// Use the last 30 characters of the service name, as this is the more unique part.
const configName = config.require('name').replace(/\//g, '-').slice(-30);
const namespace = config.require('namespace').substring(0, 20);
// Max length for resource names is ~60 characters
const serviceName = `${namespace}--${configName}`;

const servicePort = config.get('target_port') || 80;
const deploymentName = config.require('target_deployment').replace(/\//g, '-');
let targetProtocol = config.get('target_protocol');
if (!targetProtocol) {
  if (servicePort === 80) {
    targetProtocol = 'http';
  } else {
    targetProtocol = 'https';
  }
}

let labelsObject;
try {
  const labels = config.get('labels');
  if (labels) {
    labelsObject = JSON.parse(labels);
  }
} catch (err) {
  throw new Error('Could not parse labels config object');
}
let zone = '';
if (labelsObject) {
  zone = labelsObject.region;
}

// This deployment is a GCE instance, so we need to set firewall rules that allow routing to it
const gceName = `${namespace}-${deploymentName.slice(-40)}`;
const vpcName = labelsObject.vpc;

const backend = new gcp.compute.Firewall('service-firewall', {
  name: `${gceName}-firewall-${servicePort}`,
  allows: [{ protocol: 'tcp', ports: [`${servicePort}`] }],
  network: vpcName,
  targetTags: [gceName],
  sourceRanges: ['10.0.0.0/8'],
});

// Internal host names: https://cloud.google.com/compute/docs/internal-dns#about_internal_dns
const serviceHost = `${gceName}.${zone}.c.${gcpConfig.require('project')}.internal`;
let serviceUrl = '';
if (config.get('username') && config.get('password')) {
  serviceUrl = `${targetProtocol}://${config.require('username')}:${config.require('password')}@${serviceHost}:${servicePort}`;
} else {
  serviceUrl = `${targetProtocol}://${serviceHost}:${servicePort}`;
}

export const id = `${gceName}--${servicePort}`;
export const protocol = targetProtocol;
export const host = serviceHost;
export const port = servicePort;
export const url = serviceUrl;
export const username = config.require('username');
export const password = config.require('password');
export const name = serviceName;
export const target_port = servicePort;
