var original_html = document.documentElement.innerHTML;

$.get(chrome.extension.getURL("/template.html"), function(data){
  document.documentElement.innerHTML = data;
});