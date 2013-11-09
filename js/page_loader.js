var original_html = document.documentElement.innerHTML;

$.get(chrome.extension.getURL("/template.html"), function(data){
  document.documentElement.innerHTML = data;

  var script_tag = function(filename){
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(filename);
    return script;
  }

  $("body").append(script_tag("js/lib/angular.js"));

  // janky! later, figure out how to load once angular is loaded
  setTimeout(function(){
    $("body").append(script_tag("js/rainman.js"));
  }, 100);

});

