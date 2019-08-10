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
    var sel = document.getElementById("shex-selector")
    should.exist(sel);
    sel.should.have.lengthOf(22);
  });


/*
  it('Shape adder', function() {
    var d = document.getElementById("shape-adder")
    should.exist(d);
  });*/

  it('menu for formulaire', function() {
    var d = document.getElementById("formulaire-menu")
    should.exist(d);
  });

  it('menu for footprint', function() {
    var d = document.getElementById("footprint-menu")
    should.exist(d);
  });
/*
  it('form populator', function() {
    var d = document.getElementById("shape-populator")
    should.exist(d);
  });
*/
  it('solid login logout', function() {
    var dLogin = document.getElementById("solid-login")
    var dLogout = document.getElementById("solid-logout")
    should.exist(dLogin);
    should.exist(dLogout);
  });

  it("log console", function() {
    var s = document.getElementById("story")
    should.exist(s);
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
