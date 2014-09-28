
if (!Array.indexOf) {
  Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0); i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  }
}


jQuery(document).ready(function(){


    var access_token = "";
    var keyWord = "";
    var keyWrod2 = ""
    var getUrl = "";
    var counts = 0;
    var timers = "";
    datas = "";

	
	jQuery("#tagsumbit").on("click",function(){
	    
        jQuery(".images img").remove();

	    access_token = jQuery("#access_token").val();
	    keyWord = jQuery("#tagname").val();
	    keyWord = keyWord.replace(/ +/g,'');
	    keyWrod2 = jQuery("#tagname2").val();
	    getUrl = "https://api.instagram.com/v1/tags/" + keyWord + "/media/recent?access_token=" + access_token;
	    counts = 0;
	    getMedia();
	    
	})
	
	function getMedia(){

		clearTimeout(timers);

        jQuery.ajax({
        
            url : getUrl,
            type : "get",
            dataType : "jsonp",
            data : {
            
                "access_token" : access_token
            
            },
            success : function(data){
            
                datas = data;

                jQuery.each(data.data,function(i){
                
                    types = (this.type);
                    //console.log(this.tags);
                    jQuery(".searching").text(this.tags);
                    
                    if(types == 'image' && (this.tags.indexOf(keyWrod2) > -1 || keyWrod2 == "")){
                        
                        
                        jQuery(".images").prepend("<span class='imgLayer'><img src='" + this.images.low_resolution.url + "' style='display:none' onLoad='jQuery(this).fadeIn(300)' lowImg='" + this.images.low_resolution.url + "' standImg=" + this.images.standard_resolution.url + "></span>\n\n");
                        counts++;
                        
                        console.log(this.tags);
                        
                    }
                
                
                })
            
            },
            complete : function(){
            

                jQuery(".images img").off();
                /*
                jQuery(".images img").on("click",function(){
                    var o = jQuery(this);
                    if(o.attr("src") == o.attr("lowImg")){
                        o.attr("src",o.attr("standImg"));
                        o.css("position","absolute");
                        o.css("zIndex","99999");

                    }else{
                        o.attr("src",o.attr("lowImg"));
                        o.css("position","relative");
                        o.css("zIndex","");
                    }
                });
                */
                
                getUrl = datas.pagination.next_url;

                
                if(counts < 50 && getUrl != undefined){
                	timers = setTimeout(getMedia(),3000);
                }
                
            
            }
        })

	}


	jQuery("#tagsumbit").click();

})