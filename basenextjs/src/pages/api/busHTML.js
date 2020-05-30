import _ from 'lodash';
import fetch from 'node-fetch';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const url = 'https://bustime.mta.info/m/index?q=300595';

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  // If you are doing promise like this, you want to make sure you put return
  // Otherwise you get this isse - API resolved without sending a response for /api/bus, this may result in stalled requests.
  /*
  return JSDOM.fromURL(url).then(dom => {
    // console.log(dom.serialize());
    res.send({time: dom.window.document.querySelector('.directionAtStop').textContent});
  });
  */

  const busResponse = await fetch(url);
  const busResponseText = await busResponse.text();
  // querySelectorAll
  const dom2 = new JSDOM(busResponseText);
  // textContent, outerHtml
  const dom2Data = dom2.window.document.querySelector('div.directionAtStop').outerHTML;

  /*
window.document.body.querySelector('#refresh strong').textContent

  window.document.body.querySelectorAll('.directionAtStop').forEach(section => {
    section.querySelector('p').textContent -> 'B1' or null
    section.querySelectorAll('li') -> []
    {
      bus: ''
      arrivals: [],
			lastUpdate: '12:30pm'
    }

  })
    */

  res.send(dom2Data);
};
