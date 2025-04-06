// Mock ML prediction function
function mockPredict(textArray) {
  // Simulate some toxic content detection
  const mockResponse = {
    flagged: []
  };

  textArray.forEach((text, index) => {
    if (index % 3 === 0) { // Simulate every 3rd item as toxic
      mockResponse.flagged.push({
        text: text,
        label: index % 2 === 0 ? 'Hate Speech' : 'NSFW',
        confidence: 0.85 + Math.random() * 0.14 // Random confidence between 0.85 and 0.99
      });
    }
  });

  return mockResponse;
}