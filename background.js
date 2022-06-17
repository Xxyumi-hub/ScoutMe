function getHash() {
    
    var url = document.location.href;
    const examplePRURL = "https://github.com/sharpspring/frontend/pull/#####";

    //Get the PR number from the URL assuming we're on the conversation tab
    function getPR(url){
        const regex = new RegExp('/pull/');
        const index = url.search(regex);
        var prNum = url.slice([index+6],url.length);
        prNum = parseInt(prNum)
        return(prNum)
    }
    
    //If we're on the Commits tab
    if (url.startsWith("https://github.com/sharpspring/") && url.endsWith("/commits")){
        //Search for the last element on the page that has a commit hash (last is the most recent)
        var commitElements = document.querySelectorAll(`a.tooltipped.tooltipped-sw.btn.text-mono`);
        var newestCommit = commitElements[commitElements.length-1];
        var newestCommitURL = newestCommit.href;

        //Pull the first 8 characters of the commit hash
        const regex = new RegExp('/commits/');
        const index = newestCommitURL.search(regex);
        var hash = newestCommitURL.slice([index+9],[index + 17]);
        alert(`Scout Hash: ${hash}`);
        
    }
    //If we're not on the Commits tab, check if we're on the Conversation tab
    else if (url.startsWith("https://github.com/sharpspring/") && url.length <= examplePRURL.length) {
        var prNum = getPR(url);

        //This is searching for the review checkmark on the page that has the full commit hash by searching for it's URL
        var hashURL = document.querySelectorAll(`a[href^='/sharpspring/frontend/pull/${prNum}/files/'].flex-order-1`)[0].href;

        //Pull the first 8 characters of the commit hash
        const regex = new RegExp('/files/');
        const index = hashURL.search(regex);
        var hash = hashURL.slice([index+7],[index + 15]);
        alert(`Scout Hash: ${hash}`);

    }
    else{
        alert("Not a valid PR page. Please navigate to the conversation or Commits tab of your desired PR.\nEX: " + examplePRURL)
    }
  }

//We don't have a popup, so this runs when you click the extension icon
chrome.action.onClicked.addListener((tab) => {
    if(!tab.url.includes("chrome://")) {
        console.log("running bg")
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getHash
        });
    }
});