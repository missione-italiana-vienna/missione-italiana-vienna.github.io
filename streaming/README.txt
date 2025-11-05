// HOW TO EMBED THE LAST VIDEO OF TODAY

// Possible 3 cases:
// 1) the stream of today has not started yet: send the user 
//     to our youtube channel. In order to do that, set:
//     --- link_last_stream = ""; 
//    (it is not necessary to toggle the value of last_stream_is_embeddable )
// 2) there is currently a stream: since youtube does not 
//    allow us to embed a stream in the website, send the user
//    to the link to that youtube stream. In this case, set:
// -- link_last_stream = link of the current stream of today
// -- last_stream_is_embeddable = false;
// 3) the stream of today already ended. In this case, 
//    we can embed it in our website. For that, set:
// -- link_last_stream = link of the stream of today
// -- last_stream_is_embeddable = true;
//
// In all the cases above, one needs also to update the value 
// of date_of_last_stream to the date when the last stream was done.
// In this way, on top of the webpage we will show a video
// only if it is embeddable AND it is the video of today.
// If it is not embeddable: only a link to youtube is provided.
// If it is not the video of today: shown in the lower part of the webpage.

// NOTE: the variable below must ONLY contain the 
// unique identifier of a youtube video. This is normally a string
// composed of letters, numbers and the symbols - and _
// DO NOT INCLUDE ADDITIONAL PARAMETERS (like "feature", start time, etc)
// This id can be found as the first block of "..." in any youtube link of the form
// https://www.youtube.com/watch?v=...&.....
