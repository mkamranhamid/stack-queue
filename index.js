console.log("Lets get started");

var arr = [];
var main = {
    "0": [],
    "1": []
};
var count = 1;
arrayInit();
stackInit();

function arrayInit() {
    let arr = main[0];
    let arrayLength = document.getElementById('arrayLength');
    let isArrayEmpty = document.getElementById('isArrayEmpty');
    arrayLength.innerText = arr.length;
    isArrayEmpty.innerText = isEmpty(arr);
    createBoxes(arr, 'box-container');
}

function stackInit() {
    let noticeboard = document.getElementById('stack-noticeboard');
    // stack-noticeboard
    if (main['1'].length == 0) {
        createBoxes(main['1'], 'stack-container');
        noticeboard.innerText = 'Nothing in stack yet';
        return;
    }
    noticeboard.innerText = '';
    createBoxes(main['1'], 'stack-container');

}

function insertIntoArray(indx) {
    console.log("insertIntoArray");
    main[indx].unshift(count);
    arrayInit(main[indx]);
    count++;
}

function updateArray(indx) {
    let indexVal = document.getElementById('index-upd').value;
    let replacerVal = document.getElementById('replace').value;
    indexVal = parseInt(indexVal) - 1;
    if ((indexVal > (main[indx].length - 1)) || (indexVal < 0)) {
        alert('Out of range!!')
        return;
    }
    main[indx][indexVal] = parseInt(replacerVal);
    arrayInit(main[indx]);
}

function deleteFromArray(indx) {
    console.log("deleteIntoArray");
    let indexVal = document.getElementById('index-dlt').value;
    indexVal = parseInt(indexVal);
    if (indexVal > (main[indx].length - 1)) {
        alert('Out of range!!')
        return;
    }
    let slicedArrForStack = main[indx].slice(0, indexVal - 1);
    let slicedArrForStackQueue = main[indx].slice(indexVal - 1);
    main[0] = slicedArrForStackQueue;
    main[1] = slicedArrForStack;
    arrayInit(main[indx]);
    stackInit();
    setTimeout(() => {
        let slicedArrForStackQueue1 = main[indx].slice(1);
        main[0] = main[1].concat(slicedArrForStackQueue1);
        main[1] = [];
        stackInit();
        arrayInit(main[indx]);
    }, 1000);
}

function dequeueFromArray(indx) {
    console.log("dequeueFromArray");
    if (main[indx].length == 0) {
        alert('Cant perform the operation as the queue is empty !!')
        return;
    }
    main[indx].pop();
    arrayInit(main[indx]);
}

function searchInArray(indx) {
    console.log("deleteIntoArray");
    let indexVal = document.getElementById('srch').value;
    let indexOfBox = main[indx].indexOf(parseInt(indexVal));
    if (indexOfBox == -1) {
        alert("Can't find the searched key!!");
        return;
    }
    let boxes = document.getElementById('box-container').children;
    removeClassIfExist(boxes);

    let targetBox = boxes[indexOfBox];
    targetBox.classList.add('search-border');
}

function removeClassIfExist(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('search-border');
    }
}

function isEmpty(arr) {
    return arr.length > 0 ? false : true;
}

function createBoxes(arr, containerId) {
    let boxContainer = document.getElementById(containerId);
    let boxes = arr.map((d) => {
        let box = `<div class="box"><div>${d}</div></div>`;
        return box;
    })
    boxes = boxes.join("");
    boxContainer.innerHTML = boxes;
}

function showToggler(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function createArray(indx) {
    let newArray = new Array(10).fill(0).map((d, i) => {
        return i;
    });
    main[indx] = newArray;
    arrayInit(main[indx]);
}



/* **Schema** */
/*
    {
        arrs:[arr1,arr2,arr3,...];   //arr1=[1,2,3,4]
    }
*/

/* **Merge{arr1,arr2}** */
/*
    {
        arrs:[arr1,arr3,...];
    }
*/