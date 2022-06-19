<template>
    <div class="login">
            <div class="left">
                <h1>Create your new account</h1>
                <p>userName： <input value="your userName"></p>
                <p>passWord：<input value="your passWord"></p>
                <br>
                <button>create</button>
            </div>
            <div class="right">
                <img src="login-bgcolor.png">
            </div>
    </div>
</template>

<style scoped>
.btn{
    display: flex;
    justify-content: start;
    align-items: center;
    height: 69px;
    width: 100%;
    background-color: burlywood; 
}
.login{
    display: flex;
    /* width: 100%;
    height: calc(100% - 69px); */
    /* justify-content: center; */
}
.login .left{
 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: calc(100% - 69px);
    width: 40%;
    /* background-color: blueviolet; */
}
.right img{
    position: absolute;
    right: 0px;
    width: 60%;
    height: clac(100%-69px);
}
</style>