
$(document).ready(function(){
  var countM=0;
  var countB=0;
  $.ajax({

    url:'https://raw.githubusercontent.com/Lokendra99/breastCancer/master/data.json',
    type:'GET',
    timeout:100000,
    success:function(data){
      var parsedData=JSON.parse(data);
      for(var i in parsedData){
        if(parsedData[i].diagnosis=="M")countM++;
        else if(parsedData[i].diagnosis=="B")countB++;
      }
       gettingMaligOrBenig(countM,countB);
       retrievingFirstTenFetauresMalignOrBenigBasis(parsedData,countM,countB);
    }
  });

  function gettingMaligOrBenig(countM,countB){
    AmCharts.makeChart("chartdiv",
				{
					"type": "serial",
					"categoryField": "category",
					"angle": 30,
					"depth3D": 30,
					"startDuration": 1,
					"categoryAxis": {
						"gridPosition": "start"
					},
					"trendLines": [],
					"graphs": [
						{
							"balloonText": "[[title]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-1",
							"title": "Number of Malignant",
							"type": "column",
							"valueField": "column-1"
						},
						{
							"balloonText": "[[title]] of:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-2",
							"title": "Number of Benign",
							"type": "column",
							"valueField": "column-2"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"title": "Count"
						}
					],
					"allLabels": [],
					"balloon": {},
					"legend": {
						"enabled": true,
						"useGraphSettings": true
					},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Chart Title"
						}
					],
					"dataProvider": [
						{
							"category": "Diagnosis",
							"column-1": countM,
							"column-2": countB
						}
					]
				}
			);
  }
  function retrievingFirstTenFetauresMalignOrBenigBasis(parsedData,countM,countB){
    var rad_M=0;
    var rad_B=0;

    var associatedArrOfAttributes=[];

    for(var i in parsedData){
      var shortHand=parsedData[i];
      if(shortHand.diagnosis=="M"){
        for( var j in shortHand){
          var concatToM=j+'M';
          if(!(associatedArrOfAttributes[concatToM]) && j!="id" && j!="diagnosis"){
            //console.log('here');
            associatedArrOfAttributes[concatToM]=shortHand[j];
          }
          else if((associatedArrOfAttributes[concatToM]) && j!="id" && j!="diagnosis"){
            //console.log('yaha aya?');
            associatedArrOfAttributes[concatToM] +=shortHand[j];
          }
        }

        //rad_M +=parsedData[i].radius_mean;
      }
      else if(parsedData[i].diagnosis=="B"){
        for( var j in shortHand){
          var concatToB=j+'B';
          if(!(associatedArrOfAttributes[concatToB]) && j!="id" && j!="diagnosis"){
            //console.log('here');
            associatedArrOfAttributes[concatToB]=shortHand[j];
          }
          else if((associatedArrOfAttributes[concatToB]) && j!="id" && j!="diagnosis"){
            //console.log('yaha aya?');
            associatedArrOfAttributes[concatToB] +=shortHand[j];
          }
        }
      //  rad_B +=parsedData[i].radius_mean;
      }

    }

    console.log("associatedArrOfAttributes['radius_meanB'] "+associatedArrOfAttributes['radius_meanB']);
    console.log("associatedArrOfAttributes['radius_meanM'] "+associatedArrOfAttributes['radius_meanM']);
    // var rad_mean_M=Math.round(rad_M/countM);
    // var rad_mean_B=Math.round(rad_B/countB);

    // var radObj={};
    // radObj.M=rad_mean_M;
    // radObj.B=rad_mean_B;
    // radObj.category='radius_mean';

    //gettingFirstTenFeaturesImportance(radObj);

    standardisingAndSettingUpTheValuesOfFirstTenAttributes(associatedArrOfAttributes,countM,countB);
  }

  function standardisingAndSettingUpTheValuesOfFirstTenAttributes(associatedArrOfAttributes,countM,countB){
    var firstTenAttributesArr=["radius_mean",
    "texture_mean",
    "perimeter_mean",
    "area_mean",
    "area_se",
    "radius_worst",
    "texture_worst",
    "perimeter_worst"
    ]


    function checkingMorB(passedType,index){

      if(passedType=='M'){
        var finalIndex=firstTenAttributesArr[index]+passedType;
        return Math.round(associatedArrOfAttributes[finalIndex]/countM);
      }
      else if(passedType=='B'){
        var finalIndex=firstTenAttributesArr[index]+passedType;
        return Math.round(associatedArrOfAttributes[finalIndex]/countB);
      }
    }

    var dataArrayToBePassedToGraph=[];
    for( var i in firstTenAttributesArr){
      var tempObj={};
      tempObj.M= checkingMorB('M',i);
      tempObj.B= checkingMorB('B',i);
      tempObj.category=firstTenAttributesArr[i];
      dataArrayToBePassedToGraph.push(tempObj);
    }

    gettingFirstTenFeaturesImportance(dataArrayToBePassedToGraph);
  }


  function gettingFirstTenFeaturesImportance(dataArrayToBePassedToGraph){
    AmCharts.makeChart("chartdiv2",
				{
					"type": "serial",
					"categoryField": "category",
					"startDuration": 1,
					"categoryAxis": {
						"gridPosition": "start"
					},
					"trendLines": [],
					"graphs": [
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-1",
							"labelText": "[[value]]",
							"title": "graph 1",
							"type": "column",
							"valueField": "M"
						},
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-2",
							"labelText": "[[value]]",
							"title": "graph 2",
							"type": "column",
							"valueField": "B"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"stackType": "100%",
							"title": "Axis title"
						}
					],
					"allLabels": [
						{
							"id": "Label-1"
						}
					],
					"balloon": {},
					"legend": {
						"enabled": true,
						"useGraphSettings": true
					},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Chart Title"
						}
					],
					"dataProvider":dataArrayToBePassedToGraph
				}
			);
  }
});
