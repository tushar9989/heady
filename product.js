function save(db, id, product, res) {
    product["_id"] = id;
    db.collection('products').updateOne(
        { _id: id },
        { $set: product },
        { upsert: true },
        (err) => {
            if (err) return console.log(err);
            
            res.end(JSON.stringify(product));
            return;
        }
    );
}

module.exports = {
    save: save
};