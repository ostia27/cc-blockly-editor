import * as Blockly from "blockly/core";

const generatedDefs = [
  {
    type: "player_stop",
    message0: "stop on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "stop",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "player_play",
    message0: "play on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "play",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "player_pushCD",
    message0: "pushCD on %1 from %2 slot %3",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      },
      {
        type: "input_value",
        name: "FROM",
        check: "String"
      },
      {
        type: "input_value",
        name: "SLOT",
        check: "Number"
      }
    ],
    colour: "#D17A00",
    tooltip: "pushCD",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "player_pullCD",
    message0: "pullCD on %1 to %2 slot %3",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      },
      {
        type: "input_value",
        name: "TO",
        check: "String"
      },
      {
        type: "input_value",
        name: "SLOT",
        check: "Number"
      }
    ],
    colour: "#D17A00",
    tooltip: "pullCD",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "player_getUrl",
    message0: "getUrl on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getUrl",
    helpUrl: "",
    output: "String"
  },
  {
    type: "player_getVip",
    message0: "getVip on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getVip",
    helpUrl: "",
    output: "Boolean"
  },
  {
    type: "player_getReadonly",
    message0: "getReadonly on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getReadonly",
    helpUrl: "",
    output: "Boolean"
  },
  {
    type: "player_getName",
    message0: "getName on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getName",
    helpUrl: "",
    output: "String"
  },
  {
    type: "player_getTransName",
    message0: "getTransName on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getTransName",
    helpUrl: "",
    output: "String"
  },
  {
    type: "player_getSecond",
    message0: "getSecond on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getSecond",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "player_getArtists",
    message0: "getArtists on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getArtists",
    helpUrl: "",
    output: "Array"
  },
  {
    type: "player_getCurrentTime",
    message0: "getCurrentTime on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getCurrentTime",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "player_setCDUrl",
    message0: "setCDUrl on %1 url %2 second %3 songName %4",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      },
      {
        type: "input_value",
        name: "URL",
        check: "String"
      },
      {
        type: "input_value",
        name: "SECOND",
        check: "Number"
      },
      {
        type: "input_value",
        name: "SONGNAME"
      }
    ],
    colour: "#D17A00",
    tooltip: "setCDUrl",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "player_isPlaying",
    message0: "isPlaying on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "isPlaying",
    helpUrl: "",
    output: "Boolean"
  },
  {
    type: "player_idToUrl",
    message0: "idToUrl on %1 id %2",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      },
      {
        type: "input_value",
        name: "ID",
        check: "Number"
      }
    ],
    colour: "#D17A00",
    tooltip: "idToUrl",
    helpUrl: "",
    output: "String"
  },
  {
    type: "player_urlToId",
    message0: "urlToId on %1 url %2",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      },
      {
        type: "input_value",
        name: "URL",
        check: "String"
      }
    ],
    colour: "#D17A00",
    tooltip: "urlToId",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "player_hasCD",
    message0: "hasCD on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "hasCD",
    helpUrl: "",
    output: "Boolean"
  },
  {
    type: "player_setListIndex",
    message0: "setListIndex on %1 i %2",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      },
      {
        type: "input_value",
        name: "I",
        check: "Number"
      }
    ],
    colour: "#D17A00",
    tooltip: "setListIndex",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "player_getListIndex",
    message0: "getListIndex on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getListIndex",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "player_getListCount",
    message0: "getListCount on %1",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      }
    ],
    colour: "#D17A00",
    tooltip: "getListCount",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "player_setPlayMode",
    message0: "setPlayMode on %1 mode %2",
    args0: [
      {
        type: "input_value",
        name: "PERIPHERAL",
        check: "Table"
      },
      {
        type: "input_value",
        name: "MODE",
        check: "String"
      }
    ],
    colour: "#D17A00",
    tooltip: "setPlayMode",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  }
];

export const generatedBlocks = Blockly.common.createBlockDefinitionsFromJsonArray(generatedDefs);
