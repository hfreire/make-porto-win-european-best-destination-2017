#!/bin/sh

export DISPLAY=:0

$(which Xvfb) $DISPLAY -ac >/dev/null 2>&1 &

exec gosu node node src/app.js
