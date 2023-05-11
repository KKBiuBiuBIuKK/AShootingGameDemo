
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Magazine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3d7c0F+d5pDJrmkPEwB+JPf', 'Magazine');
// script/Magazine.ts

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
// 弹匣
var Magazine = /** @class */ (function (_super) {
    __extends(Magazine, _super);
    function Magazine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 子弹图片
        _this.bulletIcon = null;
        _this.capacity = 10; // 最大弹药
        _this.count = 10; // 现有弹药数量
        return _this;
    }
    Magazine.prototype.onLoad = function () {
        // 子弹的水平间距
        var space = this.node.width / this.capacity;
        // 创建10个子弹
        var i = 0;
        for (i = 0; i < this.capacity; i++) {
            var bulletNode = new cc.Node();
            var bulletSprite = bulletNode.addComponent(cc.Sprite);
            bulletSprite.spriteFrame = this.bulletIcon;
            this.node.addChild(bulletNode);
            bulletNode.x = space * i + 10; // 向右偏移一些
            bulletNode.y = 0;
        }
    };
    Magazine.prototype.start = function () {
    };
    // update (dt) {}
    // 重置
    Magazine.prototype.reset = function () {
        this.count = this.capacity;
        this.display();
    };
    // 消耗n个子弹
    Magazine.prototype.consume = function (n) {
        this.count -= n;
        if (this.count < 0)
            this.count = 0;
        this.display();
    };
    // 显示剩余的子弹
    // active的表示剩下的子弹
    Magazine.prototype.display = function () {
        var nodes = this.node.children;
        var i = 0;
        for (i = 0; i < nodes.length; i++) {
            if (this.count > i)
                nodes[i].active = true;
            else
                nodes[i].active = false;
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], Magazine.prototype, "bulletIcon", void 0);
    Magazine = __decorate([
        ccclass
    ], Magazine);
    return Magazine;
}(cc.Component));
exports.default = Magazine;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxNYWdhemluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUc1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxLQUFLO0FBR0w7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFnRUM7UUE5REcsT0FBTztRQUVQLGdCQUFVLEdBQW9CLElBQUksQ0FBQztRQUVuQyxjQUFRLEdBQVksRUFBRSxDQUFDLENBQUMsT0FBTztRQUMvQixXQUFLLEdBQVksRUFBRSxDQUFDLENBQUMsU0FBUzs7SUF5RGxDLENBQUM7SUF2REcseUJBQU0sR0FBTjtRQUVJLFVBQVU7UUFDVixJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXBELFVBQVU7UUFDVixJQUFJLENBQUMsR0FBWSxDQUFDLENBQUM7UUFDbkIsS0FBSSxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxFQUFHLENBQUMsRUFBRSxFQUNoQztZQUNJLElBQUksVUFBVSxHQUFhLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pDLElBQUksWUFBWSxHQUFnQixVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRSxZQUFZLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUUsVUFBVSxDQUFFLENBQUM7WUFFakMsVUFBVSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7WUFDeEMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBR0Qsd0JBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxpQkFBaUI7SUFFakIsS0FBSztJQUNMLHdCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxTQUFTO0lBQ1QsMEJBQU8sR0FBUCxVQUFVLENBQVU7UUFDaEIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDaEIsSUFBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUM7WUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVuQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFVBQVU7SUFDVixpQkFBaUI7SUFDakIsMEJBQU8sR0FBUDtRQUNJLElBQUksS0FBSyxHQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRTNDLElBQUksQ0FBQyxHQUFZLENBQUMsQ0FBQztRQUNuQixLQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUcsQ0FBQyxFQUFFLEVBQzlCO1lBQ0ksSUFBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUM7Z0JBQ2IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7O2dCQUV2QixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUMvQjtJQUNMLENBQUM7SUEzREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztnREFDVTtJQUpsQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBZ0U1QjtJQUFELGVBQUM7Q0FoRUQsQUFnRUMsQ0FoRXFDLEVBQUUsQ0FBQyxTQUFTLEdBZ0VqRDtrQkFoRW9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vLyDlvLnljKNcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hZ2F6aW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyDlrZDlvLnlm77niYdcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJ1bGxldEljb24gOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcblxyXG4gICAgY2FwYWNpdHkgOiBudW1iZXIgPSAxMDsgLy8g5pyA5aSn5by56I2vXHJcbiAgICBjb3VudCA6IG51bWJlciA9IDEwOyAvLyDnjrDmnInlvLnoja/mlbDph49cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICAvLyDlrZDlvLnnmoTmsLTlubPpl7Tot51cclxuICAgICAgICBsZXQgc3BhY2U6IG51bWJlciA9IHRoaXMubm9kZS53aWR0aCAvIHRoaXMuY2FwYWNpdHk7XHJcblxyXG4gICAgICAgIC8vIOWIm+W7ujEw5Liq5a2Q5by5XHJcbiAgICAgICAgbGV0IGkgOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihpID0wOyBpPCB0aGlzLmNhcGFjaXR5IDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGJ1bGxldE5vZGUgOiBjYy5Ob2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgbGV0IGJ1bGxldFNwcml0ZSAgOiBjYy5TcHJpdGUgPSBidWxsZXROb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBidWxsZXRTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1bGxldEljb247XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCggYnVsbGV0Tm9kZSApO1xyXG5cclxuICAgICAgICAgICAgYnVsbGV0Tm9kZS54ID0gc3BhY2UgKiBpICsgMTA7IC8vIOWQkeWPs+WBj+enu+S4gOS6m1xyXG4gICAgICAgICAgICBidWxsZXROb2RlLnkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbiAgICAvLyDph43nva5cclxuICAgIHJlc2V0ICgpe1xyXG4gICAgICAgIHRoaXMuY291bnQgPSB0aGlzLmNhcGFjaXR5O1xyXG4gICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOa2iOiAl27kuKrlrZDlvLlcclxuICAgIGNvbnN1bWUgKCBuIDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmNvdW50IC09IG47XHJcbiAgICAgICAgaWYodGhpcy5jb3VudCA8IDApIFxyXG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmmL7npLrliankvZnnmoTlrZDlvLlcclxuICAgIC8vIGFjdGl2ZeeahOihqOekuuWJqeS4i+eahOWtkOW8uVxyXG4gICAgZGlzcGxheSAoKXtcclxuICAgICAgICBsZXQgbm9kZXMgOiBjYy5Ob2RlW10gPSB0aGlzLm5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgICAgIGxldCBpIDogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IoaT0wOyBpPCBub2Rlcy5sZW5ndGggOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvdW50ID4gaSlcclxuICAgICAgICAgICAgICAgIG5vZGVzW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG5vZGVzW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=