var inputData = document.getElementById("input");
console.log(inputData);

document.addEventListener("keydown", function (val) {
  console.log(val);
  val.preventDefault();

  if (val.key == "Enter") {
    Equal();
  } else if (Number(val.key) >= 0 && Number(val.key <= 9)) {
  //  10
    setNum(val.key);
  }
  else if(val.key=="+" || val.key=="-"|| val.key=="/" || val.key=="*"){
    setNum(val.key)

  }
  else if(val.key=="Backspace"){
    BackSpace()
  }
});

function setNum(numb) {
  var lastValue = inputData.value.toString().slice(inputData.value.length - 1);


  if (
    lastValue == "+" ||
    lastValue == "-" ||
    lastValue == "*" ||
    lastValue == "/"
  ) {
    if (numb == "+" || numb == "-" || numb == "*" || numb == "/") {
      Toastify({
        text: "Enter correct data ",
        className: "info",
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, red, red)",
        },
      }).showToast();
    } else {
      inputData.value += numb;
    }
  } else {
    inputData.value += numb;
  }
}

function Equal() {
  inputData.value = eval(inputData.value);
}

function newSet() {
  inputData.value = `(-${inputData.value})`;
}

function BackSpace() {
  inputData.value = inputData.value
    .toString()
    .slice(0, inputData.value.length - 1);
}
function clearAllData() {
  inputData.value = "";
}
function Sqaure() {
  inputData.value = inputData.value * inputData.value;
}
function Cube() {
  inputData.value = inputData.value * inputData.value * inputData.value;
}
function Sqrt() {
  inputData.value = Math.sqrt(inputData.value);
}

function PercentageSol() {
  // 2 of 30%o
  var value = inputData.value+"%"
  if (value.toString().includes("%")) {
    var numb = parseFloat(value); //2+50%=>2+50,  50%=>50

    var result = numb / 100;

    inputData.value = result;
  }
  if (value.toString().includes("%") && value.toString().includes("+")) {
    var numb = value.toString().split("+"); //  2+50%
    // 2,50%

    var numb1 = Number(numb[0]); //"2"
    var numb2 = numb[1]; //50%

    var num3 = parseFloat(numb2) / 100; //=> 50%=>50/100
    var numb4 = parseFloat(num3) * Number(numb1); //0.5 * 2=> 1


    var result = numb4 + numb1; //1+2=>3
    inputData.value = result;
  }
}
