// embed.js
class KyoConnectChatbot {
  constructor(config) {
    this.config = {
      position: 'bottom-right',
      brandColor: '#000000',
      ...config
    };
    this.initialize();
  }

  initialize() {
    // Create container
    this.createStyles();
    this.createChatContainer();
    this.createToggleButton();
    this.bindEvents();
    this.showWelcomeMessage();
  }

  createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .kyoconnect-chatbot {
        position: fixed;
        ${this.config.position === 'bottom-right' ? 
          'right: 25px; bottom: 100px;' : 
          'left: 25px; bottom: 100px;'}
        width: 380px;
        height: 600px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        display: none;
        flex-direction: column;
        z-index: 99999;
      }

      .kyoconnect-toggle {
        position: fixed;
        ${this.config.position}: 25px;
        bottom: 25px;
        width: 56px;
        height: 56px;
        background: ${this.config.brandColor};
        border-radius: 50%;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        transition: transform 0.3s ease;
      }

      /* Include all previous CSS styles here */
      .chat-header {
        padding: 18px 24px;
        background: ${this.config.brandColor};
        color: white;
        border-radius: 16px 16px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      /* ... (Include all other CSS rules from previous implementation) ... */
    `;
    document.head.appendChild(style);
  }

  createChatContainer() {
    this.container = document.createElement('div');
    this.container.className = 'kyoconnect-chatbot';
    this.container.innerHTML = `
      <div class="chat-arrow-indicator"></div>
      <div class="chat-header">
        <div class="header-content">
          <img src="${this.config.iconUrl || '../resource/kyoconnectai_logo.jpg'}" 
               class="header-icon"
               alt="Chatbot Logo">
          <h3 style="margin: 0;">${this.config.title || 'KyoConnectAI Agent'}</h3>
        </div>
        <button class="close-chat">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
      <div class="chat-body"></div>
      <div class="chat-footer">
        <input type="text" class="chat-input" placeholder="Type your message...">
        <button class="send-btn">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div class="powered-by">
        Powered by <a href="https://kyoconnectai.com/" target="_blank">KyoConnectAI</a>
        | AI can make mistakes
      </div>
    `;
    document.body.appendChild(this.container);
  }

  createToggleButton() {
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'kyoconnect-toggle';
    this.toggleButton.innerHTML = `
      <img src="${this.config.iconUrl || '../resource/kyoconnectai_logo.jpg'}" 
           class="toggle-icon"
           alt="Chatbot Logo">
      <i class="fas fa-chevron-down toggle-icon arrow-icon"></i>
    `;
    document.body.appendChild(this.toggleButton);
  }

  bindEvents() {
    // Toggle events
    this.toggleButton.addEventListener('click', () => this.toggleChat());
    this.container.querySelector('.close-chat').addEventListener('click', () => this.toggleChat());
    
    // Message events
    const sendBtn = this.container.querySelector('.send-btn');
    const chatInput = this.container.querySelector('.chat-input');
    
    sendBtn.addEventListener('click', () => this.handleSend());
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSend();
    });
  }

  toggleChat() {
    const isOpen = this.container.style.display === 'flex';
    this.container.style.display = isOpen ? 'none' : 'flex';
    this.toggleButton.querySelector('img').style.opacity = isOpen ? '1' : '0';
    this.toggleButton.querySelector('.arrow-icon').style.opacity = isOpen ? '0' : '1';
    this.toggleButton.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  }

  showWelcomeMessage() {
    const welcomeMessage = this.config.welcomeMessage || "Hi! I'm your camping assistant. How can I help you today?";
    this.addMessage(welcomeMessage, false);
  }

  addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    messageDiv.innerHTML = `
      <img src="${this.config.iconUrl || '../resource/kyoconnectai_logo.jpg'}" 
           class="message-icon"
           alt="Message Icon">
      <div class="message-content">${text}</div>
    `;
    
    this.container.querySelector('.chat-body').appendChild(messageDiv);
    this.container.querySelector('.chat-body').scrollTop = this.container.querySelector('.chat-body').scrollHeight;
  }

  async handleSend() {
    const input = this.container.querySelector('.chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    this.addMessage(message, true);
    input.value = '';
    
    // Show loading
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot-message loading';
    loadingDiv.innerHTML = `
      <div class="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    this.container.querySelector('.chat-body').appendChild(loadingDiv);
    
    try {
      // Mock API call - replace with actual API
      const response = await this.mockApiCall(message);
      this.container.querySelector('.chat-body').removeChild(loadingDiv);
      this.addMessage(response, false);
    } catch (error) {
      this.container.querySelector('.chat-body').removeChild(loadingDiv);
      this.addMessage('Sorry, there was an error processing your request.', false);
    }
  }

  mockApiCall(message) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() < 0.9 ? 
          resolve(`Thanks for your message: "${message}". This is a mock response.`) : 
          reject('API Error');
      }, 1000);
    });
  }
}

// Global initialization
window.KyoConnectAI = {
  init: (config) => {
    if (!document.getElementById('kyoconnect-chatbot')) {
      new KyoConnectChatbot(config);
    }
  }
};
