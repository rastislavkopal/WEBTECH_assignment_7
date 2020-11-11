$.ajax({
  url: "js/photos.json",
  type: "GET",
  dataType: "json",
  success: function(data){
    console.log(data);
  },
  error: function(){
      alert("json not found");
  }
});

