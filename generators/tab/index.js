module.exports=function(t){var e={};function i(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(o,s,function(e){return t[e]}.bind(null,s));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=17)}([function(t,e){t.exports=require("path")},function(t,e){t.exports=require("yeoman-generator")},function(t,e){t.exports=require("lodash")},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=i(4);let s=i(0);const n="package.json";e.Yotilities=class{static validateUrl(t){return/(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(t)}static fixFileNames(t,e){if(void 0!==t){var i=s.basename(t);if("_"===i[0]){t="."+i.substr(1);var o=s.dirname(t);t=s.join(o,t)}for(var n in e)e.hasOwnProperty(n)&&"string"==typeof e[n]&&(t=t.replace(new RegExp("{"+n+"}","g"),e[n]))}return t}static addAdditionalDeps(t,e){var i=e.readJSON(n);t.forEach(t=>{i.dependencies[t[0]]=t[1]}),e.writeJSON(n,i)}static insertTsExportDeclaration(t,e,i,s){let n=s.read(t);const a=o.createSourceFile(t,n,o.ScriptTarget.ES5,!0,o.ScriptKind.TS),r=o.createExportDeclaration(void 0,void 0,void 0,o.createLiteral(e));void 0!==i&&o.addSyntheticLeadingComment(r,o.SyntaxKind.SingleLineCommentTrivia,` ${i}`);const p=o.updateSourceFileNode(a,[...a.statements,r]),c=o.createPrinter({newLine:o.NewLineKind.LineFeed,removeComments:!1});s.write(t,c.printFile(p))}}},function(t,e){t.exports=require("typescript")},function(t,e){t.exports=require("yosay")},function(t,e){t.exports=require("guid")},,,,,,,,,,,function(t,e,i){t.exports=i(18)},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=i(19);t.exports=o.TabGenerator},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=i(1),s=i(2),n=i(3);i(5),i(0),i(6);e.TabGenerator=class extends o{constructor(t,e){super(t,e),e.force=!0,this.options=e.options,this.desc("Adds a tab to a Teams project.")}prompting(){if(this.options.tab)return this.prompt([{type:"input",name:"tabTitle",message:"Default Tab name? (max 16 characters)",default:this.options.title+" Tab",validate:t=>t.length>0&&t.length<=16}]).then(t=>{this.options.tabTitle=t.tabTitle,this.options.tabName=s.camelCase(this.options.tabTitle),this.options.tabName.endsWith("Tab")||(this.options.tabName=this.options.tabName+"Tab"),this.options.tabReactComponentName=this.options.tabName.charAt(0).toUpperCase()+this.options.tabName.slice(1),this.options.reactComponents=!0})}writing(){if(this.options.tab){let e=["src/app/scripts/{tabReactComponentName}Config.tsx","src/app/scripts/{tabReactComponentName}.tsx","src/app/scripts/{tabReactComponentName}Remove.tsx","src/app/web/{tabName}.html","src/app/web/{tabName}Remove.html","src/app/web/{tabName}Config.html"];this.sourceRoot(),e.forEach(t=>{this.fs.copyTpl(this.templatePath(t),n.Yotilities.fixFileNames(t,this.options),this.options)});let i="src/manifest/manifest.json";var t=this.fs.readJSON(i);t.configurableTabs.push({configurationUrl:`${this.options.host}/${this.options.tabName}Config.html`,canUpdateConfiguration:!0,scopes:["team"]}),this.options.host.substring(this.options.host.indexOf("://")+3).split("."),t.validDomains.push(this.options.host.split("https://")[1]),this.fs.writeJSON(i,t),n.Yotilities.addAdditionalDeps([["msteams-ui-components-react","^0.7.3"],["react","^16.1.0"],["@types/react","16.4.7"],["react-dom","^16.2.0"],["file-loader","1.1.11"],["typestyle","1.5.1"]],this.fs),n.Yotilities.insertTsExportDeclaration("src/app/scripts/client.ts",`./${this.options.tabReactComponentName}`,`Automatically added for the ${this.options.tabName} tab`,this.fs),n.Yotilities.insertTsExportDeclaration("src/app/scripts/client.ts",`./${this.options.tabReactComponentName}Config`,void 0,this.fs),n.Yotilities.insertTsExportDeclaration("src/app/scripts/client.ts",`./${this.options.tabReactComponentName}Remove`,void 0,this.fs)}}}}]);