const { expect } = require('chai')
const { R } = require('./dist/bundle')

describe('R', () => {
  describe('#call', () => {
    it('should add two numbers', done => {
      let r = new R('./test_files/add.R')
      r.data(2, 3)
      r.call()
        .then(result => {
          expect(result).to.equal(5)
          done()
        })
        .catch(e => console.log('err : ', e))
    })

    it('should return what was passed', done => {
      let r = new R('./test_files/return_immediate.R')
      r.data({stuff: [1, 2, 9999999]}, 'hello', 99.9)
      r.call()
        .then(result => {
          expect(result).to.deep.equal([{stuff: [1, 2, 9999999]}, 'hello', 99.9])
          done()
        })
        .catch(e => console.log('err : ', e))
    })
  })

  describe('#callSync', () => {
    it('should add two numbers', () => {
      let r = new R('./test_files/add.R')
      r.data(2, 3)
      let result = r.callSync()
      expect(result).to.equal(5)
    })

    it('should return what was passed', () => {
      let r = new R('./test_files/return_immediate.R')
      r.data({stuff: [1, 2, 9999999]}, 'hello', 99.9)
      let result = r.callSync()
      expect(result).to.deep.equal([{stuff: [1, 2, 9999999]}, 'hello', 99.9])
    })
  })
})
