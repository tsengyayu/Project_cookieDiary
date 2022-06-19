<template>
  <div>
    <!-- <div>
      <img id="testImg" src="https://firebasestorage.googleapis.com/v0/b/cookielife-de262.appspot.com/o/diary%2FSiJd74BZ84vK1yDF9Te1%2FcontentImage?alt=media&token=826e35f3-aa49-411b-b606-e03c1ecfc819" />
    </div> -->
    <div class="left" v-show="selectedDiaryId">
      <span class="leftMargin" v-for="doc in comments" :key="doc.id">
        <p style="color: blue">姓名：{{ doc.data().name }}</p>
        <p>內容：{{ doc.data().comment }}</p>
        <p></p>
        <p></p>
      </span>
      <p class="leftMargin">
        留言：<input v-model="message" />
        <button @click="createMessage()">送出</button>
      </p>
    </div>
    <div class="right">
      <span v-for="doc in diaries" :key="doc.id">
        <!-- <div v-for="(doc,index) in diaryURL" :key="index"> -->
        <div class="textLeft">
          <img :src="contentImageMap[doc.id]" />
        </div>
        <div class="textRight">
        <p class="fontStyle">{{ doc.data().title }}</p>
        <!-- <p></p> -->
        <p style="font-size:6px">{{ timeHelper.timestampToYYYY_MM_DD_mm(doc.data().createTime.seconds) }}</p>
        <!-- <p></p> -->
        <p class="fontStyle" >{{ doc.data().text }}</p>
        <p
          @click="showMessages(doc.id)"
          style="cursor: pointer; user-select: none;padding-left:500px"
        >
          留言
        </p>
        </div>
        <hr />
      </span>
    </div>
  </div>
</template>

<style scoped lung="scss">
.left {
  position: absolute;
  width: 60%;
  height: 100%;
  border-right: 1px black solid;
  padding-left: 5x;
  font-family: Noto+Serif+TC;
}
.leftMargin{
  padding-left: 5px;
}
.right {
  position: absolute;
  right: 0px;
  width: 40%;
  height: 100%;
  text-align: center;
  border-left: 1px black solid;
  font-family: Noto+Serif+TC;
}
.textLeft{
  /* background-color: aqua; */
  }
  .textRight{
  /* background-color: blueviolet; */
  }
.fontStyle{
  font-family: Noto+Serif+TC;
  font-weight: bolder;
  font-size: 15px;
}
img{
  margin-top: 20px;
  width: 200px;
  height: 300px;
  border: 3px black solid;
  border-radius: 10px;
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


    // for(var i=0; i<diaries.value.length; i++){
    //   var element = diaries.value[i];
    //   firebase.testDownload( diaries.value[i].id).then((v) => {
    //     diaryURL.value = v;
    //     console.log(diaryURL.value);
    //   });
    // }



    diaries.value.forEach((element) => {
      firebase.testDownload(element.id).then((v) => {
        console.log('contentImage URL:');
        console.log(v);
        contentImageMap.value[element.id] = v;
        // diaryURL.value = v;
        // console.log(diaryURL.value);
      });
    });
  });

  //    firebase.testDownload('SiJd74BZ84vK1yDF9Te1').then((v)=>{
  // console.log(v)
  //   });
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