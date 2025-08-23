import { getDatabase, ref, set, update, onValue, remove, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

$(function () {
  "use strict";

  window.CNKDCGV = window.CNKDCGV || {};

  (function (con) {
    const db = getDatabase();
    const dbKey = "cnkd_cg_s1_con_2025";

    const maxhang = 4;
    const maxcot = 16;

    // Keyframes

    $.keyframe.define([
      {
        name: 'reset'
      },
      {
        name: 'letter_zoom',
        '0%': {
          "opacity": 0,
          "transform": "scale(0)"
        },
        '100%': {
          "opacity": 1,
          "transform": "scale(1)"
        }
      }
    ]);

    // Reset variables and commands

    update(ref(db, dbKey + '/variables'), {

    })

    update(ref(db, dbKey + '/commands'), {

    })

    // Function

    function PlayVideoOnce(video) {
      $(video).css('opacity', 1)
      $(video).trigger('play');
      $(video)[0].playbackRate = 1;
      $(video).on('ended', function () {
        $(video).css('opacity', 0)
        $(video).trigger('pause');
        $(video)[0].currentTime = 0;
      });
    }

    function StopVideo(video) {
      $(video).css('opacity', 0)
      $(video).trigger('pause');
      $(video)[0].currentTime = 0;
    }

    function ShowLoopVideo(video) {
      $(video).css('opacity', 1);
    }

    function HideLoopVideo(video) {
      $(video).css('opacity', 0);
    }

    // Variables

    // Get data

    var a = "";

    onValue(ref(db, dbKey + '/variables'), (snapshot) => {
      const data = snapshot.val();

      a = data.round;

    })

    onValue(ref(db, dbKey + '/variables/letters/status'), (snapshot) => {
      const data = snapshot.val();
      for (var i = 1; i <= maxhang * maxcot; i++) {

        if (i == 1 || i == maxcot || i == (maxhang - 1) * maxcot + 1 || i == maxhang * maxcot) {
          continue;
        }
        else {
          if (eval('data.letter_' + i) != undefined && eval('data.letter_' + i) != null) {
            if (eval('data.letter_' + i) == 0) {
              $('#letter_' + i).css('background-image', 'url("Images/ô%20chữ%20xanh%20ngọc@3x.png")');
            }
            if (eval('data.letter_' + i) == 1 || eval('data.letter_' + i) == 3 || eval('data.letter_' + i) == 4) {
              $('#letter_' + i).css('background-image', 'url("Images/ô%20chữ%20trắng@3x.png")');
            }
            if (eval('data.letter_' + i) == 2) {
              $('#letter_' + i).css('background-image', 'url("Images/ô%20chữ%20xanh%20biển@3x.png")');
            }

            if (eval('data.letter_' + i) == 5) {
              $('#letter_' + i + ' div').css('opacity', 0);

              $('#letter_' + i).css('background-image', 'url("Images/ô%20chữ%20trắng@3x.png")');

              $('#letter_' + i + ' div').playKeyframe({
                name: 'letter_zoom',
                duration: '0.4s',
                timingFunction: 'linear'
              });
              
              onValue(ref(db, dbKey + '/variables/letters/no_tonemark'), (snapshot) => {
                $('#letter_' + i + ' div').html(eval('snapshot.val().letter_' + i));
              })

              update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + i]: 3 });

              setTimeout(function(){
                $('#letter_' + i + ' div').css('opacity', 1).playKeyframe('reset');
              }, 400);
            }

            if (eval('data.letter_' + i) == 3) {
              onValue(ref(db, dbKey + '/variables/letters/no_tonemark'), (snapshot) => {
                $('#letter_' + i + ' div').html(eval('snapshot.val().letter_' + i));
              })
            }
            else if (eval('data.letter_' + i) == 4) {
              onValue(ref(db, dbKey + '/variables/letters/having_tonemark'), (snapshot) => {
                $('#letter_' + i + ' div').html(eval('snapshot.val().letter_' + i));
              })
            }
            else if (eval('data.letter_' + i) != 5) {
              $('#letter_' + i + ' div').html('');
            }
          }
        }
      }
    })

    onValue(ref(db, dbKey + '/commands'), (snapshot) => {
      const data = snapshot.val();

      if (data.reload == 1) {
        location.reload(true);
        update(ref(db, dbKey + '/commands'), { reload: 0 });
      }

      if (data.reset_puzzleboard == 1) {
        update(ref(db, dbKey + '/commands'), { reset_puzzleboard: 0 })
      }
      if (data.reset_puzzleboard_data == 1) {
        update(ref(db, dbKey + '/commands'), { reset_puzzleboard_data: 0 })
      }
      if (data.puzzle_reveal == 1) {
        update(ref(db, dbKey + '/commands'), { puzzle_reveal: 0 })
      }
      if (data.puzzle_solve == 1) {
        update(ref(db, dbKey + '/commands'), { puzzle_solve: 0 })
      }
    })

    // Action

    var string = "";
    for (var j = 0; j < maxhang; j++) {
      string += "<tr>";
      for (var i = 1; i <= maxcot; i++) {
        string += "<td class='letter' id='letter_" + (i + ((maxcot - 1) * j) + j) + "'><div></div></td>"
      }
      string += "</tr>";
    }
    $('.puzzleboard').html(string);

  }(window.CNKDCGV = window.CNKDCGV || {}));
});