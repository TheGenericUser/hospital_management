require('dotenv').config();

const Memcached = require('memcached');

const { productionOrDevelopment } = require('../utils/envUtils');

const memcached = new Memcached(productionOrDevelopment(process.env.MEMCACHED_HOST_PRODUCTION, process.env.MEMCACHED_HOST_DEVELOPMENT, process.env.NODE_ENV));

const setValue = async (key, value, ttl = 60 * 60) => {
    const data = {
        value: (typeof value === 'object') ? JSON.stringify(value) : value,
        // value: Array.isArray(value) ? JSON.stringify(value) : value,
        expiresAt: Date.now() + ttl * 1000,
    };
    return new Promise((resolve, reject) => {
        memcached.set(key, data, ttl, (err) => {
            if (err) return reject(err);
            resolve(`Value for ${key} set successfully`);
        });
    });
};

const getValue = async (key) => {
    return new Promise((resolve, reject) => {
        memcached.get(key, (err, data) => {
            if (err) return reject(err);
            if (!data) return resolve({ value:null, remainingTTL:null });
            let { value, expiresAt } = data;
            const remainingTTL = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));

            try {
                const parsedValue = JSON.parse(value);
                return resolve({ value: parsedValue, remainingTTL });
            } catch {
                resolve({ value, remainingTTL });
            }

        });
    });
};

const deleteValue = async (key) => {
    return new Promise((resolve, reject) => {
        memcached.del(key, (err) => {
            if (err) return reject(err);
            resolve(`Value for ${key} deleted successfully`);
        });
    });
};

function getTTL(key) {
    if (ttlStore[key]) {
        const remainingTime = ttlStore[key] - Date.now();
        return remainingTime > 0 ? Math.floor(remainingTime / 1000) : 0;
    }
    return null;
}

module.exports = { setValue, getValue, deleteValue, getTTL };