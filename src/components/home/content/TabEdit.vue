<template>
  <div id="Tab-edit">
    <!-- <p>照片<input type="file" id="testFile" accept="image/*" @change="sendImage(this.files)"></p> -->
    <p>
      照片<input
        type="file"
        id="photoFile"
        accept="image/*"
        @change="getphoto()"
      />
    </p>
    <p>標題：<textarea cols="1" class="title" v-model="diaryTitle" /></p>
    <p >內文：<textarea cols="10" class="input" v-model="diaryContent" /></p>
    <button @click="push()">發送</button>
  </div>
</template>

<style scoped lung="scss">
#Tab-edit {
  text-align: center;
  margin-top: 50px;
}
.title{
  width: 400px;
  height: 20px;
}
.input{
  width: 400px;
  height: 200px;
}
</style>

<script setup>
import { ref, onMounted } from "vue";

import firebase from "@/tools/firebase.js";

const diaryTitle = ref("");
const diaryContent = ref("");
const selectedFile = ref(null);

// const storageRef=firebase.storage().ref('/image/');
const emit = defineEmits(["subTabSelected"]);

function getphoto() {
  selectedFile.value = document.getElementById("photoFile").files[0];
  // console.log(file);
}

function sendImage(files) {
  console.log(files);

  firebase.testUpload();
}

async function push() {
  
  if (
    diaryContent.value.length < 1 ||
    diaryContent.value.length > 1000 ||
    diaryTitle.value.length < 1 ||
    diaryTitle.value.length > 20
  ) {
    alert("format error");
    return;
  }

  const diaryRef = await firebase.createDiary(diaryTitle.value, diaryContent.value);

  await firebase.testUpload('diary/'+diaryRef.id+'/contentImage', selectedFile.value);
  
  alert("文章創建成功！");
  diaryTitle.value=""
  diaryContent.value=""
  selectedFile.value=""
}
</script>