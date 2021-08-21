/* eslint-disable no-undef */
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import xmljs from 'xml-js';

export default (() => {
  let rss = {};
  rss.feeds = [];

  rss.init = (subscriptions) => {
    if (subscriptions) {
      rss.feeds = subscriptions;
      for (let key in rss.feeds) {
        let feed = rss.feeds[key];
        console.log(`Creating Alarm for ${feed} with guid ${feed.guid}`);
        chrome.alarms.create(`${feed.guid}`, {
          when: Date.now(),
          periodInMinutes: feed.interval,
        });
      }
    }
    return true;
  }

  //Test new subscription url and Ensure it retrieves RSS. 
  //Append it to subscriptions object, create an alarm for it.
  //Return new subscriptions object. 
  rss.add = (subscription) => {
    console.log(`received new subscription request message for: ${subscription}`);
    axios.get(subscription).then(r => {
      let newFeed = {};
      let feedId = uuidv4();

      //Initialize new feed's headers and data
      newFeed.guid = feedId;
      newFeed.etag = r.headers.hasOwnProperty("etag") ? r.headers.etag : null;
      newFeed.lastModified = r.headers.hasOwnProperty("last-modified") ? r.headers["last-modified"] : null;
      newFeed.lastPulled = r.headers.hasOwnProperty("date") ? r.headers.date : new Date();

      //Appending Parsed Raw XML Data to newFeed object
      newFeed = {
        ...newFeed,
        ...JSON.parse(xmljs.xml2json(r.data, { compact: true })).rss.channel
      };
      rss.feeds.push(newFeed);
      console.log(newFeed);
      updateSessionFeed();
      return true;
    }).catch(err => {
      console.log(err);
      return false;
    });
  };

  //Cancel alarm and remove feed by ID
  rss.remove = (feedId) => {
    let feedIndex = getFeedIndexById(feedId);
    if (feedIndex !== null) {
      rss.feeds.splice(feedIndex, 1);
      console.log(rss.feeds);
      updateSessionFeed();
      return true;
    }
    return false;
  }

  rss.reloadById = (feedId) => {
    let feedIndex = getFeedIndexById(feedId);
    if (feedIndex !== null) {
      let feed = rss.feeds[feedIndex];

      //Get request with etag header
      axios.get(feed.url, {
        headers: {
          'If-None-Match': `"${feed.etag}"`
        }
      }).then(r => {
        //TODO Add check for last-modified and prevent changes if 
        //returned matches current

        //Update any new headers and data
        feed.etag = r.headers.hasOwnProperty("etag") ? r.headers.etag : null;
        feed.lastModified = r.headers.hasOwnProperty("last-modified") ? r.headers["last-modified"] : null;
        feed.lastPulled = r.headers.hasOwnProperty("date") ? r.headers.date : new Date();

        //Appending Parsed Raw XML Data to newFeed object
        feed = {
          ...feed,
          ...JSON.parse(xmljs.xml2json(r.data, { compact: true })).rss.channel
        };

        rssApp.feeds[feedIndex] = feed;
      }).catch(err => {
        //If status is 304, Not Modified
        if (err.request.status === 304) {
          //Return early since the feed has had no changes
          console.log("no changes");
          return true;
        }
        console.log(err);
        return false;
      });
      updateSessionFeed();
      return true;
    }
  }

  rss.reloadAll = () => {

  }

  rss.updateSettings = (settings) => {
    console.log(settings);
  }

  function createAlarm(title, interval) {

  }

  function getFeedIndexById(feedId) {
    for (let key in rss.feeds) {
      let feed = rss.feeds[key];
      if (feed.guid === feedId) {
        return key;
      }
    }
    return null;
  }

  function updateSessionFeed() {
    chrome.storage.local.set({ Feeds: rss.feeds }, () => {
      console.log(`New SubscriberList is: ${JSON.stringify(rss.feeds)}`);
    });
  }
  return rss;
})();