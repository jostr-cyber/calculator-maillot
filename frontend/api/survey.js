export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { surveyAnswers, budget, calculationContext } = req.body;

    // Логирование в консоль (для отладки)
    console.log('📋 Survey received:', {
      email: surveyAnswers?.email,
      timestamp: new Date().toISOString(),
      budget,
      finalPrice: calculationContext?.finalPrice
    });

    // Успешный ответ
    res.status(200).json({
      success: true,
      message: 'Survey data received successfully',
      id: Math.random().toString(36).substr(2, 9)
    });
  } catch (error) {
    console.error('Survey error:', error);
    res.status(500).json({ error: 'Failed to process survey: ' + error.message });
  }
}
