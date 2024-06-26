/**/
const fs = require('fs');
const path = require("path");
const Config = require(__dirname + "/../config.js");
const blockJid = ['' + (process.env.BLOCKJIDS || "120363023983262391@g.us"), ...(typeof global.blockJids === "string" ? global.blockJids.split(',') : [])];
const allowJid = ["null", ...(typeof global.allowJids === "string" ? global.allowJids.split(',') : [])];
const Pino = require("pino");
const {
  Boom
} = require("@hapi/boom");
const FileType = require("file-type");
const express = require("express");
const app = express();
const events = require("./plugins");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("./exif");
let {
  default: SuhailMDConnect,
  proto,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  DisconnectReason,
  useMultiFileAuthState,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  makeInMemoryStore,
  jidDecode
} = require("@whiskeysockets/baileys");
var last_status = {};
global.setCmdAlias = {};
global.AstroOfficial = false;
global.sqldb = false;
global.pg_pools = false;
const fetch = require("node-fetch");
const axios = require("axios");
let {
  sleep,
  getBuffer,
  parsedJid,
  tiny,
  botpic,
  tlang
} = require("../lib");
const {
  smsg,
  callsg,
  groupsg
} = require("./serialized.js");
const {
  runtime,
  getSizeMedia
} = require("../lib");
var prefa = !!(!Config.HANDLERS || ["false", "null", " ", '', "nothing", "not", "empty"].includes(!Config.HANDLERS));
global.prefix = prefa ? '' : Config.HANDLERS[0];
global.prefixRegex = prefa || ["all"].includes(Config.HANDLERS) ? new RegExp('^') : new RegExp('^[' + Config.HANDLERS + ']');
global.prefixboth = ["all"].includes(Config.HANDLERS);
const connnectpg = async () => {
  try {
    const {
      Pool: _0x41b678
    } = require('pg');
    const _0x590d4e = new _0x41b678({
      'connectionString': global.DATABASE_URL,
      'ssl': {
        'rejectUnauthorized': false
      }
    });
    const _0x3cbf83 = await _0x590d4e.connect();
    _0x3cbf83.release();
    console.log("🌍 Connected to the PostgreSQL.");
    return true;
  } catch (_0x2e7cad) {
    console.log("Could not connect with PostgreSQL.\n");
    return false;
  }
};
const connnectMongo = async () => {
  const _0x2552fc = require("mongoose");
  try {
    _0x2552fc.set("strictQuery", true);
    await _0x2552fc.connect(mongodb);
    console.log("🌍 Connected to the Mongodb.");
    return true;
  } catch {
    console.log("Could not connect with Mongodb.");
    return false;
  }
};
let Suhail = {};
const store = makeInMemoryStore({
  'logger': Pino({
    'level': "silent"
  }).child({
    'level': "silent"
  })
});
try {
  if (fs.existsSync(__dirname + "/store.json")) {
    store.readFromFile(__dirname + "/store.json");
  }
} catch (_0x216201) {
  console.log("CLIENT STORE ERROR:\n", _0x216201);
}
require("events").EventEmitter.defaultMaxListeners = 2000;
async function syncdb() {
  let _0x35e502 = __dirname + "/assets/logo.png";
  try {
    global.log0 = typeof THUMB_IMAGE === "string" ? await getBuffer(THUMB_IMAGE.split(',')[0]) : fs.readFileSync(_0x35e502);
  } catch (_0x5ce9fa) {
    _0x35e502 = __dirname + "/assets/logo.png";
  }
  global.log0 = global.log0 || fs.readFileSync(_0x35e502);
  const {
    state: _0x494ec3,
    saveCreds: _0x2f2b1d
  } = await useMultiFileAuthState(__dirname + "/Sessions/");
  let _0x5b9f7e = SuhailMDConnect({
    'logger': Pino({
      'level': "silent" || "debug" || "fatal"
    }),
    'printQRInTerminal': false,
    'browser': ["Windows", "chrome", ''],
    'fireInitQueries': true,
    'shouldSyncHistoryMessage': true,
    'downloadHistory': true,
    'syncFullHistory': true,
    'generateHighQualityLinkPreview': true,
    'markOnlineOnConnect': false,
    'auth': _0x494ec3,
    'getMessage': async _0x2fd48c => {
      let _0x309c38 = {
        'conversation': "WASI-Md"
      };
      if (store) {
        const _0x719f0e = await store.loadMessage(_0x2fd48c.remoteJid, _0x2fd48c.id);
        return _0x719f0e.message || _0x309c38;
      }
      return _0x309c38;
    }
  });
  store.bind(_0x5b9f7e.ev);
  setInterval(() => {
    try {
      store.writeToFile(__dirname + "/store.json");
    } catch (_0x75a461) {
      console.log("CLIENT STORE ERROR:\n", _0x75a461);
    }
  }, 10000);
  _0x5b9f7e.ev.on("call", async _0x2fd870 => {
    let _0x18c793 = await callsg(_0x5b9f7e, JSON.parse(JSON.stringify(_0x2fd870[0])));
    events.commands.map(async _0x5db2ca => {
      if (_0x5db2ca.call === "offer" && _0x18c793.status === "offer") {
        try {
          _0x5db2ca["function"](_0x18c793, {
            'store': store,
            'Void': _0x5b9f7e
          });
        } catch (_0x458fab) {
          console.error("[CALL ERROR] ", _0x458fab);
        }
      }
      if (_0x5db2ca.call === "accept" && _0x18c793.status === "accept") {
        try {
          _0x5db2ca["function"](_0x18c793, {
            'store': store,
            'Void': _0x5b9f7e
          });
        } catch (_0x37a4bb) {
          console.error("[CALL ACCEPT ERROR] ", _0x37a4bb);
        }
      }
      if (_0x5db2ca.call === "call" || _0x5db2ca.call === 'on' || _0x5db2ca.call === "all") {
        try {
          _0x5db2ca["function"](_0x18c793, {
            'store': store,
            'Void': _0x5b9f7e
          });
        } catch (_0xc4d11f) {
          console.error("[CALL ERROR] ", _0xc4d11f);
        }
      }
    });
  });
  var _0x1d00a9 = false;
  let _0x59691e = {};
  let _0x3a53ee = {};
  _0x5b9f7e.ev.on("messages.upsert", async _0x453aca => {
    try {
      if (!_0x453aca.messages || !Array.isArray(_0x453aca.messages)) {
        return;
      }
      _0x1d00a9 = _0x1d00a9 || _0x5b9f7e.decodeJid(_0x5b9f7e.user.id);
      for (mek of _0x453aca.messages) {
        mek.message = Object.keys(mek.message || {})[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
        if (!mek.message || !mek.key || !/broadcast/gi.test(mek.key.remoteJid)) {
          continue;
        }
        let _0x2acf36 = await smsg(_0x5b9f7e, JSON.parse(JSON.stringify(mek)), store, true);
        if (!_0x2acf36.message) {
          continue;
        }
        let _0x2be57e = _0x2acf36.body;
        let _0x57a1c2 = {
          'body': _0x2be57e,
          'mek': mek,
          'text': _0x2be57e,
          'args': _0x2be57e.split(" ") || [],
          'botNumber': _0x1d00a9,
          'isCreator': _0x2acf36.isCreator,
          'store': store,
          'budy': _0x2be57e,
          'Suhail': {
            'bot': _0x5b9f7e
          },
          'Void': _0x5b9f7e,
          'proto': proto
        };
        events.commands.map(async _0x11ec99 => {
          if (typeof _0x11ec99.on === "string") {
            let _0x446aca = _0x11ec99.on.trim();
            let _0x30d5f6 = !_0x11ec99.fromMe || _0x11ec99.fromMe && _0x2acf36.fromMe;
            if (/status|story/gi.test(_0x446aca) && (_0x2acf36.jid === "status@broadcast" || mek.key.remoteJid === "status@broadcast") && _0x30d5f6) {
              _0x11ec99["function"](_0x2acf36, _0x2be57e, _0x57a1c2);
            } else if (["broadcast"].includes(_0x446aca) && (/broadcast/gi.test(mek.key.remoteJid) || _0x2acf36.broadcast || /broadcast/gi.test(_0x2acf36.from)) && _0x30d5f6) {
              _0x11ec99["function"](_0x2acf36, _0x2be57e, _0x57a1c2);
            }
          }
        });
      }
    } catch (_0x4df2dd) {
      console.log("ERROR broadCast --------- messages.upsert \n", _0x4df2dd);
    }
  });
  _0x5b9f7e.ev.on("messages.upsert", async _0x5984d1 => {
    try {
      _0x1d00a9 = _0x1d00a9 || _0x5b9f7e.decodeJid(_0x5b9f7e.user.id);
      if (!global.isStart) {
        return;
      }
      for (mek of _0x5984d1.messages) {
        if (!mek.message) {
          continue;
        }
        mek.message = Object.keys(mek.message || {})[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
        if (!mek.message || !mek.key || /broadcast/gi.test(mek.key.remoteJid)) {
          continue;
        }
        let _0x2b652f = await smsg(_0x5b9f7e, JSON.parse(JSON.stringify(mek)), store, true);
        if (!_0x2b652f.message || _0x2b652f.chat.endsWith("broadcast")) {
          continue;
        }
        var {
          body: _0x51ea03
        } = _0x2b652f;
        var _0x11785d = _0x2b652f.isCreator;
        var _0x203899 = typeof _0x2b652f.text == "string" ? _0x2b652f.text.trim() : false;
        if (_0x203899 && _0x51ea03[1] && _0x51ea03[1] == " ") {
          _0x51ea03 = _0x51ea03[0] + _0x51ea03.slice(2);
        }
        let _0xa53c3e = false;
        let _0xe8d92d = false;
        let _0x3eb7c8 = false;
        if (_0x203899 && Config.HANDLERS.toLowerCase().includes("null")) {
          _0xa53c3e = true;
          _0xe8d92d = _0x51ea03.split(" ")[0].toLowerCase() || false;
        } else if (_0x203899 && !Config.HANDLERS.toLowerCase().includes("null")) {
          _0xa53c3e = prefixboth || _0x51ea03 && prefixRegex.test(_0x51ea03[0]) || _0x2b652f.isAstro && /2348039607375|2349027862116|2348052944641/g.test(_0x1d00a9) && _0x51ea03[0] == ',';
          _0xe8d92d = _0xa53c3e ? prefa ? _0x51ea03.trim().split(" ")[0].toLowerCase() : _0x51ea03.slice(1).trim().split(" ")[0].toLowerCase() : false;
          _0x3eb7c8 = prefixboth ? _0x51ea03.trim().split(" ")[0].toLowerCase() : '';
        } else {
          _0xa53c3e = false;
        }
        let _0x5e8430 = _0xe8d92d ? _0xe8d92d.trim() : '';
        if (_0x5e8430 && global.setCmdAlias[_0x5e8430] !== undefined) {
          _0xe8d92d = global.setCmdAlias[_0x5e8430];
          _0xa53c3e = true;
        } else if (_0x2b652f.mtype == "stickerMessage") {
          _0x5e8430 = "sticker-" + _0x2b652f.msg.fileSha256;
          if (global.setCmdAlias[_0x5e8430]) {
            _0xe8d92d = global.setCmdAlias[_0x5e8430];
            _0xa53c3e = true;
          }
        }
        if (blockJid.includes(_0x2b652f.chat) && !_0x2b652f.isAstro) {
          return;
        }
        if (_0xa53c3e && (_0x2b652f.isBaileys || !_0x11785d && Config.WORKTYPE === "private" && !allowJid.includes(_0x2b652f.chat))) {
          _0xa53c3e = false;
        }
        const _0x407065 = _0x2b652f.body ? _0x51ea03.trim().split(/ +/).slice(1) : [];
        if (!_0x11785d && global.disablepm === "true" && _0xa53c3e && !_0x2b652f.isGroup) {
          _0xa53c3e = false;
        }
        if (!_0x11785d && global.disablegroup === "true" && _0xa53c3e && _0x2b652f.isGroup && !allowJid.includes(_0x2b652f.chat)) {
          _0xa53c3e = false;
        }
        Suhail.bot = _0x5b9f7e;
        if (_0xa53c3e) {
          let _0x514d7e = events.commands.find(_0x19f82b => _0x19f82b.pattern === _0xe8d92d) || events.commands.find(_0x483176 => _0x483176.alias && _0x483176.alias.includes(_0xe8d92d));
          if (!_0x514d7e && prefixboth && _0x3eb7c8) {
            _0x514d7e = events.commands.find(_0x42f670 => _0x42f670.pattern === _0x3eb7c8) || events.commands.find(_0x56d922 => _0x56d922.alias && _0x56d922.alias.includes(_0x3eb7c8));
          }
          if (_0x514d7e && _0x514d7e.fromMe && !_0x2b652f.fromMe && !_0x11785d) {
            _0x514d7e = false;
            return _0x2b652f.reply(tlang().owner);
          }
          if (_0x2b652f.isGroup && _0x514d7e && _0xe8d92d !== "bot") {
            let _0x38a2f0 = _0x59691e[_0x2b652f.chat] || (await groupdb.findOne({
              'id': _0x2b652f.chat
            })) || {
              'botenable': toBool(_0x2b652f.isAstro || !blockJid.includes(_0x2b652f.chat))
            };
            if (_0x38a2f0 && _0x38a2f0.botenable === "false") {
              _0x514d7e = false;
            }
            if (_0x514d7e && _0x38a2f0) {
              let _0xc1b39f = _0x514d7e.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              let _0x57cfe3 = new RegExp("\\b" + _0xc1b39f + "\\b");
              if (_0x38a2f0.disablecmds !== "false" && _0x57cfe3.test(_0x38a2f0.disablecmds)) {
                _0x514d7e = false;
              }
            }
          }
          if (!_0x11785d && _0x514d7e) {
            try {
              let _0x1663da = _0x3a53ee[_0x2b652f.sender] || (await userdb.findOne({
                'id': _0x2b652f.sender
              })) || {
                'ban': "false"
              };
              if (_0x1663da.ban === "true") {
                _0x514d7e = false;
                _0x2b652f.reply("*Hey " + _0x2b652f.senderName.split("\n").join("  ") + ",*\n_You are banned from using commands._");
              }
            } catch (_0x5d8e30) {
              console.log("checkban.ban", _0x5d8e30);
            }
          }
          if (_0x514d7e) {
            if (_0x514d7e.react) {
              _0x2b652f.react(_0x514d7e.react);
            }
            let _0x59b22f = _0x2b652f.body ? _0x51ea03.trim().split(/ +/).slice(1).join(" ") : '';
            let _0x26e492 = _0x514d7e.pattern;
            _0x2b652f.cmd = _0x26e492;
            try {
              _0x514d7e["function"](_0x2b652f, _0x59b22f, {
                'cmd': _0x26e492,
                'text': _0x59b22f,
                'body': _0x51ea03,
                'args': _0x407065,
                'cmdName': _0xe8d92d,
                'isCreator': _0x11785d,
                'smd': _0x26e492,
                'botNumber': _0x1d00a9,
                'budy': _0x203899,
                'store': store,
                'Suhail': Suhail,
                'Void': _0x5b9f7e
              });
            } catch (_0x5a2508) {
              console.log("[ERROR] ", _0x5a2508);
            }
          } else {
            _0xa53c3e = false;
            const _0x6be1ce = events.commands.find(_0x2ef381 => _0x2ef381.category === _0xe8d92d) || false;
            if (_0x6be1ce) {
              const _0x440602 = {};
              let _0x1f5fef = '';
              events.commands.map(async (_0x4a62fe, _0x12ab0c) => {
                if (_0x4a62fe.dontAddCommandList === false && _0x4a62fe.pattern !== undefined) {
                  if (!_0x440602[_0x4a62fe.category]) {
                    _0x440602[_0x4a62fe.category] = [];
                  }
                  _0x440602[_0x4a62fe.category].push(_0x4a62fe.pattern);
                }
              });
              for (const _0x11e4d2 in _0x440602) {
                if (_0xe8d92d == _0x11e4d2.toLowerCase()) {
                  _0x1f5fef = "┌───〈 *" + _0x11e4d2.toLowerCase() + " menu*  〉───◆\n│╭─────────────···▸\n┴│▸\n";
                  for (const _0x30f00b of _0x440602[_0x11e4d2]) {
                    _0x1f5fef += "⬡│▸ " + _0x30f00b + "\n";
                  }
                  _0x1f5fef += "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
                  break;
                }
              }
              _0x5b9f7e.sendUi(_0x2b652f.jid, {
                'caption': tiny(_0x1f5fef)
              });
            }
          }
        }
        try {
          _0x59691e[_0x2b652f.chat] = (await groupdb.findOne({
            'id': _0x2b652f.chat
          })) || (await groupdb["new"]({
            'id': _0x2b652f.chat,
            'botenable': _0x2b652f.chat === "120363023983262391@g.us" ? "false" : "true",
            'goodbye': toBool(global.gdbye),
            'welcome': toBool(global.wlcm)
          }));
          _0x3a53ee[_0x2b652f.sender] = (await userdb.findOne({
            'id': _0x2b652f.sender
          })) || (await userdb["new"]({
            'id': _0x2b652f.sender,
            'name': _0x2b652f.pushName || "Unknown"
          }));
        } catch (_0x17c28f) {
          main();
        }
        text = _0x2b652f.body;
        let _0x41ca16 = {
          'dbuser': _0x3a53ee[_0x2b652f.sender],
          'dbgroup': _0x59691e[_0x2b652f.chat],
          'body': _0x51ea03,
          'mek': mek,
          'text': text,
          'args': _0x407065,
          'botNumber': _0x1d00a9,
          'isCreator': _0x11785d,
          'icmd': _0xa53c3e,
          'store': store,
          'budy': _0x203899,
          'Suhail': Suhail,
          'Void': _0x5b9f7e,
          'proto': proto
        };
        let _0x314240 = {
          'mp4': "video",
          'mp3': "audio",
          'webp': "sticker",
          'photo': "image",
          'picture': "image",
          'vv': "viewonce"
        };
        events.commands.map(async _0x2d2d84 => {
          if (typeof _0x2d2d84.on === "string") {
            let _0x2ac8ff = _0x2d2d84.on.trim();
            let _0x41aa9d = !_0x2d2d84.fromMe || _0x2d2d84.fromMe && _0x2b652f.fromMe;
            if (_0x2ac8ff === "main" && _0x41aa9d) {
              _0x2d2d84["function"](_0x2b652f, _0x51ea03, _0x41ca16);
            } else {
              if (_0x2b652f.text && _0x2ac8ff === "text" && /text|txt|true|smd|wasi/gi.test(_0x2d2d84.quoted) && _0x2b652f.quoted && _0x2b652f.quoted.text && _0x41aa9d) {
                _0x2d2d84["function"](_0x2b652f, _0x51ea03, _0x41ca16);
              } else {
                if (_0x2b652f.text && ["body", "text"].includes(_0x2ac8ff) && _0x41aa9d) {
                  _0x2d2d84["function"](_0x2b652f, _0x51ea03, _0x41ca16);
                } else {
                  if (typeof _0x2b652f[_0x314240[_0x2ac8ff] || _0x2ac8ff] === "boolean" && _0x2b652f.quoted && _0x2b652f.quoted[_0x2d2d84.quoted] && _0x41aa9d) {
                    _0x2d2d84["function"](_0x2b652f, _0x51ea03, _0x41ca16);
                  } else {
                    if (_0x2ac8ff === "viewonce" && (_0x2b652f.viewOnce || mek.message.viewOnceMessageV2)) {
                      try {
                        _0x2d2d84["function"](_0x2b652f, _0x51ea03, _0x41ca16);
                      } catch (_0x1fdd4c) {
                        console.log("[ERROR] ", _0x1fdd4c);
                      }
                    } else if (typeof _0x2b652f[_0x314240[_0x2ac8ff] || _0x2ac8ff] === "boolean" && _0x41aa9d) {
                      _0x2d2d84["function"](_0x2b652f, _0x51ea03, _0x41ca16);
                    }
                  }
                }
              }
            }
            if (_0x2ac8ff === "delete" && _0x2b652f.mtype == "protocolMessage" && _0x2b652f.msg.type === "REVOKE" && _0x41aa9d) {
              _0x2d2d84["function"](_0x2b652f, _0x51ea03, _0x41ca16);
            } else {
              if (_0x2ac8ff === "poll" && /poll/gi.test(_0x2b652f.mtype) && _0x41aa9d) {
                _0x2d2d84["function"](_0x2b652f, _0x51ea03, _0x41ca16);
              } else if (_0x2ac8ff === "quoted" && _0x2b652f.quoted && _0x41aa9d) {
                _0x2d2d84["function"](_0x2b652f, _0x51ea03, _0x41ca16);
              }
            }
          }
        });
      }
    } catch (_0x515457) {
      console.log("client.js --------- messages.upsert \n", _0x515457);
    }
  });
  _0x5b9f7e.ev.on("group-participants.update", async _0x5f36f9 => {
    try {
      let _0xa96e6 = await groupsg(_0x5b9f7e, JSON.parse(JSON.stringify(_0x5f36f9)), true);
      if (!_0xa96e6 || !_0xa96e6.isGroup) {
        return;
      }
      events.commands.map(async _0x596c5c => {
        if (_0xa96e6.status === _0x596c5c.group) {
          try {
            _0x596c5c["function"](_0xa96e6, {
              'store': store,
              'Void': _0x5b9f7e
            });
          } catch (_0x5757dd) {
            console.error("[GROUP PARTICEPENTS ADD ERROR] ", _0x5757dd);
          }
        }
        if (/on|true|main|all|wasi|smd/gi.test(_0x596c5c.group)) {
          try {
            _0x596c5c["function"](_0xa96e6, {
              'store': store,
              'Void': _0x5b9f7e
            });
          } catch (_0x5ec4c8) {
            console.error("[GROUP PARTICEPENTS PROMOTE ERROR] ", _0x5ec4c8);
          }
        }
      });
    } catch (_0x573fa9) {
      console.log(_0x573fa9);
    }
  });
  _0x5b9f7e.ev.on("groups.update", async _0x35d917 => {
    try {
      for (const _0x3ca989 of _0x35d917) {
        if (!store.allgroup) {
          store.allgroup = {};
        }
        ;
        store.allgroup[_0x3ca989.id] = _0x3ca989;
      }
    } catch (_0xab460a) {
      console.log(_0xab460a);
    }
  });
  _0x5b9f7e.ev.on("groups.upsert", async _0x54d0f3 => {
    try {
      events.commands.map(async _0x4e23c2 => {
        if (/on|true|main|all|wasi|smd/gi.test(_0x4e23c2.groupsetting || _0x4e23c2.upsertgroup || _0x4e23c2.groupupsert)) {
          _0x4e23c2["function"]({
            ..._0x54d0f3[0],
            'bot': _0x5b9f7e
          }, {
            'store': store,
            'Void': _0x5b9f7e,
            'data': _0x54d0f3
          });
        }
      });
      await groupsg(_0x5b9f7e, JSON.parse(JSON.stringify(_0x54d0f3[0])), false, true);
    } catch (_0x3d395e) {
      console.log(_0x3d395e);
    }
  });
  _0x5b9f7e.ev.on("contacts.upsert", _0x3e0230 => {
    try {
      for (const _0x468b62 of _0x3e0230) {
        store.contacts[_0x468b62.id] = _0x468b62;
      }
    } catch (_0x1e0026) {}
  });
  _0x5b9f7e.ev.on("contacts.update", async _0x187db4 => {
    for (let _0x13353a of _0x187db4) {
      let _0x3cd0d3 = _0x5b9f7e.decodeJid(_0x13353a.id);
      if (store && store.contacts) {
        store.contacts[_0x3cd0d3] = {
          'id': _0x3cd0d3,
          'name': _0x13353a.notify
        };
      }
    }
  });
  _0x5b9f7e.serializeM = _0x102a60 => smsg(_0x5b9f7e, _0x102a60, store, false);
  _0x5b9f7e.ev.on("connection.update", async _0x3c4ef3 => {
    const {
      connection: _0x30a20c,
      lastDisconnect: _0x3fbe4f
    } = _0x3c4ef3;
    if (_0x30a20c === "connecting") {}
    if (_0x30a20c === "open") {
      if (/true|ok|sure|yes/gi.test(global.flush) || !_0x5b9f7e.authState.creds?.["myAppStateKeyId"]) {
        log("Flushing SESSION_ID" + (_0x5b9f7e.authState.creds?.["myAppStateKeyId"] ? '' : " B'Coz *myAppStateKeyId Missing") + '!');
        _0x5b9f7e.ev.flush();
      }
      let _0x2da27c = _0x5b9f7e.decodeJid(_0x5b9f7e.user.id);
      let _0x1ee028 = /2348039607375|2349027862116|2348052944641/g.test(_0x2da27c);
      let _0x385d07 = false;
      global.plugin_dir = path.join(__dirname, "../plugins/");
      if (!isMongodb && !sqldb) {
        main();
      }
      log("CONNECTED TO WHATSAPP");
      try {
        try {
          _0x385d07 = (await bot_.findOne({
            'id': "bot_" + _0x2da27c
          })) || (await bot_["new"]({
            'id': "bot_" + _0x2da27c
          }));
        } catch {
          _0x385d07 = false;
        }
        let _0x23b9b1 = [];
        let _0x3522d6 = {};
        let _0x100a89 = {};
        try {
          let {
            data: _0x2dfac1
          } = await axios.get('');
          _0x3522d6 = {
            ...(typeof _0x2dfac1.external === "object" ? _0x2dfac1.external : {}),
            ...(typeof _0x2dfac1.plugins === "object" ? _0x2dfac1.plugins : {})
          };
          _0x23b9b1 = _0x2dfac1.names;
          _0x100a89 = _0x2dfac1.extension && typeof _0x2dfac1.extension === "object" ? _0x2dfac1.extension : {};
        } catch (_0x4f3b82) {
          _0x3522d6 = {};
        }
        _0x23b9b1 = Array.isArray(_0x23b9b1) ? _0x23b9b1 : [];
        if (_0x385d07 && _0x385d07.plugins) {
          _0x3522d6 = {
            ..._0x385d07.plugins,
            ..._0x3522d6
          };
        }
        if (Object.keys(_0x3522d6 || {}).length > 0) {
          let _0x4e80e = _0x3522d6;
          for (const _0x42f3e2 in _0x4e80e) {
            try {
              let _0x41b66f = _0x4e80e[_0x42f3e2].includes("raw") ? _0x4e80e[_0x42f3e2] : _0x4e80e[_0x42f3e2] + "/raw";
              let {
                data: _0x4c40a1
              } = await axios.get(_0x41b66f);
              if (_0x4c40a1) {
                let _0x50943e = _0x42f3e2 + (_0x100a89[_0x42f3e2] && /.js|.smd|.wasi/gi.test(_0x100a89[_0x42f3e2]) ? _0x100a89[_0x42f3e2] : ".smd");
                const _0x2dc986 = plugin_dir + (_0x50943e.includes('/') ? _0x50943e.split('/')[0] : '');
                if (!fs.existsSync(_0x2dc986)) {
                  fs.mkdirSync(_0x2dc986, {
                    'recursive': true
                  });
                }
                fs.writeFileSync(plugin_dir + _0x50943e, _0x4c40a1, "utf8");
                if (!_0x23b9b1.includes(_0x42f3e2)) {
                  log(" " + _0x42f3e2 + " ✔️");
                }
              }
            } catch (_0x57acd2) {
              if (_0x1ee028 || !_0x23b9b1.includes(_0x42f3e2)) {
                log(" " + _0x42f3e2 + " ❌");
              }
            }
          }
        }
      } catch (_0x44c9fe) {
        log("❌ ERROR INSTALATION PLUGINS ", e);
      }
      await loadPlugins(plugin_dir);
      let _0x83ef9c = "👨‍💻 " + Config.botname + " RUNNING 👨‍💻\n🔰Prefix  : " + Config.HANDLERS + "\n🔰Plugins : " + events.commands.length + "\n🔰Mode    : " + Config.WORKTYPE + "\n🔰Founder : Mr Sahan Ofc\n🔰Owner: " + Config.ownername + "\n🔰Sudo: " + global.sudo + "\n🔰Welcome Msg: " + global.wlcm + "\n🔰Goodbye Msg: " + global.gdbye + "\n___________________\n⚖ KEEP USING MASTER MD ⚖\n___________________";
      try {
        const _0x205afe = require("../lib/scraper");
        let _0x42b5d2 = await _0x205afe.syncgit();
        if (_0x42b5d2.total !== 0) {
          _0x83ef9c += "\n𝗡𝗲𝘄 𝗨𝗽𝗱𝗮𝘁𝗲 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲\nRedeploy Bot as Soon as Possible!\n";
        }
      } catch (_0x47b01d) {}
      global.qr_message = {
        'message': "BOT ALREADY CONNECTED!",
        'bot_user': _0x2da27c,
        'connection': _0x83ef9c.trim()
      };
      print(_0x83ef9c);
      await _0x5b9f7e.sendMessage(_0x2da27c, {
        'text': "```" + ('' + _0x83ef9c).trim() + "```"
      }, {
        'disappearingMessagesInChat': true,
        'ephemeralExpiration': 0x2
      });
      global.isStart = true;
      events.commands.map(async _0x1f6b0a => {});
    }
    if (_0x30a20c === "close") {
      await sleep(5000);
      global.isStart = false;
      global.qr_message = {
        'message': "CONNECTION CLOSED WITH BOT!"
      };
      let _0x119da2 = new Boom(_0x3fbe4f?.["error"])?.["output"]["statusCode"];
      if (_0x119da2 === DisconnectReason.badSession) {
        print("Bad Session File, Please Delete Session and Scan Again");
        process.exit(0);
      } else {
        if (_0x119da2 === DisconnectReason.connectionClosed) {
          print("Connection closed, reconnecting....");
          syncdb()["catch"](_0x4400c4 => console.log(_0x4400c4));
        } else {
          if (_0x119da2 === DisconnectReason.connectionLost) {
            print("Connection Lost from Server, reconnecting...");
            syncdb()["catch"](_0x45a2f7 => console.log(_0x45a2f7));
          } else {
            if (_0x119da2 === DisconnectReason.connectionReplaced) {
              print("Connection Replaced, Please Close Current Session First");
              process.exit(1);
            } else {
              if (_0x119da2 === DisconnectReason.loggedOut) {
                print("Device Logged Out, Please Scan Again And Run.");
                process.exit(1);
              } else {
                if (_0x119da2 === DisconnectReason.restartRequired) {
                  print("Restart Required, Restarting...");
                  syncdb()["catch"](_0x14c8f2 => console.log(_0x14c8f2));
                } else {
                  if (_0x119da2 === DisconnectReason.timedOut) {
                    print("Connection TimedOut, Reconnecting...");
                    syncdb()["catch"](_0x45a46b => console.log(_0x45a46b));
                  } else if (_0x119da2 === DisconnectReason.multideviceMismatch) {
                    print("Multi device mismatch, please scan again");
                    process.exit(0);
                  } else {
                    print("Connection closed with bot. Please put New Session ID again.");
                    print(_0x119da2);
                    process.exit(0);
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  _0x5b9f7e.ev.on("creds.update", _0x2f2b1d);
  _0x5b9f7e.lastStatus = async () => {
    console.log("last_status :", last_status);
    return last_status;
  };
  _0x5b9f7e.decodeJid = _0x1e6435 => {
    if (!_0x1e6435) {
      return _0x1e6435;
    }
    if (/:\d+@/gi.test(_0x1e6435)) {
      let _0x33422d = jidDecode(_0x1e6435) || {};
      return _0x33422d.user && _0x33422d.server && _0x33422d.user + '@' + _0x33422d.server || _0x1e6435;
    } else {
      return _0x1e6435;
    }
  };
  _0x5b9f7e.getName = (_0x343550, _0x73840 = false) => {
    let _0x5ed7e9 = _0x5b9f7e.decodeJid(_0x343550);
    let _0x4b357b;
    let _0x3218e2 = '+' + _0x343550.replace("@s.whatsapp.net", '');
    if (_0x5ed7e9.endsWith("@g.us")) {
      return new Promise(async _0x42b108 => {
        _0x4b357b = store.contacts[_0x5ed7e9] || {};
        if (!_0x4b357b.name?.["notify"] && !_0x4b357b.subject) {
          try {
            _0x4b357b = (await _0x5b9f7e.groupMetadata(_0x5ed7e9)) || {};
          } catch (_0x4a5c77) {}
        }
        _0x42b108(_0x4b357b.subject || _0x4b357b.name || _0x3218e2);
      });
    } else {
      _0x4b357b = _0x5ed7e9 === "0@s.whatsapp.net" ? {
        'id': _0x5ed7e9,
        'name': "WhatsApp"
      } : _0x5ed7e9 === _0x5b9f7e.decodeJid(_0x5b9f7e.user.id) ? _0x5b9f7e.user : store.contacts[_0x5ed7e9] || {};
    }
    return _0x4b357b.name || _0x4b357b.subject || _0x4b357b.verifiedName ? _0x4b357b.name || _0x4b357b.subject || _0x4b357b.verifiedName || _0x3218e2 : userdb.findOne({
      'id': _0x5ed7e9
    }).then(_0x3df2ca => _0x3df2ca.name || _0x3218e2)["catch"](_0x44284a => {
      _0x3218e2;
    });
  };
  _0x5b9f7e.sendContact = async (_0x5eea77, _0x3466c1, _0x182be5 = '', _0x32ec6d = {}) => {
    let _0x3ccacd = [];
    for (let _0x5eaef9 of _0x3466c1) {
      _0x3ccacd.push({
        'displayName': await _0x5b9f7e.getName(_0x5eaef9 + "@s.whatsapp.net"),
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:" + (await _0x5b9f7e.getName(_0x5eaef9 + "@s.whatsapp.net")) + "\nFN:" + global.OwnerName + "\nitem1.TEL;waid=" + _0x5eaef9 + ':' + _0x5eaef9 + "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" + global.email + "\nitem2.X-ABLabel:GitHub\nitem3.URL:" + global.github + "\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" + global.location + ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
      });
    }
    return _0x5b9f7e.sendMessage(_0x5eea77, {
      'contacts': {
        'displayName': _0x3ccacd.length + " Contact",
        'contacts': _0x3ccacd
      },
      ..._0x32ec6d
    }, {
      'quoted': _0x182be5
    });
  };
  _0x5b9f7e.setStatus = _0x5b5573 => {
    _0x5b9f7e.query({
      'tag': 'iq',
      'attrs': {
        'to': "@s.whatsapp.net",
        'type': "set",
        'xmlns': "status"
      },
      'content': [{
        'tag': "status",
        'attrs': {},
        'content': Buffer.from(_0x5b5573, "utf-8")
      }]
    });
    return _0x5b5573;
  };
  _0x5b9f7e.messageId = (_0x443f16 = 8, _0x4f75ba = "SUHAILMD") => {
    for (let _0x1584da = 0; _0x1584da < _0x443f16; _0x1584da++) {
      const _0x3552c9 = Math.floor(Math.random() * "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".length);
      _0x4f75ba += "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".charAt(_0x3552c9);
    }
    return _0x4f75ba;
  };
  _0x5b9f7e.send5ButImg = async (_0x42e3e3, _0x4be4d2 = '', _0x366fc9 = '', _0x558c28, _0x5b5fc9 = [], _0x9ae3b6, _0x39e2a7 = {}) => {
    let _0x3c58bf = await prepareWAMessageMedia({
      'image': _0x558c28,
      'jpegThumbnail': _0x9ae3b6
    }, {
      'upload': _0x5b9f7e.waUploadToServer
    });
    var _0x5837a4 = generateWAMessageFromContent(_0x42e3e3, proto.Message.fromObject({
      'templateMessage': {
        'hydratedTemplate': {
          'imageMessage': _0x3c58bf.imageMessage,
          'hydratedContentText': _0x4be4d2,
          'hydratedFooterText': _0x366fc9,
          'hydratedButtons': _0x5b5fc9
        }
      }
    }), _0x39e2a7);
    _0x5b9f7e.relayMessage(_0x42e3e3, _0x5837a4.message, {
      'messageId': _0x5b9f7e.messageId()
    });
  };
  _0x5b9f7e.sendButtonText = (_0x214f14, _0x6168e9 = [], _0x2fc580, _0xf3ae4b, _0x3db253 = '', _0x5555a6 = {}) => {
    let _0xb87800 = {
      'text': _0x2fc580,
      'footer': _0xf3ae4b,
      'buttons': _0x6168e9,
      'headerType': 0x2,
      ..._0x5555a6
    };
    _0x5b9f7e.sendMessage(_0x214f14, _0xb87800, {
      'quoted': _0x3db253,
      ..._0x5555a6
    });
  };
  _0x5b9f7e.sendText = (_0x143a8a, _0x4dad06, _0x433f47 = '', _0x1d0f4e) => _0x5b9f7e.sendMessage(_0x143a8a, {
    'text': _0x4dad06,
    ..._0x1d0f4e
  }, {
    'quoted': _0x433f47
  });
  _0x5b9f7e.sendImage = async (_0xe77779, _0x6d7056, _0x3b59a0 = '', _0x487bb8 = '', _0x208937) => {
    let _0x5f316d = Buffer.isBuffer(_0x6d7056) ? _0x6d7056 : /^data:.*?\/.*?;base64,/i.test(_0x6d7056) ? Buffer.from(_0x6d7056.split`,`[1], "base64") : /^https?:\/\//.test(_0x6d7056) ? await await getBuffer(_0x6d7056) : fs.existsSync(_0x6d7056) ? fs.readFileSync(_0x6d7056) : Buffer.alloc(0);
    return await _0x5b9f7e.sendMessage(_0xe77779, {
      'image': _0x5f316d,
      'caption': _0x3b59a0,
      ..._0x208937
    }, {
      'quoted': _0x487bb8
    });
  };
  _0x5b9f7e.sendTextWithMentions = async (_0x1e9cac, _0x462c20, _0x3cd60d, _0x36094d = {}) => _0x5b9f7e.sendMessage(_0x1e9cac, {
    'text': _0x462c20,
    'contextInfo': {
      'mentionedJid': [..._0x462c20.matchAll(/@(\d{0,16})/g)].map(_0x1a9f5f => _0x1a9f5f[1] + "@s.whatsapp.net")
    },
    ..._0x36094d
  }, {
    'quoted': _0x3cd60d
  });
  _0x5b9f7e.sendImageAsSticker = async (_0x479d38, _0x1ea6af, _0x2db200 = {}) => {
    let _0x219df9;
    if (_0x2db200 && (_0x2db200.packname || _0x2db200.author)) {
      _0x219df9 = await writeExifImg(_0x1ea6af, _0x2db200);
    } else {
      _0x219df9 = await imageToWebp(_0x1ea6af);
    }
    await _0x5b9f7e.sendMessage(_0x479d38, {
      'sticker': {
        'url': _0x219df9
      },
      ..._0x2db200
    }, _0x2db200);
  };
  _0x5b9f7e.sendVideoAsSticker = async (_0x579ddd, _0x452343, _0x365a00 = {}) => {
    let _0x4b77d6;
    if (_0x365a00 && (_0x365a00.packname || _0x365a00.author)) {
      _0x4b77d6 = await writeExifVid(_0x452343, _0x365a00);
    } else {
      _0x4b77d6 = await videoToWebp(_0x452343);
    }
    await _0x5b9f7e.sendMessage(_0x579ddd, {
      'sticker': {
        'url': _0x4b77d6
      },
      ..._0x365a00
    }, _0x365a00);
  };
  _0x5b9f7e.sendMedia = async (_0x29644d, _0x4c93af, _0x3fda00 = '', _0x172d6a = '', _0x56f720 = '', _0x36e196 = {}) => {
    if (_0x3a84c4 && _0x3a84c4.status !== 200 || file.length <= 65536) {
      try {
        throw {
          'json': JSON.parse(file.toString())
        };
      } catch (_0x3dfdd9) {
        if (_0x3dfdd9.json) {
          throw _0x3dfdd9.json;
        }
      }
    }
    let _0x48043e = '';
    let _0x3e5a5f = _0x3737cb;
    let _0x450cdf = _0x191bd9;
    if (_0x36e196.asDocument) {
      _0x48043e = "document";
    }
    if (_0x36e196.asSticker || /webp/.test(_0x3737cb)) {
      let {
        writeExif: _0x162e50
      } = require("./exif");
      let _0x5479f9 = {
        'mimetype': _0x3737cb,
        'data': _0x103d2d
      };
      _0x450cdf = await _0x162e50(_0x5479f9, {
        'packname': _0x36e196.packname ? _0x36e196.packname : Config.packname,
        'author': _0x36e196.author ? _0x36e196.author : Config.author,
        'categories': _0x36e196.categories ? _0x36e196.categories : []
      });
      await fs.promises.unlink(_0x191bd9);
      _0x48043e = "sticker";
      _0x3e5a5f = "image/webp";
    } else {
      if (/image/.test(_0x3737cb)) {
        _0x48043e = "image";
      } else {
        if (/video/.test(_0x3737cb)) {
          _0x48043e = "video";
        } else if (/audio/.test(_0x3737cb)) {
          _0x48043e = "audio";
        } else {
          _0x48043e = "document";
        }
      }
    }
    await _0x5b9f7e.sendMessage(_0x29644d, {
      [_0x48043e]: {
        'url': _0x450cdf
      },
      'caption': _0x172d6a,
      'mimetype': _0x3e5a5f,
      'fileName': _0x3fda00,
      ..._0x36e196
    }, {
      'quoted': _0x56f720,
      ..._0x36e196
    });
    return fs.promises.unlink(_0x450cdf);
  };
  _0x5b9f7e.downloadAndSaveMediaMessage = async (_0x5e2dff, _0x5e3f6f = "null", _0x4a6ae9 = false, _0x3eb940 = true) => {
    let _0x344aa8 = _0x5e2dff.msg ? _0x5e2dff.msg : _0x5e2dff;
    let _0x372510 = _0x344aa8.mimetype || '';
    let _0x5bb5da = _0x5e2dff.mtype ? _0x5e2dff.mtype.split(/Message/gi)[0] : _0x344aa8.mtype ? _0x344aa8.mtype.split(/Message/gi)[0] : _0x372510.split('/')[0];
    const _0x4f7434 = await downloadContentFromMessage(_0x344aa8, _0x5bb5da);
    let _0x3e4fd5 = Buffer.from([]);
    for await (const _0x1dea7a of _0x4f7434) {
      _0x3e4fd5 = Buffer.concat([_0x3e4fd5, _0x1dea7a]);
    }
    if (_0x4a6ae9) {
      return _0x3e4fd5;
    }
    let _0xdb77cb = await FileType.fromBuffer(_0x3e4fd5);
    let _0x431328 = "./temp/" + _0x5e3f6f + '.' + _0xdb77cb.ext;
    fs.writeFileSync(_0x431328, _0x3e4fd5);
    return _0x431328;
  };
  _0x5b9f7e.forward = async (_0x5ac883, _0x12c931, _0x37013b, _0x29e517, _0x222487 = true) => {
    try {
      let _0x589eff = _0x12c931.mtype;
      let _0x2068ed = {};
      console.log("Forward function Called and Type is : ", _0x589eff);
      if (_0x589eff == "conversation") {
        _0x2068ed = {
          'text': _0x12c931.text,
          'contextInfo': _0x37013b
        };
        for (let _0x2cf792 of parsedJid(_0x5ac883)) {
          await _0x5b9f7e.sendMessage(_0x2cf792, _0x2068ed, {
            'quoted': _0x29e517,
            'messageId': _0x5b9f7e.messageId()
          });
        }
        return;
      }
      let _0x56b7af = _0x12c931.msg ? _0x12c931.msg : _0x12c931;
      let _0x21d1ca = (_0x12c931.msg || _0x12c931).mimetype || '';
      let _0x210253 = _0x12c931.mtype ? _0x12c931.mtype.replace(/Message/gi, '') : _0x21d1ca.split('/')[0];
      const _0x133dde = await downloadContentFromMessage(_0x56b7af, _0x210253);
      let _0x5a9337 = Buffer.from([]);
      for await (const _0x4112dd of _0x133dde) {
        _0x5a9337 = Buffer.concat([_0x5a9337, _0x4112dd]);
      }
      let _0x1cf5b = await FileType.fromBuffer(_0x5a9337);
      let _0x229c97 = await ('' + Math.floor(Math.random() * 10000) + _0x1cf5b.ext);
      let _0x5d6ac9 = "./temp/" + _0x229c97;
      fs.writeFileSync(_0x5d6ac9, _0x5a9337);
      if (_0x589eff == "videoMessage") {
        _0x2068ed = {
          'video': fs.readFileSync(_0x5d6ac9),
          'mimetype': _0x12c931.mimetype,
          'caption': _0x12c931.text,
          'contextInfo': _0x37013b
        };
      } else {
        if (_0x589eff == "imageMessage") {
          _0x2068ed = {
            'image': fs.readFileSync(_0x5d6ac9),
            'mimetype': _0x12c931.mimetype,
            'caption': _0x12c931.text,
            'contextInfo': _0x37013b
          };
        } else {
          if (_0x589eff == "audioMessage") {
            _0x2068ed = {
              'audio': fs.readFileSync(_0x5d6ac9),
              'mimetype': _0x12c931.mimetype,
              'seconds': 0xbebc74b,
              'ptt': true,
              'contextInfo': _0x37013b
            };
          } else if (_0x589eff == "documentWithCaptionMessage" || _0x1cf5b == "documentMessage") {
            _0x2068ed = {
              'document': fs.readFileSync(_0x5d6ac9),
              'mimetype': _0x12c931.mimetype,
              'caption': _0x12c931.text,
              'contextInfo': _0x37013b
            };
          } else {
            fs.unlink(_0x5d6ac9, _0x5adf49 => {
              if (_0x5adf49) {
                console.error("Error deleting file:", _0x5adf49);
              } else {
                console.log("File deleted successfully");
              }
            });
          }
        }
      }
      for (let _0x17eb36 of parsedJid(_0x5ac883)) {
        try {
          await _0x5b9f7e.sendMessage(_0x17eb36, _0x2068ed, {
            'quoted': _0x29e517,
            'messageId': _0x5b9f7e.messageId()
          });
        } catch (_0x44d142) {}
      }
      return fs.unlink(_0x5d6ac9, _0x4b3241 => {
        if (_0x4b3241) {
          console.error("Error deleting file:", _0x4b3241);
        } else {
          console.log("File deleted successfully");
        }
      });
    } catch (_0x423f92) {
      console.log(_0x423f92);
    }
  };
  _0x5b9f7e.downloadMediaMessage = async _0x20d1b3 => {
    let _0x431401 = _0x20d1b3.msg ? _0x20d1b3.msg : _0x20d1b3;
    let _0x1c1d26 = (_0x20d1b3.msg || _0x20d1b3).mimetype || '';
    let _0x4dbf25 = _0x20d1b3.mtype ? _0x20d1b3.mtype.replace(/Message/gi, '') : _0x1c1d26.split('/')[0];
    const _0x1e97d3 = await downloadContentFromMessage(_0x431401, _0x4dbf25);
    let _0x292909 = Buffer.from([]);
    for await (const _0x255a7a of _0x1e97d3) {
      _0x292909 = Buffer.concat([_0x292909, _0x255a7a]);
    }
    return _0x292909;
  };
  _0x5b9f7e.forwardOrBroadCast2 = async (_0x3acb5f, _0x202ec6, _0x187999 = {}, _0x181836 = '') => {
    try {
      let _0x4fc8e1 = _0x202ec6.mtype;
      if (_0x4fc8e1 === "videoMessage" && _0x181836 === "ptv") {
        _0x202ec6 = {
          'ptvMessage': {
            ..._0x202ec6.msg
          }
        };
      }
      let _0x2231ce = {
        ..._0x187999,
        'contextInfo': {
          ...(_0x187999.contextInfo ? _0x187999.contextInfo : {}),
          ...(_0x187999.linkPreview ? {
            'linkPreview': {
              ..._0x187999.linkPreview
            }
          } : {}),
          ...(_0x187999.quoted && _0x187999.quoted.message ? {
            'quotedMessage': {
              ...(_0x187999.quoted?.["message"] || {})
            }
          } : {})
        }
      };
      var _0x1db734 = _0x202ec6.message ? _0x202ec6.message : _0x202ec6;
      let _0x258397 = _0x4fc8e1 ? _0x4fc8e1 : Object.keys(_0x1db734)[0];
      _0x1db734 = {
        ..._0x2231ce,
        ..._0x1db734
      };
      const _0x905219 = await generateWAMessageFromContent(_0x3acb5f, _0x1db734, _0x187999 ? {
        ...(_0x258397 == "conversation" ? {
          'extendedTextMessage': {
            'text': _0x1db734[_0x258397]
          }
        } : _0x1db734[_0x258397]),
        ..._0x2231ce,
        'contextInfo': {
          ...(_0x1db734[_0x258397]?.["contextInfo"] || {}),
          ..._0x2231ce.contextInfo
        }
      } : {});
      await _0x5b9f7e.relayMessage(_0x3acb5f, _0x905219.message, {
        'messageId': _0x5b9f7e.messageId()
      });
      return _0x905219;
    } catch {}
  };
  _0x5b9f7e.forwardOrBroadCast = async (_0x2987c3, _0xedffd0, _0x3ca159 = {}, _0x265eef = '') => {
    try {
      if (!_0x3ca159 || typeof _0x3ca159 !== "object") {
        _0x3ca159 = {};
      }
      _0x3ca159.messageId = _0x3ca159.messageId || _0x5b9f7e.messageId();
      var _0x10ff68 = _0xedffd0.message ? _0xedffd0.message : _0xedffd0;
      let _0x3ddfa4 = _0x10ff68.mtype ? _0x10ff68.mtype : Object.keys(_0x10ff68)[0];
      if (_0x3ddfa4 === "videoMessage" && _0x265eef === "ptv") {
        _0x10ff68 = {
          'ptvMessage': {
            ..._0xedffd0.msg
          }
        };
        _0x3ddfa4 = "ptvMessage";
      } else if (_0x3ddfa4 == "conversation") {
        _0x10ff68 = {
          'extendedTextMessage': {
            'text': _0x10ff68[_0x3ddfa4]
          }
        };
        _0x3ddfa4 = "extendedTextMessage";
      }
      _0x10ff68[_0x3ddfa4] = {
        ...(_0x10ff68[_0x3ddfa4] || _0x10ff68),
        ..._0x3ca159
      };
      const _0x1e1b7c = generateWAMessageFromContent(_0x2987c3, _0x10ff68, _0x3ca159);
      await _0x5b9f7e.relayMessage(_0x2987c3, _0x1e1b7c.message, {
        'messageId': _0x3ca159.messageId
      });
      return _0x1e1b7c;
    } catch (_0x1ce886) {
      console.log(_0x1ce886);
    }
  };
  _0x5b9f7e.forwardMessage = _0x5b9f7e.forwardOrBroadCast;
  _0x5b9f7e.copyNForward = async (_0x3db715, _0x1df8da, _0x33be10 = false, _0x2a1b6f = {}) => {
    try {
      let _0x467035;
      if (_0x2a1b6f.readViewOnce) {
        _0x1df8da.message = _0x1df8da.message && _0x1df8da.message.ephemeralMessage && _0x1df8da.message.ephemeralMessage.message ? _0x1df8da.message.ephemeralMessage.message : _0x1df8da.message || undefined;
        _0x467035 = Object.keys(_0x1df8da.message.viewOnceMessage.message)[0];
        delete (_0x1df8da.message && _0x1df8da.message.ignore ? _0x1df8da.message.ignore : _0x1df8da.message || undefined);
        delete _0x1df8da.message.viewOnceMessage.message[_0x467035].viewOnce;
        _0x1df8da.message = {
          ..._0x1df8da.message.viewOnceMessage.message
        };
      }
      let _0xc09280 = Object.keys(_0x1df8da.message)[0];
      try {
        _0x1df8da.key.fromMe = true;
      } catch (_0x2a8c18) {}
      let _0xcfb27e = await generateForwardMessageContent(_0x1df8da, _0x33be10);
      let _0xeade4c = Object.keys(_0xcfb27e)[0];
      let _0x25f379 = {};
      if (_0xc09280 != "conversation") {
        _0x25f379 = _0x1df8da.message[_0xc09280].contextInfo;
      }
      _0xcfb27e[_0xeade4c].contextInfo = {
        ..._0x25f379,
        ..._0xcfb27e[_0xeade4c].contextInfo
      };
      const _0x327c97 = await generateWAMessageFromContent(_0x3db715, _0xcfb27e, _0x2a1b6f);
      await _0x5b9f7e.relayMessage(_0x3db715, _0x327c97.message, {
        'messageId': _0x5b9f7e.messageId()
      });
      return _0x327c97;
    } catch (_0x482887) {
      console.log(_0x482887);
    }
  };
  _0x5b9f7e.sendFileUrl = async (_0x45a30e, _0xf393c1, _0x1f426a = '', _0x9ac1f4 = '', _0x378b08 = {
    'author': "Suhail-Md"
  }, _0x504d99 = '') => {
    try {
      let _0x6fef80 = await axios.head(_0xf393c1);
      let _0x40ca0b = _0x6fef80?.["headers"]["content-type"] || '';
      let _0x44b4f4 = _0x40ca0b.split('/')[0];
      let _0x277510 = false;
      if (_0x40ca0b.split('/')[1] === "gif" || _0x504d99 === "gif") {
        _0x277510 = {
          'video': {
            'url': _0xf393c1
          },
          'caption': _0x1f426a,
          'gifPlayback': true,
          ..._0x378b08
        };
      } else {
        if (_0x40ca0b.split('/')[1] === "webp" || _0x504d99 === "sticker") {
          _0x277510 = {
            'sticker': {
              'url': _0xf393c1
            },
            ..._0x378b08
          };
        } else {
          if (_0x44b4f4 === "image" || _0x504d99 === "image") {
            _0x277510 = {
              'image': {
                'url': _0xf393c1
              },
              'caption': _0x1f426a,
              ..._0x378b08,
              'mimetype': "image/jpeg"
            };
          } else {
            if (_0x44b4f4 === "video" || _0x504d99 === "video") {
              _0x277510 = {
                'video': {
                  'url': _0xf393c1
                },
                'caption': _0x1f426a,
                'mimetype': "video/mp4",
                ..._0x378b08
              };
            } else {
              if (_0x44b4f4 === "audio" || _0x504d99 === "audio") {
                _0x277510 = {
                  'audio': {
                    'url': _0xf393c1
                  },
                  'mimetype': "audio/mpeg",
                  ..._0x378b08
                };
              } else if (_0x40ca0b == "application/pdf") {
                _0x277510 = {
                  'document': {
                    'url': _0xf393c1
                  },
                  'mimetype': "application/pdf",
                  'caption': _0x1f426a,
                  ..._0x378b08
                };
              }
            }
          }
        }
      }
      if (_0x277510) {
        try {
          return await _0x5b9f7e.sendMessage(_0x45a30e, _0x277510, {
            'quoted': _0x9ac1f4
          });
        } catch {}
        ;
      }
      try {
        var _0x17f2b0 = _0x6fef80?.["headers"]["content-disposition"]?.["split"]("=\"")[1]?.["split"]("\"")[0] || "file";
        if (_0x17f2b0) {
          const _0x3dd8b4 = [".jpg", ".jpeg", ".png"];
          const _0x2bf8ec = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
          var _0x14334d = _0x17f2b0.substring(_0x17f2b0.lastIndexOf('.'))?.["toLowerCase"]() || "nillll";
          var _0x279e09;
          if (_0x3dd8b4.includes(_0x14334d)) {
            _0x279e09 = "image/jpeg";
          } else if (_0x2bf8ec.includes(_0x14334d)) {
            _0x279e09 = "video/mp4";
          }
          _0x40ca0b = _0x279e09 ? _0x279e09 : _0x40ca0b;
          let _0x2e8de7 = {
            'fileName': _0x17f2b0 || "file",
            'caption': _0x1f426a,
            ..._0x378b08,
            'mimetype': _0x40ca0b
          };
          return await _0x5b9f7e.sendMessage(_0x45a30e, {
            'document': {
              'url': _0xf393c1
            },
            ..._0x2e8de7
          }, {
            'quoted': _0x9ac1f4
          });
        }
      } catch (_0x170190) {}
      let _0x12f019 = {
        'fileName': _0x17f2b0 ? _0x17f2b0 : "file",
        'caption': _0x1f426a,
        ..._0x378b08,
        'mimetype': _0x40ca0b
      };
      return await _0x5b9f7e.sendMessage(_0x45a30e, {
        'document': {
          'url': _0xf393c1
        },
        ..._0x12f019
      }, {
        'quoted': _0x9ac1f4
      });
    } catch (_0x4dca06) {
      console.log("Erorr in client.sendFileUrl() : ", _0x4dca06);
      throw _0x4dca06;
    }
  };
  _0x5b9f7e.sendFromUrl = _0x5b9f7e.sendFileUrl;
  const _0x1b9983 = {};
  let _0x402cdc = [];
  _0x5b9f7e.sendUi = async (_0x2ab301, _0x549f9d = {}, _0xf34f03 = '', _0x1fd18d = '', _0x28b16d = '', _0x1dfaac = false) => {
    let _0x566743 = {};
    try {
      const _0x4d0d33 = [".jpg", ".jpeg", ".png"];
      const _0x522386 = [".mp4", ".avi", ".mov", ".mkv", ".gif", ".m4v", ".webp"];
      let _0x5ec026 = video = false;
      if (!_0x402cdc || !_0x402cdc[0]) {
        _0x402cdc = global.userImages ? global.userImages.split(',') : [await botpic()];
        _0x402cdc = _0x402cdc.filter(_0x1fd9ab => _0x1fd9ab.trim() !== '');
      }
      let _0x1879a6 = _0x1fd18d && _0x28b16d ? _0x28b16d : _0x402cdc[Math.floor(Math.random() * _0x402cdc.length)];
      if (!_0x1b9983[_0x1879a6]) {
        const _0x37fe5d = _0x1879a6.substring(_0x1879a6.lastIndexOf('.')).toLowerCase();
        if (_0x4d0d33.includes(_0x37fe5d)) {
          _0x5ec026 = true;
        }
        if (_0x522386.includes(_0x37fe5d)) {
          video = true;
        }
        _0x1b9983[_0x1879a6] = {
          'image': _0x5ec026,
          'video': video
        };
      }
      _0xf34f03 = _0xf34f03 && _0xf34f03.quoted?.["key"] ? _0xf34f03.quoted : _0xf34f03 || '';
      let _0x18f2ee;
      if ((_0x1dfaac && _0x28b16d && global.style > 0 || !_0x28b16d) && /text|txt|nothing|smd|wasi/.test(global.userImages) || _0x1fd18d == "text") {
        _0x18f2ee = {
          'text': _0x549f9d.text || _0x549f9d.caption,
          ..._0x549f9d
        };
      } else {
        if (_0x1fd18d == "image" || _0x1b9983[_0x1879a6].image) {
          _0x18f2ee = {
            'image': {
              'url': _0x1879a6
            },
            ..._0x549f9d,
            'mimetype': "image/jpeg"
          };
        } else if (_0x1fd18d == "video" || _0x1b9983[_0x1879a6].video) {
          _0x18f2ee = {
            'video': {
              'url': _0x1879a6
            },
            ..._0x549f9d,
            'mimetype': "video/mp4",
            'gifPlayback': true,
            'height': 0x112,
            'width': 0x21c
          };
        }
      }
      const _0x3d33b5 = _0x1dfaac && _0x28b16d && global.style > 0 ? await smdBuffer(_0x28b16d) : null;
      _0x566743 = {
        ...(await _0x5b9f7e.contextInfo(Config.botname, _0xf34f03 && _0xf34f03.senderName ? _0xf34f03.senderName : Config.ownername, _0x3d33b5))
      };
      if (_0x18f2ee) {
        return await _0x5b9f7e.sendMessage(_0x2ab301, {
          'contextInfo': _0x566743,
          ..._0x18f2ee
        }, {
          'quoted': _0xf34f03
        });
      }
    } catch (_0x246fab) {
      console.log("erorr in userImages() : ", _0x246fab);
    }
    try {
      return await _0x5b9f7e.sendMessage(_0x2ab301, {
        'image': {
          'url': await botpic()
        },
        'contextInfo': _0x566743,
        ..._0x549f9d
      });
    } catch {
      return _0x5b9f7e.sendMessage(_0x2ab301, {
        'text': _0x549f9d.text || _0x549f9d.caption,
        ..._0x549f9d
      });
    }
  };
  _0x5b9f7e.contextInfo = async (_0x3f29ef = Config.botname, _0x5a62a5 = Config.ownername, _0x1cdea8 = log0, _0x205621 = 1, _0x13dfd8 = gurl, _0x309590 = false) => {
    try {
      let _0x42a1bf = _0x309590 ? _0x309590 : global.style;
      if (_0x42a1bf >= 5) {
        return {
          'externalAdReply': {
            'title': _0x3f29ef,
            'body': _0x5a62a5,
            'renderLargerThumbnail': true,
            'showAdAttribution': true,
            'thumbnail': _0x1cdea8 || log0,
            'mediaType': _0x205621 || 1,
            'mediaUrl': _0x13dfd8,
            'sourceUrl': _0x13dfd8
          }
        };
      } else {
        if (_0x42a1bf == 4) {
          return {
            'forwardingScore': 0x3e7,
            'isForwarded': true,
            'externalAdReply': {
              'title': _0x3f29ef,
              'body': _0x5a62a5,
              'renderLargerThumbnail': true,
              'thumbnail': _0x1cdea8 || log0,
              'mediaType': _0x205621 || 1,
              'mediaUrl': _0x13dfd8,
              'sourceUrl': _0x13dfd8
            }
          };
        } else {
          if (_0x42a1bf == 3) {
            return {
              'externalAdReply': {
                'title': _0x3f29ef,
                'body': _0x5a62a5,
                'renderLargerThumbnail': true,
                'thumbnail': _0x1cdea8 || log0,
                'mediaType': _0x205621 || 1,
                'mediaUrl': _0x13dfd8,
                'sourceUrl': _0x13dfd8
              }
            };
          } else {
            if (_0x42a1bf == 2) {
              return {
                'externalAdReply': {
                  'title': _0x3f29ef,
                  'body': _0x5a62a5,
                  'thumbnail': _0x1cdea8 || log0,
                  'showAdAttribution': true,
                  'mediaType': 0x1,
                  'mediaUrl': _0x13dfd8,
                  'sourceUrl': _0x13dfd8
                }
              };
            } else {
              return _0x42a1bf == 1 ? {
                'externalAdReply': {
                  'title': _0x3f29ef,
                  'body': _0x5a62a5,
                  'thumbnail': _0x1cdea8 || log0,
                  'mediaType': 0x1,
                  'mediaUrl': _0x13dfd8,
                  'sourceUrl': _0x13dfd8
                }
              } : {};
            }
          }
        }
      }
    } catch (_0x1a7020) {
      console.log("error in client.contextInfo() : ", _0x1a7020);
      return {};
    }
  };
  _0x5b9f7e.cMod = (_0x19496b, _0x357e52, _0x1e7379 = '', _0x5dc8d5 = _0x5b9f7e.user.id, _0x66a047 = {}) => {
    let _0x27870a = Object.keys(_0x357e52.message)[0];
    let _0x4574c4 = _0x27870a === "ephemeralMessage";
    if (_0x4574c4) {
      _0x27870a = Object.keys(_0x357e52.message.ephemeralMessage.message)[0];
    }
    let _0x2981dc = _0x4574c4 ? _0x357e52.message.ephemeralMessage.message : _0x357e52.message;
    let _0x5b9d10 = _0x2981dc[_0x27870a];
    if (typeof _0x5b9d10 === "string") {
      _0x2981dc[_0x27870a] = _0x1e7379 || _0x5b9d10;
    } else {
      if (_0x5b9d10.caption) {
        _0x5b9d10.caption = _0x1e7379 || _0x5b9d10.caption;
      } else if (_0x5b9d10.text) {
        _0x5b9d10.text = _0x1e7379 || _0x5b9d10.text;
      }
    }
    if (typeof _0x5b9d10 !== "string") {
      _0x2981dc[_0x27870a] = {
        ..._0x5b9d10,
        ..._0x66a047
      };
    }
    if (_0x357e52.key.participant) {
      _0x5dc8d5 = _0x357e52.key.participant = _0x5dc8d5 || _0x357e52.key.participant;
    } else if (_0x357e52.key.participant) {
      _0x5dc8d5 = _0x357e52.key.participant = _0x5dc8d5 || _0x357e52.key.participant;
    }
    if (_0x357e52.key.remoteJid.includes("@s.whatsapp.net")) {
      _0x5dc8d5 = _0x5dc8d5 || _0x357e52.key.remoteJid;
    } else if (_0x357e52.key.remoteJid.includes("@broadcast")) {
      _0x5dc8d5 = _0x5dc8d5 || _0x357e52.key.remoteJid;
    }
    _0x357e52.key.remoteJid = _0x19496b;
    _0x357e52.key.fromMe = _0x5dc8d5 === _0x5b9f7e.user.id;
    return proto.WebMessageInfo.fromObject(_0x357e52);
  };
  _0x5b9f7e.getFile = async (_0x3b9682, _0x4218f5) => {
    let _0x8304d3;
    let _0x5753f6 = Buffer.isBuffer(_0x3b9682) ? _0x3b9682 : /^data:.*?\/.*?;base64,/i.test(_0x3b9682) ? Buffer.from(_0x3b9682.split`,`[1], "base64") : /^https?:\/\//.test(_0x3b9682) ? await (_0x8304d3 = await getBuffer(_0x3b9682)) : fs.existsSync(_0x3b9682) ? (_0x326ee9 = _0x3b9682, fs.readFileSync(_0x3b9682)) : typeof _0x3b9682 === "string" ? _0x3b9682 : Buffer.alloc(0);
    let _0x5ebc71 = (await FileType.fromBuffer(_0x5753f6)) || {
      'mime': "application/octet-stream",
      'ext': ".bin"
    };
    let _0x326ee9 = "./temp/null." + _0x5ebc71.ext;
    if (_0x5753f6 && _0x4218f5) {
      fs.promises.writeFile(_0x326ee9, _0x5753f6);
    }
    return {
      'res': _0x8304d3,
      'filename': _0x326ee9,
      'size': getSizeMedia(_0x5753f6),
      ..._0x5ebc71,
      'data': _0x5753f6
    };
  };
  _0x5b9f7e.sendFile = async (_0x20e313, _0x317a18, _0x1473c4, _0xe00e8 = {
    'quoted': ''
  }, _0x3ef937 = {}) => {
    let _0x7b04f8 = '';
    let _0x26be35 = _0x419a11;
    let _0x4f2ab2 = _0x310de6;
    if (_0x3ef937.asDocument) {
      _0x7b04f8 = "document";
    }
    if (_0x3ef937.asSticker || /webp/.test(_0x419a11)) {
      let {
        writeExif: _0x2a43a9
      } = require("./exif.js");
      let _0x3625e1 = {
        'mimetype': _0x419a11,
        'data': _0x4f56f4
      };
      _0x4f2ab2 = await _0x2a43a9(_0x3625e1, {
        'packname': Config.packname,
        'author': Config.packname,
        'categories': _0x3ef937.categories ? _0x3ef937.categories : []
      });
      await fs.promises.unlink(_0x310de6);
      _0x7b04f8 = "sticker";
      _0x26be35 = "image/webp";
    } else {
      if (/image/.test(_0x419a11)) {
        _0x7b04f8 = "image";
      } else {
        if (/video/.test(_0x419a11)) {
          _0x7b04f8 = "video";
        } else if (/audio/.test(_0x419a11)) {
          _0x7b04f8 = "audio";
        } else {
          _0x7b04f8 = "document";
        }
      }
    }
    await _0x5b9f7e.sendMessage(_0x20e313, {
      [_0x7b04f8]: {
        'url': _0x4f2ab2
      },
      'mimetype': _0x26be35,
      'fileName': _0x1473c4,
      ..._0x3ef937
    }, {
      'quoted': _0xe00e8 && _0xe00e8.quoted ? _0xe00e8.quoted : _0xe00e8,
      ..._0xe00e8
    });
    return fs.promises.unlink(_0x4f2ab2);
  };
  _0x5b9f7e.fakeMessage = async (_0x173936 = "text", _0x2f45fd = {}, _0x16454d = "➬ Suhail SER", _0x3452b3 = {}) => {
    const _0x4e11aa = [777, 0, 100, 500, 1000, 999, 2021];
    let _0x281195 = {
      'id': _0x5b9f7e.messageId(),
      'fromMe': false,
      'participant': "0@s.whatsapp.net",
      'remoteJid': "status@broadcast",
      ..._0x2f45fd
    };
    let _0x560fa8 = {};
    if (_0x173936 == "text" || _0x173936 == "conservation" || !_0x173936) {
      _0x560fa8 = {
        'conversation': _0x16454d
      };
    } else {
      if (_0x173936 == "order") {
        _0x560fa8 = {
          'orderMessage': {
            'itemCount': _0x4e11aa[Math.floor(_0x4e11aa.length * Math.random())],
            'status': 0x1,
            'surface': 0x1,
            'message': "❏ " + _0x16454d,
            'orderTitle': "live",
            'sellerJid': "2348039607375@s.whatsapp.net"
          }
        };
      } else {
        if (_0x173936 == "contact") {
          _0x560fa8 = {
            'contactMessage': {
              'displayName': '' + _0x16454d,
              'jpegThumbnail': log0
            }
          };
        } else {
          if (_0x173936 == "image") {
            _0x560fa8 = {
              'imageMessage': {
                'jpegThumbnail': log0,
                'caption': _0x16454d
              }
            };
          } else if (_0x173936 == "video") {
            _0x560fa8 = {
              'videoMessage': {
                'url': log0,
                'caption': _0x16454d,
                'mimetype': "video/mp4",
                'fileLength': "4757228",
                'seconds': 0x2c
              }
            };
          }
        }
      }
    }
    return {
      'key': {
        ..._0x281195
      },
      'message': {
        ..._0x560fa8,
        ..._0x3452b3
      }
    };
  };
  _0x5b9f7e.parseMention = async _0x138ad2 => {
    return [..._0x138ad2.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x4b21c4 => _0x4b21c4[1] + "@s.whatsapp.net");
  };
  app.get("/chat", (_0x4a6e37, _0x1f4f3e) => {
    let _0x4dbdac = _0x4a6e37.query.chat || _0x4a6e37.query.jid || _0x5b9f7e.user.id || _0x5b9f7e.user.m || '';
    if (["all", "msg", "total"].includes(_0x4dbdac)) {
      return _0x1f4f3e.json({
        'chat': _0x4dbdac,
        'conversation': JSON.stringify(store, null, 2)
      });
    }
    if (!_0x4dbdac) {
      return _0x1f4f3e.json({
        'ERROR': "Chat Id parameter missing"
      });
    }
    _0x4dbdac = _0x5b9f7e.decodeJid(_0x4dbdac);
    const _0xd15ece = (store.messages[_0x4dbdac] || store.messages[_0x4dbdac + "@s.whatsapp.net"] || store.messages[_0x4dbdac + "@g.us"])?.["array"] || false;
    if (!_0xd15ece) {
      return _0x1f4f3e.json({
        'chat': _0x4dbdac,
        'Message': "no messages found in given chat id!"
      });
    }
    _0x1f4f3e.json({
      'chat': _0x4dbdac,
      'conversation': JSON.stringify(_0xd15ece, null, 2)
    });
  });
  _0x5b9f7e.dl_size = global.dl_size || 200;
  _0x5b9f7e.awaitForMessage = async (_0x541702 = {}) => {
    return new Promise((_0x4eed24, _0x19902b) => {
      if (typeof _0x541702 !== "object") {
        _0x19902b(new Error("Options must be an object"));
      }
      if (typeof _0x541702.sender !== "string") {
        _0x19902b(new Error("Sender must be a string"));
      }
      if (typeof _0x541702.remoteJid !== "string") {
        _0x19902b(new Error("ChatJid must be a string"));
      }
      if (_0x541702.timeout && typeof _0x541702.timeout !== "number") {
        _0x19902b(new Error("Timeout must be a number"));
      }
      if (_0x541702.filter && typeof _0x541702.filter !== "function") {
        _0x19902b(new Error("Filter must be a function"));
      }
      const _0x1fc16f = _0x541702?.["timeout"] || undefined;
      const _0x574f9a = _0x541702?.["filter"] || (() => true);
      let _0x548075 = undefined;
      let _0x933c0a = _0xd0c984 => {
        let {
          type: _0x584ef0,
          messages: _0x529d80
        } = _0xd0c984;
        if (_0x584ef0 == "notify") {
          for (let _0x5cd099 of _0x529d80) {
            const _0x45dfae = _0x5cd099.key.fromMe;
            const _0x4001fa = _0x5cd099.key.remoteJid;
            const _0x4c5e52 = _0x4001fa.endsWith("@g.us");
            const _0x50cd5f = _0x4001fa == "status@broadcast";
            const _0x261296 = _0x5b9f7e.decodeJid(_0x45dfae ? _0x5b9f7e.user.id : _0x4c5e52 || _0x50cd5f ? _0x5cd099.key.participant : _0x4001fa);
            if (_0x261296 == _0x541702.sender && _0x4001fa == _0x541702.remoteJid && _0x574f9a(_0x5cd099)) {
              _0x5b9f7e.ev.off("messages.upsert", _0x933c0a);
              clearTimeout(_0x548075);
              _0x4eed24(_0x5cd099);
            }
          }
        }
      };
      _0x5b9f7e.ev.on("messages.upsert", _0x933c0a);
      if (_0x1fc16f) {
        _0x548075 = setTimeout(() => {
          _0x5b9f7e.ev.off("messages.upsert", _0x933c0a);
          _0x19902b(new Error("Timeout"));
        }, _0x1fc16f);
      }
    });
  };
  return _0x5b9f7e;
}
let asciii = "\n\n                " + Config.VERSION + "\n  𝗠𝗨𝗟𝗧𝗜𝗗𝗘𝗩𝗜𝗖𝗘 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗨𝗦𝗘𝗥 𝗕𝗢𝗧\n\n";
console.log(asciii);
global.lib_dir = __dirname;
global.toBool = (_0x588d65, _0x212ae4 = false) => /true|yes|ok|act|sure|enable|smd|wasi/gi.test(_0x588d65) ? _0x212ae4 ? true : "true" : _0x212ae4 ? false : "false";
async function loadPlugins(_0x1dceee) {
  try {
    fs.readdirSync(_0x1dceee).forEach(_0x4ddbff => {
      const _0x172a7b = path.join(_0x1dceee, _0x4ddbff);
      if (fs.statSync(_0x172a7b).isDirectory()) {
        loadPlugins(_0x172a7b);
      } else {
        if (_0x4ddbff.includes("_Baileys") || _0x4ddbff.includes("_MSGS")) {
          log("\nRENTBOTT's DATA DETECTED!", "\nUSER NUMBER:", _0x4ddbff.replace("_MSGS", '').replace("_Baileys", ''), "\n\n");
        } else {
          if ([".js", ".smd", ".wasi"].includes(path.extname(_0x4ddbff).toLowerCase())) {
            try {
              require(_0x172a7b);
            } catch (_0x23bd73) {
              log("\n❌There's an error in '" + _0x4ddbff + "' file ❌ \n\n", _0x23bd73);
            }
          }
        }
      }
    });
  } catch (_0x2d8f3d) {}
}
app.set("json spaces", 3);
app.get('/', (_0x56d03c, _0x37e368) => {
  try {
    let _0x4e612a = path.join(__dirname, "assets", "index.html");
    if (fs.existsSync(_0x4e612a)) {
      _0x37e368.sendFile(_0x4e612a);
    } else {
      _0x37e368.type("html").send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Bouncing Text - Itxxwasi</title>\n<style>\n  body {\n    margin: 0;\n    padding: 0;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: #f0f0f0;\n    overflow: hidden;\n  }\n\n  .bounce-text {\n    font-size: 48px;\n    font-family: Arial, sans-serif;\n    animation: bounce 1s infinite alternate;\n  }\n\n  @keyframes bounce {\n    0% {\n      transform: translateY(0);\n    }\n    100% {\n      transform: translateY(-20px);\n    }\n  }\n</style>\n</head>\n<body>\n\n<div class=\"bounce-text\">Itxxwasi</div>\n\n</body>\n</html>\n\n");
    }
  } catch (_0x40cb82) {}
});
app.get("/wasi", (_0x52ed94, _0xb6a8ca) => _0xb6a8ca.type("html").send("\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Bouncing Text - Itxxwasi</title>\n<style>\n  body {\n    margin: 0;\n    padding: 0;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background-color: #f0f0f0;\n    overflow: hidden;\n  }\n\n  .bounce-text {\n    font-size: 48px;\n    font-family: Arial, sans-serif;\n    animation: bounce 1s infinite alternate;\n  }\n\n  @keyframes bounce {\n    0% {\n      transform: translateY(0);\n    }\n    100% {\n      transform: translateY(-20px);\n    }\n  }\n</style>\n</head>\n<body>\n\n<div class=\"bounce-text\">Itxxwasi</div>\n\n</body>\n</html>\n\n"));
app.get("/var", (_0x22a437, _0x2e6422) => _0x2e6422.json({
  ...Config,
  'SESSION_ID': SESSION_ID
}));
app.get("/qr", async (_0x352157, _0x267313) => {
  try {
    if (!global.qr) {
      throw "QR NOT FETCHED!";
    }
    let _0x2921eb = require("qrcode");
    _0x267313.end(await _0x2921eb.toBuffer(global.qr));
  } catch (_0x2f7cf8) {
    console.log("/qr PATH_URL Error : ", _0x2f7cf8);
    if (!_0x267313.headersSent) {
      _0x267313.send({
        'error': _0x2f7cf8.message || _0x2f7cf8,
        'reason': global.qr_message || "SERVER DOWN!",
        'uptime': runtime(process.uptime())
      });
    }
  }
});
app.get("/logo", (_0x2a9384, _0x291d93) => _0x291d93.end(global.log0));
let quickport = global.port ? global.port : Math.floor(Math.random() * 9000) + 1000;
app.listen(quickport, () => console.log("wasi On  http://localhost:" + quickport + "/  "));
global.print = console.log;
global.log = console.log;
global.Debug = {
  ...console
};
if (!/true|log|smd|error|logerror|err|all|info|loginfo|warn|logwarn/.test(global.MsgsInLog)) {
  console.log = () => {};
}
if (!/error|logerror|err|all/.test(global.MsgsInLog)) {
  console.error = () => {};
}
if (!/info|loginfo|all/.test(global.MsgsInLog)) {
  console.info = () => {};
}
if (!/warn|logwarn|all/.test(global.MsgsInLog)) {
  console.warn = () => {};
}
let Appurls = [];
if (global.appUrl && /http/gi.test(global.appUrl)) {
  Appurls = [global.appUrl, "http://localhost:" + quickport];
}
if (process.env.REPL_ID) {
  Appurls.push("https://" + process.env.REPL_ID + ".pike.replit.dev");
  Appurls.push("https://" + process.env.REPL_ID + '.' + (process.env.REPLIT_CLUSTER || "pike") + ".replit.dev");
}
if (process.env.REPL_SLUG) {
  Appurls.push("https://" + process.env.REPL_SLUG + '.' + process.env.REPL_OWNER + ".repl.co");
}
if (process.env.PROJECT_DOMAIN) {
  Appurls.push("https://" + process.env.PROJECT_DOMAIN + ".glitch.me");
}
if (process.env.CODESPACE_NAME) {
  Appurls.push("https://" + process.env.CODESPACE_NAME + ".github.dev");
}
function keepAlive() {
  setInterval(() => {
    for (let _0x337aee = 0; _0x337aee < Appurls.length; _0x337aee++) {
      const _0x2d48a8 = Appurls[_0x337aee];
      if (/(\/\/|\.)undefined\./.test(_0x2d48a8)) {
        continue;
      }
      try {
        axios.get(_0x2d48a8);
      } catch (_0x594eaa) {}
      try {
        fetch(_0x2d48a8);
      } catch (_0x4bdc4b) {}
    }
  }, 300000);
}
if (Array.isArray(Appurls)) {
  keepAlive();
}
async function MakeSession(_0x5a2f59 = SESSION_ID, _0x3f7838 = __dirname + "/Sessions/", _0x58c8e0 = false) {
  let _0x5f2a09 = ('' + _0x5a2f59).replace(/^SESSION_\d{2}_\d{2}_\d{2}_\d{2}_/gi, '').replace(/^SESSION_ID_\d{2}_\d{2}_\d{2}_\d{2}_/gi, '').replace(/^wasi_\d{2}_\d{2}_\d{2}_\d{2}_/gi, '').replace(/wasi;;;/gi, '').replace(/Astro;;;/gi, '').replace(/Itxxwasi;;;/gi, '').trim();
  function _0x5b85ed(_0x55bcd4, _0xf48ae6) {
    return new Promise((_0x2c7eee, _0x512ff1) => {
      fs.readFile(_0xf48ae6, "utf8", (_0x400aaa, _0x472257) => {
        if (_0x400aaa) {
          _0x2c7eee(false);
        } else {
          _0x2c7eee(_0x472257.includes(_0x55bcd4));
        }
      });
    });
  }
  const _0x4f08dc = toBool(_0x58c8e0 || global.IS_SUHAIL || process.env.IS_SUHAIL, true) || (await _0x5b85ed("/Itxxwasi/", "./Dockerfile"));
  if (_0x4f08dc) {
    AstroOfficial = "yes";
    if (!fs.existsSync(_0x3f7838)) {
      fs.mkdirSync(_0x3f7838);
    }
    if (_0x5f2a09 && _0x5f2a09.startsWith("PId_")) {
      try {
        var _0x40d252 = _0x5f2a09.replace("PId_", '');
        const _0x4f5886 = require("pastebin-js");
        const _0x4de608 = new _0x4f5886("ECRgNok5kmfqqPofmC4NwFM8J6rx3qSO");
        const _0x10a591 = await _0x4de608.getPaste(_0x40d252);
        console.log({
          'pasteId': _0x40d252
        });
        _0x5f2a09 = _0x10a591 && typeof _0x10a591 == "string" ? Buffer.from(_0x10a591, "utf-8").toString("base64") : _0x5f2a09;
      } catch (_0xc14bb5) {
        console.log("CAN'T GET SESSION FROM PASTE ID\nERROR : ", _0xc14bb5);
      }
    }
    if (_0x5f2a09 && /guru/gi.test(_0x5f2a09) && _0x5f2a09.length < 30) {
      try {
        let _0x165541 = global.gurupaste || "https://pastebin.guruapi.tech/pastes?action=getpaste&id=";
        const {
          data: _0x115fa4
        } = await axios.get(_0x165541 + _0x5f2a09);
        const _0x2b1772 = _0x115fa4 && _0x115fa4.content ? _0x115fa4.content : false;
        var _0x34937e = _0x2b1772 ? Buffer.from(_0x2b1772, "base64").toString("utf-8") : {};
        const _0x504452 = JSON.parse(_0x34937e);
        fs.writeFileSync(_0x3f7838 + "creds.json", JSON.stringify(_0x504452, null, 2));
        log("\nCredentials saved successfully.");
      } catch (_0x792fe2) {
        log("EMPTY SESSION_ID FROM GURU SERVER\nPLEASE SCAN THE QR AGAIN FROM [ " + global.scan + " ]\n\n\nERROR: ", _0x792fe2);
      }
    } else {
      if (_0x5f2a09 && _0x5f2a09.length > 3 && _0x5f2a09.length < 20) {
        try {
          let {
            data: _0x390755
          } = await axios.get("https://paste.c-net.org/" + _0x5f2a09);
          fs.writeFileSync(_0x3f7838 + "creds.json", Buffer.from(_0x390755, "base64").toString("utf-8"), "utf8");
        } catch (_0x4bcba9) {
          log("\nERROR GETTING SESSION_ID FROM PASTE SERVER\n \nPLEASE SCAN THE QR AGAIN FROM [ " + global.scan + " ]\n");
        }
      } else {
        if (_0x5f2a09) {
          try {
            log("Checking Session ID!");
            var _0x34937e = Buffer.from(_0x5f2a09, "base64").toString("utf-8");
            const _0x64c710 = JSON.parse(_0x34937e);
            if (_0x64c710["creds.json"]) {
              for (const _0x53b716 in _0x64c710) {
                try {
                  fs.writeFileSync(_0x3f7838 + _0x53b716, typeof _0x64c710[_0x53b716] == "string" ? _0x64c710[_0x53b716] : JSON.stringify(_0x64c710[_0x53b716], null, 2));
                } catch (_0x132560) {}
              }
            } else {
              fs.writeFileSync(_0x3f7838 + "creds.json", JSON.stringify(_0x64c710, null, 2));
            }
            log("\nSESSION SAVED!");
          } catch (_0x23a3d8) {
            log("INVALID SESSION_ID ERROR FROM SERVER\nPLEASE SCAN THE QR AGAIN FROM [ " + global.scan + " ]\n\n\nERROR : ", _0x23a3d8);
          }
        }
      }
    }
  } else {
    AstroOfficial = false;
    log("\n\nYou are using a Modified Version. Please Run Bot from the Original Repository.\nDeploy From : https://github.com/Itxxwasi/WASI-MD-V2\n");
    process.exit(0);
  }
}
async function main() {
  if (mongodb && mongodb.includes("mongodb")) {
    try {
      isMongodb = await connnectMongo();
    } catch {}
  }
  if (!global.isMongodb && global.DATABASE_URL && !["false", "null"].includes(global.DATABASE_URL)) {
    try {
      global.sqldb = await connnectpg();
    } catch {}
  }
}
module.exports = {
  'init': MakeSession,
  'connect': syncdb,
  'logger': global.Debug,
  'DATABASE': {
    'sync': main
  }
};
