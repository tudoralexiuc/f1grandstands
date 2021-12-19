
var shopcart = [];
$(document).ready(function() {
    outputCart();
    $(".productItem").click(function(e) {
        e.preventDefault();
        var iteminfo = $(this.dataset)[0];
        iteminfo.qty = 1;
        var itemincart = false;
        $.each(shopcart, function(index, value) {
            //console.log(index + '  ' + value.id);
            if (value.id == iteminfo.id) {
                value.qty = parseInt(value.qty) + parseInt(iteminfo.qty);
                itemincart = true;
            }
        })
        if (!itemincart) {
            shopcart.push(iteminfo);
        }
        sessionStorage["sca"] = JSON.stringify(shopcart);
        outputCart();
        ///
    })

    function outputCart() {
        if (sessionStorage["sca"] != null) {
            shopcart = JSON.parse(sessionStorage["sca"].toString());
            console.log(sessionStorage["sca"]);
            $('#checkoutdiv').show();
        }
        var holderHTML = '';
        var total = 0;
        var itemCnt = 0;
        $.each(shopcart, function(index, value) {
            console.log(value);
            var stotal = value.qty * value.price;
            total += stotal;
            itemCnt += parseInt(value.qty);
            holderHTML += '<tr><td>' + value.qty + '</td><td>' + ' ' + value.name + '' + '</td><td> ' + formatMoney(value.price) + ' </td><td class="text-xs-right"> ' + formatMoney(stotal) + '</td></tr>';
        })
        holderHTML += '<tr><td colspan="3" class="text-xs-right">Total</td><td class="text-xs-right">' + formatMoney(total) + '</td></tr>';
        $('#output').html(holderHTML);
        $('.total').html(formatMoney(total));
        $('.items').html(itemCnt);
    }

    function formatMoney(n) {
        return '🏆' + (n);
    }
})





// Shopping cart animation

function popUp1() {
    var popup = document.getElementById("myPopup1");
    popup.classList.toggle("show");
  }

function popUp2() {
    var popup = document.getElementById("myPopup2");
    popup.classList.toggle("show");
  }

function popUp3() {
    var popup = document.getElementById("myPopup3");
    popup.classList.toggle("show");
  }

  function popUp4() {
    var popup = document.getElementById("myPopup4");
    popup.classList.toggle("show");
  }

  function popUp5() {
    var popup = document.getElementById("myPopup5");
    popup.classList.toggle("show");
  }

  function popUp6() {
    var popup = document.getElementById("myPopup6");
    popup.classList.toggle("show");
  }

function popUp7() {
    var popup = document.getElementById("myPopup7");
    popup.classList.toggle("show");
  }

  function popUp8() {
    var popup = document.getElementById("myPopup8");
    popup.classList.toggle("show");
  }

  function popUp9() {
    var popup = document.getElementById("myPopup9");
    popup.classList.toggle("show");
  }

  function popUp10() {
    var popup = document.getElementById("myPopup10");
    popup.classList.toggle("show");
  }

function popUp11() {
    var popup = document.getElementById("myPopup11");
    popup.classList.toggle("show");
  }

  function popUp12() {
    var popup = document.getElementById("myPopup12");
    popup.classList.toggle("show");
  }

  function popUp13() {
    var popup = document.getElementById("myPopup13");
    popup.classList.toggle("show");
  }

  function popUp14() {
    var popup = document.getElementById("myPopup14");
    popup.classList.toggle("show");
  }

  function popUp15() {
    var popup = document.getElementById("myPopup15");
    popup.classList.toggle("show");
  }

  function popUp16() {
    var popup = document.getElementById("myPopup16");
    popup.classList.toggle("show");
  }

  function popUp17() {
    var popup = document.getElementById("myPopup17");
    popup.classList.toggle("show");
  }

  function popUp18() {
    var popup = document.getElementById("myPopup18");
    popup.classList.toggle("show");
  }

  function popUp19() {
    var popup = document.getElementById("myPopup19");
    popup.classList.toggle("show");
  }

  function popUp20() {
    var popup = document.getElementById("myPopup20");
    popup.classList.toggle("show");
  }

  function popUp21() {
    var popup = document.getElementById("myPopup21");
    popup.classList.toggle("show");
  }

  function popUp22() {
    var popup = document.getElementById("myPopup22");
    popup.classList.toggle("show");
  }

  function popUp23() {
    var popup = document.getElementById("myPopup23");
    popup.classList.toggle("show");
  }

  function popUp23() {
    var popup = document.getElementById("myPopup23");
    popup.classList.toggle("show");
  }


  function popUp24() {
    var popup = document.getElementById("myPopup24");
    popup.classList.toggle("show");
  }

function popUp25() {
    var popup = document.getElementById("myPopup25");
    popup.classList.toggle("show");
  }

  function popUp26() {
    var popup = document.getElementById("myPopup26");
    popup.classList.toggle("show");
  }

  function popUp27() {
    var popup = document.getElementById("myPopup27");
    popup.classList.toggle("show");
  }

function popUp28() {
    var popup = document.getElementById("myPopup28");
    popup.classList.toggle("show");
  }

function popUp29() {
    var popup = document.getElementById("myPopup29");
    popup.classList.toggle("show");
  }

function popUp30() {
    var popup = document.getElementById("myPopup30");
    popup.classList.toggle("show");
  }

function popUp31() {
    var popup = document.getElementById("myPopup31");
    popup.classList.toggle("show");
  }

  function popUp32() {
    var popup = document.getElementById("myPopup32");
    popup.classList.toggle("show");
  }

  function popUp33() {
    var popup = document.getElementById("myPopup33");
    popup.classList.toggle("show");
  }