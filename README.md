# Let's make :city_sunrise: Porto :trophy: win the :euro: European Best Destination :tada: 2017
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/hfreire/make-porto-win-european-best-destination-2017.svg?branch=master)](https://travis-ci.org/hfreire/make-porto-win-european-best-destination-2017)
[![Coverage Status](https://coveralls.io/repos/github/hfreire/make-porto-win-european-best-destination-2017/badge.svg?branch=master)](https://coveralls.io/github/hfreire/make-porto-win-european-best-destination-2017?branch=master)
[![Dependency Status](https://img.shields.io/david/hfreire/make-porto-win-european-best-destination-2017.svg?style=flat)](https://david-dm.org/hfreire/make-porto-win-european-best-destination-2017)
[![](https://img.shields.io/github/release/hfreire/make-porto-win-european-best-destination-2017.svg)](https://github.com/hfreire/make-porto-win-european-best-destination-2017/releases)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Uses [Pollmommy](https://github.com/hfreire/pollmommy) and [Tor](https://github.com/hfreire/rotating-proxy) to hack the election of Porto as the [European Best Destination 2017](http://www.europeanbestdestinations.com/best-of-europe/european-best-destinations-2017/) from [European Best Destinations](https://http://www.europeanbestdestinations.com).

### Features
* Bypasses the poll voting limitations: Cookie and IP address :white_check_mark:
* Launch :rocket: inside a Docker container :whale: so you don't need to manage the dependencies :raised_hands: :white_check_mark:
* Uses a Tor network setup that is optimized to deliver a different IP address on each vote :white_check_mark:
* Quickly deploy and easily scale the number of voters by using Rancher :white_check_mark:

### How to launch
```
docker run hfreire/make-porto-win-european-best-destination-2017:1.0.0
```
#### Available environment variables
* PROXY - Proxy hostname and port that will be used to tunnel the votes (default: not used)
* VOTE_PERIOD - Time period between each vote (default: 5 seconds)
* OPEN_PAGE_TIMEOUT - Timeout to open poll website (default: 120 seconds)
* EXECUTION_TIMEOUT - Timeout to execute the injected code to vote (default: 90 seconds)

### How to build
Clone the GitHub repo
```
git clone https://github.com/hfreire/make-porto-win-european-best-destination-2017.git
```

Change current directory
```
cd make-porto-win-european-best-destination-2017
```

Run the NPM script that will build the docker container
```
npm run build
```

### Limitations
* The number of IP addresses are limited to the [available Tor exit nodes during the voting period](https://metrics.torproject.org/relayflags.html?start=2017-01-20&end=2017-02-10&flag=Exit)
