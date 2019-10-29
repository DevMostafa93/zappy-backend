const router = require('express').Router();
const tweetService = require('./tweetService')


router.get('/', async (req, res) => {
    try {
  
      let error = tweetService.validateQueryString(req.query);
      if (error) return res.status(400).send(error);
  
      let result = await tweetService.getTweets(parseInt(req.query.size), parseInt(req.query.page), req.query.text, req.query.created_at_from, req.query.created_at_to);
    
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send('internal server error');
    }
  });

module.exports = router;