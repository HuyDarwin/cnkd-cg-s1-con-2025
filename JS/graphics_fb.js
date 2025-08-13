import { getDatabase, ref, set, update, onValue, remove, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

$(function () {
	"use strict";

	window.CNKDCGV = window.CNKDCGV || {};

	(function (con) {
		const db = getDatabase();
		const dbKey = "cnkd_cg_s1_con_2025";

		// Keyframes

		$.keyframe.define([
			{
				name: 'reset'
			},
			{
				name: 'players_score_reveal',
				'0%': {
					"transform": "translateY(-200px)",
					"opacity": 0
				},
				'100%': {
					"transform": "translateY(0px)",
					"opacity": 1
				}
			},
			{
				name: 'players_score_hide',
				'0%': {
					"transform": "translateY(0px)",
					"opacity": 1
				},
				'100%': {
					"transform": "translateY(-200px)",
					"opacity": 0
				}
			},
			{
				name: 'question_reveal',
				'0%': {
					"transform": "translateY(200px) scale(1.3)",
					"opacity": 0
				},
				'100%': {
					"transform": "translateY(0px) scale(1)",
					"opacity": 1
				}
			},
			{
				name: 'question_hide',
				'0%': {
					"transform": "translateY(0px) scale(1)",
					"opacity": 1
				},
				'100%': {
					"transform": "translateY(200px) scale(1.3)",
					"opacity": 0
				}
			},
			{
				name: 'leftRight',
				'0%': {
					"opacity": 0,
					"transform": "translate(-150px, 0) scale(.3)"
				},
				'40%': {
					"transform": "translate(50px, 0) scale(.7)",
					"opacity": 0.4
				},
				'80%': {
					"transform": "translate(0) scale(1.2)",
					"opacity": 0.8
				},
				'100%': {
					"transform": "translate(0) scale(1)",
					"opacity": 1
				}
			}
		]);

		// Functions

		con.ResetPlayersScoreGpx = function () {
			$('.players-score').css('opacity', 0).playKeyframe('reset');
		}

		con.RevealPlayersScoreGpx = function () {
			$('.players-score').playKeyframe({
				name: 'players_score_reveal',
				duration: '0.5s',
				timingFunction: 'ease-in-out'
			});
		}

		con.HidePlayersScoreGpx = function () {
			$('.players-score').playKeyframe({
				name: 'players_score_hide',
				duration: '0.5s',
				timingFunction: 'ease-in-out'
			});
			setTimeout(function () {
				$('.players-score').playKeyframe('reset');
			}, 500);
		}

		con.ResetQuestionGpx = function () {
			$('.question').css('opacity', 0).playKeyframe('reset');
		}

		con.RevealQuestionGpx = function () {
			$('.question').playKeyframe({
				name: 'question_reveal',
				duration: '0.5s',
				timingFunction: 'ease-in-out'
			});
		}

		con.HideQuestionGpx = function () {
			$('.question').playKeyframe({
				name: 'question_hide',
				duration: '0.5s',
				timingFunction: 'ease-in-out'
			});
			setTimeout(function () {
				$('.question').playKeyframe('reset');
			}, 500);
		}

		con.ResetPrizeGpx = function () {
			$('.prize').css('opacity', 0).playKeyframe('reset');
		}

		con.RevealPrizeGpx = function () {
			$('.prize').playKeyframe({
				name: 'question_reveal',
				duration: '0.5s',
				timingFunction: 'ease-in-out'
			});
		}

		con.HidePrizeGpx = function () {
			$('.prize').playKeyframe({
				name: 'question_hide',
				duration: '0.5s',
				timingFunction: 'ease-in-out'
			});
			setTimeout(function () {
				$('.prize').playKeyframe('reset');
			}, 500);
		}

		// Get data

		var score = [-1, -1, -1];

		onValue(ref(db, dbKey + '/variables'), (snapshot) => {
			const data = snapshot.val();

			for (var i = 1; i <= 3; i++) {
				con.TextUpdateData("#pss-name-" + i, eval('data.contestant_' + i + '_name').toUpperCase(), 1);

				if (score[i - 1] != eval('data.contestant_' + i + '_score_round')) {
					$('#pss-score-' + i + " svg").playKeyframe({
						name: 'leftRight',
						duration: '0.5s',
						timingFunction: 'linear'
					});
					con.TextUpdateData("#pss-score-" + i, accounting.formatNumber(eval('data.contestant_' + i + '_score_round')), 1);
					score[i - 1] = eval('data.contestant_' + i + '_score_round');
				}
			}

			con.TextUpdateData(".prize", accounting.formatNumber(data.prize), 1);

			$('.buzzer-dot').css('opacity', 0);
			if (data.buzzer_number != 0 && data.buzzer_number != undefined) {
				$('#bch-' + data.buzzer_number + ' .buzzer-dot').css('opacity', 1);
			}
		})

		onValue(ref(db, dbKey + '/variables/letters'), (snapshot) => {
			const data = snapshot.val();

			con.TextUpdateData(".q-text", data.category);
		})

		onValue(ref(db, dbKey + '/commands'), (snapshot) => {
			const data = snapshot.val();

			if (data.reload == 1) {
				location.reload(true);
				update(ref(db, dbKey + '/commands'), { reload: 0 });
			}
			if (data.reload_host == 1) {
				location.reload(true);
				update(ref(db, dbKey + '/commands'), { reload_host: 0 });
			}

			if (data.players_score_reveal == 1) {
				con.RevealPlayersScoreGpx();
				update(ref(db, dbKey + '/commands'), { players_score_reveal: 0 });
			}
			if (data.players_score_hide == 1) {
				con.HidePlayersScoreGpx();
				update(ref(db, dbKey + '/commands'), { players_score_hide: 0 });
			}
			if (data.question_reveal == 1) {
				con.RevealQuestionGpx();
				update(ref(db, dbKey + '/commands'), { question_reveal: 0 });
			}
			if (data.question_hide == 1) {
				con.HideQuestionGpx();
				update(ref(db, dbKey + '/commands'), { question_hide: 0 });
			}
			if (data.prize_reveal == 1) {
				con.RevealPrizeGpx();
				update(ref(db, dbKey + '/commands'), { prize_reveal: 0 });
			}
			if (data.prize_hide == 1) {
				con.HidePrizeGpx();
				update(ref(db, dbKey + '/commands'), { prize_hide: 0 });
			}

		})

		// Button Function

		// Action
		con.ResetPlayersScoreGpx();
		con.ResetQuestionGpx();
		con.ResetPrizeGpx();

	}(window.CNKDCGV = window.CNKDCGV || {}));
});