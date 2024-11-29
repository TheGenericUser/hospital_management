const productionOrDevelopment = (production, development, env) => {
    return env === 'production' ? production : development
};


module.exports = { productionOrDevelopment };