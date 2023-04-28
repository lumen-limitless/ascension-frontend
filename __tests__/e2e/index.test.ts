describe('localhost:3000', () => {
  describe('homepage', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3000/')
    })

    it("should be titled 'Ascension Protocol'", async () => {
      await expect(page.title()).resolves.toMatch('Ascension Protocol')
    })
  })

  describe('dashboard page', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3000/dashboard/')
    })

    it('should be titled "Dashboard | Ascension Protocol" when dashboard page is loaded', async () => {
      await expect(page.title()).resolves.toMatch(
        'Dashboard | Ascension Protocol'
      )
    })
  })

  describe('Earn page', () => {
    beforeEach(async () => {
      await page.goto('http://localhost:3000/earn/')
    })

    it('should be titled "Earn | Ascension Protocol" when Earn page is loaded', async () => {
      await expect(page.title()).resolves.toMatch('Earn | Ascension Protocol')
    })

    it('should have a button with text "Connect Wallet"', async () => {
      const button = await page.waitForSelector('button', {
        text: 'Connect Wallet',
      })
      const buttonText = await page.evaluate(
        (button) => button.textContent,
        button
      )
      expect(buttonText).toMatch('Connect Wallet')
    })

    it('should have a button with text "Connect Wallet" that is clickable', async () => {
      const button = await page.waitForSelector('button', {
        text: 'Connect Wallet',
      })
      await button.click()
    })

    it('should have a button with text "Connect Wallet" that is clickable and opens a modal', async () => {
      const button = await page.waitForSelector('button', {
        text: 'Connect Wallet',
      })
      await button.click()
      await page.waitForSelector('div', { text: 'Metamask' })
    })

    it('should allow user to connect wallet', async () => {
      const button = await page.waitForSelector('button', {
        text: 'Connect Wallet',
      })
      await button.click()
      await page.waitForSelector('div', { text: 'Metamask' })
      const metamaskButton = await page.waitForSelector('button', {
        text: 'Metamask',
      })
      await metamaskButton.click()
      await page.waitForSelector('div', { text: 'MetaMask' })
    })
  })
})
