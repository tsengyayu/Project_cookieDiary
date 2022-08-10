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
  height: 69px;
  background-color: burlywood;
  // position: fixed;
  // top: 0px;
    @media screen and (max-width: 2000px) {
.btn {
    display: inline-block;
    margin: 0 20px;
    line-height: 69px;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
    }
        @media screen and (max-width: 450px) {
.btn {
    display: inline-block;
    margin: 0 10px;
    font-size: 5px;
    line-height: 69px;
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
    }
}
</style>

<script setup>
import { ref, onMounted , inject, computed, watch} from "vue";
const emit = defineEmits(["onTabSelected"]);



const selectedTabIndex = ref(0);
const setContentEditShow = inject('setContentEditShow');
const isContentEditShow = inject('isContentEditShow')
// watch(isContentEditShow, (newValue)=>{
// console.log('isContentEditShow watch ' + isContentEditShow.value)
// })
// onMounted(()=>{
//   var doc = await firebase.getUser(userName.value);
//   setContentEditShow(doc.id == 'cookie');
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