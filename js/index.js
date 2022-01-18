var first = new Vue({
  el: '#app',
  data: {
    weapon: [],
    info: [],
    popular: [],
    popularAccess: false,
    preloader: true,
    IsLoginSuccess: false,
    errorLoadJson: false,
  },
  methods: {
    AllSell() {},
    Withdraw() {},
    Delete() {},
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
    } catch (error) {
      console.error(error);
      this.errorLoadJson = true;
    }
  },
});
