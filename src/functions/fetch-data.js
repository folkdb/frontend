import { get } from 'httpie';
import parseToml from '@iarna/toml/parse-async.js';


export const handler = async (event) => {
  const { category, slug } = event.queryStringParameters;
  let obj;

  try {
    const { data } = await get(`https://raw.githubusercontent.com/folkdb/seed/master/${category}/${slug}.toml`);

    obj = await parseToml(data);
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ data: obj }),
  };
};
