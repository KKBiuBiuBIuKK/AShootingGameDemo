"use strict";
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