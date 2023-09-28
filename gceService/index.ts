import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const config = new pulumi.Config('gceService');
const gcpConfig = new pulumi.Config('gcp');

// Use the last 30 characters of the service name, as this is the more unique part.
const configName = config.require('name').replace(/\//g, '-').slice(-30);
const namespace = config.require('namespace').substring(0, 20);
// Max length for resource names is ~60 characters
const serviceName = `${namespace}--${configName}`;

const defaultServicePort = '80';
const servicePort = config.get('target_port') || defaultServicePort;
const deploymentName = config.require('target_deployment').replace(/\//g, '-');
let targetProtocol = config.get('target_protocol');
if (!targetProtocol) {
  if (servicePort === defaultServicePort) {
    targetProtocol = 'http';
  } else {
    targetProtocol = 'https';
  }
}

// This deployment is a GCE instance, so we need to set firewall rules that allow routing to it
const gceName = `${namespace}-${deploymentName.slice(-40)}`;

// Internal host names: https://cloud.google.com/compute/docs/internal-dns#about_internal_dns
const serviceHost = `${gceName}.${config.require('zone')}.c.${gcpConfig.require('project')}.internal`;
let serviceUrl = '';
if (config.get('username') && config.get('password')) {
  serviceUrl = `${targetProtocol}://${config.require('username')}:${config.require('password')}@${serviceHost}:${servicePort}`;
} else {
  serviceUrl = `${targetProtocol}://${serviceHost}:${servicePort}`;
}

const healthCheck = new gcp.compute.HealthCheck('health-check', {
  name: config.require('name'), 
  checkIntervalSec: 1,
  httpHealthCheck: {
    port: parseInt(servicePort),
  },
  timeoutSec: 1,
});

const backendServiceNameSplit = config.require('target_deployment').split('/');
const backendServiceName = backendServiceNameSplit[backendServiceNameSplit.length - 1];
const backendService = new gcp.compute.BackendService('backend-service', {
  name: backendServiceName,
  backends: [{ group: config.require('target_deployment') }],
  healthChecks: healthCheck.selfLink,
});

const vpcName = config.require('vpc');
const firewall = new gcp.compute.Firewall('service-firewall', {
  name: `${gceName.substring(0, 48)}-firewall-${servicePort}`.toLowerCase(),
  direction: 'INGRESS',
  allows: [{ 
    protocol: 'tcp', 
    ports: [`${servicePort}`, '80']
  }],
  network: vpcName,
  targetTags: [backendServiceName], 
  sourceRanges: ['0.0.0.0/0'], // TODO: replace/tighten? removed/edited to enable ssh. needs to be the ip of the gateway or something similar
});

export const id = backendService.selfLink;
export const protocol = targetProtocol;
export const host = serviceHost;
export const port = servicePort;
export const url = serviceUrl;
export const username = config.require('username');
export const password = config.require('password');
export const name = serviceName;
export const target_port = servicePort;
