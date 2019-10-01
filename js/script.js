var app = document.getElementById('app');
var arr = [];

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

function gSwap(cur, tar) {
    console.log({ '1current': arr[find(cur)], 'target': arr[find(tar)] });
    // let temp = find(cur).loc;
    // // console.log({temp});
    let curI = find(cur);
    let tarI = find(tar);
    arr[curI].loc = tar;
    arr[tarI].loc = cur;
    console.log({ 'current': find(cur), 'target': find(tar) });
    console.log(arr);


    arr[find(cur)].render();
    arr[find(tar)].render();

}

function locMap(rLoc) {
    let j = rLoc % 4;
    let i = parseInt(rLoc / 4);
    return [i, j];
}

function proxCheck(cur, tar) {
    let curC = locMap(cur);
    let tarC = locMap(tar);
    if (curC[0] == tarC[0] && Math.abs(curC[1] - tarC[1]) == 1) {
        return true;
    } else if (curC[1] == tarC[1] && Math.abs(curC[0] - tarC[0]) == 1) {
        return true;
    } else {
        return false;
    }

}

class Tile {
    constructor(tileId, loc) {
        this.tileId = tileId;
        this.loc = loc;
        this.content = mkTag('div', '', 'c' + tileId, '', 'C' + tileId);
        this.content.addEventListener('click', function () {
            // console.log(this.id);
            // console.log(this.parentElement.id);
            // console.log(arr[0].loc);
            let FRESHLoc = parseInt(this.parentElement.id);

            if (proxCheck(FRESHLoc, arr[0].loc)) {

                gSwap(FRESHLoc, arr[0].loc);
            }
            winCheck();

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

function shuffleArray(array) { // lifted straight off of stackOverflow
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffle() {
    let locArr = [];
    for (let i = 0; i < arr.length; i++) {
        locArr.push(i);
    }
    locArr = shuffleArray(locArr);
    console.log(locArr);

    for (let i = 0; i < arr.length; i++) {
        arr[i].loc = locArr[i];
        arr[i].render();
    }
}

function winCheck() {
    let win = 0;
    for (let i = 0; i < arr.length; i++) {
        console.log({'loc':arr[i].loc,'id':arr[i].tileId});
        if (arr[i].loc != arr[i].tileId) {
            win++;
        }
    }
    console.log({win});
    if (win == 0) {
        alert('YOU WON!');
        alert('Don\'t you love alerts?')
        alert('Me too!');
        alert('I\'m glad we both appreciate taking away control from the user!');
    }
}

function init() {
    app.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        let row = mkTag('div', 'row', '', '');
        for (let j = 0; j < 4; j++) {
            let id = i * 4 + j;
            row.appendChild(mkTag('div', 'col p-0', id, 'height: 100px', ''))
        }
        app.appendChild(row);

    }

    // make tiles
    for (let i = 0; i < 16; i++) {
        let tile = new Tile(i, i);
        tile.render();
        arr.push(tile);
    }
    // reset btn
    let reset = mkTag('button', 'btn btn-primary', 'reset', '', 'Shuffle');
    reset.addEventListener('click', shuffle)
    app.appendChild(reset);
    console.log(arr);
}

init();