function _calculateCogsVariables (input, output) {
  
  // A lot of the functions make the same calculation since the models are quite simplified. Decided to give each variable it's own function to facilitate quick changes when models get more complicated.
  output['costInitialTech'] = _calculateInitialTechCosts(input.costInitialTech, output.totalCustomers, input.costInitialCustomer)
  output['costStaffServiceHumans'] = _calculateSupportCosts(input.staffServiceHumanPrice, input.staffServiceHumans)
  output['costStaffInfrastructure'] = _calculateInfrastructureCosts(input.staffInfrastructureHumanPrice, input.staffInfrastructureHumans)
  output['costMonthlyTech'] = _calculateThirdPartySoftwareCosts(input.costMonthlyTech, output.totalCustomers)  
  output['costTech'] = _calculateTechCosts(output.costInitialTech, output.costMonthlyTech)  
  
  output['costsStaffDeliveryOtherHumans'] = _calculateOtherStaffCosts(input.staffDeliveryOtherHumans, input.staffDeliveryOtherHumanPrice)
  output['staffDeliveryTotalHumans'] = _calculateStaffDeliveryTotalHumans(input.staffServiceHumans, input.staffInfrastructureHumans, input.staffDeliveryOtherHumans)
  output['cogs'] = _calculateCogs(output.costInitialTech, output.costStaffServiceHumans, output.costStaffInfrastructure, output.costMonthlyTech, output.costsStaffDeliveryOtherHumans)
  output['grossMargin'] = _calculateGrossMargin(output.totalRevenue, output.cogs)

  return output;
}

// BEGIN cogs functions
function _calculateInitialTechCosts (costInitialTech, totalCustomers, costInitialCustomer) {
  costInitialTech = Number(costInitialTech); costInitialCustomer = Number(costInitialCustomer);
  return totalCustomers.map((a, i) => costInitialTech + (costInitialTech * a * costInitialCustomer));
}

function _calculateTechCosts (costInitialTech, costMonthlyTech) {
  return _combineTwoArrays(costInitialTech, costMonthlyTech);
}

function _calculateThirdPartySoftwareCosts (costMonthlyTech, totalCustomers) {
  costMonthlyTech = Number(costMonthlyTech);
  return totalCustomers.map((a, i) => costMonthlyTech + (costMonthlyTech * a * 0));
}

// A lot of the functions make the same calculation since the models are quite simplified. Decided to give each variable it's own function to facilitate quick changes when models get more complicated.
function _calculateSupportCosts (staffServiceHumanPrice, staffServiceHumans) {
  staffServiceHumanPrice = Number(staffServiceHumanPrice); staffServiceHumans = Number(staffServiceHumans);
  var supportCosts = (staffServiceHumanPrice / 12) * staffServiceHumans;
  return _fillArrayWithSameNumber(supportCosts, 12)
}
function _calculateInfrastructureCosts (staffInfrastructureHumanPrice, staffInfrastructureHumans) {
  staffInfrastructureHumanPrice = Number(staffInfrastructureHumanPrice); staffInfrastructureHumans = Number(staffInfrastructureHumans);
  var infrastructureCosts =  (staffInfrastructureHumanPrice / 12) * staffInfrastructureHumans;
  return _fillArrayWithSameNumber(infrastructureCosts, 12)
  
}

function _calculateOtherStaffCosts (staffDeliveryOtherHumans, staffDeliveryOtherHumanPrice) {
  staffDeliveryOtherHumans = Number(staffDeliveryOtherHumans); staffDeliveryOtherHumanPrice = Number(staffDeliveryOtherHumanPrice);
  var deviveryCosts = (staffDeliveryOtherHumans / 12) * staffDeliveryOtherHumanPrice;
  return _fillArrayWithSameNumber(deviveryCosts, 12)
}

function _calculateStaffDeliveryTotalHumans(staffServiceHumans, staffInfrastructureHumans, staffDeliveryOtherHumans) {
  return Number(staffServiceHumans) + Number(staffInfrastructureHumans) + Number(staffDeliveryOtherHumans);
}

function _calculateCogs(staffDeliveryOtherHumans, costMonthlyTech, staffInfrastructureHumanPrice, staffServiceHumans, costInitialTech) {
  return _combineFiveArrays(staffDeliveryOtherHumans, costMonthlyTech, staffInfrastructureHumanPrice, staffServiceHumans, costInitialTech)
}

function _calculateGrossMargin (totalRevenue, cogs) {
  return totalRevenue.map((a, i) => (a-cogs[i]) / a);  
}

// END cogs functions
