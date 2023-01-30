$(document).ready(function () {
    $(".validForm").validate({
        rules: {
            fname: {
                required: true,
            },
            lname: {
                required: true,
            },
            phone: {
                required: true,
                minlength: 10,
                maxlength: 10
            }
        }
    })
    if (localStorage.getItem("loginKey") != null) {
        let currentUser = JSON.parse(window.localStorage.getItem("loginKey"));
        $("#userName").html(`Full Name: ${currentUser.fname} ${currentUser.lname}`);
        $("#userEmail").html(`Email: ${currentUser.email}`);
        $("#userPhone").html(`Phone Number: ${currentUser.phone}`)
        $(".editBtn").click(function () {
            $(".form-modal").show();
            $(".crossBtn").click(function () {
                $(".form-modal").hide();
            })
            $("#fname").val(currentUser.fname);
            $("#lname").val(currentUser.lname);
            $("#phone").val(currentUser.phone);
        })
        $(".validForm").on("submit", function () {
            if ($(this).valid()) {
                currentUser.fname = $("#fname").val();
                currentUser.lname = $("#lname").val();
                currentUser.phone = $("#phone").val();
            }
            localStorage.setItem("loginKey", JSON.stringify(currentUser));
            $("#userName").html(`Full Name: ${currentUser.fname} ${currentUser.lname}`);
            $("#userEmail").html(`Email: ${currentUser.email}`);
            $("#userPhone").html(`Phone Number: ${currentUser.phone}`)
        })
        $(".logoutBtn").click(function () {
            $("#userName").html(`Full Name: `);
            $("#userEmail").html(`Email: `);
            $("#userPhone").html(`Phone Number: `)
            console.log(localStorage)
            localStorage.removeItem("loginKey");
            window.location.replace("index.html");

        })
    }
})