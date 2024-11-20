const env = {
    MONGO_URI: process.env.MONGO_URI || '5000',
    BOT_TOKEN: process.env.BOT_TOKEN || 'mongodb://localhost:27017/telegramMiniApp',
    JWT_SECRET: process.env.JWT_SECRET || '7791733357:AAGAmRvgkndMrq_wun48s1N3A3BSQ6IwHGw',
};

module.exports = env;
