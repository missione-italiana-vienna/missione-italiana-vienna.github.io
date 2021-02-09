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
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("", {
      templateUrl: "home/home.html",
      title: "Benvenuti!",
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("/contatti/", {
      templateUrl: "contatti/content.html",
      title: "Contatti",
      controller: "myCtrlNotHome" /*,
      reloadOnSearch: false */ })
    .when("/liturgia/", {
      templateUrl: "liturgia/content.html",
      title: "Liturgia",
      controller: "myCtrlNotHome" /*,
      reloadOnSearch: false */ })
    .when("/attivita/", {
      templateUrl: "attivita/content.html",
      title: "Attività",
      controller: "myCtrlNotHome" /*,
      reloadOnSearch: false */ })
    .when("/streaming/", {
      templateUrl: "streaming/content.html",
      title: "Streaming",
      controller: "myCtrlNotHome" /*,
      reloadOnSearch: false */ })
    .when("/streaming/video_precedenti/", {
      templateUrl: "streaming/video_precedenti/content.html",
      title: "Streaming",
      controller: "myCtrlNotHome" /*,
      reloadOnSearch: false */ })    
    .when("/impressum/", {
      templateUrl: "impressum/content.html",
      title: "Impressum",
      controller: "myCtrlNotHome" /*,
      reloadOnSearch: false */ })

      
    .when("/grusswort_des_seelsorgers/", {
      templateUrl: "grusswort_des_seelsorgers/content.html",
      title: "Grußwort des Seelsorgers",
      controller: "myCtrlNotHome" /*,
      reloadOnSearch: false */ })


    .when("/calendario/", {
      templateUrl: "calendario/content.html",
      title: "Calendario",
      controller: "myCtrlNotHome" /*,
      reloadOnSearch: false */ })
        
    // Lectio Divina
    .when("/attivita/lectio_divina/:date", {
      templateUrl: function(params) {
        return "attivita/lectio_divina/" + params.date + "/content.html";
      },
      title: "Lectio Divina",
      controller: "myCtrlNotHome" /*,
      reloadOnSearch: false */ })

    // Blog of the MCI
    .when("/blog/:year/:month/:day/:title", {
      templateUrl: function(params) {
        return "blog/" + params.year + "/" + params.month + "/" + params.day + "/" + params.title + ".html";
      },        
      title: "Blog",
      controller: "myCtrlNotHome"
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
      controller: "myCtrlNotHome"
    })


      

    .otherwise({
      templateUrl: function() {
        return "404.html";
      },
      title: "Pagina non trovata",
      controller : "myCtrlNotHome"
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
        // If a link to the SFB is shared on Facebook, Facebook will add automatically a parameter "fbclid".
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

    $rootScope.$on("$routeChangeSuccess", function(e, current, pre) {

      // Per default there is no fetch_error in every new route.
      // Only if a webWorker is called, and "fetch" is not a function
      // (normally because we are dealing with an old browser)
      // then fetch_error will be "true", thus showing an error message
      // on top of the website
      
      
      // sharedProperties.updateFetchError(false);  // COMMENTED NOW

      // Changes the title of the window based on the attribute "title"
      // that was provided with the current route. If none is provided, we simply omit it.
      // NOTE: a "general title" is always present (on a html/PHP level). In order to
      // separate it from the "specific title" of this page, we need to add a " - " as in
      // the lines below
      if ($route.current.title === undefined || $route.current.title === "") {
        $rootScope.title = "";
      }
      else {
        $rootScope.title = $route.current.title + " - ";        
      }

      // the next 2 lines clean the "global" values of name_person and website_person
      // whenever the route changes. In this way, with every new route, we start from scratch.
      // The next 2 values are ONLY changed in the controller_people IF there is currently
      // exactly one person listed in the given route
      // We need "global" variables in order to bypass a strange behaviour of sharedProperties.cleanValues()
      // in the case when the API cache of a given people is already saved in the local memory
      $rootScope.name_person = "";
      $rootScope.website_person = "";
      
      // Set the canonical link
      var canonical_link = window.location.href;
      /*var link = angular.element("<link>"");
      link.attr("rel", "canonical");
      link.attr("href", canonical_link);
      angular.element("head").append(link);*/
      $rootScope.canonical_link = canonical_link;

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
      // - the url is .../sfb65/#!/
      // - the url is .../sfb65/

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

        // Note: we need to use $location.url() instead of $location.path() 
        // because the first one allows also to set parameters
        // (which is exactly our case: we have a "?", meaning that there are some parameters 
        // that we should not loose while setting the new url),
        // while $location.path() is only a getter and a setter for the path EXCLUDING parameters. 
        // (see https://stackoverflow.com/questions/32633898/location-pathpath-vs-location-urlurl-in-angularjs)

        // If we are in this case, then the current URL with "%3F" will not be correctly 
        // interpreted by the routing system and/or by the various controllers
        // Hence if we continue here, we'll get an error signal that will be sent to the database. 
        // Since however most likely the new url (set above)
        // will not throw any error, then we skip all the code below (that is therefore 
        // surrounded by an else() statement). Only after an error also with
        // the newly updated URL, we would need to send an error message to the database
      }
      // else if (window.location.href.indexOf("%3F") != -1 && window.location.href.indexOf("?") != -1) {
        // in this case we have a link of this form
        //   source_website + #!/public/error/?id=404&request_uri=%2Ftesting_external_errors%2F%3Fid%3D5&par=343
        // that comes from the .htaccess in case of a not-found (404 error) request_uri. 
        // IN THE REQUEST URI there's an additional "%3F" that has NOT TO BE CONVERTED INTO a "?", but has to be left like this
        // (otherwise angular will convert it again to "%3F" since it seems to accept only one "?" in the url)
      // }
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

        // update the $location.url; this forces the app_run to be reloaded. 
        // After that, we will land in the next case because the problem with the ending "=" or "%3D"
        // has been solved (the only case when we land again in
        // this case would be if at the end of the url there are multiples "=" or "%3D" characters)
      }


        // else { // in this case the URL should not contain any string of the form "%3F" 
        // (or it contains strings like that only in the request_uri), and hence the URL should be interpreted correctly by AngularJS
        // (if a correspondence exists in the routes of our AngularJS app)

        /*if ($location.path() !== $location.url()) {
          var temp_url = $location.path();
          $location.path(temp_url);
        }
        see https://stackoverflow.com/questions/11541695/redirecting-to-a-certain-route-based-on-condition */

        var error_template = "public/error/error.php"; // change this line if the position of this file changes on disk
        var redirect_template = "public/redirect/redirect.php"; // change this line if the position of this file changes on disk
        var home_template = "public/home/home.php"; // change this line if the position of this file changes on disk
        
        var source_params = "none";
        var source_url = "";

        var target_url = new_url_after_hashbang.split("?")[0];

        if (target_url === source_website) {
          target_url = source_website_hashbang;
        }

        var target_params = getAllUrlParams(new_url_after_hashbang.split("?")[1]);

        // hack in order to report correctly the data in case of a not-found file or folder
        if (target_url === source_website_hashbang + "public/error/") {
          var temp_id = target_params.id;

          var temp_request_uri = target_params.request_uri.replace("%2f", "/");
          temp_request_uri = temp_request_uri.replace("%3f", "?");
          temp_request_uri = temp_request_uri.replace("%3d", "=");

          for (var property in target_params) {
            if (property !== "id" && property !== "request_uri" && target_params.hasOwnProperty(property)) {
              if (temp_request_uri.indexOf("?") !== -1) {
                temp_request_uri += "&";
              }
              temp_request_uri += property + "=" + target_params[property];
            }
          }

          // we overwrite the previous object target_params
          target_params = {
            "id" : temp_id,
            "request_uri": temp_request_uri
          };
        }
      
        // computes where to scroll the page
        /* var where_to_scroll = "top";

        if (target_url === source_website_hashbang + "public/project_parts/" && 
          target_params.hasOwnProperty("project_part") && !isNaN(target_params.project_part)) {
          where_to_scroll = "still_to_decide";
        }
        else if (target_url === source_website_hashbang + "public/people/" && 
          target_params.hasOwnProperty("id") && !isNaN(target_params.id)) {
          where_to_scroll = "still_to_decide";
        }

        if (where_to_scroll === "still_to_decide") {
          if (target_params.hasOwnProperty("page")) {
            var requested_page = parseInt(target_params.page);
            if (!isNaN(requested_page) && requested_page > 1) {
              where_to_scroll = "start_of_publications";
            }
          }
        }

        if (where_to_scroll === "still_to_decide") {
          where_to_scroll = "top";
        }

        sharedProperties.updateWhereToScroll(where_to_scroll); */

        // sharedProperties.Scroll($routeParams.hasOwnProperty("scroll"));
        sharedProperties.scrollToStart();


        if (typeof pre != "undefined") {
          if (!isEmpty(pre.params)) {
            source_params = pre.params;
          }

          if (pre.loadedTemplateUrl === error_template) {
            source_url = source_website_hashbang + "public/error/";
          }
          else if (pre.loadedTemplateUrl === home_template) {
            source_url = source_website_hashbang;
            // actually: this is the case when source_url is equal to 
            // source_website (without hashbang)
            // We identify the source_url without hashbang with the one with hashbang
            // since the "result" for the user is the same in both cases
          }
          else if (pre.loadedTemplateUrl === redirect_template) {
            source_url = source_website_hashbang + "public/redirect/";
          }
          else {
            source_url = source_website + "#!" + pre.$$route.originalPath;
            // removes all the (optional) parameters at the end of the string
            // Those parameters can be obtained with current.params, see below
          }
        }
        else {
          source_url = "external website";
        }


        /*var target_type = "hashbang";
        if (target_url.indexOf(source_website + "#!") == -1) {
          target_type = "not-hashbang";
        }*/

        // in order to be compliant with the information that we provide about the DSGVO
        // we MUST not log personal data like username, password, email or uuid 
        // (at least in the public area of the SFB website)
        
      if (new_url_after_hashbang !== original_url_after_hashbang) {
        // $location.path(new_path, true);  // true allows reloading of the entire angularJs app (see above)
        $location.url(new_url_after_hashbang);
      }

      
    });
  }]);
  
  app.controller("myCtrlError", ["$scope", "$routeParams", function($scope, $routeParams) {

  // THIS FIRST INSTRUCTION MUST BE USED IN EVERY "PRINCIPAL" CONTROLLER
  // (exceptions: sub-controllers like the one for showing the abstracts of papers; the controller for the menu)
  // sharedProperties.Scroll($routeParams.hasOwnProperty("scroll"));

  if ($routeParams.hasOwnProperty("id") && $routeParams.hasOwnProperty("request_uri")) {
    var number_error = $routeParams.id;

    var temporary_wrong_link = source_website + $routeParams.request_uri;

    for (var property in $routeParams) {
      if (property !== "id" && property !== "request_uri" && $routeParams.hasOwnProperty(property)) {
        temporary_wrong_link += "&" + property + "=" + $routeParams[property];
      }
    }

    $scope.wrong_link = temporary_wrong_link;
    $scope.wrong_link_exists = true;

    if (number_error === 400) {
      $scope.specific_error = "bad request";
    }
    else if (number_error === 401) {
      $scope.specific_error = "unauthorized";
    }
    else if (number_error === 403) {
      $scope.specific_error = "forbidden";
    }
    else if (number_error === 404) {
      $scope.specific_error = "not found";
    }
    else if (number_error === 500) {
      $scope.specific_error = "internal server error";
    }
    else {
      $scope.wrong_link_exists = false;
      $scope.error_message = "Sorry, the link that you clicked is not working or does not exist.";
      $scope.specific_error = "";
    }
  }
  else {
    $scope.wrong_link_exists = false;
    $scope.error_message = "Sorry, the link that you clicked is not working or does not exist.";
    $scope.specific_error = "";
  }
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

app.controller("myCtrlHome", ["$scope", "sharedProperties", function($scope, sharedProperties) {
  $scope.is_homepage = true; 
  // this helps displaying the homepage structure 
  // (instead of the structure for secondary pages)

  // function for adding zeros (padding) on the left of any string
  // There's a simpler way to do this (strpad) but it's not supported on Internet Explorer
  function pad (str, max) {
    str = str.toString();
    if (str.length < max) {
      return pad("0" + str, max);
    }
    else {
      return str;
    }
  }

  function add_news_blocks(id_first_news, id_last_news) {
    // NOTE: i (hence "name_of_file") is decreasing since the most recent news must be shown first 
    for (var i = id_last_news; i >= id_first_news; i--) {
      $("#container_all_news")
        .append('<div class = "col-lg-4 news_col"><div class = "news_item" style = "padding-bottom: 30px;" id = "container_of_news_' + i + '"></div></div>');

      var name_of_file = pad(i, 3);
      $("#container_of_news_" + i).html("Loading...").load("https://mcivienna.org/home/" + name_of_file + ".html");
    }
  }

  sharedProperties.set_links_per_liturgia_del_giorno();
    
  var id_first_news = 1;
  var id_last_news = 14;
  add_news_blocks(id_first_news, id_last_news);

  // in a future version of this app, this object must be loaded from an external file
  // so that it is easier to modify if need be (and we don't risk having the current
  // js file cached by the browser - on the other hand, it is ok if the rest of this file is instead cached)
  var popups = 
  [
    {
      "text": "Informazioni per i nuovi corsi di preparazione al matrimonio e alla cresima per adulti",
      "link": "https://mcivienna.org/blog/2021/01/23/corsi_matrimonio_e_cresima/"
    },
    {
      "text": "Ripresa delle celebrazioni con l'assemblea",
      "link": "https://mcivienna.org/blog/2021/02/05/ripresa_delle_celebrazioni_con_assemblea/"
    }
  ];


  sharedProperties.create_popup_links(popups);

  
}]);

app.controller("myCtrlNotHome", ["$scope", "sharedProperties", function($scope, sharedProperties) {
  // generic (almost) trivial controller

  $scope.is_homepage = false;

  /* $scope.scrollTo = function(id_object) {
    sharedProperties.scrollTo(id_object, 0);
  };*/

  /* loadAllHighResolutionPhotos();

  // THIS FIRST INSTRUCTION MUST BE USED IN EVERY "PRINCIPAL" CONTROLLER
  // (exceptions: sub-controllers like the one for showing the abstracts of papers; the controller for the menu)
  // sharedProperties.Scroll($routeParams.hasOwnProperty("scroll"));

  // We use this controller to load any content that normally does not need additional api requests. Since it's likely that 
  // some LaTeX content is present in the file that we loaded using the routing system, we (re)load MathJax. 
  // We wait a second (just to be sure that everything is correctly loaded) before rendering MathJax content.
  load_MathJax_with_a_delay(1000); */
}]);


app.service("sharedProperties", ["$rootScope", "$sce", "$q", "$httpParamSerializerJQLike", 
function($rootScope, $sce, $q, $httpParamSerializerJQLike) {

  return {
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
    
    set_popup_fontsize: function() {
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
    },

    hide_popup: function() {
      document.getElementById("popup_notification").style.display = "none";
      document.getElementById("popup_interferring_object").style.display = "none";
    },

    set_links_per_liturgia_del_giorno: function() {
      function data_liturgia_del_giorno(mystring) {
        var date = new Date();  // today
        
        if (mystring == "yesterday") {
          date.setDate(date.getDate() - 1);
        }
        else if (mystring == "tomorrow") {
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
    
        var selected_link = document.getElementById(mystring);
        selected_link.innerHTML += " (" + day_name + ", " + dd + "." + mm + "." + yyyy + ")";
        selected_link.href += "?data-liturgia=" + yyyy + mm + dd;
      };

      data_liturgia_del_giorno("yesterday");
      data_liturgia_del_giorno("today");
      data_liturgia_del_giorno("tomorrow");
    },

    create_single_popup_link: function(text, link) {
      var button = document.createElement('button');
      button.className = "popup_notification_button";
      button.innerHTML = text;
      button.onclick = function(){
        location.href = link;
        return false;
      };
      $("#container_custom_popups").append(button);
    },
  
    create_popup_links: function(popups) {
      for (var i = 0; i < popups.length; i++) {
        create_single_popup_link(popups[i].text, popups[i].link);
      }
      if (popups.length > 0) {
        // enable the interferring object and show the popups
        document.getElementById("popup_notification").style.display = "block";
        document.getElementById("popup_interferring_object").style.display = "block"
  
        $(window).resize(set_popup_fontsize);
        $(document).ready(set_popup_fontsize);
      }
    }


  }

}]);
