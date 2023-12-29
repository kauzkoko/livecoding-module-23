# live coding stuff

repo for final perfomance in live coding module

## technical setup

audio/visuals: flok strudel / strudel.cc <-> local websocket <-> vue

crowd interaction: thermal printer paper printed qr codes sequencer -> supabase websocket -> local websocket -> strudel / vue

flok strudel final performance link: https://next.flok.cc/s/sticky-ivory-elk-ebeacb83 or see strudel_final.txt in /public/ directory

pages used for final performance: /pages/performance/1 2 3

find websocket servers here: https://github.com/kauzkoko/livecoding-servers/tree/main

## install / run

1. clone repo
2. install bun via homebrew or npm install -g bun
3. `cd` to repo
4. `bun install`
5. `bun run dev`

to run it in https mode do the following in terminal:
`NODE_TLS_REJECT_UNAUTHORIZED=0 bun dev --https --ssl-cert localhost.pem --ssl-key localhost-key.pem`
