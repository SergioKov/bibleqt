ALTER TABLE `markers`
  ADD CONSTRAINT `FK_markers_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);


ALTER TABLE `fav_trans`
  ADD CONSTRAINT `FK_fav_trans_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);











{
    "wr_filter": {
        "display": "block"
    },
    "btn_lang_all": {
        "display": "none",
        "class": "tab",
        "stateActive": true
    },
    "one_lang": {
        "checked": true
    },
    "many_lang": {
        "checked": false
    },
    "btn_show_refs": {
        "display": "block",
        "classText": "btn",
        "stateActive": false
    },
    "a_ref": {
        "display": "none"
    },
    "arr_lang_act": [
        "ua"
    ],
    "arr_lang_noact": [
        "ru",
        "es"
    ],
    "arr_trans_act": [
        "ukr_fil",
        "ukr_ogi",
        "ukr_ogi88",
        "ukr_hom",
        "ukr_gyz",
        "ukr_tur",
        "ukr_tur2",
        "ukr_kul",
        "ukr_umts"
    ],
    "arr_trans_noact": [
        "rstStrongRed",
        "rstt",
        "rsti2",
        "rstm",
        "abi",
        "nrt",
        "mdri",
        "rsp",
        "rbo15",
        "rob",
        "ukr_fil",
        "ukr_ogi",
        "ukr_ogi88",
        "ukr_hom",
        "ukr_gyz",
        "ukr_tur",
        "ukr_tur2",
        "ukr_kul",
        "ukr_umts",
        "lbla"
    ],
    "aaa": "aaa"
}






//-----------------------------------

RENAME TABLE `db_bibleqt`.`fav_ajustes` TO `db_bibleqt`.`ajustes`;



//-----------------
ALTER TABLE `users` ADD `lasr_login` DATETIME NULL AFTER `email`;
ALTER TABLE `users` CHANGE `lasr_login` `last_login` DATETIME NULL DEFAULT NULL;

//abo
ALTER TABLE `users` ADD `last_login` DATETIME NULL AFTER `email`;

