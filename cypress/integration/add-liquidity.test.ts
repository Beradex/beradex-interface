import { CONTRACTS } from './contracts'

describe('Add Liquidity', () => {
  it('Loads BERA correctly', () => {
    cy.visit(`/add/v2/BERA`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'WETH')
  })

  it('loads the two correct tokens', () => {
    const { BERA, TUSD } = CONTRACTS
    cy.visit(`/add/v2/${TUSD}/${BERA}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'TUSD')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'BERA')
  })

  it('does not crash if EVMOSis duplicated', () => {
    const { BERA } = CONTRACTS
    cy.visit(`/add/v2/${BERA}/${BERA}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'BERA')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('not.contain.text', 'BERA')
  })

  it.skip('token not in storage is loaded', () => {
    cy.visit('/add/v2/0xb290b2f9f8f108d03ff2af3ac5c8de6de31cdf6d/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'SKL')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'MKR')
  })

  it('single token can be selected', () => {
    const { BERA, TUSD } = CONTRACTS
    cy.visit(`/add/v2/${BERA}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'BERA')
    cy.visit(`/add/v2/${TUSD}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'TUSD')
  })
})
