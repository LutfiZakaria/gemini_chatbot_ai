const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Keep track of conversation history for the AI context
let conversation = [];

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to UI and conversation history
  appendMessage('user', userMessage);
  conversation.push({ role: 'user', text: userMessage });
  input.value = '';

  // Show temporary "Thinking..." message
  const thinkingNode = appendMessage('bot', 'Thinking...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation })
    });

    if (!response.ok) throw new Error('Server returned an error.');

    const data = await response.json();

    if (data.result) {
      // Replace "Thinking..." with actual AI response and store in history
      thinkingNode.textContent = data.result;
      conversation.push({ role: 'model', text: data.result });
    } else {
      thinkingNode.textContent = 'Sorry, no response received.';
    }
  } catch (error) {
    console.error('Error fetching chat response:', error);
    thinkingNode.textContent = 'Failed to get response from server.';
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  // Return the DOM element so we can modify it later (e.g., replace "Thinking...")
  return msg;
}
