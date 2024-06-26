// Node.js Express server
const express = require('express');
const request = require('request');
const cors = require('cors');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.get('/proxy', async(req, res) => {
    const query = req.query.search;
    const q=req.query.q;
    const sort=req.query.sort;
    console.log('Query:', req.query);
    // https://indiankanoon.org/feeds/search/Sec 60 sortby:mostrecent  doctypes:judgments/
    const url = `https://indiankanoon.org/feeds/search/${query} sortby:${sort} doctypes:${q==='true '?"judgments":""} /`;
    const responce = await fetch(url);
    const data = await responce.text();
    res.send(data);
  });

  app.get('/',(req,res)=>{
    res.send('Welcome to Indian Kanoon API');
  })
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});