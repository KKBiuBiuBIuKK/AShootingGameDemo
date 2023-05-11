
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Common.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dd7f1w5Ve1NX7S3NDkMI9YW', 'Common');
// script/Common.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Common = /** @class */ (function (_super) {
    __extends(Common, _super);
    function Common() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Common_1 = Common;
    Common.prototype.onLoad = function () {
        cc.log('Common.onLoad()被调用');
        Common_1.magazine = cc.find('Canvas/弹仓').getComponent('Magazine');
        Common_1.resultDialog = cc.find('Canvas/结果提示框').getComponent('ResultDialog');
    };
    Common.resetGame = function () {
        Common_1.score = 0;
        Common_1.magazine.reset();
    };
    var Common_1;
    Common.magazine = null;
    // 得分统计
    Common.score = 0;
    // 结果提示框
    Common.resultDialog = null;
    Common = Common_1 = __decorate([
        ccclass
    ], Common);
    return Common;
}(cc.Component));
exports.default = Common;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxDb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7O0lBdUJBLENBQUM7ZUF2Qm9CLE1BQU07SUFVdkIsdUJBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUU3QixRQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLFFBQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVNLGdCQUFTLEdBQWhCO1FBQ0ksUUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDakIsUUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDOztJQWxCTSxlQUFRLEdBQWMsSUFBSSxDQUFDO0lBRWxDLE9BQU87SUFDQSxZQUFLLEdBQVksQ0FBQyxDQUFDO0lBRTFCLFFBQVE7SUFDRCxtQkFBWSxHQUFrQixJQUFJLENBQUM7SUFSekIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQXVCMUI7SUFBRCxhQUFDO0NBdkJELEFBdUJDLENBdkJtQyxFQUFFLENBQUMsU0FBUyxHQXVCL0M7a0JBdkJvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IE1hZ2F6aW5lIGZyb20gXCIuL01hZ2F6aW5lXCI7XHJcbmltcG9ydCBSZXN1bHREaWFsb2cgZnJvbSBcIi4vUmVzdWx0RGlhbG9nXCI7XHJcbmltcG9ydCBUYXJnZXQgZnJvbSBcIi4vVGFyZ2V0XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1vbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgc3RhdGljIG1hZ2F6aW5lIDogTWFnYXppbmUgPSBudWxsO1xyXG5cclxuICAgIC8vIOW+l+WIhue7n+iuoVxyXG4gICAgc3RhdGljIHNjb3JlIDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvLyDnu5Pmnpzmj5DnpLrmoYZcclxuICAgIHN0YXRpYyByZXN1bHREaWFsb2cgOiBSZXN1bHREaWFsb2cgPSBudWxsO1xyXG4gICAgXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGNjLmxvZygnQ29tbW9uLm9uTG9hZCgp6KKr6LCD55SoJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgQ29tbW9uLm1hZ2F6aW5lID0gY2MuZmluZCgnQ2FudmFzL+W8ueS7kycpLmdldENvbXBvbmVudCgnTWFnYXppbmUnKTtcclxuICAgICAgICBDb21tb24ucmVzdWx0RGlhbG9nID0gY2MuZmluZCgnQ2FudmFzL+e7k+aenOaPkOekuuahhicpLmdldENvbXBvbmVudCgnUmVzdWx0RGlhbG9nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlc2V0R2FtZSgpe1xyXG4gICAgICAgIENvbW1vbi5zY29yZSA9IDA7XHJcbiAgICAgICAgQ29tbW9uLm1hZ2F6aW5lLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=