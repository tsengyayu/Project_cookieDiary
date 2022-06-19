<template>
  <div id="tab-home-root">
    <div class="top">
      <img src="@/components/home/content/Pictures/pic-1.jpeg" alt="不好意思，本柴害羞，暫時不見人" />
      <h1 style="font-family: Festive">Cookie</h1>
    </div>
    <div class="bottom">
      <div class="data bottom-bgcolor">
        <h2>姓名：Cookie</h2>
        <h2>年齡：3</h2>
        <h2>生日：12月1號</h2>
        <h2>體重：7公斤</h2>
        <h2>特徵：脖子戴著白圍巾，腳上穿著白襪襪，每天只會憨笑</h2>
      </div>
    </div>

    <div class="picture">
        <div class="circle-test" v-for="num in [1,2,3]" :key="num">
             <!-- <img  :src="'bottom-pic-'+num+'.jpeg'" /> -->
              <img  :src="getImgPath(num)" /> 
        </div>
    </div>

    <div class="picture">
      <div class="circle-test" v-for="num in [4,5]" :key="num">
        <!-- <img :src="`bottom-pic-${num}.jpeg`" />  -->
        <img  :src="getImgPath(num)" />
      </div>
    </div>
    
  

    <div class="intro bottom-bgcolor" style="margin-top: 50px">
      <p>
        汪汪...大家好我叫曾cookie，是一隻柴柴，三年前來到這個家後每天就過著皇帝般的生活。
        <br />因為飼料乾巴巴的，好難吃，所以每天都有鮮食，雖然我還是那麼瘦。
        <br />本來我每天到規定時間就要被關回家睡覺，但是依靠我的笑容和堅持不懈的精神，終於整個一樓都是我的地盤了！
        <br />每天晚上都是我的散步時間，在路上我都會看到我的小黑朋友，我一直想要找他們玩，但他們都不理我讓我好難過。
        <br />即使這樣，我還是有愛我的家人每天陪我玩。
        <br />因為過著這種悠閒的生活，所以我每天都會笑著對待每一個人，希望帶給大家幸福。
      </p>
    </div>
    <div class="special" style="margin-top: 50px">
      <div class="special-text">
        <h2>特長：</h2>
        <h3>🌟咬人</h3>
        <p>
          不用懷疑，這就是我的特長之一，我最會跟在別人後面去咬他們的小腿了，<br />
          但是我不是要去傷害別人，我只是想要引起別人的注意，讓他們可以抱抱我，<br />
          跟我玩，注意力無時無刻都在我身上。
        </p>
        <h3>🌟聰明</h3>
        <p>
          我沒有自誇，我真的很聰明，雖然我被規定不能到樓上，但只要門留有一絲縫隙，<br />
          我就能趁機鑽上去，經過多次的經驗，我發現樓上真的是上廁所的好地方。<br />
          當然，聰明不能只用在一個地方。為了能夠品嚐各種美食，我特別克服高度，<br />
          能夠跳上餐桌椅，偷吃桌上的雞。雖然每次都還來不及吃掉就被搶回去，一直被罵，<br />
          但他們都說我很聰明，知道要叼雞腿。雞腿是我咬的那塊肉的名稱嗎？好吧，<br />
          我還是不知道，但我知道我很聰明啦。
        </p>
      </div>
      <!-- <div class="special-img">
        <img :src="imgTest" alt="我正在發掘新才能..." />
      </div> -->
    </div>
    <div class="subject" style="font-family: Festive">
      <h3>
        這個網站是我的小主人們為了紀錄我的生活所建立的，每天的生活紀錄都會在這上面，
        <br />有興趣知道我的日常生活的人都可以隨時關注這個網站，也可以追蹤下面的ig喔
      </h3>
      <img style="margin-bottom: 50px" src="@/components/home/content/Pictures/ig-icon.png" />
    </div>
    <!-- {{S1}}/{{ToTalAge}} -->
  </div>
</template>

<script setup>
import { ref,onMounted , computed, watch} from "vue";
import firebase from '@/tools/firebase.js'
import timeHelper from '@/tools/timeHelper.js'


const imgTest = computed(
  () => new URL("Pictures/bottom-1.jpeg", import.meta.url).href
);


const S1 = ref(18)
const S2 = ref(25)
const S3 = ref(22)

const ToTalAge = computed(
  () => S1.value + S2.value + S3.value
);

// const ToTalAge = ref(65)

// watch(S1,  (newValue) => {
//   ToTalAge.value = S1.value + S2.value + S3.value
// })

// watch(S2,  (newValue) => {
//   ToTalAge.value = S1.value + S2.value + S3.value
// })

// watch(S3,  (newValue) => {
//   ToTalAge.value = S1.value + S2.value + S3.value
// })



function getImgPath(num){
  return new URL(`Pictures/bottom-pic-${num}.jpeg`, import.meta.url).href
}

onMounted(()=>{
  firebase.getUsers().then((v)=>{
    console.log(v)
  })
  setTimeout(()=>{
    S1.value=100
  }, 6000)
})

</script>

<style lang="scss" scoped>

#tab-home-root {
  text-align: center;
  font-weight: bold;
  .top {
    margin-top: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    img {
      max-height: 450px;
      max-width: 370px;
      border: 2px dashed;
      box-shadow: 5px 5px 3px gray;
      border-radius: 10px;
    }
    h1 {
      font-size: 170px;
    }
  }
  .bottom {
    border-top: 2px solid;
    margin-top: 50px;
    text-align: center;
    .special-img img {
      max-height: 450px;
      max-width: 370px;
      box-shadow: 5px 5px 3px gray;
      border-radius: 10px;
    }
  }
  .picture {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    /* background-color: yellow; */
    margin-top: 50px;
    margin-bottom: 50px;
    img {
      // position: absolute;
      // top: 10px;
      // left: 10px;
      border-radius: 99em;
      width: 200px;
      height: 200px;
      .circle-test {
        // position: relative;
        border-radius: 99em;
        width: 220px;
        height: 220px;
        background-color: orange;
      }
    }
  }
  .bottom-bgcolor {
    background-color: burlywood;
    // background-color: #EAD6BD;
    margin: 200px 200px;
    padding-top: 50px;
    padding-bottom: 50px;
    margin-top: 200px;
  }
  .special {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
  }
  .subject {
    background-color: burlywood;
    border-top: 2px solid;
    margin-top: 50px;
    text-align: center;
    img {
      height: 50px;
      width: 50px;
    }
  }
}
</style>