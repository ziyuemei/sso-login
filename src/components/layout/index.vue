<template>
  <div>
    <app-head></app-head>
    <div class="main">
      <router-view></router-view>
    </div>
    <app-foot></app-foot>
  </div>
</template>

<script>
import AppHead from "@/components/layout/AppHead.vue";
import AppFoot from "@/components/layout/AppFoot.vue";
export default {
  name: "Layout",
  components: {
    AppHead,
    AppFoot,
  },
};
</script>

<style scoped>
.main {
  min-height: 700px;
  width: 100%;
}
</style>