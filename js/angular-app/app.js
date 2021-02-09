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
    .when("/home/", {
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
      controller: "myCtrlHome" /*,
      reloadOnSearch: false */ })
    .when("/streaming/video_precedenti/", {
      templateUrl: "streaming/video_precedenti/content.html",
      title: "Streaming",
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
        return "404.html";
      },
      title: "Pagina non trovata",
      controller : "myCtrlHome"
    });

  });

  app.run(["$route", "$rootScope", "$location", "$routeParams", "$window", "sharedProperties",
  function($route, $rootScope, $location, $routeParams, $window, sharedProperties) {
  
    $rootScope.$on('$routeChangeSuccess', function() {
      document.title = $route.current.title;
    });

  }]);
  
  app.controller("myCtrlError", ["$scope", "$routeParams", function($scope, $routeParams) {
  
    //

  }]);

app.controller("myCtrlHome", ["$scope", "$rootScope", "$route", "sharedProperties", 
function($scope, $rootScope, $route, sharedProperties) {

  if ($route.current.title === "Benvenuti!") {
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
        "link": "https://mcivienna.org/blog/2021/01/23/corsi_matrimonio_e_cresima/"
      },
      {
        "text": "Ripresa delle celebrazioni con l'assemblea",
        "link": "https://mcivienna.org/blog/2021/02/05/ripresa_delle_celebrazioni_con_assemblea/"
      }
    ];
  
  
    sharedProperties.create_popup_links(popups);
  }
  else {
    $scope.is_secondary_page = true;

    // here we must insert the routines for the streaming and for the calendar, again targeting
    // the $route.current.title variable
  }




  
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
    }


  }

}]);
