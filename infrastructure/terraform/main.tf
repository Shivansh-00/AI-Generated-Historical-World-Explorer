terraform {
  required_version = ">= 1.5.0"
}

provider "aws" {
  region = var.aws_region
}

resource "aws_ecs_cluster" "realityarchive" {
  name = "realityarchive-cluster"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}
