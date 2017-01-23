function type(obj){

	if(obj == null){
		return new String(obj);
	}

	return object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}

export{type};