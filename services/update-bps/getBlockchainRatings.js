const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch'); //node only
const { TextDecoder, TextEncoder } = require('util'); //node only

const rpc = new JsonRpc('https://jungle.eosio.cr', { fetch }) //required to read blockchain state

async function getRatings() {
	const ratings = await
		rpc.get_table_rows({
    		json: true,               // Get the response as json
    		code: 'rateproducer',     // Contract that we target
    		scope: 'rateproducer',    // Account that owns the data
    		table: 'stats',           // Table name
    		limit: 200,               // Maximum number of rows that we want to get
    		reverse: false,           // Optional: Get reversed data
    		show_payer: false         // Optional: Show ram payer
		})
	console.log(ratings)
}

 getRatings();


async function getRating(producer) {
	const rating = await rpc.get_table_rows({
	    json: true,
	    code: 'rateproducer',
	    scope: 'rateproducer',
	    table: 'stats',
	    lower_bound: producer,
	    limit: 1,
	    reverse: false,
	    show_payer: false
	})
	console.log(rating)
}

//getRating('costaricaeos');

const stats = {
  getRating,
  getRatings,
}

module.exports = stats
