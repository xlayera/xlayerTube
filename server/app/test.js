'use strict';

const { google } = require('googleapis');
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');

// initialize the Youtube API library
const youtube = google.youtube('v3');

var TOKEN_PATH = path.join(__dirname + '/services/client_secret.json');

// a very simple example of searching for youtube videos
async function runSample() {
    const auth = await authenticate({
        keyfilePath: TOKEN_PATH,
        scopes: ['https://www.googleapis.com/auth/youtube'],
    });
    google.options({ auth });

    const res = await youtube.search.list({
        part: 'id,snippet',
        q: 'Node.js on Google Cloud',
    });
    console.log(res.data);
}

if (module === require.main) {
    runSample().catch(console.error);
}
module.exports = runSample;