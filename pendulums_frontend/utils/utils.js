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
    console.log(pendulum)
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

module.exports = {
    updatePosition,
    initializePendulum
};
