# Google Charts Tutorial: Building an Analytical Dashboard (feat. React and TailwindCSS)

Google Charts exists from 2012. And despite the fact that almost every month (reference to the joke about how fast libraries get invented in the JavaScript world) a new charting library apprears, Google Charts's still in-demand and is the top choice for a large number of organizations.

Some of the pros of this library are

1. Backed by google, which means that you can rely that you are using a super tool with tons of support and development behind it.
2. It's free.
3. It's easily to start with, and it has one of the best API documentations.
4. It supports all types of graphs and the customization is very easy to do.
5. It easily integrates with other Google products such as Analytics and Map.

On the other side some of the main concerns that people have are that

1. It needs high speed internet connection to function properly.
2. It doesn't offer deep level of customization. Meaning, if you'd like to customize it to do something that Google Charts wasn't initially meant for, then you'll need quite a bit of workarounds and hacks.
3. Default charts are not as pretty, so you'd need to do some styling to make them look good.

Some people also say that one of the cons is that Google Charts require knowledge of JavaScript, but, hey, we're front-end devs (I assume y'all who reading this are...?) so it's not really an issue for us, right? 😎

In one of my [previous posts](https://cube.dev/blog/dataviz-ecosystem-2021/) where I was aggregating all the charts into one list, I decided not to mention Google Charts, because today we have many much more "attractive" choices to go with when working with charts that have front-end framework specific wrappers (i.e. for React, Angular and Vue). However, Google Charts does deserve an honorable mention, because, like I said, it's a great tool, it's still chosen by many, and it works great without any frameworks.

Today, though, we'll be building our analytical dashboard with React, and for that we'll use

- on the front: [CRA](https://reactjs.org/docs/create-a-new-react-app.html) with [`react-google-charts`](https://github.com/RakanNimer/react-google-charts) package, which is a React wrapper for Google Charts API.
- in the "middle": [Cube.js](https://cube.dev/docs/getting-started) to handle communications between our database and the frontend.
- on the back: we'll be using one of the existing databases, hosted by [ClickHouse](https://clickhouse.tech/). You can read more about ClickHouse, what it is and how it works in [one of the other Cube.js posts](https://dev.to/cubejs/building-clickhouse-dashboard-and-crunching-wallstreetbets-data-14ao).

In our root project folder we'll have two folders: `front` and `cube`. Those are two separate projects, and we'll need to `npm start` them in parallel.

## Setting up our Cube.js with a remote database

To setup our Cube.js with clickhouse, we just need to run

```
npx cubejs-cli create cube -d clickhouse
cd cube
npm run dev
```

and create a `.env` file with credentials that links to your clickhouse database inside the folder.

Then go to `localhost:4000` and go to `Schema` tab to generate the schema based on the data that we have.

We'll have some files generated in the `schema` folder, and that is always a good way to start working on your schema files, because you now have sort of a template or a format, if you will, of what the schema should look like.

In this case, we have airport and trip data available to us. We're not going to change much in the schema right now, we'll just use some basic `count` data that was generated for us.

Now let's set up our front-end with our Google Charts

## Setting up our front end

In the same level as our `cube` folder let's create a front-end project with [`create-react-app`](https://github.com/facebook/create-react-app).

```
npx create-react-app front
cd front
```

Let's install our [Cube.js client for react](https://cube.dev/docs/@cubejs-client-react#use-cube-query) that we'll use to query data from Cube.js and [`react-google-charts`](https://react-google-charts.com/) which, as I mentioned earlier, is a React wrapper for [Google Charts](https://developers.google.com/chart).

```
npm i @cubejs-client/core @cubejs-client/react react-google-charts -S
```

To start using our Cube.js hook, we'll need to create a provider and a cubejs instance in our `index.js` entry file.

```js
import { CubeProvider } from "@cubejs-client/react";

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: `${process.env.REACT_APP_API_URL}/cubejs-api/v1`,
});

//...
<CubeProvider cubejsApi={cubejsApi}>
  <App />
</CubeProvider>;
//...
```

Where `REACT_APP_CUBEJS_TOKEN` is `CUBEJS_API_SECRET` from our `cube` folder, and `REACT_APP_API_URL` is currently our `https://localhost:4000`.

Now we can query data from our cube with `useCubeQuery` hook, and we're going to hook airports count for each of the country

```js
const { isLoading, error, resultSet } = useCubeQuery({
  measures: ["Airports.count"],
  dimensions: ["Airports.country"],
});
```

if we `console.log(resultSet)` we'll see that our data that we need is in `resultSet.loadResponses[0].data`

This is the data that we're going to put in our `GeoChart`. `GeoChart` is a bit special, because for this one, we'll also need a `mapsApiKey` that we can get from [Google Console](https://developers.google.com/maps/documentation/javascript/get-api-key).

Once we get it, let's save it as a `.env` variable, and create a `Chart` in `App.js`. We just need to convert received data into Google Charts data format, and we'll do this through a `.map` function.

```js
<Chart
  width="100%"
  height="100vh"
  chartType="GeoChart"
  data={[
    ["Country", "Airports"],
    ...resultSet.loadResponses[0].data.map((item) => [
      item["Airports.country"],
      parseInt(item["Airports.count"]),
    ]),
  ]}
  mapsApiKey={process.env.REACT_APP_MAPS_API}
  options={{
    colorAxis: { colors: ["#EEF2FF", "#312E81"] },
  }}
/>
```

The second chart that we'll use will be a `Bar` chart. For this one we'll output how many airports there are per timezone. For that we'll create another query

```js
const { isLoading: isDataSet2Lodaing, resultSet } = useCubeQuery({
  measures: ["Airports.count"],
  dimensions: ["Airports.timezone"],
});
```

Similar to the previous query, we need to format the received data into the accepted charts data format, and feed it to the `Chart` component.

```js
<Chart
  width="100%"
  height="500px"
  chartType="Bar"
  loader={<div>Loading Chart</div>}
  data={[
    ["Timezone", "Airport"],
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
```

You may have also noticed that I passed `options` props to both of our charts. That's because our default charts noramlly do not look as pretty, so I added custom colors that I personally liked. Hint: I stole those colors from [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)

I really like [TailWindCSS](https://tailwindcss.com/) for prototypoing. It has a lot of classes available to us to make our apps look good with practically zero efforts. So let's use TailWindCSS to stylize our dashboard as well Since we'll be using default colours and classes, we don't need to integrate TailWind with Webpack and PostCSS, let's just put it as stylesheet into our html.

```html
<link
  href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
  rel="stylesheet"
/>
```

Now we can use TailWind css classes to give our dashboard app a better look, e.g. by creating a `Card` component that we can use to put our graphs in.

```js
import React from "react";

const Card = ({ title, children }) => (
  <div className="rounded shadow p-4">
    <h3 className="text-lg text-indigo-500 font-semibold text-center mb-4">
      {title}
    </h3>
    {children}
  </div>
);

export default Card;
```

## Wrap up

As you can see, it's pretty straightforward to setup an analytics dashboard with Cube.js and Google Charts.

Not a fan of Google Charts? Maybe you want to try [Highcharts](https://cube.dev/blog/react-highcharts-example/) then? 🤷‍♂️

[GitHub 🔗](https://github.com/snikidev/cubejs-google-charts)
