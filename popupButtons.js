// parseQuestion function with an embeded checkElem() and autoexecuted
const README_CONTENTS_CODE = `(function() {
    let checkElem = (elem) =>  elem && elem.length > 0;

    var questionUrl = window.location.href;
    if (questionUrl.endsWith('/submissions/')) {
      questionUrl = questionUrl.substring(
        0,
        questionUrl.lastIndexOf('/submissions/') + 1,
      );
    }
    const questionElem = document.getElementsByClassName(
      'content__u3I1 question-content__JfgR',
    );
    const questionDescriptionElem = document.getElementsByClassName(
      'question-description__3U1T',
    );
    if (checkElem(questionElem)) {
      const qbody = questionElem[0].innerHTML;
  
      // Problem title.
      let qtitle = document.getElementsByClassName('css-v3d350');
      if (checkElem(qtitle)) {
        qtitle = qtitle[0].innerHTML;
      } else {
        qtitle = 'unknown-problem';
      }
  
      // Problem difficulty, each problem difficulty has its own class.
      const isHard = document.getElementsByClassName('css-t42afm');
      const isMedium = document.getElementsByClassName('css-dcmtd5');
      const isEasy = document.getElementsByClassName('css-14oi08n');
  
      if (checkElem(isEasy)) {
        difficulty = 'Easy';
      } else if (checkElem(isMedium)) {
        difficulty = 'Medium';
      } else if (checkElem(isHard)) {
        difficulty = 'Hard';
      }
      // Final formatting of the contents of the README for each problem
      const markdown = \`<h2><a href="\${questionUrl}">\${qtitle}</a></h2><h3>\${difficulty}</h3><hr>\${qbody}\`;
      return markdown;
    } else if (checkElem(questionDescriptionElem)) {
      let questionTitle = document.getElementsByClassName(
        'question-title',
      );
      if (checkElem(questionTitle)) {
        questionTitle = questionTitle[0].innerText;
      } else {
        questionTitle = 'unknown-problem';
      }
  
      const questionBody = questionDescriptionElem[0].innerHTML;
      const markdown = \`<h2>\${questionTitle}</h2><hr>\${questionBody}\`;
  
      return markdown;
    }
  
    return null;
  })()`

// Function that prompts a download
const DOWNLOADER_FUNC = `function(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}`


// Activates create README.md button
chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const LEETCODE_PROBLEM_URL = "https://leetcode.com/problems/"
    
    let url = tabs[0].url;
    if(url.startsWith(LEETCODE_PROBLEM_URL)) {
        document.getElementById("readme").disabled = false
    }

});

// Readme button listener
document.getElementById("readme").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: `(${DOWNLOADER_FUNC})("README.md", ${README_CONTENTS_CODE})` }
        );
    });
    
});


