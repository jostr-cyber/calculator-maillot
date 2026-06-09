import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializePrices, calculatePrice, getPrices } from './config/prices.js';
import { initializeSurveyStorage, saveSurvey, getAllSurveys, getSurveysByDateRange, generateExportJSON, generateExportFilename, getLastUpdated } from './utils/surveyStorage.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize prices on startup
let pricesInitialized = false;

app.post('/api/calculate-price', async (req, res) => {
  try {
    const { level, height, sleeves, skirt, decorativeElements, shoulder, aerography, combinaison, premiumStones, urgency, design, budget } = req.body;

    if (!level || !height) {
      return res.status(400).json({ error: 'Missing required parameters: level and height' });
    }

    const result = calculatePrice(
      level,
      height,
      parseInt(sleeves) || 0,
      skirt || '',
      decorativeElements || '',
      shoulder || '',
      aerography || '',
      combinaison || '',
      premiumStones || '',
      urgency || '',
      design || '',
      budget || null
    );

    res.json(result);
  } catch (error) {
    console.error('Error calculating price:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/survey', (req, res) => {
  try {
    const { surveyAnswers, budget, calculationContext } = req.body;

    // Send immediate response (non-blocking)
    res.json({
      success: true,
      message: 'Survey data received successfully'
    });

    // Save survey data and log asynchronously (non-blocking)
    setImmediate(() => {
      // Save to persistent JSON file
      if (surveyAnswers) {
        const result = saveSurvey(surveyAnswers);
        if (result.success) {
          console.log(`✓ Survey saved to storage (ID: ${result.id})`);
        } else {
          console.error(`✗ Failed to save survey: ${result.error}`);
        }
      }

      // Also log to console for debugging
      console.group('📋 Leotard Survey Response');
      console.log('Timestamp:', new Date().toISOString());
      if (surveyAnswers) {
        console.log('Email:', surveyAnswers.email || 'not provided');
        console.log('How Found:', surveyAnswers.howFound || []);
        console.log('Importance:', surveyAnswers.importance || '');
        console.log('Other Influence:', surveyAnswers.otherInfluence || '');
        console.log('Age:', surveyAnswers.age || '');
        console.log('Who You Are:', surveyAnswers.whoYouAre || []);
        console.log('Favorite Leotards:', surveyAnswers.favoriteLeotards || []);
      }
      if (budget) {
        console.log('Budget:', budget);
      }
      if (calculationContext) {
        console.log('Total Price:', calculationContext.totalPrice);
        console.log('Final Price:', calculationContext.finalPrice);
      }
      console.groupEnd();
    });
  } catch (error) {
    console.error('Error processing survey:', error);
    res.status(500).json({ error: 'Error processing survey data' });
  }
});

// Admin endpoints for survey retrieval and export
app.get('/api/admin/surveys', (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Get surveys, optionally filtered by date range
    let surveys;
    if (startDate || endDate) {
      surveys = getSurveysByDateRange(startDate, endDate);
    } else {
      surveys = getAllSurveys();
    }

    const lastUpdated = getLastUpdated();

    res.json({
      surveys: surveys,
      count: surveys.length,
      lastUpdated: lastUpdated
    });
  } catch (error) {
    console.error('Error retrieving surveys:', error);
    res.status(500).json({ error: 'Error retrieving surveys' });
  }
});

app.get('/api/admin/surveys/export', (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Get surveys, optionally filtered by date range
    let surveys;
    if (startDate || endDate) {
      surveys = getSurveysByDateRange(startDate, endDate);
    } else {
      surveys = getAllSurveys();
    }

    // Generate JSON export
    const jsonContent = generateExportJSON(surveys);
    if (!jsonContent) {
      return res.status(500).json({ error: 'Failed to generate export' });
    }

    // Set response headers for file download
    const filename = generateExportFilename('json');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(jsonContent);
  } catch (error) {
    console.error('Error exporting surveys:', error);
    res.status(500).json({ error: 'Error exporting surveys' });
  }
});

app.get('/api/prices', (req, res) => {
  try {
    const prices = getPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Swimsuit Calculator API',
    version: '1.0.0',
    status: 'running'
  });
});

// Start server
app.listen(PORT, async () => {
  try {
    // Initialize prices
    await initializePrices();
    pricesInitialized = true;
    console.log(`✓ Prices initialized`);

    // Initialize survey storage
    initializeSurveyStorage();
    console.log(`✓ Survey storage initialized`);

    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ API available at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
});
