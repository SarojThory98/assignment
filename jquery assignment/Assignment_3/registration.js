$(document).ready(function () {
    $(".validateSignupForm").validate({
        rules: {
            fname: {
                required: true,
            },
            lname: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 10,
                maxlength: 10
            },
            pass: {
                required: true,
                minlength: 5,

            },
            confirmPass: {
                required: true,
                equalTo: "#password"
            }
        }
    });
    let storageArr = [];
    $(".validateSignupForm").on("submit", function (e) {
        if ($(this).valid()) {
            let firstName = $("#fname").val();
            let lastName = $("#lname").val();
            let emailAddress = $("#email").val();
            let phoneNum = $("#phone").val();
            let pass = $("#password").val();
            let conPass = $("#conPassword").val();
            let storageObj = {
                fname: firstName,
                lname: lastName,
                email: emailAddress,
                phone: phoneNum,
                password: pass
            }
            if (localStorage.getItem("allItem") == null) {
                storageArr.push(storageObj);
                window.localStorage.setItem("allItem", JSON.stringify(storageArr));
            }
            else {
                let testMail = 1;
                let getArr = JSON.parse(window.localStorage.getItem("allItem"));
                $.each(getArr, function (index, value) {
                    let findMail = value.email;
                    if (storageObj.email == findMail) {
                        testMail = 0;
                        alert("already exist");
                    }
                })
                if (testMail == 1) {
                    storageArr.push(storageObj);
                    window.localStorage.setItem("allItem", JSON.stringify(storageArr));
                }
            }
        }
    })
})