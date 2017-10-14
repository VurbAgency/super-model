function _calculateNetNewPricesPerMonth (input, output) {
  output['netNewPricePerMonthT1'] = _calculatePricePerMonth(input.pricePerMonthT1, input.pricePercentT1, output.netNewCustomers)
  output['netNewPricePerMonthT2'] = _calculatePricePerMonth(input.pricePerMonthT2, input.pricePercentT2, output.netNewCustomers)
  output['netNewPricePerMonthT3'] = _calculatePricePerMonth(input.pricePerMonthT3, input.pricePercentT3, output.netNewCustomers)
  return output;  
}

function _calculateNetRecurringPricesPerMonth (input, output) {
  output['netRecurringPricePerMonthT1'] = _calculatePricePerMonth(input.pricePerMonthT1, input.pricePercentT1, output.retainedCustomersTotal)
  output['netRecurringPricePerMonthT2'] = _calculatePricePerMonth(input.pricePerMonthT2, input.pricePercentT2, output.retainedCustomersTotal)
  output['netRecurringPricePerMonthT3'] = _calculatePricePerMonth(input.pricePerMonthT3, input.pricePercentT3, output.retainedCustomersTotal)  
  return output;  
}

function _calculateTotalRevenue (output) {
  output['totalRevenueTier1'] = _combineTwoArrays(output.netNewPricePerMonthT1, output.netRecurringPricePerMonthT1);
  output['totalRevenueTier2'] = _combineTwoArrays(output.netNewPricePerMonthT2, output.netRecurringPricePerMonthT2);
  output['totalRevenueTier3'] = _combineTwoArrays(output.netNewPricePerMonthT3, output.netRecurringPricePerMonthT3);
  output['totalRevenue'] = _combineThreeArrays(output.totalRevenueTier1, output.totalRevenueTier2, output.totalRevenueTier3);
  return output;
}

function _calculatePricePerMonth (pricePerMonth, pricePercent, netNewCustomersArray) {
  var monthlyPricingAndRevenuePerTierNewCustomers = netNewCustomersArray.map((a, i) => Number(pricePerMonth) * a *  (Number(pricePercent)/100));
  return monthlyPricingAndRevenuePerTierNewCustomers;
}