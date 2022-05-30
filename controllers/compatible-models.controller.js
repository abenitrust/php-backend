const mongoose = require("mongoose");

const helper = require("./helper");

const partsModel = mongoose.model(process.env.DB_PARTS_MODEL);
const CompatibleModelsCollection = process.env.DB_COMPATIBLE_MODELS_COLLECTION;


const _findPart = async (req, res) => {
    const partId = req.params.partId;
    try {
        const part = await partsModel.findById(partId);
        if(part === null) {
            helper.notFoundMsg({res});
            return null;
        } else {
            return part;
        }
    } catch (e) {
        helper.serverErrorMsg({res});
        return null;
    }
}

const getAll = async (req, res) => {
    const part = await _findPart(req, res);
    if(part == null) {
        return;
    }

    const startIdx = helper.getStart(req.query.start);
    const count = helper.getCount(req.query.count);
    res.status(200).json(part.compatibleModels.slice(startIdx, startIdx+count));

}

const get = async (req, res) => {
    const part = await _findPart(req, res);
    if(part == null) {
        return;
    }
    const carModelId = req.params.carModelId;
    res.status(200).json(part.compatibleModels.id(carModelId));
}



const add = async (req, res) => {
    const part = await _findPart(req, res);
    if(part == null) {
        return;
    }

    const userModel = req.body;
    part.compatibleModels.push(userModel);
    part.save((err, _) => {
        if(err) {
            if(err instanceof mongoose.Error.ValidationError) {
                helper.validationErrorMsg({res, msg: err});
            } else {
                helper.serverErrorMsg({res, msg: "Problem occurred while adding compatibleModel to part."});
            }
        } else {
            helper.successMsg({res, msg: "Compatible model successfully added to part!"});
        }
    });
}

const remove = async (req, res) => {
    const part = await _findPart(req, res);
    if(part == null) {
        return;
    }
    
    const carModelId = req.params.carModelId;
    part.compatibleModels.id(carModelId).remove();
    part.save((err, _) => {
        if(err) {
            if(err instanceof mongoose.Error.ValidationError) {
                helper.validationErrorMsg({res, msg: err});
            } else {
                helper.serverErrorMsg({res, msg: "Problem occurred while removing compatibleModel to part."});
            }
        } else {
            helper.successMsg({res, msg: "Compatible model successfully removed!"});
        }
    });
}

const update = async (req, res, _ , overwrite=true) => {
    const part = await _findPart(req, res);
    if(part == null) {
        return;
    }

    const carModelId = req.params.carModelId;
    const userModel = req.body;
    const existingModel = part.compatibleModels.id(carModelId);

    let updateModel = userModel;
    if(overwrite === false) {
        updateModel = {...existingModel, ...userModel};
    }
    
    existingModel.set(updateModel);
    part.save((err, _) => {
        if(err) {
            if(err instanceof mongoose.Error.ValidationError) {
                helper.validationErrorMsg({res, msg: err});
            } else {
                helper.serverErrorMsg({res, msg: "Problem occurred while updating compatible model."});
            }
        } else {
            helper.successMsg({res, msg: "Compatible model successfully updated!"});
        }
    });
}

const patch = (req, res, next) => {
    update(req, res, next, overwrite=false);
}


module.exports = {
    getAll,
    get,
    update,
    patch,
    remove,
    add
}

