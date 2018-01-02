    //Animation
    __.prototype.animate = function (cssValues, timeout, callback) {
      let duration = 200 / 1000,
       sectionalTimeout = timeout / duration
      const that = this
      const anime = (function R(callback) {
        let that =  this,
         repeat = true
        that.forEach(function (node) {
          for (var key in cssValues)
            //node.style[key] += (cssValues[key] / duration)
            node.style[key] = cssValues[key]
            repeat = node.style[key] != cssValues[key] 
        })
        if(repeat)
          setTimeout(R.bind(that,callback), 0)
        else
          callback()
      })
      anime.call(this,callback)
      return this;
    };