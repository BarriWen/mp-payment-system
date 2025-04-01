const axios = require('axios');

const keyId = 'rzp_test_A7mM2PN0UhK0AA';
const keySecret = 'avwvQlgcmByOycOMgh8QVHQC';
const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        const response = await axios.post('https://api.razorpay.com/v1/orders', body, {
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
