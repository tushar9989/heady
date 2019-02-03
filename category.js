function find(db, res) {
    db.collection('categories').aggregate([
        {
           $graphLookup: {
              from: "categories",
              startWith: "$_id",
              connectFromField: "_id",
              connectToField: "parent",
              as: "children",
              maxDepth: 0
           }
        }
     ]).toArray(
        (err, categories) => {
            if (err) {
                res.status(500);
                return console.log(err);
            }

            var result = [];
            for (let i = 0; i < categories.length; i++) {
                var category = {
                    name: categories[i]._id
                }

                if (categories[i].children.length !== 0) {
                    category['children'] = [];

                    for (let j = 0; j < categories[i].children.length; j++) {
                        category.children.push(categories[i].children[j]._id);
                    }
                }

                result.push(category);
            }

            res.end(JSON.stringify(result));
            return;
        }
    );
}

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
    find: find,
    save: save
};