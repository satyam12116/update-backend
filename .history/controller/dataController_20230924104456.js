const getByDate =(req, res) => {
    const date = req.params.date;
    try {
        const query = 'SELECT * FROM records WHERE date = ?';
        db.query(query, [date], (results) => {
        await  res.json(results);
        
       });
    
    } catch (err) {
      console.log(err)
      sendResponseError(500, `Error ${err}`, res)
    }
  }
  const getByWeek = async (req, res) => {
    const {productId, count} = req.body
    try {
      const cart = await Cart.findOneAndUpdate(
        {productId},
        {productId, count, userId: req.user._id},
        {upsert: true},
      )
  
      res.status(201).send({status: 'ok', cart})
    } catch (err) {
      console.log(err)
      sendResponseError(500, `Error ${err}`, res)
    }
  }
  const getByMonth = async (req, res) => {
    try {
      await Cart.findByIdAndRemove(req.params.id)
      res.status(200).send({status: 'ok'})
    } catch (e) {
      console.log(err)
      sendResponseError(500, `Error ${err}`, res)
    }
  }
  module.exports = {getByDate, getByWeek, getByMonth}