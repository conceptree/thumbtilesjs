'use.strict'

function initThumbJs(tjsOptions) {

    var self = this;
    var elementsData;
    var resposive = tjsOptions.responsive;
    var selector = document.getElementsByClassName(tjsOptions.mainSelector)[0];

    /*GET JSON DATA*/
    function getElements() {
        var requester = new XMLHttpRequest();
        requester.open("GET", "../data/elements.json", true);
        requester.send();
        requester.onreadystatechange = function () {
            if (requester.status == 200 && requester.readyState === 4) {
                elementsData = JSON.parse(this.responseText);
                startBuilding();
            }
        };
    }

    /*BUILD ALL BLOCKS */
    function startBuilding() {

        var numbOfCols = tjsOptions.defaulCols;

        if (resposive) {
            numbOfCols = getScreenChanges();
        }

        buildCols(numbOfCols);

    };

    /*BUILD ALL COLUMNS */
    function buildCols(numbOfCols) {

        for (var i = 0; i < numbOfCols; i++) {
            var column = document.createElement('div');
            column.className = "tjs-column";
            column.id = "column_"+i;
            selector.appendChild(column);
        }

        insertElements(numbOfCols);

    }

    /*Insert Elements */
    function insertElements(numbOfCols) {

        var numbOfElements = tjsOptions.eachLoad;

        if(tjsOptions.loadAll){
            numbOfElements = elementsData.length;
        }

        for(var i=0; i < numbOfElements; i++){

            var element = document.createElement('div');
            var image = document.createElement('img');
            var title = document.createElement('h1');
            var description =  document.createComment('p');

            image.src = elementsData[i].thumb;
            title.innerHTML = elementsData[i].title;
            description.innerHTML = elementsData[i].description;

            element.className = "tjs-element";
            element.id = 'element_'+i;
            element.appendChild(image,title,description);

            if(i < numbOfCols){
                var currentColumn = document.getElementById('column_'+i);
                currentColumn.appendChild(element);
            }

        }


    }


    getElements();


}

var tjsOptions = {

    defaulCols: 4,
    mainSelector: "tjs-main-container",
    elementsUrl: "../data/elements.json",
    eachLoad: 20,
    loadAll: true,
    responsive: false

}

initThumbJs(tjsOptions);