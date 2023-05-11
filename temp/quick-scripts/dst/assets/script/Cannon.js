
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Cannon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '48c2aQ6uCBHC49LYFy8i3ze', 'Cannon');
// script/Cannon.ts

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
var Bullet_1 = require("./Bullet");
var Common_1 = require("./Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 子弹图片
        _this.bulletIcon = null;
        // 爆炸特效
        _this.explodeEffect = null;
        // 音效
        _this.audioFire = null;
        _this.audioExplode = null;
        // 炮塔图片
        _this.iconNormal = null;
        _this.iconActive = null;
        // 内部属性    
        _this.startPos = null;
        _this.startAngle = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        // 初始角度设为90度
        this.node.angle = 90;
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchEnd, this);
    };
    NewClass.prototype.start = function () {
    };
    // update (dt) {}
    NewClass.prototype.onTouchStart = function (e) {
        // startPos : 触点开始的位置
        this.startPos = this.node.parent.convertToNodeSpaceAR(e.getLocation());
        // startAngle : 炮口的初始角度 (x轴方向为0度)
        this.startAngle = this.node.angle;
        // 激发时的图片显示
        this.node.getComponent(cc.Sprite).spriteFrame = this.iconActive;
    };
    NewClass.prototype.onTouchMove = function (e) {
        // 触点的当前位置
        var pos = this.node.parent.convertToNodeSpaceAR(e.getLocation());
        // 摆动的角度 a.signAngle(b) 即 a向量与b向量之前的夹角
        var sweep_radian = pos.signAngle(this.startPos);
        var sweep_angle = 180 * sweep_radian / Math.PI; // 弧度radian -> 角度 angle
        // 炮口的新指向
        // 比如，原来炮口90度，向右摆动15度，则炮口应指向75度
        var angle = this.startAngle - sweep_angle;
        // 炮口角度限制在45~135度之间
        if (angle < 45)
            angle = 45;
        if (angle > 135)
            angle = 135;
        //cc.log("炮口摆动: " + sweep_angle + ', 修正后的角度: ' + angle);
        this.node.angle = angle;
    };
    NewClass.prototype.onTouchEnd = function (e) {
        this.fire();
        // 普通状态的图片显示
        this.node.getComponent(cc.Sprite).spriteFrame = this.iconNormal;
    };
    // 开火
    NewClass.prototype.fire = function () {
        if (this.bulletIcon == null) {
            cc.log('请设置bulletIcon图片');
            return;
        }
        // 炮口的指向，应是子弹的运行方向
        var angle = this.node.angle; // 子弹运行的方向 
        var radian = angle * Math.PI / 180;
        var direction = cc.v2(Math.cos(radian), Math.sin(radian)); // 标准化向量
        // 动态创建一个Node，添加Sprite组件
        var bulletNode = new cc.Node();
        var sprite = bulletNode.addComponent(cc.Sprite);
        sprite.spriteFrame = this.bulletIcon; // 设置子弹的图片     
        bulletNode.parent = this.node.parent; // 指定父节点
        // 角度及初始位置  
        bulletNode.angle = this.node.angle; // 子弹的角度
        var r = 120; // 子弹与射击基准的距离
        var bullet_x = r * direction.x;
        var bullet_y = r * direction.y;
        bulletNode.setPosition(cc.v3(bullet_x, bullet_y, 0)); // 子弹的初始位置       
        // // 给子弹附加脚本组件
        // let bullet: Bullet  = bulletNode.addComponent( Bullet );
        // bullet.direction = direction; // 子弹的飞行方向
        var bullet = bulletNode.addComponent(Bullet_1.default);
        bullet.direction = direction;
        bullet.target = cc.find('Canvas/靶子');
        bullet.explodeEffect = this.explodeEffect; // 爆炸特效
        bullet.audioExplode = this.audioExplode;
        // let magazine : Magazine = cc.find('Canvas/弹仓').getComponent('Magazine');
        // magazine.consume(1);
        Common_1.default.magazine.consume(1);
        // 音效
        if (this.audioFire != null)
            cc.audioEngine.play(this.audioFire, false, 1);
    };
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "bulletIcon", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "explodeEffect", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "audioFire", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "audioExplode", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "iconNormal", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "iconActive", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxDYW5ub24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsbUNBQThCO0FBQzlCLG1DQUE4QjtBQUt4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQTZIQztRQTNIRyxPQUFPO1FBRVAsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBRWxDLE9BQU87UUFFUCxtQkFBYSxHQUFtQixJQUFJLENBQUM7UUFFckMsS0FBSztRQUVMLGVBQVMsR0FBa0IsSUFBSSxDQUFDO1FBRWhDLGtCQUFZLEdBQWtCLElBQUksQ0FBQztRQUVuQyxPQUFPO1FBRVAsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBRWxDLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUVsQyxXQUFXO1FBQ1gsY0FBUSxHQUFhLElBQUksQ0FBQztRQUMxQixnQkFBVSxHQUFZLElBQUksQ0FBQzs7SUFxRy9CLENBQUM7SUFuR0csd0JBQXdCO0lBRXhCLHlCQUFNLEdBQU47UUFDSSxZQUFZO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJ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QUlsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO21EQUNZO0lBSXJDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7K0NBQ1M7SUFFaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztrREFDWTtJQUluQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2dEQUNTO0lBRWxDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0RBQ1M7SUFwQmpCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E2SDVCO0lBQUQsZUFBQztDQTdIRCxBQTZIQyxDQTdIcUMsRUFBRSxDQUFDLFNBQVMsR0E2SGpEO2tCQTdIb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBDb21tb24gZnJvbSBcIi4vQ29tbW9uXCI7XHJcbmltcG9ydCBNYWdhemluZSBmcm9tIFwiLi9NYWdhemluZVwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyDlrZDlvLnlm77niYdcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJ1bGxldEljb246IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuXHJcbiAgICAvLyDniIbngrjnibnmlYhcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGV4cGxvZGVFZmZlY3Q6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcclxuXHJcbiAgICAvLyDpn7PmlYhcclxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXHJcbiAgICBhdWRpb0ZpcmUgOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcclxuICAgIGF1ZGlvRXhwbG9kZSA6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgLy8g54Ku5aGU5Zu+54mHXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBpY29uTm9ybWFsOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBpY29uQWN0aXZlOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcblxyXG4gICAgLy8g5YaF6YOo5bGe5oCnICAgIFxyXG4gICAgc3RhcnRQb3MgOiBjYy5WZWMyID0gbnVsbDtcclxuICAgIHN0YXJ0QW5nbGUgOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy8g5Yid5aeL6KeS5bqm6K6+5Li6OTDluqZcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSA5MDtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG5cclxuICAgIG9uVG91Y2hTdGFydChlIDogY2MuRXZlbnQuRXZlbnRUb3VjaCl7ICAgICAgICBcclxuICAgICAgICAvLyBzdGFydFBvcyA6IOinpueCueW8gOWni+eahOS9jee9rlxyXG4gICAgICAgIHRoaXMuc3RhcnRQb3MgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgLy8gc3RhcnRBbmdsZSA6IOeCruWPo+eahOWIneWni+inkuW6piAoeOi9tOaWueWQkeS4ujDluqYpXHJcbiAgICAgICAgdGhpcy5zdGFydEFuZ2xlID0gdGhpcy5ub2RlLmFuZ2xlO1xyXG5cclxuICAgICAgICAvLyDmv4Dlj5Hml7bnmoTlm77niYfmmL7npLpcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25BY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaE1vdmUgKGUgOiBjYy5FdmVudC5FdmVudFRvdWNoKXsgICAgIFxyXG4gICAgICAgIC8vIOinpueCueeahOW9k+WJjeS9jee9rlxyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcblxyXG4gICAgICAgIC8vIOaRhuWKqOeahOinkuW6piBhLnNpZ25BbmdsZShiKSDljbMgYeWQkemHj+S4jmLlkJHph4/kuYvliY3nmoTlpLnop5JcclxuICAgICAgICBsZXQgc3dlZXBfcmFkaWFuID0gcG9zLnNpZ25BbmdsZSggdGhpcy5zdGFydFBvcyk7XHJcbiAgICAgICAgbGV0IHN3ZWVwX2FuZ2xlID0gMTgwICogc3dlZXBfcmFkaWFuIC8gTWF0aC5QSTsgLy8g5byn5bqmcmFkaWFuIC0+IOinkuW6piBhbmdsZVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOeCruWPo+eahOaWsOaMh+WQkVxyXG4gICAgICAgIC8vIOavlOWmgu+8jOWOn+adpeeCruWPozkw5bqm77yM5ZCR5Y+z5pGG5YqoMTXluqbvvIzliJnngq7lj6PlupTmjIflkJE3NeW6plxyXG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuc3RhcnRBbmdsZSAtIHN3ZWVwX2FuZ2xlO1xyXG4gICAgICAgIC8vIOeCruWPo+inkuW6pumZkOWItuWcqDQ1fjEzNeW6puS5i+mXtFxyXG4gICAgICAgIGlmKGFuZ2xlIDwgNDUpIGFuZ2xlID0gNDU7IFxyXG4gICAgICAgIGlmKGFuZ2xlID4gMTM1ICkgYW5nbGUgPSAxMzU7IFxyXG5cclxuICAgICAgICAvL2NjLmxvZyhcIueCruWPo+aRhuWKqDogXCIgKyBzd2VlcF9hbmdsZSArICcsIOS/ruato+WQjueahOinkuW6pjogJyArIGFuZ2xlKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaEVuZCAoZSA6IGNjLkV2ZW50LkV2ZW50VG91Y2gpe1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5maXJlKCk7XHJcblxyXG4gICAgICAgIC8vIOaZrumAmueKtuaAgeeahOWbvueJh+aYvuekulxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbk5vcm1hbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlvIDngatcclxuICAgIGZpcmUoICl7XHJcbiAgICAgICAgaWYodGhpcy5idWxsZXRJY29uPT1udWxsKXsgY2MubG9nKCfor7forr7nva5idWxsZXRJY29u5Zu+54mHJyk7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyDngq7lj6PnmoTmjIflkJHvvIzlupTmmK/lrZDlvLnnmoTov5DooYzmlrnlkJFcclxuICAgICAgICBsZXQgYW5nbGUgOiBudW1iZXIgID0gdGhpcy5ub2RlLmFuZ2xlOyAvLyDlrZDlvLnov5DooYznmoTmlrnlkJEgXHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IGFuZ2xlICogTWF0aC5QSSAvIDE4MDtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gY2MudjIoIE1hdGguY29zKHJhZGlhbiksIE1hdGguc2luKHJhZGlhbikpOyAvLyDmoIflh4bljJblkJHph49cclxuXHJcbiAgICAgICAgLy8g5Yqo5oCB5Yib5bu65LiA5LiqTm9kZe+8jOa3u+WKoFNwcml0Zee7hOS7tlxyXG4gICAgICAgIGxldCBidWxsZXROb2RlIDogY2MuTm9kZSA9IG5ldyBjYy5Ob2RlKCk7ICAgICAgICBcclxuICAgICAgICBsZXQgc3ByaXRlIDogY2MuU3ByaXRlID0gYnVsbGV0Tm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1bGxldEljb247ICAgLy8g6K6+572u5a2Q5by555qE5Zu+54mHICAgICBcclxuICAgICAgICBcclxuICAgICAgICBidWxsZXROb2RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQ7IC8vIOaMh+WumueItuiKgueCuVxyXG5cclxuICAgICAgICAvLyDop5Lluqblj4rliJ3lp4vkvY3nva4gIFxyXG4gICAgICAgIGJ1bGxldE5vZGUuYW5nbGUgPSB0aGlzLm5vZGUuYW5nbGU7IC8vIOWtkOW8ueeahOinkuW6plxyXG4gICAgICAgIGxldCByID0gMTIwOyAvLyDlrZDlvLnkuI7lsITlh7vln7rlh4bnmoTot53nprtcclxuICAgICAgICBsZXQgYnVsbGV0X3ggPSByICogZGlyZWN0aW9uLng7XHJcbiAgICAgICAgbGV0IGJ1bGxldF95ID0gciAqIGRpcmVjdGlvbi55O1xyXG4gICAgICAgIGJ1bGxldE5vZGUuc2V0UG9zaXRpb24oY2MudjMoYnVsbGV0X3gsIGJ1bGxldF95LCAwKSk7ICAgIC8vIOWtkOW8ueeahOWIneWni+S9jee9riAgICAgICBcclxuXHJcbiAgICAgICAgLy8gLy8g57uZ5a2Q5by56ZmE5Yqg6ISa5pys57uE5Lu2XHJcbiAgICAgICAgLy8gbGV0IGJ1bGxldDogQnVsbGV0ICA9IGJ1bGxldE5vZGUuYWRkQ29tcG9uZW50KCBCdWxsZXQgKTtcclxuICAgICAgICAvLyBidWxsZXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uOyAvLyDlrZDlvLnnmoTpo57ooYzmlrnlkJFcclxuXHJcbiAgICAgICAgbGV0IGJ1bGxldCA6IEJ1bGxldCA9IGJ1bGxldE5vZGUuYWRkQ29tcG9uZW50KCBCdWxsZXQpO1xyXG4gICAgICAgIGJ1bGxldC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgYnVsbGV0LnRhcmdldCA9IGNjLmZpbmQoJ0NhbnZhcy/pnbblrZAnKTtcclxuICAgICAgICBidWxsZXQuZXhwbG9kZUVmZmVjdCA9IHRoaXMuZXhwbG9kZUVmZmVjdDsgLy8g54iG54K454m55pWIXHJcbiAgICAgICAgYnVsbGV0LmF1ZGlvRXhwbG9kZSA9IHRoaXMuYXVkaW9FeHBsb2RlO1xyXG5cclxuICAgICAgICAvLyBsZXQgbWFnYXppbmUgOiBNYWdhemluZSA9IGNjLmZpbmQoJ0NhbnZhcy/lvLnku5MnKS5nZXRDb21wb25lbnQoJ01hZ2F6aW5lJyk7XHJcbiAgICAgICAgLy8gbWFnYXppbmUuY29uc3VtZSgxKTtcclxuXHJcbiAgICAgICAgQ29tbW9uLm1hZ2F6aW5lLmNvbnN1bWUoMSk7XHJcblxyXG4gICAgICAgIC8vIOmfs+aViFxyXG4gICAgICAgIGlmKHRoaXMuYXVkaW9GaXJlIT1udWxsKVxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9GaXJlLCBmYWxzZSwgMSk7XHJcbiAgICB9ICAgICAgIFxyXG4gICAgXHJcbn1cclxuIl19