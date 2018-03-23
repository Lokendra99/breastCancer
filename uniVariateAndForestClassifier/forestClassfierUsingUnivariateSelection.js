var Request = require("request");
var fs = require('fs'),
    RandomForestClassifier = require('random-forest-classifier').RandomForestClassifier;


Request.get("https://raw.githubusercontent.com/Lokendra99/breastCancer/master/univariate_trainingData.json", function(error, response, training_set_data){
    if(error) {
        return console.dir(error);
    }
     training_set_data=JSON.parse(training_set_data)
    console.dir(training_set_data);
    callingTestData(training_set_data);
    console.log("coming here");
});

function callingTestData(training_set_data){
  Request.get("https://raw.githubusercontent.com/Lokendra99/breastCancer/master/univariate_testData.json", function(error, response, test_set_data){
      if(error) {
          return console.dir(error);
      }
      test_set_data=JSON.parse(test_set_data);
      console.dir(test_set_data);
      console.log("coming here test");
      RandomClassfier(training_set_data,test_set_data);
  });


}

function RandomClassfier(training_set_data,test_set_data){
  console.log("coming here forest");
  var rf = new RandomForestClassifier({
      n_estimators: 10
  });

  rf.fit(training_set_data, null, "diagnosis", function(err, trees){
    //console.log(JSON.stringify(trees, null, 4));
    var pred = rf.predict(test_set_data, trees);
      console.log("ISKE AGGE");
    console.log("pred "+pred);

    // pred = ["virginica", "setosa"]
  });

}
