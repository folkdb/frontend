const { get } = require('httpie');

const API_ENDPOINT = 'https://raw.githubusercontent.com/folkdb/seed/master/songs/sumer-is-icumen.toml';

exports.handler = async (event, context) => {
  let res;

  try {
    res = await get(API_ENDPOINT);
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: res.data,
    }),
  }
}
