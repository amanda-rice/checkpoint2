let cheeseCount = 0

let clickUpgrades = {
  pickaxes: {
    name: 'Pickaxes',
    price: 20,
    quantity: 0,
    multiplier: 1
  },
  drills: {
    name: 'Drills',
    price: 100,
    quantity: 0,
    multiplier: 3
  }
}

let autoUpgrades = {
  robots: {
    name: 'Robots',
    price: 500,
    quantity: 0,
    multiplier: 20
  },
  rovers: {
    name: 'Rovers',
    price: 2000,
    quantity: 0,
    multiplier: 50
  }

}

function mine() {
  let clickModifier = 0
  for (const key in clickUpgrades) {
    let item = clickUpgrades[key]
    let addTo = item.quantity * item.multiplier
    clickModifier += addTo
  }
  cheeseCount = cheeseCount + 1 + clickModifier
  update()
}

function update() {
  document.getElementById('cheese-count').innerText = cheeseCount
}

function buyItems(toBuy, upgradeType) {
  let objToPurchase = upgradeType[toBuy]
  if (objToPurchase.price <= cheeseCount) {
    objToPurchase.quantity++
    cheeseCount -= objToPurchase.price
  }
  update()
}

function drawButtons() {
  let template = ''
  let upgrades = [autoUpgrades, clickUpgrades]

  upgrades.forEach(upgrade => {
    for (let key in upgrade) {
      let type = upgrade[key]
      template +=
        `
      <button id="${key}-button" onclick="buyItems('${key}, ${upgrade.constructor.name}')">${type.name}!</button>
      `
    }
  })
  document.getElementById('buttons').innerHTML = template
}

function collectAutoUpgrades() {
  let autoModifier = 0
  for (const key in autoUpgrades) {
    let item = autoUpgrades[key]
    let addTo = item.quantity * item.multiplier
    autoModifier += addTo
  }
  cheeseCount += autoModifier
  update()
}

function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 3000)
}

update()
startInterval()
drawButtons()