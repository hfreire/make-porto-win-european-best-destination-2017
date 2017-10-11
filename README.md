# Let's make :city_sunrise: Porto :trophy: win the :euro: European Best Destination :tada: 2017

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/hfreire/make-porto-win-european-best-destination-2017.svg?branch=master)](https://travis-ci.org/hfreire/make-porto-win-european-best-destination-2017)
[![Coverage Status](https://coveralls.io/repos/github/hfreire/make-porto-win-european-best-destination-2017/badge.svg?branch=master)](https://coveralls.io/github/hfreire/make-porto-win-european-best-destination-2017?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/hfreire/make-porto-win-european-best-destination-2017.svg)](https://greenkeeper.io/)
[![](https://img.shields.io/github/release/hfreire/make-porto-win-european-best-destination-2017.svg)](https://github.com/hfreire/make-porto-win-european-best-destination-2017/releases)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker Stars](https://img.shields.io/docker/stars/hfreire/make-porto-win-european-best-destination-2017.svg)](https://hub.docker.com/r/hfreire/make-porto-win-european-best-destination-2017/)
[![Docker Pulls](https://img.shields.io/docker/pulls/hfreire/make-porto-win-european-best-destination-2017.svg)](https://hub.docker.com/r/hfreire/make-porto-win-european-best-destination-2017/)

Uses [Pollmommy](https://github.com/hfreire/pollmommy) and [Tor](https://github.com/hfreire/rotating-proxy) to hack the election of Porto as the [European Best Destination 2017](http://www.europeanbestdestinations.com/best-of-europe/european-best-destinations-2017/) from [European Best Destinations](https://http://www.europeanbestdestinations.com).

<p align="center" style="margin-top:-30px;margin-bottom:0px;">
  <img src="share/github/european-best-destination-2017-vote.png" width="180">
</p>

<p>
  <img src="share/github/european-best-destination-2017.png" width="430">
  <img src="share/github/voting-screencapture.gif" width="425">
</p>

<p align="center" style="margin-top:0px;margin-bottom:0px;">
  <img src="share/github/european-best-destination-2017-winner.png" width="150">
</p>

<p align="center">
  <img src="share/github/voting-winner.png" width="420">
</p>

### Features
* Bypasses :shipit: the poll voting system :cop: protection: cookie :cookie: and IP address :computer: :white_check_mark:
* Launch :rocket: inside a Docker container :whale: so you don't need to manage the dependencies :raised_hands: :white_check_mark:
* Uses a Tor network setup that is optimized to deliver a different IP address on each vote :white_check_mark:
* Quickly deploy :runner: and easily scale :two_men_holding_hands: the number of voters by using Rancher :white_check_mark:

### How to use

#### Use it in your terminal
Run the Docker image in a container
```
docker run hfreire/make-porto-win-european-best-destination-2017
```
#### Available environment variables
Variable | Description | Required | Default value
:---:|:---:|:---:|:---:
PROXY | Proxy hostname and port that will be used to tunnel the votes. | false |`undefined`
VOTE_PERIOD | Time period (in seconds) between each vote. | false | `5`
OPEN_PAGE_TIMEOUT | Timeout (in seconds) to open poll website. | false | `120`
EXECUTION_TIMEOUT | Timeout (in seconds) to execute the injected code to vote. | false | `90`

### How to build
Clone the GitHub repo
```
git clone https://github.com/hfreire/make-porto-win-european-best-destination-2017.git
```

Change current directory
```
cd make-porto-win-european-best-destination-2017
```

Install dependencies
```
npm install
```

Run the NPM script that will build the Docker image
```
npm run build
```

### Limitations
* The number of IP addresses are limited to the [available Tor exit nodes during the voting period](https://metrics.torproject.org/relayflags.html?start=2017-01-20&end=2017-02-10&flag=Exit)

### In the news and social media

<p align="center">
    <img src="https://raw.githubusercontent.com/hfreire/make-porto-win-european-best-destination-2017/master/share/github/expresso-20170211.jpeg" width="274">
</p>

<p align="center">
    <img src="share/github/european-best-destination-2017-closed_tweet.png" width="374">
    <img src="share/github/european-best-destination-2017-winner_tweet.png" width="374">
</p>
