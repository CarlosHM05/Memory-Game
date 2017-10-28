// JLT - You may want to get into the habit of hiding your code from the global
// scope.  This can be done by using an immediately invokes function expression,
// also known as an IIFE.

(function() {
    // JLT - you should favor let and const over var.  I really ever use var now
    // that the ES6 spec is implemented in most browsers.
    //let memoryArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
    
    // JLT - review the generateMemoryArray function to see the changes
    let memoryArray = generateMemoryArray();
    let memoryValues = [];
    let memoryTileIds = [];
    let tilesFlipped = 0;

    Array.prototype.memoryTileShuffle = function() {
        var i = this.length, j, temp;
        while (--i > 0) {   // JLT - I wouldn't perform math operations in a while loop conditional
            j = Math.floor(Math.random() * (i+1));
            temp = this[j];
            this[j] = this [i];
            this[i] = temp;
        }
    }

    function generateMemoryArray() {
        let result = [];

        let charCode = 65; // JLT - 65 is the ascii code for 'A'
        for (let i = 0; i < 12; i++, charCode++) {
            let letter = String.fromCharCode(charCode);
            //result.push(letter);
            //result.push(letter);

            // JLT - now the memory array will contain an object literal with
            // the letter value and the image to be displayed
            result.push({ letter: letter, image: `${letter}.png` });
            result.push({ letter: letter, image: `${letter}.png` });
        }

        return result;
    }

    function newBoard () {
        tilesFlipped = 0;
        var output = '';
        memoryArray.memoryTileShuffle();
        for (var i = 0; i < memoryArray.length; i++) {
            // JLT - string interpolation can make this simpler to read/write
            //output += '<div id="tile'+i+'" onclick="memoryFlipTile(this,\''+memoryArray[i]+'\')"></div>';
            let id = `tile${memoryArray[i].letter}`;
            let image = memoryArray[i].image;
            // JLT - the html fragment will have the image embedded
            output += `<div id="${id}"><img src="${image}"></div>`;
        }

        document.getElementById('memoryBoard').innerHTML = output;

        for (let j = 0; j < memoryArray.length; j++) {
            // JLT - set up event listeners for the tiles here, rather than
            // using the div's "onclick" attribute.
            let id = `tile${memoryArray[j].letter}`;
            document.getElementById(id).addEventListener("click", memoryFlipTile);
        }
    }

    // JLT - You can get a lot of good data from the event object that is passed
    // into the click handler.
    //function memoryFlipTile(tile,val){
    function memoryFlipTile(event){
        //console.log(event);   // JLT - uncomment to view event properties

        // JLT - now you don't need to pass in parameters to this method, you
        // can get most of the data you need from the event object.
        let tile = event.target;
        let index = parseInt(event.target.id.replace("tile", ""));
        let val = memoryArray[index];

        // JLT - avoid using the double equals, the triple equal === is a
        // stricter equality check.
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

                        // JLT - memory_board should be memoryBoard
                        //document.getElementById('memory_board').innerHTML = "";
                        document.getElementById('memoryBoard').innerHTML = "";

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

    // JLT - Now that all the logic of your script is inside of an IIFE, you
    // aren't polluting the global scope with your variables and functions which
    // will reduce the chance that your stuff will collide with other items that
    // are loaded into the page (from other framework, libraries, etc.

    window.onload = newBoard();
}());
