function _calculateCustomerAmounts (input, output, monthsArray) {
  // set defaultRetentionPercentages.
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
  var defaultRetentionPercentages = [];
  for (var month in defaultRetentionOffset) {
    if (defaultRetentionOffset.hasOwnProperty(month)) {
      var offset = Number(defaultRetentionOffset[month])
      var base = Number(input.retentionRateSixMonths)/100;
      defaultRetentionPercentages.push(base + (base * offset));
    }
  }

  output['defaultRetentionPercentages'] = defaultRetentionPercentages;

  // get Array filled with net new customers per month
  output['netNewCustomers'] = _calculateNetNewCustomers(Number(input.netNewCustomersStart), Number(input.growthRate), monthsArray)

  // get Array filled with net new customers per month
  output['retainedCustomersCohorts'] = _calculateRetainedCustomersCohorts(output.netNewCustomers, defaultRetentionPercentages, monthsArray)

  output['retainedCustomersTotal'] = _calculateRetainedCustomersTotal(output.retainedCustomersCohorts, monthsArray)
  output['totalCustomers'] = _combineTwoArrays(output.netNewCustomers, output.retainedCustomersTotal)
  return output;
}

// BEGIN main new customer functions

function _calculateNetNewCustomers (netNewCustomersStart, growthRate, monthsArray) {
  // fill netNewCustomersArray with initial customer amount
  var netNewCustomersArray = [ netNewCustomersStart ];

  // growth rate given by user is in INTs instead of percentage
  var growthRatePercentage = growthRate/100;
  
  // for each month, calculate the net new customers based on previous months' and the growth rate
  monthsArray.forEach( function(month) {
    if (month === 0) return;
    var lastMonthNetNewCustomers = netNewCustomersArray[netNewCustomersArray.length-1];

    netNewCustomersArray.push(
      lastMonthNetNewCustomers * growthRatePercentage + lastMonthNetNewCustomers
    );

  });

  // return Array filled with net new customers per month
  return netNewCustomersArray;
}


function _calculateRetainedCustomersCohorts (netNewCustomers, defaultRetentionPercentages, monthsArray) {
  var retainedCustomersCohorts = [];
  
  monthsArray.forEach( function(cohort) {
    retainedCustomersCohorts[cohort] = {}
    monthsArray.forEach( function(month) {
      if (month < cohort) retainedCustomersCohorts[cohort][month] = 0;
      if (month === cohort)  retainedCustomersCohorts[cohort][month] = netNewCustomers[cohort];
      if (month > cohort)  retainedCustomersCohorts[cohort][month] = netNewCustomers[cohort] * (defaultRetentionPercentages[month - cohort -1]);
    })    
  })  
  return retainedCustomersCohorts;
}

function _calculateRetainedCustomersTotal (retainedCustomersCohorts, monthsArray) {
  if (!retainedCustomersCohorts) return ;
  
  var retainedCustomersCohortsTotal = [];
  
  monthsArray.forEach( function(month) {
    retainedCustomersCohortsTotal.push(
      retainedCustomersCohorts.reduce(function(sum, value) {
        if (month === 0) return 0;
        
        return sum + value[month];
      }, 0)
    )
  })

  return retainedCustomersCohortsTotal;
}

// END main new customer functions