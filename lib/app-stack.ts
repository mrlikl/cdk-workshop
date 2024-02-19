import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class AppStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const s3_bucket = new s3.Bucket(this, 'SampleBucket', {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        }
        )
    }
}
