var dps = [];   //dataPoints. 
var chart;
var startTime;

var watchID;
var accelerometerOptions = { frequency: 2000 };  // Update every 2 seconds
accelerometerOptions.frequency = 3000; //changed my mind - now 3 seconds


$(document).on("pagecreate", "#chartPage", function () {
	
	//store start time in unixtime 
	startTime = Date.now();
	
	//set uplistener for button
		$("#flipswitch").on("change", function() {
		
		if( $(this).val() == "on" ) startSensor();
		else if ( $(this).val() == "off" ) stopSensor();

	});
    
    	//setup chart
    chart = new CanvasJS.Chart("chartContainer",{
      	title :{
      		text: "A random chart"
      	},
      	axisX: {						
      		title: "value of X"
      	},
      	axisY: {						
      		title: "Time (seconds)"
      	},
     	axisYZ: {						
      		title: "value of Z"
      	},
      	data: [{
      		type: "line",
      		dataPoints : dps
      	}]
   	});
	
	  
});
    
    
    
    function startSensor() {
	watchID = navigator.accelerometer.watchAcceleration( accelerometerSuccess, accelerometerError, accelerometerOptions);
}


function stopSensor() {
	navigator.accelerometer.clearWatch(watchID);
			
	$('#sensorX').val("");
	$('#sensorY').val("");
	$('#sensorZ').val("");
	$('#timestamp').val("");
}

function accelerometerSuccess(acceleration) {
	
	$('#sensorX').val(acceleration.x);
	$('#sensorY').val(acceleration.y);
	$('#sensorZ').val(acceleration.z);
	$('#timestamp').val(acceleration.timestamp);
    updateChart(acceleration.x,acceleration.y,acceleration.z);
    
}

function accelerometerError() {
   alert('Error');
}
	


function updateChart(coX, coY, coZ) {
      	
      	//set new random y values
      	yVal = coY;
		
		//x value is time since start 
		xVal = Date.now() - startTime;
		//concert from milliseocnds to seconds (divide by a thousand)
		xVal = xVal / 1000;
    
        zVal = coZ;
      	
		//add them to the data points to draw
		dps.push({x: xVal,y: yVal z: zVal});
      	
		//don't let the chart get too big 
		//if there are more than 100 data points then start removing older data points
      	if (dps.length >  100 )
      	{
      		dps.shift();				
      	}

		//redraw the chart
      	chart.render();		
	  }
