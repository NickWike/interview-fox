<template>
  <div class="meeting-container">
    <!-- 参会人员头像区域 -->
    <div class="participants-bar">
      <div v-for="user in participants" :key="user.id" class="participant-avatar">
        <div class="avatar">{{ user.initials }}</div>
        <span class="participant-name">{{ user.name }}</span>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 视频/屏幕共享区域 -->
      <div class="video-container"  style="background-color: black;">
        <div class="screen-share">
          <div v-if="isScreenSharing" class="shared-screen">
            <img v-if="screenShareImage" :src="screenShareImage" alt="共享屏幕" />
            <div v-else class="no-share">等待共享内容...</div>
          </div>
          <div v-else class="no-share">未开始共享</div>
        </div>
      </div>

      <!-- 控制按钮区域 -->
      <div class="control-bar">
        <button class="control-btn" :class="{ active: isMicOn }" @click="toggleMic">
          <span class="icon">🎤</span>
          <span class="text">麦克风</span>
        </button>
        <button class="control-btn" :class="{ active: isCameraOn }" @click="toggleCamera">
          <span class="icon">📹</span>
          <span class="text">摄像头</span>
        </button>
        <button class="control-btn" :class="{ active: isScreenSharing }" @click="startScreenShare">
          <span class="icon">💻</span>
          <span class="text">共享</span>
        </button>
      </div>
    </div>

    <!-- 聊天区域 -->
    <div class="chat-container">
      <div class="chat-header">
        <h3>会议聊天</h3>
      </div>
      <div class="chat-messages" ref="messageContainer">
        <div v-for="message in messages" :key="message.id" 
             class="message" :class="{ 'message-self': message.isSelf }">
          <div class="message-avatar">{{ message.userInitials }}</div>
          <div class="message-content">
            <div class="message-user">{{ message.userName }}</div>
            <div class="message-text">{{ message.text }}</div>
          </div>
        </div>
      </div>
      <div class="chat-input">
        <div class="input-wrapper">
          <input type="text" 
                 v-model="newMessage" 
                 placeholder="输入消息..." 
                 @keyup.enter="sendMessage">
          <button class="send-btn" @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetingView',
  data() {
    return {
      participants: [
        { id: 1, name: 'ZS', initials: 'ZS' },
        { id: 2, name: 'LS', initials: 'LS' },
        { id: 3, name: 'WW', initials: 'WW' },
      ],
      messages: [],
      newMessage: '',
      isMicOn: true,
      isCameraOn: true,
      isScreenSharing: false,
      screenShareImage: null,
    }
  },
  methods: {
    toggleMic() {
      this.isMicOn = !this.isMicOn
    },
    toggleCamera() {
      this.isCameraOn = !this.isCameraOn
    },
    startScreenShare() {
      this.isScreenSharing = !this.isScreenSharing
    },
    sendMessage() {
      if (!this.newMessage.trim()) return
      
      this.messages.push({
        id: Date.now(),
        text: this.newMessage,
        userName: '我',
        userInitials: '我',
        isSelf: true,
        timestamp: new Date()
      })
      
      this.newMessage = ''
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>

<style scoped>
.meeting-container {
  display: flex;
  height: calc(100vh - 80px);
  background-color: #f5f7fa;
  color: #333;
}

.participants-bar {
  width: 80px;
  padding: 10px;
  background-color: #fff;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.participant-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.participant-name {
  font-size: 12px;
  text-align: center;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.video-container {
  flex: 1;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.control-bar {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
}

.control-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #f5f7fa;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  background-color: #ecf5ff;
}

.control-btn.active {
  background-color: #42b983;
  color: white;
}

.control-btn .icon {
  font-size: 20px;
}

.control-btn .text {
  font-size: 12px;
}

.chat-container {
  width: 300px;
  border-left: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.chat-header {
  padding: 15px;
  border-bottom: 1px solid #e4e7ed;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.message-self {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.message-content {
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
}

.message-self .message-content {
  background-color: #ecf5ff;
}

.message-user {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}

.chat-input {
  padding: 15px;
  border-top: 1px solid #e4e7ed;
}

.input-wrapper {
  display: flex;
  gap: 10px;
}

.input-wrapper input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
}

.input-wrapper input:focus {
  border-color: #42b983;
}

.send-btn {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-btn:hover {
  background-color: #42b983;
}

.screen-share {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-share {
  color: #909399;
  font-size: 16px;
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}
</style>
