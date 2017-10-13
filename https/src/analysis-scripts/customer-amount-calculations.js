function _calculateCustomerAmounts (input, output, monthsArray) {
  // get Array filled with net new customers per month
  output['netNewCustomers'] = _calculateNetNewCustomers(Number(input.netNewCustomersStart), Number(input.growthRate), monthsArray)
  
  defaultRetentionPercantages = [ 58, 53, 52, 51, 50, 50, 49, 48, 48, 47, 47 ]
  // get Array filled with net new customers per month
  output['retainedCustomersCohorts'] = _calculateRetainedCustomersCohorts(output.netNewCustomers, defaultRetentionPercantages, monthsArray)

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


function _calculateRetainedCustomersCohorts (netNewCustomers, defaultRetentionPercantages, monthsArray) {
  var retainedCustomersCohorts = [];
  
  monthsArray.forEach( function(cohort) {
    retainedCustomersCohorts[cohort] = {}
    monthsArray.forEach( function(month) {
      if (month < cohort) retainedCustomersCohorts[cohort][month] = 0;
      if (month === cohort)  retainedCustomersCohorts[cohort][month] = netNewCustomers[cohort];
      if (month > cohort)  retainedCustomersCohorts[cohort][month] = netNewCustomers[cohort] * (defaultRetentionPercantages[month - cohort -1]/100);
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
      }, 1)
    )
  })

  return retainedCustomersCohortsTotal;
}

// END main new customer functions