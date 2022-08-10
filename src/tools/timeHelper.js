
// sec to 11:25
function secToHHMMSS(sec){
    const mm =Math.floor(sec/60)
    sec = sec %60
return mm +':' + sec

}


// ex: 2022-12-04
function timestampToYYYY_MM_DD(timestampInSec){
   var date =  new Date(timestampInSec);
   var yyyy = date.getFullYear();
//    console.log(yyyy);
   var mm = date.getMonth()+1;
   if(mm<10){
       mm = '0' + mm;
   }
   var dd = date.getDate();
   if(dd<10){
    dd = '0' + dd;
   }
   console.log(date);
    console.log(mm);
    console.log(dd);
   return yyyy+'-'+mm+'-'+dd;
}


function timestampToYYYY_MM_DD_mm(timestampInSec){
    var date =  new Date(timestampInSec);

    var hh = date.getHours();
    var mm = date.getMinutes();
    return  timestampToYYYY_MM_DD(timestampInSec)+' '+hh+':'+mm;
 }



export default {
    secToHHMMSS,
    timestampToYYYY_MM_DD,
    timestampToYYYY_MM_DD_mm
}