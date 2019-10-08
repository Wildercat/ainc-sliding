var app = document.getElementById('app');
var arr = [];
var loopIdx = 0;
var froze = new Set([10]);


function mkTag(tag, clss, id, style, cont) {
    let html = document.createElement(tag);
    html.setAttribute('class', clss);
    html.setAttribute('id', id);
    html.setAttribute('style', style);
    html.textContent = cont;
    return html;
}

function find(location) {
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i].loc);
        if (arr[i].loc == location) {
            // console.log('AAAA');
            // console.log(arr[i]);
            return i;
        }
    }
}

function getH(id) {
    return document.getElementById(id);
}

function gSwap(cur) {
    if (froze.has(cur)) {
        return;
    }
    let tar = arr[0].loc;
    // console.log({ '1current': arr[find(cur)], 'target': arr[find(tar)] });
    // let temp = find(cur).loc;
    // // console.log({temp});
    let curI = find(cur);
    let tarI = find(tar);
    arr[curI].loc = tar;
    arr[tarI].loc = cur;
    // console.log({ 'current': find(cur), 'target': find(tar) });
    // console.log(arr);


    arr[find(cur)].render();
    arr[find(tar)].render();

}

function locMap(rLoc) {
    let j = rLoc % 4;
    let i = parseInt(rLoc / 4);
    return [i, j];
}

function proxCheck(cur) {
    cur
    let curC = locMap(cur);
    let tarC = locMap(arr[0].loc);
    if (curC[0] == tarC[0] && Math.abs(curC[1] - tarC[1]) == 1) {
        return true;
    } else if (curC[1] == tarC[1] && Math.abs(curC[0] - tarC[0]) == 1) {
        return true;
    } else {
        return false;
    }

}

function shuffle() {
    do {
        // for (let j = 0; j < 500; j++) {
        let canMov = [];
        for (let i = 1; i < arr.length; i++) {
            if (proxCheck(arr[i].loc)) {
                canMov.push(arr[i]);
            }
        }
        // console.log(canMov[Math.floor(Math.random()*canMov.length)]);
        gSwap(canMov[Math.floor(Math.random() * canMov.length)].loc);
        // setTimeout(function () {
        //     gSwap(canMov[Math.floor(Math.random() * canMov.length)].loc);
        // }, 1);
        // console.log(j);
        // }
    } while (winCheck());
}

function loop() {
    shuffle();
    loopIdx++;
    if (loopIdx < 300) {
        setTimeout(loop, 40);
    }
}
function moveRandom() {
    let dir = Math.floor(Math.random() * Math.floor(4));
    console.log(dir);
    switch (dir) {
        case 0:
            gSwap(arr[0].loc + 4);
            break;
        case 1:
            gSwap(arr[0].loc - 4);
            break;
        case 2:
            gSwap(arr[0].loc + 1);
            break;
        case 3:
            gSwap(arr[0].loc - 1);
            break;
        default:
            break;
    }
}

function giveDirect(tar, cur) {
    let tarCo = locMap(tar);
    let blankCo = locMap(cur);
    let direct = [];
    for (let i = 0; i < tarCo.length; i++) {
        direct.push(Math.sign(tarCo[i] - blankCo[i]));
    }
    return direct;
}

function emptyTileMove(_tar) {

    function foo(tar) {
        let direct = giveDirect(tar, arr[0].loc);
        // let tarCo = locMap(tar);
        // let blankCo = locMap(arr[0].loc);
        // // console.log({ tarCo, blankCo });
        // // console.log({tarCo, blankCo});
        // let direct = [];
        // // console.log(tarCo[0] - blankCo[0]);
        // for (let i = 0; i < tarCo.length; i++) {
        //     direct.push(Math.sign(tarCo[i] - blankCo[i]));
        // }
        // if I was using a 2d array I could do all this in one for loop:
        let dnLoc = arr[0].loc + 4;
        let upLoc = arr[0].loc - 4;
        let lrLoc = arr[0].loc + direct[1];
        if (direct[0] == 1 && !froze.has(dnLoc)) {
            gSwap(dnLoc);
            // emptyTileMove(tar);
        } else if (direct[0] == -1 && !froze.has(upLoc)) {
            gSwap(upLoc);
            // emptyTileMove(tar);
        } else if (direct[1] && !froze.has(lrLoc)) {
            gSwap(lrLoc);
            // emptyTileMove(tar);
        } else {
            console.log('yoo');
        }
        direct = giveDirect(tar, arr[0].loc);
        console.log({ direct });
        //exit loop if we're where we want to be
        if (!direct[0] && !direct[1]) {
            clearInterval(loop);
        }
    }
    let loop = setInterval(foo, 200, _tar);

    // loopIdx = 0;
    // loop();
}
function shuffleBtnClick() {
    froze.add(10);
    emptyTileMove(11);
}

function moveIfCan(foo) {
    if (proxCheck(foo)) {

        gSwap(foo);
        if (winCheck()) {
            winAlert();
        }
    }
}
class Tile {
    constructor(tileId, loc) {
        this.tileId = tileId;
        this.loc = loc;
        this.content = mkTag('img', '', 'c' + tileId, '', 'C' + tileId);
        this.content.addEventListener('click', function () {
            // console.log(this.id);
            // console.log(this.parentElement.id);
            // console.log(arr[0].loc);
            let FRESHLoc = parseInt(this.parentElement.id);
            froze.clear();
            moveIfCan(FRESHLoc);

        });

    }

    // get loc() {
    //     return this._loc;
    // }

    // set loc(freshLoc) {
    //     this._loc = freshLoc;
    // }

    render() {
        // console.log(this);
        let ht = document.getElementById(this.loc);
        ht.innerHTML = '';
        ht.appendChild(this.content);
    }
    // swap(newLoc) {
    //     // console.log(`current location:`)
    //     let curLoc = this.loc;
    //     console.log('current location of target tile');
    //     console.log(find(newLoc).loc);
    //     find(newLoc).loc = curLoc;
    //     console.log('new location of target tile:');
    //     console.log(find(newLoc).loc);

    //     // this.loc = newLoc;

    //     // find(curLoc).render();
    //     // find(newLoc).render();
    //     // console.log(arr);
    //     // console.log(document.getElementById('app'));
    // }
}

function winAlert() {
    alert('YOU WON!');
    // alert('Don\'t you love alerts?')
    // alert('Me too!');
    // alert('I\'m glad we both appreciate taking away control from the user!');
    // alert('I wonder when Ian will put together that I set up these alerts to keep going when it detects his ip');
}

function winCheck() {
    let win = 0;
    for (let i = 0; i < arr.length; i++) {
        // console.log({ 'loc': arr[i].loc, 'id': arr[i].tileId });
        if (arr[i].loc != arr[i].tileId) {
            win++;
        }
    }
    // console.log({win});
    if (win == 0) {
        return true;
    } else {
        return false;
    }
}

function applyImg() {
    let img = document.getElementById('upload').files[0];
    let imgUrl = window.URL.createObjectURL(img);
    // console.log(imgUrl);
    for (let i = 1; i < arr.length; i++) {
        arr[i].content.setAttribute('src', imgUrl);
    }
}

function init() {
    app.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        let row = mkTag('div', 'row', '', 'width:400px');
        for (let j = 0; j < 4; j++) {
            let id = i * 4 + j;
            row.appendChild(mkTag('div', 'col p-0', id, 'height:100px; width:100px; overflow: hidden;', ''))
        }
        app.appendChild(row);

    }

    // make tiles
    for (let i = 0; i < 16; i++) {
        let tile = new Tile(i, i);
        tile.render();
        arr.push(tile);
    }
    // add images
    for (let i = 1; i < arr.length; i++) {
        let coords = locMap(i);
        arr[i].content.setAttribute('src', '400img.jpg');
        arr[i].content.setAttribute('style', `margin: -${coords[0] * 100}px 0 0 -${coords[1] * 100}px; object-fit: contain`)
        // arr[i].content.setAttribute('style', `margin: 0px 0 0 -100px; object-fit: contain`)
    }

    // reset btn
    let lastRow = mkTag('div', 'row mt-3', '', '', '');
    let btnCol = mkTag('div', 'col', '', '', '');
    let reset = mkTag('button', 'btn btn-primary', 'reset', '', 'Shuffle');
    reset.addEventListener('click', shuffleBtnClick);
    btnCol.appendChild(reset);
    lastRow.appendChild(btnCol);

    // upload image ui
    let uploadCol = mkTag('div', 'col', '', '', '');
    let imgInp = mkTag('input', '', 'upload', '', '');
    imgInp.setAttribute("type", "file");

    uploadCol.appendChild(imgInp);

    lastRow.appendChild(uploadCol);

    let applyImgCol = mkTag('div', 'col', '', '', '');
    let apply = mkTag('button', 'btn btn-secondary', 'apply', '', 'Apply Image');
    apply.addEventListener('click', applyImg)
    applyImgCol.appendChild(apply);

    lastRow.appendChild(applyImgCol);

    let page = document.getElementById('page');


    page.appendChild(lastRow);
    // console.log(arr);
}

init();