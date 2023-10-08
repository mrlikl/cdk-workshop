from aws_cdk import (
    Stack,
    aws_ecs_patterns as ecs_patterns,
    aws_ecs as ecs,
    aws_ec2 as ec2,
    aws_ecr_assets as ecr_assets
)
from constructs import Construct


class CdkWorkshopStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, stage: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        default_vpc = ec2.Vpc.from_lookup(self, 'DefaultVPC', is_default=True)

        cluster = ecs.Cluster(
            self, 'Cluster', cluster_name=stage+'Cluster', vpc=default_vpc)

        service = ecs_patterns.ApplicationLoadBalancedFargateService(self, "FlaskAppService",
                                                                     cluster=cluster,
                                                                     desired_count=1,
                                                                     task_image_options=ecs_patterns.ApplicationLoadBalancedTaskImageOptions(
                                                                         image=ecs.ContainerImage.from_asset(
                                                                             "src/",
                                                                             platform=ecr_assets.Platform.LINUX_AMD64
                                                                         )
                                                                     ),
                                                                     circuit_breaker=ecs.DeploymentCircuitBreaker(
                                                                         rollback=True),
                                                                     task_subnets=ec2.SubnetSelection(
                                                                         subnets=default_vpc.private_subnets
                                                                     ),
                                                                     service_name='FlaskAppService',
                                                                     load_balancer_name="FlaskAppLB"
                                                                     )

        service.target_group.configure_health_check(path='/health')
