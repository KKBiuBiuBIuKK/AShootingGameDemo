
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/script/Bullet');
require('./assets/script/Cannon');
require('./assets/script/Common');
require('./assets/script/Magazine');
require('./assets/script/ResultDialog');
require('./assets/script/Target');

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCdWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsbUNBQThCO0FBR3hCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBZ0lDO1FBOUhHLGdCQUFnQjtRQUNoQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRTNCLEtBQUs7UUFDTCxZQUFNLEdBQWEsSUFBSSxDQUFDO1FBRXhCLE9BQU87UUFDUCxtQkFBYSxHQUFtQixJQUFJLENBQUM7UUFFckMsS0FBSztRQUNMLGtCQUFZLEdBQWtCLElBQUksQ0FBQzs7SUFvSHZDLENBQUM7SUFsSEcsdUJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUFDLE9BQU87U0FBRTtRQUMvRCxJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO1lBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQUMsT0FBTztTQUFFO1FBRS9FLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUNJLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFHLGVBQWU7U0FDdEM7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU5QixJQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztnQkFFZixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFbEIsT0FBTztTQUNWO1FBRUQsSUFBSSxLQUFLLEdBQVksRUFBRSxDQUFDLENBQUMsS0FBSztRQUM5QixJQUFJLEVBQUUsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxFQUFFLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELHdCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXBCLElBQUcsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsRUFDN0I7WUFDSSxnQkFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRCxXQUFXO0lBQ1gsc0JBQUssR0FBTDtRQUNJLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsSUFBSSxPQUFPLEdBQVksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsR0FBRyxDQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUUsUUFBUTtRQUN0RSxnRUFBZ0U7UUFDaEUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBELElBQUcsUUFBUSxHQUFHLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztRQUM5QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsY0FBYztJQUNkLGlDQUFnQixHQUFoQixVQUFrQixJQUFjO1FBQzVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVELHdCQUFPLEdBQVA7UUFDSSxVQUFVO1FBRVYsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNmLHFCQUFxQjtRQUVyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixLQUFLO1FBQ0wsZ0JBQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBRW5CLEtBQUs7UUFDTCxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUUsSUFBSTtZQUN0QixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsdUJBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO0lBQzNCLENBQUM7SUFFRCxPQUFPO0lBQ1Asd0JBQU8sR0FBUDtRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakIsSUFBSSxFQUFFLEdBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUVwQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFFdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNkLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUU7YUFDdEIsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBRTthQUN2QixJQUFJLENBQUUsY0FBWSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUU7YUFDckMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELE9BQU87SUFDUCxzQkFBSyxHQUFMO1FBQ0ksSUFBSSxTQUFTLEdBQWEsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEMsSUFBSSxLQUFLLEdBQWMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdEIsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsU0FBUyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFFeEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDZCxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDO2FBQ3JCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7YUFDckIsSUFBSSxDQUFFLGNBQVksU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFO2FBQzFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUE5SGdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FnSTFCO0lBQUQsYUFBQztDQWhJRCxBQWdJQyxDQWhJbUMsRUFBRSxDQUFDLFNBQVMsR0FnSS9DO2tCQWhJb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBDb21tb24gZnJvbSBcIi4vQ29tbW9uXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQgeyAgIFxyXG4gXHJcbiAgICAvLyDpo57ooYznmoTmlrnkvY0gKOagh+WHhuWMluWQkemHjylcclxuICAgIGRpcmVjdGlvbiA6IGNjLlZlYzIgPSBudWxsO1xyXG5cclxuICAgIC8vIOmdtuagh1xyXG4gICAgdGFyZ2V0IDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy8g54iG54K454m55pWIXHJcbiAgICBleHBsb2RlRWZmZWN0OiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcblxyXG4gICAgLy8g6Z+z5pWIXHJcbiAgICBhdWRpb0V4cGxvZGUgOiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIGlmKHRoaXMudGFyZ2V0ID09IG51bGwpIHsgY2MubG9nKCfmnKrorr7nva7pnbbmoIcgdGFyZ2V0IOWxnuaApyEnKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYodGhpcy5leHBsb2RlRWZmZWN0ID09IG51bGwpIHsgY2MubG9nKCfmnKrorr7nva7niIbngrjnibnmlYggZXhwbG9kZUVmZmVjdCDlsZ7mgKchJyk7IHJldHVybjsgfVxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMub25UaW1lciwgMC4wMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGltZXIoKXtcclxuICAgICAgICBpZih0aGlzLm5vZGUueSA+IDQwMCkgIC8vIOmdtuagh+S4juWwhOWHu+WfuuWHhuS5i+mXtOeahOi3neemu1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMub25UaW1lcik7ICBcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNIaXQoKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzcygpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhaWxlZCgpOyAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm47ICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNwZWVkIDogbnVtYmVyID0gMTU7IC8vIOatpemVv1xyXG4gICAgICAgIGxldCBkeCA9IHNwZWVkICogdGhpcy5kaXJlY3Rpb24ueDtcclxuICAgICAgICBsZXQgZHkgPSBzcGVlZCAqIHRoaXMuZGlyZWN0aW9uLnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLnggKz0gZHg7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gZHk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgZGlzbWlzcygpe1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoQ29tbW9uLm1hZ2F6aW5lLmNvdW50IDw9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb21tb24ucmVzdWx0RGlhbG9nLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA5p+l5piv5ZCm5ZG95Lit55uu5qCHXHJcbiAgICBpc0hpdCgpIDogYm9vbGVhbiB7IFxyXG4gICAgICAgIGxldCB0YXJnZXRQb3MgOmNjLlZlYzIgPSB0aGlzLmdldFdvcmxkTG9jYXRpb24odGhpcy50YXJnZXQpO1xyXG4gICAgICAgIGxldCBzZWxmUG9zOiBjYy5WZWMyID0gdGhpcy5nZXRXb3JsZExvY2F0aW9uKHRoaXMubm9kZSk7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlIDogbnVtYmVyID0gTWF0aC5hYnMoIHRhcmdldFBvcy54IC0gc2VsZlBvcy54KSA7ICAvLyB45pa55ZCR6Led56a7XHJcbiAgICAgICAgLy8gbGV0IGRpc3RhbmNlIDogbnVtYmVyID0gY2MuVmVjMi5kaXN0YW5jZSh0YXJnZXRQb3MsIHNlbGZQb3MpO1xyXG4gICAgICAgIGNjLmxvZygn6Z225qCHeD0nICsgdGFyZ2V0UG9zLnggKyAnLCDlrZDlvLl4PScgKyBzZWxmUG9zLngpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGRpc3RhbmNlIDwgNTApIHJldHVybiB0cnVlOyAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W5LiA5Liq6IqC54K555qE5LiW55WM5Z2Q5qCHXHJcbiAgICBnZXRXb3JsZExvY2F0aW9uKCBub2RlIDogY2MuTm9kZSkgOiBjYy5WZWMyIHtcclxuICAgICAgICBsZXQgcG9zID0gbm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHJldHVybiBub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoIHBvcyApO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Y2Nlc3MoKXsgICAgICAgIFxyXG4gICAgICAgIC8vIOatpOWkhOW6lOa3u+WKoOeJueaViFxyXG5cclxuICAgICAgICBjYy5sb2coJ+WRveS4reebruaghycpO1xyXG4gICAgICAgIC8vIHRoaXMuZGlzbWlzcygpOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZXhwbG9kZSgpO1xyXG4gICAgICAgIHRoaXMuY2hlZXIoKTsgICBcclxuICAgICAgICBcclxuICAgICAgICAvLyDlvpfliIZcclxuICAgICAgICBDb21tb24uc2NvcmUgKz0gMTA7XHJcblxyXG4gICAgICAgIC8vIOmfs+aViFxyXG4gICAgICAgIGlmKHRoaXMuYXVkaW9FeHBsb2RlIT1udWxsKVxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9FeHBsb2RlLCBmYWxzZSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmFpbGVkKCl7XHJcbiAgICAgICAgY2MubG9nKCfohLHpnbYhJyk7XHJcbiAgICAgICAgdGhpcy5kaXNtaXNzKCk7IC8vIOebtOaOpemUgOavgVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeIhueCuOeJueaViFxyXG4gICAgZXhwbG9kZSgpe1xyXG4gICAgICAgIGNjLmxvZygn54iG54K45pWI5p6cLi4nKTtcclxuICAgICAgICBsZXQgc3AgOiBjYy5TcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmV4cGxvZGVFZmZlY3Q7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDAuMTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuNCwgeyBzY2FsZTogMSB9IClcclxuICAgICAgICAgICAgLnRvKDAuMiwgeyBvcGFjaXR5OiAwfSApXHJcbiAgICAgICAgICAgIC5jYWxsKCBmdW5jdGlvbigpeyBzZWxmLmRpc21pc3MoKTsgfSApXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWKoOWIhuaViOaenFxyXG4gICAgY2hlZXIoKXtcclxuICAgICAgICBsZXQgbGFiZWxOb2RlIDogY2MuTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbGV0IGxhYmVsIDogY2MuTGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIisxMOWIhlwiO1xyXG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsMCwwKTtcclxuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24oY2MudjMoMCwgMjUwLCAwKSk7XHJcbiAgICAgICAgbGFiZWxOb2RlLm9wYWNpdHkgPSAyMDA7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKGxhYmVsTm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuNSwge3NjYWxlOiAxLjV9KVxyXG4gICAgICAgICAgICAudG8oMC4yLCB7b3BhY2l0eTogMH0pXHJcbiAgICAgICAgICAgIC5jYWxsKCBmdW5jdGlvbigpeyBsYWJlbE5vZGUuZGVzdHJveSgpOyB9IClcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Target.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d135chgqBN/6GnU8WWRXXw', 'Target');
// script/Target.ts

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
var Target = /** @class */ (function (_super) {
    __extends(Target, _super);
    function Target() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 运动方向
        _this.isLeft = true;
        return _this;
    }
    Target.prototype.onLoad = function () {
    };
    Target.prototype.start = function () {
    };
    Target.prototype.update = function (dt) {
        var dx = 3;
        if (this.isLeft) {
            dx = 0 - dx;
        }
        this.node.x += dx;
        if (this.isLeft && this.node.x < -200)
            this.isLeft = false;
        if (!this.isLeft && this.node.x > 200)
            this.isLeft = true;
    };
    Target = __decorate([
        ccclass
    ], Target);
    return Target;
}(cc.Component));
exports.default = Target;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxUYXJnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUF3QkM7UUF0QkcsT0FBTztRQUNQLFlBQU0sR0FBYSxJQUFJLENBQUM7O0lBcUI1QixDQUFDO0lBbkJHLHVCQUFNLEdBQU47SUFDQSxDQUFDO0lBRUQsc0JBQUssR0FBTDtJQUNBLENBQUM7SUFFRCx1QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxHQUFZLENBQUMsQ0FBQztRQUNwQixJQUFHLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDWCxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFFLEdBQUc7WUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBRyxDQUFFLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRztZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBckJnQixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBd0IxQjtJQUFELGFBQUM7Q0F4QkQsQUF3QkMsQ0F4Qm1DLEVBQUUsQ0FBQyxTQUFTLEdBd0IvQztrQkF4Qm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhcmdldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8g6L+Q5Yqo5pa55ZCRXHJcbiAgICBpc0xlZnQgOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgbGV0IGR4IDogbnVtYmVyID0gMztcclxuICAgICAgICBpZih0aGlzLmlzTGVmdCl7XHJcbiAgICAgICAgICAgIGR4ID0gMCAtIGR4O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUueCArPSBkeDtcclxuICAgICAgICBpZih0aGlzLmlzTGVmdCAmJiB0aGlzLm5vZGUueCA8IC0gMjAwKVxyXG4gICAgICAgICAgICB0aGlzLmlzTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKCEgdGhpcy5pc0xlZnQgJiYgdGhpcy5ub2RlLnggPiAyMDApXHJcbiAgICAgICAgICAgIHRoaXMuaXNMZWZ0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------
