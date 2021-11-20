// This file contains the configuration files for the AngularJS app 
// (in particular, routing list), and all the controllers of the app */
var source_website = 'https://mcivienna.org/';
// var source_website_hashbang = source_website + '#!/';

var app = angular.module("myApp", ["ngSanitize", "ngRoute", "utils.autofocus"]);
  // NOTE: ngLazyLoad was temporarily removed from the list of dependencies 
  // in order to reduce the size of the bundle

  // The order of execution of AngularJS directives is the following 
  // (see http://ruiyuxu-tech.blogspot.com/2015/02/angularjs-execution-order-and-directive.html),
  // hence we will try to mimic it in this file (even if this is strictly speaking not necessary)

  // -- app config (in particular: routing list)
  // -- app run (in particular: message to the monitor API to register
  //    pairs of source/target webpages - 
  //    we do not have a monitor API right now, but could be useful to have one in the future)
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

    .when("/calendario/", {
      templateUrl: "calendario/content.html",
      title: "Calendario",
      type_of_controller: "calendar",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    
      // here the parameter "year" is optional (hence denoted by a "?")
    .when("/calendario/eventi_passati/:year?", {
      templateUrl: function(params) {
        if (params.hasOwnProperty("year") && params.year !== "") {
          return "calendario/eventi_passati/template_anni_passati/content.html";
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
        return "blog/" + params.year + "/" + params.month + "/" + params.day + "/" + params.title + "/content.html";
      },
      title: "Blog",
      controller: "myCtrlHome"
    })
    
    .otherwise({
      templateUrl: function() {
        return "home/home.html";
      },
      title: "Benvenuti!",
      controller : "myCtrlHome"
    });

  });

  app.run(["$route", "$rootScope", "$location", "$routeParams", "$window", "sharedProperties",
  function($route, $rootScope, $location, $routeParams, $window, sharedProperties) {

    // The next function converts a string with parameters 
    // (i.e. all that follows a "?" in an url) to a js object.
    // The code of this function is slightly modified from the one available here:
    //    https://www.sitepoint.com/get-url-parameters-with-javascript/
    function getAllUrlParams(queryString) {
      // we'll store the parameters here
      var obj = {};

      var testing_temporary_object = "";
      testing_temporary_object = "x";

      // if query string exists
      if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split("#")[0];

        // split our query string into its component parts
        var arr = queryString.split("&");

        for (var i = 0; i < arr.length; i++) {
          // separate the keys and the values
          var a = arr[i].split("=");

          // in case params look like: list[]=thing1&list[]=thing2
          var paramNum = undefined;
          var paramName = a[0].replace(/\[\d*\]/, function(v) {
            paramNum = v.slice(1,-1);
            return "";
          });

          // set parameter value (use "not-provided" if empty)
          var paramValue = typeof(a[1]) === "undefined" ? "not-provided" : a[1];

          // (optional) keep case consistent
          paramName = paramName.toLowerCase();

          if (paramValue !== true && paramValue !== false) {
            paramValue = paramValue.toLowerCase();
          }

          // if parameter name already exists
          if (obj[paramName]) {
            // convert value to array (if still string)
            if (typeof obj[paramName] === "string") {
              obj[paramName] = [obj[paramName]];
            }
            // if no array index number specified...
            if (typeof paramNum === "undefined") {
              // put the value on the end of the array
              obj[paramName].push(paramValue);
            }
            // if array index number specified...
            else {
              // put the value at that index number
              obj[paramName][paramNum] = paramValue;
            }
          }
          // if param name doesn't exist yet, set it
          else {
            obj[paramName] = paramValue;
          }
        }
      }
      else {
        obj = "none";
      }
      return obj;
    }

    function isEmpty(map) {
      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }

    function removeQueryParamers(query_string, keys_to_remove) {

      var parameter_object = getAllUrlParams(query_string);

      var new_query_string;

      if (parameter_object === "none") { // see the definition of the function getAllUrlParams(...) above
        new_query_string = "";
      }
      else {
        var i, key;
        for (i = 0; i < keys_to_remove.length; i++) {
          key = keys_to_remove[i];
          if (parameter_object.hasOwnProperty(key)) {
            delete parameter_object[key];
          }
        }
      
        if (!isEmpty(parameter_object)) {
          new_query_string = Object.keys(parameter_object).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(parameter_object[key]);
          }).join('&');
        }
        else {
          new_query_string = "";
        }
      }

      return new_query_string;
    }

    // Some urls (coming from example from a "wrong encoding" in the emails) sometimes are of this form
    //   source_website + "#%21/public/...   (here "%21" is simply an encoding of "!")
    // For some strange reason, AngularJS (or this AngularJS app) does not recognize "%21" as an encoding of "!",
    // and for an even stranger unknown reason, it converts those links automatically in links of this form
    //   source_website + #!#!/public/...
    // or of this form
    //   source_website + #!#%21/public/...
    // thus having a double hashbang block. This link clearly does not match with any of the existing routing, hence
    // the user will be redirected to the page with the default error. The simplest way to solve the problem is
    // to replace the entire "#!#!" (if exists) with "#!". A way to do that is the following:
    
    // Sometimes something similar happens with the character "#" converted to "%23". 
    // Also this case is taken into account below.

    var url_must_be_updated = false;
    var new_url_after_hashbang = "";

    if (window.location.href.indexOf("%23!") !== -1) {        
      new_url_after_hashbang = window.location.href.split("%23!")[1];
      url_must_be_updated = true;
    }
    else if (window.location.href.indexOf("#!#!") !== -1) {        
      new_url_after_hashbang = window.location.href.split("#!#!")[1];
      url_must_be_updated = true;
    }
    else if (window.location.href.indexOf("#!#%21") !== -1) {
      new_url_after_hashbang = window.location.href.split("#!#%21")[1];
      url_must_be_updated = true;
    }
    else if (window.location.href.indexOf("#!") !== -1) {
      new_url_after_hashbang = window.location.href.split("#!")[1];
    }
    else { // In this case actually there's no hashbang.
      new_url_after_hashbang = window.location.href.replace(source_website, "");
      var query_string = new_url_after_hashbang.split("?")[1];
      if (typeof query_string !== "undefined") { 
        // If a link to our webpage is shared on Facebook, Facebook will add automatically a parameter "fbclid".
        // This would be simply ignored if the link shared contains already #!, but in the current case
        // this would generate an error, since the routine below doesn't know what to do with that parameter.
        // So we need to remove that key-value pair from the query string
        var keys_to_remove = ["fbclid"];

        // removes from the query_string all the keys that are listed above
        var new_query_string = removeQueryParamers(query_string, keys_to_remove);
        var proposed_new_url_after_hashbang;

        if (new_query_string === "") {
          proposed_new_url_after_hashbang = "";
        }
        else {
          proposed_new_url_after_hashbang = "?" + new_query_string;
        }

        if (proposed_new_url_after_hashbang !== new_url_after_hashbang) {
          new_url_after_hashbang = proposed_new_url_after_hashbang;
          url_must_be_updated = true;
        }
      }
    }

    // a possible source of extra problems is given by the fact that some webmail services encode characters like
    // "&" in the equivalent version "&amp;", but AngularJS doesn't know how to deal with this. Hence, we
    // have to re-encode all "&amp;" in "&" characters, then update the url in the AngularJS app
    if (typeof new_url_after_hashbang !== "undefined" && new_url_after_hashbang.indexOf("&amp;") !== -1) {
      new_url_after_hashbang = new_url_after_hashbang.replace(/&amp;/g, "&");
      url_must_be_updated = true;
    }

    if (url_must_be_updated) {
      $location.url(new_url_after_hashbang);
    }
    // Note: the lines above are executed ONLY once on the startup of the AngularJS app 
    // (i.e. when the user opens a new tab with a given link, for example)
    // This is the only case when (since the link is "coming from outside") we have to convert URLs as above
    // During the normal run of the application, we can ensure that there are no such "bad encoded links"
    // (because we follow only "internal links")
    // Hence there's no need to implement the same routine above also below on the call of
    // $rootScope.$on("$routeChangeSuccess", ...)

    // The next 10 lines are taken from https://www.consolelog.io/angularjs-change-path-without-reloading/
    // even if probably we are not going to use them. They allow to change the current path 
    // (without additional parameters!!; if we wanted to change/set also parameters, we would need 
    // to use $location.url())
    // without firing the reload of the entire AngularJS application
    var original = $location.path;
    $location.path = function (path, reload) {
      if (reload === false) {
        var lastRoute = $route.current;
        var un = $rootScope.$on("$locationChangeSuccess", 
          function () { 
            $route.current = lastRoute;
            un();
          });
      }
      return original.apply($location, [path]);
    };
    // the function above is used for example in the login controller 
    // (this helps retaining the additional optional parameter "requested_uri", 
    // but removing it from the url in order to keep the url "cleaner")

  
    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {

      closeMenu();

      // Per default there is no fetch_error in every new route.
      // Only if a webWorker is called, and "fetch" is not a function
      // (normally because we are dealing with an old browser)
      // then fetch_error will be "true", thus showing an error message
      // on top of the website
      sharedProperties.updateFetchError(false);

      // Set the canonical link
      $rootScope.canonical_link = window.location.href;

      if (window.location.href.indexOf("#!") === -1 ) {
        $location.path("", true);  // "true" reloads the entire AngularApp
        // After this, however, the window.location.href ends with "#!/"
        // as we want
      }
      else {
        var original_url_after_hashbang = window.location.href.split("#!")[1];
        // we expect the value above to be starting with "/"
        // (since all our local paths are of the form "#!/...")

        // if however the path does not contain "#!/" (this should only be the case of the landing homepage)
        // then the variable defined above will be undefined (because the .split() gives rise to an array with only a 0th object)
        // Hence:

        if (typeof original_url_after_hashbang === "undefined") {
          original_url_after_hashbang = "/";
        }

        // Therefore we get the same result, namely the string "/" in the following 2 cases:
        // - the url is https://mcivienna.org/#!/
        // - the url is https://mcivienna.org/

        var new_url_after_hashbang = original_url_after_hashbang;

        // Sometimes some crawlers (or, it seems, links coming from Google Calendar), have the following form:
        //   source_website + #!%2Fpublic%2Fevents%2Fdetails%2F%3Ftype=1&id=129
        // (i.e. special characters of urls are encoded) instead of the "correct" form, namely in this case
        //   source_website + #!/public/events/details/?type=1&id=129
        // Actually, "/" are taken care of correctly by AngularJS. Only the encoding "%3F" for "?" is not correctly decoded
        // Hence, whenever we find such a string, we need to replace it with "?", and update the url. Since the url in AngularJS
        // consists of ONLY everything following the string "#!", then we have to split in two parts the
        // variable window.location.href (containing the complete URL), and take only the second part. In that second part,
        // we replace "%3F" with "?" then we set the new url (using $location.url(), which is at the same time a getter and a setter).
        // To do that:

        if (new_url_after_hashbang.indexOf("%3F") !== -1 && new_url_after_hashbang.indexOf("?") === -1) {
          // In this case we have normally a link of the form
          //   source_website + #!%2Fpublic%2Fevents%2Fdetails%2F%3Ftype=1&id=129
          // where the substring "%3F" must be converted in "?"

          new_url_after_hashbang = new_url_after_hashbang.replace("%3F", "?");
        }

        
        if (new_url_after_hashbang.endsWith("=") || new_url_after_hashbang.endsWith("%3D")) {
          // Some incoming links show sometimes an ending "=" sign, or its equivalent html encoding "%3D". 
          // This is not treated correctly by the AngularJS App, so we have to remove such characters.
          // url_after_hashbang = window.location.href.split("#!")[1];
          if (new_url_after_hashbang.endsWith("=")) {

            new_url_after_hashbang = new_url_after_hashbang.slice(0, -1);
          }
          else { // in this case we are dealing with a "%3D" at the end of the string
            new_url_after_hashbang = new_url_after_hashbang.slice(0, -3);
          }
        }


        if (new_url_after_hashbang !== original_url_after_hashbang) {
          // $location.path(new_path, true);  // true allows reloading of the entire angularJs app
          $location.url(new_url_after_hashbang);
        }
      }


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
        // popups must be shown only in the homepage, hence we hide them in all other "types"
        // of controllers (actually, there's just a single controller
        // with various sub-cases taking care of various scenarios)
        hide_popup();
      }

      if (window.location.href.indexOf("#!/blog/") === -1) {
        sharedProperties.setShowBlogHeader(false);
      }
      else {
        sharedProperties.setShowBlogHeader(true);
      }

      window.scroll({
        top: 0,
        left: 0,
        behavior: "auto"  // scrolls instantly instead of using a smooth scroll
      });

    });

  }]);
  
  app.controller("myCtrlError", ["$scope", "$routeParams", function($scope, $routeParams) {
  
    // TO DO IF NEED BE

  }]);

  app.controller("myCtrlErrorFetch", ["$scope", "$sce", "sharedProperties", function($scope, $sce, sharedProperties) {
    $scope.error_message = "";
  
    $scope.$watch(
      function()       { return sharedProperties.getFetchError(); },
      function(newVal) { 
        if (newVal) { 
          $scope.error_message = "old_browser_not_supported"; 
          $scope.error_long_message = $sce.trustAsHtml(sharedProperties.errorMessageForOldBrowsers()); 
        }
        else {
          $scope.error_message = "";
          $scope.error_long_message = "";
        }
      },
      true);
  
  }]); 

app.controller("myCtrlHome", ["$scope", "$rootScope", "$route", "sharedProperties", 
function($scope, $rootScope, $route, sharedProperties) {

  $scope.$watch(
    function()       { 
      return sharedProperties.getTypeOfController(); 
    }, 
    function(newVal) { 
      if (newVal === "home") {
        $scope.is_secondary_page = false;
      }
      else {
        $scope.is_secondary_page = true;
        // the next instruction ensures that the parallax routine
        // is called correctly when changing route
        // (per default it is executed only once on load of the page,
        // without the next instruction if we land on the homepage and 
        // we navigate to secondary pages, the parallax object would not be shown)
        $('.parallax-window').parallax({imageSrc: 'https://mcivienna.org/images/common_images/church_interior.jpg'});
      }
    },
    true);

  $scope.$watch(
    function()       { 
      return sharedProperties.getShowBlogHeader(); 
    }, 
    function(newVal) {
      $scope.show_blog_header = newVal;
    },
    true);



  var type_of_controller = sharedProperties.getTypeOfController();
  if (type_of_controller === "home") {
    // this helps displaying the homepage structure 
    // (instead of the structure for secondary pages)

    sharedProperties.set_links_per_liturgia_del_giorno();
    
    sharedProperties.include_all_news();

    sharedProperties.include_all_popups();
  }
  else {
    // here we must insert the routines for the streaming and for the calendar, again 
    // using the variable type_of_controller

    if (type_of_controller === "calendar") {
      sharedProperties.generate_html_with_all_events("future", "");
    }
    else if (type_of_controller === "past_calendar") {
      if ($route.current.params.hasOwnProperty("year") && $route.current.params.year !== "") {
        sharedProperties.generate_html_with_all_events("past", $route.current.params.year);
      }
      else {
        sharedProperties.generate_html_with_all_events("past", "");
      }
    }
    else if (type_of_controller == "streaming" || type_of_controller == "past_streaming") {

      var num_skipped = 0;
      if (type_of_controller == "past_streaming") {
        num_skipped = 7; // this should be the same value of the variable max_length
      }

      sharedProperties.insert_streaming_videos(num_skipped);
           
    }
  }

}]);


app.controller("myCtrlBlogHeader", ["$scope", "$rootScope", "$route", "sharedProperties", 
function($scope, $rootScope, $route, sharedProperties) {

  $scope.$watch(
    function()       { 
      return sharedProperties.getBlogTitle(); 
    }, 
    function(newVal) {
      $scope.blog_title = newVal;
    },
    true);
  
  $scope.$watch(
    function()       { 
      return sharedProperties.getBlogDate(); 
    }, 
    function(newVal) {
      $scope.blog_date = newVal;
    },
    true);

}]);


app.controller("myCtrlBlog", ["$scope", "$rootScope", "$route", "sharedProperties", 
function($scope, $rootScope, $route, sharedProperties) {

  $scope.set_title_and_date = function(blog_title, blog_date) {
    sharedProperties.setBlogTitle(blog_title);
    sharedProperties.setBlogDate(blog_date);

    // sharedProperties.setShowBlogHeader(true);
  };

}]);

app.service("sharedProperties", ["$rootScope", "$sce", "$http", "$q", "$httpParamSerializerJQLike", 
function($rootScope, $sce, $http, $q, $httpParamSerializerJQLike) {

  var type_of_controller = "";

  var popups_already_created = false;

  var fetch_error = false;

  var show_blog_header = false;

  var blog_title = "";

  var blog_date = "";

  // 2 global arrays, used below
  var list_months = 
    ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

  var list_weekdays = 
    ["Domenica", "Lunedì", "Martedì", 
    "Mercoledì", "Giovedì", "Venerdì", "Sabato"];


  

  function set_popup_fontsize() {
    // var viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var viewport_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    /* if (viewport_width > 650) {
      viewport_width = 650; 
      // we're only setting a "virtual" viewport. 
      // This is due to the fact that after 650 px the width 
      // of the popup does not increase (see the css file)
    }
    var font_size = viewport_width * viewport_height * 0.000064;
    font_size = Math.round(font_size);
    if (font_size > 14) {
      font_size = 14;
    }*/

    var font_size = 16;

    var popup_notification_p_list = document.getElementsByClassName("popup_notification_p");
    for (var i = 0; i < popup_notification_p_list.length; i++) {
      popup_notification_p_list[i].style.fontSize = font_size + "px";
      popup_notification_p_list[i].style.marginBottom = font_size * 5/14 + "px";
    }
    
    var popup_notification_buttons = document.getElementsByClassName("popup_notification_button");
    
    var must_reduce_font_size = true;
    var last_id_button = popup_notification_buttons.length - 1;
    var firstPopup = document.getElementById('popup_notification_button_0');
    var lastPopup = document.getElementById('popup_notification_button_' + last_id_button);

    var total_height_popups;

    while (must_reduce_font_size) {
      for (var i = 0; i < popup_notification_buttons.length; i++) {
        popup_notification_buttons[i].style.visibility = "hidden";
        popup_notification_buttons[i].style.fontSize = font_size + "px";
        popup_notification_buttons[i].style.padding = font_size + "px";
      }

      var firstPopup = document.getElementById('popup_notification_button_0');
      var lastPopup = document.getElementById('popup_notification_button_' + last_id_button);
  
      // This includes also the white spaces between popups
      total_height_popups = lastPopup.getBoundingClientRect().bottom - firstPopup.getBoundingClientRect().top;
      
      // The multiplication by 0.8 is needed in order to account 
      // also for some white space before the first popup and after the last one
      // (there are more precise methods to do this, but for our purposes this is more than enough)
      if (total_height_popups > viewport_height * 0.8) {
        font_size--;
      }
      else {
        must_reduce_font_size = false;
        for (var i = 0; i < popup_notification_buttons.length; i++) {
          popup_notification_buttons[i].style.visibility = "visible";
        }
      }
    }
  }

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
      
      content += '</td> '; // this closes '<td ... >' already inserted above
      // NOTE: in the string above there's a white space; this is needed for the visualization on
      // small screens, where every td is displayed with "display: inline;"

      content += '<td class = "description_event';
      if (js_content[j].hasOwnProperty("type") && js_content[j].type == "comment") {
        content += ' event_comment';
      }
      content += '">' + js_content[j].description + '</td>';
      content += '</tr>'; // this closes '<tr>' already inserted above
    }

    // Merges the content of the event with the additional infos about the date
    // NOTE: do not remove the white spaces in the strings below: they are needed for the visualization on
    // small screens, where every tr, td and div is displayed with "display: inline;" 
    return '<tr class = "events_on_given_day">' + 
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
      else { // i.e. if input_string == "past_current_year" or input_string == "past_previous_year"
        // the comparison date is not modified in this case
        // we consider only those events that are past events
        if (date_considered < comparison_date) {
          if (input_string === "past_current_year") {
            // we add events in a reverse order
            appointments = generate_html_for_a_given_date(events[i].content, day, month, weekday) + appointments;
          }
          else if (input_string === "past_previous_year") {
            // we add in chronological order
            appointments += generate_html_for_a_given_date(events[i].content, day, month, weekday);
          }
          else {
            console.log("Error, not a valid string!");
          }
        }
      }
    }
    // attach the content of appointments to the appointments_container already defined in the base HTML code
    var appointments_container = document.getElementById("appointments_container");
    appointments_container.innerHTML = appointments;
  }

  // All the code below for the youtube videos has been heavily modified from 
  // https://codegena.com/auto-embed-latest-video-youtube-channel/
  
  // This function inserts in the DOM a <div> containing an <iframe> with src given by the parameter my_source
  function prepareFrame(parameters) {
    var name_of_container = parameters.container;
    var first_part_of_youtube_links = parameters.first_part_of_youtube_links;
    var my_video_id = parameters.video_id;
    var my_title = parameters.video_title;

    // The code below selects the unique <div> with id = "channel-container" 
    // (already in the source of the HTML, hence in the original DOM). To this document we will append below:
    // - a <div class = "video-title"> containing the title of the video
    // - a <div class = "video-container"> containing the <iframe> containing the video
    var channel_container = document.getElementById(name_of_container);

    if (typeof my_title !== "undefined" && my_title !== "") {
      // The code below creates a <div> with the title of the current video
      var video_title = document.createElement("div");
      video_title.setAttribute("class","video-title");
      video_title.innerHTML = my_title;
      // We append this <div> to the channel container
      channel_container.appendChild(video_title);
    }

    // The code below creates an iframe as follows:
    //   <iframe src = "...." frameborder = "0" allow = "accelerometer; autoplay;
    //   encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    // where "src" is defined as in the lines below
    var ifrm = document.createElement("iframe");

    ifrm.setAttribute("src", first_part_of_youtube_links + my_video_id + "?controls=1&autoplay=0");
    ifrm.setAttribute("frameborder","0");
    ifrm.setAttribute("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
    ifrm.setAttribute("allowfullscreen","");

    // The code below creates a <div> having a class of "video-container", 
    // and appends the previous iframe to that object
    var video_container = document.createElement("div");
    video_container.setAttribute("class","video-container");
    video_container.appendChild(ifrm);        
    video_container.id = "video_container_" + my_video_id;

    // The code below appends the video container to the channel container
    channel_container.appendChild(video_container);
  }


  // This function destroys a previously created container 
  // for a video (created using the previous function)
  function destroyVideoContainer(my_video_id) {
    var my_video_container = document.getElementById("video_container_" + my_video_id);
    my_video_container.parentNode.removeChild(my_video_container);
  }


  // This function returns the date of today in austrian forma (dd.mm.yyyy)
  function get_date_of_today_in_austrian_format() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return dd + '.' + mm + '.' + yyyy;
    // NOTE: we ignored for the moment the problem of offsets due to different timezones.
    // This is not a big problem since there's just one stream 
    // per day, so even some hours of delay do not cause problems.
  }


  // This function displays the link to the youtube channel. 
  // To be used only if there's no video to display in the upper
  // part of the screen, neither a link to a currently streaming video
  function display_link_to_youtube_channel() {
    var link_to_the_youtube_channel = document.getElementById("link-to-the-youtube-channel");
    if (link_to_the_youtube_channel !== null) {
      link_to_the_youtube_channel.style.display = "block";
    }
  }


  function insert_API_videos(parameters) {
    var API_data = parameters.API_data;
    var max_length = parameters.max_length;
    var first_part_of_youtube_links = parameters.first_part_of_youtube_links;
    var number_additional_videos = parameters.number_additional_videos;
    var video_id_of_last_stream = parameters.video_id_of_last_stream;
    var date_of_last_stream = parameters.date_of_last_stream;
    var last_stream_is_embeddable = parameters.last_stream_is_embeddable;
    var num_skipped = parameters.num_skipped;

    var today = get_date_of_today_in_austrian_format();

    var API_first_link = API_data[0].link;
    var API_first_youtube_id = API_first_link.substr(API_first_link.indexOf("=") + 1); 

    if (date_of_last_stream !== today && API_first_youtube_id !== video_id_of_last_stream) {
      // Remove this object that had been temporarily put in the lower part of the webpage
      destroyVideoContainer(video_id_of_last_stream);
      // Recreate it again at the very beginning of the webpage 
      // (for a reason for that, see the comments above)
      if (last_stream_is_embeddable) {
        prepareFrame({
          container: "channel-container-first-video",
          first_part_of_youtube_links: first_part_of_youtube_links, 
          video_id: video_id_of_last_stream,
          video_title: ""
        });
      }
    }

    var max_length_for_the_cycle;
    if (API_data.length < max_length + num_skipped) {
      max_length_for_the_cycle = API_data.length;
    }
    else {
      max_length_for_the_cycle = max_length + num_skipped;
      if (API_data.length + number_additional_videos > max_length_for_the_cycle) {
        document.getElementById("more-videos").style.display = "block";
      }
    }
    var link, i, video_id;

    // Replaces each link with only the id of the youtube video
    // assuming that each link provided by the API 
    // has the form   https://www.youtube.com/watch?v=....
    // with no additional query parameters after "v=..."
    for (i = num_skipped; i < max_length_for_the_cycle; i++) {
      link = API_data[i].link;
      video_id = link.substr(link.indexOf("=") + 1); 
  
      if (video_id != video_id_of_last_stream) {          
        prepareFrame({
          container: "channel-container", 
          first_part_of_youtube_links: first_part_of_youtube_links, 
          video_id: video_id,
          video_title: API_data[i].title
        });
      }
    }
  }

  // This function gets the list of all videoIDs 
  // of a given channel (up to a fixed maximum)
  // and puts those videos in the webpage (at most one 
  // at the beginning of the page, if it's embeddable, otherwise just a link,
  // all the others are added at the end of the file)
  function findAndInsertYoutubeVideos(additional_parameters, num_skipped) {

    var parameters = {
      // the next parameter ensures that we embed a version of each video with no cookies
      first_part_of_youtube_links_with_no_cookies: "https://www.youtube-nocookie.com/embed/",
      // initial part of links pointing to the external videos directly played on youtube
      first_part_of_youtube_links: "https://www.youtube.com/watch?v=",
      // channel id of the Missione Cattolica Italiana a Vienna on youtube
      cid_youtube_channel: "UCKAeLh4BIb8bTVnWn4OsqCg",
      // we limit the previous code to 7 videos, otherwise the page loads very slowly
      max_length: 7,

      // A request to the API below with channel_id given 
      // by the ID of a youtube channel (see below) 
      // returns a JSON similar to the one in the next lines 
      // (the XML API of youtube returns a xml file, 
      // further converted to json by api.rss2json.com ):

      // {"status":"ok","feed":{"url":"https://www.youtube.com/feeds/videos.xml?channel_id=UCKAeLh4BIb8bTVnWn4OsqCg","title":"Missione Italiana Cattolica a Vienna","link":"https://www.youtube.com/channel/UCKAeLh4BIb8bTVnWn4OsqCg","author":"Missione Italiana Cattolica a Vienna","description":"","image":""},"items":[.....]}

      // NOTE: the field "items" is the one we are interested in. 
      // It will contain a list of objects, each with the following structure:

      // {"title":"....","pubDate":"....","link":"....","guid":"....","author":"....", "thumbnail":"....","description":"....","content":"....","enclosure":{"link":"....","type":"....","thumbnail":"...."},"categories":[]}

      // For each such object, for the current application 
      // we are only interested in the field "link"
      // Such field will be added to the corresponding <iframe>, 
      // so that we can load the corresponding video

      // Complete example of the structure of the response of the API 
      // (actually, this is what we are loading for the current webpage, 
      // since we only load videos from the youtube webpage of 
      // Missione Cattolica Italiana a Vienna):
      // see the following link:
      // https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCBJycsmduvYEL83R_U4JriQ
      API_link: "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=")
    };

    parameters.video_id_of_last_stream = additional_parameters.video_id_of_last_stream;
    parameters.last_stream_is_embeddable = additional_parameters.last_stream_is_embeddable;
    parameters.date_of_last_stream = additional_parameters.date_of_last_stream;

    var first_part_of_youtube_links_with_no_cookies = parameters.first_part_of_youtube_links_with_no_cookies;
    var first_part_of_youtube_links = parameters.first_part_of_youtube_links;
    var cid_youtube_channel = parameters.cid_youtube_channel;
    var max_length = parameters.max_length;
    var API_link = parameters.API_link;
    var video_id_of_last_stream = parameters.video_id_of_last_stream;
    var last_stream_is_embeddable = parameters.last_stream_is_embeddable;
    var date_of_last_stream = parameters.date_of_last_stream;

    var number_additional_videos = 0;
    var today = get_date_of_today_in_austrian_format();

    if (video_id_of_last_stream !== "undefined" && video_id_of_last_stream !== "" && num_skipped == 0) {
      if (date_of_last_stream === today) {
        if (last_stream_is_embeddable) {
          prepareFrame({
            container: "channel-container-first-video", 
            first_part_of_youtube_links: first_part_of_youtube_links_with_no_cookies, 
            video_id: video_id_of_last_stream,
            video_title: ""
          });
        }
        else {
          var link_to_the_video_of_today = document.getElementById("link-to-the-video-of-today");
          link_to_the_video_of_today.setAttribute("href", first_part_of_youtube_links + video_id_of_last_stream);
          var container_of_the_link_to_the_video_of_today = 
            document.getElementById("container-of-the-link-to-the-video-of-today");
          container_of_the_link_to_the_video_of_today.style.display = "block";
        }
      }
      else {
        // In this case the video could have been created yesterday 
        // (and already set as embeddable from studio.youtube.com).
        // Nonetheless, we already experienced several times that 
        // the video is added to the channel only almost one day after
        // (although the direct link works, it is not listed on 
        // the channel - we have no idea why).
        // In this case, it would make sense to
        // - per default (in the lines below), decide to add it to 
        //   the list of videos shown at the end of the file
        // - but ONLY in the special case when the video does not appear 
        //   in the API response, put it at the beginning of the
        //   webpage (in this way everyone can find it easily 
        //   if it is not listed in our youtube channel yet).
        //   This special case will be dealt with a bit below, 
        //   after having parsed the API response.
        display_link_to_youtube_channel();
        
        prepareFrame({
          container: "channel-container", 
          first_part_of_youtube_links: first_part_of_youtube_links_with_no_cookies, 
          video_id: video_id_of_last_stream,
          video_title: ""
        });
      }
    }
    else {
      display_link_to_youtube_channel();
    }

    $.getJSON( API_link + cid_youtube_channel,
      function(API_data) {
        // the video_id_of_last_stream is passed as parameter 
        // so that it will be ignored if found in the API_data
        insert_API_videos({
          API_data: API_data.items,
          max_length: max_length,
          first_part_of_youtube_links: first_part_of_youtube_links_with_no_cookies,
          number_additional_videos: number_additional_videos,
          video_id_of_last_stream: video_id_of_last_stream,
          last_stream_is_embeddable: last_stream_is_embeddable,
          date_of_last_stream: date_of_last_stream,
          num_skipped: num_skipped
        });
      }
    );
  }

  function add_news_blocks(id_first_news, id_last_news) {

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
  }

  function create_popup_links(popups) {

    function create_single_popup_link(text, link, action, id) {
      var button = document.createElement('button');
      button.className = "popup_notification_button";
      button.innerHTML = text;
      button.id = "popup_notification_button_" + id;
      if (action === "none") {
        button.onclick = function(){
          location.href = link;
          return false;
        };
      }
      else {
        button.onclick = action;
      }
      $("#container_custom_popups").append(button);
    }

    if (!popups_already_created && $popups.length > 0) {
      // NOTE: we create popups (and add the next one) only if the list of popups contains some elements
      popups.push({
        "text": "Continua con la navigazione nel sito",
        "link": "",
        "action": hide_popup
      }); // add a last popup button for hiding all the popups

      for (var i = 0; i < popups.length; i++) {
        if (!popups[i].action) {
          popups[i].action = "none";
        }
        create_single_popup_link(popups[i].text, popups[i].link, popups[i].action, i);
      }
      popups_already_created = true;
    }

    // popups must be displayed ONLY in the homepage
    if (popups.length > 1 && type_of_controller === "home") {
      // enable the interfering object and show the popups
      document.getElementById("popup_notification").style.display = "block";
      document.getElementById("popup_interfering_object").style.display = "block";

      $(window).resize(set_popup_fontsize);
      $(document).ready(set_popup_fontsize);
    }
  }

  // return objects (sharedProperties that are accessible to every controller)
  return {
    insert_streaming_videos: function(num_skipped) {
      var fetch_url_news = "https://mcivienna.org/streaming/details_of_last_video.js";
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var video_parameters = JSON.parse(this.responseText);
          findAndInsertYoutubeVideos(video_parameters, num_skipped);
          // TO DO: handle the case when this is not parsable/cannot be loaded.
        }
      };
      xmlhttp.open("GET", fetch_url_news, true);
      xmlhttp.send();
    },

    include_all_popups: function() {
      var fetch_url_popups = "https://mcivienna.org/home/popups.js";
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {  
        if (this.readyState == 4 && this.status == 200) {
          try {
            var popups = JSON.parse(this.responseText);
            create_popup_links(popups);
          }
          catch(e) {
            hide_popup();
            console.log(e); // error message only in the console if the JSON file cannot be parsed
          }
        }
        else {
          hide_popup();
        }
      };
      xmlhttp.open("GET", fetch_url_popups, true);
      xmlhttp.send();  
    },

    include_all_news: function() {
      var fetch_url_news = "https://mcivienna.org/home/news.js";
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var news = JSON.parse(this.responseText);
          add_news_blocks(news.id_first_news, news.id_last_news);
          // TO DO: handle the case when this is not parsable/cannot be loaded.
        }
      };
      xmlhttp.open("GET", fetch_url_news, true);
      xmlhttp.send();
    },

    getFetchError: function() {
      return fetch_error;
    },

    updateFetchError: function(value) {
      if (fetch_error !== value) {
        fetch_error = value;
        return true;
      }
    },

    

    setTypeOfController(input_type_of_controller) {
      type_of_controller = input_type_of_controller;
    },

    getTypeOfController() {
      return type_of_controller;
    },

    setShowBlogHeader(input_show_blog_header) {
      show_blog_header = input_show_blog_header;
      blog_title = "";
      blog_date = "";
    },
    getShowBlogHeader() {
      return show_blog_header;
    },

    setBlogTitle(input_blog_title) {
      blog_title = input_blog_title;
    },
    getBlogTitle() {
      return blog_title;
    },

    setBlogDate(input_blog_date) {
      blog_date = input_blog_date;
    },
    getBlogDate() {
      return blog_date;
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

      var browser_name = navigator.browserSpecs.name;
      if (browser_name === "IE") {
        browser_name = "Internet Explorer. Sul vostro computer Windows " + 
        "potete usare invece il nuovo browser Microsoft chiamato \"Edge\". Anche se alcune pagine di " +
        "questo sto possono essere comunque visualizzate usando Internet Explorer, vi consigliamo caldamente di non usare " +
        "più Internet Explorer per ragioni di sicurezza e di performance. Alcune ragioni per la nostra decisione di sconsigliare " +
        "l'uso di Internet Explorer si possono trovare a <a target = _blank rel = \"noopener\" " + 
        "href = \"https://medium.com/@burger.neal/the-end-of-life-of-internet-explorer-11-12736f9ff75f\">questo link</a> (in inglese).";
      }

      return "Sembra che il tuo browser sia troppo vecchio (o non aggiornato recentemente); " + 
        "quindi non può mostrare correttamente parte di questo sito. Ti consigliamo di aggiornarlo o " + 
        "di usare un altro browser per vedere le informazioni di questa pagina. " +
        "<br><br>Sembra che tu stia usando la versione " + 
        navigator.browserSpecs.version + " del browser " +
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
          dd = "0" + dd;
        }
    
        if(mm < 10) {
            mm = "0" + mm;
        } 
    
        var selected_link = document.getElementById(my_string);
        selected_link.innerHTML += " (" + day_name + ", " + dd + "." + mm + "." + yyyy + ")";
        selected_link.href += "?data-liturgia=" + yyyy + mm + dd;
      }

      data_liturgia_del_giorno("yesterday");
      data_liturgia_del_giorno("today");
      data_liturgia_del_giorno("tomorrow");      var date_now = Date.now();
    },    

    generate_html_with_all_events: function(input_string, year) {

      
      var fetch_url;
      if (input_string === "future") {
        fetch_url = "https://mcivienna.org/calendario/eventi.js";
      }
      else if (input_string === "past") {
        if (year === "") {
          fetch_url = "https://mcivienna.org/calendario/eventi.js";
          input_string = "past_current_year";
        }
        else {
          fetch_url = "https://mcivienna.org/calendario/eventi_passati/eventi_" + year + ".js";
          input_string = "past_previous_year";
          document.getElementById("calendar_year_identifier_1").innerHTML = year;
          document.getElementById("calendar_year_identifier_2").innerHTML = year;
        }
      }
      else {
        console.log('Wrong input parameter: must be either "future" or "past"');
      }

      if (fetch_url !== "") {
        var date_now = Date.now();
        fetch_url += "?" + date_now; // this allows to force this file to be reloaded instead of cached by the browser

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
  };

}]);

// the next functions and variables are outside the Angular app since 
// they are used also outside that app. In addition, they cannot be
// part of the next block ("custom.js"), because of closure 
// (the next block exists only on ready() )
function hide_popup() {
  document.getElementById("popup_notification").style.display = "none";
  document.getElementById("popup_interfering_object").style.display = "none";
}

var menuActive = false;

function closeMenu()
{
  $('.menu').removeClass('active');
  menuActive = false;
}

function openMenu()
{
  $('.menu').addClass('active');
  menuActive = true;
}

/* Almost all the next code was originally in the file called custom.js
in the original template from Colorlib */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Home Slider
4. Init Header Search
5. Init Menu
6. Init Causes Slider
7. Init Timer


******************************/

$(document).ready(function()
{
  "use strict";

  /* 

  1. Vars and Inits

  */

  var header = $('.header');
  var hamb = $('.hamburger');
  var menu = $('.menu');

  setHeader();

  $(window).on('resize', function()
  {
    setHeader();
  });

  $(document).on('scroll', function()
  {
    setHeader();
  });

  initHomeSlider();
  initHeaderSearch();
  initMenu();
  initCausesSlider();
  initTimer();

  /* 

  2. Set Header

  */

  function setHeader()
  {
    if($(window).scrollTop() > 100)
    {
      header.addClass('scrolled');
    }
    else
    {
      header.removeClass('scrolled');
    }
  }

  /* 

  3. Init Home Slider

  */

  function initHomeSlider()
  {
    if($('.home_slider').length)
    {
      var homeSlider = $('.home_slider');
      // Initialize Slider
      homeSlider.owlCarousel(
      {
        items:1,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:false,
        loop:true,
        nav:false,
        dots:false,
        smartSpeed:1200
      });

      // Handle next navigation button
      if($('.home_slider_nav').length)
      {
        $('.home_slider_nav').on('click', function()
        {
          homeSlider.trigger('next.owl.carousel');
        });
      }
    }
  }

  /* 

  4. Init Header Search

  */

  function initHeaderSearch()
  {
    if($('.search').length)
    {
      $('.search').on('click', function()
      {
        if($('.header_search_container').length)
        {
          $('.header_search_container').toggleClass('active');
        }
      });
    }
  }

  /* 

  5. Init Menu

  */

  function initMenu()
  {
    if(hamb.length)
    {
      if(menu.length)
      {
        hamb.on('click', function()
        {
          if(menuActive)
          {
            closeMenu();
          }
          else
          {
            openMenu();
          }
        });	

        $('.menu_close').on('click', function()
        {
          if(menuActive)
          {
            closeMenu();
          }
          else
          {
            openMenu();
          }
        });
      }
    }
  }



  /* 

  6. Init Causes Slider

  */

  function initCausesSlider()
  {
    if($('.causes_slider').length)
    {
      var causesSlider = $('.causes_slider');
      causesSlider.owlCarousel(
      {
        loop:true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:false,
        dots:false,
        nav:false,
        margin:30,
        smartSpeed:1200,
        responsive:
        {
          0:
          {
            items:1
          },
          991:
          {
            items:2
          },
          1199:
          {
            items:4
          }
        }
      });

      if($('.causes_slider_prev').length)
      {
        $('.causes_slider_prev').on('click', function()
        {
          causesSlider.trigger('prev.owl.carousel');
        });
      }

      if($('.causes_slider_next').length)
      {
        $('.causes_slider_next').on('click', function()
        {
          causesSlider.trigger('next.owl.carousel');
        });
      }
    }
  }

  /* 

  7. Init Timer

  */

  function initTimer()
  {
    if($('.timer').length)
    {
      // Uncomment line below and replace date
      // var target_date = new Date("April 7, 2018").getTime();

      // comment lines below
      var date = new Date();
      date.setDate(date.getDate() + 3);
      var target_date = date.getTime();
      //----------------------------------------
   
      // variables for time units
      var days, hours, minutes, seconds;

      var d = $('#day');
      var h = $('#hour');
      var m = $('#minute');
      var s = $('#second');

      setInterval(function ()
      {
        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;
      
        // do some time calculations
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
          
        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
          
        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);

        // display result
        d.text(days);
        h.text(hours);
        m.text(minutes);
        s.text(seconds); 
       
      }, 1000);
    }	
  }

});