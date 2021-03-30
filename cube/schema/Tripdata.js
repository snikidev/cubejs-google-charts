cube(`Tripdata`, {
  sql: `SELECT * FROM default.tripdata`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [
        id,
        guid,
        vendorId,
        rateCodeId,
        pickupDate,
        pickupDatetime,
        dropoffDatetime,
      ],
    },

    passengerCount: {
      sql: `passenger_count`,
      type: `sum`,
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
    },

    guid: {
      sql: `guid`,
      type: `string`,
    },

    vendorId: {
      sql: `vendor_id`,
      type: `string`,
    },

    tripDistance: {
      sql: `trip_distance`,
      type: `string`,
    },

    pickupLongitude: {
      sql: `pickup_longitude`,
      type: `string`,
    },

    pickupLatitude: {
      sql: `pickup_latitude`,
      type: `string`,
    },

    rateCodeId: {
      sql: `rate_code_id`,
      type: `string`,
    },

    storeAndFwdFlag: {
      sql: `store_and_fwd_flag`,
      type: `string`,
    },

    dropoffLongitude: {
      sql: `dropoff_longitude`,
      type: `string`,
    },

    dropoffLatitude: {
      sql: `dropoff_latitude`,
      type: `string`,
    },

    paymentType: {
      sql: `payment_type`,
      type: `string`,
    },

    fareAmount: {
      sql: `fare_amount`,
      type: `string`,
    },

    extra: {
      sql: `extra`,
      type: `string`,
    },

    mtaTax: {
      sql: `mta_tax`,
      type: `string`,
    },

    tipAmount: {
      sql: `tip_amount`,
      type: `string`,
    },

    tollsAmount: {
      sql: `tolls_amount`,
      type: `string`,
    },

    improvementSurcharge: {
      sql: `improvement_surcharge`,
      type: `string`,
    },

    totalAmount: {
      sql: `total_amount`,
      type: `string`,
    },

    junk1: {
      sql: `junk1`,
      type: `string`,
    },

    junk2: {
      sql: `junk2`,
      type: `string`,
    },

    pickupDate: {
      sql: `pickup_date`,
      type: `time`,
    },

    pickupDatetime: {
      sql: `pickup_datetime`,
      type: `time`,
    },

    dropoffDatetime: {
      sql: `dropoff_datetime`,
      type: `time`,
    },
  },

  dataSource: `default`,
});
