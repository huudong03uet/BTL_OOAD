import { get_filter_analyst } from "@/service/component";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

interface totalProductYear {
  totalJan: {
   productNew: number;
   productSell: number;
  }
  totalFeb: {
   productNew: number;
   productSell: number;
  }
  totalMar: {
   productNew: number;
   productSell: number;
  }
  totalApr: {
   productNew: number;
   productSell: number;
  }
  totalMay: {
   productNew: number;
   productSell: number;
  }
  totalJun: {
   productNew: number;
   productSell: number;
  }
  totalJul: {
   productNew: number;
   productSell: number;
  }
  totalAug: {
   productNew: number;
   productSell: number;
  }
  totalSep: {
   productNew: number;
   productSell: number;
  }
  totalOct: {
   productNew: number;
   productSell: number;
  }
  totalNov: {
   productNew: number;
   productSell: number;
  }
  totalDec: {
   productNew: number;
   productSell: number;
  }
}

interface totalProductMonth {
  totalWeek1: {
   productNew: number;
   productSell: number;
  }
  totalWeek2: {
   productNew: number;
   productSell: number;
  }
  totalWeek3: {
   productNew: number;
   productSell: number;
  }
  totalWeek4: {
   productNew: number;
   productSell: number;
  }
}


interface totalProductWeek {
  totalMonday: {
   productNew: number;
   productSell: number;
  }
  totalTuesday: {
   productNew: number;
   productSell: number;
  }
  totalWednesday: {
   productNew: number;
   productSell: number;
  }
  totalThursday: {
   productNew: number;
   productSell: number;
  }
  totalFriday: {
   productNew: number;
   productSell: number;
  }
  totalSaturday: {
   productNew: number;
   productSell: number;
  }
  totalSunday: {
   productNew: number;
   productSell: number;
  }
}


const ChartOne: React.FC = () => {

  const time = new Date();
  const today = time.getDate();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const week = time.getDay();

  const [totalProductYear, setTotalProductYear] = useState<totalProductYear>({} as totalProductYear)
  const [totalProductMonth, setTotalProductMonth] = useState<totalProductMonth>({} as totalProductMonth)
  const [totalProductWeek, setTotalProductWeek] = useState<totalProductWeek>({} as totalProductWeek)


  // const totalProductYear = {
  //   totalJan: {
  //    productNew: 45,
  //    productSell: 30,
  //   },
  //   totalFeb: {
  //    productNew: 30,
  //    productSell: 25,
  //   },
  //   totalMar: {
  //    productNew: 35,
  //    productSell: 36,
  //   },
  //   totalApr: {
  //    productNew: 40,
  //    productSell: 30,
  //   },
  //   totalMay: {
  //    productNew: 50,
  //    productSell: 45,
  //   },
  //   totalJun: {
  //    productNew: 45,
  //    productSell: 35,
  //   },
  //   totalJul: {
  //    productNew: 55,
  //    productSell: 64,
  //   },
  //   totalAug: {
  //    productNew: 65,
  //    productSell: 52,
  //   },
  //   totalSep: {
  //    productNew: 45,
  //    productSell: 59,
  //   },
  //   totalOct: {
  //    productNew: 30,
  //    productSell: 36,
  //   },
  //   totalNov: {
  //    productNew: 35,
  //    productSell: 39,
  //   },
  //   totalDec: {
  //    productNew: 40,
  //    productSell: 51,
  //   }

  // };
  // const totalProductMonth = {
  //   totalWeek1: {
  //    productNew: 23,
  //    productSell: 30,
  //   },
  //   totalWeek2: {
  //    productNew: 11,
  //    productSell: 25,
  //   },
  //   totalWeek3: {
  //    productNew: 22,
  //    productSell: 36,
  //   },
  //   totalWeek4: {
  //    productNew: 27,
  //    productSell: 30,
  //   }
  // };
  // const totalProductWeek = {
  //   totalMonday: {
  //    productNew: 23,
  //    productSell: 30,
  //   },
  //   totalTuesday: {
  //    productNew: 11,
  //    productSell: 25,
  //   },
  //   totalWednesday: {
  //    productNew: 22,
  //    productSell: 36,
  //   },
  //   totalThursday: {
  //    productNew: 27,
  //    productSell: 30,
  //   },
  //   totalFriday: {
  //    productNew: 13,
  //    productSell: 45,
  //   },
  //   totalSaturday: {
  //    productNew: 22,
  //    productSell: 35,
  //   },
  //   totalSunday: {
  //    productNew: 37,
  //    productSell: 64,
  //   }
  // };

  useEffect(() => {
    const feet = async () => {
      const data = await get_filter_analyst();
      setTotalProductMonth(data.totalProductMonth)
      setTotalProductWeek(data.totalProductWeek)
      setTotalProductYear(data.totalProductYear)
    }

    feet()
  }, [])

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Product New",
        data: [totalProductYear.totalJan?.productNew, totalProductYear.totalFeb?.productNew, totalProductYear.totalMar?.productNew, totalProductYear.totalApr?.productNew, totalProductYear.totalMay?.productNew, totalProductYear.totalJun?.productNew, totalProductYear.totalJul?.productNew, totalProductYear.totalAug?.productNew, totalProductYear.totalSep?.productNew, totalProductYear.totalOct?.productNew, totalProductYear.totalNov?.productNew, totalProductYear.totalDec?.productNew],
      },

      {
        name: "Product Sell",
        data: [totalProductYear.totalJan?.productSell, totalProductYear.totalFeb?.productSell, totalProductYear.totalMar?.productSell, totalProductYear.totalApr?.productSell, totalProductYear.totalMay?.productSell, totalProductYear.totalJun?.productSell, totalProductYear.totalJul?.productSell, totalProductYear.totalAug?.productSell, totalProductYear.totalSep?.productSell, totalProductYear.totalOct?.productSell, totalProductYear.totalNov?.productSell, totalProductYear.totalDec?.productSell],
      },
    ],
  });

  const [options, setOptions] = useState<ApexOptions>({
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 100,
    },
  });

  const handleTotalProductYear = () => {
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Product New",
          data: [totalProductYear.totalJan?.productNew, totalProductYear.totalFeb?.productNew, totalProductYear.totalMar?.productNew, totalProductYear.totalApr?.productNew, totalProductYear.totalMay?.productNew, totalProductYear.totalJun?.productNew, totalProductYear.totalJul?.productNew, totalProductYear.totalAug?.productNew, totalProductYear.totalSep?.productNew, totalProductYear.totalOct?.productNew, totalProductYear.totalNov?.productNew, totalProductYear.totalDec?.productNew],
        },

        {
          name: "Product Sell",
          data: [totalProductYear.totalJan?.productSell, totalProductYear.totalFeb?.productSell, totalProductYear.totalMar?.productSell, totalProductYear.totalApr?.productSell, totalProductYear.totalMay?.productSell, totalProductYear.totalJun?.productSell, totalProductYear.totalJul?.productSell, totalProductYear.totalAug?.productSell, totalProductYear.totalSep?.productSell, totalProductYear.totalOct?.productSell, totalProductYear.totalNov?.productSell, totalProductYear.totalDec?.productSell],
        },
      ],
    }));

    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",

        ],
      },
    }));
  };

  const handleTotalProductMonth = () => {

    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Product New",
          data: [totalProductMonth.totalWeek1?.productNew, totalProductMonth.totalWeek2?.productNew, totalProductMonth.totalWeek3?.productNew, totalProductMonth.totalWeek4?.productNew,],
        },

        {
          name: "Product Sell",
          data: [totalProductMonth.totalWeek1?.productSell, totalProductMonth.totalWeek2?.productSell, totalProductMonth.totalWeek3?.productSell, totalProductMonth.totalWeek4?.productSell,],
        },
      ],
    }));

    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        categories: [
          "Week 1",
          "Week 2",
          "Week 3",
          "week 4",
        ],
      },
    }));
  }

  const handleTotalProductWeek = () => {
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Product New",
          data: [totalProductWeek.totalMonday?.productNew, totalProductWeek.totalTuesday?.productNew, totalProductWeek.totalWednesday?.productNew, totalProductWeek.totalThursday?.productNew, totalProductWeek.totalFriday?.productNew, totalProductWeek.totalSaturday?.productNew, totalProductWeek.totalSunday?.productNew],
        },

        {
          name: "Product Sell",
          data: [totalProductWeek.totalMonday?.productSell, totalProductWeek.totalTuesday?.productSell, totalProductWeek.totalWednesday?.productSell, totalProductWeek.totalThursday?.productSell, totalProductWeek.totalFriday?.productSell, totalProductWeek.totalSaturday?.productSell, totalProductWeek.totalSunday?.productSell],
        },
      ],
    }));

    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",

        ],
      },
    }));
  };
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Product New</p>

            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Product Sell</p>

            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={handleTotalProductYear}
              className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Year
            </button>
            <button
              onClick={handleTotalProductMonth}
              className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
            <button
              onClick={handleTotalProductWeek}
              className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
