import { Chart } from "react-google-charts";
import { useCubeQuery } from "@cubejs-client/react";
import Card from "./Card";

function App() {
  const { isLoading: isDataSet1Lodaing, resultSet: dataSet1 } = useCubeQuery({
    measures: ["Airports.count"],
    dimensions: ["Airports.country"],
  });

  const { isLoading: isDataSet2Lodaing, resultSet: dataSet2 } = useCubeQuery({
    measures: ["Airports.count"],
    dimensions: ["Airports.timezone"],
  });

  console.log(dataSet2);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl text-indigo-800 text-center mb-8 font-bold">
        Airport Data
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {!isDataSet1Lodaing && dataSet1 && (
          <div className="col-span-2">
            <Card title="Number of airports per country">
              <Chart
                width="100%"
                height="500px"
                chartType="GeoChart"
                data={[
                  ["Country", "Airports"],
                  ...dataSet1.loadResponses[0].data.map((item) => [
                    item["Airports.country"],
                    parseInt(item["Airports.count"]),
                  ]),
                ]}
                mapsApiKey={process.env.REACT_APP_MAPS_API}
                options={{
                  colorAxis: { colors: ["#EEF2FF", "#312E81"] },
                }}
              />
            </Card>
          </div>
        )}
        {!isDataSet2Lodaing && dataSet2 && (
          <div className="col-span-2">
            <Card title="Number of airports per timezone">
              <Chart
                width="100%"
                height="500px"
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Timezone", "Airports"],
                  ...dataSet2.loadResponses[0].data.map((item) => [
                    item["Airports.timezone"],
                    parseInt(item["Airports.count"]),
                  ]),
                ]}
                options={{
                  colors: ["#818CF8"],
                  hAxis: {
                    title: "Timezones",
                  },
                  vAxis: {
                    title: "Airports",
                    minValue: 0,
                  },
                }}
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
