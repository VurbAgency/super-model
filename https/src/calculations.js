// times(3)(i => console.log(i, 'hi'))

superModelCalculationsElementMixin = function (superClass) {
  const times = n => f => {
    let iter = i => {
      if (i === n) return
      f(i)
      iter(i + 1)
    }
    return iter(0)
  }

  return class extends superClass {
    constructor() {
      super();
    }

    static get properties() {
      return {
        data: {
          type: Object
        },
        calculated: {
          type: Object
        }
      };
    }

    static get observers() {
      return ['_dataChanged(data.*)'];
    }

    _dataChanged(dataEvent) {
      this._updateCalculated(this.data)
    }

    _updateCalculated(data) {
      var manyMonths = 12

      var defaultRetention = {}
      var defaultRetentionOffset = {
        2: 0.15,
        3: 0.06,
        4: 0.03,
        5: 0.01,
        6: 0.0,
        7: -0.01,
        8: -0.03,
        9: -0.04,
        10: -0.05,
        11: -0.06,
        12: -0.07
      }


      // TODO something goes wrong here as the characters dive to quickly
      for (var month in defaultRetentionOffset) {
        if (defaultRetentionOffset.hasOwnProperty(month)) {
          var offset = Number(defaultRetentionOffset[month])
          var base = Number(data.retentionRateSixMonths)
          defaultRetention[month] = base + (base * offset)
        }
      }

      // Build the netNewCustomers

      var netNewCustomers = {}

      times(manyMonths)(i => {
        let month = i + 1
        if (month === 1) {
          netNewCustomers[month] = Number(data.netNewCustomersStart)
        }
        if (month > 1) {
          var lastNetNewCustomers = Number(netNewCustomers[month - 1])
          netNewCustomers[month] = lastNetNewCustomers + ((Number(data.growthRate) / 100) * lastNetNewCustomers)
        }
      })

      var retainedCustomersCohort = {}
      var totalCustomers = {}
      var retainedCustomers = {}

      times(manyMonths)(i => {
        let month = i + 1
        let thisNetNewCustomers = Number(netNewCustomers[month])
        retainedCustomersCohort[month] = {}
        retainedCustomersCohort[month][month] = thisNetNewCustomers
        retainedCustomers[month] = 0

        if (!totalCustomers[month]) {
          totalCustomers[month] = 0
        }
        totalCustomers[month] += thisNetNewCustomers

        for (var retentionMonth in defaultRetention) {
          retentionMonth = Number(retentionMonth)
          var lastMonth = month + retentionMonth - 2
          var thisMonth = month + retentionMonth - 1
          var retention = Number(defaultRetention[retentionMonth]) / 100
          var customers = thisNetNewCustomers * retention
          retainedCustomersCohort[month][thisMonth] = customers

          if (!totalCustomers[thisMonth]) {
            totalCustomers[thisMonth] = 0
          }

          totalCustomers[thisMonth] += customers

        }

        retainedCustomers[month] = totalCustomers[month] - thisNetNewCustomers
      })

      return this.set('calculated', {
        defaultRetention: defaultRetention,
        netNewCustomers: netNewCustomers,
        retainedCustomersCohort: retainedCustomersCohort,
        retainedCustomers: retainedCustomers,
        totalCustomers: totalCustomers
      })

    }
  }
}

/*
retainedCustomers
retainedCustomersCohort
totalCustomers
defaultRetention
totalRevenueT1
totalRevenueT2
totalRevenueT3
totalRevenue
averageCustomerGrossMargin
lifeTimeValue
staffDeliveryTotalHumans
cogs
grossMargin
staffOperatingTotalHumans
totalOperatingCosts
totalOperatingMargin
netOperatingMargin
*/



