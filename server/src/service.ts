import { IncomingMessage, ServerResponse } from 'http';
const stringify = require('fast-json-stable-stringify');
const fs = require('fs');
const path = require('path');
const url = require('url');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const {
  SECRET_JWT_KEY_SIGN_IN,
  EXPIRE_TIME_JWT_SIGN_IN,
  MOCK_USER_EMAIL,
  MOCK_USER_PASSWORD,
  SECRET_KEY_PASSWORD,
} = require('./config.ts');

exports.getPostsRequest = function (req: IncomingMessage, res: ServerResponse) {
  const token = req.headers.authorization;

  jwt.verify(token, SECRET_JWT_KEY_SIGN_IN, async (err: any, payload: any) => {
    if (!err) {
      const rawdata = fs.readFileSync(path.join(__dirname, '..', 'posts.json'));
      const posts = JSON.parse(rawdata);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(stringify(posts));
    } else {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end();
    }
  });
};

exports.deletePostRequest = function (
  req: IncomingMessage,
  res: ServerResponse
) {
  const token = req.headers.authorization;
  const { id } = url.parse(req.url, true).query;

  jwt.verify(token, SECRET_JWT_KEY_SIGN_IN, async (err: any, payload: any) => {
    if (!err) {
      const rawdata = fs.readFileSync(path.join(__dirname, '..', 'posts.json'));
      const posts = JSON.parse(rawdata);

      interface Post {
        userId: number;
        id: number;
        title: string;
        body: string;
      }
      const newPosts = posts.filter((post: Post) => post.id !== +id);

      const data = stringify(newPosts, null, 2);
      fs.writeFileSync('posts.json', data);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end();
    } else {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end();
    }
  });
};

exports.signInRequest = function (req: IncomingMessage, res: ServerResponse) {
  let body = '';

  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    const { email = '', password = '' } = JSON.parse(body);

    const bytes = crypto.AES.decrypt(password, SECRET_KEY_PASSWORD);
    const decryptedPassword = bytes.toString(crypto.enc.Utf8);

    const emailResult = email === MOCK_USER_EMAIL;
    const passwordResult = bcrypt.compareSync(
      decryptedPassword,
      MOCK_USER_PASSWORD
    );

    if (emailResult && passwordResult) {
      const token = jwt.sign(
        { email, decryptedPassword },
        SECRET_JWT_KEY_SIGN_IN,
        {
          expiresIn: EXPIRE_TIME_JWT_SIGN_IN,
        }
      );

      const data = { email };
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Authorization', token);
      res.end(stringify(data));
    } else {
      const data = {
        message: 'Your email or password is incorrect. Please try another one.',
      };

      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(stringify(data));
    }
  });
};

exports.validateRequest = function (req: IncomingMessage, res: ServerResponse) {
  const token = req.headers.authorization;

  jwt.verify(token, SECRET_JWT_KEY_SIGN_IN, async (err: any, payload: any) => {
    if (!err) {
      const { email } = payload;
      const data = { email };
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Authorization', `${token}`);
      res.end(stringify(data));
    } else {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end();
    }
  });
};
