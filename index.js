const fs = require('fs');
const axios = require('axios');
const r = require('readline-sync');
const setTitle = require("console-title");

var sent = 0;
var failed = 0;

function get_message() {
    var data = fs.readFileSync('messages.txt', 'utf8')
    const readMe = data.split(/\r?\n/) 
    const lineCount = readMe.length
    const randomLineNumber = Math.floor(Math.random() * lineCount)
    return readMe[randomLineNumber]
}

function get_proxy() {
    var data = fs.readFileSync('proxies.txt', 'utf8')
    const readMe = data.split(/\r?\n/) 
    const lineCount = readMe.length
    const randomLineNumber = Math.floor(Math.random() * lineCount)
    return readMe[randomLineNumber].split(':')
}

function get_token() {
    var data = fs.readFileSync('tokens.txt', 'utf8')
    const readMe = data.split(/\r?\n/) 
    const lineCount = readMe.length
    const randomLineNumber = Math.floor(Math.random() * lineCount)
    return readMe[randomLineNumber]
}
async function send_message(channelid) {
    proxy = get_proxy()
    message = get_message()
    token = get_token()
    proxyHost = proxy[0]
    proxyPort = proxy[1]
    axios({
        method: 'POST',
        url: `https://discord.com/api/v9/channels/${channelid}/messages`,
        headers: {
            Authorization: token
        },
        data: {
            content: message
        },
        proxy: {
            host: proxyHost,
            port: proxyPort
        }
    }).then(response => {
        sent += 1
        setTitle(`Hartman5 | Discord Chat Booster | Sent ${sent} / Failed ${failed}`)
        send_message(channelid)
    }).catch(error => {
        failed += 1
        setTitle(`Hartman5 | Discord Chat Booster | Sent ${sent} / Failed ${failed}`)
        send_message(channelid)
    })
}

setTitle(`Hartman5 | Discord Chat Booster | Sent ${sent} / Failed ${failed}`)
const channelid = r.question('Discord Channel ID: ')
send_message(channelid)
