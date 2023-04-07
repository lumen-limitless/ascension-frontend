describe('localhost:3000', () => {
  describe('homepage', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/')
    })

    it("should be titled 'Ascension Protocol'", async () => {
      await expect(page.title()).resolves.toMatch('Ascension Protocol')
    })
  })

  describe('dashboard page', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/dashboard/')
    })
    it('should be titled "Dashboard | Ascension Protocol" when dashboard page is loaded', async () => {
      await page.goto('http://localhost:3000/dashboard/')
      await expect(page.title()).resolves.toMatch(
        'Dashboard | Ascension Protocol'
      )
    })
  })

  describe('Earn page', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000/earn/')
    })
    it('should be titled "Earn | Ascension Protocol" when Earn page is loaded', async () => {
      await expect(page.title()).resolves.toMatch('Earn | Ascension Protocol')
    })

    it('should have a button with text "Connect Wallet"', async () => {
      await expect(page.matchElement()).toMatchElement('button', {
        text: 'Connect Wallet',
      })
    })
  })
})
