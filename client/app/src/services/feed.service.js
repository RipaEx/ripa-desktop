;(function () {
  'use strict'

  angular.module('arkclient.services')
    .service('feedService', [FeedService])

  function FeedService () {
    return {
      /**
       * Fetches and parses the RSS of an URL
       */
      fetchAndParse (url) {
        const rssParser = require('rss-parser')

        return new Promise((resolve, reject) => {
          rssParser.parseURL(url, (err, parsed) => {
            err ? reject(err) : resolve(parsed)
          })
        })
      },

      /**
       * Fetches and parses the RSS of ARK.io
       */
      fetchBlogEntries () {
        const rssUrl = 'http://createfeed.fivefilters.org/extract.php?url=https://steemit.com/@ripaex&in_id_or_class=articles__h2+entry-title&url_contains='
        return this.fetchAndParse(rssUrl).then(parsed => parsed.feed.entries)
      }
    }
  }
})()
