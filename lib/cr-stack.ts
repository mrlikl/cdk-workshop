import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cr from 'aws-cdk-lib/custom-resources';

export class CRStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const workshopAmiId = new ssm.StringParameter(this, 'WorkshopAmiId', {
            parameterName: "/cdk/workshop/ami-id",
            stringValue: "ami-123456789",
        });
        const getAmiId = new cr.AwsCustomResource(this, "GetAMIId", {
            onUpdate: {
                service: "SSM",
                action: "getParameter",
                parameters: {
                    "Name": workshopAmiId.parameterName
                },
                physicalResourceId: cr.PhysicalResourceId.of('get-ami-id')
            },
            onDelete: {
                service: "SSM",
                action: "deleteParameter",
                parameters: {
                    "Name": "/cdk/workshop/ami-id",
                },
                physicalResourceId: cr.PhysicalResourceId.of('get-ami-id')
            },
            policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE })
        }
        )
        new cdk.CfnOutput(this, 'AMIId', { value: getAmiId.getResponseField('Parameter.Value') });
    }
}
