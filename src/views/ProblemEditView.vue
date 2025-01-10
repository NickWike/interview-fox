<template>
  <div class="editor-container">
    <Codemirror
      v-model="code"
      :options="cmOptions"
      @change="onCodeChange"
    />
    <div class="language-selector">
      <select v-model="selectedLanguage" @change="onLanguageChange">
        <!-- <option value="javascript">JavaScript</option> -->
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="sql">SQL</option>
        <!-- <option value="shell">Shell</option> -->
      </select>
    </div>
  </div>
</template>

<script>
import { Codemirror } from 'vue-codemirror'
// import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { sql } from '@codemirror/lang-sql'
// import { shell } from '@codemirror/lang-shell'
// import { oneDark } from '@codemirror/theme-one-dark'

export default {
  name: 'ProblemEditView',
  components: {
    Codemirror
  },
  data() {
    return {
      code: '',
      selectedLanguage: 'python',
      cmOptions: {
        // theme: oneDark,
        lineNumbers: true,
        line: true,
        extensions: [python()]
      }
    }
  },
  methods: {
    onCodeChange(value) {
      this.code = value
    },
    onLanguageChange() {
      // 根据选择的语言更新编辑器配置
      const languageExtensions = {
        // javascript: javascript(),
        python: python(),
        cpp: cpp(),
        java: java(),
        sql: sql(),
        // shell: shell()
      }
      
      this.cmOptions = {
        ...this.cmOptions,
        extensions: [languageExtensions[this.selectedLanguage]]
      }
    }
  }
}
</script>

<style scoped>
.editor-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.language-selector {
  padding: 10px;
  background-color: #f5f5f5;
}

select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

:deep(.cm-editor) {
  height: calc(100% - 50px); /* 减去语言选择器的高度 */
  font-family: 'Fira Code', monospace;
}
</style>
