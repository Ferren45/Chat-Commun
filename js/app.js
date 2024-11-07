let token;

document.addEventListener('DOMContentLoaded', function() {
  const codePermanent = "YANJ15060300";

  ajaxRequest('POST', 'http://kevin-chapron.fr:8080/login', { "Code": codePermanent }, function(response) {
    if (response.Token) {
      token = response.Token;
      document.getElementById('userName').textContent = response.Name;
      console.log('Token reçu:', token);

      ajaxRequest('GET', 'http://kevin-chapron.fr:8080/messages', null, function(messages) {
        messages.forEach(displayMessage);
        connectWebSocket(token);
        updateStatusPanel(messages);
      });
    } else {
      console.error("Erreur : Token non reçu");
    }
  });


  document.getElementById('sendButton').onclick = function() {
    let messageInput = document.getElementById('messageInput');
    let messageText = messageInput.value.trim();

    if (token && messageText !== "") {
      sendMessage(messageText);
      messageInput.value = '';
    } else if (messageText === "") {
      console.error("Erreur : Le message est vide.");
    } else {
      console.error("Erreur : Le token n'est pas défini.");
    }
  };

// Envoi du message avec la touche "Entrée"
  document.getElementById('messageInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      let messageText = this.value.trim();

      if (token && messageText !== "") {
        sendMessage(messageText);
        this.value = '';
      } else if (messageText === "") {
        console.error("Erreur : Le message est vide.");
      } else {
        console.error("Erreur : Le token n'est pas défini.");
      }
    }
  });
});

ajaxRequest('GET', 'http://kevin-chapron.fr:8080/messages', null, function(messages) {
  console.log('Messages reçus:', messages);
  messages.forEach(displayMessage);
  connectWebSocket(token);
  updateStatusPanel(messages);
});
