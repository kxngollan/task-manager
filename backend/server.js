import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/api', (req, res) => {
  const backendTasks = [
    {
      title: 'Go Shopping',
      date: new Date('2023-08-03T00:00:00.000Z'),
      description: 'Buy food, body care and anything else needed.',
      id: '0.3181836658343091',
    },
    {
      title: 'See Mum',
      date: new Date('2023-08-03T00:00:00.000Z'),
      description: 'Go on a walk to the park with her.',
      id: '0.9103136998514578',
    },
    {
      title: 'Go Cinema',
      date: new Date('2023-08-07T00:00:00.000Z'),
      description: 'Watch latest blockbuster film.',
      id: '0.4994391008515875',
    },
  ];
  res.json(backendTasks);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
