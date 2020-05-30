import _ from 'lodash';

const friends = [
  { name: 'Tom' },
  { name: 'Hank' },
  { name: 'Jen' },
  { name: 'Al' },
  { name: 'Gore' },
];

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // Version 1
  // res.end(JSON.stringify({ name: 'John Doe' }))

  // Version 2
  // res.json({name: 'yoo'});
  // res.end();

  // Version 3
  // res.send({ name: 'Jane Doe' })

  // Version 4
  const randomNumber = _.random(0, _.size(friends));
  res.send(_.nth(friends, randomNumber));
};
