const items = [
    "apple",
    "apricot",
    "banana",
    "pear",
    "guava",
    "cherry",
    "orange",
    "pineapple",
    "mango",
    "grapes",
    "blueberry",
    "raspberry",
    "melon",
    "blackberry",
    "plum",
    "kiwi",
    "peach",
    "strawberry",
    "avocado"
]


function makeTrie(ch) {
    this.ch = ch;
    this.map = {};
    this.isTerminal = false;
    this.words = [];
}

function addTotrie(str, i, trie) {
    if (i === str.length) {
        trie.isTerminal = true;
        return;
    }

    if (!trie.map[str[i]])
        trie.map[str[i]] = new makeTrie(str[i]);

    trie.words.push(str);
    addTotrie(str, i + 1, trie.map[str[i]]);
}

function search(str, i, trie) {
    if (i === str.length)
        return trie.words;
    if (!trie.map[str[i]])
        return [];
    return search(str, i + 1, trie.map[str[i]]);
}

function clickHandler(e) {
    console.log(e.target.innerHTML);
    document.getElementById("text-box").value = e.target.innerHTML.split("<b>").join("").split("</b>").join("");
}

function handler(e) {
    const arr = search(e.target.value, 0, root);
    document.getElementById("suggestions").innerHTML = "";
    for (const el of arr)
        document.getElementById("suggestions").innerHTML += `
            <li class="list-group-item clickable"><b>${e.target.value}</b>${el.substring(e.target.value.length)}</li>
        `
    console.log(arr);
    for (const child of document.getElementById("suggestions").children) {
        child.addEventListener("click", clickHandler);
    }
}


const root = new makeTrie('\0');

for (const word of items) {
    addTotrie(word, 0, root);
    document.getElementById("suggestions").innerHTML += `
            <li class="list-group-item clickable">${word}</li>
        `
}

for (const child of document.getElementById("suggestions").children)
    child.addEventListener("click", clickHandler);

document.getElementById("text-box").addEventListener("keyup", handler);