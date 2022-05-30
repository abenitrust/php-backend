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
            if(err instanceof mongoose.Error.ValidationError) {
                helper.validationErrorMsg({res, msg: err});
            } else {
                helper.serverErrorMsg({res, msg: `Error occurred, contact develoeprs`});
            }
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

const update = (req, res, _, overwrite=true) => {
    const partId = req.params.partId;
    partsModel.findById(partId, (err, existingModel) => {
        if(err) {
            helper.notFoundMsg({res});
        } else {
            // TODO: find a better way to update values using object destructuring 
            // on the existingModel and save it. Had to resort to this hack because
            // mongoose somehow nulls subDocuments during patch which doesn't want
            // include a patch to subdocuments.
            const userInput = req.body;
            const existingData = existingModel.toObject();
            let updateData = userInput;
            if(overwrite === false) {
                updateData = {...existingData, ...userInput};
            }

            partsModel.findByIdAndUpdate(partId, updateData, {overwrite, runValidators: true}, (err, _) => {
                if(err) {
                    if(err instanceof mongoose.Error.ValidationError) {
                        helper.validationErrorMsg({res, msg: err});
                    } else {
                        helper.serverErrorMsg({res, msg: `Error occurred while updating. ${err}`});
                    }
                } else {
                    helper.successMsg({res, msg: "part successfully updated"});
                }
            })

        }
    });
}

const patch = (req, res, next) => {
    update(req, res, next,  overwrite=false);
}


module.exports = {
    getAll,
    get,
    update,
    patch,
    remove,
    add
}

