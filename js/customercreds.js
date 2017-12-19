$("#customer-title, #customer-title1").on("change keyup", function(){
  $("textarea").not($(this)).val($(this).val());
});