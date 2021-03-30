cube(`Airports`, {
  sql: `SELECT * FROM default.airports`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [airportid, name, city, country],
    },
  },

  dimensions: {
    airportid: {
      sql: `${CUBE}."AirportID"`,
      type: `string`,
    },

    name: {
      sql: `${CUBE}."Name"`,
      type: `string`,
    },

    city: {
      sql: `${CUBE}."City"`,
      type: `string`,
    },

    country: {
      sql: `${CUBE}."Country"`,
      type: `string`,
    },

    iata: {
      sql: `${CUBE}."IATA"`,
      type: `string`,
    },

    icao: {
      sql: `${CUBE}."ICAO"`,
      type: `string`,
    },

    latitude: {
      sql: `${CUBE}."Latitude"`,
      type: `string`,
    },

    longitude: {
      sql: `${CUBE}."Longitude"`,
      type: `string`,
    },

    timezone: {
      sql: `${CUBE}."Timezone"`,
      type: `string`,
    },

    dst: {
      sql: `${CUBE}."DST"`,
      type: `string`,
    },

    tz: {
      sql: `${CUBE}."Tz"`,
      type: `string`,
    },

    type: {
      sql: `${CUBE}."Type"`,
      type: `string`,
    },

    source: {
      sql: `${CUBE}."Source"`,
      type: `string`,
    },
  },

  dataSource: `default`,
});
