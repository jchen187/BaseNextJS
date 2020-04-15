import _ from 'lodash';
import fetch from 'node-fetch';

const url = 'https://bustime.mta.info/m/index;jsessionid=DE3149AEB670B8B092808006B8EB9536?q=300595';

let timeForBus = 0;

// let parser = new DOMParser()
// let doc = parser.parseFromString(res, "text/html")

export default async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  const busResponse = await fetch(url)
  const busResponseText = await busResponse.text();
  console.log(busResponseText);

  res.send({time: _.size(busResponseText) + _.random(0, 15)});
    /*
  timeForBus++;
  res.send({time: timeForBus});
  */
}
