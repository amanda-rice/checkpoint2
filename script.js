let packageCount = 0

let clickUpgrades = {
  garages: {
    name: 'Garages',
    price: 20,
    quantity: 0,
    multiplier: 1,
    image: 'mdi:garage-variant',
    reached: false
  },
  warehouses: {
    name: 'Warehouses',
    price: 300,
    quantity: 0,
    multiplier: 3,
    image: 'mdi:warehouse',
    reached: false
  }
}

let autoUpgrades = {
  deliveryPeople: {
    name: 'Delivery People',
    price: 50,
    quantity: 0,
    multiplier: 10,
    image: 'ic:baseline-directions-walk',
    reached: false
  },
  bikes: {
    name: 'Bikes',
    price: 100,
    quantity: 0,
    multiplier: 15,
    image: 'healthicons:bike',
    reached: false
  },
  trucks: {
    name: 'Trucks',
    price: 500,
    quantity: 0,
    multiplier: 25,
    image: 'icomoon-free:truck',
    reached: false
  },
  drones: {
    name: 'Drones',
    price: 1000,
    quantity: 0,
    multiplier: 50,
    image: 'healthicons:drone',
    reached: false
  },
  trains: {
    name: 'Trains',
    price: 3000,
    quantity: 0,
    multiplier: 75,
    image: 'ic:baseline-train',
    reached: false
  },
  boats: {
    name: 'Boats',
    price: 10000,
    quantity: 0,
    multiplier: 100,
    image: 'ic:round-directions-boat',
    reached: false
  },
  planes: {
    name: 'Planes',
    price: 20000,
    quantity: 0,
    multiplier: 200,
    image: 'bx:bxs-plane-alt',
    reached: false
  },
  rocketShips: {
    name: 'Rocket Ships',
    price: 50000,
    quantity: 0,
    multiplier: 250,
    image: 'ph:rocket-launch-fill',
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
function drawFleetCounts() {
  let template = ``
  template += `
  <h4 class="pt-3">Asset Counts</h4>
  <div class="row">
  `
  for (let key in clickUpgrades) {
    let type = clickUpgrades[key]
    template +=
      `<div class="px-3 col-6">${type.name}: <span id="${key}-fleet-num"></span></div>`
  }
  for (let key in autoUpgrades) {
    let type = autoUpgrades[key]
    template +=
      `<div class="px-3 col-6">${type.name}: <span id="${key}-fleet-num"></span></div>`
  }
  template += `</div>`
  document.getElementById('fleet-counts').innerHTML = template
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
    objToPurchase.price = Math.ceil(objToPurchase.price * 1.1)
    updateButtons(toBuy)
    update()
    drawFleet()
  }

}

function drawButtons() {

  let template = `
  <h1>Shop:</h1>
  `
  for (let key in clickUpgrades) {
    let type = clickUpgrades[key]
    if (type.reached) {
      template +=
        `
      <div class="row">
      <div class = "col-12 d-flex justify-content-between align-items-center" title="${type.name}- Click Update">
      <p class="iconify custom-icon" id="${key}-button" onclick="buyItems('${key}', 'click')" data-icon="${type.image}" data-inline="false">
      <h3 id="${key}-price">${type.price}   <span class="iconify" data-icon="fluent:box-16-filled" data-inline="false"></span></h3>
      <h3>+${type.multiplier}</h3>
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
      <div class = "col-12 d-flex justify-content-between align-items-center" title="${type.name}- Auto Update">
      <p class="iconify custom-icon" id="${key}-button" onclick="buyItems('${key}', 'auto')" data-icon="${type.image}" data-inline="false">
      <h3 id="${key}-price">${type.price}   <span class="iconify" data-icon="fluent:box-16-filled" data-inline="false"></span></h3>
      <h3>+${type.multiplier}</h3>
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
    document.getElementById(`${name}-price`).innerHTML = `${type.price} <span class="iconify" data-icon="fluent:box-16-filled" data-inline="false"></span>`
  }
  else {
    let type = autoUpgrades[name]
    let template = `
      `
    document.getElementById(`${name}-price`).innerHTML = `${type.price} <span class="iconify" data-icon="fluent:box-16-filled" data-inline="false"></span>`
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
function drawFleetIcons() {
  let template = `
   <h1 class="px-3 pt-3">Assets:</h1>
      `
  for (let key in clickUpgrades) {
    let type = clickUpgrades[key]
    template +=
      `<div class="px-3" id="${key}-fleet"></div>`
  }
  for (let key in autoUpgrades) {
    let type = autoUpgrades[key]
    template +=
      `<div class="px-3" id="${key}-fleet"></div>`
  }
  document.getElementById('fleet-icons').innerHTML = template
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
drawFleetCounts()
drawFleetIcons()
drawFleet()