function EvWeapon(id, attrs) {
  this.id = id;
  this.name = attrs.name;
  this.skin = attrs.skin;
  this.chance = attrs.chance;
  this.image = attrs.image;
  this.el = null;
}
EvWeapon.elWidth = 200;
function EvRoulette(attrs) {
  this.weaponPrizeAttrs = attrs.weaponPrizeAttrs;
  this.weaponActorsAttrs = attrs.weaponActorsAttrs;
  this.weapons = [];
  this.elParent = attrs.elParent;
  this.el = null;
  this.elWeapons = null;
}
EvRoulette.nWeapons = 48;
EvRoulette.weaponPrizeId = EvRoulette.nWeapons - 3;
EvRoulette.spinTime = 10;
EvRoulette.startDelayMs = 100;
EvRoulette.soundSpinInterval = 100;
EvRoulette.imageLoadInterval = 500;
EvRoulette.imageLoadTimeMs = 10 * 1000;
EvRoulette.prototype.setWeapons = function () {
  var self = this,
    weapons = [],
    weaponActorsLength = self.weaponActorsAttrs.length,
    j = 0,
    setWeaponActors = function (fromI, toI) {
      var i;
      for (i = fromI; i <= toI; i += 1) {
        weapons[i] = new EvWeapon(i, self.weaponActorsAttrs[j]);
        j = j === weaponActorsLength - 1 ? 0 : j + 1;
      }
    };
  setWeaponActors(0, EvRoulette.weaponPrizeId - 1);
  weapons[EvRoulette.weaponPrizeId] = new EvWeapon(
    EvRoulette.weaponPrizeId,
    self.weaponPrizeAttrs
  );
  setWeaponActors(EvRoulette.weaponPrizeId + 1, EvRoulette.nWeapons - 1);
  self.weapons = weapons;
};
EvRoulette.prototype.render = function () {
  var self = this,
    elRoulette = document.createElement("div"),
    elTarget = document.createElement("div"),
    elWeapons = document.createElement("div"),
    nImagesLoaded = 0,
    imageLoadWait = 0,
    imageLoadInterval;
  elRoulette.id = "ev-roulette";
  elTarget.id = "ev-target";
  elWeapons.id = "ev-weapons";
  elWeapons.style.width = EvRoulette.nWeapons * EvWeapon.elWidth + "px";
  self.weapons.forEach(function (weapon) {
    var elWeapon = document.createElement("div"),
      elWeaponInner = document.createElement("div"),
      elWeaponRarity = document.createElement("div"),
      elWeaponImg = document.createElement("img"),
      elWeaponText = document.createElement("div"),
      elWeaponTextName = document.createElement("p"),
      elWeaponTextSkin = document.createElement("p");
    elWeaponImg.onload = function () {
      nImagesLoaded += 1;
    };
    elWeaponImg.src = weapon.image;
    elWeaponImg.alt = weapon.name;
    elWeaponTextName.textContent = weapon.name;
    elWeaponTextSkin.textContent = weapon.skin;
    elWeapon.className = "ev-weapon";
    elWeaponInner.className = "ev-weapon-inner";
    let raritySkin =
      weapon.chance === 50
        ? "milspec"
        : weapon.chance === 20
        ? "restricted"
        : weapon.chance === 17
        ? "classified"
        : weapon.chance === 10
        ? "covert"
        : weapon.chance === 3
        ? "rare"
        : "uncommon";
    elWeaponRarity.className =
      "ev-weapon-rarity " + "ev-weapon-rarity-" + raritySkin;
    elWeaponText.className = "ev-weapon-text";
    elWeaponText.appendChild(elWeaponTextName);
    elWeaponText.appendChild(elWeaponTextSkin);
    elWeaponInner.appendChild(elWeaponRarity);
    elWeaponInner.appendChild(elWeaponImg);
    elWeaponInner.appendChild(elWeaponText);
    elWeapon.appendChild(elWeaponInner);
    weapon.el = elWeapon;
    elWeapons.appendChild(weapon.el);
  });
  elRoulette.appendChild(elWeapons);
  imageLoadInterval = setInterval(function () {
    imageLoadWait += EvRoulette.imageLoadInterval;

    if (
      nImagesLoaded === EvRoulette.nWeapons ||
      imageLoadWait >= EvRoulette.imageLoadTimeMs
    ) {
      clearInterval(imageLoadInterval);
      self.elWeapons = elWeapons;
      self.el = elRoulette;
      self.elParent.appendChild(self.el);
      setTimeout(() => {
        self.spin();
      }, 700);
    }
  }, EvRoulette.imageLoadInterval);
};
EvRoulette.prototype.spin = function () {
  var self = this,
    elWeaponWidth1 = Math.floor(EvWeapon.elWidth / 2),
    elWeaponWidth2 = Math.floor(EvWeapon.elWidth / 20),
    rand = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) - min;
    },
    rand_stop =
      (EvRoulette.nWeapons - 6) * EvWeapon.elWidth +
      elWeaponWidth1 +
      rand(elWeaponWidth2, 24 * elWeaponWidth2),
    soundSpinInterval,
    spinCounter = 0;
  self.elWeapons.style.transition =
    "left " + EvRoulette.spinTime + "s ease-out";
  setTimeout(function () {
    self.elWeapons.style.left = "-" + rand_stop + "px";
    soundSpinInterval = setInterval(function () {
      var currentLeft = Math.abs(
          parseInt(window.getComputedStyle(self.elWeapons).left, 10)
        ),
        currentSpinCounter = Math.floor(
          (currentLeft + elWeaponWidth1) / EvWeapon.elWidth
        );
      if (currentSpinCounter > spinCounter) {
        spinCounter = currentSpinCounter;
      }
    }, EvRoulette.soundSpinInterval);
  }, EvRoulette.startDelayMs);
  self.elWeapons.addEventListener("transitionend", function () {
    clearInterval(soundSpinInterval);
    self.weapons.forEach(function (weapon) {
      if (weapon.id !== EvRoulette.weaponPrizeId) {
        weapon.el.style.opacity = 0.4;
      }
    });
  });
};
EvRoulette.prototype.start = function () {
  this.setWeapons();
  this.render();
};
