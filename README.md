# Bye-Bye YouTube Ads

A razor-focused YouTube Ad Blocker script that makes YouTube video ads disappear—so you can dive straight into your favorite content without wasting a second.

---

## What It Does

- **Instantly skips video ads** on `www.youtube.com`  
- **Desktop-only** (we stripped out Music, Shorts, Studio) to stay lean  
- **Ultra-lightweight**: one MutationObserver, no heavy loops or timers  
- **Undetectable** by YouTube’s ad-block checks—runs quietly in the background  

---

## Why It’s Better Than Most

1. **Single-Purpose Efficiency**  
   Many ad-skippers pack in extra features (banner blockers, Mobile/Music support) that slow things down. Bye-Bye YouTube Ads does *one thing*—and does it faster than the rest.

2. **Minimal CPU Impact**  
   Instead of polling every few milliseconds, we watch only for the exact DOM changes that signal an ad. That means your battery and CPU thank you.

3. **Stealth Mode**  
   YouTube’s anti-adblock defenses often flag bulky scripts. This one is so small and focused, YouTube never even notices.

4. **Zero Maintenance**  
   With only the core ad-skip logic, there’s less to break when YouTube updates their player. It’s easier to keep updated and reliable.

---

## How to Install

1. **Add a Userscript Manager**

> Install Tampermonkey extension in your Chrome/Edge/Brave/Firefox browser.

2. **Install the Script**

> In your browser, click the Tampermonkey icon in the toolbar and choose “Create a new script…”

> Install the script from https://greasyfork.org/en/scripts/535271-bye-bye-youtube-ads

> Click File ▷ Save, or hit Ctrl+S to save the script in Tampermonkey.

## How It Feels

- You know that moment when YouTube hits you with a 30-second ad?  
- With Bye-Bye YouTube Ads, it’s like that moment never happened.

---

## What It Doesn’t Do (By Design)

- ❌ Block side banners or sponsored cards  
- ❌ Interfere with YouTube Music, Shorts, or Studio  
- ❌ Load extra libraries or bloat your browser  

By keeping it simple, we keep it fast—and you keep watching.  

---

## License

MIT

