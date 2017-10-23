const chai = require('chai');
const trev = require('./trev-root')

describe('', function() {
    it('Testing Request Method', function() {
        chai.expect(trev().request(20).n).to.eql(' -n 20 ');
    })
    it('Testing concurrency Method', function() {
        chai.expect(trev().concurrency(20).c).to.eql(' -c 20 ');
    })
    it('Testing timeout Method', function() {
        chai.expect(trev().timeout(20).t).to.eql(' -t 20 ');
    })
    it('Testing rateLimit Method', function() {
        chai.expect(trev().rateLimit(20).q).to.eql(' -q 20 ');
    })
    it('Testing outputType Method', function() {
        chai.expect(trev().outputType().o).to.eql(' -o csv ');
    })
    it('Testing Verb Method Method', function() {
        chai.expect(trev().method('GET').m).to.eql(' -m GET ');
        chai.expect(trev().method('POST').m).to.eql(' -m POST ');
        chai.expect(trev().method('PUT').m).to.eql(' -m PUT ');
        chai.expect(trev().method('DELETE').m).to.eql(' -m DELETE ');
        chai.expect(trev().method('OPTIONS').m).to.eql(' -m OPTIONS ');
        chai.expect(trev().method('HEAD').m).to.eql(' -m HEAD ');
    })
    it('Testing outputType Method', function() {
        let headers = trev().headers({testing: 'headers', TLPcoder: 'trevor'}).H
        chai.expect(trev().normalizeHeaders(headers)).to.eql('-H \'testing:headers\' -H \'TLPcoder:trevor\'');
    })
})