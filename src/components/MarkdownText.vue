<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  name: 'MarkdownText',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    renderedContent() {
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true
      });
      return md.render(this.content);
    }
  }
}
</script>

<style>
.markdown-content {
  color: #2c3e50;
  line-height: 1.6;
  word-wrap: break-word;
  padding: 10px 0;
}

/* 标题样式 */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-content h1 {
  font-size: 2em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}

.markdown-content h2 {
  font-size: 1.5em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}

.markdown-content h3 {
  font-size: 1.25em;
}

/* 段落和列表样式 */
.markdown-content p,
.markdown-content ul,
.markdown-content ol {
  margin-bottom: 16px;
}

.markdown-content ul,
.markdown-content ol {
  padding-left: 2em;
}

.markdown-content ul ul,
.markdown-content ul ol,
.markdown-content ol ul,
.markdown-content ol ol {
  margin-bottom: 0;
}

/* 代码块样式 */
.markdown-content pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 6px;
  margin-bottom: 16px;
}

.markdown-content code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27,31,35,0.05);
  border-radius: 6px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}

.markdown-content pre code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

/* 表格样式 */
.markdown-content table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 16px;
}

.markdown-content table th,
.markdown-content table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.markdown-content table th {
  font-weight: 600;
  background-color: #f6f8fa;
}

.markdown-content table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

/* 引用样式 */
.markdown-content blockquote {
  margin: 0 0 16px;
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

.markdown-content blockquote > :first-child {
  margin-top: 0;
}

.markdown-content blockquote > :last-child {
  margin-bottom: 0;
}

/* 链接样式 */
.markdown-content a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

/* 图片样式 */
.markdown-content img {
  max-width: 100%;
  box-sizing: border-box;
  margin: 12px 0;
}

/* 水平线样式 */
.markdown-content hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}

/* 任务列表样式 */
.markdown-content input[type="checkbox"] {
  margin-right: 0.5em;
  margin-top: 0;
}
</style>
