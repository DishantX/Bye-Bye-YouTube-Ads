// ==UserScript==
// @name        Bye Bye YouTube Ads
// @version     1.0
// @description Automatically block/skip YouTube video ads on www.youtube.com (desktop only)
// @author      DishantX
// @match       *://www.youtube.com/*
// @exclude     *://www.youtube.com/*/music*
// @exclude     *://music.youtube.com/*
// @exclude     *://m.youtube.com/*
// @grant       none
// @namespace https://greasyfork.org/users/1467023
// @downloadURL https://update.greasyfork.org/scripts/535271/Bye%20Bye%20YouTube%20Ads.user.js
// @updateURL https://update.greasyfork.org/scripts/535271/Bye%20Bye%20YouTube%20Ads.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Click the YouTube "Skip Ad" button if present.
    function clickSkipButton() {
        const skipBtn = document.querySelector('button.ytp-ad-skip-button, button.ytp-ad-skip-button-modern');
        if (skipBtn) {
            skipBtn.click();
            return true;
        }
        return false;
    }

    // Skip an unskippable ad by jumping to the video's end.
    function skipUnskippableAd() {
        const video = document.querySelector('video');
        if (video && video.duration && isFinite(video.duration)) {
            video.currentTime = video.duration;
        }
    }

    // Dismiss YouTube's adblock/premium popups if they appear.
    function handleAdBlockPopup() {
        // "No thanks" button on the upsell dialog.
        const noThanks = document.querySelector('yt-upsell-dialog-renderer tp-yt-paper-button[aria-label="No thanks"]');
        if (noThanks) {
            noThanks.click();
            return;
        }
        // "I understand and wish to proceed" button on another dialog.
        const proceed = document.querySelector('yt-button-renderer tp-yt-paper-button[aria-label="I understand and wish to proceed"]');
        if (proceed) {
            proceed.click();
            return;
        }
        // If a popup container is open with no close button, hide it.
        const popup = document.querySelector('ytd-popup-container');
        if (popup && popup.style.display !== 'none') {
            popup.style.display = 'none';
        }
    }

    // Set up a MutationObserver to watch for ad-related DOM changes.
    const observer = new MutationObserver((mutationsList, obs) => {
        // If an ad is playing (player has 'ad-showing' class) then try to skip it.
        const player = document.getElementById('movie_player');
        if (player && player.classList.contains('ad-showing')) {
            // First try clicking the skip button if it exists.
            if (!clickSkipButton()) {
                // If no skip button, jump the ad to the end.
                skipUnskippableAd();
            }
        }
        // Also attempt to dismiss any adblock warning popups.
        handleAdBlockPopup();
    });

    // Observe the entire document for added/removed nodes (needed because YouTube is an SPA).
    observer.observe(document, { childList: true, subtree: true });

    // Run skip logic once immediately after page load in case an ad is already showing.
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        const player = document.getElementById('movie_player');
        if (player && player.classList.contains('ad-showing')) {
            if (!clickSkipButton()) {
                skipUnskippableAd();
            }
        }
        handleAdBlockPopup();
    }
})();
