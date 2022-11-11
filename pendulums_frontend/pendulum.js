const pendulumNodePorts = {
    "one": 8000,
    "two": 8001,
    "three": 8002,
    "four": 8003,
    "five": 8004,

}

const updatePosition = async (pendulum) => {
    const res = await axios.post(`http://127.0.0.1:${pendulumNodePorts[pendulum.name]}/pendulum`, {
        "x": pendulum.x,
        "y": pendulum.y,
        "r": pendulum.r,
        "angle": pendulum.angle,
        "weight": pendulum.weight,
    })
    return res.data
}

const initializePendulum = async (pendulum) => {
    const res = await axios.post(`http://127.0.0.1:${pendulumNodePorts[pendulum.name]}/pendulum`, {
        "x": pendulum.x,
        "y": pendulum.y,
        "r": pendulum.r,
        "angle": pendulum.angle,
        "weight": pendulum.weight,
        "initialization": "true"
    })
    return res.data
}

class Pendulum {
    constructor(x, y, r, angle, weight, name) {
        this.x = x
        this.y = y
        this.origin = createVector(x, y);
        this.position = createVector();
        this.r = r;
        this.angle = angle;
        this.weight = weight;
        this.name = name;
        this.ballr = 48.0;
    }

    async updateCoordinates() {
        const response = await updatePosition(this)
        this.position.set(response.x, response.y);
    }

    display() {
        stroke(255);
        strokeWeight(2);
        line(this.origin.x, this.origin.y, this.position.x, this.position.y);
        ellipseMode(CENTER);
        fill(127);
        ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
    }
}
