import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ecr_assets from "aws-cdk-lib/aws-ecr-assets";

interface ECSStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ECSStackProps) {
    super(scope, id, props);

    const cluster = new ecs.Cluster(this, "Cluster", {
      clusterName: "demo",
      vpc: props.vpc
    });

    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "FlaskAppService",
      {
        cluster: cluster,
        desiredCount: 1,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset("src/", {
            platform: ecr_assets.Platform.LINUX_AMD64,
          }),
        },
        circuitBreaker: {
          rollback: true,
        },
        serviceName: "FlaskAppService",
        loadBalancerName: "FlaskAppLB",
      }
    );

    service.targetGroup.configureHealthCheck({ path: "/health" });
  }
}
