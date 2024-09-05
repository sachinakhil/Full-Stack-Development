document.getElementById('laptop-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const budget = document.getElementById('budget').value;
    const specs = document.getElementById('specs').value;

    try {
        const response = await fetch('/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ budget, specs })
        });

        const data = await response.json();
        document.getElementById('results').innerText = data.laptops;
    } catch (error) {
        document.getElementById('results').innerText = 'Failed to fetch recommendations.';
        console.error('Error:', error);
    }
});
