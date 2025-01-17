<template>
  <div>
    <div
      id="floating-button"
      @mousedown="startDrag"
      @click="handleClick"
      @mouseenter="onButtonMouseEnter"
      @mouseleave="onButtonMouseLeave"
      :style="{ 
        left: position.x + 'px', 
        top: position.y + 'px',
        transition: isDragging ? 'none' : 'all 0.3s ease'
      }"
    >
      <span>Chat</span>
    </div>
    <div
      id="panel"
      v-if="isPanelOpen"
      :style="{ left: panelPosition.x + 'px', top: panelPosition.y + 'px' }"
    >
      <div class="panel-header">
        <div class="header-title">对话</div>
        <div class="header-controls">
          <span class="control-btn">−</span>
          <span class="control-btn">□</span>
          <span class="control-btn close" @click="togglePanel">×</span>
        </div>
      </div>
      <div class="panel-content">
        <div class="chat-container">
          <!-- AI 消息 -->
          <div class="message ai-message" v-for="(message, index) in messages" :key="index">
            <!-- AI 消息 -->
            <template v-if="!message.isUser">
              <div class="avatar">AI</div>
              <div class="message-content">
                <div class="message-text">{{ message.content }}</div>
              </div>
            </template>
            <!-- 用户消息 -->
            <template v-else>
              <div class="message-content user-message">
                <div class="message-text">{{ message.content }}</div>
              </div>
              <div class="avatar user-avatar">ME</div>
            </template>
          </div>
        </div>
        <div class="input-container">
          <input 
            type="text" 
            placeholder="请输入您想知道的问题点击，使用 Shift + Enter 换行"
            v-model="inputMessage"
            @keyup.enter="sendMessage"
          >
          <button class="send-btn" @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPanelOpen: false,
      isDragging: false,
      inputMessage: '',
      isHovered: false,
      messages: [
        {
          content: '您好，很抱歉相关法规要求，您需要登录后与 AI 助手进行更多对话。还没有账号，为您提供快速注册入口。',
          isUser: false
        }
      ],
      position: {
        x: window.innerWidth - 100,
        y: window.innerHeight - 100
      },
      panelPosition: {
        x: 0,
        y: 0
      },
      lastClickTime: 0,
      isDragged: false,
    };
  },
  methods: {
    handleClick() {
      if (!this.isDragged) {
        this.togglePanel();
      }
      this.isDragged = false;
    },
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen;
      if (this.isPanelOpen) {
        this.calculatePanelPosition();
      }
    },
    startDrag(event) {
      if (event.button !== 0) return;
      this.isDragging = true;
      this.isDragged = false;
      this.offsetX = event.clientX - this.position.x;
      this.offsetY = event.clientY - this.position.y;
  
      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('mouseup', this.stopDrag);
    },
    onDrag(event) {
      if (this.isDragging) {
        this.isDragged = true;
        this.position.x = event.clientX - this.offsetX;
        this.position.y = event.clientY - this.offsetY;
      }
    },
    stopDrag() {
      this.isDragging = false;
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.stopDrag);
      
      if (this.isDragged) {
        this.adjustButtonPosition();
      }
    },
    calculatePanelPosition() {
      const buttonRect = this.$el.querySelector('#floating-button').getBoundingClientRect();
      const panelWidth = 400;
      const panelHeight = 600;
  
      let x = buttonRect.left;
      let y = buttonRect.top;
  
      if (x + panelWidth > window.innerWidth) {
        x = buttonRect.left - panelWidth;
      }
  
      if (y + panelHeight > window.innerHeight) {
        y = window.innerHeight - panelHeight;
      }
  
      if (x < 0) {
        x = 0;
      }
  
      if (y < 0) {
        y = 0;
      }
  
      this.panelPosition = { x, y };
    },
    adjustButtonPosition() {
      const buttonWidth = 40;
      const threshold = 20;
  
      if (!this.isDragging && !this.isHovered) {
        let shouldHide = false;
        
        if (this.position.x > window.innerWidth - buttonWidth - threshold) {
          this.position.x = window.innerWidth - threshold;
          shouldHide = true;
        }
        if (this.position.x < threshold) {
          this.position.x = -buttonWidth + threshold;
          shouldHide = true;
        }
        if (this.position.y > window.innerHeight - buttonWidth - threshold) {
          this.position.y = window.innerHeight - threshold;
          shouldHide = true;
        }
        if (this.position.y < threshold) {
          this.position.y = -buttonWidth + threshold;
          shouldHide = true;
        }

        if (!shouldHide) {
          if (this.position.x < 0) this.position.x = 5;
          if (this.position.x > window.innerWidth - buttonWidth) this.position.x = window.innerWidth - buttonWidth - 5;
          if (this.position.y < 0) this.position.y = 5;
          if (this.position.y > window.innerHeight - buttonWidth) this.position.y = window.innerHeight - buttonWidth - 5;
        }
      }
    },
    onButtonMouseEnter() {
      this.isHovered = true;
      const buttonWidth = 40;
      const threshold = 20;
  
      if (this.position.x > window.innerWidth - buttonWidth - threshold) {
        this.position.x = window.innerWidth - buttonWidth - 5;
      }
      if (this.position.x < 0) {
        this.position.x = 5;
      }
      if (this.position.y > window.innerHeight - buttonWidth - threshold) {
        this.position.y = window.innerHeight - buttonWidth - 5;
      }
      if (this.position.y < 0) {
        this.position.y = 5;
      }
    },
    onButtonMouseLeave() {
      this.isHovered = false;
      if (!this.isPanelOpen) {
        this.adjustButtonPosition();
      }
    },
    sendMessage() {
      if (!this.inputMessage.trim()) return;

      // 添加用户消息
      this.messages.push({
        content: this.inputMessage,
        isUser: true
      });

      // 模拟 AI 回复
      setTimeout(() => {
        this.messages.push({
          content: `收到您的消息：${this.inputMessage}`,
          isUser: false
        });
      }, 1000);

      // 清空输入框
      this.inputMessage = '';

      // 滚动到底部
      this.$nextTick(() => {
        const container = document.querySelector('.chat-container');
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.adjustButtonPosition();
      if (this.isPanelOpen) {
        this.calculatePanelPosition();
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustButtonPosition);
  }
}
</script>

<style scoped>
#floating-button {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color: #42b983;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  user-select: none;
  z-index: 1000;
  transition: all 0.3s ease;
}

#panel {
  position: fixed;
  width: 400px;
  height: 600px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.header-title {
  font-weight: 500;
  color: #333;
}

.header-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  cursor: pointer;
  padding: 0 4px;
}

.control-btn.close {
  color: #666;
}

.control-btn.close:hover {
  color: #333;
}

.panel-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  scroll-behavior: smooth;
}

.message {
  display: flex;
  margin-bottom: 20px;
  gap: 12px;
  width: 100%;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #0064c8;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}

.message-content {
  max-width: 80%;
}

.user-message {
  margin-left: auto;
}

.user-message .message-text {
  background-color: #0064c8;
  color: white;
}

.user-avatar {
  background-color: #28a745;
}

.message-text {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.quick-questions {
  margin-top: 16px;
}

.question {
  color: #0064c8;
  cursor: pointer;
  padding: 8px 0;
  font-size: 14px;
}

.question:hover {
  text-decoration: underline;
}

.input-container {
  border-top: 1px solid #eee;
  padding: 16px;
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
}

input:focus {
  border-color: #0064c8;
}

.send-btn {
  padding: 8px 16px;
  background-color: #0064c8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.send-btn:hover {
  background-color: #0056b3;
}
</style>