"use strict";
function onSuccess(res, data) {
    res.status(200).json({ payload: data });
}
exports.onSuccess = onSuccess;
