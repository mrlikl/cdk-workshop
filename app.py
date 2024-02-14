#!/usr/bin/env python3
import os

import aws_cdk as cdk

from stacks.cdk_workshop_stack import CdkWorkshopStack


app = cdk.App()
stack1 = CdkWorkshopStack(app, "CdkWorkshopStack",
                          env=cdk.Environment(account=os.getenv(
                              'CDK_DEFAULT_ACCOUNT'), region='us-east-1'),
                          stage='dev'
                          )

app.synth()
