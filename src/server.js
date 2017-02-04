/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const PORT = process.env.PORT || 3000
const VOTE_PERIOD = process.env.VOTE_PERIOD || 5000
const OPEN_PAGE_TIMEOUT = process.env.OPEN_PAGE_TIMEOUT || 120000
const INJECTED_CODE_EXECUTION = process.env.INJECTED_CODE_EXECUTION || 90000
const PROXY = process.env.PROXY

const POLLDADDY_POLL_URL = 'http://www.europeanbestdestinations.com/best-of-europe/european-best-destinations-2017/'
const POLLDADDY_POLL_ID = '9632536'
const POLLDADDY_POLL_OPTION_ID = '44047129'

const _ = require('lodash')
const Promise = require('bluebird')

const Logger = require('./utils/logger')

const http = require('http')

const PollMommy = require('pollmommy')

const emoji = require('node-emoji')

const vote = function () {
  const start = new Date().getTime()

  return this.pollMommy.vote(POLLDADDY_POLL_URL, POLLDADDY_POLL_ID, POLLDADDY_POLL_OPTION_ID)
    .then((geoip = {}) => {
      const stop = new Date().getTime()
      const ipAddress = geoip.ip || emoji.get('thinking_face') + ' '
      const country = _.lowerCase(geoip.country)
      const emojiFlag = emoji.get(`flag-${country}`) + ' '

      Logger.info(`Voted for Porto from ${ipAddress} ${ipAddress ? 'in ' + emojiFlag : ''} (took ${stop - start} ms)`)
    })
    .catch((error) => Logger.error(error))
}

class Server {
  constructor () {
    const options = {
      gotoTimeout: OPEN_PAGE_TIMEOUT,
      executionTimeout: INJECTED_CODE_EXECUTION
    }

    if (PROXY) {
      options.switches = { 'proxy-server': PROXY }
    }

    this.pollMommy = new PollMommy(options)
  }

  start () {
    return new Promise(resolve => {
      if (this._httpServer) {
        return resolve()
      }

      Logger.info(`Making Porto ${emoji.get('tada')}  great again`)

      this._httpServer = http.createServer((req, res) => {
        const url = req.url.indexOf('?') > 0 ? req.url.split('?')[ 0 ] : req.url

        switch (url) {
          case '/ping':
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ answer: 'pong' }))
          default:
            res.writeHead(404)
            return res.end()
        }
      }).listen(PORT)

      if (VOTE_PERIOD > 0) {
        this.vote()
      }

      resolve()
    })
  }

  stop () {
    return new Promise(resolve => {
      Logger.info('Porto has become greater')

      if (this._httpServer) {
        this._httpServer.close()
      }

      resolve()
    })
  }

  vote () {
    Logger.debug('Started voting')

    return vote.bind(this)()
      .finally(() => {
        Logger.debug('Finished voting')

        this.timeout = setTimeout(() => this.vote(), VOTE_PERIOD)
      })
  }
}

module.exports = new Server()
