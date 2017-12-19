var now = new Date();
var months = new Array('Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember');
var roman = new Array('I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII');
var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
function fourdigits(number) {
  return (number < 1000) ? number + 1900 : number;
}

function print_today() {
  // ***********************************************
  // AUTHOR: WWW.CGISCRIPT.NET, LLC
  // URL: http://www.cgiscript.net
  // Use the script, just leave this message intact.
  // Download your FREE CGI/Perl Scripts today!
  // ( http://www.cgiscript.net/scripts.htm )
  // ***********************************************
  var today = date + " " + months[now.getMonth()] + " " + (fourdigits(now.getYear()));
  return today;
}

function print_invnr() {
  var monthnr = roman[now.getMonth()];

  var invnr = " / " + monthnr + " / " + (fourdigits(now.getYear()));
  return invnr;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function update_total() {
  var total = 0;
  $('.price').each(function(i){
    price = $(this).html().replace(/\D/g,"");
    if (!isNaN(price)) total += Number(price);
  });

  $('#subtotal').html("Rp "+numberWithCommas(total)+",-");
  
  update_balance();
}

function update_balance() {
  var due = Number($("#subtotal").html().replace(/\D/g,"")) + Number($("#ongkir").val().replace(/\D/g,"")) - Number($("#discount").val().replace(/\D/g,""));
  
  $('.due').html("Rp "+numberWithCommas(due)+",-");
}

function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.cost').val().replace(/\D/g,"") * row.find('.qty').val();
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("Rp "+numberWithCommas(price)+",-");
  
  update_total();
}

function bind() {
  $(".cost").blur(update_price);
  $(".qty").blur(update_price);
}

$(document).ready(function() {

  $('input').click(function(){
    $(this).select();
  });

  $("#discount").blur(update_balance);
  $("#ongkir").blur(update_balance);
   
  $("#addrow").click(function(){
    $(".item-row:last").after('<tr class="item-row"><td class="item-code"><div class="delete-wpr"><textarea placeholder="ABCD-123-XY"></textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td><td class="item-name"><textarea placeholder="Nama Barang"></textarea></td><td style="width:10px"><textarea placeholder="0" class="qty"></textarea></td><td><table><tr><td style="padding:0px 5px 0px 0px">Rp </td><td style="padding:0px 0px 0px 0px"><textarea placeholder="0,-" class="cost"></textarea></td></tr></table></td><td><span class="price">Rp 0,-</span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  bind();
  
  $(".delete").live('click',function(){
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });
  
  $("#date").html(print_today());
  
  $("#invnr").html(print_invnr());
  
});