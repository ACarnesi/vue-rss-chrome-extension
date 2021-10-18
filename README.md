# vue-rss-chrome-extension
## Summary
### Development Goals
This project is being developed with the goal of getting a better handle on vue, webpack configuration, and chrome's extensions. Getting things set up to work initially was an interesting trial and hopefully I'll be able to improve on it going to ease any future development on the project. 

> I don't plan to go to hard on the actual functionality of this extension, as Vue is probably overkill for a chrome extension anyways.

### Extension Functionality
The extension should be able to do all of the following:
1. Subscribe to an RSS feed via an input URL
2. Locate potential RSS feeds on page's opened by the user
3. Easily allow the subscribing of located RSS feeds on pages
4. Remember any subscribed RSS feeds from one session to the next
5. Poll the subscribed RSS feeds for updates

### Considering Implementing
1. Remembering what feeds have already been read by the user
2. Others to come probably

## Project setup
### Install node packages
```
npm install
```

### Adding The Extension into Chrome
Run this after the package install to generate initial /dist folder and files
```js
npm run build:dev
```

1. Open Chrome and navigate to the extensions page: chrome://extensions
2. Click the toggle switch in the top right corner to activate "Developer Mode"
3. On the new dropdown bar that should have appeared, click "Load unpacked"
4. Navigate to the project directory, and select the "dist" folder that was created earlier.
5. The extension should now appear in the top right corner of chrome.


### Compiles and hot-reloads for development 
Use either of the following, or both. Whatever floats your boat.
```js
npm run watch:dev //For hot loading the code used by the extension loaded into chrome in the steps above.

npm run serve //For developing outside of the chrome extension like a normal webpage
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
