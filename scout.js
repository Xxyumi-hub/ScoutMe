const getHash = () => {
    const textInput = document.getElementById('input').value;
  if (textInput.startsWith("https://")) {
    const regex = new RegExp('commits/');
    const index = textInput.search(regex)
    document.getElementById('result').innerHTML = textInput.slice([index 
+ 8], [index 
+ 16])
  } else {
    document.getElementById('result').innerHTML = textInput.slice(0,8);
  }
}

document.getElementById('scout-btn').addEventListener('click', getHash); 
