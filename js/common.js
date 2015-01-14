    //if the item sprite array has already been load the do not do it again
// Setup requestAnimationFrame and cancelAnimationFrame for use in the game code
(function() {
    var lastTime = 0;
    var vendors = ['ms', ';', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var loader = {
    loaded:true,
    loadedCount:0, // Assets that have been loaded so far
    totalCount:0, // Total number of assets that need to be loaded
    
    init:function(){
        // check for sound support
        var FORMATS = ['audio/mpeg', 'audio/ogg; codecs="vorbis'];
        loader.soundFileExtn = FORMATS.filter(supported)[0];
        function supported(str) {
            var audio = document.createElement('audio');
            // Currently canPlayType() returns: "", "maybe" or "probably" 
            return audio.canPlayType && ("" != audio.canPlayType(str));
        }
    },
    loadImage:function(url){
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var image = new Image();
        image.src = url;
        image.onload = loader.itemLoaded;
        return image;
    },
    soundFileExtn:".ogg",
    loadSound:function(){
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var audio = new Audio();
        audio.src = url+loader.soundFileExtn;
        image.onload = loader.itemLoaded;
        return image;   
    },
    itemLoaded:function(){
        loader.loadedCount++;
        $('#loadingmessage').html('Loaded '+loader.loadedCount+' of '+loader.totalCount);
        if (loader.loadedCount === loader.totalCount){
            loader.loaded = true;
            //alert('hiding');
            $('#loadingscreen').hide();
            if(loader.onload){
                loader.onload();
                loader.onload = undefined;
            }
           
        }
    }
}

//The default load() method used by all our game entities

function loadItem(name){
    var item = this.list[name];
    if(item.spriteArray){
        return;
    }
    item.spriteSheet = loader.loadImage('img/'+name+'_small.png');
    item.spriteArray = [];
    item.spriteCount = 0;
    
    for(var i=0; i<item.spriteImages.length; i++){
        var constructImageCount = item.spriteImages[i].count;
        var constructDirectionCount = item.spriteImages[i].directions;
        if(constructDirectionCount){
            for (var j = 0; j < constructDirectionCount; j++){
                var constructImageName = item.spriteImages[i].name +"-"+j;
                console.log(constructImageName);
                item.spriteArray[constructImageName] = {
                    name: constructImageName,
                    count:constructImageCount,
                    offset: item.spriteCount
                };
                item.spriteCount += constructImageCount;
            };
        }else{
            var constructImageName = item.spriteImages[i].name;
            item.spriteArray[constructImageName] = {
                name:constructImageName,
                count: constructImageCount,
                offset:item.spriteCount
            };
            
            item.spriteCount += constructImageCount;
        };
        
    };
    console.log(item);
}

//The default add() method use by all our game entities
function addItem(details){
    var item={},
        name = details.name;
        $.extend(item,this.defaults);
        $.extend(item,this.list[name]);
        item.life = item.hitPoints;
        $.extend(item,details);
        return item;
};
