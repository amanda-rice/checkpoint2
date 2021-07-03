let packageCount = 0

let clickUpgrades = {
  gas: {
    name: 'Gas',
    price: 20,
    quantity: 0,
    multiplier: 1,
    image: 'ic:baseline-local-gas-station',
    reached: false
  },
  trucks: {
    name: 'Trucks',
    price: 100,
    quantity: 0,
    multiplier: 3,
    image: 'icomoon-free:truck',
    reached: false
  }
}

let autoUpgrades = {
  drones: {
    name: 'Drones',
    price: 500,
    quantity: 0,
    multiplier: 20,
    image: 'healthicons:drone',
    reached: false
  },
  planes: {
    name: 'Planes',
    price: 2000,
    quantity: 0,
    multiplier: 50,
    image: 'bx:bxs-plane-alt',
    reached: false
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
  isReached()
}
function isReached() {
  for (const key in clickUpgrades) {
    let item = clickUpgrades[key]
    if (!item.reached && (item.price <= packageCount)) {
      item.reached = true
      drawButtons()
    }
  }
  for (const key in autoUpgrades) {
    let item = autoUpgrades[key]
    if (!item.reached && (item.price <= packageCount)) {
      item.reached = true
      drawButtons()
    }
  }
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
    objToPurchase.price = Math.floor(objToPurchase.price * 1.1)
    updateButtons(toBuy)
    update()
    drawFleet()
  }

}

function drawButtons() {
  let template = `
    <div class="row" >
      <div class="col-12 d-flex justify-content-around align-items-center">
        <h3>Shop</h3>
          <h3>Price</h3>
          <h3>Multiplier</h3>
      </div>
      </div>
      `
  for (let key in clickUpgrades) {
    let type = clickUpgrades[key]
    if (type.reached) {
      template +=
        `
      <div class="row">
      <div class = "col-12 d-flex justify-content-between align-items-center">
      <p class="iconify custom-icon" id="${key}-button" onclick="buyItems('${key}', 'click')" data-icon="${type.image}" data-inline="false">
      <h3 id="${key}-price">${type.price}</h3>
      <h3>x${type.multiplier}</h3>
      </p>
      </div>
      </div>
      `
    }
  }
  for (let key in autoUpgrades) {
    let type = autoUpgrades[key]
    if ((type.price <= packageCount) && !type.reached) {
      type.reached = true
    }
    if (type.reached) {
      template +=
        `
      <div class="row">
      <div class = "col-12 d-flex justify-content-between align-items-center">
      <p class="iconify custom-icon" id="${key}-button" onclick="buyItems('${key}', 'auto')" data-icon="${type.image}" data-inline="false">
      <h3 id="${key}-price">${type.price}</h3>
      <h3>x${type.multiplier}</h3>
      </p>
      </div>
      </div>
      `
    }
  }
  document.getElementById('buttons').innerHTML = template
}
function updateButtons(name) {
  console.log(clickUpgrades[name])
  if (clickUpgrades[name]) {
    let type = clickUpgrades[name]
    let template = `
      `
    document.getElementById(`${name}-price`).innerText = type.price
  }
  else {
    let type = autoUpgrades[name]
    let template = `
      `
    document.getElementById(`${name}-price`).innerText = type.price
  }
}

function drawFleet() {
  let template = ``
  for (let key in clickUpgrades) {
    template = ``
    countTemplate = ``
    let type = clickUpgrades[key]
    let total = type.quantity
    for (let i = 0; i < total; i++) {
      template +=
        `
      <span class="iconify" data-icon="${type.image}" data-inline="false"></span>
      `
    }
    document.getElementById(`${key}-fleet-num`).innerText = type.quantity
    document.getElementById(`${key}-fleet`).innerHTML = template
  }


  for (let key in autoUpgrades) {
    template = ``
    let type = autoUpgrades[key]
    let total = type.quantity
    for (let i = 0; i < total; i++) {
      template +=
        `
      <span class="iconify" data-icon="${type.image}" data-inline="false"></span>
      `
    }
    document.getElementById(`${key}-fleet-num`).innerText = type.quantity
    document.getElementById(`${key}-fleet`).innerHTML = template
  }
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
  isReached()
}

function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 3000)
}

update()
startInterval()
drawButtons()
drawFleet()