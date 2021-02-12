#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BlogRedditCrawlerStack } from '../lib/blog-reddit-crawler-stack';

const app = new cdk.App();
new BlogRedditCrawlerStack(app, 'BlogRedditCrawlerStack');
