// store the page HTML in the DOM so we can access it from a script on the page
var oldHTML = $("body").html();

$.get(chrome.extension.getURL("/template.html"), function(data){
  $(document.documentElement).html(data);
  $("#hidden").text(oldHTML);

  var script_tag = function(filename){
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(filename);
    return script;
  }

  var stylesheet_tag = function(filename){
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = chrome.extension.getURL(filename);
    return link;
  }

  $("body").append(stylesheet_tag("rainman.css"));

  $("body").append(script_tag("js/lib/jquery-1.10.2.js"));
  $("body").append(script_tag("js/lib/angular.js"));

  // janky! later, figure out how to load once angular is loaded
  setTimeout(function(){
    $("body").append(script_tag("js/rainman.js"));
  }, 100);

});

