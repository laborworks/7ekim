/**
 * Created by csburak on 11/09/16.
 */

(function () {
  var ready = function () {

    // @TODO @Kemal buranın konfigrasyonunu sana saldım.
    if (screen.width <= 768) {
      window.location = "http://localhost:8001/mobile";
    }

    // Smooth scroll
    $('a[*|href^="#"]').on('click',function (e) {
      var options = { speed: 2000, easing: 'easeOutCubic' };
      var target = $(this).attr("xlink:href") || $(this).attr("href");
      var trigger = $(this).find('g:first').attr('id') || $(this).attr('id');
      e.preventDefault();

      smoothScroll.animateScroll(
        document.querySelector(target),
        document.querySelector(trigger),
        options
      );
    });
    //

    var modalWedding = $("#modal_wedding");
    // On Modal close clear content.
    $('.modal').on('hidden.bs.modal', function(e) {
      $(this).removeData();
      $(this).find('.modal-content').attr('class', "modal-content");
    });

    // Objects
    var links = {
      balloon: {
        id: "balloon",
        class: "_yellow",
        content: "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.174484118697!2d29.03670595134497!3d40.97765997920232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab87dcdc0d231%3A0x4b21db200bfa4289!2zS2FsYW3EscWfIFBheXNhZ2U!5e0!3m2!1str!2str!4v1472972432208' " +
        "width='100%' " +
        "height='420' " +
        "frameborder='0' " +
        "style='border:0' " +
        "allowfullscreen></iframe>",
        link_title: "Nerede?",
        header: "<i class='fa fa-compass'></i> Nerede?"
      },
      sun: {
        id: "sun",
        class: "_red",
        content: "<h1 class='text-center'>07 Ekim 2016 <br> Cuma</h1>" +
        "<div id='countdown_wedding'></div>",
        link_title: "Ne Zaman?",
        header: "<i class='fa fa-calendar-times-o'></i> Ne Zaman?"
      }
    };

    $('[data-toggle="tooltip"]').tooltip();

    $("g > path").hover(function() {
      var parentID = this.parentNode.id;
      var svg_object = document.getElementById(parentID); // or other selector like querySelector()
      var rect = svg_object.getBoundingClientRect();
      var ratioX = $("#" + parentID).offset().left / $(window).width();
      var ratioY = $("#" + parentID).offset().top / $(window).height();
      var newText = document.createElementNS("http://www.w3.org/2000/svg","text");
      var textNode;
      newText.setAttributeNS(null,"font-size", "4rem");
      newText.setAttributeNS(null, "id", "active_text");
      newText.setAttributeNS(null,"x",($("#" + parentID).offset().left * ratioX) + (rect.width / 2));
      newText.setAttributeNS(null,"y",($("#" + parentID).offset().top * ratioY) + 50 + (rect.height / 2));
      textNode = document.createTextNode(links[parentID].link_title);
      newText.appendChild(textNode);
      document.getElementById(parentID).appendChild(newText);
      return parentID;
    }, function () {
      $("#active_text").remove();
    });

    // SVG object click action controller
    $("g > path").click(function (e) {
      var _id = this.parentNode.id;
      // Link hover text creator
      $("#"+_id).click(function (e) {
        modalWedding.find('.modal-header').html(links[_id].header);
        modalWedding.find("#content_area").html(links[_id].content);
        $("#countdown_wedding").countdown("2016/10/07", function(event) {
          $(this).text(
            event.strftime('%D days %H:%M:%S')
          );
        });
        $(".modal-content").removeClass(!"modal-content").addClass(links[_id].class);
        modalWedding.modal('show');
      });
    });
    //
  }
  $(document).on('ready', ready);
  $(document).on('page:load', ready);
  //
}());