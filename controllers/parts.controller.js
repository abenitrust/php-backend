const mongoose = require("mongoose");

const helper = require("./helper");

const partsModel = mongoose.model(process.env.DB_PARTS_MODEL);



const getAll = (req, res) => {
    const startIdx = helper.getStart(req.query.start);
    const count = helper.getCount(req.query.count);

    partsModel.find().skip(startIdx).limit(count).exec((err, parts) => {
        if(err) {
            helper.serverErrorMsg({res});
        } else {
            res.status(200).json(parts);
        }
    })
}

const get = (req, res) => {
    const partId = req.params.partId;

    partsModel.findById(partId, (err, part) => {
        if(err) {
            helper.serverErrorMsg({res});
        } else {
            res.status(200).json(part);
        }
    }); 
}

const add = (req, res) => {
    const userModel = new partsModel(req.body);

    userModel.save((err, _) => {
        if(err) {
            helper.serverErrorMsg({res});
        } else {
            helper.successMsg({res, msg: "Part successfully created!"});
        }
    });
}

const remove = (req, res) => {
    const partId = req.params.partId;

    partsModel.findByIdAndDelete(partId, (err, _) => {
        if(err) {
            helper.serverErrorMsg({res});
        } else {
            helper.successMsg({res, msg: "Part successfully deleted"});
        }
    });
}

const update = (req, res, overwrite=true) => {
    const partId = req.params.partId;
    const userModel = new partsModel(req.body);
    userModel.set({_id: partId});
    partsModel.findByIdAndUpdate(partId, userModel,  { overwrite }, (err, _) => {
        if(err) {
            helper.serverErrorMsg({res});
        } else {
            helper.successMsg({res, msg: "part successfully updated"});
        }
    });
}

const patch = (req, res) => {
    update(req, res, overwrite=false);
}


module.exports = {
    getAll,
    get,
    update,
    patch,
    remove,
    add
}

