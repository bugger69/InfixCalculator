const input = document.querySelector("#input");

const submit = document.querySelector(".buttons .row4 button:nth-of-type(3)");

const reset = document.querySelector(".buttons .row0 .reset");

const buttons = document.querySelectorAll(".buttons .obtns");

for(let button of buttons) {
    button.addEventListener('click', () => {
        input.textContent += button.textContent;
    });
}

reset.addEventListener('click', () => {
    input.textContent = "";
});

submit.addEventListener('click', () => {
    let s = input.textContent;
    input.textContent = solve(s);
});

function solve(s) {
    return "";
}

