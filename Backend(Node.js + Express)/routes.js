const express = require('express');
const router = express.Router();
const { summarizeTodos } = require('../services/openai');
const { sendToSlack } = require('../services/slack');

let todos = [];

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  res.json(newTodo);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.sendStatus(204);
});

router.post('/summarize', async (req, res) => {
  try {
    const summary = await summarizeTodos(todos);
    await sendToSlack(summary);
    res.json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
