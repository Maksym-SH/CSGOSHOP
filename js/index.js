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
  },
  methods: {
    AllSell() {},
    Withdraw() {},
    Delete() {},
    showCase(index) {
      this.caseItem = [];
      this.caseItem = this.cases[index];
      this.caseItem.index = index;
      (this.caseSkins = []),
        this.cases[index].inside.forEach((item) => {
          this.caseSkins.push(item);
        });
      console.log(this.caseSkins);
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
    console.log(this.weapon);
  },
});
