import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cr from 'aws-cdk-lib/custom-resources';

export class CRSDKStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const getLatestAmiId = new cr.AwsCustomResource(this, 'GetAMIId', {
            onCreate: {
                service: 'SSM',
                action: 'getParameter',
                parameters: {
                    "Name": "/aws/service/ami-amazon-linux-latest/amzn2-ami-kernel-5.10-hvm-x86_64-gp2"
                },
                physicalResourceId: cr.PhysicalResourceId.of('get-ami-id'),
            },
            policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
                resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
            }),
        });
        new cdk.CfnOutput(this, 'ImageId', {
            value: getLatestAmiId.getResponseField('Parameter.Value'),
        });
    }
}


