FictionFone is a multinational telecommunication company, with head quarters in
Egypt. It predominates the middle east region with a customer base of 250 million
subscribers.
Recently, FictionFone corporation purchased a social media analytics tool that
performs sentiment analysis on the posts and tweets of subscribers from Twitter
and Facebook account. The analytics tool is great, but requires the tweets/posts to
be fed manually, which is frustrating to the marketing team.
The technical team has taken the ownership to develop a tool to solve this problem.
Keeping in mind, the marketing team are non-technical users, and they use Slack
heavily for internal communication, they came up with the following plan.

Zappy
Zappy is the name of the tool that you’re required to develop. Zappy integrates
with a Slack channel and listens on specific messages. For simplicity, we the tool
will listen on all messages containing the word “go”. As soon as any member of the
marketing team, places a messages on a channel containing the message “go”, the
tool fetches twitter feeds from the FictionFone account and saves in a mongo
collection. Lastly, for our demo purpose, you will create a view that fetches tweets
from mongoDB and shows in a table. Diagram below visualizes the process.
Publish Message

To run this project

1-create a Slack and Twitter account (if u not have)
2-create app in developer.twitter (if u not have)
3-create channel in slack (if u not have)
4-create app on slack and put your domain/slack/events in Event Subscriptions and Subscribe to workspace events
5-open the .env and add your data 
6-npm i 
7-node server.js
