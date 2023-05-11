
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Bullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba4f8f2EmNLkp66AcaTykaa', 'Bullet');
// script/Bullet.ts

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
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 飞行的方位 (标准化向量)
        _this.direction = null;
        // 靶标
        _this.target = null;
        // 爆炸特效
        _this.explodeEffect = null;
        // 音效
        _this.audioExplode = null;
        return _this;
    }
    Bullet.prototype.onLoad = function () {
    };
    Bullet.prototype.start = function () {
        if (this.target == null) {
            cc.log('未设置靶标 target 属性!');
            return;
        }
        if (this.explodeEffect == null) {
            cc.log('未设置爆炸特效 explodeEffect 属性!');
            return;
        }
        this.schedule(this.onTimer, 0.016);
    };
    Bullet.prototype.onTimer = function () {
        if (this.node.y > 400) // 靶标与射击基准之间的距离
         {
            this.unschedule(this.onTimer);
            if (this.isHit())
                this.success();
            else
                this.failed();
            return;
        }
        var speed = 15; // 步长
        var dx = speed * this.direction.x;
        var dy = speed * this.direction.y;
        this.node.x += dx;
        this.node.y += dy;
    };
    Bullet.prototype.dismiss = function () {
        this.node.destroy();
        if (Common_1.default.magazine.count <= 0) {
            Common_1.default.resultDialog.show();
        }
    };
    // 检查是否命中目标
    Bullet.prototype.isHit = function () {
        var targetPos = this.getWorldLocation(this.target);
        var selfPos = this.getWorldLocation(this.node);
        var distance = Math.abs(targetPos.x - selfPos.x); // x方向距离
        // let distance : number = cc.Vec2.distance(targetPos, selfPos);
        cc.log('靶标x=' + targetPos.x + ', 子弹x=' + selfPos.x);
        if (distance < 50)
            return true;
        return false;
    };
    // 获取一个节点的世界坐标
    Bullet.prototype.getWorldLocation = function (node) {
        var pos = node.getPosition();
        return node.parent.convertToWorldSpaceAR(pos);
    };
    Bullet.prototype.success = function () {
        // 此处应添加特效
        cc.log('命中目标');
        // this.dismiss();   
        this.explode();
        this.cheer();
        // 得分
        Common_1.default.score += 10;
        // 音效
        if (this.audioExplode != null)
            cc.audioEngine.play(this.audioExplode, false, 1);
    };
    Bullet.prototype.failed = function () {
        cc.log('脱靶!');
        this.dismiss(); // 直接销毁
    };
    // 爆炸特效
    Bullet.prototype.explode = function () {
        cc.log('爆炸效果..');
        var sp = this.node.getComponent(cc.Sprite);
        sp.spriteFrame = this.explodeEffect;
        this.node.scale = 0.1;
        var self = this;
        cc.tween(this.node)
            .to(0.4, { scale: 1 })
            .to(0.2, { opacity: 0 })
            .call(function () { self.dismiss(); })
            .start();
    };
    // 加分效果
    Bullet.prototype.cheer = function () {
        var labelNode = new cc.Node();
        var label = labelNode.addComponent(cc.Label);
        label.string = "+10分";
        labelNode.color = new cc.Color(255, 0, 0);
        labelNode.parent = this.node.parent;
        labelNode.setPosition(cc.v3(0, 250, 0));
        labelNode.opacity = 200;
        cc.tween(labelNode)
            .to(0.5, { scale: 1.5 })
            .to(0.2, { opacity: 0 })
            .call(function () { labelNode.destroy(); })
            .start();
    };
    Bullet = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsbUNBQThCO0FBR3hCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBZ0lDO1FBOUhHLGdCQUFnQjtRQUNoQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRTNCLEtBQUs7UUFDTCxZQUFNLEdBQWEsSUFBSSxDQUFDO1FBRXhCLE9BQU87UUFDUCxtQkFBYSxHQUFtQixJQUFJLENBQUM7UUFFckMsS0FBSztRQUNMLGtCQUFZLEdBQWtCLElBQUksQ0FBQzs7SUFvSHZDLENBQUM7SUFsSEcsdUJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUFDLE9BQU87U0FBRTtRQUMvRCxJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO1lBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUFFO1FBRS9FLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUNJLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFHLGVBQWU7U0FDdEM7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENB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UyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFO2FBQzFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUE5SGdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FnSTFCO0lBQUQsYUFBQztDQWhJRCxBQWdJQyxDQWhJbUMsRUFBRSxDQUFDLFNBQVMsR0FnSS9DO2tCQWhJb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBDb21tb24gZnJvbSBcIi4vQ29tbW9uXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQgeyAgIFxyXG4gXHJcbiAgICAvLyDpo57ooYznmoTmlrnkvY0gKOagh+WHhuWMluWQkemHjylcclxuICAgIGRpcmVjdGlvbiA6IGNjLlZlYzIgPSBudWxsO1xyXG5cclxuICAgIC8vIOmdtuagh1xyXG4gICAgdGFyZ2V0IDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy8g54iG54K454m55pWIXHJcbiAgICBleHBsb2RlRWZmZWN0OiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcblxyXG4gICAgLy8g6Z+z5pWIXHJcbiAgICBhdWRpb0V4cGxvZGUgOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIGlmKHRoaXMudGFyZ2V0ID09IG51bGwpIHsgY2MubG9nKCfmnKrorr7nva7pnbbmoIcgdGFyZ2V0IOWxnuaApyEnKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYodGhpcy5leHBsb2RlRWZmZWN0ID09IG51bGwpIHsgY2MubG9nKCfmnKrorr7nva7niIbngrjnibnmlYggZXhwbG9kZUVmZmVjdCDlsZ7mgKchJyk7IHJldHVybjsgfVxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMub25UaW1lciwgMC4wMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGltZXIoKXtcclxuICAgICAgICBpZih0aGlzLm5vZGUueSA+IDQwMCkgIC8vIOmdtuagh+S4juWwhOWHu+WfuuWHhuS5i+mXtOeahOi3neemu1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMub25UaW1lcik7ICBcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNIaXQoKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzcygpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhaWxlZCgpOyAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm47ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwZWVkIDogbnVtYmVyID0gMTU7IC8vIOatpemVv1xyXG4gICAgICAgIGxldCBkeCA9IHNwZWVkICogdGhpcy5kaXJlY3Rpb24ueDtcclxuICAgICAgICBsZXQgZHkgPSBzcGVlZCAqIHRoaXMuZGlyZWN0aW9uLnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLnggKz0gZHg7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gZHk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgZGlzbWlzcygpe1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoQ29tbW9uLm1hZ2F6aW5lLmNvdW50IDw9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb21tb24ucmVzdWx0RGlhbG9nLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA5p+l5piv5ZCm5ZG95Lit55uu5qCHXHJcbiAgICBpc0hpdCgpIDogYm9vbGVhbiB7IFxyXG4gICAgICAgIGxldCB0YXJnZXRQb3MgOmNjLlZlYzIgPSB0aGlzLmdldFdvcmxkTG9jYXRpb24odGhpcy50YXJnZXQpO1xyXG4gICAgICAgIGxldCBzZWxmUG9zOiBjYy5WZWMyID0gdGhpcy5nZXRXb3JsZExvY2F0aW9uKHRoaXMubm9kZSk7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlIDogbnVtYmVyID0gTWF0aC5hYnMoIHRhcmdldFBvcy54IC0gc2VsZlBvcy54KSA7ICAvLyB45pa55ZCR6Led56a7XHJcbiAgICAgICAgLy8gbGV0IGRpc3RhbmNlIDogbnVtYmVyID0gY2MuVmVjMi5kaXN0YW5jZSh0YXJnZXRQb3MsIHNlbGZQb3MpO1xyXG4gICAgICAgIGNjLmxvZygn6Z225qCHeD0nICsgdGFyZ2V0UG9zLnggKyAnLCDlrZDlvLl4PScgKyBzZWxmUG9zLngpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGRpc3RhbmNlIDwgNTApIHJldHVybiB0cnVlOyAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W5LiA5Liq6IqC54K555qE5LiW55WM5Z2Q5qCHXHJcbiAgICBnZXRXb3JsZExvY2F0aW9uKCBub2RlIDogY2MuTm9kZSkgOiBjYy5WZWMyIHtcclxuICAgICAgICBsZXQgcG9zID0gbm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHJldHVybiBub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoIHBvcyApO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Y2Nlc3MoKXsgICAgICAgIFxyXG4gICAgICAgIC8vIOatpOWkhOW6lOa3u+WKoOeJueaViFxyXG5cclxuICAgICAgICBjYy5sb2coJ+WRveS4reebruaghycpO1xyXG4gICAgICAgIC8vIHRoaXMuZGlzbWlzcygpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZXhwbG9kZSgpO1xyXG4gICAgICAgIHRoaXMuY2hlZXIoKTsgICBcclxuICAgICAgICBcclxuICAgICAgICAvLyDlvpfliIZcclxuICAgICAgICBDb21tb24uc2NvcmUgKz0gMTA7XHJcblxyXG4gICAgICAgIC8vIOmfs+aViFxyXG4gICAgICAgIGlmKHRoaXMuYXVkaW9FeHBsb2RlIT1udWxsKVxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9FeHBsb2RlLCBmYWxzZSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmFpbGVkKCl7XHJcbiAgICAgICAgY2MubG9nKCfohLHpnbYhJyk7XHJcbiAgICAgICAgdGhpcy5kaXNtaXNzKCk7IC8vIOebtOaOpemUgOavgVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeIhueCuOeJueaViFxyXG4gICAgZXhwbG9kZSgpe1xyXG4gICAgICAgIGNjLmxvZygn54iG54K45pWI5p6cLi4nKTtcclxuICAgICAgICBsZXQgc3AgOiBjYy5TcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmV4cGxvZGVFZmZlY3Q7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDAuMTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuNCwgeyBzY2FsZTogMSB9IClcclxuICAgICAgICAgICAgLnRvKDAuMiwgeyBvcGFjaXR5OiAwfSApXHJcbiAgICAgICAgICAgIC5jYWxsKCBmdW5jdGlvbigpeyBzZWxmLmRpc21pc3MoKTsgfSApXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWKoOWIhuaViOaenFxyXG4gICAgY2hlZXIoKXtcclxuICAgICAgICBsZXQgbGFiZWxOb2RlIDogY2MuTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbGV0IGxhYmVsIDogY2MuTGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIisxMOWIhlwiO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsMCwwKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24oY2MudjMoMCwgMjUwLCAwKSk7XHJcbiAgICAgICAgbGFiZWxOb2RlLm9wYWNpdHkgPSAyMDA7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKGxhYmVsTm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuNSwge3NjYWxlOiAxLjV9KVxyXG4gICAgICAgICAgICAudG8oMC4yLCB7b3BhY2l0eTogMH0pXHJcbiAgICAgICAgICAgIC5jYWxsKCBmdW5jdGlvbigpeyBsYWJlbE5vZGUuZGVzdHJveSgpOyB9IClcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==