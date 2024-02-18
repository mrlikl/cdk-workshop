import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class BasicCDKStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const l1_s3_bucket = new s3.CfnBucket(this, "MyL1Bucket", {})

    const l2_s3_bucket = new s3.Bucket(this, "MyL2Bucket", {})

    const l2_sqs_queue = new sqs.Queue(this, 'MyQueue', {});

    const l2_sns_topic = new sns.Topic(this, 'MyTopic', {});

  }
}
