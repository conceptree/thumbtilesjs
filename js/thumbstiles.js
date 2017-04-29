'use.strict'

function initThumbJs(tjsOptions) {

    var self = this;
    var elementsData;
    var elementsLoaded = [];
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

    /* Check window size changes */
    function getScreenChanges() {

        var colsPerWindsize = 0;

        if (window.innerWidth > 992 && window.innerWidth < 1280) {
            colsPerWindsize = 3;
        }
        if (window.innerWidth > 1280 && window.innerWidth < 1650) {
            colsPerWindsize = 4;
        }
        if (window.innerWidth > 1650) {
            colsPerWindsize = 5;
        }
        if (window.innerWidth < 992 && window.innerWidth > 750) {
            colsPerWindsize = 3;
        }
        if (window.innerWidth < 750) {
            colsPerWindsize = 1;
        }

        window.onresize = function () {
            selector.innerHTML = "";
            startBuilding();
        }

        return colsPerWindsize;

    }

    /*BUILD ALL COLUMNS */
    function buildCols(numbOfCols) {

        for (var i = 0; i < numbOfCols; i++) {
            var column = document.createElement('div');
            column.className = "tjs-column";
            column.id = "column_" + i;
            selector.appendChild(column);
        }

        insertElements(numbOfCols);

    }

    /*Insert Elements */
    function insertElements(numbOfCols) {

        var numbOfElements = tjsOptions.eachLoad;
        var currentCol = 0;

        if (tjsOptions.loadAll) {
            numbOfElements = elementsData.length;
        }

        for (var i = 0; i < numbOfElements; i++) {

            elementsLoaded.push(elementsData[i]);

            var element = document.createElement('div');
            var image = document.createElement('img');
            var title = document.createElement('h1');
            var description = document.createElement('p');
            var currentColumn = null;

            image.src = elementsData[i].thumb;
            title.innerHTML = elementsData[i].title;
            description.innerHTML = elementsData[i].description;

            element.className = "tjs-element";
            element.id = 'element_' + i;
            element.appendChild(image);
            element.appendChild(title);
            element.appendChild(description);

            if (currentCol < numbOfCols && i > 0) {
                currentCol++;
            } else {
                currentCol = 0;
            }

            currentColumn = document.getElementById('column_' + currentCol);

            if (currentColumn) {
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
    responsive: true

}

initThumbJs(tjsOptions);