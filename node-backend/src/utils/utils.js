function handleInternalServerError(error, res) {
  console.error('Error executing query:', error);
  return res.status(500).send('Internal Server Error');
}

function buildSetClauses(fields) {
  const setClauses = [];
  const queryValues = [];

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      setClauses.push(`${key} = ?`);
      queryValues.push(value);
    }
  }

  return { query: setClauses.join(', '), values: queryValues };
}

function validateRequiredFields(fields, res) {
  const isValid = fields.every((field) => field !== undefined);

  if (!isValid) {
    res.status(400).json({ error: 'All fields are required' });
  }

  return isValid;
}

module.exports = {
  handleInternalServerError,
  buildSetClauses,
  validateRequiredFields
};