import { CONTRACTS } from './contracts'
const { BERA, TUSD, WETH } = CONTRACTS

describe('Remove Liquidity', () => {
  it('Native remove', () => {
    cy.visit(`/remove/v2/BERA/${TUSD}`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'BERA')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'TUSD')
  })

  it('Native remove swap order', () => {
    cy.visit(`/remove/v2/${TUSD}/BERA`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'TUSD')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'BERA')
  })

  it('loads the two correct tokens', () => {
    cy.visit(`/remove/v2/${TUSD}/${WETH}`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'TUSD')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MATOM')
  })

  it('does not crash if WEVMOS is duplicated', () => {
    cy.visit(`/remove/v2/${BERA}/${BERA}`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'BERA')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'BERA')
  })

  it('does not crash if EVMOS is duplicated', () => {
    cy.visit(`/remove/v2/BERA/BERA`)
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'BERA')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'BERA')
  })

  it.skip('token not in storage is loaded', () => {
    cy.visit('/remove/v2/0xb290b2f9f8f108d03ff2af3ac5c8de6de31cdf6d/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#remove-liquidity-tokena-symbol').should('contain.text', 'SKL')
    cy.get('#remove-liquidity-tokenb-symbol').should('contain.text', 'MKR')
  })
})
