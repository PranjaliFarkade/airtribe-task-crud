async function validateInput(reqbody) {
  const { title, description, completed } = reqbody;
  if (
    title &&
    description &&
    completed &&
    typeof completed === "boolean" &&
    typeof title === "string" &&
    typeof description === "string"
  ) {
    return true;
  } else {
    return false;
  }
}

module.exports = validateInput;
