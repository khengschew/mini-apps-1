var app = {
  postJSON: function(e) {
    e.preventDefault();
    // Ajax textarea submit
    // var formData = document.getElementById('JSONData').value;
    
    var fileData = new FormData();
    var fileToUpload = document.getElementById('document').files[0];
    fileData.append('document', fileToUpload, fileToUpload.name);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:3000', true);
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // document.getElementById('JSONData').value = xhr.responseText;
        // document.getElementById('JSONData').value = '';
        document.getElementById('result').innerHTML = xhr.responseText;
        
        var downloadBlob = new Blob([xhr.responseText], {type: 'text/plain;charset=utf-8'});

        var downloadUrl = URL.createObjectURL(downloadBlob);

        var downloadLink = document.getElementById('download');
        downloadLink.setAttribute('download', "json.csv");
        downloadLink.setAttribute('href', downloadUrl);
        downloadLink.style.display = 'block';
      }
    };
    xhr.send(fileData);
  },

  initialize: function() {
    // Attach handlers
    document.getElementById('submitForm').onclick = (event) => app.postJSON(event);
  }
};

