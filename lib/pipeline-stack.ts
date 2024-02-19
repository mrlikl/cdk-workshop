import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import * as code_commit from 'aws-cdk-lib/aws-codecommit';
import { AppStack } from '../lib/app-stack';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const codecommitRepo = code_commit.Repository.fromRepositoryName(this, 'CDKRepo',
      "cdkpipeline"
    )

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.codeCommit(codecommitRepo, 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
      crossAccountKeys: true,
      selfMutation: true,
      pipelineName: 'CDKPipeline'
    });


    const dev = new S3AppStage(this, 'Dev', {
      env: {
        account: "xxxxxxx",
        region: 'eu-west-1'
      }
    });

    const preProd = new S3AppStage(this, 'PreProd', {
      env: {
        account: props?.env?.account,
        region: 'eu-west-1'
      }
    });
    const prod = new S3AppStage(this, 'Prod', {
      env: {
        account: "xxxxxx",
        region: 'us-east-1'
      }
    });

    pipeline.addStage(dev);

    pipeline.addStage(preProd);

    pipeline.addStage(prod, {
      pre: [
        new pipelines.ManualApprovalStep('PromoteToProd'),
      ],
    });

  }
}

class S3AppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const s3Stack = new AppStack(this, 'S3Bucket');

  }
}