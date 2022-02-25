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
    balance: 0,
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
  },
  methods: {
    checkDataValidation(event) {
      event.target.value.length <= 2
        ? (this.cardDate.month = event.target.value)
        : (this.cardDate.year = event.target.value);
    },
    formClear() {
      (this.cardNumber = []),
        (this.paySum = ""),
        (this.cvvCard = ""),
        (this.cardOwner = ""),
        (this.cardDate = {});
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
    AllSell() {},
    Withdraw() {},
    Delete() {},
    openCase(price) {
      if (this.balance >= price) {
        this.disableOpenCase = true;
        this.unSortedCaseSkins = Array.from(this.caseSkins);
        this.unSortedCaseSkins.sort(() => Math.random() - 0.5);
        let rouletteDiv = document.querySelector("#roulette-container");
        if (rouletteDiv.childNodes.length) {
          rouletteDiv.removeChild(rouletteDiv.firstChild);
        }
        this.balance -= price;
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
    showCase(index) {
      this.caseItem = [];
      this.caseItem = this.cases[index];
      this.caseItem.index = index;
      this.caseSkins = [];
      this.cases[index].inside.forEach((item) => {
        this.caseSkins.push(this.weapon[item]);
      });
      this.caseSkins.forEach((item) => {
        Number(item.price <= 100)
          ? (item.chance = 50)
          : Number(item.price > 100) && Number(item.price < 200)
          ? (item.chance = 50)
          : Number(item.price > 200) && Number(item.price < 1000)
          ? (item.chance = 17)
          : Number(item.price > 1000) && Number(item.price < 5000)
          ? (item.chance = 10)
          : Number(item.price > 5000)
          ? (item.chance = 3)
          : null;
        item.price = +item.price;
      });
      this.caseSkins.sort((a, b) => (a.price > b.price ? 1 : -1));
      sessionStorage.caseSkins = JSON.stringify(this.caseSkins);
      sessionStorage.caseItem = JSON.stringify(this.caseItem);
    },
  },
  computed: {
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
  },
  mounted() {
    this.checkWidth();
    this.checkLogin();
    if (sessionStorage.caseSkins && sessionStorage.caseItem) {
      this.caseItem = JSON.parse(sessionStorage.caseItem);
      this.caseSkins = JSON.parse(sessionStorage.caseSkins);
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
