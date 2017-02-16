/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Server', () => {
  let subject
  let http
  let httpServer
  let Logger

  before(() => {
    http = td.replace('http', td.object([ 'createServer' ]))
    httpServer = td.object([ 'listen', 'close' ])
    Logger = td.object([ 'info' ])
    td.replace('modern-logger', Logger)

    td.when(http.createServer(td.matchers.anything()))
      .thenReturn(httpServer)
  })

  afterEach(() => {
    td.reset()
  })

  describe('when starting with voting disabled', () => {
    const vote = td.function()

    process.env.VOTE_PERIOD = 0

    before(() => {
      subject = require('../src/server')
      subject.vote = vote
    })

    beforeEach(() => {
    })

    after(() => {
      delete require.cache[ require.resolve('../src/server') ]
    })

    it('should not vote', () => {
      subject.start()

      td.verify(vote(), { times: 0 })
    })
  })
})
