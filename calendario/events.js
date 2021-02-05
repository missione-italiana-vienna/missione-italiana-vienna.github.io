var events = 
[
  {
    'date': '7 Febbraio 2021',
    'content': 
    [
      {
        'time': '11:30',
        'description': 'S. Messa.'
      },
      {
        'time': '16:00',
        'description': 'S. Messa (solo questa Domenica abbiamo questa S. Messa la domenica pomeriggio; dal prossimo weekend si riprende con gli orari normali).'
      }
    ]
  },
  {
    'date': '13 Febbraio 2021',
    'content':
    [
      {
        'time': '17:00 (*)',
        'description': 'Messa prefestiva.'
      }
    ]
  },
  {
    'date': '14 Febbraio 2021',
    'content': 
    [
      {
        'time': '11:30',
        'description': 'S. Messa.'
      }
    ]
  },
  {
    'date': '20 Febbraio 2021',
    'content':
    [
      {
        'time': '17:00 (*)',
        'description': 'Messa prefestiva.'
      }
    ]
  },
  {
    'date': '21 Febbraio 2021',
    'content': 
    [
      {
        'time': '11:30',
        'description': 'S. Messa.'
      }
    ]
  },
  {
    'date': '27 Febbraio 2021',
    'content':
    [
      {
        'time': '17:00 (*)',
        'description': 'Messa prefestiva.'
      }
    ]
  },
  {
    'date': '28 Febbraio 2021',
    'content': 
    [
      {
        'time': '11:30',
        'description': 'S. Messa.'
      }
    ]
  },
  // add always colons!!!
];


// Do not modify the next lines!

// 2 global arrays, used below
var list_months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
var list_weekdays = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

function generate_html_for_a_given_date(js_content, day, month, weekday) {
    var content = "";

    // compute the content of the event
    for (var j = 0; j < js_content.length; ++j) {
      content += '<tr><td';

      if (js_content[j].hasOwnProperty("style")) {
        content += ' style = "' + js_content[j].style + '"';
      }

      if (js_content[j].hasOwnProperty("time")) {
        content += ' class = "time_event"';
      }
      else {
        content += ' class = "time_event_empty"';
      }
      content += '>'; // this closes '<td' inserted above
      if (js_content[j].hasOwnProperty("time")) {
        content += js_content[j].time;
      }
      
      content += '</td> ' // this closes '<td ... >' already inserted above
      // NOTE: in the string above there's a white space; this is needed for the visualization on
      // small screens, where every td is displayed with "display: inline;"

      content += '<td class = "description_event';
      if (js_content[j].hasOwnProperty("type") && js_content[j].type == "comment") {
        content += ' event_comment';
      }
      content += '">' + js_content[j].description + '</td>'
      content += '</tr>'; // this closes '<tr>' already inserted above
    }

    // Merges the content of the event with the additional infos about the date
    // NOTE: do not remove the white spaces in the strings below: they are needed for the visualization on
    // small screens, where every tr, td and div is displayed with "display: inline;" 
    return ' <tr class = "events_on_given_day">' + 
              '<td class = "date_event">' +
                '<div>' + weekday + '</div> '+
                '<div>' + day + '</div> '+
                '<div>' + month + '</div>' +
              '</td>' +
              '<td class = "text_event">' +
                '<table>' + content + '</table>'+
              '</td>' + 
            '</tr>';
}


// see https://www.w3schools.com/jsref/jsref_findindex.asp 
// The method findIndex() requires as input value a function returning boolean results:
function FindMonthByName(name_month) {
  return name_month == this;
}

function generate_html_with_all_events(input_string) {
  if (input_string != "future" && input_string != "past") {
    console.log('Wrong input parameter: must be either "future" or "past"');
  }
  else {
    var appointments = "";
    var i, splitted_date, day, month, year, month_number, date_considered, comparison_date, weekday, current_string_date;

    for (i = 0; i < events.length; ++i) {

      // converts the date from the format "10 Gennaio 2019" to the format year=2019, month=0 (months start with 0 in JS), day=10
      current_string_date = events[i].date.trim(); // trims white spaces at the beginning and at the end of the string
      current_string_date = current_string_date.replace(/\s\s+/g, ' '); // replaces (multiple) spaces, tabs etc with single spaces
      splitted_date = current_string_date.split(" "); // splits using single spaces as delimiters
      day = splitted_date[0];
      month = splitted_date[1]; // this is a string of the form "Gennaio", etc (see below)
      year = splitted_date[2];
          
      // Note: the next value will be a number between 0 and 11, thus compatible with the way JS handles months (0 = January for Javascript)

      month_number = list_months.findIndex(FindMonthByName, month);

      if (month_number == -1) {
        console.log('Error! Month not found in the list: ' + month);
        console.log(events[i]);
      }

      // starting with the infos about year, month number and date, we create a new date object
      date_considered = new Date(year, month_number, day);

      // we extract the day of the week from the date object
      weekday = list_weekdays[date_considered.getDay()];

      // we set a comparison date
      comparison_date = new Date();  // currenlty it's equal to today, it will be modified below

      if (input_string == "future") {
        comparison_date.setDate(comparison_date.getDate() - 1); // the comparison date is now equal to yesterday

        // we consider only those events that are future events, current events, or events not older that yesterday
        if (date_considered >= comparison_date) {			  
          appointments += generate_html_for_a_given_date(events[i].content, day, month, weekday);
        }
      }
      else { // i.e. if input_string == "past"
        // the comparison date is not modified in this case

        // we consider only those events that are past events
        if (date_considered < comparison_date) {
          // we add events in a reverse order
          appointments = generate_html_for_a_given_date(events[i].content, day, month, weekday) + appointments;
        }
      }
    }
    // attach the content of appointments to the appointments_container already defined in the base HTML code
    var appointments_container = document.getElementById("appointments_container");
    appointments_container.innerHTML = appointments;
  }
}