const { TweetSchema } = require("./tweetSchema");
var Twitter = require('twitter');
const queryValidator = require('../helper/queryValidator');
const pagingHelper = require('../helper/pagingHelper');

function saveTweets() {

    const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    client.get('statuses/home_timeline', async (error, tweets, response) => {
        if (!error) {
            const tweets1 = tweets.map(tw => {
                const tweet = {};
                const user = {}
                tweet.id = tw.id;
                tweet.created_at = tw.created_at;
                tweet.text = tw.text;
                user.id = tw.user.id;
                user.name = tw.user.name;
                user.screen_name = tw.user.screen_name;
                tweet.user = user;
                return tweet;
            });
            try {
                await TweetSchema.insertMany(tweets1, { ordered: false })
            } catch (e) {
                console.log('Has Dublicate Errors');
            }
        }
    });
}

function validateQueryString(queryString) {
    let valResult = queryValidator.validate(
        [{
            value: queryString.page,
            required: true,
            type: queryValidator.types.number,
            key: 'page'
        }, {
            value: queryString.size,
            required: true,
            type: queryValidator.types.number,
            key: 'size'
        }, {
            value: queryString.created_at_from,
            type: queryValidator.types.date,
            key: 'created_at_from'
        }, {
            value: queryString.created_at_to,
            type: queryValidator.types.date,
            key: 'created_at_to'
        }]
    );
    if (valResult.result == false)
        return `${valResult.elem_key} is not valid`;
}

async function getTweets(pageSize, pageNum, text, created_at_from, created_at_to) {
    let skip = pageSize * (pageNum - 1);
    let query = {};

    if (text) {
        query.text = {
            $regex: new RegExp(text, "i")
        };
    }

    if (created_at_from && created_at_to) {
        query.created_at = {
            $gte: created_at_from,
            $lte: created_at_to
        }
    } else if (created_at_from) {
        query.created_at = {
            $gte: created_at_from
        }
    } else if (created_at_to) {
        query.created_at = {
            $lte: created_at_to
        }
    }

    let tweets = await TweetSchema.find(
        query
    ).select('text created_at user').skip(skip).limit(pageSize);

    let count = await TweetSchema.countDocuments(query);
    return pagingHelper.initializeResponse(tweets, count, pageSize);
}


module.exports.saveTweets = saveTweets;
module.exports.validateQueryString = validateQueryString;
module.exports.getTweets = getTweets;