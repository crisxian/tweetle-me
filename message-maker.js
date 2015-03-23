/*
* NOTE: This file generates fake message data, re-implement this yourself if you want to.
* You can use this file as is and just make changes in the index.html
*/

// set up data structures 1) homepage tweets 2) users
var messages = {
	users: {
		Alf: [],
		Broli: [],
		Colonel: [],
		Dora: [],
		Earp: [],
		Finn: []
	},
	homepage: []
};

// function to add tweet data
var addTweet = function(tweet){
	messages.users[tweet.user].push(tweet);
	messages.homepage.push(tweet);	
};

// function to submit tweets
var twitSubmit = function(msg){
	nickname = nickname || 'visitor';

	addTweet({
		user: msg.nickname,
		message: msg.message,
		created_at: new Date()
	});
};

// function to time ago
var timeAgo = function(time){
	var current = new Date();
	var timeDiff;
	if(current.getYear()-time.getYear() ) return "more than a year ago";
	if(current.getMonth()-time.getMonth() >= 2 ) return "months ago";
	if(current.getMonth()-time.getMonth() ) return "more than a month ago";
	if(current.getDay()-time.getDay() >= 7 ) return "more than a week ago";
	if(current.getDay()-time.getDay() ) return "more than a day ago";
	if(current.getHours()-time.getHours() >= 3) return "a few hours ago";
	if(current.getHours()-time.getHours() > 1) return "more than an hour ago";
	if((timeDiff = current.getMinutes()-time.getMinutes()) > 1) return timeDiff + " minutes ago";
	if(timeDiff < 0) return 60+timeDiff + " minutes ago";
	return "a moment ago";
}

// random function
var randomPick = function(array){
	var index = Math.floor(Math.random() * array.length);
	return array[index];
}

// messages picklist categories (exclamation, status/event/actions updates/announcement, greetings, question/request, implerative declarations)
var contents = ['hey whats up', 'We out partying in the city!', 'working on my startup', 'deploying new tech, lmk what you think', 'are you even for real?', 'Will be checkin it out myself', 'lol, ikr? tell me about it!', 'inviting my friends to join', 'look for me here', 'send me the info. thanks!', 'Yesss!', 'Wooo', 'thats enough']

// Create tweets for homepage
var autoTweet = function(){
	addTweet({
		user: randomPick(Object.keys(messages.users)),
		message: randomPick(contents),
		created_at: new Date()
	});
}
// First 10 messages
var count = 10;
while(count){ 
	autoTweet(); 

	// randomize the time to make the first 10 tweets interesting
	var newestTwit = messages.homepage[messages.homepage.length - 1];
	var past = newestTwit.created_at.getTime() - Math.floor(Math.random() * 600000);
	newestTwit.created_at = new Date(past);

	count--;
}
messages.homepage.sort(function(timeA,timeB){ return timeA.created_at.getTime()-timeB.created_at.getTime() });

// generate next autoTweet at random times between 1 and 6 seconds
var nextTweet = function(){
	autoTweet();
	setTimeout(nextTweet, 1000 + Math.random() * 5000);
};
nextTweet();