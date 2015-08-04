webpackJsonp([3], {
            0: function(e, t, r) {
                "use strict";
                r(27), r(28), r(23), Object.assign || r(24).shim();
                var n = r(30),
                    o = r(31),
                    a = r(1),
                    i = r(2),
                    s = r(3),
                    c = o.DefaultRoute,
                    l = (o.Link, o.Route),
                    u = o.RouteHandler,
                    p = r(25),
                    h = n.createClass({
                        displayName: "Entrance",
                        contextTypes: {
                            router: n.PropTypes.func
                        },
                        render: function() {
                            var e = this.context.router.getCurrentPath();
                            return n.createElement(p, {
                                component: "div",
                                transitionName: "entrance"
                            }, n.createElement(u, {
                                key: e
                            }))
                        }
                    }),
                    f = n.createElement(l, {
                        name: "entrance",
                        path: "/",
                        handler: h
                    }, n.createElement(l, {
                        name: "support",
                        handler: a
                    }), n.createElement(l, {
                        name: "login",
                        handler: a
                    }), n.createElement(l, {
                        name: "register",
                        handler: i
                    }), n.createElement(l, {
                        name: "forgetPassword",
                        handler: s
                    }), n.createElement(c, {
                        handler: a
                    }));
                o.run(f, function(e) {
                    n.render(n.createElement(e, null), document.getElementById("formWrapper"))
                })
            },
            1: function(e, t, r) {
                "use strict";
                var n = r(30),
                    o = r(32),
                    a = r(26),
                    i = r(33),
                    s = r(7),
                    c = r(34),
                    l = r(16),
                    u = r(15),
                    p = r(31),
                    h = p.Link,
                    f = p.State,
                    d = r(22),
                    m = r(35),
                    v = s.getModule("login"),
                    g = r(36),
                    y = n.createClass({
                        displayName: "LoginPanel",
                        mixins: [a.listenTo(m, "_userStoreListener"), f],
                        getInitialState: function() {
                            return {
                                randomKey: null,
                                errorMsg: "",
                                validateFields: {
                                    account: !1,
                                    password: !1
                                }
                            }
                        },
                        componentWillMount: function() {
                            Number(l.getItem(u.loginTimes.key)) >= u.loginTimes.times ? this.setState({
                                randomKey: i.uuid()
                            }) : this.setState({
                                randomKey: null
                            })
                        },
                        _userStoreListener: function(e) {
                            if ("auth" === e.type) {
                                var t = e.data.result;
                                if (t === u.request.success) {
                                    l.removeItem(u.loginTimes.key);
                                    var r = this.getRoutes(),
                                        n = r[r.length - 1];
                                    if ("support" == n.name) {
                                        var o = c.getParameterByName("return_url") || u.supportUrl,
                                            a = e.data.data,
                                            s = a.userAvatar.substring(a.userAvatar.lastIndexOf("/") + 1),
                                            p = o.indexOf("?") > 0 ? "&" : "?";
                                        window.location.href = o + p + "token=" + a.token + "&nickname=" + encodeURIComponent(a.nickname) + "&avatar=" + s
                                    } else {
                                        var o = c.getParameterByName("return_url");
                                        o ? window.location.href = o : window.location.href = "/app"
                                    }
                                } else {
                                    var h = Number(l.getItem(u.loginTimes.key)) + 1,
                                        f = e.data.message; - 1 === f.indexOf(v.verificationKey) && (f = v.invalidate), this.setState({
                                        errorMsg: f,
                                        randomKey: i.uuid()
                                    }), l.addItem(u.loginTimes.key, h), h >= u.loginTimes.times ? this.setState({
                                        randomKey: i.uuid()
                                    }) : this.setState({
                                        randomKey: null
                                    })
                                }
                            }
                        },
                        _login: function(e) {
                            e.preventDefault();
                            var t = this.refs.account.getDOMNode().value,
                                r = this.refs.password.getDOMNode().value,
                                n = {};
                            if (!t) return n.account = !0, void this.setState({
                                errorMsg: v.invalidate
                            });
                            if (n.account = !1, !r) return n.password = !0, void this.setState({
                                errorMsg: v.invalidate
                            });
                            n.password = !1, this.setState({
                                validateFields: n,
                                errorMsg: ""
                            });
                            var o = {
                                account: t,
                                password: r
                            };
                            if (Number(l.getItem(u.loginTimes.key)) >= u.loginTimes.times) {
                                var a = this.refs.verification.getDOMNode().value;
                                if (!a) return void this.setState({
                                    errorMsg: v.verificationNotNull
                                });
                                o.randomKey = this.state.randomKey, o.verification = a
                            }
                            d.auth(o)
                        },
                        _aChange: function(e) {
                            e.preventDefault(), this.setState({
                                randomKey: i.uuid()
                            })
                        },
                        render: function() {
                            var e = o({
                                    account: !0,
                                    invalidate: this.state.validateFields.account
                                }),
                                t = o({
                                    password: !0,
                                    invalidate: this.state.validateFields.password
                                }),
                                r = this.state.randomKey ? n.createElement("div", {
                                    className: "validate-wrapper"
                                }, n.createElement("input", {
                                    className: "verification",
                                    type: "text",
                                    name: "verification",
                                    ref: "verification",
                                    placeholder: v.verification,
                                    onFocus: this._clearErrorMsg
                                }), n.createElement("img", {
                                    className: "code-img",
                                    src: u.verificationImg + this.state.randomKey,
                                    onClick: this._aChange
                                })) : null;
                            return n.createElement("div", {
                                className: "login-panel entrance-form"
                            }, n.createElement(g, {
                                content: this.state.errorMsg,
                                show: !0
                            }), n.createElement("div", {
                                className: "header"
                            }, n.createElement("div", {
                                className: "title"
                            }, v.login)), n.createElement("form", {
                                className: "login-form"
                            }, n.createElement("input", {
                                className: e,
                                type: "text",
                                name: "account",
                                ref: "account",
                                placeholder: v.name,
                                autocomplete: "off"
                            }), n.createElement("input", {
                                className: t,
                                type: "password",
                                name: "password",
                                ref: "password",
                                placeholder: v.password,
                                autocomplete: "off"
                            }), r, n.createElement("div", {
                                className: "forget-passwor-wrapper"
                            }, n.createElement(h, {
                                className: "forget-password",
                                to: "forgetPassword"
                            }, v.forgetPassword)), n.createElement("button", {
                                className: "login btn primary-btn",
                                onClick: this._login
                            }, v.login)), n.createElement(h, {
                                className: "register btn empty-btn",
                                to: "register"
                            }, v.register))
                        }
                    });
                e.exports = y
            },
            2: function(e, t, r) {
                "use strict";
                var n = r(30),
                    o = r(39),
                    a = r(32),
                    i = r(26),
                    s = r(31).Link,
                    c = r(7),
                    l = r(22),
                    u = r(35),
                    p = c.getModule("register"),
                    h = r(38),
                    f = r(15),
                    d = (r(33), r(34)),
                    m = n.createClass({
                        displayName: "RegisterPanel",
                        mixins: [i.listenTo(u, "_userStoreListener")],
                        getInitialState: function() {
                            return {
                                errorNickname: "",
                                errorAccount: "",
                                errorPwd: "",
                                errorConfirmPwd: "",
                                errorCaptchaCode: "",
                                validateFields: {
                                    nickname: !1,
                                    account: !1,
                                    pwd: !1,
                                    confirmPwd: !1,
                                    captcha: !1
                                },
                                countdown: !1,
                                hasSubmit: !1
                            }
                        },
                        _userStoreListener: function(e) {
                            if ("register" === e.type) {
                                var t = e.data.result;
                                if (t === f.request.success) {
                                    var r = d.getParameterByName("return_url");
                                    r ? window.location.href = r : window.location.href = "/app"
                                } else {
                                    var n = e.data.message;
                                    n.indexOf(p.captchaCode) > -1 ? this.setState({
                                        countdown: !1,
                                        hasSubmit: !1,
                                        errorCaptchaCode: n
                                    }) : this.setState({
                                        countdown: !1,
                                        hasSubmit: !1,
                                        errorAccount: n
                                    })
                                }
                            } else "verification" === e.type && e.data.result !== f.request.success && this.setState({
                                countdown: !1,
                                errorAccount: e.data.message
                            })
                        },
                        _getVerification: function() {
                            var e = this.refs.account.getDOMNode().value;
                            return e ? (this.setState({
                                countdown: !0,
                                errorCaptchaCode: ""
                            }), void l.verification({
                                account: this.refs.account.getDOMNode().value
                            })) : void this.setState({
                                errorAccount: p.errorAccountNotBlank
                            })
                        },
                        _register: function() {
                            var e = this._getUserData();
                            this._submitCheck(e) && (this.setState({
                                hasSubmit: !0
                            }), l.register(e))
                        },
                        _getUserData: function() {
                            var e = {};
                            return e.account = this.refs.account.getDOMNode().value, e.password = this.refs.password.getDOMNode().value, e.pwdConfirm = this.refs.pwdConfirm.getDOMNode().value, e.nickname = this.refs.nickname.getDOMNode().value, e.captcha = this.refs.captcha.getDOMNode().value, e
                        },
                        _submitCheck: function(e) {
                            var t = {};
                            t.nickname = e.nickname ? !1 : !0, t.account = e.account ? !1 : !0, t.pwd = e.password ? !1 : !0, t.confirmPwd = e.pwdConfirm ? !1 : !0, t.captcha = e.captcha ? !1 : !0, this.setState({
                                validateFields: t
                            });
                            var r = e.nickname && e.account && e.password && e.pwdConfirm && e.captcha;
                            return r && this._checkNickName() && this._checkAccount() && this._checkPassword() && this._checkConfirmPassword() ? !0 : !1
                        },
                        _checkNickName: function(e) {
                            e && e.preventDefault();
                            var t = this.refs.nickname.getDOMNode().value;
                            return t && t.length > 20 ? (this.setState({
                                errorNickname: p.errorNickname
                            }), !1) : (this.setState({
                                errorNickname: ""
                            }), !0)
                        },
                        _checkAccount: function(e) {
                            e && e.preventDefault();
                            var t = this.refs.account.getDOMNode().value;
                            if (t) {
                                var r = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
                                    n = /^[0-9]*$/;
                                if (!r.test(t) && !n.test(t)) return this.setState({
                                    errorAccount: p.errorAccount
                                }), !1;
                                if (t.length > 50) return this.setState({
                                    errorAccount: p.errorAccountLength
                                }), !1
                            }
                            return this.setState({
                                errorAccount: ""
                            }), !0
                        },
                        _checkPassword: function(e) {
                            e && e.preventDefault();
                            var t = this.refs.password.getDOMNode().value + "",
                                r = this.refs.pwdConfirm.getDOMNode().value + "";
                            if (t) {
                                var n = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/gi,
                                    o = n.test(t);
                                if (!o) return this.setState({
                                    errorPwd: p.errorPwd
                                }), !1;
                                if (r && t !== r) return this.setState({
                                    errorPwd: p.errorSamePwd
                                }), !1
                            }
                            return t === r && this.setState({
                                errorConfirmPwd: ""
                            }), this.setState({
                                errorPwd: ""
                            }), !0
                        },
                        _checkConfirmPassword: function(e) {
                            e && e.preventDefault();
                            var t = this.refs.password.getDOMNode().value + "",
                                r = this.refs.pwdConfirm.getDOMNode().value + "";
                            if (r) {
                                var n = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/gi,
                                    o = n.test(r);
                                if (!o) return this.setState({
                                    errorConfirmPwd: p.errorPwd
                                }), !1;
                                if (t && t !== r) return this.setState({
                                    errorConfirmPwd: p.errorSamePwd
                                }), !1
                            }
                            return t === r && this.setState({
                                errorPwd: ""
                            }), this.setState({
                                errorConfirmPwd: ""
                            }), !0
                        },
                        _clearNickName: function(e) {
                            e && e.preventDefault();
                            var t = o(this.state.validateFields, {
                                nickname: {
                                    $set: !1
                                }
                            });
                            this.setState({
                                validateFields: t,
                                errorNickname: null
                            })
                        },
                        _clearAccount: function(e) {
                            e && e.preventDefault();
                            var t = o(this.state.validateFields, {
                                account: {
                                    $set: !1
                                }
                            });
                            this.setState({
                                errorAccount: null,
                                validateFields: t
                            })
                        },
                        _clearConfirmPassword: function(e) {
                            e && e.preventDefault();
                            var t = o(this.state.validateFields, {
                                confirmPwd: {
                                    $set: !1
                                }
                            });
                            this.setState({
                                validateFields: t,
                                errorConfirmPwd: null
                            })
                        },
                        _clearPassword: function(e) {
                            e && e.preventDefault();
                            var t = o(this.state.validateFields, {
                                pwd: {
                                    $set: !1
                                }
                            });
                            this.setState({
                                validateFields: t,
                                errorPwd: null
                            })
                        },
                        _clearCaptcha: function(e) {
                            e && e.preventDefault();
                            var t = o(this.state.validateFields, {
                                captcha: {
                                    $set: !1
                                }
                            });
                            this.setState({
                                validateFields: t,
                                errorCaptchaCode: null
                            })
                        },
                        _countdownStop: function() {
                            this.setState({
                                countdown: !1
                            })
                        },
                        render: function() {
                            var e = a({
                                    "nick-name": !0,
                                    invalidate: this.state.validateFields.nickname
                                }),
                                t = a({
                                    account: !0,
                                    invalidate: this.state.validateFields.account
                                }),
                                r = a({
                                    password: !0,
                                    invalidate: this.state.validateFields.pwd
                                }),
                                o = a({
                                    "pwd-confirm": !0,
                                    invalidate: this.state.validateFields.confirmPwd
                                }),
                                i = a({
                                    captcha: !0,
                                    invalidate: this.state.validateFields.captcha
                                }),
                                l = null;
                            l = this.state.countdown ? n.createElement("button", {
                                className: "btn empty-btn captcha-btn"
                            }, n.createElement(h, {
                                onStop: this._countdownStop
                            }), n.createElement("span", null, c.getMessage("register", "verificationUnit"))) : n.createElement("button", {
                                className: "btn empty-btn captcha-btn",
                                onClick: this._getVerification
                            }, p.captcha);
                            var u = a({
                                    regsiter: !0,
                                    btn: !0,
                                    "primary-btn": !0,
                                    disabled: this.state.hasSubmit
                                }),
                                d = this._register,
                                m = p.register;
                            this.state.hasSubmit && (d = null, m = p.registerLoading);
                            var v = n.createElement("button", {
                                id: "registerBtn",
                                className: u,
                                onClick: d
                            }, m);
                            return n.createElement("div", {
                                className: "register-panel entrance-form"
                            }, n.createElement("div", {
                                className: "header"
                            }, n.createElement("div", {
                                className: "title"
                            }, p.title)), n.createElement("div", {
                                className: "register-control"
                            }, n.createElement("div", {
                                className: "input-panel"
                            }, n.createElement("input", {
                                className: e,
                                type: "text",
                                name: "nickname",
                                ref: "nickname",
                                onBlur: this._checkNickName,
                                onFocus: this._clearNickName,
                                placeholder: p.nickname
                            }), n.createElement("div", {
                                className: "error-message"
                            }, this.state.errorNickname), n.createElement("input", {
                                className: t,
                                type: "text",
                                name: "account",
                                ref: "account",
                                onBlur: this._checkAccount,
                                onFocus: this._clearAccount,
                                placeholder: p.account
                            }), n.createElement("div", {
                                className: "error-message"
                            }, this.state.errorAccount), n.createElement("input", {
                                className: r,
                                type: "password",
                                name: "password",
                                ref: "password",
                                onBlur: this._checkPassword,
                                onFocus: this._clearPassword,
                                placeholder: p.password
                            }), n.createElement("div", {
                                className: "error-message"
                            }, this.state.errorPwd), n.createElement("input", {
                                className: o,
                                type: "password",
                                name: "pwdConfirm",
                                ref: "pwdConfirm",
                                onBlur: this._checkConfirmPassword,
                                onFocus: this._clearConfirmPassword,
                                placeholder: p.pwdConfirm
                            }), n.createElement("div", {
                                className: "error-message"
                            }, this.state.errorConfirmPwd), n.createElement("div", {
                                className: "validate-wrapper"
                            }, n.createElement("input", {
                                className: i,
                                type: "text",
                                name: "captcha",
                                ref: "captcha",
                                onFocus: this._clearCaptcha,
                                placeholder: p.captchaInput
                            }), l), n.createElement("div", {
                                className: "error-message captcha-error"
                            }, this.state.errorCaptchaCode), n.createElement("div", {
                                className: "verification-info"
                            }, n.createElement("span", null, p.captchaInfo), n.createElement("a", {
                                href: f.helpURL.noReceiveCaptcha,
                                className: "help",
                                target: "_blank"
                            }, p.help))), n.createElement("div", {
                                className: "action-control"
                            }, v, n.createElement(s, {
                                to: "login",
                                className: "btn empty-btn"
                            }, p.login))))
                        }
                    });
                e.exports = m
            },
            3: function(e, t, r) {
                "use strict";
                var n = r(30),
                    o = r(26),
                    a = r(31),
                    i = a.Link,
                    s = r(37),
                    c = r(38),
                    l = r(15),
                    u = r(33),
                    p = r(7),
                    h = r(22),
                    f = r(35),
                    d = p.getModule("forgetPassword"),
                    m = n.createClass({
                        displayName: "ForgetPassword",
                        mixins: [s, o.listenTo(f, "_userStoreListener")],
                        getInitialState: function() {
                            return {
                                countdown: !1,
                                randomKey: u.uuid(),
                                captchaPassed: !1,
                                tenantId: null,
                                errorMsg: ""
                            }
                        },
                        _userStoreListener: function(e) {
                            var t = this,
                                r = e.type;
                            switch (r) {
                                case "forgetSendCaptcha":
                                    e.data.result !== l.request.success ? this.setState({
                                        countdown: !1,
                                        errorMsg: e.data.message,
                                        randomKey: u.uuid()
                                    }) : t.setState({
                                        errorMsg: d.captchaHasSend,
                                        tenantId: e.data.data.twTenant
                                    });
                                    break;
                                case "resetPassword":
                                    e.data.result !== l.request.success ? this.setState({
                                        errorMsg: e.data.message
                                    }) : window.setTimeout(function() {
                                        window.location.href = "/entrance"
                                    }, 200);
                                    break;
                                case "checkAccountValid":
                                    e.data.result !== l.request.success ? this.setState({
                                        errorMsg: e.data.message,
                                        randomKey: u.uuid()
                                    }) : t.setState({
                                        tenantId: e.data.data.tenantId,
                                        account: this.refs.account.getDOMNode().value,
                                        captchaPassed: !0
                                    })
                            }
                        },
                        _aChange: function(e) {
                            e.preventDefault(), this.setState({
                                randomKey: u.uuid()
                            })
                        },
                        _clearErrorMsg: function(e) {
                            e.preventDefault(), this.setState({
                                errorMsg: ""
                            })
                        },
                        _fetchCaptcha: function(e) {
                            e.preventDefault();
                            var t = this.refs.account.getDOMNode().value,
                                r = this.refs.verification.getDOMNode().value;
                            return t && r ? (this.setState({
                                countdown: !0
                            }), void h.forgetSendCaptcha({
                                account: t,
                                randomKey: this.state.randomKey,
                                verification: r
                            })) : void this.setState({
                                errorMsg: d.accountVerifyNotNull
                            })
                        },
                        _validAccount: function(e) {
                            e.preventDefault();
                            var t = this.refs.account.getDOMNode().value,
                                r = this.refs.verification.getDOMNode().value,
                                n = this.refs.captcha.getDOMNode().value;
                            return t && r && n ? this.isEmail(t) || this.isPhone(t) ? void h.checkAccountValid({
                                account: t,
                                tenantId: this.state.tenantId,
                                randomKey: this.state.randomKey,
                                verification: r,
                                captcha: n
                            }) : void this.setState({
                                errorMsg: d.accountError
                            }) : void this.setState({
                                errorMsg: d.accountValidNotNull
                            })
                        },
                        _resetPassword: function(e) {
                            e.preventDefault();
                            var t = this.refs.password.getDOMNode().value,
                                r = this.refs.rePassword.getDOMNode().value;
                            return t && r ? t !== r ? void this.setState({
                                errorMsg: d.checkSamePassword
                            }) : this.isPassword(t) ? void h.resetPassword({
                                account: this.state.account,
                                tenantId: this.state.tenantId,
                                password: t
                            }) : void this.setState({
                                errorMsg: d.passwordError
                            }) : void this.setState({
                                errorMsg: d.passwordInputNotNull
                            })
                        },
                        _countdownStop: function() {
                            this.setState({
                                countdown: !1
                            })
                        },
                        render: function() {
                            var e = null;
                            e = this.state.countdown ? n.createElement("button", {
                                className: "btn empty-btn captcha-btn"
                            }, n.createElement(c, {
                                onStop: this._countdownStop
                            }), n.createElement("span", null, d.verificationUnit)) : n.createElement("button", {
                                className: "btn empty-btn captcha-btn",
                                onClick: this._fetchCaptcha
                            }, d.fetchCaptcha);
                            var t = this.state.captchaPassed ? n.createElement("div", {
                                    className: "password-panel",
                                    key: "passwordArea"
                                }, n.createElement("input", {
                                    type: "password",
                                    name: "newPassword",
                                    ref: "password",
                                    autocomplete: "off",
                                    placeholder: d.password,
                                    onFocus: this._clearErrorMsg
                                }), n.createElement("input", {
                                    type: "password",
                                    className: "re-password",
                                    name: "rePassword",
                                    ref: "rePassword",
                                    autocomplete: "off",
                                    placeholder: d.rePassword,
                                    onFocus: this._clearErrorMsg
                                })) : n.createElement("div", {
                                    className: "account-valid-panel",
                                    key: "accountValidPanel"
                                }, n.createElement("input", {
                                    type: "text",
                                    className: "account",
                                    name: "account",
                                    ref: "account",
                                    placeholder: d.account,
                                    autocomplete: "off",
                                    onFocus: this._clearErrorMsg
                                }), n.createElement("div", {
                                    className: "validate-wrapper"
                                }, n.createElement("input", {
                                    className: "verification",
                                    type: "text",
                                    name: "verification",
                                    ref: "verification",
                                    placeholder: d.verification,
                                    autocomplete: "off",
                                    onFocus: this._clearErrorMsg
                                }), n.createElement("img", {
                                    className: "code-img",
                                    src: l.verificationImg + this.state.randomKey,
                                    onClick: this._aChange
                                })), n.createElement("div", {
                                    className: "validate-wrapper"
                                }, n.createElement("input", {
                                    type: "text",
                                    className: "captcha",
                                    name: "captcha",
                                    ref: "captcha",
                                    placeholder: d.captchaInput,
                                    onFocus: this._clearErrorMsg
                                }), e)),
                                r = this.state.captchaPassed ? n.createElement("button", {
                                    className: "complete btn primary-btn",
                                    onClick: this._resetPassword,
                                    id: "complete"
                                }, d.complete) : n.createElement("button", {
                                    className: "reset-password btn primary-btn",
                                    onClick: this._validAccount,
                                    id: "resetPassword"
                                }, d.resetPassword);
                            return n.createElement("div", {
                                className: "forget-password entrance-form"
                            }, n.createElement("div", {
                                className: "header"
                            }, n.createElement("div", {
                                className: "title"
                            }, d.resetPassword)), t, n.createElement("div", {
                                className: "error-message"
                            }, this.state.errorMsg), n.createElement("div", {
                                className: "action-control"
                            }, r, n.createElement(i, {
                                to: "login",
                                className: "btn empty-btn re-login"
                            }, d.reLogin)))
                        }
                    });
                e.exports = m
            },
            23: function(e, t, r) {
                    ! function(r, n) {
                        "function" == typeof define && define.amd ? define(n) : "object" == typeof t ? e.exports = n() : r.returnExports = n()
                    }(this, function() {
                            "use strict";

                            function e(e) {
                                var t = [];
                                for (var r in e) t.push(r);
                                return t
                            }
                            var t, r = function(e) {
                                    return function() {
                                        return !e.apply(this, arguments)
                                    }
                                },
                                n = function(e) {
                                    try {
                                        return e(), !1
                                    } catch (t) {
                                        return !0
                                    }
                                },
                                o = function(e) {
                                    try {
                                        return e()
                                    } catch (t) {
                                        return !1
                                    }
                                },
                                a = r(n),
                                i = function(e, t) {
                                    return Object.setPrototypeOf ? o(function() {
                                        var r = function n(t) {
                                            var r = new e(t);
                                            return Object.setPrototypeOf(r, n.prototype), r
                                        };
                                        return r.prototype = S(e.prototype, {
                                            constructor: {
                                                value: e
                                            }
                                        }), t(r)
                                    }) : !1
                                },
                                s = function() {
                                    return !n(function() {
                                        Object.defineProperty({}, "x", {})
                                    })
                                },
                                c = function() {
                                    return String.prototype.startsWith && n(function() {
                                        "/a/".startsWith(/a/)
                                    })
                                },
                                l = function() {
                                    return String.prototype.startsWith && "abc".startsWith("a", 1 / 0) === !1
                                }(),
                                u = new Function("return this;"),
                                p = u(),
                                h = p.isFinite,
                                f = !!Object.defineProperty && s(),
                                d = (function() {
                                    return null === this
                                }.call(null), c() && l),
                                m = Function.call.bind(String.prototype.indexOf),
                                v = Function.call.bind(Object.prototype.toString),
                                g = Function.call.bind(Object.prototype.hasOwnProperty),
                                y = function() {},
                                b = p.Symbol || {},
                                w = b.species || "@@species",
                                E = {
                                    object: function(e) {
                                        return null !== e && "object" == typeof e
                                    },
                                    string: function(e) {
                                        return "[object String]" === v(e)
                                    },
                                    regex: function(e) {
                                        return "[object RegExp]" === v(e)
                                    },
                                    symbol: function(e) {
                                        return "function" == typeof p.Symbol && "symbol" == typeof e
                                    }
                                },
                                _ = Number.isNaN || function(e) {
                                    return e !== e
                                },
                                C = Number.isFinite || function(e) {
                                    return "number" == typeof e && h(e)
                                },
                                O = function(e, t, r, n) {
                                    !n && t in e || (f ? Object.defineProperty(e, t, {
                                        configurable: !0,
                                        enumerable: !1,
                                        writable: !0,
                                        value: r
                                    }) : e[t] = r)
                                },
                                T = {
                                    getter: function(e, t, r) {
                                        if (!f) throw new TypeError("getters require true ES5 support");
                                        Object.defineProperty(e, t, {
                                            configurable: !0,
                                            enumerable: !1,
                                            get: r
                                        })
                                    },
                                    proxy: function(e, t, r) {
                                        if (!f) throw new TypeError("getters require true ES5 support");
                                        var n = Object.getOwnPropertyDescriptor(e, t);
                                        Object.defineProperty(r, t, {
                                            configurable: n.configurable,
                                            enumerable: n.enumerable,
                                            get: function() {
                                                return e[t]
                                            },
                                            set: function(r) {
                                                e[t] = r
                                            }
                                        })
                                    },
                                    redefine: function(e, t, r) {
                                        if (f) {
                                            var n = Object.getOwnPropertyDescriptor(e, t);
                                            n.value = r, Object.defineProperty(e, t, n)
                                        } else e[t] = r
                                    },
                                    preserveToString: function(e, t) {
                                        O(e, "toString", t.toString.bind(t), !0)
                                    }
                                },
                                x = function(e, t) {
                                    Object.keys(t).forEach(function(r) {
                                        var n = t[r];
                                        O(e, r, n, !1)
                                    })
                                },
                                S = Object.create || function(e, t) {
                                    function r() {}
                                    r.prototype = e;
                                    var n = new r;
                                    return "undefined" != typeof t && x(n, t), n
                                },
                                N = E.symbol(b.iterator) ? b.iterator : "_es6-shim iterator_";
                            p.Set && "function" == typeof(new p.Set)["@@iterator"] && (N = "@@iterator");
                            var k = function(e, t) {
                                    t || (t = function() {
                                        return this
                                    });
                                    var r = {};
                                    r[N] = t, x(e, r), !e[N] && E.symbol(N) && (e[N] = t)
                                },
                                P = function(e) {
                                    var t = v(e),
                                        r = "[object Arguments]" === t;
                                    return r || (r = "[object Array]" !== t && null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Function]" === v(e.callee)), r
                                },
                                D = Function.call.bind(Function.apply),
                                M = {
                                    Call: function(e, t) {
                                        var r = arguments.length > 2 ? arguments[2] : [];
                                        if (!M.IsCallable(e)) throw new TypeError(e + " is not a function");
                                        return D(e, t, r)
                                    },
                                    RequireObjectCoercible: function(e, t) {
                                        if (null == e) throw new TypeError(t || "Cannot call method on " + e)
                                    },
                                    TypeIsObject: function(e) {
                                        return null != e && Object(e) === e
                                    },
                                    ToObject: function(e, t) {
                                        return M.RequireObjectCoercible(e, t), Object(e)
                                    },
                                    IsCallable: function(e) {
                                        return "function" == typeof e && "[object Function]" === v(e)
                                    },
                                    ToInt32: function(e) {
                                        return M.ToNumber(e) >> 0
                                    },
                                    ToUint32: function(e) {
                                        return M.ToNumber(e) >>> 0
                                    },
                                    ToNumber: function(e) {
                                        if ("[object Symbol]" === v(e)) throw new TypeError("Cannot convert a Symbol value to a number");
                                        return +e
                                    },
                                    ToInteger: function(e) {
                                        var t = M.ToNumber(e);
                                        return _(t) ? 0 : 0 !== t && C(t) ? (t > 0 ? 1 : -1) * Math.floor(Math.abs(t)) : t
                                    },
                                    ToLength: function(e) {
                                        var t = M.ToInteger(e);
                                        return 0 >= t ? 0 : t > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : t
                                    },
                                    SameValue: function(e, t) {
                                        return e === t ? 0 === e ? 1 / e === 1 / t : !0 : _(e) && _(t)
                                    },
                                    SameValueZero: function(e, t) {
                                        return e === t || _(e) && _(t)
                                    },
                                    IsIterable: function(e) {
                                        return M.TypeIsObject(e) && ("undefined" != typeof e[N] || P(e))
                                    },
                                    GetIterator: function(e) {
                                        if (P(e)) return new t(e, "value");
                                        var r = e[N];
                                        if (!M.IsCallable(r)) throw new TypeError("value is not an iterable");
                                        var n = r.call(e);
                                        if (!M.TypeIsObject(n)) throw new TypeError("bad iterator");
                                        return n
                                    },
                                    IteratorNext: function(e) {
                                        var t = arguments.length > 1 ? e.next(arguments[1]) : e.next();
                                        if (!M.TypeIsObject(t)) throw new TypeError("bad iterator");
                                        return t
                                    },
                                    Construct: function(e, t) {
                                        var r;
                                        r = M.IsCallable(e[w]) ? e[w]() : S(e.prototype || null), x(r, {
                                            _es6construct: !0
                                        });
                                        var n = M.Call(e, r, t);
                                        return M.TypeIsObject(n) ? n : r
                                    },
                                    CreateHTML: function(e, t, r, n) {
                                        var o = String(e),
                                            a = "<" + t;
                                        if ("" !== r) {
                                            var i = String(n),
                                                s = i.replace(/"/g, "&quot;");
                                            a += " " + r + '="' + s + '"'
                                        }
                                        var c = a + ">",
                                            l = c + o;
                                        return l + "</" + t + ">"
                                    }
                                },
                                j = function(e) {
                                    if (!M.TypeIsObject(e)) throw new TypeError("bad object");
                                    return e._es6construct || (e.constructor && M.IsCallable(e.constructor[w]) && (e = e.constructor[w](e)), x(e, {
                                        _es6construct: !0
                                    })), e
                                };
                            if (String.fromCodePoint && 1 !== String.fromCodePoint.length) {
                                var I = Function.apply.bind(String.fromCodePoint);
                                O(String, "fromCodePoint", function(e) {
                                    return I(this, arguments)
                                }, !0)
                            }
                            var R = {
                                fromCodePoint: function(e) {
                                    for (var t, r = [], n = 0, o = arguments.length; o > n; n++) {
                                        if (t = Number(arguments[n]), !M.SameValue(t, M.ToInteger(t)) || 0 > t || t > 1114111) throw new RangeError("Invalid code point " + t);
                                        65536 > t ? r.push(String.fromCharCode(t)) : (t -= 65536, r.push(String.fromCharCode((t >> 10) + 55296)), r.push(String.fromCharCode(t % 1024 + 56320)))
                                    }
                                    return r.join("")
                                },
                                raw: function(e) {
                                    var t = M.ToObject(e, "bad callSite"),
                                        r = M.ToObject(t.raw, "bad raw value"),
                                        n = r.length,
                                        o = M.ToLength(n);
                                    if (0 >= o) return "";
                                    for (var a, i, s, c, l = [], u = 0; o > u && (a = String(u), s = String(r[a]), l.push(s), !(u + 1 >= o));) i = u + 1 < arguments.length ? arguments[u + 1] : "", c = String(i), l.push(c), u++;
                                    return l.join("")
                                }
                            };
                            if (x(String, R), "xy" !== String.raw({
                                    raw: {
                                        0: "x",
                                        1: "y",
                                        length: 2
                                    }
                                })) {
                                var A = String.raw;
                                O(String, "raw", R.raw, !0), T.preserveToString(String.raw, A)
                            }
                            var H = function At(e, t) {
                                    if (1 > t) return "";
                                    if (t % 2) return At(e, t - 1) + e;
                                    var r = At(e, t / 2);
                                    return r + r
                                },
                                L = 1 / 0,
                                F = {
                                    repeat: function(e) {
                                        M.RequireObjectCoercible(this);
                                        var t = String(this);
                                        if (e = M.ToInteger(e), 0 > e || e >= L) throw new RangeError("repeat count must be less than infinity and not overflow maximum string size");
                                        return H(t, e)
                                    },
                                    startsWith: function(e) {
                                        M.RequireObjectCoercible(this);
                                        var t = String(this);
                                        if (E.regex(e)) throw new TypeError('Cannot call method "startsWith" with a regex');
                                        e = String(e);
                                        var r = arguments.length > 1 ? arguments[1] : void 0,
                                            n = Math.max(M.ToInteger(r), 0);
                                        return t.slice(n, n + e.length) === e
                                    },
                                    endsWith: function(e) {
                                        M.RequireObjectCoercible(this);
                                        var t = String(this);
                                        if (E.regex(e)) throw new TypeError('Cannot call method "endsWith" with a regex');
                                        e = String(e);
                                        var r = t.length,
                                            n = arguments.length > 1 ? arguments[1] : void 0,
                                            o = "undefined" == typeof n ? r : M.ToInteger(n),
                                            a = Math.min(Math.max(o, 0), r);
                                        return t.slice(a - e.length, a) === e
                                    },
                                    includes: function(e) {
                                        var t = arguments.length > 1 ? arguments[1] : void 0;
                                        return -1 !== m(this, e, t)
                                    },
                                    codePointAt: function(e) {
                                        M.RequireObjectCoercible(this);
                                        var t = String(this),
                                            r = M.ToInteger(e),
                                            n = t.length;
                                        if (r >= 0 && n > r) {
                                            var o = t.charCodeAt(r),
                                                a = r + 1 === n;
                                            if (55296 > o || o > 56319 || a) return o;
                                            var i = t.charCodeAt(r + 1);
                                            return 56320 > i || i > 57343 ? o : 1024 * (o - 55296) + (i - 56320) + 65536
                                        }
                                    }
                                };
                            if (x(String.prototype, F), "a".includes("a", 1 / 0) !== !1) {
                                var z = String.prototype.includes;
                                O(String.prototype, "includes", F.includes, !0), T.preserveToString(String.prototype.includes, z)
                            }
                            var U = 1 !== "".trim().length;
                            if (U) {
                                delete String.prototype.trim;
                                var q = ["	\n\f\r   ᠎    ", "         　\u2028", "\u2029\ufeff"].join(""),
                                    Y = new RegExp("(^[" + q + "]+)|([" + q + "]+$)", "g");
                                x(String.prototype, {
                                    trim: function() {
                                        if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                                        return String(this).replace(Y, "")
                                    }
                                })
                            }
                            var B = function(e) {
                                M.RequireObjectCoercible(e), this._s = String(e), this._i = 0
                            };
                            B.prototype.next = function() {
                                var e = this._s,
                                    t = this._i;
                                if ("undefined" == typeof e || t >= e.length) return this._s = void 0, {
                                    value: void 0,
                                    done: !0
                                };
                                var r, n, o = e.charCodeAt(t);
                                return 55296 > o || o > 56319 || t + 1 === e.length ? n = 1 : (r = e.charCodeAt(t + 1), n = 56320 > r || r > 57343 ? 1 : 2), this._i = t + n, {
                                    value: e.substr(t, n),
                                    done: !1
                                }
                            }, k(B.prototype), k(String.prototype, function() {
                                return new B(this)
                            }), d || (O(String.prototype, "startsWith", F.startsWith, !0), O(String.prototype, "endsWith", F.endsWith, !0));
                            var W = {
                                from: function(e) {
                                    var t = arguments.length > 1 ? arguments[1] : void 0,
                                        r = M.ToObject(e, "bad iterable");
                                    if ("undefined" != typeof t && !M.IsCallable(t)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                                    var n, o, a, i, s = arguments.length > 2,
                                        c = s ? arguments[2] : void 0,
                                        l = M.IsIterable(r);
                                    if (l) {
                                        a = 0, o = M.IsCallable(this) ? Object(new this) : [];
                                        var u, p = l ? M.GetIterator(r) : null;
                                        do u = M.IteratorNext(p), u.done || (i = u.value, t ? o[a] = s ? t.call(c, i, a) : t(i, a) : o[a] = i, a += 1); while (!u.done);
                                        n = a
                                    } else
                                        for (n = M.ToLength(r.length), o = M.IsCallable(this) ? Object(new this(n)) : new Array(n), a = 0; n > a; ++a) i = r[a], t ? o[a] = s ? t.call(c, i, a) : t(i, a) : o[a] = i;
                                    return o.length = n, o
                                },
                                of: function() {
                                    return Array.from.call(this, arguments)
                                }
                            };
                            x(Array, W);
                            var G = function(e) {
                                return {
                                    value: e,
                                    done: 0 === arguments.length
                                }
                            };
                            t = function(e, t) {
                                this.i = 0, this.array = e, this.kind = t
                            }, x(t.prototype, {
                                next: function() {
                                    var e = this.i,
                                        r = this.array;
                                    if (!(this instanceof t)) throw new TypeError("Not an ArrayIterator");
                                    if ("undefined" != typeof r)
                                        for (var n = M.ToLength(r.length); n > e; e++) {
                                            var o, a = this.kind;
                                            return "key" === a ? o = e : "value" === a ? o = r[e] : "entry" === a && (o = [e, r[e]]), this.i = e + 1, {
                                                value: o,
                                                done: !1
                                            }
                                        }
                                    return this.array = void 0, {
                                        value: void 0,
                                        done: !0
                                    }
                                }
                            }), k(t.prototype);
                            var V = function(e, t) {
                                this.object = e, this.array = null, this.kind = t
                            };
                            x(V.prototype, {
                                next: function() {
                                    var t, r = this.array;
                                    if (!(this instanceof V)) throw new TypeError("Not an ObjectIterator");
                                    for (null === r && (r = this.array = e(this.object)); M.ToLength(r.length) > 0;)
                                        if (t = r.shift(), t in this.object) return G("key" === this.kind ? t : "value" === this.kind ? this.object[t] : [t, this.object[t]]);
                                    return G()
                                }
                            }), k(V.prototype);
                            var $ = function() {
                                var e = function(e) {
                                    this.length = e
                                };
                                e.prototype = [];
                                var t = Array.of.apply(e, [1, 2]);
                                return t instanceof e && 2 === t.length
                            }();
                            if (!$) {
                                var K = Array.of;
                                O(Array, "of", W.of, !0), T.preserveToString(Array.of, K)
                            }
                            var X = {
                                copyWithin: function(e, t) {
                                    var r = arguments[2],
                                        n = M.ToObject(this),
                                        o = M.ToLength(n.length);
                                    e = M.ToInteger(e), t = M.ToInteger(t);
                                    var a = 0 > e ? Math.max(o + e, 0) : Math.min(e, o),
                                        i = 0 > t ? Math.max(o + t, 0) : Math.min(t, o);
                                    r = "undefined" == typeof r ? o : M.ToInteger(r);
                                    var s = 0 > r ? Math.max(o + r, 0) : Math.min(r, o),
                                        c = Math.min(s - i, o - a),
                                        l = 1;
                                    for (a > i && i + c > a && (l = -1, i += c - 1, a += c - 1); c > 0;) g(n, i) ? n[a] = n[i] : delete n[i], i += l, a += l, c -= 1;
                                    return n
                                },
                                fill: function(e) {
                                    var t = arguments.length > 1 ? arguments[1] : void 0,
                                        r = arguments.length > 2 ? arguments[2] : void 0,
                                        n = M.ToObject(this),
                                        o = M.ToLength(n.length);
                                    t = M.ToInteger("undefined" == typeof t ? 0 : t), r = M.ToInteger("undefined" == typeof r ? o : r);
                                    for (var a = 0 > t ? Math.max(o + t, 0) : Math.min(t, o), i = 0 > r ? o + r : r, s = a; o > s && i > s; ++s) n[s] = e;
                                    return n
                                },
                                find: function(e) {
                                    var t = M.ToObject(this),
                                        r = M.ToLength(t.length);
                                    if (!M.IsCallable(e)) throw new TypeError("Array#find: predicate must be a function");
                                    for (var n, o = arguments.length > 1 ? arguments[1] : null, a = 0; r > a; a++)
                                        if (n = t[a], o) {
                                            if (e.call(o, n, a, t)) return n
                                        } else if (e(n, a, t)) return n
                                },
                                findIndex: function(e) {
                                    var t = M.ToObject(this),
                                        r = M.ToLength(t.length);
                                    if (!M.IsCallable(e)) throw new TypeError("Array#findIndex: predicate must be a function");
                                    for (var n = arguments.length > 1 ? arguments[1] : null, o = 0; r > o; o++)
                                        if (n) {
                                            if (e.call(n, t[o], o, t)) return o
                                        } else if (e(t[o], o, t)) return o;
                                    return -1
                                },
                                keys: function() {
                                    return new t(this, "key")
                                },
                                values: function() {
                                    return new t(this, "value")
                                },
                                entries: function() {
                                    return new t(this, "entry")
                                }
                            };
                            if (Array.prototype.keys && !M.IsCallable([1].keys().next) && delete Array.prototype.keys, Array.prototype.entries && !M.IsCallable([1].entries().next) && delete Array.prototype.entries, Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[N] && (x(Array.prototype, {
                                    values: Array.prototype[N]
                                }), E.symbol(b.unscopables) && (Array.prototype[b.unscopables].values = !0)), Array.prototype.values && "values" !== Array.prototype.values.name) {
                                var Z = Array.prototype.values;
                                O(Array.prototype, "values", function() {
                                    return Z.call(this)
                                }, !0), O(Array.prototype, N, Array.prototype.values, !0), T.preserveToString(Array.prototype.values, Z)
                            }
                            x(Array.prototype, X), k(Array.prototype, function() {
                                return this.values()
                            }), Object.getPrototypeOf && k(Object.getPrototypeOf([].values()));
                            var Q = function() {
                                    return o(function() {
                                        return 0 === Array.from({
                                            length: -1
                                        }).length
                                    })
                                },
                                J = function() {
                                    var e = Array.from([0].entries());
                                    return 1 === e.length && 0 === e[0][0] && 1 === e[0][1]
                                }();
                            if (!Q() || !J) {
                                var ee = Array.from;
                                O(Array, "from", W.from, !0), T.preserveToString(Array.from, ee)
                            }
                            var te = Math.pow(2, 53) - 1;
                            if (x(Number, {
                                    MAX_SAFE_INTEGER: te,
                                    MIN_SAFE_INTEGER: -te,
                                    EPSILON: 2.220446049250313e-16,
                                    parseInt: p.parseInt,
                                    parseFloat: p.parseFloat,
                                    isFinite: C,
                                    isInteger: function(e) {
                                        return C(e) && M.ToInteger(e) === e
                                    },
                                    isSafeInteger: function(e) {
                                        return Number.isInteger(e) && Math.abs(e) <= Number.MAX_SAFE_INTEGER
                                    },
                                    isNaN: _
                                }), [, 1].find(function(e, t) {
                                    return 0 === t
                                }) || O(Array.prototype, "find", X.find, !0), 0 !== [, 1].findIndex(function(e, t) {
                                    return 0 === t
                                }) && O(Array.prototype, "findIndex", X.findIndex, !0), x(Object, {
                                    is: function(e, t) {
                                        return M.SameValue(e, t)
                                    }
                                }), f) {
                                var re = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable),
                                    ne = function(e, t) {
                                        var r, n = Object.keys(Object(t));
                                        return M.IsCallable(Object.getOwnPropertySymbols) && (r = Object.getOwnPropertySymbols(Object(t)).filter(re(t))), n.concat(r || []).reduce(function(e, r) {
                                            return e[r] = t[r], e
                                        }, e)
                                    },
                                    oe = {
                                        assign: function(e, t) {
                                            if (!M.TypeIsObject(e)) throw new TypeError("target must be an object");
                                            return Array.prototype.reduce.call(arguments, ne)
                                        },
                                        setPrototypeOf: function(e, t) {
                                            var r, n = function(e, t) {
                                                    if (!M.TypeIsObject(e)) throw new TypeError("cannot set prototype on a non-object");
                                                    if (null !== t && !M.TypeIsObject(t)) throw new TypeError("can only set prototype to an object or null" + t)
                                                },
                                                o = function(e, t) {
                                                    return n(e, t), r.call(e, t), e
                                                };
                                            try {
                                                r = e.getOwnPropertyDescriptor(e.prototype, t).set, r.call({}, null)
                                            } catch (a) {
                                                if (e.prototype !== {}[t]) return;
                                                r = function(e) {
                                                    this[t] = e
                                                }, o.polyfill = o(o({}, null), e.prototype) instanceof e
                                            }
                                            return o
                                        }(Object, "__proto__")
                                    },
                                    ae = Object.assign && Object.preventExtensions && function() {
                                        var e = Object.preventExtensions({
                                            1: 2
                                        });
                                        try {
                                            Object.assign(e, "xy")
                                        } catch (t) {
                                            return "y" === e[1]
                                        }
                                    }();
                                if (ae) {
                                    var ie = Object.assign;
                                    O(Object, "assign", oe.assign, !0), T.preserveToString(Object.assign, ie)
                                }
                                x(Object, oe)
                            }
                            Object.setPrototypeOf && Object.getPrototypeOf && null !== Object.getPrototypeOf(Object.setPrototypeOf({}, null)) && null === Object.getPrototypeOf(Object.create(null)) && ! function() {
                                var e = Object.create(null),
                                    t = Object.getPrototypeOf,
                                    r = Object.setPrototypeOf;
                                Object.getPrototypeOf = function(r) {
                                    var n = t(r);
                                    return n === e ? null : n
                                }, Object.setPrototypeOf = function(t, n) {
                                    return null === n && (n = e), r(t, n)
                                }, Object.setPrototypeOf.polyfill = !1
                            }();
                            var se = !n(function() {
                                Object.keys("foo")
                            });
                            if (!se) {
                                var ce = Object.keys;
                                O(Object, "keys", function(e) {
                                    return ce(M.ToObject(e))
                                }, !0), T.preserveToString(Object.keys, ce)
                            }
                            if (Object.getOwnPropertyNames) {
                                var le = !n(function() {
                                    Object.getOwnPropertyNames("foo")
                                });
                                if (!le) {
                                    var ue = Object.getOwnPropertyNames;
                                    O(Object, "getOwnPropertyNames", function(e) {
                                        return ue(M.ToObject(e))
                                    }, !0), T.preserveToString(Object.getOwnPropertyNames, ue)
                                }
                            }
                            if (Object.getOwnPropertyDescriptor) {
                                var pe = !n(function() {
                                    Object.getOwnPropertyDescriptor("foo", "bar")
                                });
                                if (!pe) {
                                    var he = Object.getOwnPropertyDescriptor;
                                    O(Object, "getOwnPropertyDescriptor", function(e, t) {
                                        return he(M.ToObject(e), t)
                                    }, !0), T.preserveToString(Object.getOwnPropertyDescriptor, he)
                                }
                            }
                            if (Object.seal) {
                                var fe = !n(function() {
                                    Object.seal("foo")
                                });
                                if (!fe) {
                                    var de = Object.seal;
                                    O(Object, "seal", function(e) {
                                        return E.object(e) ? de(e) : e
                                    }, !0), T.preserveToString(Object.seal, de)
                                }
                            }
                            if (Object.isSealed) {
                                var me = !n(function() {
                                    Object.isSealed("foo")
                                });
                                if (!me) {
                                    var ve = Object.isSealed;
                                    O(Object, "isSealed", function(e) {
                                        return E.object(e) ? ve(e) : !0
                                    }, !0), T.preserveToString(Object.isSealed, ve)
                                }
                            }
                            if (Object.freeze) {
                                var ge = !n(function() {
                                    Object.freeze("foo")
                                });
                                if (!ge) {
                                    var ye = Object.freeze;
                                    O(Object, "freeze", function(e) {
                                        return E.object(e) ? ye(e) : e
                                    }, !0), T.preserveToString(Object.freeze, ye)
                                }
                            }
                            if (Object.isFrozen) {
                                var be = !n(function() {
                                    Object.isFrozen("foo")
                                });
                                if (!be) {
                                    var we = Object.isFrozen;
                                    O(Object, "isFrozen", function(e) {
                                        return E.object(e) ? we(e) : !0
                                    }, !0), T.preserveToString(Object.isFrozen, we)
                                }
                            }
                            if (Object.preventExtensions) {
                                var Ee = !n(function() {
                                    Object.preventExtensions("foo")
                                });
                                if (!Ee) {
                                    var _e = Object.preventExtensions;