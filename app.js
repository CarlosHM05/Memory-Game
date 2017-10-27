var memoryArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memoryValues = [];
var memoryTileIds = [];
var tilesFlipped = 0;

Array.prototype.memoryTileShuffle = function() {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this [i];
        this[i] = temp;
    }
}

function newBoard () {
    tilesFlipped = 0;
    var output = '';
    memoryArray.memoryTileShuffle();
    for (var i = 0; i < memoryArray.length; i++) {
        output += '<div id="tile'+i+'" onclick="memoryFlipTile(this,\''+memoryArray[i]+'\')"></div>';
    }
    document.getElementById('memoryBoard').innerHTML = output;
}

function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memoryValues.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(memoryValues.length == 0){
			memoryValues.push(val);
			memoryTileIds.push(tile.id);
		} else if(memoryValues.length == 1){
			memoryValues.push(val);
			memoryTileIds.push(tile.id);
			if(memoryValues[0] == memoryValues[1]){
				tilesFlipped += 2;
				// Clear both arrays
				memoryValues = [];
            	memoryTileIds = [];
				// Check to see if the whole board is cleared
				if(tilesFlipped == memoryArray.length){
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memoryTileIds[0]);
				    var tile_2 = document.getElementById(memoryTileIds[1]);
				    tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memoryValues = [];
            	    memoryTileIds = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}