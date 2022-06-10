const input = document.querySelector("#input");

const submit = document.querySelector(".buttons .row4 button:nth-of-type(4)");

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
        case '^':
            return 3;
        default:
            return -1;
    }
}

function process(stack1, stack2) {
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
    } else if (c === '^') {
        stack1.push(a ** b);
    } else if (c === '(') {
        stack2.push(c);
        stack1.push(a);
        stack1.push(b);
    } else {
        stack1.push(NaN);
    }
}

function solve(s) {//debug this shit
    try {
        let stack1 = [];
        let stack2 = [];
        let i = 0;
        let s1 = "";
        while(i < s.length){
            if(s[i] === '(') {
                stack2.push(s[i]);
                i++;
            } else if (s[i] === ')') {
                if(s1 !== "") stack1.push(parseFloat(s1));
                s1 = "";
                if(stack2[stack2.length - 1] === '('){
                    stack2.pop();
                    i++;
                } else {
                    process(stack1, stack2);
                }
            } else if (precedence(s[i]) === -1) {
                s1 += s[i];
                i++;
            } else {
                if(s1 !== "") stack1.push(parseFloat(s1));
                s1 = "";
                if(stack2.length === 0 || (precedence(s[i]) > precedence(stack2[stack2.length - 1]))){
                    stack2.push(s[i]);
                    i++;
                }else {
                    process(stack1, stack2);
                }
            }
        }
        if(s1 !== "") stack1.push(parseFloat(s1));
        while(stack2.length > 0 && stack1.length >= 1) {
            process(stack1, stack2);
        }
        if(stack2.length !== 0 || stack1.length !== 1) {
            throw "Syntax Error!!";
        }
        if(isNaN(stack1[stack1.length - 1]) || stack1[stack1.length - 1] === Infinity) {
            throw "Math Error!!";
        }
        return stack1[stack1.length - 1];
    } catch (e) {
        return e;
    }
}



