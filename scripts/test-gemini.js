async function testGemini2() {
  const API_KEY = 'AIzaSyA0ZhvfwuiCEDOSwBCBbpPTwEY1B9NGDdI';
  const model = 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
  
  console.log(`Testing ${model}...`);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Hello' }] }]
    })
  });
  
  const data = await response.json();
  if (response.ok) {
    console.log('✅ Success!', data.candidates?.[0]?.content?.parts?.[0]?.text);
  } else {
    console.log('❌ Failed:', JSON.stringify(data, null, 2));
  }
}

testGemini2();
