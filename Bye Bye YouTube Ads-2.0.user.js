
// ==UserScript==
// @name        Bye Bye YouTube Ads 
// @version     2.0
// @description Automatically block/skip YouTube video ads on www.youtube.com (desktop only). This one actually works. Also, the most lightweight script ever. 
// @author      DishantX
// @match       *://www.youtube.com/*
// @exclude     *://www.youtube.com/*/music*
// @exclude     *://music.youtube.com/*
// @exclude     *://m.youtube.com/*
// @icon        https://tenor.com/view/manifest-meditate-pepe-gif-12464108004541162266
// @icon64      https://tenor.com/view/manifest-meditate-pepe-gif-12464108004541162266
// @license            MIT
// @namespace https://greasyfork.org/users/1467023
// @downloadURL https://update.greasyfork.org/scripts/535271/Bye%20Bye%20YouTube%20Ads.user.js
// @updateURL https://update.greasyfork.org/scripts/535271/Bye%20Bye%20YouTube%20Ads.meta.js
// ==/UserScript==

(() => {
  'use strict';

  // 1. Inject only ad-overlay CSS (no panel removals).
  const style = document.createElement('style');
  style.textContent = [
    '.ytp-ad-overlay.ytp-overlay-loading',  // in-video overlays
    '.ytp-featured-product'                  // featured product promos
  ].join(',') + ' { display: none !important; }';
  document.head.appendChild(style);

  // 2. Click “Skip Ad” when it appears
  function clickSkip() {
    const btn = document.querySelector('button.ytp-ad-skip-button, button.ytp-ad-skip-button-modern');
    if (btn) btn.click();
    return !!btn;
  }

  // 3. Jump past unskippable ads
  function jumpAd() {
    const v = document.querySelector('video');
    if (v && isFinite(v.duration)) v.currentTime = v.duration;
  }

  // 4. Observe only the player’s 'ad-showing' class
  const player = document.getElementById('movie_player');
  if (player) {
    const obs = new MutationObserver(muts => {
      if (player.classList.contains('ad-showing')) {
        if (!clickSkip()) jumpAd();
      }
    });
    obs.observe(player, { attributes: true, attributeFilter: ['class'] });
  }
})();
