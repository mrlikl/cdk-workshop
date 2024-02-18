#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CRSDKStack } from '../lib/custom-resource-stack';
import { BucketDeployStack } from '../lib/s3-deploy-stack'
import { EKSStack } from '../lib/eks-stack'

const app = new cdk.App();
const custom_resource_api_call_stack = new CRSDKStack(app, 'CRStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

const bucket_deployment = new BucketDeployStack(app, 'S3DeployStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

const eks_cluster = new EKSStack(app, 'EKSStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});