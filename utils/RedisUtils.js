/**
 * Created by mandeep on 1/7/15.
 */
var redis = require('redis');
var Promise = require('bluebird');
var debug = require('debug')('shortly:RedisUtils');
var redisClient = Promise.promisifyAll(redis.createClient(6379, 'localhost'));
var redisDb = 1;
var redisExpire = 100000000;
redisClient.select(redisDb, function(err, res){
    if(err) {
        debug("Redis: Error in redis db selection!");
    }
    else {
        debug("Redis: Selected redis db: "+redisDb);
    }
});

redisClient.on("error", function(err){
    connectionStatus = false;
});

redisClient.on("ready", function(){
    connectionStatus = true;
});


var redisUtils = {};

redisUtils.setShortenedUrl = function (key, url) {
    redisClient.setAsync(key,url)
        .then(function() {
            debug('Shortened Url saved for : ', url);
            redisClient.expireAsync(key, redisExpire);
        });
};

redisUtils.getUrl = function (key) {
    return redisClient.getAsync(key);
        //.then(function() {
        //    debug('Url for ',key,' returned');
        //});
};

module.exports = redisUtils;