"use client";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/css/jsvectormap.css";
import React, { useEffect, useRef, useState } from "react";
import "../../js/us-aea-en";
import axios from 'axios';


interface MapOneProps {
  title: string;
  total: number;
  icon: React.ReactNode;
}
const MapOne: React.FC = () => {
  const mapOneRef = useRef(null);
  const [regionsData, setRegionsData] = useState({
    'US-AL': 5000, // Alabama
    'US-AK': 3000, // Alaska
    'US-AZ': 7000, // Arizona
  });

  // useEffect(() => {
  //   // Fetch data from your API
  //   axios.get('/api/regions')
  //     .then(response => {
  //       setRegionsData(response.data);
  //     });
  // }, []);


  useEffect(() => {
    const mapElement = document.getElementById('mapOne');
    if (mapElement && regionsData) {
      mapOneRef.current = new jsVectorMap({
        selector: mapElement,
        map: "us_aea_en",
        zoomButtons: true,

        regionStyle: {
          initial: {
            fill: "#C8D0D8",
          },
          hover: {
            fillOpacity: 1,
            fill: "#3056D3",
          },
        },
        regionLabelStyle: {
          initial: {
            fontFamily: "Satoshi",
            fontWeight: "semibold",
            fill: "#fff",
          },
          hover: {
            cursor: "pointer",
          },
        },

        labels: {
          regions: {
            render(code: string) {
              return code.split("-")[1];
            },
          },
        },
        series: {
          regions: [
            {
              values: regionsData, // Use your regions data here
              scale: ['#C8EEFF', '#0071A4'], // Define your color scale here
              normalizeFunction: 'polynomial'
            }
          ]
        },
      });
    }

    return () => {
      if (mapOneRef.current) {
        (mapOneRef.current as typeof jsVectorMap).destroy();
      }
    };
  }, [regionsData]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Location
      </h4>
      <div className="h-90">
        <div id="mapOne" className="mapOne map-btn"></div>
      </div>
    </div>
  );
};

export default MapOne;