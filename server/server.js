const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://lyrical:lyrical@ds115866.mlab.com:15866/zrlyricaldb';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
} 

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI,  { useMongoClient: true });

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
