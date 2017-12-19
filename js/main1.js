var now = new Date();
var months = new Array('Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember');
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
  var monthnr = ((now.getMonth()<10) ? "0" : "") + (now.getMonth()+1);

  var invnr = " / " + monthnr + " / " + (fourdigits(now.getYear()));
  return invnr;
}

// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your puRp oses)
}

function update_total() {
  var total = 0;
  $('.price').each(function(i){
    price = $(this).html().replace("Rp ","");
    if (!isNaN(price)) total += Number(price);
  });

  total = roundNumber(total,2);
  var ongkir = Number($("#ongkir").val().replace("Rp ",""));
  ongkir = roundNumber(ongkir,2);
  
  var subtotal = Number(total) + Number(ongkir);
  subtotal = roundNumber(subtotal,2);

  $('#subtotal').html("Rp "+subtotal);
  
  update_balance();
}

function update_balance() {
  var due = Number($("#subtotal").html().replace("Rp ","")) - Number($("#discount").val().replace("Rp ",""));
  due = roundNumber(due,2);
  
  $('.due').html("Rp "+due);
}

function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.cost').val().replace("Rp ","") * row.find('.qty').val();
  price = roundNumber(price,2);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("Rp "+price);
  
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
  $("#ongkir").blur(update_total);
   
  $("#addrow").click(function(){
    $(".item-row:last").after('<tr class="item-row"><td class="item-code"><div class="delete-wpr"><textarea placeholder="ABCD-123-XY"></textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td><td class="item-name"><textarea placeholder="Nama Barang"></textarea></td><td style="width:10px"><textarea placeholder="0" class="qty"></textarea></td><td><table><tr><td style="padding:0px 5px 0px 0px">Rp </td><td style="padding:0px 0px 0px 0px"><textarea placeholder="0.00" class="cost"></textarea></td></tr></table></td><td><span class="price">Rp 0.00</span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  bind();
  
  $(".delete").live('click',function(){
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });
  
  $("#cancel-logo").click(function(){
    $("#logo").removeClass('edit');
  });
  $("#delete-logo").click(function(){
    $("#logo").remove();
  });
  $("#change-logo").click(function(){
    $("#logo").addClass('edit');
    $("#imageloc").val($("#image").attr('src'));
    $("#image").select();
  });
  $("#save-logo").click(function(){
    $("#image").attr('src',$("#imageloc").val());
    $("#logo").removeClass('edit');
  });
  
  $("#date").html(print_today());
  
  $("#invnr").html(print_invnr());
  
});