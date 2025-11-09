#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { EcsStack } from '../lib/ecs';
import { VPCStack } from '../lib/vpc';

const app = new cdk.App();

const vpcStack = new VPCStack(app,'VPCStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-west-2' },
})

new EcsStack(app, 'EcsStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-west-2' },
  vpc: vpcStack.vpc
});
