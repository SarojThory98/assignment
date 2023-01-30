$(document).ready(function () {
    $(".validateLoginForm").validate({
        rules: {
            emailAddress: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5,

            }
        }
    });
    $(".validateLoginForm").on("submit", function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            let testMail = 1;
            let email = $("#email").val();
            let password = $("#password").val();
            let pass;
            let loginObj;
            if (localStorage.getItem("allItem") == null) {
                alert("sign up")
            }
            else {
                let getArr = JSON.parse(localStorage.getItem("allItem"))
                $.each(getArr, function (index, value) {
                    let findMail = value.email;
                    pass = value.password;
                    if (email == findMail) {
                        loginObj = value;
                        testMail = 0;
                    }
                })
                if (testMail == 0) {
                    if (pass == password) {
                        window.localStorage.setItem("loginKey", JSON.stringify(loginObj));
                        window.location.replace("dashboard.html");
                    }
                    else {
                        alert("incorrect password")
                    }
                }
                else {
                    alert("user does not exist!! signUp")
                }
            }
        }
    })
})