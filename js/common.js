/**
 * Created by Winni on 2016/5/22.
 */


var score = 0;      //总得分
var limitTime =6;  //时间限制
var changeNum = 20; //每次改变的颜色值大小
var count = 0;
var isEnd = false;     //是否结束


//点击了正确的色块
var main= document.getElementById("main");
main.addEventListener("click",function (event) {
    if(event.target.id === "select"){
        change();
        if(changeNum > 1 && ++count % 4 == 0){
            changeNum--;
        };
        score += 40 - changeNum;

        console.log(changeNum);
    }
});

//游戏结束后点击body区域重新开始
document.addEventListener("click",function (event) {
    if(isEnd){
        change();
    }
});


//分数

//控制时间
var time = document.getElementById("time");
var controlTime = setInterval(function () {
  time.innerHTML = limitTime--;
    if(time.innerHTML == "0"){
        var textNode1 = document.createTextNode("您的得分是：");
        var textNode2 = document.createTextNode("!");
        var scoreTextNode = document.createElement("span");
        scoreTextNode.className = "red";
        scoreTextNode.appendChild(document.createTextNode(score.toString()));
        var node = document.createElement("div");
        node.className = "win";
        node.appendChild(textNode1);
        node.appendChild(scoreTextNode);
        node.appendChild(textNode2);
        document.body.removeChild(time);
        document.body.removeChild(document.getElementById("main"));
        document.body.appendChild(node);
        clearInterval(controlTime);
    }
},1000);


//设置色块
function change() {

//设置不同的色块id
function random() {
    var num = 20,
        minValue = 0;
    return Math.floor(Math.random() * num + minValue);
}
var randomNum = random();
var tds = document.getElementsByTagName("td");
for(var i = 0;i < tds.length;i++){
    if(i == randomNum){
        tds[randomNum].id = "select";
    }
    else {
        tds[i].id = "";
    }
}

//随机获取颜色值函数
function getRandomColor() {
    var color = "rgb(";
    for (var i = 0; i < 3; i++ ) {
        color += (Math.floor(Math.random() * 255) + (i == 2 ? "" : ","));
    }
    color += ")";
    return color;
}

//获取相似颜色值函数
function getSimilarColor(randomColor) {
    randomColor = randomColor.substr(4,randomColor.length - 5);
    var colorNum = randomColor.split(",").map(Number);
    var max = Math.max.apply(null,colorNum);
    var min = Math.min.apply(null,colorNum);
    var maxIndex = colorNum.indexOf(max);
    var minIndex = colorNum.indexOf(min);
    colorNum[maxIndex] = colorNum[maxIndex] + changeNum < 255 ? colorNum[maxIndex] + changeNum : colorNum[maxIndex] - changeNum;
    //colorNum[minIndex] = colorNum[minIndex] + changeNum < 255 ? colorNum[minIndex] + changeNum : colorNum[minIndex] - changeNum;
    return "rgb(" + colorNum.toString() + ")";
}

//设置随机颜色
var randomColor = getRandomColor();
for(var i = 0;i < tds.length;i++){
    tds[i].style.backgroundColor = randomColor;
}

//设置相似颜色
var select = document.getElementById("select");
var similarColor = getSimilarColor(randomColor);
select.style.backgroundColor = similarColor;
console.log(select);
}
change();
