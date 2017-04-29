'use.strict'

var tjsOptions = {

    defaulCols: 4,
    elementsUrl:"../data/elements.json",
    eachLoad:20,
    loadAll:false,
    responsive:true

}


/*
* Initialize thumbjs
 */
function initThumbJs(tjsOptions) {

var self = this;
var elementsData = [];
var requester = new XMLHttpRequest();

self.getElements = function getElements(){
    requester.open("GET", "../data/elements.json", true);
    requester.send();
    requester.onreadystatechange=function() {
        console.log(this);
  };
}



}


initThumbJs();