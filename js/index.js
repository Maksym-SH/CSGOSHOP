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
    IsLoginSuccess: false,
    casesLoad: false,
    caseItem: {},
    caseSkins: [],
    unSortedCaseSkins: [],
    popapInfoSkin: {},
    insufficientFunds: false,
    popapActive: false,
    password: "",
    login: "",
    imgCT: true,
    valueCheckRobot: "",
    checkRobot: false,
    wrongLogin: false,
    checkRobotText: "",
    robotValueComparison: false,
    savedLogin: "",
    balance: 1110,
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
          this.buySkinForSwap = this.ownSkinForSwap = {};
          localStorage.balance = this.balance;
          localStorage.personalInventory = JSON.stringify(
            this.personalInventory
          );
        }
        this.warningForBuy = false;
      } else if (this.buyChecked === str && str === "buy") {
        if (this.balance >= this.buySkinForBuy.price) {
          this.balance -= this.buySkinForBuy.price;
          localStorage.balance = this.balance;
          this.personalInventory.push(this.buySkinForBuy);
          localStorage.personalInventory = JSON.stringify(
            this.personalInventory
          );
          this.buySkinForBuy = {};
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
      if (this.login.length >= 5 && this.password.length >= 5) {
        for (let i = 0; i < 6; i++) {
          text += randWord.charAt(Math.floor(Math.random() * randWord.length));
        }
        this.checkRobot = true;
        this.checkRobotText = text;
      } else {
        this.wrongLogin = true;
      }
    },
    singOut() {
      /*       let user = {
        balance:
      }
      fetch('http://localhost:3000/users'{
        method:'POST',
        body:
      }) */
      localStorage.clear();
      this.IsLoginSuccess = false;
      this.savedLogin = "";
      this.popapInfoAccountActive = false;
    },
    comparisonValues() {
      if (this.checkRobotText === this.valueCheckRobot) {
        localStorage.login = this.login;
        localStorage.IsLoginSuccess = this.IsLoginSuccess = true;
        this.savedLogin = this.login;
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
        this.robotValueComparison = true;
      }
    },
    sell() {
      this.action = "";
      this.balance += this.selectInventorySkin.price;
      localStorage.balance = this.balance;
      this.personalInventory.splice(this.selectInventoryIndex, 1);
      localStorage.personalInventory = JSON.stringify(this.personalInventory);
      this.selectInventorySkin = {};
    },
    withdraw() {},
    inventoryAction() {
      this.action === "продати"
        ? this.sell()
        : this.action === "вивести до акаунту"
        ? this.withdraw()
        : null;
    },
    openCase(price) {
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
        localStorage.personalInventory = JSON.stringify(this.personalInventory);
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
        return `Запропонований предмет який ви бажаєте обміняти буде замінений на предмет який ви добавили для обмину, ви згодні?`;
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
    compareData() {
      return new Date().getFullYear() > this.cardDate.year
        ? new Date().getMonth() > this.cardDate.month
        : false;
    },
    fieldsIsCorrect() {
      return (
        this.compareData &&
        this.paySum !== "" &&
        this.paySum <= 40000 &&
        this.cardOwner !== "" &&
        this.cvvCard !== ""
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
    raritySkin() {
      this.personalInventory.forEach((item) => {
        let raritySkinLine =
          item.chance === 50
            ? "milspec"
            : item.chance === 20
            ? "restricted"
            : item.chance === 17
            ? "classified"
            : item.chance === 10
            ? "covert"
            : item.chance === 3
            ? "rare"
            : "uncommon";
        document
          .querySelector(".personal-invent-item__rarity")
          .classList.add("ev-weapon-rarity-" + raritySkinLine);
      });
    },
  },
  mounted() {
    this.checkWidth();
    this.checkLogin();
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
