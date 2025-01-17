<template>
  <div class="problem-mgt-container">
    <!-- 左侧问题列表 -->
    <div class="problem-list-section">
      <div class="section-header">
        <h3>问题列表</h3>
        <button class="add-btn" @click="addNewProblem">新增</button>
      </div>
      <div class="problem-list">
        <div v-for="problem in problems" 
             :key="problem.id" 
             class="problem-item"
             :class="{ active: currentProblem?.id === problem.id }"
             @click="selectProblem(problem)">
          <div class="problem-info">
            <div class="problem-title">{{ problem.title }}</div>
            <div class="problem-meta">
              <span class="difficulty" :class="problem.difficulty">
                {{ problem.difficulty }}
              </span>
              <div class="tags">
                <span v-for="tag in problem.tags" 
                      :key="tag" 
                      class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧编辑区域 -->
    <div class="edit-section" v-if="currentProblem">
      <div class="edit-header">
        <div class="basic-info">
          <input type="text" 
                 v-model="currentProblem.title" 
                 placeholder="问题名称"
                 class="title-input">
          
          <div class="problem-config">
            <select v-model="currentProblem.difficulty" class="difficulty-select">
              <option value="简单">简单</option>
              <option value="中等">中等</option>
              <option value="困难">困难</option>
              <option value="地狱">地狱</option>
            </select>

            <div class="language-select">
              <div class="select-label">限制语言：</div>
              <div class="language-options">
                <label v-for="lang in availableLanguages" 
                       :key="lang" 
                       class="language-option">
                  <input type="checkbox" 
                         :value="lang" 
                         v-model="currentProblem.languages">
                  {{ lang }}
                </label>
              </div>
            </div>

            <div class="tags-input">
              <div class="select-label">标签：</div>
              <div class="tags-container">
                <span v-for="tag in currentProblem.tags" 
                      :key="tag" 
                      class="tag">
                  {{ tag }}
                  <span class="remove-tag" @click="removeTag(tag)">×</span>
                </span>
                <input type="text" 
                       v-model="newTag" 
                       @keyup.enter="addTag" 
                       placeholder="输入标签后回车"
                       class="tag-input">
              </div>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="preview-toggle" @click="togglePreview">
            {{ showPreview ? '隐藏预览' : '显示预览' }}
          </button>
          <button class="save-btn" @click="saveProblem">保存</button>
        </div>
      </div>

      <div class="editor-container">
        <div class="markdown-editor" :style="editorStyle">
          <textarea 
            v-model="currentProblem.content" 
            placeholder="请输入问题描述（支持 Markdown 格式）"
            class="markdown-textarea"></textarea>
        </div>

        <div class="resize-handle" 
             v-if="showPreview"
             @mousedown="startResize"></div>

        <div class="markdown-preview" 
             v-if="showPreview"
             :style="previewStyle">
          <!-- 这里需要使用 markdown 渲染组件 -->
          <MarkdownText :content="currentProblem?.content"></MarkdownText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 假设使用 marked 来渲染 markdown
import MarkdownText from '@/components/MarkdownText.vue';

export default {
  name: 'ProblemMgtView',
  components: {
    MarkdownText
  },
  data() {
    return {
      problems: [],
      currentProblem: null,
      newTag: '',
      showPreview: true,
      editorWidth: 50, // 编辑器宽度百分比
      isDragging: false,
      availableLanguages: ['Java', 'Python', 'Shell', 'C++', 'SQL']
    }
  },
  computed: {
    editorStyle() {
      return {
        width: this.showPreview ? `${this.editorWidth}%` : '100%'
      }
    },
    previewStyle() {
      return {
        width: `${100 - this.editorWidth}%`
      }
    }
  },
  methods: {
    addNewProblem() {
      const problem = {
        id: Date.now(),
        title: '',
        difficulty: '中等',
        languages: [],
        tags: [],
        content: '',
        createTime: Date.now(),
        updateTime: Date.now()
      }
      this.problems.push(problem)
      this.selectProblem(problem)
    },
    selectProblem(problem) {
      this.currentProblem = JSON.parse(JSON.stringify(problem))
    },
    addTag() {
      if (this.newTag.trim() && !this.currentProblem.tags.includes(this.newTag.trim())) {
        this.currentProblem.tags.push(this.newTag.trim())
      }
      this.newTag = ''
    },
    removeTag(tag) {
      this.currentProblem.tags = this.currentProblem.tags.filter(t => t !== tag)
    },
    togglePreview() {
      this.showPreview = !this.showPreview
    },
    startResize(e) {
      console.log('startResize', e)
      this.isDragging = true
      document.addEventListener('mousemove', this.handleResize)
      document.addEventListener('mouseup', this.stopResize)
    },
    handleResize(e) {
      if (!this.isDragging) return
      const container = e.target.closest('.editor-container')
      const containerRect = container.getBoundingClientRect()
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100
      this.editorWidth = Math.min(Math.max(20, newWidth), 80)
    },
    stopResize() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.handleResize)
      document.removeEventListener('mouseup', this.stopResize)
    },
    saveProblem() {
      const index = this.problems.findIndex(p => p.id === this.currentProblem.id)
      if (index !== -1) {
        this.currentProblem.updateTime = Date.now()
        this.problems[index] = { ...this.currentProblem }
      }
      // TODO: 调用保存 API
    }
  }
}
</script>

<style scoped>
.problem-mgt-container {
  display: flex;
  gap: 10px;
  padding: 10px;
  height: calc(100vh - 90px);
  background-color: #f5f7fa;
}

.problem-list-section {
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.section-header {
  padding: 15px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-btn {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.problem-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.problem-item {
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  border-bottom: 1px solid #e4e7ed;
}

.problem-item:hover {
  background-color: #f5f7fa;
}

.problem-item.active {
  background-color: #ecf5ff;
}

.problem-title {
  font-size: 14px;
  margin-bottom: 8px;
}

.problem-meta {
  display: flex;
  gap: 8px;
  align-items: center;
}

.difficulty {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.difficulty.简单 { background-color: #67C23A; color: white; }
.difficulty.中等 { background-color: #E6A23C; color: white; }
.difficulty.困难 { background-color: #F56C6C; color: white; }
.difficulty.地狱 { background-color: #000000; color: white; }

.edit-section {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.edit-header {
  padding: 15px;
  border-bottom: 1px solid #e4e7ed;
}

.basic-info {
  margin-bottom: 15px;
  padding-right: 20px;
}

.title-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 15px;
}

.problem-config {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.difficulty-select {
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.language-select,
.tags-input {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.select-label {
  white-space: nowrap;
  color: #000000;
  font-weight: bold
}

.language-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.tags-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #000000;
}

.tag {
  padding: 2px 8px;
  background-color: #ecf5ff;
  border-radius: 4px;
  font-size: 12px;
  color: #409eff;
  display: flex;
  align-items: center;
  gap: 4px;
}

.remove-tag {
  cursor: pointer;
}

.tag-input {
  border: none;
  outline: none;
  padding: 2px 4px;
  width: 120px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.preview-toggle,
.save-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.preview-toggle {
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.save-btn {
  background-color: #42b983;
  color: white;
  border: none;
}

.editor-container {
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
}

.markdown-editor,
.markdown-preview {
  height: 100%;
  overflow-y: auto;
}

.markdown-textarea {
  width: 100%;
  height: 100%;
  padding: 15px;
  border: none;
  resize: none;
  outline: none;
  font-family: monospace;
}

.resize-handle {
  width: 4px;
  background-color: #e4e7ed;
  cursor: col-resize;
  transition: background-color 0.3s;
}

.resize-handle:hover {
  background-color: #42b983;
}

.markdown-preview {
  padding: 15px;
  border-left: 1px solid #e4e7ed;
}
</style>
