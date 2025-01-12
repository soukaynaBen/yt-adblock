// RELOAD ALL YOUTUBE TABS WHEN THE EXTENSION IS FIRST INSTALLED, DO NOTHING ON UPDATED
chrome.runtime.onInstalled.addListener(({reason}) => {
    switch (reason) {
      case "install":
        console.info("EXTENSION INSTALLED");
        chrome.tabs.query({active: true, currentWindow: true }, (tabs) => {
          tabs
            .filter((tab) => tab.url.startsWith("https://www.youtube.com/"))
            .forEach(({ id }) => {
              chrome.tabs.reload(id);
            });
        });
        break;
      case "update":
        console.info("EXTENSION UPDATED");
        break;
      case "chrome_update":
      case "shared_module_update":
      default:
        console.info("BROWSER UPDATED");
        break;
    }
  });
  
  const skipAds = async () => {
    await new Promise((resolve, _reject) => {
      const videoContainer = document.getElementById("movie_player");
  
      const setTimeoutHandler = () => {
        const isAd = videoContainer?.classList.contains("ad-interrupting") || videoContainer?.classList.contains("ad-showing");
        const skipLock  = document.querySelector(".ytp-ad-preview-text")?.innerText;
        const surveyLock = document.querySelector(".ytp-ad-survey")?.length > 0;
  
        if (isAd && skipLock) {
          const videoPlayer  = document.getElementsByClassName("video-stream")[0] as HTMLVideoElement;
          videoPlayer.muted = true; // videoPlayer.volume = 0;
          videoPlayer.currentTime = videoPlayer.duration - 0.1;
          videoPlayer.paused && videoPlayer.play()
          // CLICK ON THE SKIP AD BTN
          document.querySelector(".ytp-ad-skip-button")?.click();
          document.querySelector(".ytp-ad-skip-button-modern")?.click();
        } else if (isAd && surveyLock) {
          // CLICK ON THE SKIP SURVEY BTN
          document.querySelector(".ytp-ad-skip-button")?.click();
          document.querySelector(".ytp-ad-skip-button-modern")?.click();
        }
  
        resolve(null);
      };
  
      // RUN IT ONLY AFTER 100 MILLISECONDS
      setTimeout(setTimeoutHandler, 100);
    });
  
    skipAds();
  };
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("tab updated", new Date(Date.now()) )
    if (
      changeInfo.status === "complete" &&
      String(tab.url).includes("https://www.youtube.com/watch")
    ) {
      chrome.scripting.executeScript({
        target: { tabId },
        func: skipAds,
      });
    }
  });