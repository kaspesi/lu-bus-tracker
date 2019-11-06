var Request = require("request");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const pe_csvWriter = createCsvWriter({
    append: true,
    path: 'pe.csv',
    header: [
        {id: 'fleetnum', title: 'FleetNum'},
        {id: 'key', title: 'Key'},
        {id: 'time', title: 'Time'},
        {id: 'timestamp', title: 'TimeStamp'},
        {id: 'speed', title: 'Speed'},
        {id: 'direction', title: 'direction'},
        {id: 'lat', title: 'Lat'},
        {id: 'long', title: 'Long'},
        {id: 'lastStop', title: 'lastStop'},
        {id: 'currStop', title: 'currStop'},
    ]
});

const cc_csvWriter = createCsvWriter({
    append: true,
    path: 'cc.csv',
    header: [
        {id: 'fleetnum', title: 'FleetNum'},
        {id: 'key', title: 'Key'},
        {id: 'time', title: 'Time'},
        {id: 'timestamp', title: 'TimeStamp'},
        {id: 'speed', title: 'Speed'},
        {id: 'direction', title: 'direction'},
        {id: 'lat', title: 'Lat'},
        {id: 'long', title: 'Long'},
        {id: 'lastStop', title: 'lastStop'},
        {id: 'currStop', title: 'currStop'},
    ]
});

function getData(){
    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "https://bus.lehigh.edu/scripts/busdata.php?format=json",
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        let data = JSON.parse(body);
        for (var bus in data) {
            // if (Object.prototype.hasOwnProperty.call(data, bus)) {
            //     console.log(data[bus].key);
            // }
            let _fleetnum = data[bus].fleetnum;
            let _key = data[bus].key;
            let _time = data[bus].time;
            let _timestamp = data[bus].timestamp;
            let _speed = data[bus].speed;
            let _lastStop = data[bus].laststop;
            let _currStop = data[bus].currentstop;
            let _direction = data[bus].heading;
            let _lat = data[bus].lat;
            let _long = data[bus].long;
    
            var exportBus = [{
                fleetnum : _fleetnum,
                key : _key,
                time : _time,
                timestamp : _timestamp,
                speed : _speed,
                direction : _direction,
                lat : _lat,
                long : _long,
                lastStop : _lastStop,
                currStop : _currStop,
    
            }]
    
            if(_key === "CC"){
                cc_csvWriter.writeRecords(exportBus).then(() => {
                });
            } else if(_key === "PE"){
                pe_csvWriter.writeRecords(exportBus).then(() => {
                });
            }

            
    
        }
    });
    console.log("Finished")
}

function loop(){
    getData();
    setTimeout(loop, 5000);
}

loop();

