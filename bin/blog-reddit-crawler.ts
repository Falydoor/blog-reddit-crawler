#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BlogRedditCrawlerStack } from '../lib/blog-reddit-crawler-stack';

const app = new cdk.App();
const stack = new BlogRedditCrawlerStack(app, 'BlogRedditCrawlerStack');
cdk.Tags.of(stack).add('ippon:owner', 'tlebrun');
