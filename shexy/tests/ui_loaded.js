var expect = chai.expect;
var should = chai.should();

describe('Ui Loaded', function() {
  it('shexydiv', function() {
    var d = document.getElementById("shexydiv")
    should.exist(d);
    //  shexydiv.should.be.a('object');
  });

  it('Shape selector', function() {
    var d = document.getElementById("shape-selector")
    should.exist(d);
  });

  it('Shape loader', function() {
    var d = document.getElementById("shape-loader")
    should.exist(d);
  });

  it('Shape adder', function() {
    var d = document.getElementById("shape-adder")
    should.exist(d);
  });

  it('Shape form menu', function() {
    var d = document.getElementById("shape-menu")
    should.exist(d);
  });

  it('Shape footprintMenu', function() {
    var d = document.getElementById("footprint-menu")
    should.exist(d);
  });

  it('form populator', function() {
    var d = document.getElementById("shape-populator")
    should.exist(d);
  });

  it('solid login logout', function() {
    var dLogin = document.getElementById("solid-login")
    var dLogout = document.getElementById("solid-logout")
    should.exist(dLogin);
    should.exist(dLogout);
  });

  it("messages-console", function() {
    var d = document.getElementById("messages-console")
    should.exist(d);
  });

  it('Formulaire', function() {
    var d = document.getElementById("formulaire")
    should.exist(d);
  });

  it('Footprint', function() {
    var d = document.getElementById("footprint")
    should.exist(d);
  });

  it('Docs & links', function() {
    var d = document.getElementById("docs")
    should.exist(d);
  });







});
