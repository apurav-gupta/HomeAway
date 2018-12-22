var chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
var expect = chai.expect;
it("Should check Owner credentials and return status code", function(done) {
  chai
    .request(`http://ec2-52-14-69-30.us-east-2.compute.amazonaws.com:3001`)
    .post("/api/properties/bookedProperties")
    .send({
      username: "ayush@gmail.com"
    })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});
