// var app = require('../app');
// var request = require('supertest');

var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code", function(done) {
  chai
    .request("http://127.0.0.1:3001")
    .post("/OwnerLogin")
    .send({ username: "apurav@gmail.com", password: "Apurav@1993" })
    .end(function(err, res) {
      if (err) {
        console.log("err");
        mocha.fullTrace();
        done(err);
      } else {
        expect(res).to.have.status(200);
        done();
      }
    });
});
