// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadString ,getDownloadURL} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuF4cljN9EPkNLRRHLOjfqEEByFdPPAL8",
  authDomain: "cookielife-de262.firebaseapp.com",
  projectId: "cookielife-de262",
  // storageBucket: "cookielife-de262.appspot.com",
  storageBucket: "gs://cookielife-de262.appspot.com",
  messagingSenderId: "92600885191",
  appId: "1:92600885191:web:4e2175538c90866f9743e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const storage = getStorage(app, "gs://cookielife-de262.appspot.com");
// const storage = getStorage(app);

async function testUpload(imageName, file) {
  const storage = getStorage(app);
  const storageRef = ref(storage, imageName);
  // uploadString(storageRef, 'test message');
  // return;

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

async function getDiaryContentImageUrl(diaryID){
  // https,http,ftp,file;
  // http,https(secure);

  // domain; 192.168.1.1   IPV4, 256 * 256 * 256 * 256
  // IPV6,  =>  


  // encrypted-tbn0.gstatic.com <=> 192.1.46.5
  // https://encrypted-tbn0.gstatic.com/ images?q=tbn:ANd9GcS_ka74-ZfUyvPutJVQOuiZ4xxEwQpFgGRcOg&usqp=CAU

  const storage = getStorage(app);

  var url = await getDownloadURL(ref(storage, 'diary/'+diaryID+'/contentImage'));

  return url;
  
  // .then((url) => {
  //   // `url` is the download URL for 'images/stars.jpg'

  
   
  //   // This can be downloaded directly:
  //   // const xhr = new XMLHttpRequest();
  //   // xhr.responseType = 'blob';
  //   // xhr.onload = (event) => {
  //   //   const blob = xhr.response;
  //   // };
  //   // xhr.open('GET', url);
  //   // xhr.send();

  //   // Or inserted into an <img> element
    // const img = document.getElementById('myimg');
    // img.setAttribute('src', url);
  // })
  // .catch((error) => {
  //   // Handle any errors
  // });

}

const db = getFirestore(app);

async function getDiary(diaryId) {

  const docRef = doc(db, "diary", diaryId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}

async function getUser(username) {

  const docRef = doc(db, "user", username);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}


async function getUsers() {
  const user = collection(db, 'user');

  const userName = await getDocs(user);

  // const results = []
  // for(var i=0; i<userName.docs.length; i++){
  //     results.push(userName.docs[i].data())
  // }
  // var a =   ['student1','student2',...,'student100']; 
  // var b = [];
  // for(var i=0; i<a.length; i++){
  //   b.push(a[i].substring(7))
  // }


  // var a =   ['student1','student2',...,'student100']; 
  // var b = a.map((e)=>e.substring(7))

  // [1, 2, 3, ..., 100]

  // return  userName.docs.map((e)=>e.data())
  return userName.docs;
}

async function createUser(userName, password) {
  await setDoc(doc(db, "user", userName), {
    password: password,
  });
}

async function createDiary(title, content) {
  const docRef = await addDoc(collection(db, "diary"), {
    title: title,
    text: content,
    createTime: serverTimestamp()
  });
  return docRef;
}

async function createComment(comment, userName, diaryId) {
  console.log('createComment')
  console.log(comment)
  console.log(userName)
  console.log(diaryId)
  const docRef = await addDoc(collection(db, "diary/" + diaryId + "/comment"), {
    name: userName,
    comment: comment
  });
}

async function getDiaries() {
  const snapShot = await getDocs(collection(db, 'diary'));
  return snapShot.docs;
}

async function showMessages(diaryId) {
  const snapShot = await getDocs(collection(db, "diary/" + diaryId + "/comment"));
  return snapShot.docs;
}


// todo delete
const a = 1;
const b = 3;


export default {
  getUsers,
  getUser,
  createUser,
  createDiary,
  getDiaries,
  getDiary,
  createComment,
  showMessages,
  testUpload,
  getDiaryContentImageUrl: getDiaryContentImageUrl

}