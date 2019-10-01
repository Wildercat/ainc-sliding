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
            return arr[i];
        }
    }
}

function gSwap(cur, tar) {
    console.log({ 'current': find(cur).loc, 'target': find(tar).loc });
    find(cur).loc = tar;
    find(tar).loc = cur;
    console.log(arr);

    find(cur).render();
    find(tar).render();
}

class Tile {
    constructor(tileId, loc) {
        this.tileId = tileId;
        this._loc = loc;
        this.content = mkTag('div', '', 'C' + tileId, '', 'C' + tileId);
        this.content.addEventListener('click', function () {
            // console.log(`Clicked Tile ${tileId}`)
            // console.log(`id of above tile: ${newLoc}`)
            // console.log(arr[newLoc]);
            console.log({ loc })
            gSwap(loc, loc - 1);

        });

    }

    get loc() {
        return this._loc;
    }

    set loc(freshLoc) {
        this._loc = freshLoc;
    }

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

function init() {
    app.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        let row = mkTag('div', 'row', '', '');
        for (let j = 0; j < 4; j++) {
            row.appendChild(mkTag('div', 'col p-0', i * 4 + j, 'height: 100px', ''))
        }
        app.appendChild(row);

    }

    // make tiles
    for (let i = 0; i < 16; i++) {
        let tile = new Tile(i, i);
        tile.render();
        arr.push(tile);
    }
    console.log(arr);
}

init();