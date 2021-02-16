import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns from '@aws-cdk/aws-sns';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';

export class BlogRedditCrawlerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create SNS topic
    const topic = new sns.Topic(this, 'RedditCrawler');

    // Create lambda
    const fn = new lambda.Function(this, 'fn', {
      code: new lambda.AssetCode('resources'),
      handler: 'lambda.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: 'reddit-crawler',
      environment: {
        TOPIC_ARN: topic.topicArn
      }
    });

    // Allow the lambda to publish to the topic
    topic.grantPublish(fn);

    // Add an email subscription to the topic
    topic.addSubscription(new subscriptions.EmailSubscription('MY_EMAIL'));

    // Trigger lambda every X minutes
    new events.Rule(this, 'Rule', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(30)),
      targets: [new targets.LambdaFunction(fn)]
    });
  }
}
