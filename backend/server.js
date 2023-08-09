import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/api', (req, res) => {
  res.json({ users: ['userOne', 'userTwo', 'userThree'] });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
