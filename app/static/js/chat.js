document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');

    // Function to add a message to the chat container
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'system-message';
        
        const messagePara = document.createElement('p');
        messagePara.textContent = message;
        
        messageDiv.appendChild(messagePara);
        chatContainer.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to send a message to the server
    async function sendMessage() {
        const message = userInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addMessage(message, true);
            
            // Clear input field
            userInput.value = '';
            
            try {
                // Show loading indicator
                const loadingDiv = document.createElement('div');
                loadingDiv.className = 'system-message';
                loadingDiv.innerHTML = '<p>Thinking...</p>';
                chatContainer.appendChild(loadingDiv);
                
                // Send message to server
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: message })
                });
                
                // Remove loading indicator
                chatContainer.removeChild(loadingDiv);
                
                if (response.ok) {
                    const data = await response.json();
                    addMessage(data.response);
                } else {
                    const errorData = await response.json();
                    addMessage(`Error: ${errorData.error || 'Failed to get response'}`);
                }
            } catch (error) {
                addMessage(`Error: ${error.message}`);
            }
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}); 