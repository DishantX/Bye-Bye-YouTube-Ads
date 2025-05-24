// ==UserScript==
// @name        Bye Bye YouTube Ads - Improved
// @version     3.0
// @description Skip YouTube ads automatically, and block ads more effectively (desktop only).
// @author      DishantX
// @match       *://www.youtube.com/*
// @exclude     *://www.youtube.com/*/music*
// @exclude     *://music.youtube.com/*
// @exclude     *://m.youtube.com/*
// @icon        https://tenor.com/view/manifest-meditate-pepe-gif-12464108004541162266
// @license     MIT
// @namespace   https://greasyfork.org/users/1467023
// @downloadURL https://update.greasyfork.org/scripts/535271/Bye%20Bye%20YouTube%20Ads.user.js
// ==/UserScript==

(() => {
  'use strict';

  // 1. Inject only ad-overlay CSS (no panel removals).
  const style = document.createElement('style');
  style.textContent = `
    .ytp-ad-overlay.ytp-overlay-loading,  /* in-video overlays */
    .ytp-featured-product,               /* featured product promos */
    .ytp-ad-player-overlay               /* in-player ad-overlay */
  { display: none !important; }`;
  document.head.appendChild(style);

  // 2. Click "Skip Ad" when it appears (including handling modern button versions)
  function clickSkip() {
    const skipButton = document.querySelector('button.ytp-ad-skip-button, button.ytp-ad-skip-button-modern');
    if (skipButton) {
      skipButton.click();
      return true;
    }
    return false;
  }

  // 3. Jump past unskippable ads
  function jumpAd() {
    const video = document.querySelector('video');
    if (video && isFinite(video.duration)) {
      video.currentTime = video.duration; // Jump to the end of the video.
    }
  }

  // 4. Observe the player’s 'ad-showing' class to handle ads more reliably
  const player = document.getElementById('movie_player');
  if (player) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Detect ad change
        if (player.classList.contains('ad-showing')) {
          if (!clickSkip()) jumpAd();
        }
      });
    });

    observer.observe(player, { attributes: true, attributeFilter: ['class'] });
  }

  // 5. Monitor for changes in the player for dynamically loaded ads
  function monitorForAds() {
    const adOverlay = document.querySelector('.ytp-ad-overlay');
    const adSkipButton = document.querySelector('button.ytp-ad-skip-button');

    // If ad-overlay or skip button is found, trigger skip or jump logic
    if (adOverlay || adSkipButton) {
      if (adSkipButton) clickSkip();
      else jumpAd();
    }
  }

  // Poll for ads periodically (because YouTube might load ads after page load)
  setInterval(monitorForAds, 1000); // Checks every 1 second for ads

})();
