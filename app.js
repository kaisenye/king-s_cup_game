

let numberCnt = new Map([
    ['A', 4],
    ['2', 4],
    ['3', 4],
    ['4', 4],
    ['5', 4],
    ['6', 4],
    ['7', 4],
    ['8', 4],
    ['9', 4],
    ['10', 4],
    ['J', 4],
    ['Q', 4],
    ['K', 4]
])

let suitCnt = new Map([
    ['♥', 13],
    ['♦', 13],
    ['♠', 13],
    ['♣', 13]
])

let titleMap = new Map([
    ['A', "复仇时刻到！"],
    ['2', "小姐牌"],
    ['3', "逛三园"],
    ['4', "玩游戏"],
    ['5', "照相机"],
    ['6', "摸鼻子"],
    ['7', "逢7必过"],
    ['8', "定规则"],
    ['9', "自己喝！"],
    ['10', "我是神经病"],
    ['J', "左边喝"],
    ['Q', "右边喝"],
    ['K', "天道有轮回"]
])

let contentMap = new Map([
    ['A', "指定在场某一位伙伴喝酒"],
    ['2', "无论在场哪位伙伴接受惩罚，都可以叫上小姐陪喝，小姐必须要用很妩媚的语气邀请喝酒，直到下一张小姐牌出现。"],
    ['3', "玩家选择一个类别，动物园，蔬菜园，水果园等等，也可以是男明星其他的。然后说出这里面都有哪些，接不上来的人就输了，喝酒🍺"],
    ['4', "找在场任意一位伙伴玩游戏，如猜拳，输的一方喝酒"],
    ['5', "当发动照相机技能时，全场所有伙伴需要保持静止5秒钟，谁动谁接受惩罚"],
    ['6', "玩家随机随时使用摸鼻子技能，全场最后一个摸鼻子的人喝酒"],
    ['7', "抽到牌的玩家随意喊数字，遇到7的倍数就喊过，反应慢或者喊错就算输接受惩罚。"],
    ['8', "玩家决定一个规则，今晚在场所有玩家都得遵循，直到游戏结束"],
    ['9', "抽到的人自己喝一杯🍺"],
    ['10', "抽到10的玩家喊一声我是神经病，然后大家都不能跟他搭话了，跟他搭话就输，神经病可以趁大家不注意就插话，跟你搭话那个人就喝酒。"],
    ['J', "左边的玩家喝一杯🍺"],
    ['Q', "右边的玩家喝一杯🍺"],
    ['K', "抽到第一张K的，指定喝多少，摸到下一张K的人喝。"]
])

// get new number 
function newNumber() {
    // if game over 
    if (numberCnt.size === 0) {
        console.log('Game Over');
    }

    let keys = Array.from(numberCnt.keys());
    const idx = Math.floor(Math.random() * keys.length);
    let key = keys[idx];
    let cnt = numberCnt.get(key);
    
    let title = titleMap.get(key);
    let content = contentMap.get(key);

    if (cnt <= 1) {
        numberCnt.delete(key);
    } else {
        numberCnt.set(key, cnt - 1);
    }

    document.getElementById("number1").textContent = key;
    document.getElementById("number2").textContent = key;
    document.getElementById("data-header").textContent = title;
    document.getElementById("data-content").textContent = content;
}


// get new suit
function newSuit() {
    // game over 
    if (numberCnt.size == 0) {
        document.getElementById("data-header").textContent = '游戏结束';
        document.getElementById("data-content").textContent = "点击 ‘再来一局' 重新开始新一轮";
    }

    let keys = Array.from(suitCnt.keys());
    const idx = Math.floor(Math.random() * keys.length);
    let key = keys[idx];
    let cnt = suitCnt.get(key);

    if (cnt <= 1) {
        suitCnt.delete(key);
    } else {
        suitCnt.set(key, cnt - 1);
    }

    // change color
    if (key == '♥' || key == '♦') {
        document.getElementById("suit1").style.color = "red";
        document.getElementById("suit2").style.color = "red";
        document.getElementById("number1").style.color = "red";
        document.getElementById("number2").style.color = "red";
    } else {
        document.getElementById("suit1").style.color = "black";
        document.getElementById("suit2").style.color = "black";
        document.getElementById("number1").style.color = "black";
        document.getElementById("number2").style.color = "black";
    }
    

    document.getElementById("suit1").textContent = key;
    document.getElementById("suit2").textContent = key;
}


