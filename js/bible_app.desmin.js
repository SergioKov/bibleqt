let arrFavTransObj = {};
async function ddd() {
    await obtenerDatosDeBD("fav_trans", "arrFavTrans");
}
async function crear_arrFavTransObj() {
    (arrFavTransObj = await make_arrFavTransObj(arrFavTrans)), 0 == is_loading_def_functions && (await loadDefaultFunctions());
}
(hay_sesion ? ddd : crear_arrFavTransObj)();
let arrFavTskObj = {};
async function crear_arrFavTskObj() {
    arrFavTskObj = await make_arrFavTskObj();
}
crear_arrFavTskObj();
let obj_lang = {};
async function crear_obj_lang() {
    obj_lang = await make_obj_lang();
}
async function make_obj_lang() {
    try {
        return (
            arr_langs.includes(lang) || (console.error(`No existe este idioma '${lang}' para las traducciones. Creo objeto con lang '${arr_langs[0]}' por defecto`), (lang = arr_langs[0])), await fetchDataToJson(`modules/json/${lang}.json`)
        );
    } catch (e) {
        console.error("make_obj_lang. error: ", e);
    }
}
function pintLoginImg(e) {
    let t;
    (t = e ? "./images/login2_white.svg" : "./images/login2_grey.svg"), (eid_login_menu.querySelector("img").src = t), (eid_m_login_menu.querySelector("img").src = t);
}
async function fetchDataToText(e) {
    return await (await fetch(e)).text();
}
async function fetchDataToJson(e) {
    return await (await fetch(e)).json();
}
function make_arrFavTransObj_old(a) {
    let r = [];
    for (let t = 0; t < a.length; t++)
        fetchDataToJson(`./modules/text/${a[t]}/bibleqt.json`)
            .then((e) => {
                (r[t] = e), t == a.length - 1 && loadDefaultFunctions();
            })
            .catch((e) => {
                console.error("make_arrFavTransObj_old. error promesa: " + e);
            });
    return r;
}
async function make_arrFavTransObj(t) {
    try {
        var a = [];
        for (let e = 0; e < t.length; e++) {
            var r = await fetchDataToJson(`./modules/text/${t[e]}/bibleqt.json`);
            a[e] = r;
        }
        return a;
    } catch (e) {
        console.error("make_arrFavTransObj. error: ", e);
    }
}
async function make_arrFavTskObj() {
    try {
        var t = ["tsk"],
            a = [];
        for (let e = 0; e < t.length; e++) {
            var r = await fetchDataToJson(`./modules/text/${t[e]}/bibleqt.json`);
            a[e] = r;
        }
        return a;
    } catch (e) {
        console.error("make_arrFavTskObj. error: ", e);
    }
}
function checkPositionShowForMob() {
    window.innerWidth < pantallaTabletMinPx && changePositionShow((positionShow = "row"));
}
async function iniciarSesion() {
    try {
        if (get_cookieConsent && "rejected" === get_cookieConsent)
            openModal("center", "Cookies", 'Si no aceptas cookies no puedes iniciar sesión. <a onclick="showBlockCookies(); closeModal(null,true);">Seleccionar Coockies</a>.', "showAviso");
        else {
            let t = document.getElementById("username_email").value.trim();
            var e = document.getElementById("password").value.trim(),
                a = ((t = t.toLowerCase()), []);
            if ((("" != t && "" != e) || a.push(obj_lang.d203), validarEmail(t) || a.push(obj_lang.d278), validarPassword(e) || a.push(obj_lang.d279), 0 < a.length)) {
                let t = "";
                a.forEach((e) => {
                    t += e + "<br>";
                });
                var r = document.querySelector(".login-form .mensaje");
                r.classList.add("color_red"), void (r.innerHTML = t);
            } else
                !(async function (e) {
                    e.success
                        ? (mostrarForm("bl_sesion_iniciada"),
                          (eid_bl_sesion_iniciada.querySelector("h1").innerHTML = `<span data-dic="d207">${obj_lang.d207}</span>, ${e.username}!`),
                          (eid_bl_sesion_iniciada.querySelector(".mensaje").innerHTML = `<span class="clr_gr-een" data-dic="d149">${obj_lang.d149}</span>`),
                          (eid_login_menu.title = "" + e.username),
                          pintLoginImg((hay_sesion = !0)),
                          (allowUseShowTrans = !0),
                          await obtenerDatosDeBD("fav_trans", "arrFavTrans"),
                          await obtenerDatosDeBD("ajustes", "obj_ajustes"),
                          await obtenerDatosDeBD("vkladki", "arrTabs"),
                          await obtenerDatosDeBD("hist_nav", "arr_hist_nav"),
                          await obtenerDatosDeBD("hist_find", "arr_hist_find"),
                          await obtenerDatosDeBD("hist_strong", "arr_hist_strong"),
                          await obtenerDatosDeBD("markers", "arr_markers"),
                          setTimeout(() => {
                              closeModal("Login");
                          }, 10),
                          setTimeout(() => {
                              window.location.href = "?auth_ok";
                          }, 510))
                        : ((e = obj_lang[e.dic_code]),
                          (eid_bl_login_form.querySelector("h1").innerHTML = `<span data-dic="d204">${obj_lang.d204}</span>`),
                          (eid_bl_login_form.querySelector(".mensaje").innerHTML = `<span><span data-dic="d205">${obj_lang.d205}</span> ${t}. <br><span>${e}</span></span>`),
                          eid_bl_login_form.querySelector("h1").classList.add("color_red"),
                          eid_bl_login_form.querySelector(".mensaje").classList.add("color_red"),
                          pintLoginImg((hay_sesion = !1)));
                    mySizeWindow();
                })(await (await fetch("./php/iniciar_sesion.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: t, password: e }) })).json());
        }
    } catch (e) {
        console.error("iniciarSesion. error: ", e);
    }
}
async function cerrarSesion() {
    try {
        updateArrTabs();
        (await (await fetch("./php/cerrar_sesion.php")).json()).cerrada
            ? (pintLoginImg((hay_sesion = !1)),
              (eid_bl_login_form.querySelector(".mensaje").innerHTML = `<span data-dic="d208">${obj_lang.d208}</span>`),
              (eid_login_menu.title = obj_lang.d209),
              (eid_partDeskTabs.innerHTML = ""),
              addTab(null, null, null, "tab_new"))
            : console.error("Error al cerrar sesión"),
            (arrFavTrans = arrFavTransDef),
            pushStateHome();
        var e = obj_lang.d208;
        openModal("center", "Sesión", e, "showAviso"),
            setTimeout(() => {
                location.reload();
            }, 2500),
            mySizeWindow();
    } catch (e) {
        console.error("iniciarSesion. error: ", e);
    }
}
function mostrarForm(e) {
    arrIdForms.forEach((e) => {
        document.getElementById(e).style.display = "none";
    }),
        (document.getElementById(e).style.display = "block"),
        listenFormOnInput(e);
}
function mostrarLoginForm() {
    mostrarForm("bl_login_form"), (eid_bl_login_form.querySelector("h1").textContent = obj_lang.d184), (eid_bl_login_form.querySelector(".mensaje").textContent = obj_lang.d188);
}
async function crearCuenta() {
    try {
        var e;
        if (get_cookieConsent && "rejected" === get_cookieConsent)
            (e = `<span>${obj_lang.d315}</span>`), (e += ` <a onclick="showBlockCookies(); closeModal(null,true);">${obj_lang.d316}</a>.`), openModal("center", "Cookies", e, "showAviso");
        else {
            var t = document.getElementById("reg_username").value.trim(),
                a = document.getElementById("reg_password").value.trim();
            let e = document.getElementById("reg_email").value.trim();
            e = e.toLowerCase();
            var r = [];
            if ((("" != t && "" != a && "" != e) || r.push(obj_lang.d210), validarEmail(e) || r.push(obj_lang.d278), validarPassword(a) || r.push(obj_lang.d279), 0 < r.length)) {
                let t = "";
                r.forEach((e) => {
                    t += e + "<br>";
                });
                var n = document.querySelector(".register-form .mensaje");
                n.classList.add("color_red"), void (n.innerHTML = t);
            } else {
                var s,
                    o = await (await fetch("./php/crear_cuenta.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: t, password: a, email: e, lang: lang }) })).json();
                if ((o.localhost && console.log(o.verifyLink), o.success)) {
                    var i = obj_lang[o.dic_code];
                    (eid_bl_register_form.querySelector(".mensaje").innerHTML = `<span class="clr_gr-een">${i}</span>`),
                        setTimeout(() => {
                            mostrarLoginForm();
                        }, 3e3);
                } else {
                    console.error(o.error), console.error(o.dic_code);
                    let e;
                    (e = o.conn_error ? ((s = reemplazarValores(obj_lang.d238, [o.conn_error])), console.error(s), reemplazarValores(obj_lang.d212, [t, s])) : reemplazarValores(obj_lang.d212, [t, obj_lang[o.dic_code]])),
                        (eid_bl_register_form.querySelector(".mensaje").innerHTML = `<span>${e}</span>`),
                        eid_bl_register_form.querySelector(".mensaje").classList.add("color_red");
                }
                mySizeWindow();
            }
        }
    } catch (e) {
        console.error("iniciarSesion. error: ", e);
    }
}
async function enviarEmail() {
    try {
        let e = document.getElementById("rec_email").value.trim();
        e = e.toLowerCase();
        var a = [];
        if (("" == e && a.push(obj_lang.d213), validarEmail(e) || a.push(obj_lang.d278), 0 < a.length)) {
            let t = "";
            a.forEach((e) => {
                t += e + "<br>";
            });
            var r = document.querySelector(".email-form .mensaje");
            r.classList.add("color_red"), void (r.innerHTML = t);
        } else {
            var t,
                n,
                s = await (await fetch("./php/generar_reset_token.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: e, lang: lang }) })).json();
            void 0 !== s.resetLink && console.log(s.resetLink),
                s.success
                    ? ((t = reemplazarValores(obj_lang.d214, [e])),
                      (eid_bl_email_form.querySelector(".mensaje").innerHTML = `<span class="clr_gr-een">${t}</span>`),
                      setTimeout(() => {
                          mostrarLoginForm();
                      }, 3e3))
                    : (console.error("Error al enviar el email"),
                      console.error("data.error: ", s.error),
                      console.error("data.dic_code: ", s.dic_code),
                      console.error(obj_lang[s.dic_code]),
                      (n = reemplazarValores(obj_lang.d215, [e, obj_lang[s.dic_code]])),
                      (eid_bl_email_form.querySelector(".mensaje").innerHTML = `<span class="clr_red">${n}</span>`)),
                mySizeWindow();
        }
    } catch (e) {
        console.error("iniciarSesion. error: ", e);
    }
}
function listenFormOnInput(e) {
    switch (e) {
        case "bl_register_form":
            listenRegisterFormInput();
            break;
        case "bl_email_form":
            break;
        case "bl_change_email_form":
            listenChangeEmailFormInput();
            break;
        case "bl_login_form":
            listenLoginFormInput();
    }
}
function listenRegisterFormInput() {
    document.querySelectorAll(".register-form input").forEach((e) => {
        e.oninput = () => {
            var e = document.querySelector(".register-form .mensaje");
            e.classList.contains("color_red") && (e.classList.remove("color_red"), (e.innerHTML = obj_lang.d178));
        };
    });
}
function listenChangeEmailFormInput() {
    document.querySelectorAll(".change-email-form input").forEach((e) => {
        e.oninput = () => {
            var e = document.querySelector(".change-email-form .mensaje");
            e.classList.contains("color_red") && (e.classList.remove("color_red"), (e.innerHTML = obj_lang.d186));
        };
    });
}
function listenLoginFormInput() {
    document.querySelectorAll(".login-form input").forEach((e) => {
        e.oninput = () => {
            var e = document.querySelector(".login-form h1"),
                e = (e.classList.contains("color_red") && (e.classList.remove("color_red"), (e.innerHTML = obj_lang.d184)), document.querySelector(".login-form .mensaje"));
            e.classList.contains("color_red") && (e.classList.remove("color_red"), (e.innerHTML = obj_lang.d188));
        };
    });
}
async function enviarChangeEmail() {
    console.log("=== function enviarChangeEmail() ===");
    try {
        let t = document.getElementById("act_email").value.trim();
        var e = document.getElementById("act_password").value.trim(),
            a = document.getElementById("new_password").value.trim(),
            r = document.getElementById("new_password_rep").value.trim(),
            n = ((t = t.toLowerCase()), []);
        if (
            ("" == t && n.push(obj_lang.d213),
            "" == e && n.push(obj_lang.d268),
            "" == a && n.push(obj_lang.d269),
            "" == r && n.push(obj_lang.d270),
            a != r && n.push(obj_lang.d271),
            validarEmail(t) || n.push(obj_lang.d278),
            validarPassword(e) || n.push(obj_lang.d279),
            0 < n.length)
        ) {
            let t = "";
            n.forEach((e) => {
                t += e + "<br>";
            });
            var s = document.querySelector(".change-email-form .mensaje");
            s.classList.add("color_red"), void (s.innerHTML = t);
        } else {
            var o = await (
                await fetch("./php/update_password.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: t, password: e, new_password: a, new_password_rep: r, lang: lang }) })
            ).json();
            if ((void 0 !== o.localhost && console.log(o.linkLogin), o.success)) {
                var i = reemplazarValores(obj_lang.d232, [t]);
                let e = "";
                o.mail_sent && (e = "<br>" + obj_lang.d273),
                    (eid_bl_change_email_form.querySelector(".mensaje").innerHTML = `<span class="clr_gr-een">${i} ${e}</span>`),
                    setTimeout(() => {
                        mostrarLoginForm();
                    }, 3e3);
            } else {
                console.error("Error al actualizar la contraseña"), console.error("data.error: ", o.error), console.error("data.dic_code: ", o.dic_code), console.error(obj_lang[o.dic_code]);
                var l = obj_lang.d267,
                    d = obj_lang[o.dic_code];
                eid_bl_change_email_form.querySelector(".mensaje").innerHTML = `<span class="clr_red">${l} <br>${d}</span>`;
            }
            mySizeWindow();
        }
    } catch (e) {
        console.error("enviarChangeEmail. error: ", e);
    }
}
function loadRefDefault(e, t = null) {
    addTab(e, (t = null == t ? arrFavTrans[0] : t), "act", null), getRefOfTab("tab1", e, t);
}
function loadAllFavBibleFiles() {
    var e, t;
    arrFavTrans.length == Object.keys(obj_bible_files).length
        ? ((e = obtenerTamanioObjetoMB(obj_bible_files)), (t = obj_lang.d216), (t += `<br><br>${obj_lang.d217}: <span class="f_r">${e}</span>`), openModal("center", obj_lang.d218, t, "showAviso"))
        : (async function l(d, _) {
              const a = _[d];
              let e = arrFavTransObj.find((e) => e.Translation === a);
              if (d < _.length && (void 0 === obj_bible_files[a] || countElementsInArray(obj_bible_files[a].Books) < e.BookQty))
                  try {
                      let e = `./modules/text/${a}/bibleqt.json`;
                      const r = await fetch(e),
                          n = await r.json();
                      void 0 === obj_bible_files[n.Translation] && ((obj_bible_files[n.Translation] = {}), (obj_bible_files[n.Translation].Books = []));
                      let t = 0;
                      async function c(a, r) {
                          const n = r.Books[a];
                          if (void 0 === n) return l(++d, _), !1;
                          let s = `./modules/text/${r.Translation}/` + n.PathName;
                          if (void 0 === obj_bible_files[r.Translation].Books[a])
                              try {
                                  if (s.includes("no_disponible.htm")) return ++a == r.Books.length ? l(++d, _) : c(a, r), !1;
                                  const o = await fetch(s),
                                      i = await o.text();
                                  obj_bible_files[r.Translation].Books[a] = { fileName: n.PathName, fileContent: i };
                                  let e = Object.keys(obj_bible_files).length,
                                      t = document.getElementById("m_btn_loadAllFavBibleFiles");
                                  if (((t.innerHTML = `${obj_lang.d219} (${e})`), ++a < r.Books.length)) c(a, r);
                                  else if (a == r.Books.length && (++d < _.length && l(d, _), d == _.length)) {
                                      let e = obtenerTamanioObjetoMB(obj_bible_files),
                                          t = obj_lang.d220;
                                      (t += `<br><br>${obj_lang.d217}:  <span class="f_r">${e}</span>`), openModal("center", obj_lang.d218, t, "showAviso");
                                  }
                              } catch (e) {
                                  console.error("loadAllFavBibleFiles(). error try-catch. error: ", e);
                              }
                          else c(++a, r);
                      }
                      c(0, n);
                  } catch (e) {
                      console.error("loadAllFavBibleFiles(). error try-catch. error: ", e);
                  }
              else d < _.length && l(++d, _);
          })(0, arrFavTrans);
}
function loadAllFavTskFiles() {
    var e, t;
    arrFavTsk.length == Object.keys(obj_tsk_files).length
        ? ((e = obtenerTamanioObjetoMB(obj_tsk_files)), (t = obj_lang.d221), (t += `<br><br>${obj_lang.d217}: <span class="f_r">${e}</span>`), openModal("center", obj_lang.d222, t, "showAviso"))
        : (async function l(d, _) {
              const a = _[d];
              try {
                  let e = `./modules/text/${a}/bibleqt.json`;
                  const r = await fetch(e),
                      n = await r.json();
                  void 0 === obj_tsk_files[n.Translation] && ((obj_tsk_files[n.Translation] = {}), (obj_tsk_files[n.Translation].Books = []));
                  let t = 0;
                  async function c(a, r) {
                      const n = r.Books[a];
                      if (void 0 === n) return l(++d, _), !1;
                      let s = `./modules/text/${r.Translation}/` + n.PathName;
                      if (void 0 === obj_tsk_files[r.Translation].Books[a])
                          try {
                              if (s.includes("no_disponible.htm")) return ++a == r.Books.length ? l(++d, _) : c(a, r), !1;
                              const o = await fetch(s),
                                  i = await o.text();
                              obj_tsk_files[r.Translation].Books[a] = { fileName: n.PathName, fileContent: i };
                              let e = Object.keys(obj_tsk_files).length,
                                  t = document.getElementById("m_btn_loadAllFavTskFiles");
                              if (((t.innerHTML = `TSK (${e})`), ++a < r.Books.length)) c(a, r);
                              else if (a == r.Books.length && (++d < _.length && l(d, _), d == _.length)) {
                                  let e = obtenerTamanioObjetoMB(obj_tsk_files),
                                      t = obj_lang.d223;
                                  (t += `<br><br>${obj_lang.d217}: <span class="f_r">${e}</span>`), openModal("center", obj_lang.d222, t, "showAviso");
                              }
                          } catch (e) {
                              console.error("loadAllFavTskFiles(). error try-catch. error: ", e);
                          }
                      else c(++a, r);
                  }
                  c(0, n);
              } catch (e) {
                  console.error("loadAllFavTskFiles(). error try-catch. error: ", e);
              }
          })(0, arrFavTsk);
}
function loadAllFavStrongFiles() {
    var e,
        t,
        a = ["hebrew", "greek"];
    let _ = ["hebrew_short.json", "greek_short.json"];
    a.length == Object.keys(obj_strong_files).length
        ? ((e = obtenerTamanioObjetoMB(obj_strong_files)), (t = obj_lang.d224), (t += `<br><br>${obj_lang.d217}: <span class="f_r">${e}</span>`), openModal("center", obj_lang.d225, t, "showAviso"))
        : (async function r(n, s) {
              const o = s[n];
              const i = _[n];
              try {
                  let e = "./modules/text/strongs/" + i;
                  const l = await fetch(e),
                      d = await l.json();
                  void 0 === obj_strong_files[o] && (obj_strong_files[o] = {}), (obj_strong_files[o] = { fileName: i, fileContent: d });
                  let t = Object.keys(obj_strong_files).length,
                      a = document.getElementById("m_btn_loadAllFavStrongFiles");
                  if (((a.innerHTML = `${obj_lang.d163} (${t})`), ++n < s.length)) r(n, s);
                  else if (n == s.length) {
                      let e = obtenerTamanioObjetoMB(obj_strong_files),
                          t = obj_lang.d226;
                      (t += `<br><br>${obj_lang.d217}: <span class="f_r">${e}</span>`), openModal("center", obj_lang.d225, t, "showAviso");
                  }
              } catch (e) {
                  console.error("error en try-catch. loadAllFavStrongFiles(). error: ", e);
              }
          })(0, a);
}
function agregarSeparadores(e, t) {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t);
}
async function loadDefaultFunctions() {
    var e;
    (is_loading_def_functions = !0),
        makeFooterBtnsFromArrFavTransObj(),
        getActTrans(),
        updateBtnActTransNavOnLoad(),
        hideShowVkladkiInMob(),
        checkMaxWidthCol(),
        checkModoMobile(),
        checkIMGx2(),
        toggleIMGx2(),
        checkModoFetchVersesForCols(),
        hay_sesion && (await verificarAutenticacion())
            ? (await obtenerDatosDeBD("ajustes", "obj_ajustes"),
              await obtenerDatosDeBD("vkladki", "arrTabs"),
              await obtenerDatosDeBD("hist_nav", "arr_hist_nav"),
              await obtenerDatosDeBD("hist_find", "arr_hist_find"),
              await obtenerDatosDeBD("hist_strong", "arr_hist_strong"),
              await obtenerDatosDeBD("markers", "arr_markers"))
            : hay_get_data
            ? ((get_trans = typeof get_trans ? get_trans : arrFavTrans[0]), loadRefDefault(get_ref, get_trans))
            : loadRefDefault((e = arrFavTransObj.find((e) => e.Translation === arrFavTrans[0])).Books[0].ShortNames[0] + " 1:1", e.Translation),
        addListenerModule(),
        updateTransOnClickOnActiveCol(),
        doPageDownOnScroll(),
        (document.onkeydown = checkKey),
        changeLang(obj_ajustes.lang),
        setTimeout(() => {
            pintRefOnScroll();
        }, 100);
}
function makeFooterBtnsFromArrFavTransObj() {
    (eid_footerInner.innerHTML = ""),
        arrFavTransObj.forEach((t, e) => {
            var a = document.createElement("button");
            (a.className = 0 == e ? "btn btn_active" : "btn"),
                (a.onclick = (e) => {
                    changeTrans(e.target, t.Translation, t.BibleShortName, t.EnglishPsalms);
                }),
                (a.ep = t.EnglishPsalms),
                (a.title = t.BibleName),
                (a.value = t.Translation),
                (a.innerHTML = t.BibleShortName),
                eid_footerInner.append(a);
        });
}
function obtenerTamanioObjeto(e) {
    e = JSON.stringify(e);
    return new TextEncoder().encode(e).length;
}
function obtenerTamanioObjetoMB(e) {
    return (obtenerTamanioObjeto(e) / 1e3 / 1e3).toFixed(1) + " MB";
}
function mostrarTamanioObjeto(e) {
    obtenerTamanioObjeto(e);
}
function changeModo(e) {
    document.getElementById("m_btnByText"), document.getElementById("m_btnByJson");
    ["by_text", "by_json"].includes(e) && ((modo_fetch_verses_for_cols = e), (modo_fetch_verses_for_tsk_block = e), (modo_fetch_verses_compare = e), checkModoFetchVersesForCols()), closeModal(null, !0);
}
function checkModoFetchVersesForCols() {
    var e = document.getElementById("m_btnByText"),
        t = document.getElementById("m_btnByJson"),
        a = document.getElementById("d_sw_ByText"),
        r = document.getElementById("d_sw_ByJson"),
        a = a.querySelector("input"),
        r = r.querySelector("input");
    "by_json" == modo_fetch_verses_for_cols
        ? (e.classList.remove("btn_active"), t.classList.add("btn_active"), enableSwitcher(r), disableSwitcher(a))
        : (e.classList.add("btn_active"), t.classList.remove("btn_active"), enableSwitcher(a), disableSwitcher(r));
}
function hideShowVkladkiInMob() {
    var e = document.getElementById("m_btnVkladkiInMob"),
        t = document.getElementById("d_sw_VkladkiInMob").querySelector("input");
    (vkladkiInMobShow
        ? ((vkladkiInMobShow = !1), eid_headerContainer.classList.remove("vkladki_in_mob"), eid_headerContainer.querySelector(".partDesk").classList.remove("vkladki_in_mob"), e.classList.remove("btn_active"), disableSwitcher)
        : ((vkladkiInMobShow = !0), eid_headerContainer.classList.add("vkladki_in_mob"), eid_headerContainer.querySelector(".partDesk").classList.add("vkladki_in_mob"), e.classList.add("btn_active"), enableSwitcher))(t),
        scrollToVkladkaActive(),
        mySizeWindow();
}
function showTooltip(e) {
    null != e.children[0] && e.children[0].remove();
    var t = `<span class="tooltiptext"> <span class="trik1"></span> <span class="text">${e.getAttribute("data-tooltip")}</span>   </span>`;
    if (((e.innerHTML += t), e.innerHTML.includes("<a ") && e.innerHTML.includes("</a>"))) {
        var t = e.parentElement.parentElement,
            i = t.id.split("__");
        let a = i[0],
            r = i[1],
            n = i[2],
            s = i[3],
            o = t.querySelector("a").textContent;
        e.querySelectorAll(".tooltiptext .text a").forEach((t) => {
            t.addEventListener("click", (e) => {
                e.preventDefault(), addRefToHistNav(a, o, r, n, s, null), getRefByHref(t.getAttribute("href"), "/", 1);
            });
        });
    }
    var i = e.getBoundingClientRect().top,
        t = e.getBoundingClientRect().left,
        a = e.offsetHeight,
        r = e.offsetWidth,
        n = (e.children[0].offsetHeight, e.children[0].offsetWidth);
    (e.children[0].style.position = "fixed"),
        (e.children[0].style.top = i + a + "px"),
        (e.children[0].style.left = t - n / 2 + r / 2 + "px"),
        (e.children[0].children[0].style.position = "fixed"),
        (e.children[0].children[0].style.top = i + a - 5 + "px"),
        (e.children[0].children[0].style.left = t + "px"),
        t < n / 2
            ? (e.children[0].style.left = t - r / 2 + "px")
            : document.documentElement.offsetWidth - t < n
            ? (e.children[0].style.left = document.documentElement.offsetWidth - n + "px")
            : (e.children[0].style.left = t - n / 2 + r / 2 + "px");
}
function hideTooltip(e) {
    null != e.children[0] && e.children[0].remove();
}
function buildWrTooltip(e, t = null, i, l) {
    var a = document.createElement("span"),
        r =
            ((a.className = "wr_tooltip"),
            a.addEventListener("click", (e) => {
                hideShowComment(e);
            }),
            document.createElement("span")),
        n = ((r.className = "tooltip"), document.createElement("span")),
        e = ((n.className = "asterisco"), (n.innerHTML = e), document.createElement("span")),
        s = ((e.className = "trik d-none"), document.createElement("span")),
        o = ((s.className = "comment d-none"), document.createElement("span")),
        d = ((o.className = "commentInner"), document.createElement("span")),
        _ =
            ((d.className = "close"),
            (d.onclick = (e) => {
                close_comment_x(e.target.parentElement.parentElement.parentElement, e);
            }),
            (d.innerHTML = "&#10005;"),
            document.createElement("span"));
    if (((_.className = "text"), (_.innerHTML = t), a.append(r), r.append(n), r.append(e), a.append(s), s.append(o), o.append(d), o.append(_), _.innerHTML.includes("<a ") && _.innerHTML.includes("</a>"))) {
        t = i.split("__");
        let a = t[0],
            r = t[1],
            n = t[2],
            s = t[3],
            o = l;
        _.querySelectorAll("a").forEach((t) => {
            t.addEventListener("click", (e) => {
                e.preventDefault(), addRefToHistNav(a, o, r, n, s, null), getRefByHref(t.getAttribute("href"), "/", 1);
            });
        });
    }
    return a;
}
function buildWrTooltipComm(e, t, a, c) {
    var r = a.split("__"),
        r = (r[0], e.replace("[", "").replace("]", "")),
        n = document.createElement("span"),
        a =
            ((n.className = "wr_tooltip"),
            (n.dataset.p_id = a),
            (n.dataset.marker = e),
            n.addEventListener("click", (e) => {
                let l = e.currentTarget.dataset.p_id,
                    n = e.currentTarget.dataset.marker;
                var t = l.split("__"),
                    a = t[0];
                let s = Number(t[1]),
                    o = Number(t[2]),
                    d = Number(t[3]),
                    _ = `./modules/commentaries/${a}.json`;
                !(async function () {
                    var e = await convertBookIndex(s, "bq_to_mb"),
                        a = await getCommentFromMB(_, e, o, d, n);
                    if (null != document.querySelector(`.wr_tooltip[data-marker="${n}"]`)) {
                        let t;
                        a.chapter_number_from === a.chapter_number_to
                            ? (t = a.verse_number_from === a.verse_number_to ? a.chapter_number_from + ":" + a.verse_number_from : `${a.chapter_number_from}:${a.verse_number_from} - ` + a.verse_number_to)
                            : a.chapter_number_from !== a.chapter_number_to && (t = `${a.chapter_number_from}:${a.verse_number_from} — ${a.chapter_number_to}:` + a.verse_number_to);
                        var r = document.querySelectorAll(`.wr_tooltip[data-marker="${n}"]`);
                        if (0 < r.length)
                            for (let e = 0; e < r.length; e++)
                                if (((r[e].querySelector(".text").innerHTML = ` <span>  <span class="text_ch_v">${t}</span>  <span>${a.text}</span> </span>   `), p.innerHTML.includes("<a ") && p.innerHTML.includes("</a>"))) {
                                    var i = l.split("__");
                                    let a = i[0],
                                        r = i[1],
                                        n = i[2],
                                        s = i[3],
                                        o = c;
                                    p.querySelectorAll("a").forEach((t) => {
                                        t.addEventListener("click", (e) => {
                                            e.preventDefault(), addRefToHistNav(a, o, r, n, s, null), getRefByHrefMB(a, t.getAttribute("href"), " ", 0);
                                        });
                                    });
                                }
                    }
                })(),
                    hideShowComment(e);
            }),
            document.createElement("span")),
        e = ((a.className = "tooltip"), document.createElement("span")),
        r = ((e.className = "asterisco"), (e.innerHTML = r), document.createElement("span")),
        s = ((r.className = "trik d-none"), document.createElement("span")),
        o = ((s.className = "comment d-none"), document.createElement("span")),
        i = ((o.className = "commentInner"), document.createElement("span"));
    (i.className = "close"),
        (i.onclick = (e) => {
            close_comment_x(e.target.parentElement.parentElement.parentElement, e);
        }),
        (i.innerHTML = "&#10005;");
    const p = document.createElement("span");
    return (p.className = "text"), (p.innerHTML = t), n.append(a), a.append(e), a.append(r), n.append(s), s.append(o), o.append(i), o.append(p), n;
}
async function getCommentFromMB(e, t, a, r, n) {
    try {
        var s = await fetch(e);
        if (s.ok) return (await s.json()).find((e) => !(e.book_number !== t || (e.chapter_number_from !== a && e.chapter_number_to !== a) || (e.verse_number_from !== r && e.verse_number_to !== r) || e.marker !== n));
        throw new Error("Error al obtener datos de la API");
    } catch (e) {
        console.error("Error: ", e);
    }
}
async function convertBookIndex(a, r) {
    try {
        a = Number(a);
        var n = await fetch("./modules/json/BibleIndex.json");
        if (!n.ok) throw new Error("Error al obtener datos de la API");
        var s = await n.json();
        let e, t;
        return "bq_to_mb" == r ? ((e = s.find((e) => e.book_number_bq === a)), (t = e.book_number_mb)) : "mb_to_bq" == r && ((e = s.find((e) => e.book_number_mb === a)), (t = e.book_number_bq)), t;
    } catch (e) {
        console.error("Error: ", e);
    }
}
function makeCommentsLinks(e) {
    e = document.getElementById(e).querySelectorAll("f");
    Array.from(e).forEach((e) => {
        var t = e.innerText,
            a = (e.innerText.replace("[", "").replace("]", ""), e.parentNode.parentNode.id),
            r = e.parentNode.parentNode.querySelector("a").innerText,
            n = a.split("__"),
            n = (n[0], buildWrTooltipComm(t, " ", a, r));
        e.replaceWith(n);
    });
}
function getArrSumLineH() {
    (window.arr2_sum_line_h = []), (window.arr1_line_h = []);
    let a = document.querySelectorAll(".colsInner");
    a.forEach(function (e, t) {
        a.forEach((e) => {
            Array.from(e.children).forEach((e) => {
                e.style.removeProperty("height");
            });
        });
        t = document.querySelectorAll(".colsInner")[t].children;
        let r = [],
            n = [],
            s = 0;
        Array.from(t).forEach(function (e, t, a) {
            s += a[t].offsetHeight;
            a = a[t].offsetHeight;
            n.push(a), r.push(s);
        }),
            arr2_sum_line_h.push(r),
            arr1_line_h.push(n);
    }),
        (window.arr2_line_h = []),
        a.forEach((e) => {
            Array.from(e.children).forEach((e) => {
                e.style.removeProperty("height");
            });
        });
    for (let t = 0; t < a[0].children.length; t++) {
        var r,
            n = [];
        for (let e = 0; e < a.length; e++) {
            var s = void 0 !== arr_h[e][t] ? arr_h[e][t] : 0;
            n.push(s),
                void 0 !== document.querySelectorAll(".colsInner")[e].children[t] &&
                    (document.querySelectorAll(".colsInner")[e].children[t].innerHTML, ["span", "b", "i", "strong"].includes(document.querySelectorAll(".colsInner")[e].children[t].localName)) &&
                    (document.querySelectorAll(".colsInner")[e].children[t].style.display = "block");
        }
        if ((arr2_line_h.push(n), (r = Math.max(...n)), "col" == positionShow))
            for (let e = 0; e < a.length; e++) void 0 !== document.querySelectorAll(".colsInner")[e].children[t] && (document.querySelectorAll(".colsInner")[e].children[t].style.height = r + "px");
    }
}
function init_scroll_in_colsInner() {
    var e = document.querySelectorAll(".colsInner");
    1 < e.length &&
        e.forEach((e, t) => {
            (e.onmouseover = () => {
                enable_scroll_in_colsInner(e, t);
            }),
                (e.ontouchmove = () => {
                    enable_scroll_in_colsInner(e, t);
                });
        });
}
function finish_scroll_in_colsInner() {
    document.querySelectorAll(".colsInner").forEach((e, t) => {
        (e.onmouseover = () => {
            disable_scroll_in_colsInner(e, t);
        }),
            (e.ontouchmove = () => {
                disable_scroll_in_colsInner(e, t);
            });
    });
}
function enable_scroll_in_colsInner(e, t) {
    (e.onscroll = () => {
        scroll_in_colsInner(e, t);
    }),
        (e.ontouchmove = () => {
            scroll_in_colsInner(e, t);
        });
}
function disable_scroll_in_colsInner(e, t) {
    (e.onscroll = () => {}), (e.ontouchmove = () => {});
}
function reset_scroll_in_other_cols(r) {
    Array.from(document.querySelectorAll(".colsInner")).forEach((e, t, a) => {
        t != r && (a[t].onscroll = !1);
    });
}
function scroll_in_colsInner(r, d) {
    let _ = r.scrollTop;
    var e = document.querySelectorAll(".colsInner");
    let c;
    if (
        (reset_scroll_in_other_cols(d),
        "col" == positionShow &&
            Array.from(e).forEach((e, t, a) => {
                (c = a[t].scrollTop), a[t] != r && c != _ && (a[t].scrollTop = _);
            }),
        "row" == positionShow)
    ) {
        let l = [];
        Array.from(e).forEach((e, n, s) => {
            if (((c = s[n].scrollTop), s[n] == r)) l[n] = _;
            else if (c != _)
                if (void 0 !== arr2_sum_line_h[d]) {
                    let e, r;
                    for (let a = 0; a < arr2_sum_line_h[d].length; a++)
                        if (((r = ((e = 0 == a ? 0 : arr2_sum_line_h[d][a - 1]), arr2_sum_line_h[d][a])), _ >= e && _ <= r)) {
                            var o = r - _;
                            let t;
                            t = void 0 !== arr2_line_h[a] && 0 <= arr2_line_h[a].indexOf(arr2_line_h[a][d]) ? (arr2_line_h[a][d] - o) / arr2_line_h[a][d] : 1;
                            var i = [];
                            for (let e = 0; e < arr2_sum_line_h.length; e++) i.push(arr2_sum_line_h[e][a]);
                            if (1 < [...new Set(i)].length) {
                                if (void 0 !== arr2_sum_line_h[n]) {
                                    o = 0 < a ? arr2_sum_line_h[n][a - 1] : 0;
                                    let e;
                                    (e = void 0 !== arr2_line_h[a] ? o + arr2_line_h[a][n] * t : 2e3 * t), (s[n].scrollTop = e), (l[n] = e);
                                }
                            } else (s[n].scrollTop = _), (l[n] = _);
                            break;
                        }
                } else console.error(`Error: arr2_sum_line_h[${d}] no está definido`);
        });
    }
}
function scrollToVerse(a, r = null, t = "start") {
    if (
        (document.querySelectorAll("#wrCols .active").forEach((e) => {
            e.classList.remove("active"), e.classList.remove("active_first"), e.classList.remove("active_middle"), e.classList.remove("active_last");
        }),
        document.querySelectorAll("#wrCols .active_one").forEach((e) => {
            e.classList.remove("active_one");
        }),
        null != r && "" != r)
    ) {
        if (parseInt(a) < parseInt(r))
            for (let t = parseInt(a); t <= parseInt(r); t++)
                Array.from(document.querySelectorAll('[data-verse="' + t + '"]')).forEach((e) => {
                    e.classList.add("active"), t == parseInt(a) ? e.classList.add("active_first") : t == parseInt(r) ? e.classList.add("active_last") : e.classList.add("active_middle");
                });
    } else
        document.querySelectorAll('[data-verse="' + a + '"]').forEach((e) => {
            e.classList.add("active_one");
        });
    setTimeout(() => {
        document.querySelectorAll('[data-verse="' + a + '"]').forEach((e) => {
            e.scrollIntoView({ block: t, inline: "nearest" }), (document.documentElement.scrollTop = 0);
        });
    }, 300);
}
function scrollToVerseView(e, t = "start") {
    setTimeout(() => {
        document.querySelectorAll('[data-verse="' + e + '"]').forEach((e) => {
            e.scrollIntoView({ block: t, inline: "nearest" }), (document.documentElement.scrollTop = 0);
        });
    }, 300);
}
crear_obj_lang(), checkPositionShowForMob();
let isMouseDown = !1;
function getShortBookName() {}
function addListenStrong(e) {
    let t;
    (t = 39 <= e.parentElement.id.split("__")[1] ? "Grk" : "Heb"), getStrongNumber(e.innerText);
}
function addListenStrongS(e) {
    getStrongNumber(e.innerHTML);
}
function makeStrongNumbersActiveFind() {
    let e = document.querySelectorAll("#find_body .strongActive");
    setTimeout(() => {
        e.forEach((e) => {
            e.addEventListener("click", () => {
                addListenStrong(e);
            });
        });
    }, 500);
}
function showHideStrongNumbers() {
    var e = document.querySelectorAll(".strong, .colsInner p S"),
        t = document.getElementById("btnStrong"),
        r = document.getElementById("m_btnStrong");
    if (0 != e.length) {
        e[0].classList.contains("show") ? ((strongAction = "hide"), t.classList.remove("btn_active"), r.classList.remove("btn_active")) : ((strongAction = "show"), t.classList.add("btn_active"), r.classList.add("btn_active")),
            e.forEach((e) => {
                "hide" == strongAction ? e.classList.remove("show", "strongActive") : e.classList.add("show", "strongActive");
            }),
            document.querySelectorAll(".strongActive:not(#find_body .strongActive)").forEach((e) => {
                "hide" == strongAction
                    ? e.removeEventListener("click", addListenStrong)
                    : e.addEventListener("click", () => {
                          addListenStrong(e);
                      });
            }),
            mySizeVerse(),
            mySizeWindow();
        let a = [];
        if (
            (Array.from(document.querySelectorAll(".colsInner")[0].children).forEach((e) => {
                e.classList.contains("active") && a.push(e.getAttribute("data-verse"));
            }),
            0 < a.length)
        ) {
            let e, t;
            (t = 1 == a.length ? ((e = a[0]), null) : ((e = a[0]), a[a.length - 1])),
                setTimeout(() => {
                    scrollToVerse(e, t);
                }, 200);
        }
    }
}
function getArrTransFromCols() {
    (window.arr_trans = []),
        (window.arr_divShow = []),
        document.querySelectorAll(".colsHead").forEach((e, t) => {
            window.arr_trans.push(e.dataset.trans), window.arr_divShow.push(e.parentElement.getAttribute("id"));
        });
}
function makeArrTransFromCols() {
    (window.arr_trans = []),
        (window.arrDataDivShow = []),
        (window.obj_DataDivShow = {}),
        (window.arr_divShow = []),
        clearColsEmpty(),
        document.querySelectorAll(".colsHead").forEach((e, t) => {
            window.arr_trans.push(e.dataset.trans), window.arr_divShow.push(e.parentElement.getAttribute("id"));
        }),
        (window.arr_trans = window.arr_trans.filter((e) => e));
}
function makeArrColsFromCols() {
    (window.arr_cols = []),
        clearColsEmpty(),
        document.querySelectorAll(".cols").forEach((e) => {
            window.arr_cols.push(e.id);
        }),
        (window.arr_cols = window.arr_cols.filter((e) => e));
}
function clearColsEmpty() {
    document.querySelectorAll(".colsHead").forEach((e, t) => {
        void 0 === e.dataset.trans && (e.parentElement.remove(), mySizeWindow(), mySizeVerse());
    });
}
function showTrans(e, t, a = null, r = null, n = null) {
    makeArrTransFromCols(), allowUseShowTrans && ((allowUseShowTrans = !1), (window.iter_i = 0), showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], e, t, a, r, n));
}
function decode_html_2(e) {
    return new DOMParser().parseFromString(e, "text/html").documentElement.textContent;
}
function decode_html_1(e) {
    var t = document.createElement("textarea");
    return (t.innerHTML = e), t.value;
}
function htmlEntities(e) {
    return String(e).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
}
async function setBaseEnglishPsalms() {
    try {
        var e = eid_trans1.dataset.trans,
            t = await (await fetch(`./modules/text/${e}/bibleqt.json`)).json();
        eid_trans1.dataset.base_ep = t.EnglishPsalms;
    } catch (e) {
        console.error("Error try-catch. Error: ", e);
    }
}
async function setBaseEnglishPsalms2() {
    try {
        var e = eid_trans1.dataset.trans,
            t = await (await fetch(`./modules/text/${e}/bibleqt.json`)).json();
        eid_trans1.dataset.base_ep = t.EnglishPsalms;
    } catch (e) {}
}
async function getTsk(a) {
    let h = a.srcElement.parentElement,
        r = h.id.split("__");
    if (0 != (r = r.filter((e) => e)).length) {
        let Y = r[0],
            N = r[1],
            c = r[2],
            p = r[3],
            e = null;
        r[3].includes("-") && ((p = r.split("-")[0]), (e = r.split("-")[1]));
        var a = h.querySelector("a").innerText,
            n = null !== h.querySelector(".vt") ? h.querySelector(".vt").innerText.split(" ").slice(0, 7).join(" ") : null;
        addRefToHistNav(Y, a, N, c, p, e, n);
        let T = arrFavTransObj.find((e) => e.Translation === Y),
            R = ("N" == T.EnglishPsalms && ((a = convertLinkFromRusToEsp(N, c, p)), (N = a[0]), (c = a[1]), (p = a[2])), []),
            t = "tsk";
        const E = arrFavTskObj.find((e) => e.Translation === t);
        if (void 0 !== E) {
            if (
                (void 0 === obj_tsk_files.tsk && ((obj_tsk_files.tsk = {}), (obj_tsk_files.tsk.Books = [])),
                void 0 !== obj_tsk_files.tsk &&
                    void 0 !== obj_tsk_files.tsk.Books &&
                    void 0 !== obj_tsk_files.tsk.Books[N] &&
                    obj_tsk_files.tsk.Books[N].fileName == E.Books[N].PathName &&
                    "" != obj_tsk_files.tsk.Books[N].fileContent &&
                    " " != obj_tsk_files.tsk.Books[N].fileContent)
            )
                try {
                    let e = obj_tsk_files.tsk.Books[N].fileContent;
                    var s = (e = e.replaceAll("\r", "")).split("[")[c].split("]\n"),
                        o = (s[0], s[1]),
                        i = o.split("\n");
                    o[0];
                    let E = i[p - 1].split("=")[1].split("; ");
                    null == E && alert("error tb_arr_links"), (eid_tsk_head.innerHTML = ""), (eid_tsk_body.innerHTML = "");
                    var l = document.createElement("span"),
                        d = ((l.id = "sm_trans"), document.createElement("span"));
                    (d.className = "trans_tsk"), (d.textContent = document.querySelector('.colsHead[data-trans="' + Y + '"] .colsHeadInner .partDesk .desk_trans').innerHTML), l.append(d);
                    const H = document.createElement("p");
                    (H.id = h.id),
                        (H.className = "tsk tsk_verse"),
                        H.setAttribute("data-verse", h.getAttribute("data-verse")),
                        (H.dataset.trans = Y),
                        (H.innerHTML = h.innerHTML),
                        H.querySelector("a").addEventListener("click", () => {
                            goToLink(Y, H.querySelector("a").innerHTML);
                        }),
                        H.innerHTML.includes('<span class="btn_verse_menu"></span>') && H.querySelector(".btn_verse_menu").remove(),
                        H.innerHTML.includes("wr_tooltip") &&
                            (H.querySelector(".wr_tooltip").addEventListener("click", (e) => {
                                hideShowComment(e);
                            }),
                            H.querySelector(".close").addEventListener("click", (e) => {
                                close_comment_x(e.target.parentElement.parentElement.parentElement, e);
                            })),
                        eid_tsk_head.append(l),
                        eid_tsk_head.append(H),
                        (eid_tsk_head.scrollTop = 0),
                        mySizeTsk();
                    var _,
                        m,
                        u = document.createElement("div");
                    (u.className = "loader"),
                        (u.innerHTML = `<span class="loader__element"></span>  <span class="loader__element"></span>  <span class="loader__element"></span>`),
                        eid_tsk_body.append(u),
                        (R = []),
                        "" != E
                            ? (E.forEach((e, t) => {
                                  let y = t;
                                  var a = e.split(" ")[0];
                                  let k = e.split(" ")[1].split(":")[0];
                                  t = e.split(" ")[1].split(":")[1];
                                  let S = null,
                                      w = null,
                                      L = (t.includes("-") ? ((S = t.split("-")[0]), (w = t.split("-")[1])) : (S = t), T);
                                  (window.dataBooksTsk = L.Books),
                                      (window.bq_StrongNumbers = L.StrongNumbers),
                                      (window.bq_EnglishPsalms = L.EnglishPsalms),
                                      (window.bq_Notes = L.Notes),
                                      (window.bq_NoteSign = L.NoteSign),
                                      (window.bq_StartNoteSign = L.StartNoteSign),
                                      (window.bq_EndNoteSign = L.EndNoteSign),
                                      (window.bq_Titles = L.Titles),
                                      (window.bq_StartTitleSign = L.StartTitleSign),
                                      (window.bq_EndTitleSign = L.EndTitleSign),
                                      (window.bq_HTMLFilter = L.HTMLFilter);
                                  for (let t = 0, T = null; t < dataBooksTsk.length; t++) {
                                      var r = dataBooksTsk[t];
                                      for (let e = 0; e < r.ShortNames.length; e++) {
                                          var s = r.ShortNames[e];
                                          if (a.toLowerCase() == s.toLowerCase()) {
                                              r.BookNumber;
                                              if (
                                                  ((T = t),
                                                  "N" == bq_EnglishPsalms && ((s = convertLinkFromEspToRus(T, k, S, w)), (T = s[0]), (k = s[1]), (S = s[2]), (w = s[3])),
                                                  void 0 !== obj_bible_files[Y] &&
                                                      void 0 !== obj_bible_files[Y].Books[T] &&
                                                      obj_bible_files[Y].Books[T].fileName == L.Books[T].PathName &&
                                                      "" != obj_bible_files[Y].Books[T].fileContent &&
                                                      " " != obj_bible_files[Y].Books[T].fileContent)
                                              ) {
                                                  let n = obj_bible_files[Y].Books[T].fileContent.split("<h4>");
                                                  n = n.filter((e) => e);
                                                  s = k <= L.Books[T].ChapterQty ? n[k].split("<p>").length - 1 : n[L.Books[T].ChapterQty].split("<p>").length - 1;
                                                  if (k <= L.Books[T].ChapterQty && S <= s) {
                                                      let t = "",
                                                          a = "";
                                                      if ((null != w && parseInt(w) <= parseInt(S) && ((d = w), (_ = S), (S = d), (w = _)), null != w)) {
                                                          w = parseInt(w) <= s ? parseInt(w) : s;
                                                          for (let e = parseInt(S); e <= parseInt(w); e++) {
                                                              var o = n[k].split("<p>")[e].split(" "),
                                                                  i = o[0],
                                                                  o = (o.shift(), o.join(" ")),
                                                                  l = e == S ? " fch" : "";
                                                              (t += '<span class="stij_one' + l + '">'),
                                                                  e != S && (t += '<span class="stij_numb">' + i + "</span> "),
                                                                  (t = t + ('<span class="stij_text">' + o + "</span>") + "</span>"),
                                                                  (a = t);
                                                          }
                                                      } else {
                                                          var d = (t = n[k].split("<p>")[S]).split(" ");
                                                          d.shift(), (a = ' <span class="stij_text">' + d.join(" ") + "</span>");
                                                      }
                                                      const g = document.createElement("p");
                                                      let e = Y + "__" + T + "__" + k + "__" + S;
                                                      null != w && (e += "-" + w), (g.id = e), (g.className = "tsk tsk_link"), g.setAttribute("data-verse", S);
                                                      var _ = document.createElement("span"),
                                                          s = ((_.className = "sp_f"), (_.innerText = y + 1), g.append(_), document.createElement("a"));
                                                      s.href = "#";
                                                      let r = `${dataBooksTsk[T].ShortNames[0]} ${k}:` + S;
                                                      null != w && (r += "-" + w), (s.innerHTML = r), g.append(s), g.append(" ");
                                                      var c = document.createElement("span");
                                                      if (
                                                          ((c.className = "vt"),
                                                          "Y" == bq_StrongNumbers &&
                                                              (((p = a).includes(" ") ? p.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                                  var a, r, n;
                                                                  isNaN(parseInt(e)) && "0" != e
                                                                      ? (g.append(" "), g.append(e))
                                                                      : (((a = document.createElement("span")).className = "strong"),
                                                                        "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                                            ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), g.append(a), g.append(n))
                                                                            : ((a.innerHTML = e), g.append(a)));
                                                              }),
                                                              g.innerHTML.trim(),
                                                              "Y" == bq_HTMLFilter) &&
                                                              (g.innerHTML = htmlEntities(g.innerHTML)),
                                                          "Y" == bq_Notes)
                                                      ) {
                                                          var p = a;
                                                          if (p.includes(bq_NoteSign)) {
                                                              var h = p.split(bq_NoteSign)[0];
                                                              if (p.includes(bq_StartNoteSign) && p.includes(bq_EndNoteSign)) {
                                                                  var m = p.split(bq_StartNoteSign)[1].split(bq_EndNoteSign),
                                                                      u = m[0],
                                                                      m = m[1],
                                                                      b = document.createElement("span"),
                                                                      v = document.createElement("span");
                                                                  if ((h = "Y" == L.HTMLFilter ? htmlEntities(h) : h).includes('<h6 class="prim_h6">') && h.includes("</h6>")) {
                                                                      var f = document.createElement("h6");
                                                                      f.className = "prim_h6";
                                                                      let e = h.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                                      (e = e.filter((e) => e)), (f.innerHTML = e[0]), b.append(f);
                                                                  } else b.innerHTML = h;
                                                                  c.append(b), c.append(buildWrTooltip(L.NoteSign, u, g.id, s.innerHTML)), (m = "Y" == L.HTMLFilter ? htmlEntities(m) : m), (v.innerHTML = m), c.append(v), g.append(c);
                                                              }
                                                          } else (c.innerHTML = a), g.append(c), "Y" == bq_HTMLFilter && (g.innerHTML = htmlEntities(g.innerHTML));
                                                      }
                                                      "Y" == bq_Titles &&
                                                          ((f = a).includes(bq_StartTitleSign) && f.includes(bq_EndTitleSign)
                                                              ? ((b = (h = f.split(bq_StartTitleSign))[0]),
                                                                (s = (u = h[1].split(bq_EndTitleSign))[0]),
                                                                (m = u[1]),
                                                                ((v = document.createElement("span")).className = "verse_title"),
                                                                (v.innerHTML = s),
                                                                g.append(b),
                                                                g.append(v),
                                                                g.append(m))
                                                              : g.append(a),
                                                          "Y" == bq_HTMLFilter) &&
                                                          (g.innerHTML = htmlEntities(g.innerHTML)),
                                                          "N" == bq_StrongNumbers && "N" == bq_Notes && "N" == bq_Titles && ((c.innerHTML = a), g.append(c), "Y" == bq_HTMLFilter) && (g.innerHTML = htmlEntities(g.innerHTML)),
                                                          (R[y] = g);
                                                  } else R[y] = "";
                                                  countElementsInArray(R) == E.length && buildVersesTsk(R, Y);
                                              } else
                                                  try {
                                                      !(async function (n) {
                                                          (n = await fetch(n)), (n = await n.text());
                                                          crear_objeto_obj_bible_files &&
                                                              (void 0 === obj_bible_files[Y] && ((obj_bible_files[Y] = {}), (obj_bible_files[Y].Books = [])), void 0 === obj_bible_files[Y].Books[T]) &&
                                                              "" != n &&
                                                              " " != n &&
                                                              (obj_bible_files[Y].Books[T] = { fileName: L.Books[T].PathName, fileContent: n });
                                                          let s = n.split("<h4>"),
                                                              o = ((s = s.filter((e) => e)), k <= L.Books[T].ChapterQty ? s[k].split("<p>").length - 1 : s[L.Books[T].ChapterQty].split("<p>").length - 1);
                                                          if (k <= L.Books[T].ChapterQty && S <= o) {
                                                              let t = "",
                                                                  a = "";
                                                              if ((null != w && parseInt(w) <= parseInt(S) && ((n = w), (_ = S), (S = n), (w = _)), null != w)) {
                                                                  w = parseInt(w) <= o ? parseInt(w) : o;
                                                                  for (let e = parseInt(S); e <= parseInt(w); e++) {
                                                                      var i = s[k].split("<p>")[e].split(" "),
                                                                          l = i[0],
                                                                          i = (i.shift(), i.join(" ")),
                                                                          d = e == S ? " fch" : "";
                                                                      (t += '<span class="stij_one' + d + '">'),
                                                                          e != S && (t += '<span class="stij_numb">' + l + "</span> "),
                                                                          (t = t + ('<span class="stij_text">' + i + "</span>") + "</span>"),
                                                                          (a = t);
                                                                  }
                                                              } else {
                                                                  n = (t = s[k].split("<p>")[S]).split(" ");
                                                                  n.shift(), (a = ' <span class="stij_text">' + n.join(" ") + "</span>");
                                                              }
                                                              const g = document.createElement("p");
                                                              let e = Y + "__" + T + "__" + k + "__" + S;
                                                              null != w && (e += "-" + w), (g.id = e), (g.className = "tsk tsk_link"), g.setAttribute("data-verse", S);
                                                              var _ = document.createElement("span"),
                                                                  n = ((_.className = "sp_f"), (_.innerText = y + 1), g.append(_), document.createElement("a"));
                                                              n.href = "#";
                                                              let r = `${dataBooksTsk[T].ShortNames[0]} ${k}:` + S;
                                                              null != w && (r += "-" + w), (n.innerHTML = r), g.append(n), g.append(" ");
                                                              var c = document.createElement("span");
                                                              if (
                                                                  ((c.className = "vt"),
                                                                  "Y" == bq_StrongNumbers &&
                                                                      (((p = a).includes(" ") ? p.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                                          var a, r, n;
                                                                          isNaN(parseInt(e)) && "0" != e
                                                                              ? (g.append(" "), g.append(e))
                                                                              : (((a = document.createElement("span")).className = "strong"),
                                                                                "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                                                    ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), g.append(a), g.append(n))
                                                                                    : ((a.innerHTML = e), g.append(a)));
                                                                      }),
                                                                      g.innerHTML.trim(),
                                                                      "Y" == bq_HTMLFilter) &&
                                                                      (g.innerHTML = htmlEntities(g.innerHTML)),
                                                                  "Y" == bq_Notes)
                                                              ) {
                                                                  var p = a;
                                                                  if (p.includes(bq_NoteSign)) {
                                                                      var h = p.split(bq_NoteSign)[0];
                                                                      if (p.includes(bq_StartNoteSign) && p.includes(bq_EndNoteSign)) {
                                                                          var m = p.split(bq_StartNoteSign)[1].split(bq_EndNoteSign),
                                                                              u = m[0],
                                                                              m = m[1],
                                                                              b = document.createElement("span"),
                                                                              v = document.createElement("span");
                                                                          if ((h = "Y" == L.HTMLFilter ? htmlEntities(h) : h).includes('<h6 class="prim_h6">') && h.includes("</h6>")) {
                                                                              var f = document.createElement("h6");
                                                                              f.className = "prim_h6";
                                                                              let e = h.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                                              (e = e.filter((e) => e)), (f.innerHTML = e[0]), b.append(f);
                                                                          } else b.innerHTML = h;
                                                                          c.append(b), c.append(buildWrTooltip(L.NoteSign, u, g.id, n.innerHTML)), (m = "Y" == L.HTMLFilter ? htmlEntities(m) : m), (v.innerHTML = m), c.append(v), g.append(c);
                                                                      }
                                                                  } else (c.innerHTML = a), g.append(c), "Y" == bq_HTMLFilter && (g.innerHTML = htmlEntities(g.innerHTML));
                                                              }
                                                              "Y" == bq_Titles &&
                                                                  ((f = a).includes(bq_StartTitleSign) && f.includes(bq_EndTitleSign)
                                                                      ? ((h = f.split(bq_StartTitleSign)),
                                                                        (b = h[0]),
                                                                        (u = h[1].split(bq_EndTitleSign)),
                                                                        (n = u[0]),
                                                                        (m = u[1]),
                                                                        ((v = document.createElement("span")).className = "verse_title"),
                                                                        (v.innerHTML = n),
                                                                        g.append(b),
                                                                        g.append(v),
                                                                        g.append(m))
                                                                      : g.append(a),
                                                                  "Y" == bq_HTMLFilter) &&
                                                                  (g.innerHTML = htmlEntities(g.innerHTML)),
                                                                  "N" == bq_StrongNumbers && "N" == bq_Notes && "N" == bq_Titles && ((c.innerHTML = a), g.append(c), "Y" == bq_HTMLFilter) && (g.innerHTML = htmlEntities(g.innerHTML)),
                                                                  (R[y] = g);
                                                          } else R[y] = "";
                                                          countElementsInArray(R) == E.length && buildVersesTsk(R, Y);
                                                      })(`./modules/text/${Y}/` + L.Books[T].PathName);
                                                  } catch (e) {
                                                      console.error("4. Error try-catch en fetchInner4(). Error: ", e);
                                                  }
                                              break;
                                          }
                                      }
                                      if (null != T) break;
                                  }
                              }),
                              countElementsInArray(R) < E.length &&
                                  (buildVersesTsk(R, Y), 0 == countElementsInArray(R)) &&
                                  ((eid_tsk_body.innerHTML = ""),
                                  ((_ = document.createElement("p")).className = "tsk tsk_nolink"),
                                  (_.innerHTML = '<span class="prim_tsk"> Para el versiculo indicado no existen pasajes paralelos en este módulo</span>'),
                                  eid_tsk_body.append(_)))
                            : ((eid_tsk_body.innerHTML = ""),
                              ((m = document.createElement("p")).className = "tsk tsk_nolink"),
                              (m.innerHTML = '<span class="prim_tsk"> Para el versiculo indicado no existen pasajes paralelos</span>'),
                              eid_tsk_body.append(m)),
                        showTab(eid_btn_tsk, "tsk"),
                        window.innerWidth < pantallaTabletMinPx ? openSidebar(document.querySelector(".btnMenu")) : "none" == eid_sidebar.style.display && eid_btn_hideShowSidebar.click();
                } catch (e) {
                    console.error("2. Error en try-catch tsk. Error: ", e);
                }
            if (void 0 === obj_tsk_files.tsk.Books[N])
                try {
                    var b = "./modules/text/tsk/" + E.Books[N].PathName;
                    let e = await (await fetch(b)).text();
                    crear_objeto_obj_tsk_files && (obj_tsk_files.tsk.Books[N] = { fileName: E.Books[N].PathName, fileContent: e });
                    var v = (e = e.replaceAll("\r", "")).split("[")[c].split("]\n"),
                        f = (v[0], v[1]),
                        g = f.split("\n");
                    f[0];
                    let H = g[p - 1].split("=")[1].split("; ");
                    null == H && alert("error tb_arr_links"), (eid_tsk_head.innerHTML = ""), (eid_tsk_body.innerHTML = "");
                    var y = document.createElement("span"),
                        k = ((y.id = "sm_trans"), document.createElement("span"));
                    (k.className = "trans_tsk"), (k.textContent = document.querySelector('.colsHead[data-trans="' + Y + '"] .colsHeadInner .partDesk .desk_trans').innerHTML), y.append(k);
                    const M = document.createElement("p");
                    (M.id = h.id),
                        (M.className = "tsk tsk_verse"),
                        M.setAttribute("data-verse", h.getAttribute("data-verse")),
                        (M.dataset.trans = Y),
                        (M.innerHTML = h.innerHTML),
                        M.querySelector("a").addEventListener("click", () => {
                            goToLink(Y, M.querySelector("a").innerHTML);
                        }),
                        M.innerHTML.includes("wr_tooltip") &&
                            (M.querySelector(".wr_tooltip").addEventListener("click", (e) => {
                                hideShowComment(e);
                            }),
                            M.querySelector(".close").addEventListener("click", (e) => {
                                close_comment_x(e.target.parentElement.parentElement.parentElement, e);
                            })),
                        eid_tsk_head.append(y),
                        eid_tsk_head.append(M),
                        (eid_tsk_head.scrollTop = 0),
                        mySizeTsk();
                    var S,
                        w,
                        L = document.createElement("div");
                    (L.className = "loader"),
                        (L.innerHTML = `<span class="loader__element"></span>  <span class="loader__element"></span>  <span class="loader__element"></span>`),
                        eid_tsk_body.append(L),
                        (R = []),
                        "" != H
                            ? (H.forEach((e, t) => {
                                  let y = t;
                                  var a = e.split(" ")[0];
                                  let k = e.split(" ")[1].split(":")[0];
                                  t = e.split(" ")[1].split(":")[1];
                                  let S = null,
                                      w = null,
                                      L = (t.includes("-") ? ((S = t.split("-")[0]), (w = t.split("-")[1])) : (S = t), T);
                                  (window.dataBooksTsk = L.Books),
                                      (window.bq_StrongNumbers = L.StrongNumbers),
                                      (window.bq_EnglishPsalms = L.EnglishPsalms),
                                      (window.bq_Notes = L.Notes),
                                      (window.bq_NoteSign = L.NoteSign),
                                      (window.bq_StartNoteSign = L.StartNoteSign),
                                      (window.bq_EndNoteSign = L.EndNoteSign),
                                      (window.bq_Titles = L.Titles),
                                      (window.bq_StartTitleSign = L.StartTitleSign),
                                      (window.bq_EndTitleSign = L.EndTitleSign),
                                      (window.bq_HTMLFilter = L.HTMLFilter);
                                  for (let t = 0, T = null; t < dataBooksTsk.length; t++) {
                                      var r = dataBooksTsk[t];
                                      for (let e = 0; e < r.ShortNames.length; e++) {
                                          var s = r.ShortNames[e];
                                          if (a.toLowerCase() == s.toLowerCase()) {
                                              r.BookNumber;
                                              if (
                                                  ((T = t),
                                                  "N" == bq_EnglishPsalms && ((s = convertLinkFromEspToRus(T, k, S, w)), (T = s[0]), (k = s[1]), (S = s[2]), (w = s[3])),
                                                  void 0 !== obj_bible_files[Y] &&
                                                      void 0 !== obj_bible_files[Y].Books[T] &&
                                                      obj_bible_files[Y].Books[T].fileName == L.Books[T].PathName &&
                                                      "" != obj_bible_files[Y].Books[T].fileContent &&
                                                      " " != obj_bible_files[Y].Books[T].fileContent)
                                              ) {
                                                  let n = obj_bible_files[Y].Books[T].fileContent.split("<h4>");
                                                  n = n.filter((e) => e);
                                                  s = k <= L.Books[T].ChapterQty ? n[k].split("<p>").length - 1 : n[L.Books[T].ChapterQty].split("<p>").length - 1;
                                                  if (k <= L.Books[T].ChapterQty && S <= s) {
                                                      let t = "",
                                                          a = "";
                                                      if ((null != w && parseInt(w) <= parseInt(S) && ((d = w), (_ = S), (S = d), (w = _)), null != w)) {
                                                          w = parseInt(w) <= s ? parseInt(w) : s;
                                                          for (let e = parseInt(S); e <= parseInt(w); e++) {
                                                              var o = n[k].split("<p>")[e].split(" "),
                                                                  i = o[0],
                                                                  o = (o.shift(), o.join(" ")),
                                                                  l = e == S ? " fch" : "";
                                                              (t += '<span class="stij_one' + l + '">'),
                                                                  e != S && (t += '<span class="stij_numb">' + i + "</span> "),
                                                                  (t = t + ('<span class="stij_text">' + o + "</span>") + "</span>"),
                                                                  (a = t);
                                                          }
                                                      } else {
                                                          var d = (t = n[k].split("<p>")[S]).split(" ");
                                                          d.shift(), (a = ' <span class="stij_text">' + d.join(" ") + "</span>");
                                                      }
                                                      const E = document.createElement("p");
                                                      let e = Y + "__" + T + "__" + k + "__" + S;
                                                      null != w && (e += "-" + w), (E.id = e), (E.className = "tsk tsk_link"), E.setAttribute("data-verse", S);
                                                      var _ = document.createElement("span"),
                                                          s = ((_.className = "sp_f"), (_.innerText = y + 1), E.append(_), document.createElement("a"));
                                                      s.href = "#";
                                                      let r = `${dataBooksTsk[T].ShortNames[0]} ${k}:` + S;
                                                      null != w && (r += "-" + w), (s.innerHTML = r), E.append(s), E.append(" ");
                                                      var c = document.createElement("span");
                                                      if (
                                                          ((c.className = "vt"),
                                                          "Y" == bq_StrongNumbers &&
                                                              (((p = a).includes(" ") ? p.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                                  var a, r, n;
                                                                  isNaN(parseInt(e)) && "0" != e
                                                                      ? (E.append(" "), E.append(e))
                                                                      : (((a = document.createElement("span")).className = "strong"),
                                                                        "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                                            ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), E.append(a), E.append(n))
                                                                            : ((a.innerHTML = e), E.append(a)));
                                                              }),
                                                              E.innerHTML.trim(),
                                                              "Y" == bq_HTMLFilter) &&
                                                              (E.innerHTML = htmlEntities(E.innerHTML)),
                                                          "Y" == bq_Notes)
                                                      ) {
                                                          var p = a;
                                                          if (p.includes(bq_NoteSign)) {
                                                              var h = p.split(bq_NoteSign)[0];
                                                              if (p.includes(bq_StartNoteSign) && p.includes(bq_EndNoteSign)) {
                                                                  var m = p.split(bq_StartNoteSign)[1].split(bq_EndNoteSign),
                                                                      u = m[0],
                                                                      m = m[1],
                                                                      b = document.createElement("span"),
                                                                      v = document.createElement("span");
                                                                  if ((h = "Y" == L.HTMLFilter ? htmlEntities(h) : h).includes('<h6 class="prim_h6">') && h.includes("</h6>")) {
                                                                      var f = document.createElement("h6");
                                                                      f.className = "prim_h6";
                                                                      let e = h.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                                      (e = e.filter((e) => e)), (f.innerHTML = e[0]), b.append(f);
                                                                  } else b.innerHTML = h;
                                                                  c.append(b), c.append(buildWrTooltip(L.NoteSign, u, E.id, s.innerHTML)), (m = "Y" == L.HTMLFilter ? htmlEntities(m) : m), (v.innerHTML = m), c.append(v), E.append(c);
                                                              }
                                                          } else (c.innerHTML = a), E.append(c), "Y" == bq_HTMLFilter && (E.innerHTML = htmlEntities(E.innerHTML));
                                                      }
                                                      "Y" == bq_Titles &&
                                                          ((f = a).includes(bq_StartTitleSign) && f.includes(bq_EndTitleSign)
                                                              ? ((b = (h = f.split(bq_StartTitleSign))[0]),
                                                                (s = (u = h[1].split(bq_EndTitleSign))[0]),
                                                                (m = u[1]),
                                                                ((v = document.createElement("span")).className = "verse_title"),
                                                                (v.innerHTML = s),
                                                                E.append(b),
                                                                E.append(v),
                                                                E.append(m))
                                                              : E.append(a),
                                                          "Y" == bq_HTMLFilter) &&
                                                          (E.innerHTML = htmlEntities(E.innerHTML)),
                                                          "N" == bq_StrongNumbers && "N" == bq_Notes && "N" == bq_Titles && ((c.innerHTML = a), E.append(c), "Y" == bq_HTMLFilter) && (E.innerHTML = htmlEntities(E.innerHTML)),
                                                          (R[y] = E);
                                                  } else R[y] = "";
                                                  countElementsInArray(R) == H.length && buildVersesTsk(R, Y);
                                              } else {
                                                  if ("by_text" == modo_fetch_verses_for_tsk_block)
                                                      try {
                                                          !(async function (n) {
                                                              (n = await fetch(n)), (n = await n.text());
                                                              crear_objeto_obj_bible_files &&
                                                                  (void 0 === obj_bible_files[Y] && ((obj_bible_files[Y] = {}), (obj_bible_files[Y].Books = [])), void 0 === obj_bible_files[Y].Books[T]) &&
                                                                  "" != n &&
                                                                  " " != n &&
                                                                  (obj_bible_files[Y].Books[T] = { fileName: L.Books[T].PathName, fileContent: n });
                                                              let s = n.split("<h4>"),
                                                                  o = ((s = s.filter((e) => e)), k <= L.Books[T].ChapterQty ? s[k].split("<p>").length - 1 : s[L.Books[T].ChapterQty].split("<p>").length - 1);
                                                              if (k <= L.Books[T].ChapterQty && S <= o) {
                                                                  let t = "",
                                                                      a = "";
                                                                  if ((null != w && parseInt(w) <= parseInt(S) && ((n = w), (_ = S), (S = n), (w = _)), null != w)) {
                                                                      w = parseInt(w) <= o ? parseInt(w) : o;
                                                                      for (let e = parseInt(S); e <= parseInt(w); e++) {
                                                                          var i = s[k].split("<p>")[e].split(" "),
                                                                              l = i[0],
                                                                              i = (i.shift(), i.join(" ")),
                                                                              d = e == S ? " fch" : "";
                                                                          (t += '<span class="stij_one' + d + '">'),
                                                                              e != S && (t += '<span class="stij_numb">' + l + "</span> "),
                                                                              (t = t + ('<span class="stij_text">' + i + "</span>") + "</span>"),
                                                                              (a = t);
                                                                      }
                                                                  } else {
                                                                      n = (t = s[k].split("<p>")[S]).split(" ");
                                                                      n.shift(), (a = ' <span class="stij_text">' + n.join(" ") + "</span>");
                                                                  }
                                                                  const g = document.createElement("p");
                                                                  let e = Y + "__" + T + "__" + k + "__" + S;
                                                                  null != w && (e += "-" + w), (g.id = e), (g.className = "tsk tsk_link"), g.setAttribute("data-verse", S);
                                                                  var _ = document.createElement("span"),
                                                                      n = ((_.className = "sp_f"), (_.innerText = y + 1), g.append(_), document.createElement("a"));
                                                                  n.href = "#";
                                                                  let r = `${dataBooksTsk[T].ShortNames[0]} ${k}:` + S;
                                                                  null != w && (r += "-" + w), (n.innerHTML = r), g.append(n), g.append(" ");
                                                                  var c = document.createElement("span");
                                                                  if (
                                                                      ((c.className = "vt"),
                                                                      "Y" == bq_StrongNumbers &&
                                                                          (((p = a).includes(" ") ? p.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                                              var a, r, n;
                                                                              isNaN(parseInt(e)) && "0" != e
                                                                                  ? (g.append(" "), g.append(e))
                                                                                  : (((a = document.createElement("span")).className = "strong"),
                                                                                    "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                                                        ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), g.append(a), g.append(n))
                                                                                        : ((a.innerHTML = e), g.append(a)));
                                                                          }),
                                                                          g.innerHTML.trim(),
                                                                          "Y" == bq_HTMLFilter) &&
                                                                          (g.innerHTML = htmlEntities(g.innerHTML)),
                                                                      "Y" == bq_Notes)
                                                                  ) {
                                                                      var p = a;
                                                                      if (p.includes(bq_NoteSign)) {
                                                                          var h = p.split(bq_NoteSign)[0];
                                                                          if (p.includes(bq_StartNoteSign) && p.includes(bq_EndNoteSign)) {
                                                                              var m = p.split(bq_StartNoteSign)[1].split(bq_EndNoteSign),
                                                                                  u = m[0],
                                                                                  m = m[1],
                                                                                  b = document.createElement("span"),
                                                                                  v = document.createElement("span");
                                                                              if ((h = "Y" == L.HTMLFilter ? htmlEntities(h) : h).includes('<h6 class="prim_h6">') && h.includes("</h6>")) {
                                                                                  var f = document.createElement("h6");
                                                                                  f.className = "prim_h6";
                                                                                  let e = h.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                                                  (e = e.filter((e) => e)), (f.innerHTML = e[0]), b.append(f);
                                                                              } else b.innerHTML = h;
                                                                              c.append(b),
                                                                                  c.append(buildWrTooltip(L.NoteSign, u, g.id, n.innerHTML)),
                                                                                  (m = "Y" == L.HTMLFilter ? htmlEntities(m) : m),
                                                                                  (v.innerHTML = m),
                                                                                  c.append(v),
                                                                                  g.append(c);
                                                                          }
                                                                      } else (c.innerHTML = a), g.append(c), "Y" == bq_HTMLFilter && (g.innerHTML = htmlEntities(g.innerHTML));
                                                                  }
                                                                  "Y" == bq_Titles &&
                                                                      ((f = a).includes(bq_StartTitleSign) && f.includes(bq_EndTitleSign)
                                                                          ? ((h = f.split(bq_StartTitleSign)),
                                                                            (b = h[0]),
                                                                            (u = h[1].split(bq_EndTitleSign)),
                                                                            (n = u[0]),
                                                                            (m = u[1]),
                                                                            ((v = document.createElement("span")).className = "verse_title"),
                                                                            (v.innerHTML = n),
                                                                            g.append(b),
                                                                            g.append(v),
                                                                            g.append(m))
                                                                          : g.append(a),
                                                                      "Y" == bq_HTMLFilter) &&
                                                                      (g.innerHTML = htmlEntities(g.innerHTML)),
                                                                      "N" == bq_StrongNumbers && "N" == bq_Notes && "N" == bq_Titles && ((c.innerHTML = a), g.append(c), "Y" == bq_HTMLFilter) && (g.innerHTML = htmlEntities(g.innerHTML)),
                                                                      (R[y] = g);
                                                              } else R[y] = "";
                                                              countElementsInArray(R) == H.length && buildVersesTsk(R, Y);
                                                          })(`./modules/text/${Y}/` + L.Books[T].PathName);
                                                      } catch (e) {
                                                          console.error("2.2210 Error en try-catch by_text. Error: ", e);
                                                      }
                                                  if ("by_json" == modo_fetch_verses_for_tsk_block)
                                                      try {
                                                          var n = `./modules/text/${Y}/` + L.Books[T].PathName,
                                                              g = new FormData();
                                                          g.append("url", "../" + n),
                                                              g.append("base_ep", base_ep),
                                                              g.append("bq_EnglishPsalms", L.EnglishPsalms),
                                                              null != N && g.append("book", T),
                                                              g.append("chapter", k),
                                                              void 0 !== S && null != S && g.append("verse", S),
                                                              void 0 !== w && null != w && g.append("to_verse", w),
                                                              "undefined" != typeof col1_p_length && null != col1_p_length && g.append("col1_p_length", col1_p_length),
                                                              !(async function (n) {
                                                                  (n = await fetch("./php/read_file_to_json.php", { method: "POST", body: n })), (n = await n.json());
                                                                  var s = n.chapterData.arr_p_verses,
                                                                      o = s,
                                                                      s = n.chapterData.VerseQty;
                                                                  if (k <= L.Books[T].ChapterQty && S <= s) {
                                                                      let t = "",
                                                                          a = "";
                                                                      if ((null != w && parseInt(w) <= parseInt(S) && ((n = w), (_ = S), (S = n), (w = _)), null != w)) {
                                                                          w = parseInt(w) <= s ? parseInt(w) : s;
                                                                          for (let e = parseInt(S); e <= parseInt(w); e++) {
                                                                              var i = o[e].split(" "),
                                                                                  l = i[0],
                                                                                  i = (i.shift(), i.join(" ")),
                                                                                  d = e == S ? " fch" : "";
                                                                              (t += '<span class="stij_one' + d + '">'),
                                                                                  e != S && (t += '<span class="stij_numb">' + l + "</span> "),
                                                                                  (t = t + ('<span class="stij_text">' + i + "</span>") + "</span>"),
                                                                                  (a = t);
                                                                          }
                                                                      } else {
                                                                          n = (t = o[S]).split(" ");
                                                                          n.shift(), (a = ' <span class="stij_text">' + n.join(" ") + "</span>");
                                                                      }
                                                                      const f = document.createElement("p");
                                                                      let e = Y + "__" + T + "__" + k + "__" + S;
                                                                      null != w && (e += "-" + w), (f.id = e), (f.className = "tsk tsk_link"), f.setAttribute("data-verse", S);
                                                                      var _ = document.createElement("span"),
                                                                          s = ((_.className = "sp_f"), (_.innerText = y + 1), f.append(_), document.createElement("a"));
                                                                      s.href = "#";
                                                                      let r = `${dataBooksTsk[T].ShortNames[0]} ${k}:` + S;
                                                                      null != w && (r += "-" + w), (s.innerHTML = r), f.append(s), f.append(" ");
                                                                      n = document.createElement("span");
                                                                      if (
                                                                          ((n.className = "vt"),
                                                                          "Y" == bq_StrongNumbers &&
                                                                              (((c = a).includes(" ") ? c.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                                                  var a, r, n;
                                                                                  isNaN(parseInt(e)) && "0" != e
                                                                                      ? (f.append(" "), f.append(e))
                                                                                      : (((a = document.createElement("span")).className = "strong"),
                                                                                        "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                                                            ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), f.append(a), f.append(n))
                                                                                            : ((a.innerHTML = e), f.append(a)));
                                                                              }),
                                                                              f.innerHTML.trim(),
                                                                              "Y" == bq_HTMLFilter) &&
                                                                              (f.innerHTML = htmlEntities(f.innerHTML)),
                                                                          "Y" == bq_Notes)
                                                                      ) {
                                                                          var c = a;
                                                                          if (c.includes(bq_NoteSign)) {
                                                                              var p = c.split(bq_NoteSign)[0];
                                                                              if (c.includes(bq_StartNoteSign) && c.includes(bq_EndNoteSign)) {
                                                                                  var h = c.split(bq_StartNoteSign)[1].split(bq_EndNoteSign),
                                                                                      m = h[0],
                                                                                      h = h[1],
                                                                                      u = document.createElement("span"),
                                                                                      b = document.createElement("span");
                                                                                  if ((p = "Y" == L.HTMLFilter ? htmlEntities(p) : p).includes('<h6 class="prim_h6">') && p.includes("</h6>")) {
                                                                                      var v = document.createElement("h6");
                                                                                      v.className = "prim_h6";
                                                                                      let e = p.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                                                      (e = e.filter((e) => e)), (v.innerHTML = e[0]), u.append(v);
                                                                                  } else u.innerHTML = p;
                                                                                  n.append(u),
                                                                                      n.append(buildWrTooltip(L.NoteSign, m, f.id, s.innerHTML)),
                                                                                      (h = "Y" == L.HTMLFilter ? htmlEntities(h) : h),
                                                                                      (b.innerHTML = h),
                                                                                      n.append(b),
                                                                                      f.append(n);
                                                                              }
                                                                          } else (n.innerHTML = a), f.append(n), "Y" == bq_HTMLFilter && (f.innerHTML = htmlEntities(f.innerHTML));
                                                                      }
                                                                      "Y" == bq_Titles &&
                                                                          ((v = a).includes(bq_StartTitleSign) && v.includes(bq_EndTitleSign)
                                                                              ? ((p = v.split(bq_StartTitleSign)),
                                                                                (u = p[0]),
                                                                                (m = p[1].split(bq_EndTitleSign)),
                                                                                (s = m[0]),
                                                                                (h = m[1]),
                                                                                ((b = document.createElement("span")).className = "verse_title"),
                                                                                (b.innerHTML = s),
                                                                                f.append(u),
                                                                                f.append(b),
                                                                                f.append(h))
                                                                              : f.append(a),
                                                                          "Y" == bq_HTMLFilter) &&
                                                                          (f.innerHTML = htmlEntities(f.innerHTML)),
                                                                          "N" == bq_StrongNumbers && "N" == bq_Notes && "N" == bq_Titles && ((n.innerHTML = a), f.append(n), "Y" == bq_HTMLFilter) && (f.innerHTML = htmlEntities(f.innerHTML)),
                                                                          (R[y] = f);
                                                                  } else R[y] = "";
                                                                  countElementsInArray(R) == H.length && buildVersesTsk(R, Y);
                                                              })(g);
                                                      } catch (e) {
                                                          console.error("2.new 2662 Error en try-catch. Error: ", e);
                                                      }
                                              }
                                              break;
                                          }
                                      }
                                      if (null != T) break;
                                  }
                              }),
                              countElementsInArray(R) < H.length &&
                                  (buildVersesTsk(R, Y), 0 == countElementsInArray(R)) &&
                                  ((eid_tsk_body.innerHTML = ""),
                                  ((S = document.createElement("p")).className = "tsk tsk_nolink"),
                                  (S.innerHTML = '<span class="prim_tsk"> Para el versiculo indicado no existen pasajes paralelos en este módulo</span>'),
                                  eid_tsk_body.append(S)))
                            : ((eid_tsk_body.innerHTML = ""),
                              ((w = document.createElement("p")).className = "tsk tsk_nolink"),
                              (w.innerHTML = '<span class="prim_tsk"> Para el versiculo indicado no existen pasajes paralelos</span>'),
                              eid_tsk_body.append(w)),
                        showTab(eid_btn_tsk, "tsk"),
                        window.innerWidth < pantallaTabletMinPx ? openSidebar(document.querySelector(".btnMenu")) : "none" == eid_sidebar.style.display && eid_btn_hideShowSidebar.click();
                } catch (e) {
                    console.error("2. Error try-catch tsk: ", e);
                }
        } else
            try {
                const E = await (await fetch("./modules/text/tsk/bibleqt.json")).json();
                !(async function (e) {
                    try {
                        const d = await (await fetch(e)).text();
                        var t = (d = d.replaceAll("\r", "")).split("[")[c].split("]\n"),
                            a = (t[0], t[1]),
                            r = a.split("\n");
                        a[0];
                        let O = r[p - 1].split("=")[1].split("; ");
                        null == O && alert("error tb_arr_links"), (eid_tsk_head.innerHTML = ""), (eid_tsk_body.innerHTML = "");
                        var n = document.createElement("span"),
                            s = ((n.id = "sm_trans"), document.createElement("span"));
                        (s.className = "trans_tsk"), (s.textContent = document.querySelector('.colsHead[data-trans="' + Y + '"] .colsHeadInner .partDesk .desk_trans').innerHTML), n.append(s);
                        const _ = document.createElement("p");
                        (_.id = h.id),
                            (_.className = "tsk tsk_verse"),
                            _.setAttribute("data-verse", h.getAttribute("data-verse")),
                            (_.dataset.trans = Y),
                            (_.innerHTML = h.innerHTML),
                            _.querySelector("a").addEventListener("click", () => {
                                goToLink(Y, _.querySelector("a").innerHTML);
                            }),
                            _.innerHTML.includes("wr_tooltip") &&
                                (_.querySelector(".wr_tooltip").addEventListener("click", (e) => {
                                    hideShowComment(e);
                                }),
                                _.querySelector(".close").addEventListener("click", (e) => {
                                    close_comment_x(e.target.parentElement.parentElement.parentElement, e);
                                })),
                            eid_tsk_head.append(n),
                            eid_tsk_head.append(_),
                            (eid_tsk_head.scrollTop = 0),
                            mySizeTsk();
                        var o,
                            i,
                            l = document.createElement("div");
                        (l.className = "loader"),
                            (l.innerHTML = `<span class="loader__element"></span> <span class="loader__element"></span> <span class="loader__element"></span>`),
                            eid_tsk_body.append(l),
                            (R = []),
                            "" != O
                                ? (O.forEach((e, t) => {
                                      let q = t,
                                          o = e.split(" ")[0],
                                          V = e.split(" ")[1].split(":")[0];
                                      t = e.split(" ")[1].split(":")[1];
                                      let B = null,
                                          F = null;
                                      t.includes("-") ? ((B = t.split("-")[0]), (F = t.split("-")[1])) : (B = t),
                                          (async function (e) {
                                              try {
                                                  const x = await (await fetch(e)).json();
                                                  (window.dataBooksTsk = x.Books),
                                                      (window.bq_StrongNumbers = x.StrongNumbers),
                                                      (window.bq_EnglishPsalms = x.EnglishPsalms),
                                                      (window.bq_Notes = x.Notes),
                                                      (window.bq_NoteSign = x.NoteSign),
                                                      (window.bq_StartNoteSign = x.StartNoteSign),
                                                      (window.bq_EndNoteSign = x.EndNoteSign),
                                                      (window.bq_Titles = x.Titles),
                                                      (window.bq_StartTitleSign = x.StartTitleSign),
                                                      (window.bq_EndTitleSign = x.EndTitleSign),
                                                      (window.bq_HTMLFilter = x.HTMLFilter);
                                                  for (let t = 0, I = null; t < dataBooksTsk.length; t++) {
                                                      var a = dataBooksTsk[t];
                                                      for (let e = 0; e < a.ShortNames.length; e++) {
                                                          var r = a.ShortNames[e];
                                                          if (o.toLowerCase() == r.toLowerCase()) {
                                                              a.BookNumber;
                                                              (I = t), "N" == bq_EnglishPsalms && ((n = convertLinkFromEspToRus(I, V, B, F)), (I = n[0]), (V = n[1]), (B = n[2]), (F = n[3]));
                                                              var n,
                                                                  s = `./modules/text/${Y}/` + x.Books[I].PathName;
                                                              !(async function (e) {
                                                                  try {
                                                                      let n = (await (await fetch(e)).text()).split("<h4>");
                                                                      n = n.filter((e) => e);
                                                                      var s,
                                                                          o,
                                                                          i = V <= x.Books[I].ChapterQty ? n[V].split("<p>").length - 1 : n[x.Books[I].ChapterQty].split("<p>").length - 1;
                                                                      if (V <= x.Books[I].ChapterQty && B <= i) {
                                                                          let t = "",
                                                                              a = "";
                                                                          if ((null != F && parseInt(F) <= parseInt(B) && ((s = F), (o = B), (B = s), (F = o)), null != F)) {
                                                                              F = parseInt(F) <= i ? parseInt(F) : i;
                                                                              for (let e = parseInt(B); e <= parseInt(F); e++) {
                                                                                  var l = n[V].split("<p>")[e].split(" "),
                                                                                      d = l[0],
                                                                                      _ = (l.shift(), l.join(" ")),
                                                                                      c = e == B ? " fch" : "";
                                                                                  (t += '<span class="stij_one' + c + '">'),
                                                                                      e != B && (t += '<span class="stij_numb">' + d + "</span> "),
                                                                                      (t = t + ('<span class="stij_text">' + _ + "</span>") + "</span>"),
                                                                                      (a = t);
                                                                              }
                                                                          } else {
                                                                              var p = (t = n[V].split("<p>")[B]).split(" ");
                                                                              p.shift(), (a = ' <span class="stij_text">' + p.join(" ") + "</span>");
                                                                          }
                                                                          const C = document.createElement("p");
                                                                          let e = Y + "__" + I + "__" + V + "__" + B;
                                                                          null != F && (e += "-" + F), (C.id = e), (C.className = "tsk tsk_link"), C.setAttribute("data-verse", B);
                                                                          var h = document.createElement("span"),
                                                                              m = ((h.className = "sp_f"), (h.innerText = q + 1), C.append(h), document.createElement("a"));
                                                                          m.href = "#";
                                                                          let r = `${dataBooksTsk[I].ShortNames[0]} ${V}:` + B;
                                                                          null != F && (r += "-" + F), (m.innerHTML = r), C.append(m), C.append(" ");
                                                                          var u,
                                                                              b,
                                                                              v,
                                                                              f,
                                                                              g,
                                                                              T,
                                                                              y,
                                                                              k,
                                                                              S = document.createElement("span");
                                                                          if (
                                                                              ((S.className = "vt"),
                                                                              "Y" == bq_StrongNumbers &&
                                                                                  (((u = a).includes(" ") ? u.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                                                      var a, r, n;
                                                                                      isNaN(parseInt(e)) && "0" != e
                                                                                          ? (C.append(" "), C.append(e))
                                                                                          : (((a = document.createElement("span")).className = "strong"),
                                                                                            "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                                                                ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), C.append(a), C.append(n))
                                                                                                : ((a.innerHTML = e), C.append(a)));
                                                                                  }),
                                                                                  C.innerHTML.trim(),
                                                                                  "Y" == bq_HTMLFilter) &&
                                                                                  (C.innerHTML = htmlEntities(C.innerHTML)),
                                                                              "Y" == bq_Notes)
                                                                          ) {
                                                                              var w = a;
                                                                              if (w.includes(bq_NoteSign)) {
                                                                                  var L = w.split(bq_NoteSign)[0];
                                                                                  if (w.includes(bq_StartNoteSign) && w.includes(bq_EndNoteSign)) {
                                                                                      var E = w.split(bq_StartNoteSign)[1].split(bq_EndNoteSign),
                                                                                          H = E[0],
                                                                                          N = E[1],
                                                                                          M = document.createElement("span"),
                                                                                          A = document.createElement("span");
                                                                                      if ((L = "Y" == x.HTMLFilter ? htmlEntities(L) : L).includes('<h6 class="prim_h6">') && L.includes("</h6>")) {
                                                                                          var j = document.createElement("h6");
                                                                                          j.className = "prim_h6";
                                                                                          let e = L.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                                                          (e = e.filter((e) => e)), (j.innerHTML = e[0]), M.append(j);
                                                                                      } else M.innerHTML = L;
                                                                                      S.append(M),
                                                                                          S.append(buildWrTooltip(x.NoteSign, H, C.id, m.innerHTML)),
                                                                                          (N = "Y" == x.HTMLFilter ? htmlEntities(N) : N),
                                                                                          (A.innerHTML = N),
                                                                                          S.append(A),
                                                                                          C.append(S);
                                                                                  }
                                                                              } else (S.innerHTML = a), C.append(S), "Y" == bq_HTMLFilter && (C.innerHTML = htmlEntities(C.innerHTML));
                                                                          }
                                                                          "Y" == bq_Titles &&
                                                                              ((b = a).includes(bq_StartTitleSign) && b.includes(bq_EndTitleSign)
                                                                                  ? ((v = b.split(bq_StartTitleSign)),
                                                                                    (f = v[0]),
                                                                                    (g = v[1].split(bq_EndTitleSign)),
                                                                                    (T = g[0]),
                                                                                    (y = g[1]),
                                                                                    ((k = document.createElement("span")).className = "verse_title"),
                                                                                    (k.innerHTML = T),
                                                                                    C.append(f),
                                                                                    C.append(k),
                                                                                    C.append(y))
                                                                                  : C.append(a),
                                                                              "Y" == bq_HTMLFilter) &&
                                                                              (C.innerHTML = htmlEntities(C.innerHTML)),
                                                                              "N" == bq_StrongNumbers &&
                                                                                  "N" == bq_Notes &&
                                                                                  "N" == bq_Titles &&
                                                                                  ((S.innerHTML = a), C.append(S), "Y" == bq_HTMLFilter) &&
                                                                                  (C.innerHTML = htmlEntities(C.innerHTML)),
                                                                              (R[q] = C);
                                                                      } else R[q] = "";
                                                                      countElementsInArray(R) == O.length && buildVersesTsk(R, Y);
                                                                  } catch (e) {
                                                                      console.error("4. Error en try-catch fetchInner3(). Error: ", e);
                                                                  }
                                                              })(s);
                                                              break;
                                                          }
                                                      }
                                                      if (null != I) break;
                                                  }
                                              } catch (e) {
                                                  console.error("3. Error en try-catch fetchInner2(). Error: ", e);
                                              }
                                          })(`./modules/text/${Y}/bibleqt.json`);
                                  }),
                                  countElementsInArray(R) < O.length &&
                                      (buildVersesTsk(R, Y), 0 == countElementsInArray(R)) &&
                                      ((eid_tsk_body.innerHTML = ""),
                                      ((o = document.createElement("p")).className = "tsk tsk_nolink"),
                                      (o.innerHTML = '<span class="prim_tsk"> Para el versiculo indicado no existen pasajes paralelos en este módulo</span>'),
                                      eid_tsk_body.append(o)))
                                : ((eid_tsk_body.innerHTML = ""),
                                  ((i = document.createElement("p")).className = "tsk tsk_nolink"),
                                  (i.innerHTML = '<span class="prim_tsk"> Para el versiculo indicado no existen pasajes paralelos</span>'),
                                  eid_tsk_body.append(i)),
                            showTab(eid_btn_tsk, "tsk"),
                            window.innerWidth < pantallaTabletMinPx ? openSidebar(document.querySelector(".btnMenu")) : "none" == eid_sidebar.style.display && eid_btn_hideShowSidebar.click();
                    } catch (e) {
                        console.error("2. Error en try-catch fetchInner(). Error: ", e);
                    }
                })("./modules/text/tsk/" + E.Books[N].PathName);
            } catch (e) {
                console.error("1. Error try-catch en modo old getTsk(). Error: ", e);
            }
    }
}
function clearAllDivShow() {
    Array.from(eid_wrCols.children).forEach((e) => {
        e.querySelector(".colsInner").innerHTML = "cargando...";
    });
}
function showTextInAllDivShow(t) {
    Array.from(eid_wrCols.children).forEach((e) => {
        e.querySelector(".colsInner").innerHTML = t;
    });
}
function showChapterText4(e, t, a, r, n = null, s = null, o = null, i = null) {
    "by_text" == modo_fetch_verses_for_cols ? viaByText_showChapterText4(e, t, a, r, n, s, o, i) : "by_json" == modo_fetch_verses_for_cols && viaByJson_showChapterText4(e, t, a, r, n, s, o, i);
}
async function viaByText_showChapterText4(m, t, u, b, a, r, n, s) {
    var e = document.querySelector(t + " .colsHead .colsHeadInner .partDesk .desk_trans"),
        o = document.querySelector(t + " .colsHead .colsHeadInner .partDesk .desk_trans"),
        i = document.querySelector(t + " .colsHead .colsHeadInner .partMob .mob_trans"),
        l = document.querySelector(t + " .colsInner");
    null == s && clearAllDivShow();
    let v = !1;
    if ((eid_btnStrong.classList.contains("btn_active") && (v = !0), (window.base_ep = eid_trans1.dataset.base_ep), (window.arr_data_head = []), (window.arr_data_body = []), (window.arr_data_all = []), null != m)) {
        var d = arrFavTransObj.find((e) => e.Translation === m);
        if (void 0 !== d && null != d && "" != d) {
            let h = d;
            if ((null != e && ((o.innerHTML = void 0 !== h ? h.BibleShortName : "---"), (i.innerHTML = void 0 !== h ? h.BibleShortName : "---")), void 0 !== h.Books[u])) {
                h.Books[u].PathName;
                if (
                    (void 0 === obj_bible_files[m] && ((obj_bible_files[m] = {}), (obj_bible_files[m].Books = [])),
                    void 0 !== obj_bible_files[m] &&
                        void 0 !== obj_bible_files[m].Books &&
                        void 0 !== obj_bible_files[m].Books[u] &&
                        obj_bible_files[m].Books[u].fileName == h.Books[u].PathName &&
                        "" != obj_bible_files[m].Books[u].fileContent)
                )
                    try {
                        new Date().getTime();
                        var _ = obj_bible_files[m].Books[u].fileContent;
                        let e = _.split("<h4>");
                        if (((e = e.filter((e) => e)), _.includes("<h2>"))) {
                            var c = _.split("<h2>");
                            let e;
                            e = "" == (e = c[1].includes("</h2>") ? c[1].split("</h2>")[0] : c[1]) ? h.Books[u].FullName : e;
                            var p = document.createElement("h2");
                            p.append(e), arr_data_head.push(p), "Y" == h.HTMLFilter && (p.innerHTML = htmlEntities(p.innerHTML));
                        }
                        if (void 0 !== e[b]) {
                            let p = b;
                            var V,
                                f,
                                g,
                                T,
                                y,
                                B = e[b].split("<p>"),
                                F = B.length - 1;
                            if (
                                ("#col1" == t && (window.col1_p_length = F),
                                B.forEach((a, r) => {
                                    if (0 == r) {
                                        let e;
                                        "" == (e = a.includes("</h4>") ? a.split("</h4>")[0] : a) && (e = h.Books[u].FullName + " " + b);
                                        r = document.createElement("h4");
                                        r.append(e), arr_data_head.push(r), "Y" == h.HTMLFilter && (r.innerHTML = htmlEntities(r.innerHTML));
                                    } else {
                                        let e = "";
                                        var n = (e = a.includes("</p>") ? a.split("</p>")[0] : a).split(" "),
                                            r = n[0];
                                        let t = "";
                                        for (let e = 1; e < n.length; e++) t += n[e] + " ";
                                        var a = document.createElement("p"),
                                            s = ((a.id = m + "__" + u + "__" + b + "__" + r), a.setAttribute("data-verse", r), document.createElement("a")),
                                            r = ((s.href = "#"), `${h.Books[u].ShortNames[0]} ${p}:` + r);
                                        (s.innerHTML = r), a.append(s), a.append(" ");
                                        const c = document.createElement("span");
                                        if (
                                            ((c.className = "vt"),
                                            "Y" == h.StrongNumbers &&
                                                (((r = t).includes(" ") ? r.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                    var a, r, n;
                                                    isNaN(parseInt(e)) && "0" != e
                                                        ? (c.append(" "), v && e.includes("<S>") && (e = e.replace("<S>", '<S class="show strongActive">')), c.append(e))
                                                        : ((a = document.createElement("span")),
                                                          v ? (a.className = "strong show strongActive") : (a.className = "strong"),
                                                          "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                              ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), c.append(a), c.append(n))
                                                              : ((a.innerHTML = e), c.append(a)));
                                                }),
                                                a.append(c),
                                                a.innerHTML.trim(),
                                                "Y" == h.HTMLFilter && (a.innerHTML = htmlEntities(a.innerHTML)),
                                                v &&
                                                    a.innerHTML.includes("strongActive") &&
                                                    a.querySelectorAll(".strongActive").forEach((t) => {
                                                        t.addEventListener("click", () => {
                                                            var e = "Y" == h.StrongFirstLetter ? "Y" : "N";
                                                            t.innerHTML.includes("H") || t.innerHTML.includes("G") ? getStrongNumber(t.innerHTML, null, e) : ((lang = 39 <= u ? "Grk" : "Heb"), getStrongNumber(t.innerHTML, lang, e));
                                                        });
                                                    }),
                                                arr_data_body.push(a)),
                                            "Y" == h.Notes)
                                        ) {
                                            r = t;
                                            if (r.includes(h.NoteSign)) {
                                                var o = r.split(h.NoteSign)[0];
                                                if (r.includes(h.StartNoteSign) && r.includes(h.EndNoteSign)) {
                                                    a.className = "with_notes";
                                                    var r = r.split(h.StartNoteSign)[1].split(h.EndNoteSign),
                                                        i = r[0],
                                                        r = r[1],
                                                        l = document.createElement("span"),
                                                        d = document.createElement("span");
                                                    if ((o = "Y" == h.HTMLFilter ? htmlEntities(o) : o).includes('<h6 class="prim_h6">') && o.includes("</h6>")) {
                                                        var _ = document.createElement("h6");
                                                        _.className = "prim_h6";
                                                        let e = o.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                        (e = e.filter((e) => e)), (_.innerHTML = e[0]), l.append(_);
                                                    } else l.innerHTML = o;
                                                    c.append(l), c.append(buildWrTooltip(h.NoteSign, i, a.id, s.innerHTML)), (r = "Y" == h.HTMLFilter ? htmlEntities(r) : r), (d.innerHTML = r), c.append(d), a.append(c);
                                                }
                                            } else c.append(t), a.append(c), "Y" == h.HTMLFilter && (a.innerHTML = htmlEntities(a.innerHTML));
                                            arr_data_body.push(a);
                                        }
                                        "Y" == h.Titles &&
                                            ((_ = t).includes(h.StartTitleSign) && _.includes(h.EndTitleSign)
                                                ? ((l = (o = _.split(h.StartTitleSign))[0]),
                                                  (s = (i = o[1].split(h.EndTitleSign))[0]),
                                                  (r = i[1]),
                                                  ((d = document.createElement("span")).className = "verse_title"),
                                                  (d.innerHTML = s),
                                                  c.append(l),
                                                  c.append(d),
                                                  c.append(r))
                                                : c.append(t),
                                            a.append(c),
                                            arr_data_body.push(a),
                                            "Y" == h.HTMLFilter) &&
                                            (a.innerHTML = htmlEntities(a.innerHTML)),
                                            "N" == h.StrongNumbers && "N" == h.Notes && "N" == h.Titles && (c.append(t), a.append(c), arr_data_body.push(a), "Y" == h.HTMLFilter) && (a.innerHTML = htmlEntities(a.innerHTML));
                                    }
                                }),
                                "Y" == base_ep && "N" == h.EnglishPsalms)
                            ) {
                                let e = [],
                                    t = [];
                                switch (parseInt(u)) {
                                    case 3:
                                        12 == b && ((e = for_parseVerse(m, h, _, u, 13, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 13, 16), arr_data_body.splice(col1_p_length)),
                                            13 == b && arr_data_body.splice(0, 1);
                                        break;
                                    case 5:
                                        5 == b && arr_data_body.splice(col1_p_length),
                                            6 == b && (addChapterToHead(h, u, 5), (e = for_parseVerse(m, h, _, u, 5, 16)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 6, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 8:
                                        20 == b && ((V = mergeVerses((e = for_parseVerse(m, h, _, u, 20, form_list_verses(1, col1_p_length + 1))), 42)), (arr_data_body = [].concat(V, arr_data_body)).splice(col1_p_length)),
                                            23 == b && ((e = for_parseVerse(m, h, _, u, 24, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 24, 29), arr_data_body.splice(col1_p_length)),
                                            24 == b && arr_data_body.splice(0, 1);
                                        break;
                                    case 17:
                                        39 == b && arr_data_body.splice(col1_p_length),
                                            40 == b &&
                                                (addChapterToHead(h, u, 39),
                                                (e = for_parseVerse(m, h, _, u, 39, form_list_verses(31, 35))),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 40, 6),
                                                arr_data_body.splice(col1_p_length)),
                                            41 == b &&
                                                (addChapterToHead(h, u, 40),
                                                (e = for_parseVerse(m, h, _, u, 40, form_list_verses(20, 27))),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 41, 9),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 18:
                                        3 <= b && b <= 8 && arr_data_body.splice(0, 1),
                                            9 == b && (arr_data_body.splice(0, 1), arr_data_body.splice(col1_p_length)),
                                            10 == b && (addChapterToHead(h, u, 9), (e = for_parseVerse(m, h, _, u, 9, form_list_verses(22, 39))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            (11 == b ||
                                                (14 <= b && b <= 17) ||
                                                (23 <= b && b <= 29) ||
                                                (32 <= b && b <= 33) ||
                                                35 == b ||
                                                37 == b ||
                                                43 == b ||
                                                50 == b ||
                                                66 == b ||
                                                (71 <= b && b <= 74) ||
                                                (78 <= b && b <= 79) ||
                                                82 == b ||
                                                86 == b ||
                                                87 == b ||
                                                91 == b ||
                                                (93 <= b && b <= 101) ||
                                                (103 <= b && b <= 107) ||
                                                (109 <= b && b <= 114) ||
                                                (117 <= b && b <= 146)) &&
                                                (addChapterToHead(h, u, parseInt(b) - 1), (e = for_parseVerse(m, h, _, u, b - 1, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            (12 == b ||
                                                (18 <= b && b <= 22) ||
                                                (30 <= b && b <= 31) ||
                                                34 == b ||
                                                36 == b ||
                                                (38 <= b && b <= 42) ||
                                                (44 <= b && b <= 49) ||
                                                53 == b ||
                                                (55 <= b && b <= 59) ||
                                                (61 <= b && b <= 65) ||
                                                (67 <= b && b <= 70) ||
                                                (75 <= b && b <= 77) ||
                                                (80 <= b && b <= 81) ||
                                                (83 <= b && b <= 85) ||
                                                (88 <= b && b < 90) ||
                                                92 == b ||
                                                102 == b ||
                                                108 == b) &&
                                                (addChapterToHead(h, u, parseInt(b) - 1), (e = for_parseVerse(m, h, _, u, b - 1, form_list_verses(2, col1_p_length + 1))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            13 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, h, _, u, b - 1, form_list_verses(2, 6))),
                                                (arr_data_body = e.concat(vstavka_vacio("arriba"), arr_data_body)).splice(col1_p_length)),
                                            ((51 <= b && b <= 52) || 54 == b || 60 == b) &&
                                                (addChapterToHead(h, u, parseInt(b) - 1), (e = for_parseVerse(m, h, _, u, b - 1, form_list_verses(3, col1_p_length + 2))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            90 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, h, _, u, b - 1, form_list_verses(2, col1_p_length))),
                                                ((f = document.createElement("p")).className = "prim"),
                                                (f.innerHTML = "смотри стих выше..."),
                                                e.splice(5, 0, f),
                                                (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            115 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 2), (e = for_parseVerse(m, h, _, u, b - 2, form_list_verses(9, col1_p_length + 8))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            116 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 2),
                                                (e = for_parseVerse(m, h, _, u, b - 2, form_list_verses(1, 9))),
                                                (t = for_parseVerse(m, h, _, u, b - 1, form_list_verses(1, 10))),
                                                (e = e.concat(t)),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 115, 10),
                                                arr_data_body.splice(col1_p_length)),
                                            147 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, h, _, u, b - 1, form_list_verses(1, 11))),
                                                (t = for_parseVerse(m, h, _, u, b, form_list_verses(1, 9))),
                                                (e = e.concat(t)),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 147, 12),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 19:
                                        4 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                        break;
                                    case 21:
                                        1 == b &&
                                            ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length))),
                                            ((g = document.createElement("p")).className = "prim"),
                                            (g.innerHTML = "заглавие..."),
                                            e.splice(0, 0, g),
                                            (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            6 == b && ((e = for_parseVerse(m, h, _, u, parseInt(b) + 1, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 7, 13), arr_data_body.splice(col1_p_length)),
                                            7 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(2, col1_p_length + 1))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 22:
                                        3 == b &&
                                            ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length))),
                                            ((T = document.createElement("p")).className = "prim"),
                                            (T.innerHTML = "смотри стих выше..."),
                                            e.splice(19, 0, T),
                                            (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 26:
                                        3 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            4 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, h, _, u, b - 1, form_list_verses(31, 33))),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 4, 4),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 27:
                                        13 == b && ((e = for_parseVerse(m, h, _, u, 14, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 14, 16), arr_data_body.splice(col1_p_length)),
                                            14 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(2, 10))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 31:
                                        1 == b && ((e = for_parseVerse(m, h, _, u, 2, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 2, 17), arr_data_body.splice(col1_p_length)),
                                            2 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(2, 11))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 44:
                                        16 == b && ((e = for_parseVerse(m, h, _, u, b - 2, form_list_verses(24, 26))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 14, 25), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 46:
                                        13 == b &&
                                            ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length - 1))),
                                            ((y = document.createElement("p")).className = "prim"),
                                            (y.innerHTML = "смотри стих выше..."),
                                            e.splice(12, 0, y),
                                            (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                }
                            }
                            if ("N" == base_ep && "Y" == h.EnglishPsalms) {
                                let e = [],
                                    t = [];
                                switch (parseInt(u)) {
                                    case 3:
                                        12 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            13 == b && (addChapterToHead(h, u, 12), (e = for_parseVerse(m, h, _, u, 12, 16)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 13, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 5:
                                        5 == b && ((e = for_parseVerse(m, h, _, u, 6, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 6, 16), arr_data_body.splice(col1_p_length)),
                                            6 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(2, col1_p_length + 1))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 8:
                                        20 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length - 1))), (arr_data_body = [].concat(e, vstavka_vacio("arriba"))).splice(col1_p_length)),
                                            23 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = arr_data_body.concat(e)).splice(col1_p_length)),
                                            24 == b && (addChapterToHead(h, u, 23), (e = for_parseVerse(m, h, _, u, 23, 29)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 24, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 17:
                                        39 == b && ((e = for_parseVerse(m, h, _, u, 40, form_list_verses(1, 5))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 40, 31), arr_data_body.splice(col1_p_length)),
                                            40 == b &&
                                                ((e = for_parseVerse(m, h, _, u, 40, form_list_verses(6, 24))),
                                                (t = for_parseVerse(m, h, _, u, 41, form_list_verses(1, 8))),
                                                addChapterToVerse((arr_data_body = [].concat(e, t)), h, u, 41, 20),
                                                arr_data_body.splice(col1_p_length)),
                                            41 == b && ((e = for_parseVerse(m, h, _, u, 41, form_list_verses(9, 34))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                        break;
                                    case 18:
                                        if (
                                            (3 <= b && b <= 8 && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length - 1))), (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length)),
                                            9 == b &&
                                                ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, 20))),
                                                (t = for_parseVerse(m, h, _, u, 10, form_list_verses(1, 18))),
                                                addChapterToVerse((arr_data_body = [].concat(vstavka_vacio(), e, t)), h, u, 10, 22),
                                                arr_data_body.splice(col1_p_length)),
                                            (10 == b ||
                                                (13 <= b && b <= 16) ||
                                                (22 <= b && b <= 28) ||
                                                (31 <= b && b <= 32) ||
                                                34 == b ||
                                                36 == b ||
                                                42 == b ||
                                                49 == b ||
                                                65 == b ||
                                                (70 <= b && b <= 73) ||
                                                (77 <= b && b <= 78) ||
                                                81 == b ||
                                                85 == b ||
                                                86 == b ||
                                                90 == b ||
                                                (92 <= b && b <= 100) ||
                                                (102 <= b && b <= 106) ||
                                                (108 <= b && b < 113) ||
                                                (116 <= b && b <= 138) ||
                                                (140 <= b && b <= 145)) &&
                                                (addChapterToHead(h, u, parseInt(b) + 1),
                                                (e = for_parseVerse(m, h, _, u, parseInt(b) + 1, form_list_verses(1, col1_p_length))),
                                                (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            (11 == b ||
                                                12 == b ||
                                                (17 <= b && b <= 21) ||
                                                (29 <= b && b <= 30) ||
                                                33 == b ||
                                                35 == b ||
                                                (37 <= b && b <= 41) ||
                                                (43 <= b && b <= 48) ||
                                                52 == b ||
                                                (54 <= b && b <= 58) ||
                                                (60 <= b && b <= 64) ||
                                                (66 <= b && b <= 69) ||
                                                (74 <= b && b <= 76) ||
                                                (79 <= b && b <= 80) ||
                                                (82 <= b && b <= 84) ||
                                                (87 <= b && b < 89) ||
                                                91 == b ||
                                                101 == b ||
                                                107 == b ||
                                                139 == b) &&
                                                (addChapterToHead(h, u, parseInt(b) + 1),
                                                (e = for_parseVerse(m, h, _, u, parseInt(b) + 1, form_list_verses(1, col1_p_length - 1))),
                                                (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length)),
                                            ((50 <= b && b <= 51) || 53 == b || 59 == b) &&
                                                (addChapterToHead(h, u, parseInt(b) + 1),
                                                (e = for_parseVerse(m, h, _, u, parseInt(b) + 1, form_list_verses(1, col1_p_length - 2))),
                                                (arr_data_body = [].concat(vstavka_vacio(), vstavka_vacio(), e)).splice(col1_p_length)),
                                            89 == b)
                                        ) {
                                            addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse(m, h, _, u, parseInt(b) + 1, form_list_verses(1, col1_p_length)));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                4 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(5, 0),
                                                (e = n),
                                                (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length);
                                        }
                                        113 == b &&
                                            (addChapterToHead(h, u, parseInt(b) + 1),
                                            (e = for_parseVerse(m, h, _, u, parseInt(b) + 1, form_list_verses(1, 8))),
                                            (t = for_parseVerse(m, h, _, u, parseInt(b) + 2, form_list_verses(1, 18))),
                                            addChapterToVerse((arr_data_body = [].concat(e, t)), h, u, 115, 9),
                                            arr_data_body.splice(col1_p_length)),
                                            114 == b && (addChapterToHead(h, u, parseInt(b) + 2), (e = for_parseVerse(m, h, _, u, parseInt(b) + 2, form_list_verses(1, 9))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            115 == b && (addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse(m, h, _, u, parseInt(b) + 1, form_list_verses(10, 19))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            146 == b && (addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse(m, h, _, u, parseInt(b) + 1, form_list_verses(1, 11))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            147 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(12, 20))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 19:
                                        4 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                        break;
                                    case 21:
                                        if (1 == b) {
                                            e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                0 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(1, 1),
                                                (e = n),
                                                (arr_data_body = [].concat(e)).splice(col1_p_length);
                                        }
                                        6 == b && arr_data_body.splice(col1_p_length),
                                            7 == b &&
                                                (addChapterToHead(h, u, 6),
                                                (e = for_parseVerse(m, h, _, u, parseInt(b) - 1, 13)),
                                                addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), h, u, 7, 2),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 22:
                                        if (3 == b) {
                                            e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                18 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(19, 1),
                                                (e = n),
                                                (arr_data_body = [].concat(e)).splice(col1_p_length);
                                        }
                                        break;
                                    case 26:
                                        3 == b &&
                                            ((e = for_parseVerse(m, h, _, u, b, form_list_verses(1, 30))),
                                            (t = for_parseVerse(m, h, _, u, 4, form_list_verses(1, 3))),
                                            addChapterToVerse((arr_data_body = [].concat(e, t)), h, u, 4, 31),
                                            arr_data_body.splice(col1_p_length)),
                                            4 == b && ((e = for_parseVerse(m, h, _, u, b, form_list_verses(4, col1_p_length + 3))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 27:
                                        14 == b && (addChapterToHead(h, u, 13), (e = for_parseVerse(m, h, _, u, 13, 16)), addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), h, u, 14, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 31:
                                        1 == b && ((e = for_parseVerse(m, h, _, u, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length)),
                                            2 == b && (addChapterToHead(h, u, 1), (e = for_parseVerse(m, h, _, u, 1, 17)), addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), h, u, 2, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 44:
                                        14 == b && ((e = for_parseVerse(m, h, _, u, 16, form_list_verses(25, 27))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 16, 24), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 46:
                                        if (13 == b) {
                                            e = for_parseVerse(m, h, _, u, b, form_list_verses(1, col1_p_length + 1));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                11 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(12, 1),
                                                (e = n),
                                                (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length);
                                        }
                                }
                            }
                            arr_data_body.forEach((e, t) => {
                                e.setAttribute("data-verse", t + 1);
                            }),
                                (arr_data_all = arr_data_head.concat(arr_data_body)),
                                arrDataDivShow.push(arr_data_all),
                                (arr_data_head = []),
                                (arr_data_body = []),
                                (arr_data_all = []),
                                (arr_trans = arr_trans.filter((e) => e)),
                                clearColsEmpty(),
                                window.iter_i++,
                                window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n);
                        } else
                            (l.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>'),
                                window.iter_i++,
                                window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n),
                                arrDataDivShow.push([]);
                        if ((countElementsInArray(arrDataDivShow) == arr_trans.length && buildDivShow(arrDataDivShow, s), mySizeWindow(), mySizeVerse(), null !== a && "" != a && null == n))
                            if (null !== r && "" != r) {
                                if (parseInt(a) < parseInt(r))
                                    for (let t = parseInt(a); t <= parseInt(r); t++)
                                        Array.from(document.querySelectorAll('[data-verse="' + t + '"]')).forEach((e) => {
                                            t == parseInt(a) ? e.classList.add("active_first") : t == parseInt(r) ? e.classList.add("active_last") : e.classList.add("active_middle");
                                        });
                            } else
                                null !== a &&
                                    "" != a &&
                                    document.querySelectorAll('[data-verse="' + a + '"]').forEach((e) => {
                                        e.classList.add("active_one");
                                    });
                        if (null !== n && "" != n)
                            if (null !== r && "" != r) {
                                if (parseInt(a) < parseInt(r))
                                    for (let t = parseInt(a); t <= parseInt(r); t++)
                                        Array.from(document.querySelectorAll('#col1 .colsInner [data-verse="' + t + '"]')).forEach((e) => {
                                            t == parseInt(a) ? e.classList.add("active_first") : t == parseInt(r) ? e.classList.add("active_last") : e.classList.add("active_middle");
                                        });
                            } else
                                null !== a &&
                                    "" != a &&
                                    document.querySelectorAll('.colsInner [data-verse="' + a + '"]').forEach((e) => {
                                        e.classList.add("active_one");
                                    });
                        null !== a && "" != a && scrollToVerse(a, r), null !== n && "" != n && scrollToVerseView(n), mySizeWindow(), mySizeVerse(), addListenerToPA();
                    } catch (e) {
                        console.error("1. error try-catch con obj_bible_files. error: ", e);
                    }
                if (void 0 === obj_bible_files[m].Books[u])
                    try {
                        new Date().getTime();
                        var O = `./modules/text/${m}/` + h.Books[u].PathName,
                            k = await (await fetch(O)).text();
                        crear_objeto_obj_bible_files && "" != k && " " != k && (obj_bible_files[m].Books[u] = { fileName: h.Books[u].PathName, fileContent: k });
                        let e = k.split("<h4>");
                        if (((e = e.filter((e) => e)), k.includes("<h2>"))) {
                            var S = k.split("<h2>");
                            let e;
                            e = "" == (e = S[1].includes("</h2>") ? S[1].split("</h2>")[0] : S[1]) ? h.Books[u].FullName : e;
                            var w = document.createElement("h2");
                            w.append(e), arr_data_head.push(w), "Y" == h.HTMLFilter && (w.innerHTML = htmlEntities(w.innerHTML));
                        }
                        if (void 0 !== e[b]) {
                            let p = b;
                            var Y,
                                L,
                                E,
                                H,
                                N,
                                R = e[b].split("<p>"),
                                D = R.length - 1;
                            if (
                                ("#col1" == t && (window.col1_p_length = D),
                                R.forEach((a, r) => {
                                    if (0 == r) {
                                        let e;
                                        "" == (e = a.includes("</h4>") ? a.split("</h4>")[0] : a) && (e = h.Books[u].FullName + " " + b);
                                        r = document.createElement("h4");
                                        r.append(e), arr_data_head.push(r), "Y" == h.HTMLFilter && (r.innerHTML = htmlEntities(r.innerHTML));
                                    } else {
                                        let e = "";
                                        var n = (e = a.includes("</p>") ? a.split("</p>")[0] : a).split(" "),
                                            r = n[0];
                                        let t = "";
                                        for (let e = 1; e < n.length; e++) t += n[e] + " ";
                                        var a = document.createElement("p"),
                                            s = ((a.id = m + "__" + u + "__" + b + "__" + r), a.setAttribute("data-verse", r), document.createElement("a"));
                                        (s.href = "#"), (s.innerHTML = `${h.Books[u].ShortNames[0]} ${p}:` + r), a.append(s), a.append(" ");
                                        const c = document.createElement("span");
                                        if (
                                            ((c.className = "vt"),
                                            "Y" == h.StrongNumbers &&
                                                (((r = t).includes(" ") ? r.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                    var a, r, n;
                                                    isNaN(parseInt(e)) && "0" != e
                                                        ? (c.append(" "), v && e.includes("<S>") && (e = e.replace("<S>", '<S class="show strongActive">')), c.append(e))
                                                        : ((a = document.createElement("span")),
                                                          v ? (a.className = "strong show strongActive") : (a.className = "strong"),
                                                          "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                              ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), c.append(a), c.append(n))
                                                              : ((a.innerHTML = e), c.append(a)));
                                                }),
                                                a.append(c),
                                                a.innerHTML.trim(),
                                                "Y" == h.HTMLFilter && (a.innerHTML = htmlEntities(a.innerHTML)),
                                                v &&
                                                    a.innerHTML.includes("strongActive") &&
                                                    a.querySelectorAll(".strongActive").forEach((t) => {
                                                        t.addEventListener("click", () => {
                                                            var e = "Y" == h.StrongFirstLetter ? "Y" : "N";
                                                            t.innerHTML.includes("H") || t.innerHTML.includes("G") ? getStrongNumber(t.innerHTML, null, e) : ((lang = 39 <= u ? "Grk" : "Heb"), getStrongNumber(t.innerHTML, lang, e));
                                                        });
                                                    }),
                                                arr_data_body.push(a)),
                                            "Y" == h.Notes)
                                        ) {
                                            r = t;
                                            if (r.includes(h.NoteSign)) {
                                                var o = r.split(h.NoteSign)[0];
                                                if (r.includes(h.StartNoteSign) && r.includes(h.EndNoteSign)) {
                                                    a.className = "with_notes";
                                                    var r = r.split(h.StartNoteSign)[1].split(h.EndNoteSign),
                                                        i = r[0],
                                                        r = r[1],
                                                        l = document.createElement("span"),
                                                        d = document.createElement("span");
                                                    if ((o = "Y" == h.HTMLFilter ? htmlEntities(o) : o).includes('<h6 class="prim_h6">') && o.includes("</h6>")) {
                                                        var _ = document.createElement("h6");
                                                        _.className = "prim_h6";
                                                        let e = o.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                        (e = e.filter((e) => e)), (_.innerHTML = e[0]), l.append(_);
                                                    } else l.innerHTML = o;
                                                    c.append(l), c.append(buildWrTooltip(h.NoteSign, i, a.id, s.innerHTML)), (r = "Y" == h.HTMLFilter ? htmlEntities(r) : r), (d.innerHTML = r), c.append(d), a.append(c);
                                                }
                                            } else c.append(t), a.append(c), "Y" == h.HTMLFilter && (a.innerHTML = htmlEntities(a.innerHTML));
                                            arr_data_body.push(a);
                                        }
                                        "Y" == h.Titles &&
                                            ((_ = t).includes(h.StartTitleSign) && _.includes(h.EndTitleSign)
                                                ? ((l = (o = _.split(h.StartTitleSign))[0]),
                                                  (s = (i = o[1].split(h.EndTitleSign))[0]),
                                                  (r = i[1]),
                                                  ((d = document.createElement("span")).className = "verse_title"),
                                                  (d.innerHTML = s),
                                                  c.append(l),
                                                  c.append(d),
                                                  c.append(r))
                                                : c.append(t),
                                            a.append(c),
                                            arr_data_body.push(a),
                                            "Y" == h.HTMLFilter) &&
                                            (a.innerHTML = htmlEntities(a.innerHTML)),
                                            "N" == h.StrongNumbers && "N" == h.Notes && "N" == h.Titles && (c.append(t), a.append(c), arr_data_body.push(a), "Y" == h.HTMLFilter) && (a.innerHTML = htmlEntities(a.innerHTML));
                                    }
                                }),
                                "Y" == base_ep && "N" == h.EnglishPsalms)
                            ) {
                                let e = [],
                                    t = [];
                                switch (parseInt(u)) {
                                    case 3:
                                        12 == b && ((e = for_parseVerse(m, h, k, u, 13, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 13, 16), arr_data_body.splice(col1_p_length)),
                                            13 == b && arr_data_body.splice(0, 1);
                                        break;
                                    case 5:
                                        5 == b && arr_data_body.splice(col1_p_length),
                                            6 == b && (addChapterToHead(h, u, 5), (e = for_parseVerse(m, h, k, u, 5, 16)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 6, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 8:
                                        20 == b && ((Y = mergeVerses((e = for_parseVerse(m, h, k, u, 20, form_list_verses(1, col1_p_length + 1))), 42)), (arr_data_body = [].concat(Y, arr_data_body)).splice(col1_p_length)),
                                            23 == b && ((e = for_parseVerse(m, h, k, u, 24, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 24, 29), arr_data_body.splice(col1_p_length)),
                                            24 == b && arr_data_body.splice(0, 1);
                                        break;
                                    case 17:
                                        39 == b && arr_data_body.splice(col1_p_length),
                                            40 == b &&
                                                (addChapterToHead(h, u, 39),
                                                (e = for_parseVerse(m, h, k, u, 39, form_list_verses(31, 35))),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 40, 6),
                                                arr_data_body.splice(col1_p_length)),
                                            41 == b &&
                                                (addChapterToHead(h, u, 40),
                                                (e = for_parseVerse(m, h, k, u, 40, form_list_verses(20, 27))),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 41, 9),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 18:
                                        3 <= b && b <= 8 && arr_data_body.splice(0, 1),
                                            9 == b && (arr_data_body.splice(0, 1), arr_data_body.splice(col1_p_length)),
                                            10 == b && (addChapterToHead(h, u, 9), (e = for_parseVerse(m, h, k, u, 9, form_list_verses(22, 39))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            (11 == b ||
                                                (14 <= b && b <= 17) ||
                                                (23 <= b && b <= 29) ||
                                                (32 <= b && b <= 33) ||
                                                35 == b ||
                                                37 == b ||
                                                43 == b ||
                                                50 == b ||
                                                66 == b ||
                                                (71 <= b && b <= 74) ||
                                                (78 <= b && b <= 79) ||
                                                82 == b ||
                                                86 == b ||
                                                87 == b ||
                                                91 == b ||
                                                (93 <= b && b <= 101) ||
                                                (103 <= b && b <= 107) ||
                                                (109 <= b && b <= 114) ||
                                                (117 <= b && b <= 146)) &&
                                                (addChapterToHead(h, u, parseInt(b) - 1), (e = for_parseVerse(m, h, k, u, b - 1, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            (12 == b ||
                                                (18 <= b && b <= 22) ||
                                                (30 <= b && b <= 31) ||
                                                34 == b ||
                                                36 == b ||
                                                (38 <= b && b <= 42) ||
                                                (44 <= b && b <= 49) ||
                                                53 == b ||
                                                (55 <= b && b <= 59) ||
                                                (61 <= b && b <= 65) ||
                                                (67 <= b && b <= 70) ||
                                                (75 <= b && b <= 77) ||
                                                (80 <= b && b <= 81) ||
                                                (83 <= b && b <= 85) ||
                                                (88 <= b && b < 90) ||
                                                92 == b ||
                                                102 == b ||
                                                108 == b) &&
                                                (addChapterToHead(h, u, parseInt(b) - 1), (e = for_parseVerse(m, h, k, u, b - 1, form_list_verses(2, col1_p_length + 1))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            13 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, h, k, u, b - 1, form_list_verses(2, 6))),
                                                (arr_data_body = e.concat(vstavka_vacio("arriba"), arr_data_body)).splice(col1_p_length)),
                                            ((51 <= b && b <= 52) || 54 == b || 60 == b) &&
                                                (addChapterToHead(h, u, parseInt(b) - 1), (e = for_parseVerse(m, h, k, u, b - 1, form_list_verses(3, col1_p_length + 2))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            90 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, h, k, u, b - 1, form_list_verses(2, col1_p_length))),
                                                ((L = document.createElement("p")).className = "prim"),
                                                (L.innerHTML = "смотри стих выше..."),
                                                e.splice(5, 0, L),
                                                (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            115 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 2), (e = for_parseVerse(m, h, k, u, b - 2, form_list_verses(9, col1_p_length + 8))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            116 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 2),
                                                (e = for_parseVerse(m, h, k, u, b - 2, form_list_verses(1, 9))),
                                                (t = for_parseVerse(m, h, k, u, b - 1, form_list_verses(1, 10))),
                                                (e = e.concat(t)),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 115, 10),
                                                arr_data_body.splice(col1_p_length)),
                                            147 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, h, k, u, b - 1, form_list_verses(1, 11))),
                                                (t = for_parseVerse(m, h, k, u, b, form_list_verses(1, 9))),
                                                (e = e.concat(t)),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 147, 12),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 19:
                                        4 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                        break;
                                    case 21:
                                        1 == b &&
                                            ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length))),
                                            ((E = document.createElement("p")).className = "prim"),
                                            (E.innerHTML = "заглавие..."),
                                            e.splice(0, 0, E),
                                            (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            6 == b && ((e = for_parseVerse(m, h, k, u, parseInt(b) + 1, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 7, 13), arr_data_body.splice(col1_p_length)),
                                            7 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(2, col1_p_length + 1))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 22:
                                        3 == b &&
                                            ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length))),
                                            ((H = document.createElement("p")).className = "prim"),
                                            (H.innerHTML = "смотри стих выше..."),
                                            e.splice(19, 0, H),
                                            (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 26:
                                        3 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            4 == b &&
                                                (addChapterToHead(h, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, h, k, u, b - 1, form_list_verses(31, 33))),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 4, 4),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 27:
                                        13 == b && ((e = for_parseVerse(m, h, k, u, 14, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 14, 16), arr_data_body.splice(col1_p_length)),
                                            14 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(2, 10))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 31:
                                        1 == b && ((e = for_parseVerse(m, h, k, u, 2, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 2, 17), arr_data_body.splice(col1_p_length)),
                                            2 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(2, 11))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 44:
                                        16 == b && ((e = for_parseVerse(m, h, k, u, b - 2, form_list_verses(24, 26))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 14, 25), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 46:
                                        13 == b &&
                                            ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length - 1))),
                                            ((N = document.createElement("p")).className = "prim"),
                                            (N.innerHTML = "смотри стих выше..."),
                                            e.splice(12, 0, N),
                                            (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                }
                            }
                            if ("N" == base_ep && "Y" == h.EnglishPsalms) {
                                let e = [],
                                    t = [];
                                switch (parseInt(u)) {
                                    case 3:
                                        12 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            13 == b && (addChapterToHead(h, u, 12), (e = for_parseVerse(m, h, k, u, 12, 16)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 13, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 5:
                                        5 == b && ((e = for_parseVerse(m, h, k, u, 6, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 6, 16), arr_data_body.splice(col1_p_length)),
                                            6 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(2, col1_p_length + 1))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 8:
                                        20 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length - 1))), (arr_data_body = [].concat(e, vstavka_vacio("arriba"))).splice(col1_p_length)),
                                            23 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = arr_data_body.concat(e)).splice(col1_p_length)),
                                            24 == b && (addChapterToHead(h, u, 23), (e = for_parseVerse(m, h, k, u, 23, 29)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 24, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 17:
                                        39 == b && ((e = for_parseVerse(m, h, k, u, 40, form_list_verses(1, 5))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 40, 31), arr_data_body.splice(col1_p_length)),
                                            40 == b &&
                                                ((e = for_parseVerse(m, h, k, u, 40, form_list_verses(6, 24))),
                                                (t = for_parseVerse(m, h, k, u, 41, form_list_verses(1, 8))),
                                                addChapterToVerse((arr_data_body = [].concat(e, t)), h, u, 41, 20),
                                                arr_data_body.splice(col1_p_length)),
                                            41 == b && ((e = for_parseVerse(m, h, k, u, 41, form_list_verses(9, 34))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                        break;
                                    case 18:
                                        if (
                                            (3 <= b && b <= 8 && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length - 1))), (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length)),
                                            9 == b &&
                                                ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, 20))),
                                                (t = for_parseVerse(m, h, k, u, 10, form_list_verses(1, 18))),
                                                addChapterToVerse((arr_data_body = [].concat(vstavka_vacio(), e, t)), h, u, 10, 22),
                                                arr_data_body.splice(col1_p_length)),
                                            (10 == b ||
                                                (13 <= b && b <= 16) ||
                                                (22 <= b && b <= 28) ||
                                                (31 <= b && b <= 32) ||
                                                34 == b ||
                                                36 == b ||
                                                42 == b ||
                                                49 == b ||
                                                65 == b ||
                                                (70 <= b && b <= 73) ||
                                                (77 <= b && b <= 78) ||
                                                81 == b ||
                                                85 == b ||
                                                86 == b ||
                                                90 == b ||
                                                (92 <= b && b <= 100) ||
                                                (102 <= b && b <= 106) ||
                                                (108 <= b && b < 113) ||
                                                (116 <= b && b <= 138) ||
                                                (140 <= b && b <= 145)) &&
                                                (addChapterToHead(h, u, parseInt(b) + 1),
                                                (e = for_parseVerse(m, h, k, u, parseInt(b) + 1, form_list_verses(1, col1_p_length))),
                                                (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            (11 == b ||
                                                12 == b ||
                                                (17 <= b && b <= 21) ||
                                                (29 <= b && b <= 30) ||
                                                33 == b ||
                                                35 == b ||
                                                (37 <= b && b <= 41) ||
                                                (43 <= b && b <= 48) ||
                                                52 == b ||
                                                (54 <= b && b <= 58) ||
                                                (60 <= b && b <= 64) ||
                                                (66 <= b && b <= 69) ||
                                                (74 <= b && b <= 76) ||
                                                (79 <= b && b <= 80) ||
                                                (82 <= b && b <= 84) ||
                                                (87 <= b && b < 89) ||
                                                91 == b ||
                                                101 == b ||
                                                107 == b ||
                                                139 == b) &&
                                                (addChapterToHead(h, u, parseInt(b) + 1),
                                                (e = for_parseVerse(m, h, k, u, parseInt(b) + 1, form_list_verses(1, col1_p_length - 1))),
                                                (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length)),
                                            ((50 <= b && b <= 51) || 53 == b || 59 == b) &&
                                                (addChapterToHead(h, u, parseInt(b) + 1),
                                                (e = for_parseVerse(m, h, k, u, parseInt(b) + 1, form_list_verses(1, col1_p_length - 2))),
                                                (arr_data_body = [].concat(vstavka_vacio(), vstavka_vacio(), e)).splice(col1_p_length)),
                                            89 == b)
                                        ) {
                                            addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse(m, h, k, u, parseInt(b) + 1, form_list_verses(1, col1_p_length)));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                4 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(5, 0),
                                                (e = n),
                                                (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length);
                                        }
                                        113 == b &&
                                            (addChapterToHead(h, u, parseInt(b) + 1),
                                            (e = for_parseVerse(m, h, k, u, parseInt(b) + 1, form_list_verses(1, 8))),
                                            (t = for_parseVerse(m, h, k, u, parseInt(b) + 2, form_list_verses(1, 18))),
                                            addChapterToVerse((arr_data_body = [].concat(e, t)), h, u, 115, 9),
                                            arr_data_body.splice(col1_p_length)),
                                            114 == b && (addChapterToHead(h, u, parseInt(b) + 2), (e = for_parseVerse(m, h, k, u, parseInt(b) + 2, form_list_verses(1, 9))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            115 == b && (addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse(m, h, k, u, parseInt(b) + 1, form_list_verses(10, 19))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            146 == b && (addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse(m, h, k, u, parseInt(b) + 1, form_list_verses(1, 11))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            147 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(12, 20))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 19:
                                        4 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                        break;
                                    case 21:
                                        if (1 == b) {
                                            e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                0 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(1, 1),
                                                (e = n),
                                                (arr_data_body = [].concat(e)).splice(col1_p_length);
                                        }
                                        6 == b && arr_data_body.splice(col1_p_length),
                                            7 == b &&
                                                (addChapterToHead(h, u, 6),
                                                (e = for_parseVerse(m, h, k, u, parseInt(b) - 1, 13)),
                                                addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), h, u, 7, 2),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 22:
                                        if (3 == b) {
                                            e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                18 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(19, 1),
                                                (e = n),
                                                (arr_data_body = [].concat(e)).splice(col1_p_length);
                                        }
                                        break;
                                    case 26:
                                        3 == b &&
                                            ((e = for_parseVerse(m, h, k, u, b, form_list_verses(1, 30))),
                                            (t = for_parseVerse(m, h, k, u, 4, form_list_verses(1, 3))),
                                            addChapterToVerse((arr_data_body = [].concat(e, t)), h, u, 4, 31),
                                            arr_data_body.splice(col1_p_length)),
                                            4 == b && ((e = for_parseVerse(m, h, k, u, b, form_list_verses(4, col1_p_length + 3))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 27:
                                        14 == b && (addChapterToHead(h, u, 13), (e = for_parseVerse(m, h, k, u, 13, 16)), addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), h, u, 14, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 31:
                                        1 == b && ((e = for_parseVerse(m, h, k, u, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length)),
                                            2 == b && (addChapterToHead(h, u, 1), (e = for_parseVerse(m, h, k, u, 1, 17)), addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), h, u, 2, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 44:
                                        14 == b && ((e = for_parseVerse(m, h, k, u, 16, form_list_verses(25, 27))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 16, 24), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 46:
                                        if (13 == b) {
                                            e = for_parseVerse(m, h, k, u, b, form_list_verses(1, col1_p_length + 1));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                11 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(12, 1),
                                                (e = n),
                                                (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length);
                                        }
                                }
                            }
                            arr_data_body.forEach((e, t) => {
                                e.setAttribute("data-verse", t + 1);
                            }),
                                (arr_data_all = arr_data_head.concat(arr_data_body)),
                                arrDataDivShow.push(arr_data_all),
                                (arr_data_head = []),
                                (arr_data_body = []),
                                (arr_data_all = []),
                                (arr_trans = arr_trans.filter((e) => e)),
                                clearColsEmpty(),
                                window.iter_i++,
                                window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n);
                        } else
                            (l.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>'),
                                window.iter_i++,
                                window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n),
                                arrDataDivShow.push([]);
                        if ((countElementsInArray(arrDataDivShow) == arr_trans.length && buildDivShow(arrDataDivShow, s), mySizeWindow(), mySizeVerse(), null !== a && "" != a && null == n))
                            if (null !== r && "" != r) {
                                if (parseInt(a) < parseInt(r))
                                    for (let t = parseInt(a); t <= parseInt(r); t++)
                                        Array.from(document.querySelectorAll('[data-verse="' + t + '"]')).forEach((e) => {
                                            t == parseInt(a) ? e.classList.add("active_first") : t == parseInt(r) ? e.classList.add("active_last") : e.classList.add("active_middle");
                                        });
                            } else
                                null !== a &&
                                    "" != a &&
                                    document.querySelectorAll('[data-verse="' + a + '"]').forEach((e) => {
                                        e.classList.add("active_one");
                                    });
                        if (null !== n && "" != n)
                            if (null !== r && "" != r) {
                                if (parseInt(a) < parseInt(r))
                                    for (let t = parseInt(a); t <= parseInt(r); t++)
                                        Array.from(document.querySelectorAll('#col1 .colsInner [data-verse="' + t + '"]')).forEach((e) => {
                                            t == parseInt(a) ? e.classList.add("active_first") : t == parseInt(r) ? e.classList.add("active_last") : e.classList.add("active_middle");
                                        });
                            } else
                                null !== a &&
                                    "" != a &&
                                    document.querySelectorAll('.colsInner [data-verse="' + a + '"]').forEach((e) => {
                                        e.classList.add("active_one");
                                    });
                        null !== a && "" != a && scrollToVerse(a, r), null !== n && "" != n && scrollToVerseView(n), mySizeWindow(), mySizeVerse(), addListenerToPA();
                    } catch (e) {
                        console.error("error try-catch en await fetch() con obj_bible_files. error: ", e);
                    }
            } else
                arrDataDivShow.push([]),
                    window.iter_i++,
                    window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n),
                    countElementsInArray(arrDataDivShow) == arr_trans.length && buildDivShow(arrDataDivShow, s),
                    document.querySelectorAll(".colsInner").forEach((e) => {
                        var t;
                        (0 != e.childElementCount && "" != e.textContent) || (((t = document.createElement("p")).className = "prim"), (t.innerHTML = "В данном модуле отсутствует указанная книга."), e.append(t));
                    });
        } else
            try {
                const q = await (await fetch(`./modules/text/${m}/bibleqt.json`)).json();
                if ((null != e && ((o.innerHTML = q.BibleShortName), (i.innerHTML = q.BibleShortName)), void 0 !== q.Books[u]))
                    try {
                        var P = `./modules/text/${m}/` + q.Books[u].PathName;
                        if (P.includes("no_disponible.htm"))
                            return (
                                window.iter_i++,
                                window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n),
                                arrDataDivShow.push([]),
                                countElementsInArray(arrDataDivShow) == arr_trans.length && buildDivShow(arrDataDivShow, s),
                                !1
                            );
                        var h = await (await fetch(P)).text();
                        let e = h.split("<h4>");
                        if (((e = e.filter((e) => e)), h.includes("<h2>"))) {
                            var M = h.split("<h2>");
                            let e;
                            e = "" == (e = M[1].includes("</h2>") ? M[1].split("</h2>")[0] : M[1]) ? q.Books[u].FullName : e;
                            var A = document.createElement("h2");
                            A.append(e), arr_data_head.push(A), "Y" == q.HTMLFilter && (A.innerHTML = htmlEntities(A.innerHTML));
                        }
                        if (void 0 !== e[b]) {
                            let p = b;
                            var $,
                                j,
                                C,
                                I,
                                x,
                                W = e[b].split("<p>"),
                                z = W.length - 1;
                            if (
                                ("#col1" == t && (window.col1_p_length = z),
                                W.forEach((a, r) => {
                                    if (0 == r) {
                                        let e;
                                        "" == (e = a.includes("</h4>") ? a.split("</h4>")[0] : a) && (e = q.Books[u].FullName + " " + b);
                                        r = document.createElement("h4");
                                        r.append(e), arr_data_head.push(r), "Y" == q.HTMLFilter && (r.innerHTML = htmlEntities(r.innerHTML));
                                    } else {
                                        let e = "";
                                        var n = (e = a.includes("</p>") ? a.split("</p>")[0] : a).split(" "),
                                            r = n[0];
                                        let t = "";
                                        for (let e = 1; e < n.length; e++) t += n[e] + " ";
                                        var a = document.createElement("p"),
                                            s = ((a.id = m + "__" + u + "__" + b + "__" + r), a.setAttribute("data-verse", r), document.createElement("a"));
                                        (s.href = "#"), (s.innerHTML = `${q.Books[u].ShortNames[0]} ${p}:` + r), a.append(s), a.append(" ");
                                        const c = document.createElement("span");
                                        if (
                                            ((c.className = "vt"),
                                            "Y" == q.StrongNumbers &&
                                                (((r = t).includes(" ") ? r.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                    var a, r, n;
                                                    isNaN(parseInt(e)) && "0" != e
                                                        ? (c.append(" "), v && e.includes("<S>") && (e = e.replace("<S>", '<S class="show strongActive">')), c.append(e))
                                                        : ((a = document.createElement("span")),
                                                          v ? (a.className = "strong show strongActive") : (a.className = "strong"),
                                                          "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                              ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), c.append(a), c.append(n))
                                                              : ((a.innerHTML = e), c.append(a)));
                                                }),
                                                a.append(c),
                                                a.innerHTML.trim(),
                                                "Y" == q.HTMLFilter && (a.innerHTML = htmlEntities(a.innerHTML)),
                                                v &&
                                                    a.innerHTML.includes("strongActive") &&
                                                    a.querySelectorAll(".strongActive").forEach((t) => {
                                                        t.addEventListener("click", () => {
                                                            var e = "Y" == q.StrongFirstLetter ? "Y" : "N";
                                                            t.innerHTML.includes("H") || t.innerHTML.includes("G") ? getStrongNumber(t.innerHTML, null, e) : ((lang = 39 <= u ? "Grk" : "Heb"), getStrongNumber(t.innerHTML, lang, e));
                                                        });
                                                    }),
                                                arr_data_body.push(a)),
                                            "Y" == q.Notes)
                                        ) {
                                            r = t;
                                            if (r.includes(q.NoteSign)) {
                                                var o = r.split(q.NoteSign)[0];
                                                if (r.includes(q.StartNoteSign) && r.includes(q.EndNoteSign)) {
                                                    a.className = "with_notes";
                                                    var r = r.split(q.StartNoteSign)[1].split(q.EndNoteSign),
                                                        i = r[0],
                                                        r = r[1],
                                                        l = document.createElement("span"),
                                                        d = document.createElement("span");
                                                    if ((o = "Y" == q.HTMLFilter ? htmlEntities(o) : o).includes('<h6 class="prim_h6">') && o.includes("</h6>")) {
                                                        var _ = document.createElement("h6");
                                                        _.className = "prim_h6";
                                                        let e = o.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                        (e = e.filter((e) => e)), (_.innerHTML = e[0]), l.append(_);
                                                    } else l.innerHTML = o;
                                                    c.append(l), c.append(buildWrTooltip(q.NoteSign, i, a.id, s.innerHTML)), (r = "Y" == q.HTMLFilter ? htmlEntities(r) : r), (d.innerHTML = r), c.append(d), a.append(c);
                                                }
                                            } else c.append(t), a.append(c), "Y" == q.HTMLFilter && (a.innerHTML = htmlEntities(a.innerHTML));
                                            arr_data_body.push(a);
                                        }
                                        "Y" == q.Titles &&
                                            ((_ = t).includes(q.StartTitleSign) && _.includes(q.EndTitleSign)
                                                ? ((l = (o = _.split(q.StartTitleSign))[0]),
                                                  (s = (i = o[1].split(q.EndTitleSign))[0]),
                                                  (r = i[1]),
                                                  ((d = document.createElement("span")).className = "verse_title"),
                                                  (d.innerHTML = s),
                                                  c.append(l),
                                                  c.append(d),
                                                  c.append(r))
                                                : c.append(t),
                                            a.append(c),
                                            arr_data_body.push(a),
                                            "Y" == q.HTMLFilter) &&
                                            (a.innerHTML = htmlEntities(a.innerHTML)),
                                            "N" == q.StrongNumbers && "N" == q.Notes && "N" == q.Titles && (c.append(t), a.append(c), arr_data_body.push(a), "Y" == q.HTMLFilter) && (a.innerHTML = htmlEntities(a.innerHTML));
                                    }
                                }),
                                "Y" == base_ep && "N" == q.EnglishPsalms)
                            ) {
                                let e = [],
                                    t = [];
                                switch (parseInt(u)) {
                                    case 3:
                                        12 == b && ((e = for_parseVerse(m, q, h, u, 13, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), q, u, 13, 16), arr_data_body.splice(col1_p_length)),
                                            13 == b && arr_data_body.splice(0, 1);
                                        break;
                                    case 5:
                                        5 == b && arr_data_body.splice(col1_p_length),
                                            6 == b && (addChapterToHead(q, u, 5), (e = for_parseVerse(m, q, h, u, 5, 16)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), q, u, 6, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 8:
                                        20 == b && (($ = mergeVerses((e = for_parseVerse(m, q, h, u, 20, form_list_verses(1, col1_p_length + 1))), 42)), (arr_data_body = [].concat($, arr_data_body)).splice(col1_p_length)),
                                            23 == b && ((e = for_parseVerse(m, q, h, u, 24, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), q, u, 24, 29), arr_data_body.splice(col1_p_length)),
                                            24 == b && arr_data_body.splice(0, 1);
                                        break;
                                    case 17:
                                        39 == b && arr_data_body.splice(col1_p_length),
                                            40 == b &&
                                                (addChapterToHead(q, u, 39),
                                                (e = for_parseVerse(m, q, h, u, 39, form_list_verses(31, 35))),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), q, u, 40, 6),
                                                arr_data_body.splice(col1_p_length)),
                                            41 == b &&
                                                (addChapterToHead(q, u, 40),
                                                (e = for_parseVerse(m, q, h, u, 40, form_list_verses(20, 27))),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), q, u, 41, 9),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 18:
                                        3 <= b && b <= 8 && arr_data_body.splice(0, 1),
                                            9 == b && (arr_data_body.splice(0, 1), arr_data_body.splice(col1_p_length)),
                                            10 == b && (addChapterToHead(q, u, 9), (e = for_parseVerse(m, q, h, u, 9, form_list_verses(22, 39))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            (11 == b ||
                                                (14 <= b && b <= 17) ||
                                                (23 <= b && b <= 29) ||
                                                (32 <= b && b <= 33) ||
                                                35 == b ||
                                                37 == b ||
                                                43 == b ||
                                                50 == b ||
                                                66 == b ||
                                                (71 <= b && b <= 74) ||
                                                (78 <= b && b <= 79) ||
                                                82 == b ||
                                                86 == b ||
                                                87 == b ||
                                                91 == b ||
                                                (93 <= b && b <= 101) ||
                                                (103 <= b && b <= 107) ||
                                                (109 <= b && b <= 114) ||
                                                (117 <= b && b <= 146)) &&
                                                (addChapterToHead(q, u, parseInt(b) - 1), (e = for_parseVerse(m, q, h, u, b - 1, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            (12 == b ||
                                                (18 <= b && b <= 22) ||
                                                (30 <= b && b <= 31) ||
                                                34 == b ||
                                                36 == b ||
                                                (38 <= b && b <= 42) ||
                                                (44 <= b && b <= 49) ||
                                                53 == b ||
                                                (55 <= b && b <= 59) ||
                                                (61 <= b && b <= 65) ||
                                                (67 <= b && b <= 70) ||
                                                (75 <= b && b <= 77) ||
                                                (80 <= b && b <= 81) ||
                                                (83 <= b && b <= 85) ||
                                                (88 <= b && b < 90) ||
                                                92 == b ||
                                                102 == b ||
                                                108 == b) &&
                                                (addChapterToHead(q, u, parseInt(b) - 1), (e = for_parseVerse(m, q, h, u, b - 1, form_list_verses(2, col1_p_length + 1))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            13 == b &&
                                                (addChapterToHead(q, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, q, h, u, b - 1, form_list_verses(2, 6))),
                                                (arr_data_body = e.concat(vstavka_vacio("arriba"), arr_data_body)).splice(col1_p_length)),
                                            ((51 <= b && b <= 52) || 54 == b || 60 == b) &&
                                                (addChapterToHead(q, u, parseInt(b) - 1), (e = for_parseVerse(m, q, h, u, b - 1, form_list_verses(3, col1_p_length + 2))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            90 == b &&
                                                (addChapterToHead(q, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, q, h, u, b - 1, form_list_verses(2, col1_p_length))),
                                                ((j = document.createElement("p")).className = "prim"),
                                                (j.innerHTML = "смотри стих выше..."),
                                                e.splice(5, 0, j),
                                                (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            115 == b &&
                                                (addChapterToHead(q, u, parseInt(b) - 2), (e = for_parseVerse(m, q, h, u, b - 2, form_list_verses(9, col1_p_length + 8))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            116 == b &&
                                                (addChapterToHead(q, u, parseInt(b) - 2),
                                                (e = for_parseVerse(m, q, h, u, b - 2, form_list_verses(1, 9))),
                                                (t = for_parseVerse(m, q, h, u, b - 1, form_list_verses(1, 10))),
                                                (e = e.concat(t)),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), q, u, 115, 10),
                                                arr_data_body.splice(col1_p_length)),
                                            147 == b &&
                                                (addChapterToHead(q, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, q, h, u, b - 1, form_list_verses(1, 11))),
                                                (t = for_parseVerse(m, q, h, u, b, form_list_verses(1, 9))),
                                                (e = e.concat(t)),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), q, u, 147, 12),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 19:
                                        4 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                        break;
                                    case 21:
                                        1 == b &&
                                            ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length))),
                                            ((C = document.createElement("p")).className = "prim"),
                                            (C.innerHTML = "заглавие..."),
                                            e.splice(0, 0, C),
                                            (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            6 == b && ((e = for_parseVerse(m, q, h, u, parseInt(b) + 1, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), q, u, 7, 13), arr_data_body.splice(col1_p_length)),
                                            7 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(2, col1_p_length + 1))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 22:
                                        3 == b &&
                                            ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length))),
                                            ((I = document.createElement("p")).className = "prim"),
                                            (I.innerHTML = "смотри стих выше..."),
                                            e.splice(19, 0, I),
                                            (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 26:
                                        3 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            4 == b &&
                                                (addChapterToHead(q, u, parseInt(b) - 1),
                                                (e = for_parseVerse(m, q, h, u, b - 1, form_list_verses(31, 33))),
                                                addChapterToVerse((arr_data_body = e.concat(arr_data_body)), q, u, 4, 4),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 27:
                                        13 == b && ((e = for_parseVerse(m, q, h, u, 14, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), q, u, 14, 16), arr_data_body.splice(col1_p_length)),
                                            14 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(2, 10))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 31:
                                        1 == b && ((e = for_parseVerse(m, q, h, u, 2, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), q, u, 2, 17), arr_data_body.splice(col1_p_length)),
                                            2 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(2, 11))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 44:
                                        16 == b && ((e = for_parseVerse(m, q, h, u, b - 2, form_list_verses(24, 26))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), q, u, 14, 25), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 46:
                                        13 == b &&
                                            ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length - 1))),
                                            ((x = document.createElement("p")).className = "prim"),
                                            (x.innerHTML = "смотри стих выше..."),
                                            e.splice(12, 0, x),
                                            (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                }
                            }
                            if ("N" == base_ep && "Y" == q.EnglishPsalms) {
                                let e = [],
                                    t = [];
                                switch (parseInt(u)) {
                                    case 3:
                                        12 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            13 == b && (addChapterToHead(q, u, 12), (e = for_parseVerse(m, q, h, u, 12, 16)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), q, u, 13, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 5:
                                        5 == b && ((e = for_parseVerse(m, q, h, u, 6, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), q, u, 6, 16), arr_data_body.splice(col1_p_length)),
                                            6 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(2, col1_p_length + 1))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 8:
                                        20 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length - 1))), (arr_data_body = [].concat(e, vstavka_vacio("arriba"))).splice(col1_p_length)),
                                            23 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = arr_data_body.concat(e)).splice(col1_p_length)),
                                            24 == b && (addChapterToHead(q, u, 23), (e = for_parseVerse(m, q, h, u, 23, 29)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), q, u, 24, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 17:
                                        39 == b && ((e = for_parseVerse(m, q, h, u, 40, form_list_verses(1, 5))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), q, u, 40, 31), arr_data_body.splice(col1_p_length)),
                                            40 == b &&
                                                ((e = for_parseVerse(m, q, h, u, 40, form_list_verses(6, 24))),
                                                (t = for_parseVerse(m, q, h, u, 41, form_list_verses(1, 8))),
                                                addChapterToVerse((arr_data_body = [].concat(e, t)), q, u, 41, 20),
                                                arr_data_body.splice(col1_p_length)),
                                            41 == b && ((e = for_parseVerse(m, q, h, u, 41, form_list_verses(9, 34))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                        break;
                                    case 18:
                                        if (
                                            (3 <= b && b <= 8 && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length - 1))), (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length)),
                                            9 == b &&
                                                ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, 20))),
                                                (t = for_parseVerse(m, q, h, u, 10, form_list_verses(1, 18))),
                                                addChapterToVerse((arr_data_body = [].concat(vstavka_vacio(), e, t)), q, u, 10, 22),
                                                arr_data_body.splice(col1_p_length)),
                                            (10 == b ||
                                                (13 <= b && b <= 16) ||
                                                (22 <= b && b <= 28) ||
                                                (31 <= b && b <= 32) ||
                                                34 == b ||
                                                36 == b ||
                                                42 == b ||
                                                49 == b ||
                                                65 == b ||
                                                (70 <= b && b <= 73) ||
                                                (77 <= b && b <= 78) ||
                                                81 == b ||
                                                85 == b ||
                                                86 == b ||
                                                90 == b ||
                                                (92 <= b && b <= 100) ||
                                                (102 <= b && b <= 106) ||
                                                (108 <= b && b < 113) ||
                                                (116 <= b && b <= 138) ||
                                                (140 <= b && b <= 145)) &&
                                                (addChapterToHead(q, u, parseInt(b) + 1),
                                                (e = for_parseVerse(m, q, h, u, parseInt(b) + 1, form_list_verses(1, col1_p_length))),
                                                (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            (11 == b ||
                                                12 == b ||
                                                (17 <= b && b <= 21) ||
                                                (29 <= b && b <= 30) ||
                                                33 == b ||
                                                35 == b ||
                                                (37 <= b && b <= 41) ||
                                                (43 <= b && b <= 48) ||
                                                52 == b ||
                                                (54 <= b && b <= 58) ||
                                                (60 <= b && b <= 64) ||
                                                (66 <= b && b <= 69) ||
                                                (74 <= b && b <= 76) ||
                                                (79 <= b && b <= 80) ||
                                                (82 <= b && b <= 84) ||
                                                (87 <= b && b < 89) ||
                                                91 == b ||
                                                101 == b ||
                                                107 == b ||
                                                139 == b) &&
                                                (addChapterToHead(q, u, parseInt(b) + 1),
                                                (e = for_parseVerse(m, q, h, u, parseInt(b) + 1, form_list_verses(1, col1_p_length - 1))),
                                                (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length)),
                                            ((50 <= b && b <= 51) || 53 == b || 59 == b) &&
                                                (addChapterToHead(q, u, parseInt(b) + 1),
                                                (e = for_parseVerse(m, q, h, u, parseInt(b) + 1, form_list_verses(1, col1_p_length - 2))),
                                                (arr_data_body = [].concat(vstavka_vacio(), vstavka_vacio(), e)).splice(col1_p_length)),
                                            89 == b)
                                        ) {
                                            addChapterToHead(q, u, parseInt(b) + 1), (e = for_parseVerse(m, q, h, u, parseInt(b) + 1, form_list_verses(1, col1_p_length)));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                4 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(5, 0),
                                                (e = n),
                                                (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length);
                                        }
                                        113 == b &&
                                            (addChapterToHead(q, u, parseInt(b) + 1),
                                            (e = for_parseVerse(m, q, h, u, parseInt(b) + 1, form_list_verses(1, 8))),
                                            (t = for_parseVerse(m, q, h, u, parseInt(b) + 2, form_list_verses(1, 18))),
                                            addChapterToVerse((arr_data_body = [].concat(e, t)), q, u, 115, 9),
                                            arr_data_body.splice(col1_p_length)),
                                            114 == b && (addChapterToHead(q, u, parseInt(b) + 2), (e = for_parseVerse(m, q, h, u, parseInt(b) + 2, form_list_verses(1, 9))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            115 == b && (addChapterToHead(q, u, parseInt(b) + 1), (e = for_parseVerse(m, q, h, u, parseInt(b) + 1, form_list_verses(10, 19))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            146 == b && (addChapterToHead(q, u, parseInt(b) + 1), (e = for_parseVerse(m, q, h, u, parseInt(b) + 1, form_list_verses(1, 11))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                            147 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(12, 20))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 19:
                                        4 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                        break;
                                    case 21:
                                        if (1 == b) {
                                            e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                0 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(1, 1),
                                                (e = n),
                                                (arr_data_body = [].concat(e)).splice(col1_p_length);
                                        }
                                        6 == b && arr_data_body.splice(col1_p_length),
                                            7 == b &&
                                                (addChapterToHead(q, u, 6),
                                                (e = for_parseVerse(m, q, h, u, parseInt(b) - 1, 13)),
                                                addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), q, u, 7, 2),
                                                arr_data_body.splice(col1_p_length));
                                        break;
                                    case 22:
                                        if (3 == b) {
                                            e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                18 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(19, 1),
                                                (e = n),
                                                (arr_data_body = [].concat(e)).splice(col1_p_length);
                                        }
                                        break;
                                    case 26:
                                        3 == b &&
                                            ((e = for_parseVerse(m, q, h, u, b, form_list_verses(1, 30))),
                                            (t = for_parseVerse(m, q, h, u, 4, form_list_verses(1, 3))),
                                            addChapterToVerse((arr_data_body = [].concat(e, t)), q, u, 4, 31),
                                            arr_data_body.splice(col1_p_length)),
                                            4 == b && ((e = for_parseVerse(m, q, h, u, b, form_list_verses(4, col1_p_length + 3))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length));
                                        break;
                                    case 27:
                                        14 == b && (addChapterToHead(q, u, 13), (e = for_parseVerse(m, q, h, u, 13, 16)), addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), q, u, 14, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 31:
                                        1 == b && ((e = for_parseVerse(m, q, h, u, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length)),
                                            2 == b && (addChapterToHead(q, u, 1), (e = for_parseVerse(m, q, h, u, 1, 17)), addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), q, u, 2, 2), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 44:
                                        14 == b && ((e = for_parseVerse(m, q, h, u, 16, form_list_verses(25, 27))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), q, u, 16, 24), arr_data_body.splice(col1_p_length));
                                        break;
                                    case 46:
                                        if (13 == b) {
                                            e = for_parseVerse(m, q, h, u, b, form_list_verses(1, col1_p_length + 1));
                                            let n = [];
                                            e.map((e, t, a) => {
                                                var r;
                                                11 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                            }),
                                                n.splice(12, 1),
                                                (e = n),
                                                (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length);
                                        }
                                }
                            }
                            arr_data_body.forEach((e, t) => {
                                e.setAttribute("data-verse", t + 1);
                            }),
                                (arr_data_all = arr_data_head.concat(arr_data_body)),
                                arrDataDivShow.push(arr_data_all),
                                (arr_data_head = []),
                                (arr_data_body = []),
                                (arr_data_all = []),
                                (arr_trans = arr_trans.filter((e) => e)),
                                clearColsEmpty(),
                                window.iter_i++,
                                window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n);
                        } else
                            (l.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>'),
                                window.iter_i++,
                                window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n),
                                arrDataDivShow.push([]);
                        if ((countElementsInArray(arrDataDivShow) == arr_trans.length && buildDivShow(arrDataDivShow, s), mySizeWindow(), mySizeVerse(), null !== a && "" != a && null == n))
                            if (null !== r && "" != r) {
                                if (parseInt(a) < parseInt(r))
                                    for (let t = parseInt(a); t <= parseInt(r); t++)
                                        Array.from(document.querySelectorAll('[data-verse="' + t + '"]')).forEach((e) => {
                                            t == parseInt(a) ? e.classList.add("active_first") : t == parseInt(r) ? e.classList.add("active_last") : e.classList.add("active_middle");
                                        });
                            } else
                                null !== a &&
                                    "" != a &&
                                    document.querySelectorAll('[data-verse="' + a + '"]').forEach((e) => {
                                        e.classList.add("active_one");
                                    });
                        if (null !== n && "" != n)
                            if (null !== r && "" != r) {
                                if (parseInt(a) < parseInt(r))
                                    for (let t = parseInt(a); t <= parseInt(r); t++)
                                        Array.from(document.querySelectorAll('#col1 .colsInner [data-verse="' + t + '"]')).forEach((e) => {
                                            t == parseInt(a) ? e.classList.add("active_first") : t == parseInt(r) ? e.classList.add("active_last") : e.classList.add("active_middle");
                                        });
                            } else
                                null !== a &&
                                    "" != a &&
                                    document.querySelectorAll('.colsInner [data-verse="' + a + '"]').forEach((e) => {
                                        e.classList.add("active_one");
                                    });
                        null !== a && "" != a && scrollToVerse(a, r), null !== n && "" != n && scrollToVerseView(n), mySizeWindow(), mySizeVerse(), addListenerToPA();
                    } catch (e) {
                        console.error("error try-catch en modo old. Error: ", e);
                    }
                else
                    document.querySelectorAll(".colsInner").forEach((e) => {
                        var t;
                        (0 != e.childElementCount && "" != e.textContent) || (((t = document.createElement("p")).className = "prim"), (t.innerHTML = "3.2 En este módulo no existe el libro indicado."), e.append(t));
                    });
            } catch (e) {
                console.error("14212. try-catch Error: ", e);
            }
    }
}
async function viaByJson_showChapterText4(m, t, u, b, a, r, n, s) {
    var e = document.querySelector(t + " .colsHead .colsHeadInner .partDesk .desk_trans"),
        o = document.querySelector(t + " .colsHead .colsHeadInner .partDesk .desk_trans"),
        i = document.querySelector(t + " .colsHead .colsHeadInner .partMob .mob_trans"),
        l = document.querySelector(t + " .colsInner");
    null == s && clearAllDivShow();
    let v = !1;
    if ((eid_btnStrong.classList.contains("btn_active") && (v = !0), (window.base_ep = eid_trans1.dataset.base_ep), (window.arr_data_head = []), (window.arr_data_body = []), (window.arr_data_all = []), null != m)) {
        var d = arrFavTransObj.find((e) => e.Translation === m);
        if (void 0 === d) return !1;
        let h = d;
        if ((null != e && ((o.innerHTML = h.BibleShortName), (i.innerHTML = h.BibleShortName)), void 0 !== h.Books[u]))
            try {
                var _ = `./modules/text/${m}/` + h.Books[u].PathName;
                if (_.includes("no_disponible.htm"))
                    return (
                        window.iter_i++,
                        window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n),
                        arrDataDivShow.push([]),
                        countElementsInArray(arrDataDivShow) == arr_trans.length && buildDivShow(arrDataDivShow, s),
                        !1
                    );
                var c = new FormData();
                c.append("url", "../" + _),
                    c.append("base_ep", base_ep),
                    c.append("bq_EnglishPsalms", h.EnglishPsalms),
                    null != u && c.append("book", u),
                    c.append("chapter", b),
                    "undefined" != typeof col1_p_length && null != col1_p_length && c.append("col1_p_length", col1_p_length);
                const N = await (await fetch("./php/read_file_to_json.php", { method: "POST", body: c })).json();
                let e = N.chapterData.h2_text;
                "" == e && (e = h.Books[u].FullName);
                var p = document.createElement("h2"),
                    f = (p.append(e), arr_data_head.push(p), N.chapterData),
                    g = void 0 !== N.vstavkaData ? N.vstavkaData.arr_p_verses : [],
                    T = void 0 !== N.vstavkaData2 ? N.vstavkaData2.arr_p_verses : [];
                if (void 0 !== f) {
                    b > f.ChapterQty && (b = f.ChapterQty), null != a && f.VerseQty < a && (a = f.VerseQty);
                    let p = b;
                    var y,
                        k,
                        S,
                        w,
                        L,
                        E = 0 != N.chapterData.arr_p_verses.length ? N.chapterData.arr_p_verses : console.error("dataRead.chapterData.arr_p_verses.length = 0"),
                        H = E.length - 1;
                    if (
                        ("#col1" == t && (window.col1_p_length = H),
                        E.forEach((a, r) => {
                            if (0 == r) {
                                let e = N.chapterData.h4_text;
                                "" == e && (e = h.Books[u].FullName + " " + b);
                                r = document.createElement("h4");
                                r.append(e), arr_data_head.push(r), "Y" == h.HTMLFilter && (r.innerHTML = htmlEntities(r.innerHTML));
                            } else {
                                let e = "";
                                var n = (e = a.includes("</p>") ? (a.includes("</p>") ? a.split("</p>") : console.error("no includes </p>"))[0] : a).includes(" ") ? e.split(" ") : console.error("no includes ' '"),
                                    r = n[0];
                                let t = "";
                                for (let e = 1; e < n.length; e++) t += n[e] + " ";
                                var a = document.createElement("p"),
                                    s = ((a.id = m + "__" + u + "__" + b + "__" + r), a.setAttribute("data-verse", r), document.createElement("a"));
                                (s.href = "#"), (s.innerHTML = `${h.Books[u].ShortNames[0]} ${p}:` + r), a.append(s), a.append(" ");
                                const c = document.createElement("span");
                                if (
                                    ((c.className = "vt"),
                                    "Y" == h.StrongNumbers &&
                                        (((r = t).includes(" ") ? r.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                            var a, r, n;
                                            isNaN(parseInt(e)) && "0" != e
                                                ? (c.append(" "), v && e.includes("<S>") && (e = e.replace("<S>", '<S class="show strongActive">')), c.append(e))
                                                : ((a = document.createElement("span")),
                                                  v ? (a.className = "strong show strongActive") : (a.className = "strong"),
                                                  "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                      ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), c.append(a), c.append(n))
                                                      : ((a.innerHTML = e), c.append(a)));
                                        }),
                                        a.append(c),
                                        a.innerHTML.trim(),
                                        "Y" == h.HTMLFilter && (a.innerHTML = htmlEntities(a.innerHTML)),
                                        v &&
                                            a.innerHTML.includes("strongActive") &&
                                            a.querySelectorAll(".strongActive").forEach((t) => {
                                                t.addEventListener("click", () => {
                                                    var e = "Y" == h.StrongFirstLetter ? "Y" : "N";
                                                    t.innerHTML.includes("H") || t.innerHTML.includes("G") ? getStrongNumber(t.innerHTML, null, e) : ((lang = 39 <= u ? "Grk" : "Heb"), getStrongNumber(t.innerHTML, lang, e));
                                                });
                                            }),
                                        arr_data_body.push(a)),
                                    "Y" == h.Notes)
                                ) {
                                    r = t;
                                    if (r.includes(h.NoteSign)) {
                                        var o = r.split(h.NoteSign)[0];
                                        if (r.includes(h.StartNoteSign) && r.includes(h.EndNoteSign)) {
                                            a.className = "with_notes";
                                            var r = r.split(h.StartNoteSign)[1].split(h.EndNoteSign),
                                                i = r[0],
                                                r = r[1],
                                                l = document.createElement("span"),
                                                d = document.createElement("span");
                                            if ((o = "Y" == h.HTMLFilter ? htmlEntities(o) : o).includes('<h6 class="prim_h6">') && o.includes("</h6>")) {
                                                var _ = document.createElement("h6");
                                                _.className = "prim_h6";
                                                let e = o.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                (e = e.filter((e) => e)), (_.innerHTML = e[0]), l.append(_);
                                            } else l.innerHTML = o;
                                            c.append(l), c.append(buildWrTooltip(h.NoteSign, i, a.id, s.innerHTML)), (r = "Y" == h.HTMLFilter ? htmlEntities(r) : r), (d.innerHTML = r), c.append(d), a.append(c);
                                        }
                                    } else c.append(t), a.append(c), "Y" == h.HTMLFilter && (a.innerHTML = htmlEntities(a.innerHTML));
                                    arr_data_body.push(a);
                                }
                                "Y" == h.Titles &&
                                    ((_ = t).includes(h.StartTitleSign) && _.includes(h.EndTitleSign)
                                        ? ((l = (o = _.split(h.StartTitleSign))[0]),
                                          (s = (i = o[1].split(h.EndTitleSign))[0]),
                                          (r = i[1]),
                                          ((d = document.createElement("span")).className = "verse_title"),
                                          (d.innerHTML = s),
                                          c.append(l),
                                          c.append(d),
                                          c.append(r))
                                        : c.append(t),
                                    a.append(c),
                                    arr_data_body.push(a),
                                    "Y" == h.HTMLFilter) &&
                                    (a.innerHTML = htmlEntities(a.innerHTML)),
                                    "N" == h.StrongNumbers && "N" == h.Notes && "N" == h.Titles && (c.append(t), a.append(c), arr_data_body.push(a), "Y" == h.HTMLFilter) && (a.innerHTML = htmlEntities(a.innerHTML));
                            }
                        }),
                        "Y" == base_ep && "N" == h.EnglishPsalms)
                    ) {
                        let e = [],
                            t = [];
                        switch (parseInt(u)) {
                            case 3:
                                12 == b && ((e = for_parseVerse_json(m, h, g, u, 13, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 13, 16), arr_data_body.splice(col1_p_length)),
                                    13 == b && arr_data_body.splice(0, 1);
                                break;
                            case 5:
                                5 == b && arr_data_body.splice(col1_p_length),
                                    6 == b && (addChapterToHead(h, u, 5), (e = for_parseVerse_json(m, h, g, u, 5, 16)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 6, 2), arr_data_body.splice(col1_p_length));
                                break;
                            case 8:
                                20 == b && ((y = mergeVerses((e = for_parseVerse_json(m, h, g, u, 20, form_list_verses(1, col1_p_length + 1))), 42)), (arr_data_body = [].concat(y, arr_data_body)).splice(col1_p_length)),
                                    23 == b && ((e = for_parseVerse_json(m, h, g, u, 24, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 24, 29), arr_data_body.splice(col1_p_length)),
                                    24 == b && arr_data_body.splice(0, 1);
                                break;
                            case 17:
                                39 == b && arr_data_body.splice(col1_p_length),
                                    40 == b &&
                                        (addChapterToHead(h, u, 39),
                                        (e = for_parseVerse_json(m, h, g, u, 39, form_list_verses(31, 35))),
                                        addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 40, 6),
                                        arr_data_body.splice(col1_p_length)),
                                    41 == b &&
                                        (addChapterToHead(h, u, 40),
                                        (e = for_parseVerse_json(m, h, g, u, 40, form_list_verses(20, 27))),
                                        addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 41, 9),
                                        arr_data_body.splice(col1_p_length));
                                break;
                            case 18:
                                3 <= b && b <= 8 && arr_data_body.splice(0, 1),
                                    9 == b && (arr_data_body.splice(0, 1), arr_data_body.splice(col1_p_length)),
                                    10 == b && (addChapterToHead(h, u, 9), (e = for_parseVerse_json(m, h, g, u, 9, form_list_verses(22, 39))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    (11 == b ||
                                        (14 <= b && b <= 17) ||
                                        (23 <= b && b <= 29) ||
                                        (32 <= b && b <= 33) ||
                                        35 == b ||
                                        37 == b ||
                                        43 == b ||
                                        50 == b ||
                                        66 == b ||
                                        (71 <= b && b <= 74) ||
                                        (78 <= b && b <= 79) ||
                                        82 == b ||
                                        86 == b ||
                                        87 == b ||
                                        91 == b ||
                                        (93 <= b && b <= 101) ||
                                        (103 <= b && b <= 107) ||
                                        (109 <= b && b <= 114) ||
                                        (117 <= b && b <= 146)) &&
                                        (addChapterToHead(h, u, parseInt(b) - 1), (e = for_parseVerse_json(m, h, g, u, b - 1, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    (12 == b ||
                                        (18 <= b && b <= 22) ||
                                        (30 <= b && b <= 31) ||
                                        34 == b ||
                                        36 == b ||
                                        (38 <= b && b <= 42) ||
                                        (44 <= b && b <= 49) ||
                                        53 == b ||
                                        (55 <= b && b <= 59) ||
                                        (61 <= b && b <= 65) ||
                                        (67 <= b && b <= 70) ||
                                        (75 <= b && b <= 77) ||
                                        (80 <= b && b <= 81) ||
                                        (83 <= b && b <= 85) ||
                                        (88 <= b && b < 90) ||
                                        92 == b ||
                                        102 == b ||
                                        108 == b) &&
                                        (addChapterToHead(h, u, parseInt(b) - 1), (e = for_parseVerse_json(m, h, g, u, b - 1, form_list_verses(2, col1_p_length + 1))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    13 == b &&
                                        (addChapterToHead(h, u, parseInt(b) - 1),
                                        (e = for_parseVerse_json(m, h, g, u, b - 1, form_list_verses(2, 6))),
                                        (arr_data_body = e.concat(vstavka_vacio("arriba"), arr_data_body)).splice(col1_p_length)),
                                    ((51 <= b && b <= 52) || 54 == b || 60 == b) &&
                                        (addChapterToHead(h, u, parseInt(b) - 1), (e = for_parseVerse_json(m, h, g, u, b - 1, form_list_verses(3, col1_p_length + 2))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    90 == b &&
                                        (addChapterToHead(h, u, parseInt(b) - 1),
                                        (e = for_parseVerse_json(m, h, g, u, b - 1, form_list_verses(2, col1_p_length))),
                                        ((k = document.createElement("p")).className = "prim"),
                                        (k.innerHTML = "смотри стих выше..."),
                                        e.splice(5, 0, k),
                                        (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    115 == b &&
                                        (addChapterToHead(h, u, parseInt(b) - 2), (e = for_parseVerse_json(m, h, g, u, b - 2, form_list_verses(9, col1_p_length + 8))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    116 == b &&
                                        (addChapterToHead(h, u, parseInt(b) - 2),
                                        (e = for_parseVerse_json(m, h, g, u, b - 2, form_list_verses(1, 9))),
                                        (t = for_parseVerse_json(m, h, T, u, b - 1, form_list_verses(1, 10))),
                                        (e = e.concat(t)),
                                        addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 115, 10),
                                        arr_data_body.splice(col1_p_length)),
                                    147 == b &&
                                        (addChapterToHead(h, u, parseInt(b) - 1),
                                        (e = for_parseVerse_json(m, h, g, u, b - 1, form_list_verses(1, 11))),
                                        (t = for_parseVerse_json(m, h, T, u, b, form_list_verses(1, 9))),
                                        (e = e.concat(t)),
                                        addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 147, 12),
                                        arr_data_body.splice(col1_p_length));
                                break;
                            case 19:
                                4 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                break;
                            case 21:
                                1 == b &&
                                    ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length - 1))),
                                    ((S = document.createElement("p")).className = "prim"),
                                    (S.innerHTML = "заглавие..."),
                                    e.splice(0, 0, S),
                                    (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    6 == b && ((e = for_parseVerse_json(m, h, g, u, parseInt(b) + 1, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 7, 13), arr_data_body.splice(col1_p_length)),
                                    7 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(2, col1_p_length + 1))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length));
                                break;
                            case 22:
                                3 == b &&
                                    ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length - 1))),
                                    ((w = document.createElement("p")).className = "prim"),
                                    (w.innerHTML = "смотри стих выше..."),
                                    e.splice(19, 0, w),
                                    (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                break;
                            case 26:
                                3 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    4 == b &&
                                        (addChapterToHead(h, u, parseInt(b) - 1),
                                        (e = for_parseVerse_json(m, h, g, u, b - 1, form_list_verses(31, 33))),
                                        addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 4, 4),
                                        arr_data_body.splice(col1_p_length));
                                break;
                            case 27:
                                13 == b && ((e = for_parseVerse_json(m, h, g, u, 14, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 14, 16), arr_data_body.splice(col1_p_length)),
                                    14 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(2, 10))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                break;
                            case 31:
                                1 == b && ((e = for_parseVerse_json(m, h, g, u, 2, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 2, 17), arr_data_body.splice(col1_p_length)),
                                    2 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(2, 11))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                break;
                            case 44:
                                16 == b && ((e = for_parseVerse_json(m, h, g, u, b - 2, form_list_verses(24, 26))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 14, 25), arr_data_body.splice(col1_p_length));
                                break;
                            case 46:
                                13 == b &&
                                    ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length - 1))),
                                    ((L = document.createElement("p")).className = "prim"),
                                    (L.innerHTML = "смотри стих выше..."),
                                    e.splice(12, 0, L),
                                    (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                        }
                    }
                    if ("N" == base_ep && "Y" == h.EnglishPsalms) {
                        let e = [],
                            t = [];
                        switch (parseInt(u)) {
                            case 3:
                                12 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    13 == b && (addChapterToHead(h, u, 12), (e = for_parseVerse_json(m, h, g, u, 12, 16)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 13, 2), arr_data_body.splice(col1_p_length));
                                break;
                            case 5:
                                5 == b && ((e = for_parseVerse_json(m, h, g, u, 6, 1)), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 6, 16), arr_data_body.splice(col1_p_length)),
                                    6 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(2, col1_p_length + 1))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                break;
                            case 8:
                                20 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length - 1))), (arr_data_body = [].concat(e, vstavka_vacio("arriba"))).splice(col1_p_length)),
                                    23 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = arr_data_body.concat(e)).splice(col1_p_length)),
                                    24 == b && (addChapterToHead(h, u, 23), (e = for_parseVerse_json(m, h, g, u, 23, 29)), addChapterToVerse((arr_data_body = e.concat(arr_data_body)), h, u, 24, 2), arr_data_body.splice(col1_p_length));
                                break;
                            case 17:
                                39 == b && ((e = for_parseVerse_json(m, h, g, u, 40, form_list_verses(1, 5))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 40, 31), arr_data_body.splice(col1_p_length)),
                                    40 == b &&
                                        ((e = for_parseVerse_json(m, h, g, u, 40, form_list_verses(6, 24))),
                                        (t = for_parseVerse_json(m, h, T, u, 41, form_list_verses(1, 8))),
                                        addChapterToVerse((arr_data_body = [].concat(e, t)), h, u, 41, 20),
                                        arr_data_body.splice(col1_p_length)),
                                    41 == b && ((e = for_parseVerse_json(m, h, g, u, 41, form_list_verses(9, 34))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                break;
                            case 18:
                                if (
                                    (3 <= b && b <= 8 && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length - 1))), (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length)),
                                    9 == b &&
                                        ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, 20))),
                                        (t = for_parseVerse_json(m, h, T, u, 10, form_list_verses(1, 18))),
                                        addChapterToVerse((arr_data_body = [].concat(vstavka_vacio(), e, t)), h, u, 10, 22),
                                        arr_data_body.splice(col1_p_length)),
                                    (10 == b ||
                                        (13 <= b && b <= 16) ||
                                        (22 <= b && b <= 28) ||
                                        (31 <= b && b <= 32) ||
                                        34 == b ||
                                        36 == b ||
                                        42 == b ||
                                        49 == b ||
                                        65 == b ||
                                        (70 <= b && b <= 73) ||
                                        (77 <= b && b <= 78) ||
                                        81 == b ||
                                        85 == b ||
                                        86 == b ||
                                        90 == b ||
                                        (92 <= b && b <= 100) ||
                                        (102 <= b && b <= 106) ||
                                        (108 <= b && b < 113) ||
                                        (116 <= b && b <= 138) ||
                                        (140 <= b && b <= 145)) &&
                                        (addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse_json(m, h, g, u, parseInt(b) + 1, form_list_verses(1, col1_p_length))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    (11 == b ||
                                        12 == b ||
                                        (17 <= b && b <= 21) ||
                                        (29 <= b && b <= 30) ||
                                        33 == b ||
                                        35 == b ||
                                        (37 <= b && b <= 41) ||
                                        (43 <= b && b <= 48) ||
                                        52 == b ||
                                        (54 <= b && b <= 58) ||
                                        (60 <= b && b <= 64) ||
                                        (66 <= b && b <= 69) ||
                                        (74 <= b && b <= 76) ||
                                        (79 <= b && b <= 80) ||
                                        (82 <= b && b <= 84) ||
                                        (87 <= b && b < 89) ||
                                        91 == b ||
                                        101 == b ||
                                        107 == b ||
                                        139 == b) &&
                                        (addChapterToHead(h, u, parseInt(b) + 1),
                                        (e = for_parseVerse_json(m, h, g, u, parseInt(b) + 1, form_list_verses(1, col1_p_length - 1))),
                                        (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length)),
                                    ((50 <= b && b <= 51) || 53 == b || 59 == b) &&
                                        (addChapterToHead(h, u, parseInt(b) + 1),
                                        (e = for_parseVerse_json(m, h, g, u, parseInt(b) + 1, form_list_verses(1, col1_p_length - 2))),
                                        (arr_data_body = [].concat(vstavka_vacio(), vstavka_vacio(), e)).splice(col1_p_length)),
                                    89 == b)
                                ) {
                                    addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse_json(m, h, g, u, parseInt(b) + 1, form_list_verses(1, col1_p_length)));
                                    let n = [];
                                    e.map((e, t, a) => {
                                        var r;
                                        4 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                    }),
                                        n.splice(5, 0),
                                        (e = n),
                                        (arr_data_body = [].concat(vstavka_vacio(), e)).splice(col1_p_length);
                                }
                                113 == b &&
                                    (addChapterToHead(h, u, parseInt(b) + 1),
                                    (e = for_parseVerse_json(m, h, g, u, parseInt(b) + 1, form_list_verses(1, 8))),
                                    (t = for_parseVerse_json(m, h, T, u, parseInt(b) + 2, form_list_verses(1, 18))),
                                    addChapterToVerse((arr_data_body = [].concat(e, t)), h, u, 115, 9),
                                    arr_data_body.splice(col1_p_length)),
                                    114 == b && (addChapterToHead(h, u, parseInt(b) + 2), (e = for_parseVerse_json(m, h, g, u, parseInt(b) + 2, form_list_verses(1, 9))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    115 == b && (addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse_json(m, h, g, u, parseInt(b) + 1, form_list_verses(10, 19))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    146 == b && (addChapterToHead(h, u, parseInt(b) + 1), (e = for_parseVerse_json(m, h, g, u, parseInt(b) + 1, form_list_verses(1, 11))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length)),
                                    147 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(12, 20))), (arr_data_body = e.concat(arr_data_body)).splice(col1_p_length));
                                break;
                            case 19:
                                4 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e)).splice(col1_p_length));
                                break;
                            case 21:
                                if (1 == b) {
                                    e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length));
                                    let n = [];
                                    e.map((e, t, a) => {
                                        var r;
                                        0 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                    }),
                                        n.splice(1, 1),
                                        (e = n),
                                        (arr_data_body = [].concat(e)).splice(col1_p_length);
                                }
                                6 == b && arr_data_body.splice(col1_p_length),
                                    7 == b &&
                                        (addChapterToHead(h, u, 6),
                                        (e = for_parseVerse_json(m, h, g, u, parseInt(b) - 1, 13)),
                                        addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), h, u, 7, 2),
                                        arr_data_body.splice(col1_p_length));
                                break;
                            case 22:
                                if (3 == b) {
                                    e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length + 1));
                                    let n = [];
                                    e.map((e, t, a) => {
                                        var r;
                                        18 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                    }),
                                        n.splice(19, 1),
                                        (e = n),
                                        (arr_data_body = [].concat(e)).splice(col1_p_length);
                                }
                                break;
                            case 26:
                                3 == b &&
                                    ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, 30))),
                                    (t = for_parseVerse_json(m, h, T, u, 4, form_list_verses(1, 3))),
                                    addChapterToVerse((arr_data_body = [].concat(e, t)), h, u, 4, 31),
                                    arr_data_body.splice(col1_p_length)),
                                    4 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(4, col1_p_length + 3))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length));
                                break;
                            case 27:
                                13 == b && arr_data_body.splice(col1_p_length),
                                    14 == b && (addChapterToHead(h, u, 13), (e = for_parseVerse_json(m, h, g, u, 13, 16)), addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), h, u, 14, 2), arr_data_body.splice(col1_p_length));
                                break;
                            case 31:
                                1 == b && ((e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length))), (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length)),
                                    2 == b && (addChapterToHead(h, u, 1), (e = for_parseVerse_json(m, h, g, u, 1, 17)), addChapterToVerse((arr_data_body = [].concat(e, arr_data_body)), h, u, 2, 2), arr_data_body.splice(col1_p_length));
                                break;
                            case 44:
                                14 == b && ((e = for_parseVerse_json(m, h, g, u, 16, form_list_verses(25, 27))), addChapterToVerse((arr_data_body = arr_data_body.concat(e)), h, u, 16, 24), arr_data_body.splice(col1_p_length));
                                break;
                            case 46:
                                if (13 == b) {
                                    e = for_parseVerse_json(m, h, g, u, b, form_list_verses(1, col1_p_length + 1));
                                    let n = [];
                                    e.map((e, t, a) => {
                                        var r;
                                        11 == t ? (((r = document.createElement("p")).innerHTML = a[t].innerHTML + "<br>" + a[t + 1].innerHTML), n.push(r)) : n.push(e);
                                    }),
                                        n.splice(12, 1),
                                        (e = n),
                                        (arr_data_body = [].concat(e, arr_data_body)).splice(col1_p_length);
                                }
                        }
                    }
                    arr_data_body.forEach((e, t) => {
                        e.setAttribute("data-verse", t + 1);
                    }),
                        (arr_data_all = arr_data_head.concat(arr_data_body)),
                        arrDataDivShow.push(arr_data_all),
                        (arr_data_head = []),
                        (arr_data_body = []),
                        (arr_data_all = []),
                        (arr_trans = arr_trans.filter((e) => e)),
                        clearColsEmpty(),
                        window.iter_i++,
                        window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n);
                } else
                    (l.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>'),
                        window.iter_i++,
                        window.iter_i < window.arr_trans.length && null == s && showChapterText4(arr_trans[iter_i], "#" + arr_divShow[iter_i], u, b, a, r, n),
                        arrDataDivShow.push([]);
                if ((countElementsInArray(arrDataDivShow) == arr_trans.length && buildDivShow(arrDataDivShow, s), mySizeWindow(), mySizeVerse(), null !== a && "" != a && null == n))
                    if (null !== r && "" != r) {
                        if (parseInt(a) < parseInt(r))
                            for (let t = parseInt(a); t <= parseInt(r); t++)
                                Array.from(document.querySelectorAll('[data-verse="' + t + '"]')).forEach((e) => {
                                    t == parseInt(a) ? e.classList.add("active_first") : t == parseInt(r) ? e.classList.add("active_last") : e.classList.add("active_middle");
                                });
                    } else
                        null !== a &&
                            "" != a &&
                            document.querySelectorAll('[data-verse="' + a + '"]').forEach((e) => {
                                e.classList.add("active_one");
                            });
                if (null !== n && "" != n)
                    if (null !== r && "" != r) {
                        if (parseInt(a) < parseInt(r))
                            for (let t = parseInt(a); t <= parseInt(r); t++)
                                Array.from(document.querySelectorAll('#col1 .colsInner [data-verse="' + t + '"]')).forEach((e) => {
                                    t == parseInt(a) ? e.classList.add("active_first") : t == parseInt(r) ? e.classList.add("active_last") : e.classList.add("active_middle");
                                });
                    } else
                        null !== a &&
                            "" != a &&
                            document.querySelectorAll('.colsInner [data-verse="' + a + '"]').forEach((e) => {
                                e.classList.add("active_one");
                            });
                null !== a && "" != a && scrollToVerse(a, r), null !== n && "" != n && scrollToVerseView(n), mySizeWindow(), mySizeVerse(), addListenerToPA();
            } catch (e) {
                console.error("error try-catch modo old. error: ", e);
            }
        else
            document.querySelectorAll(".colsInner").forEach((e) => {
                var t;
                0 == e.childElementCount || "" == e.textContent
                    ? (((t = document.createElement("p")).className = "prim"), (t.innerHTML = "3.3 En este módulo no existe el libro indicado."), e.append(t))
                    : (e.innerHTML = '<p class="prim_error_compare">Для сравнения текста переводов необходимо указать книги, имеющиеся в выбранных переводах Библии.</p>');
            });
    }
}
function form_list_verses(t, a) {
    var r = [];
    for (let e = t; e <= a; e++) r.push(e);
    return r;
}
function vstavka_vacio(e) {
    var t = document.createElement("p");
    return (t.className = "prim"), (t.innerHTML = "arriba" == e ? "смотри стих выше..." : "abajo" == e ? "смотри стих ниже..." : "эквивалент стиха отсутствует в данном переводе..."), t;
}
function addChapterToHead(e, t, a) {
    arr_data_head.pop();
    var r = document.createElement("h4"),
        e = ((r.innerHTML = e.Books[t].FullName + " " + a), arr_data_head.push(r));
    return e;
}
function addChapterToVerse(e, a, r, n, s) {
    let o = [];
    return (
        e.forEach((e, t) => {
            t == s - 1 && ((t = '<span class="h4_ch">' + a.Books[r].FullName + " " + n + "</span>"), (e.innerHTML = t + e.innerHTML)), o.push(e);
        }),
        (e = o)
    );
}
function mergeVerses(e, n) {
    let s = [];
    return (
        e.map((e, t, a) => {
            var r;
            t == n - 1 && ((r = "<br>" + a[t + 1].innerHTML), (e.innerHTML = a[t].innerHTML + r)), s.push(e);
        }),
        s.splice(n - 1, 0),
        (e = s)
    );
}
function for_parseVerse_json(t, a, r, n, s, o) {
    let i = [];
    if ("number" == typeof o) i = parseVerse_json(t, a, r, n, s, o);
    else if ("object" == typeof o) {
        for (let e = 0; e < o.length; e++) i[e] = parseVerse_json(t, a, r, n, s, o[e]);
        i = i.flat(1);
    }
    return i;
}
function parseVerse_json(e, t, a, r, n, s) {
    (a = a[s]), (a = void 0 !== a ? a : s + " (текст стиха отсутствует)"), (s = []);
    let o = "";
    var i = (o = a.includes("</p>") ? a.split("</p>")[0] : a).split(" "),
        a = i[0];
    let l = "";
    for (let e = 1; e < i.length; e++) l += i[e] + " ";
    var d = document.createElement("p"),
        e = ((d.id = e + "__" + r + "__" + n + "__" + a), document.createElement("a"));
    (e.href = "#"), (e.innerHTML = t.Books[r].ShortNames[0] + ` ${n}:` + a), d.append(e), d.append(" ");
    const _ = document.createElement("span");
    if (
        ((_.className = "vt"),
        "Y" == t.StrongNumbers &&
            (((r = l).includes(" ") ? r.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                var a, r, n;
                isNaN(parseInt(e)) && "0" != e
                    ? (_.append(" "), _.append(e))
                    : (((a = document.createElement("span")).className = "strong"),
                      "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n) ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), _.append(a), _.append(n)) : ((a.innerHTML = e), _.append(a)));
            }),
            d.append(_),
            d.innerHTML.trim(),
            "Y" == t.HTMLFilter && (d.innerHTML = htmlEntities(d.innerHTML)),
            s.push(d)),
        "Y" == t.Notes)
    ) {
        var n = l;
        if (n.includes(t.NoteSign)) {
            a = n.split(t.NoteSign)[0];
            if (n.includes(t.StartNoteSign) && n.includes(t.EndNoteSign)) {
                d.className = "with_notes";
                var r = n.split(t.StartNoteSign)[1].split(t.EndNoteSign),
                    n = r[0],
                    r = r[1],
                    c = document.createElement("span"),
                    p = document.createElement("span");
                if ((a = "Y" == t.HTMLFilter ? htmlEntities(a) : a).includes('<h6 class="prim_h6">') && a.includes("</h6>")) {
                    var h = document.createElement("h6");
                    h.className = "prim_h6";
                    let e = a.split('<h6 class="prim_h6">')[1].split("</h6>");
                    (e = e.filter((e) => e)), (h.innerHTML = e[0]), c.append(h);
                } else c.innerHTML = a;
                _.append(c), _.append(buildWrTooltip(t.NoteSign, n, d.id, e.innerHTML)), (r = "Y" == t.HTMLFilter ? htmlEntities(r) : r), (p.innerHTML = r), _.append(p), d.append(_);
            }
        } else _.append(l), d.append(_), "Y" == t.HTMLFilter && (d.innerHTML = htmlEntities(d.innerHTML));
        s.push(d);
    }
    return (
        "Y" == t.Titles &&
            ((h = l).includes(t.StartTitleSign) && h.includes(t.EndTitleSign)
                ? ((c = (a = h.split(t.StartTitleSign))[0]), (e = (n = a[1].split(t.EndTitleSign))[0]), (r = n[1]), ((p = document.createElement("span")).className = "verse_title"), (p.innerHTML = e), _.append(c), _.append(p), _.append(r))
                : _.append(l),
            d.append(_),
            s.push(d),
            "Y" == t.HTMLFilter) &&
            (d.innerHTML = htmlEntities(d.innerHTML)),
        "N" == t.StrongNumbers && "N" == t.Notes && "N" == t.Titles && (_.append(l), d.append(_), s.push(d), "Y" == t.HTMLFilter) && (d.innerHTML = htmlEntities(d.innerHTML)),
        s
    );
}
function for_parseVerse(t, a, r, n, s, o) {
    let i = [];
    if ("number" == typeof o) i = parseVerse(t, a, r, n, s, o);
    else if ("object" == typeof o) {
        for (let e = 0; e < o.length; e++) i[e] = parseVerse(t, a, r, n, s, o[e]);
        i = i.flat(1);
    }
    return i;
}
function parseVerse(e, t, a, r, n, s) {
    (a = a.split("<h4>")[n].split("<p>")[s]), (a = void 0 !== a ? a : s + " (текст стиха отсутствует)"), (s = []);
    let o = "";
    var i = (o = a.includes("</p>") ? a.split("</p>")[0] : a).split(" "),
        a = i[0];
    let l = "";
    for (let e = 1; e < i.length; e++) l += i[e] + " ";
    var d = document.createElement("p"),
        e = ((d.id = e + "__" + r + "__" + n + "__" + a), document.createElement("a"));
    (e.href = "#"), (e.innerHTML = t.Books[r].ShortNames[0] + ` ${n}:` + a), d.append(e), d.append(" ");
    const _ = document.createElement("span");
    if (
        ((_.className = "vt"),
        "Y" == t.StrongNumbers &&
            (((r = l).includes(" ") ? r.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                var a, r, n;
                isNaN(parseInt(e)) && "0" != e
                    ? (_.append(" "), _.append(e))
                    : (((a = document.createElement("span")).className = "strong"),
                      "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n) ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), _.append(a), _.append(n)) : ((a.innerHTML = e), _.append(a)));
            }),
            d.append(_),
            d.innerHTML.trim(),
            "Y" == t.HTMLFilter && (d.innerHTML = htmlEntities(d.innerHTML)),
            s.push(d)),
        "Y" == t.Notes)
    ) {
        var n = l;
        if (n.includes(t.NoteSign)) {
            a = n.split(t.NoteSign)[0];
            if (n.includes(t.StartNoteSign) && n.includes(t.EndNoteSign)) {
                d.className = "with_notes";
                var r = n.split(t.StartNoteSign)[1].split(t.EndNoteSign),
                    n = r[0],
                    r = r[1],
                    c = document.createElement("span"),
                    p = document.createElement("span");
                if ((a = "Y" == t.HTMLFilter ? htmlEntities(a) : a).includes('<h6 class="prim_h6">') && a.includes("</h6>")) {
                    var h = document.createElement("h6");
                    h.className = "prim_h6";
                    let e = a.split('<h6 class="prim_h6">')[1].split("</h6>");
                    (e = e.filter((e) => e)), (h.innerHTML = e[0]), c.append(h);
                } else c.innerHTML = a;
                _.append(c), _.append(buildWrTooltip(t.NoteSign, n, d.id, e.innerHTML)), (r = "Y" == t.HTMLFilter ? htmlEntities(r) : r), (p.innerHTML = r), _.append(p), d.append(_);
            }
        } else _.append(l), d.append(_), "Y" == t.HTMLFilter && (d.innerHTML = htmlEntities(d.innerHTML));
        s.push(d);
    }
    return (
        "Y" == t.Titles &&
            ((h = l).includes(t.StartTitleSign) && h.includes(t.EndTitleSign)
                ? ((c = (a = h.split(t.StartTitleSign))[0]), (e = (n = a[1].split(t.EndTitleSign))[0]), (r = n[1]), ((p = document.createElement("span")).className = "verse_title"), (p.innerHTML = e), _.append(c), _.append(p), _.append(r))
                : _.append(l),
            d.append(_),
            s.push(d),
            "Y" == t.HTMLFilter) &&
            (d.innerHTML = htmlEntities(d.innerHTML)),
        "N" == t.StrongNumbers && "N" == t.Notes && "N" == t.Titles && (_.append(l), d.append(_), s.push(d), "Y" == t.HTMLFilter) && (d.innerHTML = htmlEntities(d.innerHTML)),
        s
    );
}
function resizeSidebar(e) {
    let t = isNaN(parseInt(eid_sidebar.style.width)) ? def_w : parseInt(eid_sidebar.style.width);
    (min_w = 0.05 * eid_wrapper.offsetWidth),
        (max_w = eid_wrapper.offsetWidth),
        "less" == e ? t > 0.1 * eid_wrapper.offsetWidth && (t -= 0.05 * eid_wrapper.offsetWidth) : t < 0.7 * eid_wrapper.offsetWidth && (t += 0.05 * eid_wrapper.offsetWidth),
        (eid_sidebar.style.width = t + "px"),
        mySizeWindow(),
        mySizeVerse();
}
function openSidebar(e) {
    let t, a;
    "transMenu" == e.dataset.typebtn
        ? ((t = e.parentElement.parentElement.parentElement.parentElement.dataset.trans), (a = e.parentElement.parentElement.parentElement.parentElement.id))
        : "transRef" == e.dataset.typebtn && ((t = e.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.trans), (a = e.parentElement.parentElement.parentElement.parentElement.parentElement.id)),
        changeTransNav((t = void 0 === t ? ("" != eid_inpt_nav.dataset.trans ? eid_inpt_nav : eid_trans1).dataset.trans : t), a),
        0 == eid_sidebar.classList.length
            ? (eid_sidebar.classList.add("sideHide"),
              setTimeout(() => {
                  eid_sidebar.classList.remove("sideHide"), eid_sidebar.classList.add("sideShow");
              }, 3))
            : eid_sidebar.classList.contains("sideHide") && (eid_sidebar.classList.remove("sideHide"), eid_sidebar.classList.add("sideShow")),
        mySizeWindow(),
        mySizeVerse(),
        setTimeout(() => {
            mySizeNav(), mySizeFind(), mySizeTsk(), mySizeStrong();
        }, 10);
}
function closeSidebar(e) {
    eid_sidebar.classList.remove("sideShow"), eid_sidebar.classList.add("sideHide"), mySizeWindow(), mySizeVerse();
}
function hideShowSidebar() {
    let e = eid_sidebar.style.display;
    "none" != e || 0 < eid_sidebar.offsetWidth ? ((e = "none"), (btn_hideShowSidebar.innerHTML = '<img src="images/sidebar_hide_white.svg">')) : ((e = "block"), (btn_hideShowSidebar.innerHTML = '<img src="images/sidebar_show_white.svg">')),
        eid_sidebar.removeAttribute("class"),
        (eid_sidebar.style.display = e),
        (eid_vert_line.style.display = e),
        mySizeWindow(),
        mySizeVerse();
}
function hideShowFooter() {
    let e = eid_footer.style.display;
    var t = parseInt(window.getComputedStyle(eid_btn_pageDown).getPropertyValue("bottom"));
    "none" != e || 0 < eid_footer.offsetHeight
        ? ((e = "none"), (btn_hideShowFooter.innerHTML = '<img src="images/sidebar_hide_white.svg">'), (eid_btn_pageDown.style.bottom = t - eid_footer.offsetHeight + 5 + "px"))
        : ((e = ""), (btn_hideShowFooter.innerHTML = '<img src="images/sidebar_show_white.svg">'), eid_btn_pageDown.removeAttribute("style")),
        (eid_footer.style.display = e),
        mySizeWindow();
}
function getActTrans() {
    let t = eid_trans1.dataset.trans;
    document.querySelectorAll("#footerInner button").forEach((e) => {
        e.value == t && e.classList.add("btn_active");
    });
}
async function changeTransNav(t, e) {
    void 0 === t && (t = eid_trans1.dataset.trans);
    var a = eid_inpt_nav.getAttribute("data-id_book"),
        r = eid_inpt_nav.getAttribute("data-show_chapter"),
        n = eid_inpt_nav.getAttribute("data-show_verse"),
        s = "" != eid_inpt_nav.getAttribute("data-show_to_verse") ? eid_inpt_nav.getAttribute("data-show_to_verse") : null,
        e = ((eid_inpt_nav.dataset.divtrans = e), (eid_inpt_nav.dataset.trans = t), arrFavTransObj.find((e) => e.Translation === t)),
        e =
            ((eid_act_trans_nav.title = e.BibleName),
            (eid_act_trans_find.title = e.BibleName),
            (eid_act_trans_strong.title = e.BibleName),
            (eid_act_trans_nav.textContent = e.BibleShortName),
            (eid_act_trans_find.textContent = e.BibleShortName),
            (eid_act_trans_strong.textContent = e.BibleShortName),
            (r = "" != r ? r : 1),
            t),
        e = `./modules/text/${e}/bibleqt.json`;
    try {
        var o = await (await fetch(e)).json();
        if (1 < document.querySelectorAll(".cols").length) {
            var i = obj_nav.show_chapter,
                l = checkRefNav(a, i, obj_nav.show_verse, null);
            if (l) {
                l[0];
                var d = l[1],
                    _ = l[2],
                    c = l[3];
                let e = l[4];
                0 < d && (e += " " + d), 0 < _ && (e += ":" + _), 0 < c && parseInt(c) > parseInt(_) && (e += "-" + c), (eid_inpt_nav.value = e);
            }
        } else
            eid_inpt_nav.setAttribute("data-book_short_name", o.Books[a].ShortNames[0]),
                (eid_inpt_nav.value = o.Books[a].ShortNames[0]),
                0 < r && (eid_inpt_nav.value += " " + r),
                void 0 === r && "trans1" == eid_inpt_nav.dataset.divtrans && 0 < eid_inpt_nav.dataset.show_chapter && (eid_inpt_nav.value += " " + eid_inpt_nav.dataset.show_chapter),
                0 < parseInt(n) && (eid_inpt_nav.value += ":" + n),
                void 0 === n && "trans1" == eid_inpt_nav.dataset.divtrans && 0 < eid_inpt_nav.dataset.show_verse && (eid_inpt_nav.value += ":" + eid_inpt_nav.dataset.show_verse),
                parseInt(s) > parseInt(n) && (eid_inpt_nav.value += "-" + s),
                void 0 === n && "trans1" == eid_inpt_nav.dataset.divtrans && 0 < eid_inpt_nav.dataset.show_to_verse && (eid_inpt_nav.value += "-" + eid_inpt_nav.dataset.show_to_verse);
        sel(eid_s_book, "b", null, t);
    } catch (e) {
        console.error("error try-catch. error: ", e);
    }
}
function changeTrans(e, r, n, t) {
    document.querySelectorAll("#footerInner button").forEach((e) => {
        e.classList.remove("btn_active");
    }),
        e.classList.add("btn_active");
    var e = eid_trans1.dataset.base_ep,
        s = ((eid_trans1.dataset.trans = r), (eid_trans1.dataset.base_ep = t), arrFavTransObj.find((e) => e.Translation === r)),
        s =
            ((eid_act_trans_nav.title = s.BibleName),
            (eid_act_trans_find.title = s.BibleName),
            (eid_act_trans_strong.title = s.BibleName),
            (eid_act_trans_strong.textContent = eid_act_trans_find.textContent = eid_act_trans_nav.textContent = n),
            (arr_trans[0] = r),
            (arr_divShow[0] = "col1"),
            updateTransInTab(r, document.querySelector(".tab_active"), 1),
            updateArrTabs(),
            (eid_trans1.querySelector(".colsHeadInner .partDesk .desk_trans").innerHTML = n),
            (eid_trans1.querySelector(".colsHeadInner .partMob .mob_trans").innerHTML = n),
            eid_s_book.click(),
            eid_inpt_nav.getAttribute("data-id_book")),
        n = eid_inpt_nav.getAttribute("data-show_chapter"),
        o = eid_inpt_nav.getAttribute("data-show_verse"),
        i = "" != eid_inpt_nav.getAttribute("data-show_to_verse") ? eid_inpt_nav.getAttribute("data-show_to_verse") : null;
    (eid_inpt_nav.dataset.trans = r), eid_s_book.click(), (n = "" != n ? n : 1);
    let a = [];
    Array.from(document.querySelectorAll(".colsInner")[0].children).forEach((e) => {
        isInViewport(e) && a.push(e.getAttribute("data-verse"));
    });
    var l = a[0];
    let d = r;
    var _ = arrFavTransObj.find((e) => e.Translation == d);
    if (
        (eid_inpt_nav.setAttribute("data-book_short_name", _.Books[s].ShortNames[0]),
        (eid_inpt_nav.value = _.Books[s].ShortNames[0]),
        0 < n && (eid_inpt_nav.value += " " + n),
        0 < parseInt(o) && (eid_inpt_nav.value += ":" + o),
        parseInt(i) > parseInt(o) && (eid_inpt_nav.value += "-" + i),
        e == t)
    ) {
        let t = [],
            a = [];
        document.querySelectorAll(".colsInner").forEach((e) => {
            e.innerHTML.includes("prim_error_compare") && t.push(1), "" == e.innerHTML && a.push(1);
        }),
            0 < t.length || 0 < a.length ? ((allowUseShowTrans = !0), showTrans(s, n, o, i, l)) : ((window.arr_trans = []), showChapterText4((window.arr_trans[0] = r), "#col1", s, n, o, i, l, (window.iter_i = 0)));
    } else (allowUseShowTrans = !0), showTrans(s, n, o, i, l);
}
function changeModule(t, e, a) {
    (t.dataset.trans = e), "trans1" == t.id ? (t.children[0].children[0].innerHTML = a) : (t.children[0].children[1].innerHTML = a);
    var a = eid_inpt_nav.getAttribute("data-id_book"),
        r = eid_inpt_nav.getAttribute("data-show_chapter"),
        n = eid_inpt_nav.getAttribute("data-show_verse"),
        s = eid_inpt_nav.getAttribute("data-show_to_verse"),
        r = "" != r ? r : 1;
    let o = [];
    Array.from(t.parentElement.children[1].children).forEach((e) => {
        isInViewport(e) && e.hasAttribute("data-verse") && o.push(e.getAttribute("data-verse"));
    });
    var i = o[0];
    "trans1" == t.id &&
        document.querySelectorAll("#footerInner button").forEach((e) => {
            e.classList.remove("btn_active"), e.value == t.dataset.trans && (e.classList.add("btn_active"), e.scrollIntoView());
        }),
        showChapterText4(e, "#" + t.parentElement.getAttribute("id"), a, r, n, s, i),
        setTimeout(() => {
            mySizeWindow(), mySizeVerse();
        }, 300);
}
function changeModule2(n, a, e, t) {
    prev_trans = ("DIV" === n.tagName ? n : n.currentTarget).dataset.trans;
    var r = arrFavTransObj.find((e) => e.Translation === a),
        s = document.querySelector(".tab_active");
    if (void 0 === n.dataset.trans) {
        let t = [];
        document.querySelectorAll(".cols .colsHead").forEach((e) => {
            void 0 !== e.dataset.trans && t.push(e.dataset.trans);
        });
        var o = t.join(", ");
        (s.dataset.str_trans = o), (s.dataset.str_trans += ", " + r.Translation), (s.title += ", " + r.BibleShortName);
    } else {
        o = arrFavTransObj.find((e) => e.Translation === a);
        let t = [];
        document.querySelectorAll(".cols .colsHead").forEach((e) => {
            void 0 !== e.dataset.trans && t.push(e.dataset.trans);
        });
        t.join(", ");
        let r;
        document.querySelectorAll(".cols .colsHead").forEach((e, t, a) => {
            a[t] == n && (r = t);
        });
        var i = s.dataset.str_trans.split(","),
            l = ((i[r] = a), s.title.split(","));
        (l[r] = o.BibleShortName), (s.dataset.str_trans = i.join(", ")), (s.title = l.join(", ")), "trans1" == n.id && (s.querySelector(".tab_trans_name").textContent = o.BibleShortName);
    }
    updateArrTabs(),
        (n.dataset.trans = a),
        n.setAttribute("data-base_ep", t),
        (n.querySelector(".desk_trans").innerHTML = e),
        (n.querySelector(".mob_trans").innerHTML = e),
        (eid_inpt_nav.dataset.divtrans = n.id),
        (eid_act_trans_nav.title = r.BibleName),
        (eid_act_trans_find.title = r.BibleName),
        (eid_act_trans_strong.title = r.BibleName),
        (eid_act_trans_strong.textContent = eid_act_trans_find.textContent = eid_act_trans_nav.textContent = e);
    n.dataset.trans, eid_trans1.getAttribute("data-base_ep");
    getArrTransFromCols();
    (i = n.parentElement.id),
        makeArrColsFromCols(),
        (l = arr_cols.indexOf(i)),
        (arr_trans[l] = a),
        (s = eid_inpt_nav.getAttribute("data-id_book")),
        (o = eid_inpt_nav.getAttribute("data-show_chapter")),
        (t = eid_inpt_nav.getAttribute("data-show_verse")),
        (r = eid_inpt_nav.getAttribute("data-show_to_verse"));
    (eid_inpt_nav.dataset.trans = a), eid_s_book.click(), (o = "" != o ? o : 1);
    let d = [];
    Array.from(n.parentElement.children[1].children).forEach((e) => {
        isInViewport(e) && e.hasAttribute("data-verse") && d.push(e.getAttribute("data-verse"));
    });
    e = d[0];
    "trans1" == n.id &&
        document.querySelectorAll("#footerInner button").forEach((e) => {
            e.classList.remove("btn_active"), e.value == n.dataset.trans && (e.classList.add("btn_active"), e.scrollIntoView());
        });
    let _ = [],
        c = [];
    document.querySelectorAll(".colsInner").forEach((e) => {
        e.innerHTML.includes("prim_error_compare") && _.push(1), "" == e.innerHTML && c.push(1);
    }),
        0 < _.length || 0 < c.length ? ((allowUseShowTrans = !0), showTrans(s, o, t, r, e)) : ((window.arr_trans = []), (window.arr_trans[0] = a), (window.iter_i = 0), showChapterText4(a, "#" + i, s, o, t, r, e, l)),
        setTimeout(() => {
            mySizeWindow(), mySizeVerse();
        }, 300);
}
function changePositionShow(e = null) {
    let t;
    null != e
        ? "row" == (t = e) &&
          document.querySelectorAll(".colsInner").forEach((e) => {
              e.scrollTop = 0;
          })
        : "row" == positionShow
        ? ((t = "col"),
          document.querySelectorAll(".colsInner").forEach((e) => {
              e.scrollTop = 0;
          }))
        : "col" == positionShow && (t = "row"),
        (positionShow = t),
        checkNextPositionShow(),
        setTimeout(() => {
            mySizeWindow(), mySizeVerse();
        }, 100);
}
function checkNextPositionShow() {
    var e = eid_btn_changePositionShowHeader.querySelector("img"),
        t = eid_btn_changePositionShowModal.querySelector("img");
    "col" == positionShow
        ? (e.classList.replace("position_col", "position_row"), t.classList.replace("position_col", "position_row"))
        : "row" == positionShow && (e.classList.replace("position_row", "position_col"), t.classList.replace("position_row", "position_col"));
}
function mySizeWindow() {
    var e = window.innerWidth,
        t = window.innerHeight,
        a = eid_header.offsetHeight,
        r = eid_footer.offsetHeight,
        n = eid_headerContainer.offsetHeight;
    let s, o;
    e < pantallaTabletMinPx
        ? ((s = "mobile"), (o = 0), eid_sidebar.removeAttribute("style"))
        : e >= pantallaTabletMinPx && e <= pantallaTabletMaxPx
        ? ((s = "tablet"), (o = 10), eid_sidebar.removeAttribute("class"))
        : e >= pantallaDesktopSmallMinPx && ((s = "desktop"), (o = 10), eid_sidebar.removeAttribute("class"));
    o;
    let i = t - a - r - n;
    (e = t - a - r),
        (n = e),
        (t = e),
        (eid_wrapper.style.top = a + "px"),
        (eid_wrCols.style.height = i + "px"),
        (eid_sidebar.style.height = e + "px"),
        (eid_container.style.height = n + "px"),
        (eid_vert_line.style.height = t + "px"),
        (r = document.querySelectorAll(".cols"));
    let l = document.querySelectorAll(".colsHead"),
        d = document.querySelectorAll(".colsInner"),
        _ = [],
        c = 0,
        p =
            (l.forEach((e, t) => {
                minOtrasTrans ? 0 == t && (_.push(e.offsetHeight), (c += e.offsetHeight)) : 0 != e.offsetHeight && (_.push(e.offsetHeight), (c += e.offsetHeight));
            }),
            Math.min(..._)),
        h = Math.max(..._);
    "row" == positionShow
        ? (r.forEach((e) => {
              e.style.width = "100%";
          }),
          l.forEach((e) => {
              e.style.height = p + "px";
          }),
          d.forEach((e, t) => {
              minOtrasTrans
                  ? 0 == t
                      ? (e.style.height = i - p + "px")
                      : ((e.parentElement.style.display = "none"), (e.style.height = i / d.length - p + "px"))
                  : ((e.parentElement.style.display = ""), (e.style.height = i / d.length - p + "px"));
          }),
          eid_wrCols.classList.remove("wrCols_center"),
          (eid_wrCols.style.maxWidth = ""))
        : "col" == positionShow &&
          (r.forEach((e, t) => {
              minOtrasTrans ? (0 == t ? (e.style.width = "100%") : ((e.style.display = "none"), (e.style.width = 100 / d.length + "%"))) : ((e.style.display = ""), (e.style.width = 100 / d.length + "%"));
          }),
          l.forEach((e, t) => {
              minOtrasTrans ? (e.style.height = 0 == t ? e.offsetHeight + "px" : h + "px") : (e.style.height = h + "px");
          }),
          "desktop" == s
              ? (enable_maxWidthCol ? (eid_wrCols.style.maxWidth = maxWidthCol * l.length + "px") : (eid_wrCols.style.maxWidth = ""), (l[0].style.display = ""))
              : "tablet" == s
              ? ((eid_wrCols.style.maxWidth = ""), (l[0].style.display = ""))
              : "mobile" == s && (eid_wrCols.style.maxWidth = ""),
          d.forEach((e, t) => {
              0 != l[t].offsetHeight ? (e.style.height = i - h + "px") : (e.style.height = i + "px");
          }),
          eid_wrCols.classList.add("wrCols_center"));
    "col" == positionShow &&
        1 < d.length &&
        d[0].offsetWidth < 300 &&
        window.innerWidth < pantallaTabletMinPx &&
        ((a = window.innerWidth),
        (e = Math.floor(a / 300)),
        (t = 1 < (n = d.length - e) ? obj_lang.d228 : obj_lang.d229),
        (r = reemplazarValores(obj_lang.d230, [a, d[0].offsetWidth, n, t])),
        openModal("center", "Info", r, "showAviso"),
        (positionShow = "row"),
        mySizeWindow()),
        setTimeout(() => {
            init_scroll_in_colsInner(), getArrSumLineH();
        }, 100),
        mySizeNav(),
        mySizeFind(),
        mySizeTsk(),
        mySizeStrong();
}
function mySizeNav() {
    var e = parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom),
        t = eid_sidebar.offsetHeight,
        a = t - e - eid_menuTabs.offsetHeight - eid_nav_head.offsetHeight;
    (eid_sidebarInner.style.height = t - e + "px"), (eid_nav_body.style.height = a + "px");
}
function mySizeFind() {
    var e = eid_wr_find_res_blocks.querySelector(".find_res_block_active"),
        t = parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom),
        a = eid_sidebar.offsetHeight,
        r = eid_menuTabs.offsetHeight,
        n = eid_wr_find_head.offsetHeight,
        s = eid_wr_find_tabs.offsetHeight,
        r = a - t - r - n - 10,
        n = ((eid_sidebarInner.style.height = a - t + "px"), (eid_find_body.style.height = r + "px"), r - s - 5);
    e.style.height = n + "px";
}
function mySizeTsk() {
    var e = parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom),
        t = eid_sidebar.offsetHeight,
        a = t - e - eid_menuTabs.offsetHeight - eid_tsk_head.offsetHeight - 15;
    (eid_sidebarInner.style.height = t - e + "px"), (eid_tsk_body.style.height = a + "px");
}
function mySizeStrong() {
    var e = parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom),
        t = eid_sidebar.offsetHeight,
        a = t - e,
        r = eid_menuTabs.offsetHeight,
        n = eid_wr_strong_head.offsetHeight;
    for (let e = 0; e < eid_strong_body.children.length; e++) if (eid_strong_body.children[e].classList.contains("p_v")) break;
    t = t - e - r - n - 3 - 2;
    (eid_sidebarInner.style.height = a + "px"), (eid_strong_body.style.height = t + "px");
}
function mySizeMarkers() {
    var e = parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom),
        t = eid_sidebar.offsetHeight,
        a = t - e - eid_menuTabs.offsetHeight - eid_markers_head.offsetHeight - 15;
    (eid_sidebarInner.style.height = t - e + "px"), (eid_wr_markers_inner.style.height = a + "px");
}
function mySizeVerse() {
    (window.arr_h = []), (window.arr_sum_line_h = []);
    let a = [];
    var e = document.querySelectorAll(".colsHead");
    let o = document.querySelectorAll(".colsInner");
    e.forEach((e) => {
        e.offsetWidth < 350
            ? (e.querySelector(".partDesk .desk_trans").classList.remove("mw-90"), e.querySelector(".partDesk .desk_sh_link").classList.remove("mw-90"))
            : (e.querySelector(".partDesk .desk_trans").classList.add("mw-90"), e.querySelector(".partDesk .desk_sh_link").classList.add("mw-90"));
    }),
        o.forEach(function (e, t) {
            o.forEach((e) => {
                Array.from(e.children).forEach((e) => {
                    e.style.removeProperty("height");
                });
            });
            t = document.querySelectorAll(".colsInner")[t].children;
            let r = [],
                n = [],
                s = 0;
            a.push(t.length),
                Array.from(t).forEach(function (e, t, a) {
                    r.push(a[t].offsetHeight), (s += a[t].offsetHeight), n.push(s);
                }),
                arr_h.push(r),
                arr_sum_line_h.push(n);
        });
    var r = Math.max(...a);
    window.arr_line_h = [];
    for (let t = 0; t < r; t++) {
        var n,
            s = [];
        for (let e = 0; e < o.length; e++) {
            var i = void 0 !== arr_h[e][t] ? arr_h[e][t] : 0;
            s.push(i),
                void 0 !== document.querySelectorAll(".colsInner")[e].children[t] &&
                    (document.querySelectorAll(".colsInner")[e].children[t].innerHTML, ["span", "b", "i", "strong"].includes(document.querySelectorAll(".colsInner")[e].children[t].localName)) &&
                    (document.querySelectorAll(".colsInner")[e].children[t].style.display = "block");
        }
        if ((arr_line_h.push(s), (n = Math.max(...s)), "col" == positionShow))
            for (let e = 0; e < o.length; e++) void 0 !== document.querySelectorAll(".colsInner")[e].children[t] && (document.querySelectorAll(".colsInner")[e].children[t].style.height = n + "px");
    }
    setTimeout(() => {
        addMarginTolastP(), init_scroll_in_colsInner(), getArrSumLineH();
    }, 100);
}
function addMarginTolastP() {
    document.querySelectorAll(".colsInner").forEach((e) => {
        var t = e.querySelector("p:last-child");
        null != t && ((e = e.offsetHeight), (t.style.marginBottom = e + "px"));
    });
}
function ref(e) {
    eid_sidebarInner.querySelector("p").innerHTML = e;
}
function addTrans(e = null) {
    var a = document.querySelectorAll(".cols").length;
    let t = [],
        r =
            (document.querySelectorAll(".cols").forEach((e) => {
                e = parseInt(e.getAttribute("id").slice(-1));
                t.push(e);
            }),
            1);
    for (let e = 1; e <= countMaxTransInCols; e++)
        if (!t.includes(e)) {
            r = e;
            break;
        }
    if (a < countMaxTransInCols) {
        let t = 100 / (a + 1) + "%";
        enable_maxWidthCol && (eid_wrCols.style.maxWidth = maxWidthCol * document.querySelectorAll(".colsHead").length + "px"),
            document.querySelectorAll(".cols").forEach((e) => {
                e.style.width = t;
            });
        a = document.createElement("div");
        (a.id = "col" + r), (a.className = "cols"), (a.style.width = t);
        const s = document.createElement("div");
        (s.id = "trans" + r),
            (s.className = "colsHead"),
            (s.innerHTML = `<div class="colsHeadInner">   <div class="partDesk"> <div class="wr_desk_trans" title="Presiona para seleccionar la traducción." onclick="openModal('full','Избранныe модули Библии',document.querySelector('#${s.id}.colsHead'),'showModules')">   <div class="vstavka_left">&nbsp;</div>  <div class="centralPart">   <div class="desk_trans"><span class="sp_plus_trans"> + </span></div>   <div class="separ_line"></div>   <div class="desk_sh_link"> ---. --:-- </div>  </div>  <button class="btn btn_xsm f_r" onclick="closeTrans(this,event)">&#10005;</button><!--X-->  </div>   </div>   <div class="partMob"> <div class="partMobInner">  <button class="btnMenu btn btn_svg" data-typebtn="transMenu" onclick="openSidebar(this)"><img src="images/menu_white.svg"></button>  <button class="btn btn_svg" onclick="chapterGo('prev')" title="Previous Chapter"><img src="images/arrow_chevron_left_white.svg"></button> <div class="centralPart">   <button class="btn" title="open Modal to choose translation" onclick="openModal('full','Избранныe модули Библии',document.querySelector('#${s.id}.colsHead'),'showModules')"> <span class="mob_trans"> + </span>   </button>   <div class="separ_line"></div>   <button class="btn" data-typebtn="transRef" onclick="showTabMob('#btn_nav','nav',this)" title="Навигация. Выбор книги, главы, стиха"> <span class="mob_sh_link"> ---.--:-- </span>   </button>  </div> <button class="btn btn_svg" onclick="chapterGo('next')" title="Next Chapter"><img src="images/arrow_chevron_right_white.svg"></button> <button class="btn btn_x" onclick="closeTrans(this,event,'mob')" title="close Translation">&#10005;</button><!--x-->   </div>   </div>   </div>`);
        var n = document.createElement("div");
        (n.className = "colsInner"),
            (n.innerHTML = `	<p class="prim">Выберите модуль Библии кликнув на '+' вверху.</p>  `),
            a.appendChild(s),
            a.appendChild(n),
            eid_wrCols.appendChild(a),
            "row" == positionShow
                ? ((eid_wrCols.style.maxWidth = ""), mySizeWindow(), mySizeVerse())
                : (setTimeout(() => {
                      mySizeWindow();
                  }, 10),
                  setTimeout(() => {
                      mySizeVerse();
                  }, 15)),
            "askForTrans" == e &&
                (null != document.getElementById("trans" + r)
                    ? setTimeout((e) => {
                          openModal("full", "Избранныe модули Библии", s, "showModules");
                      }, 200)
                    : alert("por alguna razon el div nuevo de la traducción no se ha creado.")),
            setTimeout(() => {
                updateTransOnClickOnActiveCol();
            }, 1e3);
    }
}
function removeTrans() {
    var e = document.querySelectorAll(".cols");
    if (1 != e.length) {
        eid_wrCols.lastElementChild.id.slice(3);
        var t = eid_wrCols.lastElementChild.querySelector(".colsHead").dataset.trans,
            r = document.querySelector(".tab_active");
        let a;
        e.forEach((e, t) => {
            e == eid_wrCols.lastElementChild && (a = t);
        }),
            void 0 !== a ? removeTransFromTab(t, r, a) : console.error("col_index is undefined"),
            eid_wrCols.lastElementChild.remove(),
            updateArrTabs(),
            mySizeWindow(),
            mySizeVerse();
    } else openModal("center", "Aviso Traducción", "No se puede eliminar la única traducción.", "showAviso");
}
function closeTrans(e, t, a = 0) {
    t.stopPropagation();
    let r = e.parentElement.parentElement.parentElement.parentElement.id.slice(5);
    (t = e.parentElement.parentElement.parentElement.parentElement.dataset.trans), (e = document.querySelector(".tab_active"));
    let n;
    document.querySelectorAll(".cols").forEach((e, t) => {
        e == document.getElementById("col" + r) && (n = t);
    }),
        document.getElementById("col" + r).remove(),
        void 0 !== n ? removeTransFromTab(t, e, n) : console.error("col_index is undefined"),
        updateArrTabs(),
        mySizeWindow(),
        mySizeVerse();
}
function removeTransFromTab(e, t, a) {
    var r = t.dataset.str_trans.split(","),
        n = (r.splice(a, 1), t.title.split(","));
    n.splice(a, 1), (t.dataset.str_trans = r.join(", ")), (t.title = n.join(", "));
}
function updateTransInTab(e, t, a) {
    let r = [],
        n =
            (document.querySelectorAll(".cols .colsHead").forEach((e) => {
                void 0 !== e.dataset.trans && r.push(e.dataset.trans);
            }),
            []),
        s = "";
    r.forEach((t, e) => {
        var a = arrFavTransObj.find((e) => e.Translation === t);
        n.push(a.BibleShortName), 0 == e && (s = a.BibleShortName);
    });
    var o = r,
        i = n;
    (t.dataset.str_trans = o.join(", ")), (t.title = i.join(", ")), (t.querySelector(".tab_trans_name").textContent = s);
}
function getRefOfTab(e, t, a = null) {
    allowUseShowTrans = !0;
    let n = document.getElementById(e);
    document.querySelectorAll(".tabs").forEach((e) => {
        e.classList.remove("tab_active");
    }),
        null != n && n.classList.add("tab_active");
    let s = document.querySelectorAll(".cols");
    if (((eid_inpt_nav.value = t), (eid_inpt_nav.dataset.trans = n.dataset.ref_trans), (a = null != a ? a : eid_inpt_nav.dataset.trans), (arr_trans = a.split(",")), s.length > arr_trans.length)) {
        var r = s.length - arr_trans.length;
        for (let e = 0; e < r; e++) removeTrans();
    }
    arr_trans.forEach((t, a) => {
        t = t.trim();
        var e,
            r = arrFavTransObj.find((e) => e.Translation === t);
        void 0 !== r &&
            (null != s[a]
                ? (t == n.dataset.ref_trans && (eid_inpt_nav.dataset.divtrans = s[a].querySelector(".colsHead").id),
                  (s[a].querySelector(".colsHead").dataset.trans = r.Translation),
                  (s[a].querySelector(".colsHead").dataset.base_ep = r.EnglishPsalms))
                : (addTrans(),
                  ((e = document.querySelectorAll(".cols")[document.querySelectorAll(".cols").length - 1]).querySelector(".colsHead").dataset.trans = r.Translation),
                  (e.querySelector(".colsHead").dataset.base_ep = r.EnglishPsalms))),
            0 == a &&
                "trans1" == s[a].querySelector(".colsHead").id &&
                (document.querySelectorAll("#footerInner button").forEach((e) => {
                    e.classList.remove("btn_active"), e.value == s[a].querySelector(".colsHead").dataset.trans && (e.classList.add("btn_active"), e.scrollIntoView());
                }),
                void 0 !== r) &&
                n.dataset.ref_trans == arr_trans[0] &&
                (eid_inpt_nav.dataset.trans = r.Translation);
    }),
        getRef(n.dataset.ref_trans),
        setTimeout(() => {
            eid_s_verse.click();
        }, 100);
}
function addTab(e = null, a = null, r = null, n = null) {
    var s = document.querySelectorAll(".tabs"),
        o = s.length;
    let i,
        t = (null != document.querySelector(".tab_active .tab_ref") && (i = document.querySelector(".tab_active .tab_ref").textContent), []),
        l =
            (s.forEach((e) => {
                e = parseInt(e.getAttribute("id").substring(3));
                t.push(e);
            }),
            1);
    for (let e = 1; e <= 20; e++)
        if (!t.includes(e)) {
            l = e;
            break;
        }
    if (null == a) {
        s = document.querySelectorAll(".colsHead");
        let t = [];
        s.forEach((e) => {
            t.push(e.dataset.trans);
        }),
            (a = t.join());
    }
    if (o < 20) {
        const _ = document.createElement("div");
        (_.id = "tab" + l),
            (_.className = "tabs"),
            (_.dataset.str_trans = a),
            (_.dataset.ref_trans = "" != eid_inpt_nav.dataset.trans ? eid_inpt_nav.dataset.trans : a.split(",")[0]),
            (_.onclick = function (e) {
                getRefOfTab(_.id, _.querySelector(".tab_ref").innerHTML, _.dataset.str_trans),
                    setTimeout(() => {
                        updateArrTabs(), updateActTransNavBlackBtn();
                    }, 150);
            }),
            null != r && _.classList.add("tab_active"),
            "tab_new" == n &&
                (document.querySelectorAll(".tabs").forEach((e) => {
                    e.classList.remove("tab_active");
                }),
                _.classList.add("tab_active")),
            (e = null != e ? e : void 0 !== i ? i : inpt_nav.value);
        let t;
        t = arrFavTrans.includes(_.dataset.ref_trans) ? _.dataset.ref_trans : arrFavTrans[0];
        var s = arrFavTransObj.find((e) => e.Translation === t),
            o = document.createElement("span"),
            a = ((o.className = "tab_trans_name"), (o.innerHTML = void 0 !== s && 0 < Object.keys(s).length ? s.BibleShortName : "---"), document.createElement("span")),
            d =
                ((a.className = "tab_ref"),
                (a.innerHTML = null != e ? e : "New Tab" + l),
                ((btn_close = document.createElement("button")).className = "btn btn_sm f_r"),
                (btn_close.dataset.fn = "closeTab(ev.target, ev)"),
                (btn_close.onclick = (e) => {
                    closeTab(e.target, e);
                }),
                (btn_close.innerHTML = "&#10005;"),
                _.appendChild(btn_close),
                _.appendChild(o),
                _.appendChild(a),
                eid_partDeskTabs.appendChild(_),
                document.querySelectorAll(".tabs"));
        for (let e = 0; e < d.length; e++)
            if (d[e].classList.contains("tab_active")) {
                scrollToVkladkaActive();
                break;
            }
        setTimeout(() => {
            updateArrTabs();
        }, 1e3),
            mySizeWindow();
    }
}
function updateArrTabs() {
    arrTabs = [];
    var e = document.querySelectorAll(".tabs");
    document.querySelector(".colsInner");
    e.forEach((e) => {
        var t = null !== e.querySelector(":scope > button");
        let a = [],
            r = [];
        e.dataset.str_trans.split(",").forEach((e) => {
            e = getObjTransByName((e = e.trim()));
            void 0 !== e && r.push(e.Translation), void 0 !== e && a.push(e.BibleShortName);
        });
        var n = a.join(", "),
            s = r.join(", "),
            s = ((e.title = n), (e.dataset.str_trans = s), { id: e.id, className: e.getAttribute("class"), str_trans: s, title: n, btn_close: t, ref_trans: e.dataset.ref_trans, ref: e.querySelector(".tab_ref").innerHTML });
        arrTabs.push(s);
    }),
        hay_sesion && arrTabs_is_loaded && guardarEnBd("vkladki", "arrTabs", arrTabs);
}
async function guardarEnBd(e, t, a) {
    try {
        (await verificarAutenticacion()) && (await insertarDatos(e, t, a));
    } catch (e) {
        console.error("Error en la función externa:", e);
    }
}
async function insertarDatos(e, t, a) {
    try {
        if (get_cookieConsent && "rejected" === get_cookieConsent)
            openModal("center", "Cookies", 'Si no aceptas cookies no puedes insertar datos. <a onclick="showBlockCookies(); closeModal(null,true);">Seleccionar Coockies</a>.', "showAviso");
        else if ("" == e || "" == t || void 0 === a) alert(obj_lang.d251);
        else {
            var r = { tabla: e, campo: t, arr: a },
                n = await fetch("./php/insertar_datos.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) });
            if (!n.ok) throw new Error("Error al obtener datos");
            await n.json();
        }
    } catch (e) {
        console.error("Error en la función insertarDatos: ", e);
    }
}
async function obtenerDatosDeBD(t, a) {
    try {
        if (!get_cookieConsent || "rejected" !== get_cookieConsent)
            if ("" == t || "" == a) alert(obj_lang.d251);
            else {
                var r = { tabla: t, campo: a },
                    n = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) },
                    s = await fetch("./php/obtener_datos_de_bd.php", n);
                if (!s.ok) throw new Error("Error al obtener datos");
                var o,
                    i = await s.json();
                let e = !1;
                switch ((("no_tiene_datos" != i.valorCampo && "[]" != i.valorCampo && "{}" != i.valorCampo && "null" != i.valorCampo && "NULL" != i.valorCampo && "" != i.valorCampo) || (e = !0), t)) {
                    case "ajustes":
                        e ? (obj_ajustes = obj_ajustes_def) : ((obj_ajustes = JSON.parse(i.valorCampo)), (obj_ajustes_is_loaded = !0));
                        break;
                    case "fav_trans":
                        (arrFavTrans = e ? arrFavTransDef : ((arrFavTrans = convertArrBdToArrOk("arrFavTrans", i.valorCampo)), [...new Set(arrFavTrans)])),
                            !(async function () {
                                await crear_arrFavTransObj();
                            })();
                        break;
                    case "hist_nav":
                        e || ((arr_hist_nav = convertArrBdToArrOk("arr_hist_nav", i.valorCampo)), (arr_hist_nav_is_loaded = !0), buildHistoryNavDesktop());
                        break;
                    case "hist_find":
                        e || ((arr_hist_find = convertArrBdToArrOk("arr_hist_find", i.valorCampo)), (arr_hist_find_is_loaded = !0), buildHistoryFindDesktop());
                        break;
                    case "hist_strong":
                        e || ((arr_hist_strong = convertArrBdToArrOk("arr_hist_strong", i.valorCampo)), (arr_hist_strong_is_loaded = !0), buildHistoryStrongDesktop());
                        break;
                    case "markers":
                        e || ((arr_markers = convertArrBdToArrOk("arr_markers", i.valorCampo)), (arr_markers_is_loaded = !0), buildMarkersDesktop());
                        break;
                    case "vkladki":
                        e
                            ? ((o = arrFavTransObj.find((e) => e.Translation === arrFavTrans[0])),
                              (arrTabs = [{ id: "tab1", className: "tabs tab_active", str_trans: o.Translation, title: o.BibleShortName, btn_close: !0, ref_trans: o.Translation, ref: o.Books[0].ShortNames[0] + " 1:1" }]))
                            : ((arrTabs = convertArrBdToArrOk("arrTabs", i.valorCampo)), (arrTabs_is_loaded = !0)),
                            makeTabsFromDatosDeVkladki();
                        break;
                    default:
                        "no_tiene_datos" == i.valorCampo && console.error(obj_lang.d252);
                }
                0 == i.success && i.error && Object.keys(obj_lang).length;
            }
    } catch (e) {
        console.error("Error en obtenerDatosDeBD(): error.message: ", e.message);
    }
}
function convertArrBdToArrOk(r, e) {
    let n = JSON.parse(e),
        s = /u\d{2}/g,
        o,
        i,
        l;
    return (
        n.forEach((e, t) => {
            switch (r) {
                case "arrTabs":
                    (o = e.ref.match(s)) &&
                        ((e.ref = e.ref.replace(s, function (e) {
                            return "\\" + e;
                        })),
                        (n[t].ref = convertirUnicodeALetras(e.ref)));
                    break;
                case "arr_hist_nav":
                    (o = e.ref.match(s)) &&
                        ((e.ref = e.ref.replace(s, function (e) {
                            return "\\" + e;
                        })),
                        (n[t].ref = convertirUnicodeALetras(e.ref))),
                        (i = e.BookShortName.match(s)) &&
                            ((e.BookShortName = e.BookShortName.replace(s, function (e) {
                                return "\\" + e;
                            })),
                            (n[t].BookShortName = convertirUnicodeALetras(e.BookShortName)));
                    break;
                case "arr_hist_find":
                    (o = e.words.match(s)) &&
                        ((e.words = e.words.replace(s, function (e) {
                            return "\\" + e;
                        })),
                        (n[t].words = convertirUnicodeALetras(e.words)));
                    break;
                case "arr_hist_strong":
                    var a = /u\d{1}/g;
                    void 0 !== e.strongWord &&
                        void 0 !== e.strongTranslation &&
                        ((o = e.strongWord.match(a)) &&
                            ((e.strongWord = e.strongWord.replace(a, function (e) {
                                return "\\" + e;
                            })),
                            (n[t].strongWord = convertirUnicodeALetras(e.strongWord))),
                        (i = e.strongTranslation.match(s))) &&
                        ((e.strongTranslation = e.strongTranslation.replace(s, function (e) {
                            return "\\" + e;
                        })),
                        (n[t].strongTranslation = convertirUnicodeALetras(e.strongTranslation)));
                    break;
                case "arr_markers":
                    (o = e.ref.match(s)) &&
                        ((e.ref = e.ref.replace(s, function (e) {
                            return "\\" + e;
                        })),
                        (n[t].ref = convertirUnicodeALetras(e.ref))),
                        (i = e.BookShortName.match(s)) &&
                            ((e.BookShortName = e.BookShortName.replace(s, function (e) {
                                return "\\" + e;
                            })),
                            (n[t].BookShortName = convertirUnicodeALetras(e.BookShortName))),
                        (l = e.verseText.match(s)) &&
                            ((e.verseText = e.verseText.replace(s, function (e) {
                                return "\\" + e;
                            })),
                            (n[t].verseText = convertirUnicodeALetras(e.verseText)));
            }
        }),
        n
    );
}
function makeTabsFromDatosDeVkladki() {
    if (((eid_partDeskTabs.innerHTML = ""), 0 < arrTabs.length))
        if (arrTabs.length < 20) {
            arrTabs.forEach((e) => {
                const t = document.createElement("div");
                (t.id = e.id),
                    (t.className = e.className),
                    (t.dataset.str_trans = e.str_trans),
                    (t.dataset.ref_trans = e.ref_trans),
                    (t.title = e.title),
                    (t.onclick = function (e) {
                        getRefOfTab(t.id, t.querySelector(".tab_ref").innerHTML, t.dataset.str_trans),
                            setTimeout(() => {
                                updateArrTabs(), updateActTransNavBlackBtn();
                            }, 150);
                    });
                var a = arrFavTransObj.find((e) => e.Translation === t.dataset.ref_trans),
                    r = document.createElement("span"),
                    a = ((r.className = "tab_trans_name"), (r.innerHTML = void 0 !== a && 0 < Object.keys(a).length ? a.BibleShortName : "---"), document.createElement("span"));
                (a.className = "tab_ref"),
                    (a.innerHTML = e.ref),
                    ((btn_close = document.createElement("button")).className = "btn btn_sm f_r"),
                    (btn_close.dataset.fn = "closeTab(ev.target, ev)"),
                    (btn_close.onclick = (e) => {
                        closeTab(e.target, e);
                    }),
                    (btn_close.innerHTML = "&#10005;"),
                    t.appendChild(btn_close),
                    t.appendChild(r),
                    t.appendChild(a),
                    eid_partDeskTabs.appendChild(t);
            });
            var t = document.querySelectorAll(".tabs");
            for (let e = 0; e < t.length; e++)
                if (t[e].classList.contains("tab_active")) {
                    scrollToVkladkaActive();
                    var a = t[e];
                    getRefOfTab(a.id, a.querySelector(".tab_ref").innerHTML, a.dataset.str_trans), updateArrTabs();
                    break;
                }
            setTimeout(() => {
                updateArrTabs();
            }, 1e3);
        }
}
function convertirEscapesUnicode(e) {
    return e.replace(/\\u([\dA-Fa-f]{4})/g, (e, t) => String.fromCharCode(parseInt(t, 16)));
}
function convertirUnicodeALetras(e) {
    return JSON.parse('"' + e + '"');
}
async function verificarAutenticacion() {
    try {
        var e;
        if (!get_cookieConsent || "rejected" !== get_cookieConsent) return await (e = await fetch("./php/verificar_autenticacion.php", { method: "GET", credentials: "include" })).json(), !!e.ok;
        openModal("center", "Cookies", 'Si no aceptas cookies no puedes verificar autenticación. <a onclick="showBlockCookies(); closeModal(null,true);">Seleccionar Coockies</a>.', "showAviso");
    } catch (e) {
        return console.error("verificarAutenticacion. error: ", e), !1;
    }
}
function showTabs() {
    openModal("tabsList", "Вкладки");
}
function removeTab() {
    closeTab(eid_partDeskTabs.lastElementChild.querySelector("button"));
}
function closeTab(t, a = null) {
    if ((null != a && a.stopPropagation(), 1 < arrTabs.length)) {
        var a = arrTabs.indexOf(arrTabs.find((e) => "tabs tab_active" === e.className));
        let e = 0;
        (e = 0 < a ? a - 1 : a + 1), t.parentElement.classList.contains("tab_active") && ((a = document.getElementById(arrTabs[e].id)).classList.add("tab_active"), a.click()), t.parentElement.remove(), updateArrTabs(), mySizeWindow();
    } else openModal("center", "Aviso Pestañas", "No se puede eliminar la única pestaña.", "showAviso");
}
function selBook(e) {
    (obj_nav.trans = eid_inpt_nav.dataset.trans),
        (obj_nav.divtrans = eid_inpt_nav.dataset.divtrans),
        (obj_nav.book_short_name = e.srcElement.getAttribute("data-book_short_name")),
        (obj_nav.id_book = e.srcElement.getAttribute("data-id_book")),
        (obj_nav.show_chapter = ""),
        (obj_nav.show_verse = ""),
        eid_inpt_nav.setAttribute("data-book_short_name", e.srcElement.getAttribute("data-book_short_name")),
        eid_inpt_nav.setAttribute("data-id_book", e.srcElement.getAttribute("data-id_book")),
        eid_inpt_nav.setAttribute("data-show_chapter", ""),
        eid_inpt_nav.setAttribute("data-show_verse", ""),
        (eid_inpt_nav.value = eid_inpt_nav.getAttribute("data-book_short_name") + " "),
        (eid_v_verse.innerHTML = "cargando versículos..."),
        addRefToHistNav(eid_inpt_nav.dataset.trans, eid_inpt_nav.value, eid_inpt_nav.dataset.id_book, eid_inpt_nav.dataset.show_chapter, null, null),
        e.srcElement.classList.add("active"),
        eid_s_chapter.click(),
        showTrans(e.srcElement.getAttribute("data-id_book"), 1);
}
function selChapter(e, t = null) {
    e.id;
    var a = null == t ? e.srcElement.getAttribute("data-show_chapter") : t,
        r = a;
    let n = eid_trans1.dataset.trans,
        s = eid_inpt_nav.dataset.trans;
    var o = eid_inpt_nav.dataset.divtrans;
    let i = !1;
    if ("" != o && "trans1" != o) {
        var o = arrFavTransObj.find((e) => e.Translation === n),
            l = arrFavTransObj.find((e) => e.Translation === s);
        let e;
        "N" == o.EnglishPsalms && "Y" == l.EnglishPsalms
            ? ((d = convertLinkFromEspToRus(eid_inpt_nav.dataset.id_book, a, null, null)), (e = d[1]), (i = !0))
            : "Y" == o.EnglishPsalms && "N" == l.EnglishPsalms
            ? ((d = convertLinkFromRusToEsp(eid_inpt_nav.dataset.id_book, a, null, null)), (e = d[1]), (i = !0))
            : (e = a),
            (obj_nav.show_chapter = e),
            (obj_nav.show_verse = ""),
            eid_inpt_nav.setAttribute("data-show_chapter", e);
    } else (obj_nav.show_chapter = a), (obj_nav.show_verse = "");
    if ("" != eid_inpt_nav.dataset.divtrans && "trans1" != eid_inpt_nav.dataset.divtrans) {
        if (1 < document.querySelectorAll(".cols").length && 0 == i) {
            o = checkRefNav(obj_nav.id_book, obj_nav.show_chapter, obj_nav.show_verse, null);
            if (o) {
                o[0];
                var l = o[1],
                    d = o[2],
                    _ = o[3];
                let e = o[4];
                0 < l && (e += " " + l),
                    0 < d && (e += ":" + d),
                    0 < _ && parseInt(_) > parseInt(d) && (e += "-" + _),
                    (eid_inpt_nav.value = e),
                    eid_inpt_nav.setAttribute("data-show_chapter", l),
                    eid_inpt_nav.setAttribute("data-show_verse", "");
            }
        }
        (eid_inpt_nav.value = eid_inpt_nav.getAttribute("data-book_short_name") + " " + eid_inpt_nav.getAttribute("data-show_chapter")),
            addRefToHistNav(eid_inpt_nav.dataset.trans, eid_inpt_nav.value, eid_inpt_nav.dataset.id_book, eid_inpt_nav.dataset.show_chapter, null, null),
            null == t && e.srcElement.classList.add("active"),
            eid_s_verse.click(),
            showTrans(eid_inpt_nav.getAttribute("data-id_book"), r);
    } else
        eid_inpt_nav.setAttribute("data-show_chapter", a),
            eid_inpt_nav.setAttribute("data-show_verse", ""),
            (eid_inpt_nav.value = eid_inpt_nav.getAttribute("data-book_short_name") + " " + eid_inpt_nav.getAttribute("data-show_chapter")),
            addRefToHistNav(eid_inpt_nav.dataset.trans, eid_inpt_nav.value, eid_inpt_nav.dataset.id_book, eid_inpt_nav.dataset.show_chapter, null, null),
            null == t && e.srcElement.classList.add("active"),
            eid_s_verse.click(),
            "e_virt" != e.id && showTrans(eid_inpt_nav.getAttribute("data-id_book"), a);
}
function updateRefInTabActive(e, t) {
    (document.querySelector(".tab_active").dataset.ref_trans = e), (document.querySelector(".tab_active .tab_ref").textContent = t);
}
function selVerse(a) {
    let r = eid_trans1.dataset.trans,
        n = eid_inpt_nav.dataset.trans;
    var s = eid_inpt_nav.dataset.divtrans;
    "" == eid_inpt_nav.getAttribute("data-show_chapter") && eid_inpt_nav.setAttribute("data-show_chapter", 1);
    let o = !1;
    if ("" != s && "trans1" != s) {
        var s = arrFavTransObj.find((e) => e.Translation === r),
            i = arrFavTransObj.find((e) => e.Translation === n);
        let e, t;
        "N" == s.EnglishPsalms && "Y" == i.EnglishPsalms
            ? ((l = convertLinkFromEspToRus(eid_inpt_nav.dataset.id_book, eid_inpt_nav.getAttribute("data-show_chapter"), a.srcElement.getAttribute("data-show_verse"), null)), (e = l[1]), (t = l[2]), (o = !0))
            : "Y" == s.EnglishPsalms && "N" == i.EnglishPsalms
            ? ((l = convertLinkFromRusToEsp(eid_inpt_nav.dataset.id_book, eid_inpt_nav.getAttribute("data-show_chapter"), a.srcElement.getAttribute("data-show_verse"), null)), (e = l[1]), (t = l[2]), (o = !0))
            : ((e = eid_inpt_nav.getAttribute("data-show_chapter")), (t = a.srcElement.getAttribute("data-show_verse"))),
            (obj_nav.show_chapter = e),
            (obj_nav.show_verse = t),
            eid_inpt_nav.setAttribute("data-show_verse", t);
    } else
        (obj_nav.show_chapter = eid_inpt_nav.getAttribute("data-show_chapter")),
            (obj_nav.show_verse = a.srcElement.getAttribute("data-show_verse")),
            eid_inpt_nav.setAttribute("data-show_verse", a.srcElement.getAttribute("data-show_verse"));
    let e = null;
    if ("" != eid_inpt_nav.dataset.divtrans && "trans1" != eid_inpt_nav.dataset.divtrans) {
        if (1 < document.querySelectorAll(".cols").length && 0 == o) {
            s = checkRefNav(obj_nav.id_book, obj_nav.show_chapter, obj_nav.show_verse, (e = null));
            if (s) {
                s[0];
                var i = s[1],
                    l = s[2],
                    t = s[3];
                let e = s[4];
                0 < i && (e += " " + i), 0 < l && (e += ":" + l), 0 < t && parseInt(t) > parseInt(l) && (e += "-" + t), (eid_inpt_nav.value = e), eid_inpt_nav.setAttribute("data-show_verse", l);
            }
        }
    } else
        (obj_nav.show_chapter = eid_inpt_nav.getAttribute("data-show_chapter")),
            (obj_nav.show_verse = a.srcElement.getAttribute("data-show_verse")),
            eid_inpt_nav.setAttribute("data-show_verse", a.srcElement.getAttribute("data-show_verse"));
    (eid_inpt_nav.value = eid_inpt_nav.getAttribute("data-book_short_name") + " " + eid_inpt_nav.getAttribute("data-show_chapter") + ":" + eid_inpt_nav.getAttribute("data-show_verse")),
        document.querySelectorAll("#v_verse .v_li").forEach((e) => {
            e.classList.remove("li_active");
        }),
        a.srcElement.classList.add("li_active"),
        scrollToVerse(a.srcElement.getAttribute("data-show_verse")),
        scrollToVkladkaActive();
    (s = `${eid_inpt_nav.dataset.trans}__${eid_inpt_nav.dataset.id_book}__${eid_inpt_nav.dataset.show_chapter}__` + eid_inpt_nav.dataset.show_verse),
        (i = document.getElementById(s).querySelector(".vt").innerText.split(" ").slice(0, 7).join(" "));
    addRefToHistNav(eid_inpt_nav.dataset.trans, eid_inpt_nav.value, eid_inpt_nav.dataset.id_book, eid_inpt_nav.dataset.show_chapter, eid_inpt_nav.dataset.show_verse, e, i), window.innerWidth < pantallaTabletMinPx && closeSidebar();
}
async function sel(V, B, F = 0, r = null) {
    var O = eid_trans1.dataset.trans,
        Y = eid_inpt_nav.dataset.trans;
    null == r && (r = "" != Y ? Y : O);
    let p;
    void 0 !== arrFavTransObj && null != arrFavTransObj && "" != arrFavTransObj && (p = arrFavTransObj.find((e) => e.Translation === r)),
        document.querySelectorAll(".v_bcv").forEach((e) => {
            e.classList.remove("bcv_active");
        }),
        V.classList.add("bcv_active"),
        document.querySelectorAll(".wr_lis").forEach((e) => {
            e.classList.remove("ul_active");
        });
    let h, n;
    switch (B) {
        case "b":
            if (
                (eid_v_book.classList.add("ul_active"),
                eid_bcv_line.classList.remove("c_line"),
                eid_bcv_line.classList.remove("v_line"),
                eid_bcv_line.classList.add("b_line"),
                (h = parseInt(eid_inpt_nav.getAttribute("data-id_book"))),
                void 0 !== arrFavTransObj && null != arrFavTransObj && "" != arrFavTransObj)
            )
                try {
                    (window.arr_books = p.Books), void 0 === p.Books && alert("this_trans_obj.Books undefined"), (eid_v_book.innerHTML = "");
                    let e = [],
                        n = [],
                        s = [],
                        o = [],
                        i = [],
                        l = [],
                        d =
                            (arr_books.forEach((e, t, a) => {
                                let r =
                                    43 == t
                                        ? "b_hech"
                                        : 39 <= t && t <= 42
                                        ? "b_evan"
                                        : 27 <= t && t <= 38
                                        ? "b_peq_prof"
                                        : 22 <= t && t <= 26
                                        ? "b_gr_prof"
                                        : 17 <= t && t <= 21
                                        ? "b_poet"
                                        : 5 <= t && t <= 16
                                        ? "b_hist"
                                        : 0 <= t && t <= 4
                                        ? "b_tora"
                                        : "";
                                44 <= t && t <= 57 && ((r = "b_ep_pablo"), s.push(e)),
                                    58 <= t && t <= 64 && ((r = "b_ep"), o.push(e)),
                                    65 == t && ((r = "b_apo"), i.push(e)),
                                    65 < t && ((r = "b_apocrif"), l.push(e)),
                                    0 <= t && t <= 43 && n.push(e),
                                    (e.cl_book = r);
                            }),
                            (e = "N" == p.EnglishPsalms ? e.concat(n, o, s, i, l) : e.concat(n, s, o, i, l)),
                            []),
                        _ = [],
                        c = [];
                    if (
                        (e.forEach((e, t, a) => {
                            var r = document.createElement("div");
                            (r.id = "li" + a[t].BookNumber),
                                (r.title = a[t].FullName),
                                r.setAttribute("data-book_short_name", a[t].ShortNames[0]),
                                r.setAttribute("data-id_book", a[t].BookNumber),
                                (r.className = "v_li b_li " + e.cl_book),
                                a[t].BookNumber == h && r.classList.add("li_active"),
                                0 == arr_books[a[t].BookNumber].ChapterQty && r.classList.add("no_disp"),
                                (r.innerHTML = a[t].ShortNames[0]),
                                r.addEventListener("click", selBook),
                                0 <= t && t <= 38 && d.push(r),
                                39 <= t && t <= 65 && _.push(r),
                                66 <= t && c.push(r);
                        }),
                        0 != d.length)
                    ) {
                        const A = document.createElement("div");
                        (A.className = "grid-container block_AT"),
                            d.forEach((e) => {
                                A.append(e);
                            }),
                            eid_v_book.append(A);
                    }
                    if (0 != _.length) {
                        const j = document.createElement("div");
                        (j.className = "grid-container block_NT"),
                            _.forEach((e) => {
                                j.append(e);
                            }),
                            eid_v_book.append(j);
                    }
                    if (0 != c.length) {
                        const C = document.createElement("div");
                        (C.className = "grid-container block_APO"),
                            c.forEach((e) => {
                                C.append(e);
                            }),
                            eid_v_book.append(C);
                    }
                    0 < eid_v_book.getElementsByClassName("li_active").length &&
                        setTimeout(() => {
                            0 < eid_v_book.getElementsByClassName("li_active").length && eid_v_book.querySelector(".li_active").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                        }, 100),
                        scrollToVkladkaActive();
                } catch (e) {
                    console.error("error try-catch sel(b). error: ", e);
                }
            else {
                alert("modo old al iniciar... ES NECESARIO!");
                try {
                    var t = await (await fetch(`./modules/text/${r}/bibleqt.json`)).json();
                    (window.arr_books = t.Books), void 0 === t.Books && alert("data.Books undefined"), (eid_v_book.innerHTML = "");
                    let e = [],
                        n = [],
                        s = [],
                        o = [],
                        i = [],
                        l = [],
                        d =
                            (arr_books.forEach((e, t, a) => {
                                let r =
                                    43 == t
                                        ? "b_hech"
                                        : 39 <= t && t <= 42
                                        ? "b_evan"
                                        : 27 <= t && t <= 38
                                        ? "b_peq_prof"
                                        : 22 <= t && t <= 26
                                        ? "b_gr_prof"
                                        : 17 <= t && t <= 21
                                        ? "b_poet"
                                        : 5 <= t && t <= 16
                                        ? "b_hist"
                                        : 0 <= t && t <= 4
                                        ? "b_tora"
                                        : "";
                                44 <= t && t <= 57 && ((r = "b_ep_pablo"), s.push(e)),
                                    58 <= t && t <= 64 && ((r = "b_ep"), o.push(e)),
                                    65 == t && ((r = "b_apo"), i.push(e)),
                                    65 < t && ((r = "b_apocrif"), l.push(e)),
                                    0 <= t && t <= 43 && n.push(e),
                                    (e.cl_book = r);
                            }),
                            (e = "N" == t.EnglishPsalms ? e.concat(n, o, s, i, l) : e.concat(n, s, o, i, l)),
                            []),
                        _ = [],
                        c = [];
                    if (
                        (e.forEach((e, t, a) => {
                            var r = document.createElement("div");
                            (r.id = "li" + a[t].BookNumber),
                                (r.title = a[t].FullName),
                                r.setAttribute("data-book_short_name", a[t].ShortNames[0]),
                                r.setAttribute("data-id_book", a[t].BookNumber),
                                (r.className = "v_li b_li " + e.cl_book),
                                a[t].BookNumber == h && r.classList.add("li_active"),
                                0 == arr_books[a[t].BookNumber].ChapterQty && r.classList.add("no_disp"),
                                (r.innerHTML = a[t].ShortNames[0]),
                                r.addEventListener("click", selBook),
                                0 <= t && t <= 38 && d.push(r),
                                39 <= t && t <= 65 && _.push(r),
                                66 <= t && c.push(r);
                        }),
                        0 != d.length)
                    ) {
                        const I = document.createElement("div");
                        (I.className = "grid-container block_AT"),
                            d.forEach((e) => {
                                I.append(e);
                            }),
                            eid_v_book.append(I);
                    }
                    if (0 != _.length) {
                        const x = document.createElement("div");
                        (x.className = "grid-container block_NT"),
                            _.forEach((e) => {
                                x.append(e);
                            }),
                            eid_v_book.append(x);
                    }
                    if (0 != c.length) {
                        const q = document.createElement("div");
                        (q.className = "grid-container block_APO"),
                            c.forEach((e) => {
                                q.append(e);
                            }),
                            eid_v_book.append(q);
                    }
                    0 < eid_v_book.getElementsByClassName("li_active").length &&
                        setTimeout(() => {
                            eid_v_book.querySelector(".li_active").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                        }, 100),
                        scrollToVkladkaActive();
                } catch (e) {
                    console.error("error try-catch. sel(b) modo old. error: ", e);
                }
            }
            break;
        case "ch":
            if (
                (eid_v_chapter.classList.add("ul_active"),
                eid_bcv_line.classList.remove("b_line"),
                eid_bcv_line.classList.remove("v_line"),
                eid_bcv_line.classList.add("c_line"),
                (h = parseInt(eid_inpt_nav.getAttribute("data-id_book"))),
                (n = parseInt(eid_inpt_nav.getAttribute("data-show_chapter"))),
                void 0 !== arrFavTransObj && null != arrFavTransObj && "" != arrFavTransObj)
            )
                try {
                    void 0 === p.Books[h] && alert("this_trans_obj.Books[id_book] undefined");
                    let t = n;
                    if (1 < document.querySelectorAll(".cols").length) {
                        var R = obj_nav.show_chapter,
                            D = obj_nav.show_verse,
                            a = checkRefNav(h, R, D, null);
                        if (a) {
                            a[0];
                            t = a[1];
                            var s = a[2],
                                o = a[3];
                            let e = a[4];
                            0 < t && (e += " " + t), 0 < s && (e += ":" + s), 0 < o && parseInt(o) > parseInt(s) && (e += "-" + o), (eid_inpt_nav.value = e);
                        }
                    }
                    eid_v_chapter.innerHTML = "";
                    var i = document.createElement("div");
                    (i.className = "wr_grid_ch"), void 0 === p.Books[h].ChapterQty && alert("this_trans_obj.Books[id_book].ChapterQty undefined");
                    for (let e = 1; e <= p.Books[h].ChapterQty; e++) {
                        var l = document.createElement("li");
                        (l.id = "li_ch" + e),
                            l.setAttribute("data-show_chapter", e),
                            (l.className = "v_li c_li"),
                            "" != eid_inpt_nav.dataset.divtrans && "trans1" != eid_inpt_nav.dataset.divtrans ? e == t && l.classList.add("li_active") : e == n && l.classList.add("li_active"),
                            (l.innerHTML = e + '<span class="ch_count_v"></span><span class="ch_count_v chv2"></span>'),
                            l.addEventListener("click", selChapter),
                            i.append(l);
                    }
                    eid_v_chapter.append(i),
                        0 < eid_v_chapter.getElementsByClassName("li_active").length &&
                            setTimeout(() => {
                                eid_v_chapter.querySelector(".li_active").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                            }, 100),
                        scrollToVkladkaActive();
                } catch (e) {
                    console.error("error try-catch sel(ch) chapter. error: ", e);
                }
            else alert("chapter modo old. no salta nunca...");
            break;
        case "v":
            eid_v_verse.classList.add("ul_active"),
                eid_bcv_line.classList.remove("b_line"),
                eid_bcv_line.classList.remove("c_line"),
                eid_bcv_line.classList.add("v_line"),
                (h = parseInt(eid_inpt_nav.getAttribute("data-id_book"))),
                (n = "" !== eid_inpt_nav.getAttribute("data-show_chapter") ? Number(eid_inpt_nav.getAttribute("data-show_chapter")) : 1) < 1 && (n = 1);
            var d = parseInt(eid_inpt_nav.getAttribute("data-show_verse"));
            if (((eid_v_verse.innerHTML = ""), void 0 !== arrFavTransObj && null != arrFavTransObj && "" != arrFavTransObj))
                try {
                    if ((void 0 === p.Books[h].PathName && alert("this_trans_obj.Books[id_book].PathName undefined"), void 0 !== obj_bible_files[r] && void 0 !== obj_bible_files[r].Books))
                        if (void 0 !== obj_bible_files[r].Books[h]) {
                            if (obj_bible_files[r].Books[h].fileName == p.Books[h].PathName && "" != obj_bible_files[r].Books[h].fileContent) {
                                let t, a;
                                if (1 < document.querySelectorAll(".cols").length) {
                                    var P = obj_nav.show_chapter,
                                        $ = "" != obj_nav.show_verse ? obj_nav.show_verse : null,
                                        _ = checkRefNav(h, P, $, null);
                                    if (_) {
                                        _[0];
                                        (t = _[1]), (a = _[2]);
                                        var c = _[3];
                                        let e = _[4];
                                        0 < t && (e += " " + t), 0 < a && (e += ":" + a), 0 < c && parseInt(c) > parseInt(a) && (e += "-" + c), (eid_inpt_nav.value = e);
                                    } else (t = n), (a = d);
                                } else (t = n), (a = d);
                                ("string" != typeof (t = parseInt(t)) && !isNaN(t)) || (t = 1),
                                    (window.arr_verses = obj_bible_files[r].Books[h].fileContent.split("<h4>")[t].split("<p>")),
                                    void 0 === obj_bible_files[r].Books && alert("obj_bible_files[trans].Books undefined"),
                                    (eid_v_verse.innerHTML = "");
                                var m = document.createElement("div");
                                m.className = "wr_grid_v";
                                for (let e = 1; e <= window.arr_verses.length - 1; e++) {
                                    var u = document.createElement("li");
                                    (u.id = "li_v" + e),
                                        u.setAttribute("data-show_verse", e),
                                        (u.className = "v_li"),
                                        "" != eid_inpt_nav.dataset.divtrans && "trans1" != eid_inpt_nav.dataset.divtrans ? e == a && u.classList.add("li_active") : e == d && u.classList.add("li_active"),
                                        (u.innerHTML = e),
                                        u.addEventListener("click", selVerse),
                                        m.append(u);
                                }
                                eid_v_verse.append(m);
                            }
                        } else {
                            h;
                            if (((window.chapter_PathName = p.Books[h].PathName), void 0 === p.Books[h].PathName && alert("this_trans_obj.Books[id_book].PathName undefined"), "por_json" == modo_get_VerseQty))
                                try {
                                    var W = `./modules/text/${r}/` + chapter_PathName,
                                        e = new FormData();
                                    e.append("url", "../" + W), e.append("book", h), e.append("chapter", n);
                                    var z = await (await fetch("./php/read_file_get_VerseQty_to_json.php", { method: "POST", body: e })).json();
                                    let t, a;
                                    if (1 < document.querySelectorAll(".cols").length) {
                                        var Q = obj_nav.show_chapter,
                                            G = obj_nav.show_verse,
                                            b = checkRefNav(h, Q, G, null);
                                        if (b) {
                                            b[0];
                                            (t = b[1]), (a = b[2]);
                                            var v = b[3];
                                            let e = b[4];
                                            0 < t && (e += " " + t), 0 < a && (e += ":" + a), 0 < v && parseInt(v) > parseInt(a) && (e += "-" + v), (eid_inpt_nav.value = e);
                                        } else (t = n), (a = d);
                                    } else (t = n), (a = d);
                                    eid_v_verse.innerHTML = "";
                                    var f = document.createElement("div");
                                    f.className = "wr_grid_v";
                                    for (let e = 1; e <= z.VerseQty; e++) {
                                        var g = document.createElement("li");
                                        (g.id = "li_v" + e),
                                            g.setAttribute("data-show_verse", e),
                                            (g.className = "v_li"),
                                            "" != eid_inpt_nav.dataset.divtrans && "trans1" != eid_inpt_nav.dataset.divtrans ? e == a && g.classList.add("li_active") : e == d && g.classList.add("li_active"),
                                            (g.innerHTML = e),
                                            g.addEventListener("click", selVerse),
                                            f.append(g);
                                    }
                                    eid_v_verse.append(f),
                                        0 < eid_v_verse.getElementsByClassName("li_active").length &&
                                            setTimeout(() => {
                                                null != eid_v_verse.querySelector(".li_active") && eid_v_verse.querySelector(".li_active").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                                            }, 100),
                                        scrollToVkladkaActive();
                                } catch (e) {
                                    console.error("error try-catch. error: ", e);
                                }
                            if ("por_text" == modo_get_VerseQty)
                                try {
                                    var T,
                                        U = `./modules/text/${r}/` + chapter_PathName,
                                        y = await (await fetch(U)).text();
                                    crear_objeto_obj_bible_files &&
                                        ((T = r), void 0 === obj_bible_files[T] && ((obj_bible_files[T] = {}), (obj_bible_files[T].Books = [])), void 0 === obj_bible_files[T].Books[h]) &&
                                        "" != y &&
                                        " " != y &&
                                        ((obj_bible_files[T].Books[h] = { fileName: p.Books[h].PathName, fileContent: y }), p.Books[h].PathName);
                                    let t, a;
                                    if (1 < document.querySelectorAll(".cols").length) {
                                        var J = obj_nav.show_chapter,
                                            K = obj_nav.show_verse,
                                            k = checkRefNav(h, J, K, null);
                                        if (k) {
                                            k[0];
                                            (t = k[1]), (a = k[2]);
                                            var S = k[3];
                                            let e = k[4];
                                            0 < t && (e += " " + t), 0 < a && (e += ":" + a), 0 < S && parseInt(S) > parseInt(a) && (e += "-" + S), (eid_inpt_nav.value = e);
                                        } else (t = n), (a = d);
                                    } else (t = n), (a = d);
                                    (window.arr_verses = y.split("<h4>")[t].split("<p>")), (eid_v_verse.innerHTML = "");
                                    var X = document.createElement("div");
                                    X.className = "wr_grid_v";
                                    for (let e = 1; e <= window.arr_verses.length - 1; e++) {
                                        var w = document.createElement("li");
                                        (w.id = "li_v" + e),
                                            w.setAttribute("data-show_verse", e),
                                            (w.className = "v_li"),
                                            "" != eid_inpt_nav.dataset.divtrans && "trans1" != eid_inpt_nav.dataset.divtrans ? e == a && w.classList.add("li_active") : e == d && w.classList.add("li_active"),
                                            (w.innerHTML = e),
                                            w.addEventListener("click", selVerse),
                                            X.append(w);
                                    }
                                    eid_v_verse.append(X),
                                        0 < eid_v_verse.getElementsByClassName("li_active").length &&
                                            setTimeout(() => {
                                                eid_v_verse.querySelector(".li_active").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                                            }, 100),
                                        scrollToVkladkaActive();
                                } catch (e) {
                                    console.error("error try-catch. error: ", e);
                                }
                        }
                    if (void 0 === obj_bible_files[r]) {
                        if (((window.chapter_PathName = p.Books[h].PathName), void 0 === p.Books[h].PathName && alert("this_trans_obj.Books[id_book].PathName undefined"), "por_json" == modo_get_VerseQty))
                            try {
                                var Z = `./modules/text/${r}/` + chapter_PathName,
                                    L = new FormData();
                                L.append("url", "../" + Z), L.append("book", h), L.append("chapter", n);
                                var ee = await (await fetch("./php/read_file_get_VerseQty_to_json.php", { method: "POST", body: L })).json();
                                let t, a;
                                if (1 < document.querySelectorAll(".cols").length) {
                                    var te = obj_nav.show_chapter,
                                        ae = obj_nav.show_verse,
                                        E = checkRefNav(h, te, ae, null);
                                    if (E) {
                                        E[0];
                                        (t = E[1]), (a = E[2]);
                                        var re = E[3];
                                        let e = E[4];
                                        0 < t && (e += " " + t), 0 < a && (e += ":" + a), 0 < re && parseInt(re) > parseInt(a) && (e += "-" + re), (eid_inpt_nav.value = e);
                                    } else (t = n), (a = d);
                                } else (t = n), (a = d);
                                eid_v_verse.innerHTML = "";
                                var ne = document.createElement("div");
                                ne.className = "wr_grid_v";
                                for (let e = 1; e <= ee.VerseQty; e++) {
                                    var H = document.createElement("li");
                                    (H.id = "li_v" + e),
                                        H.setAttribute("data-show_verse", e),
                                        (H.className = "v_li"),
                                        "" != eid_inpt_nav.dataset.divtrans && "trans1" != eid_inpt_nav.dataset.divtrans ? e == a && H.classList.add("li_active") : e == d && H.classList.add("li_active"),
                                        (H.innerHTML = e),
                                        H.addEventListener("click", selVerse),
                                        ne.append(H);
                                }
                                eid_v_verse.append(ne),
                                    0 < eid_v_verse.getElementsByClassName("li_active").length &&
                                        setTimeout(() => {
                                            null != eid_v_verse.querySelector(".li_active") && eid_v_verse.querySelector(".li_active").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                                        }, 100),
                                    scrollToVkladkaActive();
                            } catch (e) {
                                console.error("error try-catch. error: ", e);
                            }
                        if ("por_text" == modo_get_VerseQty)
                            try {
                                var se = `./modules/text/${r}/` + chapter_PathName,
                                    oe = await (await fetch(se)).text();
                                let t, a;
                                if (1 < document.querySelectorAll(".cols").length) {
                                    var ie = obj_nav.show_chapter,
                                        le = obj_nav.show_verse,
                                        N = checkRefNav(h, ie, le, null);
                                    if (N) {
                                        N[0];
                                        (t = N[1]), (a = N[2]);
                                        var de = N[3];
                                        let e = N[4];
                                        0 < t && (e += " " + t), 0 < a && (e += ":" + a), 0 < de && parseInt(de) > parseInt(a) && (e += "-" + de), (eid_inpt_nav.value = e);
                                    } else (t = n), (a = d);
                                } else (t = n), (a = d);
                                (window.arr_verses = oe.split("<h4>")[t].split("<p>")), (eid_v_verse.innerHTML = "");
                                var _e = document.createElement("div");
                                _e.className = "wr_grid_v";
                                for (let e = 1; e <= window.arr_verses.length - 1; e++) {
                                    var M = document.createElement("li");
                                    (M.id = "li_v" + e),
                                        M.setAttribute("data-show_verse", e),
                                        (M.className = "v_li"),
                                        "" != eid_inpt_nav.dataset.divtrans && "trans1" != eid_inpt_nav.dataset.divtrans ? e == a && M.classList.add("li_active") : e == d && M.classList.add("li_active"),
                                        (M.innerHTML = e),
                                        M.addEventListener("click", selVerse),
                                        _e.append(M);
                                }
                                eid_v_verse.append(_e),
                                    0 < eid_v_verse.getElementsByClassName("li_active").length &&
                                        setTimeout(() => {
                                            eid_v_verse.querySelector(".li_active").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                                        }, 100),
                                    scrollToVkladkaActive();
                            } catch (e) {
                                console.error("error try-catch. error: ", e);
                            }
                    }
                    0 < eid_v_verse.getElementsByClassName("li_active").length &&
                        setTimeout(() => {
                            null !== eid_v_verse.querySelector(".li_active") && eid_v_verse.querySelector(".li_active").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                        }, 100),
                        scrollToVkladkaActive();
                } catch (e) {
                    console.error("13536. error try-catch. error: ", e);
                }
            else alert("modo old verse. no salta nunca...");
            break;
        default:
            eid_v_book.classList.add("ul_active");
    }
}
async function getRef(n = null, e, s = null) {
    allowUseShowTrans = !0;
    var a = eid_trans1.dataset.trans;
    let o = eid_inpt_nav.dataset.trans;
    null == n || "" == n || "undefined" == n
        ? (n = "" != o && "undefined" != o ? o : a)
        : n != a &&
          "trans1" == eid_inpt_nav.dataset.divtrans &&
          window.innerWidth >= pantallaTabletMinPx &&
          ((a = eid_footerInner.querySelector('button[value="' + n + '"]')),
          eid_s_book.click(),
          document.querySelectorAll("#footerInner button").forEach((e) => {
              e.classList.remove("btn_active");
          }),
          a.classList.add("btn_active"));
    a = eid_inpt_nav.value.trim();
    let i = null,
        l = null,
        d = null,
        _ = null;
    if (
        (1 == a.split(" ").length && ((r = a.split(" ")), null != (r = (i = r[0]).match(/\.\d+/g))) && 1 == r.length && ((r = i.split(".")), (i = r[0] + "."), (l = r[1])),
        a.includes(":") &&
            ((r = a.split(":")),
            (d = r[1]).includes("-") && ((c = d.split("-")), (d = c[0]), (_ = c[1])),
            r[0].includes(".") && (2 == (c = r[0].split(".")).length && ((i = c[0] + "."), (l = c[1])), 3 == c.length) && ((i = c[0] + "." + c[1] + "."), (l = c[2])),
            r[0].includes(" ")) &&
            ((c = r[0].split(" ")), (i = c[0]), (l = c[1])),
        a.includes(",") &&
            ((r = a.split(",")), (d = r[1]).includes("-") && ((c = d.split("-")), (d = c[0]), (_ = c[1])), r[0].includes(".") && ((c = r[0].split(".")), (i = c[0] + "."), (l = c[1])), r[0].includes(" ")) &&
            ((c = r[0].split(" ")), (i = c[0]), (l = c[1])),
        a.includes(" ") && !a.includes(":") && !a.includes(","))
    ) {
        let e = a.split(" ");
        3 < e.length && ((e = e.filter((e) => e)), (i = e[0]), (l = e[1]), (d = e[2]), "-" != e[3] || isNaN(e[4]) || (_ = e[4])),
            3 == e.length && ((d = e[2]).includes("-") && ((r = d.split("-")), (d = r[0]), (_ = r[1])), (l = e[1]), (i = e[0])),
            2 == e.length && ((d = null), (l = e[1]), (i = e[0]));
    }
    if (null != i) {
        let t = n;
        var c = arrFavTransObj.find((e) => e.Translation === t);
        if (void 0 !== c && null != c && "" != c) {
            window.dataBooksBtnOk = c.Books;
            let r = !1;
            for (let t = 0; t < dataBooksBtnOk.length; t++)
                for (let e = 0; e < dataBooksBtnOk[t].ShortNames.length; e++) {
                    var p = dataBooksBtnOk[t].ShortNames[e];
                    if (i.toLowerCase() == p.toLowerCase() || i.toLowerCase() + "." == p.toLowerCase()) {
                        let a = dataBooksBtnOk[t].BookNumber;
                        p = dataBooksBtnOk[t].ShortNames[0];
                        if (((r = !0), (l = null != l ? l : 1) > dataBooksBtnOk[t].ChapterQty && (l = dataBooksBtnOk[t].ChapterQty), window.innerWidth < pantallaTabletMinPx && 1 < document.querySelectorAll(".cols").length)) {
                            let t = eid_trans1.dataset.trans;
                            o = eid_inpt_nav.dataset.trans;
                            var h,
                                m,
                                u = eid_inpt_nav.dataset.divtrans;
                            "" != u &&
                                "trans1" != u &&
                                ((u = arrFavTransObj.find((e) => e.Translation === t)),
                                (h = arrFavTransObj.find((e) => e.Translation === o)),
                                "N" == u.EnglishPsalms && "Y" == h.EnglishPsalms
                                    ? ((m = convertLinkFromEspToRus(a, l, d, _)), (l = m[1]), (d = m[2]), (_ = m[3]))
                                    : "Y" == u.EnglishPsalms && "N" == h.EnglishPsalms && ((m = convertLinkFromRusToEsp(a, l, d, _)), (l = m[1]), (d = m[2]), (_ = m[3])));
                        }
                        if (
                            (eid_inpt_nav.setAttribute("data-book_short_name", p),
                            eid_inpt_nav.setAttribute("data-id_book", a),
                            eid_inpt_nav.setAttribute("data-show_chapter", l),
                            (eid_inpt_nav.value = p),
                            (obj_nav.book_short_name = p),
                            null != l && 0 < parseInt(l) ? ((eid_inpt_nav.value += " " + l), (obj_nav.show_chapter = l), (eid_v_chapter.innerHTML = "")) : ((eid_v_chapter.innerHTML = "selecciona el capítulo"), (obj_nav.show_chapter = l)),
                            "by_text" == modo_fetch_verses_for_cols)
                        ) {
                            if (null != d && 0 < parseInt(d)) (eid_inpt_nav.value += ":" + d), (obj_nav.show_verse = d), eid_inpt_nav.setAttribute("data-show_verse", d), (eid_v_verse.innerHTML = "");
                            else {
                                const g = document.createElement("li");
                                (g.id = "e_virt"),
                                    g.setAttribute("data-show_chapter", 1),
                                    setTimeout(() => {
                                        (allowUseShowTrans = !0), selChapter(g, l);
                                    }, 50);
                            }
                            null != _ && 0 < parseInt(_) && parseInt(d) < parseInt(_)
                                ? ((eid_inpt_nav.value += "-" + _), eid_inpt_nav.setAttribute("data-show_to_verse", _), (obj_nav.show_to_verse = _))
                                : (eid_inpt_nav.setAttribute("data-show_to_verse", ""), (obj_nav.show_to_verse = ""));
                            u = null !== s ? s.split(" ").slice(0, 7).join(" ") : null;
                            addRefToHistNav(n, eid_inpt_nav.value, a, l, d, _, u),
                                null != eid_v_book.querySelector(".li_active") && eid_v_book.querySelector(".li_active").classList.remove("li_active"),
                                null != eid_v_book.querySelector('div[data-id_book="' + a + '"]') && eid_v_book.querySelector('div[data-id_book="' + a + '"]').classList.add("li_active"),
                                window.innerWidth < pantallaTabletMinPx && closeSidebar(),
                                document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                                    var t = 0 < d ? parseInt(d) : 1;
                                    putRefVisibleToHead(`00__${a}__${l}__` + t, 0);
                                }),
                                (allowUseShowTrans = !0),
                                showTrans(a, l, d, _),
                                null == l && null == d && eid_s_chapter.click(),
                                null != l && 0 < parseInt(l) && null == d && eid_s_verse.click(),
                                0 < parseInt(l) && 0 < parseInt(d) && eid_s_verse.click();
                        }
                        if ("by_json" == modo_fetch_verses_for_cols) {
                            if (l && null == d) {
                                const T = document.createElement("li");
                                (T.id = "e_virt"),
                                    T.setAttribute("data-show_chapter", 1),
                                    setTimeout(() => {
                                        (allowUseShowTrans = !0), selChapter(T, l);
                                    }, 50),
                                    null != eid_v_book.querySelector(".li_active") && eid_v_book.querySelector(".li_active").classList.remove("li_active"),
                                    null != eid_v_book.querySelector('div[data-id_book="' + a + '"]') && eid_v_book.querySelector('div[data-id_book="' + a + '"]').classList.add("li_active"),
                                    window.innerWidth < pantallaTabletMinPx && closeSidebar(),
                                    document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                                        var t = 0 < d ? parseInt(d) : 1;
                                        putRefVisibleToHead(`00__${a}__${l}__` + t, 0);
                                    }),
                                    addRefToHistNav(n, eid_inpt_nav.value, a, l, d, _),
                                    (allowUseShowTrans = !0),
                                    showTrans(a, l, d, _),
                                    null == l && null == d && eid_s_chapter.click(),
                                    null != l && 0 < parseInt(l) && null == d && eid_s_verse.click(),
                                    0 < parseInt(l) && 0 < parseInt(d) && eid_s_verse.click();
                            }
                            if (l && null != d && 0 < parseInt(d))
                                try {
                                    var b = `./modules/text/${n}/` + dataBooksBtnOk[t].PathName,
                                        v = new FormData();
                                    v.append("url", "../" + b), v.append("book", a), v.append("chapter", l);
                                    var f = await (await fetch("./php/read_file_get_VerseQty_to_json.php", { method: "POST", body: v })).json();
                                    d > f.VerseQty && (d = f.VerseQty),
                                        (eid_inpt_nav.value += ":" + d),
                                        (obj_nav.show_verse = d),
                                        eid_inpt_nav.setAttribute("data-show_verse", d),
                                        (eid_v_verse.innerHTML = ""),
                                        null != (_ = null != _ && parseInt(_) > f.VerseQty ? f.VerseQty : _) && 0 < parseInt(_) && parseInt(d) < parseInt(_)
                                            ? ((eid_inpt_nav.value += "-" + _), eid_inpt_nav.setAttribute("data-show_to_verse", _), (obj_nav.show_to_verse = _))
                                            : (eid_inpt_nav.setAttribute("data-show_to_verse", ""), (obj_nav.show_to_verse = "")),
                                        null != eid_v_book.querySelector(".li_active") && eid_v_book.querySelector(".li_active").classList.remove("li_active"),
                                        null != eid_v_book.querySelector('div[data-id_book="' + a + '"]') && eid_v_book.querySelector('div[data-id_book="' + a + '"]').classList.add("li_active"),
                                        window.innerWidth < pantallaTabletMinPx && closeSidebar(),
                                        document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                                            var t = 0 < d ? parseInt(d) : 1;
                                            putRefVisibleToHead(`00__${a}__${l}__` + t, 0);
                                        }),
                                        addRefToHistNav(n, eid_inpt_nav.value, a, l, d, _),
                                        (allowUseShowTrans = !0),
                                        showTrans(a, l, d, _),
                                        null == l && null == d && eid_s_chapter.click(),
                                        null != l && 0 < parseInt(l) && null == d && eid_s_verse.click(),
                                        0 < parseInt(l) && 0 < parseInt(d) && eid_s_verse.click();
                                } catch (e) {
                                    console.error("VerseQty. error try-catch. error: ", e);
                                }
                        }
                        break;
                    }
                }
            !r &&
                hay_get_data &&
                openModal(
                    "center",
                    "Aviso Error",
                    `Nada encontrado segun la referencia '<b>${a}</b>' en la traducción '<b>${n}</b>' <br>Selecciona la traducción y la referencia correctas por favor. Por ejemplo: la traducción '<b>RV60</b>' y la referencia '<b>Sal 23:3</b>.'`,
                    "showAviso"
                );
        } else {
            (t = arrFavTrans[0]), (n = arrFavTrans[0]), (eid_inpt_nav.dataset.trans = arrFavTrans[0]);
            var r = `No fue posible encontrar la traducción ${t}. Se te va a mostrar un módulo que existe.`;
            openModal("center", "Aviso Corrección", r, "showAviso"),
                setTimeout(() => {
                    getRef(n);
                }, 5e3);
        }
    }
}
function getRefByHref(e, t = "/", a = 0) {
    eid_trans1.dataset.trans;
    let r = e.split(t),
        n = (r = r.filter((e) => e))[0];
    (e = 0 == a ? r[1] : Number(r[1]) - 1), (t = r[2]);
    let s = r[3],
        o = null,
        i = (r[3].includes("-") && ((s = r[3].split("-")[0]), (o = r[3].split("-")[1])), "" + arrFavTransObj.find((e) => e.Translation === n).Books[e].ShortNames[0] + t + ":" + s);
    null != o && (i += "-" + o), (eid_inpt_nav.value = i), getRef();
}
function getRefByHrefMB(o, e, t = " ", a) {
    let i = eid_trans1.dataset.trans,
        r = (e = e.replace("B:", "")).split(t),
        l = ((r = r.filter((e) => e)), Number(r[0]));
    let d = r[1].split(":"),
        _ = Number(d[0]),
        c = d[1];
    !(async function () {
        let e = await convertBookIndex(l, "mb_to_bq"),
            t = null;
        d[1].includes("-") && ((c = d[1].split("-")[0]), (t = d[1].split("-")[1]));
        var a = arrFavTransObj.find((e) => e.Translation === i),
            r = arrFavTransObj.find((e) => e.Translation === o);
        {
            var n;
            window.innerWidth >= pantallaTabletMinPx &&
                ("N" == a.EnglishPsalms && "Y" == r.EnglishPsalms
                    ? ((n = convertLinkFromEspToRus(e, _, c, t)), (_ = n[1]), (c = n[2]), (t = n[3]))
                    : "Y" == a.EnglishPsalms && "N" == r.EnglishPsalms && ((n = convertLinkFromRusToEsp(e, _, c, t)), (_ = n[1]), (c = n[2]), (t = n[3])));
        }
        let s = "" + r.Books[e].ShortNames[0] + _ + ":" + c;
        null != t && (s += "-" + t);
        (eid_inpt_nav.value = s), getRef();
    })();
}
function getRefByBibleRef(e) {
    var t = eid_trans1.dataset.trans;
    (eid_inpt_nav.dataset.trans = t), (eid_inpt_nav.value = e.trim()), getRef();
}
function getRefByCodeWithoutTrans(e, t, a) {
    getRefByCode(eid_trans1.dataset.trans + `__${e}__${t}__` + a);
}
async function getRefByCode(e, t = "__", a = 0) {
    var r = eid_trans1.dataset.trans;
    let n = e.split(t);
    var s,
        e = (n = n.filter((e) => e))[0],
        t = 0 == a ? n[1] : Number(n[1]) - 1,
        a = n[2];
    let o = n[3],
        i = null;
    if (
        (n[3].includes("-") && ((o = n[3].split("-")[0]), (i = n[3].split("-")[1])),
        e != r &&
            ((s = (r = eid_footerInner.querySelector('button[value="' + e + '"]')).getAttribute("ep")),
            (eid_trans1.dataset.trans = e),
            (eid_trans1.dataset.base_ep = s),
            (eid_trans1.querySelector(".colsHeadInner .partDesk .desk_trans").innerHTML = r.innerHTML),
            eid_s_book.click(),
            document.querySelectorAll("#footerInner button").forEach((e) => {
                e.classList.remove("btn_active");
            }),
            r.classList.add("btn_active")),
        null != t)
    )
        try {
            var l = (await (await fetch(`./modules/text/${e}/bibleqt.json`)).json()).Books[t].ShortNames[0];
            eid_inpt_nav.setAttribute("data-book_short_name", l),
                eid_inpt_nav.setAttribute("data-id_book", t),
                eid_inpt_nav.setAttribute("data-show_chapter", a),
                eid_inpt_nav.setAttribute("data-show_verse", o),
                (eid_inpt_nav.value = l),
                null != a && 0 < parseInt(a) && ((eid_inpt_nav.value += " " + a), (eid_v_chapter.innerHTML = "")),
                null != o && 0 < parseInt(o) && ((eid_inpt_nav.value += ":" + o), (eid_v_verse.innerHTML = "")),
                null != i && 0 < parseInt(i) && parseInt(o) < parseInt(i) ? ((eid_inpt_nav.value += "-" + i), eid_inpt_nav.setAttribute("data-show_to_verse", i)) : eid_inpt_nav.setAttribute("data-show_to_verse", ""),
                0 < parseInt(a) && 0 < parseInt(o) && eid_s_verse.click(),
                null != eid_v_book.querySelector(".li_active")
                    ? (eid_v_book.querySelector(".li_active").classList.remove("li_active"), eid_v_book.querySelector('li[data-id_book="' + t + '"]').classList.add("li_active"))
                    : console.log("da error luego en catch(): Cannot read properties of null (reading 'classList')"),
                (allowUseShowTrans = !0),
                showTrans(t, a, o, i);
        } catch (e) {
            console.error("error try-catch. error: ", e);
        }
}
async function getRefByCodeForFind(e) {
    var t = eid_trans1.dataset.trans,
        e = e.split("__"),
        a = e[0],
        r = e[1],
        n = e[2];
    let s = e[3],
        o = null;
    if (
        (e[3].includes("-") && ((s = e[3].split("-")[0]), (o = e[3].split("-")[1])),
        a != t &&
            ((t = (e = eid_footerInner.querySelector('button[value="' + a + '"]')).getAttribute("ep")),
            (eid_trans1.dataset.trans = a),
            (eid_trans1.dataset.base_ep = t),
            (eid_trans1.querySelector(".colsHeadInner .partDesk .desk_trans").innerHTML = e.innerHTML),
            eid_s_book.click(),
            document.querySelectorAll("#footerInner button").forEach((e) => {
                e.classList.remove("btn_active");
            }),
            e.classList.add("btn_active")),
        null != r)
    )
        try {
            var i = (await (await fetch(`./modules/text/${a}/bibleqt.json`)).json()).Books[r].ShortNames[0];
            eid_inpt_nav.setAttribute("data-id_book", r),
                eid_inpt_nav.setAttribute("data-book_short_name", i),
                eid_inpt_nav.setAttribute("data-show_chapter", n),
                eid_inpt_nav.setAttribute("data-show_verse", s),
                (eid_inpt_nav.value = i),
                null != n && 0 < parseInt(n) && ((eid_inpt_nav.value += " " + n), (eid_v_chapter.innerHTML = "")),
                null != s && 0 < parseInt(s) && ((eid_inpt_nav.value += ":" + s), (eid_v_verse.innerHTML = "")),
                null != o && 0 < parseInt(o) && parseInt(s) < parseInt(o) ? ((eid_inpt_nav.value += "-" + o), eid_inpt_nav.setAttribute("data-show_to_verse", o)) : eid_inpt_nav.setAttribute("data-show_to_verse", ""),
                0 < parseInt(n) && 0 < parseInt(s) && eid_s_verse.click(),
                eid_v_book.querySelector(".li_active").classList.remove("li_active"),
                eid_v_book.querySelector('li[data-id_book="' + r + '"]').classList.add("li_active"),
                (allowUseShowTrans = !0),
                showTrans(r, n, s, o);
        } catch (e) {
            console.error("error try-catch. error: ", e);
        }
}
function checkKey(e) {
    switch ((e = e || window.event).keyCode) {
        case 13:
            if (eid_btn_nav.classList.contains("btn_active")) {
                let e = eid_btn_ok;
                e.click(),
                    e.classList.add("btn_ok_active"),
                    setTimeout(() => {
                        e.classList.remove("btn_ok_active");
                    }, 100);
            }
            eid_btn_find.classList.contains("btn_active") && eid_btn_ok_find.click();
            break;
        case 27:
            eid_btn_nav.classList.contains("btn_active") && clear_inpt("nav"), eid_btn_find.classList.contains("btn_active") && stopFindWords(), eid_btn_strong.classList.contains("btn_active") && clear_inpt("strong");
    }
}
function clear_inpt(e) {
    e = document.getElementById("inpt_" + e);
    (e.value = ""), e.focus();
}
function isInViewport(e) {
    e = e.getBoundingClientRect();
    return 0 <= e.top && 0 <= e.left && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function selectModule2(e) {
    let n = e;
    if ("DIV" === n.tagName) {
        eid_bl_modalFullInner.innerHTML = "";
        let r;
        (r = n.dataset.trans),
            arrFavTransObj.forEach((e, t) => {
                var a = document.createElement("p");
                (a.className = e.Translation == r ? "cl_trans cl_trans_active" : "cl_trans"),
                    (a.innerHTML = `<span class="sh_n">${arrFavTransObj[t].BibleShortName}</span>`),
                    (a.innerHTML += `<span class="la_n">${arrFavTransObj[t].BibleName}</span>`),
                    (a.onclick = (e) => {
                        changeModule2(n, arrFavTransObj[t].Translation, arrFavTransObj[t].BibleShortName, arrFavTransObj[t].EnglishPsalms), closeModal(null, !0);
                    }),
                    eid_bl_modalFullInner.appendChild(a);
            }),
            null != document.querySelector(".cl_trans_active") && document.querySelector(".cl_trans_active").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
}
function getObjTransByName(t) {
    return void 0 !== arrFavTransObj && arrFavTransObj.find((e) => e.Translation === t);
}
function selectTab() {
    (eid_bl_modalFullInner.innerHTML = ""),
        arrTabs.forEach((t, a) => {
            var e = t.str_trans.includes(",") ? t.str_trans.split(",") : t.str_trans.split();
            if ("" == e) return !1;
            let r = [];
            e.forEach((t) => {
                t = t.trim();
                var e = arrFavTransObj.find((e) => e.Translation === t);
                r.push(e.BibleShortName);
            });
            var e = r.join(", "),
                n = document.createElement("p"),
                s = ((n.className = "cl_tab"), arrTabs[a].className.includes("tab_active") && (n.className += " cl_tab_active"), arrFavTransObj.find((e) => e.Translation === t.ref_trans)),
                s =
                    ((n.innerHTML = `   <span class="sh_nl">${a + 1}) </span> <span class="sh_n"> <span class="sh_tr">${s.BibleShortName}</span>  <span class="sh_ref">${
                        arrTabs[a].ref
                    }</span>   </span>   <span class="sh_cuant" title="Translations to compare: ${r.length}">(${r.length})</span>   <span class="la_n">${e}</span>  `),
                    document.createElement("span")),
                e = ((s.className = "btn_tab_x"), (s.innerHTML = "&#10005;"), arrTabs[a].id);
            (s.dataset.id_tab_to_del = e),
                (s.onclick = (e) => {
                    var t = e.currentTarget.dataset.id_tab_to_del;
                    closeTab(document.querySelector(`#${t} button`), e),
                        1 != document.querySelectorAll(".cl_tab").length ? e.currentTarget.parentElement.remove() : openModal("center", "Aviso Pestañas", "No se puede eliminar la única pestaña.", "showAviso");
                }),
                n.append(s),
                (n.onclick = function () {
                    var e;
                    window.innerWidth < pantallaTabletMinPx && ((positionShow = "col"), eid_btn_changePositionShowModal.click()),
                        void 0 !== arrTabs[a] && ((e = document.getElementById(arrTabs[a].id)).click(), e.scrollIntoView()),
                        closeModal(null, !0),
                        updateArrTabs();
                }),
                eid_bl_modalFullInner.appendChild(n);
        });
}
function addListenerModule() {
    document.querySelectorAll(".colsHead").forEach((e, t) => {
        0 < t && e.addEventListener("click", selectModule2);
    });
}
(eid_vert_line.onmousedown = function () {
    isMouseDown = !0;
}),
    (eid_wrapper.onmousemove = function (e) {
        isMouseDown && (eid_sidebar.removeAttribute("class"), (eid_sidebar.style.width = e.pageX - 3 + "px"));
    }),
    (eid_vert_line.onmouseup = function () {
        (isMouseDown = !1), mySizeWindow(), mySizeVerse();
    }),
    (eid_vert_line.ontouchstart = function () {
        isMouseDown = !0;
    }),
    (eid_wrapper.ontouchmove = function (e) {
        isMouseDown && (eid_sidebar.removeAttribute("class"), (eid_sidebar.style.width = e.touches[0].pageX - 3 + "px"));
    }),
    (eid_vert_line.ontouchend = function () {
        (isMouseDown = !1), mySizeWindow(), mySizeVerse();
    }),
    window.addEventListener("load", function (e) {
        mySizeWindow(), mySizeVerse(), mySizeVersesCompare(), enableDisableResp1200();
    }),
    window.addEventListener("resize", function (e) {
        checkPositionShowForMob(), mySizeWindow(), mySizeVerse(), mySizeVersesCompare(), enableDisableResp1200();
    });
let go_to_hist_item = 0;
function hist(t) {
    if (0 < arr_hist_nav.length) {
        let e = document.querySelectorAll(".wr_hist_inner p");
        var a;
        e.forEach((e) => {
            e.classList.remove("c_red");
        }),
            "prev" == t
                ? ++go_to_hist_item < arr_hist_nav.length
                    ? ((a = arr_hist_nav[go_to_hist_item]),
                      e[go_to_hist_item].classList.add("c_red"),
                      setTimeout(() => {
                          e[go_to_hist_item].scrollIntoView();
                      }, 100),
                      onclick_p_nav(a))
                    : (go_to_hist_item = arr_hist_nav.length)
                : "next" == t &&
                  (0 <= --go_to_hist_item
                      ? ((a = arr_hist_nav[go_to_hist_item]),
                        e[go_to_hist_item].classList.add("c_red"),
                        setTimeout(() => {
                            e[go_to_hist_item].scrollIntoView();
                        }, 100),
                        onclick_p_nav(a))
                      : (go_to_hist_item = 0));
    }
}
async function bookGo(e) {
    allowUseShowTrans = !0;
    var a = "" != eid_inpt_nav.getAttribute("data-id_book") ? eid_inpt_nav.getAttribute("data-id_book") : 0,
        t =
            ((Translation = ("" != eid_inpt_nav.dataset.trans ? eid_inpt_nav : eid_trans1).dataset.trans),
            eid_inpt_nav.setAttribute("data-show_chapter", "1"),
            eid_inpt_nav.setAttribute("data-show_verse", ""),
            document.querySelectorAll("#v_verse .v_li").forEach((e) => {
                e.classList.remove("li_active");
            }),
            (obj_nav.show_chapter = 1),
            (obj_nav.show_verse = ""),
            arrFavTransObj.find((e) => e.Translation === Translation));
    if (void 0 !== t && null != t && "" != t)
        try {
            var r = t;
            if ("next" == e) {
                let t = a;
                (t = a == parseInt(r.BookQty) - 1 ? 0 : parseInt(a) + 1),
                    eid_inpt_nav.setAttribute("data-book_short_name", r.Books[t].ShortNames[0]),
                    eid_inpt_nav.setAttribute("data-id_book", t),
                    eid_inpt_nav.setAttribute("data-show_chapter", 1),
                    (eid_inpt_nav.value = r.Books[t].ShortNames[0] + " 1"),
                    document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                        putRefVisibleToHead(`00__${t}__1__1`, 0);
                    }),
                    (obj_nav.book_short_name = r.Books[t].ShortNames[0]),
                    (obj_nav.id_book = t),
                    (obj_nav.show_chapter = 1),
                    sel(eid_s_chapter, "ch", 1);
                var n = r.Books[t].ShortNames[0] + " 1";
                addRefToHistNav(Translation, n, t, 1, null, null), (allowUseShowTrans = !0), showTrans(t, 1);
            }
            if ("prev" == e) {
                let t = a;
                (t = 0 == a ? parseInt(r.BookQty) - 1 : parseInt(a) - 1),
                    eid_inpt_nav.setAttribute("data-book_short_name", r.Books[t].ShortNames[0]),
                    eid_inpt_nav.setAttribute("data-id_book", t),
                    eid_inpt_nav.setAttribute("data-show_chapter", 1),
                    (eid_inpt_nav.value = r.Books[t].ShortNames[0] + " 1"),
                    document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                        putRefVisibleToHead(`00__${t}__1__1`, 0);
                    }),
                    (obj_nav.book_short_name = r.Books[t].ShortNames[0]),
                    (obj_nav.id_book = t),
                    (obj_nav.show_chapter = 1),
                    sel(eid_s_chapter, "ch", 1);
                var s = r.Books[t].ShortNames[0] + " 1";
                addRefToHistNav(Translation, s, t, 1, null, null), (allowUseShowTrans = !0), showTrans(t, 1);
            }
        } catch (e) {
            console.error("error try-catch. error: ", e);
        }
    else
        try {
            var o = `./modules/text/${Translation}/bibleqt.json`,
                i = await (await fetch(o)).json();
            if ("next" == e) {
                let t = a;
                (t = a == parseInt(i.BookQty) - 1 ? 0 : parseInt(a) + 1),
                    eid_inpt_nav.setAttribute("data-book_short_name", i.Books[t].ShortNames[0]),
                    eid_inpt_nav.setAttribute("data-id_book", t),
                    eid_inpt_nav.setAttribute("data-show_chapter", 1),
                    (eid_inpt_nav.value = i.Books[t].ShortNames[0] + " 1"),
                    document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                        putRefVisibleToHead(`00__${t}__1__1`, 0);
                    }),
                    (obj_nav.book_short_name = i.Books[t].ShortNames[0]),
                    (obj_nav.id_book = t),
                    (obj_nav.show_chapter = 1),
                    sel(eid_s_chapter, "ch", 1);
                var l = i.Books[t].ShortNames[0] + " 1";
                addRefToHistNav(Translation, l, t, 1, null, null), (allowUseShowTrans = !0), showTrans(t, 1);
            }
            if ("prev" == e) {
                let t = a;
                (t = 0 == a ? parseInt(i.BookQty) - 1 : parseInt(a) - 1),
                    eid_inpt_nav.setAttribute("data-book_short_name", i.Books[t].ShortNames[0]),
                    eid_inpt_nav.setAttribute("data-id_book", t),
                    eid_inpt_nav.setAttribute("data-show_chapter", 1),
                    (eid_inpt_nav.value = i.Books[t].ShortNames[0] + " 1"),
                    document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                        putRefVisibleToHead(`00__${t}__1__1`, 0);
                    }),
                    (obj_nav.book_short_name = i.Books[t].ShortNames[0]),
                    (obj_nav.id_book = t),
                    (obj_nav.show_chapter = 1),
                    sel(eid_s_chapter, "ch", 1);
                var d = i.Books[t].ShortNames[0] + " 1";
                addRefToHistNav(Translation, d, t, 1, null, null), (allowUseShowTrans = !0), showTrans(t, 1);
            }
        } catch (e) {
            console.error("error try-catch. error: ", e);
        }
}
function scrollTopCero() {
    document.querySelectorAll(".colsInner").forEach((e) => {
        e.scrollTop = 0;
    });
}
async function chapterGo(e) {
    allowUseShowTrans = !0;
    var r = "" != eid_inpt_nav.getAttribute("data-id_book") ? eid_inpt_nav.getAttribute("data-id_book") : 0,
        n = "" != eid_inpt_nav.getAttribute("data-show_chapter") ? eid_inpt_nav.getAttribute("data-show_chapter") : 1,
        s =
            ((Translation = ("" != eid_inpt_nav.dataset.trans ? eid_inpt_nav : eid_trans1).dataset.trans),
            eid_inpt_nav.setAttribute("data-show_verse", ""),
            document.querySelectorAll("#v_verse .v_li").forEach((e) => {
                e.classList.remove("li_active");
            }),
            (obj_nav.show_verse = ""),
            scrollTopCero(),
            arrFavTransObj.find((e) => e.Translation === Translation));
    if (void 0 !== s && null != s && "" != s) {
        if ("next" == e) {
            let t = r,
                a = n;
            (a = n == s.Books[r].ChapterQty ? ((t = r == parseInt(s.BookQty) - 1 ? 0 : parseInt(r) + 1), 1) : parseInt(n) + 1),
                eid_inpt_nav.setAttribute("data-book_short_name", s.Books[t].ShortNames[0]),
                eid_inpt_nav.setAttribute("data-id_book", t),
                eid_inpt_nav.setAttribute("data-show_chapter", a),
                (eid_inpt_nav.value = s.Books[t].ShortNames[0] + " " + a),
                document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                    putRefVisibleToHead(`00__${t}__${a}__1`, 0);
                }),
                (obj_nav.book_short_name = s.Books[t].ShortNames[0]),
                (obj_nav.id_book = t),
                (obj_nav.show_chapter = a),
                setTimeout(() => {
                    sel(eid_s_verse, "v", Translation);
                }, 50);
            var o = s.Books[t].ShortNames[0] + " " + a;
            addRefToHistNav(Translation, o, t, a, null, null), (allowUseShowTrans = !0), showTrans(t, a);
        }
        if ("prev" == e) {
            let t = r,
                a = n;
            (a = 1 == n ? ((t = 0 == r ? parseInt(s.BookQty) - 1 : parseInt(r) - 1), parseInt(s.Books[t].ChapterQty)) : parseInt(n) - 1),
                eid_inpt_nav.setAttribute("data-book_short_name", s.Books[t].ShortNames[0]),
                eid_inpt_nav.setAttribute("data-id_book", t),
                eid_inpt_nav.setAttribute("data-show_chapter", a),
                (eid_inpt_nav.value = s.Books[t].ShortNames[0] + " " + a),
                document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                    putRefVisibleToHead(`00__${t}__${a}__1`, 0);
                }),
                (obj_nav.book_short_name = s.Books[t].ShortNames[0]),
                (obj_nav.id_book = t),
                (obj_nav.show_chapter = a),
                setTimeout(() => {
                    sel(eid_s_verse, "v", Translation);
                }, 50);
            o = s.Books[t].ShortNames[0] + " " + a;
            addRefToHistNav(Translation, o, t, a, null, null), (allowUseShowTrans = !0), showTrans(t, a);
        }
    } else
        try {
            var t = `./modules/text/${Translation}/bibleqt.json`,
                i = await (await fetch(t)).json();
            if ("next" == e) {
                let t = r,
                    a = n;
                (a = n == i.Books[r].ChapterQty ? ((t = r == parseInt(i.BookQty) - 1 ? 0 : parseInt(r) + 1), 1) : parseInt(n) + 1),
                    eid_inpt_nav.setAttribute("data-book_short_name", i.Books[t].ShortNames[0]),
                    eid_inpt_nav.setAttribute("data-id_book", t),
                    eid_inpt_nav.setAttribute("data-show_chapter", a),
                    (eid_inpt_nav.value = i.Books[t].ShortNames[0] + " " + a),
                    document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                        putRefVisibleToHead(`00__${t}__${a}__1`, 0);
                    }),
                    (obj_nav.book_short_name = i.Books[t].ShortNames[0]),
                    (obj_nav.id_book = t),
                    (obj_nav.show_chapter = a),
                    sel(eid_s_verse, "v", Translation);
                var l = i.Books[t].ShortNames[0] + " " + a;
                addRefToHistNav(Translation, l, t, a, null, null), (allowUseShowTrans = !0), showTrans(t, a);
            }
            if ("prev" == e) {
                let t = r,
                    a = n;
                (a = 1 == n ? ((t = 0 == r ? parseInt(i.BookQty) - 1 : parseInt(r) - 1), parseInt(i.Books[t].ChapterQty)) : parseInt(n) - 1),
                    eid_inpt_nav.setAttribute("data-book_short_name", i.Books[t].ShortNames[0]),
                    eid_inpt_nav.setAttribute("data-id_book", t),
                    eid_inpt_nav.setAttribute("data-show_chapter", a),
                    (eid_inpt_nav.value = i.Books[t].ShortNames[0] + " " + a),
                    document.querySelectorAll(".partMob .mob_sh_link").forEach((e) => {
                        putRefVisibleToHead(`00__${t}__${a}__1`, 0);
                    }),
                    (obj_nav.book_short_name = i.Books[t].ShortNames[0]),
                    (obj_nav.id_book = t),
                    (obj_nav.show_chapter = a),
                    sel(eid_s_verse, "v", Translation);
                var d = i.Books[t].ShortNames[0] + " " + a;
                addRefToHistNav(Translation, d, t, a, null, null), (allowUseShowTrans = !0), showTrans(t, a);
            }
        } catch (e) {
            console.error("error try-cach. error: ", e);
        }
}
function showTab(t, a) {
    switch (
        (document.querySelectorAll(".wr_btns_scr button").forEach((e) => {
            e == t ? e.classList.add("btn_active") : e.classList.remove("btn_active");
        }),
        document.querySelectorAll(".vklads").forEach((e) => {
            e.id == "vklad_" + a ? (e.style.display = "block") : (e.style.display = "none");
        }),
        a)
    ) {
        case "nav":
            mySizeNav();
            break;
        case "find":
            mySizeFind();
            break;
        case "tsk":
            mySizeTsk();
            break;
        case "strong":
            mySizeStrong();
            break;
        case "markers":
            mySizeMarkers();
            break;
        default:
            mySizeNav();
    }
}
let delay2 = 500;
function goToLink(e, t, a = null) {
    getRef(e, (eid_inpt_nav.value = t), a);
}
function goToLinkFromFind(e, t) {
    (eid_inpt_nav.value = t), (eid_vklad_tsk.style.display = "none"), getRef(e);
}
function puntosInterval() {
    const e = document.querySelector(".puntos");
    let t = 0;
    null != e &&
        setInterval(() => {
            (e.innerHTML += "."), 4 == ++t && ((t = 0), (e.innerHTML = ""));
        }, 500);
}
function showTabMob(e, t, a) {
    openSidebar(a), showTab(document.querySelector(e), t);
}
function convertLinkFromEspToRus(e, t, a, r = null) {
    var n = (e = parseInt(e));
    let s = (t = null != t ? parseInt(t) : null),
        o = (a = parseInt(a)),
        i = (r = parseInt(r));
    switch (e) {
        case 3:
            12 == t && 16 == a && ((s = 13), (o = 1)), 13 == t && ((o += 1), (i += 1));
            break;
        case 5:
            6 == t && (1 == a ? ((s = 5), (o = 16)) : (--o, --i));
            break;
        case 8:
            23 == t && 29 == a && ((s = 24), (o = 1)), 24 == t && ((o += 1), (i += 1));
            break;
        case 17:
            40 == t && (1 <= a && a <= 5 && ((s = 39), (o += 30), 35 <= (i += 30)) && (i = 35), 6 <= a) && a <= 24 && ((s = 40), (o -= 5), (i -= 5)),
                41 == t && (1 <= a && a <= 8 && ((s = 40), (o += 19), (i += 19)), 9 <= a) && a <= 34 && ((s = 41), (o -= 8), (i -= 8));
            break;
        case 18:
            3 <= t && t <= 9 && ((o += 1), (i += 1)),
                10 == t && ((s = 9), (o += 21), (i += 21)),
                (11 == t ||
                    (14 <= t && t <= 17) ||
                    (23 <= t && t <= 29) ||
                    (32 <= t && t <= 33) ||
                    35 == t ||
                    37 == t ||
                    43 == t ||
                    50 == t ||
                    66 == t ||
                    (71 <= t && t <= 74) ||
                    (78 <= t && t <= 79) ||
                    82 == t ||
                    86 == t ||
                    87 == t ||
                    91 == t ||
                    (93 <= t && t <= 101) ||
                    (103 <= t && t <= 107) ||
                    (109 <= t && t <= 114) ||
                    (117 <= t && t <= 146)) &&
                    --s,
                (12 == t ||
                    (18 <= t && t <= 22) ||
                    (30 <= t && t <= 31) ||
                    34 == t ||
                    36 == t ||
                    (38 <= t && t <= 42) ||
                    (44 <= t && t <= 49) ||
                    53 == t ||
                    (55 <= t && t <= 59) ||
                    (61 <= t && t <= 65) ||
                    (67 <= t && t <= 70) ||
                    (75 <= t && t <= 77) ||
                    (80 <= t && t <= 81) ||
                    (83 <= t && t <= 85) ||
                    (88 <= t && t < 90) ||
                    92 == t ||
                    102 == t ||
                    108 == t) &&
                    (--s, (o += 1), (i += 1)),
                13 == t && (--s, (o += 1), (i += 1), 6 == a && (o = 6), 6 == r) && (i = 6),
                ((51 <= t && t <= 52) || 54 == t || 60 == t) && (--s, (o += 2), (i += 2)),
                90 == t && (--s, a <= 5) && ((o += 1), (i += 1)),
                115 == t && ((s -= 2), (o += 8), (i += 8)),
                116 == t && (a <= 9 && (s -= 2), 10 <= a) && (--s, (o -= 9), (i -= 9)),
                147 == t && (a <= 11 && --s, 12 <= a) && ((o -= 11), (i -= 11));
            break;
        case 19:
            break;
        case 21:
            1 == t && 1 < a && (--o, --i), 6 == t && 13 == a && ((s = 7), (o = 1), (i = 1)), 7 == t && ((o += 1), (i += 1));
            break;
        case 22:
            3 == t && 20 <= a && (--o, --i);
            break;
        case 26:
            4 == t && (a <= 3 && ((s = 3), (o += 30), (i += 30)), 4 <= a) && ((o -= 3), (i -= 3));
            break;
        case 27:
            13 == t && 16 == a && ((s = 14), (o = 1)), 14 == t && ((o += 1), (i += 1));
            break;
        case 31:
            1 == t && 17 == a && ((s = 2), (o = 1)), 2 == t && ((o += 1), (i += 1));
            break;
        case 44:
            16 == t && 25 <= a && ((s = 14), --o, --i);
            break;
        case 46:
            13 == t && 13 <= a && (--o, --i);
    }
    return (i = isNaN(i) ? null : i), [n, s, o, i];
}
async function getStrongNumberVersion1(t, e = null, a = null) {
    let n, s, o;
    var r;
    (t.includes('<b class="f_red">') || t.includes("</b>")) && (t = (t = t.replace('<b class="f_red">', "")).replace("</b>", "")),
        window.innerWidth < pantallaTabletMinPx && openSidebar(document.querySelector(".btnMenu")),
        (o =
            t.includes("H") || t.includes("G")
                ? ((r = t.substr(0, 1)), (n = parseInt(t.substr(1))), (s = t), "G" == r ? "greek.htm" : "hebrew.htm")
                : ((n = parseInt(t)), "Grk" == e ? ((s = "G" + n), "greek.htm") : ((s = "H" + n), "hebrew.htm")));
    try {
        var i = "./modules/text/strongs/" + o,
            l = (await (await fetch(i)).text()).split("<h4>")[n + 1].split("</h4>"),
            d = l[0],
            _ = l[1],
            c = ((eid_strong_body.innerHTML = ""), showTab(eid_btn_strong, "strong"), document.createElement("span")),
            p = ((c.className = "hist_strong"), c.setAttribute("onclick", "getStrongNumber('" + s + "')"), (c.innerHTML = s), document.querySelectorAll(".hist_strong")),
            h = p[0],
            m = (((void 0 === h && 0 == p.length) || h.innerHTML != s) && eid_strong_head.prepend(c), document.createElement("span"));
        (m.className = "num_strong"), (m.innerHTML = s + ' <span class="f_r">' + d + "</span>");
        let e = _.split(" "),
            r = [];
        (e = e.filter((e) => e)).forEach((e, t, a) => {
            parseInt(e) &&
                (e =
                    void 0 !== a[t + 2] && a[t + 2].includes("BQTHeb")
                        ? '<span class="sp_strong Heb">' + e + "</span>"
                        : void 0 !== a[t + 2] && a[t + 2].includes("BQTGrk")
                        ? '<span class="sp_strong Grk">' + e + "</span>"
                        : '<span class="sp_strong noLink">' + e + "</span>"),
                r.push(e);
        });
        var u = r.join(" "),
            b = document.createElement("span"),
            v = ((b.className = "text_strong"), (b.innerHTML = u), document.createElement("p")),
            f =
                ((v.className = "p_v"),
                (v.innerHTML = "Найти стихи с этим номером."),
                (v.onclick = function () {
                    showTab(btn_find, "find"),
                        null != a && "Y" == a
                            ? ((eid_inpt_find.value = s),
                              (eid_cbox1.checked = !1),
                              (eid_cbox2.checked = !1),
                              (eid_cbox3.checked = !1),
                              (eid_cbox4.checked = !1),
                              (eid_cbox5.checked = !1),
                              (eid_cbox6.checked = !1),
                              (eid_cbox7.checked = !0),
                              findWords(s))
                            : ((eid_inpt_find.value = t).includes("H") || t.includes("G")
                                  ? ((eid_cbox1.checked = !1), (eid_cbox2.checked = !1), (eid_cbox3.checked = !1), (eid_cbox4.checked = !1), (eid_cbox5.checked = !1), (eid_cbox6.checked = !1), (eid_cbox7.checked = !0))
                                  : ((eid_cbox1.checked = !1), (eid_cbox2.checked = !1), (eid_cbox3.checked = !1), (eid_cbox4.checked = !0), (eid_cbox5.checked = !1), (eid_cbox6.checked = !1), (eid_cbox7.checked = !1)),
                              findWords(t));
                }),
                eid_strong_body.append(v),
                document.createElement("p"));
        f.append(m),
            f.append(b),
            eid_strong_body.append(f),
            void 0 !== u &&
                u.includes("sp_strong Heb") &&
                document.querySelectorAll(".sp_strong.Heb").forEach((e) => {
                    e.addEventListener("click", function () {
                        getStrongNumber(e.innerHTML, "Heb");
                    });
                }),
            void 0 !== u &&
                u.includes("sp_strong Grk") &&
                document.querySelectorAll(".sp_strong.Grk").forEach((e) => {
                    e.addEventListener("click", function () {
                        getStrongNumber(e.innerHTML, "Grk");
                    });
                }),
            mySizeStrong();
    } catch (e) {
        console.error("error try-catch strong. error: ", e);
    }
}
function getStrongNumber(e, t = null, a = null) {
    (e = e.toUpperCase()), getStrongNumberVersion2(e, t, a);
}
function cboxChange(e) {
    "cbox1" == e.id && eid_cbox1.checked && ((eid_cbox2.checked = !1), (eid_cbox3.checked = !1)),
        "cbox2" == e.id && eid_cbox2.checked && ((eid_cbox1.checked = !1), (eid_cbox3.checked = !1)),
        "cbox3" == e.id && eid_cbox3.checked && ((eid_cbox1.checked = !1), (eid_cbox2.checked = !1), (eid_cbox4.checked = !1), (eid_cbox5.checked = !1)),
        "cbox4" == e.id && eid_cbox3.checked && (eid_cbox3.checked = !1),
        "cbox7" == e.id && eid_cbox7.checked && ((eid_cbox1.checked = !1), (eid_cbox2.checked = !1), (eid_cbox3.checked = !1), (eid_cbox4.checked = !1), (eid_cbox5.checked = !1), (eid_cbox6.checked = !1));
}
function stopFindWords() {
    eid_btn_ok_stop.classList.remove("d-block"), eid_btn_ok_stop.classList.add("d-none"), eid_btn_ok_find.classList.remove("d-none"), eid_btn_ok_find.classList.add("d-block"), (window.doFind = !1);
}
async function guardWordsFind(e) {
    var t = document.createElement("p");
    if (((t.className = "pf"), (t.innerHTML = eid_inpt_find.value.trim()), 0 == document.querySelectorAll(".pf").length || e != document.querySelectorAll(".pf")[0].innerText))
        try {
            var a = new FormData();
            a.append("words", e);
            await (await fetch("./app/guardWordsFind.php", { method: "POST", body: a })).text();
        } catch (e) {
            console.error("error try-catch de guard. error: ", e);
        }
}
async function getGuardWordsFind() {
    try {
        var e = await (await fetch("./app/guardWordsFind_file.json")).json();
        (eid_wr_hist_find.innerHTML = "") != e &&
            e.forEach((e, t) => {
                0 == t && (eid_inpt_find.value = e.words);
                t = document.createElement("p");
                (t.className = "pf"),
                    (t.title = e.fecha),
                    (t.onclick = function () {
                        (eid_inpt_find.value = e.words), close_hist_find();
                    }),
                    (t.innerHTML = e.words),
                    eid_wr_hist_find.append(t);
            });
    } catch (e) {
        console.error("error try-catch. error: ", e);
    }
}
async function findWords(o) {
    const i = eid_wr_find_tabs.querySelector(".find_tab_active");
    eid_btn_ok_find.classList.remove("d-block"), eid_btn_ok_find.classList.add("d-none"), eid_btn_ok_stop.classList.remove("d-none"), eid_btn_ok_stop.classList.add("d-block"), (window.doFind = !0);
    let l = "*" != eid_limit.value ? parseInt(eid_limit.value) : "*",
        t = null,
        d = null,
        e = null;
    switch (eid_gde.value) {
        case "TB":
            (t = 0), (d = 77 == eid_v_book.querySelectorAll(".v_li").length ? 76 : 65);
            break;
        case "AT":
            (t = 0), (d = 38);
            break;
        case "NT":
            (t = 39), (d = 65);
            break;
        case "M":
            (t = 0), (d = 4);
            break;
        case "Hist":
            (t = 5), (d = 16);
            break;
        case "Poet":
            (t = 17), (d = 21);
            break;
        case "Prof":
            (t = 22), (d = 38);
            break;
        case "ProfB":
            (t = 22), (d = 26);
            break;
        case "ProfM":
            (t = 27), (d = 38);
            break;
        case "EvActs":
            (t = 39), (d = 43);
            break;
        case "EpPablo":
            (t = 44), (d = 57);
            break;
        case "EpSoborn":
            (t = 58), (d = 65);
            break;
        case "EpApoc":
            (t = 44), (d = 65);
            break;
        case "Apocrif":
            (t = 66), (d = 76);
            break;
        default:
            e = parseInt(eid_gde.value);
    }
    null != e && ((t = e), (d = e)), (eid_find_result.innerHTML = "");
    var a = eid_wr_find_res_blocks.querySelector(".find_res_block_active");
    if (((a.innerHTML = ""), (window.res_show = "") == (o = o.trim()))) return ((n = document.createElement("p")).className = "prim"), (n.innerHTML = "Введите слово или словосочетание для поиска, пожалуйста."), eid_find_body.append(n), !1;
    close_hist_find();
    let f = o,
        g = f.split(" "),
        T = ((g = g.filter((e) => e)), eid_cbox4.checked ? "Y" : "N"),
        y = eid_cbox5.checked ? "" : "i",
        k = eid_cbox6.checked ? "Y" : "N",
        S,
        w = ((S = !eid_cbox7.checked), "gm" + y),
        L = ("" != eid_inpt_nav.dataset.trans ? eid_inpt_nav : eid_trans1).dataset.trans,
        E = !1;
    eid_btnStrong.classList.contains("btn_active") && (E = !0),
        null == document.querySelector(".res_f") &&
            (((n = document.createElement("p")).className = "f_book"),
            (n.innerHTML = '<span class="book_name"></span>'),
            eid_find_head.append(n),
            ((n = document.createElement("p")).className = "res_f"),
            (n.innerHTML = `   "<b class="f_r-ed">${o}</b>" <span>(.)</span>   ${(r = `   <span  class="tooltip"  data-tooltip="   Количество стихов: <span class='f_r'>0</span> <br>   Количество совпадений: <span class='f_r'>0</span>  "  onmouseenter="showTooltip(this)"  mouseleave="hideTooltip(this)"   >*</span>   `)}   <span class="res_m f_r">[.]</span>  `),
            (i.querySelector(".find_tab_trans_name").textContent = "..."),
            (i.querySelector(".find_tab_frase").textContent = o),
            i.querySelector(".find_tab_estrella").classList.remove("d-none"),
            (i.querySelector(".find_tab_estrella").innerHTML = r),
            scrollToFindTabActive(),
            eid_find_head.append(n));
    var r = arrFavTransObj.find((e) => e.Translation === L),
        r =
            (eid_cbox7.checked && eid_btnStrong.classList.contains("btn_active") && void 0 !== r.StrongNumbers && "Y" == r.StrongNumbers && "<S>" == r.StrongNumberTagStart && "</S>" == r.StrongNumberTagEnd
                ? (((n = document.createElement("div")).className = "wr_strong_btns"),
                  (n.style.display = "none"),
                  (n.innerHTML = `<span class="wr_strong_btns_inner"> <button id="btn_finded_s" class="btn s_active" onclick="showOnlyStrongNumberFinded_2Actions()">Finded S#</button> <button id="btn_all_s" class="btn" onclick="showAllStrongNumber_2Actions()">All S#</button>   </span>   `),
                  eid_find_head.append(n))
                : null != document.querySelector(".wr_strong_btns") && document.querySelector(".wr_strong_btns").remove(),
            mySizeFind(),
            document.createElement("div"));
    (r.className = "loader"), (r.innerHTML = `<span class="loader__element"></span>  <span class="loader__element"></span>  <span class="loader__element"></span>`), a.append(r);
    let H = [],
        _ = [],
        N = 0,
        M = [],
        A = [],
        j = 0,
        C = 0;
    if (null != L) {
        var n = arrFavTransObj.find((e) => e.Translation === L);
        if (void 0 !== n && null != n && "" != n) {
            let b = n;
            if (((document.querySelector(".title_par .trans_name").innerHTML = b.BibleShortName), null != t && null != d))
                for (let e = t; e <= d; e++) {
                    let u = e;
                    if (
                        (void 0 === obj_bible_files[L] && ((obj_bible_files[L] = {}), (obj_bible_files[L].Books = [])),
                        void 0 !== obj_bible_files[L] &&
                            void 0 !== obj_bible_files[L].Books &&
                            void 0 !== obj_bible_files[L].Books[u] &&
                            obj_bible_files[L].Books[u].fileName == b.Books[u].PathName &&
                            "" != obj_bible_files[L].Books[u].fileContent &&
                            " " != obj_bible_files[L].Books[u].fileContent)
                    )
                        try {
                            new Date().getTime();
                            var s = obj_bible_files[L].Books[u].fileContent;
                            if (window.doFind) {
                                document.querySelector(".f_book .book_name").innerHTML = b.Books[u].FullName;
                                let e = s.split("<h4>");
                                (e = e.filter((e) => e)).forEach((e, t) => {
                                    let h = t,
                                        m = t;
                                    e.includes("<p>") &&
                                        e.split("<p>").forEach((t, e) => {
                                            let a = "";
                                            var r = (a = t.includes("</p>") ? t.split("</p>")[0] : t).split(" "),
                                                t = r[0];
                                            let v = "";
                                            for (let e = 1; e < r.length; e++) v += r[e] + " ";
                                            "" != v && S && "Y" == b.StrongNumberTags && "" != b.StrongNumberTagStart && "" != b.StrongNumberTagEnd && (v = removeTagsWithStrongNumber(v, b.StrongNumberTagStart, b.StrongNumberTagEnd));
                                            let o = !1;
                                            if (0 < g.length) {
                                                if (!(eid_cbox1.checked || eid_cbox2.checked || eid_cbox3.checked || eid_cbox7.checked)) {
                                                    let r = [];
                                                    g.forEach((e) => {
                                                        if ("Y" == k)
                                                            if ("Y" == T) {
                                                                let t = [],
                                                                    a = ((e = "^" + e + "$"), RegExp(e, w));
                                                                v
                                                                    .split(" ")
                                                                    .filter((e) => e)
                                                                    .forEach((e) => {
                                                                        removeSymbols(e).match(a) ? t.push(1) : t.push(0);
                                                                    }),
                                                                    t.includes(1) ? r.push(1) : r.push(0);
                                                            } else "N" == T && ((t = RegExp(e, w)), (A = v.match(t)), 0 < (C = null != A ? A.length : 0) ? r.push(1) : r.push(0));
                                                        else if ("N" == k)
                                                            if ("Y" == T) {
                                                                let t = [],
                                                                    a = ((e = "^" + e + "$"), RegExp(removeAccents(e), w));
                                                                removeAccents(v)
                                                                    .split(" ")
                                                                    .filter((e) => e)
                                                                    .forEach((e) => {
                                                                        removeSymbols(e).match(a) ? t.push(1) : t.push(0);
                                                                    }),
                                                                    t.includes(1) ? r.push(1) : r.push(0);
                                                            } else {
                                                                var t;
                                                                "N" == T && ((t = RegExp(removeAccents(e), w)), (A = removeAccents(v).match(t)), 0 < (C = null != A ? A.length : 0) ? r.push(1) : r.push(0));
                                                            }
                                                    }),
                                                        r.includes(0)
                                                            ? (o = !1)
                                                            : (g.forEach((e) => {
                                                                  var t;
                                                                  if ("Y" == k)
                                                                      if ("Y" == T) {
                                                                          let t = [],
                                                                              a = RegExp(e, w);
                                                                          v
                                                                              .split(" ")
                                                                              .filter((e) => e)
                                                                              .forEach((e) => {
                                                                                  removeSymbols(e).match(a) &&
                                                                                      (e = e.replace(a, function (e) {
                                                                                          return '<b class="f_red">' + e + "</b>";
                                                                                      })),
                                                                                      t.push(e);
                                                                              }),
                                                                              (v = t.join(" "));
                                                                      } else
                                                                          "N" == T &&
                                                                              ((t = RegExp(e, w)), (A = v.match(t)), 0 < (C = null != A ? A.length : 0)) &&
                                                                              (v = v.replace(t, function (e) {
                                                                                  return '<b class="f_red">' + e + "</b>";
                                                                              }));
                                                                  else
                                                                      "N" == k &&
                                                                          ((t = RegExp(removeAccents(e), w)), (A = removeAccents(v).match(t)), 0 < (C = null != A ? A.length : 0)) &&
                                                                          ((e = removeAccents(v).replace(t, function (e) {
                                                                              return "{" + e + "}";
                                                                          })),
                                                                          (t = v),
                                                                          (e = prepararTextMarcas(e)),
                                                                          (v = markRed(t, e)));
                                                              }),
                                                              (o = !0),
                                                              (j += C),
                                                              M.push(A));
                                                }
                                                if (eid_cbox1.checked) {
                                                    let a = [];
                                                    "Y" == T
                                                        ? (g.forEach((e) => {
                                                              var t;
                                                              "Y" == T && (e = "\\B" + e + "\\B"),
                                                                  "Y" == k
                                                                      ? ((t = RegExp(e, w)),
                                                                        (A = v.match(t)),
                                                                        0 < (C = null != A ? A.length : 0)
                                                                            ? (a.push(1),
                                                                              (v = v.replace(t, function (e) {
                                                                                  return '<b class="f_red">' + e + "</b>";
                                                                              })),
                                                                              (j += C),
                                                                              M.push(A))
                                                                            : a.push(0))
                                                                      : "N" == k &&
                                                                        ((t = RegExp(removeAccents(e), w)),
                                                                        (A = removeAccents(v).match(t)),
                                                                        0 < (C = null != A ? A.length : 0)
                                                                            ? (a.push(1),
                                                                              (e = removeAccents(v).replace(t, function (e) {
                                                                                  return "{" + e + "}";
                                                                              })),
                                                                              (t = v),
                                                                              (e = prepararTextMarcas(e)),
                                                                              (v = markRed(t, e)),
                                                                              (j += C),
                                                                              M.push(A))
                                                                            : a.push(0));
                                                          }),
                                                          (o = !!a.includes(1)))
                                                        : "N" == T &&
                                                          ("Y" == k
                                                              ? ((f = g.join("|")),
                                                                (i = RegExp(f, w)),
                                                                (A = v.match(i)),
                                                                0 < (C = null != A ? A.length : 0)
                                                                    ? ((o = !0),
                                                                      (j += C),
                                                                      M.push(A),
                                                                      (v = v.replace(i, function (e) {
                                                                          return '<b class="f_red">' + e + "</b>";
                                                                      })))
                                                                    : (o = !1))
                                                              : "N" == k &&
                                                                ((f = g.join("|")),
                                                                (i = RegExp(removeAccents(f), w)),
                                                                (A = removeAccents(v).match(i)),
                                                                0 < (C = null != A ? A.length : 0)
                                                                    ? (a.push(1),
                                                                      (i = removeAccents(v).replace(i, function (e) {
                                                                          return "{" + e + "}";
                                                                      })),
                                                                      (s = v),
                                                                      (i = prepararTextMarcas(i)),
                                                                      (v = markRed(s, i)))
                                                                    : a.push(0),
                                                                a.includes(1) ? ((o = !0), (j += C), M.push(A)) : (o = !1)));
                                                }
                                                if (eid_cbox2.checked) {
                                                    let r = [],
                                                        u = [],
                                                        n = [],
                                                        b = [];
                                                    if (
                                                        (g.forEach((e, s, o) => {
                                                            if ("Y" == k) {
                                                                var t = RegExp(e, w),
                                                                    a = (n.push(t), void 0 !== e ? RegExp(e.toLowerCase(), w) : RegExp(e, w));
                                                                if ((b.push(a), (A = v.match(t)), 0 < (C = null != A ? A.length : 0) && void 0 !== o[s + 1]))
                                                                    if (y) {
                                                                        if ("i" == y) {
                                                                            a = v.toLowerCase().indexOf(o[s].toLowerCase());
                                                                            if (a < v.toLowerCase().indexOf(o[s + 1].toLowerCase(), a)) {
                                                                                var i = v.split(" "),
                                                                                    l = [];
                                                                                for (let r = 0, n = 0; r < i.length; r++) {
                                                                                    let e = i[r],
                                                                                        t,
                                                                                        a;
                                                                                    (t =
                                                                                        "Y" == T
                                                                                            ? ((a = RegExp(o[s + n].toLowerCase(), w)), e.toLowerCase() == o[s + n].toLowerCase())
                                                                                            : ((a = RegExp(o[s + n].toLowerCase(), w)), !!e.toLowerCase().match(a))) &&
                                                                                        n < g.length &&
                                                                                        s + n < g.length &&
                                                                                        ((e = e.replace(a, function (e) {
                                                                                            return '<b class="f_red">' + e + "</b>";
                                                                                        })),
                                                                                        n++,
                                                                                        u.push(1),
                                                                                        (j += 1),
                                                                                        M.push(A)),
                                                                                        n == g.length && (n = 0),
                                                                                        l.push(e);
                                                                                }
                                                                                v = l.join(" ");
                                                                            } else r.push(0);
                                                                        }
                                                                    } else {
                                                                        t = v.indexOf(o[s]);
                                                                        if (t < v.indexOf(o[s + 1], t)) {
                                                                            var d = v.split(" "),
                                                                                _ = [];
                                                                            for (let r = 0, n = 0; r < d.length; r++) {
                                                                                let e = d[r],
                                                                                    t,
                                                                                    a;
                                                                                (t = "Y" == T ? ((a = RegExp(o[s + n], w)), e == o[s + n]) : ((a = RegExp(o[s + n], w)), !!e.match(a))) &&
                                                                                    n < g.length &&
                                                                                    s + n < g.length &&
                                                                                    ((e = e.replace(a, function (e) {
                                                                                        return '<b class="f_red">' + e + "</b>";
                                                                                    })),
                                                                                    n++,
                                                                                    u.push(1),
                                                                                    (j += 1),
                                                                                    M.push(A)),
                                                                                    n == g.length && (n = 0),
                                                                                    _.push(e);
                                                                            }
                                                                            v = _.join(" ");
                                                                        } else r.push(0);
                                                                    }
                                                            } else if ("N" == k) {
                                                                (a = RegExp(removeAccents(e), w)), (t = (n.push(a), void 0 !== e ? RegExp(removeAccents(e).toLowerCase(), w) : RegExp(removeAccents(e), w)));
                                                                if ((b.push(t), (A = removeAccents(v).match(a)), 0 < (C = null != A ? A.length : 0) && void 0 !== o[s + 1]))
                                                                    if (y) {
                                                                        if ("i" == y) {
                                                                            e = removeAccents(v).toLowerCase().indexOf(o[s].toLowerCase());
                                                                            if (
                                                                                e <
                                                                                removeAccents(v)
                                                                                    .toLowerCase()
                                                                                    .indexOf(o[s + 1].toLowerCase(), e)
                                                                            ) {
                                                                                var c = removeAccents(v).split(" "),
                                                                                    p = [];
                                                                                for (let r = 0, n = 0; r < c.length; r++) {
                                                                                    let e = c[r],
                                                                                        t,
                                                                                        a;
                                                                                    (t =
                                                                                        "Y" == T
                                                                                            ? ((a = o[s + n] < o.length ? RegExp(o[s + n].toLowerCase(), w) : RegExp(o[o.length - 1].toLowerCase(), w)),
                                                                                              o[s + n] < o.length ? e.toLowerCase() == o[s + n].toLowerCase() : e.toLowerCase() == o[o.length - 1].toLowerCase())
                                                                                            : ((a = o[s + n] < o.length ? RegExp(o[s + n].toLowerCase(), w) : RegExp(o[o.length - 1].toLowerCase(), w)), !!e.toLowerCase().match(a))) &&
                                                                                        n < g.length &&
                                                                                        s + n < g.length &&
                                                                                        ((e = e.replace(a, function (e) {
                                                                                            return "{" + e + "}";
                                                                                        })),
                                                                                        n++,
                                                                                        u.push(1),
                                                                                        (j += 1),
                                                                                        M.push(A)),
                                                                                        n == g.length && (n = 0),
                                                                                        p.push(e);
                                                                                }
                                                                                (t = v), (a = prepararTextMarcas(p.join(" ")));
                                                                                v = markRed(t, a);
                                                                            } else r.push(0);
                                                                        }
                                                                    } else {
                                                                        e = removeAccents(v).indexOf(o[s]);
                                                                        if (e < removeAccents(v).indexOf(o[s + 1], e)) {
                                                                            var h = removeAccents(v).split(" "),
                                                                                m = [];
                                                                            for (let r = 0, n = 0; r < h.length; r++) {
                                                                                let e = h[r],
                                                                                    t,
                                                                                    a;
                                                                                (t = "Y" == T ? ((a = RegExp(o[s + n], w)), e == o[s + n]) : ((a = RegExp(o[s + n], w)), !!e.match(a))) &&
                                                                                    n < g.length &&
                                                                                    s + n < g.length &&
                                                                                    ((e = removeAccents(e).replace(a, function (e) {
                                                                                        return "{" + e + "}";
                                                                                    })),
                                                                                    n++,
                                                                                    u.push(1),
                                                                                    (j += 1),
                                                                                    M.push(A)),
                                                                                    n == g.length && (n = 0),
                                                                                    m.push(e);
                                                                            }
                                                                            (t = v), (a = prepararTextMarcas(m.join(" ")));
                                                                            v = markRed(t, a);
                                                                        } else r.push(0);
                                                                    }
                                                            }
                                                        }),
                                                        r.includes(0))
                                                    )
                                                        o = !1;
                                                    else {
                                                        for (let a = 0; a < n.length; a++)
                                                            if (void 0 !== n[a + 1] || void 0 !== b[a + 1]) {
                                                                let e, t;
                                                                "Y" == k
                                                                    ? (y || ((e = v.indexOf(g[a])), (t = v.indexOf(g[a + 1], e))),
                                                                      "i" == y && ((e = v.toLowerCase().indexOf(g[a].toLowerCase())), (t = v.toLowerCase().indexOf(g[a + 1].toLowerCase(), e))))
                                                                    : "N" == k &&
                                                                      (y || ((e = removeAccents(v).indexOf(g[a])), (t = removeAccents(v).indexOf(g[a + 1], e))), "i" == y) &&
                                                                      ((e = removeAccents(v).toLowerCase().indexOf(g[a].toLowerCase())),
                                                                      (t = removeAccents(v)
                                                                          .toLowerCase()
                                                                          .indexOf(g[a + 1].toLowerCase(), e))),
                                                                    (o =
                                                                        !!(e < t && u.includes(1)) &&
                                                                        ((v = v.replace(n[a], function (e) {
                                                                            return '<b class="f_red">' + e + "</b>";
                                                                        })),
                                                                        !0));
                                                            }
                                                        if (o) {
                                                            let t = "",
                                                                a = "";
                                                            for (let e = 0; e < g.length; e++) (t += '<b class="f_red">'), (a += "</b>"), 0 < e && (v = (v = v.replace(t, '<b class="f_red">')).replace(a, "</b>"));
                                                        }
                                                    }
                                                }
                                                if (
                                                    (eid_cbox3.checked &&
                                                        ((s = g.join(" ")),
                                                        (i = (v = v.replace(/(\n|\t|\r)/g, "")).split(" ").filter((e) => e)),
                                                        (v = i.join(" ")),
                                                        "Y" == k
                                                            ? ((i = RegExp(s, w)),
                                                              (A = v.match(i)),
                                                              0 < (C = null != A ? A.length : 0)
                                                                  ? ((v = v.replace(i, function (e) {
                                                                        return '<b class="f_red">' + e + "</b>";
                                                                    })),
                                                                    (o = !0),
                                                                    (j += C),
                                                                    M.push(A))
                                                                  : (o = !1))
                                                            : "N" == k &&
                                                              ((i = RegExp(removeAccents(s), w)),
                                                              (A = removeAccents(v).match(i)),
                                                              0 < (C = null != A ? A.length : 0)
                                                                  ? ((s = removeAccents(v).replace(i, function (e) {
                                                                        return "{" + e + "}";
                                                                    })),
                                                                    (n = (i = prepararFrases(v, s))[0]),
                                                                    (s = prepararTextMarcas(i[1])),
                                                                    (v = (v = markRed(n, s)).replace(/¬/g, " ")),
                                                                    (o = !0),
                                                                    (j += C),
                                                                    M.push(A))
                                                                  : (o = !1))),
                                                    eid_cbox7.checked)
                                                ) {
                                                    let a = g.join(" ");
                                                    var i = (v = v.replace(/(\n|\t|\r)/g, "")).split(" ").filter((e) => e);
                                                    v = i.join(" ");
                                                    let r = RegExp(a, w),
                                                        n = [],
                                                        s = [];
                                                    i.forEach((e) => {
                                                        var t;
                                                        e.includes("<S>") &&
                                                            e.includes("</S>") &&
                                                            (t = removeTags(e)) == a &&
                                                            (s.push(t),
                                                            (e = e.replace(r, function (e) {
                                                                return '<b class="f_red">' + e + "</b>";
                                                            }))),
                                                            n.push(e);
                                                    }),
                                                        (v = n.join(" ")),
                                                        (A = s),
                                                        0 < (C = null != A ? A.length : 0) ? ((o = !0), (j += C), M.push(A)) : (o = !1);
                                                }
                                            }
                                            if (o) {
                                                var n = document.createElement("span"),
                                                    s = ((n.className = "sp_f"), N++, (n.innerText = N), document.createElement("p")),
                                                    i = ((s.id = L + "__" + u + "__" + h + "__" + t), document.createElement("a")),
                                                    t = ((i.href = "#"), `${b.Books[u].ShortNames[0]} ${m}:` + t);
                                                (i.innerHTML = t), i.setAttribute("onclick", `goToLinkFromFind('${L}', '${t}')`), s.append(n), s.append(i), s.append(" ");
                                                const p = document.createElement("span");
                                                if (
                                                    ((p.className = "vt"),
                                                    "Y" == b.StrongNumbers &&
                                                        (((t = v).includes(" ") ? t.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                            var a, r, n;
                                                            isNaN(parseInt(e)) && "0" != e
                                                                ? (p.append(" "), E && e.includes("<S>") && (e = e.replace("<S>", '<S class="show strongActive">')), p.append(e))
                                                                : ((a = document.createElement("span")),
                                                                  E ? (a.className = "strong show strongActive") : (a.className = "strong"),
                                                                  "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                                      ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), p.append(a), p.append(n))
                                                                      : ((a.innerHTML = e), p.append(a)));
                                                        }),
                                                        s.append(p),
                                                        s.innerHTML.trim(),
                                                        "Y" == b.HTMLFilter && (s.innerHTML = htmlEntities(s.innerHTML)),
                                                        E) &&
                                                        s.innerHTML.includes("strongActive") &&
                                                        s.querySelectorAll(".strongActive").forEach((e) => {
                                                            e.addEventListener("click", () => {
                                                                e.innerHTML.includes("H") || e.innerHTML.includes("G") ? getStrongNumber(e.innerText) : ((lang = 39 <= u ? "Grk" : "Heb"), getStrongNumber(e.innerText, lang));
                                                            });
                                                        }),
                                                    "Y" == b.Notes)
                                                ) {
                                                    var n = v;
                                                    if (n.includes(b.NoteSign)) {
                                                        t = n.split(b.NoteSign)[0];
                                                        if (n.includes(b.StartNoteSign) && n.includes(b.EndNoteSign)) {
                                                            s.className = "with_notes";
                                                            var n = n.split(b.StartNoteSign)[1].split(b.EndNoteSign),
                                                                l = n[0],
                                                                n = n[1],
                                                                d = document.createElement("span"),
                                                                _ = document.createElement("span");
                                                            if ((t = "Y" == b.HTMLFilter ? htmlEntities(t) : t).includes('<h6 class="prim_h6">') && t.includes("</h6>")) {
                                                                var c = document.createElement("h6");
                                                                c.className = "prim_h6";
                                                                let e = t.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                                (e = e.filter((e) => e)), (c.innerHTML = e[0]), d.append(c);
                                                            } else d.innerHTML = t;
                                                            p.append(d),
                                                                p.append(buildWrTooltip(b.NoteSign, l, s.id, i.innerHTML)),
                                                                (n = "Y" == b.HTMLFilter ? htmlEntities(n) : n),
                                                                (_.innerHTML = n),
                                                                p.append(_),
                                                                s.append(p),
                                                                "Y" == b.HTMLFilter && (s.innerHTML = htmlEntities(s.innerHTML));
                                                        }
                                                    } else p.append(v), s.append(p), "Y" == b.HTMLFilter && (s.innerHTML = htmlEntities(s.innerHTML));
                                                }
                                                "Y" == b.Titles &&
                                                    ((c = v).includes(b.StartTitleSign) && c.includes(b.EndTitleSign)
                                                        ? ((d = (t = c.split(b.StartTitleSign))[0]),
                                                          (i = (l = t[1].split(b.EndTitleSign))[0]),
                                                          (n = l[1]),
                                                          ((_ = document.createElement("span")).className = "verse_title"),
                                                          (_.innerHTML = i),
                                                          p.append(d),
                                                          p.append(_),
                                                          p.append(n))
                                                        : p.append(v),
                                                    s.append(p),
                                                    "Y" == b.HTMLFilter) &&
                                                    (s.innerHTML = htmlEntities(s.innerHTML)),
                                                    "N" == b.StrongNumbers && "N" == b.Notes && "N" == b.Titles && (p.append(v), s.append(p), "Y" == b.HTMLFilter) && (s.innerHTML = htmlEntities(s.innerHTML)),
                                                    H.push(s);
                                            }
                                        });
                                });
                            }
                            if (0 < H.length) {
                                0 < document.querySelectorAll(".res_f").length && document.querySelectorAll(".res_f").forEach((e) => {});
                                var c = `   <span  class="tooltip"  data-tooltip="${`   Количество стихов: <span class='f_r'>${N}</span> <br>   Количество совпадений: <span class='f_r'>${j}</span>  `}"  onmouseenter="showTooltip(this)"  mouseleave="hideTooltip(this)"   >*</span>   `;
                                (document.querySelector(".res_f").innerHTML = `   "<b class="f_r-ed">${o}</b>" <span>(${N})</span>   ${c}   <span class="res_m f_r">[${j}]</span>  `),
                                    (i.querySelector(".find_tab_trans_name").textContent = b.BibleShortName),
                                    (i.querySelector(".find_tab_frase").textContent = o),
                                    i.querySelector(".find_tab_estrella").classList.remove("d-none"),
                                    (i.querySelector(".find_tab_estrella").innerHTML = c),
                                    scrollToFindTabActive(),
                                    mySizeFind();
                                let t = [],
                                    a = l;
                                for (let e = 0; e < H.length; e++) {
                                    var p = H[e];
                                    e > a - 2 || e == H.length - 1 ? (t.push(p), _.push(t), (a += l), (t = [])) : t.push(p);
                                }
                                null != (window.res_show = _) && e == d && (addWordsToHistFind(L, o, N, j), mostrar_res_show(0)), (_ = []), e == d && stopFindWords();
                            } else e == d && 0 == H.length && (mostrar_no_res(), stopFindWords());
                        } catch (e) {
                            console.error("2. Error try-catch find: ", e);
                        }
                    if (void 0 === obj_bible_files[L].Books[u])
                        try {
                            var h = `./modules/text/${L}/` + b.Books[u].PathName,
                                m = await (await fetch(h)).text();
                            if (window.doFind) {
                                document.querySelector(".f_book .book_name").innerHTML = b.Books[u].FullName;
                                let e = m.split("<h4>");
                                (e = e.filter((e) => e)).forEach((e, t) => {
                                    let h = t,
                                        m = t;
                                    e.includes("<p>") &&
                                        e.split("<p>").forEach((t, e) => {
                                            let a = "";
                                            var r = (a = t.includes("</p>") ? t.split("</p>")[0] : t).split(" "),
                                                t = r[0];
                                            let v = "";
                                            for (let e = 1; e < r.length; e++) v += r[e] + " ";
                                            "" != v && S && "Y" == b.StrongNumberTags && "" != b.StrongNumberTagStart && "" != b.StrongNumberTagEnd && (v = removeTagsWithStrongNumber(v, b.StrongNumberTagStart, b.StrongNumberTagEnd));
                                            let o = !1;
                                            if (0 < g.length) {
                                                if (!(eid_cbox1.checked || eid_cbox2.checked || eid_cbox3.checked || eid_cbox7.checked)) {
                                                    let r = [];
                                                    g.forEach((e) => {
                                                        if ("Y" == k)
                                                            if ("Y" == T) {
                                                                let t = [],
                                                                    a = ((e = "^" + e + "$"), RegExp(e, w));
                                                                v
                                                                    .split(" ")
                                                                    .filter((e) => e)
                                                                    .forEach((e) => {
                                                                        removeSymbols(e).match(a) ? t.push(1) : t.push(0);
                                                                    }),
                                                                    t.includes(1) ? r.push(1) : r.push(0);
                                                            } else "N" == T && ((t = RegExp(e, w)), (A = v.match(t)), 0 < (C = null != A ? A.length : 0) ? r.push(1) : r.push(0));
                                                        else if ("N" == k)
                                                            if ("Y" == T) {
                                                                let t = [],
                                                                    a = ((e = "^" + e + "$"), RegExp(removeAccents(e), w));
                                                                removeAccents(v)
                                                                    .split(" ")
                                                                    .filter((e) => e)
                                                                    .forEach((e) => {
                                                                        removeSymbols(e).match(a) ? t.push(1) : t.push(0);
                                                                    }),
                                                                    t.includes(1) ? r.push(1) : r.push(0);
                                                            } else {
                                                                var t;
                                                                "N" == T && ((t = RegExp(removeAccents(e), w)), (A = removeAccents(v).match(t)), 0 < (C = null != A ? A.length : 0) ? r.push(1) : r.push(0));
                                                            }
                                                    }),
                                                        r.includes(0)
                                                            ? (o = !1)
                                                            : (g.forEach((e) => {
                                                                  var t;
                                                                  if ("Y" == k)
                                                                      if ("Y" == T) {
                                                                          let t = [],
                                                                              a = RegExp(e, w);
                                                                          v
                                                                              .split(" ")
                                                                              .filter((e) => e)
                                                                              .forEach((e) => {
                                                                                  removeSymbols(e).match(a) &&
                                                                                      (e = e.replace(a, function (e) {
                                                                                          return '<b class="f_red">' + e + "</b>";
                                                                                      })),
                                                                                      t.push(e);
                                                                              }),
                                                                              (v = t.join(" "));
                                                                      } else
                                                                          "N" == T &&
                                                                              ((t = RegExp(e, w)), (A = v.match(t)), 0 < (C = null != A ? A.length : 0)) &&
                                                                              (v = v.replace(t, function (e) {
                                                                                  return '<b class="f_red">' + e + "</b>";
                                                                              }));
                                                                  else
                                                                      "N" == k &&
                                                                          ((t = RegExp(removeAccents(e), w)), (A = removeAccents(v).match(t)), 0 < (C = null != A ? A.length : 0)) &&
                                                                          ((e = removeAccents(v).replace(t, function (e) {
                                                                              return "{" + e + "}";
                                                                          })),
                                                                          (t = v),
                                                                          (e = prepararTextMarcas(e)),
                                                                          (v = markRed(t, e)));
                                                              }),
                                                              (o = !0),
                                                              (j += C),
                                                              M.push(A));
                                                }
                                                if (eid_cbox1.checked) {
                                                    let a = [];
                                                    "Y" == T
                                                        ? (g.forEach((e) => {
                                                              var t;
                                                              "Y" == T && (e = "\\B" + e + "\\B"),
                                                                  "Y" == k
                                                                      ? ((t = RegExp(e, w)),
                                                                        (A = v.match(t)),
                                                                        0 < (C = null != A ? A.length : 0)
                                                                            ? (a.push(1),
                                                                              (v = v.replace(t, function (e) {
                                                                                  return '<b class="f_red">' + e + "</b>";
                                                                              })),
                                                                              (j += C),
                                                                              M.push(A))
                                                                            : a.push(0))
                                                                      : "N" == k &&
                                                                        ((t = RegExp(removeAccents(e), w)),
                                                                        (A = removeAccents(v).match(t)),
                                                                        0 < (C = null != A ? A.length : 0)
                                                                            ? (a.push(1),
                                                                              (e = removeAccents(v).replace(t, function (e) {
                                                                                  return "{" + e + "}";
                                                                              })),
                                                                              (t = v),
                                                                              (e = prepararTextMarcas(e)),
                                                                              (v = markRed(t, e)),
                                                                              (j += C),
                                                                              M.push(A))
                                                                            : a.push(0));
                                                          }),
                                                          (o = !!a.includes(1)))
                                                        : "N" == T &&
                                                          ("Y" == k
                                                              ? ((f = g.join("|")),
                                                                (i = RegExp(f, w)),
                                                                (A = v.match(i)),
                                                                0 < (C = null != A ? A.length : 0)
                                                                    ? ((o = !0),
                                                                      (j += C),
                                                                      M.push(A),
                                                                      (v = v.replace(i, function (e) {
                                                                          return '<b class="f_red">' + e + "</b>";
                                                                      })))
                                                                    : (o = !1))
                                                              : "N" == k &&
                                                                ((f = g.join("|")),
                                                                (i = RegExp(removeAccents(f), w)),
                                                                (A = removeAccents(v).match(i)),
                                                                0 < (C = null != A ? A.length : 0)
                                                                    ? (a.push(1),
                                                                      (i = removeAccents(v).replace(i, function (e) {
                                                                          return "{" + e + "}";
                                                                      })),
                                                                      (s = v),
                                                                      (i = prepararTextMarcas(i)),
                                                                      (v = markRed(s, i)))
                                                                    : a.push(0),
                                                                a.includes(1) ? ((o = !0), (j += C), M.push(A)) : (o = !1)));
                                                }
                                                if (eid_cbox2.checked) {
                                                    let r = [],
                                                        u = [],
                                                        n = [],
                                                        b = [];
                                                    if (
                                                        (g.forEach((e, s, o) => {
                                                            if ("Y" == k) {
                                                                var t = RegExp(e, w),
                                                                    a = (n.push(t), void 0 !== e ? RegExp(e.toLowerCase(), w) : RegExp(e, w));
                                                                if ((b.push(a), (A = v.match(t)), 0 < (C = null != A ? A.length : 0) && void 0 !== o[s + 1]))
                                                                    if (y) {
                                                                        if ("i" == y) {
                                                                            a = v.toLowerCase().indexOf(o[s].toLowerCase());
                                                                            if (a < v.toLowerCase().indexOf(o[s + 1].toLowerCase(), a)) {
                                                                                var i = v.split(" "),
                                                                                    l = [];
                                                                                for (let r = 0, n = 0; r < i.length; r++) {
                                                                                    let e = i[r],
                                                                                        t,
                                                                                        a;
                                                                                    (a =
                                                                                        "Y" == T
                                                                                            ? ((t = RegExp(o[s + n].toLowerCase(), w)), e.toLowerCase() == o[s + n].toLowerCase())
                                                                                            : ((t = RegExp(o[s + n].toLowerCase(), w)), !!e.toLowerCase().match(t))) &&
                                                                                        n < g.length &&
                                                                                        s + n < g.length &&
                                                                                        ((e = e.replace(t, function (e) {
                                                                                            return '<b class="f_red">' + e + "</b>";
                                                                                        })),
                                                                                        n++,
                                                                                        u.push(1),
                                                                                        (j += 1),
                                                                                        M.push(A)),
                                                                                        n == g.length && (n = 0),
                                                                                        l.push(e);
                                                                                }
                                                                                v = l.join(" ");
                                                                            } else r.push(0);
                                                                        }
                                                                    } else {
                                                                        t = v.indexOf(o[s]);
                                                                        if (t < v.indexOf(o[s + 1], t)) {
                                                                            var d = v.split(" "),
                                                                                _ = [];
                                                                            for (let r = 0, n = 0; r < d.length; r++) {
                                                                                let e = d[r],
                                                                                    t,
                                                                                    a;
                                                                                (a = "Y" == T ? ((t = RegExp(o[s + n], w)), e == o[s + n]) : ((t = RegExp(o[s + n], w)), !!e.match(t))) &&
                                                                                    n < g.length &&
                                                                                    s + n < g.length &&
                                                                                    ((e = e.replace(t, function (e) {
                                                                                        return '<b class="f_red">' + e + "</b>";
                                                                                    })),
                                                                                    n++,
                                                                                    u.push(1),
                                                                                    (j += 1),
                                                                                    M.push(A)),
                                                                                    n == g.length && (n = 0),
                                                                                    _.push(e);
                                                                            }
                                                                            v = _.join(" ");
                                                                        } else r.push(0);
                                                                    }
                                                            } else if ("N" == k) {
                                                                (a = RegExp(removeAccents(e), w)), (t = (n.push(a), void 0 !== e ? RegExp(removeAccents(e).toLowerCase(), w) : RegExp(removeAccents(e), w)));
                                                                if ((b.push(t), (A = removeAccents(v).match(a)), 0 < (C = null != A ? A.length : 0) && void 0 !== o[s + 1]))
                                                                    if (y) {
                                                                        if ("i" == y) {
                                                                            e = removeAccents(v).toLowerCase().indexOf(o[s].toLowerCase());
                                                                            if (
                                                                                e <
                                                                                removeAccents(v)
                                                                                    .toLowerCase()
                                                                                    .indexOf(o[s + 1].toLowerCase(), e)
                                                                            ) {
                                                                                var c = removeAccents(v).split(" "),
                                                                                    p = [];
                                                                                for (let r = 0, n = 0; r < c.length; r++) {
                                                                                    let e = c[r],
                                                                                        t,
                                                                                        a;
                                                                                    (a =
                                                                                        "Y" == T
                                                                                            ? ((t = o[s + n] < o.length ? RegExp(o[s + n].toLowerCase(), w) : RegExp(o[o.length - 1].toLowerCase(), w)),
                                                                                              o[s + n] < o.length ? e.toLowerCase() == o[s + n].toLowerCase() : e.toLowerCase() == o[o.length - 1].toLowerCase())
                                                                                            : ((t = o[s + n] < o.length ? RegExp(o[s + n].toLowerCase(), w) : RegExp(o[o.length - 1].toLowerCase(), w)), !!e.toLowerCase().match(t))) &&
                                                                                        n < g.length &&
                                                                                        s + n < g.length &&
                                                                                        ((e = e.replace(t, function (e) {
                                                                                            return "{" + e + "}";
                                                                                        })),
                                                                                        n++,
                                                                                        u.push(1),
                                                                                        (j += 1),
                                                                                        M.push(A)),
                                                                                        n == g.length && (n = 0),
                                                                                        p.push(e);
                                                                                }
                                                                                (t = v), (a = prepararTextMarcas(p.join(" ")));
                                                                                v = markRed(t, a);
                                                                            } else r.push(0);
                                                                        }
                                                                    } else {
                                                                        e = removeAccents(v).indexOf(o[s]);
                                                                        if (e < removeAccents(v).indexOf(o[s + 1], e)) {
                                                                            var h = removeAccents(v).split(" "),
                                                                                m = [];
                                                                            for (let r = 0, n = 0; r < h.length; r++) {
                                                                                let e = h[r],
                                                                                    t,
                                                                                    a;
                                                                                (a = "Y" == T ? ((t = RegExp(o[s + n], w)), e == o[s + n]) : ((t = RegExp(o[s + n], w)), !!e.match(t))) &&
                                                                                    n < g.length &&
                                                                                    s + n < g.length &&
                                                                                    ((e = removeAccents(e).replace(t, function (e) {
                                                                                        return "{" + e + "}";
                                                                                    })),
                                                                                    n++,
                                                                                    u.push(1),
                                                                                    (j += 1),
                                                                                    M.push(A)),
                                                                                    n == g.length && (n = 0),
                                                                                    m.push(e);
                                                                            }
                                                                            (t = v), (a = prepararTextMarcas(m.join(" ")));
                                                                            v = markRed(t, a);
                                                                        } else r.push(0);
                                                                    }
                                                            }
                                                        }),
                                                        r.includes(0))
                                                    )
                                                        o = !1;
                                                    else {
                                                        for (let a = 0; a < n.length; a++)
                                                            if (void 0 !== n[a + 1] || void 0 !== b[a + 1]) {
                                                                let e, t;
                                                                "Y" == k
                                                                    ? (y || ((e = v.indexOf(g[a])), (t = v.indexOf(g[a + 1], e))),
                                                                      "i" == y && ((e = v.toLowerCase().indexOf(g[a].toLowerCase())), (t = v.toLowerCase().indexOf(g[a + 1].toLowerCase(), e))))
                                                                    : "N" == k &&
                                                                      (y || ((e = removeAccents(v).indexOf(g[a])), (t = removeAccents(v).indexOf(g[a + 1], e))), "i" == y) &&
                                                                      ((e = removeAccents(v).toLowerCase().indexOf(g[a].toLowerCase())),
                                                                      (t = removeAccents(v)
                                                                          .toLowerCase()
                                                                          .indexOf(g[a + 1].toLowerCase(), e))),
                                                                    (o =
                                                                        !!(e < t && u.includes(1)) &&
                                                                        ((v = v.replace(n[a], function (e) {
                                                                            return '<b class="f_red">' + e + "</b>";
                                                                        })),
                                                                        !0));
                                                            }
                                                        if (o) {
                                                            let t = "",
                                                                a = "";
                                                            for (let e = 0; e < g.length; e++) (t += '<b class="f_red">'), (a += "</b>"), 0 < e && (v = (v = v.replace(t, '<b class="f_red">')).replace(a, "</b>"));
                                                        }
                                                    }
                                                }
                                                if (
                                                    (eid_cbox3.checked &&
                                                        ((s = g.join(" ")),
                                                        (i = (v = v.replace(/(\n|\t|\r)/g, "")).split(" ").filter((e) => e)),
                                                        (v = i.join(" ")),
                                                        "Y" == k
                                                            ? ((i = RegExp(s, w)),
                                                              (A = v.match(i)),
                                                              0 < (C = null != A ? A.length : 0)
                                                                  ? ((v = v.replace(i, function (e) {
                                                                        return '<b class="f_red">' + e + "</b>";
                                                                    })),
                                                                    (o = !0),
                                                                    (j += C),
                                                                    M.push(A))
                                                                  : (o = !1))
                                                            : "N" == k &&
                                                              ((i = RegExp(removeAccents(s), w)),
                                                              (A = removeAccents(v).match(i)),
                                                              0 < (C = null != A ? A.length : 0)
                                                                  ? ((s = removeAccents(v).replace(i, function (e) {
                                                                        return "{" + e + "}";
                                                                    })),
                                                                    (n = (i = prepararFrases(v, s))[0]),
                                                                    (s = prepararTextMarcas(i[1])),
                                                                    (v = (v = markRed(n, s)).replace(/¬/g, " ")),
                                                                    (o = !0),
                                                                    (j += C),
                                                                    M.push(A))
                                                                  : (o = !1))),
                                                    eid_cbox7.checked)
                                                ) {
                                                    let a = g.join(" ");
                                                    var i = (v = v.replace(/(\n|\t|\r)/g, "")).split(" ").filter((e) => e);
                                                    v = i.join(" ");
                                                    let r = RegExp(a, w),
                                                        n = [],
                                                        s = [];
                                                    i.forEach((e) => {
                                                        var t;
                                                        e.includes("<S>") &&
                                                            e.includes("</S>") &&
                                                            (t = removeTags(e)) == a &&
                                                            (s.push(t),
                                                            (e = e.replace(r, function (e) {
                                                                return '<b class="f_red">' + e + "</b>";
                                                            }))),
                                                            n.push(e);
                                                    }),
                                                        (v = n.join(" ")),
                                                        (A = s),
                                                        0 < (C = null != A ? A.length : 0) ? ((o = !0), (j += C), M.push(A)) : (o = !1);
                                                }
                                            }
                                            if (o) {
                                                var n = document.createElement("span"),
                                                    s = ((n.className = "sp_f"), N++, (n.innerText = N), document.createElement("p")),
                                                    i = ((s.id = L + "__" + u + "__" + h + "__" + t), document.createElement("a")),
                                                    t = ((i.href = "#"), `${b.Books[u].ShortNames[0]} ${m}:` + t);
                                                (i.innerHTML = t), i.setAttribute("onclick", `goToLinkFromFind('${L}', '${t}')`), s.append(n), s.append(i), s.append(" ");
                                                const p = document.createElement("span");
                                                if (
                                                    ((p.className = "vt"),
                                                    "Y" == b.StrongNumbers &&
                                                        (((t = v).includes(" ") ? t.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                            var a, r, n;
                                                            isNaN(parseInt(e)) && "0" != e
                                                                ? (p.append(" "), E && e.includes("<S>") && (e = e.replace("<S>", '<S class="show strongActive">')), p.append(e))
                                                                : ((a = document.createElement("span")),
                                                                  E ? (a.className = "strong show strongActive") : (a.className = "strong"),
                                                                  "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                                      ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), p.append(a), p.append(n))
                                                                      : ((a.innerHTML = e), p.append(a)));
                                                        }),
                                                        s.append(p),
                                                        s.innerHTML.trim(),
                                                        "Y" == b.HTMLFilter && (s.innerHTML = htmlEntities(s.innerHTML)),
                                                        E) &&
                                                        s.innerHTML.includes("strongActive") &&
                                                        s.querySelectorAll(".strongActive").forEach((e) => {
                                                            e.addEventListener("click", () => {
                                                                e.innerHTML.includes("H") || e.innerHTML.includes("G") ? getStrongNumber(e.innerText) : ((lang = 39 <= u ? "Grk" : "Heb"), getStrongNumber(e.innerText, lang));
                                                            });
                                                        }),
                                                    "Y" == b.Notes)
                                                ) {
                                                    var n = v;
                                                    if (n.includes(b.NoteSign)) {
                                                        t = n.split(b.NoteSign)[0];
                                                        if (n.includes(b.StartNoteSign) && n.includes(b.EndNoteSign)) {
                                                            s.className = "with_notes";
                                                            var n = n.split(b.StartNoteSign)[1].split(b.EndNoteSign),
                                                                l = n[0],
                                                                n = n[1],
                                                                d = document.createElement("span"),
                                                                _ = document.createElement("span");
                                                            if ((t = "Y" == b.HTMLFilter ? htmlEntities(t) : t).includes('<h6 class="prim_h6">') && t.includes("</h6>")) {
                                                                var c = document.createElement("h6");
                                                                c.className = "prim_h6";
                                                                let e = t.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                                (e = e.filter((e) => e)), (c.innerHTML = e[0]), d.append(c);
                                                            } else d.innerHTML = t;
                                                            p.append(d),
                                                                p.append(buildWrTooltip(b.NoteSign, l, s.id, i.innerHTML)),
                                                                (n = "Y" == b.HTMLFilter ? htmlEntities(n) : n),
                                                                (_.innerHTML = n),
                                                                p.append(_),
                                                                s.append(p),
                                                                "Y" == b.HTMLFilter && (s.innerHTML = htmlEntities(s.innerHTML));
                                                        }
                                                    } else p.append(v), s.append(p), "Y" == b.HTMLFilter && (s.innerHTML = htmlEntities(s.innerHTML));
                                                }
                                                "Y" == b.Titles &&
                                                    ((c = v).includes(b.StartTitleSign) && c.includes(b.EndTitleSign)
                                                        ? ((d = (t = c.split(b.StartTitleSign))[0]),
                                                          (i = (l = t[1].split(b.EndTitleSign))[0]),
                                                          (n = l[1]),
                                                          ((_ = document.createElement("span")).className = "verse_title"),
                                                          (_.innerHTML = i),
                                                          p.append(d),
                                                          p.append(_),
                                                          p.append(n))
                                                        : p.append(v),
                                                    s.append(p),
                                                    "Y" == b.HTMLFilter) &&
                                                    (s.innerHTML = htmlEntities(s.innerHTML)),
                                                    "N" == b.StrongNumbers && "N" == b.Notes && "N" == b.Titles && (p.append(v), s.append(p), "Y" == b.HTMLFilter) && (s.innerHTML = htmlEntities(s.innerHTML)),
                                                    H.push(s);
                                            }
                                        });
                                });
                            }
                            if (0 < H.length) {
                                0 < document.querySelectorAll(".res_f").length && document.querySelectorAll(".res_f").forEach((e) => {});
                                var v = `   <span  class="tooltip"  data-tooltip="${`   Количество стихов: <span class='f_r'>${N}</span> <br>   Количество совпадений: <span class='f_r'>${j}</span>  `}"  onmouseenter="showTooltip(this)"  mouseleave="hideTooltip(this)"   >*</span>   `;
                                (document.querySelector(".res_f").innerHTML = `   "<b class="f_r-ed">${o}</b>" <span>(${N})</span>   ${v}   <span class="res_m f_r">[${j}]</span>  `),
                                    (i.querySelector(".find_tab_trans_name").textContent = b.BibleShortName),
                                    (i.querySelector(".find_tab_frase").textContent = o),
                                    i.querySelector(".find_tab_estrella").classList.remove("d-none"),
                                    (i.querySelector(".find_tab_estrella").innerHTML = v),
                                    scrollToFindTabActive(),
                                    mySizeFind();
                                let t = [],
                                    a = l;
                                for (let e = 0; e < H.length; e++) {
                                    var I = H[e];
                                    e > a - 2 || e == H.length - 1 ? (t.push(I), _.push(t), (a += l), (t = [])) : t.push(I);
                                }
                                null != (window.res_show = _) && e == d && (addWordsToHistFind(L, o, N, j), mostrar_res_show(0)), (_ = []), e == d && stopFindWords();
                            } else e == d && 0 == H.length && (mostrar_no_res(), stopFindWords());
                        } catch (e) {
                            console.error("2. Error try-catch find: ", e);
                        }
                }
        } else
            try {
                var u = `./modules/text/${L}/bibleqt.json`;
                const b = await (await fetch(u)).json();
                if (((document.querySelector(".title_par .trans_name").innerHTML = b.BibleShortName), null != t && null != d))
                    for (let s = t; s <= d; s++) {
                        let u = s;
                        !(async function (e) {
                            try {
                                var t = await (await fetch(e)).text();
                                if (window.doFind) {
                                    document.querySelector(".f_book .book_name").innerHTML = b.Books[u].FullName;
                                    let e = t.split("<h4>");
                                    (e = e.filter((e) => e)).forEach((e, t) => {
                                        let h = t,
                                            m = t;
                                        e.includes("<p>") &&
                                            e.split("<p>").forEach((t, e) => {
                                                let a = "";
                                                var r = (a = t.includes("</p>") ? t.split("</p>")[0] : t).split(" "),
                                                    t = r[0];
                                                let v = "";
                                                for (let e = 1; e < r.length; e++) v += r[e] + " ";
                                                "" != v && S && "Y" == b.StrongNumberTags && "" != b.StrongNumberTagStart && "" != b.StrongNumberTagEnd && (v = removeTagsWithStrongNumber(v, b.StrongNumberTagStart, b.StrongNumberTagEnd));
                                                let o = !1;
                                                if (0 < g.length) {
                                                    if (!(eid_cbox1.checked || eid_cbox2.checked || eid_cbox3.checked || eid_cbox7.checked)) {
                                                        let r = [];
                                                        g.forEach((e) => {
                                                            if ("Y" == k)
                                                                if ("Y" == T) {
                                                                    let t = [],
                                                                        a = ((e = "^" + e + "$"), RegExp(e, w));
                                                                    v
                                                                        .split(" ")
                                                                        .filter((e) => e)
                                                                        .forEach((e) => {
                                                                            removeSymbols(e).match(a) ? t.push(1) : t.push(0);
                                                                        }),
                                                                        t.includes(1) ? r.push(1) : r.push(0);
                                                                } else "N" == T && ((t = RegExp(e, w)), (A = v.match(t)), 0 < (C = null != A ? A.length : 0) ? r.push(1) : r.push(0));
                                                            else if ("N" == k)
                                                                if ("Y" == T) {
                                                                    let t = [],
                                                                        a = ((e = "^" + e + "$"), RegExp(removeAccents(e), w));
                                                                    removeAccents(v)
                                                                        .split(" ")
                                                                        .filter((e) => e)
                                                                        .forEach((e) => {
                                                                            removeSymbols(e).match(a) ? t.push(1) : t.push(0);
                                                                        }),
                                                                        t.includes(1) ? r.push(1) : r.push(0);
                                                                } else {
                                                                    var t;
                                                                    "N" == T && ((t = RegExp(removeAccents(e), w)), (A = removeAccents(v).match(t)), 0 < (C = null != A ? A.length : 0) ? r.push(1) : r.push(0));
                                                                }
                                                        }),
                                                            r.includes(0)
                                                                ? (o = !1)
                                                                : (g.forEach((e) => {
                                                                      var t;
                                                                      if ("Y" == k)
                                                                          if ("Y" == T) {
                                                                              let t = [],
                                                                                  a = RegExp(e, w);
                                                                              v
                                                                                  .split(" ")
                                                                                  .filter((e) => e)
                                                                                  .forEach((e) => {
                                                                                      removeSymbols(e).match(a) &&
                                                                                          (e = e.replace(a, function (e) {
                                                                                              return '<b class="f_red">' + e + "</b>";
                                                                                          })),
                                                                                          t.push(e);
                                                                                  }),
                                                                                  (v = t.join(" "));
                                                                          } else
                                                                              "N" == T &&
                                                                                  ((t = RegExp(e, w)), (A = v.match(t)), 0 < (C = null != A ? A.length : 0)) &&
                                                                                  (v = v.replace(t, function (e) {
                                                                                      return '<b class="f_red">' + e + "</b>";
                                                                                  }));
                                                                      else
                                                                          "N" == k &&
                                                                              ((t = RegExp(removeAccents(e), w)), (A = removeAccents(v).match(t)), 0 < (C = null != A ? A.length : 0)) &&
                                                                              ((e = removeAccents(v).replace(t, function (e) {
                                                                                  return "{" + e + "}";
                                                                              })),
                                                                              (t = v),
                                                                              (e = prepararTextMarcas(e)),
                                                                              (v = markRed(t, e)));
                                                                  }),
                                                                  (o = !0),
                                                                  (j += C),
                                                                  M.push(A));
                                                    }
                                                    if (eid_cbox1.checked) {
                                                        let a = [];
                                                        "Y" == T
                                                            ? (g.forEach((e) => {
                                                                  var t;
                                                                  "Y" == T && (e = "\\B" + e + "\\B"),
                                                                      "Y" == k
                                                                          ? ((t = RegExp(e, w)),
                                                                            (A = v.match(t)),
                                                                            0 < (C = null != A ? A.length : 0)
                                                                                ? (a.push(1),
                                                                                  (v = v.replace(t, function (e) {
                                                                                      return '<b class="f_red">' + e + "</b>";
                                                                                  })),
                                                                                  (j += C),
                                                                                  M.push(A))
                                                                                : a.push(0))
                                                                          : "N" == k &&
                                                                            ((t = RegExp(removeAccents(e), w)),
                                                                            (A = removeAccents(v).match(t)),
                                                                            0 < (C = null != A ? A.length : 0)
                                                                                ? (a.push(1),
                                                                                  (e = removeAccents(v).replace(t, function (e) {
                                                                                      return "{" + e + "}";
                                                                                  })),
                                                                                  (t = v),
                                                                                  (e = prepararTextMarcas(e)),
                                                                                  (v = markRed(t, e)),
                                                                                  (j += C),
                                                                                  M.push(A))
                                                                                : a.push(0));
                                                              }),
                                                              (o = !!a.includes(1)))
                                                            : "N" == T &&
                                                              ("Y" == k
                                                                  ? ((f = g.join("|")),
                                                                    (i = RegExp(f, w)),
                                                                    (A = v.match(i)),
                                                                    0 < (C = null != A ? A.length : 0)
                                                                        ? ((o = !0),
                                                                          (j += C),
                                                                          M.push(A),
                                                                          (v = v.replace(i, function (e) {
                                                                              return '<b class="f_red">' + e + "</b>";
                                                                          })))
                                                                        : (o = !1))
                                                                  : "N" == k &&
                                                                    ((f = g.join("|")),
                                                                    (i = RegExp(removeAccents(f), w)),
                                                                    (A = removeAccents(v).match(i)),
                                                                    0 < (C = null != A ? A.length : 0)
                                                                        ? (a.push(1),
                                                                          (i = removeAccents(v).replace(i, function (e) {
                                                                              return "{" + e + "}";
                                                                          })),
                                                                          (s = v),
                                                                          (i = prepararTextMarcas(i)),
                                                                          (v = markRed(s, i)))
                                                                        : a.push(0),
                                                                    a.includes(1) ? ((o = !0), (j += C), M.push(A)) : (o = !1)));
                                                    }
                                                    if (eid_cbox2.checked) {
                                                        let r = [],
                                                            u = [],
                                                            n = [],
                                                            b = [];
                                                        if (
                                                            (g.forEach((e, s, o) => {
                                                                if ("Y" == k) {
                                                                    var t = RegExp(e, w),
                                                                        a = (n.push(t), void 0 !== e ? RegExp(e.toLowerCase(), w) : RegExp(e, w));
                                                                    if ((b.push(a), (A = v.match(t)), 0 < (C = null != A ? A.length : 0) && void 0 !== o[s + 1]))
                                                                        if (y) {
                                                                            if ("i" == y) {
                                                                                a = v.toLowerCase().indexOf(o[s].toLowerCase());
                                                                                if (a < v.toLowerCase().indexOf(o[s + 1].toLowerCase(), a)) {
                                                                                    var i = v.split(" "),
                                                                                        l = [];
                                                                                    for (let r = 0, n = 0; r < i.length; r++) {
                                                                                        let e = i[r],
                                                                                            t,
                                                                                            a;
                                                                                        (a =
                                                                                            "Y" == T
                                                                                                ? ((t = RegExp(o[s + n].toLowerCase(), w)), e.toLowerCase() == o[s + n].toLowerCase())
                                                                                                : ((t = RegExp(o[s + n].toLowerCase(), w)), !!e.toLowerCase().match(t))) &&
                                                                                            n < g.length &&
                                                                                            s + n < g.length &&
                                                                                            ((e = e.replace(t, function (e) {
                                                                                                return '<b class="f_red">' + e + "</b>";
                                                                                            })),
                                                                                            n++,
                                                                                            u.push(1),
                                                                                            (j += 1),
                                                                                            M.push(A)),
                                                                                            n == g.length && (n = 0),
                                                                                            l.push(e);
                                                                                    }
                                                                                    v = l.join(" ");
                                                                                } else r.push(0);
                                                                            }
                                                                        } else {
                                                                            t = v.indexOf(o[s]);
                                                                            if (t < v.indexOf(o[s + 1], t)) {
                                                                                var d = v.split(" "),
                                                                                    _ = [];
                                                                                for (let r = 0, n = 0; r < d.length; r++) {
                                                                                    let e = d[r],
                                                                                        t,
                                                                                        a;
                                                                                    (a = "Y" == T ? ((t = RegExp(o[s + n], w)), e == o[s + n]) : ((t = RegExp(o[s + n], w)), !!e.match(t))) &&
                                                                                        n < g.length &&
                                                                                        s + n < g.length &&
                                                                                        ((e = e.replace(t, function (e) {
                                                                                            return '<b class="f_red">' + e + "</b>";
                                                                                        })),
                                                                                        n++,
                                                                                        u.push(1),
                                                                                        (j += 1),
                                                                                        M.push(A)),
                                                                                        n == g.length && (n = 0),
                                                                                        _.push(e);
                                                                                }
                                                                                v = _.join(" ");
                                                                            } else r.push(0);
                                                                        }
                                                                } else if ("N" == k) {
                                                                    (a = RegExp(removeAccents(e), w)), (t = (n.push(a), void 0 !== e ? RegExp(removeAccents(e).toLowerCase(), w) : RegExp(removeAccents(e), w)));
                                                                    if ((b.push(t), (A = removeAccents(v).match(a)), 0 < (C = null != A ? A.length : 0) && void 0 !== o[s + 1]))
                                                                        if (y) {
                                                                            if ("i" == y) {
                                                                                e = removeAccents(v).toLowerCase().indexOf(o[s].toLowerCase());
                                                                                if (
                                                                                    e <
                                                                                    removeAccents(v)
                                                                                        .toLowerCase()
                                                                                        .indexOf(o[s + 1].toLowerCase(), e)
                                                                                ) {
                                                                                    var c = removeAccents(v).split(" "),
                                                                                        p = [];
                                                                                    for (let r = 0, n = 0; r < c.length; r++) {
                                                                                        let e = c[r],
                                                                                            t,
                                                                                            a;
                                                                                        (a =
                                                                                            "Y" == T
                                                                                                ? ((t = o[s + n] < o.length ? RegExp(o[s + n].toLowerCase(), w) : RegExp(o[o.length - 1].toLowerCase(), w)),
                                                                                                  o[s + n] < o.length ? e.toLowerCase() == o[s + n].toLowerCase() : e.toLowerCase() == o[o.length - 1].toLowerCase())
                                                                                                : ((t = o[s + n] < o.length ? RegExp(o[s + n].toLowerCase(), w) : RegExp(o[o.length - 1].toLowerCase(), w)), !!e.toLowerCase().match(t))) &&
                                                                                            n < g.length &&
                                                                                            s + n < g.length &&
                                                                                            ((e = e.replace(t, function (e) {
                                                                                                return "{" + e + "}";
                                                                                            })),
                                                                                            n++,
                                                                                            u.push(1),
                                                                                            (j += 1),
                                                                                            M.push(A)),
                                                                                            n == g.length && (n = 0),
                                                                                            p.push(e);
                                                                                    }
                                                                                    (t = v), (a = prepararTextMarcas(p.join(" ")));
                                                                                    v = markRed(t, a);
                                                                                } else r.push(0);
                                                                            }
                                                                        } else {
                                                                            e = removeAccents(v).indexOf(o[s]);
                                                                            if (e < removeAccents(v).indexOf(o[s + 1], e)) {
                                                                                var h = removeAccents(v).split(" "),
                                                                                    m = [];
                                                                                for (let r = 0, n = 0; r < h.length; r++) {
                                                                                    let e = h[r],
                                                                                        t,
                                                                                        a;
                                                                                    (a = "Y" == T ? ((t = RegExp(o[s + n], w)), e == o[s + n]) : ((t = RegExp(o[s + n], w)), !!e.match(t))) &&
                                                                                        n < g.length &&
                                                                                        s + n < g.length &&
                                                                                        ((e = removeAccents(e).replace(t, function (e) {
                                                                                            return "{" + e + "}";
                                                                                        })),
                                                                                        n++,
                                                                                        u.push(1),
                                                                                        (j += 1),
                                                                                        M.push(A)),
                                                                                        n == g.length && (n = 0),
                                                                                        m.push(e);
                                                                                }
                                                                                (t = v), (a = prepararTextMarcas(m.join(" ")));
                                                                                v = markRed(t, a);
                                                                            } else r.push(0);
                                                                        }
                                                                }
                                                            }),
                                                            r.includes(0))
                                                        )
                                                            o = !1;
                                                        else {
                                                            for (let a = 0; a < n.length; a++)
                                                                if (void 0 !== n[a + 1] || void 0 !== b[a + 1]) {
                                                                    let e, t;
                                                                    "Y" == k
                                                                        ? (y || ((e = v.indexOf(g[a])), (t = v.indexOf(g[a + 1], e))),
                                                                          "i" == y && ((e = v.toLowerCase().indexOf(g[a].toLowerCase())), (t = v.toLowerCase().indexOf(g[a + 1].toLowerCase(), e))))
                                                                        : "N" == k &&
                                                                          (y || ((e = removeAccents(v).indexOf(g[a])), (t = removeAccents(v).indexOf(g[a + 1], e))), "i" == y) &&
                                                                          ((e = removeAccents(v).toLowerCase().indexOf(g[a].toLowerCase())),
                                                                          (t = removeAccents(v)
                                                                              .toLowerCase()
                                                                              .indexOf(g[a + 1].toLowerCase(), e))),
                                                                        (o =
                                                                            !!(e < t && u.includes(1)) &&
                                                                            ((v = v.replace(n[a], function (e) {
                                                                                return '<b class="f_red">' + e + "</b>";
                                                                            })),
                                                                            !0));
                                                                }
                                                            if (o) {
                                                                let t = "",
                                                                    a = "";
                                                                for (let e = 0; e < g.length; e++) (t += '<b class="f_red">'), (a += "</b>"), 0 < e && (v = (v = v.replace(t, '<b class="f_red">')).replace(a, "</b>"));
                                                            }
                                                        }
                                                    }
                                                    if (
                                                        (eid_cbox3.checked &&
                                                            ((s = g.join(" ")),
                                                            (i = (v = v.replace(/(\n|\t|\r)/g, "")).split(" ").filter((e) => e)),
                                                            (v = i.join(" ")),
                                                            "Y" == k
                                                                ? ((i = RegExp(s, w)),
                                                                  (A = v.match(i)),
                                                                  0 < (C = null != A ? A.length : 0)
                                                                      ? ((v = v.replace(i, function (e) {
                                                                            return '<b class="f_red">' + e + "</b>";
                                                                        })),
                                                                        (o = !0),
                                                                        (j += C),
                                                                        M.push(A))
                                                                      : (o = !1))
                                                                : "N" == k &&
                                                                  ((i = RegExp(removeAccents(s), w)),
                                                                  (A = removeAccents(v).match(i)),
                                                                  0 < (C = null != A ? A.length : 0)
                                                                      ? ((s = removeAccents(v).replace(i, function (e) {
                                                                            return "{" + e + "}";
                                                                        })),
                                                                        (n = (i = prepararFrases(v, s))[0]),
                                                                        (s = prepararTextMarcas(i[1])),
                                                                        (v = (v = markRed(n, s)).replace(/¬/g, " ")),
                                                                        (o = !0),
                                                                        (j += C),
                                                                        M.push(A))
                                                                      : (o = !1))),
                                                        eid_cbox7.checked)
                                                    ) {
                                                        let a = g.join(" ");
                                                        var i = (v = v.replace(/(\n|\t|\r)/g, "")).split(" ").filter((e) => e);
                                                        v = i.join(" ");
                                                        let r = RegExp(a, w),
                                                            n = [],
                                                            s = [];
                                                        i.forEach((e) => {
                                                            var t;
                                                            e.includes("<S>") &&
                                                                e.includes("</S>") &&
                                                                (t = removeTags(e)) == a &&
                                                                (s.push(t),
                                                                (e = e.replace(r, function (e) {
                                                                    return '<b class="f_red">' + e + "</b>";
                                                                }))),
                                                                n.push(e);
                                                        }),
                                                            (v = n.join(" ")),
                                                            (A = s),
                                                            0 < (C = null != A ? A.length : 0) ? ((o = !0), (j += C), M.push(A)) : (o = !1);
                                                    }
                                                }
                                                if (o) {
                                                    var n = document.createElement("span"),
                                                        s = ((n.className = "sp_f"), N++, (n.innerText = N), document.createElement("p")),
                                                        i = ((s.id = L + "__" + u + "__" + h + "__" + t), document.createElement("a")),
                                                        t = ((i.href = "#"), `${b.Books[u].ShortNames[0]} ${m}:` + t);
                                                    (i.innerHTML = t), i.setAttribute("onclick", `goToLinkFromFind('${L}', '${t}')`), s.append(n), s.append(i), s.append(" ");
                                                    const p = document.createElement("span");
                                                    if (
                                                        ((p.className = "vt"),
                                                        "Y" == b.StrongNumbers &&
                                                            (((t = v).includes(" ") ? t.split(" ") : alert("error al hacer .split()")).forEach((e, t) => {
                                                                var a, r, n;
                                                                isNaN(parseInt(e)) && "0" != e
                                                                    ? (p.append(" "), E && e.includes("<S>") && (e = e.replace("<S>", '<S class="show strongActive">')), p.append(e))
                                                                    : ((a = document.createElement("span")),
                                                                      E ? (a.className = "strong show strongActive") : (a.className = "strong"),
                                                                      "" != (n = 1 < e.length ? e.charAt(e.length - 1) : "") && isNaN(n)
                                                                          ? ((r = e.substring(0, e.length - 1)), (n = n), (a.innerHTML = r), p.append(a), p.append(n))
                                                                          : ((a.innerHTML = e), p.append(a)));
                                                            }),
                                                            s.append(p),
                                                            s.innerHTML.trim(),
                                                            "Y" == b.HTMLFilter && (s.innerHTML = htmlEntities(s.innerHTML)),
                                                            E) &&
                                                            s.innerHTML.includes("strongActive") &&
                                                            s.querySelectorAll(".strongActive").forEach((e) => {
                                                                e.addEventListener("click", () => {
                                                                    e.innerHTML.includes("H") || e.innerHTML.includes("G") ? getStrongNumber(e.innerText) : ((lang = 39 <= u ? "Grk" : "Heb"), getStrongNumber(e.innerText, lang));
                                                                });
                                                            }),
                                                        "Y" == b.Notes)
                                                    ) {
                                                        var n = v;
                                                        if (n.includes(b.NoteSign)) {
                                                            t = n.split(b.NoteSign)[0];
                                                            if (n.includes(b.StartNoteSign) && n.includes(b.EndNoteSign)) {
                                                                s.className = "with_notes";
                                                                var n = n.split(b.StartNoteSign)[1].split(b.EndNoteSign),
                                                                    l = n[0],
                                                                    n = n[1],
                                                                    d = document.createElement("span"),
                                                                    _ = document.createElement("span");
                                                                if ((t = "Y" == b.HTMLFilter ? htmlEntities(t) : t).includes('<h6 class="prim_h6">') && t.includes("</h6>")) {
                                                                    var c = document.createElement("h6");
                                                                    c.className = "prim_h6";
                                                                    let e = t.split('<h6 class="prim_h6">')[1].split("</h6>");
                                                                    (e = e.filter((e) => e)), (c.innerHTML = e[0]), d.append(c);
                                                                } else d.innerHTML = t;
                                                                p.append(d),
                                                                    p.append(buildWrTooltip(b.NoteSign, l, s.id, i.innerHTML)),
                                                                    (n = "Y" == b.HTMLFilter ? htmlEntities(n) : n),
                                                                    (_.innerHTML = n),
                                                                    p.append(_),
                                                                    s.append(p),
                                                                    "Y" == b.HTMLFilter && (s.innerHTML = htmlEntities(s.innerHTML));
                                                            }
                                                        } else p.append(v), s.append(p), "Y" == b.HTMLFilter && (s.innerHTML = htmlEntities(s.innerHTML));
                                                    }
                                                    "Y" == b.Titles &&
                                                        ((c = v).includes(b.StartTitleSign) && c.includes(b.EndTitleSign)
                                                            ? ((d = (t = c.split(b.StartTitleSign))[0]),
                                                              (i = (l = t[1].split(b.EndTitleSign))[0]),
                                                              (n = l[1]),
                                                              ((_ = document.createElement("span")).className = "verse_title"),
                                                              (_.innerHTML = i),
                                                              p.append(d),
                                                              p.append(_),
                                                              p.append(n))
                                                            : p.append(v),
                                                        s.append(p),
                                                        "Y" == b.HTMLFilter) &&
                                                        (s.innerHTML = htmlEntities(s.innerHTML)),
                                                        "N" == b.StrongNumbers && "N" == b.Notes && "N" == b.Titles && (p.append(v), s.append(p), "Y" == b.HTMLFilter) && (s.innerHTML = htmlEntities(s.innerHTML)),
                                                        H.push(s);
                                                }
                                            });
                                    });
                                }
                                if (0 < H.length) {
                                    0 < document.querySelectorAll(".res_f").length && document.querySelectorAll(".res_f").forEach((e) => {});
                                    var r = ` <span   class="tooltip"   data-tooltip="${` Количество стихов: <span class='f_r'>${N}</span> <br> Количество совпадений: <span class='f_r'>${j}</span>   `}"   onmouseenter="showTooltip(this)"   mouseleave="hideTooltip(this)" >*</span> `;
                                    (document.querySelector(".res_f").innerHTML = ` "<b class="f_r-ed">${o}</b>" <span>(${N})</span> ${r} <span class="res_m f_r">[${j}]</span>   `),
                                        (i.querySelector(".find_tab_trans_name").textContent = b.BibleShortName),
                                        (i.querySelector(".find_tab_frase").textContent = o),
                                        i.querySelector(".find_tab_estrella").classList.remove("d-none"),
                                        (i.querySelector(".find_tab_estrella").innerHTML = r),
                                        scrollToFindTabActive(),
                                        mySizeFind();
                                    let t = [],
                                        a = l;
                                    for (let e = 0; e < H.length; e++) {
                                        var n = H[e];
                                        e > a - 2 || e == H.length - 1 ? (t.push(n), _.push(t), (a += l), (t = [])) : t.push(n);
                                    }
                                    null != (window.res_show = _) && s == d && (addWordsToHistFind(L, o, N, j), mostrar_res_show(0)), (_ = []), s == d && stopFindWords();
                                } else s == d && 0 == H.length && (mostrar_no_res(), stopFindWords());
                            } catch (e) {
                                console.error("2. Error en fetchInner() find. Error: ", e);
                            }
                        })(`./modules/text/${L}/` + b.Books[u].PathName);
                    }
            } catch (e) {
                console.error("Error try-catch MODO OLD. como en Text3(). Error: ", e);
            }
    }
}
function mostrar_res_show(t) {
    var a = eid_wr_find_res_blocks.querySelector(".find_res_block_active"),
        r = ((a.innerHTML = ""), document.createElement("p"));
    let n = !(r.className = "wr_res_link");
    for (let e = 0; e < res_show.length; e++) {
        var s = document.createElement("span");
        (s.className = "res_link"),
            s.setAttribute("onclick", `mostrar_res_show(${e}); show_sn_finded();`),
            (s.innerHTML = res_show[e][0].querySelector(".sp_f").innerText + "-" + res_show[e][res_show[e].length - 1].querySelector(".sp_f").innerText),
            r.append(s),
            0 == e && (n = !0);
    }
    for (let e = 0; e < res_show[t].length; e++) {
        var i = res_show[t][e];
        if (
            i.innerHTML.includes("wr_tooltip") &&
            (i.querySelector(".wr_tooltip").addEventListener("click", (e) => {
                hideShowComment(e);
            }),
            i.querySelector(".close").addEventListener("click", (e) => {
                close_comment_x(e.target.parentElement.parentElement.parentElement, e);
            }),
            i.querySelector(".wr_tooltip .comment .text").innerHTML.includes("<a ")) &&
            i.querySelector(".wr_tooltip .comment .text").innerHTML.includes("</a>")
        ) {
            var l = i.id,
                d = i.querySelector("a").innerText,
                l = l.split("__");
            let a = l[0],
                r = l[1],
                n = l[2],
                s = l[3],
                o = d;
            i.querySelectorAll(".wr_tooltip .comment .text a").forEach((t) => {
                t.addEventListener("click", (e) => {
                    e.preventDefault(), addRefToHistNav(a, o, r, n, s, null), getRefByHref(t.getAttribute("href"), "/", 1);
                });
            });
        }
        a.append(i);
    }
    if ((a.append(r), document.querySelectorAll(".res_link")[t].classList.add("active"), (a.scrollTop = 0), 1 == n)) {
        let t = ("" != eid_inpt_nav.dataset.trans ? eid_inpt_nav : eid_trans1).dataset.trans;
        var e = arrFavTransObj.find((e) => e.Translation === t);
        eid_cbox7.checked &&
            eid_btnStrong.classList.contains("btn_active") &&
            void 0 !== e.StrongNumbers &&
            "Y" == e.StrongNumbers &&
            "<S>" == e.StrongNumberTagStart &&
            "</S>" == e.StrongNumberTagEnd &&
            (((e = document.querySelector(".wr_strong_btns")).style.display = "block"), mySizeFind(), ("btn_finded_s" == e.querySelector(".s_active").id ? showOnlyStrongNumberFinded : showAllStrongNumber)()),
            (n = !1);
    }
    makeStrongNumbersActiveFind();
}
function show_sn_finded() {
    var e = document.querySelector(".wr_strong_btns");
    if (!(null != e && 0 < e.offsetHeight)) return !1;
    markarStrongNumberFinded(), e.getElementById("btn_finded_s").classList.contains("s_active") && showOnlyStrongNumberFinded(), e.getElementById("btn_all_s").classList.contains("s_active") && showAllStrongNumber();
}
function mostrar_no_res() {
    var e = eid_wr_find_tabs.querySelector(".find_tab_active"),
        t = eid_wr_find_res_blocks.querySelector(".find_res_block_active"),
        a = eid_inpt_find.value.trim().split(" ").length;
    (words_show = 1 < a ? "вводимую фразу" : "вводимое слово"),
        (document.querySelector(".res_f b").innerHTML = "" + eid_inpt_find.value.trim()),
        (document.querySelector(".res_f span").innerHTML = "(0)"),
        document.querySelector(".res_f span.tooltip").setAttribute("data-tooltip", "Количество стихов: <span class='f_r'>0</span> <br>Количество совпадений: <span class='f_r'>0</span>"),
        document.querySelector(".res_f span.tooltip").setAttribute("onmouseenter", "showTooltip(this)"),
        document.querySelector(".res_f span.tooltip").setAttribute("onmouseleave", "hideTooltip(this)"),
        (document.querySelector(".res_f span.tooltip").innerHTML = "*"),
        (document.querySelector(".res_m").innerHTML = "[0]"),
        (t.innerHTML = "");
    document.createElement("p").className = "wr_res_link";
    var a = document.querySelector(".trans_name").textContent,
        r = document.createElement("p");
    (r.className = "prim16"),
        (r.innerHTML = `<span class="trans_in_find">Поиск в переводе: <b>${a}</b> </span>`),
        (r.innerHTML += `По запросу "<b class="f_red">${eid_inpt_find.value.trim()}</b>" ничего не найдено. Проверьте выбранный для поиска перевод Библии, ${words_show} или попробуйте изменить параметры.`);
    (e.querySelector(".find_tab_trans_name").textContent = a),
        (e.querySelector(".find_tab_frase").textContent = eid_inpt_find.value.trim()),
        e.querySelector(".find_tab_estrella").classList.remove("d-none"),
        (e.querySelector(
            ".find_tab_estrella"
        ).innerHTML = `   <span  class="tooltip"  data-tooltip="   Количество стихов: <span class='f_r'>0</span> <br>   Количество совпадений: <span class='f_r'>0</span>  "  onmouseenter="showTooltip(this)"  mouseleave="hideTooltip(this)"   >*</span>   `),
        scrollToFindTabActive(),
        t.append(r);
}
function hideShowHistNav() {
    "none" == eid_wr_hist_nav.style.display ? (window.innerWidth < pantallaTabletMinPx ? openModal("full", "История навигации", null, "showHistoryNav") : show_hist_nav()) : close_hist_nav();
}
function show_hist_nav() {
    eid_hist_nav.querySelector("img").classList.add("razv"), (eid_wr_hist_nav.style.display = "block"), mySizeNav();
}
function close_hist_nav() {
    eid_hist_nav.querySelector("img").classList.remove("razv"), (eid_wr_hist_nav.style.display = "none"), mySizeNav();
}
function hideShowHistFind() {
    "none" == eid_wr_hist_find.style.display ? (window.innerWidth < pantallaTabletMinPx ? openModal("full", "История поиска", null, "showHistoryFind") : show_hist_find()) : close_hist_find();
}
function show_hist_find() {
    eid_hist_find.querySelector("img").classList.add("razv"), (eid_wr_hist_find.style.display = "block"), mySizeFind();
}
function close_hist_find() {
    eid_hist_find.querySelector("img").classList.remove("razv"), (eid_wr_hist_find.style.display = "none"), mySizeFind();
}
function hideShowHistStrong() {
    "none" == eid_wr_hist_strong.style.display ? (window.innerWidth < pantallaTabletMinPx ? openModal("full", "История номеров Стронга", null, "showHistoryStrong") : show_hist_strong()) : close_hist_strong();
}
function show_hist_strong() {
    eid_hist_strong.querySelector("img").classList.add("razv"), (eid_wr_hist_strong.style.display = "block"), mySizeStrong();
}
function close_hist_strong() {
    eid_hist_strong.querySelector("img").classList.remove("razv"), (eid_wr_hist_strong.style.display = "none"), mySizeStrong();
}
function hideShowFindParams() {
    var e = document.querySelector(".bl_par"),
        t = document.querySelector(".title_par img");
    "none" == e.style.display ? ((e.style.display = "block"), t.classList.add("razv")) : ((e.style.display = "none"), t.classList.remove("razv")), mySizeFind();
}
function removeTags(e) {
    return null !== e && "" !== e && (e = e.toString()).replace(/(<([^>]+)>)/gi, "");
}
function removeTagsWithStrongNumber(e, t = null, a = null) {
    if (null == t || "" == t || null == a || "" == a) return e;
    var r = e.split(" ");
    for (let e = 0; e < r.length; e++) r[e].includes(t) && r[e].includes(a) && (r.splice(e, 1), e--);
    return r.join(" ");
}
function removeAccents(e) {
    return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function removeSymbols(e) {
    return e.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()\n\r\t]/g, "");
}
function hasAccents(e) {
    return /[\p{M}]/gu.test(e.normalize("NFD"));
}
function prepararFrases(e, t) {
    let r = e.split(" ");
    e = t.split(" ");
    let n = !1,
        s = [];
    return (
        e.forEach((e, t, a) => {
            1 < e.length && "{" == e[0] && "}" != e[e.length - 1] && 0 == n
                ? ((e += "¬"), (r[t] = r[t] + "¬"), (n = !0))
                : 0 < e.length && "{" != e[0] && "}" != e[e.length - 1] && 1 == n
                ? ((e += "¬"), (r[t] = r[t] + "¬"))
                : 0 < e.length && "{" != e[0] && "}" == e[e.length - 1] && 1 == n && (n = !1),
                s.push(e);
        }),
        [r.join(" ").replace(/¬ /g, "¬"), s.join(" ").replace(/¬ /g, "¬")]
    );
}
function prepararTextMarcas(e) {
    e = e.split(" ");
    let r = [],
        n = [];
    return (
        e.forEach((e, t, a) => {
            3 < (null != e.match(/{|}/g) && e.match(/{|}/g).length / 2) &&
                (e.split("}").forEach((e, t) => {
                    t < 3 ? (e += "}") : (e = e.replace(/{/g, "")), n.push(e);
                }),
                (e = n.join(""))),
                r.push(e);
        }),
        r.join(" ")
    );
}
function markRed(e, t) {
    let r = e.split(" "),
        _ = t.split(" "),
        c = [];
    return (
        r.forEach((e, l, d) => {
            if (_[l].includes("{") && _[l].includes("}"))
                if (_[l].match(/{|}/g).length / 2 == 1) {
                    var t = _[l].indexOf("{"),
                        a = _[l].indexOf("}"),
                        t = e.substring(0, t) + '<b class="f_red">' + e.substring(t, a - 1) + "</b>" + e.substring(a - 1, e.length);
                    r[l] = t;
                } else {
                    _[l].match(/{|}/g).length;
                    a = _[l].split("}");
                    let i = [];
                    a.forEach((t, a, e) => {
                        if (t.includes("{")) {
                            let e;
                            var r, n, s, o;
                            _[l].match(/{|}/g).length / 2 == 2 &&
                                ((o = t.indexOf("{")),
                                (s = t.length),
                                0 == a && ((r = d[l].slice(0, s - 1)), (n = d[l].slice(s - 1)), (c[0] = r), (c[1] = n)),
                                0 == a && (e = c[a].substring(0, o) + '<b class="f_red">' + c[a].substring(o, s - 1) + "</b>" + c[a].substring(s, c[a].length)),
                                1 == a) &&
                                (e = c[a].substring(0, o) + '<b class="f_red">' + c[a].substring(o, s - 1) + "</b>" + c[a].substring(s - 1, c[a].length)),
                                _[l].match(/{|}/g).length / 2 == 3 &&
                                    ((r = t.indexOf("{")),
                                    (n = t.length),
                                    0 == a &&
                                        ((o = _[l].indexOf("{", 0)),
                                        (s = _[l].indexOf("}", o)),
                                        (t = _[l].indexOf("{", s)),
                                        (o = _[l].indexOf("}", t)),
                                        (t = _[l].indexOf("{", o)),
                                        _[l].indexOf("}", t),
                                        (t = d[l].slice(0, s - 1)),
                                        (s = d[l].slice(s - 1, o - 1 - 2)),
                                        (o = d[l].slice(o - 1 - 2, d[l].length)),
                                        (c[0] = t),
                                        (c[1] = s),
                                        (c[2] = o)),
                                    0 == a && (e = c[a].substring(0, r) + '<b class="f_red">' + c[a].substring(r, n - 1) + "</b>" + c[a].substring(n, c[a].length)),
                                    1 == a && (e = c[a].substring(0, r) + '<b class="f_red">' + c[a].substring(r, n - 1) + "</b>" + c[a].substring(n - 1, c[a].length)),
                                    2 == a) &&
                                    (e = c[a].substring(0, r) + '<b class="f_red">' + c[a].substring(r, n - 1) + "</b>" + c[a].substring(n - 1, c[a].length)),
                                i.push(e);
                        }
                    }),
                        (r[l] = i.join(""));
                }
            (_[l].includes("{") || _[l].includes("}")) && _[l].includes(" ");
        }),
        r.join(" ")
    );
}
function updateTransOnClickOnActiveCol() {
    document.querySelectorAll(".colsInner").forEach((a) => {
        a.onclick = () => {
            let t = a.parentElement.querySelector(".colsHead").dataset.trans;
            var e = a.parentElement.querySelector(".colsHead").id;
            void 0 !== t &&
                ((eid_inpt_nav.dataset.divtrans = e),
                (eid_inpt_nav.dataset.trans = t),
                (e = arrFavTransObj.find((e) => e.Translation === t)),
                (eid_act_trans_nav.title = e.BibleName),
                (eid_act_trans_find.title = e.BibleName),
                (eid_act_trans_strong.title = e.BibleName),
                (eid_act_trans_nav.textContent = e.BibleShortName),
                (eid_act_trans_find.textContent = e.BibleShortName),
                (eid_act_trans_strong.textContent = e.BibleShortName),
                eid_s_book.click());
        };
    });
}
function updateActTransNavBlackBtn() {
    var e;
    let t = document.querySelector(".tab_active").dataset.ref_trans;
    void 0 !== t &&
        ((eid_inpt_nav.dataset.divtrans = "trans1"),
        (eid_inpt_nav.dataset.trans = t),
        (e = arrFavTransObj.find((e) => e.Translation === t)),
        (eid_act_trans_nav.title = e.BibleName),
        (eid_act_trans_find.title = e.BibleName),
        (eid_act_trans_strong.title = e.BibleName),
        (eid_act_trans_nav.textContent = e.BibleShortName),
        (eid_act_trans_find.textContent = e.BibleShortName),
        (eid_act_trans_strong.textContent = e.BibleShortName),
        eid_s_book.click());
}
function updateBtnActTransNavOnLoad() {
    var e;
    void 0 !== eid_trans1.dataset.trans &&
        ((e = arrFavTransObj.find((e) => e.Translation === eid_trans1.dataset.trans)),
        (eid_act_trans_nav.title = e.BibleName),
        (eid_act_trans_find.title = e.BibleName),
        (eid_act_trans_strong.title = e.BibleName),
        (eid_act_trans_nav.textContent = e.BibleShortName),
        (eid_act_trans_find.textContent = e.BibleShortName),
        (eid_act_trans_strong.textContent = e.BibleShortName));
}
function convertLinkFromRusToEsp(e, t, a, r = null) {
    var n = (e = parseInt(e));
    let s = (t = parseInt(t)),
        o = (a = parseInt(a));
    r = parseInt(r);
    switch (e) {
        case 3:
            13 == t && (1 == a && ((s = 12), (o = 16)), 2 <= a) && --o;
            break;
        case 5:
            5 == t && 16 == a && ((s = 6), (o = 1)), 6 == t && (o += 1);
            break;
        case 8:
            20 == t && 43 == a && (o = 42), 24 == t && (1 == a && ((s = 23), (o = 29)), 1 < a) && --o;
            break;
        case 17:
            39 == t && 31 <= a && ((s = 40), (o -= 30)), 40 == t && (a <= 19 && (o += 5), 20 <= a) && ((s = 41), (o -= 19)), 41 == t && (o += 8);
            break;
        case 18:
            3 <= t && t <= 8 && 1 < a && --o,
                9 == t && (2 <= a && a <= 21 && --o, 22 <= a) && ((s = 10), (o -= 21)),
                (10 == t ||
                    (13 <= t && t <= 16) ||
                    (22 <= t && t <= 28) ||
                    (31 <= t && t <= 32) ||
                    34 == t ||
                    36 == t ||
                    42 == t ||
                    49 == t ||
                    65 == t ||
                    (70 <= t && t <= 73) ||
                    (77 <= t && t <= 78) ||
                    81 == t ||
                    85 == t ||
                    86 == t ||
                    90 == t ||
                    (92 <= t && t <= 100) ||
                    (102 <= t && t <= 106) ||
                    (108 <= t && t < 113) ||
                    (116 <= t && t <= 138) ||
                    (140 <= t && t <= 145)) &&
                    (s += 1),
                (11 == t ||
                    12 == t ||
                    (17 <= t && t <= 21) ||
                    (29 <= t && t <= 30) ||
                    33 == t ||
                    35 == t ||
                    (37 <= t && t <= 41) ||
                    (43 <= t && t <= 48) ||
                    52 == t ||
                    (54 <= t && t <= 58) ||
                    (60 <= t && t <= 64) ||
                    (66 <= t && t <= 69) ||
                    (74 <= t && t <= 76) ||
                    (79 <= t && t <= 80) ||
                    (82 <= t && t <= 84) ||
                    (87 <= t && t < 89) ||
                    91 == t ||
                    101 == t ||
                    107 == t ||
                    139 == t) &&
                    ((s += 1), 2 <= a) &&
                    --o,
                ((50 <= t && t <= 51) || 53 == t || 59 == t) && ((s += 1), a <= 2 && (o = 1), 3 <= a) && (o -= 2),
                89 == t && ((s += 1), 2 <= a) && --o,
                113 == t && (a <= 8 && (s += 1), 9 <= a) && ((s += 2), (o -= 8)),
                114 == t && (s += 2),
                115 == t && ((s += 1), (o += 9)),
                146 == t && (s += 1),
                147 == t && (o += 11);
            break;
        case 19:
            4 == t && 28 <= a && (o = 27);
            break;
        case 21:
            1 == t && ((o += 1), 17 == a) && (o = 17), 7 == t && (1 == a && ((s = 6), (o = 13)), 2 <= a) && --o;
            break;
        case 22:
            3 == t && (20 <= a && (o += 1), 26 == a) && (o = 26);
            break;
        case 26:
            3 == t && 30 <= a && ((s = 4), (o -= 30)), 4 == t && (o += 3);
            break;
        case 27:
            14 == t && (1 == a && ((s = 13), (o = 16)), 2 <= a) && --o;
            break;
        case 31:
            2 == t && (1 == a && ((s = 1), (o = 17)), 2 <= a) && --o;
            break;
        case 44:
            14 == t && 24 <= a && ((s = 16), (o += 1));
            break;
        case 46:
            13 == t && 13 == a && (o = 14);
    }
    return [n, s, o];
}
function checkRefNav(e, t = null, a = null, r = null) {
    let n = eid_trans1.dataset.trans,
        s = eid_inpt_nav.dataset.trans;
    var o = eid_inpt_nav.dataset.divtrans;
    let i = null != e ? e : 0,
        l = t,
        d = a,
        _ = r;
    return (
        "" != o &&
        "trans1" != o &&
        ((t = arrFavTransObj.find((e) => e.Translation === n)),
        (r = (a = arrFavTransObj.find((e) => e.Translation === s)).Books[e].ShortNames[0]),
        "N" == t.EnglishPsalms && "Y" == a.EnglishPsalms && ((o = convertLinkFromRusToEsp(i, l, d, _)), (i = o[0]), (l = o[1]), (d = o[2]), (_ = o[3])),
        "Y" == t.EnglishPsalms && "N" == a.EnglishPsalms && ((e = convertLinkFromEspToRus(i, l, d, _)), (i = e[0]), (l = e[1]), (d = e[2]), (_ = e[3])),
        [i, l, d, _, r])
    );
}
function pintRefOnScroll() {
    const n = eid_col1.querySelector(".colsInner");
    n.addEventListener("scroll", function () {
        let a = eid_col1.querySelector(".colsInner").getBoundingClientRect();
        eid_col1.querySelector(".colsHead").getBoundingClientRect();
        var e = n.children;
        let r = null;
        eid_col1.querySelector(".mob_sh_link");
        var t = document.querySelectorAll(".cols").length;
        Array.from(e).forEach((e) => {
            var t = e.getBoundingClientRect();
            window.innerWidth < pantallaTabletMinPx
                ? 0 <= t.top && t.top + 0 <= a.top && t.bottom + 0 <= (n.clientHeight || window.innerHeight) && !r
                    ? (r = e)
                    : e.classList.remove("elementoVisible")
                : 0 <= t.top && t.top <= a.top + 2 && t.bottom >= a.top + 2 && !r
                ? (r = e)
                : e.classList.remove("elementoVisible");
        }),
            r &&
                (r.classList.add("elementoVisible"),
                "P" === r.tagName ? 0 < t && putRefVisibleToHead(r.id, 0) : ("H4" !== r.tagName && "H2" !== r.tagName) || ((e = eid_col1.querySelector(".colsInner p")), 0 < t && putRefVisibleToHead(e.id, 0)));
    });
}
function putRefVisibleToHead(e, t = 0) {
    getFirstPVisibleAndPutInVkladka();
}
function pageUp() {
    var r = document.querySelectorAll(".colsInner");
    {
        console.log("pageUp() --- modo new");
        var r = r[0],
            n = r.getBoundingClientRect();
        let t = r.clientHeight;
        var s,
            o = t,
            o = r.scrollTop - o;
        let e = !1,
            a = [];
        r.querySelectorAll("p").forEach((e) => {
            e.getBoundingClientRect().top > -t && a.push(e);
        }),
            1 < a.length && ((s = a[0].getBoundingClientRect()), (e = o + (t - n.top + s.top))),
            o < 0 ? o < (r.scrollTop = 0) && o == -r.clientHeight && chapterGo("prev") : 0 <= o && (e ? (r.scrollTop = e) : (r.scrollTop = o));
    }
    setTimeout(() => {
        getFirstPVisibleAndPutInVkladka();
    }, 50);
}
function pageDown() {
    document.querySelectorAll(".colsInner").forEach((a) => {
        let r = a.getBoundingClientRect();
        var e = a.scrollHeight;
        let n = a.clientHeight;
        var t = n;
        let s = a.scrollTop + t,
            o = !1;
        a.querySelectorAll("p").forEach((e) => {
            var t,
                e = e.getBoundingClientRect();
            n == s ? e.top <= s + r.top && e.bottom > s + r.top && (o = e.top - r.top) : ((t = a.getBoundingClientRect().bottom), e.top <= t && e.bottom > t && (o = s - (t - e.top)));
        }),
            s > e ? (a.scrollTop = e) : s < e ? (o ? (a.scrollTop = o) : (a.scrollTop = s)) : chapterGo("next");
    }),
        setTimeout(() => {
            getFirstPVisibleAndPutInVkladka();
        }, 50);
}
function getFirstPVisibleAndPutInVkladka() {
    document.querySelectorAll(".colsInner").forEach((e, t) => {
        var a = e.getBoundingClientRect();
        let r = null,
            n = !0;
        var s,
            o,
            i,
            l = Array.from(e.querySelectorAll("p"));
        for (let e = 0; e < l.length; e++) {
            var d = l[e],
                _ = d.getBoundingClientRect();
            if (1 == n && 0 < _.top && _.top >= a.top) {
                (r = d), (n = !1);
                break;
            }
        }
        null != r &&
            null != r.querySelector("a") &&
            ((s = r.querySelector("a").textContent),
            (o = r.id.split("__")[0]),
            (i = document.querySelector(".tab_active").dataset.str_trans.split(",")[0].trim()),
            0 == t && o == i && ((document.querySelector(".tab_active .tab_ref").textContent = s), (document.querySelector(".tab_active").dataset.ref_trans = o)),
            (e.parentElement.querySelector(".partDesk .desk_sh_link").innerHTML = s),
            (e.parentElement.querySelector(".partMob .mob_sh_link").innerHTML = s));
    });
}
async function obtenerDatosDeAPI(e) {
    try {
        var t = await fetch(e);
        if (!t.ok) throw new Error("Error al obtener datos de la API");
        await t.text();
    } catch (e) {
        console.error("Error:", e);
    }
}
function doPageDownOnScroll() {
    let n = document.querySelector(".colsInner");
    n.addEventListener("scroll", function (e) {
        var t = n.scrollTop,
            a = n.offsetHeight,
            r = n.scrollHeight;
        a < t && r - 5 <= t + a && chapterGo("next");
    });
}
function markarStrongNumberFinded() {
    document.querySelectorAll("#find_body p s").forEach((e) => {
        e.innerHTML.includes('<b class="f_red">') ? e.classList.add("show", "strongActive", "finded_strongActive") : e.classList.add("show", "strongActive", "other_strongActive");
    });
}
function showOnlyStrongNumberFinded_2Actions() {
    markarStrongNumberFinded(), showOnlyStrongNumberFinded();
}
function showOnlyStrongNumberFinded() {
    var e = document.getElementById("btn_finded_s"),
        t = document.getElementById("btn_all_s");
    e.classList.add("s_active"),
        t.classList.remove("s_active"),
        markarStrongNumberFinded(),
        document.querySelectorAll("#find_body p s").forEach((e) => {
            e.classList.contains("finded_strongActive") ? (e.style.display = "inline-block") : (e.style.display = "none");
        }),
        makeStrongNumbersActiveFind();
}
function showAllStrongNumber_2Actions() {
    markarStrongNumberFinded(), showAllStrongNumber();
}
function showAllStrongNumber() {
    var e = document.getElementById("btn_finded_s"),
        t = document.getElementById("btn_all_s");
    e.classList.remove("s_active"),
        t.classList.add("s_active"),
        document.querySelectorAll("#find_body p s").forEach((e) => {
            e.style.display = "inline-block";
        }),
        makeStrongNumbersActiveFind();
}
function checkMaxWidthCol() {
    var e = document.getElementById("btnMaxWidthCol"),
        t = document.getElementById("m_btnMaxWidthCol"),
        a = document.getElementById("d_sw_MaxWidthCol").querySelector("input");
    (enable_maxWidthCol ? (e.classList.add("btn_active"), t.classList.add("btn_active"), enableSwitcher) : (e.classList.remove("btn_active"), t.classList.remove("btn_active"), disableSwitcher))(a);
}
function enableDisableMaxWidthCol() {
    (enable_maxWidthCol = !enable_maxWidthCol), checkMaxWidthCol(), mySizeWindow(), mySizeVerse();
}
function checkMinOtrasTrans() {
    var e = document.getElementById("btnMinOtrasTrans"),
        t = document.getElementById("m_btnMinOtrasTrans"),
        a = document.getElementById("d_sw_MinOtrasTrans").querySelector("input");
    (minOtrasTrans ? (e.classList.add("btn_active"), t.classList.add("btn_active"), enableSwitcher) : (e.classList.remove("btn_active"), t.classList.remove("btn_active"), disableSwitcher))(a);
}
function enableDisableMinOtrasTrans() {
    (minOtrasTrans = !minOtrasTrans), checkMinOtrasTrans(), mySizeWindow(), mySizeVerse(), closeModal(null, !0);
}
function toggleIMGx2() {
    var e,
        t = "styleId_IMGx2",
        a = document.getElementById(t);
    enable_IMGx2
        ? a
            ? (a.innerHTML = ` .colsInner img, span.vt img {  width: 200%; }   `)
            : (((e = document.createElement("style")).id = t), (e.innerHTML = ` .colsInner img, span.vt img {  width: 200%; }  `), document.head.appendChild(e))
        : a && a.remove();
}
function checkIMGx2() {
    var e = document.getElementById("btnIMGx2"),
        t = document.getElementById("m_btnIMGx2"),
        a = document.getElementById("d_sw_btnIMGx2").querySelector("input");
    (enable_IMGx2 ? (e.classList.add("btn_active"), t.classList.add("btn_active"), enableSwitcher) : (e.classList.remove("btn_active"), t.classList.remove("btn_active"), disableSwitcher))(a);
}
function enableDisableIMGx2() {
    (enable_IMGx2 = !enable_IMGx2), checkIMGx2(), toggleIMGx2();
}
function toggleSwitcher(e) {
    e = document.getElementById(e).querySelector("input");
    (e.checked ? disableSwitcher : enableSwitcher)(e);
}
function enableSwitcher(e) {
    e.checked = !0;
}
function disableSwitcher(e) {
    e.checked = !1;
}
function checkModoMobile() {
    var e = document.getElementById("d_sw_modoMobile").querySelector("input");
    (modoMobile
        ? ((positionShow = "row"), (pantallaTabletMinPx = 1201), (pantallaTabletMaxPx = 1439), (pantallaDesktopSmallMinPx = 1439), enableSwitcher)
        : ((positionShow = "col"), (pantallaTabletMinPx = 768), (pantallaTabletMaxPx = 1023), (pantallaDesktopSmallMinPx = 1024), disableSwitcher))(e),
        enableDisableResp1200();
}
function enableDisableModoMobile() {
    (modoMobile = !modoMobile), checkModoMobile(), enableDisableResp1200();
}
function enableDisableResp1200() {
    var e = document.getElementById("estilos_resp");
    modoMobile ? (e.href = "./css/bible_app_resp1200.css") : (e.href = "./css/bible_app_resp.css"),
        (positionShow = window.innerWidth < pantallaTabletMinPx ? "row" : "col"),
        checkNextPositionShow(),
        setTimeout(() => {
            mySizeModoMobile(), setTimeout(() => {}, 10);
        }, 10);
}
function mySizeModoMobile() {
    document.querySelectorAll(".colsHead").forEach((e) => {
        e.removeAttribute("style"),
            modoMobile && window.innerWidth < pantallaTabletMinPx && window.innerWidth > pantallaMobileMaxPx ? e.querySelector(".partMobInner").classList.add("pad5") : e.querySelector(".partMobInner").classList.remove("pad5");
    }),
        setTimeout(() => {
            mySizeWindow(), mySizeVerse();
        }, 100);
}
function showHidePassword(e) {
    e.checked
        ? e.parentElement.parentElement.parentElement.querySelectorAll(".type_password").forEach((e) => {
              e.type = "text";
          })
        : e.parentElement.parentElement.parentElement.querySelectorAll(".type_password").forEach((e) => {
              e.type = "password";
          });
}
function validarEmail(e) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}
function validarPassword(e) {
    return /^.{6,}$/.test(e);
}
function showBlockCookies() {
    var e = document.getElementById("cookie-consent");
    e.classList.contains("hidden") && e.classList.remove("hidden");
}
(eid_inpt_nav.onblur = () => {
    mySizeNav(),
        setTimeout(() => {
            mySizeNav(),
                setTimeout(() => {
                    mySizeNav();
                }, delay2);
        }, delay2);
}),
    (eid_inpt_find.onblur = () => {
        mySizeFind(),
            setTimeout(() => {
                mySizeFind(),
                    setTimeout(() => {
                        mySizeFind();
                    }, delay2);
            }, delay2);
    }),
    (eid_inpt_strong.onblur = () => {
        mySizeStrong(),
            setTimeout(() => {
                mySizeStrong(),
                    setTimeout(() => {
                        mySizeStrong();
                    }, delay2);
            }, delay2);
    });
