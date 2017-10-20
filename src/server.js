/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const VOTE_PERIOD = process.env.VOTE_PERIOD || 5000
const OPEN_PAGE_TIMEOUT = process.env.OPEN_PAGE_TIMEOUT || 120000
const EXECUTION_TIMEOUT = process.env.EXECUTION_TIMEOUT || 90000
const PROXY = process.env.PROXY

const POLLDADDY_POLL_URL = 'http://www.europeanbestdestinations.com/best-of-europe/european-best-destinations-2017/'
const POLLDADDY_POLL_ID = '9632536'
const POLLDADDY_POLL_OPTION_ID = '44047129'

const { Serverful } = require('serverful')

const _ = require('lodash')

const Logger = require('modern-logger')

const PollMommy = require('pollmommy')

const vote = () => {
  const startDate = _.now()

  Logger.debug('Started voting')

  return this._pollMommy.vote(POLLDADDY_POLL_URL, POLLDADDY_POLL_ID, POLLDADDY_POLL_OPTION_ID)
    .then((geoip = {}) => {
      const stopDate = _.now()
      const duration = _.round((stopDate - startDate) / 1000, 1)
      const ipAddress = geoip.ip || `:thinking_face: `
      const country = _.lowerCase(geoip.country)
      const emojiFlag = `:flag-${country}: `

      Logger.info(`Voted for Porto from ${ipAddress} ${ipAddress ? 'in ' + emojiFlag : ''} (took ${duration} ms)`)
    })
    .catch((error) => Logger.error(error))
    .finally(() => {
      Logger.debug('Finished voting')

      this.timeout = setTimeout(() => this.vote(), VOTE_PERIOD)
    })
}

const defaultOptions = {
  pollmomy: {
    gotoTimeout: OPEN_PAGE_TIMEOUT,
    executionTimeout: EXECUTION_TIMEOUT
  }
}

class Server extends Serverful {
  constructor (options = {}) {
    super()

    this._options = _.defaultsDeep(options, defaultOptions)

    if (PROXY) {
      this._options.pollmommy.switches = { 'proxy-server': PROXY }
    }

    this._pollMommy = new PollMommy(this._options._pollMommy)
  }

  start () {
    return Logger.info(`Making Porto :tada: great again`)
      .then(() => {
        if (VOTE_PERIOD > 0) {
          vote()
        }
      })
  }

  stop () {
    return Logger.info('Porto has become greater')
      .then(() => this.stop())
  }
}

module.exports = new Server()
