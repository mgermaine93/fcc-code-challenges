const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

const isPasswordCorrect = async (password, hash) => {
    if (!password || !hash) {
        return false
    }
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (err) {
        console.error(err);
        return false;
    }
};


module.exports = isPasswordCorrect;