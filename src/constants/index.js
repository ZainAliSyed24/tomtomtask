//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:13:09 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const constant = {
	//App Constants
	socketIP: "192.34.60.217",
	socketPort: "1233",
	baseURL: "https://api.tomtom.com",
	baseImageURL: "https://api.tomtom.com",
	applicationToken: "api.Pd*!(5675",
	//Services Constants
	posts: "user/login",
	nearByResturants: 'search/2/poiSearch/pizza.json',
	//Socket Constants
	//     failure: { action: "failure", packet_code: 9900 },
	//Location Constants
	LOCATION_TIME_OUT: 10000,
	LOCATION_MAX_AGE: 1000,
	LOCATION_HIGH_ACCURACY: false
};

export default constant;
