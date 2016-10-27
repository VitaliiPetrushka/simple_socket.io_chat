(function(document) {
   var user = document.getElementById("user-name");
   var message = document.getElementById("user-message");
   var chatMessages = document.getElementById("chat-messages");
   var sendButton = document.getElementById("send-message");

   var socket = io.connect();

   sendButton.addEventListener("click", function() {
      socket.emit("chat-message", {
         name: user.value,
         message: message.value
      });
   }, false);
   socket.on("chat-message", function(imessage) {
      var income_message = document.createElement('li');
      income_message.classList.add("collection-item");
      income_message.appendChild(document.createTextNode(imessage.name + " : " + imessage.message));
      chatMessages.appendChild(income_message);
   });
   socket.on("chat-history", function(ihistory) {
      var history = document.createDocumentFragment();
      for(var i = 0; i < ihistory.length; i++) {
         var message = document.createElement('li');
         message.classList.add("collection-item");
         message.appendChild(document.createTextNode(ihistory[i].name + " : " + ihistory[i].message));
         history.appendChild(message);
      }
      chatMessages.appendChild(history);
   });
})(document);