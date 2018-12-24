"use strict";

const Koa = require("koa");
const sha1 = require("sha1");

const config = {
    wechat: {
        appID: "wxe711bb110ba84913",
        appSecret: "b9e2db6ed4669168916f0cd130f27239",
        token: "4cb0c2a99f99d19730c0e852eacc9807"
    }
};

const app = new Koa();

app.use(function* (next) {
    console.log("query", this.query);
    // 我自己生成的token
    const token = config.wechat.token;

    // 微信服务器发来的信息
    const signature = this.query.signature;
    const nonce = this.query.nonce;
    const timestamp = this.query.timestamp;
    const echostr = this.query.echostr;

    // 字典排序
    const str = [token, timestamp, nonce].sort().join("");
    // 加密
    const sha = sha1(str);

    if (sha === signature) {
        // 原样返回echostr（随机字符串）
        this.body = echostr + ""
    } else {
        // 不是从微信服务器传来的
        this.body = "YOU ARE NOT FROM WECHAT SERVER"
    }
});

app.listen(443);
console.log("Server run on port 443");
