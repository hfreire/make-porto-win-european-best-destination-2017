/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const PORT = process.env.PORT || 3000
const POLL_PERIOD = process.env.POLL_PERIOD || 5000

/*
const POLLDADDY_POLL_URL = 'http://localhost:8000'
const POLLDADDY_POLL_ID = '9651636'
const POLLDADDY_POLL_OPTION_ID = '44138629'
*/
const POLLDADDY_POLL_URL = 'https://hugo.exec.sh'
const POLLDADDY_POLL_ID = '9651636'
const POLLDADDY_POLL_OPTION_ID = '44138629'

const _ = require('lodash')
const Promise = require('bluebird')
const Health = require('health-checkup')

const http = require('http')

const PollMommy = require('pollmommy')

const emoji = require('node-emoji')

function voteForPorto () {
  return this.pollMommy.vote(POLLDADDY_POLL_URL, POLLDADDY_POLL_ID, POLLDADDY_POLL_OPTION_ID)
}

class Server {
  constructor () {
    this.pollMommy = new PollMommy({
      gotoTimeout: 90000,
      executionTimeout: 60000,
      switches: {
        'proxy-server': '172.16.1.88:44438'
      }
    })
  }

  start () {
    return new Promise(resolve => {
      if (this._httpServer) {
        return resolve()
      }

      console.log(`Making Porto ${emoji.get('tada')}  great again`)

      this._httpServer = http.createServer((req, res) => {
        const url = req.url.indexOf('?') > 0 ? req.url.split('?')[ 0 ] : req.url

        switch (url) {
          case '/healthcheck':
            return Health.checkup()
              .then((status) => {
                const statusCode = _.find(status, (check) => !check.is_healthy) ? 503 : 200
                const body = JSON.stringify(status)

                res.writeHead(statusCode, { 'Content-Type': 'application/json' })
                res.end(body)
              })
          case '/ping':
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ answer: 'pong' }))
          default:
            res.writeHead(404)
            return res.end()
        }
      }).listen(PORT)

      if (POLL_PERIOD > 0) {
        this.poll()
      }

      resolve()
    })
  }

  stop () {
    return new Promise(resolve => {
      console.log('Porto has become greater')

      if (this._httpServer) {
        this._httpServer.close()
      }

      resolve()
    })
  }

  poll () {
    const _voteForPorto = () => {
      const start = new Date().getTime()

      return voteForPorto.bind(this)()
        .then((geoip = {}) => {
          const stop = new Date().getTime()
          const ipAddress = geoip.ip || emoji.get('thinking_face') + ' '
          const country = _.lowerCase(geoip.country)
          const emojiFlag = emoji.get(`flag-${country}`) + ' '

          console.log(`Voted for Porto from ${ipAddress} in ${emojiFlag} (took ${stop - start} ms)`)
        })
        .catch((error) => {
          console.error(`Failed to vote because of ${error.message}`)

          if (error.message === 'undefined') {
            console.error(error.stack)
          }
        })
    }

    return _voteForPorto()
      .finally(() => {
        this.timeout = setTimeout(() => this.poll(), POLL_PERIOD)
      })
  }
}

module.exports = new Server()
