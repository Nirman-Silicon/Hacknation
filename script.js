var project1 =setInterval(eyesDonated,0.000001);
var project2=setInterval(eyesPledged,0.000001);
let count1=1;
let count2=1;
function eyesDonated(){
    count1++;
    document.querySelector('#number1').innerHTML=count1;
    if(count1==3500)
    clearInterval(project1);
}
function eyesPledged(){
    count2++;
    document.querySelector('#number2').innerHTML=count2;
    if(count2==2400)
    clearInterval(project2);
}