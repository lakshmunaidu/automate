const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

// Step 01: Login to the application
async function login(username, password) {
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless()) // Headless mode
    .build()

  try {
    await driver.get('https://ecs-qa.kloudship.com')

    // Find and fill the username and password fields
    await driver
      .findElement(By.id('username'))
      .sendKeys('kloudship.qa.automation@mailinator.com')
    await driver.findElement(By.id('password')).sendKeys('Password1')

    // Click the login button
    await driver.findElement(By.id('login-button')).click()

    // Wait for the login to complete (you can enhance this with explicit waits)
    await driver.wait(until.titleIs('Your Dashboard Title'), 5000) // Replace with your actual dashboard title
  } finally {
    // Uncomment the following line to close the browser window after the test
    // await driver.quit();
  }
}

// Step 02: Navigate to Package Types
async function navigateToPackageTypes(driver) {
  await driver.findElement(By.linkText('Package Types')).click()
}

// Step 03: Click on Add Manually button
async function addPackageManually(driver) {
  await driver.findElement(By.id('add-manually-button')).click()
}

// Step 04: Add a package
async function addPackage(driver, name, dimensions) {
  await driver.findElement(By.id('name')).sendKeys(name)
  await driver.findElement(By.id('dimensions')).sendKeys(dimensions)
}

// Step 06: Logout
async function logout(driver) {
  await driver.findElement(By.linkText('Logout')).click()
}

// Test Case 01
;(async () => {
  const username = 'your_username'
  const password = 'your_password'

  const driver = await login(username, password)
  await navigateToPackageTypes(driver)
  await addPackageManually(driver)
  const name = 'FirstName_LastName'
  const dimensions = Math.floor(Math.random() * 20).toString() // Random integer less than 20
  await addPackage(driver, name, dimensions)
  await logout(driver)

  // Uncomment the following line to close the browser window after the test
  // await driver.quit();
})()

// Test Case 02: Implement this separately
;(async () => {
  // Implement Test Case 02 logic here
})()
