class PlayForgeEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.objects = [];
        this.events = []; // Logic events like GDevelop
    }

    addObject(name, type, color) {
        const obj = { id: Date.now(), name, type, x: 100, y: 100, w: 50, h: 50, color };
        this.objects.push(obj);
        this.render();
    }

    // Logic: Condition -> Action (GDevelop Style)
    addEvent(condition, action) {
        this.events.push({ condition, action });
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach(obj => {
            this.ctx.fillStyle = obj.color;
            this.ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
        });
    }

    exportProject() {
        const projectData = JSON.stringify({ objects: this.objects, events: this.events });
        const blob = new Blob([projectData], { type: 'application/json' });
        return URL.createObjectURL(blob);
    }
}

const engine = new PlayForgeEngine('gameCanvas');
