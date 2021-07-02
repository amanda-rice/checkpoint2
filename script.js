let packageCount = 0

let clickUpgrades = {
  gas: {
    name: 'Gas',
    price: 20,
    quantity: 0,
    multiplier: 1,
    image: 'ic:baseline-local-gas-station'
  },
  trucks: {
    name: 'Trucks',
    price: 100,
    quantity: 0,
    multiplier: 3,
    image: 'icomoon-free:truck'
  }
}

let autoUpgrades = {
  drones: {
    name: 'Drones',
    price: 500,
    quantity: 0,
    multiplier: 20,
    image: 'healthicons:drone'
  },
  planes: {
    name: 'Planes',
    price: 2000,
    quantity: 0,
    multiplier: 50,
    image: 'bx:bxs-plane-alt'
  }

}

function mine() {
  let clickModifier = 0
  for (const key in clickUpgrades) {
    let item = clickUpgrades[key]
    let addTo = item.quantity * item.multiplier
    clickModifier += addTo
  }
  packageCount = packageCount + 1 + clickModifier
  update()
}

function update() {
  document.getElementById('package-count').innerText = packageCount
}

function buyItems(toBuy, upgradeType) {
  console.log(toBuy, upgradeType)
  let objToPurchase = {}
  if (upgradeType == 'auto') {
    objToPurchase = autoUpgrades[toBuy]
  }
  else {
    objToPurchase = clickUpgrades[toBuy]
  }
  if (objToPurchase.price <= packageCount) {
    objToPurchase.quantity++
    packageCount -= objToPurchase.price
  }
  update()
}

function drawButtons() {
  let template = ''
  for (let key in clickUpgrades) {
    let type = clickUpgrades[key]
    template +=
      `
      <p class="iconify custom-icon" id="${key}-button" onclick="buyItems('${key}', 'click')" data-icon="${type.image}" data-inline="false">
      </p>
      `
  }
  for (let key in autoUpgrades) {
    let type = autoUpgrades[key]
    template +=
      `
      <p class="iconify custom-icon" id="${key}-button" onclick="buyItems('${key}', 'auto')" data-icon="${type.image}" data-inline="false">
      </p>
      `
  }
  document.getElementById('buttons').innerHTML = template
}

function collectAutoUpgrades() {
  let autoModifier = 0
  for (const key in autoUpgrades) {
    let item = autoUpgrades[key]
    let addTo = item.quantity * item.multiplier
    autoModifier += addTo
  }
  packageCount += autoModifier
  update()
}

function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 3000)
}

update()
startInterval()
drawButtons()