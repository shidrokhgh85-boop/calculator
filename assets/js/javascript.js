const btns = document.querySelectorAll(".btn");
const input = document.getElementById("display-box");
const equal_btn = document.querySelector("#equal");
console.log(btns);
// بالا نیامدن صفه کلید در موبایل
let isDesktop = window.matchMedia("(min-width:768px)").matches
if (isDesktop) input.focus();
input.addEventListener("focus", (e) => {
  if (!isDesktop) {
    e.target.blur();
  }
});


// گرفتن ورودی از کیبورد در حالت دسکتاپ
input.addEventListener("keypress", (e) => {
  const allowed = "1234567890+-*/.Backspace=";
  console.log(e.key);
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    try {
      input.value = eval(input.value.trim());
    } catch {
      input.value = "error";
    }
    input.focus();
  } else if (!allowed.includes(e.key)) {
    e.preventDefault();
  }
});

const addInput = (e) => {
  e.preventDefault();
  console.log(input.value);
  if (e.target.tagName === "I") {
    e.target.value = e.target.parentElement.value;
  }
  if (e.target.value === " = ") {
    if (input.value != "") {
      try {
        input.value = eval(input.value.trim());
      } catch {
        input.value = "error";
      }
    } else input.value = "";
  } else if (e.target.value === "clear") {
    input.value = "";
  } else if (e.target.value === "delete") {
    if (input.value.length > 0) {
      input.value = input.value.slice(0, -1); // تک تک حذف کردن
    }
  } else {
    input.value += e.target.value;
  }
  if (isDesktop) input.focus();
  e.stopPropagation();
};

btns.forEach((btn) => {
  btn.addEventListener("click", addInput);
});
