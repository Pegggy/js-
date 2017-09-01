var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  let db = [];
  for(var i = 0; i < 500; i++){
    db.push({
      title:`标题${i+1}`,
      content:`内容${i+1}`
    });
  }
  let page = req.query.page;
  let data = { contents: db.slice(10*(page-1),page*10),
    currentPage : page,
    totalPages : Math.ceil(db.length/10)
  };
  res.render('home',data);
});

app.listen(3000);
console.log('started!');
