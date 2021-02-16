const https = require('https')
const AWS = require('aws-sdk')

exports.handler = async function (event: any, context: any) {
    const promise = new Promise(function (resolve, reject) {
        // Retrieve latest 100 posts
        let options = {
            host: 'www.reddit.com',
            path: `/r/wallstreetbets/new.json?limit=100`,
            headers: { 'User-agent': 'bot' }
        }

        https.get(options, (res: any) => {
            // Build json from response
            let json = ''
            res.on('data', (d: any) => {
                json += d
            })

            res.on('end', () => {
                // Filter posts
                let posts = filterPosts(JSON.parse(json))

                // Publish message to SNS containing filtered posts
                if (posts) {
                    let params = {
                        Subject: 'Reddit crawler notification',
                        Message: posts.map((post: any) => `${post.data.title} -> ${post.data.url}`).join('\n'),
                        TopicArn: process.env.TOPIC_ARN
                    }

                    // Publish message to SNS
                    resolve(new AWS.SNS().publish(params, context.done).promise())
                } else {
                    resolve('Subreddit successfully crawled with 0 matches')
                }
            })
        }).on('error', (e: any) => {
            reject(Error(e))
        })
    })
    return promise
}

// Filter posts by title and number of comments
function filterPosts(posts: any) {
    return posts.data.children
        .map((child: any) => child.data)
        .filter((post: any) => post.title.toUpperCase().includes('GME') || post.num_comments > 100)
}