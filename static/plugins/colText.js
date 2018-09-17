//竖行文字
let ColText = function (ctx) {
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    this.fontSize = 40; //字体大小
    this.fillStyle = "black";
    this.shadowOpen = false;
    this.dot = function (x, y) {
        this.x = x;
        this.y = y;
    };
    this.start = new this.dot(0, 0);//字体起始点
    this.text = [
        "君不见黄河之水天上来#奔流到海不复回#君不见高堂明镜悲白发#朝如青丝暮成雪#人生得意须尽欢#莫使金樽空对月#天生我材必有用#千金散尽还复来"
    ];//文字

    this.fillDraw = function (fontsize, fontFamily) {
        if (this.shadowOpen) {
            this.shadow('black', 2, 2, 1);
        }

        //随机文字
        let text = this.getText().split('');
        let offset = 0;
        let x = this.start.x;
        let y = this.start.y;
        let self = this;
        let col = 1;
        let t = setInterval(function () {
            if (offset < text.length) {
                let char = text[offset];
                if (char !== '#') {
                    y = y + self.fontSize + 5;
                    offset++;
                } else {
                    y = self.start.y;
                    x = self.start.x - (self.fontSize + 10) * col;
                    col++;
                    offset++;
                    return;
                }
                self.ctx.fillText(char, x, y);
            } else {
                clearInterval(t);
            }
        }, 20);
    };
    //获取要描绘的文字
    this.getText = function () {
        let len = this.text.length;
        let ran = Math.floor(Math.random() * len);//随机文字
        return this.text[ran];
    };
    //阴影
    this.shadow = function (color, x, y, blur) {
        this.ctx.shadowColor = color;
        this.ctx.shadowOffsetX = x;
        this.ctx.shadowOffsetY = y;
        this.ctx.blur = blur;
    };
    /**
     *
     * @param text 文字,#号为换列符号
     * @param x          x坐标
     * @param y          y坐标
     * @param fontSize   字体大小
     * @param font_family 字体
     * @param fillStyle  填充颜色
     * @param shadowOpen 是否开启阴影 boolean
     */
    this.init = function (text, x, y, fontSize, font_family, fillStyle, shadowOpen = false) {
        this.start = new this.dot(x, y);
        this.text = text;
        this.fontSize = fontSize || 30;
        this.ctx.font = this.fontSize + 'px ' + (font_family || 'Arial');
        this.ctx.fillStyle = fillStyle || "black";
        this.shadowOpen = shadowOpen;
        this.fillDraw();
    }
};
