<template>
  <div id="home-root">
    <TopTabRegion id="top-tab-region" @on-tab-selected="onTabSelected" />
    <div class="content-region">
      <TabHome v-show="selectedTabIndex == 0" />
      <TabLogin
        v-show="selectedTabIndex == 1"
        @on-tab-selected="subTabSelected"
      />
      <TabDiary
        v-show="selectedTabIndex == 2"
        @on-tab-selected="subTabSelected"
      />
      <TabEdit
        v-show="selectedTabIndex == 3"
        @on-tab-selected="subTabSelected"
      />
    </div>

    <!-- <div class="content-region">
      <TabCreate v-show="subselectedTabIndex == 0" />
    </div> -->
  </div>
  <!-- <Content/> -->
</template>

<script setup>
import TopTabRegion from "@/components/home/TopTabRegion.vue";
import TabHome from "@/components/home/content/TabHome.vue";
import TabLogin from "@/components/home/content/TabLogin.vue";
import TabEdit from "@/components/home/content/TabEdit.vue";
import TabDiary from "@/components/home/content/TabDiary.vue";
import TabCreate from "@/components/home/content/TabCreate.vue";
import userManager from "@/tools/userManager.js";
import { ref, onMounted, provide } from "vue";

const isContentEditShow = ref(false);

provide("isContentEditShow", isContentEditShow);

provide("setContentEditShow", setContentEditShow);

 
onMounted(() => {
  var lastUser = userManager.getUser();
  if ( lastUser && lastUser.username == "cookie"  ) {
    setContentEditShow(true);
  }
});

function setContentEditShow(isShow) {
  console.log("isShow" + isShow);
  isContentEditShow.value = isShow;
}

const selectedTabIndex = ref(0);
const subselectedTabIndex = ref(0);

function onTabSelected(index) {
  selectedTabIndex.value = index;
}

function subTabSelected(index) {
  subselectedTabIndex.value = index;
}
</script>

<style scoped lang="scss">
#home-root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  #top-tab-region {
    height: 69px;
    width: 100%;
  }
  .content-region {

    width: 100%;
    height: calc(100% - 69px);
  }
}
</style>