

let numberCnt = new Map([
    ['A', 4],
    ['2', 4],
    ['3', 4],
    ['4', 4],
    ['5', 4],
    ['6', 4],
    ['7', 4],
    ['8', 4],
    ['9', 4],
    ['10', 4],
    ['J', 4],
    ['Q', 4],
    ['K', 4]
])

let suitCnt = new Map([
    ['♥', 13],
    ['♦', 13],
    ['♠', 13],
    ['♣', 13]
])

function newNumber() {
    let keys = Array.from(numberCnt.keys());
    const idx = array[Math.floor(Math.random() * keys.length)];
    let key = keys[idx];
    let number = numberCnt.get(key);

    if (number <= 1) {
        numberCnt.delete(key);
    } else {
        numberCnt.set(key, number - 1);
    }

    document.getElementById("number").innerHTML = key;
}