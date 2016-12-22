//_______________NAVBAR_____________

$(".dropdown-button").dropdown();
$(".button-collapse").sideNav();

//__________________________________
   /////////////////////////////
 /* Javascript fonctions.js */
/////////////////////////////

$(document).ready(function(){

  ///////////
  // Notation
  ///////////
  var srcIn="../img/star.png"; //image au survol
  var srcOut='../img/star_in.gif'; // image non survolée

  // Obtenir id numérique des étoiles au format star_numero
  function idNum(id)
  {
    var id=id.split('_');
    var id=id[1];
    return id;
  }

  // Survol des étoiles
  $('.star').hover(function(){
    var id=idNum($(this).attr('id')); // id numérique de l'étoile survolée
    var nbStars=$('.star').length; // Nombre d'étoiles de la classe .star
    var i; // Variable d'incrémentation
    for (i=1;i<=nbStars;i++)
    {
      if(i<=id) $('.star_'+i).attr({src:srcIn});
      else if(i>id) $('.star_'+i).attr({src:srcOut});
      else if(i>id) $('#star_'+i).attr({src:srcOut});
      if(i==id)$('#note').attr({value:i}); // affectation de la note au formulaire
    }
  },function(){});

  // Survol de la croix
  $('#clear_stars').hover(function(){
    $('.star').attr({src:srcOut});
    $('#note').attr({value:'0'});
  },function(){});
});
