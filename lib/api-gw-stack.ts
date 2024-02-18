import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class ApiGwStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: ApiGwStackProps) {
        super(scope, id, props);

        const api = new apigw.RestApi(this, "rest-api");

        const postintegration = new apigw.LambdaIntegration(props?.lambdafunction!);

        api.root.addMethod("POST", postintegration);

    }
}

interface ApiGwStackProps extends cdk.StackProps {
    lambdafunction: lambda.Function;
}