/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry headers
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint for AI transformation generation
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGeminiClient();
    
    const systemInstruction = 
      "You are StitchNexus AI, an expert TypeScript data transformation engineer.\n" +
      "Your task is to write a single, clean TypeScript function named `transform` that takes a parameter `event: any` and returns the transformed event object (or null to skip/filter it out).\n" +
      "The user requested: " + prompt + "\n\n" +
      "Rules:\n" +
      "1. You must return ONLY the raw, executable TypeScript code.\n" +
      "2. Do NOT wrap the code in markdown blocks (like ```typescript ... ```).\n" +
      "3. Ensure the code is self-contained, valid TypeScript, and handles missing/null attributes safely.\n" +
      "4. Include concise, helpful comments inside the code explaining the transformation logic.\n" +
      "5. Always end with the function export:\n" +
      "export function transform(event: any): any {\n" +
      "  // ... logic\n" +
      "  return event;\n" +
      "}";

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Generate a TypeScript transform function for this requirement: ${prompt}`,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    let generatedCode = response.text || '';
    
    // Clean up code if the model ignored system instructions and returned markdown code block
    generatedCode = generatedCode.trim();
    if (generatedCode.startsWith('```')) {
      // Strip starting ```typescript or ```
      generatedCode = generatedCode.replace(/^```[a-zA-Z]*\n/, '');
      // Strip trailing ```
      generatedCode = generatedCode.replace(/\n```$/, '');
      generatedCode = generatedCode.trim();
    }

    res.json({ code: generatedCode });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate transformation code via Gemini API' 
    });
  }
});

// Configure Vite integration or static file serving
async function configureVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

configureVite().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
  });
}).catch((err) => {
  console.error('Failed to configure Vite middleware:', err);
});
