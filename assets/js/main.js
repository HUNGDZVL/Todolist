const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const btnAdds = $$(".js-btnadd");

const blockbtnAdds = $$(".content__item--add");

function start() {
  //click +
  handleClickbtnAdds();
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
        const blDivv = document.createElement("div");
        blDivv.className = "content__item--child";
        const htmlss = `
                    <div class="item__child">
                    <i class="iconR fa-solid fa-trash js-trash"></i>
                      <div class="textimg">
                          <p>Space Task2</p>
                            
                            <img src="${infoData.path}" alt="avt">
                        </div>
                        <p class="text--item">${infoData.content}</p>
                    </div>

        `;
        blDivv.innerHTML = htmlss;

        blItem.appendChild(blDivv);
        //call function
        // localStorage.setItem("data", JSON.stringify(null));

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
  if (valueInputfile.files.length === 0 || valueInputtext === "") {
    alert("Please entry information!");
  } else {
    let file = valueInputfile.files[0].name;
    var information = {
      content: valueInputtext,
      path: "./assets/img/" + file,
    };
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
    });
  }
}
