require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/recommend', async (req, res) => {
    const { budget, specs } = req.body;

    // Build the API request
    const apiRequestJson = {
        "messages": [
            {"role": "user", "content": `Recommend top 5 laptops under INR ${budget} with the following specifications: ${specs}`}
        ],
        "functions": [
            {
                "name": "get_laptop_recommendations",
                "description": "Get the top 5 laptop recommendations within a budget and specifications",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "budget": {
                            "type": "number",
                            "description": "The budget in INR",
                        },
                        "specifications": {
                            "type": "string",
                            "description": "The desired laptop specifications",
                        }
                    },
                    "required": ["budget", "specifications"],
                }
            }
        ],
        "stream": false,
        "function_call": "get_laptop_recommendations",
    };

    try {
        const response = await axios.post('https://api.llama.com/v3.1/chat/completions', apiRequestJson, {
            headers: {
                'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Log the entire response to see what the API returns
        console.log('API Response:', response.data);

        // Assuming response.data.choices[0].text contains the laptop recommendations
        const laptops = response.data.choices && response.data.choices[0] ? response.data.choices[0].text.trim() : 'No recommendations found.';

        res.json({ laptops });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch laptop recommendations' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
