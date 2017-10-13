
// TODO: Split up in different files? Refactor helper functions. Check different Excel & output. Check semantics / refactor a bit

function sumCalculations (input, months) {
  var output = {};

  // mayb a bit stupid to create an array from months input
  var monthsArray = [...Array(months).keys()];
  
  output = _calculateCustomerAmounts(input, output, monthsArray);
  output = _calculateNetNewPricesPerMonth(input, output);
  output = _calculateNetRecurringPricesPerMonth(input, output);
  output = _calculateTotalRevenue(output);

  output = _calculateCogsVariables(input, output);
  output = _calculateOperatingCostsVariables(input, output);
  output = _calculateLVAVariables(input, output);

  return output;
}



