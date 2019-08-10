//https://www.chaijs.com/
//var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

describe('Load libs', function() {
  it('shex & solid file are loaded', function() {
    assert.typeOf(shex, 'object', 'shex is an object'); // with optional message
    //console.log(typeof (fileClient))
    //assert.typeOf(fileClient, 'object', 'fileClient is an object'); // with optional message
    should.exist(shex);
    should.exist(fileClient);
    shex.should.be.a('object');
    //  fileClient.should.be.a('object');
  });
});
