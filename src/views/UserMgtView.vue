<template>
  <div class="user-mgt-container">
    <!-- 左侧用户列表 -->
    <div class="user-list-section">
      <div class="section-header">
        <h3>用户列表</h3>
      </div>
      <div class="user-list">
        <div v-for="user in users" 
             :key="user.id" 
             class="user-item">
          <div class="user-info">
            <div class="username">{{ user.username }}</div>
            <div class="user-detail">
              <span class="email">{{ user.email }}</span>
              <div class="time-info">
                <div class="time">创建：{{ formatTime(user.createTime) }}</div>
                <div class="time">更新：{{ formatTime(user.updateTime) }}</div>
              </div>
            </div>
          </div>
          <div class="action-buttons">
            <button class="action-btn edit" @click="editUser(user)">编辑</button>
            <button class="action-btn delete" @click="deleteUser(user)">删除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧编辑区域 -->
    <div class="edit-section">
      <div class="section-header">
        <h3>{{ isEditing ? '编辑用户' : '添加用户' }}</h3>
      </div>
      <div class="edit-form">
        <div class="form-group">
          <label>用户名</label>
          <input type="text" v-model="currentUser.username" placeholder="请输入用户名">
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="email" v-model="currentUser.email" placeholder="请输入邮箱">
        </div>
        <div class="form-group">
          <label>密码</label>
          <input type="password" v-model="currentUser.password" placeholder="请输入密码">
        </div>
        <div class="form-group">
          <label>身份</label>
          <select v-model="currentUser.role">
            <option value="interviewer">面试者</option>
            <option value="interviewee">被面试者</option>
          </select>
        </div>

        <div class="problem-list-container">
          <div class="problem-list-header">
            <h4>题目列表</h4>
            <button class="add-problem-btn" @click="addProblem">添加题目</button>
          </div>
          <div class="problem-list">
            <div v-for="(problem, index) in currentUser.problems" 
                 :key="index"
                 class="problem-item"
                 draggable="true"
                 @dragstart="dragStart(index)"
                 @dragover.prevent
                 @drop="drop(index)">
              <div class="problem-drag-handle">⋮⋮</div>
              <div class="problem-content">
                <div class="problem-number">序号 {{ index + 1 }}</div>
                <input type="text" 
                       v-model="problem.title" 
                       placeholder="请输入题目名称">
                <button class="remove-problem-btn" 
                        @click="removeProblem(index)">×</button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="cancel-btn" @click="resetForm">取消</button>
          <button class="submit-btn" @click="submitForm">
            {{ isEditing ? '保存' : '添加' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserMgtView',
  data() {
    return {
      users: [],
      currentUser: {
        username: '',
        email: '',
        password: '',
        role: 'interviewee',
        problems: [],
        createTime: null,
        updateTime: null
      },
      isEditing: false,
      draggedItemIndex: null
    }
  },
  methods: {
    formatTime(timestamp) {
      if (!timestamp) return '暂无'
      const date = new Date(timestamp)
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    },
    editUser(user) {
      this.isEditing = true
      this.currentUser = JSON.parse(JSON.stringify(user))
    },
    deleteUser(user) {
      if (confirm('确定要删除该用户吗？')) {
        this.users = this.users.filter(u => u.id !== user.id)
      }
    },
    addProblem() {
      this.currentUser.problems.push({
        title: '',
        order: this.currentUser.problems.length + 1
      })
    },
    removeProblem(index) {
      this.currentUser.problems.splice(index, 1)
    },
    dragStart(index) {
      this.draggedItemIndex = index
    },
    drop(index) {
      const problems = [...this.currentUser.problems]
      const draggedItem = problems[this.draggedItemIndex]
      problems.splice(this.draggedItemIndex, 1)
      problems.splice(index, 0, draggedItem)
      this.currentUser.problems = problems
      this.draggedItemIndex = null
    },
    resetForm() {
      this.currentUser = {
        username: '',
        email: '',
        password: '',
        role: 'interviewee',
        problems: [],
        createTime: null,
        updateTime: null
      }
      this.isEditing = false
    },
    submitForm() {
      const now = Date.now()
      if (this.isEditing) {
        const index = this.users.findIndex(u => u.id === this.currentUser.id)
        this.users[index] = { 
          ...this.currentUser,
          updateTime: now
        }
      } else {
        this.users.push({
          ...this.currentUser,
          id: Date.now(),
          createTime: now,
          updateTime: now
        })
      }
      this.resetForm()
    }
  }
}
</script>

<style scoped>
.user-mgt-container {
  display: flex;
  gap: 20px;
  padding: 10px;
  min-height: 600px;
  background-color: #f5f7fa;
}

.user-list-section,
.edit-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.user-list-section {
  width: 300px;
  overflow-y: auto;
}

.edit-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.section-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e4e7ed;
}

.section-header h3 {
  margin: 0;
  color: #333;
  font-size: 16px;
}

.user-list {
  padding: 10px;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
  border-bottom: 1px solid #e4e7ed;
}

.user-item:last-child {
  border-bottom: none;
}

.user-info {
  flex: 1;
  margin-right: 10px;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.user-detail {
  font-size: 12px;
  color: #909399;
}

.email {
  display: block;
  margin-bottom: 4px;
}

.time-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.time {
  color: #909399;
  font-size: 12px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
}

.action-btn.edit {
  background-color: #42b983;
  color: white;
}

.action-btn.delete {
  background-color: #f56c6c;
  color: white;
}

.edit-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 0;
}

.form-group {
  margin-bottom: 20px;
  padding-right: 20px;
  flex-shrink: 0;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #606266;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #42b983;
}

.problem-list-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  min-height: 0;
}

.problem-list-header {
  padding: 15px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.problem-list-header h4 {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.add-problem-btn {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.problem-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.problem-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  cursor: move;
}

.problem-drag-handle {
  padding: 10px;
  color: #909399;
  cursor: move;
}

.problem-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.problem-number {
  min-width: 60px;
  color: #606266;
}

.problem-content input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
}

.remove-problem-btn {
  padding: 4px 8px;
  background: none;
  border: none;
  color: #f56c6c;
  font-size: 16px;
  cursor: pointer;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
}

.cancel-btn,
.submit-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn {
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.submit-btn {
  background-color: #42b983;
  color: white;
}

.cancel-btn:hover {
  border-color: #c6e2ff;
  color: #42b983;
}

.submit-btn:hover {
  background-color: #3aa876;
}
</style>
