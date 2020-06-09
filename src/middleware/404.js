module.exports = (req, res) => {
    res.status(404);
    res.statusMessage = 'resourse not found';
    res.json({ error: 'not found' });
  };