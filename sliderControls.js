import $ from "jquery";

export const startSlider = () => {
    let beatMs = 60000/(131/2);

    var slider = $("#slider");
    var curSlide = $("li.slide.current");
    var glitchLine = $("<div id='glitchline'><img></div>") /*.appendTo(slider)*/;
    var imgUrl = curSlide.find("img").attr("src");
    var glitchImg = glitchLine.find("img");
    glitchImg.attr("src", imgUrl);
    var ttop = Math.round(Math.random() * (slider.height() - glitchLine.height()));
    glitchLine.css("top", ttop);
    glitchImg.css("margin-top", -ttop + "px");
    glitchLine.appendTo(slider);
    var glitchMoveInt;
    var glitchInt = setInterval(function() {
      if (glitchMoveInt) clearInterval(glitchMoveInt);
      var top = Math.round(Math.random() * (slider.height() - glitchLine.height()));
      glitchLine.css("top", top);
      glitchImg.css("margin-top", -top + "px");
      glitchLine.toggleClass("glitchlineColored");
      glitchMoveInt = setInterval(function() {
        var leftMove = Math.round(Math.random() * 20 - 10);
        var top = glitchLine.css("top");
        glitchImg.css({
          marginLeft: leftMove + "px",
          marginTop: -parseInt(top) + "px"
        });
      }, beatMs/4);
    }, beatMs*2);
    /* Glitch for slider - end code */
    
    /* Slide change */
    let slideInterval = setInterval(nextSlide, beatMs*8);
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
      $("#slideClip").show();
      setTimeout(function() {
        $("#slideClip").hide();
      }, beatMs/2); //beatMs represents the duration of slide noise clip
    }
    return slideInterval;
}
