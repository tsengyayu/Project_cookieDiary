<template>
  <div class="tab-root">
    <div
      class="btn"
      v-for="(tabName, index) in tabNames"
      :key="tabName"
      @click="onTabSelected(index)"
    >
      {{ tabName }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-root {
  // display: flex;
  // justify-content: start;
  // height: 69px;
  // width: 100%;
  background-color: burlywood;
  // background-color: #F2AB39;

  // position: fixed;
  // top: 0px;
  .btn {
    display: inline-block;
    margin: 0 20px;
    // color: white;
    line-height: 69px;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
}
</style>

<script setup>
import { ref, onMounted , inject, computed, watch} from "vue";
const emit = defineEmits(["onTabSelected"]);


const selectedTabIndex = ref(0);

const isContentEditShow = inject('isContentEditShow')
// watch(isContentEditShow, (newValue)=>{
// console.log('isContentEditShow watch ' + isContentEditShow.value)
// })

const tabNames = computed(()=>{
 if(isContentEditShow.value){
   return ["首頁", "創建/登入", " 生活日記", "內容編輯"]
 }else{
   return ["首頁", "創建/登入", " 生活日記"]
 }
})

function onTabSelected(index) {
  selectedTabIndex.value = index;
  console.log(index);
  emit("onTabSelected", index);
}




</script>