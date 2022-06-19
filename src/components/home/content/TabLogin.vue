<template>
  <div id="Tab-Login">
    <div class="diamod"></div>
    <!-- contentType == 1 是登入 -->
    <div class="login-region" v-show="contentType == 1">
      <h1>Sign in</h1>
      <p>userName： <input v-model="userName" /></p>
      <p>passWord：<input v-model="password" /></p>
      <br />
      <button @click="login(password)">login</button>
      <h3>
        還沒有帳號？ 請按：<span
          @click="changeContentType(2)"
          style="cursor: pointer; user-select: none"
          >創建</span
        >
      </h3>
    </div>
    <!-- contentType == 2 是註冊 -->
    <div class="register-region" v-show="contentType == 2">
      <h1>Create</h1>
      <p>userName： <input v-model="userName" /></p>

      <p>passWord：<input v-model="password" /></p>
      <br />
      <button @click="create">create</button>
      <!-- <h3>{{message}}</h3> -->
      <h3>
        已有帳號，請按：
        <span
          @click="changeContentType(1)"
          style="cursor: pointer; user-select: none"
          >登入</span
          >
      </h3>
    </div>

    <div class="register-region" v-show="contentType == 3">
      <h3>您已登入</h3>
      <button @click="logout">登出</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";

import firebase from "@/tools/firebase.js";
import userManager from "@/tools/userManager.js";

const userName = ref("");
const password = ref("");

const contentType = ref(1);
const emit = defineEmits(["subTabSelected"]);

const subselectedTabIndex = ref(0);

onMounted(() => {
  /// test code
  var lastUser = userManager.getUser();
  if (lastUser) {
    userName.value = lastUser.username;
    contentType.value = 3;
  }
});

function changeContentType(type) {
  //轉換登入和註冊頁面
  contentType.value = type;
}

// vue3  -> provide/inject
// vuex  -> 


function subTabSelected(index) {
  //菜單跳轉頁面
  subselectedTabIndex.value = index;
  emit("subTabSelected", index);
}


const setContentEditShow = inject('setContentEditShow');


async function login(password) {
  var doc = await firebase.getUser(userName.value);
  if (!doc) {
    alert("login failed");
    return;
  }
  if(doc.data().password!=password){
    alert("login failed");
    return;
  }
  // todo memory login info
 // todo change other hint example toast
 alert("login success")
  userManager.updateUser(doc.id);
  contentType.value = 3;
  console.log(doc.data().password);
  setContentEditShow(doc.id == 'cookie');

  // var docs = await firebase.getUsers();

  // for (var i = 0; i < docs.length; i++) {
  //   var id = docs[i].id;
  //   var data = docs[i].data();
  //   if (userName.value == id) {
  //     if (password.value == data["password"]) {
  //       console.log("登入成功");
  //       console.log(userName.value);
  //       console.log(password.value);
  //     }
  //     return;
  //   }
  // }
}

function _isValidInput(input) {
  for (var i = 0; i <= input.length; i++) {
    var code = input.charCodeAt(i);
    // 0 => 48, A => 65, a => 97
    if (code < 48 || (code > 57 && code < 65) || (code > 90 && code < 97)) {
      alert("number or English only");
      return false;
    }
  }
  return true;
}

async function create() {
  console.log(userName.value);
  console.log(password.value);

  // 0. todo 檢查輸入資料的格式
  if (
    userName.value.length < 1 ||
    userName.value.length > 20 ||
    password.value.length < 1 ||
    password.value.length > 20
  ) {
    alert("format error");
    return;
  }
  if (!_isValidInput(userName.value) || !_isValidInput(password.value)) {
    return;
  }

  // 1. 獲取使用者資料
  // firebase.getUsers().then((value)=>{
  //   value.forEach(element => {
  //     console.log(element.id)
  //     console.log(element.data())
  //   });
  // });

  // networkfunction().then((e) => {
  //   e.net2.then((e2) => {
  //     e2.net3.then((e3) => {
  //       e2.net3.then((e3) => {
  //         e2.net3.then((e3) => {
  //           e2.net3.then((e3) => {});
  //         });
  //       });
  //     });
  //   });
  // });

  var docs = await firebase.getUsers();

  // 2.檢查是否重
  for (var i = 0; i < docs.length; i++) {
    var id = docs[i].id;
    var data = docs[i].data();

    if (userName.value == id) {
      alert("帳號已有人使用，請重新輸入");
      // todo 重新輸入
      return;
    }
  }

  // 3.將資料新增進資料庫
  firebase.createUser(userName.value, password.value);
}

function logout() {
  userManager.logout();
  contentType.value = 1;
  userName.value = null;
  password.value = null;

   setContentEditShow(false)
}
</script>
 <style lang="scss" scoped>
#Tab-Login {
  text-align: center;
  padding-top: 100px;
.diamod {
  position: absolute;
  top: 120px;
  left: 465px;
  z-index: -1;
  width: 400px;
  height: 400px;
  background: burlywood;
  transform: rotate(45deg);
  margin: 50px;
}
  //     .btn{
  //     display: flex;
  //     justify-content: start;
  //     align-items: center;
  //     height: 69px;
  //     width: 100%;
  //     background-color: burlywood;
  //     }
  //     .login{
  //     display: flex;
  //     background-color: orange;
  //     /* width: 100%;
  //     height: calc(100% - 69px); */
  //     /* justify-content: center; */
  //     .left{
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;
  //     justify-content: center;
  //     position: absolute;
  //     height: calc(100 - 69px);
  //     width: 40%;
  //     /* background-color: blueviolet; */
  //     }
  //     }
}
</style>

