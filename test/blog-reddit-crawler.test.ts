import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as BlogRedditCrawler from '../lib/blog-reddit-crawler-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new BlogRedditCrawler.BlogRedditCrawlerStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
