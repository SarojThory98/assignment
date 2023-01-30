//array declaration
let list = [];
//random id generation
function pID() {
    return Math.floor(Math.random() * Date.now());
}
//validate form
$(document).ready(function () {
    $(".validForm").validate({
        rules: {
            titleArea: {
                required: true,
                minlength: 2
            },
            msgArea: {
                required: true,
                minlength: 3
            }
        }
    });
    //card count
    let CountOfCards = 0;
    $(".cardCount").text(CountOfCards);
    //click button
    $(".clickBtn").click(function () {
        $(".textArea1").on("keypress", function (e) {
            if (e.keyCode == 13) {
                return false;
            }
        })

        $(".validForm")[0].reset();
        $(".addBtn").show();
        $(".form-modal").show();
        $(".updateBtn").hide();
        //cross button
        $(".crossBtn").click(function () {
            $(".form-modal").hide();
        });
    })
    //modal add button functonality
    $(".addBtn").click(function (e) {
        e.preventDefault();
        //check validation
        if ($(".validForm").valid()) {
            let cardText = $(".textArea1").val();
            let cardMessage = $(".textArea2").val();
            //product id
            let pid = pID();
            let cardObj = {
                id: pid,
                title: cardText,
                msg: cardMessage
            }
            //find object in array
            if (list.find(x => x.title === cardObj.title)) {
                alert("item already in list");
                return false;
            }
            list.push(cardObj);
            //show count and cards
            CountOfCards++;
            $(".cardCount").text(CountOfCards);
            $(".form-modal").hide();
            $(".cardColumn").html("");
            display();
        }
    })

    //card display function
    function display() {
        $.map(list, function (value, index) {
            $(".cardColumn").append(`
    <div class="col-3 m-3 divColumn ${value.id}">
        <div class="card">
            <div class="card-body">
              <h5 class="card-title cardTitleClass">${value.title}</h5>
              <p class="card-text cardMessageClass">${value.msg}</p>
              <p class="text-center">
              <button class="btn btn-primary editBtn" editId="${value.id}">Edit</button>
              <button class="btn btn-danger deleteBtn" onClick="alert('Are you sure?')" deleteId="${value.id}">Delete</button>
              </p>
            </div>
          </div>
    </div>
    `)
        })
    }
    //edit functionality
    $("body").delegate(".editBtn", "click", function () {
        $(".form-modal").show();
        $(".updateBtn").show();
        $(".addBtn").hide();
        let editBtnId = $(this).attr("editId");
        let editObj = fetchObj(editBtnId);
        $(".textArea1").val(editObj.title);
        $(".textArea2").val(editObj.msg);
        $(".hiddenClass").val(editBtnId);
    });
    //Update functionality
    $("body").delegate(".updateBtn", "click", function (e) {
        e.preventDefault();
        if ($(".validForm").valid()) {
            let val = $(".hiddenClass").val();
            let editButton = fetchObj(val);
            titleValue = $(".textArea1").val();
            if (list.find(x => x.title === titleValue)) {
                if (!(editButton.title == titleValue)) {
                    alert("item already in list");
                    return false;
                }
            }
            editButton.title = $(".textArea1").val();
            editButton.msg = $(".textArea2").val();
            $(".form-modal").hide();
            $(".cardColumn").html("");
            display();
        }
    })
    //Fatch object function
    function fetchObj(pid) {
        let returnObj;
        list.forEach(function (fetchedObj) {
            if (pid == fetchedObj.id) {
                returnObj = fetchedObj;
            }
        })
        return returnObj;
    }
    //Delete button functionality
    $(document).on("click", ".deleteBtn", function () {
        let deleteBtnId = $(this).attr("deleteId");
        removeElement(deleteBtnId);
        $(`.${deleteBtnId}`).remove();
        CountOfCards--;
        $(".cardCount").text(CountOfCards);
        //remove element
        function removeElement(ppid) {
            let objList = fetchObj(ppid);
            let index = list.indexOf(objList);
            list.splice(index, 1);
            $(ppid).remove();
        }
    })
})

