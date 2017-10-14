function _calculateOperatingCostsVariables(input, output) {
  output['salesMarketingBudget'] = _calculateSalesMarketingBudget(input.costMarketingPercentage, output.totalRevenue);
  output['customerSuccesHumansRatio'] = _calculateCustomerSuccesHumansRatio(input.staffSuccessHumanPrice, input.staffSuccessHumans)
  output['staffProductPriceRatio'] = _calculateStaffProductPriceRatio(input.staffProductHumanPrice, input.staffProductHumans)
  output['costSupplies'] = _calculateCostSupplies(input.costSupplies)  
  output['costSoftware'] = _calculateCostSoftware(input.costSoftware)
  
  output['staffOperatingOtherHumansRatio'] = _calculateStaffOperatingOtherHumansRatio(input.staffOperatingOtherHumanPrice, input.staffOperatingOtherHumans)
  
  output['costOfficePerHuman'] = _calculateCostOfficePerHuman(1, input.costOfficePerHuman)
  
  output['staffOperatingTotalHumans'] = _calculateStaffOperatingTotalHumans(input.staffProductHumans, input.staffOperatingOtherHumans, input.staffSuccessHumans, input.staffDeliveryOtherHumans, input.staffInfrastructureHumans, input.staffServiceHumans)
  output['costTotalOperating'] = _calculateCostTotalOperating(output.salesMarketingBudget, output.customerSuccesHumansRatio, output.staffProductPriceRatio, output.costSupplies, output.costSoftware, output.staffOperatingOtherHumansRatio, output.costOfficePerHuman)
  
  output['totalOperatingMargin'] = _calculateTotalOperatingMargin(output.totalRevenue, output.cogs, output.costTotalOperating)
  output['netOperatingMargin'] = _calculateNetOperatingMargin(output.totalOperatingMargin, output.totalRevenue)
  
  return output;
}

// BEGIN Operating costs
function _calculateSalesMarketingBudget(costMarketingPercentage, totalRevenue) {
  return totalRevenue.map((a, i) => a * (costMarketingPercentage/100));
}
function  _calculateCustomerSuccesHumansRatio(staffSuccessHumanPrice, staffSuccessHumans) {
  staffSuccessHumanPrice = Number(staffSuccessHumanPrice); staffSuccessHumans = Number(staffSuccessHumans);
  var CustomerSuccesHumansRatio = (staffSuccessHumanPrice / 12) * staffSuccessHumans;
  return _fillArrayWithSameNumber(CustomerSuccesHumansRatio, 12)
}
function _calculateStaffProductPriceRatio(staffProductHumanPrice, staffProductHumans) {
  staffProductHumanPrice = Number(staffProductHumanPrice); staffProductHumans = Number(staffProductHumans)/100;
  var StaffProductPriceRatio = (staffProductHumanPrice / 12) * staffProductHumans;
  return _fillArrayWithSameNumber(StaffProductPriceRatio, 12)
}
function _calculateCostSupplies(costSupplies) {
  costSupplies = Number(costSupplies); 
  costSuppliesPerMonth = costSupplies / 12;
  return _fillArrayWithSameNumber(costSuppliesPerMonth, 12); 
}
function _calculateCostSoftware(costSoftware) {
  costSoftware = Number(costSoftware); 
  costSoftwarePerMonth = costSoftware / 12;
  return _fillArrayWithSameNumber(costSoftwarePerMonth, 12);     
}

function _calculateStaffOperatingTotalHumans(staffProductHumans, staffOperatingOtherHumans, staffSuccessHumans, staffDeliveryOtherHumans, staffInfrastructureHumans, staffServiceHumans) {
  return parseFloat(staffProductHumans) + parseFloat(staffOperatingOtherHumans) + parseFloat(staffSuccessHumans) + parseFloat(staffDeliveryOtherHumans) + parseFloat(staffInfrastructureHumans) + parseFloat(staffServiceHumans);
}
function _calculateStaffOperatingOtherHumansRatio(staffOperatingOtherHumanPrice, staffOperatingOtherHumans) {
  staffOperatingOtherHumanPrice = Number(staffOperatingOtherHumanPrice); staffOperatingOtherHumans = Number(staffOperatingOtherHumans);
  var staffOperatingOtherHumansRatio = (staffOperatingOtherHumanPrice / 12) * staffOperatingOtherHumans;
  return _fillArrayWithSameNumber(staffOperatingOtherHumansRatio, 12)
}

function _calculateCostOfficePerHuman(staffOperatingTotalHumans, costOfficePerHuman) {
  staffOperatingTotalHumans = Number(staffOperatingTotalHumans); costOfficePerHuman = Number(costOfficePerHuman);
  var costOfficePerHuman = staffOperatingTotalHumans * costOfficePerHuman;
  return _fillArrayWithSameNumber(costOfficePerHuman, 12);
}
function _calculateCostTotalOperating(costMarketingPercentage, staffSuccessHumans, staffProductHumans, costSupplies, costSoftware, staffOperatingOtherHumans, costOfficePerHuman ) {
  return _combineSevenArrays(costMarketingPercentage, staffSuccessHumans, staffProductHumans, costSupplies, costSoftware, staffOperatingOtherHumans, costOfficePerHuman);
}
function _calculateTotalOperatingMargin(totalRevenue, cogs, costTotalOperating) {
  return totalRevenue.map((a, i) => a - cogs[i]  - costTotalOperating[i]);
}
function _calculateNetOperatingMargin(totalOperatingMargin, totalRevenue) {
  return totalOperatingMargin.map((a, i) => a / totalRevenue[i]);    
}
// END Operating costs