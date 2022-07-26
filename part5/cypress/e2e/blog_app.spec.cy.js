describe('Blog app',function ()  {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      name: 'Juan Ramirez',
      username: 'juancho1515',
      passwordHash: 'asd123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    const user2 = {
      name: 'Maria',
      username: 'Maria12345',
      passwordHash: 'asd123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000/')
  })
  it('Login form is shown', () => {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function (){
      cy.get('#username').type('juancho1515')
      cy.get('#password').type('asd123')
      cy.get('#button-login').click()
      cy.contains('Blog')
      cy.contains('Juan Ramirez logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('juancho1515')
      cy.get('#password').type('asd')
      cy.get('#button-login').click()
      cy.contains('Log in to application')
      cy.contains('username')
      cy.contains('password')
      cy.get('.notif').contains('Wrong credentials')
      cy.get('.notif').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.notif').should('have.css', 'border-style', 'solid')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username:'juancho1515', password: 'asd123' })
    })
    it('A blog can be created', function () {
      cy.createBlog({
        title: 'Blog de prueba',
        author: 'Juan Ramirez',
        url: 'Una url aca'
      })
      cy.contains('Blog de prueba Juan Ramirez'),
      cy.contains('view')
    })
    it('checks that users can like a blog', function () {
      cy.createBlog({
        title: 'Blog de prueba',
        author: 'Juan Ramirez',
        url: 'Una url aca'
      })
      cy.get('#blog-test').click()
      cy.get('#like-test').click()
      cy.get('#blog-test').click()
      cy.contains('likes 1')
    })
    it('delete blog by an authorized user', function () {
      cy.contains('Juan Ramirez logged in')
      cy.createBlog({
        title: 'Blog de prueba',
        author: 'Juan Ramirez',
        url: 'Una url aca'
      })
      cy.get('#blog-test').click()
      cy.get('#remove-button').click()
      cy.get('#blog-test').should('not.exist')
    })
    it('delete blog by an unauthorized user', function () {
      cy.createBlog({
        title: 'Blog de prueba',
        author: 'Juan Ramirez',
        url: 'Una url aca'
      })
      cy.get('#logout-button').click()
      cy.login({ username: 'Maria12345', password:'asd123' })
      cy.get('#blog-test').click()
      cy.get('#remove-button').should('not.exist')
    })
    it('ordered by likes', function () {
      cy.createBlog({
        title: 'Blog de prueba',
        author: 'Juan Ramirez',
        url: 'Una url aca',
        likes: 10
      })
      cy.createBlog({
        title: 'Blog de prueba 1',
        author: 'Maria',
        url: 'Una url aca',
        likes: 20
      })
      cy.get('.blogStyle').eq(0).should('contain','Blog de prueba 1 Maria')
      cy.get('.blogStyle').eq(1).should('contain','Blog de prueba Juan Ramirez')
    })
  })
})