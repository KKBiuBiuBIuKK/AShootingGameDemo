
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ResultDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxSZXN1bHREaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsbUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBQXREOztJQXlDQSxDQUFDO0lBdkNHLDZCQUFNLEdBQU47UUFDSSxJQUFJLFVBQVUsR0FBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVqRCxTQUFTO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELDRCQUFLLEdBQUw7SUFDQSxDQUFDO0lBRUQsUUFBUTtJQUNSLDJCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFeEIsU0FBUztRQUNULElBQUksU0FBUyxHQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLFVBQVUsR0FBYyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RCxVQUFVLENBQUMsTUFBTSxHQUFHLGdCQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUMzQyxDQUFDO0lBRUQsUUFBUTtJQUNSLDhCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELHFCQUFxQjtJQUNyQiwrQkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsT0FBTztRQUNQLGdCQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHFDQUFjLEdBQWQsVUFBZ0IsQ0FBdUI7UUFDbkMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUF4Q2dCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0F5Q2hDO0lBQUQsbUJBQUM7Q0F6Q0QsQUF5Q0MsQ0F6Q3lDLEVBQUUsQ0FBQyxTQUFTLEdBeUNyRDtrQkF6Q29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuL0NvbW1vblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bHREaWFsb2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgbGV0IHJlcGxheU5vZGUgOiBjYy5Ob2RlID0gY2MuZmluZCgncmVwbGF5JywgdGhpcy5ub2RlKTtcclxuICAgICAgICByZXBsYXlOb2RlLm9uKCd0b3VjaHN0YXJ0JywgdGhpcy5vblJlcGxheSwgdGhpcyk7XHJcblxyXG4gICAgICAgIC8vIOaLpuaIquinpuaRuOS6i+S7tlxyXG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaERpc2FibGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoRGlzYWJsZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIHRoaXMub25Ub3VjaERpc2FibGUsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmmL7npLrmj5DnpLrmoYZcclxuICAgIHNob3coKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8g5pi+56S65pyA57uI5b6X5YiGXHJcbiAgICAgICAgbGV0IHNjb3JlTm9kZSA6IGNjLk5vZGUgPSBjYy5maW5kKCfliIbmlbAnLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGxldCBzY29yZUxhYmVsIDogY2MuTGFiZWwgPSBzY29yZU5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTsgICBcclxuICAgICAgICBzY29yZUxhYmVsLnN0cmluZyA9IENvbW1vbi5zY29yZSArICfliIYnOyAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6ZqQ6JeP5o+Q56S65qGGXHJcbiAgICBkaXNtaXNzKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlOyAgICAgICAgXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8vIOa3u+WKoOS4gOS4qm9uUmVwbGF55p2l5ZON5bqU5LqL5Lu25ZCnXHJcbiAgICBvblJlcGxheSgpe1xyXG4gICAgICAgIHRoaXMuZGlzbWlzcygpO1xyXG5cclxuICAgICAgICAvLyDph43nva7muLjmiI9cclxuICAgICAgICBDb21tb24ucmVzZXRHYW1lKCk7IFxyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hEaXNhYmxlKCBlIDogY2MuRXZlbnQuRXZlbnRUb3VjaCApe1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbn1cclxuIl19