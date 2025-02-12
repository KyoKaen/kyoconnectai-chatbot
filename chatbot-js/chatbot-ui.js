// chatbot-ui.js
class ChatWindow {
  constructor() {
    this.init();
  }

  init() {
    // Create chat window
    this.container = document.createElement('div');
    this.container.id = 'kyoconnect-chat-window';
    this.container.innerHTML = `
      <div class="chat-header">
        <h3>KyoConnectAI Assistant</h3>
        <button class="close-btn">▼</button>
      </div>
      <div class="chat-body"></div>
      <div class="chat-footer">
        <input type="text" class="chat-input">
        <button class="send-btn">➤</button>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #kyoconnect-chat-window {
        position: fixed;
        right: 25px;
        bottom: 100px;
        width: 380px;
        height: 600px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        display: none;
        flex-direction: column;
        z-index: 99999;
      }
      
      /* Include all previous chat UI styles here */
    `;

    // Event listeners
    window.addEventListener('toggleChatWindow', () => this.toggleWindow());
    this.container.querySelector('.close-btn').addEventListener('click', () => this.toggleWindow());
    
    document.head.appendChild(style);
    document.body.appendChild(this.container);
  }

  toggleWindow() {
    this.container.style.display = this.container.style.display === 'none' ? 'flex' : 'none';
  }

  // Add message handling and API calls...
}

// Initialize
new ChatWindow();
