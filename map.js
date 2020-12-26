var mapImages = ["map-s.gif", "map-m.gif", "map-l.gif", "map-xl.gif"];
var imageCounter = 0;
var map = document.getElementById('map');

function preloadImages() {
    var imageNode = document.getElementById('map');
    for (var i = 0; i < mapImages.length; i++) {
        var imageTemp = new Image();
    	imageTemp.src = mapImages[i];
        //console.log(`loaded ${mapImages[imageCounter]}`);
        //imageCounter++;
    }
    imageCounter = 0;
    imageNode.src = mapImages[imageCounter];
}

window.addEventListener("load", preloadImages, false);

function frameSize() {
	//console.log("frameSize run");
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
    var mapandbuttons = document.getElementById('mapandbuttons');
    var mapframe = document.getElementById('mapframe');
    mapandbuttons.style.height = `${windowHeight - 75}px`;
    mapandbuttons.style.width = `${windowWidth - 50}px`;
    mapframe.style.height = `${windowHeight - 100}px`;
    mapframe.style.width = `${windowWidth - 250}px`;
}

window.addEventListener('load', frameSize, false);
window.addEventListener('resize', frameSize, false);

function zoomInSandbox() {
    imageCounter++;
    //console.log(imageCounter);
    var imageSource = mapImages[imageCounter];
    imageNode.src = imageSource;;
}

// Button Controls
function zoomIn() {
    var imageNode = document.getElementById('map');
    if (imageCounter < mapImages.length-1 & imageCounter >= 0) {
        var mapframeWidth = parseInt(mapframe.style.width);
        var mapframeHeight = parseInt(mapframe.style.height);
        var yOrg = map.height;
        var xOrg = map.width;
        //console.log(mapframeWidth, mapframeHeight);
        imageCounter++;
    	//console.log(imageCounter);
        var imageSource = mapImages[imageCounter];
    	imageNode.src = imageSource;

        var yNew = map.height;
        var xNew = map.width;

        var yRatio = yNew/yOrg;
        var xRatio = xNew/xOrg;
        //console.log(xOrg, yOrg, xNew, yNew, xRatio, yRatio, map.style.top, map.style.left);
        //console.log(map.style.left, map.offsetLeft, map.style.top, map.offsetTop);
        map.style.left = `${map.offsetLeft*xRatio - (mapframeWidth/2) * xRatio + mapframeWidth/2}px`;
        map.style.top = `${map.offsetTop*yRatio - (mapframeHeight/2) * yRatio + mapframeHeight/2}px`;
    }
}
function zoomOut() {
    var imageNode = document.getElementById('map');
    if (imageCounter < mapImages.length & imageCounter > 0) {
        var mapframeWidth = parseInt(mapframe.style.width);
        var mapframeHeight = parseInt(mapframe.style.height);
        var yOrg = map.height;
        var xOrg = map.width;
        imageCounter--;
        //console.log(imageCounter);
        var imageSource = mapImages[imageCounter];
        imageNode.src = imageSource;
        var yNew = map.height;
        var xNew = map.width;

        var yRatio = yNew/yOrg;
        var xRatio = xNew/xOrg;
        map.style.left = `${map.offsetLeft*xRatio - (mapframeWidth/2) * xRatio + mapframeWidth/2}px`;
        map.style.top = `${map.offsetTop*yRatio - (mapframeHeight/2) * yRatio + mapframeHeight/2}px`;
    }
}
document.getElementById("zoomin").addEventListener('click',zoomIn,false);
document.getElementById("zoomout").addEventListener('click',zoomOut,false);

function mapLeft() {
    //console.log("map left");
    map.style.left = `${map.offsetLeft + (1/2) * parseInt(mapframe.style.width)}px`;
}
function mapRight() {
    //console.log("map right");
    map.style.left = `${map.offsetLeft - (1/2) * parseInt(mapframe.style.width)}px`;
}
document.getElementById("left").addEventListener('click',mapLeft,false);
document.getElementById("right").addEventListener('click',mapRight,false);

function mapUp() {
    //console.log("map up");
    map.style.top = `${map.offsetTop + (1/2) * parseInt(mapframe.style.height)}px`;
}
function mapDown() {
    //console.log("map down");
    map.style.top = `${map.offsetTop - (1/2) * parseInt(mapframe.style.height)}px`;
}
document.getElementById("up").addEventListener('click',mapUp,false);
document.getElementById("down").addEventListener('click',mapDown,false);


// This function is partially based on L9 code
function centerMap(evt) {
    //console.log("center map");

    // Getting position of click IN THE DIV
    var doubleclickedTarget = evt.target;
    var initialdoubleX = evt.clientX;
    var initialdoubleY = evt.clientY;

    // console.log(initialdoubleX); console.log(initialdoubleY); console.log(evt.pageX); console.log(evt.pageY);

    // Getting center of map frame
    var mapframe = document.getElementById("mapframe");
    var mapframeWidth = parseInt(mapframe.style.width);
    var mapframeHeight = parseInt(mapframe.style.height);
    // console.log(mapframeWidth, mapframeHeight);

    // Center coordinate is height: 33+mapframeHeight/2, width: 25+mapframeWidth/2
    var newinitialdoubleX = evt.clientX - 45;
    var newinitialdoubleY = evt.clientY - 53; // Position in mapframe

    var newX = newinitialdoubleX - (mapframeWidth/2); // More math for centering
    var newY = newinitialdoubleY - (mapframeHeight/2);
    // console.log(newX, newY);
    // console.log(newinitialdoubleX, newinitialdoubleY);
    // console.log(map.style.left - newX, map.style.top - newY);

    map.style.top = `${map.offsetTop - newY}px`;  // Moves map up/down by the pixels needed to get to center
    map.style.left = `${map.offsetLeft - newX}px`; // Moves map left/right by the pixels needed to get to center
    // console.log(map.style.left, map.style.top);
    // console.log("center map");
}
document.getElementById("mapframe").addEventListener('dblclick',centerMap,false);

//
///
////
/////
//////
///////
/////// NOTE: Dragging code is based on a combination of lecture code (specifically lecture 9), ////
////// and examplefrom W3Schools: https://www.w3schools.com/howto/howto_js_draggable.asp. I've added explanations
/////to further prove comprehension and changes.
////
//

// What to do when the mouse is down
document.addEventListener("mousedown", continueDrag, false)

function continueDrag(evt) {
    // Arrow function to reset all stored values for new calculations when mouse is down
    () => {
        var newX = 0, newY = 0, initialX = 0, initialY = 0;
    }
    evt.preventDefault(); // Fixes behavior of drag and drop

    document.addEventListener("mouseup", stopDrag, false); // This stops the dragging and removes event listeners when mouse released.
    document.addEventListener("mousemove", mapDragMove, false); // This calculates new position of map when dragged
    document.body.style.cursor = "move"; // Changes cursor as long as dragging is occurring

    // Variable stores the event target for later use
    clickedTarget = event.target;
    // Getting the position of the initial click (for calculations)
    initialX = clickedTarget.clientX;
    initialY = clickedTarget.clientY;
 }

 function mapDragMove(evt) {
    evt.preventDefault(); // Fixes behavior of drag and drop
    // Find the new position (change in position) of the mouse, then updates initial position
    newX = evt.clientX - initialX;  // New = new - old positioon
    newY = evt.clientY - initialY;
    // Sets map's position based on prior calculation to find top/left distance. Map is the image (see first global variables)
    map.style.top = `${map.offsetTop + newY}px`;  // the offsetTop/Left is pretty much the reason why I used w3schools. Functions inspired as well
    map.style.left = `${map.offsetLeft + newX}px`;
    initialX = evt.clientX; // Updating to reflect the new "new" position
    initialY = evt.clientY;
 }

 function stopDrag() {
    //console.log("stop");
    // Removes event handlers so no more dragging, changes cursor back to default
    document.removeEventListener("mouseup", stopDrag, false);
    document.removeEventListener("mousemove", mapDragMove, false);
    document.body.style.cursor = "auto";
 }
