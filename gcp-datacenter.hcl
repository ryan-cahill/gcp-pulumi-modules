// module "gateway" {
//   source = "./gateway"
//   inputs = {
//     name = "test-gateway"
//     ingressRule = module.ingress.id
//     "gcp:region" = "us-central1"
//     "gcp:project" = "permanent-environment-testing"
//     "gcp:credentials" = "file:/home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json"
//   }
// }

module "vpc" {
  source = "./vpc"
  inputs = {
    name = "ryan"
    "gcp:region" = "us-central1"
    "gcp:project" = "permanent-environment-testing"
    "gcp:credentials" = "file:/home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json"
  }
}

// module "databaseCluster" {
//   source = "./databaseCluster"
//   inputs = {
//     name = "gcp-test-11"
//     description = "gcp-test"
//     databaseSize = "db-f1-micro"
//     databaseVersion = "POSTGRES_15"
//     databaseType = "postgres"
//     password = "architect"
//     vpc = "default"
//     "gcp:region" = "us-central1"
//     "gcp:project" = "permanent-environment-testing"
//     "gcp:credentials" = "file:/home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json"
//   }
// }

// module "ingress" {
//   source = "./ingressRule"
//   inputs = {
//     name = "test-ingress-rule"
//     serviceId = module.service.id
//     "gcp:region" = "us-central1"
//     "gcp:project" = "permanent-environment-testing"
//     "gcp:credentials" = "file:/home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json"
//   }
// }

// module "service" {
//   source = "./gceService"
//   inputs = {
//     name = "test-service"
//     namespace = "test-service"
//     target_port = 3000
//     target_deployment = module.deployment.id
//     target_protocol = "http"
//     username = "architect"
//     password = "dsklandjs98dsc"
//     vpc = module.vpc.name
//     zone = "us-central1-a"
//     "gcp:region" = "us-central1"
//     "gcp:project" = "permanent-environment-testing"
//     "gcp:credentials" = "file:/home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json"
//   }
// }

module "deployment" {
  source = "./gceDeployment"
  inputs = {
    name = "ryan-test-deployment"
    image = "ryancahill444/hello-world"
    port = 3000
    protocol = "http"
    vpc = module.vpc.name
    zone = "us-central1-a"
    instanceType = "e2-micro"
    namespace = "test-service"
    username = "architect"
    password = "dsklandjs98dsc"

    "gcp:region" = "us-central1"
    "gcp:project" = "permanent-environment-testing"
    "gcp:credentials" = "file:/home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json"
  }
}

// module "database" {
//   source = "./database"
//   inputs = {
//     databaseCluster = module.databaseCluster.id
//     name = "gcp-test-11"
//     "gcp:region" = "us-central1"
//     "gcp:project" = "permanent-environment-testing"
//     "gcp:credentials" = "file:/home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json"
//   }
// }

// module "databaseUser" {
//   source = "./databaseUser"
//   inputs = {
//     database = module.database.id
//     username = "gcp-test-11"
//     "gcp:region" = "us-central1"
//     "gcp:project" = "permanent-environment-testing"
//     "gcp:credentials" = "file:/home/ryan/Downloads/permanent-environment-testing-6f237ea8779d.json"
//   }
// }
