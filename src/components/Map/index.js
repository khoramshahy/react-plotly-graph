import React, { useEffect, useState } from "react";

import Plot from "react-plotly.js";
import { getMeasures } from "../../api/getMeasures";

function Map() {
  const [measures, setMeasures] = useState({lons: [], lats:[], names:[], units:[]});

  useEffect(() => {
    //api
    const fetchData = async () => {
      const fetchedData = await getMeasures();
      let data = {};
      let lons=[];
      let lats=[];
      let names=[];
      let units=[];

      fetchedData.forEach((el) => {
        if (!data[el.locationId]) {
          data[el.locationId] = {};
          data[el.locationId].name = el.location;
          data[el.locationId].lat = el.coordinates.latitude;
          data[el.locationId].lon = el.coordinates.longitude;
          data[el.locationId].units = [];
        }
        data[el.locationId].units.push({unit: el.unit, value: el.value, date: el.date.utc})
      });

      const keys = Object.keys(data);

      keys.forEach((key, index) => {

        lons.push(data[key].lon);
        lats.push(data[key].lat);
        names.push(data[key].name);
        units.push(data[key].units);
    });

      setMeasures({lons,lats,names,units});
    };

    fetchData();
  }, []);

  const ploty_data = [
    {
      type: "scattergeo",
      mode: "markers",
      text: [...measures.names],
      lon: [...measures.lons],
      lat: [...measures.lats],
      marker: {
        size: 7,
        color: "#bebada",
        line: {
          width: 1,
        },
      },
      name: "",
      textposition: "top center",
    },
  ];

  const ploty_layout = {
    title: "Germany cities",
    font: {
      family: "Droid Serif, serif",
      size: 6,
    },
    titlefont: {
      size: 16,
    },
    geo: {
      scope: "de",
      resolution: 30,
     lonaxis: {
        range: [0, 20],
      },
     lataxis: {
        range: [40, 60],
     },
      showrivers: true,
      rivercolor: "#fff",
      showlakes: true,
      lakecolor: "#fff",
      showland: true,
      landcolor: "#EAEAAE",
      countrycolor: "#d3d3d3",
      countrywidth: 1.5,
      subunitcolor: "#d3d3d3",
    },
    autosize: true,
  };
  return <Plot data={ploty_data} layout={ploty_layout} useResizeHandler={true}
  style={{width: "100%", height: "100%"}} />;
}

export default Map;
