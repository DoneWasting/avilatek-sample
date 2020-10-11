const xlsxFile = require('read-excel-file/node');


function getExcelData(filePath, fileName) {
  
const schema = {
  'Name': {
      prop:'name',
      type:String,
      required: true
  },
  'Price': {
      prop:'price',
      type: Number,
      required: true
    },
  'new':{
      prop:'new',
      type:String,
      required: true
    },
    'description':{
      prop:'description',
      type:String,
      required: true
    },
}

let data = xlsxFile(`${filePath}/${fileName}`, {schema} ).then(({rows, errors}) => {
  errors.length === 0;
  return rows;
});

  return data
}


module.exports = getExcelData;