import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'

import { acceptCookiesHelper } from '../../helpers/acceptCookies.helper'
import { generateUserData } from '../../helpers/generateUserData.helper'

import blogPage from '../../pages/blogPage'
import globalCoveragePage from '../../pages/globalCoveragePage'
import homePage from '../../pages/homePage'
import microsoftTeamsPage from '../../pages/microsoftTeamsPage'
import thankYouPage from '../../pages/thankYouPage'
import integrationsPage from '../../pages/integrationsPage'
import numbersPricingPage from '../../pages/numbersPricingPage'
import solutionsPage from '../../pages/solutionsPage'
import releaseNotesPage from '../../pages/releaseNotesPage'
import supportCenterPage from '../../pages/supportCenterPage'
import telnyxVsTwilioPage from '../../pages/telnyxVsTwilioPage'
import IoTSimCardsPage from '../../pages/IoTSimCardsPage'

const pageMap = {
  blogPage: blogPage,
  globalCoveragePage: globalCoveragePage,
  homePage: homePage,
  integrationsPage: integrationsPage,
  IoTSimCardsPage: IoTSimCardsPage,
  microsoftTeamsPage: microsoftTeamsPage,
  numbersPricingPage: numbersPricingPage,
  releaseNotesPage: releaseNotesPage,
  solutionsPage: solutionsPage,
  supportCenterPage: supportCenterPage,
  telnyxVsTwilioPage: telnyxVsTwilioPage,
  thankYouPage: thankYouPage,
}

//! general
Given('I am on home page', () => {
  cy.visit('/')
  acceptCookiesHelper()
})

Then('The {string} text is displayed in the URL', (url) => {
  cy.url().should('include', url)
})

//! Home page
// header
When('I click on the {string} link in the header', (link) => {
  homePage.clickOnMenuLink(link)
})
Then('The {string} link is displayed in the opened dropdown menu', (link) => {
  homePage.isSubmenuLinkVisible(link)
})
When('I click on the {string} link in the opened dropdown menu', (link) => {
  homePage.clickOnSubmenuLink(link)
})

// footer
When('I click on the {string} link in the footer', (link) => {
  homePage.clickOnFooterLink(link)
})

//! common for all pages
// heading
Then(
  'The {string} heading is displayed on the {string}',
  (heading, pageName) => {
    const resolvedPage = pageMap[pageName]

    if (resolvedPage) {
      resolvedPage.elements.heading().should('contain', heading)
    } else {
      throw new Error(`Page '${pageName}' not found.`)
    }
  }
)

Then(
  'The {string} section heading is displayed on the {string}',
  (sectionHeading, pageName) => {
    const resolvedPage = pageMap[pageName]

    if (resolvedPage) {
      resolvedPage.elements.sectionHeading().should('contain', sectionHeading)
    } else {
      throw new Error(`Page '${pageName}' not found.`)
    }
  }
)

Then(
  'The description text is displayed under the heading on the {string}',
  (pageName) => {
    const resolvedPage = pageMap[pageName]

    if (resolvedPage) {
      resolvedPage.elements.heroOverviewText().should('be.visible')
    } else {
      throw new Error(`Page '${pageName}' not found.`)
    }
  }
)

//! Form
When('I fill in the form with valid data on the {string}', (pageName) => {
  const resolvedPage = pageMap[pageName]

  const userData = generateUserData()
  resolvedPage.fillForm(userData)
})

Then(
  'An error message is displayed under the {string} input field on the {string}',
  (inputName, pageName) => {
    const resolvedPage = pageMap[pageName]
    const inputId = resolvedPage.elements[inputName]().invoke('attr', 'id')

    return inputId.then((id) => {
      return cy.get(`input[id="${id}"]+div.mktoError`).should('be.visible')
    })
  }
)

Then(
  'The “Talk to an Expert” button is displayed on the {string}',
  (pageName) => {
    const resolvedPage = pageMap[pageName]

    resolvedPage.elements.talkToExpertBtn().should('be.visible')
  }
)

//! Quiz
When('I click on the {string} button on the {string}', (btnName, pageName) => {
  const resolvedPage = pageMap[pageName]

  resolvedPage.elements[btnName]().click()
})

Then(
  'The current question number is increased by one on the {string}',
  (pageName) => {
    const resolvedPage = pageMap[pageName]
    let pageNumber = 1

    pageNumber === resolvedPage.currentQuestionNumber + 1
  }
)

Then(
  'The {string} button is displayed in the question box on the {string}',
  (btnName, pageName) => {
    const resolvedPage = pageMap[pageName]

    resolvedPage.elements[btnName]().should('be.visible')
  }
)

When(
  'I select the first option in the {string} question on the {string}',
  (questionName, pageName) => {
    const resolvedPage = pageMap[pageName]

    resolvedPage.elements[questionName]().click()
  }
)
