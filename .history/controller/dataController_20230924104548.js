const getByDate =(req, res) => {
    const date = req.params.date;
    try {
        const query = 'SELECT * FROM records WHERE date = ?';
        db.query(query, [date], (results) => {
        res.json(results);
        
       });
    
    } catch (err) {
      console.log(err)
      sendResponseError(500, `Error ${err}`, res)
    }
  }
  const getByWeek = (req, res) => {

    try {
        const lastWeekStart = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
    const lastWeekEnd = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');
    const query = 'SELECT * FROM records WHERE date >= ? AND date <= ?';
    db.query(query, [lastWeekStart, lastWeekEnd], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
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