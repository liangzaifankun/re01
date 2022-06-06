let time = 0; 
//保存定时时间
let pause = true;
//设置是否暂停标志，true表示暂停
let set_timer;
//设置定时函数
let d = new Array(10);
//保存大div当前装的小div的编号
let d_direct = new Array(
  [0], //为了逻辑更简单，第一个元素我们不用，我们从下标1开始使用
  [2, 4], //大DIV编号为1的DIV可以去的位置，比如第一块可以去2,4号位置
  [1, 3, 5],
  [2, 6],
  [1, 5, 7],
  [2, 4, 6, 8],
  [3, 5, 9],
  [4, 8],
  [5, 7, 9],
  [6, 8]
);
//保存大div编号的可移动编号
let d_posXY = new Array(
    [0], //同样，我们不使用第一个元素
  [0, 0], //第一个表示left,第二个表示top，比如第一块的位置为let:0px,top:0px
  [150, 0],
  [300, 0],
  [0, 150],
  [150, 150],
  [300, 150],
  [0, 300],
  [150, 300],
  [300, 300]
);
//大DIV编号的位置
d[1] = 1;
d[2] = 2;
d[3] = 3;
d[4] = 4;
d[5] = 5;
d[6] = 6;
d[7] = 7;
d[8] = 8;
d[9] = 0;
//默认按照顺序排好，大DIV第九块没有，所以为0，我们用0表示空白块

function move(id) {
  //移动函数
  let i = 1;
  for (i = 1; i < 10; ++i) {
    if (d[i] == id) break;
  }
  //这个for循环是找出小div在大div中的位置
  let target_d = 0;
  //保存小div可以去的编号，0表示不能移动
  target_d = whereCanTo(i);
  //用来找出小div可以去的位置，如果返回0，表示不能移动，如果可以移动，则返回可以去的位置编号
  if (target_d != 0) {
    d[i] = 0;
    //把当前大div设置为0，因为当前小div已经移走所以当前大div就没有装小div了
    d[target_d] = id;
    //把当前大div设置为被点击的小div编号
    document.getElementById("d" + id).style.left = d_posXY[target_d][0] + "px";
    document.getElementById("d" + id).style.top = d_posXY[target_d][1] + "px";
    //最后设置被点击的小div的位置，把它移到目标大div的位置
  }
  //如果target_d不为0,则表示可以移动，且target_d就是小div要去的大div的位置编号
  let finsih_flag = true;
  //设置游戏是否完成标志，true表示完成
  for (let k = 1; k < 9; ++k) {
    if (d[k] != k) {
      finsih_flag = false;
      break;
      //如果大div保存的编号和它本身的编号不同，则表示还不是全部按照顺序排的，那么设置为false，跳出循环，后面不用再判断了，只要一个不符就没完成
    }
  }
  //从1开始，把每个大div保存的编号编历一下，判断是否完成
  if (finsih_flag == true) {
    if (!pause) start();
    alert("congratulation");
  }
  //如果为true，表示游戏完成，如果当前没有暂停，则调用暂停函数，并弹出提示框，完成游戏。
  //start（）这个函数是开始，暂停一起的函数，如果暂停调用就会开始，如果开始，调用就会暂停
}

  function whereCanTo(cur_div) {
    //判断是否可移动函数，参数是大div的编号，不是小DIV的编号，因为小DIV编号跟可以去哪没关系，小DIV是会动的
    let j = 0;
    let move_flag = false;
    for (j = 0; j < d_direct[cur_div].length; ++j) {
      //把所有可能去的位置循环遍历一下
      if (d[d_direct[cur_div][j]] == 0) {
        move_flag = true;
        break;
      }
      //如果目标值为0，说明目标位置没有装小div，则可以移动，跳出循环
    }
    if (move_flag == true) {
      return d_direct[cur_div][j];
    } else {
      return 0;
    }
    // 可以移动，则返回目标位置编号，否则返回0，表示不可移动
  }

  // 定时函数，每秒执行一次
  function timer() {
    time += 1; //一秒加一，单位是秒
    let min = parseInt(time / 60); //把秒转换为分钟，一分钟60秒，取商就是分钟
    let sec = time % 60; //取余就是秒
    document.getElementById("timer").innerHTML = min + "分" + sec + "秒"; //然后把时间更新显示出来
  }

  //开始暂停函数
  function start() {
    if (pause) {
      document.getElementById("start").innerHTML = "暂停"; //把按钮文字设置为暂停
      pause = false; // 暂停表示设置为false
      set_timer = setInterval(timer, 1000); // 启动定时
      //如果当前是暂停，则开始
    } else {
      document.getElementById("start").innerHTML = "开始";
      pause = true;
      clearInterval(set_timer);
    }
  }

  //重置函数
  function reset() {
    time = 0; //把时间设置为0
    random_d(); //把方块随机打乱函数
    if (pause)
      //如果暂停，则开始计时
      start();
  }

  //随机打乱方块函数，我们的思路是从第九块开始，随机生成一个数，然后他们两块对调一下
  function random_d() {
    for (let i = 9; i > 1; --i) {
      let to = parseInt(Math.random() * (i - 1) + 1);//产生随机数，范围为1到i，不能超出范围，因为没这个id的div
      if (d[i] != 0) {
        document.getElementById('d' + d[i]).style.left = d_posXY[to][0] + 'px';
        document.getElementById('d' + d[i]).style.top = d_posXY[to][1] + 'px';
      }
      //把当前div位置设置为随机产生的div位置
      if (d[to] != 0) {
        document.getElementById('d' + d[to]).style.left = d_posXY[i][0] + 'px';
        document.getElementById('d' + d[to]).style.top = d_posXY[i][1] + 'px';
      }
      //把随机产生的DIV的位置设置为当前的DIV的位置
      var tem = d[to];
      d[to] = d[i];
      d[i] = tem;
      //然后把它们两个的DIV保存的编号对调一下
    }
  }

//初始化函数，页面加载的时候调用重置函数，重新开始
window.onload = function () {
  reset();
};
