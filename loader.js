  var states = [
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arizona', 'AZ'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY']
];

var coor = [
[1.0000000,0.48411619,-0.3895727,-0.7949739,-0.49147639],
[0.4841162,1.00000000,-0.2270897,-0.4852021,-0.08091264],
[-0.3895727,-0.22708973,1.0000000,0.3161289,0.12814482],
[-0.7949739,-0.48520212,0.3161289,1.0000000,0.61792907],
[-0.4914764,-0.08091264,0.1281448,0.6179291,1.00000000]
]
var eduVlf = [['education','lifeExpectancy']]
var hhcVlf = [['homeHealthCare','lifeExpectancy']]
var povVlf = [['poverty','lifeExpectancy']]
var unempVlf = [['unemployment','lifeExpectancy']]
var data
var mapData
var allFields = [[]] 
var titleX
var titleY="LifeExpectancy"
var options
var chart
var mapChart
var lifeExpIndex = 0
var eduIndex = 1
var hhcIndex = 2
var povIndex = 3
var unempIndex = 4
var x

$(function() 
{
  //Main Graph
	$.getJSON("http://localhost:3030/semanticWebProject/?query=PREFIX%20edu:%3Chttp://sematicWebProject.com/education/%3E%20PREFIX%20hhc:%3Chttp://sematicWebProject.com/homeHealthCare/%3E%20PREFIX%20le:%3Chttp://sematicWebProject.com/lifeExpectancy/%3E%20PREFIX%20pov:%3Chttp://sematicWebProject.com/poverty/%3E%20PREFIX%20une:%3Chttp://sematicWebProject.com/unemployment/%3E%20SELECT%20?stateName%20?educationPer%20?hhcRating%20?lifeExpectancy%20?povertyPer%20?unempPer%20WHERE%20{%20?iri1%20edu:hasName%20?stateName%20.%20?iri1%20edu:hasEducationPer%20?educationPer%20.%20?iri2%20hhc:hasName%20?stateName%20.%20?iri2%20hhc:hasHomeHealthCareRating%20?hhcRating%20.%20?iri3%20le:hasName%20?stateName%20.%20?iri3%20le:hasLifeExpectancy%20?lifeExpectancy%20.%20?iri4%20pov:hasName%20?stateName%20.%20?iri4%20pov:hasPovertyPer%20?povertyPer%20.%20?iri5%20une:hasName%20?stateName%20.%20?iri5%20une:hasUnemploymentPer%20?unempPer%20.%20FILTER%20NOT%20EXISTS%20{?iri1%20?y%20%22District%20of%20Columbia%22%20}}&output=json", function(json) {

    $.each(json.results.bindings, function (index, value) 
    {
           // alert(value.stateName.value);
           eduVlf.push([parseFloat(value.educationPer.value),parseFloat(value.lifeExpectancy.value)])
           hhcVlf.push([parseFloat(value.hhcRating.value),parseFloat(value.lifeExpectancy.value)])
           povVlf.push([parseFloat(value.povertyPer.value),parseFloat(value.lifeExpectancy.value)])
           unempVlf.push([parseFloat(value.unempPer.value),parseFloat(value.lifeExpectancy.value)])
           allFields.push([value.stateName.value,parseFloat(value.lifeExpectancy.value),parseFloat(value.educationPer.value),parseFloat(value.hhcRating.value),
            parseFloat(value.povertyPer.value),parseFloat(value.unempPer.value)])

    });

    
  });
  
  

	//LifeExpectency
   $.getJSON("http://localhost:3030/semanticWebProject/?query=PREFIX%20edu:%3Chttp://sematicWebProject.com/education/%3E%20PREFIX%20hhc:%3Chttp://sematicWebProject.com/homeHealthCare/%3E%20PREFIX%20le:%3Chttp://sematicWebProject.com/lifeExpectancy/%3E%20PREFIX%20pov:%3Chttp://sematicWebProject.com/poverty/%3E%20PREFIX%20une:%3Chttp://sematicWebProject.com/unemployment/%3E%20SELECT%20?minState%20?min%20?maxState%20?max%20?avg%20WHERE%20{%20?x%20le:hasLifeExpectancy%20?min%20.%20?x%20le:hasName%20?minState%20.%20?y%20le:hasLifeExpectancy%20?max%20.%20?y%20le:hasName%20?maxState%20.%20{SELECT%20(MIN(?lifeExpectancy)%20AS%20?min)%20(AVG(?lifeExpectancy)%20AS%20?avg)%20%20(MAX(?lifeExpectancy)%20AS%20?max)%20WHERE{%20?iri1%20edu:hasName%20?stateName%20.%20?iri2%20hhc:hasName%20?stateName%20.%20?iri3%20le:hasName%20?stateName%20.%20?iri3%20le:hasLifeExpectancy%20?lifeExpectancy%20.%20?iri4%20pov:hasName%20?stateName%20.%20?iri5%20une:hasName%20?stateName%20.%20FILTER%20NOT%20EXISTS%20{?iri1%20?y%20%22District%20of%20Columbia%22%20%20}%20}%20}}&output=json", function(json) {

    $.each(json.results.bindings, function (index, value) 
    {
           // alert(value.stateName.value);
       $( "#chart_div"+lifeExpIndex+"1" ).append( '<table class="table table-sm"> <thead> <tr> <th scope="col">#</th> <th scope="col">State</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-success"> <th scope="row">Min</th> <td>'+value.minState.value+'</td> <td>'+parseFloat(value.min.value)+'</td>  </tr>'
        +'<tr class="btn-danger"> <th scope="row">Max</th> <td>'+value.maxState.value+'</td> <td>'+parseFloat(value.max.value)+'</td>  </tr>'
        +'</tbody> </table>' );

       $( "#chart_div"+lifeExpIndex+"1" ).append( '<table class="table table-sm"> <thead> <tr> <th scope="col">#</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-warning"> <th scope="row">Avg</th>  <td>'+parseFloat(value.avg.value)+'</td>  </tr>'
        +'</tbody> </table>' );
		   
    });
	});

//education
   $.getJSON("http://localhost:3030/semanticWebProject/?query=PREFIX%20edu:%3Chttp://sematicWebProject.com/education/%3E%20PREFIX%20hhc:%3Chttp://sematicWebProject.com/homeHealthCare/%3E%20PREFIX%20le:%3Chttp://sematicWebProject.com/lifeExpectancy/%3E%20PREFIX%20pov:%3Chttp://sematicWebProject.com/poverty/%3E%20PREFIX%20une:%3Chttp://sematicWebProject.com/unemployment/%3E%20SELECT%20?minState%20?min%20?maxState%20?max%20?avg%20WHERE%20{%20?x%20edu:hasEducationPer%20?min%20.%20?x%20edu:hasName%20?minState%20.%20?y%20edu:hasEducationPer%20?max%20.%20?y%20edu:hasName%20?maxState%20.%20{SELECT%20(MIN(?educationPer)%20AS%20?min)%20(AVG(?educationPer)%20AS%20?avg)%20%20(MAX(?educationPer)%20AS%20?max)%20WHERE{%20?iri1%20edu:hasName%20?stateName%20.%20?iri1%20edu:hasEducationPer%20?educationPer%20.%20?iri2%20hhc:hasName%20?stateName%20.%20?iri3%20le:hasName%20?stateName%20.%20?iri4%20pov:hasName%20?stateName%20.%20?iri5%20une:hasName%20?stateName%20.%20FILTER%20NOT%20EXISTS%20{?iri1%20?y%20%22District%20of%20Columbia%22%20%20}%20}%20}}&output=json", function(json) {

    $.each(json.results.bindings, function (index, value) 
    {
         $( "#chart_div"+eduIndex+"1" ).append( '<table class="table table-sm" style="font-size:14px"> <thead> <tr> <th scope="col">#</th> <th scope="col">State</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-success"> <th scope="row">Min</th> <td>'+value.minState.value+'</td> <td>'+parseFloat(value.min.value)+'</td>  </tr>'
        +'<tr class="btn-danger"> <th scope="row">Max</th> <td>'+value.maxState.value+'</td> <td>'+parseFloat(value.max.value)+'</td>  </tr>'
        +'</tbody> </table>' );

       $( "#chart_div"+eduIndex+"1" ).append( '<table class="table table-sm" style="font-size:14px"> <thead> <tr> <th scope="col">#</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-warning"> <th scope="row">Avg</th>  <td>'+parseFloat(value.avg.value)+'</td>  </tr>'
        +'<tr class="btn-warning"> <th scope="row">Cor</th>  <td>'+coor[eduIndex][lifeExpIndex]+'</td>  </tr>'
        +'</tbody> </table>' );
     
       
    });
});


  //HHC
   $.getJSON("http://localhost:3030/semanticWebProject/?query=PREFIX%20edu:%3Chttp://sematicWebProject.com/education/%3E%20PREFIX%20hhc:%3Chttp://sematicWebProject.com/homeHealthCare/%3E%20PREFIX%20le:%3Chttp://sematicWebProject.com/lifeExpectancy/%3E%20PREFIX%20pov:%3Chttp://sematicWebProject.com/poverty/%3E%20PREFIX%20une:%3Chttp://sematicWebProject.com/unemployment/%3E%20SELECT%20?minState%20?min%20?maxState%20?max%20?avg%20WHERE%20{%20?x%20hhc:hasHomeHealthCareRating%20?min%20.%20?x%20hhc:hasName%20?minState%20.%20?y%20hhc:hasHomeHealthCareRating%20?max%20.%20?y%20hhc:hasName%20?maxState%20.%20{SELECT%20(MIN(?hhcRating)%20AS%20?min)%20(AVG(?hhcRating)%20AS%20?avg)%20%20(MAX(?hhcRating)%20AS%20?max)%20WHERE{%20?iri1%20edu:hasName%20?stateName%20.%20?iri2%20hhc:hasName%20?stateName%20.%20?iri2%20hhc:hasHomeHealthCareRating%20?hhcRating%20.%20?iri3%20le:hasName%20?stateName%20.%20?iri4%20pov:hasName%20?stateName%20.%20?iri5%20une:hasName%20?stateName%20.%20FILTER%20NOT%20EXISTS%20{?iri1%20?y%20%22District%20of%20Columbia%22%20%20}%20}%20}}&output=json", function(json) {

    var maxStates=""
    var minState
    var avg
    var min
    var max
    $.each(json.results.bindings, function (index, value) 
    {
       maxStates+= value.maxState.value+"\n"
       minState= value.minState.value
       avg = parseFloat(value.avg.value)
       min = parseFloat(value.min.value)
       max = parseFloat(value.max.value)

    });

    $( "#chart_div"+hhcIndex+"1" ).append( '<table class="table table-sm" style="font-size:14px"> <thead> <tr> <th scope="col">#</th> <th scope="col">State</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-success"> <th scope="row">Min</th> <td>'+minState+'</td> <td>'+min+'</td>  </tr>'
        +'<tr class="btn-danger"> <th scope="row">Max</th> <td>'+maxStates+'</td> <td>'+max+'</td>  </tr>'
        +'</tbody> </table>' );

       $( "#chart_div"+hhcIndex+"1" ).append( '<table class="table table-sm" style="font-size:14px"> <thead> <tr> <th scope="col">#</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-warning"> <th scope="row">Avg</th>  <td>'+avg+'</td>  </tr>'
        +'<tr class="btn-warning"> <th scope="row">Cor</th>  <td>'+coor[hhcIndex][lifeExpIndex]+'</td>  </tr>'
        +'</tbody> </table>' );
       
});
   //Poverty
   $.getJSON("http://localhost:3030/semanticWebProject/?query=PREFIX%20edu:%3Chttp://sematicWebProject.com/education/%3E%20PREFIX%20hhc:%3Chttp://sematicWebProject.com/homeHealthCare/%3E%20PREFIX%20le:%3Chttp://sematicWebProject.com/lifeExpectancy/%3E%20PREFIX%20pov:%3Chttp://sematicWebProject.com/poverty/%3E%20PREFIX%20une:%3Chttp://sematicWebProject.com/unemployment/%3E%20SELECT%20?minState%20?min%20?maxState%20?max%20?avg%20WHERE%20{%20?x%20pov:hasPovertyPer%20?min%20.%20?x%20pov:hasName%20?minState%20.%20?y%20pov:hasPovertyPer%20?max%20.%20?y%20pov:hasName%20?maxState%20.%20{SELECT%20(MIN(?povertyPer)%20AS%20?min)%20(AVG(?povertyPer)%20AS%20?avg)%20%20(MAX(?povertyPer)%20AS%20?max)%20WHERE{%20?iri1%20edu:hasName%20?stateName%20.%20?iri2%20hhc:hasName%20?stateName%20.%20?iri3%20le:hasName%20?stateName%20.%20?iri4%20pov:hasName%20?stateName%20.%20?iri4%20pov:hasPovertyPer%20?povertyPer%20.%20?iri5%20une:hasName%20?stateName%20.%20FILTER%20NOT%20EXISTS%20{?iri1%20?y%20%22District%20of%20Columbia%22%20%20}%20}%20}}&output=json", function(json) {

    $.each(json.results.bindings, function (index, value) 
    {
       $( "#chart_div"+povIndex+"1" ).append( '<table class="table table-sm"> <thead> <tr> <th scope="col">#</th> <th scope="col">State</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-success"> <th scope="row">Min</th> <td>'+value.minState.value+'</td> <td>'+parseFloat(value.min.value)+'</td>  </tr>'
        +'<tr class="btn-danger"> <th scope="row">Max</th> <td>'+value.maxState.value+'</td> <td>'+parseFloat(value.max.value)+'</td>  </tr>'
        +'</tbody> </table>' );

       $( "#chart_div"+povIndex+"1" ).append( '<table class="table table-sm"> <thead> <tr> <th scope="col">#</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-warning"> <th scope="row">Avg</th>  <td>'+parseFloat(value.avg.value)+'</td>  </tr>'
        +'<tr class="btn-warning"> <th scope="row">Cor</th>  <td>'+coor[povIndex][lifeExpIndex]+'</td>  </tr>'
        +'</tbody> </table>' );
    
    });
});//Unemplyoment
   $.getJSON("http://localhost:3030/semanticWebProject/?query=PREFIX%20edu:%3Chttp://sematicWebProject.com/education/%3E%20PREFIX%20hhc:%3Chttp://sematicWebProject.com/homeHealthCare/%3E%20PREFIX%20le:%3Chttp://sematicWebProject.com/lifeExpectancy/%3E%20PREFIX%20pov:%3Chttp://sematicWebProject.com/poverty/%3E%20PREFIX%20une:%3Chttp://sematicWebProject.com/unemployment/%3E%20SELECT%20?minState%20?min%20?maxState%20?max%20?avg%20WHERE%20{%20?x%20une:hasUnemploymentPer%20?min%20.%20?x%20une:hasName%20?minState%20.%20?y%20une:hasUnemploymentPer%20?max%20.%20?y%20une:hasName%20?maxState%20.%20{SELECT%20(MIN(?unempPer)%20AS%20?min)%20(AVG(?unempPer)%20AS%20?avg)%20%20(MAX(?unempPer)%20AS%20?max)%20WHERE{%20?iri1%20edu:hasName%20?stateName%20.%20?iri2%20hhc:hasName%20?stateName%20.%20?iri3%20le:hasName%20?stateName%20.%20?iri4%20pov:hasName%20?stateName%20.%20?iri5%20une:hasName%20?stateName%20.%20?iri5%20une:hasUnemploymentPer%20?unempPer%20.%20FILTER%20NOT%20EXISTS%20{?iri1%20?y%20%22District%20of%20Columbia%22%20%20}%20}%20}}&output=json", function(json) {

    $.each(json.results.bindings, function (index, value) 
    {
       $( "#chart_div"+unempIndex+"1" ).append( '<table class="table table-sm"> <thead> <tr> <th scope="col">#</th> <th scope="col">State</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-success"> <th scope="row">Min</th> <td>'+value.minState.value+'</td> <td>'+parseFloat(value.min.value)+'</td>  </tr>'
        +'<tr class="btn-danger"> <th scope="row">Max</th> <td>'+value.maxState.value+'</td> <td>'+parseFloat(value.max.value)+'</td>  </tr>'
        +'</tbody> </table>' );

       $( "#chart_div"+unempIndex+"1" ).append( '<table class="table table-sm"> <thead> <tr> <th scope="col">#</th> <th scope="col">Value</th></tr> </thead> '
        +'<tbody> '
        +'<tr class="btn-warning"> <th scope="row">Avg</th>  <td>'+parseFloat(value.avg.value)+'</td>  </tr>'
        +'<tr class="btn-warning"> <th scope="row">Cor</th>  <td>'+coor[unempIndex][lifeExpIndex]+'</td>  </tr>'
        +'</tbody> </table>' );
		   
    });
});

	


});

   google.charts.load('current', {'packages':['corechart','geochart']});
      google.charts.setOnLoadCallback(drawCharts);

      function drawCharts(){
        drawGEOChart("chart_div",lifeExpIndex)
        drawGEOChart("chart_div",eduIndex)
        drawGEOChart("chart_div",hhcIndex)
        drawGEOChart("chart_div",povIndex)
        drawGEOChart("chart_div",unempIndex)
        drawChart("eduVlf","chart_div"+eduIndex+"2")
        drawChart("hhcVlf","chart_div"+hhcIndex+"2")
        drawChart("povVlf","chart_div"+povIndex+"2")
        drawChart("unempVlf","chart_div"+unempIndex+"2")
      }

      function drawChart(chartName,divID) {

        switch(chartName) 
        {
          case "eduVlf":
            // code block
            data = google.visualization.arrayToDataTable(eduVlf);
            titleX="Education"
            break;
          case "hhcVlf":
            // code block
            data = google.visualization.arrayToDataTable(hhcVlf);
            titleX="Home Health Care"
            break;
          case "povVlf":
            // code block
            data = google.visualization.arrayToDataTable(povVlf);
            titleX="Poverty"
            break;
          case "unempVlf":
            // code block
            data = google.visualization.arrayToDataTable(unempVlf);
            titleX="Unemployment"
            break;
          default:
            // code block
        }
         options = {
          title: titleX+' vs. '+titleY,
          hAxis: {title: titleX},
          vAxis: {title: titleY},
          legend: 'none'
        };
       
        chart = new google.visualization.ScatterChart(document.getElementById(divID));
        chart.draw(data, options);
      }

      function drawGEOChart(chartDiv,index){
        mapData = new google.visualization.DataTable();
        mapData.addColumn('string','Region')
        switch(index) 
        {
          case 1:
            mapData.addColumn('number','Education')
            leftColor = "#004D40"
            centerColor = "#FFFF00"
            rightColor = "#E65100"
            break
          case 2:
            mapData.addColumn('number','Home Health Care')
            leftColor = "#FFA726"
            centerColor = "#D50000"
            rightColor = "#FF80AB"
            break
          case 0:
            mapData.addColumn('number','Life Expectancy')
            leftColor = "#01579B"
            centerColor = "#02ffcc"
            rightColor = "#02ff4e"
            break
          case 3:
            mapData.addColumn('number','Poverty')
            leftColor = "#90CAF9"
            centerColor = "#3204ff"
            rightColor = "#311B92"
            break
          case 4:
            mapData.addColumn('number','Unemployment')
            leftColor = "#ae00ff"
            centerColor = "#ff00d0"
            rightColor = "#ff0051"
            break  
        }
        

        
         for(i=0;i<allFields.length;i++)
        {
          for(j = 0; j < states.length; j++){
              if(states[j][0] == allFields[i][0]){
                  mapData.addRow([states[j][1],allFields[i][index+1]])
                  break;
              }
        } 
      }
        
        options = {
          region: 'US',
          resolution: "provinces",
          projection: {
            name: 'albers',
            parallels: [29.5,45.5]
          },

          datalessRegionColor: '#f8bbd0',
          defaultColor: '#f5f5f5'
        };

        options.colorAxis = {colors: [leftColor,centerColor,rightColor]}
        if(index==0)
        {
        mapChart = new google.visualization.GeoChart(document.getElementById(chartDiv+index)); 
        }
        else{
        chart = new google.visualization.GeoChart(document.getElementById(chartDiv+index));

        }
        function myClickHandler(){
        var selection = mapChart.getSelection();
        console.log(allFields[selection[0].row+1])
        console.log(allFields)

        if(selection[0].row>=0)
         {
          drawDetails(allFields[selection[0].row+1])
         } 
      //console.log(states[selection[0].row])
      //  console.log(selection[0].row)
              
    }

        if(index==0)
        {
          google.visualization.events.addListener(mapChart, 'select', myClickHandler);
        mapChart.draw(mapData, options);
  
        }
        else{
        chart.draw(mapData, options);

        }
        
      }        

       function drawDetails(allValues) {
        console.log(allValues)
      var data = google.visualization.arrayToDataTable([
        ["Element", "Density", { role: "style" } ],
        ["Life Expectancy (Years)", allValues[1], "#02ff4e"],
        ["Education (%)", allValues[2], "#E65100"],
        ["Home Health Care Rating (%)", (allValues[3]*100/5), "#FF80AB"],
        ["Poverty (%)", allValues[4], "#311B92"],
        ["Unemployment (%)", allValues[5], "color: #ff0051"]
      ]);
      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: allValues[0],
        bar: {groupWidth: "75%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.BarChart(document.getElementById("chart_div"+lifeExpIndex+"2"));
      chart.draw(view, options);
  }

      


    