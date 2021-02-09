/* This file has been generated from other configuration files in this folder and sub-folders. Please do not modify it directly!

This file contains the configuration files for the AngularJS app (in particular, routing list), and all the controllers of the app */
var source_website = 'https://mcivienna.org/';
var source_website_hashbang = source_website + '#!/';

var app = angular.module("myApp", ["ngSanitize", "ngRoute", "utils.autofocus"]);
  // NOTE: ngLazyLoad was temporarily removed from the list of dependencies 
  // in order to reduce the size of the bundle

  // The order of execution of AngularJS directives is the following 
  // (see http://ruiyuxu-tech.blogspot.com/2015/02/angularjs-execution-order-and-directive.html),
  // hence we will try to mimic it in this file (even if this is strictly speaking not necessary)

  // -- app config (in particular: routing list)
  // -- app run (in particular: message to the monitor api to register 
  //    pairs of source/target webpages on the website of the SFB 65)
  // -- directive setup
  // -- directive compile
  // -- app controller
  // -- directive link
  // ** Data resolve called **
  // -- new route's controller

  // this directive is taken from 
  // https://stackoverflow.com/questions/36259939/angularjs-input-autofocus-with-ng-if-not-working
  // Licence: MIT
  angular.module("utils.autofocus", [])
    .directive("autofocus", ["$timeout", function($timeout) {
      return {
        restrict: "A",
        link : function($scope, $element) {
          $timeout(function() {
            $element[0].focus();
          });
        }
      };
    }]);
  
  app.config(function($routeProvider, $locationProvider) {
    /* $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");

    var mode = {
      enabled: false,
      requireBase: true,
      rewriteLinks: true
    };

    $locationProvider.html5Mode(mode); */
    // https://docs.angularjs.org/guide/$location  (look for rewriteLinks)


    // this is needed to fix the problem of correctly encoding all "/" characters after the hashbang 
    // (even if it is still not clear why this works) 
    // $locationProvider.hashPrefix("!");
    // MAYBE TRY TO USE ALSO
    // https://stackoverflow.com/questions/24764330/location-changes-the-parameter-delimiter

    // In all the code below, the controller myCtrlHome is a generic empty controller
    $routeProvider

    // Each of the various project parts separately

    .when("/", {
      templateUrl: "home/home.html",
      title: "Benvenuti!",
      type_of_controller: "home",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("/home/", {
      templateUrl: "home/home.html",
      title: "Benvenuti!",
      type_of_controller: "home",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("", {
      templateUrl: "home/home.html",
      title: "Benvenuti!",
      type_of_controller: "home",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("/contatti/", {
      templateUrl: "contatti/content.html",
      title: "Contatti",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("/liturgia/", {
      templateUrl: "liturgia/content.html",
      title: "Liturgia",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("/attivita/", {
      templateUrl: "attivita/content.html",
      title: "Attività",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("/streaming/", {
      templateUrl: "streaming/content.html",
      title: "Streaming",
      type_of_controller: "streaming",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("/streaming/video_precedenti/", {
      templateUrl: "streaming/video_precedenti/content.html",
      title: "Streaming",
      type_of_controller: "past_streaming",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })    
    .when("/impressum/", {
      templateUrl: "impressum/content.html",
      title: "Impressum",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })

      
    .when("/grusswort_des_seelsorgers/", {
      templateUrl: "grusswort_des_seelsorgers/content.html",
      title: "Grußwort des Seelsorgers",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })

    .when("/calendario/", {
      templateUrl: "calendario/content.html",
      title: "Calendario",
      type_of_controller: "calendar",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
  

    .when("/calendario/eventi_passati/:year?", {
      templateUrl: function(params) {
        if (params.hasOwnProperty("year") && params.year !== "") {
          return "calendario/eventi_passati/" + params.year + "/content.html";
        }
        else {
          return "calendario/eventi_passati/content.html";
        }
      },
      title: "Calendario",
      type_of_controller: "past_calendar",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
        
    // Lectio Divina
    .when("/attivita/lectio_divina/:date", {
      templateUrl: function(params) {
        return "attivita/lectio_divina/" + params.date + "/content.html";
      },
      title: "Lectio Divina",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })

    // Blog of the MCI
    .when("/blog/:year/:month/:day/:title", {
      templateUrl: function(params) {
        return "blog/" + params.year + "/" + params.month + "/" + params.day + "/" + params.title + ".html";
      },
      title: "Blog",
      controller: "myCtrlHome"
    })

            
    // pages with optional parameters
    .when("/blabla/:page?", {
      templateUrl: function(params) {
        // default value in the case when either the parameter "page" is not provided,
        // or when it does not match one of the values below ("schedule", "location")
        var params_page = "??";
        if (params.hasOwnProperty("page")) {
          params_page = "??";
        }
        return "????" + params_page;
      },        
      title: "??",
      controller: "myCtrlHome"
    })


      

    .otherwise({
      templateUrl: function() {
        return "error.html";
      },
      title: "Pagina non trovata",
      controller : "myCtrlHome"
    });

  });

  app.run(["$route", "$rootScope", "$location", "$routeParams", "$window", "sharedProperties",
  function($route, $rootScope, $location, $routeParams, $window, sharedProperties) {
  
    $rootScope.$on('$routeChangeSuccess', function() {
      var basic_title = "Missione Cattolica Italiana - Arcidiocesi di Vienna";
      if ($route.current.title === undefined) {
        document.title = basic_title;
        sharedProperties.setTypeOfController("basic");
      }
      else {
        document.title = basic_title + " - " + $route.current.title;
        if ($route.current.type_of_controller === undefined) {
          sharedProperties.setTypeOfController("basic");  
        }
        else {
          sharedProperties.setTypeOfController($route.current.type_of_controller);
        }
      }

      if (sharedProperties.getTypeOfController() !== "home") {
        hide_popup();
        // popups must be shown only in the homepage
      }

    });

  }]);
  
  app.controller("myCtrlError", ["$scope", "$routeParams", function($scope, $routeParams) {
  
    // TO DO IF NEED BE

  }]);

app.controller("myCtrlHome", ["$scope", "$rootScope", "$route", "sharedProperties", 
function($scope, $rootScope, $route, sharedProperties) {

  var type_of_controller = sharedProperties.getTypeOfController();
  if (type_of_controller === "home") {
    $scope.is_secondary_page = false;
    // this helps displaying the homepage structure 
    // (instead of the structure for secondary pages)

    sharedProperties.set_links_per_liturgia_del_giorno();
    
    var id_first_news = 1;
    var id_last_news = 14;
    sharedProperties.add_news_blocks(id_first_news, id_last_news);
  
    // in a future version of this app, this object must be loaded from an external file
    // so that it is easier to modify if need be (and we don't risk having the current
    // js file cached by the browser - on the other hand, it is ok if the rest of this file is instead cached)
    var popups = 
    [
      {
        "text": "Informazioni per i nuovi corsi di preparazione al matrimonio e alla cresima per adulti",
        "link": "https://mcivienna.org/#!/blog/2021/01/23/corsi_matrimonio_e_cresima/"
      },
      {
        "text": "Ripresa delle celebrazioni con l'assemblea",
        "link": "https://mcivienna.org/#!/blog/2021/02/05/ripresa_delle_celebrazioni_con_assemblea/"
      }
    ];
  
    sharedProperties.create_popup_links(popups);
  }
  else {
    $scope.is_secondary_page = true;

    // here we must insert the routines for the streaming and for the calendar, again 
    // using the variable type_of_controller

    if (type_of_controller === "calendar") {
      sharedProperties.generate_html_with_all_events("future", "");
    }
    else if (type_of_controller === "past_calendar") {
      if ($route.params.hasOwnProperty("year") && $route.params.year !== "") {
        sharedProperties.generate_html_with_all_events("past", $route.params.year);
      }
      else {
        sharedProperties.generate_html_with_all_events("past", "");
      }
    }
  }




  
}]);

app.service("sharedProperties", ["$rootScope", "$sce", "$http", "$q", "$httpParamSerializerJQLike", 
function($rootScope, $sce, $http, $q, $httpParamSerializerJQLike) {

  var type_of_controller = "";

  var popups_already_created = false;

  // 2 global arrays, used below
  var list_months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

  var list_weekdays = ["Domenica", "Lunedì", "Martedì", 
    "Mercoledì", "Giovedì", "Venerdì", "Sabato"];


  function set_popup_fontsize() {
    var viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var viewport_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    if (viewport_width > 650) {
      viewport_width = 650; // we're only setting a "virtual" viewport. 
      // This is due to the fact that after 650 px the width 
      // of the popup does not increase (see the css file)
    }
    var font_size = viewport_width * viewport_height * 0.000064;
    if (font_size > 14) {
      font_size = 14;
    }

    var popup_notification_p_list = document.getElementsByClassName("popup_notification_p");
    for (var i = 0; i < popup_notification_p_list.length; i++) {
      popup_notification_p_list[i].style.fontSize = font_size + "px";
      popup_notification_p_list[i].style.marginBottom = font_size * 5/14 + "px";
    }
    
    var popup_notification_buttons = document.getElementsByClassName("popup_notification_button");
    for (var i = 0; i < popup_notification_buttons.length; i++) {
      popup_notification_buttons[i].style.fontSize = font_size + "px";
      

      var height_button = 3.4 * font_size;
      if (height_button > 45) {
        height_button = 45;
      }
      popup_notification_buttons[i].style.height = height_button + "px"; 
    }
  };

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
  };

  // see https://www.w3schools.com/jsref/jsref_findindex.asp 
  // The method findIndex() requires as input value a function returning boolean results:
  function FindMonthByName(name_month) {
    return name_month == this;
  };

  function generate_html_with_all_events_after_load(input_string, events) {

    var appointments = "";
    var i, splitted_date, day, month, year, month_number, date_considered, comparison_date, weekday, current_string_date;
    for (i = 0; i < events.length; ++i) {

      // converts the date from the format "10 Gennaio 2019" 
      // to the format year=2019, month=0 (months start with 0 in JS), day=10
      current_string_date = events[i].date.trim(); 
      // trims white spaces at the beginning and at the end of the string
      current_string_date = current_string_date.replace(/\s\s+/g, ' '); 
      // replaces (multiple) spaces, tabs etc with single spaces
      splitted_date = current_string_date.split(" "); 
      // splits using single spaces as delimiters
      day = splitted_date[0];
      month = splitted_date[1]; // this is a string of the form "Gennaio", etc (see below)
      year = splitted_date[2];
          
      // Note: the next value will be a number between 0 and 11, 
      // thus compatible with the way JS handles months (0 = January for Javascript)

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
      comparison_date = new Date();  // currently it's equal to today, it will be modified below

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
  };


  return {
    setTypeOfController(input_type_of_controller) {
      type_of_controller = input_type_of_controller;
    },

    getTypeOfController() {
      return type_of_controller;
    },

    errorMessageForOldBrowsers: function() {
      // code adapted from 
      // https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser/38080051#38080051
      navigator.browserSpecs = (function() {
        var ua = navigator.userAgent, tem, 
          M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
          return {
            name: "IE",
            version: (tem[1] || "")
          };
        }
        if(M[1] === "Chrome"){
          tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
          if( tem != null) return { 
            name: tem[1].replace("OPR", "Opera"),
            version: tem[2]
          };
        }
        M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, "-?"];
        if((tem = ua.match(/version\/(\d+)/i))!= null)
          M.splice(1, 1, tem[1]);
        return {
          name: M[0],
          version: M[1]
        };
      })();
      // console.log(navigator.browserSpecs); // Object { name: "Firefox", version: "42" }

      var browser_name = navigator.browserSpecs.name;
      if (browser_name === "IE") {
        browser_name = "Internet Explorer. In your Windows computer " + 
        "you could use instead the new Microsoft browser called \"Edge\". While some pages of " +
        "this website can still be loaded with Internet Explorer, we strongly advise against using " +
        "Internet Explorer any further. Some details about why Internet Explorer is still available on " +
        "Windows computers, as well as some ideas worth mentioning about our decision to not support this browser " +
        "any further, can be found at <a target = _blank rel = \"noopener\" " + 
        "href = \"https://medium.com/@burger.neal/the-end-of-life-of-internet-explorer-11-12736f9ff75f\">this link</a>";
      }

      return "It seems that your browser is too old (or not recently updated); " + 
        "hence it cannot display or submit some infos. Please consider to update your browser, " + 
        " or to use a different browser in order to see all the relevant information " +
        "on this page. <br><br> It seems that you are currently using version " + 
        navigator.browserSpecs.version + " of the browser " +
        browser_name + ".";
    },
    scrollToStart: function() {
      //scrollIt(0, 300, "easeInOutQuint");

      window.scroll({
        top: 0,
        left: 0,
        behavior: "auto"  // scrolls instantly instead of using a smooth scroll
      });

      /* window.scroll({
        top: 0,
        left: 0,
        behavior: "auto"  // scrolls instantly instead of using a smooth scroll
      }); */
    },
    
    set_links_per_liturgia_del_giorno: function() {
      function data_liturgia_del_giorno(my_string) {
        var date = new Date();  // today
        
        if (my_string == "yesterday") {
          date.setDate(date.getDate() - 1);
        }
        else if (my_string == "tomorrow") {
          date.setDate(date.getDate() + 1);
        }
    
        var list_days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
        var day_name = list_days[date.getDay()];
    
        var dd = date.getDate();
        var mm = date.getMonth() + 1; // January is 0!
        var yyyy = date.getFullYear();
    
        if (dd < 10) {
          dd = "0" + dd
        }
    
        if(mm < 10) {
            mm = "0" + mm
        } 
    
        var selected_link = document.getElementById(my_string);
        selected_link.innerHTML += " (" + day_name + ", " + dd + "." + mm + "." + yyyy + ")";
        selected_link.href += "?data-liturgia=" + yyyy + mm + dd;
      };

      data_liturgia_del_giorno("yesterday");
      data_liturgia_del_giorno("today");
      data_liturgia_del_giorno("tomorrow");
    },

    
    create_popup_links: function(popups) {

      function create_single_popup_link(text, link) {
        var button = document.createElement('button');
        button.className = "popup_notification_button";
        button.innerHTML = text;
        button.onclick = function(){
          location.href = link;
          return false;
        };
        $("#container_custom_popups").append(button);
      };

      if (!popups_already_created) {
        for (var i = 0; i < popups.length; i++) {
          create_single_popup_link(popups[i].text, popups[i].link);
        }
      }

      // popups must be displayed ONLY in the homepage
      if (popups.length > 0 && type_of_controller === "home") {
        // enable the interferring object and show the popups
        document.getElementById("popup_notification").style.display = "block";
        document.getElementById("popup_interferring_object").style.display = "block"
  
        $(window).resize(set_popup_fontsize);
        $(document).ready(set_popup_fontsize);
      }
    },

    add_news_blocks: function(id_first_news, id_last_news) {

      // function for adding zeros (padding) on the left of any string
      // There's a simpler way to do this (strpad) but it's not supported on Internet Explorer
      function pad(str, max) {
        str = str.toString();
        if (str.length < max) {
          return pad("0" + str, max);
        }
        else {
          return str;
        }
      }
      
      // NOTE: i (hence "name_of_file") is decreasing since the most recent news must be shown first 
      for (var i = id_last_news; i >= id_first_news; i--) {
        $("#container_all_news")
          .append('<div class = "col-lg-4 news_col"><div class = "news_item" style = "padding-bottom: 30px;" id = "container_of_news_' + i + '"></div></div>');
  
        var name_of_file = pad(i, 3);
        $("#container_of_news_" + i).html("Loading...").load("https://mcivienna.org/home/" + name_of_file + ".html");
      }
    },

    generate_html_with_all_events: function(input_string, year) {
      var fetch_url;
      if (input_string === "future") {
        fetch_url = "https://mcivienna.org/calendario/eventi.js";
      }
      else if (input_string === "past") {
        if (year === "") {
          fetch_url = "https://mcivienna.org/calendario/eventi.js";
        }
        else {
          fetch_url = "https://mcivienna.org/calendario/eventi_passati/" + year + "eventi.js";
        }
      }
      else {
        console.log('Wrong input parameter: must be either "future" or "past"');
      }

      if (fetch_url !== "") {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var events = JSON.parse(this.responseText);
            generate_html_with_all_events_after_load(input_string, events);
            // TO DO: handle the case when this is not parsable/cannot be loaded.
          }
        };
        xmlhttp.open("GET", fetch_url, true);
        xmlhttp.send();

      }
    }
  }

}]);


function hide_popup() {
  document.getElementById("popup_notification").style.display = "none";
  document.getElementById("popup_interferring_object").style.display = "none";
};
