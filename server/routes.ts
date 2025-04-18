import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateTimelinePrediction } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for submitting email for waitlist (not connected to actual storage)
  app.post('/api/waitlist', (req, res) => {
    const { email } = req.body;
    
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email address required' });
    }
    
    // This would normally save to a database, but we're just returning success
    return res.status(200).json({ 
      message: 'Successfully joined the waitlist',
      status: 'success'
    });
  });
  
  // API route for demo form submission with Gemini AI integration
  app.post('/api/generate-prediction', async (req: Request, res: Response) => {
    try {
      const { goal, industry, timeframe, disruptions } = req.body;
      
      if (!goal || !industry || !timeframe) {
        return res.status(400).json({ 
          message: 'Missing required fields',
          status: 'error'
        });
      }
      
      // Generate prediction using Gemini AI
      const prediction = await generateTimelinePrediction(
        goal, 
        industry, 
        timeframe,
        disruptions || ''
      );
      
      return res.status(200).json({
        message: 'Prediction generated successfully',
        status: 'success',
        prediction: prediction
      });
    } catch (error) {
      console.error('Error generating prediction:', error);
      return res.status(500).json({
        message: 'Failed to generate prediction',
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
