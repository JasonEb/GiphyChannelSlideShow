import $ from 'jquery';

export const initializeShow = (bpm = 120) => {
    stopShow();
    let beatMs = 60000/(bpm);

    var slider = $("#slider");
    var curSlide = $("li.slides.current");
    var glitchLine = $("<div id='glitchline'><img></div>") /*.appendTo(slider)*/;
    var imgUrl = curSlide.find("img").attr("src");
    var glitchImg = glitchLine.find("img");
    glitchImg.attr("src", imgUrl);
    var ttop = Math.round(Math.random() * (curSlide.height() - glitchLine.height()));
    glitchLine.css("top", ttop + "px");
    glitchImg.css("margin-top", -ttop + "px");
    // glitchLine.appendTo(slider);
    var glitchMoveInt;
    // var glitchInt = setInterval(function() {
    //   if (glitchMoveInt) {
    //       clearInterval(glitchMoveInt)
    //   };
    //   // replace with redux
    //   window.intervals.push(glitchInt);
    //   //
    //   var top = Math.round(Math.random() * (50));
    //   glitchLine.css("top", top + "vh");
    //   glitchImg.css("margin-top", -top + "px");
    //   glitchLine.toggleClass("glitchlineColored");
    //   glitchMoveInt = setInterval(function() {
    //     var leftMove = Math.round(Math.random() * 2);
    //     var top = glitchLine.css("top");
    //     glitchImg.css({
    //       marginLeft: leftMove + "px",
    //       marginTop: -parseInt(top) + "px"
    //     });
    //   }, beatMs);
    // }, beatMs*8);
    /* Glitch for slider - end code */
    
    /* Slide change */
    // let slideId = setInterval(nextSlide, beatMs*8);
    // window.intervals.push(slideId);

    function nextSlide() {
      var curSlide = $(".slides li.current");
      //console.log(curSlide);
      var nxtSlide = curSlide.next();
      if (nxtSlide.length === 0) {
        nxtSlide = $(".slides li:first");
      }
      curSlide.removeClass("current");
      nxtSlide.addClass("current");
      glitchImg.attr("src", nxtSlide.find("img").attr("src"));
      // $("#slideClip").show()
      // setTimeout(function() {
      //   $("#slideClip").hide()
      // }, beatMs); //beatMs represents the duration of slide noise clip
    }
}

export const stopShow = () => {
    let {intervals} = window
    intervals.forEach((int)=>{
        clearInterval(int);
    })
    
    $("#glitchline").remove()

    window.intervals = [];
}