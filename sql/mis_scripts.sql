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



-- ----------------------------------------------------------
ALTER TABLE `users` ADD `is_email_verified` TINYINT(1) NULL DEFAULT '0' AFTER `email`, ADD `email_token` VARCHAR(255) NULL DEFAULT NULL AFTER `is_email_verified`;

ALTER TABLE `users` CHANGE `reset_token` `reset_token` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;

ALTER TABLE `ajustes` CHANGE `id_obj_ajuste` `id_ajuste` INT(10) NOT NULL AUTO_INCREMENT;



ALTER TABLE `users` ADD `email_token_expiry` DATETIME NULL AFTER `email_token`;


-- -------------------------------
ALTER TABLE `markers` CHANGE `arr_markers` `arr_markers` MEDIUMTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;




ALTER DATABASE db_bibleqt CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE markers CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE markers MODIFY arr_markers JSON CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

---------------------------

-- ver todas claves foraneas
SELECT 
    table_name, 
    constraint_name, 
    column_name, 
    referenced_table_name, 
    referenced_column_name 
FROM 
    information_schema.key_column_usage 
WHERE 
    referenced_table_schema = 'db_bibleqt' 
    AND referenced_table_name IS NOT NULL;

-- paso 1. eliminar clave foranea
ALTER TABLE ajustes DROP FOREIGN KEY FK_fav_ajustes_users;
ALTER TABLE fav_trans DROP FOREIGN KEY FK_fav_trans_users;
ALTER TABLE hist_find DROP FOREIGN KEY FK_hist_find_users;
ALTER TABLE hist_nav DROP FOREIGN KEY FK_hist_nav_users;
ALTER TABLE hist_strong DROP FOREIGN KEY FK_hist_strong_users;
ALTER TABLE markers DROP FOREIGN KEY FK_markers_users;
ALTER TABLE vkladki DROP FOREIGN KEY FK_vkladki_users;


-- paso 2. crear indices para cada tabla en phpMyAdmin
ALTER TABLE `ajustes` ADD INDEX(`id_user`);
ALTER TABLE `fav_trans` ADD INDEX(`id_user`);
ALTER TABLE `hist_find` ADD INDEX(`id_user`);
ALTER TABLE `hist_nav` ADD INDEX(`id_user`);
ALTER TABLE `hist_strong` ADD INDEX(`id_user`);
ALTER TABLE `markers` ADD INDEX(`id_user`);
ALTER TABLE `vkladki` ADD INDEX(`id_user`);

-- paso 3. crear la relacion con el diseñador 
    on delete: CASCADE
    on update: CASCADE


