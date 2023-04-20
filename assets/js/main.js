const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const btnAdds = $$(".js-btnadd");

const blockbtnAdds = $$(".content__item--add");

function start() {
  //click +
  handleClickbtnAdds();
  //reload khong mat data
  showReload();
}

start();

// func add block input in Block Add when click icon +
function handleClickbtnAdds() {
  const creatDiv = document.createElement("div");
  const globalForm = $(".app");

  creatDiv.id = "div-js";
  let htmls = `
    <input type="text" placeholder = "content..." class="input-js"/>
    <input type ="file" class = "file-js"/>
    <button>add</button>
    <div id="close">
    <i class="fa-solid fa-xmark"></i>
    </div>
  `;

  for (let btnadd of btnAdds) {
    //click +
    btnadd.addEventListener("click", function (e) {
      // ngăn even close nổi bọt lên +
      e.stopPropagation();

      let blockAdd = e.target.parentNode.parentNode;
      creatDiv.innerHTML = htmls;
      blockAdd.appendChild(creatDiv);

      // open form
      const open = $("#div-js");
      open.classList.remove("close");

      // import items and get items (lick button)
      const buttonAdd = $("button");
      buttonAdd.addEventListener("click", (e) => {
        const blItem = e.target.parentNode.parentNode;
        getDataAndAddData();

        // getdata localstroage
        const infoData = JSON.parse(localStorage.getItem("data"));
        // kiem tra value in localstogra
        if (infoData) {
          const blDivv = document.createElement("div");
          blDivv.className = "content__item--child";
          const htmlss = infoData.map((item) => {
            return `
                    <div class="item__child">
                    <i class="iconR fa-solid fa-trash js-trash"></i>
                      <div class="textimg">
                          <p>Space Task2</p>
                            
                            <img src="${item.path}" alt="avt">
                        </div>
                        <p class="text--item">${item.content}</p>
                    </div>

        `;
          });
          blDivv.innerHTML = htmlss.join("");

          blItem.appendChild(blDivv);
        } else {
          alert("data null");
        }
        resetInput();
        //call function

        clearItem();
      });

      // ngăn even close nổi bọt lên form
      open.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      // close form when click global
      globalForm.addEventListener("click", () => {
        open.classList.add("close");
      });

      closeFormInput();
    });
  }
}
//get data and inport data inblock
function getDataAndAddData() {
  const valueInputtext = $(".input-js").value;
  const valueInputfile = $(".file-js");

  const btnbutton = $("button");
  // lấy địa chỉ của khối chứa nó
  let blbtn = btnbutton.parentNode.parentNode;
  let childbl = blbtn.querySelector(
    ".content__item--add p:first-of-type"
  ).textContent;
  if (valueInputfile.files.length === 0 || valueInputtext === "") {
    alert("Please entry information!");
  } else {
    let file = valueInputfile.files[0].name;
    var newinfomation = {
      content: valueInputtext,
      path: "./assets/img/" + file,
      adress: childbl,
    };

    var information = [];

    information.push(newinfomation);
    // set data in local storage
    localStorage.setItem("data", JSON.stringify(information));
  }
} // close form
function closeFormInput() {
  const closeForm = $("#close");
  const close = $("#div-js");
  closeForm.addEventListener("click", function (e) {
    close.classList.add("close");
  });
}
//remove items
function clearItem() {
  const clearItem = $$(".js-trash");
  for (let item of clearItem) {
    item.addEventListener("click", (e) => {
      const blItemtrash = e.target.parentNode.parentNode.parentNode;
      const itemtrash = e.target.parentNode.parentNode;

      blItemtrash.removeChild(itemtrash);
      localStorage.setItem("data", JSON.stringify(null));
    });
  }
}

function resetInput() {
  let focusInput = $(".input-js");
  focusInput.value = "";
  focusInput.focus();
  let chosenInput = $(".file-js");
  chosenInput.value = "";
}

function showReload() {
  const infoData = JSON.parse(localStorage.getItem("data"));
  let address = infoData[0].adress;

  const allP = $$("p");
  let addr;
  for (let i = 0; i < allP.length; i++) {
    if (allP[i].textContent === address) {
      addr = allP[i].parentNode.parentNode;
      break;
    }
  }
  // kiem tra value in localstogra
  if (infoData) {
    const blDivv = document.createElement("div");
    blDivv.className = "content__item--child";
    const htmlss = infoData.map((item) => {
      return `
                    <div class="item__child">
                    <i class="iconR fa-solid fa-trash js-trash"></i>
                      <div class="textimg">
                          <p>Space Task2</p>

                            <img src="${item.path}" alt="avt">
                        </div>
                        <p class="text--item">${item.content}</p>
                    </div>

        `;
    });
    blDivv.innerHTML = htmlss.join("");

    addr.appendChild(blDivv);
  } else {
    alert("data null");
  }
   clearItem();
}
