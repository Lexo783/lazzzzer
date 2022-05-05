const fs = require('fs');

module.exports.writeData = function (data) {
  const json = JSON.stringify(data);

  fs.writeFile('./config.json', json, function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
    }
    console.log('Configuration saved successfully.')
  });
}

module.exports.readData = function (pointer = null) {
  var data = fs.readFileSync('./config.json'), myObj;

  try {
    myObj = JSON.parse(data.);
    console.dir(myObj);
    if (pointer === null) {
      return myObj
    } else {
      return myObj[pointer]
    }
  }
  catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
  }
}
