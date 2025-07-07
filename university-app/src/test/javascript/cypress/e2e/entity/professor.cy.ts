import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('Professor e2e test', () => {
  const professorPageUrl = '/professor';
  const professorPageUrlPattern = new RegExp('/professor(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const professorSample = {
    firstName: 'Sofía',
    lastName: 'Alemán Burgos',
    email: 'Jeronimo.PreciadoBaez68@gmail.com',
    hireDate: '2025-07-07',
  };

  let professor;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/professors+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/professors').as('postEntityRequest');
    cy.intercept('DELETE', '/api/professors/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (professor) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/professors/${professor.id}`,
      }).then(() => {
        professor = undefined;
      });
    }
  });

  it('Professors menu should load Professors page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('professor');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Professor').should('exist');
    cy.url().should('match', professorPageUrlPattern);
  });

  describe('Professor page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(professorPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Professor page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/professor/new$'));
        cy.getEntityCreateUpdateHeading('Professor');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', professorPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/professors',
          body: professorSample,
        }).then(({ body }) => {
          professor = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/professors+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/professors?page=0&size=20>; rel="last",<http://localhost/api/professors?page=0&size=20>; rel="first"',
              },
              body: [professor],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(professorPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Professor page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('professor');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', professorPageUrlPattern);
      });

      it('edit button click should load edit Professor page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Professor');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', professorPageUrlPattern);
      });

      it('edit button click should load edit Professor page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Professor');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', professorPageUrlPattern);
      });

      it('last delete button click should delete instance of Professor', () => {
        cy.intercept('GET', '/api/professors/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('professor').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', professorPageUrlPattern);

        professor = undefined;
      });
    });
  });

  describe('new Professor page', () => {
    beforeEach(() => {
      cy.visit(`${professorPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Professor');
    });

    it('should create an instance of Professor', () => {
      cy.get(`[data-cy="firstName"]`).type('Luis Miguel');
      cy.get(`[data-cy="firstName"]`).should('have.value', 'Luis Miguel');

      cy.get(`[data-cy="lastName"]`).type('Santillán Montaño');
      cy.get(`[data-cy="lastName"]`).should('have.value', 'Santillán Montaño');

      cy.get(`[data-cy="email"]`).type('Lola38@yahoo.com');
      cy.get(`[data-cy="email"]`).should('have.value', 'Lola38@yahoo.com');

      cy.get(`[data-cy="hireDate"]`).type('2025-07-07');
      cy.get(`[data-cy="hireDate"]`).blur();
      cy.get(`[data-cy="hireDate"]`).should('have.value', '2025-07-07');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        professor = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', professorPageUrlPattern);
    });
  });
});
