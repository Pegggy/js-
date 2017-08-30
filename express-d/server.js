var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  let db = [
    {title:'标题1',content:'内容1'},
    {title:'标题2',content:'内容2'},
    {title:'标题3',content:'内容3'},
    {title:'标题4',content:'内容4'},
    {title:'标题5',content:'内容5'},
    {title:'标题6',content:'内容6'},
    {title:'标题7',content:'内容7'},
    {title:'标题8',content:'内容8'},
    {title:'标题9',content:'内容9'},
    {title:'标题10',content:'内容10'},
    {title:'标题11',content:'内容11'},
    {title:'标题12',content:'内容12'},
    {title:'标题13',content:'内容13'},
    {title:'标题14',content:'内容14'},
    {title:'标题15',content:'内容15'},
    {title:'标题16',content:'内容16'},
    {title:'标题17',content:'内容17'},
    {title:'标题18',content:'内容18'},
    {title:'标题19',content:'内容19'},
    {title:'标题20',content:'内容20'},
    {title:'标题21',content:'内容21'},
    {title:'标题22',content:'内容22'},
    {title:'标题23',content:'内容23'},
    {title:'标题24',content:'内容24'},
    {title:'标题25',content:'内容25'},
    {title:'标题26',content:'内容26'},
    {title:'标题27',content:'内容27'},
    {title:'标题28',content:'内容28'},
    {title:'标题29',content:'内容29'},
    {title:'标题30',content:'内容30'},
    {title:'标题31',content:'内容31'},
    {title:'标题32',content:'内容32'},
    {title:'标题33',content:'内容33'},
    {title:'标题34',content:'内容34'},
    {title:'标题35',content:'内容35'},
    {title:'标题36',content:'内容36'},
    {title:'标题37',content:'内容37'},
    {title:'标题38',content:'内容38'},
    {title:'标题39',content:'内容39'},
    {title:'标题40',content:'内容40'},
    {title:'标题41',content:'内容41'},
    {title:'标题42',content:'内容42'},
    {title:'标题43',content:'内容43'},
    {title:'标题44',content:'内容44'},
    {title:'标题45',content:'内容45'},
    {title:'标题46',content:'内容46'},
    {title:'标题47',content:'内容47'},
    {title:'标题48',content:'内容48'},
    {title:'标题49',content:'内容49'},
    {title:'标题50',content:'内容50'}
  ];
  let page = req.query.page;

  let data = { contents: db.slice(10*(page-1),page*10),
    currentPage : page,
    totalPages : Math.ceil(db.length/10)
  };
  res.render('home',data);
});

app.listen(3000);
console.log('started!');
