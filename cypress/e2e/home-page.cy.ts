import getPostMock from '@/test/mocks/post'

function getPosts() {
  const posts = new Array(Math.round(1 + Math.random() * 10))
    .fill({})
    .map(getPostMock)
    .map((post, index) => ({ ...post, id: index + 1 }))

  return posts
}

describe('Load posts', () => {
  it('should display the loading indicator while the data is being loaded from server', () => {
    cy.intercept('GET', '/posts').as('getPosts')

    cy.visit('/')

    cy.get('[data-testid="loading-indicator"]').should('exist')
  })

  it('should display a message to indicate that no content was found', () => {
    cy.intercept('GET', '/posts', { body: [] }).as('getPosts')

    cy.visit('/')
    cy.wait('@getPosts')

    cy.get('[data-testid="no-content-found"]').should('exist')
  })

  it('should display a post item for each post gotten from the API request', () => {
    const posts = new Array(Math.round(1 + Math.random() * 10))
      .fill({})
      .map(getPostMock)
      .map((post, index) => ({ ...post, id: index + 1 }))
    cy.intercept('GET', '/posts', { body: posts }).as('getPosts')

    cy.visit('/')

    cy.wait('@getPosts')

    cy.get('[data-testid="post-item"]').should('have.length', posts.length)
  })

  it('should allow user to filter the posts list through the brand search input', () => {
    const posts = getPosts()

    cy.intercept('GET', '/posts*', { body: posts }).as('getPosts')

    cy.visit('/')

    cy.wait('@getPosts')

    const targetPost = posts[Math.floor(Math.random() * posts.length)]

    cy.clock()
    cy.get('[data-testid="search-input"]').type(targetPost.car.brand)
    cy.tick(500)
    cy.intercept('GET', `/posts*`, { body: [targetPost] }).as('getPosts')
    cy.wait('@getPosts')

    cy.get('[data-testid="post-item"]').should('have.length', 1)
  })

  it('should render the error page if the request fails', () => {
    cy.intercept('GET', '/posts*', { body: {}, statusCode: 500 }).as('getPosts')

    cy.visit('/')

    cy.wait('@getPosts')

    cy.location().then((location) => {
      expect(location.pathname).to.be.eq('/500')
    })
  })

  it('should allow the user to favorite a post', () => {
    const posts = getPosts()
    cy.intercept('GET', '/posts', { body: posts }).as('getPosts')

    cy.visit('/')
    cy.wait('@getPosts')

    cy.intercept('PATCH', '/posts/1', { body: undefined }).as('likePost')
    cy.intercept('GET', '/posts', { body: posts }).as('getPosts')

    cy.get('[data-testid="like-button"]').first().click()

    cy.wait('@likePost')
    cy.wait('@getPosts')

    cy.get('@getPosts.all').should('have.length', 2)
    cy.get('@likePost.all').should('have.length', 1)
  })
})
