<template>

  <div class="problem-container">
    <div class="s-plane">
        <div id="plane-1">
            <ProblemDisplayView @problem-selected="updateSelectedProblem" />
        </div>
        <div id="plane-2">
            <h3>Selected {{ selectedProblemName }}</h3>
            <!-- <p>{{ selectedProblemName }}</p> -->
            <ProblemEditView />
        </div>
      </div>
  </div>

  <!-- <div class="problem-container">
    <div class="view1" :style="{ width: leftWidth + '%' }">
      <ProblemDisplayView @problem-selected="updateSelectedProblem" />
    </div>
    <div class="view2">
      <h2>Selected Problem</h2>
      <p>{{ selectedProblemName }}</p>
    </div>
  </div> -->
</template>

<script>
import ProblemDisplayView from './ProblemDisplayView.vue';
import Split from 'split.js';
import ProblemEditView from './ProblemEditView.vue';

export default {
  name: 'ProblemContainer',
  components: {
    ProblemDisplayView,
    ProblemEditView
  },
  data() {
    return {
      selectedProblemName: ''
    };
  },
  methods: {
    updateSelectedProblem(name) {
      this.selectedProblemName = name;
    }
  },
  mounted() {
    Split(['#plane-1', '#plane-2'], {
      sizes: [50, 50],
      minSize: [200, 300],
      gutterSize: 10,
      cursor: 'col-resize',
      // gutter: (index, direction) => {
      //   const gutter = document.createElement('div');
      //   gutter.className = `gutter gutter-${direction}`;
      //   return gutter;
      // },
    });
  }
};
</script>

<style scoped>
.problem-container {
  height: calc(100vh - 80px);
  background-color: #ffffff;
  margin: 5px;
  border-radius: 5px;
}

.s-plane {
  display: flex;
  flex-direction: row;
  height: 100%;
}

#plane-1,
#plane-2 {
  height: 100%;
}

:deep(.gutter){
  background-color: #eee;
  background-repeat: no-repeat;
  background-position: 50%;
}

:deep(.gutter.gutter-horizontal) {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
  cursor: col-resize;
  width: 10px;
}
</style>
