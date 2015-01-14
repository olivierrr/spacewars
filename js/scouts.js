var vehicles = {
	list :{
		"scout":{
			name:"scout",
			pixelWidth:80,
			pixelHeight:80,
			pixelOffsetX:0,
			pixelOffsetY:0,
			radius:15,
			speed: 30,
			sight:8,
			cost:200,
			hitPoints: 50,
			turnSpeed: 5,
			spriteImages:[
				{name:"stand",count:1, directions:12}
			],
		}
	},
	defaults:{
		type:"vehicles",
		animationIndex:0,
		direction:0,
		action:"stand",
		orders:{type:"stand"},
		selected:false,
		selectable:true,
		directions: 12,
		animate:function(){
			if (this.life>this.hitPoints*0.4){
				this.lifeCode = "healthy";
			} else if (this.life <= 0){
				this.lifeCode = "dead";
				game.remove(this);
				return;
			} else {
				this.lifeCode = "damaged";
			}

			switch(this.action){
				case "stand":
					var direction = this.direction;
					this.imageList = this.spriteArray["stand-"+direction];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex++;
					if (this.animationIndex>=this.imageList.count){
						this.animationIndex = 0;
					}
	
				break;
			}
		},
		draw:function(){
			var x = (this.x*game.gridSize)-game.offsetX-this.pixelOffsetX;
			var y = (this.y*game.gridSize)-game.offsetY-this.pixelOffsetY;
			var colorIndex = ( this.team == "red")?0:1;
			var colorOffset = colorIndex*this.pixelHeight;
			game.foregroundContext.drawImage(this.spriteSheet, this.imageOffset*this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight, x, y, this.pixelWidth, this.pixelHeight);
		},

	},
	load:loadItem,
	add:addItem,
}