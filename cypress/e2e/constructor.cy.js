describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    // фейковые токены
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });

  it('отображает ингредиенты из моков', () => {
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');

    cy.get('[data-cy=constructor]').should('contain', 'Выберите булки');
    cy.get('[data-cy=constructor-list]').should(
      'contain',
      'Выберите начинку'
    );
  });

  it('открывает и закрывает модальное окно ингредиента по крестику', () => {
    cy.contains('Краторная булка N-200i').click({ force: true });

    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]')
      .contains('Детали ингредиента')
      .should('exist');

    cy.get('[data-cy=modal]')
      .contains('Краторная булка N-200i')
      .should('exist');

    cy.get('[data-cy=modal-close]').click({ force: true });

    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('закрывает модальное окно по клику на overlay', () => {
    cy.contains('Краторная булка N-200i').click({ force: true });

    cy.get('[data-cy=modal]').should('exist');

    cy.get('[data-cy=modal-overlay]').click({ force: true });

    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('добавляет ингредиент в конструктор', () => {
    cy.get('[data-cy="add-643d69a5c3f7b9001cfa0941"]').click({ force: true });

    cy.get('[data-cy=constructor-list]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('добавляет булку в конструктор', () => {
    cy.get('[data-cy="add-643d69a5c3f7b9001cfa093c"]').click({ force: true });

    cy.get('[data-cy=constructor]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('создает заказ', () => {
    cy.get('[data-cy="add-643d69a5c3f7b9001cfa093c"]').click({ force: true });
    cy.get('[data-cy="add-643d69a5c3f7b9001cfa0941"]').click({ force: true });

    cy.contains('Оформить заказ').click({ force: true });

    cy.wait('@createOrder');

    cy.get('[data-cy=modal]').should('exist');

    cy.get('[data-cy=order-number]').should('contain', '12345');

    cy.get('[data-cy=modal-close]').click({ force: true });

    cy.get('[data-cy=modal]').should('not.exist');

    // проверяем очистку конструктора
    cy.get('[data-cy=constructor]').should('contain', 'Выберите булки');
    cy.get('[data-cy=constructor-list]').should(
      'contain',
      'Выберите начинку'
    );
  });
});
