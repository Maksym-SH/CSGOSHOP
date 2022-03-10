Vue.component("footer-component", {
  template: `<footer class="footer">
  <div class="footer-between">
    <div class="footer-logo">
      <img src="./img/logo.svg" alt="" />
      Csgo<span class="logo-shop">shop</span>
      <div class="footer-logo__info">
        <p class="footer-logo__info--text">
          Будь-ласка, дотримуйтесь усіх правил при користуванні сайтом, за
          помилки, які ви допустили під час роботи з сайтом ми
          відповідальности не несемо.
        </p>
      </div>
    </div>
    <div class="footer__wrap">
      <h5>Зв'язатися з нами</h5>
      <div>
        <a href="https://vk.com/max185" target="_blank"><img src="./img/vk.svg" alt="" /></a>
        <a href="https://github.com/Maksym-SH/CSGOSHOP" target="_blank">
          <img src="./img/github.svg" alt="" />
        </a>
        <a href="https://www.instagram.com/_mak.s0n/" target="_blank">
        <img src="./img/instagram.svg" alt="" class="small-icon" />
      </a>
      </div>
    </div>
    <div class="footer__pay">
      <div class="replenishment">
        Ми приймаємо такі способи
        <br />
        поповнення рахунку
        <br />
        <img src="./img/mastercard.svg" alt="" />
        <img src="./img/visa.svg" alt="" />
      </div>
      <p>
        Copyright © 2022 CSGOSHOP.
        <br />
        Усі права захищені.
      </p>
    </div>
  </div>
  </footer>`,
});
Vue.component("header-component", {
  data() {
    return {
      isEmpty: "",
      loginPage: this.params.isLoginPage ?? false,
      headerNav: [
        {
          name: "До головної",
          path: "Main.html",
          engName: "main",
        },
        {
          name: "Питання",
          path: "Questions.html",
          engName: "question",
        },
        {
          name: "Кейси",
          path: "Cases.html",
          engName: "cases",
        },
        {
          name: "Інвентар",
          path: "Inventory.html",
          engName: "inventory",
        },
        {
          name: "Обмін",
          path: "Trade.html",
          engName: "trade",
        },
      ],
    };
  },
  props: {
    params: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    showNavigation() {
      return this.headerNav.filter(
        (item) => item.engName !== this.params.currentPage
      );
    },
  },
  template: `
  <header class="header">
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a href="Main.html" class="navbar-brand logo"
        ><img src="./img/logo.svg" alt="" /> Csgo<span class="logo-shop"
          >shop</span
        ></a
      >
      <button
        class="navbar-toggler bg-light link-info"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <nav class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <li v-for="link in showNavigation">
            <a class="nav-link" :href='link.path'>{{link.name}}</a>
          </li>
        </ul>
        <template v-cloak>
          <div class="login-failed" v-if="params.login ? !params.login : true">
            <a href="LoginSteam.html" v-if="!loginPage"
            ><button type="button" class="btn btn-primary">
              <img src="./img/steam.svg" alt="" /> Увіти за допомогою
              STEAM
            </button>
            </a>
            <h6 v-else class="login-failed__info">Вхід до акаунту не виконаний</h6>
          </div>
          <div
            v-else-if="params.login && !params.isMdWidth"
            class="header__login-success"
          >
            <p class="header__balance">Баланс {{params.balance ? params.balance : 0}}₴</p>
            <div class="ellips-icon">{{ params.savedLogin ? params.savedLogin : isEmpty }}</div>
          </div>
        </template>
      </nav>
    </div>
  </nav>
</header>`,
});
Vue.directive("filter", {
  bind: function (el, binding) {
    this.inputHandler = function (e) {
      var ch = String.fromCharCode(e.which);
      var re = new RegExp(binding.value);
      if (!ch.match(re)) {
        e.preventDefault();
      }
    };
    el.addEventListener("keypress", this.inputHandler);
  },
  unbind: function (el) {
    el.removeEventListener("keypress", this.inputHandler);
  },
  inputHandler: null,
});
new Vue({
  el: "#app",
  data: {
    weapon: [],
    info: [],
    popular: [],
    cases: [],
    popularAccess: false,
    preloader: true,
    isNewUser: null,
    isOldUser: null,
    isLoginPage: true,
    IsLoginSuccess: false,
    casesLoad: false,
    caseItem: {},
    caseSkins: [],
    unSortedCaseSkins: [],
    popapInfoSkin: {},
    insufficientFunds: false,
    popapActive: false,
    password: "",
    repeatPassword: "",
    login: "",
    userInfo: {},
    imgCT: true,
    valueCheckRobot: "",
    checkRobot: false,
    wrongLogin: false,
    checkRobotText: "",
    robotValueComparison: false,
    savedLogin: "",
    balance: 66660,
    isMdWidth: false,
    popapInfoAccountActive: false,
    loginTime: "",
    needLogin: null,
    replenishmentActive: false,
    methodPay: {},
    methodPayActive: false,
    cardDate: {
      month: "",
      year: "",
    },
    cardNumber: [],
    paySum: "",
    cardDateYears: [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    cvvCard: "",
    cardOwner: "",
    wrongCardData: false,
    correctCardData: false,
    isSmallDisplay: false,
    imgPresentInPopap: true,
    winThing: {},
    disableOpenCase: false,
    caseInventory: {},
    personalInventory: [],
    selectInventorySkin: {},
    action: "",
    getSkin: [],
    selectInventoryIndex: null,
    selectType: "Всі",
    buyChecked: "buy",
    ownSkinForSwap: {},
    buySkinForSwap: {},
    buySkinForBuy: {},
    warningForBuy: false,
    smallBalance: false,
    warningForSwapText: "",
    priceForBuy: 0,
    resultSwapItems: "",
    skinsForWithdrow: [],
    loadWithdrowPreloader: false,
  },
  methods: {
    checkDataValidation(event) {
      event.target.value.length <= 2
        ? (this.cardDate.month = event.target.value)
        : (this.cardDate.year = event.target.value);
    },
    actionBuy(str) {
      str === "yes"
        ? (this.warningForBuy = true)
        : (this.warningForBuy = false);
      if (this.buyChecked === "trade" && str === "swap") {
        if (
          this.resultSwapItems === "withdrow" &&
          this.balance > this.priceForBuy
        ) {
          this.balance -= this.priceForBuy;
        } else if (this.resultSwapItems === "back") {
          this.balance += this.priceForBuy;
        } else if (this.balance < this.priceForBuy) {
          this.smallBalance = true;
          setTimeout(() => {
            this.smallBalance = false;
          }, 3000);
          this.warningForBuy = false;
          return;
        }
        if (this.resultSwapItems !== "") {
          this.personalInventory.splice(
            this.personalInventory.indexOf(this.ownSkinForSwap, 0),
            1
          );
          this.personalInventory.push(this.buySkinForSwap);
          if (Object.keys(this.buySkinForSwap).length) {
            this.buySkinForSwap.number -= 1;
            this.ownSkinForSwap.number += 1;
            this.selectWeaponType.filter(
              (item) => item.id === this.ownSkinForSwap.id
            )[0].number += 1;
            let deleteSkin = fetch(
              `http://localhost:3000/weapon/${this.buySkinForSwap.id}`,
              {
                method: "PUT",
                body: JSON.stringify(this.buySkinForSwap),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            ).then((res) => res.json());
            let addSkin = fetch(
              `http://localhost:3000/weapon/${this.ownSkinForSwap.id}`,
              {
                method: "PUT",
                body: JSON.stringify(this.ownSkinForSwap),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            ).then((res) => res.json());
            Promise.all([addSkin, deleteSkin]).then(() => {
              this.buySkinForSwap = this.ownSkinForSwap = {};
              localStorage.balance = this.balance;
              localStorage.personalInventory = JSON.stringify(
                this.personalInventory
              );
            });
          }
        }
        this.warningForBuy = false;
      } else if (this.buyChecked === str && str === "buy") {
        if (this.balance >= this.buySkinForBuy.price) {
          this.balance -= this.buySkinForBuy.price;
          localStorage.balance = this.balance;
          this.personalInventory.push(this.buySkinForBuy);
          this.buySkinForBuy.number -= 1;
          fetch(`http://localhost:3000/weapon/${this.buySkinForBuy.id}`, {
            method: "PUT",
            body: JSON.stringify(this.buySkinForBuy),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((data) => data.json())
            .then(() => {
              localStorage.personalInventory = JSON.stringify(
                this.personalInventory
              );
              this.buySkinForBuy = {};
            });
        } else {
          this.smallBalance = true;
          setTimeout(() => {
            this.smallBalance = false;
          }, 3000);
          this.warningForBuy = false;
          return;
        }
      }
    },
    swapItems(str, index) {
      if (this.buyChecked === "trade") {
        str === "own"
          ? (this.ownSkinForSwap = this.personalInventory[index])
          : str === "buy"
          ? (this.buySkinForSwap = this.selectWeaponType[index])
          : null;
      } else if (this.buyChecked === "buy") {
        this.buySkinForBuy = this.selectWeaponType[index];
      }
    },
    formClear() {
      this.cardNumber = [];
      this.paySum = this.cvvCard = this.cardOwner = "";
      this.cardDate = {};
    },
    checkPayValidation() {
      if (this.fieldsIsCorrect) {
        for (item of this.cardNumber) {
          if (item.length === 4) {
            continue;
          } else {
            this.wrongCardData = true;
            break;
          }
        }
        this.balance += +this.paySum;
        localStorage.balance = this.balance;
        this.correctCardData = true;
        this.formClear();
      } else {
        this.wrongCardData = true;
      }
    },
    Payment(method) {
      if (method === "visa") {
        (this.methodPay.method = "Visa"),
          (this.methodPay.path = "./img/visaImage.png");
      } else if (method === "mastercard") {
        this.methodPay.method = "MasterCard";
        this.methodPay.path = "./img/mastercardImage.png";
      }
      this.methodPayActive = true;
    },
    shopPopapSkin(index, str) {
      this.popapInfoSkin = [];
      if (str == "main") this.popapInfoSkin = this.popular[index];
      if (str === "cases") this.popapInfoSkin = this.caseSkins[index];
      this.popapActive = true;
    },
    showPassword() {
      this.$refs.input.setAttribute("type", "text");
    },
    hidePassword() {
      this.$refs.input.setAttribute("type", "password");
    },
    checkForRobot() {
      let randWord =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
      let text = "";
      if (!this.isNewUser) {
        let response = async () => {
          return fetch("http://localhost:3000/users");
        };
        response()
          .then((data) => data.json())
          .then((item) => {
            let userData =
              Array.from(item).find(
                (item) =>
                  item.login === this.login && item.password === this.password
              ) ?? {};
            if (Object.keys(userData).length) {
              this.isOldUser = true;
              for (let i = 0; i < 6; i++) {
                text += randWord.charAt(
                  Math.floor(Math.random() * randWord.length)
                );
              }
              this.balance = userData.balance;
              localStorage.balance = this.balance;
              localStorage.storyWithdrow = JSON.stringify(
                userData.storyWithdrow
              );
              localStorage.personalInventory = JSON.stringify(
                userData.personalInventory
              );
              this.checkRobot = true;
              this.checkRobotText = text;
            } else {
              this.wrongLogin = true;
              setTimeout(() => {
                this.wrongLogin = false;
              }, 2500);
            }
          });
      } else if (
        this.isNewUser &&
        this.login.length >= 5 &&
        this.password.length >= 5 &&
        this.repeatPassword === this.password
      ) {
        this.isOldUser = false;
        for (let i = 0; i < 6; i++) {
          text += randWord.charAt(Math.floor(Math.random() * randWord.length));
        }
        this.checkRobot = true;
        this.checkRobotText = text;
      } else {
        this.wrongLogin = true;
        setTimeout(() => {
          this.wrongLogin = false;
        }, 2000);
      }
    },
    singOut() {
      this.userInfo = {
        ...this.userInfo,
        balance: this.balance,
        personalInventory: this.personalInventory,
        storyWithdrow: this.skinsForWithdrow,
        personalInventory: this.personalInventory,
      };
      this.personalInventory = {};
      this.skinsForWithdrow = {};
      this.needLogin = true;
      if (!this.isOldUser) {
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(this.userInfo),
        });
      }
      localStorage.clear();
      this.IsLoginSuccess = false;
      this.savedLogin = "";
      this.checkRobot = false;
      this.popapInfoAccountActive = false;
    },
    comparisonValues() {
      if (this.checkRobotText === this.valueCheckRobot) {
        localStorage.login = this.login;
        localStorage.IsLoginSuccess = this.IsLoginSuccess = true;
        this.savedLogin = this.login;
        this.userInfo = {
          login: this.login,
          password: this.password,
        };
        localStorage.userInfo = JSON.stringify(this.userInfo);
        this.login = "";
        this.password = "";
        let data = new Date();
        this.loginTime = `${
          data.getHours() <= 9 ? "0" + data.getHours() : data.getHours()
        }:${
          data.getMinutes() <= 9 ? "0" + data.getMinutes() : data.getMinutes()
        }`;
        localStorage.loginTime = this.loginTime;
      } else {
        this.checkForRobot();
        this.valueCheckRobot = "";
        this.robotValueComparison = true;
      }
    },
    sell() {
      this.action = "";
      this.balance += this.selectInventorySkin.price;
      localStorage.balance = this.balance;
      this.personalInventory[this.selectInventoryIndex].number += 1;
      fetch(
        `http://localhost:3000/weapon/${
          this.personalInventory[this.selectInventoryIndex].id
        }`,
        {
          method: "PUT",
          body: JSON.stringify(
            this.personalInventory[this.selectInventoryIndex]
          ),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((res) => res.json())
        .then(() => {
          this.personalInventory.splice(this.selectInventoryIndex, 1);
          localStorage.personalInventory = JSON.stringify(
            this.personalInventory
          );
          this.selectInventorySkin = {};
        });
    },
    withdraw() {
      console.log(this.selectInventoryIndex);
      let data = new Date();
      let dataField = `${
        data.getDate() <= 9 ? "0" + data.getDate() : data.getDate()
      }.${
        data.getUTCMonth() <= 9
          ? "0" + (data.getMonth() + 1)
          : data.getMonth() + 1
      }.${data.getFullYear()}\ ${
        data.getHours() <= 9 ? "0" + data.getHours() : data.getHours()
      }:${
        data.getMinutes() <= 9 ? "0" + data.getMinutes() : data.getMinutes()
      }`;
      this.action = "";
      this.personalInventory[this.selectInventoryIndex] = {
        ...this.personalInventory[this.selectInventoryIndex],
        date: dataField,
        trade: Date.now(),
        status: "Cхвалено",
      };
      this.skinsForWithdrow.push(
        this.personalInventory[this.selectInventoryIndex]
      );
      this.personalInventory.splice(this.selectInventoryIndex, 1);
      this.selectInventorySkin = {};
      localStorage.personalInventory = JSON.stringify(this.personalInventory);
      localStorage.skinsForWithdrow = JSON.stringify(this.skinsForWithdrow);
    },
    inventoryAction() {
      this.action === "продати"
        ? this.sell()
        : this.action === "вивести до акаунту"
        ? this.withdraw()
        : null;
    },
    openCase(price) {
      if (this.IsLoginSuccess) {
        if (this.balance >= price) {
          this.balance -= price;
          localStorage.balance = this.balance;
          this.disableOpenCase = true;
          this.unSortedCaseSkins = Array.from(this.caseSkins);
          this.unSortedCaseSkins.sort(() => Math.random() - 0.5);
          let rouletteDiv = this.$refs.rouletteContainer;
          if (rouletteDiv.childNodes.length) {
            rouletteDiv.removeChild(rouletteDiv.firstChild);
          }
          let randomProcent = Math.round(Math.random(0, 100) * 100);
          let resultRandom;
          if (randomProcent <= 50) {
            resultRandom = 50;
          } else if (randomProcent > 50 && randomProcent <= 70) {
            resultRandom = 20;
          } else if (randomProcent > 70 && randomProcent <= 87) {
            resultRandom = 17;
          } else if (randomProcent > 87 && randomProcent < 97) {
            resultRandom = 10;
          } else if (randomProcent > 97) {
            resultRandom = 3;
          } else {
            resultRandom = 50;
          }
          this.unSortedCaseSkins.filter((item) => item.chance === resultRandom);
          this.personalInventory.push(this.unSortedCaseSkins[0]);
          delete this.unSortedCaseSkins[0].chance;
          this.unSortedCaseSkins[0].number += 1;
          fetch(
            `http://localhost:3000/weapon/${this.unSortedCaseSkins[0].id}`,
            {
              method: "PUT",
              body: JSON.stringify(this.unSortedCaseSkins[0]),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          ).then((res) => res.json());
          localStorage.personalInventory = JSON.stringify(
            this.personalInventory
          );
          setTimeout(() => {
            this.winThing = this.unSortedCaseSkins[0];
            this.disableOpenCase = false;
            if (this.isSmallDisplay) {
              rouletteDiv.removeChild(rouletteDiv.firstChild);
            }
          }, 12500);
          var elParent = document.getElementById("roulette-container"),
            roulette = new EvRoulette({
              weaponPrizeAttrs: this.unSortedCaseSkins[0],
              weaponActorsAttrs: this.unSortedCaseSkins,
              elParent: elParent,
            });
          roulette.start();
        } else {
          this.insufficientFunds = true;
          setTimeout(() => {
            this.insufficientFunds = false;
          }, 2000);
        }
      }
    },
    checkLogin(price = 0) {
      if (this.IsLoginSuccess === false) {
        this.needLogin = true;
      } else {
        this.needLogin = false;
      }
      price !== 0 ? this.openCase(price) : null;
    },
    checkWidth() {
      window.innerWidth <= 992
        ? (this.isMdWidth = true)
        : (this.isMdWidth = false);
      window.innerHeight <= 800
        ? (this.imgPresentInPopap = false)
        : (this.imgPresentInPopap = true);
      if (window.innerWidth <= 600) {
        this.imgCT = false;
        this.isSmallDisplay = true;
      } else {
        this.imgCT = true;
        this.isSmallDisplay = false;
      }
    },
    selectInventoryItem(index) {
      this.selectInventoryIndex = index;
      this.selectInventorySkin =
        this.personalInventory[this.selectInventoryIndex];
    },
    showCase(index) {
      this.caseItem = [];
      this.caseItem = this.cases[index];
      this.caseItem.index = index;
      this.caseSkins = [];
      this.cases[index].inside.forEach((item) => {
        this.caseSkins.push(this.weapon[item]);
      });
      console.log(this.caseItem);
      this.caseSkins.forEach((item) => {
        item.price <= 100
          ? (item.chance = 50)
          : item.price > 100 && item.price < 200
          ? (item.chance = 50)
          : item.price > 200 && item.price < 1000
          ? (item.chance = 17)
          : item.price > 1000 && item.price < 5000
          ? (item.chance = 10)
          : item.price > 5000
          ? (item.chance = 3)
          : null;
      });
      this.caseSkins.sort((a, b) => (a.price > b.price ? 1 : -1));
      sessionStorage.caseSkins = JSON.stringify(this.caseSkins);
      sessionStorage.caseItem = JSON.stringify(this.caseItem);
    },
  },
  computed: {
    checkMethodSwap() {
      if (this.buySkinForSwap.price > this.ownSkinForSwap.price) {
        this.priceForBuy =
          this.buySkinForSwap.price - this.ownSkinForSwap.price;
        this.resultSwapItems = "withdrow";
        return `Предмет на який ви обмінюєтеся коштує дорожче ніж ваш запропонований, з балансу спишеться ${this.priceForBuy} ₴, ви згодні?`;
      } else if (+this.ownSkinForSwap.price > this.buySkinForSwap.price) {
        this.priceForBuy =
          this.ownSkinForSwap.price - this.buySkinForSwap.price;
        this.resultSwapItems = "back";
        return `Предмет на який ви обмінюєтеся коштує дешевше ніж ваш запропонований, на ваш баланс зарахується сума на ${this.priceForBuy} ₴, ви згодні?`;
      } else if (this.ownSkinForSwap.price === this.buySkinForSwap.price) {
        return `Запропонований предмет який ви бажаєте обміняти буде замінений на предмет який ви добавили для обміну, ви згодні?`;
      }
    },
    checkMethodBuy() {
      if (Object.keys(this.buySkinForBuy).length !== 0) {
        return `З вашого балансу спишеться сума ${this.buySkinForBuy.price} ₴, ви згодні?`;
      }
    },
    isInventoryEmpty() {
      return Object.keys(this.personalInventory).length === 0;
    },
    disabledButtonToBuy() {
      return (
        (this.buyChecked === "trade" &&
          Object.keys(this.buySkinForSwap).length !== 0 &&
          Object.keys(this.ownSkinForSwap).length !== 0) ||
        (this.buyChecked === "buy" &&
          Object.keys(this.buySkinForBuy).length !== 0)
      );
    },
    weaponType() {
      let set = new Set();
      set.add("Всі");
      this.weapon.forEach((item) => {
        set.add(item.type);
      });
      return set;
    },
    selectWeaponType() {
      return this.selectType === "Всі"
        ? this.weapon
        : this.weapon.filter((item) => item.type === this.selectType);
    },

    fieldsIsCorrect() {
      return (
        this.paySum !== "" &&
        this.paySum <= 40000 &&
        this.cardOwner !== "" &&
        this.cvvCard.length === 3
      );
    },
    deleteChangeField() {
      this.personalInventory.forEach((item) => {
        delete item.chance;
      });
    },
    summarCost() {
      let cost = 0;
      this.personalInventory.length
        ? this.personalInventory.forEach((skin) => {
            cost += +skin.price;
          })
        : null;
      return +cost;
    },
  },
  mounted() {
    this.checkWidth();
    this.checkLogin();
    if (localStorage.userInfo) {
      this.userInfo = JSON.parse(localStorage.userInfo);
    }
    if (localStorage.skinsForWithdrow) {
      this.skinsForWithdrow = JSON.parse(localStorage.skinsForWithdrow);
    }
    if (localStorage.balance) {
      this.balance = Number(localStorage.balance);
    }
    if (sessionStorage.caseSkins && sessionStorage.caseItem) {
      this.caseItem = JSON.parse(sessionStorage.caseItem);
      this.caseSkins = JSON.parse(sessionStorage.caseSkins);
    }
    if (localStorage.personalInventory) {
      this.personalInventory = JSON.parse(localStorage.personalInventory);
    }
    if (localStorage.login && localStorage.loginTime) {
      this.savedLogin = localStorage.login;
      this.loginTime = localStorage.loginTime;
    }
    if (localStorage.IsLoginSuccess) {
      this.IsLoginSuccess = true;
      this.needLogin = false;
    }
    if (window.innerWidth <= 992) {
      this.isMdWidth = true;
    }
    window.onresize = () => {
      this.checkWidth();
    };
    try {
      fetch("http://localhost:3000/popular")
        .then((data) => data.json())
        .then((data) => {
          this.popular = data;
          this.popularAccess = true;
          this.preloader = false;
        });
      fetch("http://localhost:3000/cases")
        .then((cases) => cases.json())
        .then((data) => {
          this.cases = data;
          this.casesLoad = true;
        });
      fetch("http://localhost:3000/weapon")
        .then((weapon) => weapon.json())
        .then((weapon) => {
          this.weapon = weapon;
        });
    } catch (error) {
      console.error(error);
      this.errorLoadJson = true;
    }
  },
});
