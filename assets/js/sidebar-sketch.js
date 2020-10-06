let nNodes;
let nodes;
let rSq;
let t;
let theme;

function setup() {
    let container = document.getElementById('sidebar-sketch');

    if (container === null) {
        noLoop();
        return;
    }

    let canvas = createCanvas();
    canvas.parent(container);

    windowResized();

    updateTheme();

    nNodes = random(10, 50);
    nodes = [];
    rSq = 5000;
    t = 0;

    for (let i = 0; i < nNodes; i++)
        nodes.push(createVector());
}

function mouseWheel(e) {
    if (e.delta > 0 && nodes.length < 150) nodes.push(createVector());
    else nodes.pop();
}

function draw() {
    background(theme.bg);

    for (let i = 0; i < nodes.length; i++) {
        node = nodes[i];
        node.x = width * noise(t + i);
        node.y = height * noise(t + i + 5);

        for (let j = i + 1; j < nodes.length; j++) {
            let dSq = (node.x - nodes[j].x) ** 2 + (node.y - nodes[j].y) ** 2;
        
            if (dSq < rSq) drawEdge(node, nodes[j], dSq);
        }
        
        drawNode(node);
    }
    
    t = t + 0.0005;
}

function drawNode(node) {
    stroke(theme.body);
    fill(theme.body);
    circle(node.x, node.y, 2);
}

function drawEdge(p, q, dSq) {
    theme.a.setAlpha(255 * (1 - dSq / rSq));
    stroke(theme.a);
    line(p.x, p.y, q.x, q.y);
}

function updateTheme() {
    let styles = getComputedStyle(document.body);
    theme = {
        bg: color(styles.getPropertyValue('--bg-color')),
        bgSecondary: color(styles.getPropertyValue('--secondary-bg-color')),
        a: color(styles.getPropertyValue('--a-color')),
        body: color(styles.getPropertyValue('--body-color'))
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let themeSwitcher = document.querySelector('.theme-switch');
    themeSwitcher.addEventListener('click', updateTheme, false);
}, false);

function windowResized() {
    if (windowWidth <= 950) {
        noLoop();
        return;
    } else {
        loop();
    }

    let container = document.getElementById('sidebar-sketch');
    let { width, height } = container.getBoundingClientRect();

    resizeCanvas(width, height);
}