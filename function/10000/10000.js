// version v0.0.1
// create by BlueSkyClouds
// detail url: https://github.com/BlueskyClouds/My-Actions

const exec = require('child_process').execSync
const fs = require('fs')
const download = require('download')

const $ = new Env('中国电信签到');
const notify = $.isNode() ? require('../sendNotify') : '';
// 公共变量
const KEY = process.env.TELECOM_MOBILE
const SEND_KEY = process.env.SEND_KEY
const UTC8 = new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000;

async function downFile () {
    const url = 'https://raw.githubusercontent.com/chavyleung/scripts/master/10000/10000.js'
    await download(url, './')
}

async function changeFiele () {
    let content = await fs.readFileSync('./10000.js', 'utf8')
    //替换各种无用信息.
    content = content.replace("\"\\n\"", "\"\"")
    content = content.replace("中国电信", ``)
    content = content.replace(/==============\\ud83d\\udce3\\u7cfb\\u7edf\\u901a\\u77e5\\ud83d\\udce3==============/, ``)
    content = content.replace("\\ud83d\\udd14${this.name}, \\u5f00\\u59cb!", ``)
    content = content.replace("\\ud83d\\udd14${this.name}, \\u7ed3\\u675f! \\ud83d\\udd5b ${e} \\u79d2", ``)

    content = content.replace("const phonedat = $.getdata($.KEY_mobile)", `const phonedat = '${KEY}'`)
    await fs.writeFileSync( './10000.js', content, 'utf8')
}

async function deleteFile(path) {
    // 查看文件result.txt是  否存在,如果存在,先删除
    const fileExists = await fs.existsSync(path);
    // console.log('fileExists', fileExists);
    if (fileExists) {
        const unlinkRes = await fs.unlinkSync(path);
        // console.log('unlinkRes', unlinkRes)
    }
}

async function start() {
    if (!KEY) {
        console.log('请填写电信号码后再继续')
        return
    }
    // 下载最新代码
    await downFile();
    console.log('下载代码完毕')
    // 替换变量
    await changeFiele();
    console.log('替换变量完毕')
    // 执行
    await exec("node 10000.js >> result.txt");
    console.log('执行完毕')
    const path = "./result.txt";
    let content = "";
    if (fs.existsSync(path)) {
        content = fs.readFileSync(path, "utf8");
    }

    if (content.includes("签到成功") | content.includes("已签到")) {
        console.log("电信签到-" + content)
    }else{
        await notify.sendNotify("中国电信签到-" + timeFormat(UTC8), content);
        console.log("中国电信签到-" + content)
    }

    //运行完成后，删除下载的文件
    console.log('运行完成后，删除下载的文件\n')
    await deleteFile(path);

}

start()

function timeFormat(time) {
    let date;
    if (time) {
        date = new Date(time)
    } else {
        date = new Date();
    }
    return date.getFullYear() + '年' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '月' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) + '日';
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.exists
