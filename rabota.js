// ПЕРЕД СДАЧЕЙ: убрать из этого файла ВСЕ ненужные комментарии. Но можно оставить комментарии с обьяснением работы кода

function randNum(max, exceptArr) {
    let l = Math.floor(Math.random() * max);
    if (exceptArr.indexOf(l) == -1) {
        console.log('NUM: ', l);
        return l;
    } else {randNum(max, exceptArr);}
}

function randNum_(max, exceptArr) {
    var a = Array.from(Array(max).keys());
    a.filter((item) => {
        return exceptArr.indexOf(item)==-1;
    });
    return a[Math.floor(Math.random() * a.length)];
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        //
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
    }
    return array;
}

var genQuestCount = 6;
var nums = [];
var lastGen = new Map();
function generateQuestion() {
    // l = ["Какая столица у", "Сколько живут людей в ", "Какой климат у ", "Какая площадь у "];
    region = Math.floor(Math.random() * getSelected().length);
    console.log(getSelected()[region])
    let r = Math.floor(Math.random() * (6 - 0) + 0);
    /*if (nums.length == genQuestCount) nums = [];
    let r = randNum(genQuestCount, nums);
    nums.push(r);*/

    //~ Seems to generate list without "underfined" elements.
    //~ arr = arr.filter(function (n) { return n !== undefined });

    /*let first = info[getSelectedIdx()[region] - Math.floor(Math.random() * 3)][0];
    let second = info[getSelectedIdx()[region] + Math.floor(Math.random() * 3)][0];*/
    // ToDo: WORK ON THIS LATER
    /*let first = getSelectedIdx()[region] - Math.floor(Math.random() * 3);
    if (first < 0) first += info.length - 1;
    if (first > info.length - 1) first -= info.length - 1;
    let second = getSelectedIdx()[region] + Math.floor(Math.random() * 3);
    if (second < 0) second += info.length - 1;
    if (second > info.length - 1) second -= info.length - 1;
    if (second == first) {
        if (second - 1 != first && second - 1 != region) second -= 1; else second -= 2;
    }*/
    let first = region - 3;
    if (first < 0) first += info.length - 1;
    if (first > info.length - 1) first -= info.length - 1;
    let second = region + 3;
    if (second < 0) second += info.length - 1;
    if (second > info.length - 1) second -= info.length - 1;

    let f = info[first][0];
    let s = info[second][0];
    var arr = [];

    switch (r) {
        default:
            prop_idx = 1;
            if (lastGen.has(1) && lastGen.get(1).indexOf(region) != -1) {
                if (lastGen.get(1).length == getSelected().length) { return generateQuestion(); }
                region = randNum(getSelected().length, [lastGen.get(1)]);
                var a = lastGen.get(1);
                a.push(region);
                lastGen.set(1, a);
            } else {
                lastGen.set(1, [region]);
            }
            return ['Какая столица у ' + getSelected()[region] + ' округа?', shuffle([info[first][1], info[getSelectedIdx()[region]][1], info[second][1]]), getSelectedIdx()[region], 1, 0];
        case 1:
            prop_idx = 3;
            if (lastGen.has(3) && lastGen.get(3).indexOf(region) != -1) {
                if (lastGen.get(3).length == getSelected().length) { return generateQuestion(); }
                region = randNum(getSelected().length, [lastGen.get(3)]);
                var a = lastGen.get(3);
                a.push(region);
                lastGen.set(3, a);
            } else {
                lastGen.set(3, [region]);
            }
            return ['Сколько живут людей в ' + getSelected()[region] + ' округе?', shuffle([info[first][3].toLocaleString(), info[getSelectedIdx()[region]][3].toLocaleString(), info[second][3].toLocaleString()]), getSelectedIdx()[region], 3, 0];
        case 2:
            prop_idx = 5;
            if (lastGen.has(5) && lastGen.get(5).indexOf(region) != -1) {
                if (lastGen.get(5).length == getSelected().length) { return generateQuestion(); }
                region = randNum(getSelected().length, [lastGen.get(5)]);
                var a = lastGen.get(5);
                a.push(region);
                lastGen.set(5, a);
            } else {
                lastGen.set(5, [region]);
            }
            return ['Какой климат в ' + getSelected()[region] + ' округе?', shuffle([info[first][5], info[getSelectedIdx()[region]][5], info[second][5]]), getSelectedIdx()[region], 5, 0];
        case 3:
            prop_idx = 2;
            if (lastGen.has(2) && lastGen.get(2).indexOf(region) != -1) {
                if (lastGen.get(2).length == getSelected().length) { return generateQuestion(); }
                region = randNum(getSelected().length, [lastGen.get(2)]);
                var a = lastGen.get(2);
                a.push(region);
                lastGen.set(2, a);
            } else {
                lastGen.set(2, [region]);
            }
            return ['Какая площадь у ' + getSelected()[region] + ' округа?', shuffle([info[first][2], info[getSelectedIdx()[region]][2], info[second][2]]), getSelectedIdx()[region], 2, 0];
        case 4:
            dost = Math.floor(Math.random() * 2);
            prop_idx = -dost;
            if (lastGen.has(4) && lastGen.get(4).indexOf(region) != -1) {
                if (lastGen.get(4).length == getSelected().length) { return generateQuestion(); }
                region = randNum(getSelected().length, [lastGen.get(4)]);
                var a = lastGen.get(4);
                a.push(region);
                lastGen.set(4, a);
            } else {
                lastGen.set(4, [region]);
            }
            return ['Что из нижеперечисленного находиться в ' + getSelected()[region] + ' федеральном округе?', shuffle([dostoprimechatelnosti[first][dost], dostoprimechatelnosti[getSelectedIdx()[region]][dost], dostoprimechatelnosti[second][dost]]), getSelectedIdx()[region], prop_idx, 2];
        case 5:
            prop_idx = 0;
            if (lastGen.has(0) && lastGen.get(0).indexOf(region) != -1) {
                if (lastGen.get(0).length == getSelected().length) { return generateQuestion(); }
                region = randNum(getSelected().length, [lastGen.get(0)]);
                var a = lastGen.get(0);
                a.push(region);
                lastGen.set(0, a);
            } else {
                lastGen.set(0, [region]);
            }
            return ['В каком федеральном округе находится ' + dostoprimechatelnosti[region][dost] + '?', shuffle([info[first][0], info[getSelectedIdx()[region]][0], info[second][1]]), getSelectedIdx()[region], 0, 1];
    }
}