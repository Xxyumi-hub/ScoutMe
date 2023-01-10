function getHash() {
    
    var url = document.location.href;
    const examplePRURL = "https://github.com/sharpspring/frontend/pull/#####";
    const githubClasses = "Popover-message Box Popover-message--top-right Popover-message--medium p-4 mt-2 mx-auto text-left color-shadow-large";
    const popupStyles = "position: absolute;top: 64px; right: 24px;"
    // const btnId = "scoutBtn"
    // const ghCopySVG = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>'

    //Get the PR number from the URL assuming we're on the conversation tab
    function getPR(url){
        const regex = new RegExp('/pull/');
        const index = url.search(regex);
        var prNum = url.slice([index+6],url.length);
        prNum = parseInt(prNum)
        return(prNum)
    }
    
    //Create the pop-up prompt that will display the scout hash
    function createPrompt(hash8, hash9){
        const prompt = document.createElement("div");
            prompt.setAttribute("class",githubClasses)
            prompt.setAttribute("style",popupStyles)
            prompt.id = "Prompt";
            
            document.body.appendChild(prompt)
        const btn = document.createElement("button");
            btn.id = "Prompt-btn";
            document.body.appendChild(prompt)
            prompt.innerHTML = `<p><b>Commit Hash:</b> ${hash9}</p><p style="font-size:.9em; line-height:.9em; margin: 0px;"><i >Please verify hash matches newest commit</i></p>`;

            
        //TODO: Find a way to close the box

        // Github seems to restricts the ability to run in-line code from a button like this
        // const copyBtnDiv = document.getElementById(btnId);
        // const copyBtn = document.createElement("button");
        //     copyBtnDiv.appendChild(copyBtn)
        //     copyBtn.innerHTML = ghCopySVG
        //     copyBtn.setAttribute("onClick","console.log('copied!')")
        // Copy text
        // https://www.w3.org/TR/clipboard-apis/#async-clipboard-api
        // {var data = [new ClipboardItem({ "text/plain": new Blob(["Text data"], { type: "text/plain" }) })];
        // navigator.clipboard.write(data).then(function() {
        //   console.log("Copied to clipboard successfully!");
        // }, function() {
        //   console.error("Unable to write to clipboard. :-(");
        // });}
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
        var hash8 = newestCommitURL.slice([index+9],[index + 17]);
        var hash9 = newestCommitURL.slice([index+9],[index + 18]);
        createPrompt(hash8, hash9);
    }


    //If we're not on the Commits tab, check if we're on the Conversation tab
    else if (url.startsWith("https://github.com/sharpspring/") && url.length <= examplePRURL.length) {
        var prNum = getPR(url);
        if (confirm("Navigate to the Commits Tab?")) document.location.href = url + "/commits"
        // TODO: The following method is unreliable, new aim is for the last "View Changes" button on the PR
        // This is searching for the review checkmark on the page that has the full commit hash by searching for it's URL
        // var hashURL = document.querySelectorAll(`a[href^='/sharpspring/frontend/pull/${prNum}/files/'].btn-outline.btn-sm.btn.ml-2`)[0].href;

        // //Pull the first 8 characters of the commit hash
        // const regex = new RegExp('/files/');
        // const index = hashURL.search(regex);
        // var hash = hashURL.slice([index+7],[index + 15]);
        // alert(`Scout Hash: ${hash}`);

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
