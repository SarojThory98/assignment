function pID() {
    return Math.floor(Math.random() * Date.now());
}
const cards = [
    {
        pid: pID(),
        img: "camera_img.avif",
        name: "Fujifilm mirrorless camera",
        p_code: 1001,
        MRP: 6000,
        price: 4500
    },
    {
        pid: pID(),
        img: "watch_img.avif",
        name: "FitBit Versa Smartwatch",
        p_code: 1002,
        MRP: 2000,
        price: 1600
    },
    {
        pid: pID(),
        img: "headphones_img.avif",
        name: "Sony Wireless Headphones",
        p_code: 1003,
        MRP: 0,
        price: 300
    },
    {
        pid: pID(),
        img: "speaker_img.avif",
        name: "Bose Portable Speaker",
        p_code: 1004,
        MRP: 2000,
        price: 1800
    },
    {
        pid: pID(),
        img: "tablet_img.avif",
        name: "SAMSUNG Galaxy Tablet",
        p_code: 1005,
        MRP: 0,
        price: 2000
    },
    {
        pid: pID(),
        img: "printer_img.avif",
        name: "EPSON Inkjet Printer",
        p_code: 1006,
        MRP: 3000,
        price: 2500
    }
];

//function to print cards
function getInfo(item) {
    let mrp_val = '';
    if (item.MRP != 0) {
        mrp_val = ` <del> SEK: ${item.MRP} </del>`
    }
    return `<div class="grid-item">
    <img class="card-img" src=${item.img} alt="image">
    <div class="body-card">
        <p class="title">${item.name}</p>
        <p class="text">
            X-A7 24.2 MP Mirrorless Camera with XC 15-45 mm Lens-Camel</p>
        <p>
            Product Code: ${item.p_code}
        </p>
        <p>    
        <a type="button" class="${item.pid} see-btn"style="text-decoration: none;" onclick = "seeMore('${item.pid}1')">See more information <i class="fa-solid fa-chevron-down"></i></a>

        <div class="more-content" id="${item.pid}1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, quas!</div>
        
        </p>
        <p>Price: SEK ${item.price} ${mrp_val}</p>
        <p class="buttons">
        <button class="addBtn" type="button" onclick="addList('${item.pid}')">Add to list</p>
    </div>
    </div>`
}

const allItems = cards.map(getInfo);
document.getElementById('cards').innerHTML = allItems.join(" ");

//function definition for read less-more information
function seeMore(mId) {
    let ButtonId = document.getElementsByClassName(mId)[0];
    let content = document.getElementById(mId);
    if (content.style.display == "none") {
        content.style.display = "inline";
        ButtonId.innerHTML = "See more information<i class='fa-solid fa-chevron-down'></i>";

    }
    else {
        content.style.display = "none";
        ButtonId.innerHTML = "See less information<i class='fa-solid fa-chevron-down'></i>";

    }
}

//fetch object
function fetchObj(pid) {
    let findObj = cards.find((obj) => obj.pid == pid);
    return findObj;
}

//remove element
function removeElement(ppid) {
    let objList = fetchObj(ppid);
    let index = listItem.indexOf(objList);
    listItem.splice(index, 1);
    console.log(document.getElementById(ppid));
    document.getElementById(ppid).remove();
    SetWishlist();

}

//add item into list
let listItem = [];
function addList(apid) {
    let objList = fetchObj(apid);

    const { pid, name, price, MRP } = objList;
    if (listItem.includes(objList)) {
        alert("item already in wishlist");
        return false;
    }
    listItem.push(objList);
    SetWishlist();
}

function SetWishlist() {
    let t_price = 0;
    if (listItem.length > 0) {
        let visibleList = listItem.map(function (newObj) {
            t_price = t_price + newObj.price;
            let save_amt = (newObj.MRP == 0) ? `(You saved 0)` : `(You saved ${newObj.MRP - newObj.price})`;
            return `
            <li id="${newObj.pid}">${newObj.name}-SEK ${newObj.price} ${save_amt} 
            <a class= "rbutton rm-btn ${newObj.pid}" onclick ="removeElement('${newObj.pid}')">Remove</a></li>
            `;
        });
        document.getElementsByClassName("listColumn")[0].innerHTML = visibleList.join("\n");
    }
    else {
        document.getElementsByClassName("listColumn")[0].innerHTML = " ";
    }
    document.getElementsByClassName("listAmt")[0].innerHTML = `Your Wishlist Total is: SEK ${t_price}`
}




