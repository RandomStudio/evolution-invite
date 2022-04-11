/* eslint-disable no-console */
const https = require('https');

async function post(url, data, headers) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': data.length,
			...headers,
		},
		timeout: 1000, // in ms
	}

	return new Promise((resolve, reject) => {
		const req = https.request(url, options, (res) => {
			if (res.statusCode < 200 || res.statusCode > 299) {
				return reject({ code: res.statusCode, message: res.statusMessage })
			}

			const body = []
			res.on('data', (chunk) => body.push(chunk))
			res.on('end', () => {
				const resString = Buffer.concat(body).toString()
				resolve(resString)
			})
		})

		req.on('error', (err) => {
			reject(err)
		})

		req.on('timeout', () => {
			req.destroy()
			reject(new Error('Request time out'))
		})

		req.write(data)
		req.end()
	})
}


module.exports.handler = async (event, context, callback) => {
	const respond = (body, code = 201) => {
		console.log('responding with', code, body)

		callback(null, {
			statusCode: code,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
			},
			body: JSON.stringify(body),
		});
	};

	const { email } = event.queryStringParameters;

	if (!email) {
		respond({ message: 'No EMAIL supplied' }, 400);
	}

	const headers = {
		Authorization: `Basic ${process.env.MAILCHIMP_API_KEY}`,
	}

	const data = {
		email_address: email,
		first_name: name,
		status: 'subscribed',
		merge_fields: {},
	};

	const body = JSON.stringify(data);
	console.log('Sending data to mailchimp', body);

	try {
		const response = await post('https://us4.api.mailchimp.com/3.0/lists/be0f61cfc9/members', body, headers);

		const bodyObj = JSON.parse(body);

		console.log(`Mailchimp body: ${JSON.stringify(bodyObj)}`);
		console.log(`Status Code: ${response.statusCode}`);

		if (!response.ok) {
			console.log('Error from mailchimp', bodyObj.detail);
			respond(bodyObj.detail);
			return;
		}

		console.log('Added to list in Mailchimp subscriber list');

		respond({
			status: 'saved email',
		});
	} catch (error) {
		console.log(error)
		respond({ message: error.message ?? 'Server error' }, error.code ?? 500);
	}
};