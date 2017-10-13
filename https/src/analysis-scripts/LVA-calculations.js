function _calculateLVAVariables(input, output) {
  output['averageCustomerGrossMargin'] = _calculateAverageCustomerGrossMargin(output.netNewCustomers, output.grossMargin)
  output['traditionalLifetimeValue'] = _calculatetraditionalLifetimeValue(output.averageCustomerGrossMargin, input.retentionRateSixMonths, input.discountRate)
  return output;
}

// BEGIN LVA variables

function _calculateAverageCustomerGrossMargin(netNewCustomers, grossMargin) {
  return netNewCustomers.map((a, i) => a * grossMargin[i]);    
  
}
function _calculatetraditionalLifetimeValue(averageCustomerGrossMargin, retentionRateSixMonths, discountRate) {
  retentionRateSixMonths = Number(retentionRateSixMonths)/100; discountRate = Number(discountRate)/100;
  return averageCustomerGrossMargin.map((a, i) => a * (retentionRateSixMonths / (1 + discountRate - retentionRateSixMonths))); 
}

// END LVA variables
