var app = {
  postJSON: function(e) {
    e.preventDefault();
    var formData = document.getElementById('JSONData').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:3000', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        document.getElementById('JSONData').value = '';
        document.getElementById('result').innerHTML = xhr.responseText;
      }
    };
    xhr.send(formData);
  },

  initialize: function() {
    // Attach handlers
    // document.getElementById('submitForm').onclick = (event) => app.postJSON(event);
  }
};

