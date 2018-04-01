/*
* @Author: lvyufeng
* @Date:   2018-04-01 09:21:24
* @Last Modified by:   lvyufeng
* @Last Modified time: 2018-04-01 09:48:31
*/

'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
};

var _doft = {
    request: function (param) {
        // body...
        var _this = this;

        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(
                        res.data, res.msg);
                } else if (10 === res.status) {
                    _this.doLogin();
                } else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(
                        res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(
                    err.statusText);
            }
        })
    },
    //统一登录处理
    doLogin: function () {
        // body...
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //回到主页
    goHome : function () {
        window.location.href = './index.html';
    },
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },

    getUrlParam: function (name) {
        //
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },

    renderHtml: function (htmlTemplate,data) {
        //渲染html模版
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },

    //成功提示
    successTips: function (msg) {
       alert(msg || '操作成功');
    },
    //失败提示
    errorTips:function (msg) {
        alert(msg || '操作失败');
    },
    //字段验证，是否非空，手机邮箱
    validate:function (value,type) {
        var tmp_value = $.trim(value);
        if ('require' === type){
            return !!tmp_value;
        }
        //phone number validate
        if ('phone' === type){
            return /^1\d{10}$/.test(value);
        }
    }
};

module.exports = _doft;