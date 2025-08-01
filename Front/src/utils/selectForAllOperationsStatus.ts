import allOperations from "../redux/allOperations";

function selectForAllOperationsStatus(
  status: "fulfilled" | "pending" | "rejected"
) {
  return allOperations.map((op) => op[status]);
}
export default selectForAllOperationsStatus;
