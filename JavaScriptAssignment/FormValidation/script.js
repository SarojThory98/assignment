let flag = false;
let fullform = document.getElementById('form');
let form_modal = document.querySelector(".form-modal");
fullform.addEventListener('submit', (event) => {
    event.preventDefault();
    flag = true;
    formValidate();
    if (flag) {
        form_modal.style.display = "block";
        let btn_close_b = document.querySelector(".btn_close_b");
        btn_close_b.addEventListener("click", closeModal);

        let crossButton = document.querySelector(".crossBtn");
        crossButton.addEventListener("click", closeModal);
    }
    else {
        form_modal.style.display = "none";
    }
})

function closeModal() {
    form_modal.style.display = "none";
}

function formValidate() {
    let nval = validName();
    let eval = validEmailId();
    let qval = validQuery();
    let mval = validMsg();
    function subVal() {
        return `full name: ${nval}<br>Email: ${eval}<br>
        Query: ${qval}<br>Message: ${mval}<br>`
    }
    document.getElementById('mBody').innerHTML = subVal();
}

//validate name
function validName() {
    document.getElementById('nameError').innerHTML = "";
    let namval = document.getElementById('fname').value;
    var character = /^[A-Za-z]+$/;
    if (namval == "") {
        setError("nameError", `this field can't be empty`);
        flag = false;
    }
    else if (!(namval.match(character))) {
        setError("nameError", `only alphabets are allowed`);
        flag = false;
    }
    else if (namval.length < 5) {
        setError("nameError", `length is too short`);
        flag = false;
    }
    return namval;
}

//validate email
function validEmailId() {
    document.getElementById('mailError').innerHTML = "";
    let mailval = document.getElementById('femail').value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mailval == "") {
        setError("mailError", `this field can't be empty`);
        flag = false;
    }
    else if (!(mailval.match(validRegex))) {
        setError("mailError", `invalid email include @ and .`);
        flag = false;
    }
    return mailval;
}

//query validation
function validQuery() {
    document.getElementById('queryError').innerHTML = "";
    let queryval = document.getElementById('fquery').value;
    if (queryval == "") {
        setError("queryError", `this field can't be empty`);
        flag = false;
    }
    return queryval;
}

//message validation
function validMsg() {
    document.getElementById('textError').innerHTML = "";
    let msgval = document.getElementById('fmsg').value;
    if (msgval == "") {
        setError("textError", `this field can't be empty`);
        flag = false;
    }
    else if (msgval.length < 5) {
        setError("textError", `You should be enter mininmum 5 character`);
        flag = false;
    }
    return msgval;
}

//error function
function setError(id, message) {
    document.getElementById(id).innerHTML = message;
}