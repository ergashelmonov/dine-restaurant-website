let form = document.querySelector("form"),
  minusCountPerson = document.querySelector(".minus"),
  plusCountPerson = document.querySelector(".plus"),
  countPerson = document.querySelector(".count-person"),
  inputs = document.querySelectorAll("input"),
  monthLabel = document.querySelector("#month"),
  timeLabel = document.querySelector("#time"),
  select = document.querySelector(".select"),
  selectValue = document.querySelector(".value"),
  options = document.querySelector(".options"),
  option = document.querySelectorAll(".option");

let resultArr = [];
function error(element, nextElement) {
  element.classList.add("errors");
  if (nextElement) {
    nextElement.nextElementSibling.style = `display:block`;
  }
  resultArr.push(false);
}

function notError(element, nextElement) {
  element.classList.remove("errors");
  if (nextElement) {
    nextElement.nextElementSibling.style = `display:block`;
  }
  resultArr.push(true);
}

let newData = new Date();

inputs.forEach((elem, i) => {
  elem.addEventListener("input", () => {
    if (elem.value < 0) {
      elem.value = 0;
    }
    if ((i === 2 || i === 5) && Number(elem.value) > 12) {
      elem.value = 12;
    } else if (i === 3 && Number(elem.value) > 31) {
      elem.value = 31;
    } else if (i === 4 && elem.value.length > 4) {
      elem.value = 2024;
    } else if (i === 6 && Number(elem.value) > 59) {
      elem.value = 59;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputs.forEach((item) => {
    if (item.value.length == 0) {
      error(item);
    }
  });

  if (
    inputs[2].value - 1 >= newData.getMonth() &&
    inputs[4].value >= newData.getFullYear()
  ) {
    if (
      inputs[2].value - 1 == newData.getMonth() &&
      inputs[3].value >= newData.getDate()
    ) {
      inputs.forEach((item, index) => {
        if (index < 4 && index > 1) {
          notError(item, monthLabel);
        }
      });
    } else {
      inputs.forEach((item, index) => {
        if (index < 4 && index > 1) {
          notError(item, monthLabel);
        }
      });
    }
  } else if (
    (inputs[4].value <= newData.getFullYear() &&
      inputs[2].value - 1 <= newData.getMonth()) ||
    (inputs[4].value >= newData.getFullYear() &&
      inputs[2].value - 1 <= newData.getMonth()) ||
    (inputs[4].value <= newData.getFullYear() &&
      inputs[2].value - 1 >= newData.getMonth())
  ) {
    inputs.forEach((item, index) => {
      if (index < 4 && index > 1) {
        error(item, monthLabel);
      }
    });
  }

  let formDate = Object.fromEntries(new FormData(form));

  formDate.countPerson = countPerson.textContent;

  if (resultArr.every((item) => item)) {
    monthLabel.nextElementSibling.style.display = "none";
    localStorage.setItem("val", JSON.stringify(formDate));
    window.location.pathname = "/pages/home.html";
  }
  resultArr = [];
});

minusCountPerson.addEventListener("click", () => {
  if (+countPerson.textContent > 4) {
    countPerson.innerText = +countPerson.textContent - 1;
  }
});

plusCountPerson.addEventListener("click", () => {
  countPerson.innerText = +countPerson.textContent + 1;
});

select.addEventListener("click", () => {
  options.classList.toggle("options-active");
});

option.forEach((element) => {
  element.addEventListener("click", () => {
    option.forEach((item) => {
      item.classList.remove("value-active");
    });
    element.classList.add("value-active");
    selectValue.innerText = element.textContent;
  });
});
