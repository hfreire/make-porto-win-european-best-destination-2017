/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const VOTE_PERIOD = process.env.VOTE_PERIOD || 5000

const { Serverful } = require('serverful')

const Logger = require('modern-logger')

const VotingPoll = require('./voting-poll')

const vote = () => {
  return VotingPoll.vote()
    .catch((error) => Logger.error(error))
    .finally(() => {
      this._timeout = setTimeout(() => vote(), VOTE_PERIOD)
    })
}

class Server extends Serverful {
  start () {
    return super.start()
      .then(() => Logger.info('Making Porto :tada: great again'))
      .then(() => {
        if (VOTE_PERIOD > 0) {
          vote.bind(this)()
        }
      })
  }

  stop () {
    return Logger.info('Porto has become greater')
      .then(() => {
        clearTimeout(this._timeout)

        super.stop()
      })
  }
}

module.exports = new Server()
