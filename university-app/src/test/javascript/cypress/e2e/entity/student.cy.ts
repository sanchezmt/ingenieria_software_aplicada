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

describe('Student e2e test', () => {
  const studentPageUrl = '/student';
  const studentPageUrlPattern = new RegExp('/student(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const studentSample = {
    firstName: 'José Emilio',
    lastName: 'Corral Aragón',
    email: 'Alejandra.FajardoOlivera@hotmail.com',
    enrollmentDate: '2025-07-07',
  };

  let student;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/students+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/students').as('postEntityRequest');
    cy.intercept('DELETE', '/api/students/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (student) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/students/${student.id}`,
      }).then(() => {
        student = undefined;
      });
    }
  });

  it('Students menu should load Students page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('student');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Student').should('exist');
    cy.url().should('match', studentPageUrlPattern);
  });

  describe('Student page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(studentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Student page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/student/new$'));
        cy.getEntityCreateUpdateHeading('Student');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', studentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/students',
          body: studentSample,
        }).then(({ body }) => {
          student = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/students+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/students?page=0&size=20>; rel="last",<http://localhost/api/students?page=0&size=20>; rel="first"',
              },
              body: [student],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(studentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Student page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('student');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', studentPageUrlPattern);
      });

      it('edit button click should load edit Student page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Student');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', studentPageUrlPattern);
      });

      it('edit button click should load edit Student page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Student');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', studentPageUrlPattern);
      });

      it('last delete button click should delete instance of Student', () => {
        cy.intercept('GET', '/api/students/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('student').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', studentPageUrlPattern);

        student = undefined;
      });
    });
  });

  describe('new Student page', () => {
    beforeEach(() => {
      cy.visit(`${studentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Student');
    });

    it('should create an instance of Student', () => {
      cy.get(`[data-cy="firstName"]`).type('Gabriela');
      cy.get(`[data-cy="firstName"]`).should('have.value', 'Gabriela');

      cy.get(`[data-cy="lastName"]`).type('Apodaca Chacón');
      cy.get(`[data-cy="lastName"]`).should('have.value', 'Apodaca Chacón');

      cy.get(`[data-cy="email"]`).type('Debora.SierraGurule72@hotmail.com');
      cy.get(`[data-cy="email"]`).should('have.value', 'Debora.SierraGurule72@hotmail.com');

      cy.get(`[data-cy="enrollmentDate"]`).type('2025-07-07');
      cy.get(`[data-cy="enrollmentDate"]`).blur();
      cy.get(`[data-cy="enrollmentDate"]`).should('have.value', '2025-07-07');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        student = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', studentPageUrlPattern);
    });
  });
});
