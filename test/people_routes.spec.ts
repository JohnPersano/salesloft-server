import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import app from "../src/index";

chai.use(chaiHttp);


describe('salesloft people routes tests', () => {

    it('GET /people responds with 200 by default', (done) => {

        chai.request(app)
            .get('/people')
            .end((error, response) => {
                expect(response.status).to.equal(200);
                done();
            });

    });

});
