import { Order } from 'blockly/lua';

export const generatedForBlockMods = {};

generatedForBlockMods["player_stop"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.stop' + argsList + '\n';
  return code;
};

generatedForBlockMods["player_play"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.play' + argsList + '\n';
  return code;
};

generatedForBlockMods["player_pushCD"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const from = generator.valueToCode(block, "FROM", Order.NONE) || '';
  const slot = generator.valueToCode(block, "SLOT", Order.NONE) || 0;
  const args = [from, slot].join(",");
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.pushCD' + argsList + '\n';
  return code;
};

generatedForBlockMods["player_pullCD"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const to = generator.valueToCode(block, "TO", Order.NONE) || '';
  const slot = generator.valueToCode(block, "SLOT", Order.NONE) || 0;
  const args = [to, slot].join(",");
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.pullCD' + argsList + '\n';
  return code;
};

generatedForBlockMods["player_getUrl"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getUrl' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_getVip"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getVip' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_getReadonly"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getReadonly' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_getName"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getName' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_getTransName"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getTransName' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_getSecond"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getSecond' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_getArtists"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getArtists' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_getCurrentTime"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getCurrentTime' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_setCDUrl"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const url = generator.valueToCode(block, "URL", Order.NONE) || '';
  const second = generator.valueToCode(block, "SECOND", Order.NONE) || 0;
  const songName = generator.valueToCode(block, "SONGNAME", Order.NONE) || '';
  const args = [url, second, songName].join(",");
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.setCDUrl' + argsList + '\n';
  return code;
};

generatedForBlockMods["player_isPlaying"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.isPlaying' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_idToUrl"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const id = generator.valueToCode(block, "ID", Order.NONE) || 0;
  const args = [id].join(",");
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.idToUrl' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_urlToId"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const url = generator.valueToCode(block, "URL", Order.NONE) || '';
  const args = [url].join(",");
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.urlToId' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_hasCD"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.hasCD' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_setListIndex"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const i = generator.valueToCode(block, "I", Order.NONE) || 0;
  const args = [i].join(",");
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.setListIndex' + argsList + '\n';
  return code;
};

generatedForBlockMods["player_getListIndex"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getListIndex' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_getListCount"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const args = "";
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.getListCount' + argsList;
  return [code, Order.NONE];
};

generatedForBlockMods["player_setPlayMode"] = function (block, generator) {
  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || '';
  const mode = generator.valueToCode(block, "MODE", Order.NONE) || '';
  const args = [mode].join(",");
  const argsList = args ? '(' + args + ')' : '()';
  const code = per + '.setPlayMode' + argsList + '\n';
  return code;
};
