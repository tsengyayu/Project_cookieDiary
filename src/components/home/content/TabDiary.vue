<template>
  <div id="root-diary">
    <!-- <div>
      <img id="testImg" src="https://firebasestorage.googleapis.com/v0/b/cookielife-de262.appspot.com/o/diary%2FSiJd74BZ84vK1yDF9Te1%2FcontentImage?alt=media&token=826e35f3-aa49-411b-b606-e03c1ecfc819" />
    </div> -->
    <div class="left" v-show="selectedDiaryId">
    <div style="background-color: blanchedalmond;width: auto;border-radius: 25px; margin-left: 10px;">
    <h1 class="leftMargin" style="padding-top: 10px">留言區</h1>
      <span v-for="doc in comments" :key="doc.id">
        <p class="leftMargin">
        {{ doc.data().name }}：{{ doc.data().comment }}
        </p>
        <!-- <p class="leftMargin">內容：{{ doc.data().comment }}</p> -->
        <p></p>
        <p></p>
      </span>
      <p class="leftMargin" style="padding-bottom: 20px">
        留言：<input v-model="message" />
        <button class="Button" @click="createMessage()">送出</button>
      </p>
      
    </div></div>
    <div class="right">
      <span v-for="doc in diaries" :key="doc.id">
        <!-- <div v-for="(doc,index) in diaryURL" :key="index"> -->
        <div>
          <img :src="contentImageMap[doc.id]" />
          <!-- </div> -->
          <!-- <div class="textRight"> -->
          <p class="fontStyle">{{ doc.data().title }}</p>
          <!-- <p></p> -->
          <p style="font-size: 6px">
            {{
              timeHelper.timestampToYYYY_MM_DD_mm(doc.data().createTime.seconds*1000)
            }}
          </p>
          <!-- <p></p> -->
          <p class="fontStyle">{{ doc.data().text }}</p>
          <p
            @click="showMessages(doc.id)"
            style="cursor: pointer; user-select: none; "
          >
            留言
          </p>
        </div>
        <hr />
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">

#root-diary{
  position: relative;
  height: 100%;
  
}
@media screen and (max-width: 2000px) {
.left {
  position: absolute;
  overflow: scroll;
  left: 0;
  top: 0;
  width: 60%;
  height: 100%;
  /* border-right: 1px black solid; */
  padding-left: 5x;
  font-family: Noto + Serif + TC;
  /* background-color: aquamarine; */
  /* background-color: blanchedalmond; */
}
.leftMargin {
  padding-left: 10px;
}
.right {
  position: absolute;
  overflow: scroll;
  top: 0;
  right: 0px;
  width: 40%;
  height: 100%;
  text-align: center;
  /* border-left: 1px black solid; */
  font-family: Noto + Serif + TC;
  /* background-color: blueviolet; */
}
.fontStyle {
  font-family: Noto + Serif + TC;
  font-weight: bolder;
  font-size: 15px;
}
img {
  margin-top: 20px;
  width: 200px;
  height: 100%;
  border: 3px black solid;
  border-radius: 10px;
}
}
@media screen and (max-width: 700px) {
.left {
  position: absolute;
  overflow: scroll;
  left: 0;
  top: 0;
  width: 60%;
  height: 100%;
  /* border-right: 1px black solid; */
  padding-left: 5x;
  // font-size: 5px;
  font-family: Noto + Serif + TC;
  /* background-color: aquamarine; */
  /* background-color: blanchedalmond; */
}
.leftMargin {
  padding-left: 10px;
}
.right {
  position: absolute;
  overflow: scroll;
  top: 0;
  right: 0px;
  width: 40%;
  height: 100%;
  text-align: center;
  /* border-left: 1px black solid; */
  font-family: Noto + Serif + TC;
  /* background-color: blueviolet; */
}
.fontStyle {
  font-family: Noto + Serif + TC;
  font-weight: bolder;
  font-size: 5px;
}
img {
  margin-top: 20px;
  width: 150px;
  height: 100%;
  border: 2px black solid;
  border-radius: 10px;
}
}
@media screen and (max-width: 450px) {
.left {
  position: absolute;
  overflow: scroll;
  left: 0;
  top: 0;
  width: 60%;
  height: 100%;
  /* border-right: 1px black solid; */
  padding-left: 5x;
  font-size: 5px;
  font-family: Noto + Serif + TC;
  /* background-color: aquamarine; */
  /* background-color: blanchedalmond; */
}
.leftMargin {
  padding-left: 10px;
}
.Button{
  margin-top: 5px;
  margin-left: 20%;
}
.right {
  position: absolute;
  overflow: scroll;
  top: 0;
  right: 0px;
  width: 40%;
  height: 100%;
  text-align: center;
  /* border-left: 1px black solid; */
  font-family: Noto + Serif + TC;
  /* background-color: blueviolet; */
}
.fontStyle {
  font-family: Noto + Serif + TC;
  font-weight: bolder;
  font-size: 5px;
}
img {
  margin-top: 20px;
  width: 100px;
  height: 100%;
  border: 2px black solid;
  border-radius: 10px;
}
}

</style>

<script setup>
import { ref, onMounted } from "vue";
import firebase from "@/tools/firebase.js";
import timeHelper from "@/tools/timeHelper.js";
import userManager from "@/tools/userManager.js";

const diaries = ref([]);
const selectedDiaryId = ref("");
const message = ref("");
const comments = ref([]);
const diaryURL = ref([]);
const contentImageMap = ref({});
const i = 0;

onMounted(() => {
  firebase.getDiaries().then((v) => {
    diaries.value = v;

    diaries.value.forEach((element) => {
      firebase.getDiaryContentImageUrl(element.id).then((v) => {
        contentImageMap.value[element.id] = v;
      });
    });
  });
});

async function createMessage() {
  const sendMessage = message.value;
  message.value = "";

  var doc = await firebase.getDiary(selectedDiaryId.value);
  if (!doc) {
    return;
  }

  // todo  enhance, ther user will not see this button when logout
  if (!userManager.getUser()) {
    return;
  }

  await firebase.createComment(
    sendMessage,
    userManager.getUser().username,
    doc.id
  );
  showMessages(selectedDiaryId.value);

  // message.value = "";
}

async function showMessages(diaryId) {
  selectedDiaryId.value = diaryId;

  // firebase.showMessages(selectedDiaryId.value).then((value) => {
  //   console.log(value);

  // });

  comments.value = await firebase.showMessages(selectedDiaryId.value);
  console.log(selectedDiaryId.value);
}
// v-for="xxx in yyy"

// yyy =>  array => [abc, rrr, tyu, rty];
</script>