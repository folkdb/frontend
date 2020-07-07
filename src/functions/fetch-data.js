import { get } from 'httpie';
import parseToml from '@iarna/toml/parse-async.js';
import vextabRenderSvg from '@folkdb/vextab-render-svg';


const API_ENDPOINT = 'https://raw.githubusercontent.com/folkdb/seed/master/songs/sumer-is-icumen.toml';


export const handler = async (event, context) => {
  let data;

  try {
    const { data } = await get(API_ENDPOINT);
    const obj = await parseToml(data);
    const svgs = await Promise.all(
      (obj.arrangements || []).map(vextabRenderSvg),
    );
    
    data = { ...obj, arrangements: svgs };
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
