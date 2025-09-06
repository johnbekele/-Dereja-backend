import { createWorker } from 'tesseract.js';

const worker = async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

  const buffer = req.file.buffer;

  const worker = await createWorker('eng'); // add 'eng+deu' if multi-lang

  try {
    const { data } = await worker.recognize(buffer);
    await worker.terminate();
    res.json({ text: data.text.trim() });
  } catch (err) {
    await worker.terminate();
    res.status(500).json({ error: 'OCR failed', details: err.message });
  }
};

export default worker;
