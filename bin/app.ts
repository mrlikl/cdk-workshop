#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BasicCDKStack } from '../lib/basic-stack';
import { LambdaStack } from '../lib/lambda-stack';
import { ApiGwStack } from '../lib/api-gw-stack';

const app = new cdk.App();


const basic_cdk_stack = new BasicCDKStack(app, 'BasicCDKStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});


const lambda_stack = new LambdaStack(app, 'LambdaStack', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});

const api_gw_stack = new ApiGwStack(app, 'ApiGwStack', {
    lambdafunction: lambda_stack.lambdafunction,
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});

app.synth();