var first = new Vue({
  el: '#app',
  data: {
    weapon: [],
    info: [],
    popular: [],
    cases: [],
    popularAccess: false,
    preloader: true,
    IsLoginSuccess: false,
    errorLoadJson: false,
    casesLoad: false,
    caseItem: {},
    caseSkins: [],
    popapInfoSkin: {},
    popapActive: false,
    password: '',
    login: '',
    valueCheckRobot: '',
    checkRobot: false,
    wrongLogin: false,
    checkRobotText: '',
  },
  methods: {
    shopPopapSkin(index, str) {
      this.popapInfoSkin = [];
      if (str == 'main') this.popapInfoSkin = this.popular[index];
      if (str === 'cases') this.popapInfoSkin = this.caseSkins[index];
      console.log(this.popapInfoSkin);
      this.popapActive = true;
    },
    showPassword() {
      this.$refs.input.setAttribute('type', 'text');
    },
    hidePassword() {
      this.$refs.input.setAttribute('type', 'password');
    },
    checkForRobot() {
      let randWord =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
      let text = '';
      if (this.login.length >= 5 && this.password.length >= 5) {
        for (let i = 0; i < 6; i++) {
          text += randWord.charAt(Math.floor(Math.random() * randWord.length));
        }
        this.checkRobot = true;
        this.checkRobotText = text;
      }
    },
    comparisonValues(){
      if(this.checkRobotText === this.valueCheckRobot){
        this.
      }
    },
    AllSell() {},
    Withdraw() {},
    Delete() {},
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
          ? (item.chance = 0.5)
          : Number(item.price > 100) && Number(item.price < 200)
          ? (item.chance = 0.5)
          : Number(item.price > 200) && Number(item.price < 1000)
          ? (item.chance = 0.17)
          : Number(item.price > 1000) && Number(item.price < 5000)
          ? (item.chance = 0.1)
          : Number(item.price > 5000)
          ? (item.chance = 0.03)
          : null;
        item.price = +item.price;
      });
      this.caseSkins.sort((a, b) => (a.price > b.price ? 1 : -1));
    },
  },
  mounted() {
    try {
      fetch('http://localhost:3000/popular')
        .then((data) => data.json())
        .then((data) => {
          this.popular = data;
          this.popularAccess = true;
        });
      fetch('http://localhost:3000/peculiar')
        .then((items) => items.json())
        .then((items) => {
          this.info.push(items);
          this.preloader = false;
        });
      fetch('http://localhost:3000/cases')
        .then((cases) => cases.json())
        .then((data) => {
          this.cases = data;
          this.casesLoad = true;
        });
      fetch('http://localhost:3000/weapon')
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
