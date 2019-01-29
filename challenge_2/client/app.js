var app = {
  postJSON: function(e) {
    e.preventDefault();
    // Send JSON to server
    // Clear JSON
    // Set result div
    console.log(e.target.value);
  },

  initialize: function() {
    // Attach handlers
    document.getElementById('submitForm').onclick = (event) => app.postJSON(event);
  }
};

