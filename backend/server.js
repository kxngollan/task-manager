import express from 'express';

const app = express();

app.get('/app', (req, res) => {
  res.json({ users: ['userOne', 'userTwo', 'userThree'] });
});

app.listen(8000, () => console.log('Server is running on port 8000'));
