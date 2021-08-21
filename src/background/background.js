/* eslint-disable no-undef */
import rssApp from './rss/rss';

//Runs anytime chrome starts
chrome.runtime.onStartup.addListener(() => {
  initializeExtension();
});

//Runs upon intially installing the Extension
chrome.runtime.onInstalled.addListener(() => {
  initializeExtension();
});

chrome.management.onEnabled.addListener((info) => {
  console.log(JSON.stringify(info));
  initializeExtension();
});

//Funcitonality for listening for alarms 
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(`We received an called ${alarm.name}! It was scheduled to run at ${alarm.scheduledTime}! WOW!`);
  console.log(`We should do something cool here now :D!`);
  rssApp.reloadById(alarm.name);
});

//All message events for inter app communication 
chrome.runtime.onMessage.addListener((message, sender, callback) => {
  console.log(`Message Internal: ${message}`);
  if (message.key === "getFeeds") {
    console.log(`Get All Feeds: ${sampleSubscriberList}`);
    callback(sampleSubscriberList);
  }
  else if (message.key === "addSubscription") {
    let isAdded = rssApp.add(message.data);
    if (isAdded) {
      updateExtensionFeed();
    }
  }
  else if (message.key === "Delete") {
    let isRemoved = rssApp.remove(message.data);
    if (isRemoved) {
      updateExtensionFeed();
    }
  }
});

//All message events for inter app communication 
chrome.runtime.onMessageExternal.addListener((message, sender, callback) => {
  console.log(`Message External: ${message}`);
  if (message.key === "getFeeds") {
    console.log(`Get All Feeds: ${sampleSubscriberList}`);
    callback(sampleSubscriberList);
  }
  else if (message.key === "addSubscription") {
    let isAdded = rssApp.add(message.data);
    if (isAdded) {
      updateExtensionFeed();
    }
  }
  else if (message.key === "Delete") {
    let isRemoved = rssApp.remove(message.data);
    if (isRemoved) {
      updateExtensionFeed();
    }
  }
});

//Cleanup on unloading page
chrome.runtime.onSuspend.addListener(() => {
  chrome.alarms.getAll((alarms) => {
    console.log(`Here are all the alarms being cleaned: ${JSON.stringify(alarms)}`)
  });
  chrome.alarms.clearAll();
});

//Re-initializing in case unloading is cancelled
chrome.runtime.onSuspendCanceled.addListener(() => {
  initializeExtension();
});



function initializeExtension() {
  //Debugging Purposes. delete later
  chrome.alarms.getAll((alarms) => {
    console.log(`All Alarms: ${JSON.stringify(alarms)}`)
  });

  //Get latest feeds object from Chrome storage
  chrome.storage.sync.get(['Feeds'], (result) => {
    let isInitialized = rssApp.init(result.Feeds);

    if (isInitialized) {
      updateExtensionFeed();
    }
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher()
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
}

function updateExtensionFeed() {
  chrome.runtime.sendMessage({
    key: "updateSubscriptions",
    data: rssApp.feeds
  });
}

const sampleSubscriberList = [
  {
    title: "An RSS Daily News Feed from FeedForAll - RSS Feed Creation.",
    guid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    description: "",
    category: "",
    copyright: "",
    language: "",
    lastBuildDate: "",
    url: "https://www.feedforall.com/blog-feed.xml",
    interval: 5,
    etag: "92849-595add6ab88c0",
    imageUrl: "https://www.feedforall.com/feedforall-icon.gif",
    image: {
      url: "https://www.feedforall.com/feedforall-icon.gif",
      title: "",
      link: "",
      description: "",
      width: 32,
      height: 32,
    },
    items: [
      {
        title: "record0-1",
        description: "This is the google record",
        link: "https://google.com",
        guid: "512356123",
        pubDate: "",
      },
      {
        title: "record0-2",
        description: "This is the facebook record",
        link: "https://facebook.com",
        guid: "123612341",
        pubDate: "",
      },
      {
        title: "record0-3",
        description: "This is a youtube record",
        link: "https://youtube.com",
        guid: "1235666324",
        pubDate: "",
      }
    ]
  },
  {
    title: "Light Novel Bastion",
    guid: "3512321451252141243",
    description: "",
    category: "",
    copyright: "",
    language: "",
    lastBuildDate: "",
    url: "https://lightnovelbastion.com/feed",
    interval: 5,
    etag: "92849-595add6ab88c0",
    imageUrl: "https://lightnovelbastion.com/wp-content/uploads/2017/10/cropped-lnb-32x32.png", 
    image: {
      url: "https://lightnovelbastion.com/wp-content/uploads/2017/10/cropped-lnb-32x32.png",
      title: "Light Novel Bastion",
      link: "https://lightnovelbastion.com",
      description: "",
      width: 32,
      height: 32,
    },
    items: [
      {
        title: "Death Mage Translation and Donations FAQ",
        description: "This is a subscription record",
        link: "https://lightnovelbastion.com/death-mage-translation-and-donations-faq/?utm_source=rss&#038;utm_medium=rss&#038;utm_campaign=death-mage-translation-and-donations-faq",
        guid: "https://lightnovelbastion.com/?p=2875",
        pubDate: "Thu, 07 Nov 2019 08:08:38 +0000",
      }
    ]
  },
];