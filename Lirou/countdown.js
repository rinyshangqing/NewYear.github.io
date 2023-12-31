// fireworks.js
document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    canvas.width = width;
    canvas.height = height;
    document.getElementById('fireworks').appendChild(canvas);

    var particles = [];
    var fireworks = [];

    // 创建烟花粒子
    function createParticles(x, y, hue) {
        var count = 30; // 爆炸中的粒子数
        while(count--) {
            var hueRandom = hue + Math.random() * 120 - 60; // 给色相一个更大范围的随机变化
            var sat = 50 + Math.random() * 50; // 饱和度50%到100%
            var light = 50 + Math.random() * 10; // 亮度50%到60%
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                alpha: 1,
                color: 'hsl(' + hueRandom + ',' + sat + '%,' + light + '%)'
            });
        }
    }
    

    function createFirework() {
        var x = Math.random() * width;
        var y = height;
        var hue = Math.random() * 360;
        fireworks.push({x: x, y: y, hue: hue});
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        for(var i = 0; i < particles.length; i++) {
            var p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(' + p.color + ',' + p.alpha + ')';
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02; // 使粒子逐渐消失

            if(p.alpha <= 0) {
                particles.splice(i, 1);
            }
        }

        for(var i = 0; i < fireworks.length; i++) {
            var f = fireworks[i];
            ctx.beginPath();
            ctx.arc(f.x, f.y, 2, 0, Math.PI * 2, false);
            ctx.fillStyle = 'hsl(' + f.hue + ', 100%, 50%)';
            ctx.fill();
            f.y -= 2; // 控制烟花上升速度

            // 当烟花到达高点时爆炸
            if(f.y < 250 + Math.random()*100) {
                createParticles(f.x, f.y, f.hue);
                fireworks.splice(i, 1);
            }
        }
    }

    function loop() {
        requestAnimationFrame(loop);
        draw();
    }

    setInterval(createFirework, 1000);
    loop();
});
