document.getElementById('btn').addEventListener('click', async () => {
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      document.getElementById('result').textContent = data.message;
    } catch (error) {
      console.error('エラー:', error);
    }
  });