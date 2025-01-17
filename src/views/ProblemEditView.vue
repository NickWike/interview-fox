<template>
  <div class="v-plane">
    <div id="editor-container">
      <div class="editor-wrapper">
        <Codemirror
          v-model="code"
          :style="{ height: '100%' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tabSize="2"
          :extensions="extensions"
        />
        <div class="language-selector">
          <button class="editor-op-btn">RUN</button>
          <button class="editor-op-btn">SUBMIT</button>
          <select v-model="selectedLanguage" @change="onLanguageChange">
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="sql">SQL</option>
          </select>
        </div>
      </div>
    </div>
    <div id="editor-output">
      <div class="output-wrapper">
        Output here...
      </div>
    </div>
  </div>
</template>

<script>
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { sql } from '@codemirror/lang-sql'
import { ref, onMounted } from 'vue'
import { EditorView } from '@codemirror/view'
import Split from 'split.js'

export default {
  name: 'ProblemEditView',
  components: {
    Codemirror
  },
  data() {
    return {
      code: '',
      selectedLanguage: 'python',
    }
  },
  setup() {
    const theme = EditorView.theme({
      '&': {
        height: '100%',
        fontSize: '14px',
      },
      '.cm-content': {
        fontFamily: '"JetBrains Mono", Consolas, "Courier New", monospace',
        caretColor: '#0e9',
        fontSmooth: 'always',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        letterSpacing: '0.3px',
      },
      '.cm-scroller': {
        lineHeight: '1.5',
      },
      '.cm-gutters': {
        backgroundColor: 'transparent',
        border: 'none',
        borderRight: '1px solid #ddd',
        color: '#999',
        fontFamily: '"JetBrains Mono", Consolas, "Courier New", monospace',
        paddingRight: '8px',
      },
      '.cm-lineNumbers': {
        color: '#999',
      },
      '.cm-gutterElement': {
        padding: '0 0px 0 0px',
      },
      '&.cm-focused .cm-cursor': {
        borderLeftColor: '#0e9'
      },
      '&.cm-focused .cm-selectionBackground': {
        backgroundColor: '#e8f2ff'
      },
      '.cm-activeLine': {
        backgroundColor: '#f8f9fa'
      }
    })

    const extensions = ref([
      theme,
      EditorView.lineWrapping,
      python()
    ])
    
    onMounted(() => {
      Split(['#editor-container', '#editor-output'], {
        direction: 'vertical',
        sizes: [60, 40],
        minSize: [300, 200],
        gutterSize: 10,
        cursor: 'row-resize'
      })
    })

    return {
      extensions
    }
  },
  methods: {
    onCodeChange(value) {
      this.code = value
    },
    onLanguageChange() {
      const languageExtensions = {
        python: python(),
        cpp: cpp(),
        java: java(),
        sql: sql(),
      }
      
      const theme = EditorView.theme({
        '&': {
          height: '100%',
          fontSize: '14px',
        },
        '.cm-content': {
          fontFamily: '"JetBrains Mono", Consolas, "Courier New", monospace',
          fontSmooth: 'always',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          letterSpacing: '0.3px',
        },
        '.cm-scroller': {
          lineHeight: '1.5'
        },
        '.cm-gutters': {
          backgroundColor: 'transparent',
          border: 'none',
          borderRight: '1px solid #ddd',
          color: '#999',
          fontFamily: '"JetBrains Mono", Consolas, "Courier New", monospace',
          paddingRight: '8px',
        }
      })

      this.extensions = [
        theme,
        EditorView.lineWrapping,
        languageExtensions[this.selectedLanguage]
      ]
    }
  },
}
</script>

<style scoped>
.v-plane {
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
}

#editor-container,
#editor-output {
  overflow: hidden;
}

.editor-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.output-wrapper {
  height: 100%;
  padding: 10px;
  background-color: #ffffff;
  overflow: auto;
}

.editor-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.language-selector {
  padding: 5px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}

.editor-op-btn {
  padding: 8px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #42b983;
  color: white;
}
.editor-op-btn:hover {
  background-color: #3aa876;
}

select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 120px;
}

:deep(.cm-editor) {
  height: calc(100% - 35px);
  background-color: #fff;
}

:deep(.cm-editor.cm-focused) {
  outline: none !important;
}

/* Split.js 相关样式 */
:deep(.gutter) {
  background-color: #eee;
  background-repeat: no-repeat;
  background-position: 50%;
}

:deep(.gutter.gutter-vertical) {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
  cursor: row-resize;
  height: 10px;
}

/* 添加字体预加载以优化性能
@font-face {
  font-family: 'Consolas';
  src: local('Consolas'), url('path/to/consolas.woff2') format('woff2');
  size-adjust: 100%;
  font-display: swap;
} */
</style>
