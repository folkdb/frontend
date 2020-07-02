import { get } from 'httpie';
import parseToml from '@iarna/toml/parse-async.js';


const API_ENDPOINT = 'https://raw.githubusercontent.com/folkdb/seed/master/songs/sumer-is-icumen.toml';


export const handler = async (event, context) => {
  let data;

  try {
    const res = await get(API_ENDPOINT);
    data = await parseToml(res);
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
