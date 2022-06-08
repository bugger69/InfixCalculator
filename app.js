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

function solve(s) {
    let stack1 = [];
    let stack2 = [];
    let i = 0;
    let s1 = "";
    while(i != s.length){
        // console.log(s[i]);
        if (precedence(s[i]) === -1) {
            // console.log("a");
            s1 += s[i];
            i++;
        } else {
            // console.log("b", s1);
            if(s1 != "") stack1.push(parseFloat(s1));
            s1 = "";
            if(stack2.length === 0 || (precedence(s[i]) > precedence(stack2[stack2.length - 1]))){
                // console.log("c", s[i]);
                stack2.push(s[i]);
                i++;
            }else {
                let k = process(stack1, stack2);
                stack1.push(k);
                // console.log("d", stack1[stack1.length - 1]);
            }
        }
        // console.log("Stack1 length: ", stack1.length);
        // console.log("stack2 length: ", stack2.length); 
    }
    stack1.push(parseFloat(s1));
    // console.log("b", stack1[stack1.length - 1] ,stack1.length);
    while(stack2.length > 0 && stack1.length >= 1) {
        let k = process(stack1, stack2);
        stack1.push(k);
        // console.log("d", stack1[stack1.length - 1]);
    }
    return stack1[stack1.length - 1];
}

function process(stack1, stack2) {//do make sure to pass by reference later on.
    let b = stack1[stack1.length - 1];
    stack1.pop();
    let a = stack1[stack1.length - 1];
    stack1.pop();
    let c = stack2[stack2.length - 1];
    stack2.pop();
    if(c === '+') {
        return (a + b);
    } else if (c === '-') {
        return (a - b);
    } else if (c === '*') {
        return (a * b);
    } else if (c === '/') {
        return (a / b);
    } else {
        return NaN;
    }
}

