const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const flamesBtn = document.getElementById("flamesBtn");
const resultContainer = document.getElementById("resultContainer");
const resultText = document.getElementById("resultText");
const processing = document.getElementById("processing");
const clearBtn = document.getElementById("clearBtn");
const warningText = document.getElementById("warningText");

let timers = [];

function enableButtonCheck() {
    if (name1.value.trim() && name2.value.trim()) {
        flamesBtn.disabled = false;
        flamesBtn.classList.add("pulse");
    } else {
        flamesBtn.disabled = true;
        flamesBtn.classList.remove("pulse");
    }
}

name1.addEventListener("input", enableButtonCheck);
name2.addEventListener("input", enableButtonCheck);

flamesBtn.addEventListener("click", () => {
    flamesBtn.classList.remove("pulse");
    flamesBtn.classList.add("hidden");
    processing.classList.remove("hidden");

    name1.disabled = true;
    name2.disabled = true;

    const t1 = setTimeout(() => {
        processing.classList.add("hidden");
        showResult(calculateFlames(name1.value, name2.value));
    }, 1500);

    timers.push(t1);
});

function calculateFlames(n1, n2) {
    let nameA = n1.toLowerCase().replace(/\s/g, "");
    let nameB = n2.toLowerCase().replace(/\s/g, "");

    for (let char of nameA) {
        if (nameB.includes(char)) {
            nameA = nameA.replace(char, "");
            nameB = nameB.replace(char, "");
        }
    }

    let count = nameA.length + nameB.length;
    let flames = ["Friends 🤍", "Lovers 💘", "Affection 💛", "Marriage 💞", "Enemies 🖤", "Siblings 💚"];

    while (flames.length > 1) {
        let index = (count % flames.length) - 1;
        if (index >= 0) {
            flames = flames.slice(index + 1).concat(flames.slice(0, index));
        } else {
            flames.pop();
        }
    }

    return flames[0];
}

function showResult(result) {
    resultText.textContent = result;
    resultContainer.classList.remove("hidden");
    clearBtn.classList.remove("hidden");
    document.body.classList.add("warm");
    document.querySelector(".card").classList.add("spotlight");

    startAutoSequence();
}

function startAutoSequence() {
    const t2 = setTimeout(() => {
        clearBtn.classList.add("pulse");
    }, 15000);

    const t3 = setTimeout(() => {
        warningText.classList.remove("hidden");
    }, 30000);

    const t4 = setTimeout(() => {
        resetExperience();
    }, 40000);

    timers.push(t2, t3, t4);
}

clearBtn.addEventListener("click", resetExperience);

function resetExperience() {
    timers.forEach(t => clearTimeout(t));
    timers = [];

    name1.value = "";
    name2.value = "";
    name1.disabled = false;
    name2.disabled = false;

    flamesBtn.classList.remove("hidden");
    flamesBtn.disabled = true;

    resultContainer.classList.add("hidden");
    processing.classList.add("hidden");
    clearBtn.classList.add("hidden");
    warningText.classList.add("hidden");
    clearBtn.classList.remove("pulse");

    document.body.classList.remove("warm");
    document.querySelector(".card").classList.remove("spotlight");
}