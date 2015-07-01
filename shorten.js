/**
 * Created by mandeep on 1/7/15.
 */
var debug = require('debug')('shortly:shorten');
var redisQ = require('./utils/RedisUtils');
var random = require('randomstring');
module.exports = function(req, res) {
    debug('entered shorten function');
    //res.send('Enter URL to shorten below');
    var query = req.query;
    var shortenUrl  = query['uri'];
    var shortUrl = query['redirect'];
    if(shortenUrl !== undefined)
    {
        debug('Received URL : ',shortenUrl);
        var key = random.generate(5);
        debug('Key is : ', key);
        redisQ.setShortenedUrl(key, shortenUrl);
            //.then(function () {
            //    debug('URL set');
            //});
    }
    else if(query['redirect'] !== undefined) {
       // debug(query);
        debug('Received Shortened URL : ',shortUrl);
        var result = redisQ.getUrl(shortUrl);
        debug('URL is : ',result);
    }
};

