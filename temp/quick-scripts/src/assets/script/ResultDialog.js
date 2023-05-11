"use strict";
cc._RF.push(module, '28330YB1FBFCKCG1vsjrn9x', 'ResultDialog');
// script/ResultDialog.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("./Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ResultDialog = /** @class */ (function (_super) {
    __extends(ResultDialog, _super);
    function ResultDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultDialog.prototype.onLoad = function () {
        var replayNode = cc.find('replay', this.node);
        replayNode.on('touchstart', this.onReplay, this);
        // 拦截触摸事件
        this.node.on('touchstart', this.onTouchDisable, this);
        this.node.on('touchmove', this.onTouchDisable, this);
        this.node.on('touchend', this.onTouchDisable, this);
    };
    ResultDialog.prototype.start = function () {
    };
    // 显示提示框
    ResultDialog.prototype.show = function () {
        this.node.active = true;
        // 显示最终得分
        var scoreNode = cc.find('分数', this.node);
        var scoreLabel = scoreNode.getComponent(cc.Label);
        scoreLabel.string = Common_1.default.score + '分';
    };
    // 隐藏提示框
    ResultDialog.prototype.dismiss = function () {
        this.node.active = false;
    };
    // 添加一个onReplay来响应事件吧
    ResultDialog.prototype.onReplay = function () {
        this.dismiss();
        // 重置游戏
        Common_1.default.resetGame();
    };
    ResultDialog.prototype.onTouchDisable = function (e) {
        e.stopPropagation();
    };
    ResultDialog = __decorate([
        ccclass
    ], ResultDialog);
    return ResultDialog;
}(cc.Component));
exports.default = ResultDialog;

cc._RF.pop();