// embed.js - Host this on your CDN
(function() {
  const CONFIG = {
    iconUrl: 'https://kyoconnectai.com/kyoconnectai_logo.jpg',
    chatWindowUrl: 'https://your-domain.com/chatbot-ui.js',
    position: 'right'
  };

  // Create container
  const container = document.createElement('div');
  container.id = 'kyoconnect-chatbot-container';
  document.body.appendChild(container);

  // Create toggle button
  const toggleBtn = document.createElement('div');
  toggleBtn.id = 'kyoconnect-chatbot-toggle';
  toggleBtn.innerHTML = `
    <img src="${CONFIG.iconUrl}" class="logo-icon">
    <div class="arrow-icon">▼</div>
  `;
  
  // Style injection
  const style = document.createElement('style');
  style.textContent = `
    #kyoconnect-chatbot-toggle {
      position: fixed;
      ${CONFIG.position}: 25px;
      bottom: 25px;
      width: 56px;
      height: 56px;
      cursor: pointer;
      z-index: 99999;
      transition: transform 0.3s ease;
    }
    
    .logo-icon {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      transition: opacity 0.3s;
    }
    
    .arrow-icon {
      position: absolute;
      ${CONFIG.position}: 0;
      bottom: 0;
      color: white;
      font-size: 24px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .chat-open .logo-icon {
      opacity: 0;
    }
    
    .chat-open .arrow-icon {
      opacity: 1;
    }
  `;

  // Load chat UI
  const script = document.createElement('script');
  script.src = CONFIG.chatWindowUrl;

  // Toggle functionality
  toggleBtn.addEventListener('click', function() {
    this.classList.toggle('chat-open');
    window.dispatchEvent(new CustomEvent('toggleChatWindow'));
  });

  document.head.appendChild(style);
  container.appendChild(toggleBtn);
  document.body.appendChild(script);
})();
