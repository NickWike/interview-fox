<template>
  <div class="problem-display">
    <div class="button-container">
      <div
        v-for="problem in problems"
        :key="problem.id"
        class="tab"
        :class="{ active: activeView === problem.id }"
        @click="setActiveView(problem.id); emitSelectedProblem(problem.name)"
      >
        {{ problem.name }}
        <div class="underline" v-if="activeView === problem.id"></div>
      </div>
    </div>
    <div class="view-area">
      <div v-if="filteredProblems.length > 0">
        <div v-for="problem in filteredProblems" :key="problem.id">
          <h2>{{ problem.name }} Content</h2>
          <div v-html="renderMarkdown(markdownData[problem.id] || '')"></div>
        </div>
      </div>
      <div v-else>
        <p>Loading problems...</p> <!-- 或者显示其他加载状态 -->
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
// import { defineEmits } from 'vue';

export default {
  name: 'ProblemDisplayView',
  emits: ['problem-selected'], // 声明事件
  data() {
    return {
      activeView: '', // 默认不显示任何视图
      problems: [], // 存储问题数据
      markdownData: {}, // 存储 Markdown 数据
    };
  },
  computed: {
    filteredProblems() {
      return this.problems.filter(problem => problem.id === this.activeView);
    },
  },
  methods: {
    setActiveView(view) {
      this.activeView = view;
    },
    emitSelectedProblem(name) {
      this.$emit('problem-selected', name); // 发出事件，传递选中的问题名称
    },
    renderMarkdown(markdown) {
      const md = new MarkdownIt();
      return md.render(markdown);
    },
    fetchProblems() {
      // Mock 数据
      const mockProblems = [
        { id: 'view1', name: 'Problem 1' },
        { id: 'view2', name: 'Problem 2' },
        { id: 'view3', name: 'Problem 3' },
      ];

      const mockMarkdownData = {
        view1: '# Problem 1\nThis is the content for Problem 1.',
        view2: '# Problem 2\nThis is the content for Problem 2.',
        view3: '# Problem 3\nThis is the content for Problem 3.',
      };

      // 设置 mock 数据
      this.problems = mockProblems;
      this.markdownData = mockMarkdownData;
      this.activeView = this.problems[0]?.id || ''; // 默认选中第一个问题
    },
  },
  mounted() {
    this.fetchProblems(); // 组件挂载时获取问题数据
  },
};
</script>

<style scoped>
.problem-display {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}

.tab {
  position: relative;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  flex: 0 1 auto;
}

.tab.active {
  color: #42b983;
}

.underline {
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #42b983;
}

.view-area {
  flex: 1;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style> 