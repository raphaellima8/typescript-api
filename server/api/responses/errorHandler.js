"use strict";
function onError(res, message, err) {
    console.log('Error: ', err);
    res.status(500).send();
}
exports.onError = onError;
