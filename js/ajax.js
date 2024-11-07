function ajaxRequest(method, url, data, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');

  if (token && method === 'GET') {
    xhr.setRequestHeader('Authorization', 'Basic ' + token);
  }

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(JSON.parse(xhr.responseText));
    } else {
      console.error('Erreur:', xhr.status, xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.error('Erreur de la requête AJAX.');
  };
  xhr.send(data ? JSON.stringify(data) : null);
}
