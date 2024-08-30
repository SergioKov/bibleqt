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





-- 1. eliminar indices antes de modificar claves foraneas
ALTER TABLE ajustes DROP FOREIGN KEY FK_ajustes_users;
ALTER TABLE fav_trans DROP FOREIGN KEY FK_fav_trans_users;
ALTER TABLE hist_find DROP FOREIGN KEY FK_hist_find_users;
ALTER TABLE hist_nav DROP FOREIGN KEY FK_hist_nav_users;
ALTER TABLE hist_strong DROP FOREIGN KEY FK_hist_strong_users;
ALTER TABLE markers DROP FOREIGN KEY FK_markers_users;
ALTER TABLE vkladki DROP FOREIGN KEY FK_vkladki_users;






--2. actualizar foreign keys para que al eliminar un registro de users se eliminen todos los registros relacionados con id_user en cascada

ALTER TABLE ajustes
ADD CONSTRAINT fk_ajustes_to_users
FOREIGN KEY (id_user) REFERENCES users(id_user)
ON DELETE CASCADE;


ALTER TABLE fav_trans
ADD CONSTRAINT fk_fav_trans_to_users
FOREIGN KEY (id_user) REFERENCES users(id_user)
ON DELETE CASCADE;


ALTER TABLE hist_find
ADD CONSTRAINT fk_hist_find_to_users
FOREIGN KEY (id_user) REFERENCES users(id_user)
ON DELETE CASCADE;


ALTER TABLE hist_nav
ADD CONSTRAINT fk_hist_nav_to_users
FOREIGN KEY (id_user) REFERENCES users(id_user)
ON DELETE CASCADE;


ALTER TABLE hist_strong
ADD CONSTRAINT fk_hist_strong_to_users
FOREIGN KEY (id_user) REFERENCES users(id_user)
ON DELETE CASCADE;


ALTER TABLE markers
ADD CONSTRAINT fk_markers_to_users
FOREIGN KEY (id_user) REFERENCES users(id_user)
ON DELETE CASCADE;


ALTER TABLE vkladki
ADD CONSTRAINT fk_vkladki_to_users
FOREIGN KEY (id_user) REFERENCES users(id_user)
ON DELETE CASCADE;

