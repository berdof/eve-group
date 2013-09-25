(function() {
  var Eve;

  Eve = (function() {

    Eve.prototype.errorClass = "error";

    Eve.prototype.eventHandlers = {
      formSubmitClick: function(e) {
        var form, isValid, self;
        self = e.data.self;
        form = $(this).closest("form");
        isValid = self.validate(form);
        if (isValid) {
          self.sendDataAsync(form).done(function(data) {
            form.find(".form__success").fadeIn(350);
          });
        }
        return false;
      },
      hidePopupClick: function(e) {
        $(".modal, .modal-overlay").fadeOut();
      },
      showPopupClick: function(e) {
        var selector;
        selector = $(this).data("modalShow");
        $("" + selector + ", .modal-overlay").fadeIn();
      },
      languageClick: function() {
        $(this).closest("ul").toggleClass("open");
      }
    };

    Eve.prototype.attachEvents = function() {
      var self;
      self = this;
      $(".form input[type=submit]").on('click', {
        self: self
      }, self.eventHandlers.formSubmitClick);
      $(".modal-overlay, .modal__close").on('click', {
        self: self
      }, self.eventHandlers.hidePopupClick);
      $("[data-modal-show]").on('click', {
        self: self
      }, self.eventHandlers.showPopupClick);
      $(".language li").on('click', {
        self: self
      }, self.eventHandlers.languageClick);
    };

    Eve.prototype.validate = function(form) {
      var hasErrors, inputs, self, validateGeneral, validateOnEmail, validateOnEmpty, validateOnPhone;
      hasErrors = 0;
      inputs = form.find("[data-validate]");
      self = this;
      validateGeneral = function(input, flag) {
        if (flag) {
          input["removeClass"](self.errorClass);
        } else {
          hasErrors++;
          input["addClass"](self.errorClass);
        }
      };
      validateOnEmpty = function(input) {
        var inputLength, length;
        length = 2;
        inputLength = input.val().length;
        validateGeneral(input, inputLength >= length);
      };
      validateOnEmail = function(input) {
        var res;
        res = /^([a-zA-Z0-9+_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        validateGeneral(input, res.test(input.val()));
      };
      validateOnPhone = function(input) {
        var regex;
        regex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
        validateGeneral(input, regex.test(input.val()));
      };
      inputs.each(function(i, el) {
        var $el;
        $el = $(el);
        switch ($el.attr("data-validate")) {
          case "empty":
            validateOnEmpty($el);
            break;
          case "email":
            validateOnEmail($el);
            break;
          case "tel":
            validateOnPhone($el);
            break;
          default:
            validateOnEmpty($el);
        }
      });
      return hasErrors === 0;
    };

    /*
      * ajax sending form data
      * @param form - form that needs to send, action attr needed
    */


    Eve.prototype.sendDataAsync = function(form, dataType, showStatusText, actionButton) {
      var data, originText, self, submit, url;
      if (dataType == null) {
        dataType = "text";
      }
      if (showStatusText == null) {
        showStatusText = "Sending ...";
      }
      if (actionButton == null) {
        actionButton = "input[type=submit]";
      }
      data = form.serialize();
      url = form.attr("action");
      submit = form.find(actionButton);
      originText = submit.val();
      submit.val(showStatusText);
      self = this;
      return $.ajax({
        "type": "get",
        "url": url,
        "data": data,
        "dataType": dataType,
        success: function(response) {
          submit.val(originText);
        },
        error: function(err) {
          console.log(err);
          submit.val(originText);
        }
      });
    };

    Eve.prototype.initMainSlider = function() {
      $(".slider").jCarouselLite({
        visible: 1,
        start: 0,
        scroll: 1,
        speed: 600,
        auto: false,
        autoWidth: true,
        responsive: true,
        circular: true,
        btnNext: ".slider__next",
        btnPrev: ".slider__prev"
      });
    };

    Eve.prototype.initBrandsSlider = function() {
      $(".brands-slider").jCarouselLite({
        visible: 11,
        start: 0,
        scroll: 1,
        auto: true,
        speed: 300,
        autoWidth: true,
        responsive: true
      });
    };

    Eve.prototype.initPlaceholder = function() {
      if (!Modernizr.input.placeholder) {
        $("[placeholder]").focus(function() {
          var input;
          input = $(this);
          if (input.val() === input.attr("placeholder")) {
            input.val("");
            return input.removeClass("placeholder");
          }
        }).blur(function() {
          var input;
          input = $(this);
          if (input.val() === "" || input.val() === input.attr("placeholder")) {
            input.addClass("placeholder");
            return input.val(input.attr("placeholder"));
          }
        }).blur();
        $("[placeholder]").parents("form").submit(function() {
          return $(this).find("[placeholder]").each(function() {
            var input;
            input = $(this);
            if (input.val() === input.attr("placeholder")) {
              return input.val("");
            }
          });
        });
      }
    };

    function Eve() {
      var self;
      self = this;
      self.initMainSlider();
      self.initBrandsSlider();
      self.attachEvents();
      self.initPlaceholder();
    }

    return Eve;

  })();

  $(document).ready(function() {
    $.fn.Eve = new Eve;
  });

}).call(this);
