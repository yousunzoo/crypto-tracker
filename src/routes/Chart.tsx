import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const mappedOhlcvData = data?.map((price) => ({
    x: new Date(price.time_close * 1000).toUTCString(),
    y: [
      parseFloat(price.open),
      parseFloat(price.high),
      parseFloat(price.low),
      parseFloat(price.close),
    ],
  }));

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              {
                name: "price",
                data: data?.map((price) => parseFloat(price.close)) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                labels: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toUTCString()
                ),
              },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#55efc4"], stops: [0, 100] },
              },
              colors: ["#0984e3"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={
              [
                {
                  data: mappedOhlcvData,
                },
              ] as unknown as number[]
            }
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                type: "candlestick",
                height: 350,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toUTCString()
                ),
                labels: {
                  style: {
                    colors: "#9c88ff",
                  },
                },
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#3c90eb",
                    downward: "#df7d46",
                  },
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}
export default Chart;
