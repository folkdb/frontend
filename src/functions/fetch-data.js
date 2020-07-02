import { get } from 'httpie';
import parseString from '@iarna/toml/parse-string.js';


const API_ENDPOINT = 'https://raw.githubusercontent.com/folkdb/seed/master/songs/sumer-is-icumen.toml';


export const handler = async (event, context) => {
  let data;

  try {
    const res = await get(API_ENDPOINT);
    data = parseString(res);
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};
