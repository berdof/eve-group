
class Eve
  errorClass:"error"
  eventHandlers:
    formSubmitClick:(e)->
      self = e.data.self
      form = $(@).closest("form")
      isValid = self.validate(form)
      if isValid
        self.sendDataAsync(form).done(
          (data)->
            form.find(".form__success").fadeIn(350)
            return
        )
      return false
    hidePopupClick:(e)->
      $(".modal, .modal-overlay").fadeOut()
      return
    showPopupClick:(e)->
      selector = $(@).data("modalShow")
      $("#{selector}, .modal-overlay").fadeIn()
      return
    languageClick:()->
      $(@).closest("ul").toggleClass("open")
      return
  attachEvents: ->
    self = this
    $(".form input[type=submit]").on('click',{self:self} , self.eventHandlers.formSubmitClick)
    $(".modal-overlay, .modal__close").on('click',{self:self} , self.eventHandlers.hidePopupClick)
    $("[data-modal-show]").on('click',{self:self} , self.eventHandlers.showPopupClick)
    $(".language li").on('click',{self:self} , self.eventHandlers.languageClick)
    return

  validate:(form)->
    hasErrors = 0 # if it equals to 0 => no errors
    inputs = form.find("[data-validate]");
    self = @

    validateGeneral = (input,flag)->
      if flag
        input["removeClass"](self.errorClass)
      else
        hasErrors++;
        input["addClass"](self.errorClass)
      return

    validateOnEmpty = (input)->
      length = 2
      inputLength = input.val().length;
      validateGeneral(input,inputLength >= length)
      return

    validateOnEmail = (input)->
      res = /^([a-zA-Z0-9+_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      validateGeneral(input,  res.test(input.val()))
      return;

    validateOnPhone = (input)->
      regex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
      validateGeneral(input,  regex.test(input.val()))
      return;

    inputs.each(
      (i,el)->
        $el = $(el)
        switch $el.attr("data-validate")
          when "empty"
            validateOnEmpty($el)
          when "email"
            validateOnEmail($el)
          when "tel"
            validateOnPhone($el)
          else
            validateOnEmpty($el)
        return
    )
    return hasErrors is 0

  ###
  * ajax sending form data
  * @param form - form that needs to send, action attr needed
  ###
  sendDataAsync:(form,dataType="text",showStatusText = "Sending ...",actionButton = "input[type=submit]")->
    data = form.serialize()
    url = form.attr("action");
    submit = form.find(actionButton);
    originText = submit.val()
    submit.val(showStatusText)
    self = @
    $.ajax(
      "type": "get"
      "url":url
      "data":data
      "dataType":dataType,
      success:(response)->
        submit.val(originText)
        return
      error:(err)->
        console.log err
        submit.val(originText)
        return
    )

  initMainSlider:()->
    $(".slider").jCarouselLite({
      visible: 1
      start: 0
      scroll:1
      speed:600
      auto:off
      autoWidth:true
      responsive:true
      circular:false
      btnNext: ".slider__next"
      btnPrev: ".slider__prev"
      afterEnd:()->
        index = $(".slider__in li.active").index()
        length = $(".slider__in li").length - 1
        console.log index
        console.log length
        $(".slider__prev")[if index is 0 then "fadeOut" else "fadeIn"](1)
        $(".slider__next")[if index is length then "fadeOut" else "fadeIn"](1)
        return
    })
    return

  initBrandsSlider:()->
    $(".brands-slider").jCarouselLite({
      visible: 11
      start: 0
      scroll:1
      auto:on
      speed:300
      autoWidth:true
      responsive:true
    })
    return


  initPlaceholder:()->
    unless Modernizr.input.placeholder
      $("[placeholder]").focus(->
        input = $(this)
        if input.val() is input.attr("placeholder")
          input.val ""
          input.removeClass "placeholder"
      ).blur(->
        input = $(this)
        if input.val() is "" or input.val() is input.attr("placeholder")
          input.addClass "placeholder"
          input.val input.attr("placeholder")
      ).blur()
      $("[placeholder]").parents("form").submit ->
        $(this).find("[placeholder]").each ->
          input = $(this)
          input.val ""  if input.val() is input.attr("placeholder")
    return



  constructor: ()->
    self = this
    self.initMainSlider()
    self.initBrandsSlider()
    self.attachEvents()
    self.initPlaceholder()


$(document).ready(
  ()->
    $.fn.Eve = new Eve
    return
)
