describe('Adding a new category after login', () => {
  it('navigates to categories page after login and adds new category', () => {
    // Kunjungi halaman utama
    cy.visit('http://localhost:5173/');

    // Memastikan form login ada di halaman
    cy.get('[data-testid="form"]').should("exist");

    // Mengisi dan submit form login
    cy.get('input#email')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'email')
      .type('admin@store.com').should('have.value', 'admin@store.com');

    cy.get('input#password')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'password')
      .type('123456').should('have.value', '123456');

    cy.get('[data-testid="submit"]').click();

    // Memastikan halaman utama setelah login berhasil dimuat
    cy.get('div.home').should('be.visible');
    cy.get('div.sidebar').should('be.visible');

    // Mengklik menu kategori (categories) di sidebar
    cy.get('.categories').click();

    // Memastikan URL berubah menjadi yang mengandung '/categories'
    cy.url().should('include', '/categories');

    // Pastikan tombol "Add Category" ada dan klik
    cy.contains('Add Category').click();

    // Memastikan modal terbuka
    cy.get('.modalBox').should('be.visible');

    // Memastikan input "Name" dengan placeholder "Coffee" terlihat dan memiliki nilai "Dessert"
    cy.get('input#name')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Coffee')
      .type('Dessert').should('have.value', 'Dessert');

    // Memastikan input "Description" dengan placeholder "Description" terlihat dan memiliki nilai "Ice Cream"
    cy.get('input#description')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Description')
      .type('Ice Cream').should('have.value', 'Ice Cream');

    // Mengklik tombol "Add" di dalam modal
    cy.contains('Add').click({ force: true });

    // Menunggu sebentar untuk memastikan kategori baru ditambahkan dan kembali ke halaman Categories
    cy.url().should('include', '/categories');

  });
});
