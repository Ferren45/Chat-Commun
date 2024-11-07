let ws;

function connectWebSocket(token) {
  ws = new WebSocket('ws://kevin-chapron.fr:8080/ws');

  ws.onopen = function() {
    ws.send(JSON.stringify({ "auth": token }));
    console.log("Connexion WebSocket établie et authentifiée !");
  };

  ws.onmessage = function(event) {
    let messageData = JSON.parse(event.data);
    displayMessage(messageData);
  };

  ws.onerror = function(event) {
    console.error('Erreur WebSocket:', event.message);
  };

  ws.onclose = function() {
    console.log("Connexion WebSocket fermée.");
  };
}

function sendMessage(message) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ "message": message }));
  } else {
    console.error("Erreur : WebSocket non connectée.");
  }
}
function updateStatusPanel(messages) {
  const userStatusContainer = document.getElementById('userStatusContainer');
  userStatusContainer.innerHTML = ''; // Réinitialiser le panneau

  const userStatusMap = new Map();

  messages.forEach(msg => {
    if (msg.From && msg.Date) {
      userStatusMap.set(msg.From, msg.Date);
    }
  });

  if (userStatusMap.size === 0) {
    console.log('Aucun utilisateur trouvé');
  } else {
    console.log('Utilisateurs trouvés:', userStatusMap);
  }

  userStatusMap.forEach((date, user) => {
    const statusHTML = `
            <div class="user-status">
                <strong>${user}</strong>: ${calculateStatus(date)}
            </div>
        `;
    userStatusContainer.innerHTML += statusHTML;
  });
}

function calculateStatus(dateString) {
  const messageDate = new Date(dateString);
  const now = new Date();
  const diffMs = now - messageDate;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffMinutes < 5) {
    return '<span class="connected">Connecté</span>';
  } else if (diffHours < 12) {
    return `<span>Il y a ${diffMinutes} minutes</span>`;
  } else {
    return '<span class="disconnected">Déconnecté</span>';
  }
}

