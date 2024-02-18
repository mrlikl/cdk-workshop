import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as eks from 'aws-cdk-lib/aws-eks';
import { KubectlV29Layer } from '@aws-cdk/lambda-layer-kubectl-v29';

export class EKSStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const cluster = new eks.Cluster(this, 'MyEKSCluster', {
            version: eks.KubernetesVersion.V1_29,
            defaultCapacity: 0,
            clusterName: 'dev',
            kubectlLayer: new KubectlV29Layer(this, 'KubectlLayer')
        });

    }
}