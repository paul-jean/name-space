; (function () {
    window.addEventListener('load', displayNames);
})();

function generateName(adj_matrix) {
    var firstLetterIndex = getRandomIntInclusive(0, 25);
    var numLetters = getRandomIntInclusive(5, 15);
    var i = 0, firstLetter;
    for (var letter in adj_matrix) {
        if (i === firstLetterIndex) {
            firstLetter = letter;
            break;
        }
        i++;
    }
    var row = adj_matrix[letter];
    var generatedName = [];
    var nextLetter = firstLetter;
    for (var i = 0; i < numLetters; i++) {
        generatedName.push(nextLetter);
        nextLetter = weightedRand(row);
        row = adj_matrix[nextLetter];
    }
    return generatedName.join('');
}

function displayNames() {
    $.ajax({
        dataType: "json",
        url: "./adj-matrix-neutral.json",
        success: function (adj_matrix) {
            var div = $('#names');
            for (i = 0; i < 1000; i++) {
                var name = generateName(adj_matrix);
                $(div).append(`<div class="name">${name}</div>`);
            }
        }
    })
}



// Ref:
// https://stackoverflow.com/questions/8435183/generate-a-weighted-random-number
function weightedRand(spec) {
    var i, sum = 0, r = Math.random();
    for (i in spec) {
        sum += spec[i];
        if (r <= sum) return i;
    }
}

// Ref:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// Ref: SO
function get_req(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    return req.responseText;
}
