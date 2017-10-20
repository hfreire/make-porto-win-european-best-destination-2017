/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Server', () => {
  let subject
  let serverful
  let Logger
  let PollMommy

  before(() => {
    serverful = td.object([])
    serverful.Serverful = td.constructor([])

    Logger = td.object([ 'debug', 'info', 'error' ])

    PollMommy = td.constructor([ 'start' ])
  })

  after(() => td.reset())

  describe('when exporting', () => {
    beforeEach(() => {
      td.replace('serverful', serverful)

      td.replace('modern-logger', Logger)

      td.replace('pollmommy', PollMommy)

      subject = require('../src/server')
    })

    it('should be instance of serverful', () => {
      subject.should.be.instanceOf(serverful.Serverful)
    })
  })
})
