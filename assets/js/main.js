const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const btnAdds = $$(".js-btnadd"); // lấy tất cả nút add

const blockbtnAdds = $$(".content__item--add"); // lấy tất cả thẻ cha chưa nút add

function start() {
  //gọi hàm nếu click nút +
  handleClickbtnAdds();
  //reload lại trình duyệt
  showReload();
  //số lượng item trong danh sách
  CountItems();
  // hàm kéo thả
  dragAndDrop();
  //edit content
  editText();
}

start();

// hàm tạo form điền thông thi khi click nút add +
function handleClickbtnAdds() {
  const globalForm = $(".app");
  // tạo thẻ div và class để css form
  const creatDiv = document.createElement("div");

  creatDiv.id = "div-js";
  //tạo đoạn code html
  let htmls = `
    <input type="text" placeholder = "content..." class="input-js"/>
 
    
    <input type="text" list="avts" class = "file-js" placeholder = "chosen..." >
      <datalist id="avts">
        <option value="avt1.png">
        <option value="avt2.avif">
        <option value="avt3.avif">
        <option value="avt4.avif">
        <option value="avt5.avif">
        <option value="child1.avif">

      </datalist>

    <button>add</button>
    <div id="close">
    <i class="fa-solid fa-xmark"></i>
    </div>
  `;
  // duyệt qua tất cả các nút add trong html
  for (let btnadd of btnAdds) {
    //
    btnadd.addEventListener("click", function (e) {
      // ngăn even close form nổi bọt lên +
      e.stopPropagation();

      // thêm form input thông qua appendChild
      let blockAdd = e.target.parentNode.parentNode;
      creatDiv.innerHTML = htmls;
      blockAdd.appendChild(creatDiv);

      // mở form
      const open = $("#div-js");
      open.classList.remove("close");

      //thêm item và lấy dữ liệu trong form vừa nhập thông qua hành vi click button trong form
      const buttonAdd = $("button");
      buttonAdd.addEventListener("click", (e) => {
        // lấy thẻ cha chứa các item
        const blItem = e.target.parentNode.parentNode;
        getDataAndAddData(); // gọi hàm lấy dữ liệu

        // getdata localstroage
        // const infoData = JSON.parse(localStorage.getItem("data"));
        // console.log(infoData.length);
        // kiem tra value in localstogra
        //show Item When Click Add

        // lấy dữ liệu trong form input
        const valuetext = blItem.querySelector(".input-js").value;
        const valuefile = blItem.querySelector(".file-js").value;

        //kiểm tra dữ liệu và in ra trình duyệt
        if (valuefile === "" || valuetext === "") {
          alert("Please entry information!");
        } else {
          let filess = valuefile;
          let info = {
            content: valuetext,
            path: "./assets/img/" + filess,
          };

          const blDivvv = document.createElement("div");
          blDivvv.className = "content__item--child";
          blDivvv.setAttribute("draggable", "true");
          let htmlsss = `
           <div class="item__child">
                    <i class="iconR fa-solid fa-trash js-trash"></i>
                    <div class="edit-js"><i class="fa-solid fa-pen"></i></div>

                      <div class="textimg">
                          <p>Space Task2</p>

                            <img src="${info.path}" alt="avt" class="js--img">
                        </div>
                        <p class="text--item">${info.content}</p>
                    </div>
        `;

          blDivvv.innerHTML = htmlsss;
          blItem.appendChild(blDivvv);
          setTimeout(CountItems(), 100);
          editText();
        }

        //reset innput sau khi add
        resetInput();

        clearItem(); // remove
        // reloadPageAfterDelay(20);
      });

      // ngăn even close nổi bọt lên form
      open.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      // close form khi click ngoài phạm vi
      globalForm.addEventListener("click", () => {
        open.classList.add("close");
      });
      clearItem();

      closeFormInput();
    });
  }
}

//get data and inport data inblock
function getDataAndAddData() {
  // lấy dữ liệu hai thẻ input
  const valueInputtext = $(".input-js").value;
  const valueInputfile = $(".file-js").value;

  const btnbutton = $("button");
  // lấy địa chỉ của khối cha chứa button
  let blbtn = btnbutton.parentNode.parentNode;
  //lấy text element classname > lấy thẻ p đầu tiên
  let childbl = blbtn.querySelector(
    ".content__item--add p:first-of-type"
  ).textContent;

  // kiểm tra dữ liệu người dùng nếu nhập thiếu 1 trong 2 cái sẽ cảnh báo
  if (valueInputfile === "" || valueInputtext === "") {
    alert("Please entry information!");
  } else {
    // thêm dữ liệu người dùng vừa nhập vào object
    let file = valueInputfile;
    let newinfo = {
      content: valueInputtext,
      path: "./assets/img/" + file,
      adress: childbl,
    };
    // lấy dữ liệu từ localstrorage và kiểm tra xem nếu 0 có thì gán biến là một [] rỗng
    let information = localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : [];
    // let information = [];
    // if (localStorage.getItem("data")) {
    //   information = JSON.parse(localStorage.getItem("data"));
    // } else{
    //   information = [];
    // }
    // thêm dữ liệu từ object vừa lấy từ người dùng và push vào cuối mảng vừa khỏi tạo từ localstorge

    information.push(newinfo);
    // thêm lại dữ liệu vào localstorge

    localStorage.setItem("data", JSON.stringify(information));
  }
} // đóng form input
function closeFormInput() {
  const closeForm = $("#close");
  const close = $("#div-js");
  closeForm.addEventListener("click", function () {
    close.classList.add("close");
  });
}
// hàm xóa item trong trình duyệt và xóa item khỏi localstorage
function clearItem() {
  // lấy icon xóa và duyệt tất cả qa chúng
  const clearItem = $$(".js-trash");
  for (let item of clearItem) {
    item.addEventListener("click", (e) => {
      // truyền cho mỗi icon xóa 1 event click để lấy ra item chứa nó và khối cha chứa các item đó
      const blItemtrash = e.target.parentNode.parentNode.parentNode;
      const itemtrash = e.target.parentNode.parentNode;
      // lấy text p thứ 2 trong các item
      let texts = itemtrash.querySelectorAll("p");
      let text = texts[1].textContent;

      let imgsrc = itemtrash.querySelector("img").src;
      var filename = imgsrc.split("/").pop(); // Trích xuất tên tệp tin từ đường dẫn (path) của hình ảnh
      //get data from local storage

      // lấy dữ liệu trong localstorage và kiểm tra xem dữ liệu
      let itemData = JSON.parse(localStorage.getItem("data"));
      for (let i = 0; i < itemData.length; i++) {
        // nếun như dữ liệu content trong local  trùng với text trong item chứa icon xóa thì tại vị trí thứ i trong local căt đi 1 phần từ thông qua splice
        if (
          itemData[i].content ===
          text /*&& itemData[i].path.split("/").pop() === filename*/
        ) {
          itemData.splice(i, 1); // cat object chứa thông tin xóa tại vị trí thứ i
        }
        // set lại dữ liệu trong localstorage
        localStorage.setItem("data", JSON.stringify(itemData));
      }
      // xóa item khỏi trình duyệt khi click
      blItemtrash.removeChild(itemtrash);
      // cập nhật lại số lượng item
      setTimeout(CountItems(), 100);
    });
  }
}
// hàm reset lại form input
function resetInput() {
  let focusInput = $(".input-js");
  focusInput.value = "";
  focusInput.focus();
  let chosenInput = $(".file-js");
  chosenInput.value = "";
}
// hiện ra các item đã thêm vào localstorage sau khi reload lại trang
function showReload() {
  let infoData = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : []; // lấy dư liệu và kiểm tra dữ liệu
  var addr;
  if (infoData.length > 0) {
    // tạo 3 biến để lấy dữ liệu trong object data local
    let address;
    let contentid;
    let pathid;
    for (let i = 0; i < infoData.length; i++) {
      address = infoData[i].adress;
      contentid = infoData[i].content;
      pathid = infoData[i].path;

      const allP = $$("p");
      // duyệt tất cả thẻ p
      for (let i = 0; i < allP.length; i++) {
        // kiểm tra xem text trong thẻ P có bằng với text của address trong localstore hay không
        if (allP[i].textContent === address) {
          // lấy ra thẻ cha cấp 2 của thẻ P chứa đoạn text nằm trong data của local (block cha chứa các item con)
          addr = allP[i].parentNode.parentNode;
          break;
        }
      }

      // kiểm tra dữ liệu trong localstorage nếu có thì...
      if (infoData) {
        // tạo một thẻ div có class name đã css sẵn
        const blDivv = document.createElement("div");
        blDivv.className = "content__item--child";
        blDivv.setAttribute("draggable", "true");
        // tạo biến htmls để lưu các giá trị trong localstorage
        const htmlss = infoData.map((item) => {
          // kiểm tra dữ liệu và setup vị trí xuất hiện cho các dữ liệu có trong localstorage
          if (
            item.adress === address &&
            item.path === pathid &&
            item.content === contentid
          ) {
            return `
                    <div class="item__child">
                     <div class="edit-js"><i class="fa-solid fa-pen"></i></div>
                    <i class="iconR fa-solid fa-trash js-trash"></i>
                      <div class="textimg">
                          <p>Space Task2</p>

                            <img src="${item.path}" class="js--img" alt="avt">
                        </div>
                        <p class="text--item js--content">${item.content}</p>
                    </div>

        `;
          }
        });
        // thêm đoạn code htmlss vào div vừa tạo sẵn
        blDivv.innerHTML = htmlss.join("");
        // tại khối block chứa đoạn div dùng append để thêm đoạn code div vừa tạo
        addr.appendChild(blDivv);
      } else {
        alert("data null");
      }
    }
  }
  //gọi hàm xóa item nếu click nút xóa
  clearItem();
}

// đếm số lượng sản phảm
function CountItems() {
  const Listitem = $$(".container__content--item"); //parent cha chứa sản phẩm
  for (let item of Listitem) {
    let slItem = item.querySelectorAll(".content__item--child"); //item trong list
    let textsl = item.querySelectorAll(".content__item--add p"); // text hiện thị sô lượng
    let sltext = textsl[1];
    sltext.textContent = slItem.length; // gán lại giá trị sô lượng bằng số lượng hiện có trong list
  }
}

// hàm di chuyển các item trong html
//get parentchild
function dragAndDrop() {
  const columns = $$(".container__content--item");
  // lấy danh sách phần từ cha chứa các phần tử con
  // gán hai event drapstart and drapend
  //start
  //khi bắt đầu kéo thả thi add một class dragging vô
  document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
  });
  //end
  // khi kéo thả hoàn thành thì class đó đi
  document.addEventListener("dragend", (e) => {
    updatelocalstorage();

    e.target.classList.remove("dragging");
  });
  // add event dragover cho từng khối danh sách chưa các item
  columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
      //khi người dung kéo một phần tử đến vị trí của phần tử đang xét hàm dưới
      const dragging = document.querySelector(".dragging");
      // được gọi để xác định vị trí phân tử được kéo so với cấc phần tử khác trong cột
      const applyAfter = getNewPosition(item, e.clientY);

      //nếu như không có phần tử nào trong cột có vị trí trung tâm lớn hơn vị trí của phần tử được kéo thì phần tử được kéo sẽ được đặt lên đầu côt băng phuong thức prepend
      if (applyAfter) {
        applyAfter.insertAdjacentElement("afterend", dragging);
      } else {
        item.append(dragging); //thêm vào cuối mảng
      }

      CountItems(); // update số lượng item
    });
  });

  function getNewPosition(column, posY) {
    //lấy tất cả phần tử con của cột bằng cach sư dụng $$
    const cards = column.querySelectorAll(
      ".content__item--child:not(.dragging)"
    );
    let result;
    // lặp qua tât  cả các phần tử con và tính toán vị trí trung tâm của các phần tử,
    //nếu vị trí của phần tư được kéo nhỏ hơn vị trí trung tâm của phần tử đang xét,
    // vị trí của phần tử được kéo được đặt trước phần tử đang xét bằng cách sử dụng phương thức inserAd...
    for (let refer_card of cards) {
      const box = refer_card.getBoundingClientRect();
      const boxCenterY = box.y + box.height / 2;

      if (posY < boxCenterY) result = refer_card;
    }
    return result;
  }
}

function updatelocalstorage() {
  // lấy các item vừa thêm từ người dùng
  const inputlast = $$('div[draggable="true"]');

  let datalocalnew = [];
  // duyệt qua tất cả các item vừa tìm được
  for (let i = 0; i < inputlast.length; i++) {
    // lấy ra dữ liệu text trong form
    let datacontent = inputlast[i].querySelector(".text--item");
    let datatextcontetn = datacontent.textContent;
    //lấy ra dữ liệu hình ảnh trong form
    let dataimg = inputlast[i].querySelector(".js--img").src.split("/").pop();

    //lấy ra địa chỉ chưa các item trong form
    let path = inputlast[i].parentNode;
    let datapath = path.querySelector("p").textContent;
    //tao object chứa các item
    let newdatalocal = {
      content: datatextcontetn,
      path: "./assets/img/" + dataimg,
      adress: datapath,
    };
    //them object vào item
    datalocalnew.push(newdatalocal);
    localStorage.setItem("data", JSON.stringify(datalocalnew));
  }
}

function editText() {
  const iconEdits = $$(".edit-js");
  for (let icon of iconEdits) {
    // const countinput = 1; // check số lượng input edit

    icon.addEventListener("click", (e) => {
      let blockIcon = e.target.parentNode.parentNode;
      //lấy p chứa content edit
      let Ptext = blockIcon.querySelector(".text--item");
      // them inputedit vao the p

      let inputEdit = document.createElement("input");
      inputEdit.setAttribute("type", "text");
      inputEdit.setAttribute("class", "inputedit");
      // gán value input là nội dung của text contetn
      inputEdit.setAttribute("value", Ptext.textContent);
      // giới hạn thể input được thêm
      const checkinput = $(".inputedit");
      blockIcon.appendChild(inputEdit); //them thẻ input vào block item

      Ptext.style.display = "none";
      // hiện inpuedit ra
      inputEdit.style.display = "block";
      //focus inputedi để sửa nội dung của text content, focus vào cuối value
      inputEdit.selectionEnd = inputEdit.value.length;
      inputEdit.focus();
      // Cho phép người dùng sửa đổi đoạn văn bản trong phần tử input
      inputEdit.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
          // Kiểm tra nếu người dùng nhấn phím Enter
          // Cập nhật đoạn văn bản trong thẻ p và ẩn phần tử input
          Ptext.textContent = inputEdit.value;
          inputEdit.style.display = "none";
          Ptext.style.display = "block";
          //update dữ liệu
        }
        updatelocalstorage();
      });
    });
  }
}

//export file xlsx

const exportButton = document.getElementById("js-export");

exportButton.addEventListener("click", () => {
  // Lấy dữ liệu từ LocalStorage và chuyển đổi sang định dạng dữ liệu của thư viện xlsx
  const dataExport = JSON.parse(localStorage.getItem("data"));
  console.log(dataExport);

  const workbook = XLSX.utils.book_new();
  // tạo bảng tính mới bằng xlsx
  const worksheet = XLSX.utils.json_to_sheet(dataExport);
  XLSX.utils.book_append_sheet(workbook, worksheet, "My Sheet");
  //tạo file chứa data
  const fileName = "myData.xlsx";
  //ghi dữ liệu vô file
  XLSX.writeFile(workbook, fileName);
  // Tạo sự kiện click cho nút xuất file Excel
});
