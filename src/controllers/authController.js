export const register = async (req, res) => {
  const { email, password, name } = req.body;

  // TODO: add validation, hashing, persistence, and duplicate checks.
  return res.status(201).json({
    message: 'Register scaffold endpoint hit successfully.',
    user: {
      id: 'replace-with-db-id',
      email: email || null,
      name: name || null
    },
    notes: [
      'Password handling is not implemented yet.',
      'Connect a database and replace this stub.'
    ]
  });
};

export const login = async (req, res) => {
  const { email } = req.body;

  // TODO: verify credentials and issue a session or JWT.
  return res.status(200).json({
    message: 'Login scaffold endpoint hit successfully.',
    user: {
      email: email || null
    },
    token: 'replace-with-real-token',
    notes: ['Authentication is currently a stub.']
  });
};
