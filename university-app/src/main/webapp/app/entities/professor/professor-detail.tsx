import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './professor.reducer';

export const ProfessorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const professorEntity = useAppSelector(state => state.professor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="professorDetailsHeading">
          <Translate contentKey="universityApp.professor.detail.title">Professor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{professorEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="universityApp.professor.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{professorEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="universityApp.professor.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{professorEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="universityApp.professor.email">Email</Translate>
            </span>
          </dt>
          <dd>{professorEntity.email}</dd>
          <dt>
            <span id="hireDate">
              <Translate contentKey="universityApp.professor.hireDate">Hire Date</Translate>
            </span>
          </dt>
          <dd>
            {professorEntity.hireDate ? <TextFormat value={professorEntity.hireDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/professor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/professor/${professorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProfessorDetail;
