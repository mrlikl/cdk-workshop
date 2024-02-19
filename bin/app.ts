#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CRSDKStack } from '../lib/custom-resource-stack';
import { BucketDeployStack } from '../lib/s3-deploy-stack'
import { EKSStack } from '../lib/eks-stack'

const app = new cdk.App();
const customResourceApiCallStack = new CRSDKStack(app, 'CRStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

const bucketDeployment = new BucketDeployStack(app, 'S3DeployStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

const eksClusterStack = new EKSStack(app, 'EKSStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});