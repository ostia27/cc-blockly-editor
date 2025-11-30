#!/usr/bin/env node

import fs from "fs";
import path from "path";

function parseArgs(argv) {
  const args = {
    files: [],
    color: "#4C97FF",
    categoryName: null,
    peripheralId: null,
  };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--color" || arg === "--colour") {
      args.color = argv[++i];
    } else if (arg === "--category-name") {
      args.categoryName = argv[++i];
    } else if (arg === "--peripheral-id") {
      args.peripheralId = argv[++i];
    } else if (!arg.startsWith("-")) {
      args.files.push(arg);
    }
  }
  if (!args.peripheralId) {
    console.error("--peripheral-id is required (e.g. vat, drone)");
    process.exit(1);
  }
  if (args.files.length === 0) {
    console.error("At least one Java file path is required");
    process.exit(1);
  }
  if (!args.categoryName) {
    const label =
      args.peripheralId[0].toUpperCase() + args.peripheralId.slice(1);
    args.categoryName = `CC: ${label}`;
  }
  return args;
}

function mapReturnTypeToOutput(type) {
  if (!type) return null;
  const t = type.replace(/<.*>/g, "").trim();
  if (/^void$/i.test(t)) return null;
  if (/^(int|long|short|byte|double|float)$/i.test(t)) return "Number";
  if (/^boolean$/i.test(t)) return "Boolean";
  if (/^String$/i.test(t)) return "String";
  if (/^Map</.test(t)) return "table";
  if (/List|Collection|\[\]$/.test(t)) return "Array";
  // Fallback to generic table/Array
  return "table";
}

function mapParamTypeToCheck(type) {
  if (!type) return null;
  const t = type.replace(/<.*>/g, "").trim();
  if (/^(int|long|short|byte|double|float)$/i.test(t)) return "Number";
  if (/^boolean$/i.test(t)) return "Boolean";
  if (/^String$/i.test(t)) return "String";
  return null;
}

function mapParamTypeToDefault(type) {
  if (!type) return "''";
  const t = type.replace(/<.*>/g, "").trim();
  if (/^(int|long|short|byte|double|float)$/i.test(t)) return "0";
  if (/^boolean$/i.test(t)) return "false";
  // Strings and everything else default to empty string
  return "''";
}

function extractLuaFunctions(javaSource) {
  const methods = [];
  // Match @LuaFunction (with or without parameters) followed by a public method.
  // Examples:
  //   @LuaFunction
  //   public final float getPressure() ...
  //   @LuaFunction(mainThread = true)
  //   public void stop() ...
  const re =
    /@LuaFunction(?:\s*\([^)]*\))?[\s\S]*?public\s+([\w<>?,\s\[\]]+?)\s+(\w+)\s*\(([^)]*)\)/g;
  let m;
  while ((m = re.exec(javaSource)) !== null) {
    const returnType = m[1].trim();
    const name = m[2].trim();
    const paramsRaw = (m[3] || "").trim();
    const params = [];
    if (paramsRaw) {
      for (const part of paramsRaw.split(",")) {
        const p = part.trim();
        if (!p) continue;
        // Strip annotations if any
        const noAnno = p.replace(/@\w+\s*/g, "").trim();
        const tokens = noAnno.split(/\s+/);
        if (tokens.length < 2) continue;
        const paramName = tokens[tokens.length - 1];
        const paramType = tokens.slice(0, -1).join(" ");
        params.push({ name: paramName, type: paramType });
      }
    }
    methods.push({ name, returnType, params });
  }
  return methods;
}

function generateBlocks(peripheralId, color, methods) {
  return methods
    .map(({ name, returnType, params }) => {
      const blockType = `${peripheralId}_${name}`;
      const output = mapReturnTypeToOutput(returnType);
      // Use just the method name for the visible label (block type already carries the peripheralId)
      const msg = name;
      const args0 = [
        {
          type: "input_value",
          name: "PERIPHERAL",
          check: "Table",
        },
      ];
      for (const p of params || []) {
        const fieldName = p.name.toUpperCase();
        const check = mapParamTypeToCheck(p.type);
        const arg = {
          type: "input_value",
          name: fieldName,
        };
        if (check) arg.check = check;
        args0.push(arg);
      }

      // Build message0 with one %n placeholder per arg in args0
      let message0;
      if (args0.length === 0) {
        message0 = msg;
      } else {
        // First arg is always PERIPHERAL => %1
        message0 = `${msg} on %1`;
        // Additional params => %2, %3, ... with param name labels when available
        for (let i = 1; i < args0.length; i++) {
          const index = i + 1; // Blockly placeholders are 1-based
          const param = (params || [])[i - 1];
          if (param) {
            message0 += ` ${param.name} %${index}`;
          } else {
            message0 += ` %${index}`;
          }
        }
      }

      const base = {
        type: blockType,
        message0,
        args0,
        colour: color,
        tooltip: msg,
        helpUrl: "",
      };
      if (output) {
        base.output = output;
      } else {
        base.previousStatement = null;
        base.nextStatement = null;
      }
      return { jsConstName: blockType, def: base };
    })
    .filter(
      (x, idx, arr) =>
        arr.findIndex((y) => y.jsConstName === x.jsConstName) === idx,
    );
}

function generateBlocksJs(blocks) {
  const defs = blocks.map(({ def }) => def);
  const json = JSON.stringify(defs, null, 2).replace(/"(\w+)":/g, "$1:");
  return `import * as Blockly from "blockly/core";

const generatedDefs = ${json};

export const generatedBlocks = Blockly.common.createBlockDefinitionsFromJsonArray(generatedDefs);
`;
}

function generateToolboxCategory(categoryName, blocks, peripheralId) {
  const contents = blocks
    .map(({ jsConstName }) => {
      return `        {\n          kind: "block",\n          type: "${jsConstName}",\n        },`;
    })
    .join("\n");

  const catStyleKey = `${peripheralId}_category`;

  return `export const generatedToolboxMods = [
  {
      kind: "category",
      name: "${categoryName}",
      // Add a category style in src/index.js -> categoryStyles if desired: "${catStyleKey}"
      contents: [
${contents}
      ],
    },
];
`;
}

function generateLuaGenerators(peripheralId, methods) {
  const lines = [];
  lines.push("import { Order } from 'blockly/lua';");
  lines.push("");
  lines.push("export const generatedForBlockMods = {};");
  lines.push("");

  for (const { name, returnType, params } of methods) {
    const blockType = `${peripheralId}_${name}`;
    const hasReturn = mapReturnTypeToOutput(returnType) !== null;
    lines.push(
      `generatedForBlockMods["${blockType}"] = function (block, generator) {`,
    );
    lines.push(
      "  const per = generator.valueToCode(block, 'PERIPHERAL', Order.NONE) || " +
        "''" +
        ";",
    );

    const argNames = [];
    for (const p of params || []) {
      const socket = p.name.toUpperCase();
      const def = mapParamTypeToDefault(p.type);
      lines.push(
        `  const ${p.name} = generator.valueToCode(block, "${socket}", Order.NONE) || ${def};`,
      );
      argNames.push(p.name);
    }

    if (argNames.length) {
      lines.push(`  const args = [${argNames.join(", ")}].join(",");`);
    } else {
      lines.push('  const args = "";');
    }

    lines.push("  const argsList = args ? '(' + args + ')' : '()';");

    if (hasReturn) {
      lines.push("  const code = per + '." + name + "' + argsList;");
      lines.push("  return [code, Order.NONE];");
    } else {
      lines.push("  const code = per + '." + name + "' + argsList + '\\n';");
      lines.push("  return code;");
    }

    lines.push("};");
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const args = parseArgs(process.argv);
  let allMethods = [];

  for (const file of args.files) {
    const abs = path.resolve(process.cwd(), file);
    const src = fs.readFileSync(abs, "utf8");
    const methods = extractLuaFunctions(src);
    allMethods = allMethods.concat(methods);
  }

  if (allMethods.length === 0) {
    console.error("No @LuaFunction methods found in the provided files.");
    process.exit(1);
  }

  const blocks = generateBlocks(args.peripheralId, args.color, allMethods);
  const outRoot = path.resolve(process.cwd(), "src", "generated");
  fs.mkdirSync(outRoot, { recursive: true });

  const blocksPath = path.join(outRoot, "computcraft_blocks_mods.js");
  const toolboxPath = path.join(outRoot, "toolbox_mods.js");
  const luaPath = path.join(outRoot, "lua_mods.js");

  fs.writeFileSync(blocksPath, generateBlocksJs(blocks), "utf8");
  fs.writeFileSync(
    toolboxPath,
    generateToolboxCategory(args.categoryName, blocks, args.peripheralId),
    "utf8",
  );
  fs.writeFileSync(
    luaPath,
    generateLuaGenerators(args.peripheralId, allMethods),
    "utf8",
  );

  console.log("Generated:");
  console.log("  " + blocksPath);
  console.log("  " + toolboxPath);
  console.log("  " + luaPath);
}

main();
