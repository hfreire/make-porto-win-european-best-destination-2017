/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

describe('Server', () => {
  let subject
  let serverful
  let Logger

  before(() => {
    serverful = td.object([])
    serverful.Serverful = td.constructor([])

    Logger = td.object([ 'info', 'error' ])
  })

  after(() => td.reset())

  describe('when exporting', () => {
    beforeEach(() => {
      td.replace('serverful', serverful)

      td.replace('modern-logger', Logger)

      subject = require('../src/server')
    })

    it('should be instance of serverful', () => {
      subject.should.be.instanceOf(serverful.Serverful)
    })
  })
})