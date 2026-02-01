function predict(data) {
  const {
    attendance,
    late_days,
    leaves,
    discipline_score
  } = data;

  let risk = "";
  let reason = "";

  if (attendance >= 85) risk = "Safe";
  else if (attendance >= 70) risk = "Medium";
  else risk = "High";

  if (attendance < 60)
    reason = "Very low attendance";
  else if (leaves > 10)
    reason = "Too many leaves";
  else if (late_days > 10)
    reason = "Frequent late arrivals";
  else if (discipline_score > 20)
    reason = "Poor discipline";
  else
    reason = "Normal attendance";

  return { risk, reason };
}

module.exports = predict;
