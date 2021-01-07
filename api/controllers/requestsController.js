const { Request } = require('../db');

const index = async (req, res) => {
    const requests = await Request.findAll({
        order:[
            ['start_time','asc'],
            ['frequency', 'asc']
        ]
    });

    return res.send({
        resource: 'Requests',
        data: requests
    })
}


const create = async (req, res) => {
    const {start_time, end_time, frequency, from, to} = req.body;
    const request = await Request.create({
        start_time, end_time, frequency, from, to
    });

    return res.send({
        resource: 'Request',
        data: request
    })
}

const show = async (req, res) => {
    const {id} = req.params;
    const request = await Request.findByPk(id);
    return res.send({
        resource: 'Request',
        data: request
    })
}

const update = async (req, res) => {
    const {id} = req.params;
    const {start_time, end_time, frequency, from, to} = req.body;

    const request = await Request.findByPk(id);

    if(request){
        request.cue = cue;
        request.start_time = start_time;
        request.end_time = end_time;
        request.frequency = frequency;
        request.from = JSON.stringify(from);
        request.to = JSON.stringify(to);
        await request.save();
    }

    return res.send({
        resource: 'Request',
        data: request
    })
}

const destroy = async (req, res) => {
    const {id} = req.params;
    const request = await Request.findByPk(id);
    if(request) await request.destroy();

    return res.sendStatus(204);
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy
} 