function save(db, req, res) {
    var category = {
        _id: req.name
    };

    var persist = function() {
        db.collection('categories').updateOne(
            { _id: req.name },
            { $set: category },
            { upsert: true },
            (err, result) => {
                if (err) {
                    res.status(500);
                    return console.log(err);
                };
                
                res.status(201);
                res.end(JSON.stringify(result));
                return;
            }
        );
    }

    if (req.parent) {
        db.collection('categories').find({ _id: req.parent }).toArray(
            (err, result) => {
                if (err || result.length == 0) {
                    res.status(400);
                    res.end(JSON.stringify({
                        message: "invalid parent"
                    }));
                    
                    return;
                }

                category['parent'] = req.parent;
                persist();
            }
        );
    } else {
        category['parent'] = null;
        persist();
    }
}

module.exports = {
    save: save
};