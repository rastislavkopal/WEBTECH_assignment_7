var jsonPhotos;
var listOfImagePaths = "";

$.ajax({
  url: "data/photos.json",
  type: "GET",
  dataType: "json",
  success: function(data){
    jsonPhotos = data;
    document.cookie = jsonPhotos;
    loadPathsFromJson(data);
  },
  error: function(){
      alert("json not found");
  }
});

function loadPathsFromJson(json)
{
  let jsonCookie = getCookie("imagesOrder");
  let pathsOrder = getCookie("imagesOrder").split(":");
  if (jsonCookie != null && jsonCookie != "")
  {
    for(i =0; i < pathsOrder.length; i++)
    {
      let currentObject = jsonPhotos["photos"].find(o => o.src === pathsOrder[i]);
      if (currentObject == null)
        continue;
      if (currentObject["title"].toLowerCase().includes(searchBox.value.toLowerCase()) || currentObject["description"].toLowerCase().includes(searchBox.value.toLowerCase()))
      {
        loadImage(currentObject, "#images-preview");
      }
    }
  } else {
    for(i=0; i < json["photos"].length; i++)
    {
      let obj = json["photos"][i];
      listOfImagePaths += obj["src"] + ":";
      loadImage(obj,"#images-preview");
    }
  }
  setCookie("imagesOrder",listOfImagePaths);
}

function loadImage(obj, target) {
  let path = "/zadanie7/img/" + obj["src"];
  let alt = obj["title"];
  $('<img src="'+ path +'" id="' + obj["src"] +'" class="rounded mx-auto d-bloc img-thumbnail listitemClass" alt="' + alt + '" >').on("load",function() {
    $(this).width(312).height(312).appendTo(target);
  });
}

function search()
{
  let searchBox = document.getElementById("searchBox");
  document.getElementById("images-preview").innerHTML = "";
  let pathsOrder = getCookie("imagesOrder").split(":");

  for(i =0; i < pathsOrder.length; i++)
  {
    let currentObject = jsonPhotos["photos"].find(o => o.src === pathsOrder[i]);
    if (currentObject == null)
      continue;
    if (currentObject["title"].toLowerCase().includes(searchBox.value.toLowerCase()) || currentObject["description"].toLowerCase().includes(searchBox.value.toLowerCase()))
    {
      loadImage(currentObject, "#images-preview");
    }
  }
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

$(function() { 
    $("#images-preview").sortable({ 
    update: function(event, ui) { 
        getIdsOfImages(); 
    }//end update          
    }); 
}); 
  
function getIdsOfImages() { 
    var values = ""; 
    $('.listitemClass').each(function (index) { 
        values += $(this).attr("id") + ":"; 
    }); 
      
    $('#outputvalues').val(values); 
    setCookie("imagesOrder",values);
    console.log(getCookie("imagesOrder"));
} 