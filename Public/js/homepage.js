webpackJsonp([4], [function(e, t, r) {
    (function(e) {
        "use strict";
        r(23), r(24), r(26), Object.assign || r(21).shim();
        var t = r(27),
            n = r(1),
            i = r(5),
            s = r(6),
            o = r(7),
            a = r(8),
            l = r(9),
            c = r(10),
            u = t.createClass({
                displayName: "HomePage",
                getInitialState: function() {
                    return {
                        layout: {
                            mainWidth: 998,
                            symbolPanelLeft: 0,
                            symbolPanelWidth: l.symbolPanelMinWidth
                        }
                    }
                },
                componentWillMount: function() {
                    c.getPackageInfo()
                },
                componentDidMount: function() {
                    this._resetHandler(), e(window).on("resize", function() {
                        this._resetHandler()
                    }.bind(this))
                },
                _resetHandler: function() {
                    var t = this.state.layout,
                        r = e(".main");
                    r.width() >= l.mainMinWidth && (t.mainWidth = r.width(), this.setState({
                        layout: t
                    }))
                },
                componentWillUnmount: function() {
                    e(window).off("resize")
                },
                _toggleSymbolPanel: function() {
                    var t = this,
                        r = this.state.layout,
                        n = e(this.refs.symbolPanel.getDOMNode()),
                        i = e(this.refs.separator.getDOMNode()),
                        s = e(this.refs.chartPanel.getDOMNode());
                    i.hasClass("open") ? (i.removeClass("open").addClass("hide"), s.css("z-index", 10).animate({
                        left: l.separatorWidth,
                        width: r.mainWidth - l.separatorWidth
                    }, {
                        complete: function() {
                            s.css("z-index", ""), r.symbolPanelLeft = -r.symbolPanelWidth, t.setState({
                                layout: r
                            })
                        }
                    })) : (i.removeClass("hide").addClass("open"), n.css("z-index", 10).animate({
                        left: 0
                    }, {
                        complete: function() {
                            n.css("z-index", ""), r.symbolPanelLeft = 0, t.setState({
                                layout: r
                            })
                        }
                    }))
                },
                _dragSeparator: function(t) {
                    var r = e(this.refs.separator.getDOMNode());
                    if (r.hasClass("open")) {
                        var n = this,
                            i = this.state.layout,
                            s = i.symbolPanelWidth,
                            o = t.clientX;
                        e("body").css("cursor", "e-resize"), e("body").on("mousemove.drag", function(e) {
                            var t = e.clientX,
                                r = t - o;
                            o = t, s += r, s >= l.symbolPanelMinWidth && 500 >= s && (i.symbolPanelWidth = s, n.setState({
                                layout: i
                            }))
                        }), e("body").on("mouseup.drag", function(t) {
                            e("body").off("mousemove.drag"), e("body").off("mouseup.drag"), e("body").css("cursor", "")
                        })
                    }
                },
                render: function() {
                    var e = this.state.layout,
                        r = e.symbolPanelLeft + e.symbolPanelWidth,
                        c = r + l.separatorWidth,
                        u = e.mainWidth - c;
                    return t.createElement("div", {
                        className: "container homepage"
                    }, t.createElement(n, null), t.createElement("div", {
                        className: "main"
                    }, t.createElement(i, null), t.createElement("div", {
                        className: "row"
                    }, t.createElement(s, {
                        ref: "symbolPanel",
                        left: e.symbolPanelLeft,
                        width: e.symbolPanelWidth
                    }), t.createElement("div", {
                        onMouseDown: this._dragSeparator,
                        className: "vertical-separator trade-separator open",
                        ref: "separator",
                        style: {
                            left: r + "px"
                        }
                    }, t.createElement("div", {
                        className: "separator-collapse",
                        onClick: this._toggleSymbolPanel
                    })), t.createElement(o, {
                        ref: "chartPanel",
                        left: c,
                        width: u
                    })), t.createElement(a, {
                        width: e.mainWidth
                    })))
                }
            });
        t.render(t.createElement(u, null), document.body)
    }).call(t, r(28))
}, function(e, t, r) {
    "use strict";
    var n = r(27);
    r(30);
    var i = r(13),
        s = r(31),
        o = i.getModule("headerMsg"),
        a = r(32),
        l = (r(33), r(9)),
        c = r(34),
        u = n.createClass({
            displayName: "Header",
            getInitialState: function() {
                var e = s.getUserInfo();
                return {
                    userAvatar: e.userAvatar,
                    nickname: e.nickname,
                    isGuest: e.isGuest
                }
            },
            _changeBaseInfo: function(e) {
                this.setState({
                    userAvatar: e.userAvatar,
                    nickname: e.nickname
                })
            },
            _onSupportClick: function() {
                c.getAccessToken().done(function(e) {
                    setTimeout(function() {
                        var t;
                        if (e && !e.guest) {
                            var r = e.avatar.substring(e.avatar.lastIndexOf("/") + 1);
                            t = l.supportUrl + "?token=" + e.token + "&nickname=" + e.nickname + "&avatar=" + r
                        } else t = l.supportUrl;
                        window.open(t)
                    }, 0)
                })
            },
            render: function() {
                var e = this.state.isGuest ? null : n.createElement("div", {
                    className: "nav-item settings"
                }, n.createElement("div", {
                    className: "display-label user-settings"
                }, n.createElement("img", {
                    className: "user-avatar",
                    src: this.state.userAvatar + l.picture.webHead
                }), n.createElement("span", {
                    className: "user-nickname"
                }, this.state.nickname)), n.createElement(a, {
                    onUserInfoChange: this._changeBaseInfo
                }));
                return n.createElement("div", {
                    className: "header"
                }, n.createElement("a", {
                    href: "/app"
                }, n.createElement("div", {
                    className: "logo"
                })), n.createElement("div", {
                    className: "nav"
                }, n.createElement("a", {
                    className: "nav-item trader-center display-label",
                    href: "/app"
                }, o.trader), n.createElement("a", {
                    className: "nav-item personal-center display-label",
                    href: "/personal",
                    style: {
                        display: "none"
                    }
                }, o.personal), n.createElement("a", {
                    className: "nav-item discovery display-label",
                    href: "/discovery",
                    target: "_blank"
                }, o.find), n.createElement("div", {
                    className: "nav-item about display-label",
                    onClick: this._onSupportClick
                }, o.help), e))
            }
        });
    e.exports = u
}, , , , function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(49),
        s = r(25),
        o = r(13),
        a = o.getModule("accountInfo"),
        l = r(50),
        c = r(14),
        u = r(9),
        h = n.createClass({
            displayName: "AccountInfo",
            mixins: [s.listenTo(l, "_userStoreListener")],
            getInitialState: function() {
                return {
                    login: 1e9,
                    lever: 0,
                    balance: 0,
                    equity: 0,
                    margin: 0
                }
            },
            _userStoreListener: function(e) {
                "packageInfo" === e.type ? this.setState(e.data.mt4Account) : "mt4AccUpdate" === e.type && this.setState(e.mt4Account)
            },
            render: function() {
                var e = this.state.margin ? c.formatNumber(100 * this.state.equity / this.state.margin, 2) : 0;
                e += "%";
                var t = u.moneyUnit,
                    r = this.state.equity ? c.formatNumber(this.state.equity - this.state.balance) : 0,
                    s = i({
                        "item-value": !0,
                        green: r > 0,
                        red: 0 > r
                    });
                return n.createElement("ul", {
                    className: "account-info"
                }, n.createElement("li", {
                    className: "item"
                }, n.createElement("label", {
                    className: "item-label"
                }, a.name), n.createElement("span", {
                    className: "item-value"
                }, this.state.login)), n.createElement("li", {
                    className: "item"
                }, n.createElement("label", {
                    className: "item-label"
                }, a.lever), n.createElement("span", {
                    className: "item-value"
                }, this.state.leverage), n.createElement("span", {
                    className: "item-unit"
                }, a.leverUnit)), n.createElement("li", {
                    className: "item"
                }, n.createElement("label", {
                    className: "item-label"
                }, a.balance), n.createElement("span", {
                    className: "item-value"
                }, t + this.state.balance)), n.createElement("li", {
                    className: "item"
                }, n.createElement("label", {
                    className: "item-label"
                }, a.profit), n.createElement("span", {
                    className: s
                }, t + r)), n.createElement("li", {
                    className: "item"
                }, n.createElement("label", {
                    className: "item-label"
                }, a.netWorth), n.createElement("span", {
                    className: "item-value"
                }, t + c.formatNumber(this.state.equity))), n.createElement("li", {
                    className: "item"
                }, n.createElement("label", {
                    className: "item-label"
                }, a.margin), n.createElement("span", {
                    className: "item-value"
                }, t + c.formatNumber(this.state.margin))), n.createElement("li", {
                    className: "item"
                }, n.createElement("label", {
                    className: "item-label"
                }, a.availableMargin), n.createElement("span", {
                    className: "item-value"
                }, t + c.formatNumber(this.state.equity - this.state.margin))), n.createElement("li", {
                    className: "item"
                }, n.createElement("label", {
                    className: "item-label"
                }, a.marginRatio), n.createElement("span", {
                    className: "item-value"
                }, e)))
            }
        });
    e.exports = h
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(81),
            o = s,
            a = (o.Table, o.Column, r(13)),
            l = a.getModule("symbolPanel"),
            c = a.getModule("orderSymbolWinMsg"),
            u = r(51),
            h = r(52),
            p = r(53),
            d = r(54),
            f = r(47),
            m = (r(67), r(55)),
            g = r(68),
            v = g.Combobox,
            y = g.Option,
            b = n.createClass({
                displayName: "SymbolPanel",
                mixins: [i.listenTo(h, "_symbolStoreListener")],
                propTypes: {
                    width: n.PropTypes.number.isRequired,
                    left: n.PropTypes.number.isRequired
                },
                allSymbols: [],
                _symbolStoreListener: function(e) {
                    var t = e.type;
                    switch (t) {
                        case "fetchSymbolList":
                            var r = e.data.allSymbols.sort(function(e, t) {
                                return e.symbol.localeCompare(t.symbol)
                            });
                            this.allSymbols = r;
                            break;
                        case "detailSymbol":
                            this.setState({
                                detailSymbol: e.data
                            })
                    }
                },
                getInitialState: function() {
                    return {
                        filterSymbols: [],
                        detailSymbol: null,
                        showOrderSymbolWin: !1,
                        newOrder: null
                    }
                },
                componentDidMount: function() {
                    u.fetchSymbolList()
                },
                _showSymbolDetail: function(e) {
                    u.getSymbolDetail(e.symbol)
                },
                _closeSymbolDetail: function() {
                    this.setState({
                        detailSymbol: null
                    })
                },
                _addSelected: function(e) {
                    u.addSymbol(e)
                },
                _handleInput: function(e) {
                    this._filterStates(e)
                },
                _filterStates: function(e) {
                    var t = this._fireSymbols();
                    if ("" !== e.trim()) {
                        e = e.trim();
                        var r = t.filter(function(t) {
                            return t.symbol.indexOf(e.toUpperCase()) > -1 ? t : void 0
                        });
                        this.setState({
                            filterSymbols: r
                        })
                    } else e.length > 0 ? this.setState({
                        filterSymbols: t
                    }) : this.setState({
                        filterSymbols: []
                    })
                },
                _fireSymbols: function() {
                    for (var e = t.extend(!0, [], this.allSymbols), r = h.symbolList, n = 0; n < e.length; n++)
                        for (var i = 0; i < r.length; i++)
                            if (e[n].symbol === r[i].symbol) {
                                e.splice(n, 1), n--;
                                break
                            }
                    return e
                },
                _renderComboboxOptions: function() {
                    return this.state.filterSymbols.map(function(e) {
                        e.description = " " + e.description;
                        var t = n.createElement(y, {
                            value: e.symbol
                        }, e.symbol + e.description);
                        return t
                    })
                },
                _createOrder: function(e) {
                    this.setState({
                        showOrderSymbolWin: !0,
                        newOrder: {
                            symbol: e.symbol,
                            quote: e,
                            symbols: this.allSymbols
                        }
                    })
                },
                _closeOrderSymbol: function() {
                    this.setState({
                        showOrderSymbolWin: !1
                    })
                },
                render: function() {
                    var e = {
                            width: this.props.width + "px",
                            left: this.props.left + "px"
                        },
                        t = this.state.filterSymbols.length > 0 ? this._renderComboboxOptions() : n.createElement("div", null),
                        r = n.createElement("input", {
                            type: "text",
                            className: "search-input",
                            placeholder: l.searchPlaceHolder
                        });
                    return n.createElement("div", {
                        className: "symbol-panel",
                        style: e
                    }, n.createElement(v, {
                        hideSelected: !0,
                        inputEle: r,
                        onInput: this._handleInput,
                        onSelect: this._addSelected,
                        autocomplete: "list"
                    }, t), n.createElement("div", {
                        className: "symbol-table"
                    }, n.createElement(m, {
                        showSymbolDetail: this._showSymbolDetail,
                        createOrder: this._createOrder,
                        width: this.props.width
                    })), n.createElement(f, {
                        show: !!this.state.detailSymbol,
                        title: a.getMessage("symbolDetail", "label"),
                        onCloseClick: this._closeSymbolDetail
                    }, this.state.detailSymbol ? n.createElement(p, n.__spread({}, this.state.detailSymbol)) : null), n.createElement(f, {
                        show: this.state.showOrderSymbolWin,
                        title: c.newOrder,
                        onCloseClick: this._closeOrderSymbol
                    }, this.state.showOrderSymbolWin ? n.createElement(d, n.__spread({}, this.state.newOrder, {
                        onClose: this._closeOrderSymbol
                    })) : null))
                }
            });
        e.exports = b
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = (r(56), r(49)),
            s = r(25),
            o = r(57),
            a = r(58),
            l = r(47),
            c = r(51),
            u = r(59),
            h = r(13),
            p = h.getModule("chartType"),
            d = h.getModule("periodType"),
            f = h.getModule("chartPanel"),
            m = (h.getModule("indicators"), r(60)),
            g = r(61),
            v = r(52),
            y = r(80),
            b = r(62),
            w = n.PropTypes,
            _ = n.createClass({
                displayName: "QuoteChart",
                mixins: [s.listenTo(u, "_chartStoreListener")],
                propTypes: {
                    width: w.number
                },
                componentDidMount: function() {
                    var e = new g("chartPlaceHolder"),
                        t = Math.floor((this.props.width - e.options.gridPadding.right) / g.tickRange) + 1;
                    e.setXaxisNumberTick(t), e.render(), this.chartHander = e
                },
                componentWillUnmount: function() {
                    this.chartHander.destroy()
                },
                componentDidUpdate: function(e) {
                    var t = this.chartHander;
                    if (t && this.props.width !== e.width) {
                        var r = Math.floor((this.props.width - t.options.gridPadding.right) / g.tickRange) + 1;
                        t.setXaxisNumberTick(r), t.replot()
                    }
                },
                _chartStoreListener: function(e) {
                    var t = e.type,
                        r = e.data;
                    switch (t) {
                        case "fetchHistoryQuote":
                            var n = r.historyQuote;
                            this.chartHander.drawChart(n, r.activeSymbol, r.chartType, r.period, r.scale, r.indicator);
                            break;
                        case "chartDataRefresh":
                            this.chartHander.refreshChart(r.historyQuote)
                    }
                },
                getChartHandler: function() {
                    return this.chartHander
                },
                _onWheel: function(e) {
                    e.preventDefault();
                    var t = e.deltaY;
                    0 > t ? this.chartHander.moveRight() : t > 0 && this.chartHander.moveLeft()
                },
                _onMouseDown: function(e) {
                    var r = this.chartHander;
                    if (r.isDraggable()) {
                        var n = e.clientX,
                            i = t(this.getDOMNode()),
                            s = g.tickRange;
                        i.find(".jqplot-event-canvas").css("cursor", "move"), i.on("mousemove.jqplot", function(e) {
                            var t = e.clientX - n;
                            t > s ? (n = e.clientX, r.moveRight()) : -s > t && (n = e.clientX, r.moveLeft())
                        }), t("body").on("mouseup.jqplot", function(e) {
                            i.off("mousemove.jqplot"), t("body").off("mouseup.jqplot"), i.find(".jqplot-event-canvas").css("cursor", "default"), n = null, i = null, s = null
                        })
                    }
                },
                render: function() {
                    var e = {
                        width: this.props.width + "px"
                    };
                    return n.createElement("div", {
                        style: e,
                        className: "chart-placeholder",
                        onWheel: this._onWheel,
                        onMouseDown: this._onMouseDown,
                        ref: "chartPlaceHolder",
                        id: "chartPlaceHolder"
                    })
                }
            }),
            x = n.createClass({
                displayName: "AnnotationToolBox",
                propTypes: {
                    className: w.string,
                    tools: w.array,
                    onClick: w.func.isRequired
                },
                _clickAnnotaionItem: function(e) {
                    this.props.onClick(e)
                },
                render: function() {
                    var e = this.props,
                        t = [],
                        r = "toolbar-action " + e.className;
                    return e.tools.forEach(function(i, s) {
                        var o = "annotation-item " + i.className;
                        i.value === e.value && (r += " active", o += " active"), t.push(n.createElement("li", {
                            className: o,
                            onClick: this._clickAnnotaionItem.bind(this, i.value)
                        }))
                    }, this), n.createElement("li", {
                        className: r
                    }, n.createElement("ul", {
                        className: "tool-expand"
                    }, t))
                }
            }),
            k = n.createClass({
                displayName: "ChartPanel",
                mixins: [s.listenTo(u, "_chartStoreListener")],
                propTypes: {
                    width: w.number.isRequired,
                    left: w.number.isRequired
                },
                getInitialState: function() {
                    return {
                        symbolList: [],
                        activeSymbol: null,
                        period: null,
                        chartType: null,
                        indicator: null,
                        snapshot: null,
                        articleTitle: null,
                        cursor: "default",
                        annotationType: null
                    }
                },
                componentDidMount: function() {
                    c.fetchHistoryQuote(this.getDOMNode())
                },
                _chartStoreListener: function(e) {
                    var t = e.type,
                        r = e.data;
                    switch (t) {
                        case "fetchHistoryQuote":
                            this.setState({
                                symbolList: r.symbolList,
                                activeSymbol: r.activeSymbol,
                                period: r.period,
                                chartType: r.chartType,
                                indicator: r.indicator
                            })
                    }
                },
                _initSymbols: function() {
                    var e = v.symbolList.map(function(e) {
                        return e.symbol
                    });
                    this.setState({
                        symbolList: e
                    })
                },
                _changeSymbol: function(e) {
                    this.refs.quoteChart.getChartHandler().clearAnnotation(), c.changeActiveSymbol(e)
                },
                _changePeriod: function(e) {
                    c.changePeriodType(e)
                },
                _changeChartType: function(e) {
                    c.changeChartType(e)
                },
                _updateIndicators: function(e) {
                    c.updateIndicators(e)
                },
                _hideCross: function() {
                    this.setState({
                        cursor: "default",
                        annotationType: null
                    });
                    var e = this.refs.quoteChart.getChartHandler();
                    e.hideCross(), e.drawAnnotation(null)
                },
                _showCross: function() {
                    this.setState({
                        cursor: "cross",
                        annotationType: null
                    });
                    var e = this.refs.quoteChart.getChartHandler();
                    e.showCross(), e.drawAnnotation(null)
                },
                _zoomin: function() {
                    this.refs.quoteChart.getChartHandler().zoomin()
                },
                _zoomout: function() {
                    this.refs.quoteChart.getChartHandler().zoomout()
                },
                _showShareDialog: function(e) {
                    e.preventDefault();
                    var t = this,
                        r = this.refs.quoteChart.getChartHandler();
                    r.exportAsImage(this.refs.quoteChart.getDOMNode(), function(e) {
                        t.setState({
                            snapshot: e
                        })
                    })
                },
                _addAnnotation: function(e) {
                    this._hideCross(), this.setState({
                        annotationType: e,
                        cursor: null
                    }), this.refs.quoteChart.getChartHandler().drawAnnotation(e, function() {
                        this.setState({
                            annotationType: null,
                            cursor: "default"
                        })
                    }.bind(this))
                },
                _annotationBack: function() {
                    this.refs.quoteChart.getChartHandler().annotationBack()
                },
                _annotationForward: function() {
                    this.refs.quoteChart.getChartHandler().annotationForward()
                },
                _closeShareDialog: function() {
                    this.setState({
                        snapshot: null
                    })
                },
                _articleDate: function() {
                    return " " + y().format("YYYYMMDD")
                },
                render: function() {
                    var e = {
                            width: this.props.width + "px",
                            left: this.props.left + "px"
                        },
                        t = this.state.symbolList.map(function(e) {
                            return n.createElement(a, {
                                value: e
                            }, e)
                        }),
                        r = [];
                    for (var s in p) r.push(n.createElement(a, {
                        value: s
                    }, n.createElement("span", {
                        className: "type-icon icon-" + s
                    })));
                    var c = [];
                    for (var s in d) c.push(n.createElement(a, {
                        value: s
                    }, d[s]));
                    var u = i({
                            "toolbar-action": !0,
                            choose: !0,
                            active: "default" === this.state.cursor
                        }),
                        h = i({
                            "toolbar-action": !0,
                            cross: !0,
                            active: "cross" === this.state.cursor
                        });
                    return n.createElement("div", {
                        className: "chart-panel",
                        style: e
                    }, n.createElement("div", {
                        className: "chart-nav"
                    }, n.createElement("div", {
                        className: "chart-options"
                    }, n.createElement(o, {
                        value: this.state.activeSymbol,
                        onClick: this._initSymbols,
                        changeHandler: this._changeSymbol,
                        className: "symbol-dropdown"
                    }, t), n.createElement(o, {
                        value: this.state.period,
                        changeHandler: this._changePeriod,
                        className: "period-dropdown"
                    }, c), n.createElement(o, {
                        value: this.state.chartType,
                        changeHandler: this._changeChartType,
                        className: "type-dropdown"
                    }, r)), n.createElement("ul", {
                        className: "chart-toolbar"
                    }, n.createElement("li", {
                        className: u,
                        onClick: this._hideCross
                    }), n.createElement("li", {
                        className: h,
                        onClick: this._showCross
                    }), n.createElement(x, {
                        onClick: this._addAnnotation,
                        className: "line",
                        tools: [{
                            value: b.HORTICAL_LINE,
                            className: "hline"
                        }, {
                            value: b.VERTICAL_LINE,
                            className: "vline"
                        }, {
                            value: b.RAY_LINE,
                            className: "trendline"
                        }],
                        value: this.state.annotationType
                    }), n.createElement("li", {
                        className: "toolbar-action zoomin",
                        onClick: this._zoomin
                    }), n.createElement("li", {
                        className: "toolbar-action zoomout",
                        onClick: this._zoomout
                    }), n.createElement("li", {
                        className: "toolbar-action return",
                        onClick: this._annotationBack
                    }), n.createElement("li", {
                        className: "toolbar-action forward",
                        onClick: this._annotationForward
                    }), n.createElement("li", {
                        className: "toolbar-action share",
                        onClick: this._showShareDialog
                    }))), n.createElement("div", {
                        className: "chart-wrapper"
                    }, n.createElement(_, {
                        width: this.props.width - 2,
                        ref: "quoteChart"
                    }), n.createElement("div", {
                        className: "chart-refs"
                    }, n.createElement("span", {
                        className: "chart-ref-symbol"
                    }, this.state.activeSymbol), n.createElement("span", {
                        className: "chart-ref-period"
                    }, this.state.period))), n.createElement(l, {
                        show: !!this.state.snapshot,
                        onCloseClick: this._closeShareDialog,
                        title: f.share
                    }, this.state.snapshot ? n.createElement(m, {
                        title: f.articleTitle + this.state.activeSymbol + this._articleDate(),
                        tag: this.state.activeSymbol,
                        snapshot: this.state.snapshot,
                        onClose: this._closeShareDialog
                    }) : null))
                }
            });
        e.exports = k
    }).call(t, r(28))
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(13),
        s = r(36),
        o = r(37),
        a = r(38),
        l = r(39),
        c = r(40),
        u = r(9),
        h = r(41),
        p = r(42),
        d = r(43),
        f = r(44),
        m = r(45),
        g = r(46),
        v = r(47),
        y = r(48),
        b = i.getModule("orderSymbolWinMsg"),
        w = n.createClass({
            displayName: "TraderTabPanel",
            propTypes: {
                width: n.PropTypes.number.isRequired
            },
            hisPosition: {
                startDate: "",
                endDate: "",
                keyInput: ""
            },
            tradeLog: {
                startDate: "",
                endDate: "",
                keyInput: ""
            },
            getInitialState: function() {
                return {
                    selectedIndex: 0,
                    openCloseOrderWin: !1,
                    openDeleteOrderWin: !1
                }
            },
            _searchHisPosition: function(e) {
                var t = e.keyCode;
                13 === t && (this.hisPosition.keyInput = e.target.value, this._executeHisPositionSearch())
            },
            _onDateHisPositionSelected: function(e, t) {
                var e = e.utc().format("YYYY-MM-DD HH:mm:ss"),
                    t = t.utc().format("YYYY-MM-DD HH:mm:ss");
                (e !== this.hisPosition.startDate || t !== this.hisPosition.endDate) && (this.hisPosition.startDate = e, this.hisPosition.endDate = t, this._executeHisPositionSearch())
            },
            _executeHisPositionSearch: function() {
                p.searchHisPositions({
                    from: this.hisPosition.startDate,
                    to: this.hisPosition.endDate,
                    key: this.hisPosition.keyInput
                })
            },
            _searchTradeLog: function(e) {
                this.tradeLog.keyInput = e.target.value;
                var t = e.keyCode;
                13 === t && this._executeTradeLogSearch()
            },
            _onDateTradeLogSelected: function(e, t) {
                var e = e.format("YYYY-MM-DD") + " 23:59:59",
                    t = t.format("YYYY-MM-DD") + " 23:59:59";
                (e !== this.tradeLog.startDate || t !== this.tradeLog.endDate) && (this.tradeLog.startDate = e, this.tradeLog.endDate = t, this._executeTradeLogSearch())
            },
            _executeTradeLogSearch: function() {
                h.search({
                    from: parseInt(new Date(this.tradeLog.startDate).getTime() / 1e3),
                    to: parseInt(new Date(this.tradeLog.endDate).getTime() / 1e3),
                    key: this.tradeLog.keyInput
                })
            },
            _closeColseOrderWin: function() {
                this.setState({
                    openCloseOrderWin: !1
                })
            },
            _openCloseOrderWin: function() {
                this.setState({
                    openCloseOrderWin: !0
                })
            },
            _closeDeleteOrderWin: function() {
                this.setState({
                    openDeleteOrderWin: !1
                })
            },
            _openDeleteOrderWin: function() {
                this.setState({
                    openDeleteOrderWin: !0
                })
            },
            render: function() {
                var e = this,
                    t = {
                        tabs: [{
                            tab: i.getMessage("tranderTabPanel", "open"),
                            enableRemove: !1,
                            panel: n.createElement(o, {
                                width: this.props.width - u.tabPanelPadding
                            })
                        }, {
                            tab: i.getMessage("tranderTabPanel", "pending"),
                            enableRemove: !1,
                            panel: n.createElement(a, {
                                width: this.props.width - u.tabPanelPadding
                            })
                        }, {
                            tab: i.getMessage("tranderTabPanel", "history"),
                            enableRemove: !1,
                            panel: n.createElement(l, {
                                width: this.props.width - u.tabPanelPadding
                            })
                        }, {
                            tab: i.getMessage("tranderTabPanel", "journal"),
                            enableRemove: !1,
                            panel: n.createElement(c, {
                                width: this.props.width - u.tabPanelPadding
                            })
                        }]
                    };
                t.afterSelected = function(t, r) {
                    e.setState({
                        selectedIndex: r.selectedIndex
                    })
                }, t.selectedIndex = this.state.selectedIndex;
                var r = null;
                switch (this.state.selectedIndex) {
                    case 0:
                        r = n.createElement("div", null, n.createElement("button", {
                            className: "btn primary-btn",
                            onClick: this._openCloseOrderWin
                        }, i.getMessage("tranderTabPanel", "openPosition")), n.createElement(v, {
                            show: this.state.openCloseOrderWin,
                            title: b.closeAllTitle,
                            onCloseClick: this._closeColseOrderWin
                        }, this.state.openCloseOrderWin ? n.createElement(m, {
                            onClose: this._closeColseOrderWin
                        }) : null));
                        break;
                    case 1:
                        r = n.createElement("div", null, n.createElement("button", {
                            className: "btn primary-btn",
                            onClick: this._openDeleteOrderWin
                        }, i.getMessage("tranderTabPanel", "cancel")), n.createElement(v, {
                            show: this.state.openDeleteOrderWin,
                            title: b.deleteOrderTitle,
                            onCloseClick: this._closeDeleteOrderWin
                        }, this.state.openDeleteOrderWin ? n.createElement(g, {
                            onClose: this._closeDeleteOrderWin
                        }) : null));
                        break;
                    case 2:
                        r = n.createElement("div", {
                            className: "inner",
                            key: "history"
                        }, n.createElement(d, {
                            startDate: f.startDate,
                            endDate: f.endDate,
                            onDateSelected: this._onDateHisPositionSelected
                        }), n.createElement("input", {
                            type: "text",
                            style: {
                                display: "none"
                            },
                            className: "search-box",
                            onKeyUp: this._searchHisPosition,
                            placeholder: i.getMessage("tranderTabPanel", "searchPlaceHolder")
                        }));
                        break;
                    case 3:
                        r = n.createElement("div", {
                            className: "inner",
                            key: "log"
                        }, n.createElement(d, {
                            startDate: y.startDate,
                            endDate: y.endDate,
                            onDateSelected: this._onDateTradeLogSelected
                        }), n.createElement("input", {
                            type: "text",
                            defaultValue: this.tradeLog.keyInput,
                            className: "search-box",
                            onKeyUp: this._searchTradeLog,
                            placeholder: i.getMessage("tranderTabPanel", "searchPlaceHolder")
                        }))
                }
                return n.createElement("div", {
                    className: "trader-tabpanel"
                }, n.createElement("div", {
                    className: "action-control"
                }, r), n.createElement(s, n.__spread({}, t, {
                    ref: "tabView"
                })))
            }
        });
    e.exports = w
}, , , function(e, t, r) {
    "use strict";
    var n = r(25),
        i = n.createActions({
            getArticleList: {},
            loadNext: {},
            getArticle: {},
            getArticlesByTag: {},
            getArticlesByUser: {},
            shareArticle: {}
        });
    e.exports = i
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(25),
            i = r(31),
            s = r(63),
            o = r(11),
            a = r(13),
            l = n.createStore({
                listenables: o,
                init: function() {
                    this.pageNow = 1, this.maxPage = 1, this.articles = []
                },
                getArticleList: function() {
                    var e = window.location.pathname.split("/");
                    e[2] ? "tags" === e[2] ? this.getArticlesByTag(e[3]) : "users" === e[2] && this.getArticlesByUser(e[3]) : this.getArticles()
                },
                loadNext: function() {
                    this.pageNow++, this.getArticleList()
                },
                getArticles: function() {
                    s.getArticles(this.pageNow).done(function(e) {
                        this._triggerArticleList(e)
                    }.bind(this))
                },
                getArticlesByTag: function(e) {
                    var t = i.getTenantId();
                    s.getArticlesByTag(t, e, this.pageNow).done(function(e) {
                        this._triggerArticleList(e)
                    }.bind(this))
                },
                getArticlesByUser: function(e) {
                    var t = i.getTenantId();
                    s.getArticlesByUser(t, e, this.pageNow).done(function(e) {
                        this._triggerArticleList(e)
                    }.bind(this))
                },
                _triggerArticleList: function(e) {
                    this.articles = this.articles.concat(e.data.list), this.maxPage = e.data.maxPage, this.trigger({
                        type: "articleList",
                        data: {
                            articles: this.articles,
                            twTenant: e.data.twTenant,
                            maxPage: this.maxPage,
                            pageNow: this.pageNow
                        }
                    })
                },
                getArticle: function() {
                    var e = i.getTenantId(),
                        t = window.location.pathname.split("/").pop();
                    s.getArticle(e, t).done(function(e) {
                        this._getRelatedArticles(e.data), this.trigger({
                            type: "articleDetail",
                            data: e.data
                        })
                    }.bind(this)), this._getTagCloud()
                },
                shareArticle: function(e) {
                    s.shareArticle(e).done(function(e) {
                        t.messagebar("show", a.getMessage("chartPanel", "shareSuccess")), this.trigger({
                            type: "shareArticle"
                        })
                    }.bind(this))
                },
                _getTagCloud: function() {
                    var e = i.getTenantId();
                    s.getTagCloud(e).done(function(e) {
                        this.trigger({
                            type: "tagCloud",
                            data: e.data
                        })
                    }.bind(this))
                },
                _getRelatedArticles: function(e) {
                    var t = e.tags,
                        r = i.getTenantId();
                    s.getArticlesByTag(r, t[0], 1).done(function(e) {
                        this.trigger({
                            type: "relatedArticles",
                            data: e.data.list.slice(0, 5)
                        })
                    }.bind(this))
                }
            });
        e.exports = l
    }).call(t, r(28))
}, , , , , , , , , function(e, t, r) {
    "use strict";
    var n = r(102),
        i = function(e) {
            return "undefined" != typeof e && null !== e
        },
        s = "function" == typeof Symbol && "symbol" == typeof Symbol(),
        o = r(103),
        a = Object,
        l = Array.prototype.push,
        c = Object.prototype.propertyIsEnumerable,
        u = function(e, t) {
            if (!i(e)) throw new TypeError("target must be an object");
            var r, o, u, h, p, d = a(e);
            for (r = 1; r < arguments.length; ++r) {
                if (o = a(arguments[r]), h = n(o), s && Object.getOwnPropertySymbols)
                    for (p = Object.getOwnPropertySymbols(o), u = 0; u < p.length; ++u) c.call(o, p[u]) && l.call(h, p[u]);
                for (u = 0; u < h.length; ++u) d[h[u]] = o[h[u]]
            }
            return d
        };
    o(u, {
        shim: function() {
            var e = function() {
                if (!Object.assign || !Object.preventExtensions) return !1;
                var e = Object.preventExtensions({
                    1: 2
                });
                try {
                    Object.assign(e, "xy")
                } catch (t) {
                    return "y" === e[1]
                }
            };
            return o(Object, {
                assign: u
            }, {
                assign: e
            }), Object.assign || u
        }
    }), e.exports = u
}, function(e, t, r) {
    "use strict";
    var n = r(75),
        i = r(76),
        s = n.createFactory(r(77)),
        o = n.createFactory(r(78)),
        a = n.createClass({
            displayName: "ReactCSSTransitionGroup",
            propTypes: {
                transitionName: n.PropTypes.string.isRequired,
                transitionAppear: n.PropTypes.bool,
                transitionEnter: n.PropTypes.bool,
                transitionLeave: n.PropTypes.bool
            },
            getDefaultProps: function() {
                return {
                    transitionAppear: !1,
                    transitionEnter: !0,
                    transitionLeave: !0
                }
            },
            _wrapChild: function(e) {
                return o({
                    name: this.props.transitionName,
                    appear: this.props.transitionAppear,
                    enter: this.props.transitionEnter,
                    leave: this.props.transitionLeave
                }, e)
            },
            render: function() {
                return s(i({}, this.props, {
                    childFactory: this._wrapChild
                }))
            }
        });
    e.exports = a
}, function(e, t, r) {
    var n, i;
    ! function(s, o) {
        "use strict";
        n = o, i = "function" == typeof n ? n.call(t, r, t, e) : n, !(void 0 !== i && (e.exports = i))
    }(this, function() {
        var e, t = Array.prototype,
            r = Object.prototype,
            n = Function.prototype,
            i = String.prototype,
            s = Number.prototype,
            o = t.slice,
            a = t.splice,
            l = t.push,
            c = t.unshift,
            u = t.concat,
            h = n.call,
            p = r.toString,
            d = Array.isArray || function(e) {
                return "[object Array]" === p.call(e)
            },
            f = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
            m = Function.prototype.toString,
            g = function(e) {
                try {
                    return m.call(e), !0
                } catch (t) {
                    return !1
                }
            },
            v = "[object Function]",
            y = "[object GeneratorFunction]";
        e = function(e) {
            if ("function" != typeof e) return !1;
            if (f) return g(e);
            var t = p.call(e);
            return t === v || t === y
        };
        var b, w = RegExp.prototype.exec,
            _ = function(e) {
                try {
                    return w.call(e), !0
                } catch (t) {
                    return !1
                }
            },
            x = "[object RegExp]";
        b = function(e) {
            return "object" != typeof e ? !1 : f ? _(e) : p.call(e) === x
        };
        var k, C = String.prototype.valueOf,
            S = function(e) {
                try {
                    return C.call(e), !0
                } catch (t) {
                    return !1
                }
            },
            E = "[object String]";
        k = function(e) {
            return "string" == typeof e ? !0 : "object" != typeof e ? !1 : f ? S(e) : p.call(e) === E
        };
        var D = function(t) {
                var r = p.call(t),
                    n = "[object Arguments]" === r;
                return n || (n = !d(t) && null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && e(t.callee)), n
            },
            T = function(e) {
                var t, r = Object.defineProperty && function() {
                    try {
                        var e = {};
                        Object.defineProperty(e, "x", {
                            enumerable: !1,
                            value: e
                        });
                        for (var t in e) return !1;
                        return e.x === e
                    } catch (r) {
                        return !1
                    }
                }();
                return t = r ? function(e, t, r, n) {
                        !n && t in e || Object.defineProperty(e, t, {
                            configurable: !0,
                            enumerable: !1,
                            writable: !0,
                            value: r
                        })
                    } : function(e, t, r, n) {
                        !n && t in e || (e[t] = r)
                    },
                    function(r, n, i) {
                        for (var s in n) e.call(n, s) && t(r, s, n[s], i)
                    }
            }(r.hasOwnProperty),
            O = function(e) {
                var t = typeof e;
                return null === e || "object" !== t && "function" !== t
            },
            M = {
                ToInteger: function(e) {
                    var t = +e;
                    return t !== t ? t = 0 : 0 !== t && t !== 1 / 0 && t !== -(1 / 0) && (t = (t > 0 || -1) * Math.floor(Math.abs(t))), t
                },
                ToPrimitive: function(t) {
                    var r, n, i;
                    if (O(t)) return t;
                    if (n = t.valueOf, e(n) && (r = n.call(t), O(r))) return r;
                    if (i = t.toString, e(i) && (r = i.call(t), O(r))) return r;
                    throw new TypeError
                },
                ToObject: function(e) {
                    if (null == e) throw new TypeError("can't convert " + e + " to object");
                    return Object(e)
                },
                ToUint32: function(e) {
                    return e >>> 0
                }
            },
            N = function() {};
        T(n, {
            bind: function(t) {
                var r = this;
                if (!e(r)) throw new TypeError("Function.prototype.bind called on incompatible " + r);
                for (var n, i = o.call(arguments, 1), s = function() {
                        if (this instanceof n) {
                            var e = r.apply(this, u.call(i, o.call(arguments)));
                            return Object(e) === e ? e : this
                        }
                        return r.apply(t, u.call(i, o.call(arguments)))
                    }, a = Math.max(0, r.length - i.length), l = [], c = 0; a > c; c++) l.push("$" + c);
                return n = Function("binder", "return function (" + l.join(",") + "){ return binder.apply(this, arguments); }")(s), r.prototype && (N.prototype = r.prototype, n.prototype = new N, N.prototype = null), n
            }
        });
        var P = h.bind(r.hasOwnProperty),
            j = function() {
                var e = [1, 2],
                    t = e.splice();
                return 2 === e.length && d(t) && 0 === t.length
            }();
        T(t, {
            splice: function(e, t) {
                return 0 === arguments.length ? [] : a.apply(this, arguments)
            }
        }, !j);
        var R = function() {
            var e = {};
            return t.splice.call(e, 0, 0, 1), 1 === e.length
        }();
        T(t, {
            splice: function(e, t) {
                if (0 === arguments.length) return [];
                var r = arguments;
                return this.length = Math.max(M.ToInteger(this.length), 0), arguments.length > 0 && "number" != typeof t && (r = o.call(arguments), r.length < 2 ? r.push(this.length - e) : r[1] = M.ToInteger(t)), a.apply(this, r)
            }
        }, !R);
        var I = 1 !== [].unshift(0);
        T(t, {
            unshift: function() {
                return c.apply(this, arguments), this.length
            }
        }, I), T(Array, {
            isArray: d
        });
        var A = Object("a"),
            L = "a" !== A[0] || !(0 in A),
            H = function(e) {
                var t = !0,
                    r = !0;
                return e && (e.call("foo", function(e, r, n) {
                    "object" != typeof n && (t = !1)
                }), e.call([1], function() {
                    "use strict";
                    r = "string" == typeof this
                }, "x")), !!e && t && r
            };
        T(t, {
            forEach: function(t) {
                var r, n = M.ToObject(this),
                    i = L && k(this) ? this.split("") : n,
                    s = -1,
                    o = i.length >>> 0;
                if (arguments.length > 1 && (r = arguments[1]), !e(t)) throw new TypeError("Array.prototype.forEach callback must be a function");
                for (; ++s < o;) s in i && ("undefined" != typeof r ? t.call(r, i[s], s, n) : t(i[s], s, n))
            }
        }, !H(t.forEach)), T(t, {
            map: function(t) {
                var r, n = M.ToObject(this),
                    i = L && k(this) ? this.split("") : n,
                    s = i.length >>> 0,
                    o = Array(s);
                if (arguments.length > 1 && (r = arguments[1]), !e(t)) throw new TypeError("Array.prototype.map callback must be a function");
                for (var a = 0; s > a; a++) a in i && ("undefined" != typeof r ? o[a] = t.call(r, i[a], a, n) : o[a] = t(i[a], a, n));
                return o
            }
        }, !H(t.map)), T(t, {
            filter: function(t) {
                var r, n, i = M.ToObject(this),
                    s = L && k(this) ? this.split("") : i,
                    o = s.length >>> 0,
                    a = [];
                if (arguments.length > 1 && (n = arguments[1]), !e(t)) throw new TypeError("Array.prototype.filter callback must be a function");
                for (var l = 0; o > l; l++) l in s && (r = s[l], ("undefined" == typeof n ? t(r, l, i) : t.call(n, r, l, i)) && a.push(r));
                return a
            }
        }, !H(t.filter)), T(t, {
            every: function(t) {
                var r, n = M.ToObject(this),
                    i = L && k(this) ? this.split("") : n,
                    s = i.length >>> 0;
                if (arguments.length > 1 && (r = arguments[1]), !e(t)) throw new TypeError("Array.prototype.every callback must be a function");
                for (var o = 0; s > o; o++)
                    if (o in i && !("undefined" == typeof r ? t(i[o], o, n) : t.call(r, i[o], o, n))) return !1;
                return !0
            }
        }, !H(t.every)), T(t, {
            some: function(t) {
                var r, n = M.ToObject(this),
                    i = L && k(this) ? this.split("") : n,
                    s = i.length >>> 0;
                if (arguments.length > 1 && (r = arguments[1]), !e(t)) throw new TypeError("Array.prototype.some callback must be a function");
                for (var o = 0; s > o; o++)
                    if (o in i && ("undefined" == typeof r ? t(i[o], o, n) : t.call(r, i[o], o, n))) return !0;
                return !1
            }
        }, !H(t.some));
        var q = !1;
        t.reduce && (q = "object" == typeof t.reduce.call("es5", function(e, t, r, n) {
            return n
        })), T(t, {
            reduce: function(t) {
                var r = M.ToObject(this),
                    n = L && k(this) ? this.split("") : r,
                    i = n.length >>> 0;
                if (!e(t)) throw new TypeError("Array.prototype.reduce callback must be a function");
                if (0 === i && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
                var s, o = 0;
                if (arguments.length >= 2) s = arguments[1];
                else
                    for (;;) {
                        if (o in n) {
                            s = n[o++];
                            break
                        }
                        if (++o >= i) throw new TypeError("reduce of empty array with no initial value")
                    }
                for (; i > o; o++) o in n && (s = t(s, n[o], o, r));
                return s
            }
        }, !q);
        var F = !1;
        t.reduceRight && (F = "object" == typeof t.reduceRight.call("es5", function(e, t, r, n) {
            return n
        })), T(t, {
            reduceRight: function(t) {
                var r = M.ToObject(this),
                    n = L && k(this) ? this.split("") : r,
                    i = n.length >>> 0;
                if (!e(t)) throw new TypeError("Array.prototype.reduceRight callback must be a function");
                if (0 === i && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
                var s, o = i - 1;
                if (arguments.length >= 2) s = arguments[1];
                else
                    for (;;) {
                        if (o in n) {
                            s = n[o--];
                            break
                        }
                        if (--o < 0) throw new TypeError("reduceRight of empty array with no initial value")
                    }
                if (0 > o) return s;
                do o in n && (s = t(s, n[o], o, r)); while (o--);
                return s
            }
        }, !F);
        var z = Array.prototype.indexOf && -1 !== [0, 1].indexOf(1, 2);
        T(t, {
            indexOf: function(e) {
                var t = L && k(this) ? this.split("") : M.ToObject(this),
                    r = t.length >>> 0;
                if (0 === r) return -1;
                var n = 0;
                for (arguments.length > 1 && (n = M.ToInteger(arguments[1])), n = n >= 0 ? n : Math.max(0, r + n); r > n; n++)
                    if (n in t && t[n] === e) return n;
                return -1
            }
        }, z);
        var W = Array.prototype.lastIndexOf && -1 !== [0, 1].lastIndexOf(0, -3);
        T(t, {
            lastIndexOf: function(e) {
                var t = L && k(this) ? this.split("") : M.ToObject(this),
                    r = t.length >>> 0;
                if (0 === r) return -1;
                var n = r - 1;
                for (arguments.length > 1 && (n = Math.min(n, M.ToInteger(arguments[1]))), n = n >= 0 ? n : r - Math.abs(n); n >= 0; n--)
                    if (n in t && e === t[n]) return n;
                return -1
            }
        }, W);
        var Y = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            B = function() {}.propertyIsEnumerable("prototype"),
            G = !P("x", "0"),
            U = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            V = U.length;
        T(Object, {
            keys: function(t) {
                var r = e(t),
                    n = D(t),
                    i = null !== t && "object" == typeof t,
                    s = i && k(t);
                if (!i && !r && !n) throw new TypeError("Object.keys called on a non-object");
                var o = [],
                    a = B && r;
                if (s && G || n)
                    for (var l = 0; l < t.length; ++l) o.push(String(l));
                if (!n)
                    for (var c in t) a && "prototype" === c || !P(t, c) || o.push(String(c));
                if (Y)
                    for (var u = t.constructor, h = u && u.prototype === t, p = 0; V > p; p++) {
                        var d = U[p];
                        h && "constructor" === d || !P(t, d) || o.push(d)
                    }
                return o
            }
        });
        var X = Object.keys && function() {
                return 2 === Object.keys(arguments).length
            }(1, 2),
            K = Object.keys;
        T(Object, {
            keys: function(e) {
                return K(D(e) ? t.slice.call(e) : e)
            }
        }, !X);
        var Z = -621987552e5,
            $ = "-000001",
            Q = Date.prototype.toISOString && -1 === new Date(Z).toISOString().indexOf($);
        T(Date.prototype, {
            toISOString: function() {
                var e, t, r, n, i;
                if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
                for (n = this.getUTCFullYear(), i = this.getUTCMonth(), n += Math.floor(i / 12), i = (i % 12 + 12) % 12, e = [i + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()], n = (0 > n ? "-" : n > 9999 ? "+" : "") + ("00000" + Math.abs(n)).slice(n >= 0 && 9999 >= n ? -4 : -6), t = e.length; t--;) r = e[t], 10 > r && (e[t] = "0" + r);
                return n + "-" + e.slice(0, 2).join("-") + "T" + e.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
            }
        }, Q);
        var J = function() {
            try {
                return Date.prototype.toJSON && null === new Date(NaN).toJSON() && -1 !== new Date(Z).toJSON().indexOf($) && Date.prototype.toJSON.call({
                    toISOString: function() {
                        return !0
                    }
                })
            } catch (e) {
                return !1
            }
        }();
        J || (Date.prototype.toJSON = function(t) {
            var r = Object(this),
                n = M.ToPrimitive(r);
            if ("number" == typeof n && !isFinite(n)) return null;
            var i = r.toISOString;
            if (!e(i)) throw new TypeError("toISOString property is not callable");
            return i.call(r)
        });
        var ee = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"),
            te = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")),
            re = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
        (!Date.parse || re || te || !ee) && (Date = function(e) {
            var t = function(r, n, i, s, o, a, l) {
                    var c, u = arguments.length;
                    return c = this instanceof e ? 1 === u && String(r) === r ? new e(t.parse(r)) : u >= 7 ? new e(r, n, i, s, o, a, l) : u >= 6 ? new e(r, n, i, s, o, a) : u >= 5 ? new e(r, n, i, s, o) : u >= 4 ? new e(r, n, i, s) : u >= 3 ? new e(r, n, i) : u >= 2 ? new e(r, n) : u >= 1 ? new e(r) : new e : e.apply(this, arguments), T(c, {
                        constructor: t
                    }, !0), c
                },
                r = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
                n = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
                i = function(e, t) {
                    var r = t > 1 ? 1 : 0;
                    return n[t] + Math.floor((e - 1969 + r) / 4) - Math.floor((e - 1901 + r) / 100) + Math.floor((e - 1601 + r) / 400) + 365 * (e - 1970)
                },
                s = function(t) {
                    return Number(new e(1970, 0, 1, 0, 0, 0, t))
                };
            for (var o in e) P(e, o) && (t[o] = e[o]);
            T(t, {
                now: e.now,
                UTC: e.UTC
            }, !0), t.prototype = e.prototype, T(t.prototype, {
                constructor: t
            }, !0);
            var a = function(t) {
                var n = r.exec(t);
                if (n) {
                    var o, a = Number(n[1]),
                        l = Number(n[2] || 1) - 1,
                        c = Number(n[3] || 1) - 1,
                        u = Number(n[4] || 0),
                        h = Number(n[5] || 0),
                        p = Number(n[6] || 0),
                        d = Math.floor(1e3 * Number(n[7] || 0)),
                        f = Boolean(n[4] && !n[8]),
                        m = "-" === n[9] ? 1 : -1,
                        g = Number(n[10] || 0),
                        v = Number(n[11] || 0);
                    return (h > 0 || p > 0 || d > 0 ? 24 : 25) > u && 60 > h && 60 > p && 1e3 > d && l > -1 && 12 > l && 24 > g && 60 > v && c > -1 && c < i(a, l + 1) - i(a, l) && (o = 60 * (24 * (i(a, l) + c) + u + g * m), o = 1e3 * (60 * (o + h + v * m) + p) + d, f && (o = s(o)), o >= -864e13 && 864e13 >= o) ? o : NaN
                }
                return e.parse.apply(this, arguments)
            };
            return T(t, {
                parse: a
            }), t
        }(Date)), Date.now || (Date.now = function() {
            return (new Date).getTime()
        });
        var ne = s.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9. toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)),
            ie = {
                base: 1e7,
                size: 6,
                data: [0, 0, 0, 0, 0, 0],
                multiply: function(e, t) {
                    for (var r = -1, n = t; ++r < ie.size;) n += e * ie.data[r], ie.data[r] = n % ie.base, n = Math.floor(n / ie.base)
                },
                divide: function(e) {
                    for (var t = ie.size, r = 0; --t >= 0;) r += ie.data[t], ie.data[t] = Math.floor(r / e), r = r % e * ie.base
                },
                numToString: function() {
                    for (var e = ie.size, t = ""; --e >= 0;)
                        if ("" !== t || 0 === e || 0 !== ie.data[e]) {
                            var r = String(ie.data[e]);
                            "" === t ? t = r : t += "0000000".slice(0, 7 - r.length) + r
                        }
                    return t
                },
                pow: function ge(e, t, r) {
                    return 0 === t ? r : t % 2 === 1 ? ge(e, t - 1, r * e) : ge(e * e, t / 2, r)
                },
                log: function(e) {
                    for (var t = 0, r = e; r >= 4096;) t += 12, r /= 4096;
                    for (; r >= 2;) t += 1, r /= 2;
                    return t
                }
            };
        T(s, {
            toFixed: function(e) {
                var t, r, n, i, s, o, a, l;
                if (t = Number(e), t = t !== t ? 0 : Math.floor(t), 0 > t || t > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
                if (r = Number(this), r !== r) return "NaN";
                if (-1e21 >= r || r >= 1e21) return String(r);
                if (n = "", 0 > r && (n = "-", r = -r), i = "0", r > 1e-21)
                    if (s = ie.log(r * ie.pow(2, 69, 1)) - 69, o = 0 > s ? r * ie.pow(2, -s, 1) : r / ie.pow(2, s, 1), o *= 4503599627370496, s = 52 - s, s > 0) {
                        for (ie.multiply(0, o), a = t; a >= 7;) ie.multiply(1e7, 0), a -= 7;
                        for (ie.multiply(ie.pow(10, a, 1), 0), a = s - 1; a >= 23;) ie.divide(1 << 23), a -= 23;
                        ie.divide(1 << a), ie.multiply(1, 1), ie.divide(2), i = ie.numToString()
                    } else ie.multiply(0, o), ie.multiply(1 << -s, 0), i = ie.numToString() + "0.00000000000000000000".slice(2, 2 + t);
                return t > 0 ? (l = i.length, i = t >= l ? n + "0.0000000000000000000".slice(0, t - l + 2) + i : n + i.slice(0, l - t) + "." + i.slice(l - t)) : i = n + i, i
            }
        }, ne);
        var se = i.split;
        2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? ! function() {
            var e = "undefined" == typeof /()??/.exec("")[1];
            i.split = function(t, r) {
                var n = this;
                if ("undefined" == typeof t && 0 === r) return [];
                if (!b(t)) return se.call(this, t, r);
                var i, s, o, a, c = [],
                    u = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.extended ? "x" : "") + (t.sticky ? "y" : ""),
                    h = 0,
                    p = new RegExp(t.source, u + "g");
                n += "", e || (i = new RegExp("^" + p.source + "$(?!\\s)", u));
                var d = "undefined" == typeof r ? -1 >>> 0 : M.ToUint32(r);
                for (s = p.exec(n); s && (o = s.index + s[0].length, !(o > h && (c.push(n.slice(h, s.index)), !e && s.length > 1 && s[0].replace(i, function() {
                        for (var e = 1; e < arguments.length - 2; e++) "undefined" == typeof arguments[e] && (s[e] = void 0)
                    }), s.length > 1 && s.index < n.length && l.apply(c, s.slice(1)), a = s[0].length, h = o, c.length >= d)));) p.lastIndex === s.index && p.lastIndex++, s = p.exec(n);
                return h === n.length ? (a || !p.test("")) && c.push("") : c.push(n.slice(h)), c.length > d ? c.slice(0, d) : c
            }
        }() : "0".split(void 0, 0).length && (i.split = function(e, t) {
            return "undefined" == typeof e && 0 === t ? [] : se.call(this, e, t)
        });
        var oe = i.replace,
            ae = function() {
                var e = [];
                return "x".replace(/x(.)?/g, function(t, r) {
                    e.push(r)
                }), 1 === e.length && "undefined" == typeof e[0]
            }();
        ae || (i.replace = function(t, r) {
            var n = e(r),
                i = b(t) && /\)[*?]/.test(t.source);
            if (n && i) {
                var s = function(e) {
                    var n = arguments.length,
                        i = t.lastIndex;
                    t.lastIndex = 0;
                    var s = t.exec(e) || [];
                    return t.lastIndex = i, s.push(arguments[n - 2], arguments[n - 1]), r.apply(this, s)
                };
                return oe.call(this, t, s)
            }
            return oe.call(this, t, r)
        });
        var le = i.substr,
            ce = "".substr && "b" !== "0b".substr(-1);
        T(i, {
            substr: function(e, t) {
                var r = e;
                return 0 > e && (r = Math.max(this.length + e, 0)), le.call(this, r, t)
            }
        }, ce);
        var ue = "	\n\f\r   ᠎             　\u2028\u2029\ufeff",
            he = "​",
            pe = "[" + ue + "]",
            de = new RegExp("^" + pe + pe + "*"),
            fe = new RegExp(pe + pe + "*$"),
            me = i.trim && (ue.trim() || !he.trim());
        T(i, {
            trim: function() {
                if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                return String(this).replace(de, "").replace(fe, "")
            }
        }, me), (8 !== parseInt(ue + "08") || 22 !== parseInt(ue + "0x16")) && (parseInt = function(e) {
            var t = /^0[xX]/;
            return function(r, n) {
                var i = String(r).trim(),
                    s = Number(n) || (t.test(i) ? 16 : 10);
                return e(i, s)
            }
        }(parseInt))
    })
}, function(e, t, r) {
    var n, i;
    ! function(s, o) {
        "use strict";
        n = o, i = "function" == typeof n ? n.call(t, r, t, e) : n, !(void 0 !== i && (e.exports = i))
    }(this, function() {
        var e, t, r, n, i = Function.prototype.call,
            s = Object.prototype,
            o = i.bind(s.hasOwnProperty),
            a = o(s, "__defineGetter__");
        a && (e = i.bind(s.__defineGetter__), t = i.bind(s.__defineSetter__), r = i.bind(s.__lookupGetter__), n = i.bind(s.__lookupSetter__)), Object.getPrototypeOf || (Object.getPrototypeOf = function(e) {
            var t = e.__proto__;
            return t || null === t ? t : e.constructor ? e.constructor.prototype : s
        });
        var l = function(e) {
            try {
                return e.sentinel = 0, 0 === Object.getOwnPropertyDescriptor(e, "sentinel").value
            } catch (t) {
                return !1
            }
        };
        if (Object.defineProperty) {
            var c = l({}),
                u = "undefined" == typeof document || l(document.createElement("div"));
            if (!u || !c) var h = Object.getOwnPropertyDescriptor
        }
        if (!Object.getOwnPropertyDescriptor || h) {
            var p = "Object.getOwnPropertyDescriptor called on a non-object: ";
            Object.getOwnPropertyDescriptor = function(e, t) {
                if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError(p + e);
                if (h) try {
                    return h.call(Object, e, t)
                } catch (i) {}
                var l;
                if (!o(e, t)) return l;
                if (l = {
                        enumerable: !0,
                        configurable: !0
                    }, a) {
                    var c = e.__proto__,
                        u = e !== s;
                    u && (e.__proto__ = s);
                    var d = r(e, t),
                        f = n(e, t);
                    if (u && (e.__proto__ = c), d || f) return d && (l.get = d), f && (l.set = f), l
                }
                return l.value = e[t], l.writable = !0, l
            }
        }
        if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(e) {
                return Object.keys(e)
            }), !Object.create) {
            var d, f = !({
                        __proto__: null
                    }
                    instanceof Object),
                m = function() {
                    if (!document.domain) return !1;
                    try {
                        return !!new ActiveXObject("htmlfile")
                    } catch (e) {
                        return !1
                    }
                },
                g = function() {
                    var e, t;
                    return t = new ActiveXObject("htmlfile"), t.write("<script></script>"), t.close(), e = t.parentWindow.Object.prototype, t = null, e
                },
                v = function() {
                    var e, t = document.createElement("iframe"),
                        r = document.body || document.documentElement;
                    return t.style.display = "none", r.appendChild(t), t.src = "javascript:", e = t.contentWindow.Object.prototype, r.removeChild(t), t = null, e
                };
            d = f || "undefined" == typeof document ? function() {
                return {
                    __proto__: null
                }
            } : function() {
                var e = m() ? g() : v();
                delete e.constructor, delete e.hasOwnProperty, delete e.propertyIsEnumerable, delete e.isPrototypeOf, delete e.toLocaleString, delete e.toString, delete e.valueOf, e.__proto__ = null;
                var t = function() {};
                return t.prototype = e, d = function() {
                    return new t
                }, new t
            }, Object.create = function(e, t) {
                var r, n = function() {};
                if (null === e) r = d();
                else {
                    if ("object" != typeof e && "function" != typeof e) throw new TypeError("Object prototype may only be an Object or null");
                    n.prototype = e, r = new n, r.__proto__ = e
                }
                return void 0 !== t && Object.defineProperties(r, t), r
            }
        }
        var y = function(e) {
            try {
                return Object.defineProperty(e, "sentinel", {}), "sentinel" in e
            } catch (t) {
                return !1
            }
        };
        if (Object.defineProperty) {
            var b = y({}),
                w = "undefined" == typeof document || y(document.createElement("div"));
            if (!b || !w) var _ = Object.defineProperty,
                x = Object.defineProperties
        }
        if (!Object.defineProperty || _) {
            var k = "Property description must be an object: ",
                C = "Object.defineProperty called on non-object: ",
                S = "getters & setters can not be defined on this javascript engine";
            Object.defineProperty = function(i, o, l) {
                if ("object" != typeof i && "function" != typeof i || null === i) throw new TypeError(C + i);
                if ("object" != typeof l && "function" != typeof l || null === l) throw new TypeError(k + l);
                if (_) try {
                    return _.call(Object, i, o, l)
                } catch (c) {}
                if ("value" in l)
                    if (a && (r(i, o) || n(i, o))) {
                        var u = i.__proto__;
                        i.__proto__ = s, delete i[o], i[o] = l.value, i.__proto__ = u
                    } else i[o] = l.value;
                else {
                    if (!a) throw new TypeError(S);
                    "get" in l && e(i, o, l.get), "set" in l && t(i, o, l.set)
                }
                return i
            }
        }(!Object.defineProperties || x) && (Object.defineProperties = function(e, t) {
            if (x) try {
                return x.call(Object, e, t)
            } catch (r) {}
            return Object.keys(t).forEach(function(r) {
                "__proto__" !== r && Object.defineProperty(e, r, t[r])
            }), e
        }), Object.seal || (Object.seal = function(e) {
            if (Object(e) !== e) throw new TypeError("Object.seal can only be called on Objects.");
            return e
        }), Object.freeze || (Object.freeze = function(e) {
            if (Object(e) !== e) throw new TypeError("Object.freeze can only be called on Objects.");
            return e
        });
        try {
            Object.freeze(function() {})
        } catch (E) {
            Object.freeze = function(e) {
                return function(t) {
                    return "function" == typeof t ? t : e(t)
                }
            }(Object.freeze)
        }
        Object.preventExtensions || (Object.preventExtensions = function(e) {
            if (Object(e) !== e) throw new TypeError("Object.preventExtensions can only be called on Objects.");
            return e
        }), Object.isSealed || (Object.isSealed = function(e) {
            if (Object(e) !== e) throw new TypeError("Object.isSealed can only be called on Objects.");
            return !1
        }), Object.isFrozen || (Object.isFrozen = function(e) {
            if (Object(e) !== e) throw new TypeError("Object.isFrozen can only be called on Objects.");
            return !1
        }), Object.isExtensible || (Object.isExtensible = function(e) {
            if (Object(e) !== e) throw new TypeError("Object.isExtensible can only be called on Objects.");
            for (var t = ""; o(e, t);) t += "?";
            e[t] = !0;
            var r = o(e, t);
            return delete e[t], r
        })
    })
}, , function(e, t, r) {
    var n, i;
    (function(s) {
        ! function(s, o) {
            n = o, i = "function" == typeof n ? n.call(t, r, t, e) : n, !(void 0 !== i && (e.exports = i))
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
                i = function(e) {
                    try {
                        return e()
                    } catch (t) {
                        return !1
                    }
                },
                o = r(n),
                a = function(e, t) {
                    return Object.setPrototypeOf ? i(function() {
                        var r = function n(t) {
                            var r = new e(t);
                            return Object.setPrototypeOf(r, n.prototype), r
                        };
                        return r.prototype = T(e.prototype, {
                            constructor: {
                                value: e
                            }
                        }), t(r)
                    }) : !1
                },
                l = function() {
                    return !n(function() {
                        Object.defineProperty({}, "x", {})
                    })
                },
                c = function() {
                    return String.prototype.startsWith && n(function() {
                        "/a/".startsWith(/a/)
                    })
                },
                u = function() {
                    return String.prototype.startsWith && "abc".startsWith("a", 1 / 0) === !1
                }(),
                h = new Function("return this;"),
                p = h(),
                d = p.isFinite,
                f = !!Object.defineProperty && l(),
                m = (function() {
                    return null === this
                }.call(null), c() && u),
                g = Function.call.bind(String.prototype.indexOf),
                v = Function.call.bind(Object.prototype.toString),
                y = Function.call.bind(Object.prototype.hasOwnProperty),
                b = function() {},
                w = p.Symbol || {},
                _ = w.species || "@@species",
                x = {
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
                k = Number.isNaN || function(e) {
                    return e !== e
                },
                C = Number.isFinite || function(e) {
                    return "number" == typeof e && d(e)
                },
                S = function(e, t, r, n) {
                    !n && t in e || (f ? Object.defineProperty(e, t, {
                        configurable: !0,
                        enumerable: !1,
                        writable: !0,
                        value: r
                    }) : e[t] = r)
                },
                E = {
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
                        S(e, "toString", t.toString.bind(t), !0)
                    }
                },
                D = function(e, t) {
                    Object.keys(t).forEach(function(r) {
                        var n = t[r];
                        S(e, r, n, !1)
                    })
                },
                T = Object.create || function(e, t) {
                    function r() {}
                    r.prototype = e;
                    var n = new r;
                    return "undefined" != typeof t && D(n, t), n
                },
                O = x.symbol(w.iterator) ? w.iterator : "_es6-shim iterator_";
            p.Set && "function" == typeof(new p.Set)["@@iterator"] && (O = "@@iterator");
            var M = function(e, t) {
                    t || (t = function() {
                        return this
                    });
                    var r = {};
                    r[O] = t, D(e, r), !e[O] && x.symbol(O) && (e[O] = t)
                },
                N = function(e) {
                    var t = v(e),
                        r = "[object Arguments]" === t;
                    return r || (r = "[object Array]" !== t && null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Function]" === v(e.callee)), r
                },
                P = Function.call.bind(Function.apply),
                j = {
                    Call: function(e, t) {
                        var r = arguments.length > 2 ? arguments[2] : [];
                        if (!j.IsCallable(e)) throw new TypeError(e + " is not a function");
                        return P(e, t, r)
                    },
                    RequireObjectCoercible: function(e, t) {
                        if (null == e) throw new TypeError(t || "Cannot call method on " + e)
                    },
                    TypeIsObject: function(e) {
                        return null != e && Object(e) === e
                    },
                    ToObject: function(e, t) {
                        return j.RequireObjectCoercible(e, t), Object(e)
                    },
                    IsCallable: function(e) {
                        return "function" == typeof e && "[object Function]" === v(e)
                    },
                    ToInt32: function(e) {
                        return j.ToNumber(e) >> 0
                    },
                    ToUint32: function(e) {
                        return j.ToNumber(e) >>> 0
                    },
                    ToNumber: function(e) {
                        if ("[object Symbol]" === v(e)) throw new TypeError("Cannot convert a Symbol value to a number");
                        return +e
                    },
                    ToInteger: function(e) {
                        var t = j.ToNumber(e);
                        return k(t) ? 0 : 0 !== t && C(t) ? (t > 0 ? 1 : -1) * Math.floor(Math.abs(t)) : t
                    },
                    ToLength: function(e) {
                        var t = j.ToInteger(e);
                        return 0 >= t ? 0 : t > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : t
                    },
                    SameValue: function(e, t) {
                        return e === t ? 0 === e ? 1 / e === 1 / t : !0 : k(e) && k(t)
                    },
                    SameValueZero: function(e, t) {
                        return e === t || k(e) && k(t)
                    },
                    IsIterable: function(e) {
                        return j.TypeIsObject(e) && ("undefined" != typeof e[O] || N(e))
                    },
                    GetIterator: function(e) {
                        if (N(e)) return new t(e, "value");
                        var r = e[O];
                        if (!j.IsCallable(r)) throw new TypeError("value is not an iterable");
                        var n = r.call(e);
                        if (!j.TypeIsObject(n)) throw new TypeError("bad iterator");
                        return n
                    },
                    IteratorNext: function(e) {
                        var t = arguments.length > 1 ? e.next(arguments[1]) : e.next();
                        if (!j.TypeIsObject(t)) throw new TypeError("bad iterator");
                        return t
                    },
                    Construct: function(e, t) {
                        var r;
                        r = j.IsCallable(e[_]) ? e[_]() : T(e.prototype || null), D(r, {
                            _es6construct: !0
                        });
                        var n = j.Call(e, r, t);
                        return j.TypeIsObject(n) ? n : r
                    },
                    CreateHTML: function(e, t, r, n) {
                        var i = String(e),
                            s = "<" + t;
                        if ("" !== r) {
                            var o = String(n),
                                a = o.replace(/"/g, "&quot;");
                            s += " " + r + '="' + a + '"'
                        }
                        var l = s + ">",
                            c = l + i;
                        return c + "</" + t + ">"
                    }
                },
                R = function(e) {
                    if (!j.TypeIsObject(e)) throw new TypeError("bad object");
                    return e._es6construct || (e.constructor && j.IsCallable(e.constructor[_]) && (e = e.constructor[_](e)), D(e, {
                        _es6construct: !0
                    })), e
                };
            if (String.fromCodePoint && 1 !== String.fromCodePoint.length) {
                var I = Function.apply.bind(String.fromCodePoint);
                S(String, "fromCodePoint", function(e) {
                    return I(this, arguments)
                }, !0)
            }
            var A = {
                fromCodePoint: function(e) {
                    for (var t, r = [], n = 0, i = arguments.length; i > n; n++) {
                        if (t = Number(arguments[n]), !j.SameValue(t, j.ToInteger(t)) || 0 > t || t > 1114111) throw new RangeError("Invalid code point " + t);
                        65536 > t ? r.push(String.fromCharCode(t)) : (t -= 65536, r.push(String.fromCharCode((t >> 10) + 55296)), r.push(String.fromCharCode(t % 1024 + 56320)))
                    }
                    return r.join("")
                },
                raw: function(e) {
                    var t = j.ToObject(e, "bad callSite"),
                        r = j.ToObject(t.raw, "bad raw value"),
                        n = r.length,
                        i = j.ToLength(n);
                    if (0 >= i) return "";
                    for (var s, o, a, l, c = [], u = 0; i > u && (s = String(u), a = String(r[s]), c.push(a), !(u + 1 >= i));) o = u + 1 < arguments.length ? arguments[u + 1] : "", l = String(o), c.push(l), u++;
                    return c.join("")
                }
            };
            if (D(String, A), "xy" !== String.raw({
                    raw: {
                        0: "x",
                        1: "y",
                        length: 2
                    }
                })) {
                var L = String.raw;
                S(String, "raw", A.raw, !0), E.preserveToString(String.raw, L)
            }
            var H = function Lt(e, t) {
                    if (1 > t) return "";
                    if (t % 2) return Lt(e, t - 1) + e;
                    var r = Lt(e, t / 2);
                    return r + r
                },
                q = 1 / 0,
                F = {
                    repeat: function(e) {
                        j.RequireObjectCoercible(this);
                        var t = String(this);
                        if (e = j.ToInteger(e), 0 > e || e >= q) throw new RangeError("repeat count must be less than infinity and not overflow maximum string size");
                        return H(t, e)
                    },
                    startsWith: function(e) {
                        j.RequireObjectCoercible(this);
                        var t = String(this);
                        if (x.regex(e)) throw new TypeError('Cannot call method "startsWith" with a regex');
                        e = String(e);
                        var r = arguments.length > 1 ? arguments[1] : void 0,
                            n = Math.max(j.ToInteger(r), 0);
                        return t.slice(n, n + e.length) === e
                    },
                    endsWith: function(e) {
                        j.RequireObjectCoercible(this);
                        var t = String(this);
                        if (x.regex(e)) throw new TypeError('Cannot call method "endsWith" with a regex');
                        e = String(e);
                        var r = t.length,
                            n = arguments.length > 1 ? arguments[1] : void 0,
                            i = "undefined" == typeof n ? r : j.ToInteger(n),
                            s = Math.min(Math.max(i, 0), r);
                        return t.slice(s - e.length, s) === e
                    },
                    includes: function(e) {
                        var t = arguments.length > 1 ? arguments[1] : void 0;
                        return -1 !== g(this, e, t)
                    },
                    codePointAt: function(e) {
                        j.RequireObjectCoercible(this);
                        var t = String(this),
                            r = j.ToInteger(e),
                            n = t.length;
                        if (r >= 0 && n > r) {
                            var i = t.charCodeAt(r),
                                s = r + 1 === n;
                            if (55296 > i || i > 56319 || s) return i;
                            var o = t.charCodeAt(r + 1);
                            return 56320 > o || o > 57343 ? i : 1024 * (i - 55296) + (o - 56320) + 65536
                        }
                    }
                };
            if (D(String.prototype, F), "a".includes("a", 1 / 0) !== !1) {
                var z = String.prototype.includes;
                S(String.prototype, "includes", F.includes, !0), E.preserveToString(String.prototype.includes, z)
            }
            var W = 1 !== "".trim().length;
            if (W) {
                delete String.prototype.trim;
                var Y = ["	\n\f\r   ᠎    ", "         　\u2028", "\u2029\ufeff"].join(""),
                    B = new RegExp("(^[" + Y + "]+)|([" + Y + "]+$)", "g");
                D(String.prototype, {
                    trim: function() {
                        if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                        return String(this).replace(B, "")
                    }
                })
            }
            var G = function(e) {
                j.RequireObjectCoercible(e), this._s = String(e), this._i = 0
            };
            G.prototype.next = function() {
                var e = this._s,
                    t = this._i;
                if ("undefined" == typeof e || t >= e.length) return this._s = void 0, {
                    value: void 0,
                    done: !0
                };
                var r, n, i = e.charCodeAt(t);
                return 55296 > i || i > 56319 || t + 1 === e.length ? n = 1 : (r = e.charCodeAt(t + 1), n = 56320 > r || r > 57343 ? 1 : 2), this._i = t + n, {
                    value: e.substr(t, n),
                    done: !1
                }
            }, M(G.prototype), M(String.prototype, function() {
                return new G(this)
            }), m || (S(String.prototype, "startsWith", F.startsWith, !0), S(String.prototype, "endsWith", F.endsWith, !0));
            var U = {
                from: function(e) {
                    var t = arguments.length > 1 ? arguments[1] : void 0,
                        r = j.ToObject(e, "bad iterable");
                    if ("undefined" != typeof t && !j.IsCallable(t)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                    var n, i, s, o, a = arguments.length > 2,
                        l = a ? arguments[2] : void 0,
                        c = j.IsIterable(r);
                    if (c) {
                        s = 0, i = j.IsCallable(this) ? Object(new this) : [];
                        var u, h = c ? j.GetIterator(r) : null;
                        do u = j.IteratorNext(h), u.done || (o = u.value, t ? i[s] = a ? t.call(l, o, s) : t(o, s) : i[s] = o, s += 1); while (!u.done);
                        n = s
                    } else
                        for (n = j.ToLength(r.length), i = j.IsCallable(this) ? Object(new this(n)) : new Array(n), s = 0; n > s; ++s) o = r[s], t ? i[s] = a ? t.call(l, o, s) : t(o, s) : i[s] = o;
                    return i.length = n, i
                },
                of: function() {
                    return Array.from.call(this, arguments)
                }
            };
            D(Array, U);
            var V = function(e) {
                return {
                    value: e,
                    done: 0 === arguments.length
                }
            };
            t = function(e, t) {
                this.i = 0, this.array = e, this.kind = t
            }, D(t.prototype, {
                next: function() {
                    var e = this.i,
                        r = this.array;
                    if (!(this instanceof t)) throw new TypeError("Not an ArrayIterator");
                    if ("undefined" != typeof r)
                        for (var n = j.ToLength(r.length); n > e; e++) {
                            var i, s = this.kind;
                            return "key" === s ? i = e : "value" === s ? i = r[e] : "entry" === s && (i = [e, r[e]]), this.i = e + 1, {
                                value: i,
                                done: !1
                            }
                        }
                    return this.array = void 0, {
                        value: void 0,
                        done: !0
                    }
                }
            }), M(t.prototype);
            var X = function(e, t) {
                this.object = e, this.array = null, this.kind = t
            };
            D(X.prototype, {
                next: function() {
                    var t, r = this.array;
                    if (!(this instanceof X)) throw new TypeError("Not an ObjectIterator");
                    for (null === r && (r = this.array = e(this.object)); j.ToLength(r.length) > 0;)
                        if (t = r.shift(), t in this.object) return V("key" === this.kind ? t : "value" === this.kind ? this.object[t] : [t, this.object[t]]);
                    return V()
                }
            }), M(X.prototype);
            var K = function() {
                var e = function(e) {
                    this.length = e
                };
                e.prototype = [];
                var t = Array.of.apply(e, [1, 2]);
                return t instanceof e && 2 === t.length
            }();
            if (!K) {
                var Z = Array.of;
                S(Array, "of", U.of, !0), E.preserveToString(Array.of, Z)
            }
            var $ = {
                copyWithin: function(e, t) {
                    var r = arguments[2],
                        n = j.ToObject(this),
                        i = j.ToLength(n.length);
                    e = j.ToInteger(e), t = j.ToInteger(t);
                    var s = 0 > e ? Math.max(i + e, 0) : Math.min(e, i),
                        o = 0 > t ? Math.max(i + t, 0) : Math.min(t, i);
                    r = "undefined" == typeof r ? i : j.ToInteger(r);
                    var a = 0 > r ? Math.max(i + r, 0) : Math.min(r, i),
                        l = Math.min(a - o, i - s),
                        c = 1;
                    for (s > o && o + l > s && (c = -1, o += l - 1, s += l - 1); l > 0;) y(n, o) ? n[s] = n[o] : delete n[o], o += c, s += c, l -= 1;
                    return n
                },
                fill: function(e) {
                    var t = arguments.length > 1 ? arguments[1] : void 0,
                        r = arguments.length > 2 ? arguments[2] : void 0,
                        n = j.ToObject(this),
                        i = j.ToLength(n.length);
                    t = j.ToInteger("undefined" == typeof t ? 0 : t), r = j.ToInteger("undefined" == typeof r ? i : r);
                    for (var s = 0 > t ? Math.max(i + t, 0) : Math.min(t, i), o = 0 > r ? i + r : r, a = s; i > a && o > a; ++a) n[a] = e;
                    return n
                },
                find: function(e) {
                    var t = j.ToObject(this),
                        r = j.ToLength(t.length);
                    if (!j.IsCallable(e)) throw new TypeError("Array#find: predicate must be a function");
                    for (var n, i = arguments.length > 1 ? arguments[1] : null, s = 0; r > s; s++)
                        if (n = t[s], i) {
                            if (e.call(i, n, s, t)) return n
                        } else if (e(n, s, t)) return n
                },
                findIndex: function(e) {
                    var t = j.ToObject(this),
                        r = j.ToLength(t.length);
                    if (!j.IsCallable(e)) throw new TypeError("Array#findIndex: predicate must be a function");
                    for (var n = arguments.length > 1 ? arguments[1] : null, i = 0; r > i; i++)
                        if (n) {
                            if (e.call(n, t[i], i, t)) return i
                        } else if (e(t[i], i, t)) return i;
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
            if (Array.prototype.keys && !j.IsCallable([1].keys().next) && delete Array.prototype.keys, Array.prototype.entries && !j.IsCallable([1].entries().next) && delete Array.prototype.entries, Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[O] && (D(Array.prototype, {
                    values: Array.prototype[O]
                }), x.symbol(w.unscopables) && (Array.prototype[w.unscopables].values = !0)), Array.prototype.values && "values" !== Array.prototype.values.name) {
                var Q = Array.prototype.values;
                S(Array.prototype, "values", function() {
                    return Q.call(this)
                }, !0), S(Array.prototype, O, Array.prototype.values, !0), E.preserveToString(Array.prototype.values, Q)
            }
            D(Array.prototype, $), M(Array.prototype, function() {
                return this.values()
            }), Object.getPrototypeOf && M(Object.getPrototypeOf([].values()));
            var J = function() {
                    return i(function() {
                        return 0 === Array.from({
                            length: -1
                        }).length
                    })
                },
                ee = function() {
                    var e = Array.from([0].entries());
                    return 1 === e.length && 0 === e[0][0] && 1 === e[0][1]
                }();
            if (!J() || !ee) {
                var te = Array.from;
                S(Array, "from", U.from, !0), E.preserveToString(Array.from, te)
            }
            var re = Math.pow(2, 53) - 1;
            if (D(Number, {
                    MAX_SAFE_INTEGER: re,
                    MIN_SAFE_INTEGER: -re,
                    EPSILON: 2.220446049250313e-16,
                    parseInt: p.parseInt,
                    parseFloat: p.parseFloat,
                    isFinite: C,
                    isInteger: function(e) {
                        return C(e) && j.ToInteger(e) === e
                    },
                    isSafeInteger: function(e) {
                        return Number.isInteger(e) && Math.abs(e) <= Number.MAX_SAFE_INTEGER
                    },
                    isNaN: k
                }), [, 1].find(function(e, t) {
                    return 0 === t
                }) || S(Array.prototype, "find", $.find, !0), 0 !== [, 1].findIndex(function(e, t) {
                    return 0 === t
                }) && S(Array.prototype, "findIndex", $.findIndex, !0), D(Object, {
                    is: function(e, t) {
                        return j.SameValue(e, t)
                    }
                }), f) {
                var ne = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable),
                    ie = function(e, t) {
                        var r, n = Object.keys(Object(t));
                        return j.IsCallable(Object.getOwnPropertySymbols) && (r = Object.getOwnPropertySymbols(Object(t)).filter(ne(t))), n.concat(r || []).reduce(function(e, r) {
                            return e[r] = t[r], e
                        }, e)
                    },
                    se = {
                        assign: function(e, t) {
                            if (!j.TypeIsObject(e)) throw new TypeError("target must be an object");
                            return Array.prototype.reduce.call(arguments, ie)
                        },
                        setPrototypeOf: function(e, t) {
                            var r, n = function(e, t) {
                                    if (!j.TypeIsObject(e)) throw new TypeError("cannot set prototype on a non-object");
                                    if (null !== t && !j.TypeIsObject(t)) throw new TypeError("can only set prototype to an object or null" + t)
                                },
                                i = function(e, t) {
                                    return n(e, t), r.call(e, t), e
                                };
                            try {
                                r = e.getOwnPropertyDescriptor(e.prototype, t).set, r.call({}, null)
                            } catch (s) {
                                if (e.prototype !== {}[t]) return;
                                r = function(e) {
                                    this[t] = e
                                }, i.polyfill = i(i({}, null), e.prototype) instanceof e
                            }
                            return i
                        }(Object, "__proto__")
                    },
                    oe = Object.assign && Object.preventExtensions && function() {
                        var e = Object.preventExtensions({
                            1: 2
                        });
                        try {
                            Object.assign(e, "xy")
                        } catch (t) {
                            return "y" === e[1]
                        }
                    }();
                if (oe) {
                    var ae = Object.assign;
                    S(Object, "assign", se.assign, !0), E.preserveToString(Object.assign, ae)
                }
                D(Object, se)
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
            var le = !n(function() {
                Object.keys("foo")
            });
            if (!le) {
                var ce = Object.keys;
                S(Object, "keys", function(e) {
                    return ce(j.ToObject(e))
                }, !0), E.preserveToString(Object.keys, ce)
            }
            if (Object.getOwnPropertyNames) {
                var ue = !n(function() {
                    Object.getOwnPropertyNames("foo")
                });
                if (!ue) {
                    var he = Object.getOwnPropertyNames;
                    S(Object, "getOwnPropertyNames", function(e) {
                        return he(j.ToObject(e))
                    }, !0), E.preserveToString(Object.getOwnPropertyNames, he)
                }
            }
            if (Object.getOwnPropertyDescriptor) {
                var pe = !n(function() {
                    Object.getOwnPropertyDescriptor("foo", "bar")
                });
                if (!pe) {
                    var de = Object.getOwnPropertyDescriptor;
                    S(Object, "getOwnPropertyDescriptor", function(e, t) {
                        return de(j.ToObject(e), t)
                    }, !0), E.preserveToString(Object.getOwnPropertyDescriptor, de)
                }
            }
            if (Object.seal) {
                var fe = !n(function() {
                    Object.seal("foo")
                });
                if (!fe) {
                    var me = Object.seal;
                    S(Object, "seal", function(e) {
                        return x.object(e) ? me(e) : e
                    }, !0), E.preserveToString(Object.seal, me)
                }
            }
            if (Object.isSealed) {
                var ge = !n(function() {
                    Object.isSealed("foo")
                });
                if (!ge) {
                    var ve = Object.isSealed;
                    S(Object, "isSealed", function(e) {
                        return x.object(e) ? ve(e) : !0
                    }, !0), E.preserveToString(Object.isSealed, ve)
                }
            }
            if (Object.freeze) {
                var ye = !n(function() {
                    Object.freeze("foo")
                });
                if (!ye) {
                    var be = Object.freeze;
                    S(Object, "freeze", function(e) {
                        return x.object(e) ? be(e) : e
                    }, !0), E.preserveToString(Object.freeze, be)
                }
            }
            if (Object.isFrozen) {
                var we = !n(function() {
                    Object.isFrozen("foo")
                });
                if (!we) {
                    var _e = Object.isFrozen;
                    S(Object, "isFrozen", function(e) {
                        return x.object(e) ? _e(e) : !0
                    }, !0), E.preserveToString(Object.isFrozen, _e)
                }
            }
            if (Object.preventExtensions) {
                var xe = !n(function() {
                    Object.preventExtensions("foo")
                });
                if (!xe) {
                    var ke = Object.preventExtensions;
                    S(Object, "preventExtensions", function(e) {
                        return x.object(e) ? ke(e) : e
                    }, !0), E.preserveToString(Object.preventExtensions, ke)
                }
            }
            if (Object.isExtensible) {
                var Ce = !n(function() {
                    Object.isExtensible("foo")
                });
                if (!Ce) {
                    var Se = Object.isExtensible;
                    S(Object, "isExtensible", function(e) {
                        return x.object(e) ? Se(e) : !1
                    }, !0), E.preserveToString(Object.isExtensible, Se)
                }
            }
            if (Object.getPrototypeOf) {
                var Ee = !n(function() {
                    Object.getPrototypeOf("foo")
                });
                if (!Ee) {
                    var De = Object.getPrototypeOf;
                    S(Object, "getPrototypeOf", function(e) {
                        return De(j.ToObject(e))
                    }, !0), E.preserveToString(Object.getPrototypeOf, De)
                }
            }
            if (!RegExp.prototype.flags && f) {
                var Te = function() {
                    if (!j.TypeIsObject(this)) throw new TypeError("Method called on incompatible type: must be an object.");
                    var e = "";
                    return this.global && (e += "g"), this.ignoreCase && (e += "i"), this.multiline && (e += "m"), this.unicode && (e += "u"), this.sticky && (e += "y"), e
                };
                E.getter(RegExp.prototype, "flags", Te)
            }
            var Oe = i(function() {
                return "/a/i" === String(new RegExp(/a/g, "i"))
            });
            if (!Oe && f) {
                var Me = RegExp,
                    Ne = function Ht(e, t) {
                        return x.regex(e) && x.string(t) ? new Ht(e.source, t) : new Me(e, t)
                    };
                E.preserveToString(Ne, Me), Object.setPrototypeOf && Object.setPrototypeOf(Me, Ne), Object.getOwnPropertyNames(Me).forEach(function(e) {
                    "$input" !== e && (e in b || E.proxy(Me, e, Ne))
                }), Ne.prototype = Me.prototype, E.redefine(Me.prototype, "constructor", Ne), RegExp = Ne, E.redefine(p, "RegExp", Ne)
            }
            if (f) {
                var Pe = {
                    input: "$_",
                    lastMatch: "$&",
                    lastParen: "$+",
                    leftContext: "$`",
                    rightContext: "$'"
                };
                Object.keys(Pe).forEach(function(e) {
                    e in RegExp && !(Pe[e] in RegExp) && E.getter(RegExp, Pe[e], function() {
                        return RegExp[e]
                    })
                })
            }
            var je = function(e) {
                    return e * e
                },
                Re = function(e, t) {
                    return e + t
                },
                Ie = 1 / Number.EPSILON,
                Ae = function(e) {
                    return e + Ie - Ie
                },
                Le = Math.pow(2, -23),
                He = Math.pow(2, 127) * (2 - Le),
                qe = Math.pow(2, -126),
                Fe = {
                    acosh: function(e) {
                        var t = Number(e);
                        return Number.isNaN(t) || 1 > e ? NaN : 1 === t ? 0 : t === 1 / 0 ? t : Math.log(t / Math.E + Math.sqrt(t + 1) * Math.sqrt(t - 1) / Math.E) + 1
                    },
                    asinh: function(e) {
                        return e = Number(e), 0 !== e && d(e) ? 0 > e ? -Math.asinh(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e
                    },
                    atanh: function(e) {
                        return e = Number(e), Number.isNaN(e) || -1 > e || e > 1 ? NaN : -1 === e ? -(1 / 0) : 1 === e ? 1 / 0 : 0 === e ? e : .5 * Math.log((1 + e) / (1 - e))
                    },
                    cbrt: function(e) {
                        if (e = Number(e), 0 === e) return e;
                        var t, r = 0 > e;
                        return r && (e = -e), t = Math.pow(e, 1 / 3), r ? -t : t
                    },
                    clz32: function(e) {
                        e = Number(e);
                        var t = j.ToUint32(e);
                        return 0 === t ? 32 : 31 - Math.floor(Math.log(t + .5) * Math.LOG2E)
                    },
                    cosh: function(e) {
                        return e = Number(e), 0 === e ? 1 : Number.isNaN(e) ? NaN : d(e) ? (0 > e && (e = -e), e > 21 ? Math.exp(e) / 2 : (Math.exp(e) + Math.exp(-e)) / 2) : 1 / 0
                    },
                    expm1: function(e) {
                        var t = Number(e);
                        if (t === -(1 / 0)) return -1;
                        if (!d(t) || 0 === e) return t;
                        if (Math.abs(t) > .5) return Math.exp(t) - 1;
                        for (var r = t, n = 0, i = 1; n + r !== n;) n += r, i += 1, r *= t / i;
                        return n
                    },
                    hypot: function(e, t) {
                        var r = !1,
                            n = !0,
                            i = !1,
                            s = [];
                        if (Array.prototype.every.call(arguments, function(e) {
                                var t = Number(e);
                                return Number.isNaN(t) ? r = !0 : t === 1 / 0 || t === -(1 / 0) ? i = !0 : 0 !== t && (n = !1), i ? !1 : (r || s.push(Math.abs(t)), !0)
                            }), i) return 1 / 0;
                        if (r) return NaN;
                        if (n) return 0;
                        var o = Math.max.apply(Math, s),
                            a = s.map(function(e) {
                                return e / o
                            }),
                            l = a.map(je).reduce(Re);
                        return o * Math.sqrt(l)
                    },
                    log2: function(e) {
                        return Math.log(e) * Math.LOG2E
                    },
                    log10: function(e) {
                        return Math.log(e) * Math.LOG10E
                    },
                    log1p: function(e) {
                        var t = Number(e);
                        return -1 > t || Number.isNaN(t) ? NaN : 0 === t || t === 1 / 0 ? t : -1 === t ? -(1 / 0) : 1 + t - 1 === 0 ? t : t * (Math.log(1 + t) / (1 + t - 1))
                    },
                    sign: function(e) {
                        var t = +e;
                        return 0 === t ? t : Number.isNaN(t) ? t : 0 > t ? -1 : 1
                    },
                    sinh: function(e) {
                        var t = Number(e);
                        return d(e) && 0 !== e ? Math.abs(t) < 1 ? (Math.expm1(t) - Math.expm1(-t)) / 2 : (Math.exp(t - 1) - Math.exp(-t - 1)) * Math.E / 2 : e
                    },
                    tanh: function(e) {
                        var t = Number(e);
                        if (Number.isNaN(e) || 0 === t) return t;
                        if (t === 1 / 0) return 1;
                        if (t === -(1 / 0)) return -1;
                        var r = Math.expm1(t),
                            n = Math.expm1(-t);
                        return r === 1 / 0 ? 1 : n === 1 / 0 ? -1 : (r - n) / (Math.exp(t) + Math.exp(-t))
                    },
                    trunc: function(e) {
                        var t = Number(e);
                        return 0 > t ? -Math.floor(-t) : Math.floor(t)
                    },
                    imul: function(e, t) {
                        e = j.ToUint32(e), t = j.ToUint32(t);
                        var r = e >>> 16 & 65535,
                            n = 65535 & e,
                            i = t >>> 16 & 65535,
                            s = 65535 & t;
                        return n * s + (r * s + n * i << 16 >>> 0) | 0
                    },
                    fround: function(e) {
                        var t = Number(e);
                        if (0 === t || t === 1 / 0 || t === -(1 / 0) || k(t)) return t;
                        var r = Math.sign(t),
                            n = Math.abs(t);
                        if (qe > n) return r * Ae(n / qe / Le) * qe * Le;
                        var i = (1 + Le / Number.EPSILON) * n,
                            s = i - (i - n);
                        return s > He || k(s) ? r * (1 / 0) : r * s
                    }
                };
            D(Math, Fe), S(Math, "log1p", Fe.log1p, -1e-17 !== Math.log1p(-1e-17)),
                S(Math, "asinh", Fe.asinh, Math.asinh(-1e7) !== -Math.asinh(1e7)), S(Math, "tanh", Fe.tanh, -2e-17 !== Math.tanh(-2e-17)), S(Math, "acosh", Fe.acosh, Math.acosh(Number.MAX_VALUE) === 1 / 0), S(Math, "sinh", Fe.sinh, -2e-17 !== Math.sinh(-2e-17));
            var ze = Math.expm1(10);
            S(Math, "expm1", Fe.expm1, ze > 22025.465794806718 || 22025.465794806718 > ze);
            var We = Math.round,
                Ye = 0 === Math.round(.5 - Number.EPSILON / 4) && 1 === Math.round(-.5 + Number.EPSILON / 3.99),
                Be = Ie + 1,
                Ge = 2 * Ie - 1,
                Ue = [Be, Ge].every(function(e) {
                    return Math.round(e) === e
                });
            S(Math, "round", function(e) {
                var t = Math.floor(e),
                    r = -1 === t ? -0 : t + 1;
                return .5 > e - t ? t : r
            }, !Ye || !Ue), E.preserveToString(Math.round, We);
            var Ve = Math.imul; - 5 !== Math.imul(4294967295, 5) && (Math.imul = Fe.imul, E.preserveToString(Math.imul, Ve)), 2 !== Math.imul.length && (S(Math, "imul", function(e, t) {
                return Ve.apply(Math, arguments)
            }, !0), E.preserveToString(Math.imul, Ve));
            var Xe = function() {
                var e, t;
                j.IsPromise = function(e) {
                    return j.TypeIsObject(e) && e._promiseConstructor ? "undefined" == typeof e._status ? !1 : !0 : !1
                };
                var r, n = function(e) {
                        if (!j.IsCallable(e)) throw new TypeError("bad promise constructor");
                        var t = this,
                            r = function(e, r) {
                                t.resolve = e, t.reject = r
                            };
                        if (t.promise = j.Construct(e, [r]), !t.promise._es6construct) throw new TypeError("bad promise constructor");
                        if (!j.IsCallable(t.resolve) || !j.IsCallable(t.reject)) throw new TypeError("bad promise constructor")
                    },
                    i = p.setTimeout;
                "undefined" != typeof window && j.IsCallable(window.postMessage) && (r = function() {
                    var e = [],
                        t = "zero-timeout-message",
                        r = function(r) {
                            e.push(r), window.postMessage(t, "*")
                        },
                        n = function(r) {
                            if (r.source === window && r.data === t) {
                                if (r.stopPropagation(), 0 === e.length) return;
                                var n = e.shift();
                                n()
                            }
                        };
                    return window.addEventListener("message", n, !0), r
                });
                var o = function() {
                        var e = p.Promise;
                        return e && e.resolve && function(t) {
                            return e.resolve().then(t)
                        }
                    },
                    a = j.IsCallable(p.setImmediate) ? p.setImmediate.bind(p) : "object" == typeof s && s.nextTick ? s.nextTick : o() || (j.IsCallable(r) ? r() : function(e) {
                        i(e, 0)
                    }),
                    l = function(e, t) {
                        if (!j.TypeIsObject(e)) return !1;
                        var r = t.resolve,
                            n = t.reject;
                        try {
                            var i = e.then;
                            if (!j.IsCallable(i)) return !1;
                            i.call(e, r, n)
                        } catch (s) {
                            n(s)
                        }
                        return !0
                    },
                    c = function(e, t) {
                        e.forEach(function(e) {
                            a(function() {
                                var r = e.handler,
                                    n = e.capability,
                                    i = n.resolve,
                                    s = n.reject;
                                try {
                                    var o = r(t);
                                    if (o === n.promise) throw new TypeError("self resolution");
                                    var a = l(o, n);
                                    a || i(o)
                                } catch (c) {
                                    s(c)
                                }
                            })
                        })
                    },
                    u = function(e, t, r) {
                        return function(i) {
                            if (i === e) return r(new TypeError("self resolution"));
                            var s = e._promiseConstructor,
                                o = new n(s),
                                a = l(i, o);
                            return a ? o.promise.then(t, r) : t(i)
                        }
                    };
                e = function(e) {
                    var t = this;
                    if (t = R(t), !t._promiseConstructor) throw new TypeError("bad promise");
                    if ("undefined" != typeof t._status) throw new TypeError("promise already initialized");
                    if (!j.IsCallable(e)) throw new TypeError("not a valid resolver");
                    t._status = "unresolved", t._resolveReactions = [], t._rejectReactions = [];
                    var r = function(e) {
                            if ("unresolved" === t._status) {
                                var r = t._resolveReactions;
                                t._result = e, t._resolveReactions = void 0, t._rejectReactions = void 0, t._status = "has-resolution", c(r, e)
                            }
                        },
                        n = function(e) {
                            if ("unresolved" === t._status) {
                                var r = t._rejectReactions;
                                t._result = e, t._resolveReactions = void 0, t._rejectReactions = void 0, t._status = "has-rejection", c(r, e)
                            }
                        };
                    try {
                        e(r, n)
                    } catch (i) {
                        n(i)
                    }
                    return t
                }, t = e.prototype;
                var h = function(e, t, r, n) {
                    var i = !1;
                    return function(s) {
                        if (!i && (i = !0, t[e] = s, 0 === --n.count)) {
                            var o = r.resolve;
                            o(t)
                        }
                    }
                };
                return S(e, _, function(e) {
                    var r = this,
                        n = r.prototype || t;
                    return e = e || T(n), D(e, {
                        _status: void 0,
                        _result: void 0,
                        _resolveReactions: void 0,
                        _rejectReactions: void 0,
                        _promiseConstructor: void 0
                    }), e._promiseConstructor = r, e
                }), D(e, {
                    all: function(e) {
                        var t = this,
                            r = new n(t),
                            i = r.resolve,
                            s = r.reject;
                        try {
                            if (!j.IsIterable(e)) throw new TypeError("bad iterable");
                            for (var o = j.GetIterator(e), a = [], l = {
                                    count: 1
                                }, c = 0;; c++) {
                                var u = j.IteratorNext(o);
                                if (u.done) break;
                                var p = t.resolve(u.value),
                                    d = h(c, a, r, l);
                                l.count++, p.then(d, r.reject)
                            }
                            0 === --l.count && i(a)
                        } catch (f) {
                            s(f)
                        }
                        return r.promise
                    },
                    race: function(e) {
                        var t = this,
                            r = new n(t),
                            i = r.resolve,
                            s = r.reject;
                        try {
                            if (!j.IsIterable(e)) throw new TypeError("bad iterable");
                            for (var o = j.GetIterator(e);;) {
                                var a = j.IteratorNext(o);
                                if (a.done) break;
                                var l = t.resolve(a.value);
                                l.then(i, s)
                            }
                        } catch (c) {
                            s(c)
                        }
                        return r.promise
                    },
                    reject: function(e) {
                        var t = this,
                            r = new n(t),
                            i = r.reject;
                        return i(e), r.promise
                    },
                    resolve: function(e) {
                        var t = this;
                        if (j.IsPromise(e)) {
                            var r = e._promiseConstructor;
                            if (r === t) return e
                        }
                        var i = new n(t),
                            s = i.resolve;
                        return s(e), i.promise
                    }
                }), D(t, {
                    "catch": function(e) {
                        return this.then(void 0, e)
                    },
                    then: function(e, t) {
                        var r = this;
                        if (!j.IsPromise(r)) throw new TypeError("not a promise");
                        var i = this.constructor,
                            s = new n(i);
                        j.IsCallable(t) || (t = function(e) {
                            throw e
                        }), j.IsCallable(e) || (e = function(e) {
                            return e
                        });
                        var o = u(r, e, t),
                            a = {
                                capability: s,
                                handler: o
                            },
                            l = {
                                capability: s,
                                handler: t
                            };
                        switch (r._status) {
                            case "unresolved":
                                r._resolveReactions.push(a), r._rejectReactions.push(l);
                                break;
                            case "has-resolution":
                                c([a], r._result);
                                break;
                            case "has-rejection":
                                c([l], r._result);
                                break;
                            default:
                                throw new TypeError("unexpected")
                        }
                        return s.promise
                    }
                }), e
            }();
            p.Promise && (delete p.Promise.accept, delete p.Promise.defer, delete p.Promise.prototype.chain), D(p, {
                Promise: Xe
            });
            var Ke = a(p.Promise, function(e) {
                    return e.resolve(42) instanceof e
                }),
                Ze = !n(function() {
                    p.Promise.reject(42).then(null, 5).then(null, b)
                }),
                $e = n(function() {
                    p.Promise.call(3, b)
                });
            Ke && Ze && $e || (Promise = Xe, S(p, "Promise", Xe, !0));
            var Qe = function(e) {
                    var t = Object.keys(e.reduce(function(e, t) {
                        return e[t] = !0, e
                    }, {}));
                    return e.join(":") === t.join(":")
                },
                Je = Qe(["z", "a", "bb"]),
                et = Qe(["z", 1, "a", "3", 2]);
            if (f) {
                var tt = function(e) {
                        if (!Je) return null;
                        var t = typeof e;
                        return "string" === t ? "$" + e : "number" === t ? et ? e : "n" + e : null
                    },
                    rt = function() {
                        return Object.create ? Object.create(null) : {}
                    },
                    nt = {
                        Map: function() {
                            function e(e, t) {
                                this.key = e, this.value = t, this.next = null, this.prev = null
                            }

                            function t(e, t) {
                                this.head = e._head, this.i = this.head, this.kind = t
                            }

                            function r(t) {
                                var r = this;
                                if (!j.TypeIsObject(r)) throw new TypeError("Constructor Map requires 'new'");
                                if (r = R(r), !r._es6map) throw new TypeError("bad map");
                                var n = new e(null, null);
                                if (n.next = n.prev = n, D(r, {
                                        _head: n,
                                        _storage: rt(),
                                        _size: 0
                                    }), "undefined" != typeof t && null !== t) {
                                    var i = j.GetIterator(t),
                                        s = r.set;
                                    if (!j.IsCallable(s)) throw new TypeError("bad map");
                                    for (;;) {
                                        var o = j.IteratorNext(i);
                                        if (o.done) break;
                                        var a = o.value;
                                        if (!j.TypeIsObject(a)) throw new TypeError("expected iterable of pairs");
                                        s.call(r, a[0], a[1])
                                    }
                                }
                                return r
                            }
                            var n = {};
                            e.prototype.isRemoved = function() {
                                return this.key === n
                            }, t.prototype = {
                                next: function() {
                                    var e, t = this.i,
                                        r = this.kind,
                                        n = this.head;
                                    if ("undefined" == typeof this.i) return {
                                        value: void 0,
                                        done: !0
                                    };
                                    for (; t.isRemoved() && t !== n;) t = t.prev;
                                    for (; t.next !== n;)
                                        if (t = t.next, !t.isRemoved()) return e = "key" === r ? t.key : "value" === r ? t.value : [t.key, t.value], this.i = t, {
                                            value: e,
                                            done: !1
                                        };
                                    return this.i = void 0, {
                                        value: void 0,
                                        done: !0
                                    }
                                }
                            }, M(t.prototype);
                            var i = r.prototype;
                            return S(r, _, function(e) {
                                var t = this,
                                    r = t.prototype || i;
                                return e = e || T(r), D(e, {
                                    _es6map: !0
                                }), e
                            }), E.getter(r.prototype, "size", function() {
                                if ("undefined" == typeof this._size) throw new TypeError("size method called on incompatible Map");
                                return this._size
                            }), D(r.prototype, {
                                get: function(e) {
                                    var t = tt(e);
                                    if (null !== t) {
                                        var r = this._storage[t];
                                        return r ? r.value : void 0
                                    }
                                    for (var n = this._head, i = n;
                                        (i = i.next) !== n;)
                                        if (j.SameValueZero(i.key, e)) return i.value
                                },
                                has: function(e) {
                                    var t = tt(e);
                                    if (null !== t) return "undefined" != typeof this._storage[t];
                                    for (var r = this._head, n = r;
                                        (n = n.next) !== r;)
                                        if (j.SameValueZero(n.key, e)) return !0;
                                    return !1
                                },
                                set: function(t, r) {
                                    var n, i = this._head,
                                        s = i,
                                        o = tt(t);
                                    if (null !== o) {
                                        if ("undefined" != typeof this._storage[o]) return this._storage[o].value = r, this;
                                        n = this._storage[o] = new e(t, r), s = i.prev
                                    }
                                    for (;
                                        (s = s.next) !== i;)
                                        if (j.SameValueZero(s.key, t)) return s.value = r, this;
                                    return n = n || new e(t, r), j.SameValue(-0, t) && (n.key = 0), n.next = this._head, n.prev = this._head.prev, n.prev.next = n, n.next.prev = n, this._size += 1, this
                                },
                                "delete": function(e) {
                                    var t = this._head,
                                        r = t,
                                        i = tt(e);
                                    if (null !== i) {
                                        if ("undefined" == typeof this._storage[i]) return !1;
                                        r = this._storage[i].prev, delete this._storage[i]
                                    }
                                    for (;
                                        (r = r.next) !== t;)
                                        if (j.SameValueZero(r.key, e)) return r.key = r.value = n, r.prev.next = r.next, r.next.prev = r.prev, this._size -= 1, !0;
                                    return !1
                                },
                                clear: function() {
                                    this._size = 0, this._storage = rt();
                                    for (var e = this._head, t = e, r = t.next;
                                        (t = r) !== e;) t.key = t.value = n, r = t.next, t.next = t.prev = e;
                                    e.next = e.prev = e
                                },
                                keys: function() {
                                    return new t(this, "key")
                                },
                                values: function() {
                                    return new t(this, "value")
                                },
                                entries: function() {
                                    return new t(this, "key+value")
                                },
                                forEach: function(e) {
                                    for (var t = arguments.length > 1 ? arguments[1] : null, r = this.entries(), n = r.next(); !n.done; n = r.next()) t ? e.call(t, n.value[1], n.value[0], this) : e(n.value[1], n.value[0], this)
                                }
                            }), M(r.prototype, function() {
                                return this.entries()
                            }), r
                        }(),
                        Set: function() {
                            var e = function(e) {
                                    var t = this;
                                    if (!j.TypeIsObject(t)) throw new TypeError("Constructor Set requires 'new'");
                                    if (t = R(t), !t._es6set) throw new TypeError("bad set");
                                    if (D(t, {
                                            "[[SetData]]": null,
                                            _storage: rt()
                                        }), "undefined" != typeof e && null !== e) {
                                        var r = j.GetIterator(e),
                                            n = t.add;
                                        if (!j.IsCallable(n)) throw new TypeError("bad set");
                                        for (;;) {
                                            var i = j.IteratorNext(r);
                                            if (i.done) break;
                                            var s = i.value;
                                            n.call(t, s)
                                        }
                                    }
                                    return t
                                },
                                t = e.prototype;
                            S(e, _, function(e) {
                                var r = this,
                                    n = r.prototype || t;
                                return e = e || T(n), D(e, {
                                    _es6set: !0
                                }), e
                            });
                            var r = function(e) {
                                if (!e["[[SetData]]"]) {
                                    var t = e["[[SetData]]"] = new nt.Map;
                                    Object.keys(e._storage).forEach(function(e) {
                                        e = 36 === e.charCodeAt(0) ? e.slice(1) : "n" === e.charAt(0) ? +e.slice(1) : +e, t.set(e, e)
                                    }), e._storage = null
                                }
                            };
                            return E.getter(e.prototype, "size", function() {
                                if ("undefined" == typeof this._storage) throw new TypeError("size method called on incompatible Set");
                                return r(this), this["[[SetData]]"].size
                            }), D(e.prototype, {
                                has: function(e) {
                                    var t;
                                    return this._storage && null !== (t = tt(e)) ? !!this._storage[t] : (r(this), this["[[SetData]]"].has(e))
                                },
                                add: function(e) {
                                    var t;
                                    return this._storage && null !== (t = tt(e)) ? (this._storage[t] = !0, this) : (r(this), this["[[SetData]]"].set(e, e), this)
                                },
                                "delete": function(e) {
                                    var t;
                                    if (this._storage && null !== (t = tt(e))) {
                                        var n = y(this._storage, t);
                                        return delete this._storage[t] && n
                                    }
                                    return r(this), this["[[SetData]]"]["delete"](e)
                                },
                                clear: function() {
                                    this._storage ? this._storage = rt() : this["[[SetData]]"].clear()
                                },
                                values: function() {
                                    return r(this), this["[[SetData]]"].values()
                                },
                                entries: function() {
                                    return r(this), this["[[SetData]]"].entries()
                                },
                                forEach: function(e) {
                                    var t = arguments.length > 1 ? arguments[1] : null,
                                        n = this;
                                    r(n), this["[[SetData]]"].forEach(function(r, i) {
                                        t ? e.call(t, i, i, n) : e(i, i, n)
                                    })
                                }
                            }), S(e, "keys", e.values, !0), M(e.prototype, function() {
                                return this.values()
                            }), e
                        }()
                    };
                if (D(p, nt), p.Map || p.Set) {
                    var it = i(function() {
                        return 2 === new Map([
                            [1, 2]
                        ]).get(1)
                    });
                    if (!it) {
                        var st = p.Map;
                        p.Map = function qt(e) {
                            if (!(this instanceof qt)) throw new TypeError('Constructor Map requires "new"');
                            var t = new st;
                            return Array.isArray(e) || x.string(e) ? Array.prototype.forEach.call(e, function(e) {
                                t.set(e[0], e[1])
                            }) : e instanceof qt && qt.prototype.forEach.call(e, function(e, r) {
                                t.set(r, e)
                            }), Object.setPrototypeOf(t, p.Map.prototype), S(t, "constructor", qt, !0), t
                        }, p.Map.prototype = T(st.prototype), E.preserveToString(p.Map, st)
                    }
                    var ot = new Map,
                        at = function(e) {
                            return e["delete"](0), e["delete"](-0), e.set(0, 3), e.get(-0, 4), 3 === e.get(0) && 4 === e.get(-0)
                        }(ot),
                        lt = ot.set(1, 2) === ot;
                    if (!at || !lt) {
                        var ct = Map.prototype.set;
                        S(Map.prototype, "set", function(e, t) {
                            return ct.call(this, 0 === e ? 0 : e, t), this
                        }, !0), E.preserveToString(Map.prototype.set, ct)
                    }
                    if (!at) {
                        var ut = Map.prototype.get,
                            ht = Map.prototype.has;
                        D(Map.prototype, {
                            get: function(e) {
                                return ut.call(this, 0 === e ? 0 : e)
                            },
                            has: function(e) {
                                return ht.call(this, 0 === e ? 0 : e)
                            }
                        }, !0), E.preserveToString(Map.prototype.get, ut), E.preserveToString(Map.prototype.has, ht)
                    }
                    var pt = new Set,
                        dt = function(e) {
                            return e["delete"](0), e.add(-0), !e.has(0)
                        }(pt),
                        ft = pt.add(1) === pt;
                    if (!dt || !ft) {
                        var mt = Set.prototype.add;
                        Set.prototype.add = function(e) {
                            return mt.call(this, 0 === e ? 0 : e), this
                        }, E.preserveToString(Set.prototype.add, mt)
                    }
                    if (!dt) {
                        var gt = Set.prototype.has;
                        Set.prototype.has = function(e) {
                            return gt.call(this, 0 === e ? 0 : e)
                        }, E.preserveToString(Set.prototype.has, gt);
                        var vt = Set.prototype["delete"];
                        Set.prototype["delete"] = function(e) {
                            return vt.call(this, 0 === e ? 0 : e)
                        }, E.preserveToString(Set.prototype["delete"], vt)
                    }
                    var yt = a(p.Map, function(e) {
                            var t = new e([]);
                            return t.set(42, 42), t instanceof e
                        }),
                        bt = Object.setPrototypeOf && !yt,
                        wt = function() {
                            try {
                                return !(p.Map() instanceof p.Map)
                            } catch (e) {
                                return e instanceof TypeError
                            }
                        }();
                    if (1 !== p.Map.length || bt || !wt) {
                        var _t = p.Map;
                        p.Map = function Ft(e) {
                            if (!(this instanceof Ft)) throw new TypeError('Constructor Map requires "new"');
                            var t = new _t(e);
                            return Object.setPrototypeOf(t, Ft.prototype), S(t, "constructor", Ft, !0), t
                        }, p.Map.prototype = T(_t.prototype), E.preserveToString(p.Map, _t)
                    }
                    var xt = a(p.Set, function(e) {
                            var t = new e([]);
                            return t.add(42, 42), t instanceof e
                        }),
                        kt = Object.setPrototypeOf && !xt,
                        Ct = function() {
                            try {
                                return !(p.Set() instanceof p.Set)
                            } catch (e) {
                                return e instanceof TypeError
                            }
                        }();
                    if (1 !== p.Set.length || kt || !Ct) {
                        var St = p.Set;
                        p.Set = function zt(e) {
                            if (!(this instanceof zt)) throw new TypeError('Constructor Set requires "new"');
                            var t = new St(e);
                            return Object.setPrototypeOf(t, zt.prototype), S(t, "constructor", zt, !0), t
                        }, p.Set.prototype = T(St.prototype), E.preserveToString(p.Set, St)
                    }
                    var Et = !i(function() {
                        return (new Map).keys().next().done
                    });
                    ("function" != typeof p.Map.prototype.clear || 0 !== (new p.Set).size || 0 !== (new p.Map).size || "function" != typeof p.Map.prototype.keys || "function" != typeof p.Set.prototype.keys || "function" != typeof p.Map.prototype.forEach || "function" != typeof p.Set.prototype.forEach || o(p.Map) || o(p.Set) || "function" != typeof(new p.Map).keys().next || Et || !yt) && (delete p.Map, delete p.Set, D(p, {
                        Map: nt.Map,
                        Set: nt.Set
                    }, !0))
                }
                p.Set.prototype.keys !== p.Set.prototype.values && S(p.Set.prototype, "keys", p.Set.prototype.values, !0), M(Object.getPrototypeOf((new p.Map).keys())), M(Object.getPrototypeOf((new p.Set).keys()))
            }
            p.Reflect || S(p, "Reflect", {});
            var Dt = p.Reflect,
                Tt = function(e) {
                    if (!j.TypeIsObject(e)) throw new TypeError("target must be an object")
                };
            if (D(p.Reflect, {
                    apply: function() {
                        return j.Call.apply(null, arguments)
                    },
                    construct: function(e, t) {
                        if (!j.IsCallable(e)) throw new TypeError("First argument must be callable.");
                        return j.Construct(e, t)
                    },
                    deleteProperty: function(e, t) {
                        if (Tt(e), f) {
                            var r = Object.getOwnPropertyDescriptor(e, t);
                            if (r && !r.configurable) return !1
                        }
                        return delete e[t]
                    },
                    enumerate: function(e) {
                        return Tt(e), new X(e, "key")
                    },
                    has: function(e, t) {
                        return Tt(e), t in e
                    }
                }), Object.getOwnPropertyNames && D(p.Reflect, {
                    ownKeys: function(e) {
                        Tt(e);
                        var t = Object.getOwnPropertyNames(e);
                        return j.IsCallable(Object.getOwnPropertySymbols) && t.push.apply(t, Object.getOwnPropertySymbols(e)), t
                    }
                }), Object.preventExtensions && D(p.Reflect, {
                    isExtensible: function(e) {
                        return Tt(e), Object.isExtensible(e)
                    },
                    preventExtensions: function(e) {
                        return Tt(e), Nt(function() {
                            Object.preventExtensions(e)
                        })
                    }
                }), f) {
                var Ot = function(e, t, r) {
                        var n = Object.getOwnPropertyDescriptor(e, t);
                        if (!n) {
                            var i = Object.getPrototypeOf(e);
                            return null === i ? void 0 : Ot(i, t, r)
                        }
                        return "value" in n ? n.value : n.get ? n.get.call(r) : void 0
                    },
                    Mt = function(e, t, r, n) {
                        var i = Object.getOwnPropertyDescriptor(e, t);
                        if (!i) {
                            var s = Object.getPrototypeOf(e);
                            if (null !== s) return Mt(s, t, r, n);
                            i = {
                                value: void 0,
                                writable: !0,
                                enumerable: !0,
                                configurable: !0
                            }
                        }
                        if ("value" in i) {
                            if (!i.writable) return !1;
                            if (!j.TypeIsObject(n)) return !1;
                            var o = Object.getOwnPropertyDescriptor(n, t);
                            return o ? Dt.defineProperty(n, t, {
                                value: r
                            }) : Dt.defineProperty(n, t, {
                                value: r,
                                writable: !0,
                                enumerable: !0,
                                configurable: !0
                            })
                        }
                        return i.set ? (i.set.call(n, r), !0) : !1
                    },
                    Nt = function(e) {
                        return !n(e)
                    };
                D(p.Reflect, {
                    defineProperty: function(e, t, r) {
                        return Tt(e), Nt(function() {
                            Object.defineProperty(e, t, r)
                        })
                    },
                    getOwnPropertyDescriptor: function(e, t) {
                        return Tt(e), Object.getOwnPropertyDescriptor(e, t)
                    },
                    get: function(e, t) {
                        Tt(e);
                        var r = arguments.length > 2 ? arguments[2] : e;
                        return Ot(e, t, r)
                    },
                    set: function(e, t, r) {
                        Tt(e);
                        var n = arguments.length > 3 ? arguments[3] : e;
                        return Mt(e, t, r, n)
                    }
                })
            }
            if (Object.getPrototypeOf) {
                var Pt = Object.getPrototypeOf;
                D(p.Reflect, {
                    getPrototypeOf: function(e) {
                        return Tt(e), Pt(e)
                    }
                })
            }
            if (Object.setPrototypeOf) {
                var jt = function(e, t) {
                    for (; t;) {
                        if (e === t) return !0;
                        t = Dt.getPrototypeOf(t)
                    }
                    return !1
                };
                D(p.Reflect, {
                    setPrototypeOf: function(e, t) {
                        if (Tt(e), null !== t && !j.TypeIsObject(t)) throw new TypeError("proto must be an object or null");
                        return t === Dt.getPrototypeOf(e) ? !0 : Dt.isExtensible && !Dt.isExtensible(e) ? !1 : jt(e, t) ? !1 : (Object.setPrototypeOf(e, t), !0)
                    }
                })
            }
            if ("Invalid Date" !== String(new Date(NaN))) {
                var Rt = Date.prototype.toString,
                    It = function() {
                        var e = +this;
                        return e !== e ? "Invalid Date" : Rt.call(this)
                    };
                S(It, "toString", Rt.toString, !0), S(Date.prototype, "toString", It, !0)
            }
            var At = {
                anchor: function(e) {
                    return j.CreateHTML(this, "a", "name", e)
                },
                big: function() {
                    return j.CreateHTML(this, "big", "", "")
                },
                blink: function() {
                    return j.CreateHTML(this, "blink", "", "")
                },
                bold: function() {
                    return j.CreateHTML(this, "b", "", "")
                },
                fixed: function() {
                    return j.CreateHTML(this, "tt", "", "")
                },
                fontcolor: function(e) {
                    return j.CreateHTML(this, "font", "color", e)
                },
                fontsize: function(e) {
                    return j.CreateHTML(this, "font", "size", e)
                },
                italics: function() {
                    return j.CreateHTML(this, "i", "", "")
                },
                link: function(e) {
                    return j.CreateHTML(this, "a", "href", e)
                },
                small: function() {
                    return j.CreateHTML(this, "small", "", "")
                },
                strike: function() {
                    return j.CreateHTML(this, "strike", "", "")
                },
                sub: function() {
                    return j.CreateHTML(this, "sub", "", "")
                },
                sup: function() {
                    return j.CreateHTML(this, "sup", "", "")
                }
            };
            return D(String.prototype, At), Object.keys(At).forEach(function(e) {
                var t = String.prototype[e],
                    r = !1;
                if (j.IsCallable(t)) {
                    var n = t.call("", ' " '),
                        i = [].concat(n.match(/"/g)).length;
                    r = n !== n.toLowerCase() || i > 2
                } else r = !0;
                r && S(String.prototype, e, At[e], !0)
            }), p
        })
    }).call(t, r(132))
}, , , , function(e, t, r) {
    "use strict";
    var n = r(31),
        i = r(9),
        s = r(34),
        o = function(e) {
            var t = n.getUserInfo(),
                r = {
                    tenantId: t.tenantId,
                    account: t.account,
                    password: t.password,
                    expiredAt: t.expiredAt,
                    apiKey: t.apiKey,
                    newExpire: parseInt((new Date).getTime() / 1e3) + i.expired
                };
            s.renewal(r, e).done(function(e) {
                n.setUserInfo(e.data)
            })
        },
        a = function() {
            var e = setInterval(o, 1e3 * i.expired * .9),
                t = window.onbeforeunload;
            window.onbeforeunload = function() {
                e && clearInterval(e), "function" == typeof t && t()
            }
        },
        l = function() {
            s.guest().done(function(e) {
                e.data.isGuest = !0, n.setUserInfo(e.data)
            })
        },
        c = function() {
            document.body.style.visibility = "hidden", window.stop && window.stop() || document.execCommand && document.execCommand("Stop"), window.location.href = "/entrance"
        },
        u = function() {
            var e = n.getUserInfo();
            if (e && !e.isGuest) {
                var t = 1e3 * e.expiredAt,
                    r = (new Date).getTime() - t;
                if (r >= 0) n.clearAll(), c();
                else if (r >= 1e3 * -i.expired * .1) o({
                    async: !1
                });
                else var s = setTimeout(function() {
                    a(), clearTimeout(s), s = null
                }, .9 * r)
            } else window.location.pathname.indexOf("/discovery") >= 0 ? e || l() : c()
        };
    u()
}, , function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(47),
        s = r(13),
        o = s.getModule("headerMsg"),
        a = r(31),
        l = r(36),
        c = r(105),
        u = r(106),
        h = r(107),
        p = r(108),
        d = n.PropTypes,
        f = n.createClass({
            displayName: "PersonSettings",
            propTypes: {
                onClose: d.func.isRequired,
                onUserInfoChange: d.func.isRequired
            },
            getInitialState: function() {
                return {
                    selectedIndex: 0
                }
            },
            render: function() {
                var e = {
                        tabs: [{
                            tab: o.userBaseInfo,
                            styleName: "setting-baseinfo",
                            panel: n.createElement(c, {
                                key: "userBaseInfo",
                                onClose: this.props.onClose,
                                onUserInfoChange: this.props.onUserInfoChange
                            })
                        }, {
                            tab: o.modifyPassword,
                            styleName: "setting-password",
                            panel: n.createElement(u, {
                                key: "modifyPassword",
                                onClose: this.props.onClose
                            })
                        }, {
                            tab: o.modifyUserMail,
                            styleName: "setting-email",
                            panel: n.createElement(p, {
                                key: "userMail",
                                onClose: this.props.onClose
                            })
                        }, {
                            tab: o.modifyUserPhone,
                            styleName: "setting-photo",
                            panel: n.createElement(h, {
                                key: "userPhone",
                                onClose: this.props.onClose
                            })
                        }]
                    },
                    t = this;
                return e.afterSelected = function(e, r) {
                    t.setState({
                        selectedIndex: r.selectedIndex
                    })
                }, e.selectedIndex = this.state.selectedIndex, n.createElement("div", {
                    className: "person-settings"
                }, n.createElement(l, n.__spread({}, e, {
                    ref: "tabView"
                })))
            }
        }),
        m = n.createClass({
            displayName: "UserMenus",
            propTypes: {
                onUserInfoChange: d.func.isRequired
            },
            getInitialState: function() {
                return {
                    display: !1
                }
            },
            _onLogout: function() {
                a.clearAll(), window.location.href = "/entrance"
            },
            _closePanel: function() {
                this.setState({
                    display: !1
                })
            },
            _onShowPersonSetting: function() {
                this.setState({
                    display: !0
                })
            },
            render: function() {
                return n.createElement("ul", {
                    className: "menus setting-menus"
                }, n.createElement("li", {
                    className: "menu",
                    onClick: this._onShowPersonSetting
                }, o.settings), n.createElement("li", {
                    className: "menu",
                    onClick: this._onLogout
                }, o.logout), n.createElement(i, {
                    show: this.state.display,
                    title: o.settings,
                    closeAfterClick: !1,
                    onCloseClick: this._closePanel
                }, this.state.display ? n.createElement(f, {
                    onClose: this._closePanel,
                    onUserInfoChange: this.props.onUserInfoChange
                }) : null))
            }
        });
    e.exports = m
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = (r(47), r(13)),
        s = i.getModule("headerMsg"),
        o = (r(104), r(34)),
        a = r(9),
        l = n.createClass({
            displayName: "SettingMenus",
            getInitialState: function() {
                return {
                    display: !1
                }
            },
            _onSupportClick: function() {
                o.getAccessToken().done(function(e) {
                    setTimeout(function() {
                        if (e) {
                            var t = e.avatar.substring(e.avatar.lastIndexOf("/") + 1);
                            window.location = a.supportUrl + "?token=" + e.token + "&nickname=" + e.nickname + "&avatar=" + t
                        } else window.location = a.supportUrl
                    }, 0)
                })
            },
            _onShowFeedBack: function() {
                this.setState({
                    display: !0
                })
            },
            _closePanel: function() {
                this.setState({
                    display: !1,
                    displayPanel: null
                })
            },
            render: function() {
                return n.createElement("ul", {
                    className: "menus setting-menus"
                }, n.createElement("li", {
                    className: "menu",
                    onClick: this._onSupportClick
                }, s.support), n.createElement("li", {
                    className: "menu",
                    onClick: this._onShowFeedBack
                }, s.feedback), n.createElement("li", {
                    className: "menu"
                }, s.aboutUs))
            }
        });
    e.exports = l
}, , , function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(56),
            s = r(135),
            o = r(136),
            a = n.createClass({
                displayName: "TabView",
                propTypes: {
                    tabs: n.PropTypes.array,
                    selectedIndex: n.PropTypes.number,
                    beforeSelected: n.PropTypes.func,
                    afterSelected: n.PropTypes.func,
                    beforeRemove: n.PropTypes.func,
                    afterRemove: n.PropTypes.func
                },
                getDefaultProps: function() {
                    return {
                        selectedIndex: 0,
                        tabs: []
                    }
                },
                getInitialState: function() {
                    return {
                        selectedIndex: this.props.selectedIndex,
                        tabs: this.props.tabs
                    }
                },
                componentWillReceiveProps: function(e) {
                    this.setState({
                        tabs: e.tabs,
                        selectedIndex: e.selectedIndex
                    })
                },
                setSelectedTab: function(e) {
                    e !== this.state.selectedIndex && (0 > e || e >= this.getTabCount || this.setState({
                        selectedIndex: e
                    }))
                },
                _selectTabHanlder: function(e) {
                    e.stopPropagation();
                    var r = t(e.target),
                        n = r.closest(".tab")[0],
                        i = Array.prototype.indexOf.call(n.parentNode.children, n);
                    this.setSelectedTab(i)
                },
                _removeTabHandler: function(e) {
                    e.stopPropagation();
                    var r = t(e.target),
                        n = r.closest(".tab")[0],
                        i = [].slice.call(n.parentNode.children).indexOf(n);
                    this.removeTab(i)
                },
                getTabCount: function() {
                    return this.tabs.length
                },
                getTab: function(e) {
                    return this.refs.tabList.refs["tab-" + e]
                },
                getPanel: function(e) {
                    return this.refs.tabList.refs["panel-" + e]
                },
                getSelectedTabIndex: function() {
                    return this.state.selectedIndex
                },
                removeTab: function(e) {
                    if (!(0 > e || e >= this.getTabCount)) {
                        var t = i(this.state.tabs, {
                                $splice: [
                                    [e, 1]
                                ]
                            }),
                            r = this.state.selectedIndex;
                        0 > r && (r = 0), this.setState({
                            tabs: t,
                            selectedIndex: r
                        })
                    }
                },
                componentWillUpdate: function(e, t) {
                    this.state.tabs.length === t.tabs.length ? this.state.selectedIndex !== t.selectedIndex && "function" == typeof this.props.beforeSelected && this.props.beforeSelected(this.props, this.state) : this.state.tabs.length > t.tabs.length && "function" == typeof this.props.beforeRemove && this.props.beforeRemove()
                },
                componentDidUpdate: function(e, t) {
                    this.state.tabs.length === t.tabs.length ? this.state.selectedIndex !== t.selectedIndex && this.props.afterSelected && this.props.afterSelected(this.props, this.state) : this.state.tabs.length < t.tabs.length && "function" == typeof this.props.afterRemove && this.props.afterRemove()
                },
                render: function() {
                    return n.createElement("div", {
                        className: "tabview"
                    }, n.createElement(s, n.__spread({}, this.state, {
                        ref: "tabList",
                        removeTabHandler: this._removeTabHandler,
                        selectTabHanlder: this._selectTabHanlder
                    })), n.createElement(o, n.__spread({}, this.state, {
                        ref: "tabPanelList"
                    })))
                }
            });
        e.exports = a
    }).call(t, r(28))
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = (r(25), r(13)),
        s = (r(14), r(50), r(9), r(109)),
        o = r(110),
        a = r(47),
        l = (i.getModule("cmdType"), n.createClass({
            displayName: "TraderOpenPanel",
            propTypes: {
                width: n.PropTypes.number.isRequired
            },
            componentWillMount: function() {},
            getInitialState: function() {
                return {
                    openModifyOrderWindow: !1
                }
            },
            _modifyOrder: function(e) {
                this.setState({
                    openModifyOrderWindow: !0,
                    order: e
                })
            },
            _closeWindow: function() {
                this.setState({
                    openModifyOrderWindow: !1
                })
            },
            render: function() {
                return n.createElement("div", {
                    className: "trader-tab-open"
                }, n.createElement(s, {
                    modifyOrder: this._modifyOrder,
                    width: this.props.width
                }), n.createElement(a, {
                    show: this.state.openModifyOrderWindow,
                    title: "修改市价单",
                    onCloseClick: this._closeWindow
                }, this.state.openModifyOrderWindow ? n.createElement(o, {
                    order: this.state.order,
                    onClose: this._closeWindow
                }) : null))
            }
        }));
    e.exports = l
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = (r(25), r(81), r(13)),
        s = i.getModule("modifyPendingOrder"),
        o = (r(42), r(44), r(52), r(14), r(50), r(9), r(112)),
        a = r(47),
        l = r(113),
        c = n.createClass({
            displayName: "TraderPendingPanel",
            propTypes: {
                width: n.PropTypes.number.isRequired
            },
            getInitialState: function() {
                return {
                    openWindow: !1
                }
            },
            _modifyOrder: function(e) {
                this.setState({
                    openWindow: !0,
                    order: e
                })
            },
            _closeWindow: function() {
                this.setState({
                    openWindow: !1
                })
            },
            render: function() {
                return n.createElement("div", {
                    className: "trader-tab-pending"
                }, n.createElement(o, {
                    modifyOrder: this._modifyOrder,
                    width: this.props.width
                }), n.createElement(a, {
                    show: this.state.openWindow,
                    title: s.title,
                    onCloseClick: this._closeWindow
                }, this.state.openWindow ? n.createElement(l, {
                    order: this.state.order,
                    onClose: this._closeWindow
                }) : null))
            }
        });
    e.exports = c
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(81),
            o = r(13),
            a = r(42),
            l = r(44),
            c = r(14),
            u = (r(50), r(119)),
            h = s,
            p = h.Table,
            d = h.Column,
            f = o.getModule("traderHistoryPanel"),
            m = o.getModule("cmdType"),
            g = n.createClass({
                displayName: "TraderHistoryPanel",
                mixins: [i.listenTo(l, "_orderStoreListener")],
                propTypes: {
                    width: n.PropTypes.number.isRequired
                },
                componentWillMount: function() {
                    a.searchHisPositions()
                },
                _orderStoreListener: function(e) {
                    "HisOrder" === e.type && (this.setState({
                        positionDatas: e.data.orders.sort(function(e, t) {
                            return t.open_time - e.open_time
                        }),
                        pageNow: e.data.pageNow,
                        totalPage: e.data.totalPage
                    }), t.waitLoading("hide", this.getDOMNode()))
                },
                _loadPage: function(e) {
                    t.waitLoading("show", this.getDOMNode()), a.pagination(e)
                },
                getDefaultProps: function() {
                    return {
                        headers: [{
                            label: f.number,
                            width: .08,
                            dataKey: "order",
                            sortable: !0,
                            order: "asc"
                        }, {
                            label: f.breed,
                            width: .06,
                            dataKey: "symbol",
                            sortable: !1
                        }, {
                            label: f.type,
                            width: .06,
                            dataKey: "cmd",
                            sortable: !1
                        }, {
                            label: f.amount,
                            width: .06,
                            dataKey: "volume",
                            sortable: !1
                        }, {
                            label: f.open,
                            width: .1,
                            dataKey: "open_time",
                            sortable: !1
                        }, {
                            label: f.price,
                            width: .08,
                            dataKey: "open_price",
                            sortable: !1
                        }, {
                            label: f.stop,
                            width: .07,
                            dataKey: "sl",
                            sortable: !1
                        }, {
                            label: f.surplus,
                            width: .07,
                            dataKey: "tp",
                            sortable: !1
                        }, {
                            label: f.closeTime,
                            width: .1,
                            dataKey: "close_time",
                            sortable: !1
                        }, {
                            label: f.closePrice,
                            width: .08,
                            dataKey: "close_price",
                            sortable: !1
                        }, {
                            label: f.commission,
                            width: .08,
                            dataKey: "commission",
                            sortable: !1
                        }, {
                            label: f.interest,
                            width: .08,
                            dataKey: "storage",
                            sortable: !1
                        }, {
                            label: f.profit,
                            width: .08,
                            dataKey: "profit",
                            sortable: !0
                        }]
                    }
                },
                getInitialState: function() {
                    return {
                        positionDatas: []
                    }
                },
                render: function() {
                    var e = this,
                        t = this.state.positionDatas,
                        r = function(e) {
                            return t[e]
                        },
                        i = function(e) {
                            var t = e.index,
                                r = e.header,
                                n = r.dataKey,
                                i = r.order;
                            if ("desc" === i) {
                                var s = this.state.positionDatas.sort(function(e, t) {
                                    return e[n] - t[n]
                                });
                                this.props.headers[t].order = "asc"
                            } else {
                                var s = this.state.positionDatas.sort(function(e, t) {
                                    return t[n] - e[n]
                                });
                                this.props.headers[t].order = "desc"
                            }
                            this.setState({
                                positionDatas: s,
                                headers: this.props.headers
                            })
                        },
                        s = function(t, r, s, o, a) {
                            var l = null,
                                c = s.header,
                                u = "";
                            return c.sortable && (l = i.bind(e, s), u = c.order), n.createElement("div", {
                                className: u,
                                onClick: l
                            }, t)
                        },
                        o = function(e, t, r, n, i, s) {
                            switch (t) {
                                case "volume":
                                    return e ? e / 100 : e;
                                case "open_time":
                                case "close_time":
                                    return e ? c.formatUTCDate(e) : e;
                                case "cmd":
                                    return m[e];
                                case "commission":
                                case "storage":
                                case "profit":
                                    return e ? Number(e).toFixed(2) : e;
                                default:
                                    return e
                            }
                        },
                        a = this.props.width,
                        l = this.props.headers.map(function(e, t) {
                            return n.createElement(d, {
                                align: "center",
                                label: e.label,
                                width: a * e.width,
                                dataKey: e.dataKey,
                                headerRenderer: s,
                                cellRenderer: o,
                                columnData: {
                                    index: t,
                                    header: e
                                }
                            })
                        }),
                        h = this.state.totalPage > 1 ? n.createElement(u, {
                            pageNow: this.state.pageNow,
                            totalPage: this.state.totalPage,
                            go: this._loadPage
                        }) : null;
                    return n.createElement("div", {
                        className: "trader-log-panel"
                    }, n.createElement(p, {
                        rowHeight: 30,
                        rowGetter: r,
                        rowsCount: t.length,
                        width: a,
                        maxHeight: 600,
                        headerHeight: 30,
                        overflowX: "hidden",
                        overflowY: "hidden"
                    }, l), h)
                }
            });
        e.exports = g
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(81),
            o = r(13),
            a = r(41),
            l = r(48),
            c = r(14),
            u = (r(50), r(119)),
            h = s,
            p = h.Table,
            d = h.Column,
            f = o.getModule("traderLogPanel"),
            m = n.createClass({
                displayName: "TraderLogPanel",
                mixins: [i.listenTo(l, "_tradeLogListener")],
                propTypes: {
                    width: n.PropTypes.number.isRequired
                },
                componentWillMount: function() {
                    a.search()
                },
                _tradeLogListener: function(e) {
                    "SearchLog" === e.type && (this.setState({
                        tradeLogs: e.data.tradeLogList,
                        pageNow: e.data.pageNow,
                        totalPage: e.data.totalPage
                    }), t.waitLoading("hide", this.getDOMNode()))
                },
                getInitialState: function() {
                    return {
                        headers: [{
                            label: f.createTime,
                            width: .15,
                            dataKey: "createTime",
                            sortable: !0,
                            order: "desc"
                        }, {
                            label: f.ip,
                            width: .15,
                            dataKey: "ip",
                            sortable: !1
                        }, {
                            label: f.message,
                            width: .7,
                            dataKey: "log",
                            sortable: !1
                        }],
                        tradeLogs: null
                    }
                },
                _loadPage: function(e) {
                    t.waitLoading("show", this.getDOMNode()), a.pagination(e)
                },
                render: function() {
                    if (!this.state.tradeLogs) return null;
                    var e = this,
                        t = this.state.tradeLogs,
                        r = function(e) {
                            return t[e]
                        },
                        i = function(e) {
                            var t = e.index,
                                r = e.header,
                                n = r.dataKey,
                                i = r.order;
                            if ("desc" === i) {
                                var s = this.state.tradeLogs.sort(function(e, t) {
                                    return e[n] - t[n]
                                });
                                this.state.headers[t].order = "asc"
                            } else {
                                var s = this.state.tradeLogs.sort(function(e, t) {
                                    return t[n] - e[n]
                                });
                                this.state.headers[t].order = "desc"
                            }
                            this.setState({
                                tradeLogs: s,
                                headers: this.state.headers
                            })
                        },
                        s = function(t, r, s, o, a) {
                            var l = null,
                                c = s.header,
                                u = "";
                            return c.sortable && (l = i.bind(e, s), u = c.order), n.createElement("div", {
                                className: u,
                                onClick: l
                            }, t)
                        },
                        o = function(e, t, r, n, i, s) {
                            switch (t) {
                                case "createTime":
                                    return c.formatDate(e);
                                default:
                                    return e
                            }
                        },
                        a = this.props.width,
                        l = this.state.headers.map(function(e, t) {
                            var r = "log" === e.dataKey ? "left" : "center";
                            return n.createElement(d, {
                                align: r,
                                label: e.label,
                                width: a * e.width,
                                dataKey: e.dataKey,
                                headerRenderer: s,
                                cellRenderer: o,
                                columnData: {
                                    index: t,
                                    header: e
                                }
                            })
                        }),
                        h = this.state.totalPage > 1 ? n.createElement(u, {
                            pageNow: this.state.pageNow,
                            totalPage: this.state.totalPage,
                            go: this._loadPage
                        }) : null;
                    return n.createElement("div", {
                        className: "trader-log-panel"
                    }, n.createElement(p, {
                        rowHeight: 30,
                        rowGetter: r,
                        rowsCount: t.length,
                        width: a,
                        maxHeight: 600,
                        headerHeight: 30,
                        overflowX: "hidden",
                        overflowY: "hidden"
                    }, l), h)
                }
            });
        e.exports = m
    }).call(t, r(28))
}, , , function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(80),
        s = r(66),
        o = n.createClass({
            displayName: "DateRangeSelection",
            propTypes: {
                onDateSelected: n.PropTypes.func
            },
            getDefaultProps: function() {
                return {
                    ranges: {
                        "Last 7 Days": [i().subtract(6, "days"), i()],
                        "Last 30 Days": [i().subtract(29, "days"), i()],
                        "Last Month": [i().subtract(1, "month").startOf("month"), i().subtract(1, "month").endOf("month")]
                    },
                    startDate: i().subtract(29, "days"),
                    endDate: i()
                }
            },
            getInitialState: function() {
                return {
                    startDate: this.props.startDate,
                    endDate: this.props.endDate
                }
            },
            componentWillReceiveProps: function(e) {
                this.setState({
                    startDate: e.startDate,
                    endDate: e.endDate
                })
            },
            componentWillUpdate: function(e, t) {
                var r = this.props.onDateSelected;
                "function" == typeof r && r(t.startDate, t.endDate)
            },
            _setDate: function(e, t) {
                this.setState({
                    startDate: t.startDate,
                    endDate: t.endDate
                })
            },
            render: function() {
                var e = this.state.startDate.format("YYYY-MM-DD"),
                    t = this.state.endDate.format("YYYY-MM-DD"),
                    r = e + " - " + t;
                return e === t && (r = e), n.createElement(s, {
                    opens: "left",
                    drops: "up",
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    onApply: this._setDate,
                    ranges: this.props.ranges
                }, n.createElement("button", {
                    className: "datepicker-trigger"
                }, r))
            }
        });
    e.exports = o
}, , function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(44),
            o = r(42),
            a = r(13),
            l = a.getModule("orderSymbolWinMsg"),
            c = n.createClass({
                displayName: "CloseAllOrder",
                mixins: [i.listenTo(s, "_orderStoreListener")],
                getInitialState: function() {
                    return this.quotes = [], null
                },
                _orderStoreListener: function(e) {
                    "closeOrder" === e.type && this.props.onClose()
                },
                _closeOrder: function() {
                    var e = [];
                    s.openOrders.forEach(function(t) {
                        e.push({
                            order: t.order,
                            price: Number(t.current_price),
                            volume: Number(t.volume),
                            symbol: t.symbol,
                            ask: t.ask,
                            bid: t.bid,
                            openPrice: Number(t.open_price),
                            cmd: t.cmd
                        })
                    }), o.closeOrder(e, t(this.getDOMNode()).closest(".dialog"))
                },
                render: function() {
                    return n.createElement("div", null, n.createElement("div", {
                        className: "message-content"
                    }, l.closeAllOrder), n.createElement("div", {
                        className: "action-group"
                    }, n.createElement("button", {
                        className: "btn gray-btn inline-btn",
                        onClick: this.props.onClose
                    }, l.cancel), n.createElement("button", {
                        className: "btn primary-btn inline-btn",
                        onClick: this._closeOrder
                    }, l.confirm)))
                }
            });
        e.exports = c
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(44),
            o = r(42),
            a = r(13),
            l = a.getModule("orderSymbolWinMsg"),
            c = n.createClass({
                displayName: "CloseAllOrder",
                mixins: [i.listenTo(s, "_orderStoreListener")],
                _orderStoreListener: function(e) {
                    "deleteOrder" === e.type && this.props.onClose()
                },
                _deleteOrder: function() {
                    var e = [];
                    s.pendingOrders.forEach(function(t) {
                        e.push({
                            order: t.order,
                            symbol: t.symbol,
                            cmd: t.cmd,
                            volume: t.volume,
                            price: t.open_price,
                            ask: t.ask,
                            bid: t.bid
                        })
                    }), o.deleteOrder(e, t(this.getDOMNode()).closest(".dialog"))
                },
                render: function() {
                    return n.createElement("div", null, n.createElement("div", {
                        className: "message-content"
                    }, l.deleteAllOrder), n.createElement("div", {
                        className: "action-group"
                    }, n.createElement("button", {
                        className: "btn gray-btn inline-btn",
                        onClick: this.props.onClose
                    }, l.cancel), n.createElement("button", {
                        className: "btn primary-btn inline-btn",
                        onClick: this._deleteOrder
                    }, l.confirm)))
                }
            });
        e.exports = c
    }).call(t, r(28))
}, , function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(25),
            i = r(41),
            s = r(120),
            o = (r(10), r(80)),
            a = n.createStore({
                listenables: i,
                init: function() {
                    (new Date).getTime();
                    this.startDate = o().subtract(29, "days"), this.endDate = o(), this.defaultFrom = parseInt(new Date(this.startDate.format("YYYY-MM-DD") + " 23:59:59").getTime() / 1e3), this.defaultTo = parseInt(new Date(this.endDate.format("YYYY-MM-DD") + " 23:59:59").getTime() / 1e3), this.pageNow = 1, this.searchParams = {}
                },
                search: function(e) {
                    this.searchParams = t.extend({}, this.searchParams, e), this.getTradeLogs()
                },
                pagination: function(e) {
                    this.pageNow = e, this.getTradeLogs()
                },
                refresh: function() {
                    this.getTradeLogs()
                },
                getTradeLogs: function() {
                    var e = t.extend({
                        pageNo: this.pageNow,
                        from: this.defaultFrom,
                        to: this.defaultTo
                    }, this.searchParams);
                    s.getTradeLogs(e).done(function(e) {
                        this.trigger({
                            type: "SearchLog",
                            data: {
                                tradeLogList: e.data.list,
                                pageNow: this.pageNow,
                                totalPage: e.data.maxPage
                            }
                        })
                    }.bind(this))
                }
            });
        e.exports = a
    }).call(t, r(28))
}, , , , , function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(13),
        s = (r(68), i.getModule("symbolDetail")),
        o = i.getModule("tradingDaysMap"),
        a = i.getModule("swapType"),
        l = n.createClass({
            displayName: "SymbolDetailPanel",
            render: function() {
                var e = this.props,
                    t = e.tradeTime;
                return n.createElement("div", {
                    className: "symbol-detail-panel"
                }, n.createElement("div", {
                    className: "detail-header"
                }, n.createElement("div", {
                    className: "symbol"
                }, e.symbol), n.createElement("div", {
                    className: "symbol-description"
                }, e.description)), n.createElement("div", {
                    className: "partial"
                }, n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.digits), n.createElement("div", {
                    className: "value"
                }, e.digits)), n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.currency), n.createElement("div", {
                    className: "value"
                }, e.currency)), n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.contractSize), n.createElement("div", {
                    className: "contract-size value"
                }, e.contract_size)), n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.minVolume), n.createElement("div", {
                    className: "value"
                }, e.minVolume)), n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.maxVolume), n.createElement("div", {
                    className: "value"
                }, e.maxVolume)), n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.stopsLevel), n.createElement("div", {
                    className: "value"
                }, e.stops_level))), n.createElement("div", {
                    className: "partial middle"
                }, n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.swapType), n.createElement("div", {
                    className: "value"
                }, a[e.swap_type])), n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.swapLong), n.createElement("div", {
                    className: "value"
                }, e.swap_long)), n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.swapShort), n.createElement("div", {
                    className: "value"
                }, e.swap_short))), n.createElement("div", {
                    className: "partial"
                }, n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.tradingDays), n.createElement("div", {
                    className: "value"
                }, n.createElement("span", null, o[t.startDay]), n.createElement("span", {
                    className: "to"
                }, s.to), n.createElement("span", null, o[t.endDay]))), n.createElement("div", {
                    className: "row"
                }, n.createElement("div", {
                    className: "label"
                }, s.tradingHours), n.createElement("div", {
                    className: "value"
                }, n.createElement("span", null, t.startTime), n.createElement("span", {
                    className: "to"
                }, s.to), n.createElement("span", null, t.endTime)))))
            }
        });
    e.exports = l
}, function(e, t, r) {
    (function(t) {
        "use strict";

        function n(e) {
            if (0 === e) return 1;
            for (var t = "0.", r = 0; e > r; r++) t += r === e - 1 ? "1" : "0";
            return Number(t)
        }
        var i = r(27),
            s = r(25),
            o = r(52),
            a = r(36),
            l = r(13),
            c = l.getModule("orderSymbolWinMsg"),
            u = r(42),
            h = r(126),
            p = r(44),
            d = r(51),
            f = r(117),
            m = r(186),
            g = r(127),
            v = r(14),
            y = i.createClass({
                displayName: "OrderSymbolWin",
                getInitialState: function() {
                    return {
                        selectedIndex: 0
                    }
                },
                render: function() {
                    if (0 === Object.keys(this.props).length) return null;
                    var e = this,
                        t = {
                            tabs: [{
                                tab: c.marketPriceOrder,
                                styleName: "trader-tab-open",
                                enableRemove: !1,
                                panel: i.createElement(b, i.__spread({}, this.props, {
                                    onClose: this.props.onClose
                                }))
                            }, {
                                tab: c.limitPriceOrder,
                                styleName: "trader-tab-pending",
                                enableRemove: !1,
                                panel: i.createElement(_, i.__spread({}, this.props, {
                                    onClose: this.props.onClose
                                }))
                            }]
                        };
                    return t.afterSelected = function(t, r) {
                        e.setState({
                            selectedIndex: r.selectedIndex
                        })
                    }, t.selectedIndex = this.state.selectedIndex, i.createElement("div", {
                        className: "order-operation-panel order-create-panel"
                    }, i.createElement(a, i.__spread({}, t)))
                }
            }),
            b = i.createClass({
                displayName: "MarketOrderComponent",
                mixins: [s.listenTo(p, "_orderStoreListener")],
                getInitialState: function() {
                    return {
                        symbol: this.props.symbol,
                        slCheck: !1,
                        tpCheck: !1,
                        volumeMin: this._getVolumeMinMax(this.props.symbol).min,
                        volumeMax: this._getVolumeMinMax(this.props.symbol).max,
                        step: .001,
                        slLimitValue: null,
                        tpLimitValue: null,
                        errorMessages: []
                    }
                },
                _getQuoteSymbol: function() {
                    return this.refs.quoteSymbol.value()
                },
                _getStep: function() {
                    return n(this._getQuoteSymbol().scale)
                },
                _orderStoreListener: function(e) {
                    "createOrder" === e.type && this.props.onClose()
                },
                _changeSymbol: function() {
                    var e = this.refs.symbol.getDOMNode().value;
                    this.setState({
                        symbol: e,
                        slCheck: !1,
                        tpCheck: !1,
                        slLimitValue: null,
                        tpLimitValue: null,
                        volumeMin: this._getVolumeMinMax(e).min,
                        volumeMax: this._getVolumeMinMax(e).max
                    }), d.addQuote(e)
                },
                _getVolumeMinMax: function(e) {
                    var t = f.getGroupBySymbol(e);
                    return {
                        min: t.minimum ? t.minimum : t.step,
                        max: t.maximum ? t.maximum : 1e4
                    }
                },
                _slChecked: function() {
                    var e = !this.state.slCheck,
                        t = {
                            slCheck: e,
                            step: this._getStep()
                        };
                    e ? null : t.slLimitValue = null, e && !this.refs.sl.value() && (t.slLimitValue = this._getQuoteSymbol().bid), this.setState(t)
                },
                _tpChecked: function() {
                    var e = !this.state.tpCheck,
                        t = {
                            tpCheck: e,
                            step: this._getStep()
                        };
                    e ? null : t.tpLimitValue = null, e && !this.refs.tp.value() && (t.tpLimitValue = this._getQuoteSymbol().bid), this.setState(t)
                },
                _parseOrderParam: function() {
                    var e = this.refs.symbol.getDOMNode().value,
                        t = this.refs.volume.value(),
                        r = this.refs.sl.value(),
                        n = this.refs.tp.value(),
                        i = this.refs.comment.getDOMNode().value,
                        s = this._getQuoteSymbol();
                    return {
                        symbol: e,
                        ask: s.ask,
                        bid: s.bid,
                        volume: Number(100 * t),
                        sl: r ? r : null,
                        tp: n ? n : null,
                        comment: i,
                        price: 0,
                        cmd: ""
                    }
                },
                _onSell: function() {
                    var e = this._parseOrderParam(),
                        r = t.extend(e, {
                            cmd: 1,
                            price: e.bid
                        });
                    this._onSellCheck(r) && u.createOrder(r, t(this.getDOMNode()).closest(".dialog"))
                },
                _onBuy: function() {
                    var e = this._parseOrderParam(),
                        r = t.extend(e, {
                            cmd: 0,
                            price: e.ask
                        });
                    this._onBuyCheck(r) && (u.createOrder(r, t(this.getDOMNode()).closest(".dialog")), this.setState({
                        buyButtonIsActive: !1
                    }))
                },
                _onBuyCheck: function(e) {
                    var t = f.getSymbolByName(e.symbol),
                        r = !0,
                        n = !0,
                        i = !0,
                        s = !0,
                        o = [];
                    if (e.volume <= 0 && (r = !1, o.push({
                            key: "volume",
                            msg: c.volumeLess
                        })), e.sl) {
                        n = e.sl <= e.bid - this._getStep() * t.stops_level;
                        var a = c.slStopsLevel + c.gte + t.stops_level;
                        n ? null : o.push({
                            key: "sl",
                            msg: a
                        })
                    }
                    if (e.tp) {
                        i = e.tp >= e.bid + this._getStep() * t.stops_level;
                        var a = c.tpStopsLevel + c.gte + t.stops_level;
                        i ? null : o.push({
                            key: "tp",
                            msg: a
                        })
                    }
                    return e.comment.length > 20 && (s = !1, o.push({
                        key: "comment",
                        msg: c.remarkMore
                    })), this.setState({
                        errorMessages: o
                    }), r && n && i && s
                },
                _onSellCheck: function(e) {
                    var t = f.getSymbolByName(e.symbol),
                        r = !0,
                        n = !0,
                        i = !0,
                        s = !0,
                        o = [];
                    if (e.volume <= 0 && (r = !1, o.push({
                            key: "volume",
                            msg: c.volumeLess
                        })), e.sl) {
                        n = e.sl >= e.ask + this._getStep() * t.stops_level;
                        var a = c.slStopsLevel + c.gte + t.stops_level;
                        n ? null : o.push({
                            key: "sl",
                            msg: a
                        })
                    }
                    if (e.tp) {
                        i = e.tp <= e.ask + this._getStep() * t.stops_level;
                        var a = c.tpStopsLevel + c.gte + t.stops_level;
                        i ? null : o.push({
                            key: "tp",
                            msg: a
                        })
                    }
                    return e.comment.length > 20 && (s = !1, o.push({
                        key: "comment",
                        msg: c.remarkMore
                    })), o.length > 0 && this.setState({
                        errorMessages: o
                    }), r && n && i && s
                },
                _clearMsg: function(e) {
                    var t = this.state.errorMessages.filter(function(t) {
                        return t.key !== e
                    });
                    this.setState({
                        errorMessages: t
                    })
                },
                render: function() {
                    if (0 === Object.keys(this.props).length) return null;
                    var e = this.state.errorMessages.map(function(e) {
                            return i.createElement("div", {
                                className: "error-message"
                            }, e.msg)
                        }),
                        t = this.props.symbols.map(function(e) {
                            return i.createElement("option", {
                                value: e.symbol
                            }, e.symbol)
                        });
                    return i.createElement("div", {
                        className: "market-order-panel"
                    }, i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.symbolType), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement("select", {
                        className: "symbol-type",
                        defaultValue: this.state.symbol,
                        ref: "symbol",
                        onChange: this._changeSymbol
                    }, t))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.volume), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(h, {
                        value: this.state.volumeMin,
                        ref: "volume",
                        step: this.state.volumeMin,
                        min: this.state.volumeMin,
                        max: this.state.volumeMax,
                        onBlur: this._clearMsg.bind(this, "volume")
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        onClick: this._slChecked,
                        checked: this.state.slCheck
                    }), i.createElement("label", {
                        className: ""
                    }, c.slPrice)), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(h, {
                        disabled: !this.state.slCheck,
                        value: this.state.slLimitValue,
                        step: this.state.step,
                        ref: "sl",
                        min: 0,
                        max: 1e4,
                        onBlur: this._clearMsg.bind(this, "sl")
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        onClick: this._tpChecked,
                        checked: this.state.tpCheck
                    }), i.createElement("label", {
                        className: ""
                    }, c.tpPrice)), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(h, {
                        disabled: !this.state.tpCheck,
                        value: this.state.tpLimitValue,
                        step: this.state.step,
                        ref: "tp",
                        min: 0,
                        max: 1e4,
                        onBlur: this._clearMsg.bind(this, "tp")
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.remark), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement("input", {
                        type: "text",
                        ref: "comment",
                        onBlur: this._clearMsg.bind(this, "comment")
                    }))), e, i.createElement(w, {
                        symbol: this.state.symbol,
                        quote: this.props.quote,
                        onBuy: this._onBuy,
                        onSell: this._onSell,
                        ref: "quoteSymbol"
                    }))
                }
            }),
            w = i.createClass({
                displayName: "MarketSubmit",
                mixins: [s.listenTo(o, "_symbolStoreListener")],
                getInitialState: function() {
                    return {
                        quoteSymbol: {
                            ask: this.props.quote.ask,
                            bid: this.props.quote.bid,
                            scale: this.props.quote.scale
                        }
                    }
                },
                _symbolStoreListener: function(e) {
                    if ("pushSymbolList" === e.type) {
                        var t = this.props.symbol,
                            r = e.allQuoteSymbols.find(function(e) {
                                return e.symbol === t
                            });
                        r && this.setState({
                            quoteSymbol: r
                        })
                    }
                },
                _onSell: function() {
                    this.props.onSell()
                },
                _onBuy: function() {
                    this.props.onBuy()
                },
                value: function() {
                    return this.state.quoteSymbol
                },
                render: function() {
                    var e = v.priceFormat(this.state.quoteSymbol.bid.toFixed(this.state.quoteSymbol.scale)),
                        t = v.priceFormat(this.state.quoteSymbol.ask.toFixed(this.state.quoteSymbol.scale));
                    return i.createElement("div", {
                        className: "action-group"
                    }, i.createElement("button", {
                        className: "btn primary-btn inline-btn sell",
                        onClick: this._onSell
                    }, i.createElement("span", {
                        className: "label"
                    }, c.sell), e.map(function(e, t) {
                        return 1 === t ? i.createElement("span", {
                            className: "strong"
                        }, e) : e
                    })), i.createElement("button", {
                        className: "btn primary-btn inline-btn buy",
                        onClick: this._onBuy
                    }, t.map(function(e, t) {
                        return 1 === t ? i.createElement("span", {
                            className: "strong"
                        }, e) : e
                    }), i.createElement("span", {
                        className: "label"
                    }, c.buy)))
                }
            }),
            _ = i.createClass({
                displayName: "LimitOrderComponent",
                mixins: [s.listenTo(p, "_orderStoreListener")],
                getDefaultProps: function() {
                    return {
                        limitPriceTypes: [{
                            value: "2",
                            name: "Buy Limit"
                        }, {
                            value: "3",
                            name: "Sell Limit"
                        }, {
                            value: "4",
                            name: "Buy Stop"
                        }, {
                            value: "5",
                            name: "Sell Stop"
                        }]
                    }
                },
                getInitialState: function() {
                    return {
                        symbol: this.props.symbol,
                        step: 1e-4,
                        volumeMin: this._getVolumeMinMax(this.props.symbol).min,
                        volumeMax: this._getVolumeMinMax(this.props.symbol).max,
                        defaultLimitPriceType: "2",
                        limitPriceType: "2",
                        op: "<=",
                        errorMessages: [],
                        slCheck: !1,
                        tpCheck: !1,
                        slLimitValue: null,
                        tpLimitValue: null,
                        dateCheck: !1
                    }
                },
                _getVolumeMinMax: function(e) {
                    var t = f.getGroupBySymbol(e);
                    return {
                        min: t.minimum ? t.minimum : t.step,
                        max: t.maximum ? t.maximum : 1e4
                    }
                },
                _orderStoreListener: function(e) {
                    "createOrder" === e.type && (1 === e.data.result ? (this.props.onClose(), u.getOpenPositions(), alert(e.data.message)) : alert(e.data.message))
                },
                _getQuoteSymbol: function() {
                    return this.refs.quoteObject.value().quoteSymbol
                },
                _getQuotePrice: function() {
                    return this.refs.quoteObject.value().quotePrice
                },
                _getStep: function() {
                    return n(this._getQuoteSymbol().scale)
                },
                _changeSymbol: function() {
                    var e = this.refs.symbol.getDOMNode().value;
                    d.addQuote(e), this.setState({
                        symbol: e,
                        slCheck: !1,
                        tpCheck: !1,
                        dateCheck: !1,
                        slLimitValue: null,
                        tpLimitValue: null,
                        volumeMin: this._getVolumeMinMax(e).min,
                        volumeMax: this._getVolumeMinMax(e).max
                    })
                },
                _limitPriceTypeChanged: function() {
                    var e = this.refs.limitPriceType.getDOMNode().value,
                        t = "";
                    t = "2" === e || "5" === e ? "<=" : ">=", this.setState({
                        op: t,
                        limitPriceType: e
                    })
                },
                _slChecked: function() {
                    var e = !this.state.slCheck,
                        t = {
                            slCheck: e,
                            step: this._getStep()
                        };
                    e ? null : t.slLimitValue = null, e && !this.refs.sl.value() && (t.slLimitValue = this._getQuoteSymbol().bid), this.setState(t)
                },
                _tpChecked: function() {
                    var e = !this.state.tpCheck,
                        t = {
                            tpCheck: e,
                            step: this._getStep()
                        };
                    e ? null : t.tpLimitValue = null, e && !this.refs.tp.value() && (t.tpLimitValue = this._getQuoteSymbol().bid), this.setState(t)
                },
                _dateChecked: function() {
                    var e = !this.state.dateCheck;
                    this.setState({
                        dateCheck: e
                    })
                },
                _clearMsg: function(e) {
                    var t = this.state.errorMessages.filter(function(t) {
                        return t.key !== e
                    });
                    this.setState({
                        errorMessages: t
                    })
                },
                _onDateSelected: function(e) {},
                _parseOrderParam: function() {
                    var e = this.refs.symbol.getDOMNode().value,
                        t = this.refs.volume.value(),
                        r = this.refs.limitPriceType.getDOMNode().value,
                        n = this.refs.limitPrice.value(),
                        i = this.refs.sl.value(),
                        s = this.refs.tp.value(),
                        o = this.refs.comment.getDOMNode().value,
                        a = this._getQuoteSymbol(),
                        l = {
                            symbol: e,
                            volume: Number(100 * t),
                            cmd: Number(r),
                            sl: i ? i : null,
                            tp: s ? s : null,
                            comment: o,
                            price: n,
                            ask: a.ask,
                            bid: a.bid
                        };
                    if (this.state.dateCheck) {
                        var c = this.refs.expiration.value();
                        l.expiration = c.format("YYYY-MM-DD HH:mm:ss")
                    }
                    return l
                },
                _submit: function() {
                    var e = this._parseOrderParam();
                    this._limitOrderCheck(e) && u.createOrder(e, t(this.getDOMNode()).closest(".dialog"))
                },
                _limitOrderCheck: function(e) {
                    var t = f.getSymbolByName(e.symbol),
                        r = [],
                        n = !0,
                        i = !0,
                        s = !0,
                        o = !0,
                        a = !0;
                    n = e.volume > 0 ? !0 : !1, n || r.push({
                        key: "volume",
                        msg: c.volumeLess
                    }), i = ">=" === this.state.op ? e.price >= this._getQuotePrice() : e.price <= this._getQuotePrice(), i || r.push({
                        key: "limitPrice",
                        msg: c.limitPriceError
                    });
                    var l = this._getStep();
                    if (e.sl)
                        if (2 === e.cmd || 4 === e.cmd) {
                            s = e.sl <= e.price - l * t.stops_level;
                            var u = c.slStopsLevel + c.gte + t.stops_level;
                            s ? null : r.push({
                                key: "sl",
                                msg: u
                            })
                        } else {
                            s = e.sl >= e.price - l * t.stops_level;
                            var u = c.slStopsLevel + c.get + t.stops_level;
                            s ? null : r.push({
                                key: "sl",
                                msg: u
                            })
                        }
                    if (e.tp)
                        if (2 === e.cmd || 4 === e.cmd) {
                            o = e.tp >= e.price + l * t.stops_level;
                            var u = c.tpStopsLevel + c.gte + t.stops_level;
                            o ? null : r.push({
                                key: "tp",
                                msg: u
                            })
                        } else {
                            o = e.tp <= e.price + l * t.stops_level;
                            var u = c.tpStopsLevel + c.gte + t.stops_level;
                            o ? null : r.push({
                                key: "tp",
                                msg: u
                            })
                        }
                    return a = e.comment.length > 20 ? !1 : !0, a || r.push(c.remarkMore), r.length > 0 && this.setState({
                        errorMessages: r,
                        expiration: this.refs.expiration.value()
                    }), n && i && s && o && a
                },
                render: function() {
                    if (0 === Object.keys(this.props).length) return null;
                    var e = this.props.symbols.map(function(e) {
                            return i.createElement("option", {
                                value: e.symbol
                            }, e.symbol)
                        }),
                        t = this.props.limitPriceTypes.map(function(e) {
                            return i.createElement("option", {
                                value: e.value
                            }, e.name)
                        }),
                        r = this.state.errorMessages.map(function(e) {
                            return i.createElement("div", {
                                className: "error-message"
                            }, e.msg)
                        });
                    return i.createElement("div", {
                        className: "limit-order-panel"
                    }, i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.symbolType), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement("select", {
                        className: "",
                        defaultValue: this.props.symbol,
                        ref: "symbol",
                        onChange: this._changeSymbol
                    }, e))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.volume), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(h, {
                        value: this.state.volumeMin,
                        ref: "volume",
                        step: this.state.volumeMin,
                        min: this.state.volumeMin,
                        max: this.state.volumeMax,
                        onBlur: this._clearMsg.bind(this, "volume")
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.limitPriceType), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement("select", {
                        defaultValue: this.state.defaultLimitPriceType,
                        onChange: this._limitPriceTypeChanged,
                        ref: "limitPriceType"
                    }, t))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.limitPrice), i.createElement("div", {
                        className: "control-value price-limit-wrapper"
                    }, i.createElement(h, {
                        step: this.state.step,
                        ref: "limitPrice",
                        min: 0,
                        max: 1e4,
                        onBlur: this._clearMsg.bind(this, "limitPrice")
                    }), i.createElement("div", {
                        className: "price-limit"
                    }, i.createElement("label", null, this.state.op), i.createElement(x, {
                        symbol: this.state.symbol,
                        quote: this.props.quote,
                        limitPriceType: this.state.limitPriceType,
                        ref: "quoteObject"
                    })))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        onClick: this._slChecked,
                        checked: this.state.slCheck
                    }), i.createElement("label", null, c.slPrice)), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(h, {
                        disabled: !this.state.slCheck,
                        value: this.state.slLimitValue,
                        step: this.state.step,
                        ref: "sl",
                        min: 0,
                        max: 1e4,
                        onBlur: this._clearMsg.bind(this, "sl")
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        onClick: this._tpChecked,
                        checked: this.state.tpCheck
                    }), i.createElement("label", null, c.tpPrice)), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(h, {
                        disabled: !this.state.tpCheck,
                        value: this.state.tpLimitValue,
                        step: this.state.step,
                        ref: "tp",
                        min: 0,
                        max: 1e4,
                        onBlur: this._clearMsg.bind(this, "tp")
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        onClick: this._dateChecked,
                        checked: this.state.dateCheck
                    }), i.createElement("label", null, c.limitDate)), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(g, {
                        onDateSelected: this._onDateSelected,
                        value: this.state.expiration,
                        disabled: !this.state.dateCheck,
                        minDate: new Date,
                        timePicker: !0,
                        timePickerIncrement: 1,
                        timePicker12Hour: !1,
                        timePickerSeconds: !1,
                        format: "YYYY-MM-DD HH:mm",
                        ref: "expiration"
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.remark), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement("input", {
                        type: "text",
                        ref: "comment",
                        onBlur: this._clearMsg.bind(this, "comment")
                    }))), r, i.createElement("div", {
                        className: "action-group"
                    }, i.createElement("button", {
                        className: "btn gray-btn inline-btn",
                        onClick: this.props.onClose
                    }, c.cancel), i.createElement("button", {
                        className: "btn primary-btn inline-btn",
                        onClick: this._submit
                    }, c.confirm)))
                }
            }),
            x = i.createClass({
                displayName: "QuotePrice",
                mixins: [s.listenTo(o, "_symbolStoreListener")],
                getInitialState: function() {
                    return {
                        quoteSymbol: {
                            ask: this.props.quote.ask,
                            bid: this.props.quote.bid,
                            scale: this.props.quote.scale
                        },
                        quotePrice: this._generateQuotePrice(this.props.quote)
                    }
                },
                _symbolStoreListener: function(e) {
                    if ("pushSymbolList" === e.type) {
                        var t = this.props.symbol,
                            r = e.allQuoteSymbols.find(function(e) {
                                return e.symbol === t
                            });
                        r && this.setState({
                            quoteSymbol: r,
                            quotePrice: this._generateQuotePrice(r)
                        })
                    }
                },
                _generateQuotePrice: function(e) {
                    var t = this.props.limitPriceType,
                        r = f.getSymbolByName(e.symbol),
                        i = 0;
                    return "2" === t ? i = new m(e.ask).minus(n(e.scale) * r.stops_level).toNumber() : "3" === t ? i = new m(e.bid).plus(n(e.scale) * r.stops_level).toNumber() : "4" === t ? i = new m(e.ask).plus(n(e.scale) * r.stops_level).toNumber() : "5" === t && (i = new m(e.bid).minus(n(e.scale) * r.stops_level).toNumber()), i
                },
                value: function() {
                    return {
                        quoteSymbol: this.state.quoteSymbol,
                        quotePrice: this.state.quotePrice
                    }
                },
                render: function() {
                    return i.createElement("label", null, this.state.quotePrice.toFixed(this.state.quoteSymbol.scale))
                }
            });
        e.exports = y
    }).call(t, r(28))
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(25),
        s = r(81),
        o = s,
        a = o.Table,
        l = o.Column,
        c = r(13),
        u = c.getModule("symbolPanel"),
        h = r(51),
        p = r(52),
        d = (r(53), r(47), n.createClass({
            displayName: "SymbolTable",
            mixins: [i.listenTo(p, "_symbolStoreListener")],
            propTypes: {
                width: n.PropTypes.number.isRequired,
                showSymbolDetail: n.PropTypes.func,
                createOrder: n.PropTypes.func
            },
            getDefaultProps: function() {
                return {
                    headers: [{
                        label: null,
                        width: 20,
                        dataKey: "dragHandler"
                    }, {
                        label: u.symbol,
                        width: .25,
                        dataKey: "symbol"
                    }, {
                        label: u.bid,
                        width: .25,
                        dataKey: "bid"
                    }, {
                        label: u.ask,
                        width: .25,
                        dataKey: "ask"
                    }, {
                        label: u.spread,
                        width: .25,
                        dataKey: "scale"
                    }, {
                        label: null,
                        width: 30,
                        dataKey: "remove"
                    }]
                }
            },
            getInitialState: function() {
                return {
                    symbolList: []
                }
            },
            _symbolStoreListener: function(e) {
                var t = e.type;
                switch (t) {
                    case "fetchSymbolList":
                        this.setState({
                            symbolList: e.data.symbolList
                        });
                        break;
                    case "pushSymbolList":
                        e.symbolList && this.setState({
                            symbolList: e.symbolList
                        });
                        break;
                    case "updateSymbol":
                        this.setState({
                            symbolList: e.data.symbolList
                        });
                        break;
                    case "detailSymbol":
                        this.setState({
                            detailSymbol: e.data
                        })
                }
            },
            _removeHandler: function(e) {
                h.removeSymbol(e.symbol)
            },
            _sortSymbols: function() {
                var e = this.state.symbolList.map(function(e) {
                    return e.symbol
                });
                h.sortSymbols(e)
            },
            _showSymbolDetail: function(e) {
                this.props.showSymbolDetail(e)
            },
            _createOrder: function(e) {
                this.props.createOrder(e)
            },
            render: function() {
                var e = this,
                    t = this.state.symbolList,
                    r = function(e) {
                        return t[e]
                    },
                    i = function(t, r, i, s, o, a) {
                        switch (r) {
                            case "dragHandler":
                                return n.createElement("div", {
                                    className: "drag-handler"
                                });
                            case "remove":
                                return n.createElement("div", {
                                    className: "remove",
                                    onClick: e._removeHandler.bind(e, i)
                                });
                            case "symbol":
                                return i.canTrade ? n.createElement("div", {
                                    className: "symbol-name clickable blue",
                                    onClick: e._showSymbolDetail.bind(e, i)
                                }, t) : n.createElement("div", {
                                    className: "symbol-name clickable gray",
                                    onClick: e._showSymbolDetail.bind(e, i)
                                }, t);
                            case "bid":
                                if (!i.workTime) return n.createElement("div", null, t.toFixed(i.scale));
                                if (!i.canTrade) return n.createElement("div", {
                                    className: "gray"
                                }, t.toFixed(i.scale));
                                var l = "clickable";
                                return i.bidUp === !0 ? l += " up" : i.bidUp === !1 && (l += " down"), n.createElement("div", {
                                    className: l,
                                    onClick: e._createOrder.bind(e, i)
                                }, t.toFixed(i.scale));
                            case "ask":
                                if (!i.workTime) return n.createElement("div", null, t.toFixed(i.scale));
                                if (!i.canTrade) return n.createElement("div", {
                                    className: "gray"
                                }, t.toFixed(i.scale));
                                var l = "clickable";
                                return i.askUp === !0 ? l += " up" : i.askUp === !1 && (l += " down"), n.createElement("div", {
                                    className: l,
                                    onClick: e._createOrder.bind(e, i)
                                }, t.toFixed(i.scale));
                            case "scale":
                                return i.canTrade ? Math.round(i.ask * Math.pow(10, i.scale) - i.bid * Math.pow(10, i.scale)) : n.createElement("div", {
                                    className: "gray"
                                }, Math.round(i.ask * Math.pow(10, i.scale) - i.bid * Math.pow(10, i.scale)));
                            default:
                                return t
                        }
                    },
                    s = this.props.headers,
                    o = this.props.width - 2 - s[0].width - s[s.length - 1].width,
                    c = this.props.headers.map(function(e, t) {
                        var r = e.width;
                        return null !== e.label && (r = o * e.width), n.createElement(l, {
                            align: "center",
                            label: e.label,
                            width: r,
                            dataKey: e.dataKey,
                            cellRenderer: i
                        })
                    });
                return n.createElement(a, {
                    rowHeight: 36,
                    rowGetter: r,
                    rowsCount: t.length,
                    width: this.props.width - 2,
                    maxHeight: 468,
                    headerHeight: 36,
                    overflowX: "hidden"
                }, c)
            }
        }));
    e.exports = d
}, , function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(49),
            s = r(111),
            o = (r(58), n.createClass({
                displayName: "Dropdown",
                propTypes: {
                    onClick: n.PropTypes.func,
                    changeHandler: n.PropTypes.func,
                    className: n.PropTypes.string,
                    isOpen: n.PropTypes.bool
                },
                getInitialState: function() {
                    return {
                        isOpen: this.props.isOpen
                    }
                },
                _clickItemHandler: function(e, t) {
                    "function" == typeof this.props.changeHandler && this.props.changeHandler(e, t)
                },
                _clickLabelHandler: function(e) {
                    this.props.onClick && this.props.onClick(), this.setState({
                        isOpen: !this.state.isOpen
                    }), t("body").on("click.dropdown", function(e) {
                        var r = t(e.target);
                        r.closest(".dropdown-inner").length > 0 && e.stopPropagation(), this.setState({
                            isOpen: !1
                        }), t("body").off("click.dropdown")
                    }.bind(this))
                },
                render: function() {
                    var e = this._clickItemHandler,
                        t = "",
                        r = this.props.value,
                        o = n.Children.map(this.props.children, function(n, i) {
                            var o = n.props.value === r;
                            return o && (t = n.props.children), s(n, {
                                clickHandler: e,
                                selected: o
                            })
                        }),
                        a = {
                            dropdown: !0,
                            open: this.state.isOpen,
                            close: !this.state.isOpen
                        };
                    return this.props.className && (a[this.props.className] = !0), n.createElement("div", {
                        className: i(a)
                    }, n.createElement("div", {
                        className: "dropdown-inner",
                        onClick: this._clickLabelHandler
                    }, n.createElement("div", {
                        className: "dropdown-label"
                    }, t)), n.createElement("ul", {
                        className: "dropdown-options"
                    }, o))
                }
            }));
        e.exports = o
    }).call(t, r(28))
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = n.createClass({
            displayName: "DropdownItem",
            propTypes: {
                clickHandler: n.PropTypes.func.isRequired,
                selected: n.PropTypes.bool
            },
            getDefaultProps: function() {
                return {
                    selected: !1
                }
            },
            _clickHandler: function() {
                this.props.clickHandler(this.props.value, this.props.children)
            },
            render: function() {
                var e = "dropdown-option";
                return this.props.selected && (e += " selected"), n.createElement("li", {
                    className: e,
                    onClick: this._clickHandler,
                    "data-value": this.props.value
                }, this.props.children)
            }
        });
    e.exports = i
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(25),
            i = r(9),
            s = (r(123), r(51)),
            o = (r(10), r(116)),
            a = r(114),
            l = (r(13), r(27), r(56)),
            c = r(61),
            u = r(52),
            h = n.createStore({
                listenables: s,
                init: function() {
                    this.listenTo(u, this._symbolStoreListener), this.period = "M1", this.activeSymbol = null, this.chartType = "candlestick", this.symbolList = [], this.historyQuote = null, this.indicator = "none", this.wrapper = null, this.deferred = null, this.activeSymbolTmp = {
                        quotes: [],
                        flag: !1
                    }, o.registerMessageHandler(this._chartDataRefresh), o.registerMessageHandler(this._tmpActiveSymbolQuotes)
                },
                _symbolStoreListener: function(e) {
                    switch (e.type) {
                        case "fetchSymbolList":
                            var t = e.data.symbolList;
                            this.symbolList = t.map(function(e) {
                                return e.symbol
                            }), this.activeSymbol = t[0], this.deferred && (this.deferred.resolve(), this.deferred = null);
                            break;
                        case "updateSymbols":
                            this.symbolList = e.data.map(function(e) {
                                return e.symbol
                            })
                    }
                },
                fetchHistoryQuote: function(e) {
                    var r = this;
                    r.wrapper = e, r.activeSymbol ? r._fetchHistoryQuote() : r.deferred = t.Deferred().done(function() {
                        r._fetchHistoryQuote()
                    })
                },
                _tmpActiveSymbolQuotes: function(e) {
                    if (this.activeSymbolTmp.flag && e.message === i.typeQuotation) {
                        var t = this.activeSymbol,
                            r = e.data,
                            n = r[t.symbol];
                        if (!n) return;
                        this.activeSymbolTmp.quotes.push(n)
                    }
                },
                _fetchHistoryQuote: function() {
                    var e = u.getSymbolByName(this.activeSymbol.symbol);
                    this.activeSymbol = e;
                    var t = {
                        loading: !0,
                        loadingWrapper: this.wrapper
                    };
                    this.activeSymbolTmp.quotes = [], this.activeSymbolTmp.flag = !0, a.getHistoryQuote(e.symbol, c.chartPeriodValue[this.period], 0, t).done(function(e) {
                        var t = e.data || [];
                        0 !== t.length && (this.historyQuote = this._translate(t), this._triggerAll(), this.activeSymbolTmp.flag = !1)
                    }.bind(this))
                },
                _translate: function(e) {
                    var t = [];
                    if (e) {
                        for (var r = e.length - 1; r >= 0; r--) {
                            var n = e[r];
                            t.push({
                                high: n.h,
                                low: n.l,
                                open: n.o,
                                close: n.c,
                                time: n.t,
                                scale: n.p
                            }), n = null
                        }
                        e = null
                    }
                    return t
                },
                _triggerAll: function() {
                    this.trigger({
                        type: "fetchHistoryQuote",
                        data: {
                            historyQuote: this.historyQuote,
                            symbolList: this.symbolList,
                            period: this.period,
                            chartType: this.chartType,
                            indicator: this.indicator,
                            activeSymbol: this.activeSymbol.symbol,
                            scale: this.activeSymbol.scale
                        }
                    })
                },
                _createNewQuote: function(e, r) {
                    var n = r,
                        i = r,
                        s = null;
                    if (e && e.length > 0) {
                        var o = moment.unix(Number(r.quote_datetime));
                        t(e).each(function() {
                            var e = this,
                                t = moment.unix(Number(e.quote_datetime));
                            o.minute() === t.minute() && (s = s || e, e.bid > r.bid && (n = e), e.bid < r.bid && (i = e))
                        })
                    }
                    s = s || r;
                    var a = {};
                    return a.open = s.bid, a.close = r.bid, a.high = n.bid, a.low = i.bid, a.time = r.quote_datetime, a
                },
                _updateLastQuote: function(e, r, n) {
                    if (r.close = n.bid, e && e.length > 0) {
                        var i = moment.unix(Number(n.quote_datetime));
                        t(e).each(function() {
                            var e = this,
                                t = moment.unix(Number(e.quote_datetime));
                            i.minute() === t.minute() && (e.bid > r.high && (r.high = e.bid), e.bid < r.low && (r.low = e.bid))
                        })
                    }
                    n.bid > r.high && (r.high = n.bid), n.bid < r.low && (r.low = n.bid)
                },
                _chartDataRefresh: function(e) {
                    var t = this.historyQuote,
                        r = this.activeSymbol;
                    if (null !== t && e.message === i.typeQuotation) {
                        var n = e.data[r.symbol];
                        if (!n) return;
                        var s = t[t.length - 1],
                            o = this.activeSymbolTmp.quotes;
                        if (this._compareTo(n.quote_datetime, s.time, this.period)) {
                            var a = this._createNewQuote(o, n);
                            t = l(t, {
                                $push: [a]
                            }), this.historyQuote = t
                        } else this._updateLastQuote(o, s, n), t[t.length - 1] = s;
                        var c = {
                            historyQuote: t
                        };
                        return n.scale !== r.scale && (r.scale = n.scale, c.scale = n.scale), this.activeSymbolTmp.quotes = [], this.trigger({
                            type: "chartDataRefresh",
                            data: c
                        })
                    }
                },
                _compareTo: function(e, t, r) {
                    var n = moment.unix(Number(e)),
                        i = moment.unix(Number(t));
                    switch (r) {
                        case "M1":
                            return n.minute() - i.minute() >= 1;
                        case "M5":
                            return n.minute() - i.minute() >= 5;
                        case "M15":
                            return n.minute() - i.minute() >= 15;
                        case "M30":
                            return n.minute() - i.minute() >= 30;
                        case "H1":
                            return n.hour() - i.hour() >= 1;
                        case "H4":
                            return n.hour() - i.hour() >= 4;
                        case "Daily":
                            return n.date() - i.date() >= 1;
                        case "Weekly":
                            return n.week() - i.week() >= 1;
                        case "Monthly":
                            return n.month() - i.month() >= 1;
                        default:
                            return !1
                    }
                },
                changeActiveSymbol: function(e) {
                    this.activeSymbol = u.getSymbolByName(e), this.indicator = "none", this._fetchHistoryQuote()
                },
                changePeriodType: function(e) {
                    this.period = e, this._fetchHistoryQuote()
                },
                changeChartType: function(e) {
                    this.chartType = e, this._triggerAll()
                },
                updateIndicators: function(e) {
                    this.indicator = e, this._triggerAll()
                },
                setSymbolList: function(e) {}
            });
        e.exports = h
    }).call(t, r(28))
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(25),
        s = r(13),
        o = s.getModule("chartPanel"),
        a = r(11),
        l = (r(31), r(12)),
        c = r(73),
        u = (r(9), r(131)),
        h = n.createClass({
            displayName: "ShareArticle",
            mixins: [c, i.listenTo(l, "_discoveryStoreListener")],
            propTypes: {
                tag: n.PropTypes.string,
                snapshot: n.PropTypes.string,
                onClose: n.PropTypes.func.isRequired
            },
            getInitialState: function() {
                return {
                    error: null
                }
            },
            _discoveryStoreListener: function(e) {
                var t = e.type;
                switch (t) {
                    case "shareArticle":
                        this.props.onClose()
                }
            },
            _shareArticle: function() {
                var e = {
                    title: this.refs.title.getDOMNode().value || this.props.title,
                    tags: [this.props.tag],
                    content: this.refs.countContent.getContent(),
                    picturePath: this.props.snapshot
                };
                return this.isTitle(e.title) ? this.isArticle(e.content) ? void a.shareArticle(e) : void this.setState({
                    error: o.contentError
                }) : void this.setState({
                    error: o.titleError
                })
            },
            _clearErrorMsg: function(e) {
                e.preventDefault(), this.setState({
                    error: ""
                })
            },
            render: function() {
                return n.createElement("div", {
                    className: "share-article"
                }, n.createElement("div", {
                    className: "control-group"
                }, n.createElement("input", {
                    type: "text",
                    className: "article-title",
                    ref: "title",
                    placeholder: this.props.title,
                    onFocus: this._clearErrorMsg
                }), n.createElement("div", {
                    className: "tag"
                }, this.props.tag)), n.createElement("div", {
                    className: "control-group"
                }, n.createElement(u, {
                    ref: "countContent",
                    countDescHead: o.shareLimit,
                    countDescTail: o.chinaChar,
                    onFocus: this._clearErrorMsg
                }), n.createElement("div", {
                    className: "error-message"
                }, this.state.error)), n.createElement("img", {
                    src: this.props.snapshot,
                    className: "snapshot"
                }), n.createElement("div", {
                    className: "action-control"
                }, n.createElement("button", {
                    className: "btn primary-btn inline-btn",
                    onClick: this._shareArticle
                }, o.deploy)))
            }
        });
    e.exports = h
}, function(e, t, r) {
    (function(t) {
        "use strict";
        r(139), r(140), r(141), r(142), r(143);
        var n = r(144),
            i = r(80),
            s = r(14),
            o = (r(56), function(e, t) {
                this.containerId = e, this.options = null, this.plot = null, this.historyQuote = null, this.chartType = null, this.period = null, this.scale = null, this._init(t)
            });
        o.prototype = {
            constructor: o,
            maxTickInterval: 9,
            defaultOptions: {
                sortData: !1,
                axes: {
                    xaxis: {
                        show: !0,
                        rendererOptions: {
                            drawBaseline: !1
                        },
                        tickOptions: {
                            textColor: "#C5C5C5"
                        },
                        numberTicks: 21,
                        tickInterval: 4,
                        min: -1
                    },
                    x2axis: {
                        show: !1
                    },
                    yaxis: {
                        show: !1
                    },
                    y2axis: {
                        show: !0,
                        rendererOptions: {
                            drawBaseline: !1
                        },
                        tickOptions: {
                            textColor: "#C5C5C5",
                            formatString: "%.4f"
                        },
                        numberTicks: 12
                    }
                },
                seriesDefaults: {
                    yaxis: "y2axis",
                    showMarker: !1,
                    lineWidth: 1
                },
                series: [{}],
                grid: {
                    gridLineColor: "#454545",
                    background: "#3D3D3D",
                    borderColor: "#5C5C5C",
                    borderWidth: 1,
                    shadow: !1,
                    shadowAlpha: 1
                },
                gridPadding: {
                    top: 0,
                    left: 0,
                    right: 60,
                    bottom: 25
                },
                cursor: {
                    style: "default",
                    show: !0,
                    showHorizontalLine: !1,
                    showVerticalLine: !1,
                    showTooltip: !0,
                    followMouse: !1,
                    tooltipLocation: "nw",
                    zoom: !1,
                    shapeRenderer: new t.jqplot.ShapeRenderer({
                        lineWidth: 1,
                        strokeStyle: "#C5C5C5"
                    }),
                    showTooltipDataPosition: !0,
                    tooltipAxisGroups: [
                        ["xaxis", "y2axis"]
                    ]
                },
                baselineTip: {
                    show: !0,
                    lineWidth: 1,
                    color: "#F00",
                    yaxis: "y2axis"
                },
                data: [
                    [null]
                ]
            },
            dateAxisFormatter: function(e) {
                var t = this,
                    r = t.period,
                    n = t.historyQuote,
                    i = Math.round(e);
                if (!n) return "";
                var a = null;
                a = 0 > i ? n[0].time + o.chartPeriod[r] * i : i >= n.length ? n[n.length - 1].time + o.chartPeriod[r] * (i - n.length + 1) : n[i].time;
                var l = "D MMM HH:mm";
                return parseInt(r) >= 6 && (l = "D MMM YYYY"), s.formatUTCDate(a, l)
            },
            tooltipFormatter: function(e) {
                var t = this.historyQuote;
                if (!t) return "";
                var r = Math.round(e.xaxis),
                    n = t[r];
                if (!n) return "";
                var i = this.plot,
                    o = [];
                o.push(s.formatUTCDate(n.time, "YYYY.MM.DD HH:mm"));
                var a = i.axes.y2axis._ticks[0].formatter,
                    l = i.axes.y2axis._ticks[0].formatString;
                return o.push('<span class="title">O:</span>' + a(l, n.open)), o.push('<span class="title">H:</span>' + a(l, n.high)), o.push('<span class="title">L:</span>' + a(l, n.low)), o.push('<span class="title">C:</span>' + a(l, n.close)), o = o.join("&nbsp;&nbsp;&nbsp;&nbsp;")
            },
            _init: function(e) {
                var r = this,
                    e = t.extend({}, this.defaultOptions, e);
                return e.axes.xaxis.tickOptions.formatter = function(e, t) {
                    return r.dateAxisFormatter(t)
                }, e.cursor.tooltipContent = function(e, t, n) {
                    return r.tooltipFormatter(t)
                }, this.options = e, this
            },
            render: function() {
                var e = t.jqplot(this.containerId, this.options),
                    r = new n(e);
                return r.render(), this.plot = e, this.svgAnnotation = r, window.plot = this.plot, this
            },
            setXaxisNumberTick: function(e) {
                var t = this.plot,
                    r = this.options;
                t && (r = t.options);
                var n = r.axes.xaxis;
                n.numberTicks = e, n.min = this._getXaxisMin(n)
            },
            hideCross: function() {
                var e = this.plot,
                    t = e.options.cursor,
                    r = e.plugins.cursor;
                t.showVerticalLine = r.showVerticalLine = !1, t.showHorizontalLine = r.showHorizontalLine = !1, t.style = r.style = "default"
            },
            showCross: function() {
                var e = this.plot,
                    t = e.options.cursor,
                    r = e.plugins.cursor;
                t.showVerticalLine = r.showVerticalLine = !0, t.showHorizontalLine = r.showHorizontalLine = !0, t.style = r.style = "crosshair"
            },
            drawChart: function(e, t, r, n, i, s) {
                this.symbol = t, this.chartType = r, this.period = n, this.scale = i, this.indicator = s, this.historyQuote = e;
                var o = e.length,
                    a = this.plot,
                    l = a.options,
                    c = l.axes.xaxis;
                c.max = o;
                var u = this._getXaxisMin(c);
                c.min = u;
                var h = this._getChartData(),
                    p = this._getSeriesOptsByType();
                l.resetAxes = !0, l.series = [p];
                var d = l.axes.y2axis;
                d.tickOptions.formatString = "%." + i + "f", this._setMinAndMaxYAxis(h), l.data = [h];
                var f = this._getIndicatorSeriesOpts();
                f && (l.series.push(f), l.data.push(this.getIndicatorData())), a.replot(l), this.drawBaseline(), this.svgAnnotation.rescale()
            },
            refreshChart: function(e) {
                var t = e.length,
                    r = this.historyQuote.length !== t;
                this.historyQuote = e;
                var n = this.plot,
                    i = n.options,
                    s = i.axes.xaxis,
                    o = s.max;
                if (!r && t > o) return void this.drawBaseline();
                r && (s.max = t, s.min = this._getXaxisMin(s));
                var a = this._getChartData(),
                    l = [a],
                    c = this.getIndicatorData();
                c && l.push(c);
                var u = e[t - 1],
                    h = i.axes.y2axis,
                    p = h.min,
                    d = h.max,
                    f = (d - p) / 10;
                p += f, d -= f, r || u.high > d || u.low < p ? (this._setMinAndMaxYAxis(a), this._redrawWithoutClear(l)) : (n.drawSeries({
                    data: a
                }, 0), c && n.drawSeries({
                    data: c
                }, 1), this.rescaleAnnotation()), this.drawBaseline(), a = null, l = null, c = null, p = null, d = null, f = null, u = null
            },
            moveLeft: function() {
                var e = this.plot,
                    t = e.options,
                    r = t.axes.xaxis,
                    n = r,
                    i = (n.min, n.max),
                    s = n.tickInterval;
                if (!(i >= this.historyQuote.length)) {
                    r.max = i + s, r.min = this._getXaxisMin(r);
                    var o = this._getChartData();
                    t.axes.y2axis;
                    this._setMinAndMaxYAxis(o);
                    var a = [o],
                        l = this.getIndicatorData();
                    l && a.push(l), this._redrawWithoutClear(a), this.drawBaseline(), o = null, l = null, a = null
                }
            },
            moveRight: function() {
                var e = this.plot,
                    t = e.options,
                    r = t.axes.xaxis,
                    n = r,
                    i = n.min,
                    s = (n.max, n.tickInterval);
                if (!(0 > i)) {
                    r.min = i - s, r.max = this._getXaxisMax(r);
                    var o = this._getChartData();
                    t.axes.y2axis;
                    this._setMinAndMaxYAxis(o);
                    var a = [o],
                        l = this.getIndicatorData();
                    l && a.push(l), this._redrawWithoutClear(a), this.drawBaseline(), o = null, l = null, a = null
                }
            },
            zoomin: function() {
                var e = this.plot,
                    t = e.options,
                    r = t.axes.xaxis,
                    n = r.tickInterval;
                if (1 !== n) {
                    r.tickInterval = n - 1, r.min = this._getXaxisMin(r);
                    var i = this._getChartData();
                    this._setMinAndMaxYAxis(i);
                    var s = [i],
                        o = this.getIndicatorData();
                    o && s.push(o), this._redrawWithoutClear(s), this.drawBaseline(), i = null, o = null, s = null
                }
            },
            zoomout: function() {
                var e = this,
                    t = e.plot,
                    r = e.historyQuote,
                    n = t.options,
                    i = n.axes.xaxis,
                    s = i.min,
                    o = i.max;
                if (!(0 > s && o > r.length - 1 || i.tickInterval > this.maxTickInterval)) {
                    i.tickInterval = i.tickInterval + 1, i.max = r.length, i.min = this._getXaxisMin(i);
                    var a = this._getChartData();
                    this._setMinAndMaxYAxis(a);
                    var l = [a],
                        c = this.getIndicatorData();
                    c && l.push(c), this._redrawWithoutClear(l), this.drawBaseline(), a = null, c = null, l = null
                }
            },
            drawBaseline: function() {
                var e = this,
                    t = e.plot,
                    r = e.historyQuote,
                    n = t.plugins.baselineTip,
                    i = r[r.length - 1].close;
                n.value = i, n.draw(t)
            },
            replot: function() {
                var e = this.plot.options;
                if (e.resetAxes = !0, this.historyQuote) {
                    var t = this._getChartData();
                    this._setMinAndMaxYAxis(t);
                    var r = [t],
                        n = this.getIndicatorData();
                    n && r.push(n), e.data = r, t = null, r = null, n = null
                }
                this.plot.replot(e), this.historyQuote && this.historyQuote.length > 0 && this.drawBaseline(), this.svgAnnotation && this.svgAnnotation.resize()
            },
            isDraggable: function() {
                var e = this.plot.plugins;
                return "default" === e.cursor.style && null === this.svgAnnotation.type
            },
            getTickInterval: function() {
                return this.plot.axes.xaxis.tickInterval
            },
            drawAnnotation: function(e, t) {
                this.svgAnnotation.changeType(e, t)
            },
            rescaleAnnotation: function() {
                this.svgAnnotation.rescale()
            },
            exportAsImage: function(e, r) {
                var n = this,
                    i = t(e).jqplotToImage(0, 0),
                    s = i.getContext("2d"),
                    o = this.svgAnnotation.exportAsBase64(),
                    a = new Image;
                a.onload = function() {
                    s.drawImage(a, 0, 0), s.fillStyle = "#FFF", s.font = "12px Arial", s.textAlign = "start", s.fillText(n.symbol, 6, 6), s.fillText(n.period, 80, 6), s = null, a = null, n = null, "function" == typeof r && r(i.toDataURL("image/png"))
                }, a.src = o
            },
            annotationBack: function() {
                this.svgAnnotation.back()
            },
            annotationForward: function() {
                this.svgAnnotation.forward()
            },
            clearAnnotation: function() {
                this.svgAnnotation.clear()
            },
            destroy: function() {
                this.plot.destroy()
            },
            getIndicatorData: function() {
                switch (this.indicator) {
                    case "macd":
                        return this.getMAData(21)
                }
                return null
            },
            getMAData: function(e) {
                var t = this.historyQuote,
                    r = this.plot.options.axes.xaxis,
                    n = r.min,
                    i = r.max;
                n = n >= 0 ? n : 0, i = i < t.length ? i : t.length - 1;
                for (var s, o, a, l, c = [], u = n; i >= u; u++) {
                    o = u, s = 0 > u - e ? 0 : u - e, l = 0;
                    for (var h = s; o >= h; h++) l += t[h].close;
                    c.push([u, l / (o - s + 1)])
                }
                return a = null, c
            },
            _getChartData: function() {
                var e = this,
                    t = e.plot,
                    r = e.historyQuote,
                    n = e.chartType,
                    i = t.options,
                    s = i.axes.xaxis,
                    o = s.min,
                    a = s.max;
                o = 0 > o ? 0 : o;
                var l = null;
                switch (n) {
                    case "line":
                        l = r.slice(o, a + 1).map(function(e, t) {
                            return [t + o, e.close]
                        });
                        break;
                    case "bar":
                        l = r.slice(o, a + 1).map(function(e, t) {
                            return [t + o, e.open, e.high, e.low, e.close]
                        });
                        break;
                    case "candlestick":
                        l = r.slice(o, a + 1).map(function(e, t) {
                            return [t + o, e.open, e.high, e.low, e.close]
                        })
                }
                return l
            },
            _getSeriesOptsByType: function() {
                var e = null;
                switch (this.chartType) {
                    case "line":
                        e = {
                            color: "#29CC90",
                            renderer: t.jqplot.LineRenderer,
                            rendererOptions: {}
                        };
                        break;
                    case "bar":
                        e = {
                            renderer: t.jqplot.OHLCRenderer,
                            rendererOptions: {
                                candleStick: !1,
                                barColor: "#29CC90"
                            },
                            color: "#29CC90"
                        };
                        break;
                    case "candlestick":
                        e = {
                            renderer: t.jqplot.OHLCRenderer,
                            rendererOptions: {
                                candleStick: !0,
                                wickColor: "#29CC90",
                                downBodyColor: "#FFFFFF",
                                fillUpBody: !1
                            },
                            color: "#29CC90"
                        }
                }
                return e
            },
            _getIndicatorSeriesOpts: function() {
                switch (this.indicator) {
                    case "macd":
                        return {
                            color: "#200AE0",
                            renderer: t.jqplot.LineRenderer,
                            lineWidth: 1,
                            rendererOptions: {}
                        }
                }
                return null
            },
            _setMinAndMaxYAxis: function(e) {
                for (var t = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, n = 0, i = e.length; i > n; n++) {
                    var s = e[n],
                        o = s[2] || s[1],
                        a = s[3] || s[1];
                    t > a && (t = a), o > r && (r = o)
                }
                var l = (r - t) / 10,
                    c = this.plot.options.axes.y2axis;
                c.min = t - l, c.max = r + l
            },
            _getXaxisMax: function(e, t, r) {
                var n = e.numberTicks;
                return ("undefined" == typeof t || null === t) && (t = e.min), ("undefined" == typeof r || null === r) && (r = e.tickInterval), t + (n - 1) * r
            },
            _getXaxisMin: function(e, t, r) {
                var n = e.numberTicks;
                return ("undefined" == typeof t || null === t) && (t = e.max), ("undefined" == typeof r || null === r) && (r = e.tickInterval), t - (n - 1) * r
            },
            _redrawWithoutClear: function(e) {
                var t = this.plot,
                    r = t.options.axes;
                t.resetAxesScale(!0, r), t.target.find(".jqplot-axis").remove(), t.axes.xaxis._ticks = [], t.axes.y2axis._ticks = [];
                for (var n, i = t.axes, s = ["xaxis", "y2axis"], o = 0; 2 > o; o++) n = s[o], t.baseCanvas._elem.before(i[n].draw(t.baseCanvas._ctx, t)), i[n].set();
                if (i.xaxis.pack({
                        position: "absolute",
                        bottom: t._gridPadding.bottom - i.xaxis.getHeight(),
                        left: 0,
                        width: t._width
                    }, {
                        min: t._gridPadding.left,
                        max: t._width - t._gridPadding.right
                    }), i.y2axis.pack({
                        position: "absolute",
                        top: 0,
                        right: t._gridPadding.right - i.y2axis.getWidth()
                    }, {
                        min: t._height - t._gridPadding.bottom,
                        max: t._gridPadding.top
                    }), t.grid.draw(), e)
                    for (var a = 0, l = e.length; l > a; a++) {
                        var c = {};
                        e[a] && (c.data = e[a]), t.drawSeries(c, a)
                    } else t.drawSeries();
                this.rescaleAnnotation()
            }
        }, o.chartPeriod = {
            M1: 60,
            M5: 300,
            M15: 900,
            M30: 1800,
            H1: 3600,
            H4: 14400,
            Daily: 86400,
            Weekly: 604800,
            Monthly: 24 * i().daysInMonth() * 60 * 60
        }, o.chartPeriodValue = {
            M1: 0,
            M5: 1,
            M15: 2,
            M30: 3,
            H1: 4,
            H4: 5,
            Daily: 6,
            Weekly: 7,
            Monthly: 8
        }, o.tickRange = 40, e.exports = o
    }).call(t, r(28))
}, function(e, t, r) {
    "use strict";
    var n = function() {
        var e = 0;
        return {
            uuid: function() {
                return "graph_" + e++
            }
        }
    }();
    n.HORTICAL_LINE = 0, n.VERTICAL_LINE = 1, n.RAY_LINE = 2, e.exports = n
}, function(e, t, r) {
    "use strict";
    var n = r(137),
        i = {};
    i.getArticles = function(e) {
        return n.doGet("/api/v1/discovery/articles/" + e)
    }, i.getArticlesByUser = function(e, t, r) {
        return n.doGet("/api/v1/discovery/u-articles/" + e + "/" + t + "/" + r)
    }, i.getArticlesByTag = function(e, t, r) {
        return n.doGet("/api/v1/discovery/t-articles/" + e + "/" + t + "/" + r)
    }, i.getArticle = function(e, t) {
        return n.doGet("/api/v1/discovery/article/" + e + "/" + t)
    }, i.getTagCloud = function(e) {
        return n.doGet("/api/v1/discovery/" + e + "/cloud-tags")
    }, i.shareArticle = function(e) {
        return n.doPost("/api/v1/discovery/article/share", {
            data: JSON.stringify(e)
        })
    }, e.exports = i
}, , , function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(28);
    r(145);
    e.exports = n.createClass({
        $picker: null,
        options: ["startDate", "endDate", "minDate", "maxDate", "dateLimit", "timeZone", "showDropdowns", "showWeekNumbers", "timePicker", "timePickerIncrement", "timePicker12Hour", "timePickerSeconds", "ranges", "opens", "drops", "buttonClasses", "applyClass", "cancelClass", "format", "separator", "locale", "singleDatePicker", "parentEl"],
        makeEventHandler: function(e) {
            return function(t, r) {
                "function" == typeof this.props.onEvent && this.props.onEvent(t, r), "function" == typeof this.props[e] && this.props[e](t, r)
            }.bind(this)
        },
        getOptionsFromProps: function() {
            var e, t = this.props;
            return this.options.forEach(function(r) {
                t.hasOwnProperty(r) && (e = e || {}, e[r] = t[r])
            }), e
        },
        setOptionsFromProps: function() {
            var e = this.getOptionsFromProps();
            this.$picker && e && this.$picker.data("daterangepicker").setOptions(e)
        },
        componentDidMount: function() {
            var e = this;
            e.$picker = i(this.refs.picker.getDOMNode()), e.$picker.daterangepicker(this.getOptionsFromProps()), ["Show", "Hide", "ShowCalendar", "HideCalendar", "Apply", "Cancel"].forEach(function(t) {
                var r = t.toLowerCase();
                e.$picker.on(r + ".daterangepicker", e.makeEventHandler("on" + t))
            })
        },
        componentWillUnmount: function() {
            this.$picker.data("daterangepicker").remove()
        },
        render: function() {
            return this.setOptionsFromProps(), n.createElement("div", n.__spread({
                ref: "picker"
            }, this.props), this.props.children)
        }
    })
}, function(e, t, r) {
    "use strict";
    var n = r(21),
        i = r(133),
        s = r(134),
        o = i.createClass({
            displayName: "ReactSortable",
            componentDidMount: function() {
                for (var e = n({}, this.props.sortable), t = ["onStart", "onEnd", "onAdd", "onRemove", "onUpdate", "onSort", "onFilter"], r = 0; r < t.length; r++) ! function() {
                    var n = t[r];
                    e[n] && ! function() {
                        var t = e[n];
                        e[n] = function(e) {
                            t(this, e)
                        }
                    }()
                }();
                this.sortable = s.create(this.getDOMNode(), e), this.renderList()
            },
            componentDidUpdate: function() {
                this.renderList()
            },
            componentWillUnmount: function() {
                for (var e, t = this.getDOMNode().childNodes[Symbol.iterator](); !(e = t.next()).done;) {
                    var r = e.value;
                    i.unmountComponentAtNode(r)
                }
                this.sortable.destroy()
            },
            getDefaultProps: function() {
                return {
                    component: "div",
                    childElement: "div"
                }
            },
            render: function() {
                for (var e = n({}, this.props), t = ["sortable", "component", "childElement", "children"], r = 0; r < t.length; r++) delete e[t[r]];
                return i.createElement(this.props.component, e)
            },
            renderList: function() {
                for (var e = this, t = {}, r = 0; r < this.getDOMNode().childNodes.length; r++) {
                    var n = this.getDOMNode().childNodes[r];
                    t[n.dataset.id] = n
                }
                i.Children.forEach(this.props.children, function(r) {
                    var n = t[r.key];
                    delete t[r.key], n || (n = document.createElement(e.props.childElement), e.props.sortable.draggable && (n.className = e.props.sortable.draggable.slice(1)), n.dataset.id = r.key, e.getDOMNode().appendChild(n)), i.render(r, n)
                });
                for (var s in t) i.unmountComponentAtNode(t[s]), this.getDOMNode().removeChild(t[s])
            }
        });
    e.exports = o
}, function(e, t, r) {
    e.exports = {
        Combobox: r(169),
        Option: r(170)
    }
}, , , , , , , , , function(e, t, r) {
    "use strict";
    var n = r(75),
        i = r(167),
        s = r(76),
        o = r(111),
        a = r(168),
        l = n.createClass({
            displayName: "ReactTransitionGroup",
            propTypes: {
                component: n.PropTypes.any,
                childFactory: n.PropTypes.func
            },
            getDefaultProps: function() {
                return {
                    component: "span",
                    childFactory: a.thatReturnsArgument
                }
            },
            getInitialState: function() {
                return {
                    children: i.getChildMapping(this.props.children)
                }
            },
            componentWillMount: function() {
                this.currentlyTransitioningKeys = {}, this.keysToEnter = [], this.keysToLeave = []
            },
            componentDidMount: function() {
                var e = this.state.children;
                for (var t in e) e[t] && this.performAppear(t)
            },
            componentWillReceiveProps: function(e) {
                var t = i.getChildMapping(e.children),
                    r = this.state.children;
                this.setState({
                    children: i.mergeChildMappings(r, t)
                });
                var n;
                for (n in t) {
                    var s = r && r.hasOwnProperty(n);
                    !t[n] || s || this.currentlyTransitioningKeys[n] || this.keysToEnter.push(n)
                }
                for (n in r) {
                    var o = t && t.hasOwnProperty(n);
                    !r[n] || o || this.currentlyTransitioningKeys[n] || this.keysToLeave.push(n)
                }
            },
            componentDidUpdate: function() {
                var e = this.keysToEnter;
                this.keysToEnter = [], e.forEach(this.performEnter);
                var t = this.keysToLeave;
                this.keysToLeave = [], t.forEach(this.performLeave)
            },
            performAppear: function(e) {
                this.currentlyTransitioningKeys[e] = !0;
                var t = this.refs[e];
                t.componentWillAppear ? t.componentWillAppear(this._handleDoneAppearing.bind(this, e)) : this._handleDoneAppearing(e)
            },
            _handleDoneAppearing: function(e) {
                var t = this.refs[e];
                t.componentDidAppear && t.componentDidAppear(), delete this.currentlyTransitioningKeys[e];
                var r = i.getChildMapping(this.props.children);
                r && r.hasOwnProperty(e) || this.performLeave(e)
            },
            performEnter: function(e) {
                this.currentlyTransitioningKeys[e] = !0;
                var t = this.refs[e];
                t.componentWillEnter ? t.componentWillEnter(this._handleDoneEntering.bind(this, e)) : this._handleDoneEntering(e)
            },
            _handleDoneEntering: function(e) {
                var t = this.refs[e];
                t.componentDidEnter && t.componentDidEnter(), delete this.currentlyTransitioningKeys[e];
                var r = i.getChildMapping(this.props.children);
                r && r.hasOwnProperty(e) || this.performLeave(e)
            },
            performLeave: function(e) {
                this.currentlyTransitioningKeys[e] = !0;
                var t = this.refs[e];
                t.componentWillLeave ? t.componentWillLeave(this._handleDoneLeaving.bind(this, e)) : this._handleDoneLeaving(e)
            },
            _handleDoneLeaving: function(e) {
                var t = this.refs[e];
                t.componentDidLeave && t.componentDidLeave(), delete this.currentlyTransitioningKeys[e];
                var r = i.getChildMapping(this.props.children);
                if (r && r.hasOwnProperty(e)) this.performEnter(e);
                else {
                    var n = s({}, this.state.children);
                    delete n[e], this.setState({
                        children: n
                    })
                }
            },
            render: function() {
                var e = [];
                for (var t in this.state.children) {
                    var r = this.state.children[t];
                    r && e.push(o(this.props.childFactory(r), {
                        ref: t,
                        key: t
                    }))
                }
                return n.createElement(this.props.component, this.props, e)
            }
        });
    e.exports = l
}, function(e, t, r) {
    "use strict";
    var n = r(75),
        i = r(165),
        s = r(166),
        o = r(164),
        a = (r(130), 17),
        l = n.createClass({
            displayName: "ReactCSSTransitionGroupChild",
            transition: function(e, t) {
                var r = this.getDOMNode(),
                    n = this.props.name + "-" + e,
                    o = n + "-active",
                    a = function(e) {
                        e && e.target !== r || (i.removeClass(r, n), i.removeClass(r, o), s.removeEndEventListener(r, a), t && t())
                    };
                s.addEndEventListener(r, a), i.addClass(r, n), this.queueClass(o)
            },
            queueClass: function(e) {
                this.classNameQueue.push(e), this.timeout || (this.timeout = setTimeout(this.flushClassNameQueue, a))
            },
            flushClassNameQueue: function() {
                this.isMounted() && this.classNameQueue.forEach(i.addClass.bind(i, this.getDOMNode())), this.classNameQueue.length = 0, this.timeout = null
            },
            componentWillMount: function() {
                this.classNameQueue = []
            },
            componentWillUnmount: function() {
                this.timeout && clearTimeout(this.timeout)
            },
            componentWillAppear: function(e) {
                this.props.appear ? this.transition("appear", e) : e()
            },
            componentWillEnter: function(e) {
                this.props.enter ? this.transition("enter", e) : e()
            },
            componentWillLeave: function(e) {
                this.props.leave ? this.transition("leave", e) : e()
            },
            render: function() {
                return o(this.props.children)
            }
        });
    e.exports = l
}, , , function(e, t, r) {
    e.exports = r(187)
}, , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
    "use strict";
    var n = Object.prototype.hasOwnProperty,
        i = Object.prototype.toString,
        s = Array.prototype.slice,
        o = r(204),
        a = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        l = function() {}.propertyIsEnumerable("prototype"),
        c = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        u = function(e) {
            var t = e.constructor;
            return t && t.prototype === e
        },
        h = ["window", "console", "parent", "self", "frames"],
        p = function() {
            if ("undefined" == typeof window) return !1;
            for (var e in window)
                if (-1 === h.indexOf(e) && n.call(window, e) && null !== window[e] && "object" == typeof window[e]) try {
                    u(window[e])
                } catch (t) {
                    return !0
                }
                return !1
        }(),
        d = function(e) {
            var t = null !== e && "object" == typeof e,
                r = "[object Function]" === i.call(e),
                s = o(e),
                h = t && "[object String]" === i.call(e),
                d = [];
            if (!t && !r && !s) throw new TypeError("Object.keys called on a non-object");
            var f = l && r;
            if (h && e.length > 0 && !n.call(e, 0))
                for (var m = 0; m < e.length; ++m) d.push(String(m));
            if (s && e.length > 0)
                for (var g = 0; g < e.length; ++g) d.push(String(g));
            else
                for (var v in e) f && "prototype" === v || !n.call(e, v) || d.push(String(v));
            if (a)
                for (var y = p || u(e), b = 0; b < c.length; ++b) y && "constructor" === c[b] || !n.call(e, c[b]) || d.push(c[b]);
            return d
        };
    d.shim = function() {
        if (Object.keys) {
            var e = function() {
                return 2 === (Object.keys(arguments) || "").length
            }(1, 2);
            if (!e) {
                var t = Object.keys;
                Object.keys = function(e) {
                    return t(o(e) ? s.call(e) : e)
                }
            }
        } else Object.keys = d;
        return Object.keys || d
    }, e.exports = d
}, function(e, t, r) {
    "use strict";
    var n = r(102),
        i = r(360),
        s = "function" == typeof Symbol && "symbol" == typeof Symbol(),
        o = Object.prototype.toString,
        a = function(e) {
            return "function" == typeof e && "[object Function]" === o.call(e)
        },
        l = function() {
            var e = {};
            try {
                Object.defineProperty(e, "x", {
                    value: e,
                    enumerable: !1
                });
                for (var t in e) return !1;
                return e.x === e
            } catch (r) {
                return !1
            }
        },
        c = Object.defineProperty && l(),
        u = function(e, t, r, n) {
            (!(t in e) || a(n) && n()) && (c ? Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: r
            }) : e[t] = r)
        },
        h = function(e, t) {
            var r = arguments.length > 2 ? arguments[2] : {},
                o = n(t);
            s && (o = o.concat(Object.getOwnPropertySymbols(t))), i(o, function(n) {
                u(e, n, t[n], r[n])
            })
        };
    h.supportsDescriptors = !!c, e.exports = h
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(13),
            o = s.getModule("customerFeedback"),
            a = r(131),
            l = r(73),
            c = r(201),
            u = r(202),
            h = n.createClass({
                displayName: "CustomerFeedback",
                mixins: [l, i.listenTo(u, "_feedbackStoreListener")],
                propTypes: {
                    onShow: n.PropTypes.func.isRequired,
                    onClose: n.PropTypes.func.isRequired
                },
                getInitialState: function() {
                    return {
                        error: null
                    }
                },
                _feedbackStoreListener: function(e) {
                    var r = e.type;
                    switch (r) {
                        case "submitFeedback":
                            t.messagebar("show", o.feedbackSuccess), this.props.onClose()
                    }
                },
                _submitFeedback: function(e) {
                    e.preventDefault();
                    var t = this.refs.suggestion.getContent();
                    return t ? this.isArticle(t) ? void c.submitFeedback({
                        suggestion: t
                    }) : void this.setState({
                        error: o.suggestionError
                    }) : void this.setState({
                        error: o.suggestionNull
                    })
                },
                _clearErrorMsg: function(e) {
                    e.preventDefault(), this.setState({
                        error: ""
                    })
                },
                render: function() {
                    return n.createElement("div", {
                        className: "customer-feedback"
                    }, n.createElement("div", {
                        className: "control-group"
                    }, n.createElement(a, {
                        ref: "suggestion",
                        countDescHead: o.suggestionLimit,
                        countDescTail: o.chinaChar,
                        onFocus: this._clearErrorMsg
                    }), n.createElement("div", {
                        className: "error-message"
                    }, this.state.error)), n.createElement("div", {
                        className: "action-group"
                    }, n.createElement("input", {
                        type: "button",
                        className: "btn inline-btn gray-btn",
                        value: o.cancel,
                        onClick: this.props.onClose
                    }), n.createElement("input", {
                        type: "button",
                        className: "btn primary-btn inline-btn",
                        value: o.submit,
                        onClick: this._submitFeedback
                    })))
                }
            });
        e.exports = h
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(13),
            o = s.getModule("personalSetting"),
            a = r(31),
            l = r(73),
            c = r(50),
            u = r(10),
            h = n.PropTypes,
            p = n.createClass({
                displayName: "UserBaseInfo",
                mixins: [l, i.listenTo(c, "_userStoreListener")],
                propTypes: {
                    onClose: h.func.isRequired,
                    onUserInfoChange: h.func.isRequired
                },
                getInitialState: function() {
                    return {
                        error: null
                    }
                },
                _userStoreListener: function(e) {
                    var r = e.type;
                    switch (r) {
                        case "modifyUserBaseInfo":
                            var n = a.getUserInfo();
                            n.userAvatar = e.data.userAvatar, n.nickname = e.data.nickname, n.articleVisible = e.data.articleVisible, a.setUserInfo(n), this.props.onUserInfoChange(n), t.messagebar("show", o.baseInfoSuccess), this.props.onClose()
                    }
                },
                _onModifyBaseInfo: function(e) {
                    return e.preventDefault(), this.isBlank(this.refs.nickname.getDOMNode().value) ? void this.setState({
                        error: o.nicknameNull
                    }) : this.isNickname(this.refs.nickname.getDOMNode().value) ? void u.modifyUserBaseInfo({
                        userAvatar: this.refs.avatarPreviewer.getDOMNode().src,
                        nickname: this.refs.nickname.getDOMNode().value,
                        articleVisible: this.refs.spaceOpen.getDOMNode().checked ? 1 : 0
                    }) : void this.setState({
                        error: o.nicknameIncorrect
                    })
                },
                _onAvatarChanged: function(e) {
                    var t = e.target,
                        r = this.refs.avatarPreviewer.getDOMNode();
                    if (t.files && t.files[0] && FileReader) {
                        var n = new FileReader;
                        n.onload = function(e) {
                            r.src = e.target.result
                        }, n.readAsDataURL(t.files[0])
                    }
                },
                _clearErrorMsg: function(e) {
                    e.preventDefault(), this.setState({
                        error: ""
                    })
                },
                render: function() {
                    var e = a.getUserInfo();
                    return n.createElement("div", {
                        className: "personal-setting-tabpanel user-base-info"
                    }, n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        className: "control-label"
                    }, o.avatar), n.createElement("div", {
                        className: "control-value"
                    }, n.createElement("img", {
                        className: "user-avatar",
                        src: e.userAvatar,
                        ref: "avatarPreviewer"
                    }), n.createElement("div", {
                        className: "choose"
                    }, n.createElement("input", {
                        type: "file",
                        name: "file",
                        ref: "userAvatar",
                        className: "file",
                        onChange: this._onAvatarChanged
                    }), n.createElement("div", {
                        className: "upload"
                    }, o.chooseNew), n.createElement("div", {
                        className: "text-warning"
                    }, o.avatarWarning), n.createElement("div", {
                        className: "text-warning"
                    }, o.avatarSize)))), n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "nickname",
                        className: "control-label required"
                    }, o.nickname), n.createElement("div", {
                        className: "control-value"
                    }, n.createElement("input", {
                        type: "text",
                        name: "nickname",
                        ref: "nickname",
                        defaultValue: e.nickname,
                        onFocus: this._clearErrorMsg
                    }))), n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "spaceOpen",
                        className: "control-label"
                    }, o.spaceOpen), n.createElement("div", {
                        className: "control-value space-control"
                    }, n.createElement("input", {
                        type: "checkbox",
                        name: "spaceOpen",
                        className: "space-open",
                        ref: "spaceOpen",
                        defaultChecked: 1 === e.articleVisible
                    }), n.createElement("span", null, o.spaceOpenWarning))), n.createElement("div", {
                        className: "error-message"
                    }, this.state.error), n.createElement("div", {
                        className: "action-group"
                    }, n.createElement("input", {
                        type: "button",
                        className: "btn inline-btn gray-btn",
                        value: o.cancel,
                        onClick: this.props.onClose
                    }), n.createElement("input", {
                        type: "button",
                        className: "btn primary-btn inline-btn",
                        value: o.save,
                        onClick: this._onModifyBaseInfo
                    })))
                }
            });
        e.exports = p
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(13),
            o = s.getModule("personalSetting"),
            a = r(10),
            l = r(50),
            c = r(73),
            u = n.createClass({
                displayName: "ModifyPassword",
                mixins: [c, i.listenTo(l, "_userStoreListener")],
                propTypes: {
                    onClose: n.PropTypes.func.isRequired
                },
                getInitialState: function() {
                    return {
                        error: null
                    }
                },
                _userStoreListener: function(e) {
                    var r = e.type;
                    switch (r) {
                        case "modifyPassword":
                            1 === e.data.result ? (t.messagebar("show", o.passwordSuccess), this.props.onClose()) : this.setState({
                                error: e.data.message
                            })
                    }
                },
                _modifyPassword: function(e) {
                    e.preventDefault();
                    var t = this.refs.oldPassword.getDOMNode().value,
                        r = this.refs.password.getDOMNode().value,
                        n = this.refs.rePassword.getDOMNode().value;
                    return t && r && n ? r !== n ? void this.setState({
                        error: o.passwordNotSame
                    }) : this.isPassword(r) ? void a.modifyPassword({
                        oldPassword: t,
                        password: r
                    }) : void this.setState({
                        error: o.passwordIncorrect
                    }) : void this.setState({
                        error: o.passwordNull
                    })
                },
                _clearErrorMsg: function(e) {
                    e.preventDefault(), this.setState({
                        error: ""
                    })
                },
                render: function() {
                    return n.createElement("div", {
                        className: "personal-setting-tabpanel modify-password"
                    }, n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "oldPassword",
                        className: "control-label required"
                    }, o.oldPassword), n.createElement("div", {
                        className: "control-value"
                    }, n.createElement("input", {
                        type: "password",
                        name: "oldPassword",
                        ref: "oldPassword",
                        placeholder: o.oldPassword,
                        onFocus: this._clearErrorMsg
                    }))), n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "password",
                        className: "control-label required"
                    }, o.password), n.createElement("div", {
                        className: "control-value"
                    }, n.createElement("input", {
                        type: "password",
                        name: "password",
                        ref: "password",
                        placeholder: o.password,
                        onFocus: this._clearErrorMsg
                    }))), n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "rePassword",
                        className: "control-label required"
                    }, o.rePassword), n.createElement("div", {
                        className: "control-value"
                    }, n.createElement("input", {
                        type: "password",
                        name: "rePassword",
                        ref: "rePassword",
                        placeholder: o.rePassword,
                        onFocus: this._clearErrorMsg
                    }))), n.createElement("div", {
                        className: "error-message"
                    }, this.state.error), n.createElement("div", {
                        className: "action-group"
                    }, n.createElement("input", {
                        type: "button",
                        className: "btn inline-btn gray-btn",
                        value: o.cancel,
                        onClick: this.props.onClose
                    }), n.createElement("input", {
                        type: "button",
                        className: "btn primary-btn inline-btn",
                        value: o.save,
                        onClick: this._modifyPassword
                    })))
                }
            });
        e.exports = u
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(13),
            o = s.getModule("personalSetting"),
            a = r(31),
            l = r(73),
            c = r(9),
            u = r(74),
            h = r(10),
            p = r(50),
            d = n.createClass({
                displayName: "UserPhone",
                mixins: [l, i.listenTo(p, "_userStoreListener")],
                propTypes: {
                    onClose: n.PropTypes.func.isRequired
                },
                getInitialState: function() {
                    return {
                        countdown: !1,
                        error: null
                    }
                },
                _userStoreListener: function(e) {
                    var r = e.type;
                    switch (r) {
                        case "sendCaptchaPhone":
                            e.data.result !== c.request.success && this.setState({
                                countdown: !1,
                                error: e.data.message
                            });
                            break;
                        case "modifyPhone":
                            var n = a.getUserInfo();
                            n.phone = e.data.phone, a.setUserInfo(n), t.messagebar("show", o.phoneSuccess), this.props.onClose()
                    }
                },
                _modifyPhone: function(e) {
                    e.preventDefault();
                    var t = this.refs.phone.getDOMNode().value,
                        r = this.refs.captcha.getDOMNode().value;
                    return this.isBlank(t) || this.isBlank(r) ? void this.setState({
                        error: o.phoneCaptchaNull
                    }) : this.isPhone(t) ? void h.modifyPhone({
                        phone: t,
                        captcha: r
                    }) : void this.setState({
                        error: o.phoneIncorrect
                    })
                },
                _sendCaptcha: function(e) {
                    e.preventDefault();
                    var t = this.refs.phone.getDOMNode().value;
                    return this.isBlank(t) ? void this.setState({
                        error: o.phoneNull
                    }) : this.isPhone(t) ? (this.setState({
                        countdown: !0
                    }), void h.sendCaptchaPhone({
                        account: t
                    })) : void this.setState({
                        error: o.phoneIncorrect
                    })
                },
                _countdownStop: function() {
                    this.setState({
                        countdown: !1
                    })
                },
                _clearErrorMsg: function(e) {
                    e.preventDefault(), this.setState({
                        error: ""
                    })
                },
                render: function() {
                    var e = null;
                    e = this.state.countdown ? n.createElement("button", {
                        className: "btn empty-btn captcha-btn"
                    }, n.createElement(u, {
                        onStop: this._countdownStop
                    }), n.createElement("span", null, o.verificationUnit)) : n.createElement("button", {
                        className: "btn primary-btn empty-btn",
                        onClick: this._sendCaptcha
                    }, o.getCaptcha);
                    var t = a.getUserInfo(),
                        r = null;
                    return t && t.phone && (r = n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "email",
                        className: "control-label"
                    }, o.oldPhone), n.createElement("div", {
                        className: "control-value"
                    }, n.createElement("input", {
                        type: "text",
                        name: "oldPhone",
                        ref: "oldPhone",
                        value: t.phone,
                        disabled: !0
                    })))), n.createElement("div", {
                        className: "personal-setting-tabpanel modify-user-phone"
                    }, r, n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "phone",
                        className: "control-label required"
                    }, o.phone), n.createElement("div", {
                        className: "control-value"
                    }, n.createElement("input", {
                        type: "text",
                        name: "phone",
                        ref: "phone",
                        placeholder: o.phoneInput,
                        onFocus: this._clearErrorMsg
                    }))), n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "captcha",
                        className: "control-label required"
                    }, o.captcha), n.createElement("div", {
                        className: "control-value captcha-control"
                    }, n.createElement("input", {
                        className: "captcha-input",
                        type: "text",
                        name: "captcha",
                        ref: "captcha",
                        placeholder: o.captchaInput,
                        onFocus: this._clearErrorMsg
                    }), e)), n.createElement("div", {
                        className: "error-message"
                    }, this.state.error), n.createElement("div", {
                        className: "action-group"
                    }, n.createElement("input", {
                        type: "button",
                        className: "btn inline-btn gray-btn",
                        value: o.cancel,
                        onClick: this.props.onClose
                    }), n.createElement("input", {
                        type: "button",
                        className: "btn primary-btn inline-btn",
                        value: o.save,
                        onClick: this._modifyPhone
                    })))
                }
            });
        e.exports = d
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(13),
            o = s.getModule("personalSetting"),
            a = r(31),
            l = r(9),
            c = r(74),
            u = r(73),
            h = r(10),
            p = r(50),
            d = n.createClass({
                displayName: "UserMail",
                mixins: [u, i.listenTo(p, "_userStoreListener")],
                propTypes: {
                    onClose: n.PropTypes.func.isRequired
                },
                getInitialState: function() {
                    return {
                        countdown: !1,
                        error: null
                    }
                },
                _userStoreListener: function(e) {
                    var r = e.type;
                    switch (r) {
                        case "sendCaptchaMail":
                            e.data.result !== l.request.success && this.setState({
                                countdown: !1,
                                error: e.data.message
                            });
                            break;
                        case "modifyMail":
                            var n = a.getUserInfo();
                            n.email = e.data.email, a.setUserInfo(n), t.messagebar("show", o.emailSuccess), this.props.onClose()
                    }
                },
                _modifyMail: function(e) {
                    e.preventDefault();
                    var t = this.refs.email.getDOMNode().value,
                        r = this.refs.captcha.getDOMNode().value;
                    return this.isBlank(t) || this.isBlank(r) ? void this.setState({
                        error: o.emailCaptchaNull
                    }) : this.isEmail(t) ? void h.modifyMail({
                        email: t,
                        captcha: r
                    }) : void this.setState({
                        error: o.emailIncorrect
                    })
                },
                _sendCaptcha: function() {
                    var e = this.refs.email.getDOMNode().value;
                    return this.isBlank(e) ? void this.setState({
                        error: o.emailNull
                    }) : this.isEmail(e) ? (this.setState({
                        countdown: !0
                    }), void h.sendCaptchaMail({
                        account: e
                    })) : void this.setState({
                        error: o.emailIncorrect
                    })
                },
                _countdownStop: function() {
                    this.setState({
                        countdown: !1
                    })
                },
                _clearErrorMsg: function(e) {
                    e.preventDefault(), this.setState({
                        error: ""
                    })
                },
                render: function() {
                    var e = null;
                    e = this.state.countdown ? n.createElement("button", {
                        className: "btn empty-btn captcha-btn"
                    }, n.createElement(c, {
                        onStop: this._countdownStop
                    }), n.createElement("span", null, o.verificationUnit)) : n.createElement("button", {
                        className: "btn primary-btn empty-btn",
                        onClick: this._sendCaptcha
                    }, o.getCaptcha);
                    var t = a.getUserInfo(),
                        r = null;
                    return t && t.email && (r = n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "email",
                        className: "control-label"
                    }, o.oldEmail), n.createElement("div", {
                        className: "control-value"
                    }, n.createElement("input", {
                        type: "text",
                        name: "oldEmail",
                        ref: "oldEmail",
                        value: t.email,
                        disabled: !0
                    })))), n.createElement("div", {
                        className: "personal-setting-tabpanel modify-user-email"
                    }, r, n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "email",
                        className: "control-label required"
                    }, o.email), n.createElement("div", {
                        className: "control-value"
                    }, n.createElement("input", {
                        type: "text",
                        name: "email",
                        ref: "email",
                        placeholder: o.emailInput,
                        onFocus: this._clearErrorMsg
                    }))), n.createElement("div", {
                        className: "control-group"
                    }, n.createElement("label", {
                        htmlFor: "captcha",
                        className: "control-label required"
                    }, o.captcha), n.createElement("div", {
                        className: "control-value captcha-control"
                    }, n.createElement("input", {
                        className: "captcha-input",
                        type: "text",
                        name: "captcha",
                        placeholder: o.captchaInput,
                        ref: "captcha",
                        onFocus: this._clearErrorMsg
                    }), e)), n.createElement("div", {
                        className: "error-message"
                    }, this.state.error), n.createElement("div", {
                        className: "action-group"
                    }, n.createElement("input", {
                        type: "button",
                        className: "btn inline-btn gray-btn",
                        value: o.cancel,
                        onClick: this.props.onClose
                    }), n.createElement("input", {
                        type: "button",
                        className: "btn primary-btn inline-btn",
                        value: o.save,
                        onClick: this._modifyMail
                    })))
                }
            });
        e.exports = d
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(81),
            o = r(13),
            a = r(42),
            l = r(44),
            c = r(14),
            u = (r(50), r(9), r(119)),
            h = s,
            p = h.Table,
            d = h.Column,
            f = o.getModule("traderOpenPanel"),
            m = o.getModule("cmdType"),
            g = n.createClass({
                displayName: "TraderOpenPanelTable",
                mixins: [i.listenTo(l, "_orderStoreListener")],
                propTypes: {
                    width: n.PropTypes.number.isRequired
                },
                getDefaultProps: function() {
                    return {
                        headers: [{
                            label: f.number,
                            width: .08,
                            dataKey: "order",
                            sortable: !0,
                            order: "desc"
                        }, {
                            label: f.breed,
                            width: .08,
                            dataKey: "symbol",
                            sortable: !0
                        }, {
                            label: f.type,
                            width: .08,
                            dataKey: "cmd",
                            sortable: !0
                        }, {
                            label: f.amount,
                            width: .06,
                            dataKey: "volume",
                            sortable: !0
                        }, {
                            label: f.open,
                            width: .14,
                            dataKey: "open_time",
                            sortable: !1
                        }, {
                            label: f.price,
                            width: .08,
                            dataKey: "open_price",
                            sortable: !1
                        }, {
                            label: f.stop,
                            width: .08,
                            dataKey: "sl",
                            sortable: !1
                        }, {
                            label: f.surplus,
                            width: .08,
                            dataKey: "tp",
                            sortable: !1
                        }, {
                            label: f.current,
                            width: .08,
                            dataKey: "current_price",
                            sortable: !1
                        }, {
                            label: f.commission,
                            width: .07,
                            dataKey: "commission",
                            sortable: !1
                        }, {
                            label: f.interest,
                            width: .07,
                            dataKey: "storage",
                            sortable: !1
                        }, {
                            label: f.profit,
                            width: .07,
                            dataKey: "profit",
                            sortable: !0
                        }, {
                            label: "",
                            width: .03,
                            dataKey: "remove",
                            sortable: !1
                        }]
                    }
                },
                getInitialState: function() {
                    return this.quotes = [], this.pageSize = 20, this.pageNow = 1, this.allOrders = [], {
                        positionDatas: [],
                        pageNow: 1,
                        totalPage: 0
                    }
                },
                componentWillMount: function() {
                    a.getOpenPositions()
                },
                _orderStoreListener: function(e) {
                    if ("openOrder" === e.type) {
                        var t = e.openOrders.sort(function(e, t) {
                            return e.open_time - t.open_time
                        });
                        this.allOrders = t, this.setState(this._getPageOrders(t, this.pageNow))
                    }
                },
                _getPageOrders: function(e, t) {
                    var r = Math.ceil(e.length / this.pageSize),
                        n = (t - 1) * this.pageSize,
                        i = n + this.pageSize,
                        s = e.slice(n, i);
                    return {
                        positionDatas: s,
                        pageNow: t,
                        totalPage: r
                    }
                },
                _loadPage: function(e) {
                    t.waitLoading("show", this.getDOMNode()), this.pageNow = e, this.setState(this._getPageOrders(this.allOrders, e)), t.waitLoading("hide", this.getDOMNode())
                },
                _modifyOrder: function(e, t, r) {
                    this.props.modifyOrder(r)
                },
                _closeOrder: function(e, r) {
                    r.stopPropagation();
                    var n = {
                        order: e.order,
                        price: Number(e.current_price),
                        volume: Number(e.volume),
                        symbol: e.symbol,
                        openPrice: Number(e.open_price),
                        ask: e.ask,
                        bid: e.bid,
                        cmd: e.cmd
                    };
                    a.closeOrder([n], t(this.getDOMNode()).closest(".tabview"))
                },
                render: function() {
                    var e = this,
                        t = this.state.positionDatas,
                        r = t.length,
                        i = function(e) {
                            return t[e]
                        },
                        s = function(e) {
                            var t = e.index,
                                r = e.header,
                                n = r.dataKey,
                                i = r.order;
                            if ("desc" === i) {
                                var s = this.state.positionDatas.sort(function(e, t) {
                                    return e[n] - t[n]
                                });
                                this.props.headers[t].order = "asc"
                            } else {
                                var s = this.state.positionDatas.sort(function(e, t) {
                                    return t[n] - e[n]
                                });
                                this.props.headers[t].order = "desc"
                            }
                            this.setState({
                                positionDatas: s,
                                headers: this.props.headers
                            })
                        },
                        o = function(t, r, i, o, a) {
                            var l = null,
                                c = i.header,
                                u = "";
                            return c.sortable && (l = s.bind(e, i), u = c.order), n.createElement("div", {
                                className: u,
                                onClick: l
                            }, t)
                        },
                        a = function(t, r, i, s, o, a) {
                            switch (r) {
                                case "volume":
                                    return t ? t / 100 : t;
                                case "open_time":
                                    return t ? c.formatUTCDate(t) : t;
                                case "cmd":
                                    return m[t];
                                case "open_price":
                                case "sl":
                                case "tp":
                                case "current_price":
                                    return t = t ? t : 0, 0 === t ? 0 : t instanceof Number ? t.toFixed(i.digits) : Number(t).toFixed(i.digits);
                                case "commission":
                                case "storage":
                                    return t ? Number(t).toFixed(2) : t;
                                case "profit":
                                    return t = t ? t : 0, n.createElement("div", {
                                        className: Number(t) > 0 ? "up" : "down"
                                    }, Number(t).toFixed(2));
                                case "remove":
                                    return n.createElement("div", {
                                        className: "remove",
                                        onClick: e._closeOrder.bind(e, i)
                                    });
                                default:
                                    return t
                            }
                        },
                        l = this.props.width,
                        h = this.props.headers.map(function(e, t) {
                            return n.createElement(d, {
                                align: "center",
                                label: e.label,
                                width: l * e.width,
                                dataKey: e.dataKey,
                                headerRenderer: o,
                                cellRenderer: a,
                                columnData: {
                                    index: t,
                                    header: e
                                }
                            })
                        }),
                        f = this.state.totalPage > 1 ? n.createElement(u, {
                            pageNow: this.state.pageNow,
                            totalPage: this.state.totalPage,
                            go: this._loadPage
                        }) : null;
                    return n.createElement("div", null, n.createElement(p, {
                        onRowDoubleClick: this._modifyOrder,
                        rowHeight: 30,
                        rowGetter: i,
                        rowsCount: r,
                        width: l,
                        maxHeight: 3e3,
                        headerHeight: 30,
                        overflowX: "hidden"
                    }, h), f)
                }
            });
        e.exports = g
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";

        function n(e) {
            if (0 === e) return 1;
            for (var t = "0.", r = 0; e > r; r++) t += r === e - 1 ? "1" : "0";
            return Number(t)
        }
        var i = r(27),
            s = r(25),
            o = r(36),
            a = r(13),
            l = a.getModule("cmdType"),
            c = a.getModule("modifyOpenOrder"),
            u = r(42),
            h = r(126),
            p = r(44),
            d = r(52),
            f = r(117),
            m = r(186),
            g = r(203),
            v = i.createClass({
                displayName: "ModifyMarketOrderWin",
                getInitialState: function() {
                    return {
                        selectedIndex: 0
                    }
                },
                render: function() {
                    if (0 === Object.keys(this.props).length) return null;
                    var e = this,
                        t = {
                            tabs: [{
                                tab: c.tab1,
                                styleName: "trader-tab-open",
                                enableRemove: !1,
                                panel: i.createElement(y, {
                                    order: this.props.order,
                                    onClose: this.props.onClose
                                })
                            }, {
                                tab: c.tab2,
                                styleName: "trader-tab-pending",
                                enableRemove: !1,
                                panel: i.createElement(b, {
                                    order: this.props.order,
                                    onClose: this.props.onClose
                                })
                            }]
                        };
                    return t.afterSelected = function(t, r) {
                        e.setState({
                            selectedIndex: r.selectedIndex
                        })
                    }, t.selectedIndex = this.state.selectedIndex, i.createElement("div", {
                        className: "order-operation-panel order-modify-panel"
                    }, i.createElement("div", {
                        className: "order-info-wrapper"
                    }, i.createElement("div", {
                        className: "order-info"
                    }, i.createElement("span", null, "#", this.props.order.order, "#"), i.createElement("span", null, l[this.props.order.cmd]), i.createElement("span", null, this.props.order.volume / 100), i.createElement("span", null, this.props.order.symbol))), i.createElement(o, i.__spread({}, t)))
                }
            }),
            y = i.createClass({
                displayName: "ModifyMarketOrder",
                mixins: [s.listenTo(p, "_orderStoreListener"), s.listenTo(d, "_symbolStoreListener")],
                getInitialState: function() {
                    this.orderData = this.props.order, this.step = n(this.orderData.digits), this.slOp = this._getOp("sl"), this.tpOp = this._getOp("tp");
                    var e = d.symbolList.find(function(e) {
                        return e.symbol === this.orderData.symbol
                    }.bind(this));
                    return {
                        currentPrice: Number(this.orderData.current_price ? this.orderData.current_price : 0),
                        previewPrice: null,
                        slCheck: this.orderData.sl ? !0 : !1,
                        tpCheck: this.orderData.tp ? !0 : !1,
                        step: this.step,
                        slLimitPrice: this._getLimitPrice(e, "sl"),
                        tpLimitPrice: this._getLimitPrice(e, "tp"),
                        slDefaultLimitPrice: this.orderData.sl ? this.orderData.sl : null,
                        tpDefaultLimitPrice: this.orderData.tp ? this.orderData.tp : null,
                        errorMessages: []
                    }
                },
                _symbolStoreListener: function(e) {
                    if ("pushSymbolList" === e.type) {
                        var t = this.orderData.symbol,
                            r = e.allQuoteSymbols.find(function(e) {
                                return e.symbol === t
                            });
                        if (r) {
                            var n = 0 === this.orderData.cmd ? Number(r.bid) : Number(r.ask);
                            this.setState({
                                currentPrice: n,
                                previewPrice: this.state.currentPrice,
                                slLimitPrice: this._getLimitPrice(r, "sl"),
                                tpLimitPrice: this._getLimitPrice(r, "tp")
                            })
                        }
                    }
                },
                _orderStoreListener: function(e) {
                    "modifyOrder" === e.type && this.props.onClose()
                },
                _getLimitPrice: function(e, t) {
                    if (!e) return 0;
                    var r = 0,
                        n = f.getSymbolByName(e.symbol);
                    return 0 === this.orderData.cmd ? r = "sl" === t ? new m(e.bid).minus(this.step * n.stops_level).toNumber() : new m(e.bid).plus(this.step * n.stops_level).toNumber() : 1 === this.orderData.cmd && (r = "sl" === t ? new m(e.ask).plus(this.step * n.stops_level).toNumber() : new m(e.ask).minus(this.step * n.stops_level).toNumber()), r
                },
                _getOp: function(e) {
                    var t = "";
                    return 0 === this.orderData.cmd ? t = "sl" === e ? "<=" : ">=" : 1 === this.orderData.cmd && (t = "sl" === e ? ">=" : "<="), t
                },
                _slClick: function() {
                    var e = {},
                        t = !this.state.slCheck;
                    e.slCheck = t, t ? e.slDefaultLimitPrice = this.orderData.sl ? this.orderData.sl : this.state.slLimitPrice : e.slDefaultLimitPrice = null, this.setState(e)
                },
                _tpClick: function() {
                    var e = {},
                        t = !this.state.tpCheck;
                    e.tpCheck = t, t ? e.tpDefaultLimitPrice = this.orderData.tp ? this.orderData.tp : this.state.tpLimitPrice : e.tpDefaultLimitPrice = null, this.setState(e)
                },
                _parseOrderParam: function() {
                    var e = this.orderData.order,
                        t = this.orderData.open_price,
                        r = this.orderData.sl,
                        n = this.orderData.tp,
                        i = this.refs.sl.value(),
                        s = this.refs.tp.value(),
                        o = this.refs.comment.getDOMNode().value,
                        a = this.orderData.cmd,
                        l = this.orderData.volume,
                        c = this.orderData.symbol;
                    return {
                        order: e,
                        cmd: a,
                        symbol: c,
                        volume: l,
                        price: Number(t),
                        sl: i ? i : null,
                        tp: s ? s : null,
                        oldSl: r ? r : null,
                        oldTp: n ? n : null,
                        comment: o
                    }
                },
                _submitCheck: function(e) {
                    var t = [],
                        r = !0,
                        n = !0,
                        i = !0;
                    return e.sl && ("<=" === this.slOp ? (r = e.sl <= this.state.slLimitPrice ? !0 : !1, r || t.push({
                        key: "sl",
                        msg: c.slPriceError
                    })) : (r = e.sl >= this.state.slLimitPrice ? !0 : !1, r || t.push({
                        key: "sl",
                        msg: c.slPriceError
                    }))), e.tp && ("<=" === this.tpOp ? (n = e.tp <= this.state.tpLimitPrice ? !0 : !1, n || t.push({
                        key: "tp",
                        msg: c.tpPriceError
                    })) : (n = e.tp >= this.state.tpLimitPrice ? !0 : !1, n || t.push({
                        key: "tp",
                        msg: c.tpPriceError
                    }))), i = e.comment.length > 20 ? !1 : !0, i || t.push({
                        key: "comment",
                        msg: c.commentError
                    }), t.length > 0 && this.setState({
                        errorMessages: t
                    }), r && n && i
                },
                _submit: function() {
                    var e = this._parseOrderParam();
                    this._submitCheck(e) && u.changeOrder(e, t(this.getDOMNode()).closest(".dialog"))
                },
                _clearMsg: function(e) {
                    var t = this.state.errorMessages.filter(function(t) {
                        return t.key !== e
                    });
                    this.setState({
                        errorMessages: t
                    })
                },
                render: function() {
                    var e = this.state,
                        t = e.errorMessages.map(function(e) {
                            return i.createElement("div", {
                                className: "error-message"
                            }, e.msg)
                        });
                    return i.createElement("div", {
                        className: "market-modify-panel"
                    }, i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.currentPrice), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(g, {
                        preview: e.previewPrice,
                        current: e.currentPrice,
                        scale: this.orderData.digits
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        ref: "slCheck",
                        checked: this.state.slCheck,
                        onClick: this._slClick
                    }), i.createElement("label", null, c.slPrice)), i.createElement("div", {
                        className: "control-value price-limit-wrapper"
                    }, i.createElement(h, {
                        disabled: !e.slCheck,
                        min: 0,
                        max: 1e4,
                        step: this.step,
                        value: e.slDefaultLimitPrice,
                        ref: "sl",
                        onBlur: this._clearMsg.bind(this, "sl")
                    }), i.createElement("div", {
                        className: "price-limit"
                    }, i.createElement("label", null, this.slOp), i.createElement("label", null, e.slLimitPrice.toFixed(this.orderData.digits))))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        ref: "tpCheck",
                        checked: this.state.tpCheck,
                        onClick: this._tpClick
                    }), i.createElement("label", null, c.tpPrice)), i.createElement("div", {
                        className: "control-value price-limit-wrapper"
                    }, i.createElement(h, {
                        disabled: !e.tpCheck,
                        min: 0,
                        max: 1e4,
                        step: this.step,
                        value: e.tpDefaultLimitPrice,
                        ref: "tp",
                        onBlur: this._clearMsg.bind(this, "tp")
                    }), i.createElement("div", {
                        className: "price-limit"
                    }, i.createElement("label", null, this.tpOp), i.createElement("label", null, e.tpLimitPrice.toFixed(this.orderData.digits))))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.comment), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement("input", {
                        type: "text",
                        ref: "comment",
                        defaultValue: this.orderData.comment,
                        onBlur: this._clearMsg.bind(this, "comment")
                    }))), t, i.createElement("div", {
                        className: "action-group"
                    }, i.createElement("button", {
                        className: "btn gray-btn inline-btn",
                        onClick: this.props.onClose
                    }, c.cancel), i.createElement("button", {
                        className: "btn primary-btn inline-btn",
                        onClick: this._submit
                    }, c.confirm)))
                }
            }),
            b = i.createClass({
                displayName: "CloseMarketOrder",
                mixins: [s.listenTo(p, "_orderStoreListener"), s.listenTo(d, "_symbolStoreListener")],
                orderData: null,
                minimum: .01,
                getInitialState: function() {
                    this.orderData = this.props.order;
                    var e = f.getGroupBySymbol(this.orderData.symbol);
                    return this.minimum = e && e.minimum > 0 ? e.minimum : this.minimum, this.quote = {}, this.preProfit = Number(this.orderData.profit), {
                        previewPrice: null,
                        currentPrice: Number(this.orderData.current_price ? this.orderData.current_price : 0),
                        currentProfit: Number(this.orderData.profit),
                        preProfit: Number(this.orderData.profit),
                        errorMessages: []
                    }
                },
                _symbolStoreListener: function(e) {
                    if ("pushSymbolList" === e.type) {
                        var t = this.orderData.symbol,
                            r = e.allQuoteSymbols.find(function(e) {
                                return e.symbol === t
                            });
                        r && (this.quote = r, this.setState({
                            previewPrice: this.state.currentPrice,
                            currentPrice: 0 === this.orderData.cmd ? Number(r.bid) : Number(r.ask),
                            preProfit: Number(this.preProfit),
                            currentProfit: Number(this.orderData.profit)
                        }), this.preProfit = this.state.currentProfit)
                    }
                },
                _orderStoreListener: function(e) {
                    "closeOrder" === e.type && this.props.onClose()
                },
                _parseOrder: function() {
                    var e = this.orderData.order,
                        t = this.state.currentPrice,
                        r = this.refs.volume.value(),
                        n = this.refs.comment.getDOMNode().value,
                        i = this.orderData.cmd,
                        s = this.orderData.open_price,
                        o = this.orderData.symbol;
                    return {
                        symbol: o,
                        cmd: i,
                        openPrice: s,
                        order: e,
                        price: Number(t),
                        volume: 100 * Number(r),
                        comment: n,
                        ask: this.quote.ask ? this.quote.ask : this.orderData.ask,
                        bid: this.quote.bid ? this.quote.bid : this.orderData.bid
                    }
                },
                _submit: function() {
                    var e = this._parseOrder();
                    this._submitCheck(e) && u.closeOrder([e], t(this.getDOMNode()).closest(".dialog"))
                },
                _submitCheck: function(e) {
                    var t = [],
                        r = !0,
                        n = !0;
                    return r = e.volume > 0 && e.volume >= 100 * this.minimum && e.volume <= this.orderData.volume ? !0 : !1, r || t.push({
                        key: "volume",
                        msg: c.volumeError
                    }), n = e.comment.length <= 20 ? !0 : !1, n || t.push({
                        key: "comment",
                        msg: c.commentError
                    }), t.length > 0 && this.setState({
                        errorMessages: t
                    }), r && n
                },
                _clearMsg: function(e) {
                    var t = this.state.errorMessages.filter(function(t) {
                        return t.key !== e
                    });
                    this.setState({
                        errorMessages: t
                    })
                },
                render: function() {
                    var e = this.state,
                        t = e.errorMessages.map(function(e) {
                            return i.createElement("div", {
                                className: "error-message"
                            }, e.msg)
                        });
                    return i.createElement("div", null, i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.currentPrice), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(g, {
                        preview: e.previewPrice,
                        current: e.currentPrice,
                        scale: this.orderData.digits
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.profit), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(g, {
                        preview: e.preProfit,
                        current: e.currentProfit,
                        scale: 2
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.closeVolume), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(h, {
                        min: this.minimum,
                        max: this.orderData.volume / 100,
                        step: this.minimum,
                        ref: "volume",
                        onBlur: this._clearMsg.bind(this, "volume")
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, c.comment), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement("input", {
                        type: "text",
                        ref: "comment",
                        defaultValue: this.orderData.comment,
                        onBlur: this._clearMsg.bind(this, "comment")
                    }))), t, i.createElement("div", {
                        className: "action-group"
                    }, i.createElement("button", {
                        className: "btn gray-btn inline-btn",
                        onClick: this.props.onClose
                    }, c.cancel), i.createElement("button", {
                        className: "btn primary-btn inline-btn",
                        onClick: this._submit
                    }, c.confirm)))
                }
            });
        e.exports = v
    }).call(t, r(28))
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        var r = s.mergeProps(t, e.props);
        return !r.hasOwnProperty(a) && e.props.hasOwnProperty(a) && (r.children = e.props.children), i.createElement(e.type, r)
    }
    var i = r(152),
        s = r(205),
        o = r(128),
        a = (r(130), o({
            children: null
        }));
    e.exports = n
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(27),
            i = r(25),
            s = r(81),
            o = r(13),
            a = r(42),
            l = r(44),
            c = r(14),
            u = (r(50), r(9), s),
            h = u.Table,
            p = u.Column,
            d = o.getModule("traderPendingPanel"),
            f = o.getModule("cmdType"),
            m = n.createClass({
                displayName: "TraderPendingPanelTable",
                mixins: [i.listenTo(l, "_orderStoreListener")],
                propTypes: {
                    width: n.PropTypes.number.isRequired
                },
                getDefaultProps: function() {
                    return {
                        headers: [{
                            label: d.number,
                            width: .1,
                            dataKey: "order",
                            sortable: !0,
                            order: "desc"
                        }, {
                            label: d.breed,
                            width: .1,
                            dataKey: "symbol",
                            sortable: !0
                        }, {
                            label: d.type,
                            width: .1,
                            dataKey: "cmd",
                            sortable: !0
                        }, {
                            label: d.amount,
                            width: .1,
                            dataKey: "volume",
                            sortable: !0
                        }, {
                            label: d.open,
                            width: .2,
                            dataKey: "open_time",
                            sortable: !1
                        }, {
                            label: d.price,
                            width: .1,
                            dataKey: "open_price",
                            sortable: !1
                        }, {
                            label: d.stop,
                            width: .09,
                            dataKey: "sl",
                            sortable: !1
                        }, {
                            label: d.surplus,
                            width: .09,
                            dataKey: "tp",
                            sortable: !1
                        }, {
                            label: d.current,
                            width: .09,
                            dataKey: "current_price",
                            sortable: !1
                        }, {
                            label: "",
                            width: .03,
                            dataKey: "delete",
                            sortable: !1
                        }]
                    }
                },
                getInitialState: function() {
                    return {
                        positionDatas: []
                    }
                },
                _orderStoreListener: function(e) {
                    "pendingOrder" === e.type && this.setState({
                        positionDatas: e.pendingOrders.sort(function(e, t) {
                            return e.open_time - t.open_time
                        })
                    })
                },
                _modifyOrder: function(e, t, r) {
                    this.props.modifyOrder(r)
                },
                _deleteOrder: function(e, r) {
                    r.stopPropagation();
                    var n = {
                        order: e.order,
                        symbol: e.symbol,
                        cmd: e.cmd,
                        volume: e.volume,
                        price: e.open_price,
                        ask: e.ask,
                        bid: e.bid
                    };
                    a.deleteOrder([n], t(this.getDOMNode()).closest(".tabview"))
                },
                render: function() {
                    var e = this,
                        t = this.state.positionDatas,
                        r = function(e) {
                            return t[e]
                        },
                        i = function(e) {
                            var t = e.index,
                                r = e.header,
                                n = r.dataKey,
                                i = r.order;
                            if ("desc" === i) {
                                var s = this.state.positionDatas.sort(function(e, t) {
                                    return e[n] - t[n]
                                });
                                this.props.headers[t].order = "asc"
                            } else {
                                var s = this.state.positionDatas.sort(function(e, t) {
                                    return t[n] - e[n]
                                });
                                this.props.headers[t].order = "desc"
                            }
                            this.setState({
                                positionDatas: s,
                                headers: this.props.headers
                            })
                        },
                        s = function(t, r, s, o, a) {
                            var l = null,
                                c = s.header,
                                u = "";
                            return c.sortable && (l = i.bind(e, s), u = c.order), n.createElement("div", {
                                className: u,
                                onClick: l
                            }, t)
                        },
                        o = function(t, r, i, s, o, a) {
                            switch (r) {
                                case "volume":
                                    return t ? t / 100 : t;
                                case "open_time":
                                    return t ? c.formatUTCDate(t) : t;
                                case "cmd":
                                    return f[t];
                                case "open_price":
                                case "sl":
                                case "tp":
                                case "current_price":
                                    return t = t ? t : 0, 0 === t ? 0 : t instanceof Number ? t.toFixed(i.digits) : Number(t).toFixed(i.digits);
                                case "delete":
                                    return n.createElement("div", {
                                        className: "remove",
                                        onClick: e._deleteOrder.bind(e, i)
                                    });
                                default:
                                    return t
                            }
                        },
                        a = this.props.width,
                        l = this.props.headers.map(function(e, t) {
                            return n.createElement(p, {
                                align: "center",
                                label: e.label,
                                width: a * e.width,
                                dataKey: e.dataKey,
                                headerRenderer: s,
                                cellRenderer: o,
                                columnData: {
                                    index: t,
                                    header: e
                                }
                            })
                        });
                    return n.createElement(h, {
                        onRowDoubleClick: this._modifyOrder,
                        rowHeight: 30,
                        rowGetter: r,
                        rowsCount: t.length,
                        width: a,
                        maxHeight: 600,
                        headerHeight: 30,
                        overflowX: "hidden",
                        overflowY: "hidden"
                    }, l)
                }
            });
        e.exports = m
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";

        function n(e) {
            if (0 === e) return 1;
            for (var t = "0.", r = 0; e > r; r++) t += r === e - 1 ? "1" : "0";
            return Number(t)
        }
        var i = r(27),
            s = r(25),
            o = r(13),
            a = o.getModule("cmdType"),
            l = o.getModule("modifyPendingOrder"),
            c = r(42),
            u = r(126),
            h = r(44),
            p = r(52),
            d = r(117),
            f = r(186),
            m = r(127),
            g = r(9),
            v = r(203),
            y = i.createClass({
                displayName: "ModifyPendingOrder",
                mixins: [s.listenTo(h, "_orderStoreListener")],
                getInitialState: function() {
                    return this.orderData = this.props.order, this.step = n(this.orderData.digits), this.op = this._getOp(), this.slOp = this._getSLOp(), this.tpOp = this._getTPOp(), this.symbolObj = d.getSymbolByName(this.orderData.symbol), {
                        slCheck: this.orderData.sl ? !0 : !1,
                        tpCheck: this.orderData.tp ? !0 : !1,
                        slPrice: this.orderData.sl ? this.orderData.sl : null,
                        tpPrice: this.orderData.tp ? this.orderData.tp : null,
                        slLimitPrice: this._getLimitPriceByOp(this.orderData.open_price, this.slOp),
                        tpLimitPrice: this._getLimitPriceByOp(this.orderData.open_price, this.tpOp),
                        dateCheck: this.orderData.expiration ? !0 : !1,
                        expiration: this.orderData.expiration ? moment.utc(moment.unix(this.orderData.expiration)) : null,
                        errorMessages: []
                    }
                },
                _orderStoreListener: function(e) {
                    ("modifyOrder" === e.type || "deleteOrder" === e.type) && this.props.onClose()
                },
                _getLimitPriceByOp: function(e, t) {
                    var r = 0,
                        n = this.symbolObj ? this.symbolObj.stops_level : 50;
                    return "<=" === t ? r = new f(e).minus(this.step * n).toNumber() : ">=" === t && (r = new f(e).plus(this.step * n).toNumber()), r
                },
                _getSLOp: function() {
                    var e = "",
                        t = this.orderData.cmd;
                    return 2 === t || 4 === t ? e = "<=" : (3 === t || 5 === t) && (e = ">="), e
                },
                _getTPOp: function() {
                    var e = "",
                        t = this.orderData.cmd;
                    return 2 === t || 4 === t ? e = ">=" : (3 === t || 5 === t) && (e = "<="), e
                },
                _getOp: function() {
                    var e = "";
                    return e = 2 === this.orderData.cmd || 5 === this.orderData.cmd ? "<=" : ">="
                },
                _deleteOrder: function() {
                    var e = [];
                    e.push({
                        order: this.orderData.order,
                        symbol: this.orderData.symbol,
                        cmd: this.orderData.cmd,
                        volume: this.orderData.volume,
                        price: this.orderData.open_price,
                        ask: this.orderData.ask,
                        bid: this.orderData.bid
                    }), c.deleteOrder(e)
                },
                _slClick: function() {
                    var e = {},
                        t = !this.state.slCheck;
                    e.slCheck = t, t ? e.slPrice = this.orderData.sl ? this.orderData.sl : this.state.slLimitPrice : e.slPrice = null, this.setState(e)
                },
                _tpClick: function() {
                    var e = {},
                        t = !this.state.tpCheck;
                    e.tpCheck = t, t ? e.tpPrice = this.orderData.tp ? this.orderData.tp : this.state.tpLimitPrice : e.tpPrice = null, this.setState(e)
                },
                _limitPriceChange: function(e) {
                    this.setState({
                        slLimitPrice: this._getLimitPriceByOp(e, this.slOp),
                        tpLimitPrice: this._getLimitPriceByOp(e, this.tpOp)
                    })
                },
                _dateClick: function() {
                    var e = !this.state.dateCheck;
                    this.setState({
                        dateCheck: e
                    })
                },
                _clearMsg: function(e) {
                    var t = this.state.errorMessages.filter(function(t) {
                        return t.key !== e
                    });
                    this.setState({
                        errorMessages: t
                    })
                },
                _parseOrderParam: function() {
                    var e = this.orderData.symbol,
                        t = this.orderData.cmd,
                        r = this.orderData.order,
                        n = this.refs.limitPrice.value(),
                        i = this.refs.sl.value(),
                        s = this.refs.tp.value(),
                        o = this.refs.comment.getDOMNode().value,
                        a = "",
                        l = this.refs.quotePrice.quote(),
                        c = Number(this.orderData.open_price),
                        u = this.orderData.sl,
                        h = this.orderData.tp,
                        p = this.orderData.volume;
                    if (this.state.dateCheck) {
                        var d = this.refs.expiration.value();
                        a = d.format("YYYY-MM-DD HH:mm:ss")
                    }
                    return {
                        symbol: e,
                        cmd: t,
                        volume: p,
                        order: r,
                        price: Number(n),
                        sl: i ? i : null,
                        tp: s ? s : null,
                        expiration: a,
                        comment: o,
                        ask: l.ask ? l.ask : this.orderData.ask,
                        bid: l.bid ? l.bid : this.orderData.bid,
                        openPrice: c,
                        oldSl: u ? u : null,
                        oldTp: h ? h : null
                    }
                },
                _submit: function() {
                    var e = this._parseOrderParam();
                    this._submitCheck(e) && c.changeOrder(e, t(this.getDOMNode()).closest(".dialog"))
                },
                _submitCheck: function(e) {
                    var t = [],
                        r = !0,
                        n = !0,
                        i = !0,
                        s = !0;
                    return r = "<=" === this.op ? e.price <= this.refs.quotePrice.value() ? !0 : !1 : e.price >= this.refs.quotePrice.value() ? !0 : !1, r || t.push({
                        key: "limitPrice",
                        msg: l.limitPriceError
                    }), this.sl && (n = "<=" === this.slOp ? e.sl <= this.state.slLimitPrice ? !0 : !1 : e.sl >= this.state.slLimitPrice ? !0 : !1, n || t.push({
                        key: "sl",
                        msg: l.slPriceError
                    })), this.tp && (i = "<=" === this.tpOp ? e.tp <= this.state.tpLimitPrice ? !0 : !1 : e.tp >= this.state.tpLimitPrice ? !0 : !1, i || t.push({
                        key: "tp",
                        msg: l.tpPriceError
                    })), s = e.comment.length > 20 ? !1 : !0, s || t.push({
                        key: "tp",
                        msg: l.commentError
                    }), t.length > 0 && this.setState({
                        errorMessages: t,
                        expiration: this.refs.expiration.value()
                    }), r && n && i && s
                },
                render: function() {
                    var e = this.state.errorMessages.map(function(e) {
                        return i.createElement("div", {
                            className: "error-message"
                        }, e.msg)
                    });
                    return i.createElement("div", {
                        className: "order-operation-panel order-modify-panel"
                    }, i.createElement("div", {
                        className: "order-info-wrapper"
                    }, i.createElement("div", {
                        className: "order-info"
                    }, i.createElement("span", null, "#", this.orderData.order, "#"), i.createElement("span", null, a[this.orderData.cmd]), i.createElement("span", null, this.orderData.volume / 100), i.createElement("span", null, this.orderData.symbol)), i.createElement("button", {
                        className: "btn remove",
                        onClick: this._deleteOrder
                    }, l["delete"])), i.createElement("div", {
                        className: "modify-pending-order-form"
                    }, i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, l.currentPrice), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(b, {
                        order: this.orderData
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, l.limitPrice), i.createElement("div", {
                        className: "control-value price-limit-wrapper"
                    }, i.createElement(u, {
                        ref: "limitPrice",
                        value: this.orderData.open_price,
                        step: this.step,
                        onChange: this._limitPriceChange,
                        onBlur: this._clearMsg.bind(this, "limitPrice")
                    }), i.createElement("div", {
                        className: "price-limit"
                    }, i.createElement("span", null, this.op), i.createElement(w, {
                        order: this.orderData,
                        step: this.step,
                        ref: "quotePrice"
                    })))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        onClick: this._slClick,
                        checked: this.state.slCheck
                    }), i.createElement("label", null, l.slPrice)), i.createElement("div", {
                        className: "control-value price-limit-wrapper"
                    }, i.createElement(u, {
                        disabled: !this.state.slCheck,
                        step: this.step,
                        value: this.state.slPrice,
                        ref: "sl",
                        onBlur: this._clearMsg.bind(this, "sl")
                    }), i.createElement("div", {
                        className: "price-limit"
                    }, i.createElement("span", null, this.slOp), i.createElement("span", null, this.state.slLimitPrice)))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        onClick: this._tpClick,
                        checked: this.state.tpCheck
                    }), i.createElement("label", null, l.tpPrice)), i.createElement("div", {
                        className: "control-value price-limit-wrapper"
                    }, i.createElement(u, {
                        disabled: !this.state.tpCheck,
                        step: this.step,
                        value: this.state.tpPrice,
                        ref: "tp",
                        onBlur: this._clearMsg.bind(this, "tp")
                    }), i.createElement("div", {
                        className: "price-limit"
                    }, i.createElement("span", null, this.tpOp), i.createElement("span", null, this.state.tpLimitPrice)))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("div", {
                        className: "control-label"
                    }, i.createElement("input", {
                        type: "checkbox",
                        onClick: this._dateClick,
                        checked: this.state.dateCheck
                    }), i.createElement("label", null, l.endDate)), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement(m, {
                        disabled: !this.state.dateCheck,
                        value: this.state.expiration,
                        minDate: new Date,
                        timePicker: !0,
                        timePickerIncrement: 1,
                        timePicker12Hour: !1,
                        timePickerSeconds: !1,
                        format: "YYYY-MM-DD HH:mm",
                        ref: "expiration"
                    }))), i.createElement("div", {
                        className: "control-group"
                    }, i.createElement("label", {
                        className: "control-label"
                    }, l.comment), i.createElement("div", {
                        className: "control-value"
                    }, i.createElement("input", {
                        type: "text",
                        ref: "comment",
                        defaultValue: this.orderData.comment,
                        onBlur: this._clearMsg.bind(this, "comment")
                    }))), i.createElement("div", {
                        className: "action-control"
                    }, e), i.createElement("div", {
                        className: "action-group"
                    }, i.createElement("button", {
                        className: "btn gray-btn inline-btn",
                        onClick: this.props.onClose
                    }, l.cancel), i.createElement("button", {
                        className: "btn primary-btn inline-btn",
                        onClick: this._submit
                    }, l.confirm))))
                }
            }),
            b = i.createClass({
                displayName: "CurrentPrice",
                mixins: [s.listenTo(p, "_symbolStoreListener")],
                getInitialState: function() {
                    this.order = this.props.order;
                    var e = Number(this.order.current_price ? this.order.current_price : 0);
                    return {
                        previewPrice: e,
                        currentPrice: e
                    }
                },
                _symbolStoreListener: function(e) {
                    if ("pushSymbolList" === e.type) {
                        var t = this.order.symbol,
                            r = e.allQuoteSymbols.find(function(e) {
                                return e.symbol === t
                            });
                        r && this.setState({
                            previewPrice: this.state.currentPrice,
                            currentPrice: this._getCurrentPrice(r)
                        })
                    }
                },
                _getCurrentPrice: function(e) {
                    var t = 0;
                    return this.order.cmd === g.cmdType.bl || this.order.cmd === g.cmdType.bt ? t = e.ask : (this.order.cmd === g.cmdType.sl || this.order.cmd === g.cmdType.st) && (t = e.bid), t
                },
                render: function() {
                    return i.createElement(v, {
                        preview: this.state.previewPrice,
                        current: this.state.currentPrice,
                        scale: this.order.digits
                    })
                }
            }),
            w = i.createClass({
                displayName: "QuotePrice",
                mixins: [s.listenTo(p, "_symbolStoreListener")],
                getInitialState: function() {
                    return this.order = this.props.order, this.defaultQuote = {
                        ask: Number(this.order.current_price),
                        bid: Number(this.order.current_price),
                        scale: this.order.digits
                    }, {
                        quote: this.defaultQuote,
                        quotePrice: this._generateQuotePrice(this.defaultQuote)
                    }
                },
                _symbolStoreListener: function(e) {
                    var t = this.order.symbol;
                    if ("pushSymbolList" === e.type) {
                        var r = e.allQuoteSymbols.find(function(e) {
                            return e.symbol === t
                        });
                        r && this.setState({
                            quote: r,
                            quotePrice: this._generateQuotePrice(r)
                        })
                    }
                },
                _generateQuotePrice: function(e) {
                    var t = this.order.cmd,
                        r = d.getSymbolByName(this.order.symbol),
                        n = this.props.step,
                        i = 0;
                    return 2 === t ? i = new f(e.ask).minus(n * r.stops_level).toNumber() : 3 === t ? i = new f(e.bid).plus(n * r.stops_level).toNumber() : 4 === t ? i = new f(e.ask).plus(n * r.stops_level).toNumber() : 5 === t && (i = new f(e.bid).minus(n * r.stops_level).toNumber()), i
                },
                value: function() {
                    return this.state.quotePrice
                },
                quote: function() {
                    return this.state.quote
                },
                render: function() {
                    return i.createElement("label", null, this.state.quotePrice.toFixed(this.defaultQuote.scale))
                }
            });
        e.exports = y
    }).call(t, r(28))
}, , , , , , function(e, t, r) {
    "use strict";
    var n = r(27),
        i = n.createClass({
            displayName: "Pagination",
            propTypes: {
                pageNow: n.PropTypes.number,
                totalPage: n.PropTypes.number,
                go: n.PropTypes.func
            },
            _go: function(e) {
                0 >= e || e > this.props.totalPage || "function" == typeof this.props.go && this.props.go(e)
            },
            render: function() {
                var e = this.props.totalPage,
                    t = this.props.pageNow,
                    r = [];
                if (7 >= e)
                    for (var i = 1; e >= i; i++) i === t ? r.push(n.createElement("li", {
                        className: "current pagination-item"
                    }, i)) : r.push(n.createElement("li", {
                        className: "pagination-item",
                        onClick: this._go.bind(this, i)
                    }, i));
                else if (3 >= t) {
                    for (var i = 1; 5 >= i; i++) i === t ? r.push(n.createElement("li", {
                        className: "current pagination-item"
                    }, i)) : r.push(n.createElement("li", {
                        className: "pagination-item",
                        onClick: this._go.bind(this, i)
                    }, i));
                    r.push(n.createElement("li", {
                        className: "pagination-item"
                    }, "...")), r.push(n.createElement("li", {
                        className: "pagination-item",
                        onClick: this._go.bind(this, e)
                    }, e))
                } else if (t > e - 2) {
                    for (var i = 0; 5 > i; i++) e - i === t ? r.unshift(n.createElement("li", {
                        className: "current pagination-item"
                    }, e - i)) : r.unshift(n.createElement("li", {
                        className: "pagination-item",
                        onClick: this._go.bind(this, e - i)
                    }, e - i));
                    r.unshift(n.createElement("li", {
                        className: "pagination-item"
                    }, "...")), r.unshift(n.createElement("li", {
                        className: "pagination-item",
                        onClick: this._go.bind(this, 1)
                    }, 1))
                } else r.push(n.createElement("li", {
                    className: "pagination-item",
                    onClick: this._go.bind(this, 1)
                }, 1)), r.push(n.createElement("li", {
                    className: "pagination-item"
                }, "...")), r.push(n.createElement("li", {
                    className: "pagination-item",
                    onClick: this._go.bind(this, t - 1)
                }, t - 1)), r.push(n.createElement("li", {
                    className: "pagination-item current"
                }, t)), r.push(n.createElement("li", {
                    className: "pagination-item",
                    onClick: this._go.bind(this, t + 1)
                }, t + 1)), r.push(n.createElement("li", {
                    className: "pagination-item"
                }, "...")), r.push(n.createElement("li", {
                    className: "pagination-item",
                    onClick: this._go.bind(this, e)
                }, e));
                return n.createElement("ul", {
                    className: "pagination"
                }, n.createElement("li", {
                    className: "pagination-item prev",
                    onClick: this._go.bind(this, t - 1)
                }, "<"), r, n.createElement("li", {
                    className: "pagination-item next",
                    onClick: this._go.bind(this, t + 1)
                }, ">"))
            }
        });
    e.exports = i
}, function(e, t, r) {
    "use strict";
    var n = r(137),
        i = {};
    i.getTradeLogs = function(e) {
        return n.doPost("/api/v1/trade/trade-logs/search", {
            data: JSON.stringify(e)
        })
    }, e.exports = i
}, , , , , , function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(186),
        s = n.createClass({
            displayName: "NumberInput",
            propTypes: {
                min: n.PropTypes.number,
                max: n.PropTypes.number,
                step: n.PropTypes.number,
                value: n.PropTypes.number,
                disabled: n.PropTypes.bool,
                onBlur: n.PropTypes.func,
                onChange: n.PropTypes.func
            },
            getDefaultProps: function() {
                return {
                    step: 1,
                    disabled: !1
                }
            },
            getInitialState: function() {
                return {
                    value: this.props.value
                }
            },
            componentWillReceiveProps: function(e) {
                e.value !== this.props.value && this.setState({
                    value: e.value
                })
            },
            componentDidUpdate: function(e, t) {
                t.value !== this.state.value && this.props.onChange && this.props.onChange(this.state.value)
            },
            _onChange: function(e) {
                e.preventDefault(), this.setState({
                    value: e.target.value
                })
            },
            _onClickUp: function() {
                var e = Number(this.state.value);
                isNaN(e) && (e = 0), e = new i(e).plus(this.props.step).toNumber(), this.setState({
                    value: this._validate(e)
                })
            },
            _onClickDown: function() {
                var e = Number(this.state.value);
                isNaN(e) && (e = 0), e = new i(e).minus(this.props.step).toNumber(), this.setState({
                    value: this._validate(e)
                })
            },
            _validate: function(e) {
                var t = this.props,
                    r = t.min,
                    n = t.max;
                return "number" == typeof r && r > e ? r : "number" == typeof n && e > n ? n : e
            },
            value: function() {
                return Number(this.state.value)
            },
            render: function() {
                return this.props.disabled ? n.createElement("div", {
                    className: "number-input disabled"
                }, n.createElement("input", {
                    className: "number-box",
                    type: "text",
                    value: this.state.value,
                    disabled: !0
                }), n.createElement("div", {
                    className: "controls"
                }, n.createElement("div", {
                    className: "number-action up"
                }), n.createElement("div", {
                    className: "number-action down"
                }))) : n.createElement("div", {
                    className: "number-input"
                }, n.createElement("input", {
                    className: "number-box",
                    type: "text",
                    onBlur: this.props.onBlur,
                    value: this.state.value,
                    onChange: this._onChange
                }), n.createElement("div", {
                    className: "controls"
                }, n.createElement("div", {
                    className: "number-action up",
                    onClick: this._onClickUp
                }), n.createElement("div", {
                    className: "number-action down",
                    onClick: this._onClickDown
                })))
            }
        });
    e.exports = s
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(56),
        s = r(80),
        o = r(66),
        a = n.PropTypes,
        l = n.createClass({
            displayName: "DatePicker",
            propTypes: {
                onDateSelected: a.func,
                disabled: a.bool,
                format: a.string
            },
            getDefaultProps: function() {
                return {
                    value: s(),
                    format: "YYYY-MM-DD",
                    drops: "up"
                }
            },
            getInitialState: function() {
                return {
                    value: this.props.value
                }
            },
            componentWillReceiveProps: function(e) {
                this.setState({
                    value: e.value
                })
            },
            componentWillUpdate: function(e, t) {
                var r = this.props.onDateSelected;
                "function" == typeof r && r(t.value)
            },
            _setDate: function(e, t) {
                this.setState({
                    value: t.startDate
                })
            },
            value: function() {
                return this.state.value
            },
            _getLabel: function() {
                var e = this.state.value;
                return s.isDate(e) ? s(e).format(this.props.format) : s.isMoment(e) ? e.format(this.props.format) : e
            },
            render: function() {
                var e = this._getLabel();
                if (this.props.disabled) return n.createElement("input", {
                    disabled: !0,
                    className: "datepicker-trigger single-datepicker",
                    value: e
                });
                var t = i(this.props, {
                    singleDatePicker: {
                        $set: !0
                    },
                    endDate: {
                        $set: this.state.value
                    },
                    onApply: {
                        $set: this._setDate
                    },
                    onDateSelected: {
                        $set: null
                    },
                    disabled: {
                        $set: null
                    }
                });
                return n.createElement(o, n.__spread({}, t), n.createElement("input", {
                    className: "datepicker-trigger single-datepicker",
                    value: e
                }))
            }
        });
    e.exports = l
}, , , , function(e, t, r) {
    "use strict";
    var n = r(27),
        i = n.PropTypes,
        s = n.createClass({
            displayName: "CountContent",
            propTypes: {
                count: i.number.isRequired,
                countDescHead: i.string,
                countDescTail: i.string,
                onFocus: i.func
            },
            defaultCount: 500,
            getInitialState: function() {
                return {
                    content: null,
                    count: Number(this.props.count) || this.defaultCount
                }
            },
            getContent: function() {
                return this.state.content
            },
            _countContent: function(e) {
                var t = e.target.value,
                    r = Number(this.props.count) || this.defaultCount;
                t.length > r ? this.setState({
                    content: t.substr(0, r),
                    count: 0
                }) : this.setState({
                    content: t,
                    count: Number(t.length) > r ? 0 : r - Number(t.length)
                })
            },
            render: function() {
                return n.createElement("div", {
                    className: "count-content"
                }, n.createElement("textarea", {
                    name: "content",
                    className: "content",
                    onChange: this._countContent,
                    onFocus: this.props.onFocus,
                    value: this.state.content
                }), n.createElement("span", {
                    className: "count"
                }, (this.props.countDescHead || "") + this.state.count + (this.props.countDescTail || "")))
            }
        });
    e.exports = s
}, function(e, t, r) {
    function n() {
        if (!a) {
            a = !0;
            for (var e, t = o.length; t;) {
                e = o, o = [];
                for (var r = -1; ++r < t;) e[r]();
                t = o.length
            }
            a = !1
        }
    }

    function i() {}
    var s = e.exports = {},
        o = [],
        a = !1;
    s.nextTick = function(e) {
        o.push(e), a || setTimeout(n, 0)
    }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = i, s.addListener = i, s.once = i, s.off = i, s.removeListener = i, s.removeAllListeners = i, s.emit = i, s.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, s.cwd = function() {
        return "/"
    }, s.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, s.umask = function() {
        return 0
    }
}, function(e, t, r) {
    e.exports = r(207)
}, function(e, t, r) {
    var n, i;
    ! function(s) {
        "use strict";
        n = s, i = "function" == typeof n ? n.call(t, r, t, e) : n, !(void 0 !== i && (e.exports = i))
    }(function() {
        "use strict";

        function e(e, t) {
            this.el = e, this.options = t = t || {};
            var n = {
                group: Math.random(),
                sort: !0,
                disabled: !1,
                store: null,
                handle: null,
                scroll: !0,
                scrollSensitivity: 30,
                scrollSpeed: 10,
                draggable: /[uo]l/i.test(e.nodeName) ? "li" : ">*",
                ghostClass: "sortable-ghost",
                ignore: "a, img",
                filter: null,
                animation: 0,
                setData: function(e, t) {
                    e.setData("Text", t.textContent)
                },
                dropBubble: !1,
                dragoverBubble: !1
            };
            for (var i in n) !(i in t) && (t[i] = n[i]);
            var o = t.group;
            o && "object" == typeof o || (o = t.group = {
                name: o
            }), ["pull", "put"].forEach(function(e) {
                e in o || (o[e] = !0)
            }), H.forEach(function(n) {
                t[n] = r(this, t[n] || q), s(e, n.substr(2).toLowerCase(), t[n])
            }, this), t.groups = " " + o.name + (o.put.join ? " " + o.put.join(" ") : "") + " ", e[N] = t;
            for (var a in this) "_" === a.charAt(0) && (this[a] = r(this, this[a]));
            s(e, "mousedown", this._onTapStart), s(e, "touchstart", this._onTapStart), s(e, "dragover", this), s(e, "dragenter", this), W.push(this._onDragOver), t.store && this.sort(t.store.get(this))
        }

        function t(e) {
            y && y.state !== e && (l(y, "display", e ? "none" : ""), !e && y.state && b.insertBefore(y, g), y.state = e)
        }

        function r(e, t) {
            var r = z.call(arguments, 2);
            return t.bind ? t.bind.apply(t, [e].concat(r)) : function() {
                return t.apply(e, r.concat(z.call(arguments)))
            }
        }

        function n(e, t, r) {
            if (e) {
                r = r || j, t = t.split(".");
                var n = t.shift().toUpperCase(),
                    i = new RegExp("\\s(" + t.join("|") + ")\\s", "g");
                do
                    if (">*" === n && e.parentNode === r || ("" === n || e.nodeName.toUpperCase() == n) && (!t.length || ((" " + e.className + " ").match(i) || []).length == t.length)) return e;
                while (e !== r && (e = e.parentNode))
            }
            return null
        }

        function i(e) {
            e.dataTransfer.dropEffect = "move", e.preventDefault()
        }

        function s(e, t, r) {
            e.addEventListener(t, r, !1)
        }

        function o(e, t, r) {
            e.removeEventListener(t, r, !1)
        }

        function a(e, t, r) {
            if (e)
                if (e.classList) e.classList[r ? "add" : "remove"](t);
                else {
                    var n = (" " + e.className + " ").replace(/\s+/g, " ").replace(" " + t + " ", "");
                    e.className = n + (r ? " " + t : "")
                }
        }

        function l(e, t, r) {
            var n = e && e.style;
            if (n) {
                if (void 0 === r) return j.defaultView && j.defaultView.getComputedStyle ? r = j.defaultView.getComputedStyle(e, "") : e.currentStyle && (r = e.currentStyle), void 0 === t ? r : r[t];
                t in n || (t = "-webkit-" + t), n[t] = r + ("string" == typeof r ? "" : "px")
            }
        }

        function c(e, t, r) {
            if (e) {
                var n = e.getElementsByTagName(t),
                    i = 0,
                    s = n.length;
                if (r)
                    for (; s > i; i++) r(n[i], i);
                return n
            }
            return []
        }

        function u(e) {
            e.draggable = !1
        }

        function h() {
            A = !1
        }

        function p(e, t) {
            var r = e.lastElementChild,
                n = r.getBoundingClientRect();
            return t.clientY - (n.top + n.height) > 5 && r
        }

        function d(e) {
            for (var t = e.tagName + e.className + e.src + e.href + e.textContent, r = t.length, n = 0; r--;) n += t.charCodeAt(r);
            return n.toString(36)
        }

        function f(e) {
            for (var t = 0; e && (e = e.previousElementSibling);) "TEMPLATE" !== e.nodeName.toUpperCase() && t++;
            return t
        }

        function m(e, t) {
            var r, n;
            return function() {
                void 0 === r && (r = arguments, n = this, setTimeout(function() {
                    1 === r.length ? e.call(n, r[0]) : e.apply(n, r), r = void 0
                }, t))
            }
        }
        var g, v, y, b, w, _, x, k, C, S, E, D, T, O, M = {},
            N = "Sortable" + (new Date).getTime(),
            P = window,
            j = P.document,
            R = P.parseInt,
            I = !!("draggable" in j.createElement("div")),
            A = !1,
            L = function(e, t, r, n, i, s) {
                var o = j.createEvent("Event");
                o.initEvent(t, !0, !0), o.item = r || e, o.from = n || e, o.clone = y, o.oldIndex = i, o.newIndex = s, e.dispatchEvent(o)
            },
            H = "onAdd onUpdate onRemove onStart onEnd onFilter onSort".split(" "),
            q = function() {},
            F = Math.abs,
            z = [].slice,
            W = [],
            Y = m(function(e, t, r) {
                if (r && t.scroll) {
                    var n, i, s, o, a = t.scrollSensitivity,
                        l = t.scrollSpeed,
                        c = e.clientX,
                        u = e.clientY,
                        h = window.innerWidth,
                        p = window.innerHeight;
                    if (x !== r && (_ = t.scroll, x = r, _ === !0)) {
                        _ = r;
                        do
                            if (_.offsetWidth < _.scrollWidth || _.offsetHeight < _.scrollHeight) break;
                        while (_ = _.parentNode)
                    }
                    _ && (n = _, i = _.getBoundingClientRect(), s = (F(i.right - c) <= a) - (F(i.left - c) <= a), o = (F(i.bottom - u) <= a) - (F(i.top - u) <= a)), s || o || (s = (a >= h - c) - (a >= c), o = (a >= p - u) - (a >= u), (s || o) && (n = P)), (M.vx !== s || M.vy !== o || M.el !== n) && (M.el = n, M.vx = s, M.vy = o, clearInterval(M.pid), n && (M.pid = setInterval(function() {
                        n === P ? P.scrollTo(P.scrollX + s * l, P.scrollY + o * l) : (o && (n.scrollTop += o * l), s && (n.scrollLeft += s * l))
                    }, 24)))
                }
            }, 30);
        return e.prototype = {
            constructor: e,
            _dragStarted: function() {
                b && g && (a(g, this.options.ghostClass, !0), e.active = this, L(b, "start", g, b, S))
            },
            _onTapStart: function(e) {
                var t = e.type,
                    r = e.touches && e.touches[0],
                    i = (r || e).target,
                    o = i,
                    a = this.options,
                    l = this.el,
                    h = a.filter;
                if (!("mousedown" === t && 0 !== e.button || a.disabled) && (i = n(i, a.draggable, l))) {
                    if (S = f(i), "function" == typeof h) {
                        if (h.call(this, e, i, this)) return L(o, "filter", i, l, S), void e.preventDefault()
                    } else if (h && (h = h.split(",").some(function(e) {
                            return e = n(o, e.trim(), l), e ? (L(e, "filter", i, l, S), !0) : void 0
                        }))) return void e.preventDefault();
                    if ((!a.handle || n(o, a.handle, l)) && i && !g && i.parentNode === l) {
                        T = e, b = this.el, g = i, w = g.nextSibling, D = this.options.group, g.draggable = !0, a.ignore.split(",").forEach(function(e) {
                            c(i, e.trim(), u)
                        }), r && (T = {
                            target: i,
                            clientX: r.clientX,
                            clientY: r.clientY
                        }, this._onDragStart(T, "touch"), e.preventDefault()), s(j, "mouseup", this._onDrop), s(j, "touchend", this._onDrop), s(j, "touchcancel", this._onDrop), s(g, "dragend", this), s(b, "dragstart", this._onDragStart), I || this._onDragStart(T, !0);
                        try {
                            j.selection ? j.selection.empty() : window.getSelection().removeAllRanges()
                        } catch (p) {}
                    }
                }
            },
            _emulateDragOver: function() {
                if (O) {
                    l(v, "display", "none");
                    var e = j.elementFromPoint(O.clientX, O.clientY),
                        t = e,
                        r = " " + this.options.group.name,
                        n = W.length;
                    if (t)
                        do {
                            if (t[N] && t[N].groups.indexOf(r) > -1) {
                                for (; n--;) W[n]({
                                    clientX: O.clientX,
                                    clientY: O.clientY,
                                    target: e,
                                    rootEl: t
                                });
                                break
                            }
                            e = t
                        } while (t = t.parentNode);
                    l(v, "display", "")
                }
            },
            _onTouchMove: function(e) {
                if (T) {
                    var t = e.touches ? e.touches[0] : e,
                        r = t.clientX - T.clientX,
                        n = t.clientY - T.clientY,
                        i = e.touches ? "translate3d(" + r + "px," + n + "px,0)" : "translate(" + r + "px," + n + "px)";
                    O = t, l(v, "webkitTransform", i), l(v, "mozTransform", i), l(v, "msTransform", i), l(v, "transform", i), e.preventDefault()
                }
            },
            _onDragStart: function(e, t) {
                var r = e.dataTransfer,
                    n = this.options;
                if (this._offUpEvents(), "clone" == D.pull && (y = g.cloneNode(!0), l(y, "display", "none"), b.insertBefore(y, g)), t) {
                    var i, o = g.getBoundingClientRect(),
                        a = l(g);
                    v = g.cloneNode(!0), l(v, "top", o.top - R(a.marginTop, 10)), l(v, "left", o.left - R(a.marginLeft, 10)), l(v, "width", o.width), l(v, "height", o.height), l(v, "opacity", "0.8"), l(v, "position", "fixed"), l(v, "zIndex", "100000"), b.appendChild(v), i = v.getBoundingClientRect(), l(v, "width", 2 * o.width - i.width), l(v, "height", 2 * o.height - i.height), "touch" === t ? (s(j, "touchmove", this._onTouchMove), s(j, "touchend", this._onDrop), s(j, "touchcancel", this._onDrop)) : (s(j, "mousemove", this._onTouchMove), s(j, "mouseup", this._onDrop)), this._loopId = setInterval(this._emulateDragOver, 150)
                } else r && (r.effectAllowed = "move", n.setData && n.setData.call(this, r, g)), s(j, "drop", this);
                setTimeout(this._dragStarted, 0)
            },
            _onDragOver: function(e) {
                var r, i, s, o = this.el,
                    a = this.options,
                    c = a.group,
                    u = c.put,
                    d = D === c,
                    f = a.sort;
                if (g && (void 0 !== e.preventDefault && (e.preventDefault(), !a.dragoverBubble && e.stopPropagation()), D && !a.disabled && (d ? f || (s = !b.contains(g)) : D.pull && u && (D.name === c.name || u.indexOf && ~u.indexOf(D.name))) && (void 0 === e.rootEl || e.rootEl === this.el))) {
                    if (Y(e, a, this.el), A) return;
                    if (r = n(e.target, a.draggable, o), i = g.getBoundingClientRect(), s) return t(!0), void(y || w ? b.insertBefore(g, y || w) : f || b.appendChild(g));
                    if (0 === o.children.length || o.children[0] === v || o === e.target && (r = p(o, e))) {
                        if (r) {
                            if (r.animated) return;
                            _ = r.getBoundingClientRect()
                        }
                        t(d), o.appendChild(g), this._animate(i, g), r && this._animate(_, r)
                    } else if (r && !r.animated && r !== g && void 0 !== r.parentNode[N]) {
                        k !== r && (k = r, C = l(r));
                        var m, _ = r.getBoundingClientRect(),
                            x = _.right - _.left,
                            S = _.bottom - _.top,
                            E = /left|right|inline/.test(C.cssFloat + C.display),
                            T = r.offsetWidth > g.offsetWidth,
                            O = r.offsetHeight > g.offsetHeight,
                            M = (E ? (e.clientX - _.left) / x : (e.clientY - _.top) / S) > .5,
                            P = r.nextElementSibling;
                        A = !0, setTimeout(h, 30), t(d), m = E ? r.previousElementSibling === g && !T || M && T : P !== g && !O || M && O, m && !P ? o.appendChild(g) : r.parentNode.insertBefore(g, m ? P : r), this._animate(i, g), this._animate(_, r)
                    }
                }
            },
            _animate: function(e, t) {
                var r = this.options.animation;
                if (r) {
                    var n = t.getBoundingClientRect();
                    l(t, "transition", "none"), l(t, "transform", "translate3d(" + (e.left - n.left) + "px," + (e.top - n.top) + "px,0)"), t.offsetWidth, l(t, "transition", "all " + r + "ms"), l(t, "transform", "translate3d(0,0,0)"), clearTimeout(t.animated), t.animated = setTimeout(function() {
                        l(t, "transition", ""), l(t, "transform", ""), t.animated = !1
                    }, r)
                }
            },
            _offUpEvents: function() {
                o(j, "mouseup", this._onDrop), o(j, "touchmove", this._onTouchMove), o(j, "touchend", this._onDrop), o(j, "touchcancel", this._onDrop)
            },
            _onDrop: function(t) {
                var r = this.el,
                    n = this.options;
                clearInterval(this._loopId), clearInterval(M.pid), o(j, "drop", this), o(j, "mousemove", this._onTouchMove), o(r, "dragstart", this._onDragStart), this._offUpEvents(), t && (t.preventDefault(), !n.dropBubble && t.stopPropagation(), v && v.parentNode.removeChild(v), g && (o(g, "dragend", this), u(g), a(g, this.options.ghostClass, !1), b !== g.parentNode ? (E = f(g), L(g.parentNode, "sort", g, b, S, E), L(b, "sort", g, b, S, E), L(g, "add", g, b, S, E), L(b, "remove", g, b, S, E)) : (y && y.parentNode.removeChild(y), g.nextSibling !== w && (E = f(g), L(b, "update", g, b, S, E), L(b, "sort", g, b, S, E))), e.active && L(b, "end", g, b, S, E)), b = g = v = w = y = _ = x = T = O = k = C = D = e.active = null, this.save())
            },
            handleEvent: function(e) {
                var t = e.type;
                "dragover" === t || "dragenter" === t ? (this._onDragOver(e), i(e)) : ("drop" === t || "dragend" === t) && this._onDrop(e)
            },
            toArray: function() {
                for (var e, t = [], r = this.el.children, i = 0, s = r.length; s > i; i++) e = r[i], n(e, this.options.draggable, this.el) && t.push(e.getAttribute("data-id") || d(e));
                return t
            },
            sort: function(e) {
                var t = {},
                    r = this.el;
                this.toArray().forEach(function(e, i) {
                    var s = r.children[i];
                    n(s, this.options.draggable, r) && (t[e] = s)
                }, this), e.forEach(function(e) {
                    t[e] && (r.removeChild(t[e]), r.appendChild(t[e]))
                })
            },
            save: function() {
                var e = this.options.store;
                e && e.set(this)
            },
            closest: function(e, t) {
                return n(e, t || this.options.draggable, this.el)
            },
            option: function(e, t) {
                var r = this.options;
                return void 0 === t ? r[e] : void(r[e] = t)
            },
            destroy: function() {
                var e = this.el,
                    t = this.options;
                H.forEach(function(r) {
                    o(e, r.substr(2).toLowerCase(), t[r])
                }), o(e, "mousedown", this._onTapStart), o(e, "touchstart", this._onTapStart), o(e, "dragover", this), o(e, "dragenter", this), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
                    e.removeAttribute("draggable")
                }), W.splice(W.indexOf(this._onDragOver), 1), this._onDrop(), this.el = null
            }
        }, e.utils = {
            on: s,
            off: o,
            css: l,
            find: c,
            bind: r,
            is: function(e, t) {
                return !!n(e, t, e)
            },
            throttle: m,
            closest: n,
            toggleClass: a,
            dispatchEvent: L,
            index: f
        }, e.version = "1.1.1", e.create = function(t, r) {
            return new e(t, r)
        }, e
    })
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(208),
        s = n.createClass({
            displayName: "TabList",
            propTypes: {
                selectedIndex: n.PropTypes.number,
                selectTabHanlder: n.PropTypes.func,
                removeTabHandler: n.PropTypes.func,
                tabs: n.PropTypes.array
            },
            getDefaultProps: function() {
                return {
                    selectedIndex: 0,
                    tabs: []
                }
            },
            render: function() {
                var e = this.props.tabs,
                    t = this.props,
                    r = t.selectedIndex,
                    s = t.selectTabHanlder,
                    o = t.removeTabHandler,
                    a = e.map(function(e, t) {
                        return n.createElement(i, {
                            key: "tab-" + t,
                            ref: "tab-" + t,
                            selected: r === t,
                            enableRemove: e.enableRemove,
                            selectTabHanlder: s,
                            removeTabHandler: o
                        }, e.tab)
                    });
                return n.createElement("div", {
                    className: "tab-list"
                }, a)
            }
        });
    e.exports = s
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(209),
        s = n.createClass({
            displayName: "TabPanelList",
            propTypes: {
                selectedIndex: n.PropTypes.number,
                tabs: n.PropTypes.array
            },
            getDefaultProps: function() {
                return {
                    selectedIndex: 0,
                    tabs: []
                }
            },
            render: function() {
                var e = this.props.tabs,
                    t = this.props.selectedIndex,
                    r = e.map(function(e, r) {
                        return n.createElement(i, {
                            selected: t === r,
                            key: "panel-" + r,
                            ref: "panel-" + r
                        }, e.panel)
                    });
                return n.createElement("div", {
                    className: "tab-panel-list"
                }, r)
            }
        });
    e.exports = s
}, , , function(e, t, r) {
    (function(e) {
        ! function(t) {
            function r(e) {
                t.jqplot.ElemContainer.call(this), this.name = e, this._series = [], this.show = !1, this.tickRenderer = t.jqplot.AxisTickRenderer, this.tickOptions = {}, this.labelRenderer = t.jqplot.AxisLabelRenderer, this.labelOptions = {}, this.label = null, this.showLabel = !0, this.min = null, this.max = null, this.autoscale = !1, this.pad = 1.2, this.padMax = null, this.padMin = null, this.ticks = [], this.numberTicks, this.tickInterval, this.renderer = t.jqplot.LinearAxisRenderer, this.rendererOptions = {}, this.showTicks = !0, this.showTickMarks = !0, this.showMinorTicks = !0, this.drawMajorGridlines = !0, this.drawMinorGridlines = !1, this.drawMajorTickMarks = !0, this.drawMinorTickMarks = !0, this.useSeriesColor = !1, this.borderWidth = null, this.borderColor = null, this.scaleToHiddenSeries = !1, this._dataBounds = {
                    min: null,
                    max: null
                }, this._intervalStats = [], this._offsets = {
                    min: null,
                    max: null
                }, this._ticks = [], this._label = null, this.syncTicks = null, this.tickSpacing = 75, this._min = null, this._max = null, this._tickInterval = null, this._numberTicks = null, this.__ticks = null, this._options = {}
            }

            function n(e) {
                t.jqplot.ElemContainer.call(this), this.show = !1, this.location = "ne", this.labels = [], this.showLabels = !0, this.showSwatches = !0, this.placement = "insideGrid", this.xoffset = 0, this.yoffset = 0, this.border, this.background, this.textColor, this.fontFamily, this.fontSize, this.rowSpacing = "0.5em", this.renderer = t.jqplot.TableLegendRenderer, this.rendererOptions = {}, this.preDraw = !1, this.marginTop = null, this.marginRight = null, this.marginBottom = null, this.marginLeft = null, this.escapeHtml = !1, this._series = [], t.extend(!0, this, e)
            }

            function i(e) {
                t.jqplot.ElemContainer.call(this), this.text = e, this.show = !0, this.fontFamily, this.fontSize, this.textAlign, this.textColor, this.renderer = t.jqplot.DivTitleRenderer, this.rendererOptions = {}, this.escapeHtml = !1
            }

            function s(e) {
                e = e || {}, t.jqplot.ElemContainer.call(this), this.show = !0, this.xaxis = "xaxis", this._xaxis, this.yaxis = "yaxis", this._yaxis, this.gridBorderWidth = 2, this.renderer = t.jqplot.LineRenderer, this.rendererOptions = {}, this.data = [], this.gridData = [], this.label = "", this.showLabel = !0, this.color, this.negativeColor, this.lineWidth = 2.5, this.lineJoin = "round", this.lineCap = "round", this.linePattern = "solid", this.shadow = !0, this.shadowAngle = 45, this.shadowOffset = 1.25, this.shadowDepth = 3, this.shadowAlpha = "0.1", this.breakOnNull = !1, this.markerRenderer = t.jqplot.MarkerRenderer, this.markerOptions = {}, this.showLine = !0, this.showMarker = !0, this.index, this.fill = !1, this.fillColor, this.fillAlpha, this.fillAndStroke = !1, this.disableStack = !1, this._stack = !1, this.neighborThreshold = 4, this.fillToZero = !1, this.fillToValue = 0, this.fillAxis = "y", this.useNegativeColors = !0, this._stackData = [], this._plotData = [], this._plotValues = {
                    x: [],
                    y: []
                }, this._intervals = {
                    x: {},
                    y: {}
                }, this._prevPlotData = [], this._prevGridData = [], this._stackAxis = "y", this._primaryAxis = "_xaxis", this.canvas = new t.jqplot.GenericCanvas, this.shadowCanvas = new t.jqplot.GenericCanvas, this.plugins = {}, this._sumy = 0, this._sumx = 0, this._type = ""
            }

            function o() {
                t.jqplot.ElemContainer.call(this), this.drawGridlines = !0, this.gridLineColor = "#cccccc", this.gridLineWidth = 1, this.background = "#fffdf6", this.borderColor = "#999999", this.borderWidth = 2, this.drawBorder = !0, this.shadow = !0, this.shadowAngle = 45, this.shadowOffset = 1.5, this.shadowWidth = 3, this.shadowDepth = 3, this.shadowColor = null, this.shadowAlpha = "0.07", this._left, this._top, this._right, this._bottom, this._width, this._height, this._axes = [], this.renderer = t.jqplot.CanvasGridRenderer, this.rendererOptions = {}, this._offsets = {
                    top: null,
                    bottom: null,
                    left: null,
                    right: null
                }
            }

            function a() {
                function e(e) {
                    for (var t, r = 0; r < e.length; r++)
                        for (var n, i = [e[r].data, e[r]._stackData, e[r]._plotData, e[r]._prevPlotData], s = 0; 4 > s; s++)
                            if (n = !0, t = i[s], "x" == e[r]._stackAxis) {
                                for (var o = 0; o < t.length; o++)
                                    if ("number" != typeof t[o][1]) {
                                        n = !1;
                                        break
                                    }
                                n && t.sort(function(e, t) {
                                    return e[1] - t[1]
                                })
                            } else {
                                for (var o = 0; o < t.length; o++)
                                    if ("number" != typeof t[o][0]) {
                                        n = !1;
                                        break
                                    }
                                n && t.sort(function(e, t) {
                                    return e[0] - t[0]
                                })
                            }
                }

                function l(e) {
                    var t, r, n = e.data.plot,
                        i = n.eventCanvas._elem.offset(),
                        s = {
                            x: e.pageX - i.left,
                            y: e.pageY - i.top
                        },
                        o = {
                            xaxis: null,
                            yaxis: null,
                            x2axis: null,
                            y2axis: null,
                            y3axis: null,
                            y4axis: null,
                            y5axis: null,
                            y6axis: null,
                            y7axis: null,
                            y8axis: null,
                            y9axis: null,
                            yMidAxis: null
                        },
                        a = ["xaxis", "yaxis", "x2axis", "y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis", "yMidAxis"],
                        l = n.axes;
                    for (t = 11; t > 0; t--) r = a[t - 1], l[r].show && (o[r] = l[r].series_p2u(s[r.charAt(0)]));
                    return {
                        offsets: i,
                        gridPos: s,
                        dataPos: o
                    }
                }

                function c(e, r) {
                    function n(e, t, r) {
                        var n = (t[1] - r[1]) / (t[0] - r[0]),
                            i = t[1] - n * t[0],
                            s = e + t[1];
                        return [(s - i) / n, s]
                    }
                    var i, s, o, a, l, c, u, h, p, d, f, m, g, v, y, b, w, _, x, k = r.series;
                    for (o = r.seriesStack.length - 1; o >= 0; o--) switch (i = r.seriesStack[o], a = k[i], w = a._highlightThreshold, a.renderer.constructor) {
                        case t.jqplot.BarRenderer:
                            for (c = e.x, u = e.y, s = 0; s < a._barPoints.length; s++)
                                if (b = a._barPoints[s], y = a.gridData[s], c > b[0][0] && c < b[2][0] && u > b[2][1] && u < b[0][1]) return {
                                    seriesIndex: a.index,
                                    pointIndex: s,
                                    gridData: y,
                                    data: a.data[s],
                                    points: a._barPoints[s]
                                };
                            break;
                        case t.jqplot.PyramidRenderer:
                            for (c = e.x, u = e.y, s = 0; s < a._barPoints.length; s++)
                                if (b = a._barPoints[s], y = a.gridData[s], c > b[0][0] + w[0][0] && c < b[2][0] + w[2][0] && u > b[2][1] && u < b[0][1]) return {
                                    seriesIndex: a.index,
                                    pointIndex: s,
                                    gridData: y,
                                    data: a.data[s],
                                    points: a._barPoints[s]
                                };
                            break;
                        case t.jqplot.DonutRenderer:
                            if (d = a.startAngle / 180 * Math.PI, c = e.x - a._center[0], u = e.y - a._center[1], l = Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)), c > 0 && -u >= 0 ? h = 2 * Math.PI - Math.atan(-u / c) : c > 0 && 0 > -u ? h = -Math.atan(-u / c) : 0 > c ? h = Math.PI - Math.atan(-u / c) : 0 == c && -u > 0 ? h = 3 * Math.PI / 2 : 0 == c && 0 > -u ? h = Math.PI / 2 : 0 == c && 0 == u && (h = 0), d && (h -= d, 0 > h ? h += 2 * Math.PI : h > 2 * Math.PI && (h -= 2 * Math.PI)), p = a.sliceMargin / 180 * Math.PI, l < a._radius && l > a._innerRadius)
                                for (s = 0; s < a.gridData.length; s++)
                                    if (f = s > 0 ? a.gridData[s - 1][1] + p : p, m = a.gridData[s][1], h > f && m > h) return {
                                        seriesIndex: a.index,
                                        pointIndex: s,
                                        gridData: [e.x, e.y],
                                        data: a.data[s]
                                    };
                            break;
                        case t.jqplot.PieRenderer:
                            if (d = a.startAngle / 180 * Math.PI, c = e.x - a._center[0], u = e.y - a._center[1], l = Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)), c > 0 && -u >= 0 ? h = 2 * Math.PI - Math.atan(-u / c) : c > 0 && 0 > -u ? h = -Math.atan(-u / c) : 0 > c ? h = Math.PI - Math.atan(-u / c) : 0 == c && -u > 0 ? h = 3 * Math.PI / 2 : 0 == c && 0 > -u ? h = Math.PI / 2 : 0 == c && 0 == u && (h = 0), d && (h -= d, 0 > h ? h += 2 * Math.PI : h > 2 * Math.PI && (h -= 2 * Math.PI)), p = a.sliceMargin / 180 * Math.PI, l < a._radius)
                                for (s = 0; s < a.gridData.length; s++)
                                    if (f = s > 0 ? a.gridData[s - 1][1] + p : p, m = a.gridData[s][1], h > f && m > h) return {
                                        seriesIndex: a.index,
                                        pointIndex: s,
                                        gridData: [e.x, e.y],
                                        data: a.data[s]
                                    };
                            break;
                        case t.jqplot.BubbleRenderer:
                            c = e.x, u = e.y;
                            var C = null;
                            if (a.show) {
                                for (var s = 0; s < a.gridData.length; s++) y = a.gridData[s], v = Math.sqrt((c - y[0]) * (c - y[0]) + (u - y[1]) * (u - y[1])), v <= y[2] && (g >= v || null == g) && (g = v, C = {
                                    seriesIndex: i,
                                    pointIndex: s,
                                    gridData: y,
                                    data: a.data[s]
                                });
                                if (null != C) return C
                            }
                            break;
                        case t.jqplot.FunnelRenderer:
                            c = e.x, u = e.y;
                            var S, E, D, T = a._vertices,
                                O = T[0],
                                M = T[T.length - 1];
                            for (S = n(u, O[0], M[3]), E = n(u, O[1], M[2]), s = 0; s < T.length; s++)
                                if (D = T[s], u >= D[0][1] && u <= D[3][1] && c >= S[0] && c <= E[0]) return {
                                    seriesIndex: a.index,
                                    pointIndex: s,
                                    gridData: null,
                                    data: a.data[s]
                                };
                            break;
                        case t.jqplot.LineRenderer:
                            if (c = e.x, u = e.y, l = a.renderer, a.show) {
                                if (!(!(a.fill || a.renderer.bands.show && a.renderer.bands.fill) || r.plugins.highlighter && r.plugins.highlighter.show)) {
                                    var N = !1;
                                    if (c > a._boundingBox[0][0] && c < a._boundingBox[1][0] && u > a._boundingBox[1][1] && u < a._boundingBox[0][1])
                                        for (var P, j = a._areaPoints.length, s = j - 1, P = 0; j > P; P++) {
                                            var R = [a._areaPoints[P][0], a._areaPoints[P][1]],
                                                I = [a._areaPoints[s][0], a._areaPoints[s][1]];
                                            (R[1] < u && I[1] >= u || I[1] < u && R[1] >= u) && R[0] + (u - R[1]) / (I[1] - R[1]) * (I[0] - R[0]) < c && (N = !N), s = P
                                        }
                                    if (N) return {
                                        seriesIndex: i,
                                        pointIndex: null,
                                        gridData: a.gridData,
                                        data: a.data,
                                        points: a._areaPoints
                                    };
                                    break
                                }
                                x = a.markerRenderer.size / 2 + a.neighborThreshold, _ = x > 0 ? x : 0;
                                for (var s = 0; s < a.gridData.length; s++)
                                    if (y = a.gridData[s], l.constructor == t.jqplot.OHLCRenderer)
                                        if (l.candleStick) {
                                            var A = a._yaxis.series_u2p;
                                            if (c >= y[0] - l._bodyWidth / 2 && c <= y[0] + l._bodyWidth / 2 && u >= A(a.data[s][2]) && u <= A(a.data[s][3])) return {
                                                seriesIndex: i,
                                                pointIndex: s,
                                                gridData: y,
                                                data: a.data[s]
                                            }
                                        } else if (l.hlc) {
                                    var A = a._yaxis.series_u2p;
                                    if (c >= y[0] - l._tickLength && c <= y[0] + l._tickLength && u >= A(a.data[s][1]) && u <= A(a.data[s][2])) return {
                                        seriesIndex: i,
                                        pointIndex: s,
                                        gridData: y,
                                        data: a.data[s]
                                    }
                                } else {
                                    var A = a._yaxis.series_u2p;
                                    if (c >= y[0] - l._tickLength && c <= y[0] + l._tickLength && u >= A(a.data[s][2]) && u <= A(a.data[s][3])) return {
                                        seriesIndex: i,
                                        pointIndex: s,
                                        gridData: y,
                                        data: a.data[s]
                                    }
                                } else if (null != y[0] && null != y[1] && (v = Math.sqrt((c - y[0]) * (c - y[0]) + (u - y[1]) * (u - y[1])), _ >= v && (g >= v || null == g))) return g = v, {
                                    seriesIndex: i,
                                    pointIndex: s,
                                    gridData: y,
                                    data: a.data[s]
                                }
                            }
                            break;
                        default:
                            if (c = e.x, u = e.y, l = a.renderer, a.show) {
                                x = a.markerRenderer.size / 2 + a.neighborThreshold, _ = x > 0 ? x : 0;
                                for (var s = 0; s < a.gridData.length; s++)
                                    if (y = a.gridData[s], l.constructor == t.jqplot.OHLCRenderer)
                                        if (l.candleStick) {
                                            var A = a._yaxis.series_u2p;
                                            if (c >= y[0] - l._bodyWidth / 2 && c <= y[0] + l._bodyWidth / 2 && u >= A(a.data[s][2]) && u <= A(a.data[s][3])) return {
                                                seriesIndex: i,
                                                pointIndex: s,
                                                gridData: y,
                                                data: a.data[s]
                                            }
                                        } else if (l.hlc) {
                                    var A = a._yaxis.series_u2p;
                                    if (c >= y[0] - l._tickLength && c <= y[0] + l._tickLength && u >= A(a.data[s][1]) && u <= A(a.data[s][2])) return {
                                        seriesIndex: i,
                                        pointIndex: s,
                                        gridData: y,
                                        data: a.data[s]
                                    }
                                } else {
                                    var A = a._yaxis.series_u2p;
                                    if (c >= y[0] - l._tickLength && c <= y[0] + l._tickLength && u >= A(a.data[s][2]) && u <= A(a.data[s][3])) return {
                                        seriesIndex: i,
                                        pointIndex: s,
                                        gridData: y,
                                        data: a.data[s]
                                    }
                                } else if (v = Math.sqrt((c - y[0]) * (c - y[0]) + (u - y[1]) * (u - y[1])), _ >= v && (g >= v || null == g)) return g = v, {
                                    seriesIndex: i,
                                    pointIndex: s,
                                    gridData: y,
                                    data: a.data[s]
                                }
                            }
                    }
                    return null
                }
                this.animate = !1, this.animateReplot = !1, this.axes = {
                    xaxis: new r("xaxis"),
                    yaxis: new r("yaxis"),
                    x2axis: new r("x2axis"),
                    y2axis: new r("y2axis"),
                    y3axis: new r("y3axis"),
                    y4axis: new r("y4axis"),
                    y5axis: new r("y5axis"),
                    y6axis: new r("y6axis"),
                    y7axis: new r("y7axis"),
                    y8axis: new r("y8axis"),
                    y9axis: new r("y9axis"),
                    yMidAxis: new r("yMidAxis")
                }, this.baseCanvas = new t.jqplot.GenericCanvas, this.captureRightClick = !1, this.data = [], this.dataRenderer, this.dataRendererOptions, this.defaults = {
                    axesDefaults: {},
                    axes: {
                        xaxis: {},
                        yaxis: {},
                        x2axis: {},
                        y2axis: {},
                        y3axis: {},
                        y4axis: {},
                        y5axis: {},
                        y6axis: {},
                        y7axis: {},
                        y8axis: {},
                        y9axis: {},
                        yMidAxis: {}
                    },
                    seriesDefaults: {},
                    series: []
                }, this.defaultAxisStart = 1, this.drawIfHidden = !1, this.eventCanvas = new t.jqplot.GenericCanvas, this.fillBetween = {
                    series1: null,
                    series2: null,
                    color: null,
                    baseSeries: 0,
                    fill: !0
                }, this.fontFamily, this.fontSize, this.grid = new o, this.legend = new n, this.noDataIndicator = {
                    show: !1,
                    indicator: "Loading Data...",
                    axes: {
                        xaxis: {
                            min: 0,
                            max: 10,
                            tickInterval: 2,
                            show: !0
                        },
                        yaxis: {
                            min: 0,
                            max: 12,
                            tickInterval: 3,
                            show: !0
                        }
                    }
                }, this.negativeSeriesColors = t.jqplot.config.defaultNegativeColors, this.options = {}, this.previousSeriesStack = [], this.plugins = {}, this.series = [], this.seriesStack = [], this.seriesColors = t.jqplot.config.defaultColors, this.sortData = !0, this.stackSeries = !1, this.syncXTicks = !0, this.syncYTicks = !0, this.target = null, this.targetId = null, this.textColor, this.title = new i, this._drawCount = 0, this._sumy = 0, this._sumx = 0, this._stackData = [], this._plotData = [], this._width = null, this._height = null, this._plotDimensions = {
                    height: null,
                    width: null
                }, this._gridPadding = {
                    top: null,
                    right: null,
                    bottom: null,
                    left: null
                }, this._defaultGridPadding = {
                    top: 10,
                    right: 10,
                    bottom: 23,
                    left: 10
                }, this._addDomReference = t.jqplot.config.addDomReference, this.preInitHooks = new t.jqplot.HooksManager, this.postInitHooks = new t.jqplot.HooksManager, this.preParseOptionsHooks = new t.jqplot.HooksManager, this.postParseOptionsHooks = new t.jqplot.HooksManager, this.preDrawHooks = new t.jqplot.HooksManager, this.postDrawHooks = new t.jqplot.HooksManager, this.preDrawSeriesHooks = new t.jqplot.HooksManager, this.postDrawSeriesHooks = new t.jqplot.HooksManager, this.preDrawLegendHooks = new t.jqplot.HooksManager, this.addLegendRowHooks = new t.jqplot.HooksManager, this.preSeriesInitHooks = new t.jqplot.HooksManager, this.postSeriesInitHooks = new t.jqplot.HooksManager, this.preParseSeriesOptionsHooks = new t.jqplot.HooksManager, this.postParseSeriesOptionsHooks = new t.jqplot.HooksManager, this.eventListenerHooks = new t.jqplot.EventListenerManager, this.preDrawSeriesShadowHooks = new t.jqplot.HooksManager, this.postDrawSeriesShadowHooks = new t.jqplot.HooksManager, this.colorGenerator = new t.jqplot.ColorGenerator, this.negativeColorGenerator = new t.jqplot.ColorGenerator, this.canvasManager = new t.jqplot.CanvasManager, this.themeEngine = new t.jqplot.ThemeEngine;
                this.init = function(n, i, s) {
                    s = s || {};
                    for (var o = 0; o < t.jqplot.preInitHooks.length; o++) t.jqplot.preInitHooks[o].call(this, n, i, s);
                    for (var o = 0; o < this.preInitHooks.hooks.length; o++) this.preInitHooks.hooks[o].call(this, n, i, s);
                    if (this.targetId = "#" + n, this.target = t("#" + n), this._addDomReference && this.target.data("jqplot", this), this.target.removeClass("jqplot-error"), !this.target.get(0)) throw new Error("No plot target specified");
                    if ("static" == this.target.css("position") && this.target.css("position", "relative"), this.target.hasClass("jqplot-target") || this.target.addClass("jqplot-target"), this.target.height()) this._height = a = this.target.height();
                    else {
                        var a;
                        a = s && s.height ? parseInt(s.height, 10) : this.target.attr("data-height") ? parseInt(this.target.attr("data-height"), 10) : parseInt(t.jqplot.config.defaultHeight, 10), this._height = a, this.target.css("height", a + "px")
                    }
                    if (this.target.width()) this._width = l = this.target.width();
                    else {
                        var l;
                        l = s && s.width ? parseInt(s.width, 10) : this.target.attr("data-width") ? parseInt(this.target.attr("data-width"), 10) : parseInt(t.jqplot.config.defaultWidth, 10), this._width = l, this.target.css("width", l + "px")
                    }
                    for (var o = 0, c = j.length; c > o; o++) this.axes[j[o]] = new r(j[o]);
                    if (this._plotDimensions.height = this._height, this._plotDimensions.width = this._width, this.grid._plotDimensions = this._plotDimensions, this.title._plotDimensions = this._plotDimensions, this.baseCanvas._plotDimensions = this._plotDimensions, this.eventCanvas._plotDimensions = this._plotDimensions, this.legend._plotDimensions = this._plotDimensions, this._height <= 0 || this._width <= 0 || !this._height || !this._width) throw new Error("Canvas dimension not set");
                    if (s.dataRenderer && t.isFunction(s.dataRenderer) && (s.dataRendererOptions && (this.dataRendererOptions = s.dataRendererOptions), this.dataRenderer = s.dataRenderer, i = this.dataRenderer(i, this, this.dataRendererOptions)), s.noDataIndicator && t.isPlainObject(s.noDataIndicator) && t.extend(!0, this.noDataIndicator, s.noDataIndicator), null == i || 0 == t.isArray(i) || 0 == i.length || 0 == t.isArray(i[0]) || 0 == i[0].length) {
                        if (0 == this.noDataIndicator.show) throw new Error("No data specified");
                        for (var u in this.noDataIndicator.axes)
                            for (var h in this.noDataIndicator.axes[u]) this.axes[u][h] = this.noDataIndicator.axes[u][h];
                        this.postDrawHooks.add(function() {
                            var e = this.eventCanvas.getHeight(),
                                r = this.eventCanvas.getWidth(),
                                n = t('<div class="jqplot-noData-container" style="position:absolute;"></div>');
                            this.target.append(n), n.height(e), n.width(r), n.css("top", this.eventCanvas._offsets.top), n.css("left", this.eventCanvas._offsets.left);
                            var i = t('<div class="jqplot-noData-contents" style="text-align:center; position:relative; margin-left:auto; margin-right:auto;"></div>');
                            n.append(i), i.html(this.noDataIndicator.indicator);
                            var s = i.height(),
                                o = i.width();
                            i.height(s), i.width(o), i.css("top", (e - s) / 2 + "px")
                        })
                    }
                    this.data = t.extend(!0, [], i), this.parseOptions(s), this.textColor && this.target.css("color", this.textColor), this.fontFamily && this.target.css("font-family", this.fontFamily), this.fontSize && this.target.css("font-size", this.fontSize), this.title.init(), this.legend.init(), this._sumy = 0, this._sumx = 0, this.computePlotData();
                    for (var o = 0; o < this.series.length; o++) {
                        this.seriesStack.push(o), this.previousSeriesStack.push(o), this.series[o].shadowCanvas._plotDimensions = this._plotDimensions, this.series[o].canvas._plotDimensions = this._plotDimensions;
                        for (var p = 0; p < t.jqplot.preSeriesInitHooks.length; p++) t.jqplot.preSeriesInitHooks[p].call(this.series[o], n, this.data, this.options.seriesDefaults, this.options.series[o], this);
                        for (var p = 0; p < this.preSeriesInitHooks.hooks.length; p++) this.preSeriesInitHooks.hooks[p].call(this.series[o], n, this.data, this.options.seriesDefaults, this.options.series[o], this);
                        this.series[o]._plotDimensions = this._plotDimensions, this.series[o].init(o, this.grid.borderWidth, this);
                        for (var p = 0; p < t.jqplot.postSeriesInitHooks.length; p++) t.jqplot.postSeriesInitHooks[p].call(this.series[o], n, this.data, this.options.seriesDefaults, this.options.series[o], this);
                        for (var p = 0; p < this.postSeriesInitHooks.hooks.length; p++) this.postSeriesInitHooks.hooks[p].call(this.series[o], n, this.data, this.options.seriesDefaults, this.options.series[o], this);
                        this._sumy += this.series[o]._sumy, this._sumx += this.series[o]._sumx
                    }
                    for (var d, f, o = 0, c = j.length; c > o; o++) d = j[o], f = this.axes[d], f._plotDimensions = this._plotDimensions, f.init(), null == this.axes[d].borderColor && ("x" !== d.charAt(0) && f.useSeriesColor === !0 && f.show ? f.borderColor = f._series[0].color : f.borderColor = this.grid.borderColor);
                    this.sortData && e(this.series), this.grid.init(), this.grid._axes = this.axes, this.legend._series = this.series;
                    for (var o = 0; o < t.jqplot.postInitHooks.length; o++) t.jqplot.postInitHooks[o].call(this, n, this.data, s);
                    for (var o = 0; o < this.postInitHooks.hooks.length; o++) this.postInitHooks.hooks[o].call(this, n, this.data, s)
                }, this.resetAxesScale = function(e, r) {
                    var n = r || {},
                        i = e || this.axes;
                    if (i === !0 && (i = this.axes), t.isArray(i))
                        for (var s = 0; s < i.length; s++) this.axes[i[s]].resetScale(n[i[s]]);
                    else if ("object" == typeof i)
                        for (var o in i) this.axes[o].resetScale(n[o])
                }, this.reInitialize = function(n, i) {
                    for (var s = t.extend(!0, {}, this.options, i), o = this.targetId.substr(1), a = null == n ? this.data : n, l = 0; l < t.jqplot.preInitHooks.length; l++) t.jqplot.preInitHooks[l].call(this, o, a, s);
                    for (var l = 0; l < this.preInitHooks.hooks.length; l++) this.preInitHooks.hooks[l].call(this, o, a, s);
                    if (this._height = this.target.height(), this._width = this.target.width(), this._height <= 0 || this._width <= 0 || !this._height || !this._width) throw new Error("Target dimension not set");
                    this._plotDimensions.height = this._height,
                        this._plotDimensions.width = this._width, this.grid._plotDimensions = this._plotDimensions, this.title._plotDimensions = this._plotDimensions, this.baseCanvas._plotDimensions = this._plotDimensions, this.eventCanvas._plotDimensions = this._plotDimensions, this.legend._plotDimensions = this._plotDimensions;
                    for (var c, u, h, p, l = 0, d = j.length; d > l; l++) {
                        c = j[l], p = this.axes[c], u = p._ticks;
                        for (var h = 0, f = u.length; f > h; h++) {
                            var m = u[h]._elem;
                            m && (t.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== P && window.G_vmlCanvasManager.uninitElement(m.get(0)), m.emptyForce(), m = null, u._elem = null)
                        }
                        u = null, delete p.ticks, delete p._ticks, this.axes[c] = new r(c), this.axes[c]._plotWidth = this._width, this.axes[c]._plotHeight = this._height
                    }
                    n && (s.dataRenderer && t.isFunction(s.dataRenderer) && (s.dataRendererOptions && (this.dataRendererOptions = s.dataRendererOptions), this.dataRenderer = s.dataRenderer, n = this.dataRenderer(n, this, this.dataRendererOptions)), this.data = t.extend(!0, [], n)), i && this.parseOptions(s), this.title._plotWidth = this._width, this.textColor && this.target.css("color", this.textColor), this.fontFamily && this.target.css("font-family", this.fontFamily), this.fontSize && this.target.css("font-size", this.fontSize), this.title.init(), this.legend.init(), this._sumy = 0, this._sumx = 0, this.seriesStack = [], this.previousSeriesStack = [], this.computePlotData();
                    for (var l = 0, d = this.series.length; d > l; l++) {
                        this.seriesStack.push(l), this.previousSeriesStack.push(l), this.series[l].shadowCanvas._plotDimensions = this._plotDimensions, this.series[l].canvas._plotDimensions = this._plotDimensions;
                        for (var h = 0; h < t.jqplot.preSeriesInitHooks.length; h++) t.jqplot.preSeriesInitHooks[h].call(this.series[l], o, this.data, this.options.seriesDefaults, this.options.series[l], this);
                        for (var h = 0; h < this.preSeriesInitHooks.hooks.length; h++) this.preSeriesInitHooks.hooks[h].call(this.series[l], o, this.data, this.options.seriesDefaults, this.options.series[l], this);
                        this.series[l]._plotDimensions = this._plotDimensions, this.series[l].init(l, this.grid.borderWidth, this);
                        for (var h = 0; h < t.jqplot.postSeriesInitHooks.length; h++) t.jqplot.postSeriesInitHooks[h].call(this.series[l], o, this.data, this.options.seriesDefaults, this.options.series[l], this);
                        for (var h = 0; h < this.postSeriesInitHooks.hooks.length; h++) this.postSeriesInitHooks.hooks[h].call(this.series[l], o, this.data, this.options.seriesDefaults, this.options.series[l], this);
                        this._sumy += this.series[l]._sumy, this._sumx += this.series[l]._sumx
                    }
                    for (var l = 0, d = j.length; d > l; l++) c = j[l], p = this.axes[c], p._plotDimensions = this._plotDimensions, p.init(), null == p.borderColor && ("x" !== c.charAt(0) && p.useSeriesColor === !0 && p.show ? p.borderColor = p._series[0].color : p.borderColor = this.grid.borderColor);
                    this.sortData && e(this.series), this.grid.init(), this.grid._axes = this.axes, this.legend._series = this.series;
                    for (var l = 0, d = t.jqplot.postInitHooks.length; d > l; l++) t.jqplot.postInitHooks[l].call(this, o, this.data, s);
                    for (var l = 0, d = this.postInitHooks.hooks.length; d > l; l++) this.postInitHooks.hooks[l].call(this, o, this.data, s)
                }, this.quickInit = function() {
                    if (this._height = this.target.height(), this._width = this.target.width(), this._height <= 0 || this._width <= 0 || !this._height || !this._width) throw new Error("Target dimension not set");
                    this._plotDimensions.height = this._height, this._plotDimensions.width = this._width, this.grid._plotDimensions = this._plotDimensions, this.title._plotDimensions = this._plotDimensions, this.baseCanvas._plotDimensions = this._plotDimensions, this.eventCanvas._plotDimensions = this._plotDimensions, this.legend._plotDimensions = this._plotDimensions;
                    for (var r in this.axes) this.axes[r]._plotWidth = this._width, this.axes[r]._plotHeight = this._height;
                    this.title._plotWidth = this._width, this.textColor && this.target.css("color", this.textColor), this.fontFamily && this.target.css("font-family", this.fontFamily), this.fontSize && this.target.css("font-size", this.fontSize), this._sumy = 0, this._sumx = 0, this.computePlotData();
                    for (var n = 0; n < this.series.length; n++) "line" === this.series[n]._type && this.series[n].renderer.bands.show && this.series[n].renderer.initBands.call(this.series[n], this.series[n].renderer.options, this), this.series[n]._plotDimensions = this._plotDimensions, this.series[n].canvas._plotDimensions = this._plotDimensions, this._sumy += this.series[n]._sumy, this._sumx += this.series[n]._sumx;
                    for (var i, s = 0; 12 > s; s++) {
                        i = j[s];
                        for (var o = this.axes[i]._ticks, n = 0; n < o.length; n++) {
                            var a = o[n]._elem;
                            a && (t.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== P && window.G_vmlCanvasManager.uninitElement(a.get(0)), a.emptyForce(), a = null, o._elem = null)
                        }
                        o = null, this.axes[i]._plotDimensions = this._plotDimensions, this.axes[i]._ticks = []
                    }
                    this.sortData && e(this.series), this.grid._axes = this.axes, this.legend._series = this.series
                }, this.computePlotData = function() {
                    this._plotData = [], this._stackData = [];
                    var e, r, n;
                    for (r = 0, n = this.series.length; n > r; r++) {
                        e = this.series[r], this._plotData.push([]), this._stackData.push([]);
                        var i = e.data;
                        this._plotData[r] = t.extend(!0, [], i), this._stackData[r] = t.extend(!0, [], i), e._plotData = this._plotData[r], e._stackData = this._stackData[r];
                        var s = {
                            x: [],
                            y: []
                        };
                        if (this.stackSeries && !e.disableStack) {
                            e._stack = !0;
                            for (var o = "x" === e._stackAxis ? 0 : 1, a = 0, l = i.length; l > a; a++) {
                                var c = i[a][o];
                                if (null == c && (c = 0), this._plotData[r][a][o] = c, this._stackData[r][a][o] = c, r > 0)
                                    for (var u = r; u--;) {
                                        var h = this._plotData[u][a][o];
                                        if (c * h >= 0) {
                                            this._plotData[r][a][o] += h, this._stackData[r][a][o] += h;
                                            break
                                        }
                                    }
                            }
                        } else {
                            for (var p = 0; p < e.data.length; p++) s.x.push(e.data[p][0]), s.y.push(e.data[p][1]);
                            this._stackData.push(e.data), this.series[r]._stackData = e.data, this._plotData.push(e.data), e._plotData = e.data, e._plotValues = s
                        }
                        for (r > 0 && (e._prevPlotData = this.series[r - 1]._plotData), e._sumy = 0, e._sumx = 0, p = e.data.length - 1; p > -1; p--) e._sumy += e.data[p][1], e._sumx += e.data[p][0]
                    }
                }, this.populatePlotData = function(e, r) {
                    this._plotData = [], this._stackData = [], e._stackData = [], e._plotData = [];
                    var n = {
                        x: [],
                        y: []
                    };
                    if (this.stackSeries && !e.disableStack) {
                        e._stack = !0;
                        for (var i, s, o, a, l = "x" === e._stackAxis ? 0 : 1, c = t.extend(!0, [], e.data), u = t.extend(!0, [], e.data), h = 0; r > h; h++)
                            for (var p = this.series[h].data, d = 0; d < p.length; d++) o = p[d], i = null != o[0] ? o[0] : 0, s = null != o[1] ? o[1] : 0, c[d][0] += i, c[d][1] += s, a = l ? s : i, e.data[d][l] * a >= 0 && (u[d][l] += a);
                        for (var f = 0; f < u.length; f++) n.x.push(u[f][0]), n.y.push(u[f][1]);
                        this._plotData.push(u), this._stackData.push(c), e._stackData = c, e._plotData = u, e._plotValues = n
                    } else {
                        for (var f = 0; f < e.data.length; f++) n.x.push(e.data[f][0]), n.y.push(e.data[f][1]);
                        this._stackData.push(e.data), this.series[r]._stackData = e.data, this._plotData.push(e.data), e._plotData = e.data, e._plotValues = n
                    }
                    for (r > 0 && (e._prevPlotData = this.series[r - 1]._plotData), e._sumy = 0, e._sumx = 0, f = e.data.length - 1; f > -1; f--) e._sumy += e.data[f][1], e._sumx += e.data[f][0]
                }, this.getNextSeriesColor = function(e) {
                    var t = 0,
                        r = e.seriesColors;
                    return function() {
                        return t < r.length ? r[t++] : (t = 0, r[t++])
                    }
                }(this), this.parseOptions = function(e) {
                    for (var r = 0; r < this.preParseOptionsHooks.hooks.length; r++) this.preParseOptionsHooks.hooks[r].call(this, e);
                    for (var r = 0; r < t.jqplot.preParseOptionsHooks.length; r++) t.jqplot.preParseOptionsHooks[r].call(this, e);
                    this.options = t.extend(!0, {}, this.defaults, e);
                    var n = this.options;
                    if (this.animate = n.animate, this.animateReplot = n.animateReplot, this.stackSeries = n.stackSeries, t.isPlainObject(n.fillBetween))
                        for (var i, o = ["series1", "series2", "color", "baseSeries", "fill"], r = 0, a = o.length; a > r; r++) i = o[r], null != n.fillBetween[i] && (this.fillBetween[i] = n.fillBetween[i]);
                    n.seriesColors && (this.seriesColors = n.seriesColors), n.negativeSeriesColors && (this.negativeSeriesColors = n.negativeSeriesColors), n.captureRightClick && (this.captureRightClick = n.captureRightClick), this.defaultAxisStart = e && null != e.defaultAxisStart ? e.defaultAxisStart : this.defaultAxisStart, this.colorGenerator.setColors(this.seriesColors), this.negativeColorGenerator.setColors(this.negativeSeriesColors), t.extend(!0, this._gridPadding, n.gridPadding), this.sortData = null != n.sortData ? n.sortData : this.sortData;
                    for (var r = 0; 12 > r; r++) {
                        var l = j[r],
                            c = this.axes[l];
                        c._options = t.extend(!0, {}, n.axesDefaults, n.axes[l]), t.extend(!0, c, n.axesDefaults, n.axes[l]), c._plotWidth = this._width, c._plotHeight = this._height
                    }
                    var u = function(e, r, n) {
                        var i, s, o = [];
                        if (r = r || "vertical", t.isArray(e[0])) t.extend(!0, o, e);
                        else
                            for (i = 0, s = e.length; s > i; i++) "vertical" == r ? o.push([n + i, e[i]]) : o.push([e[i], n + i]);
                        return o
                    };
                    this.series = [];
                    for (var r = 0; r < this.data.length; r++) {
                        for (var h = t.extend(!0, {
                                index: r
                            }, {
                                seriesColors: this.seriesColors,
                                negativeSeriesColors: this.negativeSeriesColors
                            }, this.options.seriesDefaults, this.options.series[r], {
                                rendererOptions: {
                                    animation: {
                                        show: this.animate
                                    }
                                }
                            }), o = new s(h), p = 0; p < t.jqplot.preParseSeriesOptionsHooks.length; p++) t.jqplot.preParseSeriesOptionsHooks[p].call(o, this.options.seriesDefaults, this.options.series[r]);
                        for (var p = 0; p < this.preParseSeriesOptionsHooks.hooks.length; p++) this.preParseSeriesOptionsHooks.hooks[p].call(o, this.options.seriesDefaults, this.options.series[r]);
                        t.extend(!0, o, h);
                        var d = "vertical";
                        switch (o.renderer === t.jqplot.BarRenderer && o.rendererOptions && "horizontal" == o.rendererOptions.barDirection && (d = "horizontal", o._stackAxis = "x", o._primaryAxis = "_yaxis"), o.data = u(this.data[r], d, this.defaultAxisStart), o.xaxis) {
                            case "xaxis":
                                o._xaxis = this.axes.xaxis;
                                break;
                            case "x2axis":
                                o._xaxis = this.axes.x2axis
                        }
                        o._yaxis = this.axes[o.yaxis], o._xaxis._series.push(o), o._yaxis._series.push(o), o.show ? (o._xaxis.show = !0, o._yaxis.show = !0) : (o._xaxis.scaleToHiddenSeries && (o._xaxis.show = !0), o._yaxis.scaleToHiddenSeries && (o._yaxis.show = !0)), o.label || (o.label = "Series " + (r + 1).toString()), this.series.push(o);
                        for (var p = 0; p < t.jqplot.postParseSeriesOptionsHooks.length; p++) t.jqplot.postParseSeriesOptionsHooks[p].call(this.series[r], this.options.seriesDefaults, this.options.series[r]);
                        for (var p = 0; p < this.postParseSeriesOptionsHooks.hooks.length; p++) this.postParseSeriesOptionsHooks.hooks[p].call(this.series[r], this.options.seriesDefaults, this.options.series[r])
                    }
                    t.extend(!0, this.grid, this.options.grid);
                    for (var r = 0, a = j.length; a > r; r++) {
                        var l = j[r],
                            c = this.axes[l];
                        null == c.borderWidth && (c.borderWidth = this.grid.borderWidth)
                    }
                    "string" == typeof this.options.title ? this.title.text = this.options.title : "object" == typeof this.options.title && t.extend(!0, this.title, this.options.title), this.title._plotWidth = this._width, this.legend.setOptions(this.options.legend);
                    for (var r = 0; r < t.jqplot.postParseOptionsHooks.length; r++) t.jqplot.postParseOptionsHooks[r].call(this, e);
                    for (var r = 0; r < this.postParseOptionsHooks.hooks.length; r++) this.postParseOptionsHooks.hooks[r].call(this, e)
                }, this.destroy = function() {
                    this.canvasManager.freeAllCanvases(), this.eventCanvas && this.eventCanvas._elem && this.eventCanvas._elem.unbind(), this.target.empty(), this.target[0].innerHTML = ""
                }, this.replot = function(e) {
                    var r = e || {},
                        n = r.data || null,
                        i = r.clear === !1 ? !1 : !0,
                        s = r.resetAxes || !1;
                    delete r.data, delete r.clear, delete r.resetAxes, this.target.trigger("jqplotPreReplot"), i && this.destroy(), n || !t.isEmptyObject(r) ? this.reInitialize(n, r) : this.quickInit(), s && this.resetAxesScale(s, r.axes), this.draw(), this.target.trigger("jqplotPostReplot")
                }, this.redraw = function(e) {
                    e = null != e ? e : !0, this.target.trigger("jqplotPreRedraw"), e && (this.canvasManager.freeAllCanvases(), this.eventCanvas._elem.unbind(), this.target.empty());
                    for (var t in this.axes) this.axes[t]._ticks = [];
                    this.computePlotData(), this._sumy = 0, this._sumx = 0;
                    for (var r = 0, n = this.series.length; n > r; r++) this._sumy += this.series[r]._sumy, this._sumx += this.series[r]._sumx;
                    this.draw(), this.target.trigger("jqplotPostRedraw")
                }, this.draw = function() {
                    if (this.drawIfHidden || this.target.is(":visible")) {
                        this.target.trigger("jqplotPreDraw");
                        var e, r, n;
                        for (e = 0, n = t.jqplot.preDrawHooks.length; n > e; e++) t.jqplot.preDrawHooks[e].call(this);
                        for (e = 0, n = this.preDrawHooks.hooks.length; n > e; e++) this.preDrawHooks.hooks[e].apply(this, this.preDrawSeriesHooks.args[e]);
                        this.target.append(this.baseCanvas.createElement({
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }, "jqplot-base-canvas", null, this)), this.baseCanvas.setContext(), this.target.append(this.title.draw()), this.title.pack({
                            top: 0,
                            left: 0
                        });
                        var i = this.legend.draw({}, this),
                            s = {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            };
                        if ("outsideGrid" == this.legend.placement) {
                            switch (this.target.append(i), this.legend.location) {
                                case "n":
                                    s.top += this.legend.getHeight();
                                    break;
                                case "s":
                                    s.bottom += this.legend.getHeight();
                                    break;
                                case "ne":
                                case "e":
                                case "se":
                                    s.right += this.legend.getWidth();
                                    break;
                                case "nw":
                                case "w":
                                case "sw":
                                    s.left += this.legend.getWidth();
                                    break;
                                default:
                                    s.right += this.legend.getWidth()
                            }
                            i = i.detach()
                        }
                        var o, a = this.axes;
                        for (e = 0; 12 > e; e++) o = j[e], this.target.append(a[o].draw(this.baseCanvas._ctx, this)), a[o].set();
                        a.yaxis.show && (s.left += a.yaxis.getWidth());
                        var l, c = ["y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis"],
                            u = [0, 0, 0, 0, 0, 0, 0, 0],
                            h = 0;
                        for (l = 0; 8 > l; l++) a[c[l]].show && (h += a[c[l]].getWidth(), u[l] = h);
                        if (s.right += h, a.x2axis.show && (s.top += a.x2axis.getHeight()), this.title.show && (s.top += this.title.getHeight()), a.xaxis.show && (s.bottom += a.xaxis.getHeight()), this.options.gridDimensions && t.isPlainObject(this.options.gridDimensions)) {
                            var p = parseInt(this.options.gridDimensions.width, 10) || 0,
                                d = parseInt(this.options.gridDimensions.height, 10) || 0,
                                f = (this._width - s.left - s.right - p) / 2,
                                m = (this._height - s.top - s.bottom - d) / 2;
                            m >= 0 && f >= 0 && (s.top += m, s.bottom += m, s.left += f, s.right += f)
                        }
                        var g = ["top", "bottom", "left", "right"];
                        for (var l in g) null == this._gridPadding[g[l]] && s[g[l]] > 0 ? this._gridPadding[g[l]] = s[g[l]] : null == this._gridPadding[g[l]] && (this._gridPadding[g[l]] = this._defaultGridPadding[g[l]]);
                        var v = this._gridPadding;
                        for ("outsideGrid" === this.legend.placement && (v = {
                                top: this.title.getHeight(),
                                left: 0,
                                right: 0,
                                bottom: 0
                            }, "s" === this.legend.location && (v.left = this._gridPadding.left, v.right = this._gridPadding.right)), a.xaxis.pack({
                                position: "absolute",
                                bottom: this._gridPadding.bottom - a.xaxis.getHeight(),
                                left: 0,
                                width: this._width
                            }, {
                                min: this._gridPadding.left,
                                max: this._width - this._gridPadding.right
                            }), a.yaxis.pack({
                                position: "absolute",
                                top: 0,
                                left: this._gridPadding.left - a.yaxis.getWidth(),
                                height: this._height
                            }, {
                                min: this._height - this._gridPadding.bottom,
                                max: this._gridPadding.top
                            }), a.x2axis.pack({
                                position: "absolute",
                                top: this._gridPadding.top - a.x2axis.getHeight(),
                                left: 0,
                                width: this._width
                            }, {
                                min: this._gridPadding.left,
                                max: this._width - this._gridPadding.right
                            }), e = 8; e > 0; e--) a[c[e - 1]].pack({
                            position: "absolute",
                            top: 0,
                            right: this._gridPadding.right - u[e - 1]
                        }, {
                            min: this._height - this._gridPadding.bottom,
                            max: this._gridPadding.top
                        });
                        var y = (this._width - this._gridPadding.left - this._gridPadding.right) / 2 + this._gridPadding.left - a.yMidAxis.getWidth() / 2;
                        a.yMidAxis.pack({
                            position: "absolute",
                            top: 0,
                            left: y,
                            zIndex: 9,
                            textAlign: "center"
                        }, {
                            min: this._height - this._gridPadding.bottom,
                            max: this._gridPadding.top
                        }), this.target.append(this.grid.createElement(this._gridPadding, this)), this.grid.draw();
                        var b = this.series,
                            w = b.length;
                        for (e = 0, n = w; n > e; e++) r = this.seriesStack[e], this.target.append(b[r].shadowCanvas.createElement(this._gridPadding, "jqplot-series-shadowCanvas", null, this)), b[r].shadowCanvas.setContext(), b[r].shadowCanvas._elem.data("seriesIndex", r);
                        for (e = 0, n = w; n > e; e++) r = this.seriesStack[e], this.target.append(b[r].canvas.createElement(this._gridPadding, "jqplot-series-canvas", null, this)), b[r].canvas.setContext(), b[r].canvas._elem.data("seriesIndex", r);
                        this.target.append(this.eventCanvas.createElement(this._gridPadding, "jqplot-event-canvas", null, this)), this.eventCanvas.setContext(), this.eventCanvas._ctx.fillStyle = "rgba(0,0,0,0)", this.eventCanvas._ctx.fillRect(0, 0, this.eventCanvas._ctx.canvas.width, this.eventCanvas._ctx.canvas.height), this.bindCustomEvents(), this.legend.preDraw ? (this.eventCanvas._elem.before(i), this.legend.pack(v), this.legend._elem ? this.drawSeries({
                            legendInfo: {
                                location: this.legend.location,
                                placement: this.legend.placement,
                                width: this.legend.getWidth(),
                                height: this.legend.getHeight(),
                                xoffset: this.legend.xoffset,
                                yoffset: this.legend.yoffset
                            }
                        }) : this.drawSeries()) : (this.drawSeries(), w && t(b[w - 1].canvas._elem).after(i), this.legend.pack(v));
                        for (var e = 0, n = t.jqplot.eventListenerHooks.length; n > e; e++) this.eventCanvas._elem.bind(t.jqplot.eventListenerHooks[e][0], {
                            plot: this
                        }, t.jqplot.eventListenerHooks[e][1]);
                        for (var e = 0, n = this.eventListenerHooks.hooks.length; n > e; e++) this.eventCanvas._elem.bind(this.eventListenerHooks.hooks[e][0], {
                            plot: this
                        }, this.eventListenerHooks.hooks[e][1]);
                        var _ = this.fillBetween;
                        _.fill && _.series1 !== _.series2 && _.series1 < w && _.series2 < w && "line" === b[_.series1]._type && "line" === b[_.series2]._type && this.doFillBetweenLines();
                        for (var e = 0, n = t.jqplot.postDrawHooks.length; n > e; e++) t.jqplot.postDrawHooks[e].call(this);
                        for (var e = 0, n = this.postDrawHooks.hooks.length; n > e; e++) this.postDrawHooks.hooks[e].apply(this, this.postDrawHooks.args[e]);
                        this.target.is(":visible") && (this._drawCount += 1);
                        var x, k, C, S;
                        for (e = 0, n = w; n > e; e++) x = b[e], k = x.renderer, C = ".jqplot-point-label.jqplot-series-" + e, k.animation && k.animation._supported && k.animation.show && (this._drawCount < 2 || this.animateReplot) && (S = this.target.find(C), S.stop(!0, !0).hide(), x.canvas._elem.stop(!0, !0).hide(), x.shadowCanvas._elem.stop(!0, !0).hide(), x.canvas._elem.jqplotEffect("blind", {
                            mode: "show",
                            direction: k.animation.direction
                        }, k.animation.speed), x.shadowCanvas._elem.jqplotEffect("blind", {
                            mode: "show",
                            direction: k.animation.direction
                        }, k.animation.speed), S.fadeIn(.8 * k.animation.speed));
                        S = null, this.target.trigger("jqplotPostDraw", [this])
                    }
                }, a.prototype.doFillBetweenLines = function() {
                    var e = this.fillBetween,
                        t = e.series1,
                        r = e.series2,
                        n = r > t ? t : r,
                        i = r > t ? r : t,
                        s = this.series[n],
                        o = this.series[i];
                    if (o.renderer.smooth) var a = o.renderer._smoothedData.slice(0).reverse();
                    else var a = o.gridData.slice(0).reverse();
                    if (s.renderer.smooth) var l = s.renderer._smoothedData.concat(a);
                    else var l = s.gridData.concat(a);
                    var c = null !== e.color ? e.color : this.series[t].fillColor,
                        u = null !== e.baseSeries ? e.baseSeries : n,
                        h = this.series[u].renderer.shapeRenderer,
                        p = {
                            fillStyle: c,
                            fill: !0,
                            closePath: !0
                        };
                    h.draw(s.shadowCanvas._ctx, l, p)
                }, this.bindCustomEvents = function() {
                    this.eventCanvas._elem.bind("click", {
                        plot: this
                    }, this.onClick), this.eventCanvas._elem.bind("dblclick", {
                        plot: this
                    }, this.onDblClick), this.eventCanvas._elem.bind("mousedown", {
                        plot: this
                    }, this.onMouseDown), this.eventCanvas._elem.bind("mousemove", {
                        plot: this
                    }, this.onMouseMove), this.eventCanvas._elem.bind("mouseenter", {
                        plot: this
                    }, this.onMouseEnter), this.eventCanvas._elem.bind("mouseleave", {
                        plot: this
                    }, this.onMouseLeave), this.captureRightClick ? (this.eventCanvas._elem.bind("mouseup", {
                        plot: this
                    }, this.onRightClick), this.eventCanvas._elem.get(0).oncontextmenu = function() {
                        return !1
                    }) : this.eventCanvas._elem.bind("mouseup", {
                        plot: this
                    }, this.onMouseUp)
                }, this.onClick = function(e) {
                    var r = l(e),
                        n = e.data.plot,
                        i = c(r.gridPos, n),
                        s = t.Event("jqplotClick");
                    s.pageX = e.pageX, s.pageY = e.pageY, t(this).trigger(s, [r.gridPos, r.dataPos, i, n])
                }, this.onDblClick = function(e) {
                    var r = l(e),
                        n = e.data.plot,
                        i = c(r.gridPos, n),
                        s = t.Event("jqplotDblClick");
                    s.pageX = e.pageX, s.pageY = e.pageY, t(this).trigger(s, [r.gridPos, r.dataPos, i, n])
                }, this.onMouseDown = function(e) {
                    var r = l(e),
                        n = e.data.plot,
                        i = c(r.gridPos, n),
                        s = t.Event("jqplotMouseDown");
                    s.pageX = e.pageX, s.pageY = e.pageY, t(this).trigger(s, [r.gridPos, r.dataPos, i, n])
                }, this.onMouseUp = function(e) {
                    var r = l(e),
                        n = t.Event("jqplotMouseUp");
                    n.pageX = e.pageX, n.pageY = e.pageY, t(this).trigger(n, [r.gridPos, r.dataPos, null, e.data.plot])
                }, this.onRightClick = function(e) {
                    var r = l(e),
                        n = e.data.plot,
                        i = c(r.gridPos, n);
                    if (n.captureRightClick)
                        if (3 == e.which) {
                            var s = t.Event("jqplotRightClick");
                            s.pageX = e.pageX, s.pageY = e.pageY, t(this).trigger(s, [r.gridPos, r.dataPos, i, n])
                        } else {
                            var s = t.Event("jqplotMouseUp");
                            s.pageX = e.pageX, s.pageY = e.pageY, t(this).trigger(s, [r.gridPos, r.dataPos, i, n])
                        }
                }, this.onMouseMove = function(e) {
                    var r = l(e),
                        n = e.data.plot,
                        i = c(r.gridPos, n),
                        s = t.Event("jqplotMouseMove");
                    s.pageX = e.pageX, s.pageY = e.pageY, t(this).trigger(s, [r.gridPos, r.dataPos, i, n])
                }, this.onMouseEnter = function(e) {
                    var r = l(e),
                        n = e.data.plot,
                        i = t.Event("jqplotMouseEnter");
                    i.pageX = e.pageX, i.pageY = e.pageY, i.relatedTarget = e.relatedTarget, t(this).trigger(i, [r.gridPos, r.dataPos, null, n])
                }, this.onMouseLeave = function(e) {
                    var r = l(e),
                        n = e.data.plot,
                        i = t.Event("jqplotMouseLeave");
                    i.pageX = e.pageX, i.pageY = e.pageY, i.relatedTarget = e.relatedTarget, t(this).trigger(i, [r.gridPos, r.dataPos, null, n])
                }, this.drawSeries = function(e, r) {
                    var n, i, s;
                    if (r = "number" == typeof e && null == r ? e : r, e = "object" == typeof e ? e : {}, r != P) i = this.series[r], s = i.shadowCanvas._ctx, s.clearRect(0, 0, s.canvas.width, s.canvas.height), i.drawShadow(s, e, this), s = i.canvas._ctx, s.clearRect(0, 0, s.canvas.width, s.canvas.height), i.draw(s, e, this), i.renderer.constructor == t.jqplot.BezierCurveRenderer && r < this.series.length - 1 && this.drawSeries(r + 1);
                    else
                        for (n = 0; n < this.series.length; n++) i = this.series[n], s = i.shadowCanvas._ctx, s.clearRect(0, 0, s.canvas.width, s.canvas.height), i.drawShadow(s, e, this), s = i.canvas._ctx, s.clearRect(0, 0, s.canvas.width, s.canvas.height), i.draw(s, e, this);
                    e = r = n = i = s = null
                }, this.moveSeriesToFront = function(e) {
                    e = parseInt(e, 10);
                    var r = t.inArray(e, this.seriesStack);
                    if (-1 != r) {
                        if (r == this.seriesStack.length - 1) return void(this.previousSeriesStack = this.seriesStack.slice(0));
                        var n = this.seriesStack[this.seriesStack.length - 1],
                            i = this.series[e].canvas._elem.detach(),
                            s = this.series[e].shadowCanvas._elem.detach();
                        this.series[n].shadowCanvas._elem.after(s), this.series[n].canvas._elem.after(i), this.previousSeriesStack = this.seriesStack.slice(0), this.seriesStack.splice(r, 1), this.seriesStack.push(e)
                    }
                }, this.moveSeriesToBack = function(e) {
                    e = parseInt(e, 10);
                    var r = t.inArray(e, this.seriesStack);
                    if (0 != r && -1 != r) {
                        var n = this.seriesStack[0],
                            i = this.series[e].canvas._elem.detach(),
                            s = this.series[e].shadowCanvas._elem.detach();
                        this.series[n].shadowCanvas._elem.before(s), this.series[n].canvas._elem.before(i), this.previousSeriesStack = this.seriesStack.slice(0), this.seriesStack.splice(r, 1), this.seriesStack.unshift(e)
                    }
                }, this.restorePreviousSeriesOrder = function() {
                    var e, t, r, n, i, s;
                    if (this.seriesStack != this.previousSeriesStack) {
                        for (e = 1; e < this.previousSeriesStack.length; e++) i = this.previousSeriesStack[e], s = this.previousSeriesStack[e - 1], t = this.series[i].canvas._elem.detach(), r = this.series[i].shadowCanvas._elem.detach(), this.series[s].shadowCanvas._elem.after(r), this.series[s].canvas._elem.after(t);
                        n = this.seriesStack.slice(0), this.seriesStack = this.previousSeriesStack.slice(0), this.previousSeriesStack = n
                    }
                }, this.restoreOriginalSeriesOrder = function() {
                    var e, t, r, n = [];
                    for (e = 0; e < this.series.length; e++) n.push(e);
                    if (this.seriesStack != n)
                        for (this.previousSeriesStack = this.seriesStack.slice(0), this.seriesStack = n, e = 1; e < this.seriesStack.length; e++) t = this.series[e].canvas._elem.detach(), r = this.series[e].shadowCanvas._elem.detach(), this.series[e - 1].shadowCanvas._elem.after(r), this.series[e - 1].canvas._elem.after(t)
                }, this.activateTheme = function(e) {
                    this.themeEngine.activate(this, e)
                }
            }

            function l(e, t) {
                return (3.4182054 + t) * Math.pow(e, -.3534992)
            }

            function c(e) {
                var t = (Math.exp(2 * e) - 1) / (Math.exp(2 * e) + 1);
                return t
            }

            function u(e) {
                function t(e, t) {
                    return e - t == 0 ? Math.pow(10, 10) : e - t
                }
                var r = this.renderer.smooth,
                    n = this.canvas.getWidth(),
                    i = this._xaxis.series_p2u,
                    s = this._yaxis.series_p2u,
                    o = null,
                    a = e.length / n,
                    c = [],
                    u = [];
                o = isNaN(parseFloat(r)) ? l(a, .5) : parseFloat(r);
                for (var h = [], p = [], d = 0, f = e.length; f > d; d++) h.push(e[d][1]), p.push(e[d][0]);
                for (var m, g, v, y, b = e.length - 1, w = 1, _ = e.length; _ > w; w++) {
                    for (var x = [], k = [], C = 0; 2 > C; C++) {
                        var d = w - 1 + C;
                        0 == d || d == b ? x[C] = Math.pow(10, 10) : h[d + 1] - h[d] == 0 || h[d] - h[d - 1] == 0 ? x[C] = 0 : (p[d + 1] - p[d]) / (h[d + 1] - h[d]) + (p[d] - p[d - 1]) / (h[d] - h[d - 1]) == 0 ? x[C] = 0 : (h[d + 1] - h[d]) * (h[d] - h[d - 1]) < 0 ? x[C] = 0 : x[C] = 2 / (t(p[d + 1], p[d]) / (h[d + 1] - h[d]) + t(p[d], p[d - 1]) / (h[d] - h[d - 1]))
                    }
                    1 == w ? x[0] = 1.5 * (h[1] - h[0]) / t(p[1], p[0]) - x[1] / 2 : w == b && (x[1] = 1.5 * (h[b] - h[b - 1]) / t(p[b], p[b - 1]) - x[0] / 2), k[0] = -2 * (x[1] + 2 * x[0]) / t(p[w], p[w - 1]) + 6 * (h[w] - h[w - 1]) / Math.pow(t(p[w], p[w - 1]), 2), k[1] = 2 * (2 * x[1] + x[0]) / t(p[w], p[w - 1]) - 6 * (h[w] - h[w - 1]) / Math.pow(t(p[w], p[w - 1]), 2), y = 1 / 6 * (k[1] - k[0]) / t(p[w], p[w - 1]), v = .5 * (p[w] * k[0] - p[w - 1] * k[1]) / t(p[w], p[w - 1]), g = (h[w] - h[w - 1] - v * (Math.pow(p[w], 2) - Math.pow(p[w - 1], 2)) - y * (Math.pow(p[w], 3) - Math.pow(p[w - 1], 3))) / t(p[w], p[w - 1]), m = h[w - 1] - g * p[w - 1] - v * Math.pow(p[w - 1], 2) - y * Math.pow(p[w - 1], 3);
                    for (var S, E, D = (p[w] - p[w - 1]) / o, C = 0, f = o; f > C; C++) S = [], E = p[w - 1] + C * D, S.push(E), S.push(m + g * E + v * Math.pow(E, 2) + y * Math.pow(E, 3)), c.push(S), u.push([i(S[0]), s(S[1])])
                }
                return c.push(e[d]), u.push([i(e[d][0]), s(e[d][1])]), [c, u]
            }

            function h(e) {
                var t, r, n, i, s, o, a, u, h, p, d, f, m, g, v, y, b, w, _ = this.renderer.smooth,
                    x = this.renderer.tension,
                    k = this.canvas.getWidth(),
                    C = this._xaxis.series_p2u,
                    S = this._yaxis.series_p2u,
                    E = null,
                    D = null,
                    T = null,
                    O = null,
                    M = null,
                    N = null,
                    P = null,
                    j = e.length / k,
                    R = [],
                    I = [];
                E = isNaN(parseFloat(_)) ? l(j, .5) : parseFloat(_), isNaN(parseFloat(x)) || (x = parseFloat(x));
                for (var A = 0, L = e.length - 1; L > A; A++)
                    for (null === x ? (M = Math.abs((e[A + 1][1] - e[A][1]) / (e[A + 1][0] - e[A][0])), g = .3, v = .6, y = (v - g) / 2, b = 2.5, w = -1.4, P = M / b + w, T = y * c(P) - y * c(w) + g, A > 0 && (N = Math.abs((e[A][1] - e[A - 1][1]) / (e[A][0] - e[A - 1][0]))), P = N / b + w, O = y * c(P) - y * c(w) + g, D = (T + O) / 2) : D = x, t = 0; E > t; t++) r = t / E, n = (1 + 2 * r) * Math.pow(1 - r, 2), i = r * Math.pow(1 - r, 2), s = Math.pow(r, 2) * (3 - 2 * r), o = Math.pow(r, 2) * (r - 1), e[A - 1] ? (a = D * (e[A + 1][0] - e[A - 1][0]), u = D * (e[A + 1][1] - e[A - 1][1])) : (a = D * (e[A + 1][0] - e[A][0]), u = D * (e[A + 1][1] - e[A][1])), e[A + 2] ? (h = D * (e[A + 2][0] - e[A][0]), p = D * (e[A + 2][1] - e[A][1])) : (h = D * (e[A + 1][0] - e[A][0]), p = D * (e[A + 1][1] - e[A][1])), d = n * e[A][0] + s * e[A + 1][0] + i * a + o * h, f = n * e[A][1] + s * e[A + 1][1] + i * u + o * p, m = [d, f], R.push(m), I.push([C(d), S(f)]);
                return R.push(e[L]), I.push([C(e[L][0]), S(e[L][1])]), [R, I]
            }

            function p(e, r, n) {
                for (var i = 0; i < this.series.length; i++) this.series[i].renderer.constructor == t.jqplot.LineRenderer && this.series[i].highlightMouseOver && (this.series[i].highlightMouseDown = !1)
            }

            function d() {
                this.plugins.lineRenderer && this.plugins.lineRenderer.highlightCanvas && (this.plugins.lineRenderer.highlightCanvas.resetCanvas(), this.plugins.lineRenderer.highlightCanvas = null), this.plugins.lineRenderer.highlightedSeriesIndex = null, this.plugins.lineRenderer.highlightCanvas = new t.jqplot.GenericCanvas, this.eventCanvas._elem.before(this.plugins.lineRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-lineRenderer-highlight-canvas", this._plotDimensions, this)), this.plugins.lineRenderer.highlightCanvas.setContext(), this.eventCanvas._elem.bind("mouseleave", {
                    plot: this
                }, function(e) {
                    m(e.data.plot)
                })
            }

            function f(e, t, r, n) {
                var i = e.series[t],
                    s = e.plugins.lineRenderer.highlightCanvas;
                s._ctx.clearRect(0, 0, s._ctx.canvas.width, s._ctx.canvas.height), i._highlightedPoint = r, e.plugins.lineRenderer.highlightedSeriesIndex = t;
                var o = {
                    fillStyle: i.highlightColor
                };
                "line" === i.type && i.renderer.bands.show && (o.fill = !0, o.closePath = !0), i.renderer.shapeRenderer.draw(s._ctx, n, o), s = null
            }

            function m(e) {
                var t = e.plugins.lineRenderer.highlightCanvas;
                t._ctx.clearRect(0, 0, t._ctx.canvas.width, t._ctx.canvas.height);
                for (var r = 0; r < e.series.length; r++) e.series[r]._highlightedPoint = null;
                e.plugins.lineRenderer.highlightedSeriesIndex = null, e.target.trigger("jqplotDataUnhighlight"), t = null
            }

            function g(t, r, n, i, s) {
                if (i) {
                    var o = [i.seriesIndex, i.pointIndex, i.data],
                        a = e.Event("jqplotDataMouseOver");
                    if (a.pageX = t.pageX, a.pageY = t.pageY, s.target.trigger(a, o), s.series[o[0]].highlightMouseOver && o[0] != s.plugins.lineRenderer.highlightedSeriesIndex) {
                        var l = e.Event("jqplotDataHighlight");
                        l.which = t.which, l.pageX = t.pageX, l.pageY = t.pageY, s.target.trigger(l, o), f(s, i.seriesIndex, i.pointIndex, i.points)
                    }
                } else null == i && m(s)
            }

            function v(t, r, n, i, s) {
                if (i) {
                    var o = [i.seriesIndex, i.pointIndex, i.data];
                    if (s.series[o[0]].highlightMouseDown && o[0] != s.plugins.lineRenderer.highlightedSeriesIndex) {
                        var a = e.Event("jqplotDataHighlight");
                        a.which = t.which, a.pageX = t.pageX, a.pageY = t.pageY, s.target.trigger(a, o), f(s, i.seriesIndex, i.pointIndex, i.points)
                    }
                } else null == i && m(s)
            }

            function y(e, t, r, n, i) {
                var s = i.plugins.lineRenderer.highlightedSeriesIndex;
                null != s && i.series[s].highlightMouseDown && m(i)
            }

            function b(t, r, n, i, s) {
                if (i) {
                    var o = [i.seriesIndex, i.pointIndex, i.data],
                        a = e.Event("jqplotDataClick");
                    a.which = t.which, a.pageX = t.pageX, a.pageY = t.pageY, s.target.trigger(a, o)
                }
            }

            function w(t, r, n, i, s) {
                if (i) {
                    var o = [i.seriesIndex, i.pointIndex, i.data],
                        a = s.plugins.lineRenderer.highlightedSeriesIndex;
                    null != a && s.series[a].highlightMouseDown && m(s);
                    var l = e.Event("jqplotDataRightClick");
                    l.which = t.which, l.pageX = t.pageX, l.pageY = t.pageY, s.target.trigger(l, o)
                }
            }

            function _(e) {
                var t;
                if (e = Math.abs(e), e >= 10) t = "%d";
                else if (e > 1) t = e === parseInt(e, 10) ? "%d" : "%.1f";
                else {
                    var r = -Math.floor(Math.log(e) / Math.LN10);
                    t = "%." + r + "f"
                }
                return t
            }

            function x(e, r, n) {
                for (var i, s, o, a, l, c, u, h = Math.floor(n / 2), p = Math.ceil(1.5 * n), d = Number.MAX_VALUE, f = r - e, m = t.jqplot.getSignificantFigures, g = 0, v = p - h + 1; v > g; g++) c = h + g, i = f / (c - 1), s = m(i), i = Math.abs(n - c) + s.digitsRight, d > i ? (d = i, o = c, u = s.digitsRight) : i === d && s.digitsRight < u && (o = c, u = s.digitsRight);
                return a = Math.max(u, Math.max(m(e).digitsRight, m(r).digitsRight)), l = 0 === a ? "%d" : "%." + a + "f", i = f / (o - 1), [e, r, o, l, i]
            }

            function k(e, t) {
                t = t || 7;
                var r, n = e / (t - 1),
                    i = Math.pow(10, Math.floor(Math.log(n) / Math.LN10)),
                    s = n / i;
                return r = 1 > i ? s > 5 ? 10 * i : s > 2 ? 5 * i : s > 1 ? 2 * i : i : s > 5 ? 10 * i : s > 4 ? 5 * i : s > 3 ? 4 * i : s > 2 ? 3 * i : s > 1 ? 2 * i : i
            }

            function C(e, t) {
                t = t || 1;
                var r, n = Math.floor(Math.log(e) / Math.LN10),
                    i = Math.pow(10, n),
                    s = e / i;
                return s /= t, r = .38 >= s ? .1 : 1.6 >= s ? .2 : 4 >= s ? .5 : 8 >= s ? 1 : 16 >= s ? 2 : 5, r * i
            }

            function S(e, t) {
                var r, n, i = Math.floor(Math.log(e) / Math.LN10),
                    s = Math.pow(10, i),
                    o = e / s;
                return o /= t, n = .38 >= o ? .1 : 1.6 >= o ? .2 : 4 >= o ? .5 : 8 >= o ? 1 : 16 >= o ? 2 : 5, r = n * s, [r, n, s]
            }

            function E(e, t) {
                return e - t
            }

            function D(e) {
                if (null == e || "object" != typeof e) return e;
                var t = new e.constructor;
                for (var r in e) t[r] = D(e[r]);
                return t
            }

            function T(e, t) {
                if (null != t && "object" == typeof t)
                    for (var r in t) "highlightColors" == r && (e[r] = D(t[r])), null != t[r] && "object" == typeof t[r] ? (e.hasOwnProperty(r) || (e[r] = {}), T(e[r], t[r])) : e[r] = t[r]
            }

            function O(e, t) {
                if (t.indexOf) return t.indexOf(e);
                for (var r = 0, n = t.length; n > r; r++)
                    if (t[r] === e) return r;
                return -1
            }

            function M(e) {
                return null === e ? "[object Null]" : Object.prototype.toString.call(e)
            }

            function N(e, r, n, i) {
                return t.isPlainObject(e) ? e : (e = {
                    effect: e
                }, r === P && (r = {}), t.isFunction(r) && (i = r, n = null, r = {}), ("number" === t.type(r) || t.fx.speeds[r]) && (i = n, n = r, r = {}), t.isFunction(n) && (i = n, n = null), r && t.extend(e, r), n = n || r.duration, e.duration = t.fx.off ? 0 : "number" == typeof n ? n : n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default, e.complete = i || r.complete, e)
            }
            var P;
            t.fn.emptyForce = function() {
                for (var e, r = 0; null != (e = t(this)[r]); r++) {
                    if (1 === e.nodeType && t.cleanData(e.getElementsByTagName("*")), t.jqplot.use_excanvas) e.outerHTML = "";
                    else
                        for (; e.firstChild;) e.removeChild(e.firstChild);
                    e = null
                }
                return t(this)
            }, t.fn.removeChildForce = function(e) {
                for (; e.firstChild;) this.removeChildForce(e.firstChild), e.removeChild(e.firstChild)
            }, t.fn.jqplot = function() {
                for (var e = [], r = [], n = 0, i = arguments.length; i > n; n++) t.isArray(arguments[n]) ? e.push(arguments[n]) : t.isPlainObject(arguments[n]) && r.push(arguments[n]);
                return this.each(function(n) {
                    var i, s, o, a, l = t(this),
                        c = e.length,
                        u = r.length;
                    o = c > n ? e[n] : c ? e[c - 1] : null, a = u > n ? r[n] : u ? r[u - 1] : null, i = l.attr("id"), i === P && (i = "jqplot_target_" + t.jqplot.targetCounter++, l.attr("id", i)), s = t.jqplot(i, o, a), l.data("jqplot", s)
                })
            }, t.jqplot = function(e, r, n) {
                var i = null,
                    s = null;
                3 === arguments.length ? (i = r, s = n) : 2 === arguments.length && (t.isArray(r) ? i = r : t.isPlainObject(r) && (s = r)), null === i && null !== s && s.data && (i = s.data);
                var o = new a;
                if (t("#" + e).removeClass("jqplot-error"), !t.jqplot.config.catchErrors) return o.init(e, i, s), o.draw(), o.themeEngine.init.call(o), o;
                try {
                    return o.init(e, i, s), o.draw(), o.themeEngine.init.call(o), o
                } catch (l) {
                    var c = t.jqplot.config.errorMessage || l.message;
                    t("#" + e).append('<div class="jqplot-error-message">' + c + "</div>"), t("#" + e).addClass("jqplot-error"), document.getElementById(e).style.background = t.jqplot.config.errorBackground, document.getElementById(e).style.border = t.jqplot.config.errorBorder, document.getElementById(e).style.fontFamily = t.jqplot.config.errorFontFamily, document.getElementById(e).style.fontSize = t.jqplot.config.errorFontSize, document.getElementById(e).style.fontStyle = t.jqplot.config.errorFontStyle, document.getElementById(e).style.fontWeight = t.jqplot.config.errorFontWeight
                }
            }, t.jqplot.version = "1.0.8", t.jqplot.revision = "1250", t.jqplot.targetCounter = 1, t.jqplot.CanvasManager = function() {
                "undefined" == typeof t.jqplot.CanvasManager.canvases && (t.jqplot.CanvasManager.canvases = [], t.jqplot.CanvasManager.free = []);
                var e = [];
                this.getCanvas = function() {
                    var r, n = !0;
                    if (!t.jqplot.use_excanvas)
                        for (var i = 0, s = t.jqplot.CanvasManager.canvases.length; s > i; i++)
                            if (t.jqplot.CanvasManager.free[i] === !0) {
                                n = !1, r = t.jqplot.CanvasManager.canvases[i], t.jqplot.CanvasManager.free[i] = !1, e.push(i);
                                break
                            }
                    return n && (r = document.createElement("canvas"), e.push(t.jqplot.CanvasManager.canvases.length),
                        t.jqplot.CanvasManager.canvases.push(r), t.jqplot.CanvasManager.free.push(!1)), r
                }, this.initCanvas = function(e) {
                    return t.jqplot.use_excanvas ? window.G_vmlCanvasManager.initElement(e) : e
                }, this.freeAllCanvases = function() {
                    for (var t = 0, r = e.length; r > t; t++) this.freeCanvas(e[t]);
                    e = []
                }, this.freeCanvas = function(e) {
                    if (t.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== P) window.G_vmlCanvasManager.uninitElement(t.jqplot.CanvasManager.canvases[e]), t.jqplot.CanvasManager.canvases[e] = null;
                    else {
                        var r = t.jqplot.CanvasManager.canvases[e];
                        r.getContext("2d").clearRect(0, 0, r.width, r.height), t(r).unbind().removeAttr("class").removeAttr("style"), t(r).css({
                            left: "",
                            top: "",
                            position: ""
                        }), r.width = 0, r.height = 0, t.jqplot.CanvasManager.free[e] = !0
                    }
                }
            }, t.jqplot.log = function() {
                window.console && window.console.log.apply(window.console, arguments)
            }, t.jqplot.config = {
                addDomReference: !1,
                enablePlugins: !1,
                defaultHeight: 300,
                defaultWidth: 400,
                UTCAdjust: !1,
                timezoneOffset: new Date(6e4 * (new Date).getTimezoneOffset()),
                errorMessage: "",
                errorBackground: "",
                errorBorder: "",
                errorFontFamily: "",
                errorFontSize: "",
                errorFontStyle: "",
                errorFontWeight: "",
                catchErrors: !1,
                defaultTickFormatString: "%.1f",
                defaultColors: ["#4bb2c5", "#EAA228", "#c5b47f", "#579575", "#839557", "#958c12", "#953579", "#4b5de4", "#d8b83f", "#ff5800", "#0085cc", "#c747a3", "#cddf54", "#FBD178", "#26B4E3", "#bd70c7"],
                defaultNegativeColors: ["#498991", "#C08840", "#9F9274", "#546D61", "#646C4A", "#6F6621", "#6E3F5F", "#4F64B0", "#A89050", "#C45923", "#187399", "#945381", "#959E5C", "#C7AF7B", "#478396", "#907294"],
                dashLength: 4,
                gapLength: 4,
                dotGapLength: 2.5,
                srcLocation: "jqplot/src/",
                pluginLocation: "jqplot/src/plugins/"
            }, t.jqplot.arrayMax = function(e) {
                return Math.max.apply(Math, e)
            }, t.jqplot.arrayMin = function(e) {
                return Math.min.apply(Math, e)
            }, t.jqplot.enablePlugins = t.jqplot.config.enablePlugins, t.jqplot.support_canvas = function() {
                return "undefined" == typeof t.jqplot.support_canvas.result && (t.jqplot.support_canvas.result = !!document.createElement("canvas").getContext), t.jqplot.support_canvas.result
            }, t.jqplot.support_canvas_text = function() {
                return "undefined" == typeof t.jqplot.support_canvas_text.result && (window.G_vmlCanvasManager !== P && window.G_vmlCanvasManager._version > 887 ? t.jqplot.support_canvas_text.result = !0 : t.jqplot.support_canvas_text.result = !(!document.createElement("canvas").getContext || "function" != typeof document.createElement("canvas").getContext("2d").fillText)), t.jqplot.support_canvas_text.result
            }, t.jqplot.use_excanvas = t.support.boxModel && t.support.objectAll && $support.leadingWhitespace || t.jqplot.support_canvas() ? !1 : !0, t.jqplot.preInitHooks = [], t.jqplot.postInitHooks = [], t.jqplot.preParseOptionsHooks = [], t.jqplot.postParseOptionsHooks = [], t.jqplot.preDrawHooks = [], t.jqplot.postDrawHooks = [], t.jqplot.preDrawSeriesHooks = [], t.jqplot.postDrawSeriesHooks = [], t.jqplot.preDrawLegendHooks = [], t.jqplot.addLegendRowHooks = [], t.jqplot.preSeriesInitHooks = [], t.jqplot.postSeriesInitHooks = [], t.jqplot.preParseSeriesOptionsHooks = [], t.jqplot.postParseSeriesOptionsHooks = [], t.jqplot.eventListenerHooks = [], t.jqplot.preDrawSeriesShadowHooks = [], t.jqplot.postDrawSeriesShadowHooks = [], t.jqplot.ElemContainer = function() {
                this._elem, this._plotWidth, this._plotHeight, this._plotDimensions = {
                    height: null,
                    width: null
                }
            }, t.jqplot.ElemContainer.prototype.createElement = function(e, r, n, i, s) {
                this._offsets = r;
                var o = n || "jqplot",
                    a = document.createElement(e);
                return this._elem = t(a), this._elem.addClass(o), this._elem.css(i), this._elem.attr(s), a = null, this._elem
            }, t.jqplot.ElemContainer.prototype.getWidth = function() {
                return this._elem ? this._elem.outerWidth(!0) : null
            }, t.jqplot.ElemContainer.prototype.getHeight = function() {
                return this._elem ? this._elem.outerHeight(!0) : null
            }, t.jqplot.ElemContainer.prototype.getPosition = function() {
                return this._elem ? this._elem.position() : {
                    top: null,
                    left: null,
                    bottom: null,
                    right: null
                }
            }, t.jqplot.ElemContainer.prototype.getTop = function() {
                return this.getPosition().top
            }, t.jqplot.ElemContainer.prototype.getLeft = function() {
                return this.getPosition().left
            }, t.jqplot.ElemContainer.prototype.getBottom = function() {
                return this._elem.css("bottom")
            }, t.jqplot.ElemContainer.prototype.getRight = function() {
                return this._elem.css("right")
            }, r.prototype = new t.jqplot.ElemContainer, r.prototype.constructor = r, r.prototype.init = function() {
                t.isFunction(this.renderer) && (this.renderer = new this.renderer), this.tickOptions.axis = this.name, null == this.tickOptions.showMark && (this.tickOptions.showMark = this.showTicks), null == this.tickOptions.showMark && (this.tickOptions.showMark = this.showTickMarks), null == this.tickOptions.showLabel && (this.tickOptions.showLabel = this.showTicks), null == this.label || "" == this.label ? this.showLabel = !1 : this.labelOptions.label = this.label, 0 == this.showLabel && (this.labelOptions.show = !1), 0 == this.pad && (this.pad = 1), 0 == this.padMax && (this.padMax = 1), 0 == this.padMin && (this.padMin = 1), null == this.padMax && (this.padMax = (this.pad - 1) / 2 + 1), null == this.padMin && (this.padMin = (this.pad - 1) / 2 + 1), this.pad = this.padMax + this.padMin - 1, (null != this.min || null != this.max) && (this.autoscale = !1), null == this.syncTicks && this.name.indexOf("y") > -1 ? this.syncTicks = !0 : null == this.syncTicks && (this.syncTicks = !1), this.renderer.init.call(this, this.rendererOptions)
            }, r.prototype.draw = function(e, t) {
                return this.__ticks && (this.__ticks = null), this.renderer.draw.call(this, e, t)
            }, r.prototype.set = function() {
                this.renderer.set.call(this)
            }, r.prototype.pack = function(e, t) {
                this.show && this.renderer.pack.call(this, e, t), null == this._min && (this._min = this.min, this._max = this.max, this._tickInterval = this.tickInterval, this._numberTicks = this.numberTicks, this.__ticks = this._ticks)
            }, r.prototype.reset = function() {
                this.renderer.reset.call(this)
            }, r.prototype.resetScale = function(e) {
                t.extend(!0, this, {
                    min: null,
                    max: null,
                    numberTicks: null,
                    tickInterval: null,
                    _ticks: [],
                    ticks: []
                }, e), this.resetDataBounds()
            }, r.prototype.resetDataBounds = function() {
                var e = this._dataBounds;
                e.min = null, e.max = null;
                for (var r, n, i, s = this.show ? !0 : !1, o = 0; o < this._series.length; o++)
                    if (n = this._series[o], n.show || this.scaleToHiddenSeries) {
                        i = n._plotData, "line" === n._type && n.renderer.bands.show && "x" !== this.name.charAt(0) && (i = [
                            [0, n.renderer.bands._min],
                            [1, n.renderer.bands._max]
                        ]);
                        var a = 1,
                            l = 1;
                        null != n._type && "ohlc" == n._type && (a = 3, l = 2);
                        for (var c = 0, r = i.length; r > c; c++) "xaxis" == this.name || "x2axis" == this.name ? ((null != i[c][0] && i[c][0] < e.min || null == e.min) && (e.min = i[c][0]), (null != i[c][0] && i[c][0] > e.max || null == e.max) && (e.max = i[c][0])) : ((null != i[c][a] && i[c][a] < e.min || null == e.min) && (e.min = i[c][a]), (null != i[c][l] && i[c][l] > e.max || null == e.max) && (e.max = i[c][l]));
                        s && n.renderer.constructor !== t.jqplot.BarRenderer ? s = !1 : s && this._options.hasOwnProperty("forceTickAt0") && 0 == this._options.forceTickAt0 ? s = !1 : s && n.renderer.constructor === t.jqplot.BarRenderer && ("vertical" == n.barDirection && "xaxis" != this.name && "x2axis" != this.name ? (null != this._options.pad || null != this._options.padMin) && (s = !1) : "horizontal" != n.barDirection || "xaxis" != this.name && "x2axis" != this.name || (null != this._options.pad || null != this._options.padMin) && (s = !1))
                    }
                s && this.renderer.constructor === t.jqplot.LinearAxisRenderer && e.min >= 0 && (this.padMin = 1, this.forceTickAt0 = !0)
            }, n.prototype = new t.jqplot.ElemContainer, n.prototype.constructor = n, n.prototype.setOptions = function(e) {
                if (t.extend(!0, this, e), "inside" == this.placement && (this.placement = "insideGrid"), this.xoffset > 0) {
                    if ("insideGrid" == this.placement) switch (this.location) {
                            case "nw":
                            case "w":
                            case "sw":
                                null == this.marginLeft && (this.marginLeft = this.xoffset + "px"), this.marginRight = "0px";
                                break;
                            case "ne":
                            case "e":
                            case "se":
                            default:
                                null == this.marginRight && (this.marginRight = this.xoffset + "px"), this.marginLeft = "0px"
                        } else if ("outside" == this.placement) switch (this.location) {
                            case "nw":
                            case "w":
                            case "sw":
                                null == this.marginRight && (this.marginRight = this.xoffset + "px"), this.marginLeft = "0px";
                                break;
                            case "ne":
                            case "e":
                            case "se":
                            default:
                                null == this.marginLeft && (this.marginLeft = this.xoffset + "px"), this.marginRight = "0px"
                        }
                        this.xoffset = 0
                }
                if (this.yoffset > 0) {
                    if ("outside" == this.placement) switch (this.location) {
                            case "sw":
                            case "s":
                            case "se":
                                null == this.marginTop && (this.marginTop = this.yoffset + "px"), this.marginBottom = "0px";
                                break;
                            case "ne":
                            case "n":
                            case "nw":
                            default:
                                null == this.marginBottom && (this.marginBottom = this.yoffset + "px"), this.marginTop = "0px"
                        } else if ("insideGrid" == this.placement) switch (this.location) {
                            case "sw":
                            case "s":
                            case "se":
                                null == this.marginBottom && (this.marginBottom = this.yoffset + "px"), this.marginTop = "0px";
                                break;
                            case "ne":
                            case "n":
                            case "nw":
                            default:
                                null == this.marginTop && (this.marginTop = this.yoffset + "px"), this.marginBottom = "0px"
                        }
                        this.yoffset = 0
                }
            }, n.prototype.init = function() {
                t.isFunction(this.renderer) && (this.renderer = new this.renderer), this.renderer.init.call(this, this.rendererOptions)
            }, n.prototype.draw = function(e, r) {
                for (var n = 0; n < t.jqplot.preDrawLegendHooks.length; n++) t.jqplot.preDrawLegendHooks[n].call(this, e);
                return this.renderer.draw.call(this, e, r)
            }, n.prototype.pack = function(e) {
                this.renderer.pack.call(this, e)
            }, i.prototype = new t.jqplot.ElemContainer, i.prototype.constructor = i, i.prototype.init = function() {
                t.isFunction(this.renderer) && (this.renderer = new this.renderer), this.renderer.init.call(this, this.rendererOptions)
            }, i.prototype.draw = function(e) {
                return this.renderer.draw.call(this, e)
            }, i.prototype.pack = function() {
                this.renderer.pack.call(this)
            }, s.prototype = new t.jqplot.ElemContainer, s.prototype.constructor = s, s.prototype.init = function(e, r, n) {
                this.index = e, this.gridBorderWidth = r;
                var i, s, o = this.data,
                    a = [];
                for (i = 0, s = o.length; s > i; i++)
                    if (this.breakOnNull) a.push(o[i]);
                    else {
                        if (null == o[i] || null == o[i][0] || null == o[i][1]) continue;
                        a.push(o[i])
                    }
                if (this.data = a, this.color || (this.color = n.colorGenerator.get(this.index)), this.negativeColor || (this.negativeColor = n.negativeColorGenerator.get(this.index)), this.fillColor || (this.fillColor = this.color), this.fillAlpha) {
                    var l = t.jqplot.normalize2rgb(this.fillColor),
                        l = t.jqplot.getColorComponents(l);
                    this.fillColor = "rgba(" + l[0] + "," + l[1] + "," + l[2] + "," + this.fillAlpha + ")"
                }
                t.isFunction(this.renderer) && (this.renderer = new this.renderer), this.renderer.init.call(this, this.rendererOptions, n), this.markerRenderer = new this.markerRenderer, this.markerOptions.color || (this.markerOptions.color = this.color), null == this.markerOptions.show && (this.markerOptions.show = this.showMarker), this.showMarker = this.markerOptions.show, this.markerRenderer.init(this.markerOptions)
            }, s.prototype.draw = function(e, r, n) {
                var i = r == P ? {} : r;
                e = e == P ? this.canvas._ctx : e;
                var s, o, a;
                for (s = 0; s < t.jqplot.preDrawSeriesHooks.length; s++) t.jqplot.preDrawSeriesHooks[s].call(this, e, i);
                for (this.show && (this.renderer.setGridData.call(this, n), i.preventJqPlotSeriesDrawTrigger || t(e.canvas).trigger("jqplotSeriesDraw", [this.data, this.gridData]), o = [], o = i.data ? i.data : this._stack ? this._plotData : this.data, a = i.gridData || this.renderer.makeGridData.call(this, o, n), "line" === this._type && this.renderer.smooth && this.renderer._smoothedData.length && (a = this.renderer._smoothedData), this.renderer.draw.call(this, e, a, i, n)), s = 0; s < t.jqplot.postDrawSeriesHooks.length; s++) t.jqplot.postDrawSeriesHooks[s].call(this, e, i, n);
                e = r = n = s = o = a = null
            }, s.prototype.drawShadow = function(e, r, n) {
                var i = r == P ? {} : r;
                e = e == P ? this.shadowCanvas._ctx : e;
                var s, o, a;
                for (s = 0; s < t.jqplot.preDrawSeriesShadowHooks.length; s++) t.jqplot.preDrawSeriesShadowHooks[s].call(this, e, i);
                for (this.shadow && (this.renderer.setGridData.call(this, n), o = [], o = i.data ? i.data : this._stack ? this._plotData : this.data, a = i.gridData || this.renderer.makeGridData.call(this, o, n), this.renderer.drawShadow.call(this, e, a, i, n)), s = 0; s < t.jqplot.postDrawSeriesShadowHooks.length; s++) t.jqplot.postDrawSeriesShadowHooks[s].call(this, e, i);
                e = r = n = s = o = a = null
            }, s.prototype.toggleDisplay = function(e, t) {
                var r, n;
                r = e.data.series ? e.data.series : this, e.data.speed && (n = e.data.speed), n ? r.canvas._elem.is(":hidden") || !r.show ? (r.show = !0, r.canvas._elem.removeClass("jqplot-series-hidden"), r.shadowCanvas._elem && r.shadowCanvas._elem.fadeIn(n), r.canvas._elem.fadeIn(n, t), r.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + r.index).fadeIn(n)) : (r.show = !1, r.canvas._elem.addClass("jqplot-series-hidden"), r.shadowCanvas._elem && r.shadowCanvas._elem.fadeOut(n), r.canvas._elem.fadeOut(n, t), r.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + r.index).fadeOut(n)) : r.canvas._elem.is(":hidden") || !r.show ? (r.show = !0, r.canvas._elem.removeClass("jqplot-series-hidden"), r.shadowCanvas._elem && r.shadowCanvas._elem.show(), r.canvas._elem.show(0, t), r.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + r.index).show()) : (r.show = !1, r.canvas._elem.addClass("jqplot-series-hidden"), r.shadowCanvas._elem && r.shadowCanvas._elem.hide(), r.canvas._elem.hide(0, t), r.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-" + r.index).hide())
            }, o.prototype = new t.jqplot.ElemContainer, o.prototype.constructor = o, o.prototype.init = function() {
                t.isFunction(this.renderer) && (this.renderer = new this.renderer), this.renderer.init.call(this, this.rendererOptions)
            }, o.prototype.createElement = function(e, t) {
                return this._offsets = e, this.renderer.createElement.call(this, t)
            }, o.prototype.draw = function() {
                this.renderer.draw.call(this)
            }, t.jqplot.GenericCanvas = function() {
                t.jqplot.ElemContainer.call(this), this._ctx
            }, t.jqplot.GenericCanvas.prototype = new t.jqplot.ElemContainer, t.jqplot.GenericCanvas.prototype.constructor = t.jqplot.GenericCanvas, t.jqplot.GenericCanvas.prototype.createElement = function(e, r, n, i) {
                this._offsets = e;
                var s = "jqplot";
                r != P && (s = r);
                var o;
                return o = i.canvasManager.getCanvas(), null != n && (this._plotDimensions = n), o.width = this._plotDimensions.width - this._offsets.left - this._offsets.right, o.height = this._plotDimensions.height - this._offsets.top - this._offsets.bottom, this._elem = t(o), this._elem.css({
                    position: "absolute",
                    left: this._offsets.left,
                    top: this._offsets.top
                }), this._elem.addClass(s), o = i.canvasManager.initCanvas(o), o = null, this._elem
            }, t.jqplot.GenericCanvas.prototype.setContext = function() {
                return this._ctx = this._elem.get(0).getContext("2d"), this._ctx
            }, t.jqplot.GenericCanvas.prototype.resetCanvas = function() {
                this._elem && (t.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== P && window.G_vmlCanvasManager.uninitElement(this._elem.get(0)), this._elem.emptyForce()), this._ctx = null
            }, t.jqplot.HooksManager = function() {
                this.hooks = [], this.args = []
            }, t.jqplot.HooksManager.prototype.addOnce = function(e, t) {
                t = t || [];
                for (var r = !1, n = 0, i = this.hooks.length; i > n; n++) this.hooks[n] == e && (r = !0);
                r || (this.hooks.push(e), this.args.push(t))
            }, t.jqplot.HooksManager.prototype.add = function(e, t) {
                t = t || [], this.hooks.push(e), this.args.push(t)
            }, t.jqplot.EventListenerManager = function() {
                this.hooks = []
            }, t.jqplot.EventListenerManager.prototype.addOnce = function(e, t) {
                for (var r, n, i = !1, n = 0, s = this.hooks.length; s > n; n++) r = this.hooks[n], r[0] == e && r[1] == t && (i = !0);
                i || this.hooks.push([e, t])
            }, t.jqplot.EventListenerManager.prototype.add = function(e, t) {
                this.hooks.push([e, t])
            };
            var j = ["yMidAxis", "xaxis", "yaxis", "x2axis", "y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis"];
            t.jqplot.computeHighlightColors = function(e) {
                var r;
                if (t.isArray(e)) {
                    r = [];
                    for (var n = 0; n < e.length; n++) {
                        for (var i = t.jqplot.getColorComponents(e[n]), s = [i[0], i[1], i[2]], o = s[0] + s[1] + s[2], a = 0; 3 > a; a++) s[a] = o > 660 ? .85 * s[a] : .73 * s[a] + 90, s[a] = parseInt(s[a], 10), s[a] > 255 ? 255 : s[a];
                        s[3] = .3 + .35 * i[3], r.push("rgba(" + s[0] + "," + s[1] + "," + s[2] + "," + s[3] + ")")
                    }
                } else {
                    for (var i = t.jqplot.getColorComponents(e), s = [i[0], i[1], i[2]], o = s[0] + s[1] + s[2], a = 0; 3 > a; a++) s[a] = o > 660 ? .85 * s[a] : .73 * s[a] + 90, s[a] = parseInt(s[a], 10), s[a] > 255 ? 255 : s[a];
                    s[3] = .3 + .35 * i[3], r = "rgba(" + s[0] + "," + s[1] + "," + s[2] + "," + s[3] + ")"
                }
                return r
            }, t.jqplot.ColorGenerator = function(e) {
                e = e || t.jqplot.config.defaultColors;
                var r = 0;
                this.next = function() {
                    return r < e.length ? e[r++] : (r = 0, e[r++])
                }, this.previous = function() {
                    return r > 0 ? e[r--] : (r = e.length - 1, e[r])
                }, this.get = function(t) {
                    var r = t - e.length * Math.floor(t / e.length);
                    return e[r]
                }, this.setColors = function(t) {
                    e = t
                }, this.reset = function() {
                    r = 0
                }, this.getIndex = function() {
                    return r
                }, this.setIndex = function(e) {
                    r = e
                }
            }, t.jqplot.hex2rgb = function(e, t) {
                e = e.replace("#", ""), 3 == e.length && (e = e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2));
                var r;
                return r = "rgba(" + parseInt(e.slice(0, 2), 16) + ", " + parseInt(e.slice(2, 4), 16) + ", " + parseInt(e.slice(4, 6), 16), t && (r += ", " + t), r += ")"
            }, t.jqplot.rgb2hex = function(e) {
                for (var t = /rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *(?:, *[0-9.]*)?\)/, r = e.match(t), n = "#", i = 1; 4 > i; i++) {
                    var s; - 1 != r[i].search(/%/) ? (s = parseInt(255 * r[i] / 100, 10).toString(16), 1 == s.length && (s = "0" + s)) : (s = parseInt(r[i], 10).toString(16), 1 == s.length && (s = "0" + s)), n += s
                }
                return n
            }, t.jqplot.normalize2rgb = function(e, r) {
                if (-1 != e.search(/^ *rgba?\(/)) return e;
                if (-1 != e.search(/^ *#?[0-9a-fA-F]?[0-9a-fA-F]/)) return t.jqplot.hex2rgb(e, r);
                throw new Error("Invalid color spec")
            }, t.jqplot.getColorComponents = function(e) {
                e = t.jqplot.colorKeywordMap[e] || e;
                for (var r = t.jqplot.normalize2rgb(e), n = /rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *,? *([0-9.]* *)?\)/, i = r.match(n), s = [], o = 1; 4 > o; o++) - 1 != i[o].search(/%/) ? s[o - 1] = parseInt(255 * i[o] / 100, 10) : s[o - 1] = parseInt(i[o], 10);
                return s[3] = parseFloat(i[4]) ? parseFloat(i[4]) : 1, s
            }, t.jqplot.colorKeywordMap = {
                aliceblue: "rgb(240, 248, 255)",
                antiquewhite: "rgb(250, 235, 215)",
                aqua: "rgb( 0, 255, 255)",
                aquamarine: "rgb(127, 255, 212)",
                azure: "rgb(240, 255, 255)",
                beige: "rgb(245, 245, 220)",
                bisque: "rgb(255, 228, 196)",
                black: "rgb( 0, 0, 0)",
                blanchedalmond: "rgb(255, 235, 205)",
                blue: "rgb( 0, 0, 255)",
                blueviolet: "rgb(138, 43, 226)",
                brown: "rgb(165, 42, 42)",
                burlywood: "rgb(222, 184, 135)",
                cadetblue: "rgb( 95, 158, 160)",
                chartreuse: "rgb(127, 255, 0)",
                chocolate: "rgb(210, 105, 30)",
                coral: "rgb(255, 127, 80)",
                cornflowerblue: "rgb(100, 149, 237)",
                cornsilk: "rgb(255, 248, 220)",
                crimson: "rgb(220, 20, 60)",
                cyan: "rgb( 0, 255, 255)",
                darkblue: "rgb( 0, 0, 139)",
                darkcyan: "rgb( 0, 139, 139)",
                darkgoldenrod: "rgb(184, 134, 11)",
                darkgray: "rgb(169, 169, 169)",
                darkgreen: "rgb( 0, 100, 0)",
                darkgrey: "rgb(169, 169, 169)",
                darkkhaki: "rgb(189, 183, 107)",
                darkmagenta: "rgb(139, 0, 139)",
                darkolivegreen: "rgb( 85, 107, 47)",
                darkorange: "rgb(255, 140, 0)",
                darkorchid: "rgb(153, 50, 204)",
                darkred: "rgb(139, 0, 0)",
                darksalmon: "rgb(233, 150, 122)",
                darkseagreen: "rgb(143, 188, 143)",
                darkslateblue: "rgb( 72, 61, 139)",
                darkslategray: "rgb( 47, 79, 79)",
                darkslategrey: "rgb( 47, 79, 79)",
                darkturquoise: "rgb( 0, 206, 209)",
                darkviolet: "rgb(148, 0, 211)",
                deeppink: "rgb(255, 20, 147)",
                deepskyblue: "rgb( 0, 191, 255)",
                dimgray: "rgb(105, 105, 105)",
                dimgrey: "rgb(105, 105, 105)",
                dodgerblue: "rgb( 30, 144, 255)",
                firebrick: "rgb(178, 34, 34)",
                floralwhite: "rgb(255, 250, 240)",
                forestgreen: "rgb( 34, 139, 34)",
                fuchsia: "rgb(255, 0, 255)",
                gainsboro: "rgb(220, 220, 220)",
                ghostwhite: "rgb(248, 248, 255)",
                gold: "rgb(255, 215, 0)",
                goldenrod: "rgb(218, 165, 32)",
                gray: "rgb(128, 128, 128)",
                grey: "rgb(128, 128, 128)",
                green: "rgb( 0, 128, 0)",
                greenyellow: "rgb(173, 255, 47)",
                honeydew: "rgb(240, 255, 240)",
                hotpink: "rgb(255, 105, 180)",
                indianred: "rgb(205, 92, 92)",
                indigo: "rgb( 75, 0, 130)",
                ivory: "rgb(255, 255, 240)",
                khaki: "rgb(240, 230, 140)",
                lavender: "rgb(230, 230, 250)",
                lavenderblush: "rgb(255, 240, 245)",
                lawngreen: "rgb(124, 252, 0)",
                lemonchiffon: "rgb(255, 250, 205)",
                lightblue: "rgb(173, 216, 230)",
                lightcoral: "rgb(240, 128, 128)",
                lightcyan: "rgb(224, 255, 255)",
                lightgoldenrodyellow: "rgb(250, 250, 210)",
                lightgray: "rgb(211, 211, 211)",
                lightgreen: "rgb(144, 238, 144)",
                lightgrey: "rgb(211, 211, 211)",
                lightpink: "rgb(255, 182, 193)",
                lightsalmon: "rgb(255, 160, 122)",
                lightseagreen: "rgb( 32, 178, 170)",
                lightskyblue: "rgb(135, 206, 250)",
                lightslategray: "rgb(119, 136, 153)",
                lightslategrey: "rgb(119, 136, 153)",
                lightsteelblue: "rgb(176, 196, 222)",
                lightyellow: "rgb(255, 255, 224)",
                lime: "rgb( 0, 255, 0)",
                limegreen: "rgb( 50, 205, 50)",
                linen: "rgb(250, 240, 230)",
                magenta: "rgb(255, 0, 255)",
                maroon: "rgb(128, 0, 0)",
                mediumaquamarine: "rgb(102, 205, 170)",
                mediumblue: "rgb( 0, 0, 205)",
                mediumorchid: "rgb(186, 85, 211)",
                mediumpurple: "rgb(147, 112, 219)",
                mediumseagreen: "rgb( 60, 179, 113)",
                mediumslateblue: "rgb(123, 104, 238)",
                mediumspringgreen: "rgb( 0, 250, 154)",
                mediumturquoise: "rgb( 72, 209, 204)",
                mediumvioletred: "rgb(199, 21, 133)",
                midnightblue: "rgb( 25, 25, 112)",
                mintcream: "rgb(245, 255, 250)",
                mistyrose: "rgb(255, 228, 225)",
                moccasin: "rgb(255, 228, 181)",
                navajowhite: "rgb(255, 222, 173)",
                navy: "rgb( 0, 0, 128)",
                oldlace: "rgb(253, 245, 230)",
                olive: "rgb(128, 128, 0)",
                olivedrab: "rgb(107, 142, 35)",
                orange: "rgb(255, 165, 0)",
                orangered: "rgb(255, 69, 0)",
                orchid: "rgb(218, 112, 214)",
                palegoldenrod: "rgb(238, 232, 170)",
                palegreen: "rgb(152, 251, 152)",
                paleturquoise: "rgb(175, 238, 238)",
                palevioletred: "rgb(219, 112, 147)",
                papayawhip: "rgb(255, 239, 213)",
                peachpuff: "rgb(255, 218, 185)",
                peru: "rgb(205, 133, 63)",
                pink: "rgb(255, 192, 203)",
                plum: "rgb(221, 160, 221)",
                powderblue: "rgb(176, 224, 230)",
                purple: "rgb(128, 0, 128)",
                red: "rgb(255, 0, 0)",
                rosybrown: "rgb(188, 143, 143)",
                royalblue: "rgb( 65, 105, 225)",
                saddlebrown: "rgb(139, 69, 19)",
                salmon: "rgb(250, 128, 114)",
                sandybrown: "rgb(244, 164, 96)",
                seagreen: "rgb( 46, 139, 87)",
                seashell: "rgb(255, 245, 238)",
                sienna: "rgb(160, 82, 45)",
                silver: "rgb(192, 192, 192)",
                skyblue: "rgb(135, 206, 235)",
                slateblue: "rgb(106, 90, 205)",
                slategray: "rgb(112, 128, 144)",
                slategrey: "rgb(112, 128, 144)",
                snow: "rgb(255, 250, 250)",
                springgreen: "rgb( 0, 255, 127)",
                steelblue: "rgb( 70, 130, 180)",
                tan: "rgb(210, 180, 140)",
                teal: "rgb( 0, 128, 128)",
                thistle: "rgb(216, 191, 216)",
                tomato: "rgb(255, 99, 71)",
                turquoise: "rgb( 64, 224, 208)",
                violet: "rgb(238, 130, 238)",
                wheat: "rgb(245, 222, 179)",
                white: "rgb(255, 255, 255)",
                whitesmoke: "rgb(245, 245, 245)",
                yellow: "rgb(255, 255, 0)",
                yellowgreen: "rgb(154, 205, 50)"
            }, t.jqplot.AxisLabelRenderer = function(e) {
                t.jqplot.ElemContainer.call(this), this.axis, this.show = !0, this.label = "", this.fontFamily = null, this.fontSize = null, this.textColor = null, this._elem, this.escapeHTML = !1, t.extend(!0, this, e)
            }, t.jqplot.AxisLabelRenderer.prototype = new t.jqplot.ElemContainer, t.jqplot.AxisLabelRenderer.prototype.constructor = t.jqplot.AxisLabelRenderer, t.jqplot.AxisLabelRenderer.prototype.init = function(e) {
                t.extend(!0, this, e)
            }, t.jqplot.AxisLabelRenderer.prototype.draw = function(e, r) {
                return this._elem && (this._elem.emptyForce(), this._elem = null), this._elem = t('<div style="position:absolute;" class="jqplot-' + this.axis + '-label"></div>'), Number(this.label) && this._elem.css("white-space", "nowrap"), this.escapeHTML ? this._elem.text(this.label) : this._elem.html(this.label), this.fontFamily && this._elem.css("font-family", this.fontFamily), this.fontSize && this._elem.css("font-size", this.fontSize), this.textColor && this._elem.css("color", this.textColor), this._elem
            }, t.jqplot.AxisLabelRenderer.prototype.pack = function() {}, t.jqplot.AxisTickRenderer = function(e) {
                t.jqplot.ElemContainer.call(this), this.mark = "outside", this.axis, this.showMark = !0, this.showGridline = !0, this.isMinorTick = !1, this.size = 4, this.markSize = 6, this.show = !0, this.showLabel = !0, this.label = null, this.value = null, this._styles = {}, this.formatter = t.jqplot.DefaultTickFormatter, this.prefix = "", this.suffix = "", this.formatString = "", this.fontFamily, this.fontSize, this.textColor, this.escapeHTML = !1, this._elem, this._breakTick = !1, t.extend(!0, this, e)
            }, t.jqplot.AxisTickRenderer.prototype.init = function(e) {
                t.extend(!0, this, e)
            }, t.jqplot.AxisTickRenderer.prototype = new t.jqplot.ElemContainer, t.jqplot.AxisTickRenderer.prototype.constructor = t.jqplot.AxisTickRenderer, t.jqplot.AxisTickRenderer.prototype.setTick = function(e, t, r) {
                return this.value = e, this.axis = t, r && (this.isMinorTick = !0), this
            }, t.jqplot.AxisTickRenderer.prototype.draw = function() {
                null === this.label && (this.label = this.prefix + this.formatter(this.formatString, this.value) + this.suffix);
                var e = {
                    position: "absolute"
                };
                Number(this.label) && (e.whitSpace = "nowrap"), this._elem && (this._elem.emptyForce(), this._elem = null), this._elem = t(document.createElement("div")), this._elem.addClass("jqplot-" + this.axis + "-tick"), this.escapeHTML ? this._elem.text(this.label) : this._elem.html(this.label), this._elem.css(e);
                for (var r in this._styles) this._elem.css(r, this._styles[r]);
                return this.fontFamily && this._elem.css("font-family", this.fontFamily), this.fontSize && this._elem.css("font-size", this.fontSize), this.textColor && this._elem.css("color", this.textColor), this._breakTick && this._elem.addClass("jqplot-breakTick"), this._elem
            }, t.jqplot.DefaultTickFormatter = function(e, r) {
                return "number" == typeof r ? (e || (e = t.jqplot.config.defaultTickFormatString), t.jqplot.sprintf(e, r)) : String(r)
            }, t.jqplot.PercentTickFormatter = function(e, r) {
                return "number" == typeof r ? (r = 100 * r, e || (e = t.jqplot.config.defaultTickFormatString), t.jqplot.sprintf(e, r)) : String(r)
            }, t.jqplot.AxisTickRenderer.prototype.pack = function() {}, t.jqplot.CanvasGridRenderer = function() {
                this.shadowRenderer = new t.jqplot.ShadowRenderer
            }, t.jqplot.CanvasGridRenderer.prototype.init = function(e) {
                this._ctx, t.extend(!0, this, e);
                var r = {
                    lineJoin: "miter",
                    lineCap: "round",
                    fill: !1,
                    isarc: !1,
                    angle: this.shadowAngle,
                    offset: this.shadowOffset,
                    alpha: this.shadowAlpha,
                    depth: this.shadowDepth,
                    lineWidth: this.shadowWidth,
                    closePath: !1,
                    strokeStyle: this.shadowColor
                };
                this.renderer.shadowRenderer.init(r)
            }, t.jqplot.CanvasGridRenderer.prototype.createElement = function(e) {
                var r;
                this._elem && (t.jqplot.use_excanvas && window.G_vmlCanvasManager.uninitElement !== P && (r = this._elem.get(0), window.G_vmlCanvasManager.uninitElement(r), r = null), this._elem.emptyForce(), this._elem = null), r = e.canvasManager.getCanvas();
                var n = this._plotDimensions.width,
                    i = this._plotDimensions.height;
                return r.width = n, r.height = i, this._elem = t(r), this._elem.addClass("jqplot-grid-canvas"), this._elem.css({
                    position: "absolute",
                    left: 0,
                    top: 0
                }), r = e.canvasManager.initCanvas(r), this._top = this._offsets.top, this._bottom = i - this._offsets.bottom, this._left = this._offsets.left, this._right = n - this._offsets.right, this._width = this._right - this._left, this._height = this._bottom - this._top, r = null, this._elem
            }, t.jqplot.CanvasGridRenderer.prototype.draw = function() {
                function e(e, n, i, s, o) {
                    r.save(), o = o || {}, (null == o.lineWidth || 0 != o.lineWidth) && (t.extend(!0, r, o), r.beginPath(), r.moveTo(e, n), r.lineTo(i, s), r.stroke(), r.restore())
                }
                this._ctx = this._elem.get(0).getContext("2d");
                var r = this._ctx,
                    n = this._axes;
                r.save(), r.clearRect(0, 0, this._plotDimensions.width, this._plotDimensions.height), r.fillStyle = this.backgroundColor || this.background, r.fillRect(this._left, this._top, this._width, this._height), r.save(), r.lineJoin = "miter", r.lineCap = "butt", r.lineWidth = this.gridLineWidth, r.strokeStyle = this.gridLineColor;
                for (var i, s, o, a, l = ["xaxis", "yaxis", "x2axis", "y2axis"], c = 4; c > 0; c--) {
                    var u = l[c - 1],
                        h = n[u],
                        p = h._ticks,
                        d = p.length;
                    if (h.show) {
                        if (h.drawBaseline) {
                            var f = {};
                            switch (null !== h.baselineWidth && (f.lineWidth = h.baselineWidth), null !== h.baselineColor && (f.strokeStyle = h.baselineColor), u) {
                                case "xaxis":
                                    e(this._left, this._bottom, this._right, this._bottom, f);
                                    break;
                                case "yaxis":
                                    e(this._left, this._bottom, this._left, this._top, f);
                                    break;
                                case "x2axis":
                                    e(this._left, this._bottom, this._right, this._bottom, f);
                                    break;
                                case "y2axis":
                                    e(this._right, this._bottom, this._right, this._top, f)
                            }
                        }
                        for (var m = d; m > 0; m--) {
                            var g = p[m - 1];
                            if (g.show) {
                                var v = Math.round(h.u2p(g.value)) + .5;
                                switch (u) {
                                    case "xaxis":
                                        if (g.showGridline && this.drawGridlines && (!g.isMinorTick && h.drawMajorGridlines || g.isMinorTick && h.drawMinorGridlines) && e(v, this._top, v, this._bottom), g.showMark && g.mark && (!g.isMinorTick && h.drawMajorTickMarks || g.isMinorTick && h.drawMinorTickMarks)) {
                                            o = g.markSize, a = g.mark;
                                            var v = Math.round(h.u2p(g.value)) + .5;
                                            switch (a) {
                                                case "outside":
                                                    i = this._bottom, s = this._bottom + o;
                                                    break;
                                                case "inside":
                                                    i = this._bottom - o, s = this._bottom;
                                                    break;
                                                case "cross":
                                                    i = this._bottom - o, s = this._bottom + o;
                                                    break;
                                                default:
                                                    i = this._bottom, s = this._bottom + o
                                            }
                                            this.shadow && this.renderer.shadowRenderer.draw(r, [
                                                [v, i],
                                                [v, s]
                                            ], {
                                                lineCap: "butt",
                                                lineWidth: this.gridLineWidth,
                                                offset: .75 * this.gridLineWidth,
                                                depth: 2,
                                                fill: !1,
                                                closePath: !1
                                            }), e(v, i, v, s)
                                        }
                                        break;
                                    case "yaxis":
                                        if (g.showGridline && this.drawGridlines && (!g.isMinorTick && h.drawMajorGridlines || g.isMinorTick && h.drawMinorGridlines) && e(this._right, v, this._left, v), g.showMark && g.mark && (!g.isMinorTick && h.drawMajorTickMarks || g.isMinorTick && h.drawMinorTickMarks)) {
                                            o = g.markSize, a = g.mark;
                                            var v = Math.round(h.u2p(g.value)) + .5;
                                            switch (a) {
                                                case "outside":
                                                    i = this._left - o, s = this._left;
                                                    break;
                                                case "inside":
                                                    i = this._left, s = this._left + o;
                                                    break;
                                                case "cross":
                                                    i = this._left - o, s = this._left + o;
                                                    break;
                                                default:
                                                    i = this._left - o, s = this._left
                                            }
                                            this.shadow && this.renderer.shadowRenderer.draw(r, [
                                                [i, v],
                                                [s, v]
                                            ], {
                                                lineCap: "butt",
                                                lineWidth: 1.5 * this.gridLineWidth,
                                                offset: .75 * this.gridLineWidth,
                                                fill: !1,
                                                closePath: !1
                                            }), e(i, v, s, v, {
                                                strokeStyle: h.borderColor
                                            })
                                        }
                                        break;
                                    case "x2axis":
                                        if (g.showGridline && this.drawGridlines && (!g.isMinorTick && h.drawMajorGridlines || g.isMinorTick && h.drawMinorGridlines) && e(v, this._bottom, v, this._top), g.showMark && g.mark && (!g.isMinorTick && h.drawMajorTickMarks || g.isMinorTick && h.drawMinorTickMarks)) {
                                            o = g.markSize, a = g.mark;
                                            var v = Math.round(h.u2p(g.value)) + .5;
                                            switch (a) {
                                                case "outside":
                                                    i = this._top - o, s = this._top;
                                                    break;
                                                case "inside":
                                                    i = this._top, s = this._top + o;
                                                    break;
                                                case "cross":
                                                    i = this._top - o, s = this._top + o;
                                                    break;
                                                default:
                                                    i = this._top - o, s = this._top
                                            }
                                            this.shadow && this.renderer.shadowRenderer.draw(r, [
                                                [v, i],
                                                [v, s]
                                            ], {
                                                lineCap: "butt",
                                                lineWidth: this.gridLineWidth,
                                                offset: .75 * this.gridLineWidth,
                                                depth: 2,
                                                fill: !1,
                                                closePath: !1
                                            }), e(v, i, v, s)
                                        }
                                        break;
                                    case "y2axis":
                                        if (g.showGridline && this.drawGridlines && (!g.isMinorTick && h.drawMajorGridlines || g.isMinorTick && h.drawMinorGridlines) && e(this._left, v, this._right, v), g.showMark && g.mark && (!g.isMinorTick && h.drawMajorTickMarks || g.isMinorTick && h.drawMinorTickMarks)) {
                                            o = g.markSize, a = g.mark;
                                            var v = Math.round(h.u2p(g.value)) + .5;
                                            switch (a) {
                                                case "outside":
                                                    i = this._right, s = this._right + o;
                                                    break;
                                                case "inside":
                                                    i = this._right - o, s = this._right;
                                                    break;
                                                case "cross":
                                                    i = this._right - o, s = this._right + o;
                                                    break;
                                                default:
                                                    i = this._right, s = this._right + o
                                            }
                                            this.shadow && this.renderer.shadowRenderer.draw(r, [
                                                [i, v],
                                                [s, v]
                                            ], {
                                                lineCap: "butt",
                                                lineWidth: 1.5 * this.gridLineWidth,
                                                offset: .75 * this.gridLineWidth,
                                                fill: !1,
                                                closePath: !1
                                            }), e(i, v, s, v, {
                                                strokeStyle: h.borderColor
                                            })
                                        }
                                }
                            }
                        }
                        g = null
                    }
                    h = null, p = null
                }
                l = ["y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis", "yMidAxis"];
                for (var c = 7; c > 0; c--) {
                    var h = n[l[c - 1]],
                        p = h._ticks;
                    if (h.show) {
                        var y = p[h.numberTicks - 1],
                            b = p[0],
                            w = h.getLeft(),
                            _ = [
                                [w, y.getTop() + y.getHeight() / 2],
                                [w, b.getTop() + b.getHeight() / 2 + 1]
                            ];
                        this.shadow && this.renderer.shadowRenderer.draw(r, _, {
                            lineCap: "butt",
                            fill: !1,
                            closePath: !1
                        }), e(_[0][0], _[0][1], _[1][0], _[1][1], {
                            lineCap: "butt",
                            strokeStyle: h.borderColor,
                            lineWidth: h.borderWidth
                        });
                        for (var m = p.length; m > 0; m--) {
                            var g = p[m - 1];
                            o = g.markSize, a = g.mark;
                            var v = Math.round(h.u2p(g.value)) + .5;
                            if (g.showMark && g.mark) {
                                switch (a) {
                                    case "outside":
                                        i = w, s = w + o;
                                        break;
                                    case "inside":
                                        i = w - o, s = w;
                                        break;
                                    case "cross":
                                        i = w - o, s = w + o;
                                        break;
                                    default:
                                        i = w, s = w + o
                                }
                                _ = [
                                    [i, v],
                                    [s, v]
                                ], this.shadow && this.renderer.shadowRenderer.draw(r, _, {
                                    lineCap: "butt",
                                    lineWidth: 1.5 * this.gridLineWidth,
                                    offset: .75 * this.gridLineWidth,
                                    fill: !1,
                                    closePath: !1
                                }), e(i, v, s, v, {
                                    strokeStyle: h.borderColor
                                })
                            }
                            g = null
                        }
                        b = null
                    }
                    h = null, p = null
                }
                if (r.restore(), this.shadow) {
                    var _ = [
                        [this._left, this._bottom],
                        [this._right, this._bottom],
                        [this._right, this._top]
                    ];
                    this.renderer.shadowRenderer.draw(r, _)
                }
                0 != this.borderWidth && this.drawBorder && (e(this._left, this._top, this._right, this._top, {
                    lineCap: "round",
                    strokeStyle: n.x2axis.borderColor,
                    lineWidth: n.x2axis.borderWidth
                }), e(this._right, this._top, this._right, this._bottom, {
                    lineCap: "round",
                    strokeStyle: n.y2axis.borderColor,
                    lineWidth: n.y2axis.borderWidth
                }), e(this._right, this._bottom, this._left, this._bottom, {
                    lineCap: "round",
                    strokeStyle: n.xaxis.borderColor,
                    lineWidth: n.xaxis.borderWidth
                }), e(this._left, this._bottom, this._left, this._top, {
                    lineCap: "round",
                    strokeStyle: n.yaxis.borderColor,
                    lineWidth: n.yaxis.borderWidth
                })), r.restore(), r = null, n = null
            }, t.jqplot.DivTitleRenderer = function() {}, t.jqplot.DivTitleRenderer.prototype.init = function(e) {
                t.extend(!0, this, e)
            }, t.jqplot.DivTitleRenderer.prototype.draw = function() {
                this._elem && (this._elem.emptyForce(), this._elem = null);
                var e = (this.renderer, document.createElement("div"));
                if (this._elem = t(e), this._elem.addClass("jqplot-title"), this.text) {
                    if (this.text) {
                        var r;
                        this.color ? r = this.color : this.textColor && (r = this.textColor);
                        var n = {
                            position: "absolute",
                            top: "0px",
                            left: "0px"
                        };
                        this._plotWidth && (n.width = this._plotWidth + "px"), this.fontSize && (n.fontSize = this.fontSize), "string" == typeof this.textAlign ? n.textAlign = this.textAlign : n.textAlign = "center", r && (n.color = r), this.paddingBottom && (n.paddingBottom = this.paddingBottom), this.fontFamily && (n.fontFamily = this.fontFamily), this._elem.css(n), this.escapeHtml ? this._elem.text(this.text) : this._elem.html(this.text)
                    }
                } else this.show = !1,
                    this._elem.height(0), this._elem.width(0);
                return e = null, this._elem
            }, t.jqplot.DivTitleRenderer.prototype.pack = function() {};
            var R = .1;
            t.jqplot.LinePattern = function(e, r) {
                var n = {
                    dotted: [R, t.jqplot.config.dotGapLength],
                    dashed: [t.jqplot.config.dashLength, t.jqplot.config.gapLength],
                    solid: null
                };
                if ("string" == typeof r)
                    if ("." === r[0] || "-" === r[0]) {
                        var i = r;
                        r = [];
                        for (var s = 0, o = i.length; o > s; s++) {
                            if ("." === i[s]) r.push(R);
                            else {
                                if ("-" !== i[s]) continue;
                                r.push(t.jqplot.config.dashLength)
                            }
                            r.push(t.jqplot.config.gapLength)
                        }
                    } else r = n[r];
                if (!r || !r.length) return e;
                var a = 0,
                    l = r[0],
                    c = 0,
                    u = 0,
                    h = 0,
                    p = 0,
                    d = function(t, r) {
                        e.moveTo(t, r), c = t, u = r, h = t, p = r
                    },
                    f = function(t, n) {
                        var i = e.lineWidth,
                            s = t - c,
                            o = n - u,
                            h = Math.sqrt(s * s + o * o);
                        if (h > 0 && i > 0)
                            for (s /= h, o /= h;;) {
                                var p = i * l;
                                if (!(h > p)) {
                                    c = t, u = n, 0 == (1 & a) ? e.lineTo(c, u) : e.moveTo(c, u), l -= h / i;
                                    break
                                }
                                c += p * s, u += p * o, 0 == (1 & a) ? e.lineTo(c, u) : e.moveTo(c, u), h -= p, a++, a >= r.length && (a = 0), l = r[a]
                            }
                    },
                    m = function() {
                        e.beginPath()
                    },
                    g = function() {
                        f(h, p)
                    };
                return {
                    moveTo: d,
                    lineTo: f,
                    beginPath: m,
                    closePath: g
                }
            }, t.jqplot.LineRenderer = function() {
                this.shapeRenderer = new t.jqplot.ShapeRenderer, this.shadowRenderer = new t.jqplot.ShadowRenderer
            }, t.jqplot.LineRenderer.prototype.init = function(e, r) {
                e = e || {}, this._type = "line", this.renderer.animation = {
                    show: !1,
                    direction: "left",
                    speed: 2500,
                    _supported: !0
                }, this.renderer.smooth = !1, this.renderer.tension = null, this.renderer.constrainSmoothing = !0, this.renderer._smoothedData = [], this.renderer._smoothedPlotData = [], this.renderer._hiBandGridData = [], this.renderer._lowBandGridData = [], this.renderer._hiBandSmoothedData = [], this.renderer._lowBandSmoothedData = [], this.renderer.bandData = [], this.renderer.bands = {
                    show: !1,
                    hiData: [],
                    lowData: [],
                    color: this.color,
                    showLines: !1,
                    fill: !0,
                    fillColor: null,
                    _min: null,
                    _max: null,
                    interval: "3%"
                };
                var n = {
                    highlightMouseOver: e.highlightMouseOver,
                    highlightMouseDown: e.highlightMouseDown,
                    highlightColor: e.highlightColor
                };
                delete e.highlightMouseOver, delete e.highlightMouseDown, delete e.highlightColor, t.extend(!0, this.renderer, e), this.renderer.options = e, this.renderer.bandData.length > 1 && (!e.bands || null == e.bands.show) ? this.renderer.bands.show = !0 : e.bands && null == e.bands.show && null != e.bands.interval && (this.renderer.bands.show = !0), this.fill && (this.renderer.bands.show = !1), this.renderer.bands.show && this.renderer.initBands.call(this, this.renderer.options, r), this._stack && (this.renderer.smooth = !1);
                var i = {
                    lineJoin: this.lineJoin,
                    lineCap: this.lineCap,
                    fill: this.fill,
                    isarc: !1,
                    strokeStyle: this.color,
                    fillStyle: this.fillColor,
                    lineWidth: this.lineWidth,
                    linePattern: this.linePattern,
                    closePath: this.fill
                };
                this.renderer.shapeRenderer.init(i);
                var s = e.shadowOffset;
                null == s && (s = this.lineWidth > 2.5 ? 1.25 * (1 + .6 * (Math.atan(this.lineWidth / 2.5) / .785398163 - 1)) : 1.25 * Math.atan(this.lineWidth / 2.5) / .785398163);
                var o = {
                    lineJoin: this.lineJoin,
                    lineCap: this.lineCap,
                    fill: this.fill,
                    isarc: !1,
                    angle: this.shadowAngle,
                    offset: s,
                    alpha: this.shadowAlpha,
                    depth: this.shadowDepth,
                    lineWidth: this.lineWidth,
                    linePattern: this.linePattern,
                    closePath: this.fill
                };
                if (this.renderer.shadowRenderer.init(o), this._areaPoints = [], this._boundingBox = [
                        [],
                        []
                    ], !this.isTrendline && this.fill || this.renderer.bands.show) {
                    if (this.highlightMouseOver = !0, this.highlightMouseDown = !1, this.highlightColor = null, n.highlightMouseDown && null == n.highlightMouseOver && (n.highlightMouseOver = !1), t.extend(!0, this, {
                            highlightMouseOver: n.highlightMouseOver,
                            highlightMouseDown: n.highlightMouseDown,
                            highlightColor: n.highlightColor
                        }), !this.highlightColor) {
                        var a = this.renderer.bands.show ? this.renderer.bands.fillColor : this.fillColor;
                        this.highlightColor = t.jqplot.computeHighlightColors(a)
                    }
                    this.highlighter && (this.highlighter.show = !1)
                }!this.isTrendline && r && (r.plugins.lineRenderer = {}, r.postInitHooks.addOnce(p), r.postDrawHooks.addOnce(d), r.eventListenerHooks.addOnce("jqplotMouseMove", g), r.eventListenerHooks.addOnce("jqplotMouseDown", v), r.eventListenerHooks.addOnce("jqplotMouseUp", y), r.eventListenerHooks.addOnce("jqplotClick", b), r.eventListenerHooks.addOnce("jqplotRightClick", w))
            }, t.jqplot.LineRenderer.prototype.initBands = function(e, r) {
                var n = e.bandData || [],
                    i = this.renderer.bands;
                i.hiData = [], i.lowData = [];
                var s = this.data;
                if (i._max = null, i._min = null, 2 == n.length)
                    if (t.isArray(n[0][0])) {
                        for (var o, a = 0, l = 0, c = 0, u = n[0].length; u > c; c++) o = n[0][c], (null != o[1] && o[1] > i._max || null == i._max) && (i._max = o[1]), (null != o[1] && o[1] < i._min || null == i._min) && (i._min = o[1]);
                        for (var c = 0, u = n[1].length; u > c; c++) o = n[1][c], (null != o[1] && o[1] > i._max || null == i._max) && (i._max = o[1], l = 1), (null != o[1] && o[1] < i._min || null == i._min) && (i._min = o[1], a = 1);
                        l === a && (i.show = !1), i.hiData = n[l], i.lowData = n[a]
                    } else if (n[0].length === s.length && n[1].length === s.length)
                    for (var h = n[0][0] > n[1][0] ? 0 : 1, p = h ? 0 : 1, c = 0, u = s.length; u > c; c++) i.hiData.push([s[c][0], n[h][c]]), i.lowData.push([s[c][0], n[p][c]]);
                else i.show = !1;
                else if (n.length > 2 && !t.isArray(n[0][0]))
                    for (var h = n[0][0] > n[0][1] ? 0 : 1, p = h ? 0 : 1, c = 0, u = n.length; u > c; c++) i.hiData.push([s[c][0], n[c][h]]), i.lowData.push([s[c][0], n[c][p]]);
                else {
                    var d = i.interval,
                        f = null,
                        m = null,
                        g = null,
                        v = null;
                    if (t.isArray(d) ? (f = d[0], m = d[1]) : f = d, isNaN(f) ? "%" === f.charAt(f.length - 1) && (g = "multiply", f = parseFloat(f) / 100 + 1) : (f = parseFloat(f), g = "add"), null !== m && isNaN(m) ? "%" === m.charAt(m.length - 1) && (v = "multiply", m = parseFloat(m) / 100 + 1) : null !== m && (m = parseFloat(m), v = "add"), null !== f) {
                        if (null === m && (m = -f, v = g, "multiply" === v && (m += 2)), m > f) {
                            var y = f;
                            f = m, m = y, y = g, g = v, v = y
                        }
                        for (var c = 0, u = s.length; u > c; c++) {
                            switch (g) {
                                case "add":
                                    i.hiData.push([s[c][0], s[c][1] + f]);
                                    break;
                                case "multiply":
                                    i.hiData.push([s[c][0], s[c][1] * f])
                            }
                            switch (v) {
                                case "add":
                                    i.lowData.push([s[c][0], s[c][1] + m]);
                                    break;
                                case "multiply":
                                    i.lowData.push([s[c][0], s[c][1] * m])
                            }
                        }
                    } else i.show = !1
                }
                for (var b = i.hiData, w = i.lowData, c = 0, u = b.length; u > c; c++)(null != b[c][1] && b[c][1] > i._max || null == i._max) && (i._max = b[c][1]);
                for (var c = 0, u = w.length; u > c; c++)(null != w[c][1] && w[c][1] < i._min || null == i._min) && (i._min = w[c][1]);
                if (null === i.fillColor) {
                    var _ = t.jqplot.getColorComponents(i.color);
                    _[3] = .5 * _[3], i.fillColor = "rgba(" + _[0] + ", " + _[1] + ", " + _[2] + ", " + _[3] + ")"
                }
            }, t.jqplot.LineRenderer.prototype.setGridData = function(e) {
                var t = this._xaxis.series_u2p,
                    r = this._yaxis.series_u2p,
                    n = this._plotData,
                    i = this._prevPlotData;
                this.gridData = [], this._prevGridData = [], this.renderer._smoothedData = [], this.renderer._smoothedPlotData = [], this.renderer._hiBandGridData = [], this.renderer._lowBandGridData = [], this.renderer._hiBandSmoothedData = [], this.renderer._lowBandSmoothedData = [];
                for (var s = this.renderer.bands, o = !1, a = 0, l = n.length; l > a; a++) null != n[a][0] && null != n[a][1] ? this.gridData.push([t.call(this._xaxis, n[a][0]), r.call(this._yaxis, n[a][1])]) : null == n[a][0] ? (o = !0, this.gridData.push([null, r.call(this._yaxis, n[a][1])])) : null == n[a][1] && (o = !0, this.gridData.push([t.call(this._xaxis, n[a][0]), null])), null != i[a] && null != i[a][0] && null != i[a][1] ? this._prevGridData.push([t.call(this._xaxis, i[a][0]), r.call(this._yaxis, i[a][1])]) : null != i[a] && null == i[a][0] ? this._prevGridData.push([null, r.call(this._yaxis, i[a][1])]) : null != i[a] && null != i[a][0] && null == i[a][1] && this._prevGridData.push([t.call(this._xaxis, i[a][0]), null]);
                if (o && (this.renderer.smooth = !1, "line" === this._type && (s.show = !1)), "line" === this._type && s.show) {
                    for (var a = 0, l = s.hiData.length; l > a; a++) this.renderer._hiBandGridData.push([t.call(this._xaxis, s.hiData[a][0]), r.call(this._yaxis, s.hiData[a][1])]);
                    for (var a = 0, l = s.lowData.length; l > a; a++) this.renderer._lowBandGridData.push([t.call(this._xaxis, s.lowData[a][0]), r.call(this._yaxis, s.lowData[a][1])])
                }
                if ("line" === this._type && this.renderer.smooth && this.gridData.length > 2) {
                    var c;
                    this.renderer.constrainSmoothing ? (c = u.call(this, this.gridData), this.renderer._smoothedData = c[0], this.renderer._smoothedPlotData = c[1], s.show && (c = u.call(this, this.renderer._hiBandGridData), this.renderer._hiBandSmoothedData = c[0], c = u.call(this, this.renderer._lowBandGridData), this.renderer._lowBandSmoothedData = c[0]), c = null) : (c = h.call(this, this.gridData), this.renderer._smoothedData = c[0], this.renderer._smoothedPlotData = c[1], s.show && (c = h.call(this, this.renderer._hiBandGridData), this.renderer._hiBandSmoothedData = c[0], c = h.call(this, this.renderer._lowBandGridData), this.renderer._lowBandSmoothedData = c[0]), c = null)
                }
            }, t.jqplot.LineRenderer.prototype.makeGridData = function(e, t) {
                var r = this._xaxis.series_u2p,
                    n = this._yaxis.series_u2p,
                    i = [];
                this.renderer._smoothedData = [], this.renderer._smoothedPlotData = [], this.renderer._hiBandGridData = [], this.renderer._lowBandGridData = [], this.renderer._hiBandSmoothedData = [], this.renderer._lowBandSmoothedData = [];
                for (var s = this.renderer.bands, o = !1, a = 0; a < e.length; a++) null != e[a][0] && null != e[a][1] ? i.push([r.call(this._xaxis, e[a][0]), n.call(this._yaxis, e[a][1])]) : null == e[a][0] ? (o = !0, i.push([null, n.call(this._yaxis, e[a][1])])) : null == e[a][1] && (o = !0, i.push([r.call(this._xaxis, e[a][0]), null]));
                if (o && (this.renderer.smooth = !1, "line" === this._type && (s.show = !1)), "line" === this._type && s.show) {
                    for (var a = 0, l = s.hiData.length; l > a; a++) this.renderer._hiBandGridData.push([r.call(this._xaxis, s.hiData[a][0]), n.call(this._yaxis, s.hiData[a][1])]);
                    for (var a = 0, l = s.lowData.length; l > a; a++) this.renderer._lowBandGridData.push([r.call(this._xaxis, s.lowData[a][0]), n.call(this._yaxis, s.lowData[a][1])])
                }
                if ("line" === this._type && this.renderer.smooth && i.length > 2) {
                    var c;
                    this.renderer.constrainSmoothing ? (c = u.call(this, i), this.renderer._smoothedData = c[0], this.renderer._smoothedPlotData = c[1], s.show && (c = u.call(this, this.renderer._hiBandGridData), this.renderer._hiBandSmoothedData = c[0], c = u.call(this, this.renderer._lowBandGridData), this.renderer._lowBandSmoothedData = c[0]), c = null) : (c = h.call(this, i), this.renderer._smoothedData = c[0], this.renderer._smoothedPlotData = c[1], s.show && (c = h.call(this, this.renderer._hiBandGridData), this.renderer._hiBandSmoothedData = c[0], c = h.call(this, this.renderer._lowBandGridData), this.renderer._lowBandSmoothedData = c[0]), c = null)
                }
                return i
            }, t.jqplot.LineRenderer.prototype.draw = function(e, r, n, i) {
                var s, o, a, l, c, u = t.extend(!0, {}, n),
                    h = u.shadow != P ? u.shadow : this.shadow,
                    p = u.showLine != P ? u.showLine : this.showLine,
                    d = u.fill != P ? u.fill : this.fill,
                    f = u.fillAndStroke != P ? u.fillAndStroke : this.fillAndStroke;
                if (e.save(), r.length) {
                    if (p)
                        if (d) {
                            if (this.fillToZero) {
                                var m = this.negativeColor;
                                this.useNegativeColors || (m = u.fillStyle);
                                var g = !1,
                                    v = u.fillStyle;
                                if (f) var y = r.slice(0);
                                if (0 != this.index && this._stack) {
                                    for (var b = this._prevGridData, s = b.length; s > 0; s--) r.push(b[s - 1]);
                                    h && this.renderer.shadowRenderer.draw(e, r, u), this._areaPoints = r, this.renderer.shapeRenderer.draw(e, r, u)
                                } else {
                                    var w = [],
                                        _ = this.renderer.smooth ? this.renderer._smoothedPlotData : this._plotData;
                                    this._areaPoints = [];
                                    var x = this._yaxis.series_u2p(this.fillToValue);
                                    this._xaxis.series_u2p(this.fillToValue);
                                    if (u.closePath = !0, "y" == this.fillAxis) {
                                        w.push([r[0][0], x]), this._areaPoints.push([r[0][0], x]);
                                        for (var s = 0; s < r.length - 1; s++)
                                            if (w.push(r[s]), this._areaPoints.push(r[s]), _[s][1] * _[s + 1][1] <= 0) {
                                                _[s][1] < 0 ? (g = !0, u.fillStyle = m) : (g = !1, u.fillStyle = v);
                                                var k = r[s][0] + (r[s + 1][0] - r[s][0]) * (x - r[s][1]) / (r[s + 1][1] - r[s][1]);
                                                w.push([k, x]), this._areaPoints.push([k, x]), h && this.renderer.shadowRenderer.draw(e, w, u), this.renderer.shapeRenderer.draw(e, w, u), w = [
                                                    [k, x]
                                                ]
                                            }
                                        _[r.length - 1][1] < 0 ? (g = !0, u.fillStyle = m) : (g = !1, u.fillStyle = v), w.push(r[r.length - 1]), this._areaPoints.push(r[r.length - 1]), w.push([r[r.length - 1][0], x]), this._areaPoints.push([r[r.length - 1][0], x])
                                    }
                                    h && this.renderer.shadowRenderer.draw(e, w, u), this.renderer.shapeRenderer.draw(e, w, u)
                                }
                            } else {
                                if (f) var y = r.slice(0);
                                if (0 != this.index && this._stack)
                                    for (var b = this._prevGridData, s = b.length; s > 0; s--) r.push(b[s - 1]);
                                else {
                                    var C = e.canvas.height;
                                    r.unshift([r[0][0], C]);
                                    var S = r.length;
                                    r.push([r[S - 1][0], C])
                                }
                                this._areaPoints = r, h && this.renderer.shadowRenderer.draw(e, r, u), this.renderer.shapeRenderer.draw(e, r, u)
                            }
                            if (f) {
                                var E = t.extend(!0, {}, u, {
                                    fill: !1,
                                    closePath: !1
                                });
                                if (this.renderer.shapeRenderer.draw(e, y, E), this.markerRenderer.show)
                                    for (this.renderer.smooth && (y = this.gridData), s = 0; s < y.length; s++) this.markerRenderer.draw(y[s][0], y[s][1], e, u.markerOptions)
                            }
                        } else {
                            if (this.renderer.bands.show) {
                                var D, T = t.extend(!0, {}, u);
                                this.renderer.bands.showLines && (D = this.renderer.smooth ? this.renderer._hiBandSmoothedData : this.renderer._hiBandGridData, this.renderer.shapeRenderer.draw(e, D, u), D = this.renderer.smooth ? this.renderer._lowBandSmoothedData : this.renderer._lowBandGridData, this.renderer.shapeRenderer.draw(e, D, T)), this.renderer.bands.fill && (D = this.renderer.smooth ? this.renderer._hiBandSmoothedData.concat(this.renderer._lowBandSmoothedData.reverse()) : this.renderer._hiBandGridData.concat(this.renderer._lowBandGridData.reverse()), this._areaPoints = D, T.closePath = !0, T.fill = !0, T.fillStyle = this.renderer.bands.fillColor, this.renderer.shapeRenderer.draw(e, D, T))
                            }
                            h && this.renderer.shadowRenderer.draw(e, r, u), this.renderer.shapeRenderer.draw(e, r, u)
                        }
                    var o = l = a = c = null;
                    for (s = 0; s < this._areaPoints.length; s++) {
                        var O = this._areaPoints[s];
                        (o > O[0] || null == o) && (o = O[0]), (c < O[1] || null == c) && (c = O[1]), (l < O[0] || null == l) && (l = O[0]), (a > O[1] || null == a) && (a = O[1])
                    }
                    if ("line" === this.type && this.renderer.bands.show && (c = this._yaxis.series_u2p(this.renderer.bands._min), a = this._yaxis.series_u2p(this.renderer.bands._max)), this._boundingBox = [
                            [o, c],
                            [l, a]
                        ], this.markerRenderer.show && !d)
                        for (this.renderer.smooth && (r = this.gridData), s = 0; s < r.length; s++) null != r[s][0] && null != r[s][1] && this.markerRenderer.draw(r[s][0], r[s][1], e, u.markerOptions)
                }
                e.restore()
            }, t.jqplot.LineRenderer.prototype.drawShadow = function(e, t, r) {}, t.jqplot.LinearAxisRenderer = function() {}, t.jqplot.LinearAxisRenderer.prototype.init = function(e) {
                this.breakPoints = null, this.breakTickLabel = "&asymp;", this.drawBaseline = !0, this.baselineWidth = null, this.baselineColor = null, this.forceTickAt0 = !1, this.forceTickAt100 = !1, this.tickInset = 0, this.minorTicks = 0, this.alignTicks = !1, this._autoFormatString = "", this._overrideFormatString = !1, this._scalefact = 1, t.extend(!0, this, e), this.breakPoints && (t.isArray(this.breakPoints) ? (this.breakPoints.length < 2 || this.breakPoints[1] <= this.breakPoints[0]) && (this.breakPoints = null) : this.breakPoints = null), null != this.numberTicks && this.numberTicks < 2 && (this.numberTicks = 2), this.resetDataBounds()
            }, t.jqplot.LinearAxisRenderer.prototype.draw = function(e, r) {
                if (this.show) {
                    this.renderer.createTicks.call(this, r);
                    if (this._elem && (this._elem.emptyForce(), this._elem = null), this._elem = t(document.createElement("div")), this._elem.addClass("jqplot-axis jqplot-" + this.name), this._elem.css("position", "absolute"), "xaxis" == this.name || "x2axis" == this.name ? this._elem.width(this._plotDimensions.width) : this._elem.height(this._plotDimensions.height), this.labelOptions.axis = this.name, this._label = new this.labelRenderer(this.labelOptions), this._label.show) {
                        var n = this._label.draw(e, r);
                        n.appendTo(this._elem), n = null
                    }
                    for (var i, s = this._ticks, o = 0; o < s.length; o++) i = s[o], i.show && i.showLabel && (!i.isMinorTick || this.showMinorTicks) && this._elem.append(i.draw(e, r));
                    i = null, s = null
                }
                return this._elem
            }, t.jqplot.LinearAxisRenderer.prototype.reset = function() {
                this.min = this._options.min, this.max = this._options.max, this.tickInterval = this._options.tickInterval, this.numberTicks = this._options.numberTicks, this._autoFormatString = "", this._overrideFormatString && this.tickOptions && this.tickOptions.formatString && (this.tickOptions.formatString = "")
            }, t.jqplot.LinearAxisRenderer.prototype.set = function() {
                var e, r = 0,
                    n = 0,
                    i = 0,
                    s = null == this._label ? !1 : this._label.show;
                if (this.show) {
                    for (var o, a = this._ticks, l = 0; l < a.length; l++) o = a[l], o._breakTick || !o.show || !o.showLabel || o.isMinorTick && !this.showMinorTicks || (e = "xaxis" == this.name || "x2axis" == this.name ? o._elem.outerHeight(!0) : o._elem.outerWidth(!0), e > r && (r = e));
                    o = null, a = null, s && (n = this._label._elem.outerWidth(!0), i = this._label._elem.outerHeight(!0)), "xaxis" == this.name ? (r += i, this._elem.css({
                        height: r + "px",
                        left: "0px",
                        bottom: "0px"
                    })) : "x2axis" == this.name ? (r += i, this._elem.css({
                        height: r + "px",
                        left: "0px",
                        top: "0px"
                    })) : "yaxis" == this.name ? (r += n, this._elem.css({
                        width: r + "px",
                        left: "0px",
                        top: "0px"
                    }), s && this._label.constructor == t.jqplot.AxisLabelRenderer && this._label._elem.css("width", n + "px")) : (r += n, this._elem.css({
                        width: r + "px",
                        right: "0px",
                        top: "0px"
                    }), s && this._label.constructor == t.jqplot.AxisLabelRenderer && this._label._elem.css("width", n + "px"))
                }
            }, t.jqplot.LinearAxisRenderer.prototype.createTicks = function(e) {
                var r, n, i, s, o = this._ticks,
                    a = this.ticks,
                    l = this.name,
                    c = this._dataBounds,
                    u = "x" === this.name.charAt(0) ? this._plotDimensions.width : this._plotDimensions.height,
                    h = this.min,
                    p = this.max,
                    d = this.numberTicks,
                    f = this.tickInterval,
                    m = 30;
                if (this._scalefact = (Math.max(u, m + 1) - m) / 300, a.length) {
                    for (s = 0; s < a.length; s++) {
                        var g = a[s],
                            v = new this.tickRenderer(this.tickOptions);
                        t.isArray(g) ? (v.value = g[0], this.breakPoints ? g[0] == this.breakPoints[0] ? (v.label = this.breakTickLabel, v._breakTick = !0, v.showGridline = !1, v.showMark = !1) : g[0] > this.breakPoints[0] && g[0] <= this.breakPoints[1] ? (v.show = !1, v.showGridline = !1, v.label = g[1]) : v.label = g[1] : v.label = g[1], v.setTick(g[0], this.name), this._ticks.push(v)) : t.isPlainObject(g) ? (t.extend(!0, v, g), v.axis = this.name, this._ticks.push(v)) : (v.value = g, this.breakPoints && (g == this.breakPoints[0] ? (v.label = this.breakTickLabel, v._breakTick = !0, v.showGridline = !1, v.showMark = !1) : g > this.breakPoints[0] && g <= this.breakPoints[1] && (v.show = !1, v.showGridline = !1)), v.setTick(g, this.name), this._ticks.push(v))
                    }
                    this.numberTicks = a.length, this.min = this._ticks[0].value, this.max = this._ticks[this.numberTicks - 1].value, this.tickInterval = (this.max - this.min) / (this.numberTicks - 1)
                } else {
                    u = "xaxis" == l || "x2axis" == l ? this._plotDimensions.width : this._plotDimensions.height;
                    var y = this.numberTicks;
                    this.alignTicks && ("x2axis" === this.name && e.axes.xaxis.show ? y = e.axes.xaxis.numberTicks : "y" === this.name.charAt(0) && "yaxis" !== this.name && "yMidAxis" !== this.name && e.axes.yaxis.show && (y = e.axes.yaxis.numberTicks)), r = null != this.min ? this.min : c.min, n = null != this.max ? this.max : c.max;
                    var b, w, _, x = n - r;
                    if (null != this.tickOptions && this.tickOptions.formatString || (this._overrideFormatString = !0), null == this.min || null == this.max && null == this.tickInterval && !this.autoscale) {
                        this.forceTickAt0 && (r > 0 && (r = 0), 0 > n && (n = 0)), this.forceTickAt100 && (r > 100 && (r = 100), 100 > n && (n = 100));
                        var k = !1,
                            C = !1;
                        null != this.min ? k = !0 : null != this.max && (C = !0);
                        var S = t.jqplot.LinearTickGenerator(r, n, this._scalefact, y, k, C),
                            E = null != this.min ? r : r + x * (this.padMin - 1),
                            D = null != this.max ? n : n - x * (this.padMax - 1);
                        (E > r || n > D) && (E = null != this.min ? r : r - x * (this.padMin - 1), D = null != this.max ? n : n + x * (this.padMax - 1), S = t.jqplot.LinearTickGenerator(E, D, this._scalefact, y, k, C)), this.min = S[0], this.max = S[1], this.numberTicks = S[2], this._autoFormatString = S[3], this.tickInterval = S[4]
                    } else {
                        if (r == n) {
                            var T = .05;
                            r > 0 && (T = Math.max(Math.log(r) / Math.LN10, .05)), r -= T, n += T
                        }
                        if (this.autoscale && null == this.min && null == this.max) {
                            for (var O, M, N, P = !1, j = !1, s = 0; s < this._series.length; s++) {
                                var R = this._series[s],
                                    I = "x" == R.fillAxis ? R._xaxis.name : R._yaxis.name;
                                if (this.name == I) {
                                    for (var A = R._plotValues[R.fillAxis], L = A[0], H = A[0], q = 1; q < A.length; q++) A[q] < L ? L = A[q] : A[q] > H && (H = A[q]);
                                    var F = (H - L) / H;
                                    R.renderer.constructor == t.jqplot.BarRenderer ? L >= 0 && (R.fillToZero || F > .1) ? P = !0 : (P = !1, j = R.fill && R.fillToZero && 0 > L && H > 0 ? !0 : !1) : R.fill ? L >= 0 && (R.fillToZero || F > .1) ? P = !0 : 0 > L && H > 0 && R.fillToZero ? (P = !1, j = !0) : (P = !1, j = !1) : 0 > L && (P = !1)
                                }
                            }
                            if (P) this.numberTicks = 2 + Math.ceil((u - (this.tickSpacing - 1)) / this.tickSpacing), this.min = 0, h = 0, M = n / (this.numberTicks - 1), _ = Math.pow(10, Math.abs(Math.floor(Math.log(M) / Math.LN10))), M / _ == parseInt(M / _, 10) && (M += _), this.tickInterval = Math.ceil(M / _) * _, this.max = this.tickInterval * (this.numberTicks - 1);
                            else if (j) {
                                this.numberTicks = 2 + Math.ceil((u - (this.tickSpacing - 1)) / this.tickSpacing);
                                var z = Math.ceil(Math.abs(r) / x * (this.numberTicks - 1)),
                                    W = this.numberTicks - 1 - z;
                                M = Math.max(Math.abs(r / z), Math.abs(n / W)), _ = Math.pow(10, Math.abs(Math.floor(Math.log(M) / Math.LN10))), this.tickInterval = Math.ceil(M / _) * _, this.max = this.tickInterval * W, this.min = -this.tickInterval * z
                            } else null == this.numberTicks && (this.tickInterval ? this.numberTicks = 3 + Math.ceil(x / this.tickInterval) : this.numberTicks = 2 + Math.ceil((u - (this.tickSpacing - 1)) / this.tickSpacing)), null == this.tickInterval ? (M = x / (this.numberTicks - 1), _ = 1 > M ? Math.pow(10, Math.abs(Math.floor(Math.log(M) / Math.LN10))) : 1, this.tickInterval = Math.ceil(M * _ * this.pad) / _) : _ = 1 / this.tickInterval, O = this.tickInterval * (this.numberTicks - 1), N = (O - x) / 2, null == this.min && (this.min = Math.floor(_ * (r - N)) / _), null == this.max && (this.max = this.min + O);
                            var Y, B = t.jqplot.getSignificantFigures(this.tickInterval);
                            if (B.digitsLeft >= B.significantDigits) Y = "%d";
                            else {
                                var _ = Math.max(0, 5 - B.digitsLeft);
                                _ = Math.min(_, B.digitsRight), Y = "%." + _ + "f"
                            }
                            this._autoFormatString = Y
                        } else {
                            b = null != this.min ? this.min : r - x * (this.padMin - 1), w = null != this.max ? this.max : n + x * (this.padMax - 1), x = w - b, null == this.numberTicks && (null != this.tickInterval ? this.numberTicks = Math.ceil((w - b) / this.tickInterval) + 1 : u > 100 ? this.numberTicks = parseInt(3 + (u - 100) / 75, 10) : this.numberTicks = 2), null == this.tickInterval && (this.tickInterval = x / (this.numberTicks - 1)), null == this.max && (w = b + this.tickInterval * (this.numberTicks - 1)), null == this.min && (b = w - this.tickInterval * (this.numberTicks - 1));
                            var Y, B = t.jqplot.getSignificantFigures(this.tickInterval);
                            if (B.digitsLeft >= B.significantDigits) Y = "%d";
                            else {
                                var _ = Math.max(0, 5 - B.digitsLeft);
                                _ = Math.min(_, B.digitsRight), Y = "%." + _ + "f"
                            }
                            this._autoFormatString = Y, this.min = b, this.max = w
                        }
                        if (this.renderer.constructor == t.jqplot.LinearAxisRenderer && "" == this._autoFormatString) {
                            x = this.max - this.min;
                            var G = new this.tickRenderer(this.tickOptions),
                                U = G.formatString || t.jqplot.config.defaultTickFormatString,
                                U = U.match(t.jqplot.sprintf.regex)[0],
                                V = 0;
                            if (U) {
                                if (U.search(/[fFeEgGpP]/) > -1) {
                                    var X = U.match(/\%\.(\d{0,})?[eEfFgGpP]/);
                                    V = X ? parseInt(X[1], 10) : 6
                                } else U.search(/[di]/) > -1 && (V = 0);
                                var K = Math.pow(10, -V);
                                if (this.tickInterval < K && null == d && null == f)
                                    if (this.tickInterval = K, null == p && null == h) {
                                        this.min = Math.floor(this._dataBounds.min / K) * K, this.min == this._dataBounds.min && (this.min = this._dataBounds.min - this.tickInterval), this.max = Math.ceil(this._dataBounds.max / K) * K, this.max == this._dataBounds.max && (this.max = this._dataBounds.max + this.tickInterval);
                                        var Z = (this.max - this.min) / this.tickInterval;
                                        Z = Z.toFixed(11), Z = Math.ceil(Z), this.numberTicks = Z + 1
                                    } else if (null == p) {
                                    var Z = (this._dataBounds.max - this.min) / this.tickInterval;
                                    Z = Z.toFixed(11), this.numberTicks = Math.ceil(Z) + 2, this.max = this.min + this.tickInterval * (this.numberTicks - 1)
                                } else if (null == h) {
                                    var Z = (this.max - this._dataBounds.min) / this.tickInterval;
                                    Z = Z.toFixed(11), this.numberTicks = Math.ceil(Z) + 2, this.min = this.max - this.tickInterval * (this.numberTicks - 1)
                                } else this.numberTicks = Math.ceil((p - h) / this.tickInterval) + 1, this.min = Math.floor(h * Math.pow(10, V)) / Math.pow(10, V), this.max = Math.ceil(p * Math.pow(10, V)) / Math.pow(10, V), this.numberTicks = Math.ceil((this.max - this.min) / this.tickInterval) + 1
                            }
                        }
                    }
                    this._overrideFormatString && "" != this._autoFormatString && (this.tickOptions = this.tickOptions || {}, this.tickOptions.formatString = this._autoFormatString);
                    for (var v, $, s = 0; s < this.numberTicks; s++) {
                        if (i = this.min + s * this.tickInterval, v = new this.tickRenderer(this.tickOptions), v.setTick(i, this.name), this._ticks.push(v), s < this.numberTicks - 1)
                            for (var q = 0; q < this.minorTicks; q++) i += this.tickInterval / (this.minorTicks + 1), $ = t.extend(!0, {}, this.tickOptions, {
                                name: this.name,
                                value: i,
                                label: "",
                                isMinorTick: !0
                            }), v = new this.tickRenderer($), this._ticks.push(v);
                        v = null
                    }
                }
                this.tickInset && (this.min = this.min - this.tickInset * this.tickInterval, this.max = this.max + this.tickInset * this.tickInterval), o = null
            }, t.jqplot.LinearAxisRenderer.prototype.resetTickValues = function(e) {
                if (t.isArray(e) && e.length == this._ticks.length) {
                    for (var r, n = 0; n < e.length; n++) r = this._ticks[n], r.value = e[n], r.label = r.formatter(r.formatString, e[n]), r.label = r.prefix + r.label, r._elem.html(r.label);
                    r = null, this.min = t.jqplot.arrayMin(e), this.max = t.jqplot.arrayMax(e), this.pack()
                }
            }, t.jqplot.LinearAxisRenderer.prototype.pack = function(e, r) {
                e = e || {}, r = r || this._offsets;
                var n = this._ticks,
                    i = this.max,
                    s = this.min,
                    o = r.max,
                    a = r.min,
                    l = null == this._label ? !1 : this._label.show;
                for (var c in e) this._elem.css(c, e[c]);
                this._offsets = r;
                var u = o - a,
                    h = i - s;
                if (this.breakPoints ? (h = h - this.breakPoints[1] + this.breakPoints[0], this.p2u = function(e) {
                        return (e - a) * h / u + s
                    }, this.u2p = function(e) {
                        return e > this.breakPoints[0] && e < this.breakPoints[1] && (e = this.breakPoints[0]), e <= this.breakPoints[0] ? (e - s) * u / h + a : (e - this.breakPoints[1] + this.breakPoints[0] - s) * u / h + a
                    }, "x" == this.name.charAt(0) ? (this.series_u2p = function(e) {
                        return e > this.breakPoints[0] && e < this.breakPoints[1] && (e = this.breakPoints[0]), e <= this.breakPoints[0] ? (e - s) * u / h : (e - this.breakPoints[1] + this.breakPoints[0] - s) * u / h
                    }, this.series_p2u = function(e) {
                        return e * h / u + s
                    }) : (this.series_u2p = function(e) {
                        return e > this.breakPoints[0] && e < this.breakPoints[1] && (e = this.breakPoints[0]), e >= this.breakPoints[1] ? (e - i) * u / h : (e + this.breakPoints[1] - this.breakPoints[0] - i) * u / h
                    }, this.series_p2u = function(e) {
                        return e * h / u + i
                    })) : (this.p2u = function(e) {
                        return (e - a) * h / u + s
                    }, this.u2p = function(e) {
                        return (e - s) * u / h + a
                    }, "xaxis" == this.name || "x2axis" == this.name ? (this.series_u2p = function(e) {
                        return (e - s) * u / h
                    }, this.series_p2u = function(e) {
                        return e * h / u + s
                    }) : (this.series_u2p = function(e) {
                        return (e - i) * u / h
                    }, this.series_p2u = function(e) {
                        return e * h / u + i
                    })), this.show)
                    if ("xaxis" == this.name || "x2axis" == this.name) {
                        for (var p = 0; p < n.length; p++) {
                            var d = n[p];
                            if (d.show && d.showLabel) {
                                var f;
                                if (d.constructor == t.jqplot.CanvasAxisTickRenderer && d.angle) {
                                    var m = "xaxis" == this.name ? 1 : -1;
                                    switch (d.labelPosition) {
                                        case "auto":
                                            f = m * d.angle < 0 ? -d.getWidth() + d._textRenderer.height * Math.sin(-d._textRenderer.angle) / 2 : -d._textRenderer.height * Math.sin(d._textRenderer.angle) / 2;
                                            break;
                                        case "end":
                                            f = -d.getWidth() + d._textRenderer.height * Math.sin(-d._textRenderer.angle) / 2;
                                            break;
                                        case "start":
                                            f = -d._textRenderer.height * Math.sin(d._textRenderer.angle) / 2;
                                            break;
                                        case "middle":
                                            f = -d.getWidth() / 2 + d._textRenderer.height * Math.sin(-d._textRenderer.angle) / 2;
                                            break;
                                        default:
                                            f = -d.getWidth() / 2 + d._textRenderer.height * Math.sin(-d._textRenderer.angle) / 2
                                    }
                                } else f = -d.getWidth() / 2;
                                var g = this.u2p(d.value) + f + "px";
                                d._elem.css("left", g), d.pack()
                            }
                        }
                        if (l) {
                            var v = this._label._elem.outerWidth(!0);
                            this._label._elem.css("left", a + u / 2 - v / 2 + "px"), "xaxis" == this.name ? this._label._elem.css("bottom", "0px") : this._label._elem.css("top", "0px"), this._label.pack()
                        }
                    } else {
                        for (var p = 0; p < n.length; p++) {
                            var d = n[p];
                            if (d.show && d.showLabel) {
                                var f;
                                if (d.constructor == t.jqplot.CanvasAxisTickRenderer && d.angle) {
                                    var m = "yaxis" == this.name ? 1 : -1;
                                    switch (d.labelPosition) {
                                        case "auto":
                                        case "end":
                                            f = m * d.angle < 0 ? -d._textRenderer.height * Math.cos(-d._textRenderer.angle) / 2 : -d.getHeight() + d._textRenderer.height * Math.cos(d._textRenderer.angle) / 2;
                                            break;
                                        case "start":
                                            f = d.angle > 0 ? -d._textRenderer.height * Math.cos(-d._textRenderer.angle) / 2 : -d.getHeight() + d._textRenderer.height * Math.cos(d._textRenderer.angle) / 2;
                                            break;
                                        case "middle":
                                            f = -d.getHeight() / 2;
                                            break;
                                        default:
                                            f = -d.getHeight() / 2
                                    }
                                } else f = -d.getHeight() / 2;
                                var g = this.u2p(d.value) + f + "px";
                                d._elem.css("top", g), d.pack()
                            }
                        }
                        if (l) {
                            var y = this._label._elem.outerHeight(!0);
                            this._label._elem.css("top", o - u / 2 - y / 2 + "px"), "yaxis" == this.name ? this._label._elem.css("left", "0px") : this._label._elem.css("right", "0px"), this._label.pack()
                        }
                    }
                n = null
            };
            t.jqplot.LinearTickGenerator = function(e, r, n, i, s, o) {
                if (s = null === s ? !1 : s, o = null === o || s ? !1 : o, e === r && (r = r ? 0 : 1), n = n || 1, e > r) {
                    var a = r;
                    r = e, e = a
                }
                var l = [],
                    c = C(r - e, n),
                    u = t.jqplot.getSignificantFigures;
                if (null == i)
                    if (s || o) {
                        if (s) {
                            l[0] = e, l[2] = Math.ceil((r - e) / c + 1), l[1] = e + (l[2] - 1) * c;
                            var h = u(e).digitsRight,
                                p = u(c).digitsRight;
                            p > h ? l[3] = _(c) : l[3] = "%." + h + "f", l[4] = c
                        } else if (o) {
                            l[1] = r, l[2] = Math.ceil((r - e) / c + 1), l[0] = r - (l[2] - 1) * c;
                            var d = u(r).digitsRight,
                                p = u(c).digitsRight;
                            p > d ? l[3] = _(c) : l[3] = "%." + d + "f", l[4] = c
                        }
                    } else l[0] = Math.floor(e / c) * c, l[1] = Math.ceil(r / c) * c, l[2] = Math.round((l[1] - l[0]) / c + 1), l[3] = _(c), l[4] = c;
                else {
                    var f = [];
                    if (f[0] = Math.floor(e / c) * c, f[1] = Math.ceil(r / c) * c, f[2] = Math.round((f[1] - f[0]) / c + 1), f[3] = _(c), f[4] = c, f[2] === i) l = f;
                    else {
                        var m = k(f[1] - f[0], i);
                        l[0] = f[0], l[2] = i, l[4] = m, l[3] = _(m), l[1] = l[0] + (l[2] - 1) * l[4]
                    }
                }
                return l
            }, t.jqplot.LinearTickGenerator.bestLinearInterval = C, t.jqplot.LinearTickGenerator.bestInterval = k, t.jqplot.LinearTickGenerator.bestLinearComponents = S, t.jqplot.LinearTickGenerator.bestConstrainedInterval = x, t.jqplot.MarkerRenderer = function(e) {
                this.show = !0, this.style = "filledCircle", this.lineWidth = 2, this.size = 9, this.color = "#666666", this.shadow = !0, this.shadowAngle = 45, this.shadowOffset = 1, this.shadowDepth = 3, this.shadowAlpha = "0.07", this.shadowRenderer = new t.jqplot.ShadowRenderer, this.shapeRenderer = new t.jqplot.ShapeRenderer, t.extend(!0, this, e)
            }, t.jqplot.MarkerRenderer.prototype.init = function(e) {
                t.extend(!0, this, e);
                var r = {
                    angle: this.shadowAngle,
                    offset: this.shadowOffset,
                    alpha: this.shadowAlpha,
                    lineWidth: this.lineWidth,
                    depth: this.shadowDepth,
                    closePath: !0
                }; - 1 != this.style.indexOf("filled") && (r.fill = !0), -1 != this.style.indexOf("ircle") && (r.isarc = !0, r.closePath = !1), this.shadowRenderer.init(r);
                var n = {
                    fill: !1,
                    isarc: !1,
                    strokeStyle: this.color,
                    fillStyle: this.color,
                    lineWidth: this.lineWidth,
                    closePath: !0
                }; - 1 != this.style.indexOf("filled") && (n.fill = !0), -1 != this.style.indexOf("ircle") && (n.isarc = !0, n.closePath = !1), this.shapeRenderer.init(n)
            }, t.jqplot.MarkerRenderer.prototype.drawDiamond = function(e, t, r, n, i) {
                var s = 1.2,
                    o = this.size / 2 / s,
                    a = this.size / 2 * s,
                    l = [
                        [e - o, t],
                        [e, t + a],
                        [e + o, t],
                        [e, t - a]
                    ];
                this.shadow && this.shadowRenderer.draw(r, l), this.shapeRenderer.draw(r, l, i)
            }, t.jqplot.MarkerRenderer.prototype.drawPlus = function(e, r, n, i, s) {
                var o = 1,
                    a = this.size / 2 * o,
                    l = this.size / 2 * o,
                    c = [
                        [e, r - l],
                        [e, r + l]
                    ],
                    u = [
                        [e + a, r],
                        [e - a, r]
                    ],
                    h = t.extend(!0, {}, this.options, {
                        closePath: !1
                    });
                this.shadow && (this.shadowRenderer.draw(n, c, {
                    closePath: !1
                }), this.shadowRenderer.draw(n, u, {
                    closePath: !1
                })), this.shapeRenderer.draw(n, c, h), this.shapeRenderer.draw(n, u, h)
            }, t.jqplot.MarkerRenderer.prototype.drawX = function(e, r, n, i, s) {
                var o = 1,
                    a = this.size / 2 * o,
                    l = this.size / 2 * o,
                    c = t.extend(!0, {}, this.options, {
                        closePath: !1
                    }),
                    u = [
                        [e - a, r - l],
                        [e + a, r + l]
                    ],
                    h = [
                        [e - a, r + l],
                        [e + a, r - l]
                    ];
                this.shadow && (this.shadowRenderer.draw(n, u, {
                    closePath: !1
                }), this.shadowRenderer.draw(n, h, {
                    closePath: !1
                })), this.shapeRenderer.draw(n, u, c), this.shapeRenderer.draw(n, h, c)
            }, t.jqplot.MarkerRenderer.prototype.drawDash = function(e, t, r, n, i) {
                var s = 1,
                    o = this.size / 2 * s,
                    a = (this.size / 2 * s, [
                        [e - o, t],
                        [e + o, t]
                    ]);
                this.shadow && this.shadowRenderer.draw(r, a), this.shapeRenderer.draw(r, a, i)
            }, t.jqplot.MarkerRenderer.prototype.drawLine = function(e, t, r, n, i) {
                var s = [e, t];
                this.shadow && this.shadowRenderer.draw(r, s), this.shapeRenderer.draw(r, s, i)
            }, t.jqplot.MarkerRenderer.prototype.drawSquare = function(e, t, r, n, i) {
                var s = 1,
                    o = this.size / 2 / s,
                    a = this.size / 2 * s,
                    l = [
                        [e - o, t - a],
                        [e - o, t + a],
                        [e + o, t + a],
                        [e + o, t - a]
                    ];
                this.shadow && this.shadowRenderer.draw(r, l), this.shapeRenderer.draw(r, l, i)
            }, t.jqplot.MarkerRenderer.prototype.drawCircle = function(e, t, r, n, i) {
                var s = this.size / 2,
                    o = 2 * Math.PI,
                    a = [e, t, s, 0, o, !0];
                this.shadow && this.shadowRenderer.draw(r, a), this.shapeRenderer.draw(r, a, i)
            }, t.jqplot.MarkerRenderer.prototype.draw = function(e, t, r, n) {
                if (n = n || {}, null == n.show || 0 != n.show) switch (n.color && !n.fillStyle && (n.fillStyle = n.color), n.color && !n.strokeStyle && (n.strokeStyle = n.color), this.style) {
                    case "diamond":
                        this.drawDiamond(e, t, r, !1, n);
                        break;
                    case "filledDiamond":
                        this.drawDiamond(e, t, r, !0, n);
                        break;
                    case "circle":
                        this.drawCircle(e, t, r, !1, n);
                        break;
                    case "filledCircle":
                        this.drawCircle(e, t, r, !0, n);
                        break;
                    case "square":
                        this.drawSquare(e, t, r, !1, n);
                        break;
                    case "filledSquare":
                        this.drawSquare(e, t, r, !0, n);
                        break;
                    case "x":
                        this.drawX(e, t, r, !0, n);
                        break;
                    case "plus":
                        this.drawPlus(e, t, r, !0, n);
                        break;
                    case "dash":
                        this.drawDash(e, t, r, !0, n);
                        break;
                    case "line":
                        this.drawLine(e, t, r, !1, n);
                        break;
                    default:
                        this.drawDiamond(e, t, r, !1, n)
                }
            }, t.jqplot.ShadowRenderer = function(e) {
                this.angle = 45, this.offset = 1, this.alpha = .07, this.lineWidth = 1.5, this.lineJoin = "miter", this.lineCap = "round", this.closePath = !1, this.fill = !1, this.depth = 3, this.strokeStyle = "rgba(0,0,0,0.1)", this.isarc = !1, t.extend(!0, this, e)
            }, t.jqplot.ShadowRenderer.prototype.init = function(e) {
                t.extend(!0, this, e)
            }, t.jqplot.ShadowRenderer.prototype.draw = function(e, r, n) {
                e.save();
                var i = null != n ? n : {},
                    s = null != i.fill ? i.fill : this.fill,
                    o = null != i.fillRect ? i.fillRect : this.fillRect,
                    a = null != i.closePath ? i.closePath : this.closePath,
                    l = null != i.offset ? i.offset : this.offset,
                    c = null != i.alpha ? i.alpha : this.alpha,
                    u = null != i.depth ? i.depth : this.depth,
                    h = null != i.isarc ? i.isarc : this.isarc,
                    p = null != i.linePattern ? i.linePattern : this.linePattern;
                e.lineWidth = null != i.lineWidth ? i.lineWidth : this.lineWidth, e.lineJoin = null != i.lineJoin ? i.lineJoin : this.lineJoin, e.lineCap = null != i.lineCap ? i.lineCap : this.lineCap, e.strokeStyle = i.strokeStyle || this.strokeStyle || "rgba(0,0,0," + c + ")", e.fillStyle = i.fillStyle || this.fillStyle || "rgba(0,0,0," + c + ")";
                for (var d = 0; u > d; d++) {
                    var f = t.jqplot.LinePattern(e, p);
                    if (e.translate(Math.cos(this.angle * Math.PI / 180) * l, Math.sin(this.angle * Math.PI / 180) * l), f.beginPath(), h) e.arc(r[0], r[1], r[2], r[3], r[4], !0);
                    else if (o) o && e.fillRect(r[0], r[1], r[2], r[3]);
                    else if (r && r.length)
                        for (var m = !0, g = 0; g < r.length; g++) null != r[g][0] && null != r[g][1] ? m ? (f.moveTo(r[g][0], r[g][1]),
                            m = !1) : f.lineTo(r[g][0], r[g][1]) : m = !0;
                    a && f.closePath(), s ? e.fill() : e.stroke()
                }
                e.restore()
            }, t.jqplot.ShapeRenderer = function(e) {
                this.lineWidth = 1.5, this.linePattern = "solid", this.lineJoin = "miter", this.lineCap = "round", this.closePath = !1, this.fill = !1, this.isarc = !1, this.fillRect = !1, this.strokeRect = !1, this.clearRect = !1, this.strokeStyle = "#999999", this.fillStyle = "#999999", t.extend(!0, this, e)
            }, t.jqplot.ShapeRenderer.prototype.init = function(e) {
                t.extend(!0, this, e)
            }, t.jqplot.ShapeRenderer.prototype.draw = function(e, r, n) {
                e.save();
                var i = null != n ? n : {},
                    s = null != i.fill ? i.fill : this.fill,
                    o = null != i.closePath ? i.closePath : this.closePath,
                    a = null != i.fillRect ? i.fillRect : this.fillRect,
                    l = null != i.strokeRect ? i.strokeRect : this.strokeRect,
                    c = null != i.clearRect ? i.clearRect : this.clearRect,
                    u = null != i.isarc ? i.isarc : this.isarc,
                    h = null != i.linePattern ? i.linePattern : this.linePattern,
                    p = t.jqplot.LinePattern(e, h);
                if (e.lineWidth = i.lineWidth || this.lineWidth, e.lineJoin = i.lineJoin || this.lineJoin, e.lineCap = i.lineCap || this.lineCap, e.strokeStyle = i.strokeStyle || i.color || this.strokeStyle, e.fillStyle = i.fillStyle || this.fillStyle, e.beginPath(), u) return e.arc(r[0], r[1], r[2], r[3], r[4], !0), o && e.closePath(), s ? e.fill() : e.stroke(), void e.restore();
                if (c) return e.clearRect(r[0], r[1], r[2], r[3]), void e.restore();
                if (a || l) {
                    if (a && e.fillRect(r[0], r[1], r[2], r[3]), l) return e.strokeRect(r[0], r[1], r[2], r[3]), void e.restore()
                } else if (r && r.length) {
                    for (var d = !0, f = 0; f < r.length; f++) null != r[f][0] && null != r[f][1] ? d ? (p.moveTo(r[f][0], r[f][1]), d = !1) : p.lineTo(r[f][0], r[f][1]) : d = !0;
                    o && p.closePath(), s ? e.fill() : e.stroke()
                }
                e.restore()
            }, t.jqplot.TableLegendRenderer = function() {}, t.jqplot.TableLegendRenderer.prototype.init = function(e) {
                t.extend(!0, this, e)
            }, t.jqplot.TableLegendRenderer.prototype.addrow = function(e, r, n, i) {
                var s, o, a, l, c, u = n ? this.rowSpacing + "px" : "0px";
                a = document.createElement("tr"), s = t(a), s.addClass("jqplot-table-legend"), a = null, i ? s.prependTo(this._elem) : s.appendTo(this._elem), this.showSwatches && (o = t(document.createElement("td")), o.addClass("jqplot-table-legend jqplot-table-legend-swatch"), o.css({
                    textAlign: "center",
                    paddingTop: u
                }), l = t(document.createElement("div")), l.addClass("jqplot-table-legend-swatch-outline"), c = t(document.createElement("div")), c.addClass("jqplot-table-legend-swatch"), c.css({
                    backgroundColor: r,
                    borderColor: r
                }), s.append(o.append(l.append(c)))), this.showLabels && (o = t(document.createElement("td")), o.addClass("jqplot-table-legend jqplot-table-legend-label"), o.css("paddingTop", u), s.append(o), this.escapeHtml ? o.text(e) : o.html(e)), o = null, l = null, c = null, s = null, a = null
            }, t.jqplot.TableLegendRenderer.prototype.draw = function() {
                if (this._elem && (this._elem.emptyForce(), this._elem = null), this.show) {
                    var e = this._series,
                        r = document.createElement("table");
                    this._elem = t(r), this._elem.addClass("jqplot-table-legend");
                    var n = {
                        position: "absolute"
                    };
                    this.background && (n.background = this.background), this.border && (n.border = this.border), this.fontSize && (n.fontSize = this.fontSize), this.fontFamily && (n.fontFamily = this.fontFamily), this.textColor && (n.textColor = this.textColor), null != this.marginTop && (n.marginTop = this.marginTop), null != this.marginBottom && (n.marginBottom = this.marginBottom), null != this.marginLeft && (n.marginLeft = this.marginLeft), null != this.marginRight && (n.marginRight = this.marginRight);
                    for (var i, s = !1, o = !1, a = 0; a < e.length; a++)
                        if (i = e[a], (i._stack || i.renderer.constructor == t.jqplot.BezierCurveRenderer) && (o = !0), i.show && i.showLabel) {
                            var l = this.labels[a] || i.label.toString();
                            if (l) {
                                var c = i.color;
                                o && a < e.length - 1 ? s = !0 : o && a == e.length - 1 && (s = !1), this.renderer.addrow.call(this, l, c, s, o), s = !0
                            }
                            for (var u = 0; u < t.jqplot.addLegendRowHooks.length; u++) {
                                var h = t.jqplot.addLegendRowHooks[u].call(this, i);
                                h && (this.renderer.addrow.call(this, h.label, h.color, s), s = !0)
                            }
                            l = null
                        }
                }
                return this._elem
            }, t.jqplot.TableLegendRenderer.prototype.pack = function(e) {
                if (this.show)
                    if ("insideGrid" == this.placement) switch (this.location) {
                        case "nw":
                            var t = e.left,
                                r = e.top;
                            this._elem.css("left", t), this._elem.css("top", r);
                            break;
                        case "n":
                            var t = (e.left + (this._plotDimensions.width - e.right)) / 2 - this.getWidth() / 2,
                                r = e.top;
                            this._elem.css("left", t), this._elem.css("top", r);
                            break;
                        case "ne":
                            var t = e.right,
                                r = e.top;
                            this._elem.css({
                                right: t,
                                top: r
                            });
                            break;
                        case "e":
                            var t = e.right,
                                r = (e.top + (this._plotDimensions.height - e.bottom)) / 2 - this.getHeight() / 2;
                            this._elem.css({
                                right: t,
                                top: r
                            });
                            break;
                        case "se":
                            var t = e.right,
                                r = e.bottom;
                            this._elem.css({
                                right: t,
                                bottom: r
                            });
                            break;
                        case "s":
                            var t = (e.left + (this._plotDimensions.width - e.right)) / 2 - this.getWidth() / 2,
                                r = e.bottom;
                            this._elem.css({
                                left: t,
                                bottom: r
                            });
                            break;
                        case "sw":
                            var t = e.left,
                                r = e.bottom;
                            this._elem.css({
                                left: t,
                                bottom: r
                            });
                            break;
                        case "w":
                            var t = e.left,
                                r = (e.top + (this._plotDimensions.height - e.bottom)) / 2 - this.getHeight() / 2;
                            this._elem.css({
                                left: t,
                                top: r
                            });
                            break;
                        default:
                            var t = e.right,
                                r = e.bottom;
                            this._elem.css({
                                right: t,
                                bottom: r
                            })
                    } else if ("outside" == this.placement) switch (this.location) {
                        case "nw":
                            var t = this._plotDimensions.width - e.left,
                                r = e.top;
                            this._elem.css("right", t), this._elem.css("top", r);
                            break;
                        case "n":
                            var t = (e.left + (this._plotDimensions.width - e.right)) / 2 - this.getWidth() / 2,
                                r = this._plotDimensions.height - e.top;
                            this._elem.css("left", t), this._elem.css("bottom", r);
                            break;
                        case "ne":
                            var t = this._plotDimensions.width - e.right,
                                r = e.top;
                            this._elem.css({
                                left: t,
                                top: r
                            });
                            break;
                        case "e":
                            var t = this._plotDimensions.width - e.right,
                                r = (e.top + (this._plotDimensions.height - e.bottom)) / 2 - this.getHeight() / 2;
                            this._elem.css({
                                left: t,
                                top: r
                            });
                            break;
                        case "se":
                            var t = this._plotDimensions.width - e.right,
                                r = e.bottom;
                            this._elem.css({
                                left: t,
                                bottom: r
                            });
                            break;
                        case "s":
                            var t = (e.left + (this._plotDimensions.width - e.right)) / 2 - this.getWidth() / 2,
                                r = this._plotDimensions.height - e.bottom;
                            this._elem.css({
                                left: t,
                                top: r
                            });
                            break;
                        case "sw":
                            var t = this._plotDimensions.width - e.left,
                                r = e.bottom;
                            this._elem.css({
                                right: t,
                                bottom: r
                            });
                            break;
                        case "w":
                            var t = this._plotDimensions.width - e.left,
                                r = (e.top + (this._plotDimensions.height - e.bottom)) / 2 - this.getHeight() / 2;
                            this._elem.css({
                                right: t,
                                top: r
                            });
                            break;
                        default:
                            var t = e.right,
                                r = e.bottom;
                            this._elem.css({
                                right: t,
                                bottom: r
                            })
                    } else switch (this.location) {
                        case "nw":
                            this._elem.css({
                                left: 0,
                                top: e.top
                            });
                            break;
                        case "n":
                            var t = (e.left + (this._plotDimensions.width - e.right)) / 2 - this.getWidth() / 2;
                            this._elem.css({
                                left: t,
                                top: e.top
                            });
                            break;
                        case "ne":
                            this._elem.css({
                                right: 0,
                                top: e.top
                            });
                            break;
                        case "e":
                            var r = (e.top + (this._plotDimensions.height - e.bottom)) / 2 - this.getHeight() / 2;
                            this._elem.css({
                                right: e.right,
                                top: r
                            });
                            break;
                        case "se":
                            this._elem.css({
                                right: e.right,
                                bottom: e.bottom
                            });
                            break;
                        case "s":
                            var t = (e.left + (this._plotDimensions.width - e.right)) / 2 - this.getWidth() / 2;
                            this._elem.css({
                                left: t,
                                bottom: e.bottom
                            });
                            break;
                        case "sw":
                            this._elem.css({
                                left: e.left,
                                bottom: e.bottom
                            });
                            break;
                        case "w":
                            var r = (e.top + (this._plotDimensions.height - e.bottom)) / 2 - this.getHeight() / 2;
                            this._elem.css({
                                left: e.left,
                                top: r
                            });
                            break;
                        default:
                            this._elem.css({
                                right: e.right,
                                bottom: e.bottom
                            })
                    }
            }, t.jqplot.ThemeEngine = function() {
                this.themes = {}, this.activeTheme = null
            }, t.jqplot.ThemeEngine.prototype.init = function() {
                var e, r, n, i = new t.jqplot.Theme({
                    _name: "Default"
                });
                for (e in i.target) "textColor" == e ? i.target[e] = this.target.css("color") : i.target[e] = this.target.css(e);
                if (this.title.show && this.title._elem)
                    for (e in i.title) "textColor" == e ? i.title[e] = this.title._elem.css("color") : i.title[e] = this.title._elem.css(e);
                for (e in i.grid) i.grid[e] = this.grid[e];
                if (null == i.grid.backgroundColor && null != this.grid.background && (i.grid.backgroundColor = this.grid.background), this.legend.show && this.legend._elem)
                    for (e in i.legend) "textColor" == e ? i.legend[e] = this.legend._elem.css("color") : i.legend[e] = this.legend._elem.css(e);
                var s;
                for (r = 0; r < this.series.length; r++) {
                    s = this.series[r], s.renderer.constructor == t.jqplot.LineRenderer ? i.series.push(new H) : s.renderer.constructor == t.jqplot.BarRenderer ? i.series.push(new F) : s.renderer.constructor == t.jqplot.PieRenderer ? i.series.push(new z) : s.renderer.constructor == t.jqplot.DonutRenderer ? i.series.push(new W) : s.renderer.constructor == t.jqplot.FunnelRenderer ? i.series.push(new Y) : s.renderer.constructor == t.jqplot.MeterGaugeRenderer ? i.series.push(new B) : i.series.push({});
                    for (e in i.series[r]) i.series[r][e] = s[e]
                }
                var o, a;
                for (e in this.axes) {
                    if (a = this.axes[e], o = i.axes[e] = new I, o.borderColor = a.borderColor, o.borderWidth = a.borderWidth, a._ticks && a._ticks[0])
                        for (n in o.ticks) a._ticks[0].hasOwnProperty(n) ? o.ticks[n] = a._ticks[0][n] : a._ticks[0]._elem && (o.ticks[n] = a._ticks[0]._elem.css(n));
                    if (a._label && a._label.show)
                        for (n in o.label) a._label[n] ? o.label[n] = a._label[n] : a._label._elem && ("textColor" == n ? o.label[n] = a._label._elem.css("color") : o.label[n] = a._label._elem.css(n))
                }
                this.themeEngine._add(i), this.themeEngine.activeTheme = this.themeEngine.themes[i._name]
            }, t.jqplot.ThemeEngine.prototype.get = function(e) {
                return e ? this.themes[e] : this.activeTheme
            }, t.jqplot.ThemeEngine.prototype.getThemeNames = function() {
                var e = [];
                for (var t in this.themes) e.push(t);
                return e.sort(E)
            }, t.jqplot.ThemeEngine.prototype.getThemes = function() {
                var e = [],
                    t = [];
                for (var r in this.themes) e.push(r);
                e.sort(E);
                for (var n = 0; n < e.length; n++) t.push(this.themes[e[n]]);
                return t
            }, t.jqplot.ThemeEngine.prototype.activate = function(e, r) {
                var n = !1;
                if (!r && this.activeTheme && this.activeTheme._name && (r = this.activeTheme._name), !this.themes.hasOwnProperty(r)) throw new Error("No theme of that name");
                var i = this.themes[r];
                this.activeTheme = i;
                var s, o = ["xaxis", "x2axis", "yaxis", "y2axis"];
                for (m = 0; m < o.length; m++) {
                    var a = o[m];
                    null != i.axesStyles.borderColor && (e.axes[a].borderColor = i.axesStyles.borderColor), null != i.axesStyles.borderWidth && (e.axes[a].borderWidth = i.axesStyles.borderWidth)
                }
                for (var l in e.axes) {
                    var c = e.axes[l];
                    if (c.show) {
                        var u = i.axes[l] || {},
                            h = i.axesStyles,
                            p = t.jqplot.extend(!0, {}, u, h);
                        if (s = null != i.axesStyles.borderColor ? i.axesStyles.borderColor : p.borderColor, null != p.borderColor && (c.borderColor = p.borderColor, n = !0), s = null != i.axesStyles.borderWidth ? i.axesStyles.borderWidth : p.borderWidth, null != p.borderWidth && (c.borderWidth = p.borderWidth, n = !0), c._ticks && c._ticks[0])
                            for (var d in p.ticks) s = p.ticks[d], null != s && (c.tickOptions[d] = s, c._ticks = [], n = !0);
                        if (c._label && c._label.show)
                            for (var d in p.label) s = p.label[d], null != s && (c.labelOptions[d] = s, n = !0)
                    }
                }
                for (var f in i.grid) null != i.grid[f] && (e.grid[f] = i.grid[f]);
                if (n || e.grid.draw(), e.legend.show)
                    for (f in i.legend) null != i.legend[f] && (e.legend[f] = i.legend[f]);
                if (e.title.show)
                    for (f in i.title) null != i.title[f] && (e.title[f] = i.title[f]);
                var m;
                for (m = 0; m < i.series.length; m++) {
                    var g = {};
                    for (f in i.series[m]) s = null != i.seriesStyles[f] ? i.seriesStyles[f] : i.series[m][f], null != s && (g[f] = s, "color" == f ? (e.series[m].renderer.shapeRenderer.fillStyle = s, e.series[m].renderer.shapeRenderer.strokeStyle = s, e.series[m][f] = s) : "lineWidth" == f || "linePattern" == f ? (e.series[m].renderer.shapeRenderer[f] = s, e.series[m][f] = s) : "markerOptions" == f ? (T(e.series[m].markerOptions, s), T(e.series[m].markerRenderer, s)) : e.series[m][f] = s, n = !0)
                }
                n && (e.target.empty(), e.draw());
                for (f in i.target) null != i.target[f] && e.target.css(f, i.target[f])
            }, t.jqplot.ThemeEngine.prototype._add = function(e, t) {
                if (t && (e._name = t), e._name || (e._name = Date.parse(new Date)), this.themes.hasOwnProperty(e._name)) throw new Error("jqplot.ThemeEngine Error: Theme already in use");
                this.themes[e._name] = e
            }, t.jqplot.ThemeEngine.prototype.remove = function(e) {
                return "Default" == e ? !1 : delete this.themes[e]
            }, t.jqplot.ThemeEngine.prototype.newTheme = function(e, r) {
                "object" == typeof e && (r = r || e, e = null), e = r && r._name ? r._name : e || Date.parse(new Date);
                var n = this.copy(this.themes.Default._name, e);
                return t.jqplot.extend(n, r), n
            }, t.jqplot.clone = D, t.jqplot.merge = T, t.jqplot.extend = function() {
                var e, r = arguments[0] || {},
                    n = 1,
                    i = arguments.length,
                    s = !1;
                for ("boolean" == typeof r && (s = r, r = arguments[1] || {}, n = 2), "object" != typeof r && "[object Function]" === !toString.call(r) && (r = {}); i > n; n++)
                    if (null != (e = arguments[n]))
                        for (var o in e) {
                            var a = r[o],
                                l = e[o];
                            r !== l && (s && l && "object" == typeof l && !l.nodeType ? r[o] = t.jqplot.extend(s, a || (null != l.length ? [] : {}), l) : l !== P && (r[o] = l))
                        }
                    return r
            }, t.jqplot.ThemeEngine.prototype.rename = function(e, t) {
                if ("Default" == e || "Default" == t) throw new Error("jqplot.ThemeEngine Error: Cannot rename from/to Default");
                if (this.themes.hasOwnProperty(t)) throw new Error("jqplot.ThemeEngine Error: New name already in use.");
                if (this.themes.hasOwnProperty(e)) {
                    var r = this.copy(e, t);
                    return this.remove(e), r
                }
                throw new Error("jqplot.ThemeEngine Error: Old name or new name invalid")
            }, t.jqplot.ThemeEngine.prototype.copy = function(e, r, n) {
                if ("Default" == r) throw new Error("jqplot.ThemeEngine Error: Cannot copy over Default theme");
                if (!this.themes.hasOwnProperty(e)) {
                    var i = "jqplot.ThemeEngine Error: Source name invalid";
                    throw new Error(i)
                }
                if (this.themes.hasOwnProperty(r)) {
                    var i = "jqplot.ThemeEngine Error: Target name invalid";
                    throw new Error(i)
                }
                var s = D(this.themes[e]);
                return s._name = r, t.jqplot.extend(!0, s, n), this._add(s), s
            }, t.jqplot.Theme = function(e, r) {
                "object" == typeof e && (r = r || e, e = null), e = e || Date.parse(new Date), this._name = e, this.target = {
                    backgroundColor: null
                }, this.legend = {
                    textColor: null,
                    fontFamily: null,
                    fontSize: null,
                    border: null,
                    background: null
                }, this.title = {
                    textColor: null,
                    fontFamily: null,
                    fontSize: null,
                    textAlign: null
                }, this.seriesStyles = {}, this.series = [], this.grid = {
                    drawGridlines: null,
                    gridLineColor: null,
                    gridLineWidth: null,
                    backgroundColor: null,
                    borderColor: null,
                    borderWidth: null,
                    shadow: null
                }, this.axesStyles = {
                    label: {},
                    ticks: {}
                }, this.axes = {}, "string" == typeof r ? this._name = r : "object" == typeof r && t.jqplot.extend(!0, this, r)
            };
            var I = function() {
                    this.borderColor = null, this.borderWidth = null, this.ticks = new A, this.label = new L
                },
                A = function() {
                    this.show = null, this.showGridline = null, this.showLabel = null, this.showMark = null, this.size = null, this.textColor = null, this.whiteSpace = null, this.fontSize = null, this.fontFamily = null
                },
                L = function() {
                    this.textColor = null, this.whiteSpace = null, this.fontSize = null, this.fontFamily = null, this.fontWeight = null
                },
                H = function() {
                    this.color = null, this.lineWidth = null, this.linePattern = null, this.shadow = null, this.fillColor = null, this.showMarker = null, this.markerOptions = new q
                },
                q = function() {
                    this.show = null, this.style = null, this.lineWidth = null, this.size = null, this.color = null, this.shadow = null
                },
                F = function() {
                    this.color = null, this.seriesColors = null, this.lineWidth = null, this.shadow = null, this.barPadding = null, this.barMargin = null, this.barWidth = null, this.highlightColors = null
                },
                z = function() {
                    this.seriesColors = null, this.padding = null, this.sliceMargin = null, this.fill = null, this.shadow = null, this.startAngle = null, this.lineWidth = null, this.highlightColors = null
                },
                W = function() {
                    this.seriesColors = null, this.padding = null, this.sliceMargin = null, this.fill = null, this.shadow = null, this.startAngle = null, this.lineWidth = null, this.innerDiameter = null, this.thickness = null, this.ringMargin = null, this.highlightColors = null
                },
                Y = function() {
                    this.color = null, this.lineWidth = null, this.shadow = null, this.padding = null, this.sectionMargin = null, this.seriesColors = null, this.highlightColors = null
                },
                B = function() {
                    this.padding = null, this.backgroundColor = null, this.ringColor = null, this.tickColor = null, this.ringWidth = null, this.intervalColors = null, this.intervalInnerRadius = null, this.intervalOuterRadius = null, this.hubRadius = null, this.needleThickness = null, this.needlePad = null
                };
            t.fn.jqplotChildText = function() {
                return t(this).contents().filter(function() {
                    return 3 == this.nodeType
                }).text()
            }, t.fn.jqplotGetComputedFontStyle = function() {
                for (var e = window.getComputedStyle ? window.getComputedStyle(this[0], "") : this[0].currentStyle, t = e["font-style"] ? ["font-style", "font-weight", "font-size", "font-family"] : ["fontStyle", "fontWeight", "fontSize", "fontFamily"], r = [], n = 0; n < t.length; ++n) {
                    var i = String(e[t[n]]);
                    i && "normal" != i && r.push(i)
                }
                return r.join(" ")
            }, t.fn.jqplotToImageCanvas = function(e) {
                function r(e) {
                    var r = parseInt(t(e).css("line-height"), 10);
                    return isNaN(r) && (r = 1.2 * parseInt(t(e).css("font-size"), 10)), r
                }

                function n(e, n, i, s, o, a) {
                    for (var l = r(e), c = t(e).innerWidth(), u = (t(e).innerHeight(), i.split(/\s+/)), h = u.length, p = "", d = [], f = o, m = s, g = 0; h > g; g++) p += u[g], n.measureText(p).width > c && (d.push(g), p = "", g--);
                    if (0 === d.length) "center" === t(e).css("textAlign") && (m = s + (a - n.measureText(p).width) / 2 - y), n.fillText(i, m, o);
                    else {
                        p = u.slice(0, d[0]).join(" "), "center" === t(e).css("textAlign") && (m = s + (a - n.measureText(p).width) / 2 - y), n.fillText(p, m, f), f += l;
                        for (var g = 1, v = d.length; v > g; g++) p = u.slice(d[g - 1], d[g]).join(" "), "center" === t(e).css("textAlign") && (m = s + (a - n.measureText(p).width) / 2 - y), n.fillText(p, m, f), f += l;
                        p = u.slice(d[g - 1], u.length).join(" "), "center" === t(e).css("textAlign") && (m = s + (a - n.measureText(p).width) / 2 - y), n.fillText(p, m, f)
                    }
                }

                function i(e, r, s) {
                    var o = e.tagName.toLowerCase(),
                        a = t(e).position(),
                        l = window.getComputedStyle ? window.getComputedStyle(e, "") : e.currentStyle,
                        c = r + a.left + parseInt(l.marginLeft, 10) + parseInt(l.borderLeftWidth, 10) + parseInt(l.paddingLeft, 10),
                        u = s + a.top + parseInt(l.marginTop, 10) + parseInt(l.borderTopWidth, 10) + parseInt(l.paddingTop, 10),
                        h = p.width;
                    if ("div" != o && "span" != o || t(e).hasClass("jqplot-highlighter-tooltip"))
                        if ("table" === o && t(e).hasClass("jqplot-table-legend")) {
                            x.strokeStyle = t(e).css("border-top-color"), x.fillStyle = t(e).css("background-color"), x.fillRect(c, u, t(e).innerWidth(), t(e).innerHeight()), parseInt(t(e).css("border-top-width"), 10) > 0 && x.strokeRect(c, u, t(e).innerWidth(), t(e).innerHeight()), t(e).find("div.jqplot-table-legend-swatch-outline").each(function() {
                                var e = t(this);
                                x.strokeStyle = e.css("border-top-color");
                                var r = c + e.position().left,
                                    n = u + e.position().top;
                                x.strokeRect(r, n, e.innerWidth(), e.innerHeight()), r += parseInt(e.css("padding-left"), 10), n += parseInt(e.css("padding-top"), 10);
                                var i = e.innerHeight() - 2 * parseInt(e.css("padding-top"), 10),
                                    s = e.innerWidth() - 2 * parseInt(e.css("padding-left"), 10),
                                    o = e.children("div.jqplot-table-legend-swatch");
                                x.fillStyle = o.css("background-color"), x.fillRect(r, n, s, i)
                            }), t(e).find("td.jqplot-table-legend-label").each(function() {
                                var e = t(this),
                                    r = c + e.position().left,
                                    i = u + e.position().top + parseInt(e.css("padding-top"), 10);
                                x.font = e.jqplotGetComputedFontStyle(), x.fillStyle = e.css("color"), n(e, x, e.text(), r, i, h)
                            })
                        } else "canvas" == o && x.drawImage(e, c, u);
                    else {
                        t(e).children().each(function() {
                            i(this, c, u)
                        });
                        var d = t(e).jqplotChildText();
                        d && (x.font = t(e).jqplotGetComputedFontStyle(), x.fillStyle = t(e).css("color"), n(e, x, d, c, u, h))
                    }
                }
                e = e || {};
                var s = null == e.x_offset ? 0 : e.x_offset,
                    o = null == e.y_offset ? 0 : e.y_offset,
                    a = null == e.backgroundColor ? "rgb(255,255,255)" : e.backgroundColor;
                if (0 == t(this).width() || 0 == t(this).height()) return null;
                if (t.jqplot.use_excanvas) return null;
                for (var l, c, u, h, p = document.createElement("canvas"), d = t(this).outerHeight(!0), f = t(this).outerWidth(!0), m = t(this).offset(), g = m.left, v = m.top, y = 0, b = 0, w = ["jqplot-table-legend", "jqplot-xaxis-tick", "jqplot-x2axis-tick", "jqplot-yaxis-tick", "jqplot-y2axis-tick", "jqplot-y3axis-tick", "jqplot-y4axis-tick", "jqplot-y5axis-tick", "jqplot-y6axis-tick", "jqplot-y7axis-tick", "jqplot-y8axis-tick", "jqplot-y9axis-tick", "jqplot-xaxis-label", "jqplot-x2axis-label", "jqplot-yaxis-label", "jqplot-y2axis-label", "jqplot-y3axis-label", "jqplot-y4axis-label", "jqplot-y5axis-label", "jqplot-y6axis-label", "jqplot-y7axis-label", "jqplot-y8axis-label", "jqplot-y9axis-label"], _ = 0; _ < w.length; _++) t(this).find("." + w[_]).each(function() {
                    l = t(this).offset().top - v, c = t(this).offset().left - g, h = c + t(this).outerWidth(!0) + y, u = l + t(this).outerHeight(!0) + b, -y > c && (f = f - y - c, y = -c), -b > l && (d = d - b - l, b = -l), h > f && (f = h), u > d && (d = u)
                });
                p.width = f + Number(s), p.height = d + Number(o);
                var x = p.getContext("2d");
                return x.save(), x.fillStyle = a, x.fillRect(0, 0, p.width, p.height), x.restore(), x.translate(y, b), x.textAlign = "left", x.textBaseline = "top", t(this).children().each(function() {
                    i(this, s, o)
                }), p
            }, t.fn.jqplotToImageStr = function(e) {
                var r = t(this).jqplotToImageCanvas(e);
                return r ? r.toDataURL("image/png") : null
            }, t.fn.jqplotToImageElem = function(e) {
                var r = document.createElement("img"),
                    n = t(this).jqplotToImageStr(e);
                return r.src = n, r
            }, t.fn.jqplotToImageElemStr = function(e) {
                var r = "<img src=" + t(this).jqplotToImageStr(e) + " />";
                return r
            }, t.fn.jqplotSaveImage = function() {
                var e = t(this).jqplotToImageStr({});
                e && (window.location.href = e.replace("image/png", "image/octet-stream"))
            }, t.fn.jqplotViewImage = function() {
                var e = t(this).jqplotToImageElemStr({});
                t(this).jqplotToImageStr({});
                if (e) {
                    var r = window.open("");
                    r.document.open("image/png"), r.document.write(e), r.document.close(), r = null
                }
            };
            var G = function() {
                switch (this.syntax = G.config.syntax, this._type = "jsDate", this.proxy = new Date, this.options = {}, this.locale = G.regional.getLocale(), this.formatString = "", this.defaultCentury = G.config.defaultCentury, arguments.length) {
                    case 0:
                        break;
                    case 1:
                        if ("[object Object]" == M(arguments[0]) && "jsDate" != arguments[0]._type) {
                            var e = this.options = arguments[0];
                            this.syntax = e.syntax || this.syntax, this.defaultCentury = e.defaultCentury || this.defaultCentury, this.proxy = G.createDate(e.date)
                        } else this.proxy = G.createDate(arguments[0]);
                        break;
                    default:
                        for (var t = [], r = 0; r < arguments.length; r++) t.push(arguments[r]);
                        this.proxy = new Date, this.proxy.setFullYear.apply(this.proxy, t.slice(0, 3)), t.slice(3).length && this.proxy.setHours.apply(this.proxy, t.slice(3))
                }
            };
            G.config = {
                defaultLocale: "en",
                syntax: "perl",
                defaultCentury: 1900
            }, G.prototype.add = function(e, t) {
                var r = X[t] || X.day;
                return "number" == typeof r ? this.proxy.setTime(this.proxy.getTime() + r * e) : r.add(this, e), this
            }, G.prototype.clone = function() {
                return new G(this.proxy.getTime())
            }, G.prototype.getUtcOffset = function() {
                return 6e4 * this.proxy.getTimezoneOffset()
            }, G.prototype.diff = function(e, t, r) {
                if (e = new G(e), null === e) return null;
                var n = X[t] || X.day;
                if ("number" == typeof n) var i = (this.proxy.getTime() - e.proxy.getTime()) / n;
                else var i = n.diff(this.proxy, e.proxy);
                return r ? i : Math[i > 0 ? "floor" : "ceil"](i)
            }, G.prototype.getAbbrDayName = function() {
                return G.regional[this.locale].dayNamesShort[this.proxy.getDay()]
            }, G.prototype.getAbbrMonthName = function() {
                return G.regional[this.locale].monthNamesShort[this.proxy.getMonth()]
            }, G.prototype.getAMPM = function() {
                return this.proxy.getHours() >= 12 ? "PM" : "AM"
            }, G.prototype.getAmPm = function() {
                return this.proxy.getHours() >= 12 ? "pm" : "am"
            }, G.prototype.getCentury = function() {
                return parseInt(this.proxy.getFullYear() / 100, 10)
            }, G.prototype.getDate = function() {
                return this.proxy.getDate()
            }, G.prototype.getDay = function() {
                return this.proxy.getDay()
            }, G.prototype.getDayOfWeek = function() {
                var e = this.proxy.getDay();
                return 0 === e ? 7 : e
            }, G.prototype.getDayOfYear = function() {
                var e = this.proxy,
                    t = e - new Date("" + e.getFullYear() + "/1/1 GMT");
                return t += 6e4 * e.getTimezoneOffset(), e = null, parseInt(t / 6e4 / 60 / 24, 10) + 1
            }, G.prototype.getDayName = function() {
                return G.regional[this.locale].dayNames[this.proxy.getDay()]
            }, G.prototype.getFullWeekOfYear = function() {
                var e = this.proxy,
                    t = this.getDayOfYear(),
                    r = 6 - e.getDay(),
                    n = parseInt((t + r) / 7, 10);
                return n
            }, G.prototype.getFullYear = function() {
                return this.proxy.getFullYear()
            }, G.prototype.getGmtOffset = function() {
                var e = this.proxy.getTimezoneOffset() / 60,
                    t = 0 > e ? "+" : "-";
                return e = Math.abs(e), t + V(Math.floor(e), 2) + ":" + V(e % 1 * 60, 2)
            }, G.prototype.getHours = function() {
                return this.proxy.getHours()
            }, G.prototype.getHours12 = function() {
                var e = this.proxy.getHours();
                return e > 12 ? e - 12 : 0 == e ? 12 : e
            }, G.prototype.getIsoWeek = function() {
                var e = this.proxy,
                    t = this.getWeekOfYear(),
                    r = new Date("" + e.getFullYear() + "/1/1").getDay(),
                    n = t + (r > 4 || 1 >= r ? 0 : 1);
                return 53 == n && new Date("" + e.getFullYear() + "/12/31").getDay() < 4 ? n = 1 : 0 === n && (e = new G(new Date("" + (e.getFullYear() - 1) + "/12/31")), n = e.getIsoWeek()), e = null, n
            }, G.prototype.getMilliseconds = function() {
                return this.proxy.getMilliseconds()
            }, G.prototype.getMinutes = function() {
                return this.proxy.getMinutes()
            }, G.prototype.getMonth = function() {
                return this.proxy.getMonth()
            }, G.prototype.getMonthName = function() {
                return G.regional[this.locale].monthNames[this.proxy.getMonth()]
            }, G.prototype.getMonthNumber = function() {
                return this.proxy.getMonth() + 1
            }, G.prototype.getSeconds = function() {
                return this.proxy.getSeconds()
            }, G.prototype.getShortYear = function() {
                return this.proxy.getYear() % 100
            }, G.prototype.getTime = function() {
                return this.proxy.getTime()
            }, G.prototype.getTimezoneAbbr = function() {
                return this.proxy.toString().replace(/^.*\(([^)]+)\)$/, "$1")
            }, G.prototype.getTimezoneName = function() {
                var e = /(?:\((.+)\)$| ([A-Z]{3}) )/.exec(this.toString());
                return e[1] || e[2] || "GMT" + this.getGmtOffset()
            }, G.prototype.getTimezoneOffset = function() {
                return this.proxy.getTimezoneOffset()
            }, G.prototype.getWeekOfYear = function() {
                var e = this.getDayOfYear(),
                    t = 7 - this.getDayOfWeek(),
                    r = parseInt((e + t) / 7, 10);
                return r
            }, G.prototype.getUnix = function() {
                return Math.round(this.proxy.getTime() / 1e3, 0)
            }, G.prototype.getYear = function() {
                return this.proxy.getYear()
            }, G.prototype.next = function(e) {
                return e = e || "day", this.clone().add(1, e)
            }, G.prototype.set = function() {
                switch (arguments.length) {
                    case 0:
                        this.proxy = new Date;
                        break;
                    case 1:
                        if ("[object Object]" == M(arguments[0]) && "jsDate" != arguments[0]._type) {
                            var e = this.options = arguments[0];
                            this.syntax = e.syntax || this.syntax, this.defaultCentury = e.defaultCentury || this.defaultCentury, this.proxy = G.createDate(e.date)
                        } else this.proxy = G.createDate(arguments[0]);
                        break;
                    default:
                        for (var t = [], r = 0; r < arguments.length; r++) t.push(arguments[r]);
                        this.proxy = new Date, this.proxy.setFullYear.apply(this.proxy, t.slice(0, 3)), t.slice(3).length && this.proxy.setHours.apply(this.proxy, t.slice(3))
                }
                return this
            }, G.prototype.setDate = function(e) {
                return this.proxy.setDate(e), this
            }, G.prototype.setFullYear = function() {
                return this.proxy.setFullYear.apply(this.proxy, arguments), this
            }, G.prototype.setHours = function() {
                return this.proxy.setHours.apply(this.proxy, arguments), this
            }, G.prototype.setMilliseconds = function(e) {
                return this.proxy.setMilliseconds(e), this
            }, G.prototype.setMinutes = function() {
                return this.proxy.setMinutes.apply(this.proxy, arguments), this
            }, G.prototype.setMonth = function() {
                return this.proxy.setMonth.apply(this.proxy, arguments), this
            }, G.prototype.setSeconds = function() {
                return this.proxy.setSeconds.apply(this.proxy, arguments), this
            }, G.prototype.setTime = function(e) {
                return this.proxy.setTime(e), this
            }, G.prototype.setYear = function() {
                return this.proxy.setYear.apply(this.proxy, arguments), this
            }, G.prototype.strftime = function(e) {
                return e = e || this.formatString || G.regional[this.locale].formatString, G.strftime(this, e, this.syntax)
            }, G.prototype.toString = function() {
                return this.proxy.toString()
            }, G.prototype.toYmdInt = function() {
                return 1e4 * this.proxy.getFullYear() + 100 * this.getMonthNumber() + this.proxy.getDate()
            }, G.regional = {
                en: {
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                fr: {
                    monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                    monthNamesShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
                    dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                    dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                de: {
                    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                    monthNamesShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                    dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                    dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                es: {
                    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                    dayNames: ["Domingo", "Lunes", "Martes", "Mi&eacute;rcoles", "Jueves", "Viernes", "S&aacute;bado"],
                    dayNamesShort: ["Dom", "Lun", "Mar", "Mi&eacute;", "Juv", "Vie", "S&aacute;b"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                ru: {
                    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                    monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                    dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
                    dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                ar: {
                    monthNames: ["كانون الثاني", "شباط", "آذار", "نيسان", "آذار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
                    monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    dayNames: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
                    dayNamesShort: ["سبت", "أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                pt: {
                    monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    dayNames: ["Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&aacute;bado"],
                    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                "pt-BR": {
                    monthNames: ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    dayNames: ["Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&aacute;bado"],
                    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                pl: {
                    monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
                    monthNamesShort: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
                    dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
                    dayNamesShort: ["Ni", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                nl: {
                    monthNames: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "July", "Augustus", "September", "Oktober", "November", "December"],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
                    dayNames: ",".Zaterdag,
                    dayNamesShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                },
                sv: {
                    monthNames: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
                    monthNamesShort: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
                    dayNames: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"],
                    dayNamesShort: ["sön", "mån", "tis", "ons", "tor", "fre", "lör"],
                    formatString: "%Y-%m-%d %H:%M:%S"
                }
            }, G.regional["en-US"] = G.regional["en-GB"] = G.regional.en, G.regional.getLocale = function() {
                var e = G.config.defaultLocale;
                return document && document.getElementsByTagName("html") && document.getElementsByTagName("html")[0].lang && (e = document.getElementsByTagName("html")[0].lang, G.regional.hasOwnProperty(e) || (e = G.config.defaultLocale)), e
            };
            var U = 864e5,
                V = function(e, t) {
                    e = String(e);
                    var r = t - e.length,
                        n = String(Math.pow(10, r)).slice(1);
                    return n.concat(e)
                },
                X = {
                    millisecond: 1,
                    second: 1e3,
                    minute: 6e4,
                    hour: 36e5,
                    day: U,
                    week: 7 * U,
                    month: {
                        add: function(e, t) {
                            X.year.add(e, Math[t > 0 ? "floor" : "ceil"](t / 12));
                            var r = e.getMonth() + t % 12;
                            12 == r ? (r = 0, e.setYear(e.getFullYear() + 1)) : -1 == r && (r = 11, e.setYear(e.getFullYear() - 1)), e.setMonth(r)
                        },
                        diff: function(e, t) {
                            var r = e.getFullYear() - t.getFullYear(),
                                n = e.getMonth() - t.getMonth() + 12 * r,
                                i = e.getDate() - t.getDate();
                            return n + i / 30
                        }
                    },
                    year: {
                        add: function(e, t) {
                            e.setYear(e.getFullYear() + Math[t > 0 ? "floor" : "ceil"](t))
                        },
                        diff: function(e, t) {
                            return X.month.diff(e, t) / 12
                        }
                    }
                };
            for (var K in X) "s" != K.substring(K.length - 1) && (X[K + "s"] = X[K]);
            var Z = function(e, t, r) {
                if (G.formats[r].shortcuts[t]) return G.strftime(e, G.formats[r].shortcuts[t], r);
                var n = (G.formats[r].codes[t] || "").split("."),
                    i = e["get" + n[0]] ? e["get" + n[0]]() : "";
                return n[1] && (i = V(i, n[1])), i
            };
            G.strftime = function(e, t, r, n) {
                var i = "perl",
                    s = G.regional.getLocale();
                r && G.formats.hasOwnProperty(r) ? i = r : r && G.regional.hasOwnProperty(r) && (s = r), n && G.formats.hasOwnProperty(n) ? i = n : n && G.regional.hasOwnProperty(n) && (s = n), ("[object Object]" != M(e) || "jsDate" != e._type) && (e = new G(e), e.locale = s), t || (t = e.formatString || G.regional[s].formatString);
                for (var o, a = t || "%Y-%m-%d", l = ""; a.length > 0;)(o = a.match(G.formats[i].codes.matcher)) ? (l += a.slice(0, o.index), l += (o[1] || "") + Z(e, o[2], i), a = a.slice(o.index + o[0].length)) : (l += a, a = "");
                return l
            }, G.formats = {
                ISO: "%Y-%m-%dT%H:%M:%S.%N%G",
                SQL: "%Y-%m-%d %H:%M:%S"
            }, G.formats.perl = {
                codes: {
                    matcher: /()%(#?(%|[a-z]))/i,
                    Y: "FullYear",
                    y: "ShortYear.2",
                    m: "MonthNumber.2",
                    "#m": "MonthNumber",
                    B: "MonthName",
                    b: "AbbrMonthName",
                    d: "Date.2",
                    "#d": "Date",
                    e: "Date",
                    A: "DayName",
                    a: "AbbrDayName",
                    w: "Day",
                    H: "Hours.2",
                    "#H": "Hours",
                    I: "Hours12.2",
                    "#I": "Hours12",
                    p: "AMPM",
                    M: "Minutes.2",
                    "#M": "Minutes",
                    S: "Seconds.2",
                    "#S": "Seconds",
                    s: "Unix",
                    N: "Milliseconds.3",
                    "#N": "Milliseconds",
                    O: "TimezoneOffset",
                    Z: "TimezoneName",
                    G: "GmtOffset"
                },
                shortcuts: {
                    F: "%Y-%m-%d",
                    T: "%H:%M:%S",
                    X: "%H:%M:%S",
                    x: "%m/%d/%y",
                    D: "%m/%d/%y",
                    "#c": "%a %b %e %H:%M:%S %Y",
                    v: "%e-%b-%Y",
                    R: "%H:%M",
                    r: "%I:%M:%S %p",
                    t: "	",
                    n: "\n",
                    "%": "%"
                }
            }, G.formats.php = {
                codes: {
                    matcher: /()%((%|[a-z]))/i,
                    a: "AbbrDayName",
                    A: "DayName",
                    d: "Date.2",
                    e: "Date",
                    j: "DayOfYear.3",
                    u: "DayOfWeek",
                    w: "Day",
                    U: "FullWeekOfYear.2",
                    V: "IsoWeek.2",
                    W: "WeekOfYear.2",
                    b: "AbbrMonthName",
                    B: "MonthName",
                    m: "MonthNumber.2",
                    h: "AbbrMonthName",
                    C: "Century.2",
                    y: "ShortYear.2",
                    Y: "FullYear",
                    H: "Hours.2",
                    I: "Hours12.2",
                    l: "Hours12",
                    p: "AMPM",
                    P: "AmPm",
                    M: "Minutes.2",
                    S: "Seconds.2",
                    s: "Unix",
                    O: "TimezoneOffset",
                    z: "GmtOffset",
                    Z: "TimezoneAbbr"
                },
                shortcuts: {
                    D: "%m/%d/%y",
                    F: "%Y-%m-%d",
                    T: "%H:%M:%S",
                    X: "%H:%M:%S",
                    x: "%m/%d/%y",
                    R: "%H:%M",
                    r: "%I:%M:%S %p",
                    t: "	",
                    n: "\n",
                    "%": "%"
                }
            }, G.createDate = function(e) {
                function t(e, t) {
                    var r, n, i, s, o = parseFloat(t[1]),
                        a = parseFloat(t[2]),
                        l = parseFloat(t[3]),
                        c = G.config.defaultCentury;
                    return o > 31 ? (n = l, i = a, r = c + o) : (n = a, i = o, r = c + l), s = i + "/" + n + "/" + r, e.replace(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})/, s)
                }
                if (null == e) return new Date;
                if (e instanceof Date) return e;
                if ("number" == typeof e) return new Date(e);
                var r = String(e).replace(/^\s*(.+)\s*$/g, "$1");
                r = r.replace(/^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,4})/, "$1/$2/$3"), r = r.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{4})/i, "$1 $2 $3");
                var n = r.match(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i);
                if (n && n.length > 3) {
                    var i = parseFloat(n[3]),
                        s = G.config.defaultCentury + i;
                    s = String(s), r = r.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i, n[1] + " " + n[2] + " " + s)
                }
                n = r.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})[^0-9]/), n && n.length > 3 && (r = t(r, n));
                var n = r.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})$/);
                n && n.length > 3 && (r = t(r, n));
                for (var o, a, l, c = 0, u = G.matchers.length, h = r; u > c;) {
                    if (a = Date.parse(h), !isNaN(a)) return new Date(a);
                    if (o = G.matchers[c], "function" == typeof o) {
                        if (l = o.call(G, h), l instanceof Date) return l
                    } else h = r.replace(o[0], o[1]);
                    c++
                }
                return NaN
            }, G.daysInMonth = function(e, t) {
                return 2 == t ? 29 == new Date(e, 1, 29).getDate() ? 29 : 28 : [P, 31, P, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
            }, G.matchers = [
                [/(3[01]|[0-2]\d)\s*\.\s*(1[0-2]|0\d)\s*\.\s*([1-9]\d{3})/, "$2/$1/$3"],
                [/([1-9]\d{3})\s*-\s*(1[0-2]|0\d)\s*-\s*(3[01]|[0-2]\d)/, "$2/$3/$1"],
                function(e) {
                    var t = e.match(/^(?:(.+)\s+)?([012]?\d)(?:\s*\:\s*(\d\d))?(?:\s*\:\s*(\d\d(\.\d*)?))?\s*(am|pm)?\s*$/i);
                    if (t) {
                        if (t[1]) {
                            var r = this.createDate(t[1]);
                            if (isNaN(r)) return
                        } else {
                            var r = new Date;
                            r.setMilliseconds(0)
                        }
                        var n = parseFloat(t[2]);
                        return t[6] && (n = "am" == t[6].toLowerCase() ? 12 == n ? 0 : n : 12 == n ? 12 : n + 12), r.setHours(n, parseInt(t[3] || 0, 10), parseInt(t[4] || 0, 10), 1e3 * (parseFloat(t[5] || 0) || 0)), r
                    }
                    return e
                },
                function(e) {
                    var t = e.match(/^(?:(.+))[T|\s+]([012]\d)(?:\:(\d\d))(?:\:(\d\d))(?:\.\d+)([\+\-]\d\d\:\d\d)$/i);
                    if (t) {
                        if (t[1]) {
                            var r = this.createDate(t[1]);
                            if (isNaN(r)) return
                        } else {
                            var r = new Date;
                            r.setMilliseconds(0)
                        }
                        var n = parseFloat(t[2]);
                        return r.setHours(n, parseInt(t[3], 10), parseInt(t[4], 10), 1e3 * parseFloat(t[5])), r
                    }
                    return e
                },
                function(e) {
                    var t = e.match(/^([0-3]?\d)\s*[-\/.\s]{1}\s*([a-zA-Z]{3,9})\s*[-\/.\s]{1}\s*([0-3]?\d)$/);
                    if (t) {
                        var r, n, i, s = new Date,
                            o = G.config.defaultCentury,
                            a = parseFloat(t[1]),
                            l = parseFloat(t[3]);
                        a > 31 ? (n = l, r = o + a) : (n = a, r = o + l);
                        var i = O(t[2], G.regional[G.regional.getLocale()].monthNamesShort);
                        return -1 == i && (i = O(t[2], G.regional[G.regional.getLocale()].monthNames)), s.setFullYear(r, i, n), s.setHours(0, 0, 0, 0), s
                    }
                    return e
                }
            ], t.jsDate = G, t.jqplot.sprintf = function() {
                function e(e, t, r, n) {
                    var i = e.length >= t ? "" : Array(1 + t - e.length >>> 0).join(r);
                    return n ? e + i : i + e
                }

                function r(e) {
                    for (var r = new String(e), n = 10; n > 0 && r != (r = r.replace(/^(\d+)(\d{3})/, "$1" + t.jqplot.sprintf.thousandsSeparator + "$2")); n--);
                    return r
                }

                function n(t, r, n, i, s, o) {
                    var a = i - t.length;
                    if (a > 0) {
                        var l = " ";
                        o && (l = "&nbsp;"), t = n || !s ? e(t, i, l, n) : t.slice(0, r.length) + e("", a, "0", !0) + t.slice(r.length)
                    }
                    return t
                }

                function i(t, r, i, s, o, a, l, c) {
                    var u = t >>> 0;
                    return i = i && u && {
                        2: "0b",
                        8: "0",
                        16: "0x"
                    }[r] || "", t = i + e(u.toString(r), a || 0, "0", !1), n(t, i, s, o, l, c)
                }

                function s(e, t, r, i, s, o) {
                    return null != i && (e = e.slice(0, i)), n(e, "", t, r, s, o)
                }
                var o = arguments,
                    a = 0,
                    l = o[a++];
                return l.replace(t.jqplot.sprintf.regex, function(l, c, u, h, p, d, f) {
                    if ("%" == l) return "%";
                    for (var m = !1, g = "", v = !1, y = !1, b = !1, w = !1, _ = 0; u && _ < u.length; _++) switch (u.charAt(_)) {
                        case " ":
                            g = " ";
                            break;
                        case "+":
                            g = "+";
                            break;
                        case "-":
                            m = !0;
                            break;
                        case "0":
                            v = !0;
                            break;
                        case "#":
                            y = !0;
                            break;
                        case "&":
                            b = !0;
                            break;
                        case "'":
                            w = !0
                    }
                    if (h = h ? "*" == h ? +o[a++] : "*" == h.charAt(0) ? +o[h.slice(1, -1)] : +h : 0, 0 > h && (h = -h, m = !0), !isFinite(h)) throw new Error("$.jqplot.sprintf: (minimum-)width must be finite");
                    d = d ? "*" == d ? +o[a++] : "*" == d.charAt(0) ? +o[d.slice(1, -1)] : +d : "fFeE".indexOf(f) > -1 ? 6 : "d" == f ? 0 : void 0;
                    var x = c ? o[c.slice(0, -1)] : o[a++];
                    switch (f) {
                        case "s":
                            return null == x ? "" : s(String(x), m, h, d, v, b);
                        case "c":
                            return s(String.fromCharCode(+x), m, h, d, v, b);
                        case "b":
                            return i(x, 2, y, m, h, d, v, b);
                        case "o":
                            return i(x, 8, y, m, h, d, v, b);
                        case "x":
                            return i(x, 16, y, m, h, d, v, b);
                        case "X":
                            return i(x, 16, y, m, h, d, v, b).toUpperCase();
                        case "u":
                            return i(x, 10, y, m, h, d, v, b);
                        case "i":
                            var k = parseInt(+x, 10);
                            if (isNaN(k)) return "";
                            var C = 0 > k ? "-" : g,
                                S = w ? r(String(Math.abs(k))) : String(Math.abs(k));
                            return x = C + e(S, d, "0", !1), n(x, C, m, h, v, b);
                        case "d":
                            var k = Math.round(+x);
                            if (isNaN(k)) return "";
                            var C = 0 > k ? "-" : g,
                                S = w ? r(String(Math.abs(k))) : String(Math.abs(k));
                            return x = C + e(S, d, "0", !1), n(x, C, m, h, v, b);
                        case "e":
                        case "E":
                        case "f":
                        case "F":
                        case "g":
                        case "G":
                            var k = +x;
                            if (isNaN(k)) return "";
                            var C = 0 > k ? "-" : g,
                                E = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(f.toLowerCase())],
                                D = ["toString", "toUpperCase"]["eEfFgG".indexOf(f) % 2],
                                S = Math.abs(k)[E](d),
                                T = S.toString().split(".");
                            T[0] = w ? r(T[0]) : T[0], S = T.join(t.jqplot.sprintf.decimalMark), x = C + S;
                            var O = n(x, C, m, h, v, b)[D]();
                            return O;
                        case "p":
                        case "P":
                            var k = +x;
                            if (isNaN(k)) return "";
                            var C = 0 > k ? "-" : g,
                                T = String(Number(Math.abs(k)).toExponential()).split(/e|E/),
                                M = -1 != T[0].indexOf(".") ? T[0].length - 1 : String(k).length,
                                N = T[1] < 0 ? -T[1] - 1 : 0;
                            if (Math.abs(k) < 1) x = d >= M + N ? C + Math.abs(k).toPrecision(M) : d - 1 >= M ? C + Math.abs(k).toExponential(M - 1) : C + Math.abs(k).toExponential(d - 1);
                            else {
                                var P = d >= M ? M : d;
                                x = C + Math.abs(k).toPrecision(P)
                            }
                            var D = ["toString", "toUpperCase"]["pP".indexOf(f) % 2];
                            return n(x, C, m, h, v, b)[D]();
                        case "n":
                            return "";
                        default:
                            return l
                    }
                })
            }, t.jqplot.sprintf.thousandsSeparator = ",", t.jqplot.sprintf.decimalMark = ".", t.jqplot.sprintf.regex = /%|%(\d+\$)?([-+#0&\' ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([nAscboxXuidfegpEGP])/g, t.jqplot.getSignificantFigures = function(e) {
                var t = String(Number(Math.abs(e)).toExponential()).split(/e|E/),
                    r = -1 != t[0].indexOf(".") ? t[0].length - 1 : t[0].length,
                    n = t[1] < 0 ? -t[1] - 1 : 0,
                    i = parseInt(t[1], 10),
                    s = i + 1 > 0 ? i + 1 : 0,
                    o = s >= r ? 0 : r - i - 1;
                return {
                    significantDigits: r,
                    digitsLeft: s,
                    digitsRight: o,
                    zeros: n,
                    exponent: i
                }
            }, t.jqplot.getPrecision = function(e) {
                return t.jqplot.getSignificantFigures(e).digitsRight
            };
            var $ = t.uiBackCompat !== !1;
            t.jqplot.effects = {
                effect: {}
            };
            var Q = "jqplot.storage.";
            t.extend(t.jqplot.effects, {
                version: "1.9pre",
                save: function(e, t) {
                    for (var r = 0; r < t.length; r++) null !== t[r] && e.data(Q + t[r], e[0].style[t[r]])
                },
                restore: function(e, t) {
                    for (var r = 0; r < t.length; r++) null !== t[r] && e.css(t[r], e.data(Q + t[r]))
                },
                setMode: function(e, t) {
                    return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
                },
                createWrapper: function(e) {
                    if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                    var r = {
                            width: e.outerWidth(!0),
                            height: e.outerHeight(!0),
                            "float": e.css("float")
                        },
                        n = t("<div></div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                        i = {
                            width: e.width(),
                            height: e.height()
                        },
                        s = document.activeElement;
                    return e.wrap(n), (e[0] === s || t.contains(e[0], s)) && t(s).focus(), n = e.parent(), "static" === e.css("position") ? (n.css({
                        position: "relative"
                    }), e.css({
                        position: "relative"
                    })) : (t.extend(r, {
                        position: e.css("position"),
                        zIndex: e.css("z-index")
                    }), t.each(["top", "left", "bottom", "right"], function(t, n) {
                        r[n] = e.css(n), isNaN(parseInt(r[n], 10)) && (r[n] = "auto")
                    }), e.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })), e.css(i), n.css(r).show()
                },
                removeWrapper: function(e) {
                    var r = document.activeElement;
                    return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === r || t.contains(e[0], r)) && t(r).focus()), e
                }
            }), t.fn.extend({
                jqplotEffect: function(e, r, n, i) {
                    function s(e) {
                        function r() {
                            t.isFunction(i) && i.call(n[0]), t.isFunction(e) && e()
                        }
                        var n = t(this),
                            i = o.complete,
                            s = o.mode;
                        (n.is(":hidden") ? "hide" === s : "show" === s) ? r(): c.call(n[0], o, r)
                    }
                    var o = N.apply(this, arguments),
                        a = o.mode,
                        l = o.queue,
                        c = t.jqplot.effects.effect[o.effect],
                        u = !c && $ && t.jqplot.effects[o.effect];
                    return t.fx.off || !c && !u ? a ? this[a](o.duration, o.complete) : this.each(function() {
                        o.complete && o.complete.call(this)
                    }) : c ? l === !1 ? this.each(s) : this.queue(l || "fx", s) : u.call(this, {
                        options: o,
                        duration: o.duration,
                        callback: o.complete,
                        mode: o.mode
                    })
                }
            });
            var J = /up|down|vertical/,
                ee = /up|left|vertical|horizontal/;
            t.jqplot.effects.effect.blind = function(e, r) {
                var n, i, s, o = t(this),
                    a = ["position", "top", "bottom", "left", "right", "height", "width"],
                    l = t.jqplot.effects.setMode(o, e.mode || "hide"),
                    c = e.direction || "up",
                    u = J.test(c),
                    h = u ? "height" : "width",
                    p = u ? "top" : "left",
                    d = ee.test(c),
                    f = {},
                    m = "show" === l;
                o.parent().is(".ui-effects-wrapper") ? t.jqplot.effects.save(o.parent(), a) : t.jqplot.effects.save(o, a), o.show(), s = parseInt(o.css("top"), 10), n = t.jqplot.effects.createWrapper(o).css({
                    overflow: "hidden"
                }), i = u ? n[h]() + s : n[h](), f[h] = m ? String(i) : "0", d || (o.css(u ? "bottom" : "right", 0).css(u ? "top" : "left", "").css({
                    position: "absolute"
                }), f[p] = m ? "0" : String(i)), m && (n.css(h, 0), d || n.css(p, i)), n.animate(f, {
                    duration: e.duration,
                    easing: e.easing,
                    queue: !1,
                    complete: function() {
                        "hide" === l && o.hide(), t.jqplot.effects.restore(o, a), t.jqplot.effects.removeWrapper(o), r()
                    }
                })
            }
        }(e)
    }).call(t, r(28))
}, function(e, t, r) {
    (function(e) {
        ! function(e) {
            e.jqplot.OHLCRenderer = function() {
                e.jqplot.LineRenderer.call(this), this.candleStick = !1, this.tickLength = "auto", this.bodyWidth = "auto", this.barColor = null, this.wickColor = null, this.fillUpBody = !1, this.fillDownBody = !0, this.upBodyColor = null, this.downBodyColor = null, this.lineWidth = 1, this._tickLength, this._bodyWidth
            }, e.jqplot.OHLCRenderer.prototype = new e.jqplot.LineRenderer, e.jqplot.OHLCRenderer.prototype.constructor = e.jqplot.OHLCRenderer, e.jqplot.OHLCRenderer.prototype.init = function(t) {
                t = t || {}, this.lineWidth = t.lineWidth || 1.5, e.jqplot.LineRenderer.prototype.init.call(this, t), this._type = "ohlc";
                var r = this._yaxis._dataBounds,
                    n = this._plotData;
                if (n[0].length < 5) throw new Error("蜡烛图数据格式: [x, open, high, low, close]");
                for (var i = 0; i < n.length; i++)(n[i][3] < r.min || null == r.min) && (r.min = n[i][3]), (n[i][2] > r.max || null == r.max) && (r.max = n[i][2])
            }, e.jqplot.OHLCRenderer.prototype.draw = function(e, t, r) {
                var n, i, s, o, a, l = this._xaxis.min,
                    c = this._xaxis.max,
                    u = this._xaxis.series_u2p,
                    h = this._yaxis.series_u2p,
                    p = this.renderer,
                    d = void 0 != r ? r : {};
                d.data && (this.data = d.data), t && (this.gridData = t);
                var f = this.data,
                    m = 0,
                    g = f.length;
                void 0 != d.shadow ? d.shadow : this.shadow, void 0 != d.fill ? d.fill : this.fill, void 0 != d.fillAndStroke ? d.fillAndStroke : this.fillAndStroke;
                if (p.bodyWidth = void 0 != d.bodyWidth ? d.bodyWidth : p.bodyWidth, p.tickLength = void 0 != d.tickLength ? d.tickLength : p.tickLength, e.save(), this.show) {
                    for (var v, y, b, w, _, n = 0; n < f.length; n++) f[n][0] < l ? m = n : f[n][0] < c && (g = n + 1);
                    var x = this.gridData[g - 1][0] - this.gridData[m][0],
                        k = g - m;
                    try {
                        var C = Math.abs(this._xaxis.series_u2p(parseInt(this._xaxis._intervalStats[0].sortedIntervals[0].interval, 10)) - this._xaxis.series_u2p(0))
                    } catch (S) {
                        var C = x / k
                    }
                    p.candleStick ? "number" == typeof p.bodyWidth ? p._bodyWidth = p.bodyWidth : p._bodyWidth = Math.min(20, C / 1.65) : "number" == typeof p.tickLength ? p._tickLength = p.tickLength : p._tickLength = Math.min(10, C / 3.5);
                    for (var n = m; g > n; n++) v = u(f[n][0]), y = h(f[n][1]), b = h(f[n][2]), w = h(f[n][3]), _ = h(f[n][4]), p.candleStick ? (o = p._bodyWidth, a = v - o / 2, y > _ ? (e.beginPath(), e.strokeStyle = p.wickColor || d.color, e.moveTo(v, b), e.lineTo(v, _), e.moveTo(v, y), e.lineTo(v, w), e.stroke(), i = _, s = y - _, p.fillUpBody || (o -= this.lineWidth, a = v - o / 2), p.upBodyColor ? (e.fillStyle = p.upBodyColor, e.fillRect(a, i, o, s)) : e.strokeRect(a, i, o, s)) : _ > y ? (e.beginPath(), e.strokeStyle = p.wickColor || d.color, e.moveTo(v, b), e.lineTo(v, y), e.moveTo(v, _), e.lineTo(v, w), e.stroke(), i = y, s = _ - y, p.fillDownBody || (o -= this.lineWidth, a = v - o / 2), p.downBodyColor ? (e.fillStyle = p.downBodyColor, e.fillRect(a, i, o, s)) : e.strokeRect(a, i, o, s)) : (e.beginPath(), e.strokeStyle = p.wickColor || d.color, e.moveTo(v, b), e.lineTo(v, w), e.moveTo(v - o / 2, y), e.lineTo(v + o / 2, _), e.stroke())) : (e.beginPath(), e.strokeStyle = p.barColor || d.color, e.moveTo(v - p._tickLength, y), e.lineTo(v, y), e.moveTo(v, b), e.lineTo(v, w), e.moveTo(v, _), e.lineTo(v + p._tickLength, _), e.stroke())
                }
                e.restore()
            }, e.jqplot.OHLCRenderer.prototype.drawShadow = function(e, t, r) {}, e.jqplot.OHLCRenderer.checkOptions = function(e, t, r) {
                r.highlighter || (r.highlighter = {
                    showMarker: !1,
                    tooltipAxes: "y",
                    yvalues: 4,
                    formatString: '<table class="jqplot-highlighter"><tr><td>date:</td><td>%s</td></tr><tr><td>open:</td><td>%s</td></tr><tr><td>hi:</td><td>%s</td></tr><tr><td>low:</td><td>%s</td></tr><tr><td>close:</td><td>%s</td></tr></table>'
                })
            }
        }(e)
    }).call(t, r(28))
}, function(e, t, r) {
    (function(e) {
        ! function(e) {
            function t(t, r, n) {
                var s = n.plugins.cursor,
                    o = "";
                if ("function" == typeof s.tooltipContent) return o = s.tooltipContent.apply(s, arguments), s._tooltipElem.html(o);
                var a = !1;
                if (s.showTooltipGridPosition && (o = t.x + ", " + t.y, a = !0), s.showTooltipUnitPosition)
                    for (var l, c = 0; c < s.tooltipAxisGroups.length; c++) {
                        if (l = s.tooltipAxisGroups[c], a && (o += "<br />"), s.useAxesFormatters)
                            for (var u = 0; u < l.length; u++) {
                                u && (o += ", ");
                                var h = n.axes[l[u]]._ticks[0].formatter,
                                    p = n.axes[l[u]]._ticks[0].formatString;
                                o += h(p, r[l[u]])
                            } else o += e.jqplot.sprintf(s.tooltipFormatString, r[l[0]], r[l[1]]);
                        a = !0
                    }
                if (s.showTooltipDataPosition)
                    for (var d = n.series, f = i(n, t.x, t.y), a = !1, c = 0; c < d.length; c++)
                        if (d[c].show) {
                            var m = d[c].index,
                                g = d[c].label.toString(),
                                v = e.inArray(m, f.indices),
                                y = void 0,
                                b = void 0;
                            if (-1 != v) {
                                var w = f.data[v].data;
                                if (s.useAxesFormatters) {
                                    var _ = d[c]._xaxis._ticks[0].formatter,
                                        x = d[c]._yaxis._ticks[0].formatter,
                                        k = d[c]._xaxis._ticks[0].formatString,
                                        C = d[c]._yaxis._ticks[0].formatString;
                                    y = _(k, w[0]), b = x(C, w[1])
                                } else y = w[0], b = w[1];
                                a && (o += "<br />"), o += e.jqplot.sprintf(s.tooltipFormatString, g, y, b), a = !0
                            }
                        }
                s._tooltipElem.html(o)
            }

            function r(t, r, s) {
                var o = s.plugins.cursor,
                    a = o.cursorCanvas._ctx;
                a.clearRect(0, 0, a.canvas.width, a.canvas.height), o.showVerticalLine && o.shapeRenderer.draw(a, [
                    [t.x, 0],
                    [t.x, a.canvas.height]
                ]), o.showHorizontalLine && o.shapeRenderer.draw(a, [
                    [0, t.y],
                    [a.canvas.width, t.y]
                ]);
                var l = i(s, t.x, t.y);
                if (o.showCursorLegend)
                    for (var c = e(s.targetId + " td.jqplot-cursor-legend-label"), u = 0; u < c.length; u++) {
                        var h = e(c[u]).data("seriesIndex"),
                            p = s.series[h],
                            d = p.label.toString(),
                            f = e.inArray(h, l.indices),
                            m = void 0,
                            g = void 0;
                        if (-1 != f) {
                            var v = l.data[f].data;
                            if (o.useAxesFormatters) {
                                var y = p._xaxis._ticks[0].formatter,
                                    b = p._yaxis._ticks[0].formatter,
                                    w = p._xaxis._ticks[0].formatString,
                                    _ = p._yaxis._ticks[0].formatString;
                                m = y(w, v[0]), g = b(_, v[1])
                            } else m = v[0], g = v[1]
                        }
                        s.legend.escapeHtml ? e(c[u]).text(e.jqplot.sprintf(o.cursorLegendFormatString, d, m, g)) : e(c[u]).html(e.jqplot.sprintf(o.cursorLegendFormatString, d, m, g))
                    }
                n(t, r, s), a = null
            }

            function n(e, t, r) {
                var n = r.plugins.cursor;
                if (n.showHorizontalLine) {
                    for (var i = n._horizontalEles, s = "", o = 0; o < n.tooltipAxisGroups.length; o++) {
                        g = n.tooltipAxisGroups[o];
                        for (var a = 0; a < g.length; a++)
                            if (0 === g[a].indexOf("y")) {
                                var l = r.axes[g[a]]._ticks[0].formatter,
                                    c = r.axes[g[a]]._ticks[0].formatString;
                                s += l(c, t[g[a]])
                            }
                    }
                    if (s) {
                        i.html(s);
                        var u = e.y + r._gridPadding.top;
                        i.css("top", u), i.show()
                    } else i.hide();
                    s = null, i = null
                }
                if (n.showVerticalLine) {
                    for (var h = n._verticalElem, s = "", o = 0; o < n.tooltipAxisGroups.length; o++) {
                        g = n.tooltipAxisGroups[o];
                        for (var a = 0; a < g.length; a++)
                            if (0 === g[a].indexOf("x")) {
                                var l = r.axes[g[a]]._ticks[0].formatter,
                                    c = r.axes[g[a]]._ticks[0].formatString;
                                s += l(c, t[g[a]])
                            }
                    }
                    if (s) {
                        h.html(s), h.show();
                        var p = e.x + r._gridPadding.left;
                        h.css("left", p)
                    } else h.hide();
                    s = null, h = null
                }
            }

            function i(e, t, r) {
                for (var n, i, s, o, a, l, c = {
                        indices: [],
                        data: []
                    }, u = e.plugins.cursor, i = 0; i < e.series.length; i++)
                    if (n = e.series[i], o = n.renderer, n.show) {
                        l = u.intersectionThreshold, n.showMarker && (l += n.markerRenderer.size / 2);
                        for (var s = 0; s < n.gridData.length; s++) a = n.gridData[s], u.showVerticalLine && Math.abs(t - a[0]) <= l && (c.indices.push(i), c.data.push({
                            seriesIndex: i,
                            pointIndex: s,
                            gridData: a,
                            data: n.data[s]
                        }))
                    }
                return c
            }

            function s(e, t) {
                var r = t.plugins.cursor,
                    n = r._tooltipElem;
                switch (r.tooltipLocation) {
                    case "nw":
                        var i = e.x + t._gridPadding.left - n.outerWidth(!0) - r.tooltipOffset,
                            s = e.y + t._gridPadding.top - r.tooltipOffset - n.outerHeight(!0);
                        break;
                    case "n":
                        var i = e.x + t._gridPadding.left - n.outerWidth(!0) / 2,
                            s = e.y + t._gridPadding.top - r.tooltipOffset - n.outerHeight(!0);
                        break;
                    case "ne":
                        var i = e.x + t._gridPadding.left + r.tooltipOffset,
                            s = e.y + t._gridPadding.top - r.tooltipOffset - n.outerHeight(!0);
                        break;
                    case "e":
                        var i = e.x + t._gridPadding.left + r.tooltipOffset,
                            s = e.y + t._gridPadding.top - n.outerHeight(!0) / 2;
                        break;
                    case "se":
                        var i = e.x + t._gridPadding.left + r.tooltipOffset,
                            s = e.y + t._gridPadding.top + r.tooltipOffset;
                        break;
                    case "s":
                        var i = e.x + t._gridPadding.left - n.outerWidth(!0) / 2,
                            s = e.y + t._gridPadding.top + r.tooltipOffset;
                        break;
                    case "sw":
                        var i = e.x + t._gridPadding.left - n.outerWidth(!0) - r.tooltipOffset,
                            s = e.y + t._gridPadding.top + r.tooltipOffset;
                        break;
                    case "w":
                        var i = e.x + t._gridPadding.left - n.outerWidth(!0) - r.tooltipOffset,
                            s = e.y + t._gridPadding.top - n.outerHeight(!0) / 2;
                        break;
                    default:
                        var i = e.x + t._gridPadding.left + r.tooltipOffset,
                            s = e.y + t._gridPadding.top + r.tooltipOffset
                }
                n.css("left", i), n.css("top", s), n = null
            }

            function o(e) {
                var t = e._gridPadding,
                    r = e.plugins.cursor,
                    n = r._tooltipElem;
                switch (r.tooltipLocation) {
                    case "nw":
                        var i = t.left + r.tooltipOffset,
                            s = t.top + r.tooltipOffset;
                        n.css("left", i), n.css("top", s);
                        break;
                    case "n":
                        var i = (t.left + (e._plotDimensions.width - t.right)) / 2 - n.outerWidth(!0) / 2,
                            s = t.top + r.tooltipOffset;
                        n.css("left", i), n.css("top", s);
                        break;
                    case "ne":
                        var i = t.right + r.tooltipOffset,
                            s = t.top + r.tooltipOffset;
                        n.css({
                            right: i,
                            top: s
                        });
                        break;
                    case "e":
                        var i = t.right + r.tooltipOffset,
                            s = (t.top + (e._plotDimensions.height - t.bottom)) / 2 - n.outerHeight(!0) / 2;
                        n.css({
                            right: i,
                            top: s
                        });
                        break;
                    case "se":
                        var i = t.right + r.tooltipOffset,
                            s = t.bottom + r.tooltipOffset;
                        n.css({
                            right: i,
                            bottom: s
                        });
                        break;
                    case "s":
                        var i = (t.left + (e._plotDimensions.width - t.right)) / 2 - n.outerWidth(!0) / 2,
                            s = t.bottom + r.tooltipOffset;
                        n.css({
                            left: i,
                            bottom: s
                        });
                        break;
                    case "sw":
                        var i = t.left + r.tooltipOffset,
                            s = t.bottom + r.tooltipOffset;
                        n.css({
                            left: i,
                            bottom: s
                        });
                        break;
                    case "w":
                        var i = t.left + r.tooltipOffset,
                            s = (t.top + (e._plotDimensions.height - t.bottom)) / 2 - n.outerHeight(!0) / 2;
                        n.css({
                            left: i,
                            top: s
                        });
                        break;
                    default:
                        var i = t.right - r.tooltipOffset,
                            s = t.bottom + r.tooltipOffset;
                        n.css({
                            right: i,
                            bottom: s
                        })
                }
                n = null
            }

            function a(e, t, r, n, i) {
                e.preventDefault(), e.stopImmediatePropagation();
                var s = i.plugins.cursor;
                s.clickReset && s.resetZoom(i, s);
                var o = window.getSelection;
                return document.selection && document.selection.empty ? document.selection.empty() : o && !o().isCollapsed && o().collapse(), !1
            }

            function l(e, t, r, n, i) {
                e.preventDefault(), e.stopImmediatePropagation();
                var s = i.plugins.cursor;
                s.dblClickReset && s.resetZoom(i, s);
                var o = window.getSelection;
                return document.selection && document.selection.empty ? document.selection.empty() : o && !o().isCollapsed && o().collapse(), !1
            }

            function c(t, r, n, i, s) {
                var o = s.plugins.cursor;
                if (o.onGrid = !1, o.show) {
                    if (e(t.target).css("cursor", o.previousCursor), !o.showTooltip || o._zoom.zooming && o.showTooltipOutsideZoom && !o.constrainOutsideZoom || (o._tooltipElem.empty(), o._tooltipElem.hide()), o.zoom && (o._zoom.gridpos = r, o._zoom.datapos = n), o.showVerticalLine || o.showHorizontalLine) {
                        var a = o.cursorCanvas._ctx;
                        a.clearRect(0, 0, a.canvas.width, a.canvas.height), a = null, o._verticalElem.empty(), o._verticalElem.hide(), o._horizontalEles.empty(), o._horizontalEles.hide()
                    }
                    if (o.showCursorLegend)
                        for (var l = e(s.targetId + " td.jqplot-cursor-legend-label"), c = 0; c < l.length; c++) {
                            var u = e(l[c]).data("seriesIndex"),
                                h = s.series[u],
                                p = h.label.toString();
                            s.legend.escapeHtml ? e(l[c]).text(e.jqplot.sprintf(o.cursorLegendFormatString, p, void 0, void 0)) : e(l[c]).html(e.jqplot.sprintf(o.cursorLegendFormatString, p, void 0, void 0))
                        }
                }
            }

            function u(e, n, i, a, l) {
                var c = l.plugins.cursor;
                c.onGrid = !0, c.show && (c.previousCursor = e.target.style.cursor, e.target.style.cursor = c.style, c.showTooltip && (t(n, i, l), c.followMouse ? s(n, l) : o(l), c._tooltipElem.show()), (c.showVerticalLine || c.showHorizontalLine) && r(n, i, l))
            }

            function h(e, n, i, o, a) {
                var l = a.plugins.cursor;
                l.show && (l.showTooltip && (t(n, i, a), l.followMouse && s(n, a)), (l.showVerticalLine || l.showHorizontalLine) && r(n, i, a))
            }

            function p(e) {
                var t, r, n = e.data.plot,
                    i = n.eventCanvas._elem.offset(),
                    s = {
                        x: e.pageX - i.left,
                        y: e.pageY - i.top
                    },
                    o = {
                        xaxis: null,
                        yaxis: null,
                        x2axis: null,
                        y2axis: null,
                        y3axis: null,
                        y4axis: null,
                        y5axis: null,
                        y6axis: null,
                        y7axis: null,
                        y8axis: null,
                        y9axis: null,
                        yMidAxis: null
                    },
                    a = ["xaxis", "yaxis", "x2axis", "y2axis", "y3axis", "y4axis", "y5axis", "y6axis", "y7axis", "y8axis", "y9axis", "yMidAxis"],
                    l = n.axes;
                for (t = 11; t > 0; t--) r = a[t - 1], l[r].show && (o[r] = l[r].series_p2u(s[r.charAt(0)]));
                return {
                    offsets: i,
                    gridPos: s,
                    dataPos: o
                }
            }

            function d(e) {
                var r = e.data.plot,
                    n = r.plugins.cursor;
                if (n.show && n.zoom && n._zoom.started && !n.zoomTarget) {
                    e.preventDefault();
                    var i = n.zoomCanvas._ctx,
                        o = p(e),
                        a = o.gridPos,
                        l = o.dataPos;
                    n._zoom.gridpos = a, n._zoom.datapos = l, n._zoom.zooming = !0;
                    var c = a.x,
                        u = a.y,
                        h = i.canvas.height,
                        d = i.canvas.width;
                    n.showTooltip && !n.onGrid && n.showTooltipOutsideZoom && (t(a, l, r), n.followMouse && s(a, r)), "x" == n.constrainZoomTo ? n._zoom.end = [c, h] : "y" == n.constrainZoomTo ? n._zoom.end = [d, u] : n._zoom.end = [c, u];
                    var f = window.getSelection;
                    document.selection && document.selection.empty ? document.selection.empty() : f && !f().isCollapsed && f().collapse(), v.call(n), i = null
                }
            }

            function f(t, r, n, i, s) {
                var o = s.plugins.cursor;
                s.plugins.mobile ? e(document).one("vmouseup.jqplot_cursor", {
                    plot: s
                }, m) : e(document).one("mouseup.jqplot_cursor", {
                    plot: s
                }, m);
                s.axes;
                if (void 0 != document.onselectstart && (o._oldHandlers.onselectstart = document.onselectstart, document.onselectstart = function() {
                        return !1
                    }), void 0 != document.ondrag && (o._oldHandlers.ondrag = document.ondrag, document.ondrag = function() {
                        return !1
                    }), void 0 != document.onmousedown && (o._oldHandlers.onmousedown = document.onmousedown, document.onmousedown = function() {
                        return !1
                    }), o.zoom) {
                    if (!o.zoomProxy) {
                        var a = o.zoomCanvas._ctx;
                        a.clearRect(0, 0, a.canvas.width, a.canvas.height), a = null
                    }
                    "x" == o.constrainZoomTo ? o._zoom.start = [r.x, 0] : "y" == o.constrainZoomTo ? o._zoom.start = [0, r.y] : o._zoom.start = [r.x, r.y], o._zoom.started = !0;
                    for (var l in n) o._zoom.axes.start[l] = n[l];
                    s.plugins.mobile ? e(document).bind("vmousemove.jqplotCursor", {
                        plot: s
                    }, d) : e(document).bind("mousemove.jqplotCursor", {
                        plot: s
                    }, d)
                }
            }

            function m(t) {
                var r = t.data.plot,
                    n = r.plugins.cursor;
                if (n.zoom && n._zoom.zooming && !n.zoomTarget) {
                    var i = n._zoom.gridpos.x,
                        s = n._zoom.gridpos.y,
                        o = n._zoom.datapos,
                        a = n.zoomCanvas._ctx.canvas.height,
                        l = n.zoomCanvas._ctx.canvas.width,
                        c = r.axes;
                    if (n.constrainOutsideZoom && !n.onGrid) {
                        0 > i ? i = 0 : i > l && (i = l), 0 > s ? s = 0 : s > a && (s = a);
                        for (var u in o) o[u] && ("x" == u.charAt(0) ? o[u] = c[u].series_p2u(i) : o[u] = c[u].series_p2u(s))
                    }
                    "x" == n.constrainZoomTo ? s = a : "y" == n.constrainZoomTo && (i = l), n._zoom.end = [i, s], n._zoom.gridpos = {
                        x: i,
                        y: s
                    }, n.doZoom(n._zoom.gridpos, o, r, n)
                }
                n._zoom.started = !1, n._zoom.zooming = !1, e(document).unbind("mousemove.jqplotCursor", d), void 0 != document.onselectstart && null != n._oldHandlers.onselectstart && (document.onselectstart = n._oldHandlers.onselectstart, n._oldHandlers.onselectstart = null), void 0 != document.ondrag && null != n._oldHandlers.ondrag && (document.ondrag = n._oldHandlers.ondrag, n._oldHandlers.ondrag = null), void 0 != document.onmousedown && null != n._oldHandlers.onmousedown && (document.onmousedown = n._oldHandlers.onmousedown, n._oldHandlers.onmousedown = null)
            }

            function v() {
                var e, t, r, n, i = this._zoom.start,
                    s = this._zoom.end,
                    o = this.zoomCanvas._ctx;
                s[0] > i[0] ? (e = i[0], n = s[0] - i[0]) : (e = s[0], n = i[0] - s[0]), s[1] > i[1] ? (t = i[1], r = s[1] - i[1]) : (t = s[1], r = i[1] - s[1]), o.fillStyle = "rgba(0,0,0,0.2)", o.strokeStyle = "#999999", o.lineWidth = 1, o.clearRect(0, 0, o.canvas.width, o.canvas.height), o.fillRect(0, 0, o.canvas.width, o.canvas.height), o.clearRect(e, t, n, r), o.strokeRect(e, t, n, r), o = null
            }
            e.jqplot.Cursor = function(t) {
                this.style = "crosshair", this.previousCursor = "auto", this.show = e.jqplot.config.enablePlugins, this.showTooltip = !0, this.followMouse = !1, this.tooltipLocation = "se", this.tooltipOffset = 6, this.showTooltipGridPosition = !1, this.showTooltipUnitPosition = !0, this.showTooltipDataPosition = !1, this.tooltipFormatString = "%.4P, %.4P", this.useAxesFormatters = !0, this.tooltipAxisGroups = [], this.tooltipContent = null, this.zoom = !1, this.zoomProxy = !1, this.zoomTarget = !1, this.looseZoom = !0, this.clickReset = !1, this.dblClickReset = !0, this.showVerticalLine = !1, this.showHorizontalLine = !1, this.constrainZoomTo = "none", this.shapeRenderer = new e.jqplot.ShapeRenderer, this._zoom = {
                    start: [],
                    end: [],
                    started: !1,
                    zooming: !1,
                    isZoomed: !1,
                    axes: {
                        start: {},
                        end: {}
                    },
                    gridpos: {},
                    datapos: {}
                }, this._tooltipElem, this.zoomCanvas, this.cursorCanvas, this.intersectionThreshold = 2, this.showCursorLegend = !1, this.cursorLegendFormatString = e.jqplot.Cursor.cursorLegendFormatString, this._oldHandlers = {
                    onselectstart: null,
                    ondrag: null,
                    onmousedown: null
                }, this.constrainOutsideZoom = !0, this.showTooltipOutsideZoom = !1, this.onGrid = !1, e.extend(!0, this, t)
            }, e.jqplot.Cursor.cursorLegendFormatString = "%s x:%s, y:%s", e.jqplot.Cursor.init = function(t, r, n) {
                var i = n || {};
                this.plugins.cursor = new e.jqplot.Cursor(i.cursor);
                var s = this.plugins.cursor;
                s.show && (e.jqplot.eventListenerHooks.push(["jqplotMouseEnter", u]), e.jqplot.eventListenerHooks.push(["jqplotMouseLeave", c]), e.jqplot.eventListenerHooks.push(["jqplotMouseMove", h]), s.showCursorLegend && (n.legend = n.legend || {}, n.legend.renderer = e.jqplot.CursorLegendRenderer, n.legend.formatString = this.plugins.cursor.cursorLegendFormatString, n.legend.show = !0), s.zoom && (e.jqplot.eventListenerHooks.push(["jqplotMouseDown", f]), s.clickReset && e.jqplot.eventListenerHooks.push(["jqplotClick", a]), s.dblClickReset && e.jqplot.eventListenerHooks.push(["jqplotDblClick", l])), this.resetZoom = function() {
                    var e = this.axes;
                    if (s.zoomProxy) {
                        var t = this.plugins.cursor.zoomCanvas._ctx;
                        t.clearRect(0, 0, t.canvas.width, t.canvas.height), t = null
                    } else {
                        for (var r in e) e[r].reset(), e[r]._ticks = [], void 0 !== s._zoom.axes[r] && (e[r]._autoFormatString = s._zoom.axes[r].tickFormatString);
                        this.redraw()
                    }
                    this.plugins.cursor._zoom.isZoomed = !1, this.target.trigger("jqplotResetZoom", [this, this.plugins.cursor])
                }, s.showTooltipDataPosition && (s.showTooltipUnitPosition = !1, s.showTooltipGridPosition = !1, void 0 == i.cursor.tooltipFormatString && (s.tooltipFormatString = e.jqplot.Cursor.cursorLegendFormatString)))
            }, e.jqplot.Cursor.postDraw = function() {
                var t = this.plugins.cursor;
                t.zoomCanvas && (t.zoomCanvas.resetCanvas(), t.zoomCanvas = null), t.cursorCanvas && (t.cursorCanvas.resetCanvas(), t.cursorCanvas = null), t._tooltipElem && (t._tooltipElem.emptyForce(), t._tooltipElem = null), t._verticalElem && (t._verticalElem.emptyForce(), t._verticalElem = null), t._horizontalEles && (t._horizontalEles.emptyForce(), t._horizontalEles = null), t.zoom && (t.zoomCanvas = new e.jqplot.GenericCanvas, this.eventCanvas._elem.before(t.zoomCanvas.createElement(this._gridPadding, "jqplot-zoom-canvas", this._plotDimensions, this)), t.zoomCanvas.setContext());
                var r = document.createElement("div");
                t._tooltipElem = e(r), r = null, t._tooltipElem.addClass("jqplot-cursor-tooltip"), t._tooltipElem.css({
                    position: "absolute",
                    display: "none"
                });
                var n = this.options.gridPadding;
                if (t._verticalElem = e('<div class="jqplot-cursor-vertical"></div>'), t._verticalElem.css({
                        position: "absolute",
                        display: "none",
                        bottom: 0,
                        height: n.bottom
                    }), t._horizontalEles = e('<div class="jqplot-cursor-horizontal"></div>'), t._horizontalEles.css({
                        position: "absolute",
                        display: "none",
                        right: 0,
                        width: n.right
                    }), n = null, t.zoomCanvas ? t.zoomCanvas._elem.before(t._tooltipElem) : this.eventCanvas._elem.before(t._tooltipElem), t.cursorCanvas = new e.jqplot.GenericCanvas, this.eventCanvas._elem.before(t.cursorCanvas.createElement(this._gridPadding, "jqplot-cursor-canvas", this._plotDimensions, this)), t.cursorCanvas.setContext(), t._tooltipElem.before(t._verticalElem), t._tooltipElem.before(t._horizontalEles), t.showTooltipUnitPosition && 0 === t.tooltipAxisGroups.length) {
                    for (var i, s = this.series, o = [], a = 0; a < s.length; a++) {
                        i = s[a];
                        var l = i.xaxis + "," + i.yaxis; - 1 == e.inArray(l, o) && o.push(l)
                    }
                    for (var a = 0; a < o.length; a++) t.tooltipAxisGroups.push(o[a].split(","))
                }
            }, e.jqplot.Cursor.zoomProxy = function(e, t) {
                function r(t, r, n, s, o) {
                    i.doZoom(r, n, e, o)
                }

                function n(t, r, n) {
                    e.resetZoom()
                }
                var i = e.plugins.cursor,
                    s = t.plugins.cursor;
                i.zoomTarget = !0, i.zoom = !0, i.style = "auto", i.dblClickReset = !1, s.zoom = !0, s.zoomProxy = !0, t.target.bind("jqplotZoom", r), t.target.bind("jqplotResetZoom", n)
            }, e.jqplot.Cursor.prototype.resetZoom = function(e, t) {
                var r = e.axes,
                    n = t._zoom.axes;
                if (!e.plugins.cursor.zoomProxy && t._zoom.isZoomed) {
                    for (var i in r) r[i].reset(), r[i]._ticks = [], r[i]._autoFormatString = n[i].tickFormatString;
                    e.redraw(), t._zoom.isZoomed = !1
                } else {
                    var s = t.zoomCanvas._ctx;
                    s.clearRect(0, 0, s.canvas.width, s.canvas.height), s = null
                }
                e.target.trigger("jqplotResetZoom", [e, t])
            }, e.jqplot.Cursor.resetZoom = function(e) {
                e.resetZoom()
            }, e.jqplot.Cursor.prototype.doZoom = function(t, r, n, i) {
                var s, o, a, l, c, u, h, p = i,
                    d = n.axes,
                    f = p._zoom.axes,
                    m = f.start,
                    g = (f.end, n.plugins.cursor.zoomCanvas._ctx);
                if ("none" == p.constrainZoomTo && Math.abs(t.x - p._zoom.start[0]) > 6 && Math.abs(t.y - p._zoom.start[1]) > 6 || "x" == p.constrainZoomTo && Math.abs(t.x - p._zoom.start[0]) > 6 || "y" == p.constrainZoomTo && Math.abs(t.y - p._zoom.start[1]) > 6) {
                    if (!n.plugins.cursor.zoomProxy) {
                        for (var v in r) void 0 == p._zoom.axes[v] && (p._zoom.axes[v] = {}, p._zoom.axes[v].numberTicks = d[v].numberTicks, p._zoom.axes[v].tickInterval = d[v].tickInterval, p._zoom.axes[v].daTickInterval = d[v].daTickInterval, p._zoom.axes[v].min = d[v].min, p._zoom.axes[v].max = d[v].max, p._zoom.axes[v].tickFormatString = null != d[v].tickOptions ? d[v].tickOptions.formatString : ""), ("none" == p.constrainZoomTo || "x" == p.constrainZoomTo && "x" == v.charAt(0) || "y" == p.constrainZoomTo && "y" == v.charAt(0)) && (s = r[v], null != s && (s > m[v] ? (a = m[v], l = s) : (o = m[v] - s, a = s, l = m[v]), c = d[v], u = null, c.alignTicks && ("x2axis" === c.name && n.axes.xaxis.show ? u = n.axes.xaxis.numberTicks : "y" === c.name.charAt(0) && "yaxis" !== c.name && "yMidAxis" !== c.name && n.axes.yaxis.show && (u = n.axes.yaxis.numberTicks)), !this.looseZoom || d[v].renderer.constructor !== e.jqplot.LinearAxisRenderer && d[v].renderer.constructor !== e.jqplot.LogAxisRenderer ? (d[v].min = a, d[v].max = l, d[v].tickInterval = null, d[v].numberTicks = null, d[v].daTickInterval = null) : (h = e.jqplot.LinearTickGenerator(a, l, c._scalefact, u), d[v].tickInset && h[0] < d[v].min + d[v].tickInset * d[v].tickInterval && (h[0] += h[4], h[2] -= 1), d[v].tickInset && h[1] > d[v].max - d[v].tickInset * d[v].tickInterval && (h[1] -= h[4], h[2] -= 1), d[v].renderer.constructor === e.jqplot.LogAxisRenderer && h[0] < d[v].min && (h[0] += h[4], h[2] -= 1), d[v].min = h[0], d[v].max = h[1], d[v]._autoFormatString = h[3], d[v].numberTicks = h[2], d[v].tickInterval = h[4], d[v].daTickInterval = [h[4] / 1e3, "seconds"]), d[v]._ticks = []));
                        g.clearRect(0, 0, g.canvas.width, g.canvas.height), n.redraw(), p._zoom.isZoomed = !0, g = null
                    }
                    n.target.trigger("jqplotZoom", [t, r, n, i])
                }
            }, e.jqplot.preInitHooks.push(e.jqplot.Cursor.init), e.jqplot.postDrawHooks.push(e.jqplot.Cursor.postDraw), e.jqplot.CursorLegendRenderer = function(t) {
                e.jqplot.TableLegendRenderer.call(this, t), this.formatString = "%s"
            }, e.jqplot.CursorLegendRenderer.prototype = new e.jqplot.TableLegendRenderer, e.jqplot.CursorLegendRenderer.prototype.constructor = e.jqplot.CursorLegendRenderer, e.jqplot.CursorLegendRenderer.prototype.draw = function() {
                function t(t, r, n, i) {
                    var s = n ? this.rowSpacing : "0",
                        o = e('<tr class="jqplot-legend jqplot-cursor-legend"></tr>').appendTo(this._elem);
                    o.data("seriesIndex", i), e('<td class="jqplot-legend jqplot-cursor-legend-swatch" style="padding-top:' + s + ';"><div style="border:1px solid #cccccc;padding:0.2em;"><div class="jqplot-cursor-legend-swatch" style="background-color:' + r + ';"></div></div></td>').appendTo(o);
                    var a = e('<td class="jqplot-legend jqplot-cursor-legend-label" style="vertical-align:middle;padding-top:' + s + ';"></td>');
                    a.appendTo(o), a.data("seriesIndex", i), this.escapeHtml ? a.text(t) : a.html(t), o = null, a = null
                }
                if (this._elem && (this._elem.emptyForce(), this._elem = null), this.show) {
                    var r, n = this._series,
                        i = document.createElement("table");
                    this._elem = e(i), i = null, this._elem.addClass("jqplot-legend jqplot-cursor-legend"), this._elem.css("position", "absolute");
                    for (var s = !1, o = 0; o < n.length; o++)
                        if (r = n[o], r.show && r.showLabel) {
                            var a = e.jqplot.sprintf(this.formatString, r.label.toString());
                            if (a) {
                                var l = r.color;
                                r._stack && !r.fill && (l = ""), t.call(this, a, l, s, o), s = !0
                            }
                            for (var c = 0; c < e.jqplot.addLegendRowHooks.length; c++) {
                                var u = e.jqplot.addLegendRowHooks[c].call(this, r);
                                u && (t.call(this, u.label, u.color, s), s = !0)
                            }
                        }
                    n = r = null, delete n, delete r
                }
                return this._elem
            }
        }(e)
    }).call(t, r(28))
}, function(e, t, r) {
    (function(e) {
        ! function(e) {
            e.jqplot.BaselineTip = function(t) {
                this.show = e.jqplot.config.enablePlugins, this.value = null, this.lineWidth = 1, this.color = "#F00", this.yaxis = "yaxis", this.useAxesFormatters = !0, e.extend(!0, this, t)
            }, e.jqplot.BaselineTip.postPlotInit = function(t, r, n) {
                var i = n || {};
                this.plugins.baselineTip = new e.jqplot.BaselineTip(i.baselineTip)
            }, e.jqplot.BaselineTip.postPlotDraw = function(t, r, n) {
                var i = this.plugins.baselineTip;
                i._baselineEles && (i._baselineEles.emptyForce(), i._baselineEles = null), i._tipEles && (i._tipEles.emptyForce(), i._tipEles = null);
                var s = this.options.gridPadding;
                i._baselineEles = e("<div></div>"), i._baselineEles.addClass("jqplot-baseline-line"), i._baselineEles.css({
                    "z-index": 9,
                    position: "absolute",
                    left: s.left,
                    width: this.target.outerWidth(!0) - s.left - s.right,
                    "background-color": i.color,
                    height: i.lineWidth,
                    display: "none"
                }), i._tipEles = e("<div></div>"), i._tipEles.addClass("jqplot-baseline-tip"), i._tipEles.css({
                    position: "absolute",
                    right: 0,
                    width: s.right,
                    display: "none"
                }), i.draw(this), i.show && (this.eventCanvas._elem.before(i._baselineEles), this.eventCanvas._elem.before(i._tipEles))
            }, e.jqplot.BaselineTip.prototype.draw = function(e) {
                if (null !== this.value && "undefined" != typeof this.value) {
                    var t = this.value,
                        r = e.axes[this.yaxis].series_u2p(t);
                    if (0 > r || r > e.eventCanvas.getHeight()) return this._tipEles.hide(), void this._baselineEles.hide();
                    if (this.useAxesFormatters) {
                        var n = e.axes[this.yaxis]._ticks[0].formatter,
                            i = e.axes[this.yaxis]._ticks[0].formatString;
                        t = n(i, t)
                    }
                    this._tipEles.html(t), this._baselineEles.css({
                        top: r
                    }).show(), this._tipEles.css({
                        top: r
                    }).show()
                }
            }, e.jqplot.postInitHooks.push(e.jqplot.BaselineTip.postPlotInit), e.jqplot.postDrawHooks.push(e.jqplot.BaselineTip.postPlotDraw)
        }(e)
    }).call(t, r(28))
}, function(e, t, r) {
    (function(e) {
        e(function() {
            e.fn.jqplotToImage = function(t, r) {
                function n(e) {
                    for (var t = ["font-style", "font-weight", "font-size", "font-family"], r = [], n = 0; n < t.length; ++n) {
                        var t = String(e[t[n]]);
                        t && "normal" != t && r.push(t)
                    }
                    return r.join(" ")
                }

                function i(t, r, s) {
                    var a = e(t);
                    if ("none" !== a.css("display")) {
                        var l = t.tagName.toLowerCase(),
                            c = a.position(),
                            u = window.getComputedStyle(t),
                            h = r + c.left + parseInt(u.marginLeft),
                            p = s + c.top + parseInt(u.marginTop);
                        if ("div" != l && "span" != l || a.hasClass("jqplot-highlighter-tooltip")) "canvas" == l && o.drawImage(t, h, p);
                        else {
                            a.children().each(function() {
                                i(this, h, p)
                            });
                            var d = u.backgroundColor;
                            o.fillStyle = d, o.fillRect(h, p, parseInt(u.width), parseInt(u.height));
                            var f = a.childText();
                            if (f) {
                                o.fillStyle = u.color, o.font = n(u), h += parseInt(u.borderLeftWidth) + parseInt(u.paddingLeft), p += parseInt(u.borderTopWidth) + parseInt(u.paddingTop);
                                var m = u.textAlign;
                                "center" === m ? (h += e(t).width() / 2, o.textAlign = "center") : o.textAlign = "start", o.fillText(f, h, p)
                            }
                        }
                    }
                }
                if (0 == e(this).width() || 0 == e(this).height()) return null;
                var s = document.createElement("canvas");
                if (s.width = e(this).outerWidth() + Number(t), s.height = e(this).outerHeight() + Number(r), !s.getContext) return null;
                var o = s.getContext("2d");
                return o.textAlign = "left", o.textBaseline = "top", o.fillStyle = e(this).css("background-color"), o.fillRect(0, 0, s.width, s.height), e(this).children().each(function() {
                    i(this, t, r)
                }), s
            }, e.fn.childText = function() {
                return e(this).contents().filter(function() {
                    return 3 == this.nodeType
                }).text()
            }
        })
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(231),
            i = r(232),
            s = r(233),
            o = r(234),
            a = r(62),
            l = function(e, r) {
                this.plot = e, this.type = null, this.graphs = [], this.removedGraphs = [], this.selectedGraph = null, this.hoveredGraph = null, t.extend(!0, this, r)
            };
        l.prototype = {
            constructor: l,
            render: function() {
                var e = this.plot,
                    t = n.createSVG({
                        width: e._width,
                        height: e._height
                    });
                t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.pointerEvents = "none";
                var r = n.createElement("defs"),
                    i = n.createElement("clipPath", {
                        id: "range"
                    });
                i.appendChild(n.createElement("rect", {
                    "class": "range",
                    x: 0,
                    y: 0,
                    width: e.eventCanvas.getWidth(),
                    height: e.eventCanvas.getHeight()
                })), r.appendChild(i), t.appendChild(r), e.target.after(t), this.element = t, t = null, r = null
            },
            resize: function() {
                var e = this.plot,
                    t = e.eventCanvas.getWidth(),
                    r = e.eventCanvas.getHeight(),
                    n = this.element;
                n.setAttribute("width", e._width), n.setAttribute("height", e._height);
                var i = n.querySelector(".range");
                i.setAttribute("width", e.eventCanvas.getWidth()), i.setAttribute("height", e.eventCanvas.getHeight());
                for (var s = this.graphs, o = 0, a = s.length; a > o; o++) s[o].resize(t, r);
                s = null, i = null, n = null, t = null, r = null, e = null
            },
            add: function(e) {
                if (!e) throw new Error("参数不能为空");
                this.graphs.push(e), this.element.appendChild(e._ele)
            },
            remove: function(e) {
                for (var t = this.graphs, r = 0, n = t.length; n > r; r++)
                    if (t[r].id === e) {
                        t[r]._ele.parentNode.removeChild(t[r]._ele), t.splice(r, 1);
                        break
                    }
                t = null
            },
            clear: function() {
                for (var e = this.graphs, t = 0, r = e.length; r > t; t++) e[t]._ele.parentNode.removeChild(e[t]._ele);
                e = null, this.graphs = []
            },
            rescale: function() {
                for (var e = this.graphs, t = this.plot, r = 0, n = e.length; n > r; r++) e[r].rescale(t)
            },
            exportAsBase64: function() {
                return n.exportAsImage(this.element)
            },
            forward: function() {
                var e = this.graphs,
                    t = this.removedGraphs;
                if (t.length > 0) {
                    var r = t.pop();
                    r.rescale(this.plot), this.element.appendChild(r._ele), e.push(r), r = null
                }
                e = null, t = null
            },
            back: function() {
                var e = this.graphs,
                    t = this.removedGraphs;
                if (e.length > 0) {
                    var r = e.pop();
                    r._ele.parentNode.removeChild(r._ele), t.push(r), r = null
                }
                e = null, t = null
            },
            changeType: function(e, t) {
                switch (this.type = e, e) {
                    case a.HORTICAL_LINE:
                        this._addHorticalLine(t);
                        break;
                    case a.VERTICAL_LINE:
                        this._addVerticalLine(t);
                        break;
                    case a.RAY_LINE:
                        this._addRayLine(t);
                        break;
                    default:
                        this.type = null
                }
            },
            _addHorticalLine: function(e) {
                var t = this,
                    r = this.plot,
                    n = null,
                    s = function(e, s, c, u) {
                        t.type === a.HORTICAL_LINE && (r.target.on("mousemove.annotation", o), r.target.one("jqplotMouseUp", l), n = new i(r, {
                            y: s.y,
                            value: c.y2axis,
                            lineWidth: r.eventCanvas.getWidth(),
                            textWidth: r.options.gridPadding.right,
                            draggable: !1
                        }), t.element.appendChild(n._ele))
                    },
                    o = function(e) {
                        var r = t._getMousePosition(e, this);
                        n.setPosition(r.y), r = null
                    },
                    l = function(i, s, o, a) {
                        r.target.off("mousemove.annotation"), n.setPosition(s.y), t.graphs.push(n), t.type = null, n = null, t.removedGraphs = [], "function" == typeof e && e()
                    };
                r.target.one("jqplotMouseDown", s)
            },
            _addVerticalLine: function(e) {
                var t = this,
                    r = null,
                    n = function(e, n, l, c) {
                        t.type === a.VERTICAL_LINE && (plot.target.on("mousemove.annotation", i), plot.target.one("jqplotMouseUp", s), r = new o(plot, {
                            x: n.x,
                            value: l.xaxis,
                            lineHeight: plot.eventCanvas.getHeight(),
                            textHeight: plot.options.gridPadding.bottom,
                            draggable: !1
                        }), t.element.appendChild(r._ele))
                    },
                    i = function(e) {
                        var n = t._getMousePosition(e, this);
                        r.setPosition(n.x), n = null
                    },
                    s = function(n, i, s, o) {
                        plot.target.off("mousemove.annotation"), r.setPosition(i.x), t.graphs.push(r), t.type = null, r = null, t.removedGraphs = [], "function" == typeof e && e()
                    };
                plot.target.one("jqplotMouseDown", n)
            },
            _addRayLine: function(e) {
                var t = this,
                    r = null,
                    n = null,
                    i = null,
                    o = function(e, n, o, u) {
                        t.type === a.RAY_LINE && (plot.target.on("mousemove.annotation", l), plot.target.one("jqplotMouseUp", c), r = n, i = new s(plot, {
                            startPosition: [r.x, r.y],
                            endPosition: [r.x, r.y],
                            startValue: [o.xaxis, o.y2axis],
                            padding: plot.options.gridPadding,
                            draggable: !1
                        }), t.element.appendChild(i._ele))
                    },
                    l = function(e) {
                        n = t._getMousePosition(e, this), i.setEndPosition([n.x, n.y])
                    },
                    c = function(s, o, a, l) {
                        plot.target.off("mousemove.annotation"), n.x === r.x && n.y === n.y ? i._ele.parentNode.removeChild(i._ele) : (i.setEndValue(a.xaxis, a.y2axis), t.graphs.push(i)), t.type = null, r = null, n = null, i = null, t.removedGraphs = [], "function" == typeof e && e()
                    };
                plot.target.one("jqplotMouseDown", o)
            },
            _getMousePosition: function(e, t) {
                var r = t.getBoundingClientRect();
                return {
                    x: e.clientX - r.left,
                    y: e.clientY - r.top
                }
            }
        }, e.exports = l
    }).call(t, r(28))
}, function(e, t, r) {
    var n, i;
    ! function(s, o) {
        n = [r(80), r(28), t], i = function(e, t, r) {
            s.daterangepicker = o(s, r, e, t)
        }.apply(t, n), !(void 0 !== i && (e.exports = i))
    }(this, function(e, t, r, n) {
        var i = function(e, t, r) {
            this.parentEl = "body", this.element = n(e), this.isShowing = !1;
            var i = '<div class="daterangepicker dropdown-menu"><div class="calendar first left"></div><div class="calendar second right"></div><div class="ranges"><div class="range_inputs"><div class="daterangepicker_start_input"><label for="daterangepicker_start"></label><input class="input-mini" type="text" name="daterangepicker_start" value="" /></div><div class="daterangepicker_end_input"><label for="daterangepicker_end"></label><input class="input-mini" type="text" name="daterangepicker_end" value="" /></div><button class="applyBtn" disabled="disabled"></button>&nbsp;<button class="cancelBtn"></button></div></div></div>';
            ("object" != typeof t || null === t) && (t = {}), this.parentEl = n("object" == typeof t && t.parentEl && n(t.parentEl).length ? t.parentEl : this.parentEl), this.container = n(i).appendTo(this.parentEl), this.setOptions(t, r), this.container.find(".calendar").on("click.daterangepicker", ".prev", n.proxy(this.clickPrev, this)).on("click.daterangepicker", ".next", n.proxy(this.clickNext, this)).on("click.daterangepicker", "td.available", n.proxy(this.clickDate, this)).on("mouseenter.daterangepicker", "td.available", n.proxy(this.hoverDate, this)).on("mouseleave.daterangepicker", "td.available", n.proxy(this.updateFormInputs, this)).on("change.daterangepicker", "select.yearselect", n.proxy(this.updateMonthYear, this)).on("change.daterangepicker", "select.monthselect", n.proxy(this.updateMonthYear, this)).on("change.daterangepicker", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", n.proxy(this.updateTime, this)), this.container.find(".ranges").on("click.daterangepicker", "button.applyBtn", n.proxy(this.clickApply, this)).on("click.daterangepicker", "button.cancelBtn", n.proxy(this.clickCancel, this)).on("click.daterangepicker", ".daterangepicker_start_input,.daterangepicker_end_input", n.proxy(this.showCalendars, this)).on("change.daterangepicker", ".daterangepicker_start_input,.daterangepicker_end_input", n.proxy(this.inputsChanged, this)).on("keydown.daterangepicker", ".daterangepicker_start_input,.daterangepicker_end_input", n.proxy(this.inputsKeydown, this)).on("click.daterangepicker", "li", n.proxy(this.clickRange, this)).on("mouseenter.daterangepicker", "li", n.proxy(this.enterRange, this)).on("mouseleave.daterangepicker", "li", n.proxy(this.updateFormInputs, this)), this.element.is("input") ? this.element.on({
                "click.daterangepicker": n.proxy(this.show, this),
                "focus.daterangepicker": n.proxy(this.show, this),
                "keyup.daterangepicker": n.proxy(this.updateFromControl, this),
                "keydown.daterangepicker": n.proxy(this.keydown, this)
            }) : this.element.on("click.daterangepicker", n.proxy(this.toggle, this))
        };
        i.prototype = {
            constructor: i,
            setOptions: function(e, t) {
                if (this.startDate = r().startOf("day"), this.endDate = r().endOf("day"), this.timeZone = r().utcOffset(), this.minDate = !1, this.maxDate = !1, this.dateLimit = !1, this.showDropdowns = !1, this.showWeekNumbers = !1, this.timePicker = !1, this.timePickerSeconds = !1, this.timePickerIncrement = 30, this.timePicker12Hour = !0, this.singleDatePicker = !1, this.ranges = {}, this.opens = "right", this.element.hasClass("pull-right") && (this.opens = "left"), this.drops = "down", this.element.hasClass("dropup") && (this.drops = "up"), this.buttonClasses = ["btn", "btn-small btn-sm"], this.applyClass = "btn-success", this.cancelClass = "btn-default", this.format = "MM/DD/YYYY", this.separator = " - ", this.locale = {
                        applyLabel: "Apply",
                        cancelLabel: "Cancel",
                        fromLabel: "From",
                        toLabel: "To",
                        weekLabel: "W",
                        customRangeLabel: "Custom Range",
                        daysOfWeek: r.weekdaysMin(),
                        monthNames: r.monthsShort(),
                        firstDay: r.localeData()._week.dow
                    }, this.cb = function() {}, "string" == typeof e.format && (this.format = e.format), "string" == typeof e.separator && (this.separator = e.separator), "string" == typeof e.startDate && (this.startDate = r(e.startDate, this.format)), "string" == typeof e.endDate && (this.endDate = r(e.endDate, this.format)), "string" == typeof e.minDate && (this.minDate = r(e.minDate, this.format)), "string" == typeof e.maxDate && (this.maxDate = r(e.maxDate, this.format)), "object" == typeof e.startDate && (this.startDate = r(e.startDate)), "object" == typeof e.endDate && (this.endDate = r(e.endDate)), "object" == typeof e.minDate && (this.minDate = r(e.minDate)), "object" == typeof e.maxDate && (this.maxDate = r(e.maxDate)), "string" == typeof e.applyClass && (this.applyClass = e.applyClass), "string" == typeof e.cancelClass && (this.cancelClass = e.cancelClass), "object" == typeof e.dateLimit && (this.dateLimit = e.dateLimit), "object" == typeof e.locale && ("object" == typeof e.locale.daysOfWeek && (this.locale.daysOfWeek = e.locale.daysOfWeek.slice()), "object" == typeof e.locale.monthNames && (this.locale.monthNames = e.locale.monthNames.slice()), "number" == typeof e.locale.firstDay && (this.locale.firstDay = e.locale.firstDay), "string" == typeof e.locale.applyLabel && (this.locale.applyLabel = e.locale.applyLabel), "string" == typeof e.locale.cancelLabel && (this.locale.cancelLabel = e.locale.cancelLabel), "string" == typeof e.locale.fromLabel && (this.locale.fromLabel = e.locale.fromLabel), "string" == typeof e.locale.toLabel && (this.locale.toLabel = e.locale.toLabel), "string" == typeof e.locale.weekLabel && (this.locale.weekLabel = e.locale.weekLabel), "string" == typeof e.locale.customRangeLabel && (this.locale.customRangeLabel = e.locale.customRangeLabel)), "string" == typeof e.opens && (this.opens = e.opens), "string" == typeof e.drops && (this.drops = e.drops), "boolean" == typeof e.showWeekNumbers && (this.showWeekNumbers = e.showWeekNumbers), "string" == typeof e.buttonClasses && (this.buttonClasses = [e.buttonClasses]), "object" == typeof e.buttonClasses && (this.buttonClasses = e.buttonClasses), "boolean" == typeof e.showDropdowns && (this.showDropdowns = e.showDropdowns), "boolean" == typeof e.singleDatePicker && (this.singleDatePicker = e.singleDatePicker, this.singleDatePicker && (this.endDate = this.startDate.clone())), "boolean" == typeof e.timePicker && (this.timePicker = e.timePicker), "boolean" == typeof e.timePickerSeconds && (this.timePickerSeconds = e.timePickerSeconds), "number" == typeof e.timePickerIncrement && (this.timePickerIncrement = e.timePickerIncrement), "boolean" == typeof e.timePicker12Hour && (this.timePicker12Hour = e.timePicker12Hour), 0 != this.locale.firstDay)
                    for (var i = this.locale.firstDay; i > 0;) this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), i--;
                var s, o, a;
                if ("undefined" == typeof e.startDate && "undefined" == typeof e.endDate && n(this.element).is("input[type=text]")) {
                    var l = n(this.element).val(),
                        c = l.split(this.separator);
                    s = o = null, 2 == c.length ? (s = r(c[0], this.format), o = r(c[1], this.format)) : this.singleDatePicker && "" !== l && (s = r(l, this.format), o = r(l, this.format)), null !== s && null !== o && (this.startDate = s, this.endDate = o)
                }
                if ("string" == typeof e.timeZone || "number" == typeof e.timeZone ? ("string" == typeof e.timeZone && "undefined" != typeof r.tz ? this.timeZone = -1 * r.tz.zone(e.timeZone).parse(new Date) : this.timeZone = e.timeZone, this.startDate.utcOffset(this.timeZone), this.endDate.utcOffset(this.timeZone)) : this.timeZone = r(this.startDate).utcOffset(), "object" == typeof e.ranges) {
                    for (a in e.ranges) s = "string" == typeof e.ranges[a][0] ? r(e.ranges[a][0], this.format) : r(e.ranges[a][0]), o = "string" == typeof e.ranges[a][1] ? r(e.ranges[a][1], this.format) : r(e.ranges[a][1]), this.minDate && s.isBefore(this.minDate) && (s = r(this.minDate)), this.maxDate && o.isAfter(this.maxDate) && (o = r(this.maxDate)), this.minDate && o.isBefore(this.minDate) || this.maxDate && s.isAfter(this.maxDate) || (this.ranges[a] = [s, o]);
                    var u = "<ul>";
                    for (a in this.ranges) u += "<li>" + a + "</li>";
                    u += "<li>" + this.locale.customRangeLabel + "</li>", u += "</ul>", this.container.find(".ranges ul").remove(), this.container.find(".ranges").prepend(u)
                }
                if ("function" == typeof t && (this.cb = t), this.timePicker || (this.startDate = this.startDate.startOf("day"), this.endDate = this.endDate.endOf("day")), this.singleDatePicker ? (this.opens = "right", this.container.addClass("single"), this.container.find(".calendar.right").show(), this.container.find(".calendar.left").hide(), this.timePicker ? this.container.find(".ranges .daterangepicker_start_input, .ranges .daterangepicker_end_input").hide() : this.container.find(".ranges").hide(), this.container.find(".calendar.right").hasClass("single") || this.container.find(".calendar.right").addClass("single")) : (this.container.removeClass("single"), this.container.find(".calendar.right").removeClass("single"), this.container.find(".ranges").show()), this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.oldChosenLabel = this.chosenLabel, this.leftCalendar = {
                        month: r([this.startDate.year(), this.startDate.month(), 1, this.startDate.hour(), this.startDate.minute(), this.startDate.second()]),
                        calendar: []
                    }, this.rightCalendar = {
                        month: r([this.endDate.year(), this.endDate.month(), 1, this.endDate.hour(), this.endDate.minute(), this.endDate.second()]),
                        calendar: []
                    }, "right" == this.opens || "center" == this.opens) {
                    var h = this.container.find(".calendar.first"),
                        p = this.container.find(".calendar.second");
                    p.hasClass("single") && (p.removeClass("single"), h.addClass("single")), h.removeClass("left").addClass("right"), p.removeClass("right").addClass("left"), this.singleDatePicker && (h.show(), p.hide())
                }
                "undefined" != typeof e.ranges || this.singleDatePicker || this.container.addClass("show-calendar"), this.container.removeClass("opensleft opensright").addClass("opens" + this.opens), this.updateView(), this.updateCalendars();
                var d = this.container;
                n.each(this.buttonClasses, function(e, t) {
                    d.find("button").addClass(t)
                }), this.container.find(".daterangepicker_start_input label").html(this.locale.fromLabel), this.container.find(".daterangepicker_end_input label").html(this.locale.toLabel), this.applyClass.length && this.container.find(".applyBtn").addClass(this.applyClass), this.cancelClass.length && this.container.find(".cancelBtn").addClass(this.cancelClass), this.container.find(".applyBtn").html(this.locale.applyLabel), this.container.find(".cancelBtn").html(this.locale.cancelLabel)
            },
            setStartDate: function(e) {
                "string" == typeof e && (this.startDate = r(e, this.format).utcOffset(this.timeZone)), "object" == typeof e && (this.startDate = r(e)), this.timePicker || (this.startDate = this.startDate.startOf("day")), this.oldStartDate = this.startDate.clone(), this.updateView(), this.updateCalendars(), this.updateInputText()
            },
            setEndDate: function(e) {
                "string" == typeof e && (this.endDate = r(e, this.format).utcOffset(this.timeZone)), "object" == typeof e && (this.endDate = r(e)), this.timePicker || (this.endDate = this.endDate.endOf("day")), this.oldEndDate = this.endDate.clone(), this.updateView(), this.updateCalendars(), this.updateInputText()
            },
            updateView: function() {
                this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute()), this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute()), this.updateFormInputs()
            },
            updateFormInputs: function() {
                this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.format)), this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.format)), this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate) ? this.container.find("button.applyBtn").removeAttr("disabled") : this.container.find("button.applyBtn").attr("disabled", "disabled")
            },
            updateFromControl: function() {
                if (this.element.is("input") && this.element.val().length) {
                    var e = this.element.val().split(this.separator),
                        t = null,
                        n = null;
                    2 === e.length && (t = r(e[0], this.format).utcOffset(this.timeZone), n = r(e[1], this.format).utcOffset(this.timeZone)), (this.singleDatePicker || null === t || null === n) && (t = r(this.element.val(), this.format).utcOffset(this.timeZone), n = t), n.isBefore(t) || (this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.startDate = t, this.endDate = n, this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.notify(), this.updateCalendars())
                }
            },
            keydown: function(e) {
                (9 === e.keyCode || 13 === e.keyCode) && this.hide()
            },
            notify: function() {
                this.updateView(), this.cb(this.startDate, this.endDate, this.chosenLabel)
            },
            move: function() {
                var e, t = {
                        top: 0,
                        left: 0
                    },
                    r = n(window).width();
                this.parentEl.is("body") || (t = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                }, r = this.parentEl[0].clientWidth + this.parentEl.offset().left), e = "up" == this.drops ? this.element.offset().top - this.container.outerHeight() - t.top : this.element.offset().top + this.element.outerHeight() - t.top, this.container["up" == this.drops ? "addClass" : "removeClass"]("dropup"), "left" == this.opens ? (this.container.css({
                    top: e,
                    right: r - this.element.offset().left - this.element.outerWidth(),
                    left: "auto"
                }), this.container.offset().left < 0 && this.container.css({
                    right: "auto",
                    left: 9
                })) : "center" == this.opens ? (this.container.css({
                    top: e,
                    left: this.element.offset().left - t.left + this.element.outerWidth() / 2 - this.container.outerWidth() / 2,
                    right: "auto"
                }), this.container.offset().left < 0 && this.container.css({
                    right: "auto",
                    left: 9
                })) : (this.container.css({
                    top: e,
                    left: this.element.offset().left - t.left,
                    right: "auto"
                }), this.container.offset().left + this.container.outerWidth() > n(window).width() && this.container.css({
                    left: "auto",
                    right: 0
                }))
            },
            toggle: function(e) {
                this.element.hasClass("active") ? this.hide() : this.show()
            },
            show: function(e) {
                this.isShowing || (this.element.addClass("active"), this.container.show(), this.move(), this._outsideClickProxy = n.proxy(function(e) {
                    this.outsideClick(e)
                }, this), n(document).on("mousedown.daterangepicker", this._outsideClickProxy).on("touchend.daterangepicker", this._outsideClickProxy).on("click.daterangepicker", "[data-toggle=dropdown]", this._outsideClickProxy).on("focusin.daterangepicker", this._outsideClickProxy), this.isShowing = !0, this.element.trigger("show.daterangepicker", this))
            },
            outsideClick: function(e) {
                var t = n(e.target);
                "focusin" == e.type || t.closest(this.element).length || t.closest(this.container).length || t.closest(".calendar-date").length || this.hide()
            },
            hide: function(e) {
                this.isShowing && (n(document).off(".daterangepicker"), this.element.removeClass("active"), this.container.hide(), this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.notify(), this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.isShowing = !1, this.element.trigger("hide.daterangepicker", this))
            },
            enterRange: function(e) {
                var t = e.target.innerHTML;
                if (t == this.locale.customRangeLabel) this.updateView();
                else {
                    var r = this.ranges[t];
                    this.container.find("input[name=daterangepicker_start]").val(r[0].format(this.format)), this.container.find("input[name=daterangepicker_end]").val(r[1].format(this.format))
                }
            },
            showCalendars: function() {
                this.container.addClass("show-calendar"), this.move(), this.element.trigger("showCalendar.daterangepicker", this)
            },
            hideCalendars: function() {
                this.container.removeClass("show-calendar"), this.element.trigger("hideCalendar.daterangepicker", this)
            },
            inputsChanged: function(e) {
                var t = n(e.target),
                    i = r(t.val(), this.format);
                if (i.isValid()) {
                    var s, o;
                    "daterangepicker_start" === t.attr("name") ? (s = !1 !== this.minDate && i.isBefore(this.minDate) ? this.minDate : i, o = this.endDate) : (s = this.startDate, o = !1 !== this.maxDate && i.isAfter(this.maxDate) ? this.maxDate : i), this.setCustomDates(s, o)
                }
            },
            inputsKeydown: function(e) {
                13 === e.keyCode && (this.inputsChanged(e), this.notify())
            },
            updateInputText: function() {
                this.element.is("input") && !this.singleDatePicker ? (this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format)), this.element.trigger("change")) : this.element.is("input") && (this.element.val(this.endDate.format(this.format)), this.element.trigger("change"))
            },
            clickRange: function(e) {
                var t = e.target.innerHTML;
                if (this.chosenLabel = t, t == this.locale.customRangeLabel) this.showCalendars();
                else {
                    var r = this.ranges[t];
                    this.startDate = r[0], this.endDate = r[1], this.timePicker || (this.startDate.startOf("day"), this.endDate.endOf("day")), this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute()), this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute()), this.updateCalendars(), this.updateInputText(), this.hideCalendars(), this.hide(), this.element.trigger("apply.daterangepicker", this)
                }
            },
            clickPrev: function(e) {
                var t = n(e.target).parents(".calendar");
                t.hasClass("left") ? this.leftCalendar.month.subtract(1, "month") : this.rightCalendar.month.subtract(1, "month"), this.updateCalendars()
            },
            clickNext: function(e) {
                var t = n(e.target).parents(".calendar");
                t.hasClass("left") ? this.leftCalendar.month.add(1, "month") : this.rightCalendar.month.add(1, "month"), this.updateCalendars()
            },
            hoverDate: function(e) {
                var t = n(e.target).attr("data-title"),
                    r = t.substr(1, 1),
                    i = t.substr(3, 1),
                    s = n(e.target).parents(".calendar");
                s.hasClass("left") ? this.container.find("input[name=daterangepicker_start]").val(this.leftCalendar.calendar[r][i].format(this.format)) : this.container.find("input[name=daterangepicker_end]").val(this.rightCalendar.calendar[r][i].format(this.format))
            },
            setCustomDates: function(e, t) {
                if (this.chosenLabel = this.locale.customRangeLabel, e.isAfter(t)) {
                    var n = this.endDate.diff(this.startDate);
                    t = r(e).add(n, "ms"), this.maxDate && t.isAfter(this.maxDate) && (t = this.maxDate.clone())
                }
                this.startDate = e, this.endDate = t, this.updateView(), this.updateCalendars()
            },
            clickDate: function(e) {
                var t, i, s = n(e.target).attr("data-title"),
                    o = s.substr(1, 1),
                    a = s.substr(3, 1),
                    l = n(e.target).parents(".calendar");
                if (l.hasClass("left")) {
                    if (t = this.leftCalendar.calendar[o][a], i = this.endDate, "object" == typeof this.dateLimit) {
                        var c = r(t).add(this.dateLimit).startOf("day");
                        i.isAfter(c) && (i = c)
                    }
                } else if (t = this.startDate, i = this.rightCalendar.calendar[o][a], "object" == typeof this.dateLimit) {
                    var u = r(i).subtract(this.dateLimit).startOf("day");
                    t.isBefore(u) && (t = u)
                }
                this.singleDatePicker && l.hasClass("left") ? i = t.clone() : this.singleDatePicker && l.hasClass("right") && (t = i.clone()), l.find("td").removeClass("active"), n(e.target).addClass("active"), this.setCustomDates(t, i), this.timePicker || i.endOf("day"), this.singleDatePicker && !this.timePicker && this.clickApply()
            },
            clickApply: function(e) {
                this.updateInputText(), this.hide(), this.element.trigger("apply.daterangepicker", this)
            },
            clickCancel: function(e) {
                this.startDate = this.oldStartDate, this.endDate = this.oldEndDate, this.chosenLabel = this.oldChosenLabel, this.updateView(), this.updateCalendars(), this.hide(), this.element.trigger("cancel.daterangepicker", this)
            },
            updateMonthYear: function(e) {
                var t = n(e.target).closest(".calendar").hasClass("left"),
                    r = t ? "left" : "right",
                    i = this.container.find(".calendar." + r),
                    s = parseInt(i.find(".monthselect").val(), 10),
                    o = i.find(".yearselect").val();
                t || this.singleDatePicker || (o < this.startDate.year() || o == this.startDate.year() && s < this.startDate.month()) && (s = this.startDate.month(), o = this.startDate.year()), this.minDate && (o < this.minDate.year() || o == this.minDate.year() && s < this.minDate.month()) && (s = this.minDate.month(), o = this.minDate.year()), this.maxDate && (o > this.maxDate.year() || o == this.maxDate.year() && s > this.maxDate.month()) && (s = this.maxDate.month(), o = this.maxDate.year()), this[r + "Calendar"].month.month(s).year(o), this.updateCalendars()
            },
            updateTime: function(e) {
                var t = n(e.target).closest(".calendar"),
                    r = t.hasClass("left"),
                    i = parseInt(t.find(".hourselect").val(), 10),
                    s = parseInt(t.find(".minuteselect").val(), 10),
                    o = 0;
                if (this.timePickerSeconds && (o = parseInt(t.find(".secondselect").val(), 10)), this.timePicker12Hour) {
                    var a = t.find(".ampmselect").val();
                    "PM" === a && 12 > i && (i += 12), "AM" === a && 12 === i && (i = 0)
                }
                if (r) {
                    var l = this.startDate.clone();
                    l.hour(i), l.minute(s), l.second(o), this.startDate = l, this.leftCalendar.month.hour(i).minute(s).second(o), this.singleDatePicker && (this.endDate = l.clone())
                } else {
                    var c = this.endDate.clone();
                    c.hour(i), c.minute(s), c.second(o), this.endDate = c, this.singleDatePicker && (this.startDate = c.clone()), this.rightCalendar.month.hour(i).minute(s).second(o)
                }
                this.updateView(), this.updateCalendars()
            },
            updateCalendars: function() {
                this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), this.leftCalendar.month.second(), "left"), this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), this.rightCalendar.month.second(), "right"), this.container.find(".calendar.left").empty().html(this.renderCalendar(this.leftCalendar.calendar, this.startDate, this.minDate, this.maxDate, "left")), this.container.find(".calendar.right").empty().html(this.renderCalendar(this.rightCalendar.calendar, this.endDate, this.singleDatePicker ? this.minDate : this.startDate, this.maxDate, "right")), this.container.find(".ranges li").removeClass("active");
                var e = !0,
                    t = 0;
                for (var r in this.ranges) this.timePicker ? this.startDate.isSame(this.ranges[r][0]) && this.endDate.isSame(this.ranges[r][1]) && (e = !1, this.chosenLabel = this.container.find(".ranges li:eq(" + t + ")").addClass("active").html()) : this.startDate.format("YYYY-MM-DD") == this.ranges[r][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") == this.ranges[r][1].format("YYYY-MM-DD") && (e = !1, this.chosenLabel = this.container.find(".ranges li:eq(" + t + ")").addClass("active").html()), t++;
                e && (this.chosenLabel = this.container.find(".ranges li:last").addClass("active").html(), this.showCalendars())
            },
            buildCalendar: function(e, t, n, i, s, o) {
                var a, l = r([t, e]).daysInMonth(),
                    c = r([t, e, 1]),
                    u = r([t, e, l]),
                    h = r(c).subtract(1, "month").month(),
                    p = r(c).subtract(1, "month").year(),
                    d = r([p, h]).daysInMonth(),
                    f = c.day(),
                    m = [];
                for (m.firstDay = c, m.lastDay = u, a = 0; 6 > a; a++) m[a] = [];
                var g = d - f + this.locale.firstDay + 1;
                g > d && (g -= 7), f == this.locale.firstDay && (g = d - 6);
                var v, y, b = r([p, h, g, 12, i, s]).utcOffset(this.timeZone);
                for (a = 0, v = 0, y = 0; 42 > a; a++, v++, b = r(b).add(24, "hour")) a > 0 && v % 7 === 0 && (v = 0, y++), m[y][v] = b.clone().hour(n), b.hour(12), this.minDate && m[y][v].format("YYYY-MM-DD") == this.minDate.format("YYYY-MM-DD") && m[y][v].isBefore(this.minDate) && "left" == o && (m[y][v] = this.minDate.clone()), this.maxDate && m[y][v].format("YYYY-MM-DD") == this.maxDate.format("YYYY-MM-DD") && m[y][v].isAfter(this.maxDate) && "right" == o && (m[y][v] = this.maxDate.clone());
                return m
            },
            renderDropdowns: function(e, t, r) {
                for (var n = e.month(), i = e.year(), s = r && r.year() || i + 5, o = t && t.year() || i - 50, a = '<select class="monthselect">', l = i == o, c = i == s, u = 0; 12 > u; u++)(!l || u >= t.month()) && (!c || u <= r.month()) && (a += "<option value='" + u + "'" + (u === n ? " selected='selected'" : "") + ">" + this.locale.monthNames[u] + "</option>");
                a += "</select>";
                for (var h = '<select class="yearselect">', p = o; s >= p; p++) h += '<option value="' + p + '"' + (p === i ? ' selected="selected"' : "") + ">" + p + "</option>";
                return h += "</select>", a + h
            },
            renderCalendar: function(e, t, r, i, s) {
                var o = '<div class="calendar-date">';
                o += '<table class="table-condensed">', o += "<thead>", o += "<tr>", this.showWeekNumbers && (o += "<th></th>"), o += !r || r.isBefore(e.firstDay) ? '<th class="prev available"><i class="fa fa-arrow-left icon icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>' : "<th></th>";
                var a = this.locale.monthNames[e[1][1].month()] + e[1][1].format(" YYYY");
                this.showDropdowns && (a = this.renderDropdowns(e[1][1], r, i)), o += '<th colspan="5" class="month">' + a + "</th>", o += !i || i.isAfter(e.lastDay) ? '<th class="next available"><i class="fa fa-arrow-right icon icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>' : "<th></th>", o += "</tr>", o += "<tr>", this.showWeekNumbers && (o += '<th class="week">' + this.locale.weekLabel + "</th>"), n.each(this.locale.daysOfWeek, function(e, t) {
                    o += "<th>" + t + "</th>"
                }), o += "</tr>", o += "</thead>", o += "<tbody>";
                for (var l = 0; 6 > l; l++) {
                    o += "<tr>", this.showWeekNumbers && (o += '<td class="week">' + e[l][0].week() + "</td>");
                    for (var c = 0; 7 > c; c++) {
                        var u = "available ";
                        u += e[l][c].month() == e[1][1].month() ? "" : "off", r && e[l][c].isBefore(r, "day") || i && e[l][c].isAfter(i, "day") ? u = " off disabled " : e[l][c].format("YYYY-MM-DD") == t.format("YYYY-MM-DD") ? (u += " active ", e[l][c].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && (u += " start-date "), e[l][c].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && (u += " end-date ")) : e[l][c] >= this.startDate && e[l][c] <= this.endDate && (u += " in-range ", e[l][c].isSame(this.startDate) && (u += " start-date "), e[l][c].isSame(this.endDate) && (u += " end-date "));
                        var h = "r" + l + "c" + c;
                        o += '<td class="' + u.replace(/\s+/g, " ").replace(/^\s?(.*?)\s?$/, "$1") + '" data-title="' + h + '">' + e[l][c].date() + "</td>";
                    }
                    o += "</tr>"
                }
                o += "</tbody>", o += "</table>", o += "</div>";
                var p;
                if (this.timePicker) {
                    o += '<div class="calendar-time">', o += '<select class="hourselect">';
                    var d = 0,
                        f = 23;
                    r && ("left" == s || this.singleDatePicker) && t.format("YYYY-MM-DD") == r.format("YYYY-MM-DD") && (d = r.hour(), t.hour() < d && t.hour(d), this.timePicker12Hour && d >= 12 && t.hour() >= 12 && (d -= 12), this.timePicker12Hour && 12 == d && (d = 1)), i && ("right" == s || this.singleDatePicker) && t.format("YYYY-MM-DD") == i.format("YYYY-MM-DD") && (f = i.hour(), t.hour() > f && t.hour(f), this.timePicker12Hour && f >= 12 && t.hour() >= 12 && (f -= 12));
                    var m = 0,
                        g = 23,
                        v = t.hour();
                    for (this.timePicker12Hour && (m = 1, g = 12, v >= 12 && (v -= 12), 0 === v && (v = 12)), p = m; g >= p; p++) o += p == v ? '<option value="' + p + '" selected="selected">' + p + "</option>" : d > p || p > f ? '<option value="' + p + '" disabled="disabled" class="disabled">' + p + "</option>" : '<option value="' + p + '">' + p + "</option>";
                    o += "</select> : ", o += '<select class="minuteselect">';
                    var y = 0,
                        b = 59;
                    for (r && ("left" == s || this.singleDatePicker) && t.format("YYYY-MM-DD h A") == r.format("YYYY-MM-DD h A") && (y = r.minute(), t.minute() < y && t.minute(y)), i && ("right" == s || this.singleDatePicker) && t.format("YYYY-MM-DD h A") == i.format("YYYY-MM-DD h A") && (b = i.minute(), t.minute() > b && t.minute(b)), p = 0; 60 > p; p += this.timePickerIncrement) {
                        var w = p;
                        10 > w && (w = "0" + w), o += p == t.minute() ? '<option value="' + p + '" selected="selected">' + w + "</option>" : y > p || p > b ? '<option value="' + p + '" disabled="disabled" class="disabled">' + w + "</option>" : '<option value="' + p + '">' + w + "</option>"
                    }
                    if (o += "</select> ", this.timePickerSeconds) {
                        for (o += ': <select class="secondselect">', p = 0; 60 > p; p += this.timePickerIncrement) {
                            var w = p;
                            10 > w && (w = "0" + w), o += p == t.second() ? '<option value="' + p + '" selected="selected">' + w + "</option>" : '<option value="' + p + '">' + w + "</option>"
                        }
                        o += "</select>"
                    }
                    if (this.timePicker12Hour) {
                        o += '<select class="ampmselect">';
                        var _ = "",
                            x = "";
                        r && ("left" == s || this.singleDatePicker) && t.format("YYYY-MM-DD") == r.format("YYYY-MM-DD") && r.hour() >= 12 && (_ = ' disabled="disabled" class="disabled"'), i && ("right" == s || this.singleDatePicker) && t.format("YYYY-MM-DD") == i.format("YYYY-MM-DD") && i.hour() < 12 && (x = ' disabled="disabled" class="disabled"'), o += t.hour() >= 12 ? '<option value="AM"' + _ + '>AM</option><option value="PM" selected="selected"' + x + ">PM</option>" : '<option value="AM" selected="selected"' + _ + '>AM</option><option value="PM"' + x + ">PM</option>", o += "</select>"
                    }
                    o += "</div>"
                }
                return o
            },
            remove: function() {
                this.container.remove(), this.element.off(".daterangepicker"), this.element.removeData("daterangepicker")
            }
        }, n.fn.daterangepicker = function(e, t) {
            return this.each(function() {
                var r = n(this);
                r.data("daterangepicker") && r.data("daterangepicker").remove(), r.data("daterangepicker", new i(r, e, t))
            }), this
        }
    })
}, , , , , , , , , , , , , , , , , , , , function(e, t, r) {
    var n = r(129),
        i = {
            addClass: function(e, t) {
                return n(!/\s/.test(t)), t && (e.classList ? e.classList.add(t) : i.hasClass(e, t) || (e.className = e.className + " " + t)), e
            },
            removeClass: function(e, t) {
                return n(!/\s/.test(t)), t && (e.classList ? e.classList.remove(t) : i.hasClass(e, t) && (e.className = e.className.replace(new RegExp("(^|\\s)" + t + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, ""))), e
            },
            conditionClass: function(e, t, r) {
                return (r ? i.addClass : i.removeClass)(e, t)
            },
            hasClass: function(e, t) {
                return n(!/\s/.test(t)), e.classList ? !!t && e.classList.contains(t) : (" " + e.className + " ").indexOf(" " + t + " ") > -1
            }
        };
    e.exports = i
}, function(e, t, r) {
    "use strict";

    function n() {
        var e = document.createElement("div"),
            t = e.style;
        "AnimationEvent" in window || delete a.animationend.animation, "TransitionEvent" in window || delete a.transitionend.transition;
        for (var r in a) {
            var n = a[r];
            for (var i in n)
                if (i in t) {
                    l.push(n[i]);
                    break
                }
        }
    }

    function i(e, t, r) {
        e.addEventListener(t, r, !1)
    }

    function s(e, t, r) {
        e.removeEventListener(t, r, !1)
    }
    var o = r(191),
        a = {
            transitionend: {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "mozTransitionEnd",
                OTransition: "oTransitionEnd",
                msTransition: "MSTransitionEnd"
            },
            animationend: {
                animation: "animationend",
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "mozAnimationEnd",
                OAnimation: "oAnimationEnd",
                msAnimation: "MSAnimationEnd"
            }
        },
        l = [];
    o.canUseDOM && n();
    var c = {
        addEndEventListener: function(e, t) {
            return 0 === l.length ? void window.setTimeout(t, 0) : void l.forEach(function(r) {
                i(e, r, t)
            })
        },
        removeEndEventListener: function(e, t) {
            0 !== l.length && l.forEach(function(r) {
                s(e, r, t)
            })
        }
    };
    e.exports = c
}, function(e, t, r) {
    "use strict";
    var n = r(147),
        i = r(215),
        s = {
            getChildMapping: function(e) {
                return e ? i.extract(n.map(e, function(e) {
                    return e
                })) : e
            },
            mergeChildMappings: function(e, t) {
                function r(r) {
                    return t.hasOwnProperty(r) ? t[r] : e[r]
                }
                e = e || {}, t = t || {};
                var n = {},
                    i = [];
                for (var s in e) t.hasOwnProperty(s) ? i.length && (n[s] = i, i = []) : i.push(s);
                var o, a = {};
                for (var l in t) {
                    if (n.hasOwnProperty(l))
                        for (o = 0; o < n[l].length; o++) {
                            var c = n[l][o];
                            a[n[l][o]] = r(c)
                        }
                    a[l] = r(l)
                }
                for (o = 0; o < i.length; o++) a[i[o]] = r(i[o]);
                return a
            }
        };
    e.exports = s
}, , function(e, t, r) {
    function n(e, t) {
        return e.props.label || e.props.children
    }

    function i(e, t) {
        return e = e.toLowerCase(), t = t.toLowerCase(), "" === e || e === t ? !1 : -1 === t.toLowerCase().indexOf(e.toLowerCase()) ? !1 : !0
    }
    var s = r(27),
        o = r(111),
        a = 0,
        l = function() {},
        c = r(275),
        u = r(170);
    e.exports = s.createClass({
        displayName: "module.exports",
        propTypes: {
            autocomplete: s.PropTypes.oneOf(["both", "inline", "list"]),
            onInput: s.PropTypes.func,
            onSelect: s.PropTypes.func,
            value: s.PropTypes.any,
            inputEle: s.PropTypes.element.isRequired
        },
        getDefaultProps: function() {
            return {
                autocomplete: "both",
                onInput: l,
                onSelect: l,
                value: null
            }
        },
        getInitialState: function() {
            return {
                value: this.props.value,
                inputValue: this.findInitialInputValue(),
                isOpen: !1,
                focusedIndex: null,
                matchedAutocompleteOption: null,
                usingKeyboard: !1,
                activedescendant: null,
                listId: "rf-combobox-list-" + ++a,
                menu: {
                    children: [],
                    activedescendant: null,
                    isEmpty: !0
                }
            }
        },
        componentWillMount: function() {
            this.setState({
                menu: this.makeMenu()
            })
        },
        componentWillReceiveProps: function(e) {
            this.setState({
                menu: this.makeMenu(e.children)
            })
        },
        makeMenu: function(e) {
            var t, r = !0;
            return e = e || this.props.children, s.Children.forEach(e, function(e, n) {
                if (e.type === u.type) {
                    r = !1;
                    var i = e.props;
                    this.state.value === i.value && (i.id = i.id || "rf-combobox-selected-" + ++a, i.isSelected = !0, t = i.id), i.onBlur = this.handleOptionBlur, i.onClick = this.selectOption.bind(this, e), i.onFocus = this.handleOptionFocus, i.onKeyDown = this.handleOptionKeyDown.bind(this, e), i.onMouseEnter = this.handleOptionMouseEnter.bind(this, n)
                }
            }.bind(this)), {
                children: e,
                activedescendant: t,
                isEmpty: r
            }
        },
        getClassName: function() {
            var e = c(this.props.className, "rf-combobox");
            return this.state.isOpen && (e = c(e, "rf-combobox-is-open")), e
        },
        clearSelectedState: function(e) {
            this.setState({
                focusedIndex: null,
                inputValue: null,
                value: null,
                matchedAutocompleteOption: null,
                activedescendant: null
            }, e)
        },
        handleInputChange: function(e) {
            var t = this.refs.input.getDOMNode().value;
            this.clearSelectedState(function() {
                this.props.onInput(t), this.state.isOpen || this.showList()
            }.bind(this))
        },
        handleInputBlur: function() {
            var e = null != this.state.focusedIndex;
            e || (this.maybeSelectAutocompletedOption(), this.hideList())
        },
        handleOptionBlur: function() {
            this.blurTimer = setTimeout(this.hideList, 0)
        },
        handleOptionFocus: function() {
            clearTimeout(this.blurTimer)
        },
        handleInputKeyUp: function(e) {
            !this.state.menu.isEmpty && 8 !== e.keyCode && this.props.autocomplete.match(/both|inline/) && this.autocompleteInputValue()
        },
        autocompleteInputValue: function() {
            if (0 != this.props.autocomplete && 0 !== this.props.children.length) {
                var e = this.refs.input.getDOMNode(),
                    t = e.value,
                    r = this.props.children.length ? this.props.children[0] : this.props.children,
                    s = n(r),
                    o = i(t, s);
                o && (e.value = s, e.setSelectionRange(t.length, s.length), this.setState({
                    matchedAutocompleteOption: r
                }))
            }
        },
        handleButtonClick: function() {
            this.state.isOpen ? this.hideList() : this.showList(), this.focusInput()
        },
        showList: function() {
            this.props.autocomplete.match(/both|list/) && this.setState({
                isOpen: !0
            })
        },
        hideList: function() {
            this.setState({
                isOpen: !1
            })
        },
        hideOnEscape: function() {
            this.hideList(), this.focusInput()
        },
        focusInput: function() {
            this.refs.input.getDOMNode().focus()
        },
        selectInput: function() {
            this.refs.input.getDOMNode().select()
        },
        inputKeydownMap: {
            38: "focusPrevious",
            40: "focusNext",
            27: "hideOnEscape",
            13: "selectOnEnter"
        },
        optionKeydownMap: {
            38: "focusPrevious",
            40: "focusNext",
            13: "selectOption",
            27: "hideOnEscape"
        },
        handleKeydown: function(e) {
            var t = this.inputKeydownMap[e.keyCode];
            t && (e.preventDefault(), this.setState({
                usingKeyboard: !0
            }), this[t].call(this))
        },
        handleOptionKeyDown: function(e, t) {
            var r = this.optionKeydownMap[t.keyCode];
            return r ? (t.preventDefault(), this.setState({
                usingKeyboard: !0
            }), void this[r].call(this, e)) : void this.selectInput()
        },
        handleOptionMouseEnter: function(e) {
            this.state.usingKeyboard ? this.setState({
                usingKeyboard: !1
            }) : this.focusOptionAtIndex(e)
        },
        selectOnEnter: function() {
            this.maybeSelectAutocompletedOption(), this.refs.input.getDOMNode().select()
        },
        maybeSelectAutocompletedOption: function() {
            this.state.matchedAutocompleteOption && this.selectOption(this.state.matchedAutocompleteOption, {
                focus: !1
            })
        },
        selectOption: function(e, t) {
            t = t || {}, this.setState({
                value: e.props.value,
                inputValue: "",
                matchedAutocompleteOption: null
            }, function() {
                this.props.onSelect(e.props.value, e), this.hideList(), t.focus !== !1 && this.selectInput()
            }.bind(this)), setTimeout(function() {
                this.handleInputChange()
            }.bind(this), 1)
        },
        focusNext: function() {
            if (!this.state.menu.isEmpty) {
                var e = null == this.state.focusedIndex ? 0 : this.state.focusedIndex + 1;
                this.focusOptionAtIndex(e)
            }
        },
        focusPrevious: function() {
            if (!this.state.menu.isEmpty) {
                var e = this.props.children.length - 1,
                    t = null == this.state.focusedIndex ? e : this.state.focusedIndex - 1;
                this.focusOptionAtIndex(t)
            }
        },
        focusSelectedOption: function() {
            var e;
            s.Children.forEach(this.props.children, function(t, r) {
                t.props.value === this.state.value && (e = r)
            }.bind(this)), this.showList(), this.setState({
                focusedIndex: e
            }, this.focusOption)
        },
        findInitialInputValue: function() {
            var e;
            return s.Children.forEach(this.props.children, function(t) {
                t.props.value === this.props.value && (e = n(t))
            }.bind(this)), e
        },
        focusOptionAtIndex: function(e) {
            if (!this.state.isOpen && this.state.value) return this.focusSelectedOption();
            this.showList();
            var t = this.props.children.length; - 1 === e ? e = t - 1 : e === t && (e = 0), this.setState({
                focusedIndex: e
            }, this.focusOption)
        },
        focusOption: function() {
            var e = this.state.focusedIndex;
            this.refs.list.getDOMNode().childNodes[e].focus()
        },
        render: function() {
            var e = o(this.props.inputEle, {
                ref: "input",
                defaultValue: this.props.value,
                value: this.state.inputValue,
                onChange: this.handleInputChange,
                onBlur: this.handleInputBlur,
                onKeyDown: this.handleKeydown,
                onKeyUp: this.handleInputKeyUp,
                role: "combobox",
                "aria-activedescendant": this.state.menu.activedescendant,
                "aria-autocomplete": this.props.autocomplete,
                "aria-owns": this.state.listId
            });
            return s.createElement("div", {
                className: this.getClassName()
            }, e, s.createElement("span", {
                "aria-hidden": "true",
                className: "rf-combobox-button",
                onClick: this.handleButtonClick
            }, "▾"), s.createElement("div", {
                id: this.state.listId,
                ref: "list",
                className: "rf-combobox-list",
                "aria-expanded": this.state.isOpen + "",
                role: "listbox"
            }, this.state.menu.children))
        }
    })
}, function(e, t, r) {
    var n = r(27),
        i = r(275);
    e.exports = n.createClass({
        displayName: "module.exports",
        propTypes: {
            value: n.PropTypes.any.isRequired,
            label: n.PropTypes.string
        },
        getDefaultProps: function() {
            return {
                role: "option",
                tabIndex: "-1",
                className: "rf-combobox-option",
                isSelected: !1
            }
        },
        render: function() {
            var e = this.props;
            return e.isSelected && (e.className = i(e.className, "rf-combobox-selected")), n.DOM.div(e)
        }
    })
}, , , , , , , , , , , , , , , , , function(e, t, r) {
    "use strict";
    var n = r(363),
        i = r(364),
        s = r(365),
        o = {
            Column: i,
            ColumnGroup: s,
            Table: n
        };
    o.version = "0.3.0", e.exports = o
}, , , , , , , , , , , , , , function(e, t, r) {
    "use strict";
    var n = r(25),
        i = n.createActions({
            submitFeedback: {}
        });
    e.exports = i
}, function(e, t, r) {
    "use strict";
    var n = r(25),
        i = (r(9), r(31), r(201)),
        s = r(369),
        o = n.createStore({
            listenables: i,
            submitFeedback: function(e) {
                var t = this;
                s.submitFeedback(e).done(function(e) {
                    t.trigger({
                        type: "submitFeedback",
                        data: e.data
                    })
                })
            }
        });
    e.exports = o
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(14),
        s = n.createClass({
            displayName: "PriceTruncation",
            colorCN: null,
            render: function() {
                var e = this.props,
                    t = Number(e.current),
                    r = Number(e.preview),
                    s = i.priceFormat(t.toFixed(e.scale)),
                    o = this.colorCN;
                return "down" !== o && r > t ? o = "down" : "up" !== o && t > r && (o = "up"), this.colorCN = o, o ? o += " price-wrapper" : o = "price-wrapper", n.createElement("div", {
                    className: o
                }, s.map(function(e, t) {
                    return 1 === t ? n.createElement("span", {
                        className: "strong"
                    }, e) : e
                }))
            }
        });
    e.exports = s
}, function(e, t, r) {
    "use strict";
    var n = Object.prototype.toString;
    e.exports = function(e) {
        var t = n.call(e),
            r = "[object Arguments]" === t;
        return r || (r = "[object Array]" !== t && null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Function]" === n.call(e.callee)), r
    }
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return function(t, r, n) {
            t.hasOwnProperty(r) ? t[r] = e(t[r], n) : t[r] = n
        }
    }

    function i(e, t) {
        for (var r in t)
            if (t.hasOwnProperty(r)) {
                var n = c[r];
                n && c.hasOwnProperty(r) ? n(e, r, t[r]) : e.hasOwnProperty(r) || (e[r] = t[r])
            }
        return e
    }
    var s = r(76),
        o = r(168),
        a = r(372),
        l = n(function(e, t) {
            return s({}, t, e)
        }),
        c = {
            children: o,
            className: n(a),
            style: l
        },
        u = {
            mergeProps: function(e, t) {
                return i(s({}, e), t)
            }
        };
    e.exports = u
}, , function(e, t, r) {
    "use strict";
    var n = r(373),
        i = r(75),
        s = r(374),
        o = r(22),
        a = r(215),
        l = r(77),
        c = r(243),
        u = r(49),
        h = r(111),
        p = r(56);
    i.addons = {
        CSSTransitionGroup: o,
        LinkedStateMixin: n,
        PureRenderMixin: s,
        TransitionGroup: l,
        batchedUpdates: c.batchedUpdates,
        classSet: u,
        cloneWithProps: h,
        createFragment: a.create,
        update: p
    }, e.exports = i
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(49),
        s = n.createClass({
            displayName: "Tab",
            propTypes: {
                selected: n.PropTypes.bool,
                selectTabHanlder: n.PropTypes.func,
                enableRemove: n.PropTypes.bool,
                styleName: n.PropTypes.string,
                removeTabHandler: n.PropTypes.func
            },
            getDefaultProps: function() {
                return {
                    selected: !1,
                    selectTabHanlder: null,
                    enableRemove: !1,
                    styleName: null,
                    removeTabHandler: null
                }
            },
            render: function() {
                var e = {
                    "active-tab": this.props.selected,
                    tab: !0
                };
                this.props.styleName ? e[this.props.styleName] = !0 : null;
                var t = this.props.enableRemove ? n.createElement("span", {
                    className: "remove-tab",
                    onClick: this.props.removeTabHandler
                }, "X") : null;
                return n.createElement("div", {
                    className: i(e),
                    onClick: this.props.selectTabHanlder
                }, this.props.children, t)
            }
        });
    e.exports = s
}, function(e, t, r) {
    "use strict";
    var n = r(27),
        i = r(49),
        s = n.createClass({
            displayName: "TabPanel",
            propTypes: {
                selected: n.PropTypes.bool
            },
            getDefaultProps: function() {
                return {
                    selected: !1
                }
            },
            render: function() {
                var e = i({
                    "active-tab-panel": this.props.selected,
                    "tab-panel": !0
                });
                return n.createElement("div", {
                    className: e
                }, this.props.children)
            }
        });
    e.exports = s
}, , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
    "use strict";
    var n = r(378),
        i = "http://www.w3.org/2000/svg",
        s = {
            createElement: function(e, t, r) {
                var n = document.createElementNS(i, e);
                r && (n.className = r);
                for (var s in t) n.setAttribute(s, t[s]);
                return n
            },
            decodeTranlate: function(e) {
                var t = /^translate\((-?\d+)\,\s*(-?\d+)\)$/gi,
                    r = t.exec(e).slice(1).map(function(e) {
                        return Number(e)
                    });
                return r
            },
            encodeTranlate: function(e, t) {
                return "translate(" + e + ", " + t + ")"
            },
            createSVG: function(e) {
                var t = s.createElement("svg", e);
                return t.setAttribute("version", 1.1), t.setAttribute("xmlns", i), t
            },
            exportAsImage: function(e) {
                var t = (new XMLSerializer).serializeToString(e),
                    r = window.btoa || n.btoa;
                return "data:image/svg+xml;base64," + r(t)
            }
        };
    e.exports = s
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(231),
            i = r(62),
            s = function(e, r) {
                this.id = i.uuid(), this.plot = e, this._ele = null, this.y = 0, this.value = 0, this.draggable = !1, this.color = "#C5C5C5", this.lineWidth = 0, this.textWidth = 0, t.extend(!0, this, r), this._init()
            };
        s.prototype = {
            constructor: s,
            _init: function() {
                var e = this.lineWidth,
                    t = this.textWidth,
                    r = n.createElement("g", {
                        transform: "translate(0," + this.y + ")",
                        "class": "hline",
                        id: this.id
                    });
                r.appendChild(n.createElement("line", {
                    x1: 0,
                    y1: 0,
                    x2: e,
                    y2: 0,
                    "stroke-width": 1,
                    stroke: this.color,
                    "class": "target-line"
                })), r.appendChild(n.createElement("rect", {
                    x: e,
                    y: 0,
                    width: t,
                    height: 30,
                    stroke: "none",
                    fill: "#808080",
                    transform: "translate(0, -15)",
                    "pointer-events": "none",
                    "class": "text-wrapper"
                }));
                var i = n.createElement("text", {
                    x: e + t / 2,
                    y: 0,
                    stroke: "none",
                    fill: "#FFF",
                    "font-size": "12",
                    "text-anchor": "middle",
                    "alignment-baseline": "middle",
                    "pointer-events": "none",
                    "class": "text"
                });
                i.textContent = this.formatter(), r.appendChild(i), this._ele = r, r = null, i = null, e = null, t = null
            },
            rescale: function() {
                var e = this.plot.axes.y2axis,
                    t = this.value,
                    r = this._ele;
                if (t >= e.max || t <= e.min) r.style.display = "none";
                else {
                    r.style.display = "block";
                    var n = e.series_u2p(t);
                    this._ele.setAttribute("transform", "translate(0," + n + ")"), this.y = n
                }
                r = null, e = null, t = null
            },
            resize: function(e, t) {
                this.lineWidth = e;
                var r = this._ele;
                r.querySelector(".target-line").setAttribute("x2", e), r.querySelector(".text-wrapper").setAttribute("x", e), r.querySelector(".text").setAttribute("x", e + this.textWidth / 2), this.rescale(), r = null
            },
            setPosition: function(e) {
                this.y = e;
                var t = this.plot.axes.y2axis,
                    r = t.series_p2u(e),
                    n = this._ele;
                this.value = r, r >= t.max ? n.style.display = "none" : (n.style.display = "block", n.setAttribute("transform", "translate(0," + e + ")"), n.querySelector(".text").textContent = this.formatter(r)), n = null, t = null, r = null
            },
            setValue: function(e) {
                this.value = e
            },
            formatter: function(e) {
                e = e || this.value;
                var t = this.plot.axes.y2axis._ticks[0],
                    r = t ? t.formatter(t.formatString, e) : e;
                return r
            }
        }, e.exports = s
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(231),
            i = r(62),
            s = function(e, r) {
                this.id = i.uuid(), this.plot = e, this.startPosition = [0, 0], this.endPosition = [10, 10], this.startValue = [0, 0], this.endValue = [10, 10], this.draggable = !1, this.color = "#C5C5C5", t.extend(!0, this, r), this._init()
            };
        s.prototype = {
            constructor: s,
            _init: function() {
                var e = this.startPosition,
                    t = this.endPosition,
                    r = n.createElement("g", {
                        "class": "ray-line",
                        "clip-path": "url(#range)",
                        id: this.id
                    });
                r.appendChild(n.createElement("line", {
                    x1: e[0],
                    y1: e[1],
                    x2: t[0],
                    y2: t[1],
                    "stroke-width": 1,
                    "pointer-events": "none",
                    stroke: this.color,
                    "class": "ray"
                })), this._ele = r
            },
            setStartPosition: function(e) {
                this.startPosition = e;
                var t = this._ele.querySelector(".ray");
                t.setAttribute("x1", e[0]), t.setAttribute("y1", e[1])
            },
            setEndPosition: function(e) {
                this.endPosition = e;
                var t = this._ele.querySelector(".ray");
                t.setAttribute("x2", e[0]), t.setAttribute("y2", e[1])
            },
            setStartValue: function(e, t) {
                this.startValue = [e, t]
            },
            setEndValue: function(e, t) {
                this.endValue = [e, t]
            },
            rescale: function() {
                var e = this.plot,
                    t = e.axes.xaxis.series_u2p,
                    r = e.axes.y2axis.series_u2p,
                    n = this.startValue,
                    i = this.endValue;
                this.setStartPosition([t(n[0]), r(n[1])]), this.setEndPosition([t(i[0]), r(i[1])]), t = null, r = null, n = null, i = null, e = null
            },
            resize: function(e, t) {
                this.rescale()
            }
        }, e.exports = s
    }).call(t, r(28))
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(231),
            i = r(62),
            s = function(e, r) {
                this.id = i.uuid(), this.plot = e, this._ele = null, this.x = 0, this.value = 0, this.draggable = !1, this.color = "#C5C5C5", this.lineHeight = 0, this.textHeight = 0, t.extend(!0, this, r), this._init()
            };
        s.prototype = {
            constructor: s,
            _init: function() {
                var e = this.lineHeight,
                    t = this.textHeight,
                    r = n.createElement("g", {
                        transform: "translate(" + this.x + ",0)",
                        "class": "vline",
                        id: this.id
                    });
                r.appendChild(n.createElement("line", {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: e,
                    "stroke-width": 1,
                    stroke: this.color,
                    "class": "display-line"
                })), r.appendChild(n.createElement("rect", {
                    x: 0,
                    y: e,
                    width: 80,
                    height: t,
                    stroke: "none",
                    fill: "#808080",
                    transform: "translate(-40, 0)",
                    "pointer-events": "none",
                    "class": "text-wrapper"
                }));
                var i = n.createElement("text", {
                    x: 0,
                    y: e + t / 2,
                    stroke: "none",
                    fill: "#FFF",
                    "font-size": "12",
                    "text-anchor": "middle",
                    "alignment-baseline": "middle",
                    "pointer-events": "none",
                    "class": "text"
                });
                i.textContent = this.formatter(), r.appendChild(i), this._ele = r, r = null, i = null, e = null, t = null
            },
            rescale: function() {
                var e = this.value,
                    t = this.plot.axes.xaxis,
                    r = this._ele;
                if (e >= t.max || e <= t.min) r.style.display = "none";
                else {
                    r.style.display = "block";
                    var n = t.series_u2p(e);
                    r.setAttribute("transform", "translate(" + n + ",0)"), this.x = n
                }
                r = null, e = null, t = null
            },
            resize: function(e, t) {
                this.lineHeight = t;
                var r = this._ele;
                r.querySelector(".display-line").setAttribute("y2", t), r.querySelector(".text-wrapper").setAttribute("y", t), r.querySelector(".text").setAttribute("y", t + this.textHeight / 2), this.rescale(), r = null
            },
            setPosition: function(e) {
                this.x = e;
                var t = this._ele,
                    r = this.plot.axes.xaxis,
                    n = r.series_p2u(e);
                return this.value = n, n >= r.max ? t.style.display = "none" : (t.style.display = "block", t.setAttribute("transform", "translate(" + e + ",0)"), t.querySelector(".text").textContent = this.formatter(n)), t = null, n = null, r = null, this
            },
            setValue: function(e) {
                return this.value = e, this
            },
            formatter: function(e) {
                e = e || this.value;
                var t = this.plot.axes.xaxis._ticks[0],
                    r = t ? t.formatter(t.formatString, e) : e;
                return r
            }
        }, e.exports = s
    }).call(t, r(28))
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
    function n(e, t) {
        return e ? e.indexOf(t) > -1 ? e : e + " " + t : t
    }
    e.exports = n
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
    var n = Object.prototype.hasOwnProperty,
        i = Object.prototype.toString;
    e.exports = function(e, t, r) {
        if ("[object Function]" !== i.call(t)) throw new TypeError("iterator must be a function");
        var s = e.length;
        if (s === +s)
            for (var o = 0; s > o; o++) t.call(r, e[o], o, e);
        else
            for (var a in e) n.call(e, a) && t.call(r, e[a], a, e)
    }
}, , , function(e, t, r) {
    "use strict";
    var n = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        i = r(425),
        s = r(426),
        o = r(422),
        a = r(427),
        l = r(428),
        c = r(429),
        u = r(430),
        h = r(431),
        p = r(432),
        d = r(433),
        f = r(434),
        m = r(435),
        g = r(436),
        v = r(437),
        y = r(438),
        b = r(441),
        w = r(439),
        _ = r(440),
        x = o.PropTypes,
        k = o.Children,
        C = i.renderToString,
        S = {},
        E = 1,
        D = o.createClass({
            displayName: "FixedDataTable",
            propTypes: {
                width: x.number.isRequired,
                height: x.number,
                maxHeight: x.number,
                ownerHeight: x.number,
                overflowX: x.oneOf(["hidden", "auto"]),
                overflowY: x.oneOf(["hidden", "auto"]),
                rowsCount: x.number.isRequired,
                rowHeight: x.number.isRequired,
                rowHeightGetter: x.func,
                rowGetter: x.func.isRequired,
                rowClassNameGetter: x.func,
                groupHeaderHeight: x.number,
                headerHeight: x.number.isRequired,
                headerDataGetter: x.func,
                footerHeight: x.number,
                footerData: x.oneOfType([x.object, x.array]),
                footerDataGetter: x.func,
                scrollLeft: x.number,
                scrollToColumn: x.number,
                scrollTop: x.number,
                scrollToRow: x.number,
                onScrollEnd: x.func,
                onContentHeightChange: x.func,
                onRowClick: x.func,
                onRowDoubleClick: x.func,
                onRowMouseDown: x.func,
                onRowMouseEnter: x.func,
                onRowMouseLeave: x.func,
                onColumnResizeEndCallback: x.func,
                isColumnResizing: x.bool
            },
            getDefaultProps: function() {
                return {
                    footerHeight: 0,
                    groupHeaderHeight: 0,
                    headerHeight: 0,
                    scrollLeft: 0,
                    scrollTop: 0
                }
            },
            getInitialState: function() {
                var e = this.props,
                    t = e.height - e.headerHeight - e.footerHeight - e.groupHeaderHeight;
                return this._scrollHelper = new d(e.rowsCount, e.rowHeight, t, e.rowHeightGetter), e.scrollTop && this._scrollHelper.scrollTo(e.scrollTop), this._didScrollStop = v(this._didScrollStop, 160, this), this._calculateState(this.props)
            },
            componentWillMount: function() {
                var e = this.props.scrollToRow;
                void 0 !== e && null !== e && (this._rowToScrollTo = e);
                var t = this.props.scrollToColumn;
                void 0 !== t && null !== t && (this._columnToScrollTo = t), this._wheelHandler = new l(this._onWheel, this._shouldHandleWheelX, this._shouldHandleWheelY)
            },
            _shouldHandleWheelX: function(e) {
                return "hidden" === this.props.overflowX ? !1 : (e = Math.round(e), 0 === e ? !1 : 0 > e && this.state.scrollX > 0 || e >= 0 && this.state.scrollX < this.state.maxScrollX)
            },
            _shouldHandleWheelY: function(e) {
                return "hidden" === this.props.overflowY || 0 === e ? !1 : (e = Math.round(e), 0 === e ? !1 : 0 > e && this.state.scrollY > 0 || e >= 0 && this.state.scrollY < this.state.maxScrollY)
            },
            _reportContentHeight: function() {
                var e, t = this.state.scrollContentHeight,
                    r = this.state.reservedHeight,
                    n = t + r,
                    i = void 0 === this.props.height;
                e = i && this.props.maxHeight > n ? n : this.state.height > n && this.props.ownerHeight ? Math.max(n, this.props.ownerHeight) : this.state.height + this.state.maxScrollY, e !== this._contentHeight && this.props.onContentHeightChange && this.props.onContentHeightChange(e), this._contentHeight = e
            },
            componentDidMount: function() {
                this._reportContentHeight()
            },
            componentWillReceiveProps: function(e) {
                var t = e.scrollToRow;
                void 0 !== t && null !== t && (this._rowToScrollTo = t);
                var r = e.scrollToColumn;
                void 0 !== r && null !== r && (this._columnToScrollTo = r);
                var n = e.overflowX,
                    i = e.overflowY;
                (n !== this.props.overflowX || i !== this.props.overflowY) && (this._wheelHandler = new l(this._onWheel, "hidden" !== n, "hidden" !== i)), this.setState(this._calculateState(e, this.state))
            },
            componentDidUpdate: function() {
                this._reportContentHeight()
            },
            render: function() {
                var e, t = this.state,
                    r = this.props;
                t.useGroupHeader && (e = o.createElement(p, {
                    key: "group_header",
                    className: g("public/fixedDataTable/header"),
                    data: t.groupHeaderData,
                    width: t.width,
                    height: t.groupHeaderHeight,
                    index: 0,
                    zIndex: 1,
                    offsetTop: 0,
                    scrollLeft: t.scrollX,
                    fixedColumns: t.groupHeaderFixedColumns,
                    scrollableColumns: t.groupHeaderScrollableColumns
                }));
                var n = this.state.maxScrollY,
                    i = t.maxScrollX > 0 && "hidden" !== t.overflowX,
                    s = n > 0 && "hidden" !== t.overflowY,
                    a = i ? c.SIZE : 0,
                    l = t.height - a - 2 * E,
                    u = t.useGroupHeader ? t.groupHeaderHeight : 0,
                    d = u + t.headerHeight,
                    f = 0,
                    m = null != r.maxHeight ? d + t.bodyHeight : l - r.footerHeight,
                    v = m + t.footerHeight;
                void 0 !== r.ownerHeight && r.ownerHeight < t.height && (f = r.ownerHeight - t.height, m = Math.min(m, l + f - t.footerHeight), l = r.ownerHeight - a);
                var y;
                s && (y = o.createElement(c, {
                    size: l,
                    contentSize: l + n,
                    onScroll: this._onVerticalScroll,
                    position: t.scrollY
                }));
                var b;
                if (i) {
                    var w = s ? c.SIZE : 0,
                        _ = t.width - w;
                    b = o.createElement(T, {
                        contentSize: _ + t.maxScrollX,
                        offset: f,
                        onScroll: this._onHorizontalScroll,
                        position: t.scrollX,
                        size: _
                    })
                }
                var x = o.createElement(h, {
                        height: t.height,
                        initialWidth: t.columnResizingData.width || 0,
                        minWidth: t.columnResizingData.minWidth || 0,
                        maxWidth: t.columnResizingData.maxWidth || Number.MAX_VALUE,
                        visible: !!t.isColumnResizing,
                        leftOffset: t.columnResizingData.left || 0,
                        knobHeight: t.headerHeight,
                        initialEvent: t.columnResizingData.initialEvent,
                        onColumnResizeEnd: r.onColumnResizeEndCallback,
                        columnKey: t.columnResizingData.key
                    }),
                    k = null;
                if (t.footerHeight) {
                    var C = r.footerDataGetter ? r.footerDataGetter() : r.footerData;
                    k = o.createElement(p, {
                        key: "footer",
                        className: g("public/fixedDataTable/footer"),
                        data: C,
                        fixedColumns: t.footFixedColumns,
                        height: t.footerHeight,
                        index: -1,
                        zIndex: 1,
                        offsetTop: m,
                        scrollableColumns: t.footScrollableColumns,
                        scrollLeft: t.scrollX,
                        width: t.width
                    })
                }
                var S, D, O = this._renderRows(d),
                    M = o.createElement(p, {
                        key: "header",
                        className: g("public/fixedDataTable/header"),
                        data: t.headData,
                        width: t.width,
                        height: t.headerHeight,
                        index: -1,
                        zIndex: 1,
                        offsetTop: u,
                        scrollLeft: t.scrollX,
                        fixedColumns: t.headFixedColumns,
                        scrollableColumns: t.headScrollableColumns,
                        onColumnResize: this._onColumnResize
                    });
                return t.scrollY && (S = o.createElement("div", {
                    className: g("fixedDataTable/topShadow"),
                    style: {
                        top: d
                    }
                })), (null != t.ownerHeight && t.ownerHeight < t.height && t.scrollContentHeight + t.reservedHeight > t.ownerHeight || t.scrollY < n) && (D = o.createElement("div", {
                    className: g("fixedDataTable/bottomShadow"),
                    style: {
                        top: m
                    }
                })), o.createElement("div", {
                    className: g("public/fixedDataTable/main"),
                    onWheel: this._wheelHandler.onWheel,
                    style: {
                        height: t.height,
                        width: t.width
                    }
                }, o.createElement("div", {
                    className: g("fixedDataTable/rowsContainer"),
                    style: {
                        height: v,
                        width: t.width
                    }
                }, x, e, M, O, k, S, D), y, b)
            },
            _renderRows: function(e) {
                var t = this.state;
                return o.createElement(u, {
                    defaultRowHeight: t.rowHeight,
                    firstRowIndex: t.firstRowIndex,
                    firstRowOffset: t.firstRowOffset,
                    fixedColumns: t.bodyFixedColumns,
                    height: t.bodyHeight,
                    offsetTop: e,
                    onRowClick: t.onRowClick,
                    onRowDoubleClick: t.onRowDoubleClick,
                    onRowMouseDown: t.onRowMouseDown,
                    onRowMouseEnter: t.onRowMouseEnter,
                    onRowMouseLeave: t.onRowMouseLeave,
                    rowClassNameGetter: t.rowClassNameGetter,
                    rowsCount: t.rowsCount,
                    rowGetter: t.rowGetter,
                    rowHeightGetter: t.rowHeightGetter,
                    scrollLeft: t.scrollX,
                    scrollableColumns: t.bodyScrollableColumns,
                    showLastRowBorder: !0,
                    width: t.width,
                    rowPositionGetter: this._scrollHelper.getRowPosition
                })
            },
            _onColumnResize: function(e, t, r, n, i, o, a) {
                s.isRTL() && (t = -t), this.setState({
                    isColumnResizing: !0,
                    columnResizingData: {
                        left: t + e - r,
                        width: r,
                        minWidth: n,
                        maxWidth: i,
                        initialEvent: {
                            clientX: a.clientX,
                            clientY: a.clientY,
                            preventDefault: y
                        },
                        key: o
                    }
                })
            },
            _areColumnSettingsIdentical: function(e, t) {
                if (e.length !== t.length) return !1;
                for (var r = 0; r < e.length; ++r)
                    if (!w(e[r].props, t[r].props)) return !1;
                return !0
            },
            _populateColumnsAndColumnData: function(e, t, r) {
                var n = !1,
                    i = !1;
                r && r.columns && (n = this._areColumnSettingsIdentical(e, r.columns)), r && r.columnGroups && t && (i = this._areColumnSettingsIdentical(t, r.columnGroups));
                var s = {};
                if (n) s.bodyFixedColumns = r.bodyFixedColumns, s.bodyScrollableColumns = r.bodyScrollableColumns, s.headFixedColumns = r.headFixedColumns, s.headScrollableColumns = r.headScrollableColumns, s.footFixedColumns = r.footFixedColumns, s.footScrollableColumns = r.footScrollableColumns;
                else {
                    var o = this._splitColumnTypes(e);
                    s.bodyFixedColumns = o.fixed, s.bodyScrollableColumns = o.scrollable;
                    var a = this._splitColumnTypes(this._createHeadColumns(e));
                    s.headFixedColumns = a.fixed, s.headScrollableColumns = a.scrollable;
                    var l = this._splitColumnTypes(this._createFootColumns(e));
                    s.footFixedColumns = l.fixed, s.footScrollableColumns = l.scrollable
                }
                if (i) s.groupHeaderFixedColumns = r.groupHeaderFixedColumns, s.groupHeaderScrollableColumns = r.groupHeaderScrollableColumns;
                else if (t) {
                    s.groupHeaderData = this._getGroupHeaderData(t), t = this._createGroupHeaderColumns(t);
                    var c = this._splitColumnTypes(t);
                    s.groupHeaderFixedColumns = c.fixed, s.groupHeaderScrollableColumns = c.scrollable
                }
                return s.headData = this._getHeadData(e), s
            },
            _calculateState: function(e, t) {
                b(void 0 !== e.height || void 0 !== e.maxHeight, "You must set either a height or a maxHeight");
                var r = [];
                k.forEach(e.children, function(e, t) {
                    null != e && (b(e.type.__TableColumnGroup__ || e.type.__TableColumn__, "child type should be <FixedDataTableColumn /> or <FixedDataTableColumnGroup />"), r.push(e))
                });
                var i = !1;
                r.length && r[0].type.__TableColumnGroup__ && (i = !0);
                var s, o, a = t && t.firstRowIndex || 0,
                    l = t && t.firstRowOffset || 0;
                s = t && "hidden" !== e.overflowX ? t.scrollX : e.scrollLeft, t && "hidden" !== e.overflowY ? o = t.scrollY : (p = this._scrollHelper.scrollTo(e.scrollTop), a = p.index, l = p.offset, o = p.position), void 0 !== this._rowToScrollTo && (p = this._scrollHelper.scrollRowIntoView(this._rowToScrollTo), a = p.index, l = p.offset, o = p.position, delete this._rowToScrollTo);
                var u = i ? e.groupHeaderHeight : 0;
                if (t && e.rowsCount !== t.rowsCount) {
                    var h = e.height - e.headerHeight - e.footerHeight - u;
                    this._scrollHelper = new d(e.rowsCount, e.rowHeight, h, e.rowHeightGetter);
                    var p = this._scrollHelper.scrollToRow(a, l);
                    a = p.index, l = p.offset, o = p.position
                } else t && e.rowHeightGetter !== t.rowHeightGetter && this._scrollHelper.setRowHeightGetter(e.rowHeightGetter);
                var m;
                m = e.isColumnResizing ? t && t.columnResizingData : S;
                var g, v;
                if (i) {
                    var y = f.adjustColumnGroupWidths(r, e.width);
                    g = y.columns, v = y.columnGroups
                } else g = f.adjustColumnWidths(r, e.width);
                var _ = this._populateColumnsAndColumnData(g, v, t);
                if (void 0 !== this._columnToScrollTo) {
                    var x = _.bodyFixedColumns.length;
                    if (this._columnToScrollTo >= x) {
                        var C, D, T = 0;
                        for (C = 0; C < _.bodyFixedColumns.length; ++C) D = _.bodyFixedColumns[C], T += D.props.width;
                        var O = this._columnToScrollTo - x,
                            M = 0;
                        for (C = 0; O > C; ++C) D = _.bodyScrollableColumns[C], M += D.props.width;
                        var N = e.width - T,
                            P = _.bodyScrollableColumns[this._columnToScrollTo - x].props.width,
                            j = M + P - N;
                        j > s && (s = j), s > M && (s = M)
                    }
                    delete this._columnToScrollTo
                }
                var R = void 0 === e.height,
                    I = R ? e.maxHeight : e.height,
                    A = e.footerHeight + e.headerHeight + u + 2 * E,
                    L = I - A,
                    H = this._scrollHelper.getContentHeight(),
                    q = H + A,
                    F = f.getTotalWidth(g),
                    z = F > e.width && "hidden" !== e.overflowX;
                z && (L -= c.SIZE, q += c.SIZE, A += c.SIZE);
                var W = Math.max(0, F - e.width),
                    Y = Math.max(0, H - L);
                s = Math.min(s, W), o = Math.min(o, Y), Y || (R && (I = q), L = q - A), this._scrollHelper.setViewportHeight(L);
                var B = n({
                    isColumnResizing: t && t.isColumnResizing
                }, _, e, {
                    columns: g,
                    columnGroups: v,
                    columnResizingData: m,
                    firstRowIndex: a,
                    firstRowOffset: l,
                    horizontalScrollbarVisible: z,
                    maxScrollX: W,
                    maxScrollY: Y,
                    reservedHeight: A,
                    scrollContentHeight: H,
                    scrollX: s,
                    scrollY: o,
                    bodyHeight: L,
                    height: I,
                    groupHeaderHeight: u,
                    useGroupHeader: i
                });
                return t && (t.headData && B.headData && w(t.headData, B.headData) && (B.headData = t.headData), t.groupHeaderData && B.groupHeaderData && w(t.groupHeaderData, B.groupHeaderData) && (B.groupHeaderData = t.groupHeaderData)), B
            },
            _createGroupHeaderColumns: function(e) {
                for (var t = [], r = 0; r < e.length; ++r) t[r] = m(e[r], {
                    dataKey: r,
                    children: void 0,
                    columnData: e[r].props.columnGroupData,
                    cellRenderer: e[r].props.groupHeaderRenderer || C,
                    isHeaderCell: !0
                });
                return t
            },
            _createHeadColumns: function(e) {
                for (var t = [], r = 0; r < e.length; ++r) {
                    var n = e[r].props;
                    t.push(m(e[r], {
                        cellRenderer: n.headerRenderer || C,
                        columnData: n.columnData,
                        dataKey: n.dataKey,
                        isHeaderCell: !0,
                        label: n.label
                    }))
                }
                return t
            },
            _createFootColumns: function(e) {
                for (var t = [], r = 0; r < e.length; ++r) {
                    var n = e[r].props;
                    t.push(m(e[r], {
                        cellRenderer: n.footerRenderer || C,
                        columnData: n.columnData,
                        dataKey: n.dataKey,
                        isFooterCell: !0
                    }))
                }
                return t
            },
            _getHeadData: function(e) {
                for (var t = {}, r = 0; r < e.length; ++r) {
                    var n = e[r].props;
                    this.props.headerDataGetter ? t[n.dataKey] = this.props.headerDataGetter(n.dataKey) : t[n.dataKey] = n.label || ""
                }
                return t
            },
            _getGroupHeaderData: function(e) {
                for (var t = [], r = 0; r < e.length; ++r) t[r] = e[r].props.label || "";
                return t
            },
            _splitColumnTypes: function(e) {
                for (var t = [], r = [], n = 0; n < e.length; ++n) e[n].props.fixed ? t.push(e[n]) : r.push(e[n]);
                return {
                    fixed: t,
                    scrollable: r
                }
            },
            _onWheel: function(e, t) {
                if (this.isMounted()) {
                    var r = this.state.scrollX;
                    if (Math.abs(t) > Math.abs(e) && "hidden" !== this.props.overflowY) {
                        var n = this._scrollHelper.scrollBy(Math.round(t)),
                            i = Math.max(0, n.contentHeight - this.state.bodyHeight);
                        this.setState({
                            firstRowIndex: n.index,
                            firstRowOffset: n.offset,
                            scrollY: n.position,
                            scrollContentHeight: n.contentHeight,
                            maxScrollY: i
                        })
                    } else e && "hidden" !== this.props.overflowX && (r += e, r = 0 > r ? 0 : r, r = r > this.state.maxScrollX ? this.state.maxScrollX : r, this.setState({
                        scrollX: r
                    }));
                    this._didScrollStop()
                }
            },
            _onHorizontalScroll: function(e) {
                this.isMounted() && e !== this.state.scrollX && (this.setState({
                    scrollX: e
                }), this._didScrollStop())
            },
            _onVerticalScroll: function(e) {
                if (this.isMounted() && e !== this.state.scrollY) {
                    var t = this._scrollHelper.scrollTo(Math.round(e));
                    this.setState({
                        firstRowIndex: t.index,
                        firstRowOffset: t.offset,
                        scrollY: t.position,
                        scrollContentHeight: t.contentHeight
                    }), this._didScrollStop()
                }
            },
            _didScrollStop: function() {
                this.isMounted() && this.props.onScrollEnd && this.props.onScrollEnd(this.state.scrollX, this.state.scrollY)
            }
        }),
        T = o.createClass({
            displayName: "HorizontalScrollbar",
            mixins: [a],
            propTypes: {
                contentSize: x.number.isRequired,
                offset: x.number.isRequired,
                onScroll: x.func.isRequired,
                position: x.number.isRequired,
                size: x.number.isRequired
            },
            render: function() {
                var e = {
                        height: c.SIZE,
                        width: this.props.size
                    },
                    t = {
                        height: c.SIZE,
                        position: "absolute",
                        overflow: "hidden",
                        width: this.props.size
                    };
                return _(t, 0, this.props.offset), o.createElement("div", {
                    className: g("fixedDataTable/horizontalScrollbar"),
                    style: e
                }, o.createElement("div", {
                    style: t
                }, o.createElement(c, n({}, this.props, {
                    isOpaque: !0,
                    orientation: "horizontal",
                    offset: void 0
                }))))
            }
        });
    e.exports = D
}, function(e, t, r) {
    "use strict";
    var n = r(422),
        i = n.PropTypes,
        s = n.createClass({
            displayName: "FixedDataTableColumn",
            statics: {
                __TableColumn__: !0
            },
            propTypes: {
                align: i.oneOf(["left", "center", "right"]),
                cellClassName: i.string,
                cellRenderer: i.func,
                cellDataGetter: i.func,
                dataKey: i.oneOfType([i.string, i.number]).isRequired,
                fixed: i.bool,
                headerRenderer: i.func,
                footerRenderer: i.func,
                columnData: i.object,
                label: i.string,
                width: i.number.isRequired,
                minWidth: i.number,
                maxWidth: i.number,
                flexGrow: i.number,
                isResizable: i.bool,
                allowCellsRecycling: i.bool
            },
            getDefaultProps: function() {
                return {
                    allowCellsRecycling: !1,
                    fixed: !1
                }
            },
            render: function() {
                return null
            }
        });
    e.exports = s
}, function(e, t, r) {
    "use strict";
    var n = r(422),
        i = n.PropTypes,
        s = n.createClass({
            displayName: "FixedDataTableColumnGroup",
            statics: {
                __TableColumnGroup__: !0
            },
            propTypes: {
                align: i.oneOf(["left", "center", "right"]),
                fixed: i.bool,
                columnGroupData: i.object,
                label: i.string,
                groupHeaderRenderer: i.func
            },
            getDefaultProps: function() {
                return {
                    fixed: !1
                }
            },
            render: function() {
                return null
            }
        });
    e.exports = s
}, , , , function(e, t, r) {
    "use strict";
    var n = r(137),
        i = {};
    i.submitFeedback = function(e) {
        return n.doPost("/api/v1/feedback/receive", {
            data: JSON.stringify(e)
        })
    }, e.exports = i
}, , , function(e, t, r) {
    "use strict";

    function n(e) {
        e || (e = "");
        var t, r = arguments.length;
        if (r > 1)
            for (var n = 1; r > n; n++) t = arguments[n], t && (e = (e ? e + " " : "") + t);
        return e
    }
    e.exports = n
}, function(e, t, r) {
    "use strict";
    var n = r(442),
        i = r(443),
        s = {
            linkState: function(e) {
                return new n(this.state[e], i.createStateKeySetter(this, e))
            }
        };
    e.exports = s
}, function(e, t, r) {
    "use strict";
    var n = r(407),
        i = {
            shouldComponentUpdate: function(e, t) {
                return !n(this.props, e) || !n(this.state, t)
            }
        };
    e.exports = i
}, , , , function(e, t, r) {
    "use strict";
    ! function() {
        function e(e) {
            this.message = e
        }
        var r = t,
            n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        e.prototype = new Error, e.prototype.name = "InvalidCharacterError", r.btoa || (r.btoa = function(t) {
            for (var r, i, s = String(t), o = 0, a = n, l = ""; s.charAt(0 | o) || (a = "=", o % 1); l += a.charAt(63 & r >> 8 - o % 1 * 8)) {
                if (i = s.charCodeAt(o += .75), i > 255) throw new e("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                r = r << 8 | i
            }
            return l
        }), r.atob || (r.atob = function(t) {
            var r = String(t).replace(/=+$/, "");
            if (r.length % 4 == 1) throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
            for (var i, s, o = 0, a = 0, l = ""; s = r.charAt(a++); ~s && (i = o % 4 ? 64 * i + s : s, o++ % 4) ? l += String.fromCharCode(255 & i >> (-2 * o & 6)) : 0) s = n.indexOf(s);
            return l
        })
    }()
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
    "use strict";
    e.exports = r(27)
}, , , function(e, t, r) {
    "use strict";

    function n(e) {
        return null === e || void 0 === e ? "" : String(e)
    }

    function i(e, t) {
        a.Children.forEach(e, function(e) {
            e.type === l ? i(e.props.children, t) : e.type === c && t(e)
        })
    }

    function s(e, t) {
        var r = [];
        return a.Children.forEach(e, function(e) {
            var n = e;
            if (e.type === l) {
                var s = !1,
                    o = [];
                i(e.props.children, function(e) {
                    var r = t(e);
                    r !== e && (s = !0), o.push(r)
                }), s && (n = u(e, {
                    key: e.key,
                    children: o
                }))
            } else e.type === c && (n = t(e));
            r.push(n)
        }), r
    }
    var o = r(426),
        a = r(422),
        l = r(365),
        c = r(364),
        u = r(435),
        h = o.isRTL() ? -1 : 1,
        p = 5,
        d = {
            DIR_SIGN: h,
            CELL_VISIBILITY_TOLERANCE: p,
            renderToString: n,
            forEachColumn: i,
            mapColumns: s
        };
    e.exports = d
}, function(e, t, r) {
    "use strict";
    var n = {
        isRTL: function() {
            return !1
        },
        getDirection: function() {
            return "LTR"
        }
    };
    e.exports = n
}, function(e, t, r) {
    "use strict";
    e.exports = r(374)
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        s = r(438),
        o = r(464),
        a = r(465),
        l = function() {
            function e(t, r, i, o) {
                n(this, e), this._animationFrameID = null, this._deltaX = 0, this._deltaY = 0, this._didWheel = this._didWheel.bind(this), "function" != typeof r && (r = r ? s.thatReturnsTrue : s.thatReturnsFalse), "function" != typeof i && (i = i ? s.thatReturnsTrue : s.thatReturnsFalse), "function" != typeof o && (o = o ? s.thatReturnsTrue : s.thatReturnsFalse), this._handleScrollX = r, this._handleScrollY = i, this._stopPropagation = o, this._onWheelCallback = t, this.onWheel = this.onWheel.bind(this)
            }
            return i(e, [{
                key: "onWheel",
                value: function(e) {
                    var t = o(e),
                        r = this._deltaX + t.pixelX,
                        n = this._deltaY + t.pixelY,
                        i = this._handleScrollX(r),
                        s = this._handleScrollY(n);
                    if (i || s) {
                        this._deltaX += i ? t.pixelX : 0, this._deltaY += s ? t.pixelY : 0, e.preventDefault();
                        var l;
                        (0 !== this._deltaX || 0 !== this._deltaY) && (this._stopPropagation() && e.stopPropagation(), l = !0), l === !0 && null === this._animationFrameID && (this._animationFrameID = a(this._didWheel))
                    }
                }
            }, {
                key: "_didWheel",
                value: function() {
                    this._animationFrameID = null, this._onWheelCallback(this._deltaX, this._deltaY), this._deltaX = 0, this._deltaY = 0
                }
            }]), e
        }();
    e.exports = l
}, function(e, t, r) {
    "use strict";
    var n = r(470),
        i = r(471),
        s = r(422),
        o = r(427),
        a = r(428),
        l = r(472),
        c = r(436),
        u = r(438),
        h = r(440),
        p = s.PropTypes,
        d = {
            position: 0,
            scrollable: !1
        },
        f = parseInt(l("scrollbar-face-margin"), 10),
        m = 2 * f,
        g = 30,
        v = 40,
        y = null,
        b = s.createClass({
            displayName: "Scrollbar",
            mixins: [o],
            propTypes: {
                contentSize: p.number.isRequired,
                defaultPosition: p.number,
                isOpaque: p.bool,
                orientation: p.oneOf(["vertical", "horizontal"]),
                onScroll: p.func,
                position: p.number,
                size: p.number.isRequired,
                trackColor: p.oneOf(["gray"]),
                zIndex: p.number
            },
            getInitialState: function() {
                var e = this.props;
                return this._calculateState(e.position || e.defaultPosition || 0, e.size, e.contentSize, e.orientation)
            },
            componentWillReceiveProps: function(e) {
                var t = e.position;
                void 0 === t ? this._setNextState(this._calculateState(this.state.position, e.size, e.contentSize, e.orientation)) : this._setNextState(this._calculateState(t, e.size, e.contentSize, e.orientation), e)
            },
            getDefaultProps: function() {
                return {
                    defaultPosition: 0,
                    isOpaque: !1,
                    onScroll: u,
                    orientation: "vertical",
                    zIndex: 99
                }
            },
            render: function() {
                if (!this.state.scrollable) return null;
                var e, t, r = this.props.size,
                    n = this.state.isHorizontal,
                    i = !n,
                    o = this.state.focused || this.state.isDragging,
                    a = this.state.faceSize,
                    u = this.props.isOpaque,
                    p = c({
                        "public/Scrollbar/main": !0,
                        "public/Scrollbar/mainHorizontal": n,
                        "public/Scrollbar/mainVertical": i,
                        "Scrollbar/mainActive": o,
                        "Scrollbar/mainOpaque": u
                    }),
                    d = c({
                        "Scrollbar/face": !0,
                        "Scrollbar/faceHorizontal": n,
                        "Scrollbar/faceVertical": i,
                        "Scrollbar/faceActive": o
                    }),
                    g = this.state.position * this.state.scale + f;
                return n ? (e = {
                    width: r
                }, t = {
                    width: a - m
                }, h(t, g, 0)) : (e = {
                    height: r
                }, t = {
                    height: a - m
                }, h(t, 0, g)), e.zIndex = this.props.zIndex, "gray" === this.props.trackColor && (e.backgroundColor = l("fbui-desktop-background-light")), s.createElement("div", {
                    onFocus: this._onFocus,
                    onBlur: this._onBlur,
                    onKeyDown: this._onKeyDown,
                    onMouseDown: this._onMouseDown,
                    onWheel: this._wheelHandler.onWheel,
                    className: p,
                    style: e,
                    tabIndex: 0
                }, s.createElement("div", {
                    ref: "face",
                    className: d,
                    style: t
                }))
            },
            componentWillMount: function() {
                var e = "horizontal" === this.props.orientation,
                    t = e ? this._onWheelX : this._onWheelY;
                this._wheelHandler = new a(t, this._shouldHandleX, this._shouldHandleY)
            },
            componentDidMount: function() {
                this._mouseMoveTracker = new n(this._onMouseMove, this._onMouseMoveEnd, document.documentElement), void 0 !== this.props.position && this.state.position !== this.props.position && this._didScroll()
            },
            componentWillUnmount: function() {
                this._nextState = null, this._mouseMoveTracker.releaseMouseMoves(), y === this && (y = null), delete this._mouseMoveTracker
            },
            scrollBy: function(e) {
                this._onWheel(e)
            },
            _shouldHandleX: function(e) {
                return "horizontal" === this.props.orientation ? this._shouldHandleChange(e) : !1
            },
            _shouldHandleY: function(e) {
                return "horizontal" !== this.props.orientation ? this._shouldHandleChange(e) : !1
            },
            _shouldHandleChange: function(e) {
                var t = this._calculateState(this.state.position + e, this.props.size, this.props.contentSize, this.props.orientation);
                return t.position !== this.state.position
            },
            _calculateState: function(e, t, r, n) {
                if (1 > t || t >= r) return d;
                var i = "" + e + "_" + t + "_" + r + "_" + n;
                if (this._stateKey === i) return this._stateForKey;
                var s = "horizontal" === n,
                    o = t / r,
                    a = Math.round(t * o);
                g > a && (o = (t - g) / (r - g), a = g);
                var l = !0,
                    c = r - t;
                0 > e ? e = 0 : e > c && (e = c);
                var u = this._mouseMoveTracker ? this._mouseMoveTracker.isDragging() : !1;
                e = Math.round(e), a = Math.round(a);
                var h = {
                    faceSize: a,
                    isDragging: u,
                    isHorizontal: s,
                    position: e,
                    scale: o,
                    scrollable: l
                };
                return this._stateKey = i, this._stateForKey = h, h
            },
            _onWheelY: function(e, t) {
                this._onWheel(t)
            },
            _onWheelX: function(e, t) {
                this._onWheel(e)
            },
            _onWheel: function(e) {
                var t = this.props;
                this._setNextState(this._calculateState(this.state.position + e, t.size, t.contentSize, t.orientation))
            },
            _onMouseDown: function(e) {
                var t;
                if (e.target !== s.findDOMNode(this.refs.face)) {
                    var r = e.nativeEvent,
                        n = this.state.isHorizontal ? r.offsetX || r.layerX : r.offsetY || r.layerY,
                        i = this.props;
                    n /= this.state.scale, t = this._calculateState(n - .5 * this.state.faceSize / this.state.scale, i.size, i.contentSize, i.orientation)
                } else t = {};
                t.focused = !0, this._setNextState(t), this._mouseMoveTracker.captureMouseMoves(e), s.findDOMNode(this).focus()
            },
            _onMouseMove: function(e, t) {
                var r = this.props,
                    n = this.state.isHorizontal ? e : t;
                n /= this.state.scale, this._setNextState(this._calculateState(this.state.position + n, r.size, r.contentSize, r.orientation))
            },
            _onMouseMoveEnd: function() {
                this._nextState = null, this._mouseMoveTracker.releaseMouseMoves(), this.setState({
                    isDragging: !1
                })
            },
            _onKeyDown: function(e) {
                var t = e.keyCode;
                if (t !== i.TAB) {
                    var r = v,
                        n = 0;
                    if (this.state.isHorizontal) switch (t) {
                        case i.HOME:
                            n = -1, r = this.props.contentSize;
                            break;
                        case i.LEFT:
                            n = -1;
                            break;
                        case i.RIGHT:
                            n = 1;
                            break;
                        default:
                            return
                    }
                    if (!this.state.isHorizontal) switch (t) {
                        case i.SPACE:
                            n = e.shiftKey ? -1 : 1;
                            break;
                        case i.HOME:
                            n = -1, r = this.props.contentSize;
                            break;
                        case i.UP:
                            n = -1;
                            break;
                        case i.DOWN:
                            n = 1;
                            break;
                        case i.PAGE_UP:
                            n = -1, r = this.props.size;
                            break;
                        case i.PAGE_DOWN:
                            n = 1, r = this.props.size;
                            break;
                        default:
                            return
                    }
                    e.preventDefault();
                    var s = this.props;
                    this._setNextState(this._calculateState(this.state.position + r * n, s.size, s.contentSize, s.orientation))
                }
            },
            _onFocus: function() {
                this.setState({
                    focused: !0
                })
            },
            _onBlur: function() {
                this.setState({
                    focused: !1
                })
            },
            _blur: function() {
                if (this.isMounted()) try {
                    this._onBlur(), s.findDOMNode(this).blur()
                } catch (e) {}
            },
            _setNextState: function(e, t) {
                t = t || this.props;
                var r = t.position,
                    n = this.state.position !== e.position;
                if (void 0 === r) {
                    var i = n ? this._didScroll : void 0;
                    this.setState(e, i)
                } else {
                    if (r !== e.position) return void(void 0 !== e.position && e.position !== this.state.position && this.props.onScroll(e.position));
                    this.setState(e)
                }
                n && y !== this && (y && y._blur(), y = this)
            },
            _didScroll: function() {
                this.props.onScroll(this.state.position)
            }
        });
    b.KEYBOARD_SCROLL_AMOUNT = v, b.SIZE = parseInt(l("scrollbar-size"), 10), e.exports = b
}, function(e, t, r) {
    "use strict";
    var n = r(422),
        i = r(466),
        s = r(432),
        o = r(436),
        a = r(438),
        l = r(467),
        c = r(440),
        u = n.PropTypes,
        h = n.createClass({
            displayName: "FixedDataTableBufferedRows",
            propTypes: {
                defaultRowHeight: u.number.isRequired,
                firstRowIndex: u.number.isRequired,
                firstRowOffset: u.number.isRequired,
                fixedColumns: u.array.isRequired,
                height: u.number.isRequired,
                offsetTop: u.number.isRequired,
                onRowClick: u.func,
                onRowDoubleClick: u.func,
                onRowMouseDown: u.func,
                onRowMouseEnter: u.func,
                onRowMouseLeave: u.func,
                rowClassNameGetter: u.func,
                rowsCount: u.number.isRequired,
                rowGetter: u.func.isRequired,
                rowHeightGetter: u.func,
                rowPositionGetter: u.func.isRequired,
                scrollLeft: u.number.isRequired,
                scrollableColumns: u.array.isRequired,
                showLastRowBorder: u.bool,
                width: u.number.isRequired
            },
            getInitialState: function() {
                return this._rowBuffer = new i(this.props.rowsCount, this.props.defaultRowHeight, this.props.height, this._getRowHeight), {
                    rowsToRender: this._rowBuffer.getRows(this.props.firstRowIndex, this.props.firstRowOffset)
                }
            },
            componentWillMount: function() {
                this._staticRowArray = []
            },
            componentDidMount: function() {
                this._bufferUpdateTimer = setTimeout(this._updateBuffer, 1e3)
            },
            componentWillReceiveProps: function(e) {
                (e.rowsCount !== this.props.rowsCount || e.defaultRowHeight !== this.props.defaultRowHeight || e.height !== this.props.height) && (this._rowBuffer = new i(e.rowsCount, e.defaultRowHeight, e.height, this._getRowHeight)), this.setState({
                    rowsToRender: this._rowBuffer.getRows(e.firstRowIndex, e.firstRowOffset)
                }), this._bufferUpdateTimer && clearTimeout(this._bufferUpdateTimer), this._bufferUpdateTimer = setTimeout(this._updateBuffer, 400)
            },
            _updateBuffer: function() {
                this._bufferUpdateTimer = null, this.isMounted() && this.setState({
                    rowsToRender: this._rowBuffer.getRowsWithUpdatedBuffer()
                })
            },
            shouldComponentUpdate: function() {
                return !0
            },
            componentWillUnmount: function() {
                this._staticRowArray.length = 0
            },
            render: function() {
                var e = this.props,
                    t = e.rowClassNameGetter || a,
                    r = e.rowGetter,
                    i = e.rowPositionGetter,
                    u = this.state.rowsToRender;
                this._staticRowArray.length = u.length;
                for (var h = 0; h < u.length; ++h) {
                    var p = u[h],
                        d = this._getRowHeight(p),
                        f = i(p),
                        m = p === e.rowsCount - 1 && e.showLastRowBorder;
                    this._staticRowArray[h] = n.createElement(s, {
                        key: h,
                        index: p,
                        data: r(p),
                        width: e.width,
                        height: d,
                        scrollLeft: Math.round(e.scrollLeft),
                        offsetTop: Math.round(f),
                        fixedColumns: e.fixedColumns,
                        scrollableColumns: e.scrollableColumns,
                        onClick: e.onRowClick,
                        onDoubleClick: e.onRowDoubleClick,
                        onMouseDown: e.onRowMouseDown,
                        onMouseEnter: e.onRowMouseEnter,
                        onMouseLeave: e.onRowMouseLeave,
                        className: l(t(p), o("public/fixedDataTable/bodyRow"), m ? o("fixedDataTable/hasBottomBorder") : null)
                    })
                }
                var g = e.rowPositionGetter(e.firstRowIndex),
                    v = {
                        position: "absolute"
                    };
                return c(v, 0, e.firstRowOffset - g + e.offsetTop), n.createElement("div", {
                    style: v
                }, this._staticRowArray)
            },
            _getRowHeight: function(e) {
                return this.props.rowHeightGetter ? this.props.rowHeightGetter(e) : this.props.defaultRowHeight
            }
        });
    e.exports = h
}, function(e, t, r) {
    "use strict";
    var n = r(470),
        i = r(426),
        s = r(422),
        o = r(427),
        a = r(469),
        l = r(436),
        c = s.PropTypes,
        u = s.createClass({
            displayName: "FixedDataTableColumnResizeHandle",
            mixins: [o],
            propTypes: {
                visible: c.bool.isRequired,
                height: c.number.isRequired,
                leftOffset: c.number.isRequired,
                knobHeight: c.number.isRequired,
                initialWidth: c.number,
                minWidth: c.number,
                maxWidth: c.number,
                initialEvent: c.object,
                onColumnResizeEnd: c.func,
                columnKey: c.oneOfType([c.string, c.number])
            },
            getInitialState: function() {
                return {
                    width: 0,
                    cursorDelta: 0
                }
            },
            componentWillReceiveProps: function(e) {
                e.initialEvent && !this._mouseMoveTracker.isDragging() && (this._mouseMoveTracker.captureMouseMoves(e.initialEvent), this.setState({
                    width: e.initialWidth,
                    cursorDelta: e.initialWidth
                }))
            },
            componentDidMount: function() {
                this._mouseMoveTracker = new n(this._onMove, this._onColumnResizeEnd, document.body)
            },
            componentWillUnmount: function() {
                this._mouseMoveTracker.releaseMouseMoves(), this._mouseMoveTracker = null
            },
            render: function() {
                var e = {
                    width: this.state.width,
                    height: this.props.height
                };
                return i.isRTL() ? e.right = this.props.leftOffset : e.left = this.props.leftOffset, s.createElement("div", {
                    className: l({
                        "fixedDataTableColumnResizerLine/main": !0,
                        "fixedDataTableColumnResizerLine/hiddenElem": !this.props.visible
                    }),
                    style: e
                }, s.createElement("div", {
                    className: l("fixedDataTableColumnResizerLine/mouseArea"),
                    style: {
                        height: this.props.height
                    }
                }))
            },
            _onMove: function(e) {
                i.isRTL() && (e = -e);
                var t = this.state.cursorDelta + e,
                    r = a(this.props.minWidth, t, this.props.maxWidth);
                this.setState({
                    width: r,
                    cursorDelta: t
                })
            },
            _onColumnResizeEnd: function() {
                this._mouseMoveTracker.releaseMouseMoves(), this.props.onColumnResizeEnd(this.state.width, this.props.columnKey)
            }
        });
    e.exports = u
}, function(e, t, r) {
    "use strict";
    var n = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        i = r(425),
        s = r(422),
        o = r(427),
        a = r(475),
        l = r(436),
        c = r(467),
        u = r(440),
        h = i.DIR_SIGN,
        p = s.PropTypes,
        d = s.createClass({
            displayName: "FixedDataTableRowImpl",
            mixins: [o],
            propTypes: {
                data: p.oneOfType([p.object, p.array]),
                fixedColumns: p.array.isRequired,
                height: p.number.isRequired,
                index: p.number.isRequired,
                scrollableColumns: p.array.isRequired,
                scrollLeft: p.number.isRequired,
                width: p.number.isRequired,
                onClick: p.func,
                onDoubleClick: p.func,
                onColumnResize: p.func
            },
            render: function() {
                var e = {
                        width: this.props.width,
                        height: this.props.height
                    },
                    t = l({
                        "public/fixedDataTableRow/main": !0,
                        "public/fixedDataTableRow/highlighted": this.props.index % 2 === 1
                    });
                if (!this.props.data) return s.createElement("div", {
                    className: c(t, this.props.className),
                    style: e
                });
                var r = this._getColumnsWidth(this.props.fixedColumns),
                    n = s.createElement(a, {
                        key: "fixed_cells",
                        height: this.props.height,
                        left: 0,
                        width: r,
                        zIndex: 2,
                        columns: this.props.fixedColumns,
                        data: this.props.data,
                        onColumnResize: this.props.onColumnResize,
                        rowHeight: this.props.height,
                        rowIndex: this.props.index
                    }),
                    i = this._renderColumnsShadow(r),
                    o = s.createElement(a, {
                        key: "scrollable_cells",
                        height: this.props.height,
                        left: this.props.scrollLeft * h,
                        offsetLeft: r * h,
                        width: this.props.width - r,
                        zIndex: 0,
                        columns: this.props.scrollableColumns,
                        data: this.props.data,
                        onColumnResize: this.props.onColumnResize,
                        rowHeight: this.props.height,
                        rowIndex: this.props.index
                    });
                return s.createElement("div", {
                    className: c(t, this.props.className),
                    onClick: this.props.onClick ? this._onClick : null,
                    onDoubleClick: this.props.onDoubleClick ? this._onDoubleClick : null,
                    onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
                    onMouseEnter: this.props.onMouseEnter ? this._onMouseEnter : null,
                    onMouseLeave: this.props.onMouseLeave ? this._onMouseLeave : null,
                    style: e
                }, s.createElement("div", {
                    className: l("fixedDataTableRow/body")
                }, n, o, i))
            },
            _getColumnsWidth: function(e) {
                for (var t = 0, r = 0; r < e.length; ++r) t += e[r].props.width;
                return t
            },
            _renderColumnsShadow: function(e) {
                if (e > 0) {
                    var t = l({
                            "fixedDataTableRow/fixedColumnsDivider": !0,
                            "fixedDataTableRow/columnsShadow": this.props.scrollLeft > 0
                        }),
                        r = {
                            left: e,
                            height: this.props.height
                        };
                    return s.createElement("div", {
                        className: t,
                        style: r
                    })
                }
            },
            _onClick: function(e) {
                this.props.onClick(e, this.props.index, this.props.data)
            },
            _onDoubleClick: function(e) {
                this.props.onDoubleClick(e, this.props.index, this.props.data)
            },
            _onMouseDown: function(e) {
                this.props.onMouseDown(e, this.props.index, this.props.data)
            },
            _onMouseEnter: function(e) {
                this.props.onMouseEnter(e, this.props.index, this.props.data)
            },
            _onMouseLeave: function(e) {
                this.props.onMouseLeave(e, this.props.index, this.props.data)
            }
        }),
        f = s.createClass({
            displayName: "FixedDataTableRow",
            mixins: [o],
            propTypes: {
                height: p.number.isRequired,
                zIndex: p.number,
                offsetTop: p.number.isRequired,
                width: p.number.isRequired
            },
            render: function() {
                var e = {
                    width: this.props.width,
                    height: this.props.height,
                    zIndex: this.props.zIndex ? this.props.zIndex : 0
                };
                return u(e, 0, this.props.offsetTop), s.createElement("div", {
                    style: e,
                    className: l("fixedDataTableRow/rowWrapper")
                }, s.createElement(d, n({}, this.props, {
                    offsetTop: void 0,
                    zIndex: void 0
                })))
            }
        });
    e.exports = f
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        s = r(468),
        o = r(469),
        a = 5,
        l = function() {
            function e(t, r, i, o) {
                n(this, e), this._rowOffsets = new s(t, r), this._storedHeights = new Array(t);
                for (var a = 0; t > a; ++a) this._storedHeights[a] = r;
                this._rowCount = t, this._position = 0, this._contentHeight = t * r, this._defaultRowHeight = r, this._rowHeightGetter = o ? o : function() {
                    return r
                }, this._viewportHeight = i, this.scrollRowIntoView = this.scrollRowIntoView.bind(this), this.setViewportHeight = this.setViewportHeight.bind(this), this.scrollBy = this.scrollBy.bind(this), this.scrollTo = this.scrollTo.bind(this), this.scrollToRow = this.scrollToRow.bind(this), this.setRowHeightGetter = this.setRowHeightGetter.bind(this), this.getContentHeight = this.getContentHeight.bind(this), this.getRowPosition = this.getRowPosition.bind(this), this._updateHeightsInViewport(0, 0)
            }
            return i(e, [{
                key: "setRowHeightGetter",
                value: function(e) {
                    this._rowHeightGetter = e
                }
            }, {
                key: "setViewportHeight",
                value: function(e) {
                    this._viewportHeight = e
                }
            }, {
                key: "getContentHeight",
                value: function() {
                    return this._contentHeight
                }
            }, {
                key: "_updateHeightsInViewport",
                value: function(e, t) {
                    for (var r = t, n = e; r <= this._viewportHeight && n < this._rowCount;) this._updateRowHeight(n), r += this._storedHeights[n], n++
                }
            }, {
                key: "_updateHeightsAboveViewport",
                value: function(e) {
                    for (var t = e - 1; t >= 0 && t >= e - a;) {
                        var r = this._updateRowHeight(t);
                        this._position += r, t--
                    }
                }
            }, {
                key: "_updateRowHeight",
                value: function(e) {
                    if (0 > e || e >= this._rowCount) return 0;
                    var t = this._rowHeightGetter(e);
                    if (t !== this._storedHeights[e]) {
                        var r = t - this._storedHeights[e];
                        return this._rowOffsets.set(e, t), this._storedHeights[e] = t, this._contentHeight += r, r
                    }
                    return 0
                }
            }, {
                key: "getRowPosition",
                value: function(e) {
                    return this._updateRowHeight(e), this._rowOffsets.get(e).value - this._rowHeightGetter(e)
                }
            }, {
                key: "scrollBy",
                value: function(e) {
                    var t = this._rowOffsets.upperBound(this._position),
                        r = t.value - this._storedHeights[t.index],
                        n = t.index,
                        i = this._position,
                        s = this._updateRowHeight(n);
                    0 !== r && (i += s);
                    var a = this._storedHeights[n] - (i - r);
                    if (e >= 0)
                        for (; e > 0 && n < this._rowCount;) a > e ? (i += e, e = 0) : (e -= a, i += a, n++), n < this._rowCount && (this._updateRowHeight(n), a = this._storedHeights[n]);
                    else if (0 > e) {
                        e = -e;
                        for (var l = this._storedHeights[n] - a; e > 0 && n >= 0;)
                            if (l > e ? (i -= e, e = 0) : (i -= l, e -= l, n--), n >= 0) {
                                var c = this._updateRowHeight(n);
                                l = this._storedHeights[n], i += c
                            }
                    }
                    var u = this._contentHeight - this._viewportHeight;
                    i = o(0, i, u), this._position = i;
                    var h = this._rowOffsets.upperBound(i),
                        p = h.index;
                    r = h.value - this._rowHeightGetter(p);
                    var d = r - i;
                    return this._updateHeightsInViewport(p, d), this._updateHeightsAboveViewport(p), {
                        index: p,
                        offset: d,
                        position: this._position,
                        contentHeight: this._contentHeight
                    }
                }
            }, {
                key: "_getRowAtEndPosition",
                value: function(e) {
                    this._updateRowHeight(e);
                    for (var t = e, r = this._storedHeights[t]; r < this._viewportHeight && t >= 0;) t--, t >= 0 && (this._updateRowHeight(t), r += this._storedHeights[t]);
                    var n = this._rowOffsets.get(e).value - this._viewportHeight;
                    return 0 > n && (n = 0), n
                }
            }, {
                key: "scrollTo",
                value: function(e) {
                    if (0 >= e) return this._position = 0, this._updateHeightsInViewport(0, 0), {
                        index: 0,
                        offset: 0,
                        position: this._position,
                        contentHeight: this._contentHeight
                    };
                    if (e >= this._contentHeight - this._viewportHeight) {
                        var t = this._rowCount - 1;
                        e = this._getRowAtEndPosition(t)
                    }
                    this._position = e;
                    var r = this._rowOffsets.upperBound(e),
                        n = Math.max(r.index, 0),
                        i = r.value - this._rowHeightGetter(n),
                        s = i - e;
                    return this._updateHeightsInViewport(n, s), this._updateHeightsAboveViewport(n), {
                        index: n,
                        offset: s,
                        position: this._position,
                        contentHeight: this._contentHeight
                    }
                }
            }, {
                key: "scrollToRow",
                value: function(e, t) {
                    e = o(0, e, this._rowCount - 1), t = o(-this._storedHeights[e], t, 0);
                    var r = this._rowOffsets.get(e);
                    return this.scrollTo(r.value - this._storedHeights[e] - t)
                }
            }, {
                key: "scrollRowIntoView",
                value: function(e) {
                    e = o(0, e, this._rowCount - 1);
                    var t = this._rowOffsets.get(e).value,
                        r = t - this._storedHeights[e];
                    if (r < this._position) return this.scrollTo(r);
                    if (t > this._position + this._viewportHeight) {
                        var n = this._getRowAtEndPosition(e);
                        return this.scrollTo(n)
                    }
                    return this.scrollTo(this._position)
                }
            }]), e
        }();
    e.exports = l
}, function(e, t, r) {
    "use strict";

    function n(e) {
        for (var t = 0, r = 0; r < e.length; ++r) t += e[r].props.width;
        return t
    }

    function i(e) {
        for (var t = 0, r = 0; r < e.length; ++r) t += e[r].props.flexGrow || 0;
        return t
    }

    function s(e, t) {
        if (0 >= t) return {
            columns: e,
            width: n(e)
        };
        for (var r = i(e), s = t, o = [], a = 0, l = 0; l < e.length; ++l) {
            var u = e[l];
            if (u.props.flexGrow) {
                var h = Math.floor(u.props.flexGrow / r * s),
                    p = Math.floor(u.props.width + h);
                a += p, r -= u.props.flexGrow, s -= h, o.push(c(u, {
                    width: p
                }))
            } else a += u.props.width, o.push(u)
        }
        return {
            columns: o,
            width: a
        }
    }

    function o(e, t) {
        var r, o = [];
        for (r = 0; r < e.length; ++r) l.Children.forEach(e[r].props.children, function(e) {
            o.push(e)
        });
        var a = n(o),
            u = i(o),
            h = Math.max(t - a, 0),
            p = [],
            d = [];
        for (r = 0; r < e.length; ++r) {
            var f = e[r],
                m = [];
            l.Children.forEach(f.props.children, function(e) {
                m.push(e)
            });
            var g = i(m),
                v = Math.floor(g / u * h),
                y = s(m, v);
            u -= g, h -= v;
            for (var b = 0; b < y.columns.length; ++b) p.push(y.columns[b]);
            d.push(c(f, {
                width: y.width
            }))
        }
        return {
            columns: p,
            columnGroups: d
        }
    }

    function a(e, t) {
        var r = n(e);
        return t > r ? s(e, t - r).columns : e
    }
    var l = r(422),
        c = r(435),
        u = {
            getTotalWidth: n,
            getTotalFlexGrow: i,
            distributeFlexWidth: s,
            adjustColumnWidths: a,
            adjustColumnGroupWidths: o
        };
    e.exports = u
}, function(e, t, r) {
    "use strict";
    e.exports = r(111)
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return o[e] ? o[e] : (o[e] = e.replace(s, "_"), o[e])
    }

    function i(e) {
        var t;
        return t = "object" == typeof e ? Object.keys(e).filter(function(t) {
            return e[t]
        }) : Array.prototype.slice.call(arguments), t.map(n).join(" ")
    }
    var s = /\//g,
        o = {};
    e.exports = i
}, function(e, t, r) {
    "use strict";

    function n(e, t, r, n, i) {
        function s() {
            for (var i = arguments.length, a = Array(i), l = 0; i > l; l++) a[l] = arguments[l];
            s.reset();
            var c = function() {
                e.apply(r, a)
            };
            c.__SMmeta = e.__SMmeta, o = n(c, t)
        }
        n = n || setTimeout, i = i || clearTimeout;
        var o;
        return s.reset = function() {
            i(o)
        }, s
    }
    e.exports = n
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return function() {
            return e
        }
    }

    function i() {}
    i.thatReturns = n, i.thatReturnsFalse = n(!1), i.thatReturnsTrue = n(!0), i.thatReturnsNull = n(null), i.thatReturnsThis = function() {
        return this
    }, i.thatReturnsArgument = function(e) {
        return e
    }, e.exports = i
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (e === t) return !0;
        if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
        var r = Object.keys(e),
            n = Object.keys(t);
        if (r.length !== n.length) return !1;
        for (var i = Object.prototype.hasOwnProperty.bind(t), s = 0; s < r.length; s++)
            if (!i(r[s]) || e[r[s]] !== t[r[s]]) return !1;
        return !0
    }
    e.exports = n
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(473),
            i = r(474),
            s = i("transform"),
            o = i("backfaceVisibility"),
            a = function() {
                if (n.hasCSSTransforms()) {
                    var e = t.window ? t.window.navigator.userAgent : "UNKNOWN",
                        r = /Safari\//.test(e) && !/Chrome\//.test(e);
                    return !r && n.hasCSS3DTransforms() ? function(e, t, r) {
                        e[s] = "translate3d(" + t + "px," + r + "px,0)", e[o] = "hidden"
                    } : function(e, t, r) {
                        e[s] = "translate(" + t + "px," + r + "px)"
                    }
                }
                return function(e, t, r) {
                    e.left = t + "px", e.top = r + "px"
                }
            }();
        e.exports = a
    }).call(t, function() {
        return this
    }())
}, function(e, t, r) {
    "use strict";
    var n = function(e, t, r, n, i, s, o, a) {
        if (!e) {
            var l;
            if (void 0 === t) l = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var c = [r, n, i, s, o, a],
                    u = 0;
                l = new Error("Invariant Violation: " + t.replace(/%s/g, function() {
                    return c[u++]
                }))
            }
            throw l.framesToPop = 1, l
        }
    };
    e.exports = n
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        this.value = e, this.requestChange = t
    }

    function i(e) {
        var t = {
            value: "undefined" == typeof e ? s.PropTypes.any.isRequired : e.isRequired,
            requestChange: s.PropTypes.func.isRequired
        };
        return s.PropTypes.shape(t)
    }
    var s = r(75);
    n.PropTypes = {
        link: i
    }, e.exports = n
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        var r = {};
        return function(n) {
            r[t] = n, e.setState(r)
        }
    }
    var i = {
        createStateSetter: function(e, t) {
            return function(r, n, i, s, o, a) {
                var l = t.call(e, r, n, i, s, o, a);
                l && e.setState(l)
            }
        },
        createStateKeySetter: function(e, t) {
            var r = e.__keySetters || (e.__keySetters = {});
            return r[t] || (r[t] = n(e, t))
        }
    };
    i.Mixin = {
        createStateSetter: function(e) {
            return i.createStateSetter(this, e)
        },
        createStateKeySetter: function(e) {
            return i.createStateKeySetter(this, e)
        }
    }, e.exports = i
}, , , , , , , , , , , , , , , , , , , , , function(e, t, r) {
    "use strict";

    function n(e) {
        var t = 0,
            r = 0,
            n = 0,
            i = 0;
        return "detail" in e && (r = e.detail), "wheelDelta" in e && (r = -e.wheelDelta / 120), "wheelDeltaY" in e && (r = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = r, r = 0), n = t * o, i = r * o, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || i) && e.deltaMode && (1 == e.deltaMode ? (n *= a, i *= a) : (n *= l, i *= l)), n && !t && (t = 1 > n ? -1 : 1), i && !r && (r = 1 > i ? -1 : 1), {
            spinX: t,
            spinY: r,
            pixelX: n,
            pixelY: i
        }
    }
    var i = r(488),
        s = r(489),
        o = 10,
        a = 40,
        l = 800;
    n.getEventType = function() {
        return i.firefox() ? "DOMMouseScroll" : s("wheel") ? "wheel" : "mousewheel"
    }, e.exports = n
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var n = r(438),
            i = r(487),
            s = 0,
            o = i || function(e) {
                var r = Date.now(),
                    n = Math.max(0, 16 - (r - s));
                return s = r + n, t.setTimeout(function() {
                    e(Date.now())
                }, n)
            };
        o(n), e.exports = o
    }).call(t, function() {
        return this
    }())
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        s = r(490),
        o = r(469),
        a = r(441),
        l = 3,
        c = 6,
        u = function() {
            function e(t, r, i, u) {
                n(this, e), a(0 !== r, "defaultRowHeight musn't be equal 0 in FixedDataTableRowBuffer"), this._bufferSet = new s, this._defaultRowHeight = r, this._viewportRowsBegin = 0, this._viewportRowsEnd = 0, this._maxVisibleRowCount = Math.ceil(i / r) + 1, this._bufferRowsCount = o(l, Math.floor(this._maxVisibleRowCount / 2), c), this._rowsCount = t, this._rowHeightGetter = u, this._rows = [], this._viewportHeight = i, this.getRows = this.getRows.bind(this), this.getRowsWithUpdatedBuffer = this.getRowsWithUpdatedBuffer.bind(this)
            }
            return i(e, [{
                key: "getRowsWithUpdatedBuffer",
                value: function() {
                    for (var e = 2 * this._bufferRowsCount, t = Math.max(this._viewportRowsBegin - this._bufferRowsCount, 0); t < this._viewportRowsBegin;) this._addRowToBuffer(t, this._viewportRowsBegin, this._viewportRowsEnd - 1), t++, e--;
                    for (t = this._viewportRowsEnd; t < this._rowsCount && e > 0;) this._addRowToBuffer(t, this._viewportRowsBegin, this._viewportRowsEnd - 1), t++, e--;
                    return this._rows
                }
            }, {
                key: "getRows",
                value: function(e, t) {
                    var r = t,
                        n = r,
                        i = e,
                        s = Math.min(e + this._maxVisibleRowCount, this._rowsCount);
                    for (this._viewportRowsBegin = e; s > i || n < this._viewportHeight && i < this._rowsCount;) this._addRowToBuffer(i, e, s - 1), n += this._rowHeightGetter(i), ++i, this._viewportRowsEnd = i;
                    return this._rows
                }
            }, {
                key: "_addRowToBuffer",
                value: function(e, t, r) {
                    var n = this._bufferSet.getValuePosition(e),
                        i = r - t + 1,
                        s = i + 2 * this._bufferRowsCount;
                    null === n && this._bufferSet.getSize() >= s && (n = this._bufferSet.replaceFurthestValuePosition(t, r, e)), null === n ? (n = this._bufferSet.getNewPositionForValue(e), this._rows[n] = e) : this._rows[n] = e
                }
            }]), e
        }();
    e.exports = u
}, function(e, t, r) {
    "use strict";

    function n(e) {
        e || (e = "");
        var t, r = arguments.length;
        if (r > 1)
            for (var n = 1; r > n; n++) t = arguments[n], t && (e = (e ? e + " " : "") + t);
        return e
    }
    e.exports = n
}, function(e, t, r) {
    (function(t) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, r, n) {
                    return r && e(t.prototype, r), n && e(t, n), t
                }
            }(),
            i = function() {
                function e(n, i) {
                    r(this, e);
                    var s = this.getInternalLeafCount(n);
                    this._leafCount = n, this._internalLeafCount = s;
                    var o = 2 * s,
                        a = t.Int32Array || this._initArray;
                    this._value = new a(o), this._initTables(i || 0),
                        this.get = this.get.bind(this), this.set = this.set.bind(this), this.lowerBound = this.lowerBound.bind(this), this.upperBound = this.upperBound.bind(this)
                }
                return n(e, [{
                    key: "getInternalLeafCount",
                    value: function(e) {
                        for (var t = 1; e > t;) t *= 2;
                        return t
                    }
                }, {
                    key: "_initArray",
                    value: function(e) {
                        for (var t = []; e > 0;) e--, t[e] = 0;
                        return t
                    }
                }, {
                    key: "_initTables",
                    value: function(e) {
                        var t, r = this._internalLeafCount,
                            n = this._internalLeafCount + this._leafCount - 1;
                        for (t = r; n >= t; ++t) this._value[t] = e;
                        var i = this._internalLeafCount - 1;
                        for (t = i; t > 0; --t) this._value[t] = this._value[2 * t] + this._value[2 * t + 1]
                    }
                }, {
                    key: "set",
                    value: function(e, t) {
                        var r = e + this._internalLeafCount;
                        for (this._value[r] = t, r = Math.floor(r / 2); 0 !== r;) this._value[r] = this._value[2 * r] + this._value[2 * r + 1], r = Math.floor(r / 2)
                    }
                }, {
                    key: "get",
                    value: function(e) {
                        e = Math.min(e, this._leafCount);
                        for (var t = e + this._internalLeafCount, r = this._value[t]; t > 1;) t % 2 === 1 && (r = this._value[t - 1] + r), t = Math.floor(t / 2);
                        return {
                            index: e,
                            value: r
                        }
                    }
                }, {
                    key: "upperBound",
                    value: function(e) {
                        var t = this._upperBoundImpl(1, 0, this._internalLeafCount - 1, e);
                        return t.index > this._leafCount - 1 && (t.index = this._leafCount - 1), t
                    }
                }, {
                    key: "lowerBound",
                    value: function(e) {
                        var t = this.upperBound(e);
                        if (t.value > e && t.index > 0) {
                            var r = t.value - this._value[this._internalLeafCount + t.index];
                            r === e && (t.value = r, t.index--)
                        }
                        return t
                    }
                }, {
                    key: "_upperBoundImpl",
                    value: function(e, t, r, n) {
                        if (t === r) return {
                            index: e - this._internalLeafCount,
                            value: this._value[e]
                        };
                        var i = Math.floor((t + r + 1) / 2);
                        if (n < this._value[2 * e]) return this._upperBoundImpl(2 * e, t, i - 1, n);
                        var s = this._upperBoundImpl(2 * e + 1, i, r, n - this._value[2 * e]);
                        return s.value += this._value[2 * e], s
                    }
                }]), e
            }();
        e.exports = i
    }).call(t, function() {
        return this
    }())
}, function(e, t, r) {
    "use strict";

    function n(e, t, r) {
        return e > t ? e : t > r ? r : t
    }
    e.exports = n
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        s = r(491),
        o = r(492),
        a = r(465),
        l = function() {
            function e(t, r, i) {
                n(this, e), this._isDragging = !1, this._animationFrameID = null, this._domNode = i, this._onMove = t, this._onMoveEnd = r, this._onMouseMove = this._onMouseMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._didMouseMove = this._didMouseMove.bind(this)
            }
            return i(e, [{
                key: "captureMouseMoves",
                value: function(e) {
                    this._eventMoveToken || this._eventUpToken || (this._eventMoveToken = s.listen(this._domNode, "mousemove", this._onMouseMove), this._eventUpToken = s.listen(this._domNode, "mouseup", this._onMouseUp)), this._isDragging || (this._deltaX = 0, this._deltaY = 0, this._isDragging = !0, this._x = e.clientX, this._y = e.clientY), e.preventDefault()
                }
            }, {
                key: "releaseMouseMoves",
                value: function() {
                    this._eventMoveToken && this._eventUpToken && (this._eventMoveToken.remove(), this._eventMoveToken = null, this._eventUpToken.remove(), this._eventUpToken = null), null !== this._animationFrameID && (o(this._animationFrameID), this._animationFrameID = null), this._isDragging && (this._isDragging = !1, this._x = null, this._y = null)
                }
            }, {
                key: "isDragging",
                value: function() {
                    return this._isDragging
                }
            }, {
                key: "_onMouseMove",
                value: function(e) {
                    var t = e.clientX,
                        r = e.clientY;
                    this._deltaX += t - this._x, this._deltaY += r - this._y, null === this._animationFrameID && (this._animationFrameID = a(this._didMouseMove)), this._x = t, this._y = r, e.preventDefault()
                }
            }, {
                key: "_didMouseMove",
                value: function() {
                    this._animationFrameID = null, this._onMove(this._deltaX, this._deltaY), this._deltaX = 0, this._deltaY = 0
                }
            }, {
                key: "_onMouseUp",
                value: function() {
                    this._animationFrameID && this._didMouseMove(), this._onMoveEnd()
                }
            }]), e
        }();
    e.exports = l
}, function(e, t, r) {
    "use strict";
    e.exports = {
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46,
        COMMA: 188,
        PERIOD: 190,
        A: 65,
        Z: 90,
        ZERO: 48,
        NUMPAD_0: 96,
        NUMPAD_9: 105
    }
}, function(e, t, r) {
    "use strict";

    function n(e) {
        if (i.hasOwnProperty(e)) return i[e];
        throw new Error('cssVar("' + e + '"): Unexpected class transformation.')
    }
    var i = {
        "scrollbar-face-active-color": "#7d7d7d",
        "scrollbar-face-color": "#c2c2c2",
        "scrollbar-face-margin": "4px",
        "scrollbar-face-radius": "6px",
        "scrollbar-size": "15px",
        "scrollbar-size-large": "17px",
        "scrollbar-track-color": "rgba(255, 255, 255, 0.8)"
    };
    n.CSS_VARS = i, e.exports = n
}, function(e, t, r) {
    "use strict";
    var n = r(474),
        i = {
            hasCSSAnimations: function() {
                return !!n("animationName")
            },
            hasCSSTransforms: function() {
                return !!n("transform")
            },
            hasCSS3DTransforms: function() {
                return !!n("perspective")
            },
            hasCSSTransitions: function() {
                return !!n("transition")
            }
        };
    e.exports = i
}, function(e, t, r) {
    "use strict";

    function n(e) {
        for (var t = 0; t < c.length; t++) {
            var r = c[t] + e;
            if (r in h) return r
        }
        return null
    }

    function i(e) {
        var t = o(e);
        if (void 0 === l[t]) {
            var r = t.charAt(0).toUpperCase() + t.slice(1);
            u.test(r) && a(!1, "getVendorPrefixedName must only be called with unprefixedCSS property names. It was called with %s", e), l[t] = t in h ? t : n(r)
        }
        return l[t]
    }
    var s = r(493),
        o = r(494),
        a = r(441),
        l = {},
        c = ["Webkit", "ms", "Moz", "O"],
        u = new RegExp("^(" + c.join("|") + ")"),
        h = s.canUseDOM ? document.createElement("div").style : {};
    e.exports = i
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        var r = {};
        for (var n in e) t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
        return r
    }
    var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        s = r(425),
        o = r(497),
        a = r(422),
        l = r(427),
        c = r(498),
        u = r(436),
        h = s.renderToString,
        p = r(440),
        d = a.PropTypes,
        f = new o({}),
        m = a.createClass({
            displayName: "FixedDataTableCellGroupImpl",
            mixins: [l],
            propTypes: {
                columns: d.array.isRequired,
                data: d.oneOfType([d.object, d.array]),
                left: d.number,
                onColumnResize: d.func,
                rowHeight: d.number.isRequired,
                rowIndex: d.number.isRequired,
                width: d.number.isRequired,
                zIndex: d.number.isRequired
            },
            render: function() {
                for (var e = this.props, t = e.columns, r = new Array(t.length), n = 0, i = 0, s = t.length; s > i; i++) {
                    var o = t[i].props;
                    if (!o.allowCellsRecycling || n - e.left <= e.width && n - e.left + o.width >= 0) {
                        var l = "cell_" + i;
                        r[i] = this._renderCell(e.data, e.rowIndex, e.rowHeight, o, n, l)
                    }
                    n += o.width
                }
                var c = this._getColumnsWidth(t),
                    h = {
                        height: e.height,
                        position: "absolute",
                        width: c,
                        zIndex: e.zIndex
                    };
                return p(h, -1 * e.left, 0), a.createElement("div", {
                    className: u("fixedDataTableCellGroup/cellGroup"),
                    style: h
                }, r)
            },
            _renderCell: function(e, t, r, n, i, s) {
                var o, l = n.cellRenderer || h,
                    u = n.columnData || f,
                    p = n.dataKey,
                    d = n.isFooterCell,
                    m = n.isHeaderCell;
                if (m || d) o = e[p];
                else {
                    var g = n.cellDataGetter;
                    o = g ? g(p, e) : e[p]
                }
                var v = n.isResizable && this.props.onColumnResize,
                    y = v ? this.props.onColumnResize : null;
                return a.createElement(c, {
                    align: n.align,
                    cellData: o,
                    cellDataKey: p,
                    cellRenderer: l,
                    className: n.cellClassName,
                    columnData: u,
                    height: r,
                    isFooterCell: d,
                    isHeaderCell: m,
                    key: s,
                    maxWidth: n.maxWidth,
                    minWidth: n.minWidth,
                    onColumnResize: y,
                    rowData: e,
                    rowIndex: t,
                    width: n.width,
                    left: i
                })
            },
            _getColumnsWidth: function(e) {
                for (var t = 0, r = 0; r < e.length; ++r) t += e[r].props.width;
                return t
            }
        }),
        g = a.createClass({
            displayName: "FixedDataTableCellGroup",
            mixins: [l],
            propTypes: {
                height: d.number.isRequired,
                offsetLeft: d.number,
                zIndex: d.number.isRequired
            },
            render: function() {
                var e = this.props,
                    t = e.offsetLeft,
                    r = n(e, ["offsetLeft"]),
                    s = {
                        height: r.height
                    };
                t && p(s, t, 0);
                var o = r.onColumnResize ? this._onColumnResize : null;
                return a.createElement("div", {
                    style: s,
                    className: u("fixedDataTableCellGroup/cellGroupWrapper")
                }, a.createElement(m, i({}, r, {
                    onColumnResize: o
                })))
            },
            _onColumnResize: function(e, t, r, n, i, s) {
                this.props.onColumnResize && this.props.onColumnResize(this.props.offsetLeft, e - this.props.left + t, t, r, n, i, s)
            }
        });
    e.exports = g
}, , , , , , , , , , , , function(e, t, r) {
    (function(t) {
        "use strict";
        var r = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame;
        e.exports = r
    }).call(t, function() {
        return this
    }())
}, function(e, t, r) {
    "use strict";

    function n() {
        if (!b) {
            b = !0;
            var e = navigator.userAgent,
                t = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e),
                r = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
            if (m = /\b(iPhone|iP[ao]d)/.exec(e), g = /\b(iP[ao]d)/.exec(e), d = /Android/i.exec(e), v = /FBAN\/\w+;/i.exec(e), y = /Mobile/i.exec(e), f = !!/Win64/.exec(e), t) {
                i = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN, i && document && document.documentMode && (i = document.documentMode);
                var n = /(?:Trident\/(\d+.\d+))/.exec(e);
                c = n ? parseFloat(n[1]) + 4 : i, s = t[2] ? parseFloat(t[2]) : NaN, o = t[3] ? parseFloat(t[3]) : NaN, a = t[4] ? parseFloat(t[4]) : NaN, a ? (t = /(?:Chrome\/(\d+\.\d+))/.exec(e), l = t && t[1] ? parseFloat(t[1]) : NaN) : l = NaN
            } else i = s = o = l = a = NaN;
            if (r) {
                if (r[1]) {
                    var w = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
                    u = w ? parseFloat(w[1].replace("_", ".")) : !0
                } else u = !1;
                h = !!r[2], p = !!r[3]
            } else u = h = p = !1
        }
    }
    var i, s, o, a, l, c, u, h, p, d, f, m, g, v, y, b = !1,
        w = {
            ie: function() {
                return n() || i
            },
            ieCompatibilityMode: function() {
                return n() || c > i
            },
            ie64: function() {
                return w.ie() && f
            },
            firefox: function() {
                return n() || s
            },
            opera: function() {
                return n() || o
            },
            webkit: function() {
                return n() || a
            },
            safari: function() {
                return w.webkit()
            },
            chrome: function() {
                return n() || l
            },
            windows: function() {
                return n() || h
            },
            osx: function() {
                return n() || u
            },
            linux: function() {
                return n() || p
            },
            iphone: function() {
                return n() || m
            },
            mobile: function() {
                return n() || m || g || d || y
            },
            nativeApp: function() {
                return n() || v
            },
            android: function() {
                return n() || d
            },
            ipad: function() {
                return n() || g
            }
        };
    e.exports = w
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!s.canUseDOM || t && !("addEventListener" in document)) return !1;
        var r = "on" + e,
            n = r in document;
        if (!n) {
            var o = document.createElement("div");
            o.setAttribute(r, "return;"), n = "function" == typeof o[r]
        }
        return !n && i && "wheel" === e && (n = document.implementation.hasFeature("Events.wheel", "3.0")), n
    }
    var i, s = r(493);
    s.canUseDOM && (i = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0), e.exports = n
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        s = r(499),
        o = r(441),
        a = function() {
            function e() {
                n(this, e), this._valueToPositionMap = {}, this._size = 0, this._smallValues = new s([], this._smallerComparator), this._largeValues = new s([], this._greaterComparator), this.getNewPositionForValue = this.getNewPositionForValue.bind(this), this.getValuePosition = this.getValuePosition.bind(this), this.getSize = this.getSize.bind(this), this.replaceFurthestValuePosition = this.replaceFurthestValuePosition.bind(this)
            }
            return i(e, [{
                key: "getSize",
                value: function() {
                    return this._size
                }
            }, {
                key: "getValuePosition",
                value: function(e) {
                    return void 0 === this._valueToPositionMap[e] ? null : this._valueToPositionMap[e]
                }
            }, {
                key: "getNewPositionForValue",
                value: function(e) {
                    o(void 0 === this._valueToPositionMap[e], "Shouldn't try to find new position for value already stored in BufferSet");
                    var t = this._size;
                    return this._size++, this._pushToHeaps(t, e), this._valueToPositionMap[e] = t, t
                }
            }, {
                key: "replaceFurthestValuePosition",
                value: function(e, t, r) {
                    if (o(void 0 === this._valueToPositionMap[r], "Shouldn't try to replace values with value already stored value in BufferSet"), this._cleanHeaps(), this._smallValues.empty() || this._largeValues.empty()) return null;
                    var n = this._smallValues.peek().value,
                        i = this._largeValues.peek().value;
                    if (n >= e && t >= i) return null;
                    var s;
                    e - n > i - t ? (s = n, this._smallValues.pop()) : (s = i, this._largeValues.pop());
                    var a = this._valueToPositionMap[s];
                    return delete this._valueToPositionMap[s], this._valueToPositionMap[r] = a, this._pushToHeaps(a, r), a
                }
            }, {
                key: "_pushToHeaps",
                value: function(e, t) {
                    var r = {
                        position: e,
                        value: t
                    };
                    this._smallValues.push(r), this._largeValues.push(r)
                }
            }, {
                key: "_cleanHeaps",
                value: function() {
                    this._cleanHeap(this._smallValues), this._cleanHeap(this._largeValues);
                    var e = Math.min(this._smallValues.size(), this._largeValues.size()),
                        t = Math.max(this._smallValues.size(), this._largeValues.size());
                    t > 10 * e && this._recreateHeaps()
                }
            }, {
                key: "_recreateHeaps",
                value: function() {
                    for (var e = this._smallValues.size() < this._largeValues.size() ? this._smallValues : this._largeValues, t = new s([], this._smallerComparator), r = new s([], this._greaterComparator); !e.empty();) {
                        var n = e.pop();
                        void 0 !== this._valueToPositionMap[n.value] && (t.push(n), r.push(n))
                    }
                    this._smallValues = t, this._largeValues = r
                }
            }, {
                key: "_cleanHeap",
                value: function(e) {
                    for (; !e.empty() && void 0 === this._valueToPositionMap[e.peek().value];) e.pop()
                }
            }, {
                key: "_smallerComparator",
                value: function(e, t) {
                    return e.value < t.value
                }
            }, {
                key: "_greaterComparator",
                value: function(e, t) {
                    return e.value > t.value
                }
            }]), e
        }();
    e.exports = a
}, function(e, t, r) {
    "use strict";
    var n = r(438),
        i = {
            listen: function(e, t, r) {
                return e.addEventListener ? (e.addEventListener(t, r, !1), {
                    remove: function() {
                        e.removeEventListener(t, r, !1)
                    }
                }) : e.attachEvent ? (e.attachEvent("on" + t, r), {
                    remove: function() {
                        e.detachEvent("on" + t, r)
                    }
                }) : void 0
            },
            capture: function(e, t, r) {
                return e.addEventListener ? (e.addEventListener(t, r, !0), {
                    remove: function() {
                        e.removeEventListener(t, r, !0)
                    }
                }) : {
                    remove: n
                }
            },
            registerDefault: function() {}
        };
    e.exports = i
}, function(e, t, r) {
    (function(t) {
        "use strict";
        var r = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || t.msCancelAnimationFrame || t.clearTimeout;
        e.exports = r
    }).call(t, function() {
        return this
    }())
}, function(e, t, r) {
    "use strict";
    var n = !("undefined" == typeof window || !window.document || !window.document.createElement),
        i = {
            canUseDOM: n,
            canUseWorkers: "undefined" != typeof Worker,
            canUseEventListeners: n && !(!window.addEventListener && !window.attachEvent),
            canUseViewport: n && !!window.screen,
            isInWorker: !n
        };
    e.exports = i
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return e.replace(i, function(e, t) {
            return t.toUpperCase()
        })
    }
    var i = /-(.)/g;
    e.exports = n
}, , , function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (e.__proto__ = t)
    }

    function s(e) {
        u(e instanceof c, "ImmutableObject: Attempted to set fields on an object that is not an instance of ImmutableValue.")
    }

    function o(e, t) {
        d(e, t);
        for (var r = {}, n = Object.keys(e), i = 0; i < n.length; i++) {
            var s = n[i];
            t.hasOwnProperty(s) ? f(e[s]) || f(t[s]) ? r[s] = t[s] : r[s] = o(e[s], t[s]) : r[s] = e[s]
        }
        var a = Object.keys(t);
        for (i = 0; i < a.length; i++) {
            var l = a[i];
            e.hasOwnProperty(l) || (r[l] = t[l])
        }
        return e instanceof c ? new g(r) : t instanceof c ? new g(r) : r
    }
    var a = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        l = function(e, t, r) {
            for (var n = !0; n;) {
                var i = e,
                    s = t,
                    o = r;
                a = c = l = void 0, n = !1;
                var a = Object.getOwnPropertyDescriptor(i, s);
                if (void 0 !== a) {
                    if ("value" in a) return a.value;
                    var l = a.get;
                    return void 0 === l ? void 0 : l.call(o)
                }
                var c = Object.getPrototypeOf(i);
                if (null === c) return void 0;
                e = c, t = s, r = o, n = !0
            }
        },
        c = r(501),
        u = r(441),
        h = r(502),
        p = r(503),
        d = p.checkMergeObjectArgs,
        f = p.isTerminal,
        m = h({
            _DONT_EVER_TYPE_THIS_SECRET_KEY: null
        }),
        g = function(e) {
            function t() {
                n(this, t), l(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, c[m]), c.mergeAllPropertiesInto(this, arguments)
            }
            return i(t, e), a(t, null, [{
                key: "create",
                value: function() {
                    var e = Object.create(t.prototype);
                    return t.apply(e, arguments), e
                }
            }, {
                key: "set",
                value: function(e, r) {
                    return s(e), u("object" == typeof r && void 0 !== r && !Array.isArray(r), "Invalid ImmutableMap.set argument `put`"), new t(e, r)
                }
            }, {
                key: "setProperty",
                value: function(e, r, n) {
                    var i = {};
                    return i[r] = n, t.set(e, i)
                }
            }, {
                key: "deleteProperty",
                value: function(e, r) {
                    var n = {};
                    for (var i in e) i !== r && e.hasOwnProperty(i) && (n[i] = e[i]);
                    return new t(n)
                }
            }, {
                key: "setDeep",
                value: function(e, t) {
                    return s(e), o(e, t)
                }
            }, {
                key: "values",
                value: function(e) {
                    return Object.keys(e).map(function(t) {
                        return e[t]
                    })
                }
            }]), t
        }(c);
    e.exports = g
}, function(e, t, r) {
    "use strict";
    var n = r(497),
        i = r(422),
        s = r(427),
        o = r(435),
        a = r(436),
        l = r(467),
        c = i.PropTypes,
        u = new n({
            align: "left",
            highlighted: !1,
            isFooterCell: !1,
            isHeaderCell: !1
        }),
        h = i.createClass({
            displayName: "FixedDataTableCell",
            mixins: [s],
            propTypes: {
                align: c.oneOf(["left", "center", "right"]),
                className: c.string,
                highlighted: c.bool,
                isFooterCell: c.bool,
                isHeaderCell: c.bool,
                width: c.number.isRequired,
                minWidth: c.number,
                maxWidth: c.number,
                height: c.number.isRequired,
                cellData: c.any,
                cellDataKey: c.oneOfType([c.string.isRequired, c.number.isRequired]),
                cellRenderer: c.func.isRequired,
                columnData: c.any,
                rowData: c.oneOfType([c.object.isRequired, c.array.isRequired]),
                rowIndex: c.number.isRequired,
                onColumnResize: c.func,
                left: c.number
            },
            getDefaultProps: function() {
                return u
            },
            render: function() {
                var e, t = this.props,
                    r = {
                        height: t.height,
                        left: t.left,
                        width: t.width
                    },
                    n = l(a({
                        "public/fixedDataTableCell/main": !0,
                        "public/fixedDataTableCell/highlighted": t.highlighted,
                        "public/fixedDataTableCell/lastChild": t.lastChild,
                        "public/fixedDataTableCell/alignRight": "right" === t.align,
                        "public/fixedDataTableCell/alignCenter": "center" === t.align
                    }), t.className);
                e = t.isHeaderCell || t.isFooterCell ? t.cellRenderer(t.cellData, t.cellDataKey, t.columnData, t.rowData, t.width) : t.cellRenderer(t.cellData, t.cellDataKey, t.rowData, t.rowIndex, t.columnData, t.width);
                var s = a("public/fixedDataTableCell/cellContent");
                e = i.isValidElement(e) ? o(e, {
                    key: e.key,
                    className: s
                }) : i.createElement("div", {
                    className: s
                }, e);
                var c;
                if (t.onColumnResize) {
                    var u = {
                        height: t.height
                    };
                    c = i.createElement("div", {
                        className: a("fixedDataTableCell/columnResizerContainer"),
                        style: u,
                        onMouseDown: this._onColumnResizerMouseDown
                    }, i.createElement("div", {
                        className: a("fixedDataTableCell/columnResizerKnob"),
                        style: u
                    }))
                }
                var h = {
                    height: t.height,
                    width: t.width
                };
                return i.createElement("div", {
                    className: n,
                    style: r
                }, c, i.createElement("div", {
                    className: a("public/fixedDataTableCell/wrap1"),
                    style: h
                }, i.createElement("div", {
                    className: a("public/fixedDataTableCell/wrap2")
                }, i.createElement("div", {
                    className: a("public/fixedDataTableCell/wrap3")
                }, e))))
            },
            _onColumnResizerMouseDown: function(e) {
                this.props.onColumnResize(this.props.left, this.props.width, this.props.minWidth, this.props.maxWidth, this.props.cellDataKey, e)
            }
        });
    e.exports = h
}, function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        return t > e
    }
    var s = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        o = function() {
            function e(t, r) {
                n(this, e), this._items = t || [], this._size = this._items.length, this._comparator = r || i, this._heapify()
            }
            return s(e, [{
                key: "empty",
                value: function() {
                    return 0 === this._size
                }
            }, {
                key: "pop",
                value: function() {
                    if (0 !== this._size) {
                        var e = this._items[0],
                            t = this._items.pop();
                        return this._size--, this._size > 0 && (this._items[0] = t, this._sinkDown(0)), e
                    }
                }
            }, {
                key: "push",
                value: function(e) {
                    this._items[this._size++] = e, this._bubbleUp(this._size - 1)
                }
            }, {
                key: "size",
                value: function() {
                    return this._size
                }
            }, {
                key: "peek",
                value: function() {
                    return 0 !== this._size ? this._items[0] : void 0
                }
            }, {
                key: "_heapify",
                value: function() {
                    for (var e = Math.floor((this._size + 1) / 2); e >= 0; e--) this._sinkDown(e)
                }
            }, {
                key: "_bubbleUp",
                value: function(e) {
                    for (var t = this._items[e]; e > 0;) {
                        var r = Math.floor((e + 1) / 2) - 1,
                            n = this._items[r];
                        if (this._comparator(n, t)) return;
                        this._items[r] = t, this._items[e] = n, e = r
                    }
                }
            }, {
                key: "_sinkDown",
                value: function(e) {
                    for (var t = this._items[e];;) {
                        var r = 2 * (e + 1) - 1,
                            n = 2 * (e + 1),
                            i = -1;
                        if (r < this._size) {
                            var s = this._items[r];
                            this._comparator(s, t) && (i = r)
                        }
                        if (n < this._size) {
                            var o = this._items[n];
                            this._comparator(o, t) && (-1 === i || this._comparator(o, this._items[i])) && (i = n)
                        }
                        if (-1 === i) return;
                        this._items[e] = this._items[i], this._items[i] = t, e = i
                    }
                }
            }]), e
        }();
    e.exports = o
}, , function(e, t, r) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var i = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        o = r(441),
        a = r(506),
        l = r(502),
        c = l({
            _DONT_EVER_TYPE_THIS_SECRET_KEY: null
        }),
        u = function() {
            function e(t) {
                n(this, e), o(t === e[c], "Only certain classes should create instances of `ImmutableValue`.You probably want something like ImmutableValueObject.create.")
            }
            return i(e, null, [{
                key: "mergeAllPropertiesInto",
                value: function(e, t) {
                    for (var r = t.length, n = 0; r > n; n++) s(e, t[n])
                }
            }, {
                key: "deepFreezeRootNode",
                value: function(t) {
                    if (!a(t)) {
                        Object.freeze(t);
                        for (var r in t) t.hasOwnProperty(r) && e.recurseDeepFreeze(t[r]);
                        Object.seal(t)
                    }
                }
            }, {
                key: "recurseDeepFreeze",
                value: function(t) {
                    if (!a(t) && e.shouldRecurseFreeze(t)) {
                        Object.freeze(t);
                        for (var r in t) t.hasOwnProperty(r) && e.recurseDeepFreeze(t[r]);
                        Object.seal(t)
                    }
                }
            }, {
                key: "shouldRecurseFreeze",
                value: function(t) {
                    return "object" == typeof t && !(t instanceof e) && null !== t
                }
            }]), e
        }();
    u._DONT_EVER_TYPE_THIS_SECRET_KEY = Math.random(), e.exports = u
}, function(e, t, r) {
    "use strict";
    var n = function(e) {
        var t;
        for (t in e)
            if (e.hasOwnProperty(t)) return t;
        return null
    };
    e.exports = n
}, function(e, t, r) {
    "use strict";
    var n = r(441),
        i = r(505),
        s = 36,
        o = function(e) {
            return "object" != typeof e || e instanceof Date || null === e
        },
        a = {
            MAX_MERGE_DEPTH: s,
            isTerminal: o,
            normalizeMergeArg: function(e) {
                return void 0 === e || null === e ? {} : e
            },
            checkMergeArrayArgs: function(e, t) {
                n(Array.isArray(e) && Array.isArray(t), "Tried to merge arrays, instead got %s and %s.", e, t)
            },
            checkMergeObjectArgs: function(e, t) {
                a.checkMergeObjectArg(e), a.checkMergeObjectArg(t)
            },
            checkMergeObjectArg: function(e) {
                n(!o(e) && !Array.isArray(e), "Tried to merge an object, instead got %s.", e)
            },
            checkMergeIntoObjectArg: function(e) {
                n(!(o(e) && "function" != typeof e || Array.isArray(e)), "Tried to merge into an object, instead got %s.", e)
            },
            checkMergeLevel: function(e) {
                n(s > e, "Maximum deep merge depth exceeded. You may be attempting to merge circular structures in an unsupported way.")
            },
            checkArrayStrategy: function(e) {
                n(void 0 === e || e in a.ArrayStrategies, "You must provide an array strategy to deep merge functions to instruct the deep merge how to resolve merging two arrays.")
            },
            ArrayStrategies: i({
                Clobber: !0,
                IndexByIndex: !0
            })
        };
    e.exports = a
}, , function(e, t, r) {
    "use strict";
    var n = r(441),
        i = function(e) {
            var t, r = {};
            n(e instanceof Object && !Array.isArray(e), "keyMirror(...): Argument must be an object.");
            for (t in e) e.hasOwnProperty(t) && (r[t] = t);
            return r
        };
    e.exports = i
}, function(e, t, r) {
    "use strict";

    function n(e) {
        return !(!e || !("function" == typeof Node ? e instanceof Node : "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName))
    }
    e.exports = n
}]);