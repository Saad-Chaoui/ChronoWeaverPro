import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
  
  // API route for demo form submission
  app.post('/api/generate-prediction', (req, res) => {
    const { goal, industry, timeframe, disruptions } = req.body;
    
    if (!goal || !industry || !timeframe) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        status: 'error'
      });
    }
    
    // This would normally connect to Gemini API for generating predictions
    // For now just return a mock successful response
    
    // Backend AI integration needed here. Connect to Gemini API using a secure backend process and API Key stored in secrets.
    return res.status(200).json({
      message: 'Prediction generated successfully',
      status: 'success',
      // We're not generating mock data as per requirements, this would be real data from the AI API
      requestData: { goal, industry, timeframe, disruptions }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
