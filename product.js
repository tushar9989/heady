function find(db, req, res) {
    if (!req.category) {
        res.status(400);
        res.end(JSON.stringify({
            message: "invalid category"
        }));

        return;
    }

    db.collection('products').find({categories: req.category}).toArray(
        (err, result) => {
            if (err) {
                res.status(500);
                res.end(JSON.stringify({
                    message: "find failed: " + err
                }));
                
                return;
            }

            res.end(JSON.stringify(result));
            return;
        }
    );
}

function save(db, id, req, res) {
    product = {
        _id: id
    };

    if (req.name) {
        product['name'] = req.name;
    }

    if (req.price) {
        product['price'] = req.price;
    }

    if (req.description) {
        product['description'] = req.description;
    }

    var persist = function() {
        db.collection('products').updateOne(
            { _id: id },
            { $set: product },
            { upsert: true },
            (err, result) => {
                if (err) {
                    res.status(500);
                    res.end(JSON.stringify({
                        message: "save failed: " + err
                    }));
                    
                    return;
                };
                
                res.status(201);
                res.end(JSON.stringify(result));
                return;
            }
        );
    }

    if (req.categories) {
        db.collection('categories').find({ _id: { $in: req.categories } }).toArray(
            (err, result) => {
                if (err || result.length != req.categories.length) {
                    res.status(400);
                    res.end(JSON.stringify({
                        message: "invalid categories provided"
                    }));

                    return;
                }

                product['categories'] = req.categories;
                persist();
            }
        );
    } else {
        persist();
    }
}

module.exports = {
    find: find,
    save: save
};