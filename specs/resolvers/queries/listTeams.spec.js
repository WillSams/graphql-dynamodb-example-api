process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const { teams } = require('../../../src/resolvers/queries');
const { reseedDb } = require('../../../specs');

chai.should();

describe('Resolvers - Queries', () => {
  before(() => reseedDb());

  it('`teams` query should retrieve all teams', async () => {
    const result = await teams(null);

    expect(result.length).to.equal(3);
  });
});