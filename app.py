#!/usr/bin/env python3
import os
import aws_cdk as cdk
from stacks.ecs_stack import ECSStack
from stacks import vpc_stack

app = cdk.App()

ecs_app_vpc = vpc_stack.VPCStack(app, "VpcStack",
                                 env=cdk.Environment(account=os.getenv(
                                     'CDK_DEFAULT_ACCOUNT'), region='us-east-1'))


ecs_app_stack = ECSStack(app, "AppStack",
                         env=cdk.Environment(account=os.getenv(
                              'CDK_DEFAULT_ACCOUNT'), region='us-east-1'),
                         ecs_vpc=ecs_app_vpc.ecs_vpc,
                         )

app.synth()
