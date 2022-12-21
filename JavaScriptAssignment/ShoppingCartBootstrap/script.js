let t_price = 0;
let array_add = [];
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
        MRP: 300,
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
        MRP: 2000,
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
console.log(cards);
function getInfo(item) {
    var id_collapse1 = "#" + "i" + item.pid;
    var id_collapse2 = "i" + item.pid;
    return `<div class="col-6 col-sm-4 p-3 pb-0">
    <div class="card flex-fill">
    <img class="card-img-top" src=${item.img} alt="camera image" style="height:150px">
    <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">
            X-A7 24.2 MP Mirrorless Camera with XC 15-45 mm Lens-Camel
        <p>
            <small>Product Code: ${item.p_code}</small>
        </p>
        <p>
            <small>
                <a id="collapse_id" class="text-primary" data-bs-toggle="collapse" data-bs-target='${id_collapse1}' style="text-decoration: none;">See more information <i class="fa-solid fa-chevron-down"></i></a>
                <div id="${id_collapse2}" class="collapse hide">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, rerum! Fugit architecto dolorum dolore non
                </div>
                
            </small>
            
        </p>
        <p>Price: SEK ${item.price} <del class="text-danger"> SEK: ${item.MRP} <del></p>
        <p class="d-flex justify-content-sm-end justify-content-center">
        <button type="button" class="btn btn-sm"><i class="d-sm-none d-block fa-solid fa-cart-plus" onclick="addList('${item.pid}')"></i></button>
        <button type="button" class="btn btn-dark btn-sm d-sm-block d-none" onclick="addList('${item.pid}')">Add to list</button>
        
        </p>
        </p>
    </div>
    </div>
    </div>`

}

const allItems = cards.map(getInfo);
for (let i = 0; i < allItems.length; i++) {
    document.getElementById('card6').innerHTML += allItems[i];
}

function fetchObj(pid) {
    for (let j = 0; j < cards.length; j++) {
        if (pid == cards[j].pid) {
            return cards[j];
        }
    }
}

function removeElement(pid) {
    const ReObj = fetchObj(pid);
    const ele = document.getElementById(pid);
    ele.remove();
    array_add.pop(pid);
    t_price = t_price - parseInt(ReObj.price);
    document.getElementById('listAmt').innerHTML = `Your Wishlist total is: SEK ${t_price}`;
}


function addList(pid) {
    let list_obj = fetchObj(pid);

    if (array_add.includes(pid)) {
        alert("item already in wishlist");
        return false;
    }
    else {
        array_add.push(pid);
        document.getElementById('listColumn').innerHTML += `
       <li id="${pid}">
       ${list_obj.name} - SEK ${list_obj.price} (You saved: SEK ${parseInt(list_obj.MRP) - parseInt(list_obj.price)})
       <button class="text-danger btn btn-link" onclick="removeElement('${pid}')">remove</button>
       </li>`;

        t_price = t_price + parseInt(list_obj.price);
        document.getElementById('listAmt').innerHTML = `Your Wishlist total is: SEK ${t_price}`
    }
}




