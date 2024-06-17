const {
  smd
} = require("../lib");
smd({
  'pattern': "save",
  'desc': "Save whatsapp status",
  'category': "whatsapp",
  'filename': __filename,
  'use': "< status >"
}, async _0x3a5e0e => {
  try {
    let _0x52364a = _0x3a5e0e.reply_message && _0x3a5e0e.reply_message.status ? _0x3a5e0e.reply_message : false;
    if (_0x52364a) {
      _0x3a5e0e.bot.forwardOrBroadCast(_0x3a5e0e.user, _0x52364a, {
        'quoted': {
          'key': _0x52364a.key,
          'message': _0x52364a.message
        }
      });
    } else {
      _0x3a5e0e.send("*reply to whatsapp status*");
    }
  } catch (_0x489b76) {
    await _0x3a5e0e.error(_0x489b76 + "\n\ncommand : #(Status Saver)", _0x489b76, false);
  }
});
const regexSend = new RegExp("\\b(?:" + ["send", "dpm", "dpn", "oni", "ewanna", "ewahan", "dapan", "meka", "mekath", "ewannako", "dahan", "ewahan", "dpam", "ewa", "dapm", "ewano", "evano", "ewno", "ewnna","snd","ewana","danna","dannako","dannko","dnnko","ewapam","ewaham","dako","sv","sav","seve"].join('|') + ")\\b", 'i');
smd({
  'on': "quoted"
}, async (_0x3c9bac, _0x1e6c16) => {
  try {
    let _0x210566 = _0x3c9bac.reply_message.status ? _0x3c9bac.reply_message : false;
    if (_0x210566 && regexSend.test(_0x1e6c16.toLowerCase())) {
      _0x3c9bac.bot.forwardOrBroadCast(_0x3c9bac.fromMe ? _0x3c9bac.user : _0x3c9bac.from, _0x210566, {
        'quoted': {
          'key': _0x210566.key,
          'message': _0x210566.message
        }
      });
    }
  } catch (_0x1720e6) {
    console.log(_0x1720e6);
  }
});
global.waPresence = process.env.WAPRESENCE && process.env.WAPRESENCE === "online" ? "available" : process.env.WAPRESENCE || '';
global.api_smd = "https://api-smd.onrender.com";
let status = false;
smd({
  'on': "main"
}, async (_0xf2c8b5, _0x1395de, {
  icmd: _0x2cf50b
}) => {
  try {
    if (!status) {
      try {
        status = true;
      } catch (_0x4554d8) {}
    }
    if (_0xf2c8b5.status) {
      return;
    }
    if (('' + global.readmessagefrom).includes(_0xf2c8b5.senderNum) || ["yes", "true", 'ok', "sure"].includes(global.readmessage) || _0x2cf50b && ["yes", "true", 'ok', "sure"].includes(global.readcmds)) {
      _0xf2c8b5.bot.readMessages([_0xf2c8b5.key]);
    }
  } catch (_0x2f5d62) {
    console.log(_0x2f5d62);
  }
});
smd({
  'on': "text"
}, async (_0x253c9a, _0x1556dc, {
  icmd: _0x3ee7b8
}) => {
  try {
    if (["unavailable", "available", "composing", "recording", "paused"].includes(waPresence)) {
      _0x253c9a.bot.sendPresenceUpdate(waPresence, _0x253c9a.from);
    }
    if (_0x253c9a.isAstro && !_0x253c9a.fromMe && !_0x253c9a.text.startsWith('$')) {
      _0x253c9a.react('🤖');
    }
  } catch (_0x279bd6) {
    console.log(_0x279bd6);
  }
});
smd({
  'on': "status"
}, async (_0x56d721, _0x252ae1) => {
  try {
    if (('' + global.read_status_from).split(',').includes(_0x56d721.key.participant.split('@')[0]) || ["yes", "true", 'ok', "sure"].includes(global.read_status) || _0x56d721.fromMe || _0x56d721.isAstro) {
      await _0x56d721.bot.readMessages([{
        ..._0x56d721.key,
        'fromMe': false
      }]);
    }
    if ((('' + global.save_status_from).split(',').includes(_0x56d721.key.participant.split('@')[0]) || ["yes", "true", 'ok', "sure"].includes(global.save_status)) && !_0x56d721.fromMe) {
      await _0x56d721.bot.forwardOrBroadCast(_0x56d721.user, _0x56d721, {
        'quoted': {
          'key': _0x56d721.key,
          'message': _0x56d721.message
        }
      });
    }
  } catch (_0x5c50ba) {
    console.log(_0x5c50ba);
  }
});
smd({
  'cmdname': "mastermind",
  'desc': "total Users Currently using asta"
}, async (_0x5ca2f0, _0x3cf886) => {
  try {
    _0x5ca2f0.send("An Estimated 120+ Users On Master-md-v2".trim());
  } catch (_0x5b992f) {
    console.error("Error:", _0x5b992f);
    _0x5ca2f0.reply("*ERROR!* ");
  }
});
