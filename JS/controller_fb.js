import { getDatabase, ref, set, update, onValue, remove, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

$(function () {
	"use strict";

	window.CNKDCGV = window.CNKDCGV || {};

	(function (con) {
		const db = getDatabase();
        const dbKey = "cnkd_cg_s1_con_2025";

		// Reset variables and commands

		const maxhang = 4;
		const maxcot = 16;

		var maxochu = 64;

		remove(ref(db, dbKey + "/variables"));
		remove(ref(db, dbKey + "/commands"));

		update(ref(db, dbKey + "/variables"), {
			spinning_miliseconds: 7500,
			spinning_fspin_miliseconds: 5000,
			//spinning_miliseconds: 10000,
			spinning_rotating_degree: 0,
			spinning_random_degree: 0,
			round: '',

			contestant_1_name: '',
			contestant_2_name: '',
			contestant_3_name: '',

			contestant_1_score_round: 0,
			contestant_2_score_round: 0,
			contestant_3_score_round: 0,

			contestant_1_score_total: 0,
			contestant_2_score_total: 0,
			contestant_3_score_total: 0,

			buzzer_toggle: 0,
			buzzer_status: 0,
			buzzer_number: 0,

			win_or_lose: 0
		})

		update(ref(db, dbKey + "/variables/letters"), {
			category: '',
			hint: ''
		})

		for (var i = 1; i <= maxochu; i++) {
			update(ref(db, dbKey + '/variables/letters/no_tonemark'), { ['letter_' + i]: '' })
			update(ref(db, dbKey + '/variables/letters/having_tonemark'), { ['letter_' + i]: '' })
			update(ref(db, dbKey + '/variables/letters/letter_existence'), { ['letter_' + i]: false })
			update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + i]: 0 })
		}

		update(ref(db, dbKey + '/commands'), {

		})

		// Get data

		onValue(ref(db, dbKey + '/variables'), (snapshot) => {
			const data = snapshot.val();

			if (data.buzzer_status == 1) {
				$('#tossup_buzzer').click();
				update(ref(db, dbKey + '/variables'), { buzzer_status: 0 })
			}

			if (data.buzzer_number != 0 && data.buzzer_number != undefined) {
				$('.buzzer_player').html(data.buzzer_number + '. ' + eval('data.contestant_' + data.buzzer_number + '_name'));
			}
			else {
				$('.buzzer_player').html('');
			}
			
			$(".timer_text").html(data.timer);
		})

		onValue(ref(db, dbKey + '/variables/letters'), (snapshot) => {
			const data = snapshot.val();

			$('#qi_category').html(data.category);
			$('#qi_hint').html(data.hint);
		})

		onValue(ref(db, dbKey + '/commands'), (snapshot) => {
			const data = snapshot.val();


			// Button Function using Commands Data
		})

		// Button Function

		$('button[name="autocmd"]').click(function () {
			update(ref(db, dbKey + '/commands'), { [this.id]: 1 })
		})
		$('button[name="autocmd_class"]').click(function () {
			update(ref(db, dbKey + '/commands'), { [this.className]: 1 })
		})

		$('.change_wheel').click(function () {
			$('.change_wheel').removeAttr('disabled');
			$('#' + this.id).attr('disabled', true);
		})

		$('.change_wheel_back').click(function () {
			$('.change_wheel_back').removeAttr('disabled');
			$('#' + this.id).attr('disabled', true);
		})

		$('#spin').click(function () {
			update(ref(db, dbKey + '/variables'), { spinning_random_degree: Math.floor(Math.random() * 1250 + 1251) })
		})

		$('#fspin').click(function () {
			update(ref(db, dbKey + '/variables'), { spinning_random_degree: Math.floor(Math.random() * 1250 + 1251) })
		})

		$('.select_round').click(function () {
			$('.select_round').css({ 'background-color': 'black' });
			$('#' + this.id).css({ 'background-color': '#23395D' });

			if (this.id == 'sr_t1') {
				round = 'tossup_1';
			}
			if (this.id == 'sr_t2') {
				round = 'tossup_2';
			}
			if (this.id == 'sr_1') {
				round = 'round_1';
			}
			if (this.id == 'sr_2') {
				round = 'round_2';
			}
			if (this.id == 'sr_3') {
				round = 'round_3';
			}
			if (this.id == 'sr_tb') {
				round = 'tiebreak';
			}
			if (this.id == 'sr_a') {
				round = 'audience_round';
			}
			if (this.id == 'sr_b') {
				round = 'bonus_round';
			}
			update(ref(db, dbKey + '/variables'), { round: round })
			$('#get_questions_file').val(null);
			$('#get_questions_file').click();
		})

		$('#get_questions_file').on("change", function (e) {

			for (var i = 1; i <= maxochu; i++) {
				update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + i]: 0 })
			}

			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function (e) {
				var data = e.target.result;
				var workbook = XLSX.read(e.target.result);
				var sheet = workbook.Sheets[workbook.SheetNames[0]];

				if (round == 'tossup_1') {
					category = sheet['D5'].v;
					hint = sheet['D6'].v;
				}
				if (round == 'tossup_2') {
					category = sheet['D18'].v;
					hint = sheet['D19'].v;
				}
				if (round == 'tiebreak') {
					category = sheet['D31'].v;
					hint = sheet['D32'].v;
				}
				if (round == 'round_1') {
					category = sheet['D45'].v;
					hint = sheet['D46'].v;
				}
				if (round == 'round_2') {
					category = sheet['D58'].v;
					hint = sheet['D59'].v;
				}
				if (round == 'round_3') {
					category = sheet['D71'].v;
					hint = sheet['D72'].v;
				}
				if (round == 'audience_round') {
					category = sheet['D84'].v;
					hint = sheet['D85'].v;
				}
				if (round == 'bonus_round') {
					category = sheet['D97'].v;
					hint = sheet['D98'].v;
				}
				
				update(ref(db, dbKey + '/variables/letters'), {
					category: category,
					hint: hint
				})

				letters = [];

				for (var i = 1; i <= maxochu; i++) {
					letters.push({
						no_tonemark: '',
						having_tonemark: '',
						letter_existence: false,
						status: 0
					})
				}

				var them = 0;
				if (round == 'tossup_1') {
					them = 7;
				}
				else if (round == 'tossup_2') {
					them = 20;
				}
				else if (round == 'tiebreak') {
					them = 33;
				}
				else if (round == 'round_1') {
					them = 47;
				}
				else if (round == 'round_2') {
					them = 60;
				}
				else if (round == 'round_3') {
					them = 73;
				}
				else if (round == 'audience_round') {
					them = 86;
				}
				else if (round == 'bonus_round') {
					them = 99;
				}

				for (var j = 65; j <= 65 + maxcot - 1; j++) {
					for (var i = 1; i <= 4; i++) {
						var d;
						var e;
						var f;


						d = sheet[String.fromCharCode(j) + (i + them)].v;
						e = sheet[String.fromCharCode(j) + (i + them + 5)].v;

						if (d != '.' && e != '.') {
							f = true;
						}
						else {
							f = false;
						}

						var id = (j - 64 + (maxcot - 1) * (i - 1) + i - 1);

						update(ref(db, dbKey + '/variables/letters/no_tonemark'), { ['letter_' + id]: d })
						update(ref(db, dbKey + '/variables/letters/having_tonemark'), { ['letter_' + id]: e })
						update(ref(db, dbKey + '/variables/letters/letter_existence'), { ['letter_' + id]: f })

						letters[id - 1].no_tonemark = d;
						letters[id - 1].having_tonemark = e;
						letters[id - 1].letter_existence = f;
						letters[id - 1].status = 0;
					}
				}
			};
			reader.readAsArrayBuffer(file);
			setTimeout(function () {
				$('.open_letter').css({ 'background-color': 'black' });
				$('.open_letter, #puzzle_solve').attr('disabled', true);
				$('#puzzle_reveal').removeAttr('disabled');
				$('#puzzle_giaima').attr('disabled', true);
				$('.open_letter').html('').css('border-color', 'initial');
				for (var i = 1; i <= maxochu; i++) {
					if (letters[i - 1].letter_existence == true) {
						$('#ol_' + i).html(letters[i - 1].having_tonemark);
					}
				}
			}, 250)
		})

		$('#reset_puzzleboard_data').click(function () {
			update(ref(db, dbKey + '/variables/letters'), {
				category: '',
				hint: ''
			})
			for (var i = 1; i <= maxochu; i++) {
				letters.push({
					no_tonemark: '',
					having_tonemark: '',
					letter_existence: false,
					status: 0
				})
				update(ref(db, dbKey + '/variables/letters/no_tonemark'), { ['letter_' + i]: '' })
				update(ref(db, dbKey + '/variables/letters/having_tonemark'), { ['letter_' + i]: '' })
				update(ref(db, dbKey + '/variables/letters/letter_existence'), { ['letter_' + i]: false })
				update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + i]: 0 })
			}
			$('.open_letter').html('').css('border-color', 'initial');
			$('.select_round').removeAttr('disabled');
			$('#puzzle_giaima').attr('disabled', true);
			$('.open_letter, #puzzle_reveal, #puzzle_solve').attr('disabled', true);
			$('.open_letter').css({ 'background-color': 'black' });
		})

		function TempPuzzleReveal (cotID) {
			if (cotID < 1 || cotID >= 11) {
				var temp_i = [];

				if (cotID == -5) {
					temp_i = [49, 50];
				}
				else if (cotID == -3) {
					temp_i = [33, 34, 51, 52];
				}
				else if (cotID == -1) {
					temp_i = [17, 18, 35, 36, 53, 54];
				}
				else if (cotID == 11) {
					temp_i = [11, 12, 29, 30, 47, 48];
				}
				else if (cotID == 13) {
					temp_i = [13, 14, 31, 32];
				}
				else if (cotID == 15) {
					temp_i = [15, 16];
				}

				for (var idx = 0; idx < temp_i.length; idx++) {
					i = temp_i[idx];
					if (letters[i - 1].letter_existence == true) {
						letters[i - 1].status = 1;
						update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + i]: 1 })
						$('#ol_' + i).removeAttr('disabled');
					}
				}
			}
			else {
				for (var x = 1; x <= 4; x++) {
					var i = (cotID + 2 * (x - 1)) + 16 * (x - 1);
					if (letters[i - 1].letter_existence == true) {
						letters[i - 1].status = 1;
						update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + i]: 1 })
						$('#ol_' + i).removeAttr('disabled');
					}
				}
				for (var x = 1; x <= 4; x++) {
					var i = ((cotID + 1) + 2 * (x - 1)) + 16 * (x - 1);
					if (letters[i - 1].letter_existence == true) {
						letters[i - 1].status = 1;
						update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + i]: 1 })
						$('#ol_' + i).removeAttr('disabled');
					}
				}
			}
		}

		$('#puzzle_reveal').click(function () {
			$('#puzzle_reveal').attr('disabled', true);
			$('#puzzle_solve').removeAttr('disabled');
			
			var j = -2;
			for (var i = 1; i <= 11; i++) {
				setTimeout (function () {
					TempPuzzleReveal(2 * j - 1);
					j++;
				}, 250 * (i - 1));
			}

			if (round == 'tossup_1' || round == 'tossup_2' || round == 'tiebreak') {
				setTimeout(function () {		
					update(ref(db, dbKey + '/commands'), { sound_tossup: 1 });
				}, 2000);
			}
		})

		$('#puzzle_solve').click(function () {

			$('.open_letter, #puzzle_solve, #tossup_buzzer, #tossup_continue').attr('disabled', true);
			for (var i = 1; i <= maxochu; i++) {
				if (letters[i - 1].letter_existence == true) {
					letters[i - 1].status = 4;
					update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + i]: 4 })
				}
			}
			clearInterval(tossup_int)
			tossup_boolean = false;
			update(ref(db, dbKey + '/variables'), {
				buzzer_toggle: 0,
				buzzer_status: 0,
				buzzer_number: 0
			})
		})

		$('.open_letter').click(function () {
			if (round == 'tossup_1' || round == 'tossup_2' || round == 'tiebreak') {
				if (letters[Number(this.id.replace('ol_', '')) - 1].status == 1) {
					letters[Number(this.id.replace('ol_', '')) - 1].status = 2;
					update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + this.id.replace('ol_', '')]: 2 })
					$('#' + this.id).css({ 'background-color': '#23395D' });
					
					update(ref(db, dbKey + '/commands'), { sound_letter: 1 })
				}
				else if (letters[Number(this.id.replace('ol_', '')) - 1].status == 2) {
					letters[Number(this.id.replace('ol_', '')) - 1].status = 3;
					update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + this.id.replace('ol_', '')]: 5 })

					$('#' + this.id).css({ 'background-color': 'black' });
					$('.open_letter').attr('disabled', true);
					$('#tossup_buzzer').removeAttr('disabled');

					update(ref(db, dbKey + '/variables'), { buzzer_toggle: 1 })
					
					update(ref(db, dbKey + '/commands'), { sound_letter_shown: 1 })

					tossup_boolean = true;
					var counter;
					tossup_int = setInterval(function () {
						if (tossup_boolean == true) {
							counter = 0;
							for (var i = 1; i <= maxochu; i++) {
								if (letters[i - 1].status == 0 || letters[i - 1].status == 3) {
									counter++;
								}
							}
							if (counter == maxochu) {
								clearInterval(tossup_int)
								tossup_boolean = false;
								// update(ref(db, dbKey + '/variables'), { buzzer_toggle: 0 })
							}
							else {
								var g = Math.floor(Math.random() * maxochu) + 1;
								while (letters[g - 1].status != 1) {
									g = Math.floor(Math.random() * maxochu) + 1;
								}
								letters[g - 1].status = 3;
								update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + g]: 5 })
								update(ref(db, dbKey + '/commands'), { sound_stop_letter_shown: 1 })
								setTimeout(function() {
									update(ref(db, dbKey + '/commands'), { sound_letter_shown: 1 })
								}, 50);
 							}
						}
					}, 750)
				}
			}
			else {
				if (letters[Number(this.id.replace('ol_', '')) - 1].status == 1) {
					letters[Number(this.id.replace('ol_', '')) - 1].status = 2;
					update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + this.id.replace('ol_', '')]: 2 })
					$('#' + this.id).css({ 'background-color': '#23395D' });
					
					update(ref(db, dbKey + '/commands'), { sound_letter: 1 })
				}
				else if (letters[Number(this.id.replace('ol_', '')) - 1].status == 2) {
					letters[Number(this.id.replace('ol_', '')) - 1].status = 3;
					update(ref(db, dbKey + '/variables/letters/status'), { ['letter_' + this.id.replace('ol_', '')]: 5 })
					$('#' + this.id).css({ 'background-color': 'black' });
					$('#' + this.id).attr('disabled', true);
					
					update(ref(db, dbKey + '/commands'), { sound_letter_shown: 1 })
				}
			}
		})

		$('#tossup_buzzer').click(function () {
			$('#tossup_buzzer').attr('disabled', true);
			$('#tossup_continue').removeAttr('disabled');
			tossup_boolean = false;
			update(ref(db, dbKey + '/variables'), { buzzer_toggle: 0 })
		})

		$('#tossup_continue').click(function () {
			$('#tossup_continue').attr('disabled', true);
			$('#tossup_buzzer').removeAttr('disabled');
			tossup_boolean = true;
			update(ref(db, dbKey + '/variables'), {
				buzzer_toggle: 1,
				buzzer_number: 0

			})
		})

		var question_counter = 0;
		$('#question_toggle').click(function () {
			if (question_counter == 0) {
				update(ref(db, dbKey + '/commands'), { question_reveal: 1 });
				$(this).html("ẨN CÂU HỎI");
				question_counter = 1;
			}
			else {
				update(ref(db, dbKey + '/commands'), { question_hide: 1 });
				$(this).html("HIỆN CÂU HỎI");
				question_counter = 0;
			}
		});

		var players_score_counter = 0;
		$('#players_score_toggle').click(function () {
			if (players_score_counter == 0) {
				update(ref(db, dbKey + '/commands'), { players_score_reveal: 1 });
				$(this).html("ẨN ĐIỂM NC");
				players_score_counter = 1;
			}
			else {
				update(ref(db, dbKey + '/commands'), { players_score_hide: 1 });
				$(this).html("HIỆN ĐIỂM NC");
				players_score_counter = 0;
			}
		});

		var prize_counter = 0;
		$('#prize_toggle').click(function () {
			if (prize_counter == 0) {
				update(ref(db, dbKey + '/variables'), { prize: Number($('.prize_input').val()) });
				update(ref(db, dbKey + '/commands'), { prize_reveal: 1 });
				$(this).html("ẨN");
				prize_counter = 1;
			}
			else {
				update(ref(db, dbKey + '/commands'), { prize_hide: 1 });
				$(this).html("HIỆN");
				prize_counter = 0;
			}
		});

		$('#prize_copy_1r').click(function () {
			$('.prize_input').val(Number($('#csr_1').val()));
		});

		$('#prize_copy_2r').click(function () {
			$('.prize_input').val(Number($('#csr_2').val()));
		});

		$('#prize_copy_3r').click(function () {
			$('.prize_input').val(Number($('#csr_3').val()));
		});

		$('#prize_copy_1t').click(function () {
			$('.prize_input').val(Number($('#cst_1').val()));
		});

		$('#prize_copy_2t').click(function () {
			$('.prize_input').val(Number($('#cst_2').val()));
		});

		$('#prize_copy_3t').click(function () {
			$('.prize_input').val(Number($('#cst_3').val()));
		});

		$('#sound_br_10s').click(function () {
			con.PlayTimer(14, false);
		});

		/*
		$('.add_wedge_tag').click(function () {
			if ($('#' + this.id).css('background-color') == 'rgb(0, 0, 0)') {
				$('#' + this.id).css('background-color', 'rgb(35, 57, 93)');
				update(ref(db, dbKey + '/commands'), { [this.id]: 1 })
			}
			else if ($('#' + this.id).css('background-color') == 'rgb(35, 57, 93)') {
				$('#' + this.id).css('background-color', 'rgb(0, 0, 0)');
				update(ref(db, dbKey + '/commands'), { [this.id]: 0 })
			}
		})
		$('#reset_wedges_tags').click(function () {
			$('.add_wedge_tag').css('background-color', 'rgb(0, 0, 0)');
		})

		$('#reveal_backdrop').click(function () {
			$('#reveal_backdrop').attr('disabled', true);
			$('#hide_backdrop').removeAttr('disabled');
		})
		$('#hide_backdrop').click(function () {
			$('#hide_backdrop').attr('disabled', true);
			$('#reveal_backdrop').removeAttr('disabled');
		})
		*/

		$('#update_names').click(function () {
			update(ref(db, dbKey + '/variables'), {
				contestant_1_name: $('#cn_1').val(),
				contestant_2_name: $('#cn_2').val(),
				contestant_3_name: $('#cn_3').val(),
				ket_sat_property: $('.ket_sat_property').val()
			})
		})

		$('#add_to_round').click(function () {
			$('#csr_1').html(Number($('#csr_1').val()) + Number($('#csi_1').val()));
			$('#csr_2').html(Number($('#csr_2').val()) + Number($('#csi_2').val()));
			$('#csr_3').html(Number($('#csr_3').val()) + Number($('#csi_3').val()));
		})

		$('#subtract_from_round').click(function () {
			$('#csr_1').html(Number($('#csr_1').val()) - Number($('#csi_1').val()));
			$('#csr_2').html(Number($('#csr_2').val()) - Number($('#csi_2').val()));
			$('#csr_3').html(Number($('#csr_3').val()) - Number($('#csi_3').val()));
		})

		$('#replace_round').click(function () {
			$('#csr_1').html(Number($('#csi_1').val()));
			$('#csr_2').html(Number($('#csi_2').val()));
			$('#csr_3').html(Number($('#csi_3').val()));
		})

		$('#reset_round').click(function () {
			$('#csr_1').html(0);
			$('#csr_2').html(0);
			$('#csr_3').html(0);
		})

		$('#add_to_total').click(function () {
			$('#cst_1').html(Number($('#cst_1').val()) + Number($('#csr_1').val()));
			$('#cst_2').html(Number($('#cst_2').val()) + Number($('#csr_2').val()));
			$('#cst_3').html(Number($('#cst_3').val()) + Number($('#csr_3').val()));
		})

		$('#subtract_from_total').click(function () {
			$('#cst_1').html(Number($('#cst_1').val()) - Number($('#csr_1').val()));
			$('#cst_2').html(Number($('#cst_2').val()) - Number($('#csr_2').val()));
			$('#cst_3').html(Number($('#cst_3').val()) - Number($('#csr_3').val()));
		})

		$('#replace_total').click(function () {
			$('#cst_1').html(Number($('#csr_1').val()));
			$('#cst_2').html(Number($('#csr_2').val()));
			$('#cst_3').html(Number($('#csr_3').val()));
		})

		$('#reset_total').click(function () {
			$('#cst_1').html(0);
			$('#cst_2').html(0);
			$('#cst_3').html(0);
		})

		$("#reset_input").click(function () {
			$(".contestant_score_input").val(0);
		});
		$('.update_round_score').click(function () {
			update(ref(db, dbKey + '/variables'), {
				contestant_1_score_round: $('#csr_1').val(),
				contestant_2_score_round: $('#csr_2').val(),
				contestant_3_score_round: $('#csr_3').val()
			})
		})
		$('.update_total_score').click(function () {
			update(ref(db, dbKey + '/variables'), {
				contestant_1_score_total: $('#cst_1').val(),
				contestant_2_score_total: $('#cst_2').val(),
				contestant_3_score_total: $('#cst_3').val()
			})
		})

		// Action

		//$('#cw_v1').click();
		//$('#cwb_main').click();
		//$('#reset_wedges_tags').click();
		//$('#hide_backdrop').click();
		//$('#puzzle_back_1').click();

		$('.open_letter, #puzzle_reveal, #puzzle_solve, #tossup_buzzer, #tossup_continue, .contestant_score_round, .contestant_score_total, .question_info, .buzzer_player').attr('disabled', true);

		for (var i = 1; i <= maxochu; i++) {
			letters.push({
				no_tonemark: '',
				having_tonemark: '',
				letter_existence: false,
				status: 0
			})
		}

	}(window.CNKDCGV = window.CNKDCGV || {}));
});