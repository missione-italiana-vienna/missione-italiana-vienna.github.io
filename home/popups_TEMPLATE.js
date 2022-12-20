// IN ORDER TO HAVE A VALID POPUP:
// 1) copy this template to a file (in this same folder) named popups.js
// 2) remove all these comments
// 3) in case you want to add multiple buttons in the popup, each must be provided
//    as content between {...}. Each block {...} must be separated by commas from the next one!
// 4) if you do not want any popup, the file must consist of only an empty array
// NOTE: the object "last_date_to_show" must contain a string date in international format, namely yyyy-mm-dd
// This is the last date when the corresponding popup will be shown on the website.
// In this way we do not need to immediately manually update the popup file when a popup is no more relevant
// but we can decide already in advance when the popup shall disappear from the website
// NOTE: if you do not know yet how long the popup will have to be shown, put a date very far in the future
[
  {
    "text": "Orari delle celebrazioni ...",
    "link": "https://mcivienna.org/...",
    "last_date_to_show": "2022-12-20"
  }
]