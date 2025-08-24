import { getDatabase, ref, set, update, onValue, remove, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

$(function () {
	"use strict";

	window.CNKDCGV = window.CNKDCGV || {};

	(function (con) {
		const db = getDatabase();
        const dbKey = "cnkd_cg_s1_con_2025";

		// Get data

		var h;
		var i;
		onValue(ref(db, dbKey + '/variables'), (snapshot) => {
			h = snapshot.val().round
			i = snapshot.val().win_or_lose
		})

		onValue(ref(db, dbKey + '/commands'), (snapshot) => {
			const data = snapshot.val();

			if (data.sound_he_2011 == 1) {
				con.PlaySound("Sounds/intro 2011.mp3", 1);
				update(ref(db, dbKey + '/commands'), { sound_he_2011: 0 });
			}
			if (data.sound_he_2011_2 == 1) {
				con.PlaySound("Sounds/intro 2011 2.mp3", 1);
				update(ref(db, dbKey + '/commands'), { sound_he_2011_2: 0 });
			}
			if (data.sound_he_2011_vkci == 1) {
				con.PlaySound("Sounds/intro 2011 VKCI.mp3", 1);
				update(ref(db, dbKey + '/commands'), { sound_he_2011_vkci: 0 });
			}
			if (data.sound_he_2011_vkci_2 == 1) {
				con.PlaySound("Sounds/intro 2011 vkci 2.mp3", 1);
				update(ref(db, dbKey + '/commands'), { sound_he_2011_vkci_2: 0 });
			}
			if (data.sound_model_going_up == 1) {
				con.PlaySound("Sounds/Hồng Nhung đi lên.mp3", 3);
				update(ref(db, dbKey + '/commands'), { sound_model_going_up: 0 });
			}
			if (data.sound_wrong == 1) {
				con.PlaySound("Sounds/Không có chữ cái.mp3", 2);
				update(ref(db, dbKey + '/commands'), { sound_wrong: 0 });
			}
			if (data.sound_old_open_letter == 1) {
				con.PlaySound("Sounds/lật chữ cũ.MP3", 3);
				update(ref(db, dbKey + '/commands'), { sound_old_open_letter: 0 });
			}
			if (data.sound_leaderboard == 1) {
				con.PlaySound("Sounds/tổng kết điểm.mp3", 1);
				update(ref(db, dbKey + '/commands'), { sound_leaderboard: 0 });
			}
			if (data.sound_leaderboard_2 == 1) {
				con.PlaySound("Sounds/tổng kết điểm 2.mp3", 1);
				update(ref(db, dbKey + '/commands'), { sound_leaderboard_2: 0 });
			}
			if (data.sound_present_short == 1) {
				con.PlaySound("Sounds/nhạc trao quà ngắn.mp3", 3);
				update(ref(db, dbKey + '/commands'), { sound_present_short: 0 });
			}
			if (data.sound_present_short_16042011 == 1) {
				con.PlaySound("Sounds/nhạc trao quà 16-4-2011.mp3", 5);
				update(ref(db, dbKey + '/commands'), { sound_present_short_16042011: 0 });
			}
			if (data.sound_present_short_16042011_real == 1) {
				con.PlaySound("Sounds/nhạc trao quà 16-4-2011 real.mp3", 5);
				update(ref(db, dbKey + '/commands'), { sound_present_short_16042011_real: 0 });
			}
			if (data.sound_br_10s == 1) {
				con.StopAllSounds(3)
				con.PlaySound("Sounds/10s Vòng đặc biệt.mp3", 1);
				update(ref(db, dbKey + '/commands'), { sound_br_10s: 0 });
			}
			if (data.sound_credit == 1) {
				con.PlaySound("Sounds/Credit 2001-2011.mp3", 3);
				update(ref(db, dbKey + '/commands'), { sound_credit: 0 });
			}
			if (data.sound_credit_extended == 1) {
				con.PlaySound("Sounds/Credit Nón 2011 (Extend).mp3", 3);
				update(ref(db, dbKey + '/commands'), { sound_credit_extended: 0 });
			}
			if (data.sound_tt_30s_o6 == 1) {
				con.PlaySound("Sounds/30s CNKD 05-06.mp3", 1);
				update(ref(db, dbKey + '/commands'), { sound_tt_30s_o6: 0 });
			}

			if (data.sound_tossup == 1) {
				con.PlaySound("Sounds/Nhạc%20đoán%20nhanh.mp3", 4);
				update(ref(db, dbKey + '/commands'), { sound_tossup: 0 });
			}
			if (data.sound_letter == 1) {
				con.PlaySound("Sounds/Chữ%20cái%20hiện%20xanh.mp3", 2);
				update(ref(db, dbKey + '/commands'), { sound_letter: 0 });
			}
			if (data.sound_letter_shown == 1) {
				con.PlaySound("Sounds/Mở%20chữ%20cái.mp3", 2);
				update(ref(db, dbKey + '/commands'), { sound_letter_shown: 0 });
			}
			if (data.sound_stop_letter_shown == 1) {
				con.StopAllSounds(2);
				update(ref(db, dbKey + '/commands'), { sound_stop_letter_shown: 0 });
			}

			/*
			if (data.spin == 1) {
				//con.PlaySound("Assets/Wheel%20Spin%20Edit%202%20(With%20Spin%20SFX).mp3", 1);
				con.PlaySound("Assets/CNKD%20CG%20S3%20Wheel%20Spin%20Final.mp3", 1);
				update(ref(db, dbKey + '/commands'), { spin: 0 });
			}
			if (data.fspin == 1) {
				con.PlaySound("Assets/CNKD%20CG%20S3%20Final%20Spin%20Final.mp3", 1);
				update(ref(db, dbKey + '/commands'), { fspin: 0 });
			}
			*/

			if (data.spin_music == 1) {
				con.PlaySound("Sounds/Nhạc%20quay%20nón%202009.mp3", 1);
				update(ref(db, dbKey + '/commands'), { spin_music: 0 });
			}

			if (data.puzzle_reveal == 1) {
				con.PlaySound("Sounds/Mở%20ô%20chữ.mp3", 1);

				update(ref(db, dbKey + '/commands'), { puzzle_reveal: 0 });
			}
			if (data.tossup_buzzer == 1) {
				con.PlaySound("Sounds/Buzzer Ding.mp3", 2);
				update(ref(db, dbKey + '/commands'), { tossup_buzzer: 0 });
			}
			if (data.puzzle_solve == 1) {
				if (h == 'tossup_1' || h == 'tossup_2' || h == 'tiebreak') {
					con.StopAllSounds(4);
				}
				else if (h == 'bonus_round') {
					if (i != 2) {
						con.StopAllSounds(1);
						con.StopAllSounds(4);
					}
				}
				else {
					con.StopAllSounds(4);
					con.StopAllSounds(5);
				}

				con.PlaySound("Sounds/Giải%20ô%20chữ.mp3", 1);

				update(ref(db, dbKey + '/commands'), { puzzle_solve: 0 });
			}

			if (data.sound_stop == 1) {
				con.StopAllSounds();
				update(ref(db, dbKey + '/commands'), { sound_stop: 0 });
			}
		});

	}(window.CNKDCGV = window.CNKDCGV || {}));
});
