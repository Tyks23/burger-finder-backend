const { request, response } = require("express");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const axios = require("axios").default;


const imageLinkAssembler = (prefix, suffix) => {
 let imageLink = prefix + "400x400" + suffix;
return imageLink;
}


exports.testBurger = () => {
  console.log("Server works");
}

exports.getVenues = async(req, res) => {

let venueList = [];
let responseObject = {};
console.log("get venues");
axios.get(`https://api.foursquare.com/v3/places/search?categories=13031&near=${req.query.location}&limit=50`, {
  headers: {
    'Authorization': `${process.env.API_KEY}`   
  }
})
  .then(function (response) {
    // handle success
    responseObject = response.data;
    for (let i = 0; i < responseObject.results.length; i++) {
      let tempObj = {
        fsq_id: responseObject.results[i].fsq_id,
        name: responseObject.results[i].name
      }
      venueList.push(tempObj);           
    }
    if(response.data.results.length === 0 ){
      console.log("no locations");
      res.status(400).json({error});
    }
    console.log(response);
    res.status(200).json({venueList});
  })
  .catch(function (error) {
    // handle error
    if(!response.hasOwnProperty("results")){
      console.log("no such place")
      res.status(400).json({error});
    }
    else{
    res.status(500).json({error});
    }
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

exports.getVenueImages = async({body}, res) => {

  console.log("get images");
  //console.log("sending request to id: " + body.fsq_id)
  axios.get(`https://api.foursquare.com/v3/places/${body.fsq_id}/photos?limit=1&sort=POPULAR`, {
  headers: {
    'Authorization': `${process.env.API_KEY}`   
  }
})
  .then(function (response) {
    // handle success
    //console.log("success sending 200: ");
    //console.log(response);
    if(response.data.length == 0){
      res.status(200).json('https://i.imgur.com/yRHqxal.png');     
    }
    else{
      res.status(200).json(imageLinkAssembler(response.data[0].prefix, response.data[0].suffix));
    }
    
  })
  .catch(function (error) {
    // handle error
    res.status(500).json({error});
    console.log(error);
  })
  .then(function () {
    // always executed
  })
}




