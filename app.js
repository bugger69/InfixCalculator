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

function precedence(c) {
    switch(c) {
        case '+':
            return 1;
        case '-':
            return 1;
        case '*':
            return 2;
        case '/':
            return 2;
        default:
            return -1;
    }
}

function process() {//do make sure to pass by reference later on.
    let b = stack1[stack1.length - 1];
    stack1.pop();
    let a = stack1[stack1.length - 1];
    stack1.pop();
    let c = stack2[stack2.length - 1];
    stack2.pop();
    if(c === '+') {
        stack1.push(a + b);
    } else if (c === '-') {
        stack1.push(a - b);
    } else if (c === '*') {
        stack1.push(a * b);
    } else if (c === '/') {
        stack1.push(a / b);
    } else {
        return;
    }
}

function solve(s) {
    let stack1 = [];
    let stack2 = [];
    let i = 0;
    let s1 = "";
    while(i != s.length){
        if (precedence(s[i]) === -1) {
            s1 += s[i];
        } else if (precedence(s[i]) != - 1) {
            stack1.push(parseFloat(s1));
            s1 = "";
            // if(precedence(s[i]) >= precedence(stack2[stack2.length - 1])){
            //     stack2.push(s[i]);
            //     i++;
            // } else {
            //     process();
            // }
        }
        i++;
    }
    stack1.push(parseFloat(s1));
    return stack1[stack1.length - 1];
}

