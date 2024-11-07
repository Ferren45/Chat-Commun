function displayMessage(data) {
  let messageDisplay = document.getElementById('messageDisplay');
  let messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = `[${data.Date}] (${data.From}) ${data.Text}`;
  messageDisplay.appendChild(messageElement);
  messageDisplay.scrollTop = messageDisplay.scrollHeight;
}
